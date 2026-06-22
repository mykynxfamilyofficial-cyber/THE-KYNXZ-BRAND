"use client";

import { useEffect, useRef, useState, forwardRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";
import { playfair, cormorant, inter } from "../fonts";
import Header from "../components/Header";
import FooterSection from "../components/FooterSection";

/* ───────────────────────────────────────────────
   Theme-aware color tokens
   ─────────────────────────────────────────────── */
const THEME = {
  dark: {
    bg: "#0A0A0A",
    bgAlt: "#111111",
    warm: "#1B1610",
    champagne: "#D6CFC7",
    bronze: "#8B7355",
    ivory: "#F5F2ED",
    muted: "#B8B3AA",
  },
  light: {
    bg: "#F6F3EE",
    bgAlt: "#EDE8DF",
    warm: "#E7DED2",
    champagne: "#8B7355",
    bronze: "#6B5B4A",
    ivory: "#1A1815",
    muted: "#6B6358",
  },
};

function useThemeColors() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const root = document.documentElement;
    const current = root.getAttribute("data-theme") as "dark" | "light" || "dark";
    setTheme(current);

    const mo = new MutationObserver(() => {
      const t = root.getAttribute("data-theme") as "dark" | "light" || "dark";
      setTheme(t);
    });
    mo.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    return () => mo.disconnect();
  }, []);

  return THEME[theme];
}

/* ───────────────────────────────────────────────
   Shared animation variants
   ─────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 48 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (i = 0) => ({
    opacity: 1,
    transition: { duration: 1.2, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

/* Word-by-word cinematic reveal for editorial impact */
const wordReveal = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1,
      delay: i * 0.12,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

/* Editorial 3-line layout for the hero headline */
const headlineLines = [
  ["Beyond", "Commerce."],
  ["We", "Craft"],
  ["Meaning."],
];

/* ───────────────────────────────────────────────
   Parallax artistic image block
   ─────────────────────────────────────────────── */
function ArtImage({
  gradient,
  label,
  index,
}: {
  gradient: string;
  label: string;
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 1.4, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full h-full min-h-[320px] md:min-h-[460px] lg:min-h-[540px] rounded-[2px] overflow-hidden"
    >
      {/* Main artistic gradient */}
      <div className="absolute inset-0" style={{ background: gradient }} />

      {/* Watercolor texture overlay */}
      <div
        className="absolute inset-0 mix-blend-soft-light opacity-30"
        style={{
          background: `
            radial-gradient(ellipse 60% 30% at 20% 30%, rgba(214, 207, 199, 0.12), transparent 60%),
            radial-gradient(ellipse 50% 25% at 70% 60%, rgba(139, 115, 85, 0.08), transparent 50%),
            radial-gradient(ellipse 40% 20% at 50% 80%, rgba(245, 242, 237, 0.06), transparent 45%)
          `,
          filter: "blur(8px)",
        }}
      />

      {/* Paper grain */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 40%, rgba(255,255,255,0.15) 1px, transparent 1px)",
          backgroundSize: "4px 4px",
        }}
      />

      {/* Label */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className={`${playfair.className} text-[clamp(1.2rem,4vw,2.4rem)] tracking-[0.15em] uppercase opacity-20`}
          style={{ color: "#D6CFC7" }}
        >
          {label}
        </span>
      </div>

      {/* Decorative corner lines */}
      <div className="absolute top-6 left-6 w-12 h-px bg-white/8" />
      <div className="absolute top-6 left-6 w-px h-12 bg-white/8" />
      <div className="absolute bottom-6 right-6 w-12 h-px bg-white/8" />
      <div className="absolute bottom-6 right-6 w-px h-12 bg-white/8" />
    </motion.div>
  );
}

/* ───────────────────────────────────────────────
   Reusable section wrapper (forwardRef for parallax)
   ─────────────────────────────────────────────── */
const Section = forwardRef<
  HTMLElement,
  { children: React.ReactNode; className?: string; id?: string }
>(({ children, className = "", id }, ref) => (
  <section
    ref={ref}
    id={id}
    className={`relative overflow-hidden ${className}`}
  >
    {children}
  </section>
));
Section.displayName = "Section";

/* ═══════════════════════════════════════════════
   SECTION 1 – Cinematic Hero
   ═══════════════════════════════════════════════ */
