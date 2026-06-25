import { NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'
import { PRODUCT_BY_SLUG_QUERY } from '@/sanity/lib/queries'
import { mapSanityProduct, type SanityProduct } from '../mapProduct'

/**
 * GET /api/products/[slug]
 *
 * Returns a single product from Sanity by its slug.
 * Uses ISR with 5-minute revalidation and stale-while-revalidate.
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params

  if (!slug) {
    return NextResponse.json(
      { error: 'Product slug is required', product: null },
      { status: 400 }
    )
  }

  try {
    const sanityProduct: SanityProduct | null = await client.fetch(
      PRODUCT_BY_SLUG_QUERY,
      { slug },
      {
        next: {
          revalidate: 300, // ISR: revalidate every 5 minutes
        },
      }
    )

    if (!sanityProduct) {
      return NextResponse.json(
        { error: 'Product not found', product: null },
        { status: 404 }
      )
    }

    const product = mapSanityProduct(sanityProduct)

    return NextResponse.json(
      { product },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, max-age=60, stale-while-revalidate=600',
        },
      }
    )
  } catch (error) {
    console.error(`Failed to fetch product "${slug}" from Sanity:`, error)
    return NextResponse.json(
      { error: 'Failed to fetch product', product: null },
      { status: 500 }
    )
  }
}
