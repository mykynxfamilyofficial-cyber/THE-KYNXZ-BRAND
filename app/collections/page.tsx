"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import Link from "next/link";
import { playfair, cormorant, inter } from "../fonts";
import Header from "../components/Header";
import FooterSection from "../components/FooterSection";
import NewsletterSection from "../components/NewsletterSection";
import {
  Product,
  ProductCategory,
  SortOption,
  CATEGORIES,
} from "./types";

import { useTheme } from "../hooks/useTheme";
import type { ThemeColors } from "../hooks/useTheme";

const heroLines = [["Curated"], ["Worlds"]];

/* ───────────────────────────────────────────────
   Auto-rotating image carousel for product cards
   - No visible navigation arrows
   - Auto-rotates every 4 seconds
   - Pauses on hover
   - CSS-only crossfade transitions
   ─────────────────────────────────────────────── */
function CardImageCarousel({ product }: { product: Product }) {
  const images = useMemo(
    () => [product.gradient, ...(product.galleryGradients || [])],
    [product]
  );
  const totalImages = images.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (totalImages <= 1) return;
    if (!isHovering) {
      intervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % totalImages);
      }, 4000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovering, totalImages]);

  useEffect(() => {
    setActiveIndex(0);
  }, [product.id]);

  const bgStyle = useMemo(() => {
    const bg = images[activeIndex];
    const isImageUrl = bg.startsWith("url(");
    return {
      background: bg,
      backgroundSize: isImageUrl ? "contain" : "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    };
  }, [images, activeIndex]);

  const neutralBg = "var(--color-surface)";

  return (
    <div
      className="absolute inset-0"
      style={{ background: neutralBg }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div
        key={activeIndex}
        className="absolute inset-0 transition-opacity duration-700"
        style={bgStyle}
      />
    </div>
  );
}

/* ───────────────────────────────────────────────
   ProductCard – Luxury product card component
   ─────────────────────────────────────────────── */
function ProductCard({
  product,
  C,
}: {
  product: Product;
  C: ThemeColors;
}) {
  return (
    <div className="h-full">
      <Link
        href={`/collections/${product.id}`}
        className="luxury-product-card group relative block rounded-[2px] overflow-hidden h-full flex flex-col"
        style={{
          border: "1px solid var(--color-border)",
          background: C.surface,
        }}
      >
        <div className="relative overflow-hidden aspect-[4/3] shrink-0">
          <CardImageCarousel product={product} />

          <div className="absolute top-3 left-3 flex gap-2 z-10">
            {product.featured && (
              <span
                className="text-[8px] tracking-[0.2em] uppercase px-3 py-1.5 rounded-full border backdrop-blur-sm"
                style={{
                  borderColor: product.accent,
                  color: product.accent,
                  background: "rgba(0,0,0,0.4)",
                }}
              >
                Featured
              </span>
            )}
            {product.isNew && (
              <span
                className="text-[8px] tracking-[0.2em] uppercase px-3 py-1.5 rounded-full border backdrop-blur-sm"
                style={{
                  borderColor: product.accent,
                  color: product.accent,
                  background: "rgba(0,0,0,0.4)",
                }}
              >
                New
              </span>
            )}
          </div>

          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-10">
            <span
              className="inline-flex items-center gap-1.5 text-[8px] tracking-[0.2em] uppercase px-3 py-1.5 rounded-full border backdrop-blur-sm"
              style={{
                borderColor: product.accent,
                color: "#fff",
                background: "rgba(0,0,0,0.4)",
              }}
            >
              View Details
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              >
                <path d="M3 1L7 5L3 9" />
              </svg>
            </span>
          </div>
        </div>

        <div className="p-5 md:p-6 space-y-3 flex-1 flex flex-col">
          <h3
            className={`${playfair.className} text-lg md:text-xl font-bold leading-[1.2] tracking-[0.02em] line-clamp-2`}
            style={{ color: C.ivory }}
          >
            {product.name}
          </h3>

          <p
            className={`${inter.className} text-xs tracking-[0.15em] uppercase`}
            style={{ color: C.bronze }}
          >
            {product.tagline}
          </p>

          <p
            className={`${inter.className} text-sm leading-[1.7] line-clamp-2 flex-1`}
            style={{ color: C.muted }}
          >
            {product.description}
          </p>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-baseline gap-2">
              <span
                className={`${playfair.className} text-lg font-bold`}
                style={{ color: C.ivory }}
              >
                ${product.price}
              </span>
              {product.originalPrice && (
                <span
                  className="text-xs line-through"
                  style={{ color: C.muted }}
                >
                  ${product.originalPrice}
                </span>
              )}
              <span className="text-[9px] tracking-[0.12em] uppercase" style={{ color: C.muted }}>
                USD
              </span>
            </div>

            {product.reviews && (
              <div className="flex items-center gap-1.5">
                <svg width="12" height="12" viewBox="0 0 12 12" fill={product.accent} opacity="0.6">
                  <path d="M6 1L7.5 4.5L11 5L8.5 7.5L9 11L6 9L3 11L3.5 7.5L1 5L4.5 4.5L6 1Z" />
                </svg>
                <span className="text-[10px] tracking-[0.05em]" style={{ color: C.muted }}>
                  {product.reviews.rating} ({product.reviews.count})
                </span>
              </div>
            )}
          </div>

          <div
            className="h-px w-8 transition-all duration-500 group-hover:w-full"
            style={{
              background: `linear-gradient(to right, ${product.accent}, transparent)`,
              opacity: 0.3,
            }}
          />

          <p
            className="text-[9px] tracking-[0.25em] uppercase opacity-0 transition-all duration-500 group-hover:opacity-50 pt-1"
            style={{ color: product.accent }}
          >
            Inquire about this piece &rarr;
          </p>
        </div>
      </Link>
    </div>
  );
}

/* ───────────────────────────────────────────────
   ComingSoonCard
   ─────────────────────────────────────────────── */
function ComingSoonCard({
  category,
  C,
}: {
  category: (typeof CATEGORIES)[0];
  C: ThemeColors;
}) {
  return (
    <div
      className="luxury-coming-soon relative rounded-[2px] overflow-hidden p-8 md:p-10 text-center cursor-default"
      style={{
        border: "1px solid var(--color-border)",
        background: C.surface,
      }}
    >
      <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center">
        <div
          className="w-full h-full rounded-full flex items-center justify-center"
          style={{
            background: `radial-gradient(circle at 40% 35%, ${C.bronze}20, transparent 70%)`,
          }}
        >
          <div className="w-10 h-10 opacity-40">
            {category.icon === "house" && (
              <svg viewBox="0 0 60 60">
                <polygon points="30,6 6,28 12,28 12,52 24,52 24,38 36,38 36,52 48,52 48,28 54,28" fill="none" stroke={C.champagne} strokeWidth="0.8" />
                <rect x="24" y="24" width="12" height="10" fill="none" stroke={C.champagne} strokeWidth="0.6" />
              </svg>
            )}
            {category.icon === "paw" && (
              <svg viewBox="0 0 60 60">
                <circle cx="20" cy="18" r="6" fill="none" stroke={C.champagne} strokeWidth="0.7" />
                <circle cx="40" cy="18" r="6" fill="none" stroke={C.champagne} strokeWidth="0.7" />
                <circle cx="12" cy="32" r="7" fill="none" stroke={C.champagne} strokeWidth="0.7" />
                <circle cx="48" cy="32" r="7" fill="none" stroke={C.champagne} strokeWidth="0.7" />
                <ellipse cx="30" cy="40" rx="14" ry="10" fill="none" stroke={C.champagne} strokeWidth="0.7" />
              </svg>
            )}
            {category.icon === "compass" && (
              <svg viewBox="0 0 60 60">
                <circle cx="30" cy="30" r="22" fill="none" stroke={C.champagne} strokeWidth="0.7" />
                <circle cx="30" cy="30" r="16" fill="none" stroke={C.champagne} strokeWidth="0.4" strokeDasharray="2 3" />
                <polygon points="30,8 26,30 30,52 34,30" fill="none" stroke={C.champagne} strokeWidth="0.7" />
                <polygon points="8,30 30,26 52,30 30,34" fill="none" stroke={C.champagne} strokeWidth="0.7" />
              </svg>
            )}
            {category.icon === "diamond" && (
              <svg viewBox="0 0 60 60">
                <polygon points="30,4 52,30 30,56 8,30" fill="none" stroke={C.champagne} strokeWidth="0.7" />
                <polygon points="30,12 44,30 30,48 16,30" fill="none" stroke={C.champagne} strokeWidth="0.4" strokeDasharray="2 3" />
              </svg>
            )}
            {category.icon === "ring" && (
              <svg viewBox="0 0 60 60">
                <circle cx="30" cy="22" r="14" fill="none" stroke={C.champagne} strokeWidth="0.7" />
                <circle cx="30" cy="22" r="10" fill="none" stroke={C.champagne} strokeWidth="0.4" strokeDasharray="1.5 3" />
                <rect x="26" y="32" width="8" height="20" rx="3" fill="none" stroke={C.champagne} strokeWidth="0.6" />
              </svg>
            )}
          </div>
        </div>
      </div>

      <h3
        className={`${playfair.className} text-2xl md:text-3xl font-bold mb-3`}
        style={{ color: C.ivory }}
      >
        {category.name}
      </h3>

      <p
        className={`${inter.className} text-sm leading-[1.7] max-w-xs mx-auto`}
        style={{ color: C.muted }}
      >
        {category.description}
      </p>

      <div className="mt-6">
        <span
          className={`${inter.className} inline-block text-xs tracking-[0.25em] uppercase font-semibold`}
          style={{ color: C.bronze }}
        >
          Coming Soon
        </span>
      </div>

      <div
        className="mx-auto mt-4 w-1.5 h-1.5 rounded-full"
        style={{ background: C.bronze, opacity: 0.3 }}
      />
    </div>
  );
}

/* ───────────────────────────────────────────────
   FilterBar – Search, category filter, sort
   ─────────────────────────────────────────────── */
function FilterBar({
  searchQuery,
  onSearchChange,
  activeCategory,
  onCategoryChange,
  sortOption,
  onSortChange,
  resultCount,
  C,
}: {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  activeCategory: ProductCategory | "all";
  onCategoryChange: (cat: ProductCategory | "all") => void;
  sortOption: SortOption;
  onSortChange: (sort: SortOption) => void;
  resultCount: number;
  C: ThemeColors;
}) {
  const [scrolled, setScrolled] = useState(
    typeof window !== "undefined" ? window.scrollY > 80 : false
  );

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`sticky z-30 transition-all duration-500 ${
        scrolled ? "top-0 shadow-lg" : "top-0"
      }`}
      style={{
        background: scrolled ? C.bgAlt : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
      }}
    >
      <div className="max-w-[1400px] mx-auto px-6 py-4 md:py-5">
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
          <div className="flex flex-col sm:flex-row gap-3 flex-1">
            <div className="relative flex-1 max-w-md">
              <svg
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                viewBox="0 0 16 16"
                fill="none"
                stroke={C.muted}
                strokeWidth="1.2"
                strokeLinecap="round"
              >
                <circle cx="7" cy="7" r="5" />
                <path d="M11 11L15 15" />
              </svg>
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="luxury-filter-input w-full pl-10 pr-4 py-2.5 rounded-full text-sm border bg-transparent"
                style={{
                  borderColor: "var(--color-border)",
                  color: C.ivory,
                }}
              />
            </div>

            <div className="flex flex-wrap gap-2 items-center">
              <button
                type="button"
                onClick={() => onCategoryChange("all")}
                className={`luxury-filter-btn px-4 py-2 rounded-full text-[10px] tracking-[0.18em] uppercase border transition-all duration-300 ${
                  activeCategory === "all" ? "luxury-filter-btn-active" : ""
                }`}
                style={{
                  borderColor: "var(--color-border)",
                  color: activeCategory === "all" ? "#fff" : C.muted,
                  background: activeCategory === "all" ? "var(--color-accent)" : "transparent",
                }}
              >
                All
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.slug}
                  type="button"
                  onClick={() => onCategoryChange(cat.slug)}
                  className={`luxury-filter-btn px-4 py-2 rounded-full text-[10px] tracking-[0.18em] uppercase border transition-all duration-300 whitespace-nowrap ${
                    activeCategory === cat.slug ? "luxury-filter-btn-active" : ""
                  }`}
                  style={{
                    borderColor: "var(--color-border)",
                    color: activeCategory === cat.slug ? "#fff" : C.muted,
                    background: activeCategory === cat.slug ? "var(--color-accent)" : "transparent",
                  }}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span
              className="text-[10px] tracking-[0.15em] whitespace-nowrap"
              style={{ color: C.muted }}
            >
              {resultCount} {resultCount === 1 ? "piece" : "pieces"}
            </span>

            <div className="relative">
              <select
                value={sortOption}
                onChange={(e) => onSortChange(e.target.value as SortOption)}
                className="luxury-sort-select text-[10px] tracking-[0.15em] uppercase py-2.5 pl-4 pr-9 rounded-full border bg-transparent"
                style={{
                  borderColor: "var(--color-border)",
                  color: C.ivory,
                }}
                aria-label="Sort by"
              >
                <option value="featured" style={{ background: C.bg, color: C.ivory }}>Featured</option>
                <option value="newest" style={{ background: C.bg, color: C.ivory }}>Newest</option>
                <option value="price-low" style={{ background: C.bg, color: C.ivory }}>Price: Low</option>
                <option value="price-high" style={{ background: C.bg, color: C.ivory }}>Price: High</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   SECTION 1 – Cinematic Hero
   ═══════════════════════════════════════════════ */
