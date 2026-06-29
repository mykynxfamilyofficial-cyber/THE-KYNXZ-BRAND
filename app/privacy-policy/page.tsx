"use client";

import { useEffect } from "react";
import { playfair, cormorant, inter } from "../fonts";
import Header from "../components/Header";
import FooterSection from "../components/FooterSection";

import { useTheme } from "../hooks/useTheme";
import type { ThemeColors } from "../hooks/useTheme";
/* ───────────────────────────────────────────────
   Policy content data
   ─────────────────────────────────────────────── */
const lastUpdated = "June 23, 2026";

const sections = [
  {
    id: "information-we-collect",
    title: "Information We Collect",
    body: (
      <div className="space-y-4">
        <p className="leading-[1.9]">
          We collect information you provide directly to us when you interact
          with THE KYNXZ BRAND, including:
        </p>
        <ul className="space-y-2 pl-5 list-disc marker:text-[var(--color-accent)]">
          {[
            "Name",
            "Email address",
            "Shipping and billing address",
            "Phone number",
            "Payment information (processed securely through trusted payment partners)",
            "Device and browsing information collected through cookies and similar technologies",
          ].map((item) => (
            <li key={item} className="pl-2 leading-[1.8]">
              {item}
            </li>
          ))}
        </ul>
      </div>
    ),
  },
  {
    id: "how-we-use-information",
    title: "How We Use Information",
    body: (
      <div className="space-y-4">
        <p className="leading-[1.9]">
          The information we collect is used solely to serve you better and
          improve your experience with THE KYNXZ BRAND:
        </p>
        <ul className="space-y-2 pl-5 list-disc marker:text-[var(--color-accent)]">
          {[
            "Order fulfillment and shipping",
            "Customer support and communication",
            "Website improvement and personalization",
            "Marketing communications (with your consent)",
            "Fraud prevention and security",
          ].map((item) => (
            <li key={item} className="pl-2 leading-[1.8]">
              {item}
            </li>
          ))}
        </ul>
      </div>
    ),
  },
  {
    id: "information-sharing",
    title: "Information Sharing",
    body: (
      <div className="space-y-4">
        <p className="leading-[1.9]">
          Your trust is paramount. <strong>THE KYNXZ BRAND LLC never sells your
          personal information</strong> to third parties. We do not rent, trade,
          or share your data for third-party marketing purposes.
        </p>
        <p className="leading-[1.9]">
          We may share information only with trusted service providers who are
          essential to operating our business, including payment processors,
          shipping carriers, and platform infrastructure providers. These
          partners are contractually bound to protect your data and use it solely
          for the services they provide on our behalf.
        </p>
      </div>
    ),
  },
  {
    id: "cookies",
    title: "Cookies & Tracking Technologies",
    body: (
      <div className="space-y-4">
        <p className="leading-[1.9]">
          We use cookies and similar tracking technologies to enhance your
          browsing experience, analyze site traffic, and understand where our
          audience comes from. These technologies may collect information such as
          your IP address, browser type, device identifiers, and pages visited.
        </p>
        <p className="leading-[1.9]">
          You can control cookie preferences through your browser settings.
          Disabling certain cookies may affect the functionality of our website
          and your overall experience.
        </p>
      </div>
    ),
  },
  {
    id: "data-security",
    title: "Data Security",
    body: (
      <div className="space-y-4">
        <p className="leading-[1.9]">
          We implement industry-standard security measures to protect your
          personal information, including encryption (SSL/TLS) for data
          transmitted between your browser and our servers, secure payment
          processing through PCI-compliant partners, and restricted access to
          personal data on a need-to-know basis.
        </p>
        <p className="leading-[1.9]">
          While no method of transmission over the Internet is 100% secure, we
          are committed to protecting your data with the highest standards of
          care and diligence.
        </p>
      </div>
    ),
  },
  {
    id: "customer-rights",
    title: "Customer Rights",
    body: (
      <div className="space-y-4">
        <p className="leading-[1.9]">
          Depending on your jurisdiction, you may have the following rights
          regarding your personal information:
        </p>
        <ul className="space-y-2 pl-5 list-disc marker:text-[var(--color-accent)]">
          {[
            "The right to access the personal data we hold about you",
            "The right to request correction of inaccurate or incomplete data",
            "The right to request deletion of your personal data",
            "The right to restrict or object to processing of your data",
            "The right to data portability",
            "The right to withdraw consent at any time",
          ].map((item) => (
            <li key={item} className="pl-2 leading-[1.8]">
              {item}
            </li>
          ))}
        </ul>
        <p className="leading-[1.9]">
          To exercise any of these rights, please contact us at the email
          address below. We will respond to your request within the timeframe
          required by applicable law.
        </p>
      </div>
    ),
  },
  {
    id: "third-party-services",
    title: "Third-Party Services",
    body: (
      <div className="space-y-4">
        <p className="leading-[1.9]">
          Our website may integrate with third-party services that operate under
          their own privacy policies. These include payment gateways, analytics
          providers, and shipping carriers.
        </p>
        <p className="leading-[1.9]">
          We encourage you to review the privacy policies of any third-party
          services you interact with through our platform. THE KYNXZ BRAND LLC
          is not responsible for the privacy practices of third parties.
        </p>
      </div>
    ),
  },
  {
    id: "policy-updates",
    title: "Policy Updates",
    body: (
      <div className="space-y-4">
        <p className="leading-[1.9]">
          We may update this Privacy Policy from time to time to reflect changes
          in our practices, legal requirements, or operational needs. When we
          make material changes, we will update the &ldquo;Last Updated&rdquo;
          date at the top of this page and may notify you through our website or
          via email.
        </p>
        <p className="leading-[1.9]">
          We encourage you to review this policy periodically to stay informed
          about how we are protecting your information.
        </p>
      </div>
    ),
  },
  {
    id: "contact-information",
    title: "Contact Information",
    body: (
      <div className="space-y-4">
        <p className="leading-[1.9]">
          If you have any questions, concerns, or requests regarding this
          Privacy Policy or our data practices, please contact us:
        </p>
        <div
          className="mt-6 p-6 md:p-8 rounded-[2px] space-y-3 glass-premium"
          style={{
            borderColor: "rgba(214, 207, 199, 0.08)",
          }}
        >
          <p className="text-sm md:text-base font-semibold tracking-[0.08em]" style={{ color: "var(--color-accent)" }}>
            THE KYNXZ BRAND LLC
          </p>
          <p className="text-sm md:text-base leading-[1.8]" style={{ color: "var(--color-text-muted)" }}>
            30 N Gould St Ste R
            <br />
            Sheridan, WY 82801, USA
          </p>
          <p className="text-sm md:text-base leading-[1.8]" style={{ color: "var(--color-text-muted)" }}>
            Email:{" "}
            <a
              href="mailto:support@thekynxzbrand.store"
              className="transition-colors duration-300 hover:text-[var(--color-accent)]"
              style={{ color: "var(--color-accent)" }}
            >
              support@thekynxzbrand.store
            </a>
          </p>
        </div>
      </div>
    ),
  },
];

