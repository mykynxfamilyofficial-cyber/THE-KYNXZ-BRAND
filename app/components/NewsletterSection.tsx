"use client";

import { useEffect, useRef, useState } from "react";
import { playfair, cormorant, inter } from "../fonts";

import { useTheme } from "../hooks/useTheme";
import type { ThemeColors } from "../hooks/useTheme";
/* ───────────────────────────────────────────────
   Decorative SVG: Interlocking circles mark
   ─────────────────────────────────────────────── */
function CircleMark({ C }: { C: ThemeColors }) {
  return (
    <svg
      width="72"
      height="72"
      viewBox="0 0 72 72"
      fill="none"
      aria-hidden
    >
      {/* Outer ring */}
      <circle
        cx="36"
        cy="36"
        r="34"
        stroke={C.champagne}
        strokeWidth="0.5"
        opacity="0.35"
      />
      {/* Inner ring */}
      <circle
        cx="36"
        cy="36"
        r="26"
        stroke={C.champagne}
        strokeWidth="0.3"
        opacity="0.2"
        strokeDasharray="2 4"
      />
      {/* Center diamond */}
      <path
        d="M36 16L44 36L36 56L28 36Z"
        stroke={C.champagne}
        strokeWidth="0.6"
        opacity="0.4"
        fill="none"
      />
      <path
        d="M36 22L42 36L36 50L30 36Z"
        stroke={C.champagne}
        strokeWidth="0.3"
        opacity="0.2"
        fill="none"
      />
      {/* Small decorative dots */}
      <circle cx="36" cy="14" r="1.2" fill={C.champagne} opacity="0.25" />
      <circle cx="36" cy="58" r="1.2" fill={C.champagne} opacity="0.25" />
      <circle cx="14" cy="36" r="1.2" fill={C.champagne} opacity="0.25" />
      <circle cx="58" cy="36" r="1.2" fill={C.champagne} opacity="0.25" />
    </svg>
  );
}

/* ───────────────────────────────────────────────
   Decorative ring (CSS-driven)
   ─────────────────────────────────────────────── */
function DecorativeRing({ C }: { C: ThemeColors }) {
  return (
    <div
      aria-hidden
      className="absolute pointer-events-none"
    >
      <svg
        width="280"
        height="280"
        viewBox="0 0 280 280"
        fill="none"
        className="w-[180px] h-[180px] md:w-[280px] md:h-[280px]"
      >
        <circle
          cx="140"
          cy="140"
          r="135"
          stroke={C.champagne}
          strokeWidth="0.3"
          opacity="0.12"
        />
        <circle
          cx="140"
          cy="140"
          r="120"
          stroke={C.champagne}
          strokeWidth="0.2"
          opacity="0.08"
          strokeDasharray="3 6"
        />
        <circle
          cx="140"
          cy="140"
          r="105"
          stroke={C.champagne}
          strokeWidth="0.4"
          opacity="0.06"
          strokeDasharray="1 10"
        />
        {/* Decorative directional ticks */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
          const rad = (angle * Math.PI) / 180;
          const r1 = 130;
          const r2 = 138;
          return (
            <line
              key={angle}
              x1={140 + r1 * Math.cos(rad)}
              y1={140 + r1 * Math.sin(rad)}
              x2={140 + r2 * Math.cos(rad)}
              y2={140 + r2 * Math.sin(rad)}
              stroke={C.champagne}
              strokeWidth="0.4"
              opacity="0.15"
            />
          );
        })}
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   NEWSLETTER SECTION – Join The KYNXZ Circle
   ═══════════════════════════════════════════════ */
