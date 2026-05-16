#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const envPath = path.join(__dirname, '.env')

console.log('\n')
console.log('╔════════════════════════════════════════════════════════════════╗')
console.log('║                    🚀 NEXUS AUTH SYSTEM                        ║')
console.log('║                  Vérification de démarrage                      ║')
console.log('╚════════════════════════════════════════════════════════════════╝\n')

// Vérifier .env
console.log('1️⃣  Vérification du fichier .env...')
if (!fs.existsSync(envPath)) {
  console.error('   ❌ .env non trouvé!\n')
  console.log('   Solution:')
  console.log('   - Copiez .env.example en .env')
  console.log('   - Remplissez-le avec vos credentials Mailtrap\n')
  process.exit(1)
}
console.log('   ✅ .env trouvé\n')

// Vérifier les fichiers clés
console.log('2️⃣  Vérification des fichiers nécessaires...')
const requiredFiles = [
  'server.js',
  'src/App.jsx',
  'src/Verify.jsx',
  'src/components/CTA.jsx',
  'package.json',
]

let missingFiles = []
requiredFiles.forEach(file => {
  const filePath = path.join(__dirname, file)
  if (fs.existsSync(filePath)) {
    console.log(`   ✅ ${file}`)
  } else {
    console.log(`   ❌ ${file} - MANQUANT`)
    missingFiles.push(file)
  }
})

if (missingFiles.length > 0) {
  console.error(`\n❌ ${missingFiles.length} fichier(s) manquant(s)!\n`)
  process.exit(1)
}
console.log('')

// Lire la configuration
console.log('3️⃣  Vérification de la configuration...')
const envContent = fs.readFileSync(envPath, 'utf-8')
const hasSmtpUser = envContent.includes('SMTP_USER=') && !envContent.includes('SMTP_USER=api')
const hasSmtpPassword = envContent.includes('SMTP_PASSWORD=') && envContent.includes('ccc')

console.log('   Configuration .env:')
envContent.split('\n').forEach(line => {
  if (line.includes('SMTP_') || line.includes('PORT=')) {
    if (line.includes('PASSWORD')) {
      console.log(`   • ${line.substring(0, line.length - 10)}...`)
    } else if (line.startsWith('#')) {
      // Skip comments
    } else if (line.trim()) {
      console.log(`   • ${line}`)
    }
  }
})
console.log('')

// Afficher les instructions
console.log('╔════════════════════════════════════════════════════════════════╗')
console.log('║                    ✨ VOUS ÊTES PRÊT!                          ║')
console.log('╚════════════════════════════════════════════════════════════════╝\n')

console.log('Étapes suivantes:\n')
console.log('1. Installez les dépendances (si pas déjà fait):')
console.log('   $ npm install\n')
console.log('2. Testez la configuration Mailtrap:')
console.log('   $ node test-mailtrap.js\n')
console.log('3. Lancez l\'application:')
console.log('   $ npm run dev\n')
console.log('4. Ouvrez dans le navigateur:')
console.log('   http://localhost:5173\n')

console.log('═════════════════════════════════════════════════════════════════\n')
