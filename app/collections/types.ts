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

/* ───────────────────────────────────────────────
   Sample luxury products — representing the brand
   aesthetic.
   ─────────────────────────────────────────────── */
export const PRODUCTS: Product[] = [
  // ── Home & Living ──────────────────────────
  {
    id: "hl-001",
    name: "Artisan Ceramic Vessel",
    tagline: "Hand-thrown with intention",
    description: "Each vessel is individually crafted by master potters, featuring a warm matte glaze that catches light like morning mist.",
    detailedDescription: "Each Artisan Ceramic Vessel begins as a lump of local stoneware clay on a master potter's wheel in the hills of Tuscany. Over the course of three days, the piece is thrown, trimmed, bisque-fired, hand-glazed with a proprietary matte finish, and fired again to 1,280°C. The result is a vessel that exists uniquely at the intersection of art and function — a quiet monument to the beauty of imperfection.",
    features: [
      "Hand-thrown by master Tuscan potters with over 20 years of experience",
      "Proprietary warm-tone matte glaze — each piece has a unique finish",
      "Fired at 1,280°C for exceptional durability and food-safe certification",
      "Subtle organic variations in form make every vessel one of a kind",
      "Suitable for dried or fresh floral arrangements as a statement piece",
    ],
    price: 189,
    currency: "USD",
    category: "home-living",
    gradient: `
      linear-gradient(145deg, #1A1612 0%, #2A241E 35%, #3D342C 65%, #1A1612 100%),
      radial-gradient(ellipse at 30% 25%, rgba(214, 207, 199, 0.1), transparent 50%),
      radial-gradient(ellipse at 70% 75%, rgba(139, 115, 85, 0.08), transparent 45%)
    `,
    galleryGradients: [
      `linear-gradient(160deg, #2A241E 0%, #3D342C 30%, #1A1612 60%, #2A241E 100%),radial-gradient(ellipse at 40% 30%, rgba(214,207,199,0.08), transparent 50%),radial-gradient(ellipse at 60% 70%, rgba(139,115,85,0.06), transparent 45%)`,
      `linear-gradient(200deg, #1A1612 0%, #2A241E 40%, #3D342C 100%),radial-gradient(ellipse at 50% 25%, rgba(212,168,79,0.06), transparent 50%),radial-gradient(ellipse at 30% 75%, rgba(214,207,199,0.04), transparent 45%)`,
      `linear-gradient(180deg, #3D342C 0%, #1A1612 35%, #2A241E 100%),radial-gradient(ellipse at 60% 35%, rgba(214,207,199,0.07), transparent 50%),radial-gradient(ellipse at 40% 65%, rgba(139,115,85,0.05), transparent 45%)`,
    ],
    accent: "#D6CFC7",
    featured: true,
    isNew: false,
    createdAt: "2025-12-01",
    tags: ["ceramics", "home-decor", "artisan"],
    specifications: {
      "Material": "Stoneware clay, proprietary matte glaze",
      "Dimensions": "Approx. 22 cm height x 18 cm diameter",
      "Weight": "1.2 kg",
      "Care": "Hand wash with mild soap. Avoid abrasive cleaners.",
      "Origin": "Tuscany, Italy",
      "Firing Temp": "1,280°C",
      "Finish": "Warm ivory matte glaze",
      "Food Safe": "Yes",
    },
    shippingInfo: {
      freeShipping: true,
      estimatedDays: "5-7 business days",
      returnPolicy: "Complimentary returns within 30 days of delivery.",
      trackingAvailable: true,
    },
    reviews: { rating: 4.8, count: 24, list: [
      { id: "rev-1", author: "Elena V.", rating: 5, date: "2026-02-14", title: "A masterpiece on my mantel", content: "The warmth of the glaze changes throughout the day with the light. Every visitor comments on it. Truly a work of art.", verified: true },
      { id: "rev-2", author: "Marcus T.", rating: 5, date: "2026-01-28", title: "Exceptional craftsmanship", content: "You can feel the care in every curve. It arrived beautifully packaged and exceeded every expectation.", verified: true },
      { id: "rev-3", author: "Sophia L.", rating: 4, date: "2026-01-10", title: "Beautiful but delicate", content: "Gorgeous piece. Just be mindful it is ceramic and should be handled with care. The color is even more lovely in person.", verified: true },
    ]},
  },
  {
    id: "hl-002",
    name: "Linen Throw Blanket",
    tagline: "Woven from Belgian flax",
    description: "An heirloom-weight throw in undyed natural linen. Each piece softens beautifully with age, becoming uniquely yours.",
    detailedDescription: "Woven on vintage shuttle looms in a family-owned mill that has operated since 1854, our Linen Throw Blanket represents the pinnacle of textile craftsmanship. The flax is grown in the fields of Flanders, retted in the dew, and spun into a yarn that captures the subtle irregularities that give natural linen its soul. Over years of use, the fibers soften and develop a patina that no machine can replicate.",
    features: [
      "100% Belgian flax linen — stonewashed for immediate softness",
      "Woven on vintage shuttle looms for authentic texture and durability",
      "Undyed, natural ecru shade that complements any interior",
      "Heirloom-weight — 420 GSM for warmth without weight",
      "Grows softer with each wash, developing a unique character",
    ],
    price: 295,
    originalPrice: 350,
    currency: "USD",
    category: "home-living",
    gradient: `
      linear-gradient(160deg, #2C241E 0%, #3D342C 35%, #4A4036 65%, #2C241E 100%),
      radial-gradient(ellipse at 40% 30%, rgba(214, 207, 199, 0.08), transparent 50%),
      radial-gradient(ellipse at 55% 70%, rgba(184, 154, 118, 0.06), transparent 45%)
    `,
    accent: "#B89A76",
    featured: true,
    isNew: false,
    createdAt: "2025-11-15",
    tags: ["textiles", "linen", "home-decor"],
    specifications: {
      "Material": "100% Belgian Linen (European Flax certified)",
      "Dimensions": "150 cm x 200 cm",
      "Weight": "420 GSM",
      "Care": "Machine wash cold, gentle cycle. Tumble dry low.",
      "Origin": "Flanders, Belgium / Woven in Portugal",
      "Weave": "Plain weave, unbleached",
      "Edge Finish": "Hand-fringed edges",
    },
    shippingInfo: {
      freeShipping: true,
      estimatedDays: "3-5 business days",
      returnPolicy: "Complimentary returns within 30 days of delivery.",
      trackingAvailable: true,
    },
    reviews: { rating: 4.8, count: 24, list: [
      { id: "rev-4", author: "Claire D.", rating: 5, date: "2026-02-20", title: "The most beautiful blanket I own", content: "The weight is perfect — warm without being heavy. You can feel the quality in every thread.", verified: true },
      { id: "rev-5", author: "James K.", rating: 5, date: "2026-02-02", title: "A lifetime investment", content: "Already softer after a few washes. This will only get better with age. Exactly what I expected from this brand.", verified: true },
    ]},
  },
  {
    id: "hl-003",
    name: "Obsidian Candle Collection",
    tagline: "Aromatic depth, sculptural form",
    description: "Three hand-poured candles in matte black vessels. Notes of amber, tobacco, and cedar create an atmosphere of quiet sophistication.",
    detailedDescription: "The Obsidian Candle Collection is a study in sensory alchemy. Each of the three candles is hand-poured in small batches using a coconut-soy wax blend selected for its clean, slow burn. The vessels are cast from matte black ceramic with a sculptural ridge detail inspired by volcanic obsidian. The fragrance family — amber, tobacco leaf, and Atlas cedar — was developed in collaboration with a master perfumer in Grasse to evoke the warmth of a library at dusk.",
    features: [
      "Set of three hand-poured candles in sculptural matte black vessels",
      "Coconut-soy wax blend — clean, slow burn with excellent scent throw",
      "Fragrance developed with a master perfumer from Grasse, France",
      "Each candle burns for approximately 55 hours",
      "Vessels designed to be repurposed as small planters or keepsake boxes",
    ],
    price: 126,
    currency: "USD",
    category: "home-living",
    gradient: `
      linear-gradient(180deg, #0A0A0A 0%, #1A1612 40%, #2A241E 100%),
      radial-gradient(ellipse at 45% 35%, rgba(212, 168, 79, 0.06), transparent 50%),
      radial-gradient(ellipse at 60% 65%, rgba(214, 207, 199, 0.04), transparent 45%)
    `,
    accent: "#D4A84F",
    featured: false,
    isNew: true,
    createdAt: "2026-01-10",
    tags: ["candles", "aromatics", "home-decor"],
    specifications: {
      "Wax": "Coconut-soy blend (70% coconut, 30% soy)",
      "Burn Time": "~55 hours per candle",
      "Fragrance Notes": "Top: Bergamot, Black Pepper | Heart: Tobacco Leaf, Amber | Base: Atlas Cedar, Vanilla",
      "Vessel": "Matte black ceramic with ridge detail",
      "Dimensions": "8 cm height x 7 cm diameter",
      "Origin": "Hand-poured in Brooklyn, NY",
      "Wick": "Cotton, lead-free",
    },
    shippingInfo: {
      freeShipping: true,
      estimatedDays: "3-5 business days",
      returnPolicy: "Complimentary returns within 30 days. Candles must be unburned.",
      trackingAvailable: true,
    },
  },

  // ── Pet Essentials ─────────────────────────
  {
    id: "pe-001",
    name: "Italian Leather Collar",
    tagline: "Full-grain, hand-stitched",
    description: "Crafted from the finest Tuscan leather with solid brass hardware. Each collar is hand-stitched and ages to a rich patina.",
    price: 145,
    currency: "USD",
    category: "pet-essentials",
    gradient: `
      linear-gradient(200deg, #1A1612 0%, #2C241E 35%, #3D342C 70%, #1A1612 100%),
      radial-gradient(ellipse at 50% 30%, rgba(214, 207, 199, 0.07), transparent 50%),
      radial-gradient(ellipse at 40% 70%, rgba(184, 154, 118, 0.05), transparent 45%)
    `,
    accent: "#B89A76",
    featured: true,
    isNew: false,
    createdAt: "2025-10-20",
    tags: ["leather", "pets", "accessories"],
  },
  {
    id: "pe-002",
    name: "Memory Foam Pet Bed",
    tagline: "Orthopedic luxury for companions",
    description: "A plush orthopedic bed covered in washable Belgian linen. Designed for maximum comfort with a removable memory foam core.",
    price: 420,
    currency: "USD",
    category: "pet-essentials",
    gradient: `
      linear-gradient(220deg, #2A241E 0%, #1A1612 40%, #3D342C 100%),
      radial-gradient(ellipse at 40% 25%, rgba(214, 207, 199, 0.06), transparent 50%),
      radial-gradient(ellipse at 60% 75%, rgba(139, 115, 85, 0.05), transparent 45%)
    `,
    accent: "#D6CFC7",
    featured: false,
    isNew: true,
    createdAt: "2026-01-05",
    tags: ["pets", "beds", "linen"],
  },
  {
    id: "pe-003",
    name: "Leash & Waste Bag Holder",
    tagline: "Polished brass, woven leather",
    description: "A refined leash set with a brass waste bag dispenser. The braided leather handle feels as luxurious as it looks.",
    price: 98,
    currency: "USD",
    category: "pet-essentials",
    gradient: `
      linear-gradient(180deg, #1A1612 0%, #3D342C 40%, #2A241E 100%),
      radial-gradient(ellipse at 50% 35%, rgba(184, 154, 118, 0.06), transparent 50%),
      radial-gradient(ellipse at 50% 65%, rgba(214, 207, 199, 0.04), transparent 45%)
    `,
    accent: "#B89A76",
    featured: false,
    isNew: false,
    createdAt: "2025-09-15",
    tags: ["pets", "leather", "accessories"],
  },

  // ── Travel ─────────────────────────────────
  {
    id: "tr-001",
    name: "Waxed Canvas Duffel",
    tagline: "Built for a lifetime of journeys",
    description: "A spacious duffel in weatherproof waxed canvas with full-grain leather trim. Brass hardware and a removable shoulder strap.",
    price: 580,
    currency: "USD",
    category: "travel",
    gradient: `
      linear-gradient(160deg, #1A1612 0%, #2A241E 30%, #3D342C 60%, #1A1612 100%),
      radial-gradient(ellipse at 30% 25%, rgba(214, 207, 199, 0.08), transparent 50%),
      radial-gradient(ellipse at 70% 65%, rgba(139, 115, 85, 0.06), transparent 45%)
    `,
    accent: "#D6CFC7",
    featured: true,
    isNew: false,
    createdAt: "2025-11-01",
    tags: ["luggage", "canvas", "leather", "travel"],
    reviews: { rating: 4.9, count: 18 },
  },
  {
    id: "tr-002",
    name: "Horween Leather Passport Case",
    tagline: "Aged Chicago leather, refined form",
    description: "Handcrafted from premium Horween Chromexcel leather. Holds passport, cards, and boarding pass in understated elegance.",
    price: 175,
    currency: "USD",
    category: "travel",
    gradient: `
      linear-gradient(200deg, #2A241E 0%, #1A1612 35%, #3D342C 70%, #1A1612 100%),
      radial-gradient(ellipse at 60% 25%, rgba(184, 154, 118, 0.07), transparent 50%),
      radial-gradient(ellipse at 30% 75%, rgba(214, 207, 199, 0.05), transparent 45%)
    `,
    accent: "#B89A76",
    featured: true,
    isNew: false,
    createdAt: "2025-10-05",
    tags: ["leather", "travel", "accessories"],
  },
  {
    id: "tr-003",
    name: "Silk Travel Sleep Set",
    tagline: "Rest, anywhere",
    description: "A mulberry silk eye mask and pillow case set in a hand-stitched pouch. Designed for restorative sleep at altitude.",
    price: 210,
    currency: "USD",
    category: "travel",
    gradient: `
      linear-gradient(180deg, #1A1612 0%, #2A241E 40%, #3D342C 100%),
      radial-gradient(ellipse at 40% 30%, rgba(214, 207, 199, 0.06), transparent 50%),
      radial-gradient(ellipse at 60% 70%, rgba(212, 168, 79, 0.04), transparent 45%)
    `,
    accent: "#D4A84F",
    featured: false,
    isNew: true,
    createdAt: "2026-01-15",
    tags: ["travel", "silk", "sleep"],
  },

  // ── Lifestyle ──────────────────────────────
  {
    id: "ls-001",
    name: "Japanese Brass Pen",
    tagline: "Machined with precision",
    description: "Turned from solid brass on a century-old Japanese lathe. The weight in hand is deliberate, the writing effortless.",
    price: 165,
    currency: "USD",
    category: "lifestyle",
    gradient: `
      linear-gradient(220deg, #1A1612 0%, #2A241E 35%, #3D342C 65%, #1A1612 100%),
      radial-gradient(ellipse at 40% 20%, rgba(212, 168, 79, 0.08), transparent 50%),
      radial-gradient(ellipse at 60% 80%, rgba(214, 207, 199, 0.05), transparent 45%)
    `,
    accent: "#D4A84F",
    featured: true,
    isNew: false,
    createdAt: "2025-12-10",
    tags: ["stationery", "brass", "writing"],
  },
  {
    id: "ls-002",
    name: "Leather Desk Pad",
    tagline: "Full-grain, hand-stitched",
    description: "A spacious desk pad in cognac pull-up leather. Develops a rich patina with use — a daily companion for meaningful work.",
    price: 340,
    currency: "USD",
    category: "lifestyle",
    gradient: `
      linear-gradient(180deg, #2A241E 0%, #3D342C 35%, #4A4036 70%, #2A241E 100%),
      radial-gradient(ellipse at 45% 25%, rgba(214, 207, 199, 0.07), transparent 50%),
      radial-gradient(ellipse at 55% 75%, rgba(184, 154, 118, 0.05), transparent 45%)
    `,
    accent: "#D6CFC7",
    featured: true,
    isNew: false,
    createdAt: "2025-11-20",
    tags: ["leather", "desk", "office"],
  },
  {
    id: "ls-003",
    name: "Amber Whiskey Glasses",
    tagline: "Hand-blown, set of two",
    description: "Each glass is mouth-blown by artisans in Poland. The warm amber tint catches firelight, transforming every pour into a ritual.",
    price: 195,
    currency: "USD",
    category: "lifestyle",
    gradient: `
      linear-gradient(160deg, #1A1612 0%, #2A241E 40%, #3D342C 100%),
      radial-gradient(ellipse at 50% 30%, rgba(212, 168, 79, 0.07), transparent 50%),
      radial-gradient(ellipse at 50% 70%, rgba(214, 207, 199, 0.04), transparent 45%)
    `,
    accent: "#D4A84F",
    featured: false,
    isNew: true,
    createdAt: "2026-01-20",
    tags: ["glassware", "barware", "artisan"],
  },

  // ── Accessories ────────────────────────────
  {
    id: "ac-001",
    name: "Brass Valet Tray",
    tagline: "Where essentials rest",
    description: "A cast-brass tray for your daily carry. Naturally develops a warm patina, growing more character with each day's use.",
    price: 85,
    currency: "USD",
    category: "accessories",
    gradient: `
      linear-gradient(160deg, #1A1612 0%, #2A241E 35%, #3D342C 65%, #1A1612 100%),
      radial-gradient(ellipse at 30% 30%, rgba(212, 168, 79, 0.08), transparent 50%),
      radial-gradient(ellipse at 70% 60%, rgba(214, 207, 199, 0.05), transparent 45%)
    `,
    accent: "#D4A84F",
    featured: true,
    isNew: false,
    createdAt: "2025-12-15",
    tags: ["brass", "organizer", "accessories"],
  },
  {
    id: "ac-002",
    name: "Woven Leather Belt",
    tagline: "Italian leather, artisanal weave",
    description: "Hand-woven from strips of the finest Italian calfskin. The brushed stainless buckle is etched with a discreet K monogram.",
    price: 230,
    currency: "USD",
    category: "accessories",
    gradient: `
      linear-gradient(200deg, #2A241E 0%, #1A1612 35%, #3D342C 70%, #1A1612 100%),
      radial-gradient(ellipse at 50% 25%, rgba(184, 154, 118, 0.07), transparent 50%),
      radial-gradient(ellipse at 40% 75%, rgba(214, 207, 199, 0.05), transparent 45%)
    `,
    accent: "#B89A76",
    featured: false,
    isNew: true,
    createdAt: "2026-01-08",
    tags: ["leather", "belt", "woven", "accessories"],
  },
  {
    id: "ac-003",
    name: "Cashmere Scarf",
    tagline: "Inner Mongolia, pure camel hair",
    description: "Woven from the finest Grade A baby camel hair. Exceptionally warm, remarkably lightweight — an understated statement of refined taste.",
    price: 380,
    currency: "USD",
    category: "accessories",
    gradient: `
      linear-gradient(180deg, #1A1612 0%, #2A241E 40%, #3D342C 100%),
      radial-gradient(ellipse at 45% 30%, rgba(214, 207, 199, 0.06), transparent 50%),
      radial-gradient(ellipse at 55% 70%, rgba(139, 115, 85, 0.04), transparent 45%)
    `,
    accent: "#D6CFC7",
    featured: true,
    isNew: false,
    createdAt: "2025-10-25",
    tags: ["cashmere", "scarf", "accessories", "winter"],
  },
];

/** Get products by category */
export function getProductsByCategory(category: ProductCategory): Product[] {
  return PRODUCTS.filter((p) => p.category === category && !p.isComingSoon);
}

/** Get all featured products */
export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter((p) => p.featured);
}

/** Get all new products */
export function getNewProducts(): Product[] {
  return PRODUCTS.filter((p) => p.isNew);
}

/** Filter products by search query */
export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase();
  return PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.tagline.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
  );
}

/** Sort products by a given option */
export function sortProducts(products: Product[], sort: SortOption): Product[] {
  const sorted = [...products];
  switch (sort) {
    case "featured":
      return sorted.sort((a, b) => (a.featured === b.featured ? 0 : a.featured ? -1 : 1));
    case "newest":
      return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    case "price-low":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-high":
      return sorted.sort((a, b) => b.price - a.price);
    default:
      return sorted;
  }
}
