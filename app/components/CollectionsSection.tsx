"use client";

import { useEffect, useRef, useState } from "react";

const collections = [
  {
    title: "Home & Living",
    description:
      "Curated interiors that transform spaces into sanctuaries. Every piece selected for its quiet strength and enduring beauty.",
    accent: "from-[#D4A84F]/25 via-[#D4A84F]/10 to-transparent",
    decor: "house",
  },
  {
    title: "Pet Essentials",
    description:
      "Luxury for the companions who share our lives. Thoughtfully crafted essentials that honour the bond between human and animal.",
    accent: "from-[#C4A882]/25 via-[#C4A882]/10 to-transparent",
    decor: "paw",
  },
  {
    title: "Travel",
    description:
      "Refined journeys begin with refined belongings. Travel pieces designed for the discerning nomad who values both form and function.",
    accent: "from-[#D4A84F]/20 via-[#D4A84F]/8 to-transparent",
    decor: "compass",
  },
  {
    title: "Lifestyle",
    description:
      "The everyday elevated. Objects of quiet intention that bring ritual and elegance to the moments that matter most.",
    accent: "from-[#B8A47A]/25 via-[#B8A47A]/10 to-transparent",
    decor: "diamond",
  },
  {
    title: "Accessories",
    description:
      "Details that define. From refined leather to precious metal, each accessory is a finishing note in the composition of self.",
    accent: "from-[#D4A84F]/25 via-[#D4A84F]/10 to-transparent",
    decor: "ring",
  },
];

function DecorIcon({ type }: { type: string }) {
  switch (type) {
    case "house":
      return (
        <svg viewBox="0 0 60 60" className="w-full h-full opacity-30">
          <polygon
            points="30,6 6,28 12,28 12,52 24,52 24,38 36,38 36,52 48,52 48,28 54,28"
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="0.8"
          />
          <rect x="24" y="24" width="12" height="10" fill="none" stroke="var(--color-accent)" strokeWidth="0.6" />
        </svg>
      );
    case "paw":
      return (
        <svg viewBox="0 0 60 60" className="w-full h-full opacity-30">
          <circle cx="20" cy="18" r="6" fill="none" stroke="var(--color-accent)" strokeWidth="0.7" />
          <circle cx="40" cy="18" r="6" fill="none" stroke="var(--color-accent)" strokeWidth="0.7" />
          <circle cx="12" cy="32" r="7" fill="none" stroke="var(--color-accent)" strokeWidth="0.7" />
          <circle cx="48" cy="32" r="7" fill="none" stroke="var(--color-accent)" strokeWidth="0.7" />
          <ellipse cx="30" cy="40" rx="14" ry="10" fill="none" stroke="var(--color-accent)" strokeWidth="0.7" />
        </svg>
      );
    case "compass":
      return (
        <svg viewBox="0 0 60 60" className="w-full h-full opacity-30">
          <circle cx="30" cy="30" r="22" fill="none" stroke="var(--color-accent)" strokeWidth="0.7" />
          <circle cx="30" cy="30" r="16" fill="none" stroke="var(--color-accent)" strokeWidth="0.4" strokeDasharray="2 3" />
          <polygon points="30,8 26,30 30,52 34,30" fill="none" stroke="var(--color-accent)" strokeWidth="0.7" />
          <polygon points="8,30 30,26 52,30 30,34" fill="none" stroke="var(--color-accent)" strokeWidth="0.7" />
          <circle cx="30" cy="30" r="3" fill="var(--color-accent)" opacity="0.4" />
        </svg>
      );
    case "diamond":
      return (
        <svg viewBox="0 0 60 60" className="w-full h-full opacity-30">
          <polygon
            points="30,4 52,30 30,56 8,30"
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="0.7"
          />
          <polygon
            points="30,12 44,30 30,48 16,30"
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="0.4"
            strokeDasharray="2 3"
          />
          <line x1="30" y1="4" x2="30" y2="56" stroke="var(--color-accent)" strokeWidth="0.3" strokeDasharray="1 4" />
          <line x1="8" y1="30" x2="52" y2="30" stroke="var(--color-accent)" strokeWidth="0.3" strokeDasharray="1 4" />
        </svg>
      );
    case "ring":
      return (
        <svg viewBox="0 0 60 60" className="w-full h-full opacity-30">
          <circle cx="30" cy="22" r="14" fill="none" stroke="var(--color-accent)" strokeWidth="0.7" />
          <circle cx="30" cy="22" r="10" fill="none" stroke="var(--color-accent)" strokeWidth="0.4" strokeDasharray="1.5 3" />
          <circle cx="30" cy="22" r="3" fill="var(--color-accent)" opacity="0.3" />
          <rect x="26" y="32" width="8" height="20" rx="3" fill="none" stroke="var(--color-accent)" strokeWidth="0.6" />
          <line x1="26" y1="34" x2="26" y2="50" stroke="var(--color-accent)" strokeWidth="0.3" strokeDasharray="1 3" />
          <line x1="34" y1="34" x2="34" y2="50" stroke="var(--color-accent)" strokeWidth="0.3" strokeDasharray="1 3" />
        </svg>
      );
    default:
      return null;
  }
}