export default function NewsletterSection() {
  const C = useTheme();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [focused, setFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      // Future: integrate with email service provider
    }
  };

  return (
    <section
      className="relative overflow-hidden py-6 md:py-8 lg:py-10"
      aria-labelledby="newsletter-heading"
    >
      {/* Background ambient glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
      >
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
          w-[800px] h-[800px] rounded-full opacity-[0.025]"
          style={{
            background: `radial-gradient(circle at center, ${C.champagne}, transparent 60%)`,
            filter: "blur(120px)",
          }}
        />
        <div
          className="absolute left-1/4 top-[20%] w-[400px] h-[400px] rounded-full opacity-[0.015]"
          style={{
            background: `radial-gradient(circle at center, ${C.bronze}, transparent 60%)`,
            filter: "blur(80px)",
          }}
        />
      </div>

      {/* Decorative ring — positioned off to the side */}
      <div className="absolute top-[10%] -left-[10%] md:left-[2%] opacity-40 md:opacity-100">
        <DecorativeRing C={C} />
      </div>
      <div className="absolute bottom-[10%] -right-[15%] md:right-[2%] opacity-20 md:opacity-80">
        <DecorativeRing C={C} />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          {/* ── Eyebrow ── */}
          <div className="text-center">
            <CircleMark C={C} />

            <p
              className={`${inter.className} mt-6 text-[10px] tracking-[0.25em] uppercase`}
              style={{ color: C.bronze }}
            >
              Become an Insider
            </p>
          </div>

          {/* ── Main Heading ── */}
          <h2
            id="newsletter-heading"
            className={`${playfair.className} mt-8 text-[clamp(2.2rem,6vw,4rem)] font-bold leading-[1.08] tracking-[-0.01em] text-center`}
            style={{ color: C.ivory }}
          >
            Join The{" "}
            <span
              className="italic font-normal relative"
              style={{ color: C.champagne }}
            >
              THE KYNXZ BRAND Circle
              {/* Underline accent */}
              <span
                className="absolute -bottom-2 left-0 right-0 h-px"
                style={{ background: `linear-gradient(to right, ${C.champagne}, transparent)` }}
              />
            </span>
          </h2>

          {/* ── Subheading ── */}
          <p
            className={`${cormorant.className} mt-8 text-base md:text-lg lg:text-xl text-center leading-relaxed italic font-light max-w-xl mx-auto`}
            style={{ color: C.champagne }}
          >
            &ldquo;Become part of a world where craftsmanship, meaning, and timeless living converge.&rdquo;
          </p>

          {/* ── Divider ── */}
          <div
            className="mx-auto mt-6 w-16 h-px"
            style={{ background: C.bronze, opacity: 0.4 }}
          />

          {/* ── Benefits microcopy ── */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {[
              "Early Access to Collections",
              "Curated Editorial Content",
              "Exclusive Invitations",
            ].map((benefit) => (
              <div key={benefit} className="flex items-center gap-2">
                <span
                  className="w-1 h-1 rounded-full"
                  style={{ background: C.bronze, opacity: 0.4 }}
                />
                <span
                  className={`${inter.className} text-[10px] tracking-[0.15em] uppercase`}
                  style={{ color: C.muted }}
                >
                  {benefit}
                </span>
              </div>
            ))}
          </div>

          {/* ── Email Form ── */}
          <div className="mt-10 max-w-lg mx-auto">
            {subscribed ? (
              <div className="text-center py-6">
                <div
                  className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center"
                  style={{
                    background: `radial-gradient(circle at 40% 35%, ${C.bronze}20, transparent 70%)`,
                  }}
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke={C.champagne}
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 8L6 11L13 4" />
                  </svg>
                </div>
                <p
                  className={`${playfair.className} text-xl font-bold mb-1`}
                  style={{ color: C.ivory }}
                >
                  Welcome to the Circle
                </p>
                <p
                  className={`${inter.className} text-sm`}
                  style={{ color: C.muted }}
                >
                  You&apos;ve been added. A confirmation awaits in your inbox.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="relative"
              >
                <div
                  className={`relative flex items-center rounded-full border transition-all duration-500 overflow-hidden ${
                    focused ? "shadow-[0_0_20px_rgba(214,207,199,0.08)]" : ""
                  }`}
                  style={{
                    borderColor: focused ? "var(--color-accent)" : "var(--color-border)",
                    background: focused
                      ? `${C.circleGlow}`
                      : "transparent",
                  }}
                >
                  {/* Decorative left accent line */}
                  <div
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-6 transition-all duration-500"
                    style={{
                      background: focused
                        ? `linear-gradient(to bottom, transparent, ${C.champagne}, transparent)`
                        : "transparent",
                      opacity: focused ? 0.6 : 0,
                    }}
                  />

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    placeholder="Enter your email address"
                    required
                    aria-label="Email address"
                    className="flex-1 bg-transparent border-none outline-none px-6 py-3.5 md:py-4 text-sm placeholder:text-xs placeholder:tracking-[0.08em]"
                    style={{
                      color: C.ivory,
                      caretColor: C.champagne,
                    }}
                  />

                  <div className="pr-2">
                    <button
                      type="submit"
                      className="group relative overflow-hidden inline-flex items-center gap-2 px-5 py-2.5 md:px-6 md:py-3 rounded-full text-[10px] tracking-[0.2em] uppercase font-semibold transition-all duration-500"
                      style={{
                        background: `linear-gradient(135deg, ${C.champagne}, ${C.bronze})`,
                        color: "#fff",
                      }}
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        Subscribe
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="transition-transform duration-400 group-hover:translate-x-0.5"
                        >
                          <path d="M1 6H11" />
                          <path d="M7 2L11 6L7 10" />
                        </svg>
                      </span>
                      {/* Subtle shimmer overlay on hover */}
                      <span
                        aria-hidden
                        className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                        style={{
                          background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)`,
                        }}
                      />
                    </button>
                  </div>
                </div>

                {/* Privacy note */}
                <p
                  className={`${inter.className} mt-4 text-[9px] tracking-[0.1em] text-center`}
                  style={{ color: C.muted }}
                >
                  No spam. Unsubscribe at any time. Your information is protected.
                </p>
              </form>
            )}
          </div>

          {/* ── Bottom accent mark ── */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: C.bronze, opacity: 0.25 }}
              />
              <span
                className={`${cormorant.className} italic text-xs`}
                style={{ color: C.champagne, opacity: 0.5 }}
              >
                A Private Circle of Discerning Tastes
              </span>
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: C.bronze, opacity: 0.25 }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade out */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, transparent, var(--color-background-alt))`,
        }}
      />
    </section>
  );
}