/* ───────────────────────────────────────────────
   Section Component
   ─────────────────────────────────────────────── */
function PolicySection({
  section,
  index,
  C,
}: {
  section: (typeof sections)[0];
  index: number;
  C: ThemeColors;
}) {
  return (
    <section
      id={section.id}
      className="scroll-mt-28"
    >
      {/* Section number */}

      <div className="flex items-center gap-4 mb-5">
        <span
          className={`${cormorant.className} italic text-sm tracking-[0.05em]`}
          style={{ color: C.bronze }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <div
          aria-hidden
          className="h-px flex-1 max-w-[60px]"
          style={{ background: C.bronze, opacity: 0.3 }}
        />
      </div>

      <h2
        className={`${playfair.className} text-[clamp(1.6rem,4vw,2.4rem)] font-bold leading-[1.15] mb-6`}
        style={{ color: C.ivory }}
      >
        {section.title}
      </h2>

      <div
        className={`${inter.className} text-sm md:text-base leading-[1.9] max-w-3xl`}
        style={{ color: C.muted }}
      >
        {section.body}
      </div>

      {/* Divider */}
      {index < sections.length - 1 && (
        <div
          aria-hidden
          className="my-12 md:my-16 h-px w-full max-w-3xl"
          style={{
            background:
              "linear-gradient(to right, var(--color-accent), transparent)",
            opacity: 0.12,
          }}
        />
      )}
    </section>
  );
}

/* ═══════════════════════════════════════════════
   PAGE COMPOSITION
   ═══════════════════════════════════════════════ */
export default function PrivacyPolicyPage() {
  const C = useTheme();

  useEffect(() => {
    document.title = "Privacy Policy | THE KYNXZ BRAND";
  }, []);

  return (
    <>
      <Header />

      <main
        role="main"
        aria-label="Privacy Policy"
        className={`${inter.variable} ${playfair.variable} ${cormorant.variable}`}
        style={{
          fontFamily: "var(--font-inter), Arial, sans-serif",
          background: C.bg,
        }}
      >
        {/* ════════════════════════════════════════
            Hero Section
            ════════════════════════════════════════ */}
        <section className="relative min-h-[50dvh] md:min-h-[60dvh] flex items-center justify-center overflow-hidden pt-20 md:pt-24 pb-8">
          {/* Soft ambient glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                radial-gradient(ellipse 60% 40% at 50% 40%, rgba(214, 207, 199, 0.04), transparent 55%),
                radial-gradient(ellipse 40% 30% at 50% 20%, rgba(74, 58, 44, 0.03), transparent 50%)
              `,
            }}
          />

          {/* Floating abstract shapes — static */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div
              className="absolute top-[15%] right-[10%] w-[300px] h-[300px] rounded-full opacity-[0.03]"
              style={{
                background: "radial-gradient(circle at center, #D6CFC7, transparent 65%)",
                filter: "blur(70px)",
              }}
            />
            <div
              className="absolute bottom-[20%] left-[8%] w-[250px] h-[250px] rounded-full opacity-[0.02]"
              style={{
                background: "radial-gradient(circle at center, #4A3A2C, transparent 60%)",
                filter: "blur(60px)",
              }}
            />
          </div>

          <div className="relative z-10 max-w-[900px] mx-auto px-6 text-center">
            <p
              className={`${inter.className} text-xs tracking-[0.25em] uppercase mb-6`}
              style={{ color: C.bronze }}
            >
              Legal
            </p>

            <h1
              className={`${playfair.className} text-[clamp(2.5rem,7vw,5rem)] font-bold leading-[1.08] tracking-[-0.02em]`}
              style={{ color: C.ivory }}
            >
              Privacy Policy
            </h1>

            <div
              className="mx-auto mt-6 w-16 h-px"
              style={{ background: C.bronze }}
            />

            <p
              className={`${cormorant.className} italic text-lg md:text-xl mt-8 max-w-2xl mx-auto leading-[1.6]`}
              style={{ color: C.muted }}
            >
              &ldquo;Your trust is fundamental to THE KYNXZ BRAND. We are
              committed to protecting your personal information with integrity
              and transparency.&rdquo;
            </p>

            {/* Last Updated */}
            <div
              className="mt-10 inline-flex items-center gap-2 px-4 py-2 rounded-full"
              style={{
                background: "rgba(214, 207, 199, 0.04)",
                border: "1px solid rgba(214, 207, 199, 0.08)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: C.bronze }}
              />
              <span
                className={`${inter.className} text-[10px] md:text-xs tracking-[0.15em] uppercase`}
                style={{ color: C.muted }}
              >
                Last Updated: {lastUpdated}
              </span>
            </div>
          </div>

          {/* Bottom fade */}
          <div
            className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
            style={{ background: `linear-gradient(to bottom, transparent, ${C.bg})` }}
          />
        </section>

        {/* ════════════════════════════════════════
            Content Sections
            ════════════════════════════════════════ */}
        <div className="max-w-[1200px] mx-auto px-6 pb-20 md:pb-28">
          <div className="max-w-4xl">
            {sections.map((section, i) => (
              <PolicySection
                key={section.id}
                section={section}
                index={i}
                C={C}
              />
            ))}
          </div>
        </div>
      </main>

      <FooterSection />
    </>
  );
}
