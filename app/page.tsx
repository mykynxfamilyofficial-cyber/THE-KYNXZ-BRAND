import dynamic from "next/dynamic";
import Header from "./components/Header";
import HeroClientFX from "./components/HeroClientFX";
import HomeParticles from "./components/HomeParticles";
import SectionLazy from "./components/SectionLazy";

// Dynamic imports for heavy sections below the fold
const PhilosophySection = dynamic(() => import("./components/PhilosophySection"), {
  loading: () => <div className="h-40" />,
});
const CollectionsSection = dynamic(() => import("./components/CollectionsSection"), {
  loading: () => <div className="h-40" />,
});
const FeaturedProductsSection = dynamic(() => import("./components/FeaturedProductsSection"), {
  loading: () => <div className="h-48" />,
});
const ExperienceSection = dynamic(() => import("./components/ExperienceSection"), {
  loading: () => <div className="h-40" />,
});
const WorldwideSection = dynamic(() => import("./components/WorldwideSection"), {
  loading: () => <div className="h-40" />,
});
const WorldSection = dynamic(() => import("./components/WorldSection"), {
  loading: () => <div className="h-40" />,
});
const WhySection = dynamic(() => import("./components/WhySection"), {
  loading: () => <div className="h-40" />,
});
const CTASection = dynamic(() => import("./components/CTASection"), {
  loading: () => <div className="h-32" />,
});
const ContactSection = dynamic(() => import("./components/ContactSection"), {
  loading: () => <div className="h-48" />,
});
const NewsletterSection = dynamic(() => import("./components/NewsletterSection"), {
  loading: () => <div className="h-32" />,
});
const FooterSection = dynamic(() => import("./components/FooterSection"), {
  loading: () => <div className="h-24" />,
});

