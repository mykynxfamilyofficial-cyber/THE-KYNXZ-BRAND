"use client";

import { useEffect, useRef, useState } from "react";

const reasons = [
  {
    title: "Timeless Craftsmanship",
    description:
      "Designed with enduring quality and refined attention to detail.",
    icon: "craft",
  },
  {
    title: "Curated Perfection",
    description:
      "Every product is carefully selected to reflect sophistication and excellence.",
    icon: "curate",
  },
  {
    title: "Premium Trust",
    description:
      "Built on transparency, reliability, and uncompromising standards.",
    icon: "trust",
  },
  {
    title: "Global Vision",
    description:
      "Creating a worldwide luxury lifestyle experience without boundaries.",
    icon: "global",
  },
];

function WhyIcon({ type }: { type: string }) {
  switch (type) {
    case "craft":
      return (
        <svg viewBox="0 0 60 60" className="w-full h-full opacity-35">
          <polygon points="30,6 8,22 16,52 44,52 52,22" fill="none" stroke="var(--color-accent)" strokeWidth="0.7" />
          <line x1="30" y1="6" x2="30" y2="52" stroke="var(--color-accent)" strokeWidth="0.4" strokeDasharray="1.5 3" />
          <line x1="8" y1="22" x2="52" y2="22" stroke="var(--color-accent)" strokeWidth="0.5" />
          <circle cx="30" cy="30" r="6" fill="none" stroke="var(--color-accent)" strokeWidth="0.5" />
          <circle cx="30" cy="30" r="2" fill="var(--color-accent)" opacity="0.3" />
        </svg>
      );
    case "curate":
      return (
        <svg viewBox="0 0 60 60" className="w-full h-full opacity-35">
          <circle cx="30" cy="30" r="22" fill="none" stroke="var(--color-accent)" strokeWidth="0.7" />
          <circle cx="30" cy="30" r="14" fill="none" stroke="var(--color-accent)" strokeWidth="0.4" strokeDasharray="2 3" />
          <path d="M22,30 L28,36 L38,24" fill="none" stroke="var(--color-accent)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "trust":
      return (
        <svg viewBox="0 0 60 60" className="w-full h-full opacity-35">
          <polygon points="30,4 52,16 52,36 30,56 8,36 8,16" fill="none" stroke="var(--color-accent)" strokeWidth="0.7" />
          <polygon points="30,12 46,20 46,34 30,48 14,34 14,20" fill="none" stroke="var(--color-accent)" strokeWidth="0.3" strokeDasharray="2 4" />
          <circle cx="30" cy="28" r="8" fill="none" stroke="var(--color-accent)" strokeWidth="0.5" />
          <circle cx="30" cy="28" r="3" fill="none" stroke="var(--color-accent)" strokeWidth="0.4" />
        </svg>
      );
    case "global":
      return (
        <svg viewBox="0 0 60 60" className="w-full h-full opacity-35">
          <circle cx="30" cy="30" r="22" fill="none" stroke="var(--color-accent)" strokeWidth="0.7" />
          <ellipse cx="30" cy="30" rx="14" ry="22" fill="none" stroke="var(--color-accent)" strokeWidth="0.4" strokeDasharray="1.5 3" />
          <line x1="8" y1="30" x2="52" y2="30" stroke="var(--color-accent)" strokeWidth="0.5" />
          <circle cx="30" cy="20" r="4" fill="none" stroke="var(--color-accent)" strokeWidth="0.4" />
          <circle cx="30" cy="20" r="1.5" fill="var(--color-accent)" opacity="0.3" />
          <path d="M18,42 Q30,36 42,42" fill="none" stroke="var(--color-accent)" strokeWidth="0.4" strokeDasharray="1.5 3" />
        </svg>
      );
    default:
      return null;
  }
}

export default function WhySection() {
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
    const cardEls = sectionRef.current?.querySelectorAll(".why-card");
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
      className="why-section relative overflow-hidden py-16 md:py-20 lg:py-24"
      aria-labelledby="why-heading"
    >
      {/* Gradient bridge from World section */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-20 lg:h-24 -translate-y-full pointer-events-none z-10"
        style={{
          background: "linear-gradient(to bottom, transparent, var(--color-background))",
        }}
      />

      {/* Dark: gold ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[12%] -translate-x-1/2 rounded-full
        opacity-0 data-[theme=dark]:opacity-100 transition-opacity duration-700
        h-[500px] w-[1200px] bg-[radial-gradient(circle_at_center,rgba(212,168,79,0.045),rgba(212,168,79,0.008),transparent)] blur-3xl"
        data-theme="dark"
      />

      {/* Light: warm ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[15%] -translate-x-1/2 rounded-full
        opacity-0 data-[theme=light]:opacity-100 transition-opacity duration-700
        h-[450px] w-[1150px] bg-[radial-gradient(circle_at_center,#EDE9E2/40,#F3F1EC/15,transparent)] blur-3xl"
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
            id="why-heading"
            className={`text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[0.12em] leading-[1.08] transition-all duration-900 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
            style={{
              color: "var(--color-text-primary)",
              transitionDelay: "220ms",
              transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            Why{" "}
            <span style={{ color: "var(--color-accent)" }}> THE KYNXZ BRAND</span>
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
            In a world of mass production, we choose the path of intention,
            quality, and timeless elegance.
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
          {reasons.map((item, i) => (
            <div
              key={item.title}
              className={`why-card group relative rounded-2xl border transition-all duration-700 ${
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
              <div className="relative z-10 p-6 md:p-8 flex flex-col items-center text-center">
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
                      <WhyIcon type={item.icon} />
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
