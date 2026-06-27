"use client";

import { useEffect, useRef, useState, forwardRef } from "react";
import { playfair, cormorant, inter } from "../fonts";
import Header from "../components/Header";
import FooterSection from "../components/FooterSection";

import { useTheme, THEME } from "../hooks/useTheme";

const heroLines = [
  ["Let", "Us"],
  ["Connect."],
];

/* ───────────────────────────────────────────────
   Reusable section wrapper
   ─────────────────────────────────────────────── */
const Section = forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ children, className = "", ...props }, ref) => (
  <section
    ref={ref}
    className={`relative overflow-hidden ${className}`}
    {...props}
  >
    {children}
  </section>
));
Section.displayName = "Section";

/* ═══════════════════════════════════════════════
   SECTION 1 – Cinematic Hero
   ═══════════════════════════════════════════════ */
function ContactHero({ C }: { C: (typeof THEME)["dark"] }) {
  return (
    <section className="min-h-[40dvh] pt-20 md:pt-24 lg:min-h-[60dvh] lg:pt-0 flex items-center justify-center relative overflow-hidden">
      {/* Static decorative orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-[0.05]"
          style={{
            background:
              "radial-gradient(circle at center, #D6CFC7, transparent 65%)",
            filter: "blur(100px)",
          }}
        />
        <div
          className="absolute top-[60%] right-[10%] w-[400px] h-[400px] rounded-full opacity-[0.03]"
          style={{
            background:
              "radial-gradient(circle at center, #8B7355, transparent 60%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute top-[15%] left-[5%] w-[350px] h-[350px] rounded-full opacity-[0.025]"
          style={{
            background:
              "radial-gradient(circle at center, #F5F2ED, transparent 60%)",
            filter: "blur(70px)",
          }}
        />
        <div
          className="absolute top-[25%] right-[8%] w-[280px] h-[280px] opacity-[0.015]"
          style={{
            border: "1px solid rgba(214, 207, 199, 0.25)",
            borderRadius: "45% 55% 40% 60% / 50% 42% 58% 48%",
          }}
        />
        <div
          className="absolute bottom-[30%] left-[12%] w-[200px] h-[200px] opacity-[0.012]"
          style={{
            border: "1px solid rgba(214, 207, 199, 0.15)",
            borderRadius: "55% 45% 60% 40% / 45% 55% 45% 55%",
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 text-center">
        <p
          className={`${inter.className} text-xs tracking-[0.25em] uppercase mb-5`}
          style={{ color: C.bronze }}
        >
          Get In Touch
        </p>

        <h1
          className={`${playfair.className} text-[clamp(2.4rem,9vw,6rem)] font-bold leading-[1.15] tracking-[0.02em]`}
          style={{ color: C.ivory }}
        >
          {heroLines.map((line, lineIdx) => (
            <div key={lineIdx} className="">
              {line.map((word, wordIdx) => (
                <span
                  key={wordIdx}
                  className="inline-block mr-[0.3em] last:mr-0"
                >
                  {word}
                </span>
              ))}
            </div>
          ))}
        </h1>

        <p
          className={`${inter.className} mt-6 text-base md:text-lg max-w-2xl mx-auto leading-relaxed tracking-[0.05em]`}
          style={{ color: C.muted }}
        >
          We would be honored to hear from you. Whether you have a question, a
          collaboration idea, or simply wish to connect — every message matters.
        </p>

        <div className="mt-6 flex items-center justify-center gap-4">
          <span
            className="block w-16 h-px"
            style={{ background: C.bronze }}
          />
          <span
            className={`${cormorant.className} italic text-sm`}
            style={{ color: C.champagne }}
          >
            We Welcome Your Message
          </span>
          <span
            className="block w-16 h-px"
            style={{ background: C.bronze }}
          />
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
        style={{ background: `linear-gradient(to bottom, transparent, ${C.bg})` }}
      />
    </section>
  );
}

/* ═══════════════════════════════════════════════
   SECTION 2 – Contact Information
   ═══════════════════════════════════════════════ */
function ContactInfo({ C }: { C: (typeof THEME)["dark"] }) {
  const contactDetails = [
    {
      label: "Business Entity",
      value: "THE KYNXZ BRAND LLC",
      detail: "MOHD AMAAN SAMI, C.E.O",
    },
    {
      label: "Email",
      value: "support@thekynxzbrand.store",
      detail: "We respond within 24 hours",
    },
    {
      label: "Hours",
      value: "Monday — Friday",
      detail: "9:00 AM – 6:00 PM (MST)",
    },
  ];

  return (
    <Section className="py-1 md:py-2 lg:py-3">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
          {/* Left — Contact details list */}
          <div className="space-y-6">
            <p
              className={`${inter.className} text-xs tracking-[0.25em] uppercase`}
              style={{ color: C.bronze }}
            >
              Contact Information
            </p>

            <h2
              className={`${playfair.className} text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.1]`}
              style={{ color: C.ivory }}
            >
              We would love to hear
              <br />
              <span className="italic font-normal" style={{ color: C.champagne }}>
                from you
              </span>
            </h2>

            <div className="space-y-5 pt-2">
              {contactDetails.map((detail) => (
                <div key={detail.label} className="group">
                  <p
                    className={`${inter.className} text-xs tracking-[0.2em] uppercase mb-2`}
                    style={{ color: C.bronze, opacity: 0.6 }}
                  >
                    {detail.label}
                  </p>
                  <p
                    className={`${playfair.className} text-xl md:text-2xl`}
                    style={{ color: C.ivory }}
                  >
                    {detail.value}
                  </p>
                  <p
                    className={`${inter.className} text-sm mt-1`}
                    style={{ color: C.muted }}
                  >
                    {detail.detail}
                  </p>
                  <div
                    className="mt-3 w-8 h-px transition-all duration-500 group-hover:w-16"
                    style={{ background: C.bronze, opacity: 0.3 }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right — Decorative map-inspired artwork */}
          <div className="relative flex items-center justify-center">
            <div className="relative w-full max-w-[440px] aspect-square">
              <div
                className="absolute inset-[4%] rounded-full"
                style={{ border: `1px solid ${C.champagne}15` }}
              />
              <div
                className="absolute inset-[12%] rounded-full"
                style={{ border: `1px solid ${C.champagne}10` }}
              />
              <div
                className="absolute inset-[18%] rounded-full"
                style={{
                  background: `radial-gradient(circle at 40% 35%, ${C.champagne}15, ${C.bronze}06, transparent 70%)`,
                  filter: "blur(40px)",
                }}
              />

              <svg
                className="absolute inset-0 w-full h-full opacity-[0.07]"
                viewBox="0 0 100 100"
                fill="none"
              >
                <line x1="10" y1="30" x2="90" y2="30" stroke={C.champagne} strokeWidth="0.4" />
                <line x1="10" y1="50" x2="90" y2="50" stroke={C.champagne} strokeWidth="0.4" />
                <line x1="10" y1="70" x2="90" y2="70" stroke={C.champagne} strokeWidth="0.4" />
                <line x1="30" y1="10" x2="30" y2="90" stroke={C.champagne} strokeWidth="0.4" />
                <line x1="50" y1="10" x2="50" y2="90" stroke={C.champagne} strokeWidth="0.4" />
                <line x1="70" y1="10" x2="70" y2="90" stroke={C.champagne} strokeWidth="0.4" />
                <path d="M 20 50 Q 50 10 80 50" stroke={C.bronze} strokeWidth="0.3" opacity="0.4" fill="none" />
                <path d="M 20 50 Q 50 90 80 50" stroke={C.bronze} strokeWidth="0.3" opacity="0.4" fill="none" />
                <polygon points="50,6 52,10 50,14 48,10" fill={C.champagne} opacity="0.3" />
                <polygon points="50,86 52,90 50,94 48,90" fill={C.champagne} opacity="0.3" />
                <polygon points="6,50 10,52 14,50 10,48" fill={C.champagne} opacity="0.3" />
                <polygon points="86,50 90,52 94,50 90,48" fill={C.champagne} opacity="0.3" />
              </svg>

              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[8%] h-[8%] rounded-full"
                style={{
                  background: `radial-gradient(circle at center, ${C.champagne}, transparent 70%)`,
                  opacity: 0.2,
                }}
              />

              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] opacity-[0.02]"
                style={{
                  border: `1px solid ${C.bronze}20`,
                  borderRadius: "48% 52% 45% 55% / 50% 45% 55% 50%",
                }}
              />
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] h-[50%] opacity-[0.015]"
                style={{
                  border: `1px solid ${C.champagne}15`,
                  borderRadius: "52% 48% 55% 45% / 48% 55% 45% 52%",
                }}
              />

              <div className="absolute top-3 left-3 w-10 h-px" style={{ background: C.champagne, opacity: 0.1 }} />
              <div className="absolute top-3 left-3 w-px h-10" style={{ background: C.champagne, opacity: 0.1 }} />
              <div className="absolute bottom-3 right-3 w-10 h-px" style={{ background: C.champagne, opacity: 0.1 }} />
              <div className="absolute bottom-3 right-3 w-px h-10" style={{ background: C.champagne, opacity: 0.1 }} />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════
   SECTION 3 – Where Our Journey Begins
   ═══════════════════════════════════════════════ */
function HeadquartersSection({ C }: { C: (typeof THEME)["dark"] }) {
  return (
    <Section className="py-2 md:py-3 lg:py-4 relative min-h-[40dvh] flex items-center" style={{ background: C.bgAlt }}>
      {/* Static ambient glow canvas */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-[10%] right-[8%] w-[450px] h-[450px] rounded-full opacity-[0.04]"
          style={{
            background: `radial-gradient(circle at center, ${C.champagne}, transparent 65%)`,
            filter: "blur(100px)",
          }}
        />
        <div
          className="absolute bottom-[15%] left-[5%] w-[350px] h-[350px] rounded-full opacity-[0.03]"
          style={{
            background: `radial-gradient(circle at center, ${C.bronze}, transparent 60%)`,
            filter: "blur(80px)",
          }}
        />

        <div
          className="absolute top-[18%] right-[12%] w-[200px] h-[200px] opacity-[0.012]"
          style={{
            border: `1px solid ${C.champagne}30`,
            borderRadius: "50%",
          }}
        />
        <div
          className="absolute top-[18%] right-[12%] w-[140px] h-[140px] opacity-[0.015]"
          style={{
            border: `1px solid ${C.bronze}25`,
            borderRadius: "50%",
          }}
        />

        <div
          className="absolute top-[18%] right-[12%] w-[200px] h-[200px] opacity-[0.008] pointer-events-none"
          style={{ transform: "translate(-50%, -50%)" }}
        >
          <div className="absolute top-0 left-1/2 w-px h-full" style={{ background: C.champagne }} />
          <div className="absolute left-0 top-1/2 w-full h-px" style={{ background: C.champagne }} />
        </div>

        <svg
          className="absolute top-[55%] left-[8%] w-[280px] h-[280px] opacity-[0.015] pointer-events-none"
          viewBox="0 0 100 100"
          fill="none"
        >
          <ellipse cx="50" cy="50" rx="45" ry="20" stroke={C.champagne} strokeWidth="0.5" fill="none" />
          <ellipse cx="50" cy="50" rx="35" ry="15" stroke={C.champagne} strokeWidth="0.3" fill="none" opacity="0.6" />
          <ellipse cx="50" cy="50" rx="25" ry="10" stroke={C.champagne} strokeWidth="0.3" fill="none" opacity="0.4" />
          <line x1="50" y1="30" x2="50" y2="70" stroke={C.bronze} strokeWidth="0.3" opacity="0.5" />
          <line x1="5" y1="50" x2="95" y2="50" stroke={C.bronze} strokeWidth="0.3" opacity="0.5" />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-10 items-center">
          <div className="lg:col-span-2 relative">
            <div className="relative w-full aspect-[4/3] lg:aspect-square max-w-[420px] mx-auto">
              <div
                className="absolute inset-[6%] rounded-full"
                style={{ border: `1px solid ${C.champagne}18` }}
              />
              <div
                className="absolute inset-[14%] rounded-full"
                style={{ border: `1px solid ${C.champagne}10` }}
              />
              <div
                className="absolute inset-[20%] rounded-full"
                style={{
                  background: `radial-gradient(circle at 40% 35%, ${C.champagne}18, ${C.bronze}08, transparent 70%)`,
                  filter: "blur(30px)",
                }}
              />
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[10%] h-[10%] rounded-full"
                style={{
                  background: `radial-gradient(circle at center, ${C.champagne}, transparent 70%)`,
                  opacity: 0.25,
                }}
              />

              <svg
                className="absolute inset-0 w-full h-full opacity-[0.06]"
                viewBox="0 0 100 100"
                fill="none"
              >
                <line x1="10" y1="30" x2="90" y2="30" stroke={C.champagne} strokeWidth="0.4" />
                <line x1="10" y1="50" x2="90" y2="50" stroke={C.champagne} strokeWidth="0.4" />
                <line x1="10" y1="70" x2="90" y2="70" stroke={C.champagne} strokeWidth="0.4" />
                <line x1="30" y1="10" x2="30" y2="90" stroke={C.champagne} strokeWidth="0.4" />
                <line x1="50" y1="10" x2="50" y2="90" stroke={C.champagne} strokeWidth="0.4" />
                <line x1="70" y1="10" x2="70" y2="90" stroke={C.champagne} strokeWidth="0.4" />
                <path d="M 20 50 Q 50 15 80 50" stroke={C.bronze} strokeWidth="0.3" opacity="0.5" fill="none" />
                <path d="M 20 50 Q 50 85 80 50" stroke={C.bronze} strokeWidth="0.3" opacity="0.5" fill="none" />
                <polygon points="50,8 52,12 50,16 48,12" fill={C.champagne} opacity="0.4" />
                <polygon points="50,84 52,88 50,92 48,88" fill={C.champagne} opacity="0.4" />
                <polygon points="8,50 12,52 16,50 12,48" fill={C.champagne} opacity="0.4" />
                <polygon points="84,50 88,52 92,50 88,48" fill={C.champagne} opacity="0.4" />
              </svg>

              <div className="absolute top-2 left-2 w-10 h-px" style={{ background: C.champagne, opacity: 0.12 }} />
              <div className="absolute top-2 left-2 w-px h-10" style={{ background: C.champagne, opacity: 0.12 }} />
              <div className="absolute bottom-2 right-2 w-10 h-px" style={{ background: C.champagne, opacity: 0.12 }} />
              <div className="absolute bottom-2 right-2 w-px h-10" style={{ background: C.champagne, opacity: 0.12 }} />
            </div>
          </div>

          <div className="lg:col-span-3 space-y-5">
            <p
              className={`${inter.className} text-xs tracking-[0.25em] uppercase`}
              style={{ color: C.bronze }}
            >
              Headquartered in the Heart of Wyoming, United States
            </p>

            <h2
              className={`${cormorant.className} text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.08]`}
              style={{ color: C.ivory }}
            >
              Where Our{" "}
              <span className="italic font-normal" style={{ color: C.champagne }}>
                Journey
              </span>{" "}
              Begins
            </h2>

            <div
              className="space-y-3 pl-6 md:pl-8 border-l-2 py-2"
              style={{ borderColor: `${C.bronze}40` }}
            >
              <p
                className={`${cormorant.className} text-2xl md:text-3xl font-semibold leading-[1.2]`}
                style={{ color: C.ivory }}
              >
                THE KYNXZ BRAND LLC
              </p>
              <p
                className={`${inter.className} text-sm md:text-base leading-relaxed`}
                style={{ color: C.champagne, opacity: 0.8 }}
              >
                MOHD AMAAN SAMI
              </p>
              <div
                className={`${inter.className} text-sm md:text-base leading-[1.8]`}
                style={{ color: C.muted }}
              >
                <p>30 N Gould St, Ste R</p>
                <p>Sheridan, Wyoming 82801-6317</p>
                <p>United States of America</p>
              </div>
            </div>

            <div
              className="w-24 h-px"
              style={{ background: C.bronze, opacity: 0.4 }}
            />

            <p
              className={`${cormorant.className} italic text-lg md:text-xl`}
              style={{ color: C.muted }}
            >
              From Sheridan to the World — Crafting Meaning Beyond Commerce.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════
   SECTION 4 – Partnerships & Global Collaborations
   ═══════════════════════════════════════════════ */
function PartnershipsSection({ C }: { C: (typeof THEME)["dark"] }) {
  return (
    <Section className="py-2 md:py-3 lg:py-4 relative min-h-[40dvh] flex items-center">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/3 w-[800px] h-[500px] rounded-full"
          style={{
            background: `radial-gradient(ellipse at center, ${C.champagne}, transparent 65%)`,
            filter: "blur(120px)",
            opacity: 0.04,
          }}
        />

        <div
          className="absolute top-[8%] right-[5%] w-[400px] h-[400px] rounded-full"
          style={{
            background: `radial-gradient(circle at center, ${C.bronze}, transparent 60%)`,
            filter: "blur(90px)",
            opacity: 0.03,
          }}
        />

        <svg
          className="absolute inset-0 w-full h-full opacity-[0.04] md:opacity-[0.06]"
          viewBox="0 0 1440 800"
          preserveAspectRatio="none"
          fill="none"
        >
          <g>
            <circle cx="720" cy="400" r="3" fill={C.champagne} opacity="0.6" />
            <circle cx="600" cy="300" r="2" fill={C.champagne} opacity="0.4" />
            <circle cx="840" cy="320" r="2" fill={C.champagne} opacity="0.4" />
            <circle cx="680" cy="520" r="1.5" fill={C.champagne} opacity="0.35" />
            <circle cx="900" cy="480" r="2.5" fill={C.champagne} opacity="0.45" />
            <circle cx="500" cy="450" r="1.5" fill={C.champagne} opacity="0.3" />
            <circle cx="1050" cy="350" r="2" fill={C.champagne} opacity="0.35" />
            <circle cx="380" cy="280" r="1.5" fill={C.champagne} opacity="0.3" />
            <circle cx="1120" cy="520" r="1.5" fill={C.champagne} opacity="0.3" />
            <circle cx="300" cy="500" r="2" fill={C.champagne} opacity="0.35" />
            <circle cx="1240" cy="280" r="1.5" fill={C.champagne} opacity="0.25" />
            <circle cx="200" cy="350" r="1.5" fill={C.champagne} opacity="0.25" />

            <line x1="720" y1="400" x2="600" y2="300" stroke={C.champagne} strokeWidth="0.5" opacity="0.3" />
            <line x1="720" y1="400" x2="840" y2="320" stroke={C.champagne} strokeWidth="0.5" opacity="0.3" />
            <line x1="720" y1="400" x2="680" y2="520" stroke={C.champagne} strokeWidth="0.5" opacity="0.25" />
            <line x1="720" y1="400" x2="900" y2="480" stroke={C.champagne} strokeWidth="0.5" opacity="0.35" />
            <line x1="720" y1="400" x2="500" y2="450" stroke={C.champagne} strokeWidth="0.4" opacity="0.2" />
            <line x1="840" y1="320" x2="1050" y2="350" stroke={C.champagne} strokeWidth="0.4" opacity="0.25" />
            <line x1="600" y1="300" x2="380" y2="280" stroke={C.champagne} strokeWidth="0.4" opacity="0.2" />
            <line x1="900" y1="480" x2="1120" y2="520" stroke={C.champagne} strokeWidth="0.4" opacity="0.2" />
            <line x1="500" y1="450" x2="300" y2="500" stroke={C.champagne} strokeWidth="0.4" opacity="0.2" />
            <line x1="1050" y1="350" x2="1240" y2="280" stroke={C.champagne} strokeWidth="0.3" opacity="0.18" />
            <line x1="380" y1="280" x2="200" y2="350" stroke={C.champagne} strokeWidth="0.3" opacity="0.18" />
            <line x1="600" y1="300" x2="680" y2="520" stroke={C.champagne} strokeWidth="0.3" opacity="0.15" />
            <line x1="840" y1="320" x2="900" y2="480" stroke={C.champagne} strokeWidth="0.3" opacity="0.15" />
          </g>
        </svg>

        <div
          className="absolute top-[45%] left-0 w-[60%] h-px"
          style={{
            background: `linear-gradient(to right, transparent, ${C.champagne}, transparent)`,
            filter: "blur(3px)",
            opacity: 0.03,
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <p
            className={`${inter.className} text-xs tracking-[0.25em] uppercase mb-4 text-center`}
            style={{ color: C.bronze }}
          >
            Partnerships &amp; Global Collaborations
          </p>

          <h2
            className={`${playfair.className} text-[clamp(2.5rem,7vw,5rem)] font-bold leading-[1.08] text-center mb-8`}
            style={{ color: C.ivory }}
          >
            Grow With{" "}
            <span className="italic font-normal" style={{ color: C.champagne }}>
              THE KYNXZ BRAND
            </span>
          </h2>

          <div className="space-y-4 max-w-4xl mx-auto">
            {[
              "At THE KYNXZ BRAND, we believe that meaningful growth is built through meaningful relationships.",
              "Whether you are seeking distribution opportunities, strategic partnerships, brand collaborations, or long-term business associations, we welcome conversations that align with our vision and values.",
              "From authorized distribution and retail expansion to creative collaborations and global brand development, our commitment is simple — to explore every possibility and provide the finest support we can.",
              "We do not merely build business relationships; we cultivate enduring partnerships founded on trust, excellence, and shared purpose.",
            ].map((paragraph, i) => (
              <p
                key={i}
                className={`${cormorant.className} text-[clamp(1.1rem,2vw,1.5rem)] leading-[1.5] tracking-[0.02em] text-center`}
                style={{ color: C.muted }}
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="relative mt-8 mb-6 mx-auto w-full max-w-[300px] h-px">
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to right, transparent, ${C.champagne}, transparent)`,
                opacity: 0.2,
              }}
            />
            <div
              className="absolute left-1/2 -translate-x-1/2 -top-[3px] w-[6px] h-[6px] rounded-full"
              style={{ background: C.bronze, opacity: 0.35 }}
            />
          </div>

          <div className="text-center max-w-3xl mx-auto">
            <p
              className={`${cormorant.className} italic text-xl md:text-2xl leading-[1.5]`}
              style={{ color: C.champagne }}
            >
              &ldquo;If your vision resonates with ours, we would be honored to begin the journey together.&rdquo;
            </p>
          </div>

          <div className="relative mt-10 md:mt-12 pt-6 md:pt-8 text-center">
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-px"
              style={{ background: C.champagne, opacity: 0.15 }}
            />

            <blockquote
              className={`${playfair.className} text-[clamp(1.8rem,5vw,3.5rem)] font-light italic leading-[1.2] max-w-4xl mx-auto`}
              style={{ color: C.ivory }}
            >
              &ldquo;Great brands are not built alone;
              <br />
              they are built together.&rdquo;
            </blockquote>
          </div>

          <div
            className="mx-auto mt-8 w-16 h-px"
            style={{ background: C.bronze, opacity: 0.4 }}
          />
        </div>
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════
   SECTION 5 – Let Us Begin Something Meaningful
   ═══════════════════════════════════════════════ */
function ContactFormSection({ C }: { C: (typeof THEME)["dark"] }) {
  /* ── Form state ──────────────────────────────── */
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<
    | { type: "idle" }
    | { type: "loading" }
    | { type: "success"; message: string }
    | { type: "error"; message: string }
  >({ type: "idle" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    const key = id.replace("form-", "");
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setStatus({ type: "loading" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setStatus({
        type: "success",
        message:
          data.message ||
          "Thank you for reaching out. We have received your message and will respond within 24 hours.",
      });

      setFormData({ name: "", email: "", subject: "", message: "" });

      setTimeout(() => setStatus({ type: "idle" }), 6000);
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Failed to send message. Please try again later.";
      setStatus({ type: "error", message: msg });

      setTimeout(() => setStatus({ type: "idle" }), 6000);
    }
  };

  return (
    <Section className="py-2 md:py-3 lg:py-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute left-1/2 top-[30%] -translate-x-1/2 -translate-y-1/3 w-[900px] h-[600px] rounded-full"
          style={{
            background: `radial-gradient(ellipse at center, ${C.champagne}, transparent 65%)`,
            filter: "blur(120px)",
            opacity: 0.04,
          }}
        />

        <div
          className="absolute top-[5%] right-[5%] w-[400px] h-[400px] rounded-full"
          style={{
            background: `radial-gradient(circle at center, ${C.bronze}, transparent 60%)`,
            filter: "blur(90px)",
            opacity: 0.025,
          }}
        />

        <div
          className="absolute bottom-[8%] left-[5%] w-[350px] h-[350px] rounded-full"
          style={{
            background: `radial-gradient(circle at center, ${C.ivory}, transparent 60%)`,
            filter: "blur(80px)",
            opacity: 0.02,
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-4 md:mb-6">
            <p
              className={`${inter.className} text-xs tracking-[0.25em] uppercase mb-3`}
              style={{ color: C.bronze }}
            >
              Begin Your Journey
            </p>

            <h2
              className={`${playfair.className} text-[clamp(2rem,5.5vw,4rem)] font-bold leading-[1.1] mb-4`}
              style={{ color: C.ivory }}
            >
              Let Us Begin{" "}
              <span className="italic font-normal" style={{ color: C.champagne }}>
                Something Meaningful
              </span>
            </h2>

            <p
              className={`${cormorant.className} text-lg md:text-xl leading-[1.65] max-w-2xl mx-auto`}
              style={{ color: C.muted }}
            >
              Whether you seek partnership, distribution, collaboration, or simply
              wish to connect, we welcome every conversation with warmth and intention.
            </p>

            <div
              className="mx-auto mt-5 w-20 h-px"
              style={{ background: C.bronze, opacity: 0.25 }}
            />
          </div>

          {/* Glassmorphism form card */}
          <div
            className="relative rounded-3xl border overflow-hidden"
            style={{
              borderColor: `${C.champagne}18`,
              background: `linear-gradient(135deg, ${C.bgAlt}F0, ${C.bg}F0)`,
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              boxShadow: `0 20px 60px rgba(0,0,0,0.2), inset 0 1px 0 ${C.champagne}08`,
            }}
          >
            <div
              aria-hidden
              className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none"
              style={{
                background: `radial-gradient(ellipse at center, ${C.champagne}10, transparent 70%)`,
              }}
            />

            <div className="relative z-10 px-6 py-5 sm:px-8 sm:py-6 md:px-10 md:py-8 lg:px-12 lg:py-10">
              {/* ── Toast / status banner ──────────────────── */}
              {status.type === "success" && (
                <div
                  className="relative overflow-hidden rounded-2xl border px-5 py-4 mb-6"
                  style={{
                    borderColor: `${C.champagne}30`,
                    background: `linear-gradient(135deg, ${C.champagne}12, ${C.champagne}06)`,
                  }}
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 text-lg" role="img" aria-label="checkmark">
                      ✔️
                    </span>
                    <div>
                      <p
                        className={`${inter.className} text-sm font-semibold`}
                        style={{ color: C.champagne }}
                      >
                        Message Sent Successfully
                      </p>
                      <p
                        className={`${inter.className} text-xs mt-1 leading-relaxed`}
                        style={{ color: C.muted }}
                      >
                        {status.message}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setStatus({ type: "idle" })}
                      className="ml-auto shrink-0 text-sm opacity-50 hover:opacity-100 transition-opacity"
                      style={{ color: C.champagne }}
                      aria-label="Dismiss"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              )}

              {status.type === "error" && (
                <div
                  className="relative overflow-hidden rounded-2xl border px-5 py-4 mb-6"
                  style={{
                    borderColor: "rgba(239, 68, 68, 0.3)",
                    background: "rgba(239, 68, 68, 0.08)",
                  }}
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5" role="img" aria-label="error">
                      ❌
                    </span>
                    <div>
                      <p
                        className={`${inter.className} text-sm font-semibold`}
                        style={{ color: "#ef4444" }}
                      >
                        Message Failed
                      </p>
                      <p
                        className={`${inter.className} text-xs mt-1 leading-relaxed`}
                        style={{ color: C.muted }}
                      >
                        {status.message}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setStatus({ type: "idle" })}
                      className="ml-auto shrink-0 text-sm opacity-50 hover:opacity-100 transition-opacity"
                      style={{ color: "#ef4444" }}
                      aria-label="Dismiss"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                className="space-y-4 md:space-y-5"
              >
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="form-name"
                    className={`${inter.className} block text-xs uppercase tracking-[0.22em] font-semibold mb-2.5`}
                    style={{ color: C.muted }}
                  >
                    Full Name
                  </label>
                  <input
                    id="form-name"
                    name="name"
                    type="text"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={status.type === "loading"}
                    className="contact-input w-full px-5 py-3.5 rounded-xl border text-sm
                    focus:outline-none focus:ring-2 placeholder:text-[#B8B3AA]/40
                    disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      backgroundColor: `${C.bg}80`,
                      borderColor: `${C.champagne}20`,
                      color: C.ivory,
                    }}
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="form-email"
                    className={`${inter.className} block text-xs uppercase tracking-[0.22em] font-semibold mb-2.5`}
                    style={{ color: C.muted }}
                  >
                    Email
                  </label>
                  <input
                    id="form-email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={status.type === "loading"}
                    className="contact-input w-full px-5 py-3.5 rounded-xl border text-sm
                    focus:outline-none focus:ring-2 placeholder:text-[#B8B3AA]/40
                    disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      backgroundColor: `${C.bg}80`,
                      borderColor: `${C.champagne}20`,
                      color: C.ivory,
                    }}
                  />
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="form-subject"
                    className={`${inter.className} block text-xs uppercase tracking-[0.22em] font-semibold mb-2.5`}
                    style={{ color: C.muted }}
                  >
                    Subject
                  </label>
                  <select
                    id="form-subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    disabled={status.type === "loading"}
                    className="contact-input contact-select w-full px-5 py-3.5 rounded-xl border text-sm
                    focus:outline-none focus:ring-2
                    disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      backgroundColor: `${C.bg}80`,
                      borderColor: `${C.champagne}20`,
                      color: formData.subject ? C.ivory : C.muted,
                    }}
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    <option value="partnership">
                      Partnership Opportunity
                    </option>
                    <option value="distribution">
                      Distribution Inquiry
                    </option>
                    <option value="collaboration">
                      Brand Collaboration
                    </option>
                    <option value="general">
                      General Inquiry
                    </option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="form-message"
                    className={`${inter.className} block text-xs uppercase tracking-[0.22em] font-semibold mb-2.5`}
                    style={{ color: C.muted }}
                  >
                    Message
                  </label>
                  <textarea
                    id="form-message"
                    name="message"
                    rows={5}
                    placeholder="Share your thoughts with us..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    disabled={status.type === "loading"}
                    className="contact-input contact-textarea w-full px-5 py-3.5 rounded-xl border text-sm resize-none
                    focus:outline-none focus:ring-2 placeholder:text-[#B8B3AA]/40
                    disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      backgroundColor: `${C.bg}80`,
                      borderColor: `${C.champagne}20`,
                      color: C.ivory,
                    }}
                  />
                </div>

                {/* Submit button */}
                <div className="pt-1">
                  <button
                    type="submit"
                    disabled={status.type === "loading"}
                    className="contact-submit group relative w-full inline-flex items-center justify-center rounded-full border px-10 py-4
                    text-sm tracking-[0.12em] uppercase font-semibold
                    overflow-hidden transition-all duration-500 hover:-translate-y-0.5
                    focus:outline-none focus:ring-2
                    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                    style={{
                      borderColor: C.champagne,
                      color: C.champagne,
                      background: "transparent",
                    }}
                  >
                    <span
                      aria-hidden
                      className="absolute inset-0 rounded-full transition-all duration-500 opacity-0 group-hover:opacity-100"
                      style={{
                        background: `linear-gradient(135deg, ${C.champagne}15, ${C.champagne}05)`,
                      }}
                    />
                    <span className="relative mr-3 flex items-center gap-2">
                      {status.type === "loading" ? (
                        <>
                          <svg
                            className="animate-spin h-4 w-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            aria-hidden
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                            />
                          </svg>
                          Sending...
                        </>
                      ) : (
                        "Send Message"
                      )}
                    </span>
                    <span
                      aria-hidden
                      className="relative h-2 w-2 rounded-full"
                      style={{
                        backgroundColor: C.champagne,
                        boxShadow: `0 0 12px ${C.champagne}60`,
                      }}
                    />
                    <span
                      aria-hidden
                      className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                      style={{
                        boxShadow: `inset 0 0 20px ${C.champagne}10`,
                      }}
                    />
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div
            className="mx-auto mt-8 w-16 h-px"
            style={{ background: C.bronze, opacity: 0.3 }}
          />
        </div>
      </div>
    </Section>
  );
}


/* ═══════════════════════════════════════════════
   PAGE COMPOSITION
   ═══════════════════════════════════════════════ */
export default function ContactPage() {
  const C = useTheme();

  // Set page title
  useEffect(() => {
    document.title = "Contact | THE KYNXZ BRAND";
  }, []);

  return (
    <>
      <Header />

      <main
        role="main"
        aria-label="Contact page"
        className={`${inter.variable} ${playfair.variable} ${cormorant.variable}`}
        style={{
          fontFamily: "var(--font-inter), Arial, sans-serif",
          background: C.bg,
          overflow: "hidden",
        }}
      >
        {/* Section 1 – Cinematic Hero */}
        <ContactHero C={C} />

        {/* Section 2 – Contact Information */}
        <ContactInfo C={C} />

        {/* Background transition: bg → bgAlt */}
        <div aria-hidden className="h-3 lg:h-4 w-full pointer-events-none" style={{ background: `linear-gradient(to bottom, ${C.bg}, ${C.bgAlt})` }} />

        {/* Section 3 – Where Our Journey Begins */}
        <HeadquartersSection C={C} />

        {/* Background transition: bgAlt → bg */}
        <div aria-hidden className="h-3 lg:h-4 w-full pointer-events-none" style={{ background: `linear-gradient(to bottom, ${C.bgAlt}, ${C.bg})` }} />

        {/* Section 4 – Partnerships & Global Collaborations */}
        <PartnershipsSection C={C} />

        {/* Section 5 – Let Us Begin Something Meaningful */}
        <ContactFormSection C={C} />
      </main>

      <FooterSection />
    </>
  );
}
