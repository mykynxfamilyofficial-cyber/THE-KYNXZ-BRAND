"use client";

import { useEffect, useRef, useState } from "react";

const stories = [
  {
    title: "Global Luxury Standards",
    description:
      "Rooted in the world's most distinguished traditions of craftsmanship, THE KYNXZ BRAND upholds benchmarks that transcend borders where every detail reflects an unwavering commitment to global excellence.",
    icon: "crown",
  },
  {
    title: "Curated Collections",
    description:
      "Each collection is a narrative, thoughtfully assembled from the finest materials and most refined artistry. Nothing is left to chance; every piece earns its place through merit and meaning.",
    icon: "diamond-alt",
  },
  {
    title: "Uncompromising Quality",
    description:
      "Quality is not a goal but a foundation. From raw material selection to final presentation, each stage is governed by a philosophy that rejects shortcuts and celebrates meticulous mastery.",
    icon: "seal",
  },
  {
    title: "Future of Premium Living",
    description:
      "The future of luxury lies not in excess but in intention. THE KYNXZ BRAND envisions a world where premium living is defined by sustainability, timeless design, and a deeper connection to what truly matters.",
    icon: "vision",
  },
];

function WorldIcon({ type }: { type: string }) {
  switch (type) {
    case "crown":
      return (
        <svg viewBox="0 0 60 60" className="w-full h-full opacity-35">
          <polygon
            points="6,42 12,18 22,30 30,12 38,30 48,18 54,42"
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="0.8"
          />
          <rect x="10" y="42" width="40" height="6" rx="2" fill="none" stroke="var(--color-accent)" strokeWidth="0.6" />
          <circle cx="22" cy="44" r="3" fill="none" stroke="var(--color-accent)" strokeWidth="0.5" />
          <circle cx="38" cy="44" r="3" fill="none" stroke="var(--color-accent)" strokeWidth="0.5" />
          <circle cx="30" cy="28" r="2" fill="var(--color-accent)" opacity="0.3" />
        </svg>
      );
    case "diamond-alt":
      return (
        <svg viewBox="0 0 60 60" className="w-full h-full opacity-35">
          <polygon
            points="30,2 56,24 48,56 12,56 4,24"
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="0.7"
          />
          <polygon
            points="30,10 46,26 40,50 20,50 14,26"
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="0.4"
            strokeDasharray="2 3"
          />
          <line x1="4" y1="24" x2="56" y2="24" stroke="var(--color-accent)" strokeWidth="0.5" />
          <circle cx="30" cy="30" r="3" fill="var(--color-accent)" opacity="0.2" />
        </svg>
      );
    case "seal":
      return (
        <svg viewBox="0 0 60 60" className="w-full h-full opacity-35">
          <circle cx="30" cy="30" r="22" fill="none" stroke="var(--color-accent)" strokeWidth="0.7" />
          <circle cx="30" cy="30" r="16" fill="none" stroke="var(--color-accent)" strokeWidth="0.4" strokeDasharray="2 3" />
          <polygon
            points="30,14 34,24 44,26 36,34 38,44 30,38 22,44 24,34 16,26 26,24"
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="0.6"
          />
          <circle cx="30" cy="30" r="4" fill="none" stroke="var(--color-accent)" strokeWidth="0.4" />
        </svg>
      );
    case "vision":
      return (
        <svg viewBox="0 0 60 60" className="w-full h-full opacity-35">
          <circle cx="30" cy="30" r="22" fill="none" stroke="var(--color-accent)" strokeWidth="0.7" />
          <circle cx="30" cy="30" r="6" fill="none" stroke="var(--color-accent)" strokeWidth="0.6" />
          <line x1="30" y1="8" x2="30" y2="16" stroke="var(--color-accent)" strokeWidth="0.5" />
          <line x1="30" y1="44" x2="30" y2="52" stroke="var(--color-accent)" strokeWidth="0.5" />
          <line x1="8" y1="30" x2="16" y2="30" stroke="var(--color-accent)" strokeWidth="0.5" />
          <line x1="44" y1="30" x2="52" y2="30" stroke="var(--color-accent)" strokeWidth="0.5" />
          <line x1="14" y1="14" x2="20" y2="20" stroke="var(--color-accent)" strokeWidth="0.4" />
          <line x1="40" y1="40" x2="46" y2="46" stroke="var(--color-accent)" strokeWidth="0.4" />
          <line x1="14" y1="46" x2="20" y2="40" stroke="var(--color-accent)" strokeWidth="0.4" />
          <line x1="40" y1="20" x2="46" y2="14" stroke="var(--color-accent)" strokeWidth="0.4" />
          <circle cx="30" cy="30" r="2" fill="var(--color-accent)" opacity="0.3" />
        </svg>
      );
    default:
      return null;
  }
}

