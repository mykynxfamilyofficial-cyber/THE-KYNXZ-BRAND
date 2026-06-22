"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { playfair, cormorant, inter } from "../fonts";
import Header from "../components/Header";
import FooterSection from "../components/FooterSection";

/* ───────────────────────────────────────────────
   Theme-aware color tokens
   ─────────────────────────────────────────────── */
const THEME = {
  dark: {
    bg: "#0A0A0A",
    bgAlt: "#111114",
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
    const current = (root.getAttribute("data-theme") as "dark" | "light") || "dark";
    setTheme(current);

    const mo = new MutationObserver(() => {
      const t = (root.getAttribute("data-theme") as "dark" | "light") || "dark";
      setTheme(t);
    });
    mo.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    return () => mo.disconnect();
  }, []);

  return THEME[theme];
}

/* ───────────────────────────────────────────────
   Animation variants
   ─────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scaleX: 0 },
  visible: {
    opacity: 1,
    scaleX: 1,
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ───────────────────────────────────────────────
   Terms content data
   ─────────────────────────────────────────────── */
const lastUpdated = "June 23, 2026";

const sections = [
  {
    id: "acceptance-of-terms",
    title: "Acceptance of Terms",
    body: (
      <div className="space-y-4">
        <p className="leading-[1.9]">
          By accessing or using the THE KYNXZ BRAND website, services, or
          purchasing our products, you agree to be bound by these Terms of
          Service. If you do not agree with any part of these terms, you should
          not use our website or services.
        </p>
        <p className="leading-[1.9]">
          We reserve the right to modify these terms at any time. Continued use
          of our services following any changes constitutes acceptance of the
          updated terms.
        </p>
      </div>
    ),
  },
  {
    id: "eligibility",
    title: "Eligibility",
    body: (
      <div className="space-y-4">
        <p className="leading-[1.9]">
          By using our services, you represent and warrant that:
        </p>
        <ul className="space-y-2 pl-5 list-disc marker:text-[var(--color-accent)]">
          {[
            "You are at least 18 years of age or the age of majority in your jurisdiction",
            "You have the legal capacity to enter into binding agreements",
            "You will provide accurate, current, and complete information during the ordering process",
            "Your use of our services complies with all applicable laws and regulations",
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
    id: "products-services",
    title: "Products & Services",
    body: (
      <div className="space-y-4">
        <p className="leading-[1.9]">
          THE KYNXZ BRAND offers a curated selection of premium lifestyle
          products, including home and living essentials, pet accessories,
          travel goods, and refined lifestyle pieces. Each product is presented
          with care to reflect our commitment to quality and craftsmanship.
        </p>
        <p className="leading-[1.9]">
          We reserve the right to modify, discontinue, or update any product or
          service at any time without prior notice. Product images are for
          illustrative purposes; actual products may vary slightly in appearance.
        </p>
      </div>
    ),
  },
  {
    id: "pricing-availability",
    title: "Pricing & Availability",
    body: (
      <div className="space-y-4">
        <p className="leading-[1.9]">
          All prices are listed in United States Dollars (USD) unless otherwise
          stated. Prices are subject to change without notice. We strive to
          ensure accurate pricing, but errors may occasionally occur.
        </p>
        <p className="leading-[1.9]">
          Product availability is not guaranteed. If an item is out of stock or
          unavailable after you place an order, we will notify you and provide
          a full refund or alternative option.
        </p>
        <p className="leading-[1.9]">
          We reserve the right to limit quantities of any product and to refuse
          or cancel any order at our discretion.
        </p>
      </div>
    ),
  },
  {
    id: "orders-payment",
    title: "Orders & Payment",
    body: (
      <div className="space-y-4">
        <p className="leading-[1.9]">
          When you place an order, you agree to provide accurate and complete
          payment and shipping information. By submitting your order, you
          authorize THE KYNXZ BRAND to charge the provided payment method for
          the total amount shown at checkout.
        </p>
        <p className="leading-[1.9]">
          We accept major credit cards and other payment methods as displayed at
          checkout. All transactions are processed securely through
          PCI-compliant payment partners. Your payment information is encrypted
          and never stored on our servers.
        </p>
        <p className="leading-[1.9]">
          We reserve the right to decline or cancel any order for reasons
          including but not limited to: suspected fraud, inaccurate pricing,
          stock unavailability, or violation of these terms.
        </p>
      </div>
    ),
  },
  {
    id: "shipping-delivery",
    title: "Shipping & Delivery",
    body: (
      <div className="space-y-4">
        <p className="leading-[1.9]">
          We partner with trusted carriers to deliver your orders with care.
          Shipping times and costs vary depending on your location, the
          shipping method selected, and product availability.
        </p>
        <p className="leading-[1.9]">
          Risk of loss and title for products purchased from THE KYNXZ BRAND
          pass to you upon delivery by the carrier. We are not responsible for
          delays caused by carriers, customs, or unforeseen circumstances beyond
          our reasonable control.
        </p>
        <p className="leading-[1.9]">
          International orders may be subject to customs duties, taxes, and
          import fees, which are the responsibility of the customer.
        </p>
      </div>
    ),
  },
  {
    id: "returns-refunds",
    title: "Returns & Refunds",
    body: (
      <div className="space-y-4">
        <p className="leading-[1.9]">
          We want you to love every purchase from THE KYNXZ BRAND. If you are
          not entirely satisfied, please review our return policy, which is
          displayed on our website and included with your order.
        </p>
        <p className="leading-[1.9]">
          Refunds are processed to the original payment method within a
          reasonable timeframe after we receive and inspect the returned item.
          Return shipping costs are the responsibility of the customer unless
          the return is due to our error or a defective product.
        </p>
      </div>
    ),
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    body: (
      <div className="space-y-4">
        <p className="leading-[1.9]">
          <strong>All content, logos, branding, images, designs, text,
          graphics, and materials</strong> on the THE KYNXZ BRAND website are
          the exclusive intellectual property of THE KYNXZ BRAND LLC and are
          protected by applicable copyright, trademark, and intellectual
          property laws.
        </p>
        <p className="leading-[1.9]">
          You may not reproduce, distribute, modify, display, or create
          derivative works from any content on this website without our prior
          written consent. Unauthorized use of our intellectual property may
          result in legal action.
        </p>
      </div>
    ),
  },
  {
    id: "prohibited-activities",
    title: "Prohibited Activities",
    body: (
      <div className="space-y-4">
        <p className="leading-[1.9]">
          When using our website or services, you agree not to:
        </p>
        <ul className="space-y-2 pl-5 list-disc marker:text-[var(--color-accent)]">
          {[
            "Violate any applicable law, regulation, or third-party right",
            "Use our website for any fraudulent or unlawful purpose",
            "Attempt to gain unauthorized access to our systems or accounts",
            "Interfere with the security, functionality, or operation of our website",
            "Submit false, misleading, or inaccurate information",
            "Engage in any activity that could damage, disable, or impair our infrastructure",
            "Use automated tools (bots, scrapers, spiders) without our explicit permission",
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
    id: "limitation-liability",
    title: "Limitation of Liability",
    body: (
      <div className="space-y-4">
        <p className="leading-[1.9]">
          To the fullest extent permitted by applicable law, THE KYNXZ BRAND LLC
          and its affiliates, officers, employees, and agents shall not be liable
          for any indirect, incidental, special, consequential, or punitive
          damages arising from or related to your use of our website, products,
          or services.
        </p>
        <p className="leading-[1.9]">
          Our total liability for any claim arising under these terms shall not
          exceed the amount you paid to us for the product or service giving rise
          to the claim. This limitation applies whether the claim is in contract,
          tort, or any other legal theory.
        </p>
      </div>
    ),
  },
  {
    id: "account-responsibilities",
    title: "Account Responsibilities",
    body: (
      <div className="space-y-4">
        <p className="leading-[1.9]">
          If you create an account on our website, you are responsible for
          maintaining the confidentiality of your account credentials and for
          all activities that occur under your account.
        </p>
        <p className="leading-[1.9]">
          You agree to notify us immediately of any unauthorized use of your
          account. We reserve the right to suspend or terminate accounts that
          violate these terms or engage in suspicious activity.
        </p>
      </div>
    ),
  },
  {
    id: "changes-to-terms",
    title: "Changes to Terms",
    body: (
      <div className="space-y-4">
        <p className="leading-[1.9]">
          We may update these Terms of Service from time to time to reflect
          changes in our practices, legal requirements, or operational needs.
          When we make material changes, we will update the &ldquo;Last
          Updated&rdquo; date at the top of this page.
        </p>
        <p className="leading-[1.9]">
          Your continued use of our website and services after any changes
          constitutes acceptance of the updated terms. We encourage you to
          review these terms periodically.
        </p>
      </div>
    ),
  },
  {
    id: "governing-law",
    title: "Governing Law",
    body: (
      <div className="space-y-4">
        <p className="leading-[1.9]">
          These Terms of Service are governed by the laws of the State of
          Wyoming, United States of America, without regard to its conflict of law
          provisions.
        </p>
        <p className="leading-[1.9]">
          Any disputes arising from or related to these terms or your use of our
          services shall be resolved exclusively in the courts located in
          Sheridan County, Wyoming. You consent to the personal jurisdiction of
          such courts.
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
          If you have any questions, concerns, or requests regarding these Terms
          of Service, please contact us:
        </p>
        <div
          className="mt-6 p-6 md:p-8 rounded-[2px] space-y-3"
          style={{
            background: "rgba(214, 207, 199, 0.04)",
            border: "1px solid rgba(214, 207, 199, 0.08)",
          }}
        >
          <p className="text-sm md:text-base font-semibold tracking-[0.08em]" style={{ color: "var(--color-accent)" }}>
            THE KYNXZ BRAND LLC
          </p>
          <p className="text-sm md:text-base leading-[1.8]" style={{ color: "var(--color-text-muted)" }}>
            Sheridan, Wyoming, USA
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
function TermsSection({
  section,
  index,
  C,
}: {
  section: (typeof sections)[0];
  index: number;
  C: (typeof THEME)["dark"];
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.section
      ref={ref}
      id={section.id}
      variants={fadeUp}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      custom={Math.min(index, 4)}
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
        <motion.div
          variants={scaleIn}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          aria-hidden
          className="my-12 md:my-16 h-px w-full max-w-3xl"
          style={{
            background:
              "linear-gradient(to right, var(--color-accent), transparent)",
            opacity: 0.12,
          }}
        />
      )}
    </motion.section>
  );
}

/* ═══════════════════════════════════════════════
   PAGE COMPOSITION
   ═══════════════════════════════════════════════ */
export default function TermsOfServicePage() {
  const C = useThemeColors();

  useEffect(() => {
    document.title = "Terms of Service | THE KYNXZ BRAND";
  }, []);

  return (
    <>
      <Header />

      <main
        role="main"
        aria-label="Terms of Service"
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
                radial-gradient(ellipse 40% 30% at 50% 20%, rgba(139, 115, 85, 0.03), transparent 50%)
              `,
            }}
          />

          {/* Floating abstract shapes */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div
              animate={{ y: [0, -20, 0], opacity: [0.03, 0.06, 0.03] }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[15%] right-[10%] w-[300px] h-[300px] rounded-full"
              style={{
                background: "radial-gradient(circle at center, #D6CFC7, transparent 65%)",
                filter: "blur(70px)",
              }}
            />
            <motion.div
              animate={{ y: [0, 15, 0], opacity: [0.02, 0.05, 0.02] }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 3 }}
              className="absolute bottom-[20%] left-[8%] w-[250px] h-[250px] rounded-full"
              style={{
                background: "radial-gradient(circle at center, #8B7355, transparent 60%)",
                filter: "blur(60px)",
              }}
            />
          </div>

          <div className="relative z-10 max-w-[900px] mx-auto px-6 text-center">
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
              className={`${inter.className} text-xs tracking-[0.25em] uppercase mb-6`}
              style={{ color: C.bronze }}
            >
              Legal
            </motion.p>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
              className={`${playfair.className} text-[clamp(2.5rem,7vw,5rem)] font-bold leading-[1.08] tracking-[-0.02em]`}
              style={{ color: C.ivory }}
            >
              Terms of Service
            </motion.h1>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="mx-auto mt-6 w-16 h-px"
              style={{ background: C.bronze }}
            />

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={3}
              className={`${cormorant.className} italic text-lg md:text-xl mt-8 max-w-2xl mx-auto leading-[1.6]`}
              style={{ color: C.muted }}
            >
              &ldquo;These terms govern your access to and use of THE KYNXZ
              BRAND website and services.&rdquo;
            </motion.p>

            {/* Last Updated */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={4}
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
            </motion.div>
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
              <TermsSection
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