export default function CollectionsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -60px 0px" }
    );

    const el = sectionRef.current;
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Stagger card reveal using individual IntersectionObservers
  useEffect(() => {
    if (!isVisible) return;

    const cardEls = sectionRef.current?.querySelectorAll(".collection-card");
    if (!cardEls) return;

    const observers: IntersectionObserver[] = [];

    cardEls.forEach((card, i) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleCards((prev) => new Set(prev).add(i));
            observer.disconnect();
          }
        },
        { threshold: 0.2 }
      );
      observer.observe(card);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      className="collections-section relative overflow-hidden py-5 md:py-6 lg:py-8"
      aria-labelledby="collections-heading"
    >
      {/* Gradient bridge from Philosophy section */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-10 lg:h-12 -translate-y-full pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(to bottom, transparent, var(--color-background))",
        }}
      />

      {/* Dark: ambient champagne glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[15%] -translate-x-1/2 rounded-full
        opacity-0 data-[theme=dark]:opacity-100 transition-opacity duration-700
        h-[600px] w-[1400px] bg-[radial-gradient(circle_at_center,rgba(212,168,79,0.10),rgba(212,168,79,0.03),transparent)] blur-3xl"
        data-theme="dark"
      />

      {/* Light: warm ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[20%] -translate-x-1/2 rounded-full
        opacity-0 data-[theme=light]:opacity-100 transition-opacity duration-700
        h-[500px] w-[1300px] bg-[radial-gradient(circle_at_center,#EDE9E2/45,#F3F1EC/20,transparent)] blur-3xl"
        data-theme="light"
      />

      <div className="luxury-container relative z-10">
        {/* Section header */}
        <div className="text-center mb-6 md:mb-7 lg:mb-9">
          <p
            className={`text-xs tracking-[0.28em] uppercase mb-3 transition-all duration-900 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-5"
            }`}
            style={{
              color: "var(--color-accent)",
              transitionDelay: "100ms",
              transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            Collections
          </p>

          <h2
            id="collections-heading"
            className={`text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[0.12em] leading-[1.08] transition-all duration-900 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-5"
            }`}
            style={{
              color: "var(--color-text-primary)",
              transitionDelay: "220ms",
              transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            Our{" "}
            <span style={{ color: "var(--color-accent)" }}>Collections</span>
          </h2>

          <div
            className={`mx-auto mt-4 h-px w-12 transition-all duration-900 ${
              isVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
            }`}
            style={{
              background: "var(--color-accent)",
              transitionDelay: "340ms",
              transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          />
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-4">
          {collections.map((item, i) => (
            <div
              key={item.title}
              className={`collection-card group glass-premium rounded-2xl border transition-all duration-700 ${
                visibleCards.has(i)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{
                transitionDelay: `${i * 120}ms`,
                transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              {/* Hover glow effect */}
              <div
                aria-hidden
                className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"
                style={{
                  boxShadow: "0 0 40px var(--color-glow)",
                }}
              />

              {/* Card inner */}
              <div className="relative z-10 p-6 md:p-8">
                {/* Decorative artwork */}
                <div className="w-20 h-20 md:w-24 md:h-24 mb-5 flex items-center justify-center">
                  <div
                    className="w-full h-full rounded-full flex items-center justify-center"
                    style={{
                      background:
                        "radial-gradient(circle at 40% 35%, var(--color-accent)/10, transparent 70%)",
                    }}
                  >
                    <div className="w-14 h-14 md:w-16 md:h-16">
                      <DecorIcon type={item.decor} />
                    </div>
                  </div>
                </div>

                {/* Card number */}
                <p
                  className="text-[10px] tracking-[0.3em] uppercase mb-2 font-mono"
                  style={{ color: "var(--color-accent)" }}
                >
                  {`0${i + 1}`}
                </p>

                {/* Card title */}
                <h3
                  className="text-xl md:text-2xl font-semibold tracking-[0.08em] mb-2"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  {item.title}
                </h3>

                {/* Description */}
                <p
                  className="text-sm md:text-base leading-[1.75]"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {item.description}
                </p>

                {/* Accent line */}
                <div
                  className="mt-4 h-px w-10 transition-all duration-500 group-hover:w-16"
                  style={{ background: "var(--color-accent)" }}
                />

                {/* Explore hint */}
                <p
                  className="mt-3 text-[10px] tracking-[0.25em] uppercase opacity-0 transition-all duration-500 group-hover:opacity-60"
                  style={{ color: "var(--color-accent)" }}
                >
                  Explore Collection
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
