import { defineQuery } from 'next-sanity'

/**
 * All published products, ordered by featured first, then by published date descending.
 * Includes image references for mainImage and galleryImages.
 */
export const ALL_PRODUCTS_QUERY = defineQuery(`
  *[_type == "product" && defined(slug.current)] | order(featured desc, publishedDate desc) {
    _id,
    name,
    slug,
    shortDescription,
    fullDescription,
    category,
    featured,
    tags,
    price,
    compareAtPrice,
    stockStatus,
    sku,
    mainImage {
      asset->{ _id },
      hotspot,
      crop
    },
    galleryImages[] {
      asset->{ _id },
      hotspot,
      crop
    },
    dimensions,
    material,
    features,
    brand,
    customerRating,
    shippingInfo,
    publishedDate
  }
`)

/**
 * A single product by its slug.
 */
export const PRODUCT_BY_SLUG_QUERY = defineQuery(`
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    shortDescription,
    fullDescription,
    category,
    featured,
    tags,
    price,
    compareAtPrice,
    stockStatus,
    sku,
    mainImage {
      asset->{ _id },
      hotspot,
      crop
    },
    galleryImages[] {
      asset->{ _id },
      hotspot,
      crop
    },
    dimensions,
    material,
    features,
    brand,
    customerRating,
    shippingInfo,
    publishedDate
  }
`)

/**
 * Products filtered by category.
 */
export const PRODUCTS_BY_CATEGORY_QUERY = defineQuery(`
  *[_type == "product" && category == $category && defined(slug.current)] | order(featured desc, publishedDate desc) {
    _id,
    name,
    slug,
    shortDescription,
    fullDescription,
    category,
    featured,
    tags,
    price,
    compareAtPrice,
    stockStatus,
    sku,
    mainImage {
      asset->{ _id },
      hotspot,
      crop
    },
    galleryImages[] {
      asset->{ _id },
      hotspot,
      crop
    },
    dimensions,
    material,
    features,
    brand,
    customerRating,
    shippingInfo,
    publishedDate
  }
`)

/**
 * Featured products.
 */
export const FEATURED_PRODUCTS_QUERY = defineQuery(`
  *[_type == "product" && featured == true && defined(slug.current)] | order(publishedDate desc) {
    _id,
    name,
    slug,
    shortDescription,
    fullDescription,
    category,
    featured,
    tags,
    price,
    compareAtPrice,
    stockStatus,
    sku,
    mainImage {
      asset->{ _id },
      hotspot,
      crop
    },
    galleryImages[] {
      asset->{ _id },
      hotspot,
      crop
    },
    dimensions,
    material,
    features,
    brand,
    customerRating,
    shippingInfo,
    publishedDate
  }
`)
