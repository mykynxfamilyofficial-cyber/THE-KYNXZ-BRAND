"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";
import { playfair, cormorant, inter } from "../../fonts";
import Header from "../../components/Header";
import FooterSection from "../../components/FooterSection";
import { PRODUCTS, getProductsByCategory, Product } from "../types";

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
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ───────────────────────────────────────────────
   Quantity Selector
   ─────────────────────────────────────────────── */
function QuantitySelector({
  value,
  onChange,
  C,
}: {
  value: number;
  onChange: (v: number) => void;
  C: (typeof THEME)["dark"];
}) {
  return (
    <div className="flex items-center gap-3">
      <span
        className={`${inter.className} text-[10px] tracking-[0.2em] uppercase`}
        style={{ color: C.muted }}
      >
        Qty
      </span>
      <div className="flex items-center border rounded-full" style={{ borderColor: "var(--color-border)" }}>
        <button
          type="button"
          onClick={() => onChange(Math.max(1, value - 1))}
          className="detail-qty-btn w-9 h-9 flex items-center justify-center text-sm rounded-l-full border-r"
          style={{ borderColor: "var(--color-border)", color: C.ivory }}
          aria-label="Decrease quantity"
        >
          &minus;
        </button>
        <span
          className={`${inter.className} w-10 text-center text-sm font-medium`}
          style={{ color: C.ivory }}
        >
          {value}
        </span>
        <button
          type="button"
          onClick={() => onChange(Math.min(99, value + 1))}
          className="detail-qty-btn w-9 h-9 flex items-center justify-center text-sm rounded-r-full border-l"
          style={{ borderColor: "var(--color-border)", color: C.ivory }}
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
    </div>
  );
}

/* ───────────────────────────────────────────────
   Image Gallery with Hover Zoom
   ─────────────────────────────────────────────── */
