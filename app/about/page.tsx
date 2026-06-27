"use client";

import { useEffect, forwardRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { playfair, cormorant, inter } from "../fonts";
import { useTheme, THEME } from "../hooks/useTheme";
import Header from "../components/Header";
import FooterSection from "../components/FooterSection";
import SectionLazy from "../components/SectionLazy";
import KynxzStoryImage from "../components/KynxzStoryImage";
import PhilosophyImage from "../components/PhilosophyImage";

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
  return (
    <Section className="min-h-[50dvh] pt-20 md:pt-24 lg:min-h-[80dvh] lg:pt-0 flex items-center justify-center relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-[12%] right-[8%] w-[500px] h-[500px] rounded-full opacity-[0.08]"
          style={{ background: "radial-gradient(circle at center, #D6CFC7, transparent 65%)", filter: "blur(80px)" }}
        />
        <div
          className="absolute bottom-[15%] left-[5%] w-[380px] h-[380px] rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(circle at center, #8B7355, transparent 60%)", filter: "blur(70px)" }}
        />
        <div
          className="absolute top-[20%] left-[10%] w-[300px] h-[300px] opacity-[0.04]"
          style={{ border: "1px solid rgba(214, 207, 199, 0.3)", borderRadius: "42% 58% 38% 62% / 52% 44% 56% 48%" }}
        />
        <div
          className="absolute bottom-[25%] right-[12%] w-[200px] h-[200px] opacity-[0.03]"
          style={{ border: "1px solid rgba(214, 207, 199, 0.2)", borderRadius: "55% 45% 60% 40% / 45% 55% 45% 55%" }}
        />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 text-center">
        <p
          className={`${inter.className} text-xs tracking-[0.25em] uppercase mb-8`} style={{ color: _C.bronze }}>
          The KYNXZ BRAND
        </p>

        <h1 className={`${playfair.className} text-[clamp(2.2rem,8vw,5.5rem)] font-bold leading-[1.2] tracking-[0.04em]`} style={{ color: _C.ivory }}>
          {headlineLines.map((line, lineIdx) => (
            <div key={lineIdx} className="">
              {line.map((word, wordIdx) => (
                <span key={wordIdx} className="inline-block mr-[0.3em] last:mr-0">{word}</span>
              ))}
            </div>
          ))}
        </h1>

        <p
          className={`${inter.className} mt-10 text-base md:text-lg max-w-2xl mx-auto leading-relaxed tracking-[0.05em]`} style={{ color: _C.muted }}>
          Every creation carries a story. Every detail holds intention. We exist
          at the intersection of artistry and purpose, shaping a world where
          meaning matters.
        </p>

        <div className="mt-10 flex items-center justify-center gap-4">
          <span className="block w-16 h-px" style={{ background: _C.bronze }} />
          <span className={`${cormorant.className} italic text-sm`} style={{ color: _C.champagne }}>Since Inception</span>
          <span className="block w-16 h-px" style={{ background: _C.bronze }} />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: `linear-gradient(to bottom, transparent, ${_C.bg})` }} />
    </Section>
  );
}

/* ═══════════════════════════════════════════════
   SECTION 2 – The Story
   ═══════════════════════════════════════════════ */
