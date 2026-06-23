/* ───────────────────────────────────────────────
   Product Types — THE KYNXZ BRAND Collections
   ─────────────────────────────────────────────── */

/** Category slugs */
export type ProductCategory =
  | "home-living"
  | "pet-essentials"
  | "travel"
  | "lifestyle"
  | "accessories";

export const CATEGORIES: {
  slug: ProductCategory;
  name: string;
  description: string;
  icon: string;
}[] = [
  {
    slug: "home-living",
    name: "Home & Living",
    description: "Curated interiors for timeless spaces",
    icon: "house",
  },
  {
    slug: "pet-essentials",
    name: "Pet Essentials",
    description: "Premium comfort for beloved companions",
    icon: "paw",
  },
  {
    slug: "travel",
    name: "Travel",
    description: "Refined journeys begin with essential companions",
    icon: "compass",
  },
  {
    slug: "lifestyle",
    name: "Lifestyle",
    description: "Everyday elegance, intentionally designed",
    icon: "diamond",
  },
  {
    slug: "accessories",
    name: "Accessories",
    description: "Details that define — refined leather to precious metal",
    icon: "ring",
  },
];

export type SortOption = "featured" | "newest" | "price-low" | "price-high";

/** Shipping & returns information */
export interface ShippingInfo {
  freeShipping: boolean;
  estimatedDays: string;
  returnPolicy: string;

  trackingAvailable?: boolean;
}

/** Individual customer review */
export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  verified: boolean;
}

/** Core Product interface — designed to extend for marketplace data */
export interface Product {
  id: string;
  name: string;
  description: string;
  /** Short tagline shown on card */
  tagline: string;
  /** Display price in USD */
  price: number;
  /** Optional original price for showing discounts */
  originalPrice?: number;
  currency: string;
  category: ProductCategory;
  /** Material composition/type */
  material?: string;
  /** Clean main product image URL (from Sanity mainImage, or undefined if not available) */
  mainImage?: string;
  /** Clean gallery image URLs (from Sanity galleryImages) */
  galleryImages?: string[];
  /** Gradient placeholder used when no product image is available */
  gradient: string;
  /** Additional gradient views for the image gallery */
  galleryGradients?: string[];
  accent: string;
  featured: boolean;
  isNew: boolean;
  isComingSoon?: boolean;

  createdAt: string;
  tags: string[];
  /** Key selling features (shown in detail page) */
  features?: string[];
  /** Extended description for the detail page */
  detailedDescription?: string;
  /** Optional product specifications */
  specifications?: Record<string, string>;
  /** Shipping & returns info */
  shippingInfo?: ShippingInfo;
  /** Optional review data */
  reviews?: { rating: number; count: number; list?: Review[] };
}

/* ═══════════════════════════════════════════════
   NOTE: Products are now fetched dynamically from Sanity CMS
   via /api/products. See sanity/schemaTypes/product.ts for
   the Sanity schema and app/api/products/ for the API route.
   ═══════════════════════════════════════════════ */
