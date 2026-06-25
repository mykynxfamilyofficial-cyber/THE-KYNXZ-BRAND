"use client";

import { useEffect, useRef, useState, forwardRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";
import { playfair, cormorant, inter } from "../fonts";
import Header from "../components/Header";
import FooterSection from "../components/FooterSection";

import { useTheme, THEME } from "../hooks/useTheme";
/* ───────────────────────────────────────────────
   Shared animation variants
   ─────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 48 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (i = 0) => ({
    opacity: 1,
    transition: { duration: 1.2, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

const wordReveal = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1,
      delay: i * 0.12,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

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
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section className="min-h-[100dvh] flex items-center justify-center relative overflow-hidden">
      {/* Animated floating orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ y: [0, -25, 0], scale: [1, 1.03, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-[0.05]"
          style={{
            background:
              "radial-gradient(circle at center, #D6CFC7, transparent 65%)",
            filter: "blur(100px)",
          }}
        />
        <motion.div
          animate={{ y: [0, 30, 0], x: [0, -15, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute top-[60%] right-[10%] w-[400px] h-[400px] rounded-full opacity-[0.03]"
          style={{
            background:
              "radial-gradient(circle at center, #8B7355, transparent 60%)",
            filter: "blur(80px)",
          }}
        />
        <motion.div
          animate={{ y: [0, -20, 0], x: [0, 20, 0], scale: [1, 1.04, 1] }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut", delay: 5 }}
          className="absolute top-[15%] left-[5%] w-[350px] h-[350px] rounded-full opacity-[0.025]"
          style={{
            background:
              "radial-gradient(circle at center, #F5F2ED, transparent 60%)",
            filter: "blur(70px)",
          }}
        />
        {/* Abstract rotating shapes */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
          className="absolute top-[25%] right-[8%] w-[280px] h-[280px] opacity-[0.015]"
          style={{
            border: "1px solid rgba(214, 207, 199, 0.25)",
            borderRadius: "45% 55% 40% 60% / 50% 42% 58% 48%",
          }}
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[30%] left-[12%] w-[200px] h-[200px] opacity-[0.012]"
          style={{
            border: "1px solid rgba(214, 207, 199, 0.15)",
            borderRadius: "55% 45% 60% 40% / 45% 55% 45% 55%",
          }}
        />
        {/* Drifting particle dots */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[2px] h-[2px] rounded-full"
            style={{
              background: C.champagne,
              top: `${10 + Math.random() * 80}%`,
              left: `${5 + Math.random() * 90}%`,
              opacity: 0.04 + Math.random() * 0.06,
            }}
            animate={{
              y: [0, -45 - Math.random() * 65, 0],
              x: [0, 20 - Math.random() * 40, 0],
              opacity: [
                0.03 + Math.random() * 0.04,
                0.06 + Math.random() * 0.08,
                0.03 + Math.random() * 0.04,
              ],
            }}
            transition={{
              duration: 14 + Math.random() * 20,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 12,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <motion.div
        ref={ref}
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative z-10 max-w-[1400px] mx-auto px-6 text-center"
      >
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className={`${inter.className} text-xs tracking-[0.25em] uppercase mb-8`}
          style={{ color: C.bronze }}
        >
          Get In Touch
        </motion.p>

        <h1
          className={`${playfair.className} text-[clamp(2.4rem,9vw,6rem)] font-bold leading-[1.15] tracking-[0.02em]`}
          style={{ color: C.ivory }}
        >
          {heroLines.map((line, lineIdx) => (
            <div key={lineIdx} className="overflow-hidden">
              {line.map((word, wordIdx) => {
                const globalIdx =
                  heroLines
                    .slice(0, lineIdx)
                    .reduce((acc, l) => acc + l.length, 0) + wordIdx;
                return (
                  <motion.span
                    key={wordIdx}
                    variants={wordReveal}
                    initial="hidden"
                    animate="visible"
                    custom={globalIdx}
                    className="inline-block mr-[0.3em] last:mr-0"
                  >
                    {word}
                  </motion.span>
                );
              })}
            </div>
          ))}
        </h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={4}
          className={`${inter.className} mt-10 text-base md:text-lg max-w-2xl mx-auto leading-relaxed tracking-[0.05em]`}
          style={{ color: C.muted }}
        >
          We would be honored to hear from you. Whether you have a question, a
          collaboration idea, or simply wish to connect — every message matters.
        </motion.p>

        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          custom={6}
          className="mt-16 flex items-center justify-center gap-4"
        >
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
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: `linear-gradient(to bottom, transparent, ${C.bg})` }}
      />
    </section>
  );
}