function CollectionsHero({ C }: { C: ThemeColors }) {
  return (
    <section className="min-h-[45dvh] pt-20 md:pt-24 lg:min-h-[70dvh] lg:pt-0 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-[0.05]"
          style={{ background: "radial-gradient(circle at center, #D6CFC7, transparent 65%)", filter: "blur(100px)" }}
        />
        <div
          className="absolute top-[55%] right-[10%] w-[400px] h-[400px] rounded-full opacity-[0.03]"
          style={{ background: "radial-gradient(circle at center, #4A3A2C, transparent 60%)", filter: "blur(80px)" }}
        />
        <div
          className="absolute top-[15%] left-[5%] w-[350px] h-[350px] rounded-full opacity-[0.025]"
          style={{ background: "radial-gradient(circle at center, #F5F2ED, transparent 60%)", filter: "blur(70px)" }}
        />
        <div
          className="absolute top-[25%] right-[8%] w-[280px] h-[280px] opacity-[0.015]"
          style={{ border: "1px solid rgba(214, 207, 199, 0.25)", borderRadius: "45% 55% 40% 60% / 50% 42% 58% 48%" }}
        />
        <div
          className="absolute bottom-[30%] left-[12%] w-[200px] h-[200px] opacity-[0.012]"
          style={{ border: "1px solid rgba(214, 207, 199, 0.15)", borderRadius: "55% 45% 60% 40% / 45% 55% 45% 55%" }}
        />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 text-center">
        <p
          className={`${inter.className} text-xs tracking-[0.25em] uppercase mb-8`}
          style={{ color: C.bronze }}
        >
          THE KYNXZ BRAND Collections
        </p>

        <h1
          className={`${playfair.className} text-[clamp(3rem,12vw,8rem)] font-bold leading-[1.05] tracking-[-0.02em]`}
          style={{ color: C.ivory }}
        >
          {heroLines.map((line, lineIdx) => (
            <div key={lineIdx} className="">
              {line.map((word, wordIdx) => (
                <span
                  key={wordIdx}
                  className="inline-block mr-[0.3em] last:mr-0"
                >
                  {word}
                </span>
              ))}
            </div>
          ))}
        </h1>

        <p
          className={`${cormorant.className} mt-8 text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto leading-relaxed italic font-light`}
          style={{ color: C.champagne }}
        >
          &ldquo;A collection of objects chosen not merely for utility, but for meaning.&rdquo;
        </p>

        <div className="mt-10 flex items-center justify-center gap-4">
          <span className="block w-16 h-px" style={{ background: C.bronze }} />
          <span className={`${cormorant.className} italic text-sm`} style={{ color: C.champagne }}>Mindfully Curated</span>
          <span className="block w-16 h-px" style={{ background: C.bronze }} />
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: `linear-gradient(to bottom, transparent, ${C.bg})` }}
      />
    </section>
  );
}

