"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";
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
  PRODUCTS,
  getProductsByCategory,
  searchProducts,
  sortProducts,
} from "./types";

/* ───────────────────────────────────────────────
   Theme-aware color tokens
   ─────────────────────────────────────────────── */
const THEME = {
  dark: {
    bg: "#0A0A0A",
    bgAlt: "#111111",
    warm: "#1B1610",
    champagne: "#D6CFC7",
    bronze: "#8B7355",
    ivory: "#F5F2ED",
    muted: "#B8B3AA",
    surface: "rgba(255,255,255,0.04)",
    surfaceHover: "rgba(255,255,255,0.08)",
  },
  light: {
    bg: "#F6F3EE",
    bgAlt: "#EDE8DF",
    warm: "#E7DED2",
    champagne: "#8B7355",
    bronze: "#6B5B4A",
    ivory: "#1A1815",
    muted: "#6B6358",
    surface: "rgba(255,255,255,0.7)",
    surfaceHover: "rgba(255,255,255,0.85)",
  },
};

function useThemeColors() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const root = document.documentElement;
    const current =
      (root.getAttribute("data-theme") as "dark" | "light") || "dark";
    setTheme(current);

    const mo = new MutationObserver(() => {
      const t =
        (root.getAttribute("data-theme") as "dark" | "light") || "dark";
      setTheme(t);
    });
    mo.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    return () => mo.disconnect();
  }, []);

  return THEME[theme];
}

/* ───────────────────────────────────────────────
   Animation variants
   ─────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 48 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (i = 0) => ({
    opacity: 1,
    transition: { duration: 1.2, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

const wordReveal = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1,
      delay: i * 0.12,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

const heroLines = [["Curated"], ["Worlds"]];

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

const cardReveal = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

/* ───────────────────────────────────────────────
   ProductCard – Luxury product card component
   ─────────────────────────────────────────────── */
