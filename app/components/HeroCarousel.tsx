"use client";

import { useEffect, useRef, useState } from "react";

const SLIDES = [
  {
    desktop: "/orange-1.png",
    mobile: "/orange-2.png",
  },
  {
    desktop: "/blue-1.png",
    mobile: "/blue-2.png",
  },
];

const TOTAL = SLIDES.length;
const AUTO_INTERVAL = 6000;
const FADE_DURATION = 700;

export default function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const transitioningRef = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Keep ref in sync
  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  // Safely advance to a target slide
  const goTo = (next: number) => {
    if (transitioningRef.current) return;
    const target = ((next % TOTAL) + TOTAL) % TOTAL;
    if (target === activeIndexRef.current) return;

    transitioningRef.current = true;
    setActiveIndex(target);
    setTimeout(() => {
      transitioningRef.current = false;
    }, FADE_DURATION);

    // Reset auto-rotation timer on manual navigation
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % TOTAL);
      }, AUTO_INTERVAL);
    }
  };

  // Store goTo in a ref so keyboard handler always has the latest version
  const goToRef = useRef(goTo);
  goToRef.current = goTo;

  // Auto-rotation
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TOTAL);
    }, AUTO_INTERVAL);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Pause auto-rotation when tab is hidden
  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      } else {
        intervalRef.current = setInterval(() => {
          setActiveIndex((prev) => (prev + 1) % TOTAL);
        }, AUTO_INTERVAL);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  // Keyboard navigation — uses ref so no stale closures
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToRef.current(activeIndexRef.current - 1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goToRef.current(activeIndexRef.current + 1);
      }
    };

    el.addEventListener("keydown", handleKeyDown);
    el.setAttribute("tabindex", "0");
    el.setAttribute("role", "region");
    el.setAttribute("aria-label", "Hero image carousel");
    el.setAttribute("aria-roledescription", "carousel");

    return () => el.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div
      ref={carouselRef}
      className="hero-carousel-area"
      aria-live="polite"
    >
      {/* Slide images — always in DOM for smooth transitions */}
      {SLIDES.map((slide, i) => (
        <div key={i} aria-hidden={i !== activeIndex}>
          {/* Desktop image */}
          <img
            src={slide.desktop}
            alt=""
            loading={i === 0 ? "eager" : "lazy"}
            className={`hidden lg:block absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out
              ${i === activeIndex ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            style={{
              maskImage:
                "linear-gradient(to bottom, black 0%, black 70%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, black 0%, black 70%, transparent 100%)",
            }}
          />
          {/* Mobile/tablet image */}
          <img
            src={slide.mobile}
            alt=""
            loading={i === 0 ? "eager" : "lazy"}
            className={`lg:hidden absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out
              ${i === activeIndex ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            style={{
              maskImage:
                "linear-gradient(to bottom, black 0%, black 70%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, black 0%, black 70%, transparent 100%)",
            }}
          />
        </div>
      ))}

      {/* Navigation arrows */}
      <button
        type="button"
        onClick={() => goTo(activeIndex - 1)}
        className="hero-carousel-arrow hero-carousel-arrow-left"
        aria-label="Previous slide"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="hero-carousel-arrow-icon"
        >
          <path d="M11 4L6 9L11 14" />
        </svg>
      </button>

      <button
        type="button"
        onClick={() => goTo(activeIndex + 1)}
        className="hero-carousel-arrow hero-carousel-arrow-right"
        aria-label="Next slide"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="hero-carousel-arrow-icon"
        >
          <path d="M7 4L12 9L7 14" />
        </svg>
      </button>

      {/* Slide indicators */}
      <div className="hero-carousel-indicators" aria-hidden="true">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            className={`hero-carousel-dot ${i === activeIndex ? "hero-carousel-dot-active" : ""}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
