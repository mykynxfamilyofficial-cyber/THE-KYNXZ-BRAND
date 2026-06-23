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
 * Revalidation: ISR via next: { revalidate: 60 } on the fetch.
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
          revalidate: 0, // Always fetch fresh data from Sanity
        },
      }
    )

    const products = mapSanityProducts(sanityProducts)

    return NextResponse.json({ products }, { status: 200 })
  } catch (error) {
    console.error('Failed to fetch products from Sanity:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products', products: [] },
      { status: 500 }
    )
  }
}