function ImageGallery({
  product,
  C,
}: {
  product: Product;
  C: (typeof THEME)["dark"];
}) {
  const allImages = [product.gradient, ...(product.galleryGradients || [])];
  const [activeIndex, setActiveIndex] = useState(0);
  const [showZoom, setShowZoom] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  return (
    <div className="space-y-4">
      {/* Main image */}
      <div
        ref={imageRef}
        className="detail-image-container relative aspect-[4/3] md:aspect-square rounded-[2px] overflow-hidden cursor-crosshair group"
        style={{ border: "1px solid var(--color-border)" }}
        onMouseEnter={() => setShowZoom(true)}
        onMouseLeave={() => setShowZoom(false)}
        onMouseMove={handleMouseMove}
      >
        <div
          className="absolute inset-0 transition-transform duration-700"
          style={{
            background: allImages[activeIndex],
            transform: showZoom ? "scale(1.5)" : "scale(1)",
            transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
          }}
        >
          {/* Watercolor overlay */}
          <div
            className="absolute inset-0 mix-blend-soft-light opacity-20"
            style={{
              background: `
                radial-gradient(ellipse 50% 25% at 30% 20%, rgba(214,207,199,0.08), transparent 60%),
                radial-gradient(ellipse 40% 20% at 70% 60%, rgba(139,115,85,0.05), transparent 50%)
              `,
              filter: "blur(6px)",
            }}
          />
          {/* Grain */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 30% 40%, rgba(255,255,255,0.1) 1px, transparent 1px)",
              backgroundSize: "3px 3px",
            }}
          />
        </div>

        {/* Product name center */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span
            className={`${playfair.className} text-[clamp(1.4rem,4vw,2.8rem)] tracking-[0.12em] uppercase opacity-[0.08]`}
            style={{ color: "#D6CFC7" }}
          >
            {product.name}
          </span>
        </div>

        {/* Corner accents */}
        <div className="absolute top-4 left-4 w-10 h-px bg-white/15" />
        <div className="absolute top-4 left-4 w-px h-10 bg-white/15" />
        <div className="absolute bottom-4 right-4 w-10 h-px bg-white/15" />
        <div className="absolute bottom-4 right-4 w-px h-10 bg-white/15" />

        {/* Zoom hint */}
        <div
          className="absolute bottom-4 left-4 text-[8px] tracking-[0.2em] uppercase px-3 py-1.5 rounded-full border backdrop-blur-sm transition-opacity duration-400"
          style={{
            borderColor: "var(--color-border)",
            color: C.champagne,
            background: "rgba(0,0,0,0.3)",
            opacity: showZoom ? 0 : 1,
          }}
        >
          Hover to Zoom
        </div>

        {/* Badges */}
        <div className="absolute top-4 right-4 flex gap-2">
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
              className="luxury-new-badge text-[8px] tracking-[0.2em] uppercase px-3 py-1.5 rounded-full border backdrop-blur-sm"
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
      </div>

      {/* Thumbnails */}
      {allImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {allImages.map((gradient, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIndex(i)}
              className={`detail-thumbnail w-16 h-16 md:w-20 md:h-20 rounded-[2px] overflow-hidden border-2 shrink-0 transition-all duration-400 ${
                i === activeIndex ? "detail-thumbnail-active" : ""
              }`}
              style={{
                borderColor:
                  i === activeIndex ? "var(--color-accent)" : "var(--color-border)",
                background: gradient,
              }}
              aria-label={`View image ${i + 1}`}
            >
              <div
                className="absolute inset-0 mix-blend-soft-light opacity-15"
                style={{
                  background:
                    "radial-gradient(ellipse 50% 25% at 30% 20%, rgba(214,207,199,0.06), transparent 60%)",
                  filter: "blur(4px)",
                }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ───────────────────────────────────────────────
   Star Rating
   ─────────────────────────────────────────────── */
function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          width={size}
          height={size}
          viewBox="0 0 12 12"
          fill={star <= Math.round(rating) ? "var(--color-accent)" : "none"}
          stroke="var(--color-accent)"
          strokeWidth="0.5"
          opacity={star <= Math.round(rating) ? 0.8 : 0.25}
        >
          <path d="M6 1L7.5 4.5L11 5L8.5 7.5L9 11L6 9L3 11L3.5 7.5L1 5L4.5 4.5L6 1Z" />
        </svg>
      ))}
    </div>
  );
}

/* ───────────────────────────────────────────────
   Customer Reviews Section
   ─────────────────────────────────────────────── */
