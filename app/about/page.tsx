"use client";

import { useEffect, useRef, forwardRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";
import Image from "next/image";
import { playfair, cormorant, inter } from "../fonts";
import { useTheme, THEME } from "../hooks/useTheme";
import Header from "../components/Header";
import FooterSection from "../components/FooterSection";
import SectionLazy from "../components/SectionLazy";
import KynxzStoryImage from "../components/KynxzStoryImage";
import PhilosophyImage from "../components/PhilosophyImage";

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

const headlineLines = [
  ["Beyond", "Commerce."],
  ["We", "Craft"],
  ["Meaning."],
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
   Cinematic Hero (above the fold — loads immediately)
   ═══════════════════════════════════════════════ */
function CinematicHero({ C: _C }: { C: (typeof THEME)["dark"] }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <Section className="min-h-[100dvh] flex items-center justify-center relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ y: [0, -30, 0], x: [0, 15, 0], scale: [1, 1.04, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[12%] right-[8%] w-[500px] h-[500px] rounded-full opacity-[0.08]"
          style={{ background: "radial-gradient(circle at center, #D6CFC7, transparent 65%)", filter: "blur(80px)" }}
        />
        <motion.div
          animate={{ y: [0, 25, 0], x: [0, -20, 0], scale: [1, 1.06, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[15%] left-[5%] w-[380px] h-[380px] rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(circle at center, #8B7355, transparent 60%)", filter: "blur(70px)" }}
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute top-[20%] left-[10%] w-[300px] h-[300px] opacity-[0.04]"
          style={{ border: "1px solid rgba(214, 207, 199, 0.3)", borderRadius: "42% 58% 38% 62% / 52% 44% 56% 48%" }}
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[25%] right-[12%] w-[200px] h-[200px] opacity-[0.03]"
          style={{ border: "1px solid rgba(214, 207, 199, 0.2)", borderRadius: "55% 45% 60% 40% / 45% 55% 45% 55%" }}
        />
      </div>

      <motion.div
        ref={ref}
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative z-10 max-w-[1400px] mx-auto px-6 text-center"
      >
        <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0}
          className={`${inter.className} text-xs tracking-[0.25em] uppercase mb-8`} style={{ color: _C.bronze }}>
          The KYNXZ BRAND
        </motion.p>

        <h1 className={`${playfair.className} text-[clamp(2.2rem,8vw,5.5rem)] font-bold leading-[1.2] tracking-[0.04em]`} style={{ color: _C.ivory }}>
          {headlineLines.map((line, lineIdx) => (
            <div key={lineIdx} className="overflow-hidden">
              {line.map((word, wordIdx) => {
                const globalIdx = headlineLines.slice(0, lineIdx).reduce((acc, l) => acc + l.length, 0) + wordIdx;
                return (
                  <motion.span key={wordIdx} variants={wordReveal} initial="hidden" animate="visible" custom={globalIdx}
                    className="inline-block mr-[0.3em] last:mr-0">{word}</motion.span>
                );
              })}
            </div>
          ))}
        </h1>

        <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={6}
          className={`${inter.className} mt-10 text-base md:text-lg max-w-2xl mx-auto leading-relaxed tracking-[0.05em]`} style={{ color: _C.muted }}>
          Every creation carries a story. Every detail holds intention. We exist
          at the intersection of artistry and purpose, shaping a world where
          meaning matters.
        </motion.p>

        <motion.div variants={fadeIn} initial="hidden" animate="visible" custom={8}
          className="mt-16 flex items-center justify-center gap-4">
          <span className="block w-16 h-px" style={{ background: _C.bronze }} />
          <span className={`${cormorant.className} italic text-sm`} style={{ color: _C.champagne }}>Since Inception</span>
          <span className="block w-16 h-px" style={{ background: _C.bronze }} />
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: `linear-gradient(to bottom, transparent, ${_C.bg})` }} />
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
    <Section className="py-4 md:py-5 lg:py-6">
      <div ref={ref} className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          >
            <KynxzStoryImage C={C} />
          </motion.div>

          <div className="space-y-8">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className={`${inter.className} text-xs tracking-[0.25em] uppercase`} style={{ color: C.bronze }}>
              The Beginning
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className={`${playfair.className} text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.1]`} style={{ color: C.ivory }}>
              Our{" "}<span className="italic font-normal" style={{ color: C.champagne }}>Story</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className="space-y-6"
            >
              <p className={`${inter.className} text-base md:text-lg leading-[1.9]`} style={{ color: C.muted }}>
                KYNXZ was born from a singular realization — that true luxury is not defined by price, but by meaning.
                In a world saturated with mass-produced indifference, we saw an opportunity to create something different.
              </p>
              <p className={`${inter.className} text-base md:text-lg leading-[1.9]`} style={{ color: C.muted }}>
                Every piece bearing the KYNXZ name carries the weight of intention. From the finest materials to the
                most subtle details, we pour our souls into creations designed to transcend seasons, trends, and time.
              </p>
              <p className={`${inter.className} text-base md:text-lg leading-[1.9]`} style={{ color: C.muted }}>
                We are not a brand built on campaigns. We are a movement built on conviction. Every creation is a
                conversation — between the artisan, the material, and the soul it is destined to touch.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className="pt-4"
            >
              <div className="flex items-center gap-4">
                <span className="block w-12 h-px" style={{ background: C.bronze }} />
                <span className={`${cormorant.className} italic text-lg`} style={{ color: C.champagne }}>Since Inception</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div
        className="absolute right-[5%] top-[25%] w-px h-[40%] opacity-[0.08]"
        style={{ background: `linear-gradient(to bottom, transparent, ${C.champagne}, transparent)` }}
        animate={{ scaleY: [0.8, 1.2, 0.8], opacity: [0.04, 0.12, 0.04] }}
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
    image: "/purpose.png",
    body: "We exist to elevate the every day. Not through excess, but through intention. Every creation serves a purpose to inspire, to endure, to mean something.",
    side: "left" as const,
  },
  {
    title: "Timelessness",
    subtitle: "Beyond seasons",
    image: "/timelessness.png",
    body: "We design for permanence. In a world of disposable trends, we create objects and experiences that age gracefully growing more beautiful with time, never fading into irrelevance.",
    side: "right" as const,
  },
  {
    title: "Craftsmanship",
    subtitle: "The art of detail",
    image: "/craftsmanship.png",
    body: "Every curve, every seam, every finish is deliberate. Our artisans pour their mastery into each piece, knowing that true luxury reveals itself in the details most will never see.",
    side: "left" as const,
  },
];

function PhilosophyScene({ item, index, C }: {
  item: (typeof philosophies)[0];
  index: number;
  C: (typeof THEME)["dark"];
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });
  const imageFirst = item.side === "left";

  return (
    <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
      {imageFirst ? (
        <>
          <motion.div initial={{ opacity: 0, x: -40 }} animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}>
            <PhilosophyImage src={item.image} alt={item.title} />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 40 }} animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}>
            <div className="space-y-6">
              <span className={`${cormorant.className} italic text-lg`} style={{ color: C.champagne }}>{item.subtitle}</span>
              <h2 className={`${playfair.className} text-[clamp(2rem,5vw,3.8rem)] font-bold leading-[1.08]`} style={{ color: C.ivory }}>
                {item.title}
              </h2>
              <p className={`${inter.className} text-base md:text-lg leading-[1.9]`} style={{ color: C.muted }}>{item.body}</p>
              <span className="block w-16 h-px" style={{ background: C.bronze }} />
            </div>
          </motion.div>
        </>
      ) : (
        <>
          <motion.div initial={{ opacity: 0, x: -40 }} animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}>
            <div className="space-y-6">
              <span className={`${cormorant.className} italic text-lg`} style={{ color: C.champagne }}>{item.subtitle}</span>
              <h2 className={`${playfair.className} text-[clamp(2rem,5vw,3.8rem)] font-bold leading-[1.08]`} style={{ color: C.ivory }}>
                {item.title}
              </h2>
              <p className={`${inter.className} text-base md:text-lg leading-[1.9]`} style={{ color: C.muted }}>{item.body}</p>
              <span className="block w-16 h-px" style={{ background: C.bronze }} />
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 40 }} animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}>
            <PhilosophyImage src={item.image} alt={item.title} />
          </motion.div>
        </>
      )}
    </div>
  );
}

