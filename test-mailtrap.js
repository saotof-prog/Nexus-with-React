#!/usr/bin/env node

/**
 * Test Script - Vérifier la configuration Mailtrap
 */

import dotenv from 'dotenv'
import nodemailer from 'nodemailer'

dotenv.config()

console.log('\n╔════════════════════════════════════════════════════════════════╗')
console.log('║              NEXUS Mailtrap Configuration Test                 ║')
console.log('╚════════════════════════════════════════════════════════════════╝\n')

console.log('📋 Configuration loaded from .env:')
console.log(`  SMTP_HOST: ${process.env.SMTP_HOST}`)
console.log(`  SMTP_PORT: ${process.env.SMTP_PORT}`)
console.log(`  SMTP_USER: ${process.env.SMTP_USER}`)
console.log(`  SMTP_PASSWORD: ${process.env.SMTP_PASSWORD ? '✓ (configured)' : '✗ (missing)'}`)
console.log('')

if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
  console.error('❌ ERROR: Missing Mailtrap credentials!\n')
  console.log('To fix:')
  console.log('  1. Go to https://mailtrap.io')
  console.log('  2. Sign up (free)')
  console.log('  3. Create an inbox')
  console.log('  4. Copy SMTP credentials')
  console.log('  5. Update .env file with your credentials\n')
  process.exit(1)
}

console.log('🔧 Testing Mailtrap connection...\n')

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})

transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Connection failed:\n', error.message)
    console.log('\nTroubleshooting:')
    console.log('  • Check that credentials are correct')
    console.log('  • Verify SMTP_HOST and SMTP_PORT')
    console.log('  • Check your Mailtrap inbox exists\n')
    process.exit(1)
  } else {
    console.log('✅ Connection successful!')
    console.log('\n✨ Your Mailtrap account is working!\n')
    console.log('You can now run: npm run dev\n')
    process.exit(0)
  }
})