function CinematicHero({ C }: { C: (typeof THEME)["dark"] }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <Section className="min-h-[100dvh] flex items-center justify-center relative">
      {/* Animated floating abstract shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Large floating orbs */}
        <motion.div
          animate={{ y: [0, -30, 0], x: [0, 15, 0], scale: [1, 1.04, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[12%] right-[8%] w-[500px] h-[500px] rounded-full opacity-[0.04]"
          style={{
            background: "radial-gradient(circle at center, #D6CFC7, transparent 65%)",
            filter: "blur(80px)",
          }}
        />
        <motion.div
          animate={{ y: [0, 25, 0], x: [0, -20, 0], scale: [1, 1.06, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[15%] left-[5%] w-[380px] h-[380px] rounded-full opacity-[0.03]"
          style={{
            background: "radial-gradient(circle at center, #8B7355, transparent 60%)",
            filter: "blur(70px)",
          }}
        />
        {/* Abstract rotating shapes */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute top-[20%] left-[10%] w-[300px] h-[300px] opacity-[0.02]"
          style={{
            border: "1px solid rgba(214, 207, 199, 0.3)",
            borderRadius: "42% 58% 38% 62% / 52% 44% 56% 48%",
          }}
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[25%] right-[12%] w-[200px] h-[200px] opacity-[0.015]"
          style={{
            border: "1px solid rgba(214, 207, 199, 0.2)",
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
              opacity: 0.06 + Math.random() * 0.08,
            }}
            animate={{
              y: [0, -40 - Math.random() * 60, 0],
              x: [0, 20 - Math.random() * 40, 0],
              opacity: [0.04 + Math.random() * 0.06, 0.08 + Math.random() * 0.1, 0.04 + Math.random() * 0.06],
            }}
            transition={{
              duration: 12 + Math.random() * 18,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 10,
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
          The KYNXZ BRAND
        </motion.p>

        <h1
          className={`${playfair.className} text-[clamp(2.2rem,8vw,5.5rem)] font-bold leading-[1.2] tracking-[0.04em]`}
          style={{ color: C.ivory }}
        >
          {headlineLines.map((line, lineIdx) => (
            <div key={lineIdx} className="overflow-hidden">
              {line.map((word, wordIdx) => {
                const globalIdx = headlineLines
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
          custom={6}
          className={`${inter.className} mt-10 text-base md:text-lg max-w-2xl mx-auto leading-relaxed tracking-[0.05em]`}
          style={{ color: C.muted }}
        >
          Every creation carries a story. Every detail holds intention. We exist
          at the intersection of artistry and purpose,shaping a world where
          meaning matters.
        </motion.p>

        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          custom={8}
          className="mt-16 flex items-center justify-center gap-4"
        >
          <span className="block w-16 h-px" style={{ background: C.bronze }} />
          <span className={`${cormorant.className} italic text-sm`} style={{ color: C.champagne }}>
            Since Inception
          </span>
          <span className="block w-16 h-px" style={{ background: C.bronze }} />
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: `linear-gradient(to bottom, transparent, ${C.bg})` }}
      />
    </Section>
  );
}

/* ═══════════════════════════════════════════════
   SECTION 2 – The Story
   ═══════════════════════════════════════════════ */
function TheStory({ C }: { C: (typeof THEME)["dark"] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Section className="py-12 md:py-16 lg:py-20">
      <div ref={ref} className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — Artistic image area */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <ArtImage
              gradient={`
                linear-gradient(135deg, ${C.warm} 0%, ${C.bgAlt} 40%, ${C.bg} 100%),
                radial-gradient(ellipse at 30% 20%, rgba(214, 207, 199, 0.08), transparent 50%),
                radial-gradient(ellipse at 70% 80%, rgba(139, 115, 85, 0.06), transparent 45%)
              `}
              label="The Beginning"
              index={0}
            />
          </motion.div>

          {/* Right — Brand story */}
          <div className="space-y-8">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className={`${inter.className} text-xs tracking-[0.25em] uppercase`}
              style={{ color: C.bronze }}
            >
              Our Story
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className={`${playfair.className} text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.1]`}
              style={{ color: C.ivory }}
            >
              Born from a{" "}
              <span className="italic font-normal" style={{ color: C.champagne }}>
                relentless pursuit
              </span>{" "}
              of the extraordinary.
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-6"
            >
              <p className={`${inter.className} text-base md:text-lg leading-[1.9]`} style={{ color: C.muted }}>
                THE KYNXZ BRAND was not conceived in a boardroom. It was born in
                the quiet hours of reflection, a realization that true luxury had
                lost its soul. We set out to restore it.
              </p>
              <p className={`${inter.className} text-base md:text-lg leading-[1.9]`} style={{ color: C.muted }}>
                Every product, every experience, every detail is an act of
                rebellion against the ordinary. We do not follow trends. We do not
                chase attention. We pursue meaning, quality, and timeless design
                 in every stitch, every curve, every material we choose.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="pt-4"
            >
              <div className="flex items-center gap-4">
                <span className="block w-12 h-px" style={{ background: C.bronze }} />
                <span className={`${cormorant.className} italic text-lg`} style={{ color: C.champagne }}>
                  Authenticity over artifice
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Decorative floating line */}
      <motion.div
        className="absolute right-[5%] top-[25%] w-px h-[40%] opacity-[0.04]"
        style={{ background: `linear-gradient(to bottom, transparent, ${C.champagne}, transparent)` }}
        animate={{ scaleY: [0.8, 1.2, 0.8], opacity: [0.02, 0.06, 0.02] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
    </Section>
  );
}

/* ═══════════════════════════════════════════════
   SECTION 3 – Philosophy Gallery
   ═══════════════════════════════════════════════ */
const philosophies = [
  {
    title: "Purpose",
    subtitle: "Why we exist",
    gradient: `
      linear-gradient(160deg, #0A0A0A 0%, #111111 35%, #1B1610 100%),
      radial-gradient(ellipse at 40% 30%, rgba(214, 207, 199, 0.06), transparent 50%),
      radial-gradient(ellipse at 60% 70%, rgba(139, 115, 85, 0.04), transparent 45%)
    `,
    body: "We exist to elevate the every day. Not through excess, but through intention. Every creation serves a purpose to inspire, to endure, to mean something.",
    side: "left" as const,
  },
  {
    title: "Timelessness",
    subtitle: "Beyond seasons",
    gradient: `
      linear-gradient(200deg, #111111 0%, #0A0A0A 40%, #1B1610 100%),
      radial-gradient(ellipse at 60% 25%, rgba(214, 207, 199, 0.05), transparent 50%),
      radial-gradient(ellipse at 30% 75%, rgba(139, 115, 85, 0.05), transparent 45%)
    `,
    body: "We design for permanence. In a world of disposable trends, we create objects and experiences that age gracefully growing more beautiful with time, never fading into irrelevance.",
    side: "right" as const,
  },
  {
    title: "Craftsmanship",
    subtitle: "The art of detail",
    gradient: `
      linear-gradient(180deg, #1B1610 0%, #111111 30%, #0A0A0A 100%),
      radial-gradient(ellipse at 50% 40%, rgba(214, 207, 199, 0.07), transparent 50%),
      radial-gradient(ellipse at 50% 60%, rgba(139, 115, 85, 0.03), transparent 45%)
    `,
    body: "Every curve, every seam, every finish is deliberate. Our artisans pour their mastery into each piece, knowing that true luxury reveals itself in the details most will never see.",
    side: "left" as const,
  },
];

function PhilosophyScene({
  item,
  index,
  C,
}: {
  item: (typeof philosophies)[0];
  index: number;
  C: (typeof THEME)["dark"];
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  const imageFirst = item.side === "left";

  return (
    <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
      {imageFirst ? (
        <>
          <motion.div style={{ y }} initial={{ opacity: 0, x: -40 }}>
            <motion.div
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <ArtImage gradient={item.gradient} label={item.title} index={index} />
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            <p className={`${inter.className} text-xs tracking-[0.25em] uppercase`} style={{ color: C.bronze }}>
              {item.subtitle}
            </p>
            <h3 className={`${playfair.className} text-[clamp(1.8rem,4vw,3rem)] font-bold leading-[1.1]`} style={{ color: C.ivory }}>
              {item.title}
            </h3>
            <p className={`${inter.className} text-base md:text-lg leading-[1.9]`} style={{ color: C.muted }}>
              {item.body}
            </p>
            <div className="pt-2">
              <span className="block w-16 h-px" style={{ background: C.bronze }} />
            </div>
          </motion.div>
        </>
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6 lg:order-2"
          >
            <p className={`${inter.className} text-xs tracking-[0.25em] uppercase`} style={{ color: C.bronze }}>
              {item.subtitle}
            </p>
            <h3 className={`${playfair.className} text-[clamp(1.8rem,4vw,3rem)] font-bold leading-[1.1]`} style={{ color: C.ivory }}>
              {item.title}
            </h3>
            <p className={`${inter.className} text-base md:text-lg leading-[1.9]`} style={{ color: C.muted }}>
              {item.body}
            </p>
            <div className="pt-2">
              <span className="block w-16 h-px" style={{ background: C.bronze }} />
            </div>
          </motion.div>
          <motion.div style={{ y }} initial={{ opacity: 0, x: 40 }}>
            <motion.div
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <ArtImage gradient={item.gradient} label={item.title} index={index} />
            </motion.div>
          </motion.div>
        </>
      )}
    </div>
  );
}

function PhilosophyGallery({ C }: { C: (typeof THEME)["dark"] }) {
  return (
    <Section className="py-12 md:py-16 lg:py-20">
      <div className="max-w-[1400px] mx-auto px-6 space-y-28 md:space-y-40">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-6"
        >
          <p className={`${inter.className} text-xs tracking-[0.25em] uppercase mb-4`} style={{ color: C.bronze }}>
            Our Philosophy
          </p>
          <h2 className={`${playfair.className} text-[clamp(2.2rem,5vw,3.8rem)] font-bold leading-[1.08]`} style={{ color: C.ivory }}>
            We build on{" "}
            <span className="italic font-normal" style={{ color: C.champagne }}>
              principles
            </span>
            , not trends.
          </h2>
          <div className="mx-auto mt-6 w-24 h-px" style={{ background: C.bronze }} />
        </motion.div>

        {philosophies.map((item, i) => (
          <PhilosophyScene key={item.title} item={item} index={i} C={C} />
        ))}
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════
   SECTION 4 – Dream Wall (with background particles)
   ═══════════════════════════════════════════════ */
const quotes = [
  { text: "Luxury begins where excess ends." },
  { text: "Elegance is restraint." },
  { text: "Meaning over noise." },
  { text: "What endures is what matters." },
  { text: "Detail is not detail. It is design." },
];

function DreamWall({ C }: { C: (typeof THEME)["dark"] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % quotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <Section className="py-14 md:py-20 lg:py-24 relative" style={{ background: C.bgAlt }}>
      {/* Soft background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 40% at 50% 50%, rgba(214, 207, 199, 0.03), transparent 60%),
            radial-gradient(ellipse 50% 30% at 50% 30%, rgba(139, 115, 85, 0.02), transparent 50%)
          `,
        }}
      />

      {/* Soft moving particles background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[1.5px] h-[1.5px] rounded-full"
            style={{
              background: C.champagne,
              top: `${10 + Math.random() * 80}%`,
              left: `${5 + Math.random() * 90}%`,
              opacity: 0.03 + Math.random() * 0.05,
            }}
            animate={{
              y: [0, -30 - Math.random() * 50, 0],
              x: [0, 15 - Math.random() * 30, 0],
              opacity: [0.02 + Math.random() * 0.04, 0.06 + Math.random() * 0.06, 0.02 + Math.random() * 0.04],
            }}
            transition={{
              duration: 14 + Math.random() * 16,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 8,
            }}
          />
        ))}
      </div>

      <div ref={ref} className="relative z-10 max-w-[1200px] mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className={`${inter.className} text-xs tracking-[0.25em] uppercase mb-16`}
          style={{ color: C.bronze }}
        >
          Words to Live By
        </motion.p>

        <div className="relative h-[200px] md:h-[240px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={activeIndex}
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -40, scale: 0.97 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className={`${playfair.className} absolute text-[clamp(1.8rem,5vw,3.5rem)] font-light italic leading-[1.3] max-w-4xl mx-auto px-4`}
              style={{ color: C.ivory }}
            >
              &ldquo;{quotes[activeIndex].text}&rdquo;
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Dot indicators */}
        <div className="mt-10 flex items-center justify-center gap-3">
          {quotes.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className="transition-all duration-500 rounded-full"
              style={{
                width: i === activeIndex ? 24 : 6,
                height: 6,
                background: i === activeIndex ? C.champagne : "rgba(214, 207, 199, 0.2)",
              }}
              aria-label={`Quote ${i + 1}`}
            />
          ))}
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-14 w-32 h-px"
          style={{ background: C.bronze }}
        />
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════
   SECTION 5 – Our Values (Floating Islands)
   ═══════════════════════════════════════════════ */
const values = [
  {
    title: "Integrity",
    description: "We honor our word. Every promise made is a promise kept to ourselves, our craft, and those who trust us.",
  },
  {
    title: "Excellence",
    description: "Good is never enough. We pursue the exceptional in every detail, knowing that greatness lives in the margins.",
  },
  {
    title: "Innovation",
    description: "Tradition informs us, but the future inspires us. We honor heritage while daring to reimagine what luxury can be.",
  },
  {
    title: "Legacy",
    description: "We build for tomorrow. Every creation is designed to outlive us becoming part of a story that extends beyond our time.",
  },
  {
    title: "Timelessness",
    description: "We reject the ephemeral. Our work is crafted to transcend seasons, trends, and generations forever relevant.",
  },
];

function ValueIsland({
  value,
  index,
  C,
}: {
  value: (typeof values)[0];
  index: number;
  C: (typeof THEME)["dark"];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative p-8 md:p-10 rounded-[2px] cursor-default"
      style={{
        background: `linear-gradient(160deg, rgba(214,207,199,0.04), transparent 60%)`,
        border: "1px solid rgba(214, 207, 199, 0.06)",
      }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, rgba(214, 207, 199, 0.08), transparent 70%)`,
        }}
      />

      {/* Number */}
      <div className="relative z-10 mb-6">
        <span className={`${cormorant.className} italic text-4xl font-light`} style={{ color: C.bronze }}>
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <h3 className={`${playfair.className} relative z-10 text-2xl md:text-3xl font-bold mb-4`} style={{ color: C.ivory }}>
        {value.title}
      </h3>

      <p className={`${inter.className} relative z-10 text-sm md:text-base leading-[1.8]`} style={{ color: C.muted }}>
        {value.description}
      </p>

      {/* Decorative corner */}
      <div
        className="absolute top-0 right-0 w-12 h-12 opacity-[0.04] pointer-events-none"
        style={{ borderRight: "1px solid " + C.champagne, borderTop: "1px solid " + C.champagne }}
      />
    </motion.div>
  );
}

function ValuesSection({ C }: { C: (typeof THEME)["dark"] }) {
  return (
    <Section className="py-12 md:py-16 lg:py-20">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(27, 22, 16, 0.3), transparent)" }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-16 md:mb-20"
        >
          <p className={`${inter.className} text-xs tracking-[0.25em] uppercase mb-4`} style={{ color: C.bronze }}>
            Our Foundation
          </p>
          <h2 className={`${playfair.className} text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.1]`} style={{ color: C.ivory }}>
            What we stand for
          </h2>
        </motion.div>

        {/* 5 items in a 3-col grid — center the last row by using flex */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          {values.map((v, i) => (
            <div key={v.title} className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] max-w-[420px]">
              <ValueIsland value={v} index={i} C={C} />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════
   SECTION 6 – Vision of Tomorrow
   ═══════════════════════════════════════════════ */
function VisionOfTomorrow({ C }: { C: (typeof THEME)["dark"] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Section className="py-14 md:py-18 lg:py-22 relative" style={{ background: C.bgAlt }}>
      {/* Animated light rays */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-full"
          style={{
            background: `linear-gradient(to bottom, transparent, rgba(214, 207, 199, 0.04), transparent)`,
            transformOrigin: "top center",
          }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 2.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-0 left-[30%] w-[1px] h-full"
          style={{ background: `linear-gradient(to bottom, transparent, rgba(139, 115, 85, 0.03), transparent)` }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 2.5, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-0 right-[30%] w-[1px] h-full"
          style={{ background: `linear-gradient(to bottom, transparent, rgba(214, 207, 199, 0.03), transparent)` }}
        />
        {/* Slow horizontal sweep */}
        <motion.div
          animate={{ x: ["-100%", "200%"], opacity: [0, 0.04, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[45%] left-0 w-[60%] h-px"
          style={{ background: `linear-gradient(to right, transparent, ${C.champagne}, transparent)`, filter: "blur(3px)" }}
        />
      </div>

      {/* Large ambient glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, rgba(214, 207, 199, 0.04), transparent 60%)",
          filter: "blur(100px)",
        }}
      />

      <div ref={ref} className="relative z-10 max-w-[1200px] mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className={`${inter.className} text-xs tracking-[0.25em] uppercase mb-6`}
          style={{ color: C.bronze }}
        >
          Looking Ahead
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className={`${playfair.className} text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.05]`}
          style={{ color: C.ivory }}
        >
          The Future{" "}
          <span className="italic font-normal" style={{ color: C.champagne }}>
            We Imagine
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={`${inter.className} mt-8 text-base md:text-lg max-w-2xl mx-auto leading-[1.9]`}
          style={{ color: C.muted }}
        >
          A world where craftsmanship meets consciousness. Where luxury is
          measured not by price, but by meaning. We are building a future that
          honors the past while embracing the possibilities of tomorrow.
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.5, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-12 w-20 h-px"
          style={{ background: C.bronze }}
        />

        <div className="mt-16 flex items-center justify-center gap-10">
          {["Heritage", "Craft", "Future"].map((label, i) => (
            <motion.span
              key={label}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.9 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className={`${cormorant.className} italic text-sm tracking-[0.15em]`}
              style={{ color: C.muted }}
            >
              {label}
            </motion.span>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════
   SECTION 7 – The Visionary
   ═══════════════════════════════════════════════ */
function TheVisionary({ C }: { C: (typeof THEME)["dark"] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Section className="py-12 md:py-16 lg:py-20 relative">
      {/* Decorative ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(27, 22, 16, 0.25), transparent)",
        }}
      />

      <div ref={ref} className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — Artistic portrait / visual area */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <ArtImage
              gradient={`
                linear-gradient(135deg, ${C.warm} 0%, ${C.bgAlt} 40%, ${C.bg} 100%),
                radial-gradient(ellipse at 50% 30%, rgba(214, 207, 199, 0.08), transparent 50%),
                radial-gradient(ellipse at 50% 70%, rgba(139, 115, 85, 0.06), transparent 45%)
              `}
              label="The Visionary"
              index={0}
            />
          </motion.div>

          {/* Right — Founder narrative */}
          <div className="space-y-8">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className={`${inter.className} text-xs tracking-[0.25em] uppercase`}
              style={{ color: C.bronze }}
            >
              The Visionary Behind THE KYNXZ BRAND
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className={`${playfair.className} text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.1]`}
              style={{ color: C.ivory }}
            >
              Founded by{" "}
              <span className="italic font-normal" style={{ color: C.champagne }}>
                Mr. Amaan
              </span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-6"
            >
              <p className={`${inter.className} text-base md:text-lg leading-[1.9]`} style={{ color: C.muted }}>
                Founded by Mr. Amaan, THE KYNXZ BRAND was born from a vision to
                create more than a marketplace.
              </p>
              <p className={`${inter.className} text-base md:text-lg leading-[1.9]`} style={{ color: C.muted }}>
                It is a pursuit of timeless elegance, meaningful experiences,
                and uncompromising standards.
              </p>
              <p className={`${inter.className} text-base md:text-lg leading-[1.9]`} style={{ color: C.muted }}>
                Driven by passion, innovation, and a commitment to excellence,
                Mr. Amaan believes that true luxury is not defined by excess,
                but by purpose, authenticity, and lasting value.
              </p>
              <p className={`${inter.className} text-base md:text-lg leading-[1.9]`} style={{ color: C.muted }}>
                Every decision, every collection, and every experience is guided
                by a singular philosophy:
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="pt-2"
            >
              <div className="flex items-start gap-4">
                <span
                  className="block w-12 h-px mt-3 shrink-0"
                  style={{ background: C.bronze }}
                />
                <p
                  className={`${cormorant.className} italic text-xl md:text-2xl leading-[1.4]`}
                  style={{ color: C.champagne }}
                >
                  To inspire refined living and build a legacy that transcends
                  generations.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Decorative floating line */}
      <motion.div
        className="absolute right-[5%] top-[25%] w-px h-[40%] opacity-[0.04]"
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
   SECTION 8 – Final Emotional CTA
   ═══════════════════════════════════════════════ */
function FinalCTA({ C }: { C: (typeof THEME)["dark"] }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgScale = useTransform(scrollYProgress, [0, 1], [0.95, 1.05]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0.6]);

  return (
    <Section ref={ref} className="min-h-[90dvh] flex items-center justify-center relative overflow-hidden" style={{ background: C.bgAlt }}>
      {/* Animated background */}
      <motion.div style={{ scale: bgScale, opacity: bgOpacity }} className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 60% 50% at 50% 45%, rgba(214, 207, 199, 0.04), transparent 55%),
              radial-gradient(ellipse 40% 30% at 50% 20%, rgba(139, 115, 85, 0.03), transparent 50%),
              radial-gradient(ellipse 40% 30% at 50% 80%, rgba(139, 115, 85, 0.02), transparent 50%)
            `,
          }}
        />
        <motion.div
          className="absolute inset-0"
          animate={{ opacity: [0.03, 0.06, 0.03] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{ background: "radial-gradient(ellipse 50% 20% at 50% 30%, rgba(214, 207, 199, 0.04), transparent)" }}
        />
      </motion.div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className={`${inter.className} text-xs tracking-[0.25em] uppercase mb-8`}
          style={{ color: C.bronze }}
        >
          The Invitation
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className={`${playfair.className} text-[clamp(2.8rem,9vw,6rem)] font-bold leading-[1.05] tracking-[-0.02em]`}
          style={{ color: C.ivory }}
        >
          Join
          <br />
          <span className="italic font-normal" style={{ color: C.champagne }}>
            The Journey
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={`${inter.className} mt-8 text-base md:text-lg max-w-xl mx-auto leading-relaxed`}
          style={{ color: C.muted }}
        >
          Become part of a legacy built on purpose, crafted with care, and destined to endure.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12"
        >
          <a
            href="/contact"
            className="group inline-flex items-center gap-3 px-10 py-4 rounded-full border transition-all duration-500 hover:-translate-y-1"
            style={{
              borderColor: C.champagne,
              color: C.ivory,
              background: "rgba(214, 207, 199, 0.04)",
            }}
          >
            <span className={`${inter.className} text-sm tracking-[0.15em] uppercase`}>
              Begin Your Story
            </span>
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-lg"
              style={{ color: C.champagne }}
            >
              &rarr;
            </motion.span>
          </a>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-16 w-24 h-px"
          style={{ background: C.bronze }}
        />
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: `linear-gradient(to bottom, transparent, ${C.bg})` }}
      />
    </Section>
  );
}

/* ═══════════════════════════════════════════════
   PAGE COMPOSITION
   ═══════════════════════════════════════════════ */
export default function AboutPage() {
  const C = useThemeColors();

  // Set page title
  useEffect(() => {
    document.title = "About | THE KYNXZ BRAND";
  }, []);

  return (
    <>
      <Header />

      <main
        role="main"
        aria-label="About page"
        className={`${inter.variable} ${playfair.variable} ${cormorant.variable}`}
        style={{
          fontFamily: "var(--font-inter), Arial, sans-serif",
          background: C.bg,
          overflow: "hidden",
        }}
      >
        {/* Section 1 – Cinematic Hero */}
        <CinematicHero C={C} />

        {/* Section 2 – The Story */}
        <TheStory C={C} />

        {/* Section 3 – Philosophy Gallery */}
        <PhilosophyGallery C={C} />

        {/* Section 4 – Dream Wall */}
        <DreamWall C={C} />

        {/* Section 5 – Our Values */}
        <ValuesSection C={C} />

        {/* Section 6 – Vision of Tomorrow */}
        <VisionOfTomorrow C={C} />

        {/* Section 7 – The Visionary */}
        <TheVisionary C={C} />

        {/* Section 8 – Final Emotional CTA */}
        <FinalCTA C={C} />
      </main>

      <FooterSection />
    </>
  );
}
