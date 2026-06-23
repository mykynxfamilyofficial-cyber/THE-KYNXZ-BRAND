import { urlFor } from '@/sanity/lib/image'
import type { Product, ProductCategory } from '@/app/collections/types'

/* ───────────────────────────────────────────────
   Types returned by Sanity GROQ queries
   ─────────────────────────────────────────────── */

export interface SanityProduct {
  _id: string
  name: string
  slug: { current: string }
  shortDescription?: string
  fullDescription?: { children?: { text?: string }[] }[]
  category?: string
  featured?: boolean
  tags?: string[]
  price?: number
  compareAtPrice?: number
  stockStatus?: 'in-stock' | 'out-of-stock' | 'coming-soon'
  sku?: string
  mainImage?: {
    asset?: { _id?: string; _ref?: string }
    hotspot?: { x: number; y: number; width: number; height: number }
    crop?: { top: number; bottom: number; left: number; right: number }
  }
  galleryImages?: {
    asset?: { _id?: string; _ref?: string }
    hotspot?: { x: number; y: number; width: number; height: number }
    crop?: { top: number; bottom: number; left: number; right: number }
  }[]
  dimensions?: string
  material?: string
  features?: string[]
  brand?: string
  customerRating?: number
  shippingInfo?: string
  publishedDate?: string
}

/* ───────────────────────────────────────────────
   Category mapping: Sanity categories → app categories
   ─────────────────────────────────────────────── */

const CATEGORY_MAP: Record<string, ProductCategory> = {
  apparel: 'lifestyle',
  accessories: 'accessories',
  'home-living': 'home-living',
  'pet-essentials': 'pet-essentials',
  travel: 'travel',
  'limited-edition': 'lifestyle',
}

const DEFAULT_CATEGORY: ProductCategory = 'lifestyle'

/* ───────────────────────────────────────────────
   Accent colours by category
   ─────────────────────────────────────────────── */

const ACCENT_MAP: Record<string, string> = {
  'home-living': '#D6CFC7',
  'pet-essentials': '#B89A76',
  travel: '#D6CFC7',
  lifestyle: '#D4A84F',
  accessories: '#D4A84F',
}

const DEFAULT_ACCENT = '#D6CFC7'

/* ───────────────────────────────────────────────
   Gradient placeholder backgrounds by category
   ─────────────────────────────────────────────── */

const GRADIENT_MAP: Record<string, string> = {
  'home-living': `
    linear-gradient(145deg, #1A1612 0%, #2A241E 35%, #3D342C 65%, #1A1612 100%),
    radial-gradient(ellipse at 30% 25%, rgba(214, 207, 199, 0.1), transparent 50%),
    radial-gradient(ellipse at 70% 75%, rgba(139, 115, 85, 0.08), transparent 45%)
  `,
  'pet-essentials': `
    linear-gradient(200deg, #1A1612 0%, #2C241E 35%, #3D342C 70%, #1A1612 100%),
    radial-gradient(ellipse at 50% 30%, rgba(214, 207, 199, 0.07), transparent 50%),
    radial-gradient(ellipse at 40% 70%, rgba(184, 154, 118, 0.05), transparent 45%)
  `,
  travel: `
    linear-gradient(160deg, #1A1612 0%, #2A241E 30%, #3D342C 60%, #1A1612 100%),
    radial-gradient(ellipse at 30% 25%, rgba(214, 207, 199, 0.08), transparent 50%),
    radial-gradient(ellipse at 70% 65%, rgba(139, 115, 85, 0.06), transparent 45%)
  `,
  lifestyle: `
    linear-gradient(220deg, #1A1612 0%, #2A241E 35%, #3D342C 65%, #1A1612 100%),
    radial-gradient(ellipse at 40% 20%, rgba(212, 168, 79, 0.08), transparent 50%),
    radial-gradient(ellipse at 60% 80%, rgba(214, 207, 199, 0.05), transparent 45%)
  `,
  accessories: `
    linear-gradient(160deg, #1A1612 0%, #2A241E 35%, #3D342C 65%, #1A1612 100%),
    radial-gradient(ellipse at 30% 30%, rgba(212, 168, 79, 0.08), transparent 50%),
    radial-gradient(ellipse at 70% 60%, rgba(214, 207, 199, 0.05), transparent 45%)
  `,
}

const DEFAULT_GRADIENT = `
  linear-gradient(145deg, #1A1612 0%, #2A241E 35%, #3D342C 65%, #1A1612 100%),
  radial-gradient(ellipse at 30% 25%, rgba(214, 207, 199, 0.08), transparent 50%),
  radial-gradient(ellipse at 70% 60%, rgba(139, 115, 85, 0.05), transparent 45%)
`

/* ───────────────────────────────────────────────
   Build image URL from a Sanity image reference
   ─────────────────────────────────────────────── */