/* ═══════════════════════════════════════════════
   SECTION 2 – Contact Information
   ═══════════════════════════════════════════════ */
function ContactInfo({ C }: { C: (typeof THEME)["dark"] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
    <Section className="py-12 md:py-16 lg:py-20">
      <div ref={ref} className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left — Contact details list */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="space-y-10"
          >
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

            <div className="space-y-8 pt-4">
              {contactDetails.map((detail, i) => (
                <motion.div
                  key={detail.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 1, delay: 0.3 + i * 0.12, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                  className="group"
                >
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
                  {/* Accent line on hover */}
                  <div
                    className="mt-3 w-8 h-px transition-all duration-500 group-hover:w-16"
                    style={{ background: C.bronze, opacity: 0.3 }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — Decorative map-inspired artwork */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.4, delay: 0.15, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="relative flex items-center justify-center"
          >
            <div className="relative w-full max-w-[440px] aspect-square">
              {/* Outer decorative ring */}
              <div
                className="absolute inset-[4%] rounded-full"
                style={{ border: `1px solid ${C.champagne}15` }}
              />
              <div
                className="absolute inset-[12%] rounded-full"
                style={{ border: `1px solid ${C.champagne}10` }}
              />
              {/* Inner glow */}
              <div
                className="absolute inset-[18%] rounded-full"
                style={{
                  background: `radial-gradient(circle at 40% 35%, ${C.champagne}15, ${C.bronze}06, transparent 70%)`,
                  filter: "blur(40px)",
                }}
              />

              {/* Map grid SVG */}
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
                {/* Concentric arcs */}
                <path d="M 20 50 Q 50 10 80 50" stroke={C.bronze} strokeWidth="0.3" opacity="0.4" fill="none" />
                <path d="M 20 50 Q 50 90 80 50" stroke={C.bronze} strokeWidth="0.3" opacity="0.4" fill="none" />
                {/* Directional diamonds */}
                <polygon points="50,6 52,10 50,14 48,10" fill={C.champagne} opacity="0.3" />
                <polygon points="50,86 52,90 50,94 48,90" fill={C.champagne} opacity="0.3" />
                <polygon points="6,50 10,52 14,50 10,48" fill={C.champagne} opacity="0.3" />
                <polygon points="86,50 90,52 94,50 90,48" fill={C.champagne} opacity="0.3" />
              </svg>

              {/* Center dot */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[8%] h-[8%] rounded-full"
                style={{
                  background: `radial-gradient(circle at center, ${C.champagne}, transparent 70%)`,
                  opacity: 0.2,
                }}
              />

              {/* Compass-like rotating elements */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] opacity-[0.02]"
                style={{
                  border: `1px solid ${C.bronze}20`,
                  borderRadius: "48% 52% 45% 55% / 50% 45% 55% 50%",
                }}
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 90, repeat: Infinity, ease: "linear", delay: 2 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] h-[50%] opacity-[0.015]"
                style={{
                  border: `1px solid ${C.champagne}15`,
                  borderRadius: "52% 48% 55% 45% / 48% 55% 45% 52%",
                }}
              />

              {/* Corner accents */}
              <div className="absolute top-3 left-3 w-10 h-px" style={{ background: C.champagne, opacity: 0.1 }} />
              <div className="absolute top-3 left-3 w-px h-10" style={{ background: C.champagne, opacity: 0.1 }} />
              <div className="absolute bottom-3 right-3 w-10 h-px" style={{ background: C.champagne, opacity: 0.1 }} />
              <div className="absolute bottom-3 right-3 w-px h-10" style={{ background: C.champagne, opacity: 0.1 }} />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative floating line */}
      <motion.div
        className="absolute left-[5%] top-[25%] w-px h-[40%] opacity-[0.04]"
        style={{
          background: `linear-gradient(to bottom, transparent, ${C.champagne}, transparent)`,
        }}
        animate={{ scaleY: [0.8, 1.2, 0.8], opacity: [0.02, 0.06, 0.02] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
    </Section>
  );
}

/* ═══════════════════════════════════════════════
   SECTION 3 – Where Our Journey Begins
   ═══════════════════════════════════════════════ */
function HeadquartersSection({ C }: { C: (typeof THEME)["dark"] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Section className="py-16 md:py-20 lg:py-24 relative min-h-[80dvh] flex items-center" style={{ background: C.bgAlt }}>
      {/* ─── Ambient glow canvas ─── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Warm champagne ambient orb — top right */}
        <motion.div
          animate={{ y: [0, -25, 0], scale: [1, 1.04, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] right-[8%] w-[450px] h-[450px] rounded-full opacity-[0.04]"
          style={{
            background: `radial-gradient(circle at center, ${C.champagne}, transparent 65%)`,
            filter: "blur(100px)",
          }}
        />
        {/* Bronze ambient orb — bottom left */}
        <motion.div
          animate={{ y: [0, 20, 0], x: [0, -15, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute bottom-[15%] left-[5%] w-[350px] h-[350px] rounded-full opacity-[0.03]"
          style={{
            background: `radial-gradient(circle at center, ${C.bronze}, transparent 60%)`,
            filter: "blur(80px)",
          }}
        />

        {/* ─── Compass-inspired decorative ring ─── */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          className="absolute top-[18%] right-[12%] w-[200px] h-[200px] opacity-[0.012]"
          style={{
            border: `1px solid ${C.champagne}30`,
            borderRadius: "50%",
          }}
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear", delay: 2 }}
          className="absolute top-[18%] right-[12%] w-[140px] h-[140px] opacity-[0.015]"
          style={{
            border: `1px solid ${C.bronze}25`,
            borderRadius: "50%",
            transformOrigin: "center",
          }}
        />
        {/* Compass crosshair lines */}
        <div
          className="absolute top-[18%] right-[12%] w-[200px] h-[200px] opacity-[0.008] pointer-events-none"
          style={{ transform: "translate(-50%, -50%)" }}
        >
          <div className="absolute top-0 left-1/2 w-px h-full" style={{ background: C.champagne }} />
          <div className="absolute left-0 top-1/2 w-full h-px" style={{ background: C.champagne }} />
        </div>

        {/* ─── Abstract latitude/longitude arcs ─── */}
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

        {/* ─── Drifting particle dots ─── */}
        {Array.from({ length: 18 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[2px] h-[2px] rounded-full"
            style={{
              background: C.champagne,
              top: `${8 + Math.random() * 84}%`,
              left: `${5 + Math.random() * 90}%`,
              opacity: 0.02 + Math.random() * 0.04,
            }}
            animate={{
              y: [0, -25 - Math.random() * 45, 0],
              x: [0, 15 - Math.random() * 30, 0],
              opacity: [0.02 + Math.random() * 0.03, 0.05 + Math.random() * 0.05, 0.02 + Math.random() * 0.03],
            }}
            transition={{
              duration: 14 + Math.random() * 18,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 12,
            }}
          />
        ))}
      </div>

      <div ref={ref} className="relative z-10 w-full max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-center">
          {/* ─── Left: Artistic map-inspired visual ─── */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="lg:col-span-2 relative"
          >
            <div className="relative w-full aspect-[4/3] lg:aspect-square max-w-[420px] mx-auto">
              {/* Outer decorative ring */}
              <div
                className="absolute inset-[6%] rounded-full"
                style={{ border: `1px solid ${C.champagne}18` }}
              />
              {/* Mid ring */}
              <div
                className="absolute inset-[14%] rounded-full"
                style={{ border: `1px solid ${C.champagne}10` }}
              />
              {/* Inner glow */}
              <div
                className="absolute inset-[20%] rounded-full"
                style={{
                  background: `radial-gradient(circle at 40% 35%, ${C.champagne}18, ${C.bronze}08, transparent 70%)`,
                  filter: "blur(30px)",
                }}
              />
              {/* Center dot */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[10%] h-[10%] rounded-full"
                style={{
                  background: `radial-gradient(circle at center, ${C.champagne}, transparent 70%)`,
                  opacity: 0.25,
                }}
              />

              {/* ── Map grid lines ── */}
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

              {/* Decorative corner accents */}
              <div className="absolute top-2 left-2 w-10 h-px" style={{ background: C.champagne, opacity: 0.12 }} />
              <div className="absolute top-2 left-2 w-px h-10" style={{ background: C.champagne, opacity: 0.12 }} />
              <div className="absolute bottom-2 right-2 w-10 h-px" style={{ background: C.champagne, opacity: 0.12 }} />
              <div className="absolute bottom-2 right-2 w-px h-10" style={{ background: C.champagne, opacity: 0.12 }} />
            </div>
          </motion.div>

          {/* ─── Right: Address content ─── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.15, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="lg:col-span-3 space-y-8"
          >
            {/* Eyebrow */}
            <p
              className={`${inter.className} text-xs tracking-[0.25em] uppercase`}
              style={{ color: C.bronze }}
            >
              Headquartered in the Heart of Wyoming, United States
            </p>

            {/* Main title */}
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

            {/* Address block — editorial verse layout */}
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

            {/* Decorative accent line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.5, delay: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className="w-24 h-px"
              style={{ background: C.bronze, opacity: 0.4 }}
            />

            {/* Caption */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className={`${cormorant.className} italic text-lg md:text-xl`}
              style={{ color: C.muted }}
            >
              From Sheridan to the World — Crafting Meaning Beyond Commerce.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════
   SECTION 4 – Partnerships & Global Collaborations
   ═══════════════════════════════════════════════ */
function PartnershipsSection({ C }: { C: (typeof THEME)["dark"] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Section className="py-16 md:py-20 lg:py-24 relative min-h-[80dvh] flex items-center">
      {/* ─── Constellation background ─── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Ambient glow core */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/3 w-[800px] h-[500px] rounded-full"
          style={{
            background: `radial-gradient(ellipse at center, ${C.champagne}, transparent 65%)`,
            filter: "blur(120px)",
            opacity: 0.04,
          }}
        />

        {/* Warm drift orb */}
        <motion.div
          animate={{ y: [0, -20, 0], x: [0, 15, 0], scale: [1, 1.04, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[8%] right-[5%] w-[400px] h-[400px] rounded-full"
          style={{
            background: `radial-gradient(circle at center, ${C.bronze}, transparent 60%)`,
            filter: "blur(90px)",
            opacity: 0.03,
          }}
        />

        {/* ─── Constellation / connecting lines ─── */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.04] md:opacity-[0.06]"
          viewBox="0 0 1440 800"
          preserveAspectRatio="none"
          fill="none"
        >
          {/* Constellation nodes and connecting lines */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          >
            {/* Central hub cluster */}
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

            {/* Connecting lines */}
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

            {/* Pulsing node animations */}
            <circle cx="720" cy="400" r="2" fill={C.champagne} opacity="0.3">
              <animate attributeName="r" values="2;5;2" dur="4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.3;0;0.3" dur="4s" repeatCount="indefinite" />
            </circle>
            <circle cx="900" cy="480" r="1.5" fill={C.champagne} opacity="0.25">
              <animate attributeName="r" values="1.5;4;1.5" dur="5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.25;0;0.25" dur="5s" repeatCount="indefinite" />
            </circle>
            <circle cx="600" cy="300" r="1.5" fill={C.champagne} opacity="0.2">
              <animate attributeName="r" values="1.5;3.5;1.5" dur="6s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.2;0;0.2" dur="6s" repeatCount="indefinite" />
            </circle>
          </motion.g>
        </svg>

        {/* Subtle horizontal sweep */}
        <motion.div
          animate={{ x: ["-100%", "200%"], opacity: [0, 0.03, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[45%] left-0 w-[60%] h-px"
          style={{
            background: `linear-gradient(to right, transparent, ${C.champagne}, transparent)`,
            filter: "blur(3px)",
          }}
        />

        {/* Drifting particles */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[2px] h-[2px] rounded-full"
            style={{
              background: C.champagne,
              top: `${8 + Math.random() * 84}%`,
              left: `${5 + Math.random() * 90}%`,
              opacity: 0.015 + Math.random() * 0.035,
            }}
            animate={{
              y: [0, -25 - Math.random() * 45, 0],
              x: [0, 15 - Math.random() * 30, 0],
              opacity: [0.015 + Math.random() * 0.025, 0.04 + Math.random() * 0.05, 0.015 + Math.random() * 0.025],
            }}
            transition={{
              duration: 16 + Math.random() * 20,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 12,
            }}
          />
        ))}
      </div>

      <div ref={ref} className="relative z-10 w-full max-w-[1200px] mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className={`${inter.className} text-xs tracking-[0.25em] uppercase mb-6 text-center`}
            style={{ color: C.bronze }}
          >
            Partnerships &amp; Global Collaborations
          </motion.p>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 40, filter: "blur(4px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 1.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className={`${playfair.className} text-[clamp(2.5rem,7vw,5rem)] font-bold leading-[1.08] text-center mb-12`}
            style={{ color: C.ivory }}
          >
            Grow With{" "}
            <span className="italic font-normal" style={{ color: C.champagne }}>
              THE KYNXZ BRAND
            </span>
          </motion.h2>

          {/* Body content — editorial paragraphs */}
          <div className="space-y-6 max-w-4xl mx-auto">
            {[
              "At THE KYNXZ BRAND, we believe that meaningful growth is built through meaningful relationships.",
              "Whether you are seeking distribution opportunities, strategic partnerships, brand collaborations, or long-term business associations, we welcome conversations that align with our vision and values.",
              "From authorized distribution and retail expansion to creative collaborations and global brand development, our commitment is simple — to explore every possibility and provide the finest support we can.",
              "We do not merely build business relationships; we cultivate enduring partnerships founded on trust, excellence, and shared purpose.",
            ].map((paragraph, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 25 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 1,
                  delay: 0.35 + i * 0.1,
                  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
                }}
                className={`${cormorant.className} text-[clamp(1.1rem,2vw,1.5rem)] leading-[1.75] tracking-[0.02em] text-center`}
                style={{ color: C.muted }}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          {/* Decorative divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.5, delay: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="relative mt-12 mb-10 mx-auto w-full max-w-[300px] h-px"
          >
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
          </motion.div>

          {/* Premium invitation quote */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98, filter: "blur(2px)" }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" } : {}}
            transition={{ duration: 1.4, delay: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="text-center max-w-3xl mx-auto"
          >
            <p
              className={`${cormorant.className} italic text-xl md:text-2xl leading-[1.5]`}
              style={{ color: C.champagne }}
            >
              &ldquo;If your vision resonates with ours, we would be honored to begin the journey together.&rdquo;
            </p>
          </motion.div>

          {/* Final premium quote highlight */}
          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(4px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 1.6, delay: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="relative mt-16 md:mt-20 pt-10 md:pt-12 text-center"
          >
            {/* Top accent line */}
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
          </motion.div>

          {/* Final accent */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.5, delay: 1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="mx-auto mt-12 w-16 h-px"
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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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

      // Reset form
      setFormData({ name: "", email: "", subject: "", message: "" });

      // Auto-dismiss success after 6 seconds
      setTimeout(() => setStatus({ type: "idle" }), 6000);
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Failed to send message. Please try again later.";
      setStatus({ type: "error", message: msg });

      // Auto-dismiss error after 6 seconds
      setTimeout(() => setStatus({ type: "idle" }), 6000);
    }
  };

  return (
    <Section className="py-16 md:py-20 lg:py-24 relative overflow-hidden">
      {/* ─── Ambient glow canvas ─── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="absolute left-1/2 top-[30%] -translate-x-1/2 -translate-y-1/3 w-[900px] h-[600px] rounded-full"
          style={{
            background: `radial-gradient(ellipse at center, ${C.champagne}, transparent 65%)`,
            filter: "blur(120px)",
            opacity: 0.04,
          }}
        />

        <motion.div
          animate={{ y: [0, -20, 0], x: [0, 15, 0], scale: [1, 1.04, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[5%] right-[5%] w-[400px] h-[400px] rounded-full"
          style={{
            background: `radial-gradient(circle at center, ${C.bronze}, transparent 60%)`,
            filter: "blur(90px)",
            opacity: 0.025,
          }}
        />

        <motion.div
          animate={{ y: [0, 25, 0], x: [0, -10, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute bottom-[8%] left-[5%] w-[350px] h-[350px] rounded-full"
          style={{
            background: `radial-gradient(circle at center, ${C.ivory}, transparent 60%)`,
            filter: "blur(80px)",
            opacity: 0.02,
          }}
        />

        {/* Floating particle dots */}
        {Array.from({ length: 16 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[2px] h-[2px] rounded-full"
            style={{
              background: C.champagne,
              top: `${8 + Math.random() * 84}%`,
              left: `${5 + Math.random() * 90}%`,
              opacity: 0.015 + Math.random() * 0.035,
            }}
            animate={{
              y: [0, -25 - Math.random() * 45, 0],
              x: [0, 15 - Math.random() * 30, 0],
              opacity: [0.015 + Math.random() * 0.025, 0.04 + Math.random() * 0.05, 0.015 + Math.random() * 0.025],
            }}
            transition={{
              duration: 16 + Math.random() * 20,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 12,
            }}
          />
        ))}
      </div>

      <div ref={ref} className="relative z-10 w-full max-w-[1400px] mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          {/* Heading area */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="text-center mb-12 md:mb-14"
          >
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className={`${inter.className} text-xs tracking-[0.25em] uppercase mb-5`}
              style={{ color: C.bronze }}
            >
              Begin Your Journey
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 35, filter: "blur(4px)" }}
              animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 1.3, delay: 0.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className={`${playfair.className} text-[clamp(2rem,5.5vw,4rem)] font-bold leading-[1.1] mb-6`}
              style={{ color: C.ivory }}
            >
              Let Us Begin{" "}
              <span className="italic font-normal" style={{ color: C.champagne }}>
                Something Meaningful
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className={`${cormorant.className} text-lg md:text-xl leading-[1.65] max-w-2xl mx-auto`}
              style={{ color: C.muted }}
            >
              Whether you seek partnership, distribution, collaboration, or simply
              wish to connect, we welcome every conversation with warmth and intention.
            </motion.p>

            {/* Decorative divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className="mx-auto mt-8 w-20 h-px"
              style={{ background: C.bronze, opacity: 0.25 }}
            />
          </motion.div>

          {/* ─── Glassmorphism form card ─── */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.98 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 1.4, delay: 0.35, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="relative rounded-3xl border overflow-hidden"
            style={{
              borderColor: `${C.champagne}18`,
              background: `linear-gradient(135deg, ${C.bgAlt}F0, ${C.bg}F0)`,
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              boxShadow: `0 20px 60px rgba(0,0,0,0.2), inset 0 1px 0 ${C.champagne}08`,
            }}
          >
            {/* Subtle inner top glow */}
            <div
              aria-hidden
              className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none"
              style={{
                background: `radial-gradient(ellipse at center, ${C.champagne}10, transparent 70%)`,
              }}
            />

            <div className="relative z-10 px-6 py-10 sm:px-10 sm:py-12 md:px-14 md:py-14 lg:px-16 lg:py-16">
              {/* ── Toast / status banner ──────────────────── */}
              {status.type === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: -20, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -20, height: 0 }}
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
                </motion.div>
              )}

              {status.type === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: -20, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -20, height: 0 }}
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
                </motion.div>
              )}

              <form
                onSubmit={handleSubmit}
                className="space-y-6 md:space-y-7"
              >
                {/* Full Name */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                >
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
                </motion.div>

                {/* Email */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                >
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
                </motion.div>

                {/* Subject */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.9, delay: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                >
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
                    className="contact-input w-full px-5 py-3.5 rounded-xl border text-sm
                    focus:outline-none focus:ring-2 appearance-none
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
                </motion.div>

                {/* Message */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.9, delay: 0.75, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                >
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
                </motion.div>

                {/* Submit button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.9, delay: 0.85, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                  className="pt-2"
                >
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
                    {/* Hover fill glow */}
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
                </motion.div>
              </form>
            </div>
          </motion.div>

          {/* Bottom accent */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.5, delay: 1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="mx-auto mt-12 w-16 h-px"
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

        {/* Section 3 – Where Our Journey Begins */}
        <HeadquartersSection C={C} />

        {/* Section 4 – Partnerships & Global Collaborations */}
        <PartnershipsSection C={C} />

        {/* Section 5 – Let Us Begin Something Meaningful */}
        <ContactFormSection C={C} />
      </main>

      <FooterSection />
    </>
  );
}