function ProductCard({
  product,
  index,
  C,
}: {
  product: Product;
  index: number;
  C: (typeof THEME)["dark"];
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={cardRef}
      variants={cardReveal}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
    <Link
      href={`/collections/${product.id}`}
      className="luxury-product-card group relative block rounded-[2px] overflow-hidden"
      style={{
        border: "1px solid var(--color-border)",
        background: C.surface,
      }}
    >
      {/* ── Product Image Area (gradient placeholder) ── */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <div
          className="luxury-product-image absolute inset-0"
          style={{ background: product.gradient }}
        >
          {/* Watercolor texture */}
          <div
            className="absolute inset-0 mix-blend-soft-light opacity-25"
            style={{
              background: `
                radial-gradient(ellipse 50% 25% at 30% 20%, rgba(214,207,199,0.1), transparent 60%),
                radial-gradient(ellipse 40% 20% at 70% 60%, rgba(139,115,85,0.06), transparent 50%)
              `,
              filter: "blur(6px)",
            }}
          />
          {/* Paper grain */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 30% 40%, rgba(255,255,255,0.12) 1px, transparent 1px)",
              backgroundSize: "3px 3px",
            }}
          />
        </div>

        {/* Product name overlay on image */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className={`${playfair.className} text-[clamp(1.1rem,3vw,1.8rem)] tracking-[0.12em] uppercase opacity-0 group-hover:opacity-20 transition-opacity duration-700`}
            style={{ color: "#D6CFC7" }}
          >
            {product.name}
          </span>
        </div>

        {/* Decorative corner lines */}
        <div className="absolute top-3 left-3 w-8 h-px bg-white/10" />
        <div className="absolute top-3 left-3 w-px h-8 bg-white/10" />
        <div className="absolute bottom-3 right-3 w-8 h-px bg-white/10" />
        <div className="absolute bottom-3 right-3 w-px h-8 bg-white/10" />

        {/* Featured badge */}
        {product.featured && (
          <div className="absolute top-3 right-3">
            <span
              className="text-[8px] tracking-[0.2em] uppercase px-3 py-1.5 rounded-full border"
              style={{
                borderColor: product.accent,
                color: product.accent,
                background: `rgba(0,0,0,0.4)`,
                backdropFilter: "blur(8px)",
              }}
            >
              Featured
            </span>
          </div>
        )}

        {/* New badge */}
        {product.isNew && (
          <div className="absolute top-3 left-3">
            <span
              className="luxury-new-badge text-[8px] tracking-[0.2em] uppercase px-3 py-1.5 rounded-full border"
              style={{
                borderColor: product.accent,
                color: product.accent,
                background: `rgba(0,0,0,0.4)`,
                backdropFilter: "blur(8px)",
              }}
            >
              New
            </span>
          </div>
        )}

        {/* Quick View indicator — View details arrow */}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
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

        {/* Hover border accent */}
        <div
          className="absolute inset-0 border border-transparent group-hover:border-opacity-40 transition-all duration-700 pointer-events-none rounded-[2px]"
          style={{
            borderColor: product.accent,
            opacity: 0,
          }}
        />
      </div>

      {/* ── Product Info ── */}
      <div className="p-5 md:p-6 space-y-3">
        {/* Product name */}
        <h3
          className={`${playfair.className} text-lg md:text-xl font-bold leading-[1.2] tracking-[0.02em]`}
          style={{ color: C.ivory }}
        >
          {product.name}
        </h3>

        {/* Tagline */}
        <p
          className={`${inter.className} text-xs tracking-[0.15em] uppercase`}
          style={{ color: C.bronze }}
        >
          {product.tagline}
        </p>

        {/* Description */}
        <p
          className={`${inter.className} text-sm leading-[1.7] line-clamp-2`}
          style={{ color: C.muted }}
        >
          {product.description}
        </p>

        {/* Price & Rating row */}
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

        {/* Accent line on hover */}
        <div
          className="h-px w-8 transition-all duration-500 group-hover:w-full"
          style={{
            background: `linear-gradient(to right, ${product.accent}, transparent)`,
            opacity: 0.3,
          }}
        />

        {/* Add to cart hint */}
        <p
          className="text-[9px] tracking-[0.25em] uppercase opacity-0 transition-all duration-500 group-hover:opacity-50 pt-1"
          style={{ color: product.accent }}
        >
          Inquire about this piece &rarr;
        </p>
      </div>
    </Link>
    </motion.div>
  );
}

/* ───────────────────────────────────────────────
   ComingSoonCard – For categories without products
   ─────────────────────────────────────────────── */
function ComingSoonCard({
  category,
  index,
  C,
}: {
  category: (typeof CATEGORIES)[0];
  index: number;
  C: (typeof THEME)["dark"];
}) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.9,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      }}
      className="luxury-coming-soon relative rounded-[2px] overflow-hidden p-8 md:p-10 text-center cursor-default"
      style={{
        border: "1px solid var(--color-border)",
        background: C.surface,
      }}
    >
      {/* Decorative icon */}
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

      {/* Category name */}
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

      {/* Shimmer "Coming Soon" */}
      <div className="mt-6">
        <span
          className={`${inter.className} luxury-shimmer inline-block text-xs tracking-[0.25em] uppercase font-semibold`}
        >
          Coming Soon
        </span>
      </div>

      {/* Decorative dot */}
      <div
        className="mx-auto mt-4 w-1.5 h-1.5 rounded-full"
        style={{ background: C.bronze, opacity: 0.3 }}
      />

      {/* Notify me button */}
      <button
        type="button"
        className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full border text-[9px] tracking-[0.22em] uppercase transition-all duration-400 hover:-translate-y-0.5"
        style={{
          borderColor: "var(--color-border)",
          color: C.champagne,
        }}
        onClick={() => {
          // Future: notify me functionality
        }}
      >
        Notify When Available
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
          <path d="M5 1V9" />
          <path d="M1 5H9" />
        </svg>
      </button>
    </motion.div>
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
  C: (typeof THEME)["dark"];
}) {
  const [scrolled, setScrolled] = useState(
    typeof window !== "undefined" ? window.scrollY > 80 : false
  );

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    onScroll(); // sync on mount
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`sticky z-30 transition-all duration-500 ${
        scrolled ? "top-0 shadow-lg" : "top-0"
      }`}
      style={{
        background: scrolled
          ? C.bgAlt
          : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
      }}
    >
      <div className="max-w-[1400px] mx-auto px-6 py-4 md:py-5">
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
          {/* Search + Category filters row */}
          <div className="flex flex-col sm:flex-row gap-3 flex-1">
            {/* Search input */}
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

            {/* Category filter buttons */}
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
                  background:
                    activeCategory === "all" ? "var(--color-accent)" : "transparent",
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
                    background:
                      activeCategory === cat.slug
                        ? "var(--color-accent)"
                        : "transparent",
                  }}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Sort + result count */}
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
   SECTION 1 – Cinematic Hero: "Curated Worlds"
   ═══════════════════════════════════════════════ */
