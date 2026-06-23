"use client";

import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useInView,
} from "framer-motion";
import { playfair, cormorant, inter } from "../../fonts";
import Header from "../../components/Header";
import FooterSection from "../../components/FooterSection";
import { Product } from "../types";

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
    transition: { duration: 0.9, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

/* ───────────────────────────────────────────────
   Carousel slide direction variants
   ─────────────────────────────────────────────── */
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 320 : -320,
    opacity: 0,
    scale: 0.98,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -320 : 320,
    opacity: 0,
    scale: 0.98,
  }),
};

/* ───────────────────────────────────────────────
   Luxury Accordion Panel
   - Collapsible section with smooth Framer Motion animation
   - Rotating chevron icon
   - Subtle gold accent border on hover/open
   ─────────────────────────────────────────────── */
function AccordionPanel({
  title,
  defaultOpen = false,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div
      className="rounded-[2px] overflow-hidden transition-all duration-300"
      style={{
        border: "1px solid var(--color-border)",
        background: "var(--color-surface)",
      }}
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center justify-between px-5 md:px-6 py-4 md:py-5 text-left transition-all duration-300 hover:opacity-80 group"
        aria-expanded={isOpen}
      >
        <span
          className={`${inter.className} text-[11px] md:text-xs tracking-[0.2em] uppercase font-semibold`}
          style={{ color: "var(--color-text-primary)" }}
        >
          {title}
        </span>

        {/* Chevron icon — rotates on open */}
        <motion.svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="shrink-0 opacity-60 group-hover:opacity-100 transition-opacity"
        >
          <path d="M3 5L7 9L11 5" />
        </motion.svg>
      </button>

      {/* Content area with height animation */}
      <div
        style={{
          display: "grid",
          gridTemplateRows: isOpen ? "1fr" : "0fr",
          transition: "grid-template-rows 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <div className="overflow-hidden">
          <div className="px-5 md:px-6 pb-5 md:pb-6">
            {/* Top accent line */}
            <div
              className="h-px w-full mb-4 md:mb-5"
              style={{
                background: `linear-gradient(to right, var(--color-accent), transparent)`,
                opacity: 0.2,
              }}
            />

            {/* Animated fade-in content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isOpen ? 1 : 0 }}
              transition={{ duration: 0.25, delay: isOpen ? 0.1 : 0 }}
            >
              {children}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

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

/* ═══════════════════════════════════════════════
   LUXURY IMAGE GALLERY
   ═══════════════════════════════════════════════ */
function ImageGallery({
  product,
  C,
}: {
  product: Product;
  C: (typeof THEME)["dark"];
}) {
  const allImages = useMemo(
    () => [product.gradient, ...(product.galleryGradients || [])],
    [product]
  );
  const totalImages = allImages.length;

  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [showZoom, setShowZoom] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef(0);

  const goTo = useCallback(
    (index: number) => {
      const next = ((index % totalImages) + totalImages) % totalImages;
      setDirection(next > activeIndex ? 1 : next < activeIndex ? -1 : 0);
      setActiveIndex(next);
    },
    [totalImages, activeIndex]
  );

  const goToNext = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % totalImages);
  }, [totalImages]);

  const goToPrev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + totalImages) % totalImages);
  }, [totalImages]);

  const startAutoPlay = useCallback(() => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    if (totalImages <= 1) return;
    autoPlayRef.current = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % totalImages);
    }, 4000);
  }, [totalImages]);

  const stopAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!isHovering && totalImages > 1) {
      startAutoPlay();
    } else {
      stopAutoPlay();
    }
    return stopAutoPlay;
  }, [isHovering, totalImages, startAutoPlay, stopAutoPlay]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToPrev();
        stopAutoPlay();
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goToNext();
        stopAutoPlay();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrev, stopAutoPlay]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goToNext();
      else goToPrev();
      stopAutoPlay();
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    setZoomPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <div className="space-y-4">
      <div
        ref={imageRef}
        className="detail-image-container relative aspect-[4/3] md:aspect-square rounded-[2px] overflow-hidden group select-none"
        style={{ border: "1px solid var(--color-border)" }}
        onMouseEnter={() => { setShowZoom(true); setIsHovering(true); }}
        onMouseLeave={() => { setShowZoom(false); setIsHovering(false); }}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        tabIndex={0}
        role="region"
        aria-label="Product image gallery"
        aria-roledescription="carousel"
      >
        <div
          className="absolute inset-0"
          style={{
            transform: showZoom && imageRef.current ? "scale(1.5)" : "scale(1)",
            transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
            transition: "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
              style={{
                background: allImages[activeIndex],
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />
          </AnimatePresence>
        </div>

        {totalImages > 1 && (
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); goToPrev(); stopAutoPlay(); }}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20
              w-9 h-9 md:w-10 md:h-10 rounded-full
              flex items-center justify-center
              bg-black/30 backdrop-blur-sm border border-white/10
              opacity-100 md:opacity-0 md:group-hover:opacity-100
              transition-all duration-300
              hover:bg-black/50 hover:scale-105 active:scale-95"
            style={{ color: C.champagne }}
            aria-label="Previous image"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 3L5 8L10 13" />
            </svg>
          </button>
        )}

        {totalImages > 1 && (
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); goToNext(); stopAutoPlay(); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20
              w-9 h-9 md:w-10 md:h-10 rounded-full
              flex items-center justify-center
              bg-black/30 backdrop-blur-sm border border-white/10
              opacity-100 md:opacity-0 md:group-hover:opacity-100
              transition-all duration-300
              hover:bg-black/50 hover:scale-105 active:scale-95"
            style={{ color: C.champagne }}
            aria-label="Next image"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 3L11 8L6 13" />
            </svg>
          </button>
        )}

        {totalImages > 1 && (
          <div
            className="absolute bottom-3 left-3 z-20
              text-[10px] tracking-[0.15em] font-mono
              px-2.5 py-1 rounded-full
              bg-black/30 backdrop-blur-sm border border-white/10"
            style={{ color: C.champagne }}
          >
            {String(activeIndex + 1).padStart(2, "0")} / {String(totalImages).padStart(2, "0")}
          </div>
        )}

        <div className="absolute top-3 right-3 flex gap-2 z-20">
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

        <div
          className="absolute bottom-3 right-3 z-20
            text-[8px] tracking-[0.2em] uppercase
            px-2.5 py-1.5 rounded-full border backdrop-blur-sm
            transition-opacity duration-300 pointer-events-none"
          style={{
            borderColor: "var(--color-border)",
            color: C.champagne,
            background: "rgba(0,0,0,0.3)",
            opacity: showZoom ? 0 : 0.7,
          }}
        >
          Hover to Zoom
        </div>
      </div>

      {totalImages > 1 && (
        <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-thin">
          {allImages.map((bg, i) => (
            <button
              key={i}
              type="button"
              onClick={() => { goTo(i); stopAutoPlay(); }}
              className={`detail-thumbnail relative w-16 h-16 md:w-20 md:h-20 rounded-[2px] overflow-hidden border-2 shrink-0 transition-all duration-300 ${
                i === activeIndex ? "detail-thumbnail-active" : "hover:border-white/30"
              }`}
              style={{
                borderColor: i === activeIndex ? "var(--color-accent)" : "var(--color-border)",
              }}
              aria-label={`View image ${i + 1}`}
              aria-current={i === activeIndex ? "true" : undefined}
            >
              <div
                className="absolute inset-0"
                style={{
                  background: bg,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              />
              {i === activeIndex && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 z-10" style={{ background: "var(--color-accent)" }} />
              )}
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
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
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
              <span className={`${inter.className} text-sm`} style={{ color: C.muted }}>
                {avgRating.toFixed(1)} ({product.reviews?.count || 0})
              </span>
            </div>
          </div>
          <div className="mt-3 w-16 h-px" style={{ background: C.bronze, opacity: 0.4 }} />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {reviewList.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className="detail-review-card p-6 md:p-7 rounded-[2px]"
              style={{ border: "1px solid var(--color-border)", background: C.surface }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className={`${playfair.className} text-sm font-semibold`} style={{ color: C.ivory }}>{review.author}</span>
                  {review.verified && (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill={C.bronze} opacity="0.6">
                      <path d="M7 0L9 4.5L14 5L10.5 8.5L11 14L7 11L3 14L3.5 8.5L0 5L5 4.5L7 0Z" />
                    </svg>
                  )}
                </div>
                <span className="text-[10px] tracking-[0.05em]" style={{ color: C.muted }}>{review.date}</span>
              </div>
              <StarRating rating={review.rating} size={12} />
              <h4 className={`${inter.className} text-sm font-semibold mt-3 mb-2`} style={{ color: C.ivory }}>{review.title}</h4>
              <p className={`${inter.className} text-xs leading-[1.8]`} style={{ color: C.muted }}>&ldquo;{review.content}&rdquo;</p>
              <div className="mt-4 h-px w-8" style={{ background: C.bronze, opacity: 0.2 }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────────
   Related Products — Luxury Horizontal Scroll
   ─────────────────────────────────────────────── */
function RelatedProducts({
  product,
  allProducts,
  C,
}: {
  product: Product;
  allProducts: Product[];
  C: (typeof THEME)["dark"];
}) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const related = useMemo(() => {
    const sameCategory = allProducts.filter(
      (p) => p.category === product.category && p.id !== product.id && !p.isComingSoon
    );
    if (sameCategory.length >= 4) return sameCategory.slice(0, 4);
    const others = allProducts.filter((p) => p.id !== product.id && !sameCategory.includes(p));
    return [...sameCategory, ...others].slice(0, 4);
  }, [product, allProducts]);

  const checkScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [related, checkScroll]);

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = dir === 'left' ? -320 : 320;
    scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
  };

  // Empty state
  if (related.length === 0) {
    return (
      <section ref={sectionRef} className="relative overflow-hidden py-12 md:py-16" style={{ background: C.bgAlt }}>
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          >
            <div className="w-12 h-12 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ background: `radial-gradient(circle at 40% 35%, ${C.bronze}15, transparent 70%)` }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke={C.muted} strokeWidth="1" strokeLinecap="round">
                <circle cx="10" cy="10" r="8" />
                <path d="M10 6V14" />
                <path d="M6 10H14" />
              </svg>
            </div>
            <p className={`${cormorant.className} text-lg italic`} style={{ color: C.muted }}>
              More curated pieces arriving soon.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-12 md:py-16" style={{ background: C.bgAlt }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="mb-8 md:mb-10 text-center"
        >
          <p className={`${inter.className} text-[10px] tracking-[0.25em] uppercase mb-3`} style={{ color: C.bronze }}>Complete The Story</p>
          <h2 className={`${playfair.className} text-2xl md:text-3xl font-bold`} style={{ color: C.ivory }}>
            You May Also{" "}
            <span className="italic font-normal" style={{ color: C.champagne }}>Appreciate</span>
          </h2>
          <div className="mx-auto mt-4 w-16 h-px" style={{ background: C.bronze, opacity: 0.4 }} />
        </motion.div>

        {/* Scroll buttons — desktop only */}
        <div className="hidden md:flex justify-end gap-2 mb-4">
          <button
            type="button"
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className="w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300 hover:bg-white/5 disabled:opacity-20"
            style={{ borderColor: 'var(--color-border)', color: C.champagne }}
            aria-label="Scroll related products left"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 3L5 7L9 11" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className="w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300 hover:bg-white/5 disabled:opacity-20"
            style={{ borderColor: 'var(--color-border)', color: C.champagne }}
            aria-label="Scroll related products right"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 3L9 7L5 11" />
            </svg>
          </button>
        </div>

        {/* Scrollable horizontal container */}
        <div
          ref={scrollRef}
          className="flex gap-4 md:gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-2 -mx-6 px-6"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {related.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className="snap-start shrink-0 w-[calc(50%-8px)] md:w-[calc(25%-15px)] min-w-[200px]"
            >
              <Link
                href={`/collections/${item.id}`}
                className="detail-related-card group block rounded-[2px] overflow-hidden h-full"
                style={{ border: '1px solid var(--color-border)', background: C.surface }}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <div
                    className="absolute inset-0 transition-all duration-700 group-hover:scale-110"
                    style={{
                      background: item.gradient,
                      backgroundSize: item.gradient.startsWith('url(') ? 'contain' : 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                    }}
                  />
                  {/* Soft glow overlay on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(circle at center, ${item.accent}10, transparent 70%)`,
                    }}
                  />
                  {/* Category badge */}
                  <div className="absolute top-2 left-2 z-10">
                    <span
                      className="inline-block text-[7px] tracking-[0.18em] uppercase px-2 py-1 rounded-full border backdrop-blur-sm"
                      style={{
                        borderColor: item.accent,
                        color: item.accent,
                        background: 'rgba(0,0,0,0.4)',
                      }}
                    >
                      {item.category}
                    </span>
                  </div>
                </div>
                <div className="p-3 md:p-4 space-y-1.5">
                  <h3 className={`${playfair.className} text-xs md:text-sm font-bold leading-tight line-clamp-1`} style={{ color: C.ivory }}>{item.name}</h3>
                  <p className={`${inter.className} text-[9px] tracking-[0.15em] uppercase line-clamp-1`} style={{ color: C.bronze }}>{item.tagline || item.description}</p>
                  <div className="flex items-baseline gap-1.5 pt-1">
                    <span className={`${playfair.className} text-sm font-bold`} style={{ color: C.ivory }}>${item.price}</span>
                    {item.originalPrice && <span className="text-[10px] line-through" style={{ color: C.muted }}>${item.originalPrice}</span>}
                  </div>
                </div>
                {/* Bottom accent line */}
                <div
                  className="h-px w-0 group-hover:w-full transition-all duration-500 mx-auto"
                  style={{ background: `linear-gradient(to right, transparent, ${item.accent}, transparent)` }}
                />
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

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  useEffect(() => {
    let cancelled = false;

    async function fetchProduct() {
      setLoading(true);
      try {
        const res = await fetch(`/api/products/${productId}`);
        if (cancelled) return;
        const data = await res.json();
        if (cancelled) return;

        if (res.ok && data.product) {
          if (!cancelled) setProduct(data.product);

          const allRes = await fetch("/api/products");
          if (cancelled) return;
          const allData = await allRes.json();
          if (cancelled) return;
          if (!cancelled) setAllProducts(allData.products || []);
        } else {
          if (!cancelled) setProduct(null);
        }
      } catch (err) {
        if (!cancelled) {
          console.error("Failed to fetch product:", err);
          setProduct(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    if (productId) {
      fetchProduct();
    } else {
      setLoading(false);
    }

    return () => { cancelled = true; };
  }, [productId]);

  useEffect(() => {
    const onScroll = () => { setShowMobileCart(window.scrollY > 400); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!product) return;

    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const url = `${origin}/collections/${product.id}`;
    const title = `${product.name} | THE KYNXZ BRAND`;
    const desc = product.description || product.tagline || `${product.name} — luxury piece from THE KYNXZ BRAND`;

    // Determine the best available image URL for SEO
    // Priority: mainImage → first gallery image → placeholder data URI (neutral 1x1 transparent pixel)
    const PLACEHOLDER_IMAGE = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%221%22 height=%221%22/%3E';
    const imageUrl =
      product.mainImage ||
      product.galleryImages?.[0] ||
      PLACEHOLDER_IMAGE;

    document.title = title;

    // Helper: set meta tag attribute
    const setMeta = (sel: string, attr: string, val: string) => {
      const el = document.querySelector(sel);
      if (el) el.setAttribute(attr, val);
    };

    // Update SEO meta tags
    setMeta('meta[name="description"]', 'content', desc);
    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('meta[property="og:description"]', 'content', desc);
    setMeta('meta[property="og:image"]', 'content', imageUrl || '');
    setMeta('meta[property="og:url"]', 'content', url);
    setMeta('meta[name="twitter:title"]', 'content', title);
    setMeta('meta[name="twitter:description"]', 'content', desc);
    setMeta('meta[name="twitter:image"]', 'content', imageUrl || '');

    // Update canonical
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', url);

    // Inject JSON-LD structured data (Product schema.org)
    const existing = document.getElementById('product-jsonld');
    if (existing) existing.remove();

    const jsonld = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      description: desc,
      brand: { '@type': 'Brand', name: 'THE KYNXZ BRAND' },
      category: product.category,
      offers: {
        '@type': 'Offer',
        priceCurrency: 'USD',
        price: product.price,
        availability: product.isComingSoon
          ? 'https://schema.org/PreOrder'
          : 'https://schema.org/InStock',
        url,
      },
      image: imageUrl || undefined,
      url,
    };

    const script = document.createElement('script');
    script.id = 'product-jsonld';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(jsonld, null, 2);
    document.head.appendChild(script);

    return () => {
      const s = document.getElementById('product-jsonld');
      if (s) s.remove();
    };
  }, [product]);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-[80dvh] flex items-center justify-center" style={{ background: C.bg }}>
          <div className="text-center px-6">
            <div className="w-10 h-10 mx-auto rounded-full animate-spin" style={{ border: "2px solid transparent", borderTopColor: C.champagne, borderRightColor: C.champagne, opacity: 0.5 }} />
            <p className={`${cormorant.className} italic mt-6 text-lg`} style={{ color: C.bronze, opacity: 0.5 }}>Curating the details&hellip;</p>
          </div>
        </main>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Header />
        <main className="min-h-[80dvh] flex items-center justify-center" style={{ background: C.bg }}>
          <div className="text-center px-6">
            <p className={`${cormorant.className} italic text-6xl md:text-8xl mb-6`} style={{ color: C.bronze, opacity: 0.2 }}>&mdash;</p>
            <h1 className={`${playfair.className} text-3xl md:text-5xl font-bold mb-4`} style={{ color: C.ivory }}>Piece Not Found</h1>
            <p className={`${inter.className} text-sm max-w-md mx-auto mb-8`} style={{ color: C.muted }}>
              This product may have been curated out of our collection or the link may be incorrect.
            </p>
            <Link
              href="/collections"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:-translate-y-0.5"
              style={{ borderColor: "var(--color-border)", color: C.champagne }}
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
  const specEntries = product.specifications ? Object.entries(product.specifications) : [];

  return (
    <>
      <Header />

      <main
        role="main"
        aria-label={`${product.name} product detail`}
        className={`${inter.variable} ${playfair.variable} ${cormorant.variable}`}
        style={{ fontFamily: "var(--font-inter), Arial, sans-serif", background: C.bg, overflow: "hidden" }}
      >
        {/* ─── Breadcrumb ─── */}
        <div className="max-w-[1400px] mx-auto px-6 pt-20 md:pt-24 pb-4">
          <nav className="flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase">
            <Link href="/collections" className="transition-colors duration-300 hover:opacity-80" style={{ color: C.muted }}>Collections</Link>
            <span style={{ color: C.muted, opacity: 0.4 }}>/</span>
            <span style={{ color: C.champagne }}>{product.name}</span>
          </nav>
        </div>

        {/* ═══════════════════════════════════════
            SECTION 1 – Product Detail Hero
           ═══════════════════════════════════════ */}
        <section className="max-w-[1400px] mx-auto px-6 pb-8 md:pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
            {/* Left – Image Gallery */}
            <motion.div variants={scaleIn} initial="hidden" animate="visible">
              <ImageGallery product={product} C={C} />
            </motion.div>

            {/* Right – Product Info */}
            <motion.div variants={fadeUp} initial="hidden" animate="visible" className="space-y-6">
              {/* ── Category & Tags ── */}
              <div className="flex items-center gap-3 flex-wrap">
                <span
                  className={`${inter.className} text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 rounded-full border`}
                  style={{ borderColor: "var(--color-border)", color: C.bronze }}
                >
                  {product.category.replace("-", " & ")}
                </span>
                {product.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="text-[9px] tracking-[0.15em] uppercase" style={{ color: C.muted, opacity: 0.6 }}>#{tag}</span>
                ))}
              </div>

              {/* ── Product Name (Reduced size) ── */}
              <div>
                <h1
                  className={`${playfair.className} text-[clamp(1.5rem,3.8vw,2.5rem)] font-bold leading-[1.1] tracking-[-0.01em]`}
                  style={{ color: C.ivory }}
                >
                  {product.name}
                </h1>
                <p className={`${inter.className} mt-2 text-xs tracking-[0.2em] uppercase`} style={{ color: C.bronze }}>
                  {product.tagline}
                </p>
              </div>

              {/* ── Price Section ── */}
              <div className="flex items-baseline gap-3">
                <span className={`${playfair.className} text-3xl md:text-4xl font-bold`} style={{ color: C.ivory }}>
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-lg line-through" style={{ color: C.muted }}>${product.originalPrice}</span>
                )}
                <span className="text-[10px] tracking-[0.12em] uppercase" style={{ color: C.muted }}>USD</span>
                {product.reviews && (
                  <div className="flex items-center gap-1.5 ml-auto">
                    <StarRating rating={product.reviews.rating} size={12} />
                    <span className="text-[10px]" style={{ color: C.muted }}>
                      {product.reviews.rating.toFixed(1)} ({product.reviews.count})
                    </span>
                  </div>
                )}
              </div>

              {/* ── Quantity Selector ── */}
              <QuantitySelector value={quantity} onChange={setQuantity} C={C} />

              {/* ── Trust Badges ── */}
              <div className="grid grid-cols-2 md:flex md:flex-wrap gap-2 md:gap-3 pt-1">
                {[
                  { icon: '✦', label: 'Premium Quality' },
                  { icon: '🔒', label: 'Secure Payments' },
                  { icon: '🌍', label: 'Worldwide Shipping' },
                  { icon: '↩️', label: 'Easy Returns' },
                  { icon: '◆', label: 'Curated Collection' },
                ].map((badge) => (
                  <motion.div
                    key={badge.label}
                    whileHover={{ y: -2 }}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-full border text-[9px] tracking-[0.12em] uppercase transition-all duration-300 hover:border-opacity-60"
                    style={{
                      borderColor: 'var(--color-border)',
                      color: C.muted,
                      background: C.surface,
                    }}
                  >
                    <span style={{ color: C.champagne }}>{badge.icon}</span>
                    <span className={`${inter.className}`}>{badge.label}</span>
                  </motion.div>
                ))}
              </div>

              {/* ── Accent divider ── */}
              <div className="h-px w-full" style={{ background: `linear-gradient(to right, ${C.champagne}20, transparent)` }} />

              {/* ── Action Buttons ── */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  className="group flex-1 inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full border text-xs tracking-[0.18em] uppercase transition-all duration-500 hover:-translate-y-0.5"
                  style={{
                    borderColor: C.champagne,
                    color: C.ivory,
                    background: `linear-gradient(135deg, ${C.champagne}15, transparent)`,
                  }}
                  onClick={() => { /* Future: Add to cart */ }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 1L1 3.5V12C1 12.3 1.2 13 1.5 13H12.5C12.8 13 13 12.3 13 12V3.5L11 1H3Z" />
                    <path d="M1 3.5H13" />
                    <path d="M10 6C10 7.7 8.2 9 7 9C5.8 9 4 7.7 4 6" />
                  </svg>
                  <span>Add to Cart</span>
                  <span className="w-px h-4 opacity-30" style={{ background: C.champagne }} />
                  <span className={`${playfair.className} text-sm font-bold`}>${totalPrice}</span>
                </button>

                <button
                  type="button"
                  className="flex-1 inline-flex items-center justify-center px-8 py-4 rounded-full text-xs tracking-[0.18em] uppercase transition-all duration-500 hover:-translate-y-0.5"
                  style={{ background: C.champagne, color: C.bg }}
                  onClick={() => { /* Future: Buy now */ }}
                >
                  Buy Now
                </button>
              </div>

              {/* ── Accordion Sections ── */}
              <div className="space-y-3 pt-2">
                {/* Product Description */}
                <AccordionPanel title="Product Description">
                  <p className={`${inter.className} text-sm leading-[1.9]`} style={{ color: C.muted }}>
                    {product.detailedDescription || product.description}
                  </p>
                </AccordionPanel>

                {/* Specifications */}
                {specEntries.length > 0 && (
                  <AccordionPanel title="Specifications">
                    <div className="space-y-3">
                      {specEntries.map(([key, value], i) => (
                        <div
                          key={key}
                          className="flex flex-col sm:flex-row sm:items-center pb-3"
                          style={{
                            borderBottom: i < specEntries.length - 1 ? "1px solid var(--color-border)" : "none",
                          }}
                        >
                          <span
                            className={`${inter.className} text-[10px] tracking-[0.15em] uppercase font-semibold sm:w-1/3 mb-0.5 sm:mb-0`}
                            style={{ color: C.bronze }}
                          >
                            {key}
                          </span>
                          <span className={`${inter.className} text-sm sm:w-2/3`} style={{ color: C.ivory }}>
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </AccordionPanel>
                )}

                {/* Shipping Information */}
                <AccordionPanel title="Shipping Information">
                  <p className={`${inter.className} text-sm leading-[1.9]`} style={{ color: C.muted }}>
                    Orders are carefully prepared and shipped worldwide. Estimated delivery times vary by destination.
                    {product.shippingInfo?.estimatedDays && ` Standard delivery typically takes ${product.shippingInfo.estimatedDays}.`}
                  </p>
                </AccordionPanel>

                {/* Returns & Refunds */}
                <AccordionPanel title="Returns & Refunds">
                  <p className={`${inter.className} text-sm leading-[1.9]`} style={{ color: C.muted }}>
                    We accept returns on eligible items within our return window. Please review our{" "}
                    <Link href="/return-policy" className="underline underline-offset-2 hover:opacity-70 transition-opacity" style={{ color: C.champagne }}>return policy</Link>
                    {" "}for full details. Items must be returned in their original condition and packaging.
                  </p>
                  {product.shippingInfo?.returnPolicy && (
                    <p className={`${inter.className} text-sm leading-[1.9] mt-3`} style={{ color: C.muted }}>
                      {product.shippingInfo.returnPolicy}
                    </p>
                  )}
                </AccordionPanel>

                {/* Product Care */}
                <AccordionPanel title="Product Care">
                  <div className="space-y-3">
                    {product.material && (
                      <div className="flex items-start gap-3">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke={C.champagne} strokeWidth="1" strokeLinecap="round" className="mt-0.5 shrink-0">
                          <circle cx="7" cy="7" r="6" />
                          <path d="M7 4V7L9 9" />
                        </svg>
                        <div>
                          <p className={`${inter.className} text-[10px] font-semibold`} style={{ color: C.ivory }}>Material</p>
                          <p className={`${inter.className} text-[11px]`} style={{ color: C.muted }}>{product.material}</p>
                        </div>
                      </div>
                    )}
                    <p className={`${inter.className} text-sm leading-[1.9]`} style={{ color: C.muted }}>
                      To preserve the beauty of your item, avoid prolonged exposure to moisture, direct sunlight, and harsh chemicals. Store in a cool, dry place when not in use. For specific care instructions, refer to the care card included with your purchase.
                    </p>
                  </div>
                </AccordionPanel>

                {/* Brand Promise */}
                <AccordionPanel title="Brand Promise">
                  <p className={`${inter.className} text-sm leading-[1.9]`} style={{ color: C.muted }}>
                    Every piece at THE KYNXZ BRAND is selected with a commitment to timeless elegance, premium quality, and exceptional customer experience. We stand behind the craftsmanship of every item in our collection and are dedicated to ensuring your complete satisfaction.
                  </p>
                  <div className="mt-4 h-px w-12" style={{ background: C.champagne, opacity: 0.3 }} />
                </AccordionPanel>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            SECTION 2 – Key Features
           ═══════════════════════════════════════ */}
        {product.features && product.features.length > 0 && (
          <section className="relative overflow-hidden py-12 md:py-16 detail-section-alt">
            <div className="max-w-[1200px] mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                  className="hidden lg:block"
                >
                  <div
                    className="relative w-full aspect-square rounded-[2px] overflow-hidden"
                    style={{ border: "1px solid var(--color-border)", background: product.galleryGradients?.[0] || product.gradient }}
                  >
                    <div
                    className="absolute inset-0"
                    style={{
                      background: product.galleryGradients?.[0] || product.gradient,
                      backgroundSize: (product.galleryGradients?.[0] || product.gradient).startsWith("url(") ? "contain" : "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  />
                  </div>
                </motion.div>

                <div className="space-y-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                  >
                    <p className={`${inter.className} text-[10px] tracking-[0.25em] uppercase mb-3`} style={{ color: C.bronze }}>Key Features</p>
                    <h2 className={`${playfair.className} text-2xl md:text-3xl font-bold`} style={{ color: C.ivory }}>
                      What sets this{" "}
                      <span className="italic font-normal" style={{ color: C.champagne }}>piece apart</span>
                    </h2>
                    <div className="mt-4 w-16 h-px" style={{ background: C.bronze, opacity: 0.4 }} />
                  </motion.div>

                  <div className="space-y-4">
                    {product.features.map((feature, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                        className="detail-feature-item flex items-start gap-4 p-4 rounded-[2px]"
                        style={{ borderBottom: "1px solid var(--color-border)" }}
                      >
                        <span className="mt-1 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: C.bronze, opacity: 0.5 }} />
                        <p className={`${inter.className} text-sm leading-[1.7]`} style={{ color: C.muted }}>{feature}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ═══════════════════════════════════════
            SECTION 3 – Customer Reviews
           ═══════════════════════════════════════ */}
        <ReviewsSection product={product} C={C} />

        {/* ═══════════════════════════════════════
            SECTION 4 – Related Products
           ═══════════════════════════════════════ */}
        <RelatedProducts product={product} allProducts={allProducts} C={C} />

        {/* ═══════════════════════════════════════
            SECTION 5 – Back to Collections CTA
           ═══════════════════════════════════════ */}
        <section className="relative overflow-hidden py-10 md:py-14" style={{ background: C.bg }}>
          <div className="max-w-[1200px] mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            >
              <Link
                href="/collections"
                className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full border text-xs tracking-[0.2em] uppercase transition-all duration-500 hover:-translate-y-0.5"
                style={{ borderColor: "var(--color-border)", color: C.champagne }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" className="transition-transform duration-400 group-hover:-translate-x-1">
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
        className={`detail-sticky-cart ${showMobileCart ? "detail-sticky-cart-visible" : ""} lg:hidden`}
        style={{ background: C.bgAlt, borderTop: "1px solid var(--color-border)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}
      >
        <div className="max-w-[1400px] mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-baseline gap-2">
            <span className={`${playfair.className} text-lg font-bold`} style={{ color: C.ivory }}>${product.price}</span>
            {product.originalPrice && <span className="text-xs line-through" style={{ color: C.muted }}>${product.originalPrice}</span>}
          </div>
          <div className="flex items-center gap-3">
            <QuantitySelector value={quantity} onChange={setQuantity} C={C} />
            <button
              type="button"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-[10px] tracking-[0.18em] uppercase transition-all duration-300 active:scale-95"
              style={{ background: C.champagne, color: C.bg }}
              onClick={() => { /* Future: Add to cart */ }}
            >
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
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
