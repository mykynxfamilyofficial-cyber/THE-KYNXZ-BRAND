"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import Link from "next/link";

/* ─────────────────────────────────────────────
   Demo products for Best Sellers
   ───────────────────────────────────────────── */
const PRODUCTS = [
  {
    id: "premium-wireless-headphones",
    title: "Premium Wireless Headphones",
    gradient:
      "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
    accent: "#D4A84F",
  },
  {
    id: "ocean-blue-perfume",
    title: "Ocean Blue Perfume",
    gradient:
      "linear-gradient(135deg, #0c2340 0%, #1a5276 50%, #2e86c1 100%)",
    accent: "#2E86C1",
  },
  {
    id: "luxury-smart-watch",
    title: "Luxury Smart Watch",
    gradient:
      "linear-gradient(135deg, #1c1c1c 0%, #2d2d2d 50%, #404040 100%)",
    accent: "#D4A84F",
  },
  {
    id: "travel-backpack",
    title: "Travel Backpack",
    gradient:
      "linear-gradient(135deg, #2c1810 0%, #4a2c1a 50%, #6b4423 100%)",
    accent: "#4A3A2C",
  },
  {
    id: "stainless-steel-bottle",
    title: "Stainless Steel Bottle",
    gradient:
      "linear-gradient(135deg, #2c2c2c 0%, #4a4a4a 50%, #6b6b6b 100%)",
    accent: "#C0C0C0",
  },
  {
    id: "premium-sneakers",
    title: "Premium Sneakers",
    gradient:
      "linear-gradient(135deg, #1a1a1a 0%, #2c2c2c 50%, #3d3d3d 100%)",
    accent: "#FFFFFF",
  },
];

/* ─────────────────────────────────────────────
   Inline SVG Arrow Icon
   ───────────────────────────────────────────── */
function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={direction === "left" ? "M10 3L5 8L10 13" : "M6 3L11 8L6 13"} />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Product Card
   ───────────────────────────────────────────── */
function BestSellerCard({
  product,
}: {
  product: (typeof PRODUCTS)[0];
}) {
  return (
    <div className="best-seller-card shrink-0 snap-start">
      <Link
        href={`/collections/${product.id}`}
        className="block group"
      >
        {/* Image area */}
        <div
          className="relative w-full aspect-square rounded-xl overflow-hidden mb-2.5
            transition-transform duration-300 group-hover:-translate-y-1
            group-hover:shadow-[0_12px_40px_rgba(0,0,0,0.25),0_0_30px_var(--color-glow)]"
          style={{ background: product.gradient }}
        >
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background:
                "linear-gradient(160deg, rgba(255,255,255,0.06) 0%, transparent 50%)",
            }}
          />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 md:w-12 md:h-12 opacity-20 group-hover:opacity-30 transition-opacity duration-300">
              <svg viewBox="0 0 60 60" fill="none" stroke="white" strokeWidth="0.8">
                <rect x="10" y="15" width="40" height="35" rx="3" />
                <line x1="10" y1="25" x2="50" y2="25" />
                <line x1="25" y1="15" x2="25" y2="50" />
                <line x1="35" y1="15" x2="35" y2="50" />
                <circle cx="20" cy="38" r="4" />
                <circle cx="40" cy="38" r="4" />
              </svg>
            </div>
          </div>

          <div
            className="absolute inset-0 border border-transparent group-hover:border-opacity-50 rounded-xl transition-all duration-300 pointer-events-none"
            style={{ borderColor: product.accent, opacity: 0.3 }}
          />
        </div>

        <h3 className="best-seller-card-title text-xs md:text-sm font-medium leading-snug line-clamp-2 min-h-[2.2em]">
          {product.title}
        </h3>

        <p className="best-seller-card-seller text-[9px] md:text-[9px] tracking-[0.12em] uppercase mt-1 opacity-60">
          Sold by THE KYNXZ BRAND
        </p>
      </Link>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Best Sellers Section
   ───────────────────────────────────────────── */
export default function BestSellersSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  // Re-check on resize
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => checkScroll());
    ro.observe(el);
    // Initial check after a tick for layout settle
    requestAnimationFrame(() => checkScroll());
    return () => ro.disconnect();
  }, [checkScroll]);

  const scrollBy = useCallback((direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector(".best-seller-card")?.clientWidth || 180;
    const gap = 12;
    const scrollAmount = (cardWidth + gap) * (window.innerWidth >= 1024 ? 3 : 2);
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
    // Small delay to let smooth scroll start, then check position
    setTimeout(() => checkScroll(), 350);
  }, [checkScroll]);

  return (
    <section className="best-sellers-section" aria-labelledby="best-sellers-heading">
      <div className="best-sellers-glass">
        {/* Header */}
        <div className="best-sellers-header">
          <h2 id="best-sellers-heading" className="best-sellers-title">
            Best Sellers
          </h2>
          <p className="best-sellers-subtitle">
            Discover our most loved collections.
          </p>
        </div>

        {/* Product area with navigation */}
        <div className="best-sellers-carousel-wrapper">
          {/* Left arrow */}
          {canScrollLeft && (
            <button
              type="button"
              onClick={() => scrollBy("left")}
              className="best-sellers-scroll-arrow best-sellers-scroll-arrow-left"
              aria-label="Scroll products left"
            >
              <ArrowIcon direction="left" />
            </button>
          )}

          {/* Scrollable cards */}
          <div
            ref={scrollRef}
            className="best-sellers-scroll"
            onScroll={checkScroll}
          >
            {PRODUCTS.map((product) => (
              <BestSellerCard key={product.id} product={product} />
            ))}
          </div>

          {/* Right arrow */}
          {canScrollRight && (
            <button
              type="button"
              onClick={() => scrollBy("right")}
              className="best-sellers-scroll-arrow best-sellers-scroll-arrow-right"
              aria-label="Scroll products right"
            >
              <ArrowIcon direction="right" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
