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
    const current =
      (root.getAttribute("data-theme") as "dark" | "light") || "dark";
    setTheme(current);

    const mo = new MutationObserver(() => {
      const t =
        (root.getAttribute("data-theme") as "dark" | "light") || "dark";
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

const heroLines = [
  ["We", "Are", "Building"],
  ["More", "Than"],
  ["A", "Brand."],
];

/* ═══════════════════════════════════════════════
   SECTION 1 – Cinematic Hero
   ═══════════════════════════════════════════════ */
function MissionHero({ C }: { C: (typeof THEME)["dark"] }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section className="min-h-[100dvh] flex items-center justify-center relative overflow-hidden">
      {/* Animated floating abstract shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Large central luminous orb */}
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
        {/* Warm bronze drift orb */}
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
        {/* Soft ivory drift orb */}
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
        {Array.from({ length: 25 }).map((_, i) => (
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
              y: [0, -50 - Math.random() * 70, 0],
              x: [0, 25 - Math.random() * 50, 0],
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
          Our Mission
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
          custom={6}
          className={`${inter.className} mt-10 text-base md:text-lg max-w-2xl mx-auto leading-relaxed tracking-[0.05em]`}
          style={{ color: C.muted }}
        >
          We are crafting a future where purpose, beauty and trust coexist.
        </motion.p>

        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          custom={8}
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
            Purpose Driven
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
   Artistic Image Block (reusable)
   ═══════════════════════════════════════════════ */
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
      transition={{
        duration: 1.4,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
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
   Reusable section wrapper
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
   SECTION 2 – Our Mission
   ═══════════════════════════════════════════════ */
function OurMission({ C }: { C: (typeof THEME)["dark"] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Section className="py-12 md:py-16 lg:py-20">
      <div ref={ref} className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — Artistic visual */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <ArtImage
              gradient={`
                linear-gradient(135deg, ${C.warm} 0%, ${C.bgAlt} 40%, ${C.bg} 100%),
                radial-gradient(ellipse at 40% 30%, rgba(214, 207, 199, 0.08), transparent 50%),
                radial-gradient(ellipse at 60% 70%, rgba(139, 115, 85, 0.06), transparent 45%)
              `}
              label="Our Purpose"
              index={0}
            />
          </motion.div>

          {/* Right — Mission statement */}
          <div className="space-y-8">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className={`${inter.className} text-xs tracking-[0.25em] uppercase`}
              style={{ color: C.bronze }}
            >
              Our Mission
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className={`${playfair.className} text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.1]`}
              style={{ color: C.ivory }}
            >
              Why{" "}
              <span className="italic font-normal" style={{ color: C.champagne }}>
                THE KYNXZ BRAND
              </span>{" "}
              exists.
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-6"
            >
              <p
                className={`${inter.className} text-base md:text-lg leading-[1.9]`}
                style={{ color: C.muted }}
              >
                We exist to restore what has been lost in modern luxury — soul.
                In a world saturated with the transient, the mass-produced, and
                the forgettable, we stand as a testament to the enduring power of
                intention.
              </p>
              <p
                className={`${inter.className} text-base md:text-lg leading-[1.9]`}
                style={{ color: C.muted }}
              >
                Our mission is to create more than products. We craft experiences
                that elevate the human spirit. Every piece, every detail, every
                decision is guided by a singular belief: that beauty and purpose
                are not opposing forces, but the very foundation of a life well
                lived.
              </p>
              <p
                className={`${inter.className} text-base md:text-lg leading-[1.9]`}
                style={{ color: C.muted }}
              >
                We are building a legacy rooted in trust, refined by
                craftsmanship, and inspired by the timeless pursuit of meaning.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="pt-4"
            >
              <div className="flex items-center gap-4">
                <span
                  className="block w-12 h-px"
                  style={{ background: C.bronze }}
                />
                <span
                  className={`${cormorant.className} italic text-lg`}
                  style={{ color: C.champagne }}
                >
                  Purpose over profit
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Decorative floating line */}
      <motion.div
        className="absolute left-[5%] top-[30%] w-px h-[35%] opacity-[0.04]"
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
   SECTION 3 – Core Values
   ═══════════════════════════════════════════════ */
const coreValues = [
  {
    title: "Integrity",
    description:
      "We honor our word as our most sacred asset. Every promise made is a promise kept — to ourselves, our craft, and those who place their trust in us.",
    gradient: `
      linear-gradient(160deg, #0A0A0A 0%, #111111 35%, #1B1610 100%),
      radial-gradient(ellipse at 40% 30%, rgba(214, 207, 199, 0.06), transparent 50%),
      radial-gradient(ellipse at 60% 70%, rgba(139, 115, 85, 0.04), transparent 45%)
    `,
    number: "01",
  },
  {
    title: "Craftsmanship",
    description:
      "Every curve, every seam, every finish is deliberate. Our artisans pour their mastery into each piece, knowing that true luxury reveals itself in the details most will never see.",
    gradient: `
      linear-gradient(200deg, #111111 0%, #0A0A0A 40%, #1B1610 100%),
      radial-gradient(ellipse at 60% 25%, rgba(214, 207, 199, 0.05), transparent 50%),
      radial-gradient(ellipse at 30% 75%, rgba(139, 115, 85, 0.05), transparent 45%)
    `,
    number: "02",
  },
  {
    title: "Innovation",
    description:
      "Tradition informs us, but the future inspires us. We honor heritage while daring to reimagine what luxury can be — blending timeless techniques with forward-thinking design.",
    gradient: `
      linear-gradient(180deg, #1B1610 0%, #111111 30%, #0A0A0A 100%),
      radial-gradient(ellipse at 50% 40%, rgba(214, 207, 199, 0.07), transparent 50%),
      radial-gradient(ellipse at 50% 60%, rgba(139, 115, 85, 0.03), transparent 45%)
    `,
    number: "03",
  },
  {
    title: "Timelessness",
    description:
      "We reject the ephemeral. Our work is crafted to transcend seasons, trends, and generations. We design for permanence — objects that age gracefully and grow more beautiful with time.",
    gradient: `
      linear-gradient(160deg, #111111 0%, #0A0A0A 40%, #1B1610 100%),
      radial-gradient(ellipse at 30% 35%, rgba(214, 207, 199, 0.06), transparent 50%),
      radial-gradient(ellipse at 70% 65%, rgba(139, 115, 85, 0.04), transparent 45%)
    `,
    number: "04",
  },
  {
    title: "Human Connection",
    description:
      "At our core, we believe luxury is a relationship — between creator and craft, between brand and community, between the object and the soul it touches.",
    gradient: `
      linear-gradient(220deg, #0A0A0A 0%, #1B1610 40%, #111111 100%),
      radial-gradient(ellipse at 50% 25%, rgba(214, 207, 199, 0.05), transparent 50%),
      radial-gradient(ellipse at 50% 75%, rgba(139, 115, 85, 0.04), transparent 45%)
    `,
    number: "05",
  },
];

function ValueCard({
  value,
  index,
  C,
}: {
  value: (typeof coreValues)[0];
  index: number;
  C: (typeof THEME)["dark"];
}) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative p-8 md:p-10 rounded-[2px] cursor-default overflow-hidden"
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

      {/* Artistic gradient artwork — subtle background visual */}
      <div
        className="absolute -bottom-20 -right-20 w-48 h-48 rounded-full opacity-0 group-hover:opacity-30 transition-all duration-1000 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, rgba(214, 207, 199, 0.06), transparent 65%)`,
          filter: "blur(40px)",
          transform: "scale(0.8)",
        }}
      />

      {/* Number */}
      <div className="relative z-10 mb-6">
        <span
          className={`${cormorant.className} italic text-4xl font-light`}
          style={{ color: C.bronze }}
        >
          {value.number}
        </span>
      </div>

      {/* Decorative miniature art element */}
      <div className="relative z-10 mb-6 w-12 h-12">
        <div
          className="absolute inset-0 rounded-full opacity-30"
          style={{
            background: `radial-gradient(circle at 40% 35%, ${C.champagne}, transparent 70%)`,
          }}
        />
        <div
          className="absolute inset-2 rounded-full border"
          style={{ borderColor: `${C.bronze}40` }}
        />
        <div
          className="absolute inset-[30%] rounded-full"
          style={{ background: C.bronze, opacity: 0.3 }}
        />
      </div>

      <h3
        className={`${playfair.className} relative z-10 text-2xl md:text-3xl font-bold mb-4`}
        style={{ color: C.ivory }}
      >
        {value.title}
      </h3>

      <p
        className={`${inter.className} relative z-10 text-sm md:text-base leading-[1.8]`}
        style={{ color: C.muted }}
      >
        {value.description}
      </p>

      {/* Accent line on hover */}
      <div
        className="relative z-10 mt-6 h-px w-8 transition-all duration-500 group-hover:w-16"
        style={{ background: `linear-gradient(to right, ${C.bronze}, transparent)` }}
      />
    </motion.div>
  );
}

function CoreValuesSection({ C }: { C: (typeof THEME)["dark"] }) {
  return (
    <Section className="py-12 md:py-16 lg:py-20 relative">
      {/* Ambient glow behind section */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(27, 22, 16, 0.3), transparent)",
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-16 md:mb-20"
        >
          <p
            className={`${inter.className} text-xs tracking-[0.25em] uppercase mb-4`}
            style={{ color: C.bronze }}
          >
            Core Values
          </p>
          <h2
            className={`${playfair.className} text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.1]`}
            style={{ color: C.ivory }}
          >
            The principles that{" "}
            <span className="italic font-normal" style={{ color: C.champagne }}>
              guide us
            </span>
          </h2>
          <div
            className="mx-auto mt-6 w-24 h-px"
            style={{ background: C.bronze, opacity: 0.5 }}
          />
        </motion.div>

        {/* 5 value cards in a responsive grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {coreValues.map((v, i) => (
            <div
              key={v.title}
              className={
                i === coreValues.length - 1
                  ? "lg:col-start-2 lg:col-span-1"
                  : ""
              }
            >
              <ValueCard value={v} index={i} C={C} />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════
   SECTION 4 – Vision Timeline
   ═══════════════════════════════════════════════ */
const timelineEvents = [
  {
    year: "2025",
    title: "Foundation",
    description:
      "Establish THE KYNXZ BRAND and build the foundation for a timeless global vision.",
    gradient: `
      linear-gradient(160deg, #0A0A0A 0%, #111111 40%, #1B1610 100%),
      radial-gradient(ellipse at 40% 30%, rgba(214, 207, 199, 0.06), transparent 50%)
    `,
  },
  {
    year: "2026",
    title: "Global Launch",
    description:
      "Launch curated collections and expand across global marketplaces.",
    gradient: `
      linear-gradient(180deg, #111111 0%, #0A0A0A 40%, #1B1610 100%),
      radial-gradient(ellipse at 50% 40%, rgba(214, 207, 199, 0.05), transparent 50%)
    `,
  },
  {
    year: "2027",
    title: "Expansion & Innovation",
    description:
      "Introduce exclusive collections and expand into multiple lifestyle categories.",
    gradient: `
      linear-gradient(200deg, #1B1610 0%, #0A0A0A 35%, #111111 100%),
      radial-gradient(ellipse at 50% 30%, rgba(214, 207, 199, 0.07), transparent 50%)
    `,
  },
  {
    year: "2028",
    title: "Brand Legacy",
    description:
      "Establish THE KYNXZ BRAND as an internationally recognized lifestyle brand.",
    gradient: `
      linear-gradient(220deg, #1B1610 0%, #0A0A0A 30%, #111111 100%),
      radial-gradient(ellipse at 50% 40%, rgba(214, 207, 199, 0.06), transparent 50%)
    `,
  },
];

function TimelineEvent({
  event,
  index,
  C,
}: {
  event: (typeof timelineEvents)[0];
  index: number;
  C: (typeof THEME)["dark"];
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  const isLeft = index % 2 === 0;

  return (
    <div ref={ref} className="relative pb-16 md:pb-24 last:pb-0">
      {/* Timeline connector line (vertical) */}
      <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2">
        <motion.div
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : {}}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-full origin-top"
          style={{ background: `linear-gradient(to bottom, ${C.bronze}, ${C.champagne}40, transparent)` }}
        />
      </div>

      {/* Mobile timeline line */}
      <div className="md:hidden absolute left-[18px] top-0 bottom-0 w-px">
        <motion.div
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : {}}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-full origin-top"
          style={{ background: `linear-gradient(to bottom, ${C.bronze}, ${C.champagne}40, transparent)` }}
        />
      </div>

      <div className={`flex flex-col md:flex-row items-start gap-8 md:gap-12 ${isLeft ? "" : "md:flex-row-reverse"}`}>
        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 w-full md:w-[calc(50%-40px)] pl-14 md:pl-0"
        >
          <div
            className="group p-6 md:p-8 rounded-[2px] transition-all duration-500 hover:-translate-y-1"
            style={{
              background: `linear-gradient(160deg, rgba(214,207,199,0.03), transparent 60%)`,
              border: "1px solid rgba(214, 207, 199, 0.06)",
            }}
          >
            {/* Year */}
            <span
              className={`${cormorant.className} italic text-4xl md:text-5xl font-light block mb-4`}
              style={{ color: C.bronze }}
            >
              {event.year}
            </span>

            <h3
              className={`${playfair.className} text-2xl md:text-3xl font-bold mb-4`}
              style={{ color: C.ivory }}
            >
              {event.title}
            </h3>

            <p
              className={`${inter.className} text-sm md:text-base leading-[1.8]`}
              style={{ color: C.muted }}
            >
              {event.description}
            </p>

            {/* Hover accent */}
            <div
              className="mt-5 h-px w-8 transition-all duration-500 group-hover:w-16"
              style={{ background: C.bronze }}
            />
          </div>
        </motion.div>

        {/* Spacer for the other side on desktop */}
        <div className="hidden md:block w-[calc(50%-40px)]" />

        {/* Timeline dot */}
        <div className="hidden md:block absolute left-1/2 top-0 -translate-x-1/2 z-20">
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="w-5 h-5 rounded-full border-2 flex items-center justify-center"
            style={{
              borderColor: C.bronze,
              background: C.bg,
            }}
          >
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: C.bronze }}
            />
          </motion.div>
        </div>

        {/* Mobile dot */}
        <div className="md:hidden absolute left-[10px] top-1 z-20">
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="w-4 h-4 rounded-full border-2 flex items-center justify-center"
            style={{
              borderColor: C.bronze,
              background: C.bg,
            }}
          >
            <div
              className="w-[6px] h-[6px] rounded-full"
              style={{ background: C.bronze }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function VisionTimeline({ C }: { C: (typeof THEME)["dark"] }) {
  return (
    <Section className="py-14 md:py-18 lg:py-22 relative" style={{ background: C.bgAlt }}>
      {/* Animated background rays */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-full"
          style={{
            background: `linear-gradient(to bottom, transparent, rgba(214, 207, 199, 0.04), transparent)`,
            transformOrigin: "top center",
          }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-0 left-[25%] w-[1px] h-full"
          style={{
            background: `linear-gradient(to bottom, transparent, rgba(139, 115, 85, 0.03), transparent)`,
          }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2.5, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-0 right-[25%] w-[1px] h-full"
          style={{
            background: `linear-gradient(to bottom, transparent, rgba(214, 207, 199, 0.03), transparent)`,
          }}
        />
        {/* Slow horizontal sweep */}
        <motion.div
          animate={{ x: ["-100%", "200%"], opacity: [0, 0.04, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[45%] left-0 w-[60%] h-px"
          style={{
            background: `linear-gradient(to right, transparent, ${C.champagne}, transparent)`,
            filter: "blur(3px)",
          }}
        />
      </div>

      {/* Large ambient glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(214, 207, 199, 0.04), transparent 60%)",
          filter: "blur(100px)",
        }}
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-16 md:mb-20"
        >
          <p
            className={`${inter.className} text-xs tracking-[0.25em] uppercase mb-4`}
            style={{ color: C.bronze }}
          >
            Vision Timeline
          </p>
          <h2
            className={`${playfair.className} text-[clamp(2.2rem,5vw,3.8rem)] font-bold leading-[1.08]`}
            style={{ color: C.ivory }}
          >
            Our{" "}
            <span className="italic font-normal" style={{ color: C.champagne }}>
              Brand Timeline
            </span>
          </h2>
          <div
            className="mx-auto mt-6 w-24 h-px"
            style={{ background: C.bronze, opacity: 0.5 }}
          />
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {timelineEvents.map((event, i) => (
            <TimelineEvent key={event.year} event={event} index={i} C={C} />
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════
   SECTION 5 – Inspirational Quote
   ═══════════════════════════════════════════════ */
function QuoteSection({ C }: { C: (typeof THEME)["dark"] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <Section className="py-16 md:py-20 lg:py-24 relative min-h-[70dvh] flex items-center justify-center">
      {/* Background ambient glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 50% 40% at 50% 45%, rgba(214, 207, 199, 0.03), transparent 55%),
            radial-gradient(ellipse 40% 30% at 50% 20%, rgba(139, 115, 85, 0.025), transparent 50%),
            radial-gradient(ellipse 40% 30% at 50% 80%, rgba(139, 115, 85, 0.02), transparent 50%)
          `,
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[2px] h-[2px] rounded-full"
            style={{
              background: C.champagne,
              top: `${10 + Math.random() * 80}%`,
              left: `${5 + Math.random() * 90}%`,
              opacity: 0.02 + Math.random() * 0.04,
            }}
            animate={{
              y: [0, -30 - Math.random() * 50, 0],
              opacity: [
                0.02 + Math.random() * 0.03,
                0.05 + Math.random() * 0.05,
                0.02 + Math.random() * 0.03,
              ],
            }}
            transition={{
              duration: 16 + Math.random() * 18,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 10,
            }}
          />
        ))}
      </div>

      <div ref={ref} className="relative z-10 max-w-[1200px] mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10"
        >
          <span
            className={`${playfair.className} text-7xl md:text-9xl leading-none`}
            style={{ color: C.bronze, opacity: 0.2 }}
          >
            &ldquo;
          </span>
        </motion.div>

        <motion.blockquote
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <p
            className={`${playfair.className} text-[clamp(1.8rem,5vw,4rem)] font-light italic leading-[1.3] max-w-5xl mx-auto`}
            style={{ color: C.ivory }}
          >
            We do not seek trends. We seek meaning that endures.
          </p>
        </motion.blockquote>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10"
        >
          <span
            className={`${playfair.className} text-7xl md:text-9xl leading-none`}
            style={{ color: C.bronze, opacity: 0.2 }}
          >
            &rdquo;
          </span>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.5, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-14 w-24 h-px"
          style={{ background: C.bronze }}
        />
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════
   SECTION 6 – Our Shared Journey (Cinematic Closing)
   ═══════════════════════════════════════════════ */
function SharedJourneySection({ C }: { C: (typeof THEME)["dark"] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgScale = useTransform(scrollYProgress, [0, 1], [0.92, 1.08]);

  return (
    <Section
      ref={sectionRef}
      className="relative min-h-[140dvh] flex items-center py-24 md:py-28 lg:py-32 overflow-hidden"
      style={{ background: C.bgAlt }}
    >
      {/* ─── Large-scale ambient glow canvas ─── */}
      <motion.div
        style={{ scale: bgScale }}
        className="absolute inset-0 pointer-events-none"
      >
        {/* Deep warm base */}
        <div className="absolute inset-0" style={{
          background: `
            radial-gradient(ellipse 70% 55% at 50% 40%, rgba(214, 207, 199, 0.04), transparent 58%),
            radial-gradient(ellipse 50% 35% at 50% 15%, rgba(139, 115, 85, 0.03), transparent 50%),
            radial-gradient(ellipse 50% 35% at 50% 85%, rgba(139, 115, 85, 0.025), transparent 50%)
          `,
        }} />

        {/* Central luminous core */}
        <motion.div
          animate={{ opacity: [0.025, 0.055, 0.025], scale: [1, 1.04, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/3 w-[900px] h-[600px] rounded-full"
          style={{
            background: `radial-gradient(ellipse at center, ${C.champagne}, transparent 65%)`,
            filter: "blur(120px)",
          }}
        />
      </motion.div>

      {/* ─── Floating atmospheric orbs ─── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ y: [0, -30, 0], x: [0, 15, 0], scale: [1, 1.06, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[8%] right-[6%] w-[450px] h-[450px] rounded-full"
          style={{
            background: `radial-gradient(circle at center, ${C.champagne}, transparent 60%)`,
            filter: "blur(100px)",
            opacity: 0.04,
          }}
        />
        <motion.div
          animate={{ y: [0, 25, 0], x: [0, -20, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut", delay: 5 }}
          className="absolute bottom-[12%] left-[4%] w-[380px] h-[380px] rounded-full"
          style={{
            background: `radial-gradient(circle at center, ${C.bronze}, transparent 60%)`,
            filter: "blur(80px)",
            opacity: 0.03,
          }}
        />
        <motion.div
          animate={{ y: [0, -18, 0], x: [0, 10, 0], scale: [1, 1.03, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-[55%] left-[20%] w-[300px] h-[300px] rounded-full"
          style={{
            background: `radial-gradient(circle at center, ${C.ivory}, transparent 60%)`,
            filter: "blur(70px)",
            opacity: 0.02,
          }}
        />

        {/* Abstract rotating geometry */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          className="absolute top-[15%] left-[10%] w-[220px] h-[220px] opacity-[0.012]"
          style={{
            border: `1px solid ${C.champagne}25`,
            borderRadius: "42% 58% 38% 62% / 52% 40% 60% 48%",
          }}
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear", delay: 2 }}
          className="absolute bottom-[18%] right-[12%] w-[180px] h-[180px] opacity-[0.01]"
          style={{
            border: `1px solid ${C.bronze}20`,
            borderRadius: "58% 42% 62% 38% / 48% 58% 42% 52%",
          }}
        />

        {/* ─── Floating particle dots ─── */}
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-[2px] h-[2px] rounded-full"
            style={{
              background: C.champagne,
              top: `${5 + Math.random() * 90}%`,
              left: `${3 + Math.random() * 94}%`,
              opacity: 0.015 + Math.random() * 0.045,
            }}
            animate={{
              y: [0, -(30 + Math.random() * 60), 0],
              x: [0, (Math.random() * 30 - 15), 0],
              opacity: [
                0.015 + Math.random() * 0.025,
                0.04 + Math.random() * 0.06,
                0.015 + Math.random() * 0.025,
              ],
            }}
            transition={{
              duration: 18 + Math.random() * 22,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 14,
            }}
          />
        ))}
      </div>

      {/* ─── Content ─── */}
      <div className="relative z-10 w-full max-w-[1100px] mx-auto px-6">
        <div className="flex flex-col items-center text-center">
          {/* ── Eyebrow ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6"
          >
            <span
              className={`${inter.className} text-[10px] md:text-xs tracking-[0.3em] uppercase`}
              style={{ color: C.bronze }}
            >
              A Vision Beyond Business
            </span>
          </motion.div>

          {/* ── Opening decorative line ── */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="w-16 h-px mb-10"
            style={{ background: C.bronze, opacity: 0.5 }}
          />

          {/* ── Main Title ── */}
          <motion.h2
            initial={{ opacity: 0, y: 50, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className={`${playfair.className} text-[clamp(2.8rem,9vw,6.5rem)] font-bold leading-[1.05] tracking-[-0.02em]`}
            style={{ color: C.ivory }}
          >
            Our Shared
            <br />
            <span className="italic font-normal" style={{ color: C.champagne }}>
              Journey
            </span>
          </motion.h2>

          {/* ── Subtitle divider ── */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 w-20 h-px mb-12"
            style={{ background: C.champagne, opacity: 0.3 }}
          />

          {/* ── Main Message Body ── */}
          <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
            {[
              "THE KYNXZ BRAND was never created to simply sell products.",
              "It was created to build a meaningful global family united by trust, elegance, and shared values.",
              "Every individual who chooses THE KYNXZ BRAND becomes more than a customer — they become a valued part of our journey, our story, and our growing family.",
              "Together, we are not merely purchasing products.",
              "We are shaping experiences, inspiring refined living, and building a legacy that will endure for generations.",
              "Because true luxury is not defined by possessions.",
              "It is defined by the people with whom we share the journey.",
            ].map((paragraph, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 1.1,
                  delay: 0.6 + i * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`${cormorant.className} text-[clamp(1.1rem,2.2vw,1.6rem)] leading-[1.75] tracking-[0.03em]`}
                style={{ color: C.muted }}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          {/* ── Elegant Divider ── */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative mt-16 mb-16 w-full max-w-[400px] h-px"
          >
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to right, transparent, ${C.champagne}, transparent)`,
                opacity: 0.25,
              }}
            />
            <div
              className="absolute left-1/2 -translate-x-1/2 -top-[3px] w-[6px] h-[6px] rounded-full"
              style={{ background: C.bronze, opacity: 0.4 }}
            />
          </motion.div>

          {/* ── Founder Vision ── */}
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <p
                className={`${inter.className} text-[10px] md:text-xs tracking-[0.25em] uppercase mb-8`}
                style={{ color: C.bronze }}
              >
                Founder Vision
              </p>
            </motion.div>

            {[
              "My vision for THE KYNXZ BRAND extends far beyond commerce.",
              "I envision a world where every customer feels seen, valued, respected, and connected.",
              "A brand where trust is treasured, relationships are nurtured, and every experience reflects timeless excellence.",
              "THE KYNXZ BRAND is not just my dream.",
              "It belongs to every individual who believes in our vision and chooses to walk this journey alongside us.",
            ].map((paragraph, i) => (
              <motion.p
                key={`founder-${i}`}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 1,
                  delay: 0.5 + i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`${inter.className} text-sm md:text-base leading-[1.9] tracking-[0.02em]`}
                style={{ color: C.muted }}
              >
                {paragraph}
              </motion.p>
            ))}

            {/* Signature */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10"
            >
              <div
                className="w-12 h-px mb-6 mx-auto"
                style={{ background: C.bronze, opacity: 0.4 }}
              />
              <p
                className={`${playfair.className} text-lg md:text-xl font-semibold`}
                style={{ color: C.ivory }}
              >
                &mdash; Mr. Amaan
              </p>
              <p
                className={`${inter.className} text-xs tracking-[0.15em] uppercase mt-2`}
                style={{ color: C.champagne, opacity: 0.7 }}
              >
                C.E.O &amp; Founder
              </p>
              <p
                className={`${inter.className} text-[11px] tracking-[0.12em] uppercase`}
                style={{ color: C.muted, opacity: 0.5 }}
              >
                THE KYNXZ BRAND
              </p>
            </motion.div>
          </div>

          {/* ── Large Cinematic Quote ── */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.97, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative mt-24 md:mt-28 pt-14 md:pt-16 w-full max-w-[1000px] mx-auto"
          >
            {/* Top decorative line */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px"
              style={{ background: C.champagne, opacity: 0.2 }}
            />

            {/* Large decorative opening quote mark */}
            <div
              className="absolute -top-4 left-1/2 -translate-x-1/2 text-6xl md:text-8xl leading-none pointer-events-none"
              style={{ color: C.champagne, opacity: 0.08 }}
              aria-hidden
            >
              &ldquo;
            </div>

            <blockquote
              className={`${playfair.className} text-[clamp(2rem,6vw,5rem)] font-light italic leading-[1.15] tracking-[-0.01em] text-center`}
              style={{ color: C.ivory }}
            >
              We are not building a customer base.<br />
              We are building a family, a legacy,<br />
              and a future together.
            </blockquote>

            {/* Closing decorative quote mark */}
            <div
              className="absolute -bottom-8 right-[10%] text-6xl md:text-8xl leading-none pointer-events-none"
              style={{ color: C.champagne, opacity: 0.06 }}
              aria-hidden
            >
              &rdquo;
            </div>
          </motion.div>

          {/* ── Final accent line ── */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-14 w-16 h-px mx-auto"
            style={{ background: C.bronze, opacity: 0.5 }}
          />
        </div>
      </div>

      {/* Bottom fade to footer */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: `linear-gradient(to bottom, transparent, ${C.bg})` }}
      />
    </Section>
  );
}

/* ═══════════════════════════════════════════════
   PAGE COMPOSITION
   ═══════════════════════════════════════════════ */
export default function MissionPage() {
  const C = useThemeColors();

  // Set page title
  useEffect(() => {
    document.title = "Mission | THE KYNXZ BRAND";
  }, []);

  return (
    <>
      <Header />

      <main
        role="main"
        aria-label="Mission page"
        className={`${inter.variable} ${playfair.variable} ${cormorant.variable}`}
        style={{
          fontFamily: "var(--font-inter), Arial, sans-serif",
          background: C.bg,
          overflow: "hidden",
        }}
      >
        {/* Section 1 – Cinematic Hero */}
        <MissionHero C={C} />

        {/* Section 2 – Our Mission */}
        <OurMission C={C} />

        {/* Section 3 – Core Values */}
        <CoreValuesSection C={C} />

        {/* Section 4 – Vision Timeline */}
        <VisionTimeline C={C} />

        {/* Section 5 – Inspirational Quote */}
        <QuoteSection C={C} />

        {/* Section 6 – Our Shared Journey */}
        <SharedJourneySection C={C} />
      </main>

      <FooterSection />
    </>
  );
}
