"use client";

import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [state, setState] = useState<"entering" | "visible" | "exiting" | "hidden">("entering");

  useEffect(() => {
    // Initial entrance
    const enterTimer = setTimeout(() => setState("visible"), 80);

    // Begin exit after content should be ready
    const exitTimer = setTimeout(() => setState("exiting"), 1800);

    // Fully hidden
    const hiddenTimer = setTimeout(() => setState("hidden"), 2600);

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(exitTimer);
      clearTimeout(hiddenTimer);
    };
  }, []);

  if (state === "hidden") return null;

  return (
    <div
      aria-hidden
      className={`loading-screen fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden transition-all duration-700 ${
        state === "exiting" ? "opacity-0 scale-[1.02] pointer-events-none" : ""
      }`}
      style={{
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      {/* Dark theme background */}
      <div
        className="absolute inset-0 opacity-0 data-[theme=dark]:opacity-100 transition-opacity duration-700"
        data-theme="dark"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 45%, #050505 0%, #000000 100%)",
        }}
      />

      {/* Light theme background */}
      <div
        className="absolute inset-0 opacity-0 data-[theme=light]:opacity-100 transition-opacity duration-700"
        data-theme="light"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 45%, rgba(248, 246, 241, 1) 0%, #F5F1E8 100%)",
        }}
      />

      {/* Dark: gold ambient glow */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full
        opacity-0 data-[theme=dark]:opacity-100 transition-opacity duration-1000
        h-[600px] w-[1400px] bg-[radial-gradient(circle_at_center,rgba(212,168,79,0.08),rgba(212,168,79,0.02),transparent)] blur-3xl"
        data-theme="dark"
      />

      {/* Light: warm cream ambient glow */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full
        opacity-0 data-[theme=light]:opacity-100 transition-opacity duration-1000
        h-[550px] w-[1300px] bg-[radial-gradient(circle_at_center,#EDE9E2/60,#F3F1EC/20,transparent)] blur-3xl"
        data-theme="light"
      />

      <div className="relative z-10 flex flex-col items-center">
        {/* KYNXZ Logo mark — gold diamond emblem */}
        <div
          className={`loading-logo mb-8 transition-all duration-900 ${
            state === "entering"
              ? "opacity-0 scale-75"
              : state === "visible"
              ? "opacity-100 scale-100"
              : "opacity-100 scale-100"
          }`}
          style={{
            transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          {/* Diamond emblem */}
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24">
            {/* Outer diamond */}
            <div
              className="loading-diamond absolute inset-0"
              style={{
                clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                background:
                  "linear-gradient(135deg, rgba(212,168,79,0.9), rgba(212,168,79,0.4), rgba(212,168,79,0.9))",
              }}
            />
            {/* Inner diamond accent */}
            <div
              className="absolute inset-[3px] sm:inset-[4px] md:inset-[5px]"
              style={{
                clipPath: "polygon(50% 5%, 92% 27%, 92% 73%, 50% 95%, 8% 73%, 8% 27%)",
                background:
                  "linear-gradient(135deg, rgba(212,168,79,0.3), transparent, rgba(212,168,79,0.15))",
              }}
            />
            {/* Center K letter */}
            <span
              className="absolute inset-0 flex items-center justify-center text-white font-semibold"
              style={{
                fontFamily: "serif",
                fontSize: "clamp(20px, 4vw, 30px)",
                letterSpacing: "0.02em",
              }}
            >
              K
            </span>
          </div>
        </div>

        {/* THE KYNXZ BRAND — Letter reveal */}
        <h1
          className={`loading-title text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-[0.18em] leading-[1.1] text-center transition-all duration-900 ${
            state === "entering"
              ? "opacity-0 translate-y-4"
              : state === "visible"
              ? "opacity-100 translate-y-0"
              : "opacity-100 translate-y-0"
          }`}
          style={{
            transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
            transitionDelay: "200ms",
          }}
        >
          {"THE KYNXZ BRAND".split("").map((char, i) => (
            <span
              key={i}
              className={`loading-letter inline-block transition-all duration-700 ${
                char === " " ? "mx-2 sm:mx-3" : ""
              } ${
                state === "entering"
                  ? "opacity-0 translate-y-3"
                  : state === "visible"
                  ? "opacity-100 translate-y-0"
                  : "opacity-100 translate-y-0"
              }`}
              style={{
                transitionDelay: `${450 + i * 45}ms`,
                transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                color: char === "K" || char === "B" ? "var(--color-accent)" : "inherit",
              }}
            >
              {char}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p
          className={`loading-subtitle mt-4 sm:mt-5 text-xs sm:text-sm md:text-base tracking-[0.28em] uppercase transition-all duration-900 ${
            state === "entering"
              ? "opacity-0 translate-y-3"
              : state === "visible"
              ? "opacity-100 translate-y-0"
              : "opacity-100 translate-y-0"
          }`}
          style={{
            color: "var(--color-accent)",
            transitionDelay: "950ms",
            transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          Crafting Timeless Luxury
        </p>

        {/* Gold accent underline that expands */}
        <div
          className="mt-6 sm:mt-7 h-px transition-all duration-1000"
          style={{
            width: state === "visible" ? "120px" : "0px",
            background:
              "linear-gradient(to right, transparent, var(--color-accent), transparent)",
            transitionDelay: "1100ms",
            transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />

        {/* Loading dots */}
        <div
          className={`mt-8 flex items-center gap-2 transition-all duration-700 ${
            state === "visible" ? "opacity-60" : "opacity-0"
          }`}
          style={{ transitionDelay: "1300ms" }}
        >
          <span className="loading-dot" style={{ animationDelay: "0ms" }} />
          <span className="loading-dot" style={{ animationDelay: "300ms" }} />
          <span className="loading-dot" style={{ animationDelay: "600ms" }} />
        </div>
      </div>
    </div>
  );
}
