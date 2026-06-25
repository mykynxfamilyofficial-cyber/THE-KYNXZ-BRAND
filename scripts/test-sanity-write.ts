/**
 * Standalone Sanity Write Test
 *
 * Tests whether the Sanity write token has the correct permissions.
 * Run: npx tsx scripts/test-sanity-write.ts
 *
 * This script loads environment variables from .env.local,
 * creates a Sanity client with the write token, and attempts
 * to create a contactSubmission document.
 */

import * as fs from 'fs'
import * as path from 'path'
import { createClient } from '@sanity/client'

/* ── Load .env.local manually ──────────────────────────────── */
function loadEnvFile(filePath: string): Record<string, string> {
  const env: Record<string, string> = {}
  const content = fs.readFileSync(filePath, 'utf-8')
  for (const line of content.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eqIdx = trimmed.indexOf('=')
    if (eqIdx === -1) continue
    const key = trimmed.slice(0, eqIdx).trim()
    let value = trimmed.slice(eqIdx + 1).trim()
    // Strip surrounding quotes if present
    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1)
    }
    env[key] = value
  }
  return env
}

const envLocalPath = path.resolve(__dirname, '..', '.env.local')
if (!fs.existsSync(envLocalPath)) {
  console.error('❌ .env.local not found at', envLocalPath)
  process.exit(1)
}

const env = loadEnvFile(envLocalPath)

/* ── Log env diagnostics ───────────────────────────────────── */
const token = env['SANITY_API_WRITE_TOKEN']
const projectId = env['NEXT_PUBLIC_SANITY_PROJECT_ID']
const dataset = env['NEXT_PUBLIC_SANITY_DATASET']
const apiVersion = env['NEXT_PUBLIC_SANITY_API_VERSION'] || '2026-06-23'

console.log('═══════════════════════════════════════════')
console.log('  SANITY WRITE DIAGNOSTIC')
console.log('═══════════════════════════════════════════')
console.log('')
console.log(`  PROJECT ID:    ${projectId || '❌ MISSING'}`)
console.log(`  DATASET:       ${dataset || '❌ MISSING'}`)
console.log(`  API VERSION:   ${apiVersion}`)
console.log(`  WRITE TOKEN:   ${token ? `✅ Present (${token.slice(0, 12)}...)` : '❌ MISSING'}`)
console.log(`  TOKEN LENGTH:  ${token ? token.length : 'N/A'}`)
console.log(`  TOKEN PREFIX:  ${token ? (token.startsWith('sk') ? '✅ sk...' : '⚠️  Does not start with sk') : 'N/A'}`)
console.log('')

/* ── Verify required vars ──────────────────────────────────── */
if (!token) {
  console.error('❌ FATAL: SANITY_API_WRITE_TOKEN is not set in .env.local')
  process.exit(1)
}

if (!projectId) {
  console.error('❌ FATAL: NEXT_PUBLIC_SANITY_PROJECT_ID is not set in .env.local')
  process.exit(1)
}

if (!dataset) {
  console.error('❌ FATAL: NEXT_PUBLIC_SANITY_DATASET is not set in .env.local')
  process.exit(1)
}

/* ── Check project ID matches expected ─────────────────────── */
const EXPECTED_PROJECT_ID = 'w7bgxbnl'
if (projectId !== EXPECTED_PROJECT_ID) {
  console.warn(`⚠️  WARNING: Project ID is "${projectId}" — expected "${EXPECTED_PROJECT_ID}"`)
  console.warn('   This might be a different Sanity project.')
} else {
  console.log(`✅ Project ID matches expected: ${EXPECTED_PROJECT_ID}`)
}

/* ── Create Sanity client ──────────────────────────────────── */
const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
})

/* ── Attempt write ─────────────────────────────────────────── */
async function main() {
  console.log('')
  console.log('── Attempting to create a test document ──')
  console.log('')

  try {
    const doc = await client.create({
      _type: 'contactSubmission',
      name: 'TEST',
      email: 'test@test.com',
      subject: 'TEST',
      message: 'TEST',
      status: 'new',
      createdAt: new Date().toISOString(),
    })

    console.log('✅ SUCCESS! Document created.')
    console.log(`   Document ID: ${doc._id}`)
    console.log(`   Document type: ${doc._type}`)
    console.log('')

    /* ── Clean up: delete the test document ────────────────── */
    console.log('── Cleaning up test document ──')
    await client.delete(doc._id)
    console.log(`✅ Test document ${doc._id} deleted.`)
    console.log('')
    console.log('✅ All checks passed. The write token has correct permissions.')

  } catch (err: any) {
    console.error('❌ FAILED to create document.')
    console.error('')
    console.error('   Error:', err.message || err)
    console.error('')

    /* ── Diagnose the error ────────────────────────────────── */
    const msg = err.message || String(err)
    const statusCode = err.statusCode || err.status || 'unknown'

    console.log('── DIAGNOSTICS ──')
    console.log(`   Status Code:  ${statusCode}`)
    console.log('')

    if (msg.includes('Insufficient permissions') || msg.includes('permission')) {
      console.log('🔍 ROOT CAUSE: Token lacks "create" permission or role is too restrictive.')
      console.log('')
      console.log('   Fix: Go to https://www.sanity.io/manage')
      console.log('   1. Select your project')
      console.log('   2. Go to API → Tokens')
      console.log('   3. Create a new token with role: Editor (or Administrator)')
      console.log('   4. Update SANITY_API_WRITE_TOKEN in .env.local with the new token')
    }

    if (msg.includes('project') || msg.includes('not found')) {
      console.log('🔍 ROOT CAUSE: Project or dataset mismatch.')
      console.log(`   Configured project: ${projectId}`)
      console.log(`   Configured dataset: ${dataset}`)
      console.log(`   Expected project:   ${EXPECTED_PROJECT_ID}`)
    }

    if (msg.includes('token') || msg.includes('unauthorized') || msg.includes('401')) {
      console.log('🔍 ROOT CAUSE: Invalid or expired token.')
      console.log('   Generate a new Editor token from Sanity management.')
    }

    process.exit(1)
  }
}

main()