function ReviewsSection({
  product,
  C,
}: {
  product: Product;
  C: (typeof THEME)["dark"];
}) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  const reviewList = product.reviews?.list || [];
  const avgRating = product.reviews?.rating || 0;

  if (reviewList.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-12 md:py-16 detail-section-alt"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10"
        >
          <div className="flex items-center gap-4 mb-2">
            <h2
              className={`${playfair.className} text-2xl md:text-3xl font-bold`}
              style={{ color: C.ivory }}
            >
              Customer Reviews
            </h2>
            <div className="flex items-center gap-2">
              <StarRating rating={avgRating} />
              <span
                className={`${inter.className} text-sm`}
                style={{ color: C.muted }}
              >
                {avgRating.toFixed(1)} ({product.reviews?.count || 0})
              </span>
            </div>
          </div>
          <div
            className="mt-3 w-16 h-px"
            style={{ background: C.bronze, opacity: 0.4 }}
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {reviewList.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="detail-review-card p-6 md:p-7 rounded-[2px]"
              style={{
                border: "1px solid var(--color-border)",
                background: C.surface,
              }}
            >
              {/* Author & Date */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span
                    className={`${playfair.className} text-sm font-semibold`}
                    style={{ color: C.ivory }}
                  >
                    {review.author}
                  </span>
                  {review.verified && (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill={C.bronze}
                      opacity="0.6"
                    >
                      <path d="M7 0L9 4.5L14 5L10.5 8.5L11 14L7 11L3 14L3.5 8.5L0 5L5 4.5L7 0Z" />
                    </svg>
                  )}
                </div>
                <span
                  className="text-[10px] tracking-[0.05em]"
                  style={{ color: C.muted }}
                >
                  {review.date}
                </span>
              </div>

              {/* Stars */}
              <StarRating rating={review.rating} size={12} />

              {/* Title */}
              <h4
                className={`${inter.className} text-sm font-semibold mt-3 mb-2`}
                style={{ color: C.ivory }}
              >
                {review.title}
              </h4>

              {/* Content */}
              <p
                className={`${inter.className} text-xs leading-[1.8]`}
                style={{ color: C.muted }}
              >
                &ldquo;{review.content}&rdquo;
              </p>

              {/* Bottom accent */}
              <div
                className="mt-4 h-px w-8"
                style={{ background: C.bronze, opacity: 0.2 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────────
   Related Products
   ─────────────────────────────────────────────── */
function RelatedProducts({
  product,
  C,
}: {
  product: Product;
  C: (typeof THEME)["dark"];
}) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  const related = useMemo(() => {
    const sameCategory = getProductsByCategory(product.category).filter(
      (p) => p.id !== product.id
    );
    if (sameCategory.length >= 4) return sameCategory.slice(0, 4);
    // Fill with other products if not enough in same category
    const others = PRODUCTS.filter(
      (p) => p.id !== product.id && !sameCategory.includes(p)
    );
    return [...sameCategory, ...others].slice(0, 4);
  }, [product]);

  if (related.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-12 md:py-16"
      style={{ background: C.bgAlt }}
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 text-center"
        >
          <p
            className={`${inter.className} text-[10px] tracking-[0.25em] uppercase mb-3`}
            style={{ color: C.bronze }}
          >
            Complete The Story
          </p>
          <h2
            className={`${playfair.className} text-2xl md:text-3xl font-bold`}
            style={{ color: C.ivory }}
          >
            You May Also{" "}
            <span className="italic font-normal" style={{ color: C.champagne }}>
              Appreciate
            </span>
          </h2>
          <div
            className="mx-auto mt-4 w-16 h-px"
            style={{ background: C.bronze, opacity: 0.4 }}
          />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {related.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Link
                href={`/collections/${item.id}`}
                className="detail-related-card group block rounded-[2px] overflow-hidden"
                style={{
                  border: "1px solid var(--color-border)",
                  background: C.surface,
                }}
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <div
                    className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                    style={{ background: item.gradient }}
                  >
                    <div
                      className="absolute inset-0 mix-blend-soft-light opacity-20"
                      style={{
                        background:
                          "radial-gradient(ellipse 50% 25% at 30% 20%, rgba(214,207,199,0.06), transparent 60%)",
                        filter: "blur(4px)",
                      }}
                    />
                  </div>
                </div>

                {/* Info */}
                <div className="p-3 md:p-4 space-y-1">
                  <h3
                    className={`${playfair.className} text-xs md:text-sm font-bold leading-tight line-clamp-1`}
                    style={{ color: C.ivory }}
                  >
                    {item.name}
                  </h3>
                  <p
                    className={`${inter.className} text-[9px] tracking-[0.15em] uppercase`}
                    style={{ color: C.bronze }}
                  >
                    {item.tagline}
                  </p>
                  <div className="flex items-baseline gap-1.5 pt-1">
                    <span
                      className={`${playfair.className} text-sm font-bold`}
                      style={{ color: C.ivory }}
                    >
                      ${item.price}
                    </span>
                    {item.originalPrice && (
                      <span
                        className="text-[10px] line-through"
                        style={{ color: C.muted }}
                      >
                        ${item.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   MAIN PRODUCT DETAIL PAGE
   ═══════════════════════════════════════════════ */
export default function ProductDetailPage() {
  const params = useParams();
  const productId = params?.id as string;
  const C = useThemeColors();
  const [quantity, setQuantity] = useState(1);
  const [showMobileCart, setShowMobileCart] = useState(false);

  // Find the product
  const product = useMemo(
    () => PRODUCTS.find((p) => p.id === productId),
    [productId]
  );

  // Track scroll for sticky mobile cart
  useEffect(() => {
    const onScroll = () => {
      setShowMobileCart(window.scrollY > 400);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Page title
  useEffect(() => {
    if (product) {
      document.title = `${product.name} | THE KYNXZ BRAND`;
    }
  }, [product]);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 404 fallback
  if (!product) {
    return (
      <>
        <Header />
        <main
          className="min-h-[80dvh] flex items-center justify-center"
          style={{ background: C.bg }}
        >
          <div className="text-center px-6">
            <p
              className={`${cormorant.className} italic text-6xl md:text-8xl mb-6`}
              style={{ color: C.bronze, opacity: 0.2 }}
            >
              &mdash;
            </p>
            <h1
              className={`${playfair.className} text-3xl md:text-5xl font-bold mb-4`}
              style={{ color: C.ivory }}
            >
              Piece Not Found
            </h1>
            <p
              className={`${inter.className} text-sm max-w-md mx-auto mb-8`}
              style={{ color: C.muted }}
            >
              This product may have been curated out of our collection or the
              link may be incorrect.
            </p>
            <Link
              href="/collections"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:-translate-y-0.5"
              style={{
                borderColor: "var(--color-border)",
                color: C.champagne,
              }}
            >
              Back to Collections
            </Link>
          </div>
        </main>
        <FooterSection />
      </>
    );
  }

  const totalPrice = (product.price * quantity).toFixed(2);

  return (
    <>
      <Header />

      <main
        role="main"
        aria-label={`${product.name} product detail`}
        className={`${inter.variable} ${playfair.variable} ${cormorant.variable}`}
        style={{
          fontFamily: "var(--font-inter), Arial, sans-serif",
          background: C.bg,
          overflow: "hidden",
        }}
      >
        {/* ─── Breadcrumb ─── */}
        <div className="max-w-[1400px] mx-auto px-6 pt-20 md:pt-24 pb-4">
          <nav className="flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase">
            <Link
              href="/collections"
              className="transition-colors duration-300 hover:opacity-80"
              style={{ color: C.muted }}
            >
              Collections
            </Link>
            <span style={{ color: C.muted, opacity: 0.4 }}>/</span>
            <span style={{ color: C.champagne }}>{product.name}</span>
          </nav>
        </div>

        {/* ═══════════════════════════════════════
            SECTION 1 – Product Detail Hero
            Image Gallery + Product Info
           ═══════════════════════════════════════ */}
        <section className="max-w-[1400px] mx-auto px-6 pb-8 md:pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
            {/* Left – Image Gallery */}
            <motion.div
              variants={scaleIn}
              initial="hidden"
              animate="visible"
            >
              <ImageGallery product={product} C={C} />
            </motion.div>

            {/* Right – Product Info */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              {/* ── Category & Tags ── */}
              <div className="flex items-center gap-3 flex-wrap">
                <span
                  className={`${inter.className} text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 rounded-full border`}
                  style={{
                    borderColor: "var(--color-border)",
                    color: C.bronze,
                  }}
                >
                  {product.category.replace("-", " & ")}
                </span>
                {product.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] tracking-[0.15em] uppercase"
                    style={{ color: C.muted, opacity: 0.6 }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* ── Product Name ── */}
              <div>
                <h1
                  className={`${playfair.className} text-[clamp(2rem,5vw,3.8rem)] font-bold leading-[1.05] tracking-[-0.01em]`}
                  style={{ color: C.ivory }}
                >
                  {product.name}
                </h1>
                <p
                  className={`${inter.className} mt-3 text-xs tracking-[0.2em] uppercase`}
                  style={{ color: C.bronze }}
                >
                  {product.tagline}
                </p>
              </div>

              {/* ── Price Section ── */}
              <div className="flex items-baseline gap-3">
                <span
                  className={`${playfair.className} text-3xl md:text-4xl font-bold`}
                  style={{ color: C.ivory }}
                >
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span
                    className="text-lg line-through"
                    style={{ color: C.muted }}
                  >
                    ${product.originalPrice}
                  </span>
                )}
                <span className="text-[10px] tracking-[0.12em] uppercase" style={{ color: C.muted }}>
                  USD
                </span>
                {product.reviews && (
                  <div className="flex items-center gap-1.5 ml-auto">
                    <StarRating rating={product.reviews.rating} size={12} />
                    <span className="text-[10px]" style={{ color: C.muted }}>
                      {product.reviews.rating.toFixed(1)} ({product.reviews.count})
                    </span>
                  </div>
                )}
              </div>

              {/* ── Description ── */}
              <div className="pt-2">
                <p
                  className={`${inter.className} text-sm md:text-base leading-[1.9]`}
                  style={{ color: C.muted }}
                >
                  {product.detailedDescription || product.description}
                </p>
              </div>

              {/* ── Quantity Selector ── */}
              <QuantitySelector
                value={quantity}
                onChange={setQuantity}
                C={C}
              />

              {/* ── Action Buttons ── */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  className="group flex-1 inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full border text-xs tracking-[0.18em] uppercase transition-all duration-500 hover:-translate-y-0.5"
                  style={{
                    borderColor: C.champagne,
                    color: C.ivory,
                    background: `linear-gradient(135deg, ${C.champagne}15, transparent)`,
                  }}
                  onClick={() => {
                    // Future: Add to cart
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 1L1 3.5V12C1 12.3 1.2 13 1.5 13H12.5C12.8 13 13 12.3 13 12V3.5L11 1H3Z" />
                    <path d="M1 3.5H13" />
                    <path d="M10 6C10 7.7 8.2 9 7 9C5.8 9 4 7.7 4 6" />
                  </svg>
                  <span>Add to Cart</span>
                  <span
                    className="w-px h-4 opacity-30"
                    style={{ background: C.champagne }}
                  />
                  <span
                    className={`${playfair.className} text-sm font-bold`}
                  >
                    ${totalPrice}
                  </span>
                </button>

                <button
                  type="button"
                  className="flex-1 inline-flex items-center justify-center px-8 py-4 rounded-full text-xs tracking-[0.18em] uppercase transition-all duration-500 hover:-translate-y-0.5"
                  style={{
                    background: C.champagne,
                    color: C.bg,
                  }}
                  onClick={() => {
                    // Future: Buy now
                  }}
                >
                  Buy Now
                </button>
              </div>

              {/* ── Shipping & Returns ── */}
              {product.shippingInfo && (
                <div
                  className="detail-shipping-card p-5 md:p-6 rounded-[2px] space-y-4"
                  style={{
                    border: "1px solid var(--color-border)",
                    background: C.surface,
                  }}
                >
                  <h4
                    className={`${inter.className} text-[10px] tracking-[0.2em] uppercase font-semibold`}
                    style={{ color: C.ivory }}
                  >
                    Shipping &amp; Returns
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={C.champagne} strokeWidth="1" strokeLinecap="round">
                        <rect x="1" y="3" width="14" height="10" rx="1" />
                        <path d="M5 13V14H11V13" />
                        <circle cx="4" cy="10" r="1.5" />
                        <circle cx="12" cy="10" r="1.5" />
                      </svg>
                      <div>
                        <p className="text-[10px] font-semibold" style={{ color: C.ivory }}>
                          {product.shippingInfo.freeShipping ? "Free Shipping" : "Shipping"}
                        </p>
                        <p className="text-[9px]" style={{ color: C.muted }}>
                          {product.shippingInfo.estimatedDays}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={C.champagne} strokeWidth="1" strokeLinecap="round">
                        <path d="M4 8L7 11L12 5" />
                        <circle cx="8" cy="8" r="7" />
                      </svg>
                      <div>
                        <p className="text-[10px] font-semibold" style={{ color: C.ivory }}>
                          Returns
                        </p>
                        <p className="text-[9px]" style={{ color: C.muted }}>
                          30 Days
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={C.champagne} strokeWidth="1" strokeLinecap="round">
                        <circle cx="8" cy="8" r="4" />
                        <path d="M8 4V8L10 10" />
                      </svg>
                      <div>
                        <p className="text-[10px] font-semibold" style={{ color: C.ivory }}>
                          Delivery
                        </p>
                        <p className="text-[9px]" style={{ color: C.muted }}>
                          {product.shippingInfo.trackingAvailable ? "Trackable" : "Standard"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <p
                    className="text-[10px] leading-relaxed"
                    style={{ color: C.muted }}
                  >
                    {product.shippingInfo.returnPolicy}
                  </p>
                </div>
              )}

            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            SECTION 2 – Key Features
           ═══════════════════════════════════════ */}
        {product.features && product.features.length > 0 && (
          <section
            className="relative overflow-hidden py-12 md:py-16 detail-section-alt"
          >
            <div className="max-w-[1200px] mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
                {/* Left - Decorative artistic element */}
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  className="hidden lg:block"
                >
                  <div
                    className="relative w-full aspect-square rounded-[2px] overflow-hidden"
                    style={{
                      border: "1px solid var(--color-border)",
                      background: product.galleryGradients?.[0] || product.gradient,
                    }}
                  >
                    <div
                      className="absolute inset-0 mix-blend-soft-light opacity-20"
                      style={{
                        background:
                          "radial-gradient(ellipse 50% 25% at 30% 20%, rgba(214,207,199,0.08), transparent 60%)",
                        filter: "blur(6px)",
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span
                        className={`${playfair.className} text-[clamp(1rem,3vw,2rem)] tracking-[0.15em] uppercase opacity-15`}
                        style={{ color: "#D6CFC7" }}
                      >
                        Craftsmanship
                      </span>
                    </div>
                    {/* Corner accents */}
                    <div className="absolute top-4 left-4 w-8 h-px bg-white/10" />
                    <div className="absolute top-4 left-4 w-px h-8 bg-white/10" />
                    <div className="absolute bottom-4 right-4 w-8 h-px bg-white/10" />
                    <div className="absolute bottom-4 right-4 w-px h-8 bg-white/10" />
                  </div>
                </motion.div>

                {/* Right - Features */}
                <div className="space-y-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p
                      className={`${inter.className} text-[10px] tracking-[0.25em] uppercase mb-3`}
                      style={{ color: C.bronze }}
                    >
                      Key Features
                    </p>
                    <h2
                      className={`${playfair.className} text-2xl md:text-3xl font-bold`}
                      style={{ color: C.ivory }}
                    >
                      What sets this{" "}
                      <span className="italic font-normal" style={{ color: C.champagne }}>
                        piece apart
                      </span>
                    </h2>
                    <div
                      className="mt-4 w-16 h-px"
                      style={{ background: C.bronze, opacity: 0.4 }}
                    />
                  </motion.div>

                  <div className="space-y-4">
                    {product.features.map((feature, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.6,
                          delay: i * 0.08,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="detail-feature-item flex items-start gap-4 p-4 rounded-[2px]"
                        style={{
                          borderBottom: "1px solid var(--color-border)",
                        }}
                      >
                        <span
                          className="mt-1 w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ background: C.bronze, opacity: 0.5 }}
                        />
                        <p
                          className={`${inter.className} text-sm leading-[1.7]`}
                          style={{ color: C.muted }}
                        >
                          {feature}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ═══════════════════════════════════════
            SECTION 3 – Specifications
           ═══════════════════════════════════════ */}
        {product.specifications && Object.keys(product.specifications).length > 0 && (
          <section className="relative overflow-hidden py-12 md:py-16">
            <div className="max-w-[1200px] mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="mb-10 text-center"
              >
                <p
                  className={`${inter.className} text-[10px] tracking-[0.25em] uppercase mb-3`}
                  style={{ color: C.bronze }}
                >
                  Details &amp; Dimensions
                </p>
                <h2
                  className={`${playfair.className} text-2xl md:text-3xl font-bold`}
                  style={{ color: C.ivory }}
                >
                  Technical{" "}
                  <span className="italic font-normal" style={{ color: C.champagne }}>
                    Specifications
                  </span>
                </h2>
                <div
                  className="mx-auto mt-4 w-16 h-px"
                  style={{ background: C.bronze, opacity: 0.4 }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-3xl mx-auto"
                style={{
                  border: "1px solid var(--color-border)",
                  borderRadius: "2px",
                  overflow: "hidden",
                }}
              >
                {Object.entries(product.specifications).map(([key, value], i) => (
                  <div
                    key={key}
                    className="detail-spec-row flex flex-col sm:flex-row sm:items-center px-6 py-4"
                    style={{
                      borderBottom:
                        i < Object.keys(product.specifications!).length - 1
                          ? "1px solid var(--color-border)"
                          : "none",
                    }}
                  >
                    <span
                      className={`${inter.className} text-[10px] tracking-[0.15em] uppercase font-semibold sm:w-1/3 mb-1 sm:mb-0`}
                      style={{ color: C.bronze }}
                    >
                      {key}
                    </span>
                    <span
                      className={`${inter.className} text-sm sm:w-2/3`}
                      style={{ color: C.ivory }}
                    >
                      {value}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>
          </section>
        )}

        {/* ═══════════════════════════════════════
            SECTION 4 – Customer Reviews
           ═══════════════════════════════════════ */}
        <ReviewsSection product={product} C={C} />

        {/* ═══════════════════════════════════════
            SECTION 5 – Related Products
           ═══════════════════════════════════════ */}
        <RelatedProducts product={product} C={C} />

        {/* ═══════════════════════════════════════
            SECTION 6 – Back to Collections CTA
           ═══════════════════════════════════════ */}
        <section className="relative overflow-hidden py-10 md:py-14" style={{ background: C.bg }}>
          <div className="max-w-[1200px] mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href="/collections"
                className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full border text-xs tracking-[0.2em] uppercase transition-all duration-500 hover:-translate-y-0.5"
                style={{
                  borderColor: "var(--color-border)",
                  color: C.champagne,
                }}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  className="transition-transform duration-400 group-hover:-translate-x-1"
                >
                  <path d="M8 2L4 6L8 10" />
                </svg>
                <span>Explore All Collections</span>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      {/* ═══════════════════════════════════════
          STICKY ADD TO CART — Mobile Only
         ═══════════════════════════════════════ */}
      <div
        className={`detail-sticky-cart ${
          showMobileCart ? "detail-sticky-cart-visible" : ""
        } lg:hidden`}
        style={{
          background: C.bgAlt,
          borderTop: "1px solid var(--color-border)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-baseline gap-2">
            <span
              className={`${playfair.className} text-lg font-bold`}
              style={{ color: C.ivory }}
            >
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs line-through" style={{ color: C.muted }}>
                ${product.originalPrice}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <QuantitySelector value={quantity} onChange={setQuantity} C={C} />

            <button
              type="button"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-[10px] tracking-[0.18em] uppercase transition-all duration-300 active:scale-95"
              style={{
                background: C.champagne,
                color: C.bg,
              }}
              onClick={() => {
                // Future: Add to cart
              }}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              >
                <path d="M3 1L1 3.5V12C1 12.3 1.2 13 1.5 13H12.5C12.8 13 13 12.3 13 12V3.5L11 1H3Z" />
                <path d="M1 3.5H13" />
                <path d="M10 6C10 7.7 8.2 9 7 9C5.8 9 4 7.7 4 6" />
              </svg>
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <FooterSection />
    </>
  );
}