function getImageUrl(
  image?: {
    asset?: { _id?: string; _ref?: string }
    hotspot?: { x: number; y: number; width: number; height: number }
    crop?: { top: number; bottom: number; left: number; right: number }
  }
): string | null {
  if (!image?.asset) return null
  return urlFor(image).width(800).quality(85).url()
}/* ───────────────────────────────────────────────
   Convert a plain-text excerpt from Portable Text
   ─────────────────────────────────────────────── */

function portableTextToPlainText(
  blocks?: { children?: { text?: string }[] }[]
): string {
  if (!blocks || !Array.isArray(blocks)) return ''
  return blocks
    .map((block) => block?.children?.map((child) => child?.text ?? '').join('') ?? '')
    .filter(Boolean)
    .join('\n\n')
}

/* ───────────────────────────────────────────────
   Extract tagline from short description
   ─────────────────────────────────────────────── */

function extractTagline(text: string, maxLen = 70): string {
  if (!text) return ''
  if (text.length <= maxLen) return text
  const truncated = text.substring(0, maxLen)
  const lastSpace = truncated.lastIndexOf(' ')
  return lastSpace > 0 ? truncated.substring(0, lastSpace) + '…' : truncated + '…'
}

/* ───────────────────────────────────────────────
   Determine if a product is "new" based on publishedDate
   (within the last 30 days)
   ─────────────────────────────────────────────── */

function isRecentlyPublished(publishedDate?: string): boolean {
  if (!publishedDate) return false
  const published = new Date(publishedDate).getTime()
  const now = Date.now()
  const thirtyDays = 30 * 24 * 60 * 60 * 1000
  return now - published <= thirtyDays
}

/* ═══════════════════════════════════════════════
   Map a Sanity product document → app Product
   ═══════════════════════════════════════════════ */

export function mapSanityProduct(sanity: SanityProduct): Product {
  const category = CATEGORY_MAP[sanity.category ?? ''] ?? DEFAULT_CATEGORY
  const accent = ACCENT_MAP[category] ?? DEFAULT_ACCENT
  const gradient = GRADIENT_MAP[category] ?? DEFAULT_GRADIENT

  // Build image URL for the main image
  const mainImageUrl = getImageUrl(sanity.mainImage)

  // Build gallery image URLs
  const galleryUrls: string[] = []
  if (sanity.galleryImages && Array.isArray(sanity.galleryImages)) {
    for (const img of sanity.galleryImages) {
      const url = getImageUrl(img)
      if (url) galleryUrls.push(url)
    }
  }

  // If there's a main image, use it as the card background
  const cardBackground = mainImageUrl
    ? `url(${mainImageUrl}) center/cover no-repeat`
    : gradient

  // Build gallery backgrounds – use image URLs when available, fall back to gradients
  const galleryGradients: string[] = []
  if (galleryUrls.length > 0) {
    for (const url of galleryUrls) {
      galleryGradients.push(`url(${url}) center/cover no-repeat`)
    }
  }

  // Build detailed description from fullDescription (Portable Text) or shortDescription
  const detailedDescription =
    portableTextToPlainText(sanity.fullDescription) || sanity.shortDescription || ''

  // Build specifications from dimensions, material, and brand
  const specifications: Record<string, string> = {}
  if (sanity.dimensions) specifications['Dimensions'] = sanity.dimensions
  if (sanity.material) specifications['Material'] = sanity.material
  if (sanity.brand) specifications['Brand'] = sanity.brand

  // Build shipping info
  const shippingInfo = sanity.shippingInfo
    ? {
        freeShipping: true,
        estimatedDays: '3–7 business days',
        returnPolicy: sanity.shippingInfo,
        trackingAvailable: true,
      }
    : undefined

  // Reviews from customer rating
  const reviews = sanity.customerRating
    ? { rating: sanity.customerRating, count: 0 }
    : undefined

  return {
    id: sanity.slug?.current ?? sanity._id,
    name: sanity.name,
    description: sanity.shortDescription || '',
    tagline: extractTagline(sanity.shortDescription || ''),
    price: sanity.price ?? 0,
    originalPrice: sanity.compareAtPrice ?? undefined,
    currency: 'USD',
    category,
    material: sanity.material ?? undefined,
    mainImage: mainImageUrl ?? undefined,
    galleryImages: galleryUrls.length > 0 ? galleryUrls : undefined,
    gradient: cardBackground,
    galleryGradients: galleryGradients.length > 0 ? galleryGradients : undefined,
    accent,
    featured: sanity.featured ?? false,
    isNew: isRecentlyPublished(sanity.publishedDate),
    isComingSoon: sanity.stockStatus === 'coming-soon' || undefined,
    createdAt: sanity.publishedDate || new Date().toISOString().split('T')[0],
    tags: sanity.tags ?? [],
    features: sanity.features ?? [],
    detailedDescription: detailedDescription || undefined,
    specifications: Object.keys(specifications).length > 0 ? specifications : undefined,
    shippingInfo,
    reviews,
  }
}

/**
 * Map an array of Sanity products.
 */
export function mapSanityProducts(products: SanityProduct[]): Product[] {
  return products.map(mapSanityProduct)
}