/* ═══════════════════════════════════════════════
   SECTION 2 – Product Grid with Filters
   ═══════════════════════════════════════════════ */
function ProductGrid({ C }: { C: ThemeColors }) {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<ProductCategory | "all">("all");
  const [sortOption, setSortOption] = useState<SortOption>("featured");

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data.products || []);
      })
      .catch((err) => {
        console.error("Failed to fetch products:", err);
      });
  }, []);

  const visibleProducts = useMemo(() => {
    let result =
      activeCategory === "all"
        ? [...allProducts]
        : allProducts.filter((p) => p.category === activeCategory && !p.isComingSoon);

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = allProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
      if (activeCategory !== "all") {
        result = result.filter((p) => p.category === activeCategory);
      }
    }

    const sorted = [...result];
    switch (sortOption) {
      case "featured":
        sorted.sort((a, b) => (a.featured === b.featured ? 0 : a.featured ? -1 : 1));
        break;
      case "newest":
        sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case "price-low":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        sorted.sort((a, b) => b.price - a.price);
        break;
    }
    return sorted;
  }, [searchQuery, activeCategory, sortOption, allProducts]);

  const categoriesWithoutProducts = useMemo(() => {
    return CATEGORIES.filter((cat) => {
      if (searchQuery.trim()) return false;
      return allProducts.filter((p) => p.category === cat.slug && !p.isComingSoon).length === 0;
    });
  }, [searchQuery, allProducts]);

  return (
    <section
      id="collections-grid"
      className="collections-storefront-section relative overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[12%] -translate-x-1/2 rounded-full
        h-[400px] w-[1100px] bg-[radial-gradient(circle_at_center,#EDE9E2/40,#F3F1EC/15,transparent)] blur-3xl"
      />

      <div className="max-w-[1400px] mx-auto px-6 pt-4 md:pt-5 lg:pt-6 pb-4 md:pb-5">
        <div className="text-center max-w-3xl mx-auto">
          <p className={`${inter.className} text-xs tracking-[0.25em] uppercase mb-4`} style={{ color: C.bronze }}>
            Browse Our Collection
          </p>
          <h2 className={`${playfair.className} text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.08]`} style={{ color: C.ivory }}>
            Objects of{" "}
            <span className="italic font-normal" style={{ color: C.champagne }}>intention</span>
          </h2>
          <div className="mx-auto mt-6 w-24 h-px" style={{ background: C.bronze, opacity: 0.5 }} />
        </div>
      </div>

      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        sortOption={sortOption}
        onSortChange={setSortOption}
        resultCount={visibleProducts.length}
        C={C}
      />

      <div className="max-w-[1400px] mx-auto px-6 pt-4 md:pt-5 pb-10 md:pb-12 lg:pb-14">
        {visibleProducts.length > 0 ? (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6"
          >
            {visibleProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                C={C}
              />
            ))}
          </div>
        ) : (
          <div className="luxury-empty-state text-center py-12 md:py-14">
            <div
              className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
              style={{ background: `radial-gradient(circle at 40% 35%, ${C.bronze}15, transparent 70%)` }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={C.muted} strokeWidth="1" strokeLinecap="round">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21L16.65 16.65" />
                <path d="M8 11H14" />
                <path d="M11 8V14" />
              </svg>
            </div>
            <p className={`${playfair.className} text-2xl md:text-3xl font-bold mb-3`} style={{ color: C.ivory }}>
              No pieces found
            </p>
            <p className={`${inter.className} text-sm max-w-md mx-auto leading-relaxed`} style={{ color: C.muted }}>
              {searchQuery
                ? `No results for "${searchQuery}". Try a different search term or browse all collections.`
                : "This collection is being curated. New pieces will arrive soon."}
            </p>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full border text-[10px] tracking-[0.2em] uppercase transition-all duration-300 hover:-translate-y-0.5"
                style={{ borderColor: "var(--color-border)", color: C.champagne }}
              >
                Clear Search
              </button>
            )}
          </div>
        )}

        {categoriesWithoutProducts.length > 0 && (
          <div className="mt-10 md:mt-12">
            <div className="text-center mb-6">
              <div className="mx-auto mb-6 w-12 h-px" style={{ background: C.bronze, opacity: 0.4 }} />
              <h3 className={`${playfair.className} text-xl md:text-2xl font-bold`} style={{ color: C.ivory }}>
                Coming Collections
              </h3>
              <p className={`${inter.className} mt-2 text-sm`} style={{ color: C.muted }}>
                New categories being curated for you
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {categoriesWithoutProducts.slice(0, 3).map((cat) => (
                <ComingSoonCard key={cat.slug} category={cat} C={C} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   PAGE COMPOSITION
   ═══════════════════════════════════════════════ */
export default function CollectionsPage() {
  const C = useTheme();

  useEffect(() => {
    document.title = "Collections | THE KYNXZ BRAND";
  }, []);

  return (
    <>
      <Header />

      <main
        role="main"
        aria-label="Collections page"
        className={`${inter.variable} ${playfair.variable} ${cormorant.variable}`}
        style={{
          fontFamily: "var(--font-inter), Arial, sans-serif",
          background: C.bg,
          overflow: "hidden",
        }}
      >
        <CollectionsHero C={C} />
        <ProductGrid C={C} />

      </main>

      <NewsletterSection />
      <FooterSection />

    </>
  );
}
