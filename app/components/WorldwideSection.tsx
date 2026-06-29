"use client";

import { useEffect, useRef, useState } from "react";

/* ───────────────────────────────────────────────
   Marketplace Data
   ─────────────────────────────────────────────── */

interface Marketplace {
  name: string;
  tagline: string;
  description: string;
  icon: string;
}

const marketplaces: Marketplace[] = [
  {
    name: "Amazon",
    tagline: "Global reach with world-class fulfillment.",
    description: "Available on the world's most trusted e-commerce platform.",
    icon: "/amazon.png",
  },
  {
    name: "Walmart",
    tagline: "Trusted retail excellence at scale.",
    description: "Reaching millions through America's largest retailer.",
    icon: "/walmart.png",
  },
  {
    name: "Etsy",
    tagline: "Curated craftsmanship for discerning customers.",
    description: "Connecting with those who value artisanal excellence.",
    icon: "/etsy.png",
  },
  {
    name: "Meta Platforms",
    tagline: "Luxury discovery through social commerce.",
    description: "Facebook Marketplace & Instagram Shop integration.",
    icon: "/meta.png",
  },
  {
    name: "TikTok Marketplace",
    tagline: "Modern commerce powered by culture and innovation.",
    description: "Engaging the next generation of luxury consumers.",
    icon: "/tiktok.png",
  },
];

/* ───────────────────────────────────────────────
   Stat item data
   ─────────────────────────────────────────────── */

const stats = [
  { value: 5, suffix: "+", label: "Global Marketplaces" },
  { value: 100, suffix: "M+", label: "Potential Customers", multiplier: true },
  { value: 24, suffix: "/7", label: "Worldwide Accessibility" },
  { value: 100, suffix: "%", label: "Premium Experience", multiplier: false },
];

/* ───────────────────────────────────────────────
   Animated Counter Component
   ─────────────────────────────────────────────── */ function AnimatedCounter({
  value,
  suffix,
  isInView,
  multiplier,
}: {
  value: number;
  suffix: string;
  isInView: boolean;
  multiplier?: boolean;
}) {
  const [count, setCount] = useState(0);
  const [showLabel, setShowLabel] = useState(false);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!isInView || startedRef.current) return;
    startedRef.current = true;

    const target = multiplier ? 90 : value; // count to 90 then show label
    const duration = 2000;
    const stepTime = 16;
    const steps = duration / stepTime;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
        if (multiplier) {
          setTimeout(() => setShowLabel(true), 300);
        }
      } else {
        setCount(Math.floor(current));
      }
    }, stepTime);

    return () => {
      clearInterval(timer);
    };
  }, [isInView, value, multiplier]);

  return (
    <span className="text-2xl md:text-3xl lg:text-4xl font-bold tabular-nums" style={{ color: "var(--color-accent)" }}>
      {showLabel ? (
        <span className="transition-all duration-500 opacity-100">
          Millions
        </span>
      ) : (
        <span className="transition-all duration-300 opacity-100">
          {count}{count < 10 ? <span className="opacity-30">+</span> : "+"}
        </span>
      )}
      {!showLabel && <span className="text-lg md:text-xl">{suffix}</span>}
    </span>
  );
}

/* ═══════════════════════════════════════════════
   WORLDWIDE SECTION — Available Worldwide
   ═══════════════════════════════════════════════ */

export default function WorldwideSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.08, rootMargin: "0px 0px -60px 0px" }
    );
    const el = sectionRef.current;
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const cardEls = sectionRef.current?.querySelectorAll(".marketplace-card");
    if (!cardEls) return;
    const observers: IntersectionObserver[] = [];
    cardEls.forEach((card, i) => {
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleCards((prev) => new Set(prev).add(i));
            obs.disconnect();
          }
        },
        { threshold: 0.2 }
      );
      obs.observe(card);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-3 md:py-4 lg:py-6"
      aria-labelledby="worldwide-heading"
    >
      {/* Gradient bridge from Experience section */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-10 lg:h-12 -translate-y-full pointer-events-none z-10"
        style={{
          background: "linear-gradient(to bottom, transparent, var(--color-background))",
        }}
      />

      {/* Warm ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[18%] -translate-x-1/2 rounded-full
        h-[450px] w-[1150px] bg-[radial-gradient(circle_at_center,#EDE9E2/40,#F3F1EC/15,transparent)] blur-3xl"
      />

      <div className="luxury-container relative z-10">
        {/* ── Section Header ── */}
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
            Available Worldwide
          </p>

          <h2
            id="worldwide-heading"
            className={`text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[0.12em] leading-[1.08] transition-all duration-900 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
            style={{
              color: "var(--color-text-primary)",
              transitionDelay: "220ms",
              transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            THE KYNXZ BRAND{" "}
            <span style={{ color: "var(--color-accent)" }}>Worldwide Presence</span>
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
            THE KYNXZ BRAND delivers its curated luxury collections through globally
            trusted digital marketplaces, ensuring a seamless experience wherever our
            customers are.
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

        {/* ── Marketplace Cards Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5">
          {marketplaces.map((item, i) => (
            <div
              key={item.name}
              className={`marketplace-card group glass-premium rounded-2xl border transition-all duration-700 ${
                visibleCards.has(i) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{
                transitionDelay: `${i * 100}ms`,
                transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              {/* Hover glow */}
              <div
                aria-hidden
                className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"
                style={{ boxShadow: "0 0 40px var(--color-glow)" }}
              />

              <div className="relative z-10 p-5 md:p-6 flex flex-col items-center text-center">
                {/* Logo area — clean premium PNG logos */}
                <div className="w-24 h-24 md:w-28 md:h-28 mb-3 flex items-center justify-center">
                  <div
                    className="w-full h-full rounded-full flex items-center justify-center"
                    style={{
                      background: "radial-gradient(circle at 40% 35%, var(--color-accent)/10, transparent 70%)",
                    }}
                  >
                    <img
                      src={item.icon}
                      alt={item.name}
                      className="w-20 h-20 md:w-24 md:h-24 object-contain"
                    />
                  </div>
                </div>

                {/* Marketplace name */}
                <h3
                  className="text-sm md:text-base font-semibold tracking-[0.06em] mb-1.5"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  {item.name}
                </h3>

                {/* Tagline */}
                <p
                  className="text-[10px] md:text-xs leading-[1.6] mb-2"
                  style={{ color: "var(--color-accent)" }}
                >
                  {item.tagline}
                </p>

                {/* Description */}
                <p
                  className="text-[10px] md:text-xs leading-[1.5] opacity-60"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {item.description}
                </p>

                {/* Accent line */}
                <div
                  className="mt-3 h-px w-8 transition-all duration-500 group-hover:w-12"
                  style={{ background: "var(--color-accent)" }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* ════════════════════════════════════════
            Stats Bar
            ════════════════════════════════════════ */}
        <div
          className={`mt-8 md:mt-10 transition-all duration-900 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{
            transitionDelay: "500ms",
            transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <div
            className="glass-premium rounded-2xl border overflow-hidden"
            style={{ borderColor: "var(--color-border)" }}
          >
            <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 divide-x divide-[var(--color-border)]">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center justify-center py-6 md:py-8 px-4 text-center"
                >
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    isInView={isVisible}
                    multiplier={stat.multiplier}
                  />
                  <span
                    className="mt-1.5 text-[9px] md:text-[10px] tracking-[0.2em] uppercase font-semibold"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {stat.label}
                  </span>
                  {i < stats.length - 1 && (
                    <div
                      aria-hidden
                      className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-8 hidden md:block"
                      style={{ background: "var(--color-border)" }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
