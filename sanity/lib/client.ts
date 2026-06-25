import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Use CDN for faster reads with stale-while-revalidate
  perspective: 'published', // Only fetch published documents for performance
  // Optimize for server-side rendering
  stega: {
    enabled: false, // Disable visual editing stega for production performance
    studioUrl: '/studio',
  },
})
