"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/* ───────────────────────────────────────────────
   Ambient floating particles — client-only
   Uses deterministic SSR output (empty), then
   generates positions in useEffect after mount.
   ─────────────────────────────────────────────── */
type Particle = {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
};

function ParticleField() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generated: Particle[] = Array.from({ length: 24 }, (_, i) => ({
      id: i,
      x: 5 + Math.random() * 90,
      y: 5 + Math.random() * 90,
      size: 1 + Math.random() * 2,
      delay: Math.random() * 4,
      duration: 12 + Math.random() * 10,
      opacity: 0.02 + Math.random() * 0.06,
    }));
    setParticles(generated);
  }, []);

  if (particles.length === 0) {
    return <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden" />;
  }

  return (
    <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full loading-particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ───────────────────────────────────────────────
   Loading Screen — Luxury Preloader
   ─────────────────────────────────────────────── */
export default function LoadingScreen() {
  const [state, setState] = useState<"entering" | "visible" | "exiting" | "hidden">("entering");

  useEffect(() => {
    // Initial entrance — allows DOM paint before animating in
    const enterTimer = setTimeout(() => setState("visible"), 100);

    // Begin exit after content is ready
    const exitTimer = setTimeout(() => setState("exiting"), 2200);

    // Fully hidden — removed from DOM
    const hiddenTimer = setTimeout(() => setState("hidden"), 2900);

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(exitTimer);
      clearTimeout(hiddenTimer);
    };
  }, []);

  if (state === "hidden") return null;

  const titleChars = "THE KYNXZ BRAND".split("");

  return (
    <div
      aria-hidden
      className={`loading-screen fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden transition-all duration-800 ${
        state === "exiting"
          ? "opacity-0 blur-[2px] translate-y-[-8px] pointer-events-none"
          : ""
      }`}
      style={{
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        // Solid default background — covers SSR before data-theme is set
        background: "#0B0B0D",
      }}
    >
      {/* ─── Ambient floating particles (client-only, dark theme) ─── */}
      <div className="opacity-0 data-[theme=dark]:opacity-100 transition-opacity duration-1000" data-theme="dark">
        <ParticleField />
      </div>

      {/* ─── Main content ─── */}
      <div className="relative z-10 flex flex-col items-center">
        {/* KYNXZ Logo — Diamond emblem */}
        <div
          className={`loading-logo mb-8 sm:mb-10 transition-all duration-1000 ${
            state === "entering"
              ? "opacity-0 scale-[0.6] translate-y-4"
              : state === "visible"
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-100 scale-100 translate-y-0"
          }`}
          style={{
            transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24">
            <Image
              src="/logo-dark.png"
              alt="THE KYNXZ BRAND"
              fill
              priority
              sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, 96px"
              className="object-contain loading-diamond"
            />
          </div>
        </div>

        {/* THE KYNXZ BRAND — Staggered letter reveal */}
        <h1
          className="overflow-hidden"
        >
          <span
            className={`inline-flex flex-wrap justify-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-[0.18em] leading-[1.1] text-center`}
          >
            {titleChars.map((char, i) => (
              <span
                key={i}
                className={`loading-letter inline-block transition-all duration-700 ${
                  char === " " ? "mx-[0.35em]" : ""
                } ${
                  state === "entering"
                    ? "opacity-0 translate-y-4 blur-[4px]"
                    : state === "visible"
                    ? "opacity-100 translate-y-0 blur-[0px]"
                    : "opacity-100 translate-y-0 blur-[0px]"
                }`}
                style={{
                  transitionDelay: `${400 + i * 50}ms`,
                  transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                  color:
                    char === "K" || char === "B"
                      ? "var(--color-accent)"
                      : "inherit",
                }}
              >
                {char}
              </span>
            ))}
          </span>
        </h1>

        {/* Subtitle with blur reveal */}
        <p
          className={`loading-subtitle mt-5 sm:mt-6 text-xs sm:text-sm md:text-base tracking-[0.3em] uppercase transition-all duration-900 ${
            state === "entering"
              ? "opacity-0 translate-y-3 blur-[2px]"
              : state === "visible"
              ? "opacity-100 translate-y-0 blur-[0px]"
              : "opacity-100 translate-y-0 blur-[0px]"
          }`}
          style={{
            color: "var(--color-accent)",
            transitionDelay: "950ms",
            transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          Crafting Timeless Luxury
        </p>

        {/* Gold accent underline — expands from center */}
        <div
          className="mt-6 sm:mt-7 h-px transition-all duration-1000"
          style={{
            width: state === "visible" ? "140px" : "0px",
            background:
              "linear-gradient(to right, transparent, var(--color-accent), transparent)",
            transitionDelay: "1150ms",
            transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />

        {/* Loading dots — subtle pulse */}
        <div
          className={`mt-8 flex items-center gap-2.5 transition-all duration-700 ${
            state === "visible" ? "opacity-70" : "opacity-0"
          }`}
          style={{ transitionDelay: "1350ms" }}
        >
          <span
            className="loading-dot w-[5px] h-[5px] rounded-full"
            style={{
              background: "var(--color-accent)",
              animation: "loadingDotPulse 1.8s ease-in-out infinite",
              animationDelay: "0ms",
            }}
          />
          <span
            className="loading-dot w-[5px] h-[5px] rounded-full"
            style={{
              background: "var(--color-accent)",
              animation: "loadingDotPulse 1.8s ease-in-out infinite",
              animationDelay: "300ms",
            }}
          />
          <span
            className="loading-dot w-[5px] h-[5px] rounded-full"
            style={{
              background: "var(--color-accent)",
              animation: "loadingDotPulse 1.8s ease-in-out infinite",
              animationDelay: "600ms",
            }}
          />
        </div>
      </div>
    </div>
  );
}