function CollectionsHero({ C }: { C: (typeof THEME)["dark"] }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section className="min-h-[85dvh] flex items-center justify-center relative overflow-hidden">
      {/* Animated floating orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ y: [0, -25, 0], scale: [1, 1.03, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-[0.05]"
          style={{
            background:
              "radial-gradient(circle at center, #D6CFC7, transparent 65%)",
            filter: "blur(100px)",
          }}
        />
        <motion.div
          animate={{ y: [0, 30, 0], x: [0, -15, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute top-[55%] right-[10%] w-[400px] h-[400px] rounded-full opacity-[0.03]"
          style={{
            background:
              "radial-gradient(circle at center, #8B7355, transparent 60%)",
            filter: "blur(80px)",
          }}
        />
        <motion.div
          animate={{ y: [0, -20, 0], x: [0, 20, 0], scale: [1, 1.04, 1] }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut", delay: 5 }}
          className="absolute top-[15%] left-[5%] w-[350px] h-[350px] rounded-full opacity-[0.025]"
          style={{
            background:
              "radial-gradient(circle at center, #F5F2ED, transparent 60%)",
            filter: "blur(70px)",
          }}
        />
        {/* Abstract rotating shapes */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
          className="absolute top-[25%] right-[8%] w-[280px] h-[280px] opacity-[0.015]"
          style={{
            border: "1px solid rgba(214, 207, 199, 0.25)",
            borderRadius: "45% 55% 40% 60% / 50% 42% 58% 48%",
          }}
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[30%] left-[12%] w-[200px] h-[200px] opacity-[0.012]"
          style={{
            border: "1px solid rgba(214, 207, 199, 0.15)",
            borderRadius: "55% 45% 60% 40% / 45% 55% 45% 55%",
          }}
        />
        {/* Drifting particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[2px] h-[2px] rounded-full"
            style={{
              background: C.champagne,
              top: `${10 + Math.random() * 80}%`,
              left: `${5 + Math.random() * 90}%`,
              opacity: 0.03 + Math.random() * 0.05,
            }}
            animate={{
              y: [0, -40 - Math.random() * 60, 0],
              x: [0, 20 - Math.random() * 40, 0],
              opacity: [0.03 + Math.random() * 0.03, 0.06 + Math.random() * 0.06, 0.03 + Math.random() * 0.03],
            }}
            transition={{
              duration: 14 + Math.random() * 18,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 10,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <motion.div
        ref={ref}
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative z-10 max-w-[1400px] mx-auto px-6 text-center"
      >
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className={`${inter.className} text-xs tracking-[0.25em] uppercase mb-8`}
          style={{ color: C.bronze }}
        >
          THE KYNXZ BRAND Collections
        </motion.p>

        <h1
          className={`${playfair.className} text-[clamp(3rem,12vw,8rem)] font-bold leading-[1.05] tracking-[-0.02em]`}
          style={{ color: C.ivory }}
        >
          {heroLines.map((line, lineIdx) => (
            <div key={lineIdx} className="overflow-hidden">
              {line.map((word, wordIdx) => {
                const globalIdx =
                  heroLines
                    .slice(0, lineIdx)
                    .reduce((acc, l) => acc + l.length, 0) + wordIdx;
                return (
                  <motion.span
                    key={wordIdx}
                    variants={wordReveal}
                    initial="hidden"
                    animate="visible"
                    custom={globalIdx}
                    className="inline-block mr-[0.3em] last:mr-0"
                  >
                    {word}
                  </motion.span>
                );
              })}
            </div>
          ))}
        </h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
          className={`${cormorant.className} mt-8 text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto leading-relaxed italic font-light`}
          style={{ color: C.champagne }}
        >
          &ldquo;A collection of objects chosen not merely for utility, but for meaning.&rdquo;
        </motion.p>

        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          custom={5}
          className="mt-14 flex items-center justify-center gap-4"
        >
          <span className="block w-16 h-px" style={{ background: C.bronze }} />
          <span
            className={`${cormorant.className} italic text-sm`}
            style={{ color: C.champagne }}
          >
            Mindfully Curated
          </span>
          <span className="block w-16 h-px" style={{ background: C.bronze }} />
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, transparent, ${C.bg})`,
        }}
      />
    </section>
  );
}

/* ═══════════════════════════════════════════════
   SECTION 2 – Product Grid with Filters
   ═══════════════════════════════════════════════ */
function ProductGrid({ C }: { C: (typeof THEME)["dark"] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<ProductCategory | "all">("all");
  const [sortOption, setSortOption] = useState<SortOption>("featured");
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  // Compute filtered & sorted products
  const visibleProducts = useMemo(() => {
    let result =
      activeCategory === "all"
        ? [...PRODUCTS]
        : getProductsByCategory(activeCategory);

    if (searchQuery.trim()) {
      result = searchProducts(searchQuery.trim());
      // If a category is also selected, intersect
      if (activeCategory !== "all") {
        result = result.filter((p) => p.category === activeCategory);
      }
    }

    return sortProducts(result, sortOption);
  }, [searchQuery, activeCategory, sortOption]);

  // Compute which categories have no products
  const categoriesWithoutProducts = useMemo(() => {
    return CATEGORIES.filter((cat) => {
      if (searchQuery.trim()) return false; // Don't show coming-soon during search
      return getProductsByCategory(cat.slug).length === 0;
    });
  }, [searchQuery]);

  // Count of available products (excl. coming soon)
  const productCount = activeCategory === "all"
    ? PRODUCTS.length
    : getProductsByCategory(activeCategory).length;

  return (
    <section
      ref={sectionRef}
      id="collections-grid"
      className="collections-storefront-section relative overflow-hidden"
    >
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[8%] -translate-x-1/2 rounded-full
        opacity-0 data-[theme=dark]:opacity-100 transition-opacity duration-700
        h-[500px] w-[1200px] bg-[radial-gradient(circle_at_center,rgba(212,168,79,0.04),rgba(212,168,79,0.01),transparent)] blur-3xl"
        data-theme="dark"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[12%] -translate-x-1/2 rounded-full
        opacity-0 data-[theme=light]:opacity-100 transition-opacity duration-700
        h-[400px] w-[1100px] bg-[radial-gradient(circle_at_center,#EDE9E2/40,#F3F1EC/15,transparent)] blur-3xl"
        data-theme="light"
      />

      {/* Section header */}
      <div className="max-w-[1400px] mx-auto px-6 pt-12 md:pt-16 lg:pt-20 pb-8 md:pb-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="text-center max-w-3xl mx-auto"
        >
          <p
            className={`${inter.className} text-xs tracking-[0.25em] uppercase mb-4`}
            style={{ color: C.bronze }}
          >
            Browse Our Collection
          </p>
          <h2
            className={`${playfair.className} text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.08]`}
            style={{ color: C.ivory }}
          >
            Objects of{" "}
            <span className="italic font-normal" style={{ color: C.champagne }}>
              intention
            </span>
          </h2>
          <div
            className="mx-auto mt-6 w-24 h-px"
            style={{ background: C.bronze, opacity: 0.5 }}
          />
        </motion.div>
      </div>

      {/* Filter bar */}
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

      {/* Product grid */}
      <div className="max-w-[1400px] mx-auto px-6 pb-16 md:pb-20 lg:pb-24">
        {visibleProducts.length > 0 ? (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            key={`${activeCategory}-${sortOption}-${searchQuery}`}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6"
          >
            {visibleProducts.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                index={i}
                C={C}
              />
            ))}
          </motion.div>
        ) : (
          /* Empty state */
          <div className="luxury-empty-state text-center py-20 md:py-24">
            <div
              className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
              style={{
                background: `radial-gradient(circle at 40% 35%, ${C.bronze}15, transparent 70%)`,
              }}
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke={C.muted}
                strokeWidth="1"
                strokeLinecap="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21L16.65 16.65" />
                <path d="M8 11H14" />
                <path d="M11 8V14" />
              </svg>
            </div>
            <p
              className={`${playfair.className} text-2xl md:text-3xl font-bold mb-3`}
              style={{ color: C.ivory }}
            >
              No pieces found
            </p>
            <p
              className={`${inter.className} text-sm max-w-md mx-auto leading-relaxed`}
              style={{ color: C.muted }}
            >
              {searchQuery
                ? `No results for "${searchQuery}". Try a different search term or browse all collections.`
                : "This collection is being curated. New pieces will arrive soon."}
            </p>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full border text-[10px] tracking-[0.2em] uppercase transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  borderColor: "var(--color-border)",
                  color: C.champagne,
                }}
              >
                Clear Search
              </button>
            )}
          </div>
        )}

        {/* Coming Soon sections — categories without products */}
        {categoriesWithoutProducts.length > 0 && (
          <div className="mt-16 md:mt-20">
            <div className="text-center mb-10">
              <div
                className="mx-auto mb-6 w-12 h-px"
                style={{ background: C.bronze, opacity: 0.4 }}
              />
              <h3
                className={`${playfair.className} text-xl md:text-2xl font-bold`}
                style={{ color: C.ivory }}
              >
                Coming Collections
              </h3>
              <p
                className={`${inter.className} mt-2 text-sm`}
                style={{ color: C.muted }}
              >
                New categories being curated for you
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {categoriesWithoutProducts.slice(0, 3).map((cat, i) => (
                <ComingSoonCard key={cat.slug} category={cat} index={i} C={C} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   SECTION 3 – Curatorial Philosophy
   ═══════════════════════════════════════════════ */
function CuratorialPhilosophy({ C }: { C: (typeof THEME)["dark"] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-16 md:py-20 lg:py-24 min-h-[70dvh] flex items-center justify-center"
      style={{ background: C.bgAlt }}
    >
      {/* Background ambient glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 50% 40% at 50% 45%, rgba(214, 207, 199, 0.03), transparent 55%),
            radial-gradient(ellipse 40% 30% at 50% 20%, rgba(139, 115, 85, 0.025), transparent 50%),
            radial-gradient(ellipse 40% 30% at 50% 80%, rgba(139, 115, 85, 0.02), transparent 50%)
          `,
        }}
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="mb-10"
        >
          <span
            className={`${playfair.className} text-6xl md:text-8xl leading-none`}
            style={{ color: C.bronze, opacity: 0.12 }}
          >
            &ldquo;
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 40, filter: "blur(4px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 1.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className={`${playfair.className} text-[clamp(2rem,6vw,4.5rem)] font-light italic leading-[1.2] max-w-5xl mx-auto`}
          style={{ color: C.ivory }}
        >
          We do not collect objects.
          <br />
          <span className="font-normal not-italic" style={{ color: C.champagne }}>
            We curate meaning.
          </span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="mt-10"
        >
          <span
            className={`${playfair.className} text-6xl md:text-8xl leading-none`}
            style={{ color: C.bronze, opacity: 0.12 }}
          >
            &rdquo;
          </span>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.5, delay: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="mx-auto mt-14 w-24 h-px"
          style={{ background: C.bronze, opacity: 0.5 }}
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.9, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className={`${inter.className} mt-10 text-sm md:text-base max-w-2xl mx-auto leading-relaxed`}
          style={{ color: C.muted }}
        >
          Every piece in our collection is chosen for its ability to elevate the everyday — to transform the ordinary into the extraordinary through uncompromising quality, timeless design, and intentional craftsmanship.
        </motion.p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   SECTION 4 – Final CTA
   ═══════════════════════════════════════════════ */
function FinalCTA({ C }: { C: (typeof THEME)["dark"] }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgScale = useTransform(scrollYProgress, [0, 1], [0.95, 1.05]);

  return (
    <section
      ref={ref}
      className="min-h-[80dvh] flex items-center justify-center relative overflow-hidden"
      style={{ background: C.bgAlt }}
    >
      <motion.div
        style={{ scale: bgScale }}
        className="absolute inset-0 pointer-events-none"
      >
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 60% 50% at 50% 45%, rgba(214, 207, 199, 0.04), transparent 55%),
              radial-gradient(ellipse 40% 30% at 50% 20%, rgba(139, 115, 85, 0.03), transparent 50%),
              radial-gradient(ellipse 40% 30% at 50% 80%, rgba(139, 115, 85, 0.02), transparent 50%)
            `,
          }}
        />
      </motion.div>

      {/* Floating decorative orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ y: [0, -20, 0], opacity: [0.02, 0.05, 0.02] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[15%] left-[8%] w-[300px] h-[300px] rounded-full"
          style={{
            background: `radial-gradient(circle at center, ${C.champagne}, transparent 60%)`,
            filter: "blur(60px)",
          }}
        />
        <motion.div
          animate={{ y: [0, 15, 0], opacity: [0.015, 0.04, 0.015] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute bottom-[20%] right-[10%] w-[250px] h-[250px] rounded-full"
          style={{
            background: `radial-gradient(circle at center, ${C.bronze}, transparent 60%)`,
            filter: "blur(50px)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className={`${inter.className} text-xs tracking-[0.25em] uppercase mb-8`}
          style={{ color: C.bronze }}
        >
          Begin Your Journey
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className={`${playfair.className} text-[clamp(2.8rem,9vw,6rem)] font-bold leading-[1.05] tracking-[-0.02em]`}
          style={{ color: C.ivory }}
        >
          A World
          <br />
          <span className="italic font-normal" style={{ color: C.champagne }}>
            Crafted For You
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className={`${inter.className} mt-8 text-base md:text-lg max-w-xl mx-auto leading-relaxed`}
          style={{ color: C.muted }}
        >
          Every piece tells a story. Every collection invites you into a world of timeless elegance, uncompromising quality, and refined living.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="mt-12"
        >
          <a
            href="/contact"
            className="group inline-flex items-center gap-3 px-10 py-4 rounded-full border transition-all duration-500 hover:-translate-y-1"
            style={{
              borderColor: C.champagne,
              color: C.ivory,
              background: "rgba(214, 207, 199, 0.04)",
            }}
          >
            <span className={`${inter.className} text-sm tracking-[0.15em] uppercase`}>
              Inquire Within
            </span>
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-lg"
              style={{ color: C.champagne }}
            >
              &rarr;
            </motion.span>
          </a>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="mx-auto mt-16 w-24 h-px"
          style={{ background: C.bronze }}
        />
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: `linear-gradient(to bottom, transparent, ${C.bg})` }}
      />
    </section>
  );
}

/* ═══════════════════════════════════════════════
   PAGE COMPOSITION
   ═══════════════════════════════════════════════ */
export default function CollectionsPage() {
  const C = useThemeColors();

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
        {/* Section 1 – Cinematic Hero: "Curated Worlds" */}
        <CollectionsHero C={C} />

        {/* Section 2 – Product Grid with Filters */}
        <ProductGrid C={C} />

        {/* Section 3 – Curatorial Philosophy */}
        <CuratorialPhilosophy C={C} />

        {/* Section 4 – Final CTA */}
        <FinalCTA C={C} />
      </main>

      <NewsletterSection />
      <FooterSection />
    </>
  );
}
