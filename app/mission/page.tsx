"use client";

import { useEffect, useRef, forwardRef } from "react";
import Image from "next/image";
import { playfair, cormorant, inter } from "../fonts";
import Header from "../components/Header";
import FooterSection from "../components/FooterSection";


import { useTheme, THEME } from "../hooks/useTheme";

const heroLines = [
  ["We", "Are", "Building"],
  ["More", "Than"],
  ["A", "Brand."],
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
function MissionHero({ C }: { C: (typeof THEME)["dark"] }) {
  const ref = useRef(null);

  return (
    <section ref={ref} className="min-h-[50dvh] pt-20 md:pt-24 lg:min-h-[80dvh] lg:pt-0 flex items-center justify-center relative overflow-hidden">
      {/* Static decorative background orbs */}
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
          className={`${inter.className} text-xs tracking-[0.25em] uppercase mb-8`}
          style={{ color: C.bronze }}
        >
          Our Mission
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
          className={`${inter.className} mt-10 text-base md:text-lg max-w-2xl mx-auto leading-relaxed tracking-[0.05em]`}
          style={{ color: C.muted }}
        >
          We are crafting a future where purpose, beauty and trust coexist.
        </p>

        <div className="mt-10 flex items-center justify-center gap-4">
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
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: `linear-gradient(to bottom, transparent, ${C.bg})` }}
      />
    </section>
  );
}

/* ═══════════════════════════════════════════════
   SECTION 2 – Our Mission
   ═══════════════════════════════════════════════ */
