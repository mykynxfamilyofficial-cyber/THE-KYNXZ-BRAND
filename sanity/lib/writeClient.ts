import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

/**
 * Server-only write client for Sanity.
 *
 * Uses SANITY_API_WRITE_TOKEN (a server-side env var) to authenticate.
 * This client should only be used in API routes or server actions — never
 * exposed to the browser.
 *
 * Usage:
 *   import { writeClient } from '@/sanity/lib/writeClient'
 *   await writeClient.create({ _type: 'contactSubmission', ... })
 */
export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Must be false for writes
  token: process.env.SANITY_API_WRITE_TOKEN,
  // Writes are server-side only — no need for stega
  stega: {
    enabled: false,
  },
})