export default function WorldSection() {
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
    const cardEls = sectionRef.current?.querySelectorAll(".world-card");
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
      className="world-section relative overflow-hidden py-16 md:py-20 lg:py-24"
      aria-labelledby="world-heading"
    >
      {/* Gradient bridge from Experience section */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-20 lg:h-24 -translate-y-full pointer-events-none z-10"
        style={{
          background: "linear-gradient(to bottom, transparent, var(--color-background))",
        }}
      />

      {/* Dark: refined gold ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[12%] -translate-x-1/2 rounded-full
        opacity-0 data-[theme=dark]:opacity-100 transition-opacity duration-700
        h-[550px] w-[1300px] bg-[radial-gradient(circle_at_center,rgba(212,168,79,0.04),rgba(212,168,79,0.008),transparent)] blur-3xl"
        data-theme="dark"
      />

      {/* Light: warm ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[18%] -translate-x-1/2 rounded-full
        opacity-0 data-[theme=light]:opacity-100 transition-opacity duration-700
        h-[480px] w-[1250px] bg-[radial-gradient(circle_at_center,#EDE9E2/35,#F3F1EC/12,transparent)] blur-3xl"
        data-theme="light"
      />

      <div className="luxury-container relative z-10">
        {/* Section header */}
        <div className="text-center mb-10 md:mb-12 lg:mb-14">
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
            
          </p>

          <h2
            id="world-heading"
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
            <span style={{ color: "var(--color-accent)" }}>WORLD</span>
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
            A vision of what lies ahead where heritage meets innovation and
            every detail is crafted with purpose.
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

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {stories.map((item, i) => (
            <div
              key={item.title}
              className={`world-card group relative rounded-2xl border transition-all duration-700 ${
                visibleCards.has(i)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{
                borderColor: "var(--color-border)",
                background: "var(--color-surface)",
                backdropFilter: "blur(18px)",
                WebkitBackdropFilter: "blur(18px)",
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

              {/* Card inner */}
              <div className="relative z-10 p-6 md:p-8 flex flex-col text-center items-center">
                {/* Icon */}
                <div className="w-16 h-16 md:w-20 md:h-20 mb-4 flex items-center justify-center">
                  <div
                    className="w-full h-full rounded-full flex items-center justify-center"
                    style={{
                      background:
                        "radial-gradient(circle at 40% 35%, var(--color-accent)/10, transparent 70%)",
                    }}
                  >
                    <div className="w-12 h-12 md:w-14 md:h-14">
                      <WorldIcon type={item.icon} />
                    </div>
                  </div>
                </div>

                {/* Title */}
                <h3
                  className="text-lg md:text-xl font-semibold tracking-[0.06em] mb-2"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  {item.title}
                </h3>

                {/* Description */}
                <p
                  className="text-sm leading-[1.7]"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {item.description}
                </p>

                {/* Accent line */}
                <div
                  className="mt-4 h-px w-8 transition-all duration-500 group-hover:w-14"
                  style={{ background: "var(--color-accent)" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
