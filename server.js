import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import sqlite3 from 'sqlite3'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import nodemailer from 'nodemailer'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

dotenv.config()

const REQUIRED_ENV = [
  'SMTP_HOST',
  'SMTP_PORT',
  'SMTP_USER',
  'SMTP_PASSWORD',
  'SMTP_FROM',
  'JWT_SECRET',
]
const missingEnv = REQUIRED_ENV.filter((key) => !process.env[key]?.trim())
if (missingEnv.length > 0) {
  console.error(`❌ Variables manquantes dans .env: ${missingEnv.join(', ')}`)
  console.error('   Copiez .env.example vers .env et configurez Mailtrap.')
  process.exit(1)
}

if (process.env.SMTP_USER === 'api' && process.env.SMTP_PASSWORD?.length < 20) {
  console.warn('⚠️  SMTP semble utiliser les valeurs d\'exemple. Mettez vos credentials Mailtrap dans .env')
}

const app = express()
const PORT = parseInt(process.env.PORT, 10) || 3000

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}
const __dirname = dirname(fileURLToPath(import.meta.url))
const dbPath = join(__dirname, 'nexus.db')

// Middleware
app.use(cors())
app.use(express.json())

// ===== DATABASE =====
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Database error:', err)
    process.exit(1)
  }
  console.log('✅ Database connected')
})

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    verified BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_login DATETIME
  )`, (err) => {
    if (err) console.error('Table users error:', err)
  })

  db.run(`CREATE TABLE IF NOT EXISTS verification_tokens (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    token TEXT UNIQUE NOT NULL,
    expires_at DATETIME NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  )`, (err) => {
    if (err) console.error('Table tokens error:', err)
  })
})

// ===== EMAIL SERVICE =====
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})

async function sendVerificationEmail(email, token) {
  const verificationLink = `${process.env.FRONTEND_URL || 'http://localhost:5173'}?token=${token}`

  const mailOptions = {
    from: process.env.SMTP_FROM || '"NEXUS" <hello@demomailtrap.com>',
    to: email,
    subject: '🚀 Accédez à NEXUS - Confirmez votre email',
    html: `
      <!DOCTYPE html>
      <html>
        <body style="font-family: sans-serif; background: #0f0f1e; color: #fff;">
          <div style="max-width: 500px; margin: 40px auto; padding: 20px;">
            <h2>Bienvenue sur NEXUS</h2>
            <p>Cliquez sur le bouton ci-dessous pour vérifier votre email :</p>
            <a href="${verificationLink}" style="display: inline-block; background: #22d3ee; color: #000; padding: 12px 32px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 20px 0;">
              Accéder au réseau
            </a>
            <p style="font-size: 12px; margin-top: 20px;">Ce lien expire dans 24h.</p>
            <p style="font-size: 11px; color: #94a3b8;">© 2026 NEXUS</p>
          </div>
        </body>
      </html>
    `,
  }

  try {
    const info = await transporter.sendMail(mailOptions)
    console.log(`📧 Email sent to ${email}`)
    return true
  } catch (error) {
    console.error('❌ Email error:', error.message)
    if (error.message?.includes('Too many emails')) {
      throw new Error('Trop de requêtes. Réessayez dans quelques secondes.')
    }
    if (error.message?.includes('550') && error.message?.includes('Sending from domain')) {
      throw new Error(
        'Adresse expéditeur refusée. Vérifiez SMTP_FROM dans .env (sandbox : toute adresse ; sending : domaine vérifié).',
      )
    }
    throw error
  }
}

// ===== DATABASE HELPERS =====
function findUserByEmail(email) {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
      if (err) reject(err)
      else resolve(row)
    })
  })
}

function createUser(email) {
  return new Promise((resolve, reject) => {
    db.run('INSERT INTO users (email, verified) VALUES (?, 0)', [email], function (err) {
      if (err) reject(err)
      else resolve({ id: this.lastID, email })
    })
  })
}

function createVerificationToken(userId) {
  return new Promise((resolve, reject) => {
    const token = crypto.randomBytes(32).toString('hex')
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000)

    db.run(
      'INSERT INTO verification_tokens (user_id, token, expires_at) VALUES (?, ?, ?)',
      [userId, token, expiresAt.toISOString()],
      (err) => {
        if (err) reject(err)
        else resolve(token)
      }
    )
  })
}

function verifyToken(token) {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT vt.user_id, vt.expires_at, u.email 
       FROM verification_tokens vt 
       JOIN users u ON vt.user_id = u.id 
       WHERE vt.token = ? AND vt.expires_at > CURRENT_TIMESTAMP`,
      [token],
      (err, row) => {
        if (err) reject(err)
        else resolve(row || null)
      }
    )
  })
}

function markUserVerified(userId) {
  return new Promise((resolve, reject) => {
    db.run(
      'UPDATE users SET verified = 1, last_login = CURRENT_TIMESTAMP WHERE id = ?',
      [userId],
      (err) => {
        if (err) reject(err)
        else resolve()
      }
    )
  })
}

function deleteVerificationToken(token) {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM verification_tokens WHERE token = ?', [token], (err) => {
      if (err) reject(err)
      else resolve()
    })
  })
}

// ===== ROUTES =====

app.post('/api/auth/send-link', async (req, res) => {
  try {
    const email = req.body?.email?.trim().toLowerCase()

    if (!email || !isValidEmail(email)) {
      return res.status(400).json({ error: 'Email invalide' })
    }

    let user = await findUserByEmail(email)
    if (!user) {
      user = await createUser(email)
    }

    const token = await createVerificationToken(user.id)
    await sendVerificationEmail(email, token)

    res.json({
      success: true,
      message: 'Email de vérification envoyé',
      email,
    })
  } catch (error) {
    console.error('❌ Error in send-link:', error)
    res.status(500).json({ error: error.message || 'Erreur serveur' })
  }
})

app.get('/api/auth/verify/:token', async (req, res) => {
  try {
    const { token } = req.params
    const tokenData = await verifyToken(token)

    if (!tokenData) {
      return res.status(401).json({ error: 'Token invalide ou expiré' })
    }

    await markUserVerified(tokenData.user_id)
    await deleteVerificationToken(token)

    const jwtToken = jwt.sign(
      { id: tokenData.user_id, email: tokenData.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    )

    res.json({
      success: true,
      message: 'Email vérifié avec succès',
      token: jwtToken,
      user: {
        id: tokenData.user_id,
        email: tokenData.email,
      },
    })
  } catch (error) {
    console.error('❌ Error in verify:', error)
    res.status(500).json({ error: error.message || 'Erreur serveur' })
  }
})

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

// Error handler
app.use((err, req, res, next) => {
  console.error('❌ Error:', err)
  res.status(500).json({ error: 'Internal server error' })
})

async function startServer() {
  try {
    await transporter.verify()
    console.log('✅ SMTP connecté (Mailtrap)')
  } catch (error) {
    console.error('❌ Connexion SMTP échouée:', error.message)
    console.error('   Vérifiez SMTP_HOST, SMTP_USER et SMTP_PASSWORD dans .env')
    process.exit(1)
  }

  app.listen(PORT, () => {
    console.log(`\n╔════════════════════════════════════════╗`)
    console.log(`║  ✅ NEXUS Server Started                ║`)
    console.log(`║  🌐 http://localhost:${PORT}              ║`)
    console.log(`║  📧 Email service active               ║`)
    console.log(`╚════════════════════════════════════════╝\n`)
  })
}

startServer()
