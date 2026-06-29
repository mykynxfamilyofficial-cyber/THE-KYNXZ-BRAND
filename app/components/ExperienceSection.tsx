"use client";

import { useEffect, useRef, useState, memo } from "react";

const experiences = [
  {
    title: "Curated Excellence",
    description:
      "Every product is carefully selected to meet the highest standards of quality and design.",
    icon: "star",
  },
  {
    title: "Premium Experience",
    description:
      "Designed to deliver a seamless and refined customer journey.",
    icon: "sparkle",
  },
  {
    title: "Global Standards",
    description:
      "Inspired by the finest international luxury and craftsmanship principles.",
    icon: "globe",
  },
  {
    title: "Trusted Delivery",
    description:
      "Reliable, secure, and efficient service built on trust and excellence.",
    icon: "shield",
  },
];

const ExperienceIcon = memo(function ExperienceIcon({ type }: { type: string }) {
  switch (type) {
    case "star":
      return (
        <svg viewBox="0 0 60 60" className="w-full h-full opacity-35">
          <polygon
            points="30,4 36,22 56,22 40,34 44,54 30,42 16,54 20,34 4,22 24,22"
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="0.8"
          />
          <circle cx="30" cy="28" r="4" fill="var(--color-accent)" opacity="0.25" />
        </svg>
      );
    case "sparkle":
      return (
        <svg viewBox="0 0 60 60" className="w-full h-full opacity-35">
          <line x1="30" y1="8" x2="30" y2="52" stroke="var(--color-accent)" strokeWidth="0.6" strokeDasharray="2 3" />
          <line x1="8" y1="30" x2="52" y2="30" stroke="var(--color-accent)" strokeWidth="0.6" strokeDasharray="2 3" />
          <line x1="12" y1="12" x2="48" y2="48" stroke="var(--color-accent)" strokeWidth="0.4" strokeDasharray="1.5 4" />
          <line x1="48" y1="12" x2="12" y2="48" stroke="var(--color-accent)" strokeWidth="0.4" strokeDasharray="1.5 4" />
          <circle cx="30" cy="30" r="6" fill="none" stroke="var(--color-accent)" strokeWidth="0.6" />
          <circle cx="30" cy="30" r="2" fill="var(--color-accent)" opacity="0.3" />
        </svg>
      );
    case "globe":
      return (
        <svg viewBox="0 0 60 60" className="w-full h-full opacity-35">
          <circle cx="30" cy="30" r="22" fill="none" stroke="var(--color-accent)" strokeWidth="0.7" />
          <ellipse cx="30" cy="30" rx="12" ry="22" fill="none" stroke="var(--color-accent)" strokeWidth="0.5" />
          <line x1="8" y1="30" x2="52" y2="30" stroke="var(--color-accent)" strokeWidth="0.5" />
          <line x1="30" y1="8" x2="30" y2="52" stroke="var(--color-accent)" strokeWidth="0.5" />
          <circle cx="30" cy="30" r="4" fill="none" stroke="var(--color-accent)" strokeWidth="0.4" strokeDasharray="1.5 2" />
        </svg>
      );
    case "shield":
      return (
        <svg viewBox="0 0 60 60" className="w-full h-full opacity-35">
          <polygon
            points="30,4 52,16 52,34 30,56 8,34 8,16"
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="0.7"
          />
          <polygon
            points="30,10 46,19 46,32 30,48 14,32 14,19"
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="0.4"
            strokeDasharray="2 3"
          />
          <circle cx="30" cy="28" r="6" fill="none" stroke="var(--color-accent)" strokeWidth="0.5" />
          <polygon
            points="30,22 33,27 38,28 34,32 35,38 30,35 25,38 26,32 22,28 27,27"
            fill="var(--color-accent)"
            opacity="0.2"
          />
        </svg>
      );
    default:
      return null;
  }
});

export default function ExperienceSection() {
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

  // Stagger card reveal — batch all visible at once; CSS transitionDelay handles stagger
  useEffect(() => {
    if (!isVisible) return;
    setVisibleCards(new Set([0, 1, 2, 3]));
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      className="experience-section relative overflow-hidden py-5 md:py-6 lg:py-8"
      aria-labelledby="experience-heading"
    >
      {/* Gradient bridge from Collections section */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-10 lg:h-12 -translate-y-full pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(to bottom, transparent, var(--color-background))",
        }}
      />

      {/* Warm ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[15%] -translate-x-1/2 rounded-full
        h-[450px] w-[1200px] bg-[radial-gradient(circle_at_center,#EDE9E2/40,#F3F1EC/15,transparent)] blur-2xl"
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
            Experience
          </p>

          <h2
            id="experience-heading"
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
            THE KYNXZ BRAND{" "}
            <span style={{ color: "var(--color-accent)" }}>Signature Experience</span>
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

        {/* Cards grid — 4 columns on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {experiences.map((item, i) => (
            <div
              key={item.title}
              className={`experience-card group glass-premium rounded-2xl border ${
                visibleCards.has(i)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{
                transitionDelay: `${i * 100}ms`,
                transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                transitionDuration: "700ms",
                transitionProperty: "opacity, transform",
              }}
            >
              {/* Hover glow — lightweight inset shadow (no outer blur paint) */}
              <div
                aria-hidden
                className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"
                style={{ boxShadow: "0 0 20px var(--color-glow)" }}
              />

              {/* Card inner */}
              <div className="relative z-10 p-6 md:p-8 flex flex-col items-center text-center">
                {/* Icon */}
                <div className="w-16 h-16 md:w-20 md:h-20 mb-4 flex items-center justify-center">
                  <div
                    className="w-full h-full rounded-full flex items-center justify-center"
                    style={{
                      background:
                        "radial-gradient(circle at 40% 35%, var(--color-accent)/12, transparent 70%)",
                    }}
                  >
                    <div className="w-12 h-12 md:w-14 md:h-14">
                      <ExperienceIcon type={item.icon} />
                    </div>
                  </div>
                </div>

                {/* Card title */}
                <h3
                  className="text-lg md:text-xl font-semibold tracking-[0.06em] mb-2"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  {item.title}
                </h3>

                {/* Description */}
                <p
                  className="text-sm leading-[1.7] max-w-xs"
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
