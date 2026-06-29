"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    const el = sectionRef.current;
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="cta-section relative overflow-hidden py-3 md:py-4 lg:py-6"
      aria-labelledby="cta-heading"
    >
      {/* Gradient bridge from Why section */}
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
        className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/3 rounded-full
        h-[550px] w-[1300px] bg-[radial-gradient(circle_at_center,#EDE9E2/50,#F3F1EC/20,transparent)] blur-3xl animate-cta-float"
      />

      <div className="luxury-container relative z-10">
        <div
          className={`glass-premium relative rounded-3xl border overflow-hidden transition-all duration-900 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{
            transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          {/* Subtle inner glow */}
          <div
            aria-hidden
            className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-30 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, var(--color-accent)/8, transparent 70%)",
            }}
          />

          <div className="relative z-10 px-8 py-8 md:px-14 md:py-10 lg:px-20 lg:py-12 flex flex-col items-center text-center">
            {/* Section eyebrow */}
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
              Your Journey
            </p>

            {/* Main heading */}
            <h2
              id="cta-heading"
              className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[0.08em] leading-[1.08] mb-4 transition-all duration-900 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
              }`}
              style={{
                color: "var(--color-text-primary)",
                transitionDelay: "220ms",
                transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              Begin Your{" "}
              <span style={{ color: "var(--color-accent)" }}>KYNXZ BRAND</span> Journey
            </h2>

            {/* Subtitle */}
            <p
              className={`max-w-2xl text-sm md:text-base lg:text-lg leading-[1.75] mx-auto mb-6 transition-all duration-900 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
              }`}
              style={{
                color: "var(--color-text-muted)",
                transitionDelay: "360ms",
                transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              Experience a world where timeless elegance, uncompromising
              quality, and refined living become one.
            </p>

            {/* CTA Buttons */}
            <div
              className={`flex flex-col sm:flex-row gap-4 sm:gap-6 transition-all duration-900 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
              }`}
              style={{
                transitionDelay: "500ms",
                transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              {/* Primary CTA — Explore Collections */}
              <Link
                href="/collections"
                className="group inline-flex items-center justify-center rounded-full border px-8 py-3.5 text-sm tracking-[0.12em] uppercase font-semibold backdrop-blur transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_20px_60px_rgba(212,168,79,0.18)]
                border-[var(--color-accent)] bg-[var(--color-accent)]/10 text-[var(--color-accent)]
                hover:bg-[var(--color-accent)]/20 hover:border-[var(--color-accent)]
                focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/40"
              >
                <span className="relative mr-3">
                  <span
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-[var(--color-accent)]/20 via-transparent to-[var(--color-accent)]/20 blur-[12px]"
                    aria-hidden
                  />
                  <span className="relative">Explore Collections</span>
                </span>
                <span
                  aria-hidden
                  className="h-2 w-2 rounded-full bg-[var(--color-accent)] opacity-80 transition-transform duration-500 group-hover:scale-110"
                  style={{ boxShadow: "0 0 12px rgba(212,168,79,0.4)" }}
                />
              </Link>

              {/* Secondary CTA — Contact Us */}
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center rounded-full border px-8 py-3.5 text-sm tracking-[0.12em] uppercase font-semibold backdrop-blur transition-all duration-500 hover:-translate-y-0.5
                border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)]
                hover:border-[var(--color-accent)]/40 hover:bg-[var(--color-accent)]/5 hover:shadow-[0_0_40px_var(--color-glow)]
                focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/40"
              >
                Contact Us
                <span
                  aria-hidden
                  className="ml-3 h-2 w-2 rounded-full bg-[var(--color-accent)]/60 transition-all duration-500 group-hover:bg-[var(--color-accent)] group-hover:scale-110"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
