function assertValue<T>(v: T | undefined, errorMessage: string, hint: string): T {
  if (v === undefined || v === '') {
    console.error(
      `[sanity/env] ${errorMessage}\n` +
      `  → Set it in your .env.local file or in your Vercel project dashboard.\n` +
      `  → See .env.example for reference.\n` +
      `  → ${hint}`
    )
    throw new Error(`${errorMessage}\n\nHint: ${hint}`)
  }
  return v
}

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-06-23'

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET',
  'Copy your Sanity dataset name (e.g. "production") from https://www.sanity.io/manage into .env.local'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID',
  'Copy your Sanity project ID from https://www.sanity.io/manage into .env.local'
)