export default function Home() {
  return (
    <>
      <Header />

      <main id="main-content" role="main" aria-label="Main content" className="relative">
        <HomeParticles />

        <div className="light-home-page relative min-h-[100dvh] flex items-center justify-center overflow-hidden pt-12 md:pt-16 pb-4 md:pb-5">
          <HeroClientFX />

          <div aria-hidden className="hero-geo-ring absolute w-[320px] h-[320px] top-[12%] left-[5%] border-[var(--color-accent)]/8 dark:border-[var(--color-accent)]/10" style={{ animation: "heroGeoFloat1 30s ease-in-out infinite" }} />
          <div aria-hidden className="hero-geo-ring absolute w-[240px] h-[240px] bottom-[18%] right-[6%] border-[var(--color-accent)]/6 dark:border-[var(--color-accent)]/8" style={{ animation: "heroGeoFloat2 38s ease-in-out infinite", animationDelay: "-8s" }} />
          <div aria-hidden className="hero-geo-ring absolute w-[180px] h-[180px] top-[35%] right-[12%] border-[var(--color-accent)]/5 dark:border-[var(--color-accent)]/6" style={{ animation: "heroGeoFloat1 42s ease-in-out infinite", animationDelay: "-15s", borderRadius: "40% 60% 42% 58% / 48% 38% 62% 52%" }} />
          <div aria-hidden className="hero-geo-ring absolute w-[140px] h-[140px] bottom-[30%] left-[8%] border-[var(--color-accent)]/4 dark:border-[var(--color-accent)]/5" style={{ animation: "heroGeoFloat2 35s ease-in-out infinite", animationDelay: "-5s", borderRadius: "55% 45% 60% 40% / 45% 55% 45% 55%" }} />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-100 dark:opacity-0 transition-opacity duration-700"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#F6F5F2]/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#F3F1EC]/40" />
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#F6F5F2]/80 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F6F5F2]/80 to-transparent" />
        </div>

        <div className="home-hero-content relative text-center px-6 sm:px-12">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 opacity-100 dark:opacity-0 transition-opacity duration-700"
          >
            <div className="absolute left-1/2 top-1/2 h-[800px] w-[1400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,#F3F1EC/50,transparent)] blur-3xl" />
            <div className="absolute left-1/4 top-0 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle_at_center,#EDE9E2/35,transparent)] blur-2xl" />
            <div className="absolute right-1/4 bottom-0 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_at_center,#F6F5F3/30,transparent)] blur-2xl" />
          </div>

          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/3 rounded-full
            opacity-0 dark:opacity-100 transition-opacity duration-700
            h-[400px] w-[1000px] bg-[radial-gradient(circle_at_center,rgba(212,168,79,0.15),rgba(212,168,79,0.05),transparent)] blur-3xl"
          />

          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/3 rounded-full
            opacity-100 dark:opacity-0 transition-opacity duration-700
            h-[380px] w-[980px] bg-[radial-gradient(circle_at_center,#F6F5F2/65,#EDE9E2/40,transparent)] blur-3xl"
          />

          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/4 rounded-full
            opacity-100 dark:opacity-0 transition-opacity duration-700
            h-[520px] w-[1320px] bg-[radial-gradient(circle_at_center,rgba(139,115,85,0.07),rgba(139,115,85,0.02),transparent)] blur-3xl"
          />

          <p className="home-hero-eyebrow relative z-10 luxury-text text-sm tracking-[0.22em] opacity-80 text-[#3A3A3A] dark:opacity-100">
            KYNXZ EDITION
          </p>

          <h1 className="home-hero-heading relative z-10 mt-6 text-5xl sm:text-6xl md:text-6xl lg:text-7xl font-semibold tracking-[0.15em] leading-[1.02]
            text-[#111111] dark:text-white/95
            [text-shadow:0_1px_0_rgba(0,0,0,0.08)] dark:[text-shadow:0_2px_0_rgba(255,255,255,0.12)]">
            THE KYNXZ BRAND
          </h1>

          <p className="home-hero-description relative z-10 mt-6 text-base sm:text-lg opacity-85 max-w-2xl mx-auto leading-relaxed
            text-[#2A2A2A] dark:text-white/90 dark:opacity-90
            [text-shadow:0_1px_0_rgba(0,0,0,0.05)] dark:[text-shadow:0_1px_0_rgba(255,255,255,0.08)]">
            Premium Living. Timeless Trust.
            <br />
            Excellence Without Compromise.
          </p>

          <div className="home-hero-actions relative z-10 mt-10 flex flex-col sm:flex-row gap-4 sm:gap-5 items-center justify-center">
            <a
              href="#"
              className="home-hero-primary-cta group inline-flex items-center justify-center rounded-full border px-7 py-3 text-sm sm:text-base tracking-[0.08em] backdrop-blur transition-all duration-300 hover:-translate-y-0.5

              border-[#111111]/40 bg-[#F6F5F2]/80 text-[#111111]
              hover:bg-[#EDE9E2] hover:text-[#000000] hover:border-[#000000]/60 hover:shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_20px_60px_rgba(139,115,85,0.12)]

              dark:border-white/20 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10 dark:hover:border-white/35"
            >
              <span className="relative mr-2">
                <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-[var(--color-accent)]/30 via-white/20 to-[var(--color-accent)]/30 blur-[10px]" aria-hidden />
                <span className="relative">Explore Brand</span>
              </span>

              <span
                aria-hidden
                className="h-2 w-2 rounded-full bg-current opacity-80"
              />
            </a>

            <a
              href="#"
              className="home-hero-secondary-cta inline-flex items-center justify-center rounded-full
              border-[#111111]/35 bg-white/95 text-black
              hover:bg-[#F6F5F2] hover:shadow-[0_18px_60px_rgba(0,0,0,0.10),0_0_40px_rgba(139,115,85,0.08)]

              dark:bg-white/90 dark:text-black dark:hover:bg-white/100 dark:hover:text-white/90
              px-7 py-3 text-sm sm:text-base tracking-[0.08em] transition-transform duration-300 hover:-translate-y-0.5"
            >
              Discover More
            </a>

          </div>
          <div className="home-hero-stats relative z-10 mt-6 sm:mt-8 md:mt-10 flex flex-col sm:flex-row items-center justify-center gap-y-2 sm:gap-0"
          >
            <div className="home-hero-stat-item flex flex-col items-center px-2 sm:px-3 md:px-10 lg:px-14">
              <span              className="home-hero-stat-label text-[10px] sm:text-[10px] md:text-xs tracking-[0.22em] uppercase font-semibold leading-snug text-center">
                Timeless Design
              </span>
            </div>

            <div aria-hidden className="home-hero-stat-divider h-8 w-px hidden sm:block" />

            <div className="home-hero-stat-item flex flex-col items-center px-2 sm:px-3 md:px-10 lg:px-14">
              <span              className="home-hero-stat-label text-[10px] sm:text-[10px] md:text-xs tracking-[0.22em] uppercase font-semibold leading-snug text-center">
                Premium Quality
              </span>
            </div>

            <div aria-hidden className="home-hero-stat-divider h-8 w-px hidden sm:block" />

            <div className="home-hero-stat-item flex flex-col items-center px-2 sm:px-3 md:px-10 lg:px-14">
              <span              className="home-hero-stat-label text-[10px] sm:text-[10px] md:text-xs tracking-[0.22em] uppercase font-semibold leading-snug text-center">
                Global Vision
              </span>
            </div>
          </div>
        </div>

      </div>

        {/* Below-fold sections lazy-loaded */}
        <SectionLazy>
          <PhilosophySection />
        </SectionLazy>

        <SectionLazy>
          <CollectionsSection />
        </SectionLazy>

        <SectionLazy>
          <FeaturedProductsSection />
        </SectionLazy>

        <SectionLazy>
          <ExperienceSection />
        </SectionLazy>

        <SectionLazy>
          <WorldwideSection />
        </SectionLazy>

        <SectionLazy>
          <WorldSection />
        </SectionLazy>

        <SectionLazy>
          <WhySection />
        </SectionLazy>

        <SectionLazy>
          <CTASection />
        </SectionLazy>

        <SectionLazy>
          <ContactSection />
        </SectionLazy>

        <SectionLazy>
          <NewsletterSection />
        </SectionLazy>
      </main>

      <SectionLazy placeholder="100px">
        <FooterSection />
      </SectionLazy>

    </>
  );
}
