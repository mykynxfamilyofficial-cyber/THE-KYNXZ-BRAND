"use client";

import { useEffect, useRef, useState } from "react";

export default function PhilosophySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollYProgress, setScrollYProgress] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    const el = sectionRef.current;
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Track scroll position relative to the section for parallax — throttled with rAF
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const initialRect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const initialProgress = 1 - initialRect.top / (windowHeight + initialRect.height);
    setScrollYProgress(Math.max(0, Math.min(1, initialProgress)));

    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        if (!el) {
          ticking = false;
          return;
        }
        const rect = el.getBoundingClientRect();
        const progress = 1 - rect.top / (windowHeight + rect.height);
        setScrollYProgress(Math.max(0, Math.min(1, progress)));
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Parallax offset: artwork moves slower than scroll
  const parallaxY = (scrollYProgress - 0.5) * 40;

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      className="philosophy-section relative overflow-hidden py-5 md:py-6 lg:py-8"
      aria-labelledby="philosophy-heading"
    >
      {/* Gradient bridge — blends hero background into this section */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-10 lg:h-12 -translate-y-full pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(to bottom, transparent, var(--color-background))",
        }}
      />

      {/* Dark: champagne glow behind the content */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/4 -translate-x-1/2 -translate-y-1/4 rounded-full
        opacity-0 data-[theme=dark]:opacity-100 transition-opacity duration-700
        h-[500px] w-[1200px] bg-[radial-gradient(circle_at_center,rgba(212,168,79,0.12),rgba(212,168,79,0.04),transparent)] blur-3xl"
        data-theme="dark"
      />

      {/* Light: warm ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/3 rounded-full
        opacity-0 data-[theme=light]:opacity-100 transition-opacity duration-700
        h-[420px] w-[1100px] bg-[radial-gradient(circle_at_center,#EDE9E2/50,#F3F1EC/25,transparent)] blur-3xl"
        data-theme="light"
      />

      <div className="luxury-container relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* ─────── Left: Abstract luxury artwork ─────── */}
          <div
            className="philosophy-art w-full lg:w-[48%] flex items-center justify-center"
            data-visible={isVisible}
          >
            <div
              className="relative w-full max-w-md lg:max-w-lg aspect-square"
              style={{ transform: `translateY(${parallaxY}px)` }}
            >
              {/* Outer ring */}<div
              className="absolute inset-4 rounded-full border border-[var(--color-accent)]/10"
            />

              {/* Mid ring */}
              <div className="absolute inset-8 rounded-full border border-[var(--color-accent)]/6" />

              {/* Central glow orb */}
              <div className="absolute inset-[18%] rounded-full bg-gradient-to-br from-[var(--color-accent)]/12 via-[var(--color-accent)]/4 to-transparent blur-2xl animate-philosophy-pulse" />

              {/* Core circle */}
              <div
                className="absolute inset-[28%] rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 35% 30%, rgba(212,168,79,0.14), rgba(212,168,79,0.04) 50%, transparent 70%)",
                }}
              />

              {/* Inner accent dot */}
              <div className="absolute top-[42%] left-[42%] h-[16%] w-[16%] rounded-full bg-[var(--color-accent)]/12 blur-md animate-philosophy-float" />

              {/* Decorative small dots on perimeter */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                <div
                  key={deg}
                  className="absolute h-[5px] w-[5px] rounded-full bg-[var(--color-accent)]/25"
                  style={{
                    top: `calc(50% + ${Math.sin((deg * Math.PI) / 180) * 44}%)`,
                    left: `calc(50% + ${Math.cos((deg * Math.PI) / 180) * 44}%)`,
                    transform: "translate(-50%, -50%)",
                  }}
                />
              ))}

              {/* Diagonal accent lines */}
              <div
                className="absolute top-0 left-0 w-full h-full"
                aria-hidden
              >
                <svg viewBox="0 0 100 100" className="w-full h-full opacity-20">
                  <line
                    x1="15" y1="15"
                    x2="85" y2="85"
                    stroke="var(--color-accent)"
                    strokeWidth="0.4"
                    strokeDasharray="2 4"
                  />
                  <line
                    x1="85" y1="15"
                    x2="15" y2="85"
                    stroke="var(--color-accent)"
                    strokeWidth="0.4"
                    strokeDasharray="2 4"
                  />
                  <circle
                    cx="50" cy="50" r="30"
                    fill="none"
                    stroke="var(--color-accent)"
                    strokeWidth="0.25"
                    strokeDasharray="1 8"
                    opacity="0.55"
                    className="animate-philosophy-rotate"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* ─────── Right: Brand story content ─────── */}
          <div className="philosophy-content w-full lg:w-[48%]">
            {/* Eyebrow */}
            <p
              className="philosophy-reveal philosophy-reveal-1 text-xs tracking-[0.28em] uppercase opacity-70 mb-5"
              data-visible={isVisible}
              style={{ color: "var(--color-accent)" }}
            >
              Philosophy
            </p>

            {/* Heading */}
            <h2
              id="philosophy-heading"
              className="philosophy-reveal philosophy-reveal-2 text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-semibold tracking-[0.12em] leading-[1.08] mb-5"
              data-visible={isVisible}
              style={{ color: "var(--color-text-primary)" }}
            >
              THE KYNXZ BRAND
              <br />
              <span style={{ color: "var(--color-accent)" }}>Philosophy</span>
            </h2>

            {/* Body paragraphs */}
            <div className="space-y-3 max-w-lg">
              <p
                className="philosophy-reveal philosophy-reveal-3 text-base md:text-lg leading-[1.75]"
                data-visible={isVisible}
                style={{ color: "var(--color-text-muted)" }}
              >
                At the heart of our existence lies a singular conviction 
                that true luxury is not defined by excess, but by the
                meticulous pursuit of meaning in every detail. Every creation
                is a dialogue between heritage and tomorrow.
              </p>
              <p
                className="philosophy-reveal philosophy-reveal-4 text-base md:text-lg leading-[1.75]"
                data-visible={isVisible}
                style={{ color: "var(--color-text-muted)" }}
              >
                We believe in the quiet power of restraint  where each
                element earns its place through purpose rather than
                prominence. It is in this refined simplicity that enduring
                elegance takes form.
              </p>
              <p
                className="philosophy-reveal philosophy-reveal-5 text-base md:text-lg leading-[1.75]"
                data-visible={isVisible}
                style={{ color: "var(--color-text-muted)" }}
              >
                Ours is a commitment to timelessness over trends, to
                substance over spectacle. THE KYNXZ BRAND is not merely
                worn or displayed it is lived, breathed, and passed
                forward as a legacy of uncompromising intent.
              </p>
            </div>

            {/* Gold signature line */}
            <div
              className="philosophy-reveal philosophy-reveal-6 mt-6 h-px w-16"
              style={{ background: "var(--color-accent)" }}
              data-visible={isVisible}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