function PhilosophyGallery({ C }: { C: (typeof THEME)["dark"] }) {
  return (
    <Section className="py-4 md:py-5 lg:py-6">
      <div className="max-w-[1400px] mx-auto px-6 space-y-10 md:space-y-12">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="text-center max-w-3xl mx-auto">
          <p className={`${inter.className} text-xs tracking-[0.25em] uppercase mb-4`} style={{ color: C.bronze }}>Our Philosophy</p>
          <h2 className={`${playfair.className} text-[clamp(2rem,5vw,3.8rem)] font-bold leading-[1.08]`} style={{ color: C.ivory }}>
            The principles that define us
          </h2>
          <div className="mx-auto mt-6 w-24 h-px" style={{ background: C.bronze, opacity: 0.5 }} />
        </motion.div>

        {philosophies.map((item, i) => (
          <PhilosophyScene key={item.title} item={item} index={i} C={C} />
        ))}
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════
   SECTION 4 – Dream Wall
   ═══════════════════════════════════════════════ */
function DreamWall({ C }: { C: (typeof THEME)["dark"] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <Section className="py-5 md:py-6 lg:py-8 relative" style={{ background: C.bgAlt }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse 60% 40% at 50% 50%, rgba(214, 207, 199, 0.06), transparent 60%), radial-gradient(ellipse 50% 30% at 50% 30%, rgba(139, 115, 85, 0.04), transparent 50%)` }}
      />

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 18 }).map((_, i) => (
          <motion.div key={i} className="absolute w-[2px] h-[2px] rounded-full"
            style={{ background: C.champagne, top: `${10 + Math.random() * 80}%`, left: `${5 + Math.random() * 90}%`, opacity: 0.06 + Math.random() * 0.1 }}
            animate={{ y: [0, -30 - Math.random() * 50, 0], x: [0, 15 - Math.random() * 30, 0], opacity: [0.04 + Math.random() * 0.08, 0.12 + Math.random() * 0.12, 0.04 + Math.random() * 0.08] }}
            transition={{ duration: 14 + Math.random() * 16, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 10 }}
          />
        ))}
      </div>

      <div ref={ref} className="relative z-10 max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div initial={{ opacity: 0, x: -60 }} animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}>
            <p className={`${inter.className} text-xs tracking-[0.25em] uppercase mb-6`} style={{ color: C.bronze }}>Our Dream</p>
            <h2 className={`${playfair.className} text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1.08] mb-8`} style={{ color: C.ivory }}>
              The{" "}<span className="italic font-normal" style={{ color: C.champagne }}>KYNXZ</span>{" "}World
            </h2>
            <div className="space-y-6">
              <p className={`${inter.className} text-base md:text-lg leading-[1.9]`} style={{ color: C.muted }}>
                We dream of a world where every object in your space tells a story of intention. Where the things you
                own are not possessions, but reflections of your values, your taste, your journey.
              </p>
              <p className={`${inter.className} text-base md:text-lg leading-[1.9]`} style={{ color: C.muted }}>
                This is the KYNXZ world — where design meets destiny, where craftsmanship meets consciousness, and
                where every detail matters because YOU matter.
              </p>
            </div>
            <div className="mt-8 w-16 h-px" style={{ background: C.bronze }} />
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 60 }} animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="relative aspect-[4/3] lg:aspect-square rounded-[2px] overflow-hidden border border-white/[0.06]">
            <div className="absolute inset-0" style={{
              background: `linear-gradient(135deg, #1B1610 0%, #111111 40%, #0A0A0A 100%), radial-gradient(ellipse at 30% 20%, rgba(214, 207, 199, 0.08), transparent 50%)`,
            }} />
            <Image src="/kynxz-office.png" alt="The KYNXZ World" fill className="object-cover opacity-80" loading="lazy" sizes="(max-width: 768px) 100vw, 50vw" />
          </motion.div>
        </div>
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════
   SECTION 5 – Values Section
   ═══════════════════════════════════════════════ */
const values = [
  {
    title: "Integrity",
    description: "We honor our word as our most sacred asset. Every promise made is a promise kept — to ourselves, our craft, and those who place their trust in us.",
  },
  {
    title: "Excellence",
    description: "Mediocrity has no place in our world. We pursue the highest standard in every detail, every decision, every creation bearing our name.",
  },
  {
    title: "Community",
    description: "We are nothing without the people who believe in us. Every customer is family, every partnership is sacred, every relationship is built on mutual respect.",
  },
  {
    title: "Sustainability",
    description: "Luxury and responsibility must coexist. We are committed to creating with conscience — minimizing waste, honoring materials, and building a better future.",
  },
];

function ValueIsland({ value, index, C }: {
  value: (typeof values)[0];
  index: number;
  C: (typeof THEME)["dark"];
}) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-80px" });

  return (
    <motion.div ref={cardRef}
      initial={{ opacity: 0, y: 60 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group glass-premium p-8 md:p-10 rounded-[2px] cursor-default" style={{ borderColor: "rgba(214, 207, 199, 0.06)" }}>
      <div className="absolute inset-0 rounded-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at center, rgba(214, 207, 199, 0.08), transparent 70%)` }} />
      <h3 className={`${playfair.className} relative z-10 text-2xl md:text-3xl font-bold mb-4`} style={{ color: C.ivory }}>
        {value.title}
      </h3>
      <p className={`${inter.className} relative z-10 text-sm md:text-base leading-[1.8]`} style={{ color: C.muted }}>
        {value.description}
      </p>
      <div className="relative z-10 mt-6 h-px w-8 transition-all duration-500 group-hover:w-16"
        style={{ background: `linear-gradient(to right, ${C.bronze}, transparent)` }} />
    </motion.div>
  );
}

function ValuesSection({ C }: { C: (typeof THEME)["dark"] }) {
  return (
    <Section className="py-4 md:py-5 lg:py-6">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(27, 22, 16, 0.35), transparent)" }} />
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div key={`value-particle-${i}`} className="absolute w-[1.5px] h-[1.5px] rounded-full"
            style={{ background: C.champagne, top: `${10 + Math.random() * 80}%`, left: `${5 + Math.random() * 90}%`, opacity: 0.04 + Math.random() * 0.08 }}
            animate={{ y: [0, -35 - Math.random() * 45, 0], x: [0, 12 - Math.random() * 24, 0], opacity: [0.03 + Math.random() * 0.05, 0.08 + Math.random() * 0.1, 0.03 + Math.random() * 0.05] }}
            transition={{ duration: 16 + Math.random() * 18, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 10 }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
          <p className={`${inter.className} text-xs tracking-[0.25em] uppercase mb-4`} style={{ color: C.bronze }}>Our Foundation</p>
          <h2 className={`${playfair.className} text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.1]`} style={{ color: C.ivory }}>
            What we stand for
          </h2>
          <div className="mx-auto mt-6 w-24 h-px" style={{ background: C.bronze, opacity: 0.5 }} />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {values.map((v, i) => (
            <ValueIsland key={v.title} value={v} index={i} C={C} />
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
    <Section className="py-5 md:py-6 lg:py-8 relative" style={{ background: C.bgAlt }}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-full"
          style={{ background: "linear-gradient(to bottom, transparent, rgba(214, 207, 199, 0.08), transparent)", transformOrigin: "top center" }} />
        <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 2.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="absolute top-0 left-[30%] w-[1px] h-full"
          style={{ background: "linear-gradient(to bottom, transparent, rgba(139, 115, 85, 0.06), transparent)" }} />
        <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 2.5, delay: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="absolute top-0 right-[30%] w-[1px] h-full"
          style={{ background: "linear-gradient(to bottom, transparent, rgba(214, 207, 199, 0.06), transparent)" }} />
        <motion.div animate={{ x: ["-100%", "200%"], opacity: [0, 0.08, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[45%] left-0 w-[60%] h-px"
          style={{ background: `linear-gradient(to right, transparent, ${C.champagne}, transparent)`, filter: "blur(3px)" }} />
      </div>

      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle at center, rgba(214, 207, 199, 0.08), transparent 60%)", filter: "blur(100px)" }} />

      <div ref={ref} className="relative z-10 max-w-[1200px] mx-auto px-6 text-center">
        <motion.p initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className={`${inter.className} text-xs tracking-[0.25em] uppercase mb-8`} style={{ color: C.bronze }}>Our Vision</motion.p>

        <motion.h2 initial={{ opacity: 0, y: 60, filter: "blur(6px)" }} animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 1.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className={`${playfair.className} text-[clamp(2.8rem,9vw,6.5rem)] font-bold leading-[1.05]`} style={{ color: C.ivory }}>
          A Vision of<br /><span className="italic font-normal" style={{ color: C.champagne }}>Tomorrow</span>
        </motion.h2>

        <motion.div initial={{ scaleX: 0 }} animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="mx-auto mt-8 w-20 h-px mb-12" style={{ background: C.champagne, opacity: 0.3 }} />

        <motion.p initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className={`${cormorant.className} text-[clamp(1.2rem,2.5vw,1.8rem)] leading-[1.7] max-w-4xl mx-auto`} style={{ color: C.muted }}>
          We envision a world where every object is crafted with soul, every space tells a story, and every individual
          has access to beauty that transcends time. A future where luxury is defined not by what you own, but by what
          you cherish. Where communities are built on shared values, and where the pursuit of meaning is the highest
          form of success.
        </motion.p>

        <motion.div initial={{ scaleX: 0 }} animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.5, delay: 0.9, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="mx-auto mt-12 w-24 h-px" style={{ background: C.bronze }} />
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
    <Section className="py-4 md:py-5 lg:py-6 relative">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(27, 22, 16, 0.35), transparent)" }} />

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div key={`visionary-particle-${i}`} className="absolute w-[1.5px] h-[1.5px] rounded-full"
            style={{ background: C.champagne, top: `${10 + Math.random() * 80}%`, left: `${5 + Math.random() * 90}%`, opacity: 0.04 + Math.random() * 0.08 }}
            animate={{ y: [0, -30 - Math.random() * 40, 0], x: [0, 12 - Math.random() * 24, 0], opacity: [0.03 + Math.random() * 0.05, 0.08 + Math.random() * 0.1, 0.03 + Math.random() * 0.05] }}
            transition={{ duration: 15 + Math.random() * 18, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 10 }}
          />
        ))}
      </div>

      <div ref={ref} className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div initial={{ opacity: 0, x: -60 }} animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}>
            <div className="relative w-full aspect-[4/5] max-h-[600px] rounded-[2px] overflow-hidden border border-white/[0.06]">
              <div className="absolute inset-0" style={{
                background: `linear-gradient(160deg, #0A0A0A 0%, #111111 40%, #1B1610 100%), radial-gradient(ellipse at 40% 30%, rgba(214, 207, 199, 0.08), transparent 50%)`,
              }} />
              <Image src="/kynxz-office.png" alt="The Visionary" fill className="object-cover opacity-70" loading="lazy" sizes="(max-width: 768px) 100vw, 50vw" />
              <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${C.bg}, transparent 40%)` }} />
            </div>
          </motion.div>

          <div className="space-y-8">
            <motion.p initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className={`${inter.className} text-xs tracking-[0.25em] uppercase`} style={{ color: C.bronze }}>The Visionary</motion.p>

            <motion.h2 initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className={`${playfair.className} text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.1]`} style={{ color: C.ivory }}>
              Meet the Founder
            </motion.h2>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className="space-y-6">
              <p className={`${inter.className} text-base md:text-lg leading-[1.9]`} style={{ color: C.muted }}>
                THE KYNXZ BRAND was founded by Mr. Amaan — a visionary with a deep appreciation for artistry,
                quality, and the timeless pursuit of meaning.
              </p>
              <p className={`${inter.className} text-base md:text-lg leading-[1.9]`} style={{ color: C.muted }}>
                What began as a dream to create something truly meaningful has evolved into a brand that represents
                excellence, trust, and a global community united by shared values.
              </p>
              <p className={`${inter.className} text-base md:text-lg leading-[1.9]`} style={{ color: C.muted }}>
                Mr. Amaan&rsquo;s vision extends far beyond commerce. It is about creating a legacy — a world where
                every creation carries meaning, every relationship is built on trust, and every individual feels seen,
                valued, and connected.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, scaleX: 0 }} animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}>
              <div className="flex items-center gap-4">
                <span className="block w-12 h-px" style={{ background: C.bronze }} />
                <span className={`${cormorant.className} italic text-lg`} style={{ color: C.champagne }}>C.E.O &amp; Founder</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div className="absolute right-[5%] top-[25%] w-px h-[40%] opacity-[0.08]"
        style={{ background: `linear-gradient(to bottom, transparent, ${C.champagne}, transparent)` }}
        animate={{ scaleY: [0.8, 1.2, 0.8], opacity: [0.04, 0.12, 0.04] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }} />
    </Section>
  );
}

/* ═══════════════════════════════════════════════
   SECTION 8 – Final CTA
   ═══════════════════════════════════════════════ */
function FinalCTA({ C }: { C: (typeof THEME)["dark"] }) {
  return (
    <Section className="py-5 md:py-6 lg:py-8 relative min-h-[60dvh] flex items-center" style={{ background: C.bgAlt }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse 50% 40% at 50% 50%, rgba(27, 22, 16, 0.3), transparent)` }} />

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 text-center">
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className={`${inter.className} text-xs tracking-[0.25em] uppercase mb-8`} style={{ color: C.bronze }}>
          Join Our Journey
        </motion.p>

        <motion.h2 initial={{ opacity: 0, y: 60, scale: 0.95 }} whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }} transition={{ duration: 1.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className={`${playfair.className} text-[clamp(2.8rem,9vw,6rem)] font-bold leading-[1.05]`} style={{ color: C.ivory }}>
          Crafted With<br /><span className="italic font-normal" style={{ color: C.champagne }}>Intention</span>
        </motion.h2>

        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className={`${inter.className} mt-8 text-base md:text-lg max-w-xl mx-auto leading-relaxed`} style={{ color: C.muted }}>
          Every piece tells a story. Every creation carries a purpose. Welcome to a world where meaning matters.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="mt-12">
          <a href="/collections"
            className="group inline-flex items-center gap-3 px-10 py-4 rounded-full border transition-all duration-500 hover:-translate-y-1"
            style={{ borderColor: C.champagne, color: C.ivory, background: "rgba(214, 207, 199, 0.04)" }}>
            <span className={`${inter.className} text-sm tracking-[0.15em] uppercase`}>Explore Collections</span>
            <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-lg" style={{ color: C.champagne }}>&rarr;</motion.span>
          </a>
        </motion.div>

        <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
          viewport={{ once: true }} transition={{ duration: 1.5, delay: 1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="mx-auto mt-16 w-24 h-px" style={{ background: C.bronze }} />
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════
   PAGE COMPOSITION
   ═══════════════════════════════════════════════ */
export default function AboutPage() {
  const C = useTheme();

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
        {/* Section 1 – Cinematic Hero (above the fold) */}
        <CinematicHero C={C} />

        {/* Below-fold sections with lazy loading */}
        <SectionLazy>
          <TheStory C={C} />
        </SectionLazy>

        <SectionLazy>
          <PhilosophyGallery C={C} />
        </SectionLazy>

        <SectionLazy>
          <DreamWall C={C} />
        </SectionLazy>

        <SectionLazy>
          <ValuesSection C={C} />
        </SectionLazy>

        <SectionLazy>
          <VisionOfTomorrow C={C} />
        </SectionLazy>

        <SectionLazy>
          <TheVisionary C={C} />
        </SectionLazy>

        <SectionLazy>
          <FinalCTA C={C} />
        </SectionLazy>
      </main>

      <SectionLazy placeholder="100px">
        <FooterSection />
      </SectionLazy>
    </>
  );
}
