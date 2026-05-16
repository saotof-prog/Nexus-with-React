#!/usr/bin/env node

/**
 * NEXUS Auth System - Validation Script
 * Vérifie que tous les fichiers sont en place et prêts
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

console.log('\n')
console.log('╔════════════════════════════════════════════════════════════════╗')
console.log('║     NEXUS Authentication System - Validation Check             ║')
console.log('╚════════════════════════════════════════════════════════════════╝')
console.log('\n')

const requiredFiles = [
  'server.js',
  'src/App.jsx',
  'src/Verify.jsx',
  'src/components/CTA.jsx',
  '.env',
  '.env.example',
  'package.json',
  'SETUP.md',
  'AUTHENTICATION.md',
]

const optionalFiles = [
  'IMPLEMENTATION_SUMMARY.md',
  'QUICKSTART.txt',
  'START_HERE.md',
]

let allGood = true
let checkCount = 0
let passCount = 0

console.log('🔍 Checking required files...\n')

requiredFiles.forEach((file) => {
  checkCount++
  const filePath = path.join(__dirname, file)
  const exists = fs.existsSync(filePath)

  if (exists) {
    console.log(`  ✅ ${file}`)
    passCount++
  } else {
    console.log(`  ❌ ${file} - MISSING!`)
    allGood = false
  }
})

console.log('\n🔍 Checking optional documentation files...\n')

optionalFiles.forEach((file) => {
  const filePath = path.join(__dirname, file)
  const exists = fs.existsSync(filePath)

  if (exists) {
    console.log(`  ✅ ${file}`)
  } else {
    console.log(`  ⚠️  ${file} - Not found (optional)`)
  }
})

console.log('\n')
console.log('╔════════════════════════════════════════════════════════════════╗')

if (allGood) {
  console.log('║                    ✅ ALL CHECKS PASSED                        ║')
} else {
  console.log('║               ❌ SOME FILES ARE MISSING                        ║')
}

console.log('╚════════════════════════════════════════════════════════════════╝')

console.log('\n')
console.log(`Files checked: ${passCount}/${checkCount}`)
console.log('')

if (allGood) {
  console.log('🚀 You are ready to go!')
  console.log('')
  console.log('Next steps:')
  console.log('  1. Configure .env with Mailtrap credentials')
  console.log('  2. npm install (if not already done)')
  console.log('  3. npm run dev')
  console.log('  4. Visit http://localhost:5173')
  console.log('')
  process.exit(0)
} else {
  console.log('❌ Please check the missing files above.')
  console.log('')
  process.exit(1)
}