function TheStory({ C }: { C: (typeof THEME)["dark"] }) {
  return (
    <Section className="pt-1 md:pt-2 lg:pt-3 pb-3 md:pb-4 lg:pb-5">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <KynxzStoryImage C={C} />
          </div>

          <div className="space-y-8">
            <p
              className={`${inter.className} text-xs tracking-[0.25em] uppercase`} style={{ color: C.bronze }}>
              The Beginning
            </p>

            <h2
              className={`${playfair.className} text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.1]`} style={{ color: C.ivory }}>
              Our{" "}<span className="italic font-normal" style={{ color: C.champagne }}>Story</span>
            </h2>

            <div className="space-y-6">
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
            </div>

            <div className="pt-4">
              <div className="flex items-center gap-4">
                <span className="block w-12 h-px" style={{ background: C.bronze }} />
                <span className={`${cormorant.className} italic text-lg`} style={{ color: C.champagne }}>Since Inception</span>
              </div>
            </div>
          </div>
        </div>
      </div>
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

function PhilosophyScene({ item, C }: {
  item: (typeof philosophies)[0];
  C: (typeof THEME)["dark"];
}) {
  const imageFirst = item.side === "left";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
      {imageFirst ? (
        <>
          <div>
            <PhilosophyImage src={item.image} alt={item.title} />
          </div>
          <div>
            <div className="space-y-6">
              <span className={`${cormorant.className} italic text-lg`} style={{ color: C.champagne }}>{item.subtitle}</span>
              <h2 className={`${playfair.className} text-[clamp(2rem,5vw,3.8rem)] font-bold leading-[1.08]`} style={{ color: C.ivory }}>
                {item.title}
              </h2>
              <p className={`${inter.className} text-base md:text-lg leading-[1.9]`} style={{ color: C.muted }}>{item.body}</p>
              <span className="block w-16 h-px" style={{ background: C.bronze }} />
            </div>
          </div>
        </>
      ) : (
        <>
          <div>
            <div className="space-y-6">
              <span className={`${cormorant.className} italic text-lg`} style={{ color: C.champagne }}>{item.subtitle}</span>
              <h2 className={`${playfair.className} text-[clamp(2rem,5vw,3.8rem)] font-bold leading-[1.08]`} style={{ color: C.ivory }}>
                {item.title}
              </h2>
              <p className={`${inter.className} text-base md:text-lg leading-[1.9]`} style={{ color: C.muted }}>{item.body}</p>
              <span className="block w-16 h-px" style={{ background: C.bronze }} />
            </div>
          </div>
          <div>
            <PhilosophyImage src={item.image} alt={item.title} />
          </div>
        </>
      )}
    </div>
  );
}

function PhilosophyGallery({ C }: { C: (typeof THEME)["dark"] }) {
  return (
    <Section className="py-2 md:py-3 lg:py-4">
      <div className="max-w-[1400px] mx-auto px-6 space-y-6 md:space-y-8">
        <div className="text-center max-w-3xl mx-auto">
          <p className={`${inter.className} text-xs tracking-[0.25em] uppercase mb-4`} style={{ color: C.bronze }}>Our Philosophy</p>
          <h2 className={`${playfair.className} text-[clamp(2rem,5vw,3.8rem)] font-bold leading-[1.08]`} style={{ color: C.ivory }}>
            The principles that define us
          </h2>
          <div className="mx-auto mt-6 w-24 h-px" style={{ background: C.bronze, opacity: 0.5 }} />
        </div>

        {philosophies.map((item) => (
          <PhilosophyScene key={item.title} item={item} C={C} />
        ))}
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════
   SECTION 4 – Dream Wall
   ═══════════════════════════════════════════════ */
function DreamWall({ C }: { C: (typeof THEME)["dark"] }) {
  return (
    <Section className="py-3 md:py-4 lg:py-5 relative" style={{ background: C.bgAlt }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse 60% 40% at 50% 50%, rgba(214, 207, 199, 0.06), transparent 60%), radial-gradient(ellipse 50% 30% at 50% 30%, rgba(139, 115, 85, 0.04), transparent 50%)` }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div>
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
          </div>

          <div className="relative overflow-visible">
            <div
              aria-hidden
              className="luxury-image-glow-bg -top-6 -left-6 -right-6 -bottom-6"
            />
            <div className="relative luxury-image-frame">
              <div className="absolute inset-0" style={{
                background: `linear-gradient(135deg, #1B1610 0%, #111111 40%, #0A0A0A 100%), radial-gradient(ellipse at 30% 20%, rgba(214, 207, 199, 0.08), transparent 50%)`,
              }} />
              <Image src="/kynxz-office.png" alt="The KYNXZ World" fill className="object-cover opacity-85 luxury-image-edge-fade" loading="lazy" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
          </div>
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

function ValueIsland({ value, C }: {
  value: (typeof values)[0];
  C: (typeof THEME)["dark"];
}) {
  return (
    <div
      className="group glass-premium p-8 md:p-10 rounded-[2px] cursor-default relative overflow-hidden"
      style={{ border: "1px solid rgba(214, 207, 199, 0.06)" }}>
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
    </div>
  );
}

function ValuesSection({ C }: { C: (typeof THEME)["dark"] }) {
  return (
    <Section className="py-2 md:py-3 lg:py-4">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(27, 22, 16, 0.35), transparent)" }} />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-6 md:mb-8">
          <p className={`${inter.className} text-xs tracking-[0.25em] uppercase mb-4`} style={{ color: C.bronze }}>Our Foundation</p>
          <h2 className={`${playfair.className} text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.1]`} style={{ color: C.ivory }}>
            What we stand for
          </h2>
          <div className="mx-auto mt-6 w-24 h-px" style={{ background: C.bronze, opacity: 0.5 }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {values.map((v) => (
            <ValueIsland key={v.title} value={v} C={C} />
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
  return (
    <Section className="py-3 md:py-4 lg:py-5 relative" style={{ background: C.bgAlt }}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-full"
          style={{ background: "linear-gradient(to bottom, transparent, rgba(214, 207, 199, 0.08), transparent)" }} />
        <div
          className="absolute top-0 left-[30%] w-[1px] h-full"
          style={{ background: "linear-gradient(to bottom, transparent, rgba(139, 115, 85, 0.06), transparent)" }} />
        <div
          className="absolute top-0 right-[30%] w-[1px] h-full"
          style={{ background: "linear-gradient(to bottom, transparent, rgba(214, 207, 199, 0.06), transparent)" }} />
      </div>

      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle at center, rgba(214, 207, 199, 0.08), transparent 60%)", filter: "blur(100px)" }} />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 text-center">
        <p
          className={`${inter.className} text-xs tracking-[0.25em] uppercase mb-8`} style={{ color: C.bronze }}>Our Vision</p>

        <h2
          className={`${playfair.className} text-[clamp(2.8rem,9vw,6.5rem)] font-bold leading-[1.05]`} style={{ color: C.ivory }}>
          A Vision of<br /><span className="italic font-normal" style={{ color: C.champagne }}>Tomorrow</span>
        </h2>

        <div
          className="mx-auto mt-8 w-20 h-px mb-12" style={{ background: C.champagne, opacity: 0.3 }} />

        <p
          className={`${cormorant.className} text-[clamp(1.2rem,2.5vw,1.8rem)] leading-[1.7] max-w-4xl mx-auto`} style={{ color: C.muted }}>
          We envision a world where every object is crafted with soul, every space tells a story, and every individual
          has access to beauty that transcends time. A future where luxury is defined not by what you own, but by what
          you cherish. Where communities are built on shared values, and where the pursuit of meaning is the highest
          form of success.
        </p>

        <div
          className="mx-auto mt-12 w-24 h-px" style={{ background: C.bronze }} />
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════
   SECTION 7 – The Visionary
   ═══════════════════════════════════════════════ */
function TheVisionary({ C }: { C: (typeof THEME)["dark"] }) {
  return (
    <Section className="py-2 md:py-3 lg:py-4 relative">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(27, 22, 16, 0.35), transparent)" }} />

      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <div className="relative overflow-visible">
              <div
                aria-hidden
                className="luxury-image-glow-bg -top-6 -left-6 -right-6 -bottom-6"
              />
              <div className="relative w-full aspect-[4/5] max-h-[600px] luxury-image-frame">
                <div className="absolute inset-0" style={{
                  background: `linear-gradient(160deg, #0A0A0A 0%, #111111 40%, #1B1610 100%), radial-gradient(ellipse at 40% 30%, rgba(214, 207, 199, 0.08), transparent 50%)`,
                }} />
                <Image src="/kynxz-office.png" alt="The Visionary" fill className="object-cover opacity-80 luxury-image-edge-fade" loading="lazy" sizes="(max-width: 768px) 100vw, 50vw" />
                <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${C.bg}, transparent 40%)` }} />
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <p
              className={`${inter.className} text-xs tracking-[0.25em] uppercase`} style={{ color: C.bronze }}>The Visionary</p>

            <h2
              className={`${playfair.className} text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.1]`} style={{ color: C.ivory }}>
              Meet the Founder
            </h2>

            <div className="space-y-6">
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
            </div>

            <div>
              <div className="flex items-center gap-4">
                <span className="block w-12 h-px" style={{ background: C.bronze }} />
                <span className={`${cormorant.className} italic text-lg`} style={{ color: C.champagne }}>C.E.O &amp; Founder</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════
   SECTION 8 – Final CTA
   ═══════════════════════════════════════════════ */
function FinalCTA({ C }: { C: (typeof THEME)["dark"] }) {
  return (
    <Section className="py-3 md:py-4 lg:py-5 relative min-h-[60dvh] flex items-center" style={{ background: C.bgAlt }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse 50% 40% at 50% 50%, rgba(27, 22, 16, 0.3), transparent)` }} />

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 text-center">
        <p
          className={`${inter.className} text-xs tracking-[0.25em] uppercase mb-8`} style={{ color: C.bronze }}>
          Join Our Journey
        </p>

        <h2
          className={`${playfair.className} text-[clamp(2.8rem,9vw,6rem)] font-bold leading-[1.05]`} style={{ color: C.ivory }}>
          Crafted With<br /><span className="italic font-normal" style={{ color: C.champagne }}>Intention</span>
        </h2>

        <p
          className={`${inter.className} mt-8 text-base md:text-lg max-w-xl mx-auto leading-relaxed`} style={{ color: C.muted }}>
          Every piece tells a story. Every creation carries a purpose. Welcome to a world where meaning matters.
        </p>

        <div className="mt-12">
          <Link href="/collections"
            className="group inline-flex items-center gap-3 px-10 py-4 rounded-full border transition-all duration-500 hover:-translate-y-1"
            style={{ borderColor: C.champagne, color: C.ivory, background: "rgba(214, 207, 199, 0.04)" }}>
            <span className={`${inter.className} text-sm tracking-[0.15em] uppercase`}>Explore Collections</span>
            <span className="text-lg inline-block transition-transform duration-300 group-hover:translate-x-1" style={{ color: C.champagne }}>&rarr;</span>
          </Link>
        </div>

        <div
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

        {/* Background transition: bg → bgAlt */}
        <div aria-hidden className="h-5 lg:h-6 w-full pointer-events-none" style={{ background: `linear-gradient(to bottom, ${C.bg}, ${C.bgAlt})` }} />

        <SectionLazy>
          <DreamWall C={C} />
        </SectionLazy>

        {/* Background transition: bgAlt → bg */}
        <div aria-hidden className="h-5 lg:h-6 w-full pointer-events-none" style={{ background: `linear-gradient(to bottom, ${C.bgAlt}, ${C.bg})` }} />

        <SectionLazy>
          <ValuesSection C={C} />
        </SectionLazy>

        {/* Background transition: bg → bgAlt */}
        <div aria-hidden className="h-5 lg:h-6 w-full pointer-events-none" style={{ background: `linear-gradient(to bottom, ${C.bg}, ${C.bgAlt})` }} />

        <SectionLazy>
          <VisionOfTomorrow C={C} />
        </SectionLazy>

        {/* Background transition: bgAlt → bg */}
        <div aria-hidden className="h-5 lg:h-6 w-full pointer-events-none" style={{ background: `linear-gradient(to bottom, ${C.bgAlt}, ${C.bg})` }} />

        <SectionLazy>
          <TheVisionary C={C} />
        </SectionLazy>

        {/* Background transition: bg → bgAlt */}
        <div aria-hidden className="h-5 lg:h-6 w-full pointer-events-none" style={{ background: `linear-gradient(to bottom, ${C.bg}, ${C.bgAlt})` }} />

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