function OurMission({ C }: { C: (typeof THEME)["dark"] }) {
  return (
    <Section className="py-2 md:py-3 lg:py-4">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left — Our Mission image */}
          <div className="relative overflow-visible">
            <div
              aria-hidden
              className="luxury-image-glow-bg -top-6 -left-6 -right-6 -bottom-6"
            />
            <div className="relative w-full aspect-[5/4] md:aspect-[4/3] lg:aspect-[5/4] max-h-[520px] luxury-image-frame">
              <Image
                src="/our-mission.png"
                alt="Our Mission — THE KYNXZ BRAND"
                fill
                className="object-cover luxury-image-edge-fade"
                style={{ objectPosition: "center center" }}
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Right — Mission statement */}
          <div className="space-y-8">
            <p
              className={`${inter.className} text-xs tracking-[0.25em] uppercase`}
              style={{ color: C.bronze }}
            >
              Our Mission
            </p>

            <h2
              className={`${playfair.className} text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.1]`}
              style={{ color: C.ivory }}
            >
              Why{" "}
              <span className="italic font-normal" style={{ color: C.champagne }}>
                THE KYNXZ BRAND
              </span>{" "}
              exists.
            </h2>

            <div className="space-y-6">
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
            </div>

            <div className="pt-4">
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
            </div>
          </div>
        </div>
      </div>
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
  C,
}: {
  value: (typeof coreValues)[0];
  C: (typeof THEME)["dark"];
}) {
  return (
    <div
      className="group glass-premium p-8 md:p-10 rounded-[2px] cursor-default overflow-hidden relative"
      style={{
        borderColor: "rgba(214, 207, 199, 0.06)",
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

      <div
        className="relative z-10 mt-6 h-px w-8 transition-all duration-500 group-hover:w-16"
        style={{ background: `linear-gradient(to right, ${C.bronze}, transparent)` }}
      />
    </div>
  );
}

function CoreValuesSection({ C }: { C: (typeof THEME)["dark"] }) {
  return (
    <Section className="py-2 md:py-3 lg:py-4 relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(27, 22, 16, 0.3), transparent)",
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-6 md:mb-8">
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
        </div>

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
              <ValueCard value={v} C={C} />
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
  const isLeft = index % 2 === 0;

  return (
    <div className="relative pb-16 md:pb-24 last:pb-0">
      {/* Timeline connector line (vertical) */}
      <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2">
        <div
          className="w-full h-full"
          style={{ background: `linear-gradient(to bottom, ${C.bronze}, ${C.champagne}40, transparent)` }}
        />
      </div>

      {/* Mobile timeline line */}
      <div className="md:hidden absolute left-[18px] top-0 bottom-0 w-px">
        <div
          className="w-full h-full"
          style={{ background: `linear-gradient(to bottom, ${C.bronze}, ${C.champagne}40, transparent)` }}
        />
      </div>

      <div className={`flex flex-col md:flex-row items-start gap-8 md:gap-12 ${isLeft ? "" : "md:flex-row-reverse"}`}>
        {/* Content */}
        <div className="relative z-10 w-full md:w-[calc(50%-40px)] pl-14 md:pl-0">
          <div
            className="group glass-premium p-6 md:p-8 rounded-[2px] transition-all duration-500 hover:-translate-y-1"
            style={{
              border: "1px solid rgba(214, 207, 199, 0.06)",
            }}
          >
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

            <div
              className="mt-5 h-px w-8 transition-all duration-500 group-hover:w-16"
              style={{ background: C.bronze }}
            />
          </div>
        </div>

        {/* Spacer for the other side on desktop */}
        <div className="hidden md:block w-[calc(50%-40px)]" />

        {/* Timeline dot */}
        <div className="hidden md:block absolute left-1/2 top-0 -translate-x-1/2 z-20">
          <div
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
          </div>
        </div>

        {/* Mobile dot */}
        <div className="md:hidden absolute left-[10px] top-1 z-20">
          <div
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
          </div>
        </div>
      </div>
    </div>
  );
}

function VisionTimeline({ C }: { C: (typeof THEME)["dark"] }) {
  return (
    <Section className="py-3 md:py-4 lg:py-5 relative" style={{ background: C.bgAlt }}>
      {/* Animated background rays — simplified CSS */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-full"
          style={{
            background: `linear-gradient(to bottom, transparent, rgba(214, 207, 199, 0.04), transparent)`,
          }}
        />
        <div
          className="absolute top-0 left-[25%] w-[1px] h-full"
          style={{
            background: `linear-gradient(to bottom, transparent, rgba(139, 115, 85, 0.03), transparent)`,
          }}
        />
        <div
          className="absolute top-0 right-[25%] w-[1px] h-full"
          style={{
            background: `linear-gradient(to bottom, transparent, rgba(214, 207, 199, 0.03), transparent)`,
          }}
        />
      </div>

      {/* Large ambient glow */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(214, 207, 199, 0.04), transparent 60%)",
          filter: "blur(100px)",
        }}
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-10">
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
        </div>

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
  return (
    <Section className="py-2 md:py-3 lg:py-4 relative min-h-[25dvh] flex items-center justify-center">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 50% 40% at 50% 45%, rgba(214, 207, 199, 0.03), transparent 55%),
            radial-gradient(ellipse 40% 30% at 50% 20%, rgba(139, 115, 85, 0.025), transparent 50%),
            radial-gradient(ellipse 40% 30% at 50% 80%, rgba(139, 115, 85, 0.02), transparent 50%)
          `,
        }}
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 text-center">
        <div className="mb-6">
          <span
            className={`${playfair.className} text-6xl md:text-8xl leading-none`}
            style={{ color: C.bronze, opacity: 0.2 }}
          >
            &ldquo;
          </span>
        </div>

        <blockquote>
          <p
            className={`${playfair.className} text-[clamp(1.8rem,5vw,4rem)] font-light italic leading-[1.25] max-w-4xl mx-auto`}
            style={{ color: C.ivory }}
          >
            We do not seek trends. We seek meaning that endures.
          </p>
        </blockquote>

        <div className="mt-6">
          <span
            className={`${playfair.className} text-6xl md:text-8xl leading-none`}
            style={{ color: C.bronze, opacity: 0.2 }}
          >
            &rdquo;
          </span>
        </div>

        <div
          className="mx-auto mt-8 w-20 h-px"
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
  return (
    <Section className="relative min-h-[80dvh] flex items-center py-3 md:py-4 lg:py-5 overflow-hidden"
      style={{ background: C.bgAlt }}
    >
      {/* Static ambient glow canvas */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{
          background: `
            radial-gradient(ellipse 70% 55% at 50% 40%, rgba(214, 207, 199, 0.04), transparent 58%),
            radial-gradient(ellipse 50% 35% at 50% 15%, rgba(139, 115, 85, 0.03), transparent 50%),
            radial-gradient(ellipse 50% 35% at 50% 85%, rgba(139, 115, 85, 0.025), transparent 50%)
          `,
        }} />
      </div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-[8%] right-[6%] w-[450px] h-[450px] rounded-full"
          style={{
            background: `radial-gradient(circle at center, ${C.champagne}, transparent 60%)`,
            filter: "blur(100px)",
            opacity: 0.04,
          }}
        />
        <div
          className="absolute bottom-[12%] left-[4%] w-[380px] h-[380px] rounded-full"
          style={{
            background: `radial-gradient(circle at center, ${C.bronze}, transparent 60%)`,
            filter: "blur(80px)",
            opacity: 0.03,
          }}
        />
        <div
          className="absolute top-[55%] left-[20%] w-[300px] h-[300px] rounded-full"
          style={{
            background: `radial-gradient(circle at center, ${C.ivory}, transparent 60%)`,
            filter: "blur(70px)",
            opacity: 0.02,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1100px] mx-auto px-6">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6">
            <span
              className={`${inter.className} text-[10px] md:text-xs tracking-[0.3em] uppercase`}
              style={{ color: C.bronze }}
            >
              A Vision Beyond Business
            </span>
          </div>

          <div
            className="w-16 h-px mb-10"
            style={{ background: C.bronze, opacity: 0.5 }}
          />

          <h2
            className={`${playfair.className} text-[clamp(2.8rem,9vw,6.5rem)] font-bold leading-[1.05] tracking-[-0.02em]`}
            style={{ color: C.ivory }}
          >
            Our Shared
            <br />
            <span className="italic font-normal" style={{ color: C.champagne }}>
              Journey
            </span>
          </h2>

          <div className="mt-8 w-20 h-px mb-12" style={{ background: C.champagne, opacity: 0.3 }} />

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
              <p
                key={i}
                className={`${cormorant.className} text-[clamp(1.1rem,2.2vw,1.6rem)] leading-[1.75] tracking-[0.03em]`}
                style={{ color: C.muted }}
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="relative mt-16 mb-16 w-full max-w-[400px] h-px">
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
          </div>

          <div className="max-w-3xl mx-auto">
            <div>
              <p
                className={`${inter.className} text-[10px] md:text-xs tracking-[0.25em] uppercase mb-8`}
                style={{ color: C.bronze }}
              >
                Founder Vision
              </p>
            </div>

            {[
              "My vision for THE KYNXZ BRAND extends far beyond commerce.",
              "I envision a world where every customer feels seen, valued, respected, and connected.",
              "A brand where trust is treasured, relationships are nurtured, and every experience reflects timeless excellence.",
              "THE KYNXZ BRAND is not just my dream.",
              "It belongs to every individual who believes in our vision and chooses to walk this journey alongside us.",
            ].map((paragraph, i) => (
              <p
                key={`founder-${i}`}
                className={`${inter.className} text-sm md:text-base leading-[1.9] tracking-[0.02em]`}
                style={{ color: C.muted }}
              >
                {paragraph}
              </p>
            ))}

            <div className="mt-10">
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
            </div>
          </div>

          <div className="relative mt-14 md:mt-16 pt-8 md:pt-10 w-full max-w-[1000px] mx-auto">
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px"
              style={{ background: C.champagne, opacity: 0.2 }}
            />
            <div
              className="absolute -top-4 left-1/2 -translate-x-1/2 text-6xl md:text-8xl leading-none pointer-events-none"
              style={{ color: C.champagne, opacity: 0.08 }}
              aria-hidden
            >
              &ldquo;
            </div>

            <blockquote
              className={`${playfair.className} text-[clamp(1.4rem,4.2vw,3.5rem)] font-light italic leading-[1.2] tracking-[-0.01em] text-center`}
              style={{ color: C.ivory }}
            >
              We are not building a customer base.<br />
              We are building a family, a legacy,<br />
              and a future together.
            </blockquote>

            <div
              className="absolute -bottom-8 right-[10%] text-6xl md:text-8xl leading-none pointer-events-none"
              style={{ color: C.champagne, opacity: 0.06 }}
              aria-hidden
            >
              &rdquo;
            </div>
          </div>

          <div className="mt-8 w-16 h-px mx-auto" style={{ background: C.bronze, opacity: 0.5 }} />
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: `linear-gradient(to bottom, transparent, ${C.bg})` }}
      />
    </Section>
  );
}

/* ═══════════════════════════════════════════════
   PAGE COMPOSITION
   ═══════════════════════════════════════════════ */
export default function MissionPage() {
  const C = useTheme();

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

        {/* Background transition: bg → bgAlt */}
        <div aria-hidden className="h-5 lg:h-6 w-full pointer-events-none" style={{ background: `linear-gradient(to bottom, ${C.bg}, ${C.bgAlt})` }} />

        {/* Section 4 – Vision Timeline */}
        <VisionTimeline C={C} />

        {/* Background transition: bgAlt → bg */}
        <div aria-hidden className="h-5 lg:h-6 w-full pointer-events-none" style={{ background: `linear-gradient(to bottom, ${C.bgAlt}, ${C.bg})` }} />

        {/* Section 5 – Inspirational Quote */}
        <QuoteSection C={C} />

        {/* Background transition: bg → bgAlt */}
        <div aria-hidden className="h-5 lg:h-6 w-full pointer-events-none" style={{ background: `linear-gradient(to bottom, ${C.bg}, ${C.bgAlt})` }} />

        {/* Section 6 – Our Shared Journey */}
        <SharedJourneySection C={C} />
      </main>

      <FooterSection />
    </>
  );
}
