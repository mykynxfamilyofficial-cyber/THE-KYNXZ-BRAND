"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { playfair, cormorant, inter } from "../fonts";
import Header from "../components/Header";
import FooterSection from "../components/FooterSection";

import { useTheme, THEME } from "../hooks/useTheme";
/* ───────────────────────────────────────────────
   Animation variants
   ─────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scaleX: 0 },
  visible: {
    opacity: 1,
    scaleX: 1,
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

/* ───────────────────────────────────────────────
   Return policy content data
   ─────────────────────────────────────────────── */
const lastUpdated = "June 23, 2026";

const sections = [
  {
    id: "return-window",
    title: "Return Window",
    body: (
      <div className="space-y-4">
        <p className="leading-[1.9]">
          We accept returns within{" "}
          <strong className="font-semibold">30 days of delivery</strong>. If
          more than 30 days have passed since your order was delivered,
          unfortunately we cannot offer a refund or exchange.
        </p>
        <p className="leading-[1.9]">
          To be eligible for a return, your item must meet the conditions
          outlined in the following section.
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
          To qualify for a return, items must meet the following criteria:
        </p>
        <ul className="space-y-2 pl-5 list-disc marker:text-[var(--color-accent)]">
          {[
            "Unused and in the same condition as received",
            "In the original packaging with all tags and accessories intact",
            "In resalable condition without any signs of wear, damage, or alteration",
            "Proof of purchase or order number must be provided",
          ].map((item) => (
            <li key={item} className="pl-2 leading-[1.8]">
              {item}
            </li>
          ))}
        </ul>
        <p className="leading-[1.9]">
          We reserve the right to refuse any return that does not meet these
          conditions. If your return is accepted, we will guide you through the
          next steps.
        </p>
      </div>
    ),
  },
  {
    id: "non-returnable-items",
    title: "Non-Returnable Items",
    body: (
      <div className="space-y-4">
        <p className="leading-[1.9]">
          Certain items are not eligible for return due to hygiene, safety, or
          exclusivity reasons. These include:
        </p>
        <ul className="space-y-2 pl-5 list-disc marker:text-[var(--color-accent)]">
          {[
            "Personalized or custom-made items",
            "Intimate products and personal care items",
            "Certain clearance or final sale products",
            "Gift cards and digital products",
            "Items marked as non-returnable at the time of purchase",
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
    id: "refund-process",
    title: "Refund Process",
    body: (
      <div className="space-y-4">
        <p className="leading-[1.9]">
          Once your return is received and inspected, we will notify you of the
          approval or rejection of your refund. If approved, the refund will be
          processed to the original payment method used at checkout.
        </p>
        <p className="leading-[1.9]">
          Refunds are issued for the purchase price of the item only. Original
          shipping costs are non-refundable unless the return is due to our
          error or a defective product.
        </p>
      </div>
    ),
  },
  {
    id: "damaged-incorrect",
    title: "Damaged or Incorrect Items",
    body: (
      <div className="space-y-4">
        <p className="leading-[1.9]">
          If you receive an item that is damaged, defective, or incorrect,
          please contact us immediately. We take every precaution to ensure your
          order arrives in perfect condition, but errors can occur.
        </p>
        <p className="leading-[1.9]">
          Please include your order number, a description of the issue, and
          photographs of any damage so we can resolve the matter as quickly as
          possible. We will cover return shipping costs and send a replacement
          or issue a full refund, including original shipping charges.
        </p>
      </div>
    ),
  },
  {
    id: "exchanges",
    title: "Exchanges",
    body: (
      <div className="space-y-4">
        <p className="leading-[1.9]">
          We offer exchanges for items of equal value, subject to availability.
          To initiate an exchange, please follow the standard return process and
          indicate your preference for an exchange rather than a refund.
        </p>
        <p className="leading-[1.9]">
          Once the returned item is received and inspected, we will ship the
          exchange item at no additional shipping cost. If the requested
          exchange item is out of stock, we will notify you and process a full
          refund instead.
        </p>
      </div>
    ),
  },
  {
    id: "return-shipping",
    title: "Return Shipping",
    body: (
      <div className="space-y-4">
        <p className="leading-[1.9]">
          The customer is responsible for return shipping costs unless the
          return is due to a damaged, defective, or incorrect item received from
          THE KYNXZ BRAND.
        </p>
        <p className="leading-[1.9]">
          We recommend using a trackable shipping method for returns, as we
          cannot guarantee receipt of returned items. We are not responsible for
          items lost or damaged during return transit.
        </p>
      </div>
    ),
  },
  {
    id: "processing-time",
    title: "Processing Time",
    body: (
      <div className="space-y-4">
        <p className="leading-[1.9]">
          Once your return has been received and inspected, refunds are
          processed within{" "}
          <strong className="font-semibold">5 to 10 business days</strong>.
        </p>
        <p className="leading-[1.9]">
          The time it takes for the refund to appear in your account may vary
          depending on your payment provider and financial institution. Please
          allow additional time for the funds to be reflected in your statement.
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
          If you have any questions about our return policy or need assistance
          with a return, please reach out to our team:
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
export default function ReturnPolicyPage() {
  const C = useTheme();

  useEffect(() => {
    document.title = "Return & Refund Policy | THE KYNXZ BRAND";
  }, []);

  return (
    <>
      <Header />

      <main
        role="main"
        aria-label="Return and Refund Policy"
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
              Policies
            </motion.p>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
              className={`${playfair.className} text-[clamp(2.5rem,7vw,5rem)] font-bold leading-[1.08] tracking-[-0.02em]`}
              style={{ color: C.ivory }}
            >
              Return &amp; Refund Policy
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
              &ldquo;Our commitment to excellence extends beyond
              delivery.&rdquo;
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
