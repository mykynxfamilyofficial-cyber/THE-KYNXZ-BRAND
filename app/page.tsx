import dynamic from "next/dynamic";
import Header from "./components/Header";
import HeroCarousel from "./components/HeroCarousel";
import BestSellersSection from "./components/BestSellersSection";

import SectionLazy from "./components/SectionLazy";

// Dynamic imports for heavy sections below the fold
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

        <div className="light-home-page relative min-h-svh overflow-hidden pt-16 md:pt-20">
          {/* Hero carousel — positioned below the header in natural layout flow */}
          <HeroCarousel />

          {/* Best Sellers section — flows naturally below the hero */}
          <BestSellersSection />
        </div>

        {/* Below-fold sections lazy-loaded */}
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
