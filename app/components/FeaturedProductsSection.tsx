"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { playfair, inter } from "../fonts";
import type { Product } from "../collections/types";

/* ───────────────────────────────────────────────
   Animation variants
   ─────────────────────────────────────────────── */
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
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
   Product Card (matching collections page style)
   ─────────────────────────────────────────────── */
function FeaturedImageCarousel({ product }: { product: Product }) {
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

  useEffect(() => { setActiveIndex(0); }, [product.id]);

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

  return (
    <div
      className="absolute inset-0"
      style={{ background: "var(--color-surface)" }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
          style={bgStyle}
        />
      </AnimatePresence>
    </div>
  );
}

function FeaturedProductCard({ product, index }: { product: Product; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={cardRef}
      variants={cardReveal}
      custom={index}
      className="h-full"
    >
      <Link
        href={`/collections/${product.id}`}
        className="featured-card group relative block rounded-[2px] overflow-hidden h-full flex flex-col"
        style={{
          border: "1px solid var(--color-border)",
          background: "var(--color-surface)",
        }}
      >
        {/* Clean image area - no watermarks, no overlays */}
        <div className="relative overflow-hidden aspect-[4/3] shrink-0">
          <FeaturedImageCarousel product={product} />

          {/* Badges */}
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

          {/* View Details indicator */}
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
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
                <path d="M3 1L7 5L3 9" />
              </svg>
            </span>
          </div>

          {/* Hover border accent */}
          <div
            className="absolute inset-0 border border-transparent group-hover:border-opacity-40 transition-all duration-700 pointer-events-none rounded-[2px] z-10"
            style={{ borderColor: product.accent, opacity: 0 }}
          />
        </div>

        {/* Info section */}
        <div className="p-5 md:p-6 space-y-3 flex-1 flex flex-col">
          <h3
            className={`${playfair.className} text-lg md:text-xl font-bold leading-[1.2] tracking-[0.02em] line-clamp-2`}
            style={{ color: "var(--color-text-primary)" }}
          >
            {product.name}
          </h3>

          <p
            className={`${inter.className} text-xs tracking-[0.15em] uppercase`}
            style={{ color: "var(--color-accent)" }}
          >
            {product.tagline}
          </p>

          <p
            className={`${inter.className} text-sm leading-[1.7] line-clamp-2 flex-1`}
            style={{ color: "var(--color-text-muted)" }}
          >
            {product.description}
          </p>

          <div className="flex items-baseline gap-2 pt-2">
            <span
              className={`${playfair.className} text-lg font-bold`}
              style={{ color: "var(--color-text-primary)" }}
            >
              ${product.price}
            </span>
            {product.originalPrice && (
              <span
                className="text-xs line-through"
                style={{ color: "var(--color-text-muted)" }}
              >
                ${product.originalPrice}
              </span>
            )}
            <span className="text-[9px] tracking-[0.12em] uppercase" style={{ color: "var(--color-text-muted)" }}>
              USD
            </span>
          </div>

          {/* Accent line */}
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
            Discover this piece &rarr;
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

/* ───────────────────────────────────────────────
   FeaturedProductsSection
   ─────────────────────────────────────────────── */
export default function FeaturedProductsSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Fetch featured products from Sanity
  useEffect(() => {
    let cancelled = false;

    async function fetchFeatured() {
      try {
        const res = await fetch("/api/products?featured=true");
        if (cancelled) return;
        const data = await res.json();
        if (cancelled) return;
        setProducts(data.products || []);
      } catch (err) {
        console.error("Failed to fetch featured products:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchFeatured();
    return () => { cancelled = true; };
  }, []);

  // Intersection observer for section entrance
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -60px 0px" }
    );

    const el = sectionRef.current;
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Don't render if no products (after loading)
  if (!loading && products.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className="featured-products-section relative overflow-hidden py-5 md:py-6 lg:py-8"
      aria-labelledby="featured-heading"
    >
      {/* Gradient bridge from previous section */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-10 lg:h-12 -translate-y-full pointer-events-none z-10"
        style={{
          background: "linear-gradient(to bottom, transparent, var(--color-background))",
        }}
      />

      {/* Dark: gold ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[15%] -translate-x-1/2 rounded-full
        opacity-0 data-[theme=dark]:opacity-100 transition-opacity duration-700
        h-[500px] w-[1200px] bg-[radial-gradient(circle_at_center,rgba(212,168,79,0.05),rgba(212,168,79,0.01),transparent)] blur-3xl"
        data-theme="dark"
      />
      {/* Light: warm ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[20%] -translate-x-1/2 rounded-full
        opacity-0 data-[theme=light]:opacity-100 transition-opacity duration-700
        h-[450px] w-[1150px] bg-[radial-gradient(circle_at_center,#EDE9E2/40,#F3F1EC/15,transparent)] blur-3xl"
        data-theme="light"
      />

      <div className="luxury-container relative z-10">
        {/* Section header */}
        <div className="text-center mb-6 md:mb-7 lg:mb-9">
          <p
            className={`text-xs tracking-[0.28em] uppercase mb-3 transition-all duration-900 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
            style={{
              color: "var(--color-accent)",
              transitionDelay: "100ms",
              transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            Featured Pieces
          </p>

          <h2
            id="featured-heading"
            className={`text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[0.12em] leading-[1.08] transition-all duration-900 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
            style={{
              color: "var(--color-text-primary)",
              transitionDelay: "220ms",
              transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            Curated{" "}
            <span style={{ color: "var(--color-accent)" }}>Highlights</span>
          </h2>

          <p
            className={`mx-auto mt-3 max-w-xl text-sm md:text-base leading-relaxed transition-all duration-900 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
            style={{
              color: "var(--color-text-muted)",
              transitionDelay: "340ms",
              transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            A selection of our most distinguished pieces, chosen for their
            exceptional craftsmanship and timeless appeal.
          </p>

          <div
            className={`mx-auto mt-4 h-px w-12 transition-all duration-900 ${
              isVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
            }`}
            style={{
              background: "var(--color-accent)",
              transitionDelay: "460ms",
              transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          />
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="rounded-[2px] overflow-hidden animate-pulse"
                style={{
                  border: "1px solid var(--color-border)",
                  background: "var(--color-surface)",
                }}
              >
                <div className="aspect-[4/3]" style={{ background: "var(--color-border)" }} />
                <div className="p-5 md:p-6 space-y-3">
                  <div className="h-5 w-3/4 rounded" style={{ background: "var(--color-border)" }} />
                  <div className="h-3 w-1/2 rounded" style={{ background: "var(--color-border)" }} />
                  <div className="h-4 w-full rounded" style={{ background: "var(--color-border)" }} />
                  <div className="h-5 w-1/4 rounded" style={{ background: "var(--color-border)" }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Product grid */}
        {!loading && products.length > 0 && (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6"
          >
            {products.slice(0, 4).map((product, i) => (
              <FeaturedProductCard key={product.id} product={product} index={i} />
            ))}
          </motion.div>
        )}

        {/* Browse all CTA */}
        {!loading && products.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="mt-10 md:mt-12 text-center"
          >
            <Link
              href="/collections"
              className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full border text-xs tracking-[0.2em] uppercase transition-all duration-500 hover:-translate-y-0.5"
              style={{
                borderColor: "var(--color-border)",
                color: "var(--color-text-primary)",
              }}
            >
              <span>Browse All Collections</span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                className="transition-transform duration-400 group-hover:translate-x-1"
              >
                <path d="M4 2L8 6L4 10" />
              </svg>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
