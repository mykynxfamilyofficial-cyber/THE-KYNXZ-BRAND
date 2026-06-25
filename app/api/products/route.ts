import { NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'
import { ALL_PRODUCTS_QUERY, FEATURED_PRODUCTS_QUERY } from '@/sanity/lib/queries'
import { mapSanityProducts, type SanityProduct } from './mapProduct'

/**
 * GET /api/products
 *
 * Returns all published products from Sanity, mapped to the app's Product interface.
 * Supports optional query parameter ?featured=true to return only featured products.
 *
 * Uses Sanity CDN caching (useCdn: true) + ISR revalidation via next: { revalidate }.
 * SWR (stale-while-revalidate) via HTTP Cache-Control headers.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const featuredOnly = searchParams.get('featured') === 'true'

  try {
    const query = featuredOnly ? FEATURED_PRODUCTS_QUERY : ALL_PRODUCTS_QUERY
    const sanityProducts: SanityProduct[] = await client.fetch(
      query,
      {},
      {
        next: {
          revalidate: 60, // ISR: revalidate every 60 seconds
        },
      }
    )

    const products = mapSanityProducts(sanityProducts)

    return NextResponse.json(
      { products },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, max-age=30, stale-while-revalidate=300',
        },
      }
    )
  } catch (error) {
    console.error('Failed to fetch products from Sanity:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products', products: [] },
      { status: 500 }
    )
  }
}
