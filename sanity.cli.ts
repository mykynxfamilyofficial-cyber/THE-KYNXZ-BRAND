/**
* This configuration file lets you run `$ sanity [command]` in this folder
* Go to https://www.sanity.io/docs/cli to learn more.
**/
import { defineCliConfig } from 'sanity/cli'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET

if (!projectId) {
  console.error(
    '[sanity.cli] Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID\n' +
    '  → Set it in your .env.local file or in your Vercel project dashboard.\n' +
    '  → See .env.example for reference.'
  )
  process.exit(1)
}

if (!dataset) {
  console.error(
    '[sanity.cli] Missing environment variable: NEXT_PUBLIC_SANITY_DATASET\n' +
    '  → Set it in your .env.local file or in your Vercel project dashboard.\n' +
    '  → See .env.example for reference.'
  )
  process.exit(1)
}

export default defineCliConfig({ api: { projectId, dataset } })
