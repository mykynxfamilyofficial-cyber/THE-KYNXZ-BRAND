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
   Shipping policy data
   ─────────────────────────────────────────────── */
const lastUpdated = "June 23, 2026";

const sections = [
  {
    id: "order-processing",
    title: "Order Processing Time",
    body: (
      <div className="space-y-4">
        <p className="leading-[1.9]">
          At THE KYNXZ BRAND, we prepare every order with care and attention to
          detail. Orders are typically processed within{" "}
          <strong className="font-semibold">1 to 3 business days</strong> after
          payment confirmation.
        </p>
        <p className="leading-[1.9]">
          During peak seasons, promotional periods, or limited-edition releases,
          processing times may be slightly extended. You will be notified of any
          significant delays.
        </p>
      </div>
    ),
  },
  {
    id: "delivery-times",
    title: "Estimated Delivery Times",
    body: (
      <div className="space-y-4">
        <p className="leading-[1.9]">
          Delivery times begin once the order has been processed and handed to
          our shipping partner. Estimated transit times are as follows:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div
            className="p-5 rounded-[2px]"
            style={{
              background: "rgba(214, 207, 199, 0.04)",
              border: "1px solid rgba(214, 207, 199, 0.08)",
            }}
          >
            <p
              className="text-xs uppercase tracking-[0.2em] mb-2 font-semibold"
              style={{ color: "var(--color-accent)" }}
            >
              Domestic (USA)
            </p>
            <p className="text-lg leading-[1.4]" style={{ color: "var(--color-text-primary)" }}>
              3–7 business days
            </p>
          </div>
          <div
            className="p-5 rounded-[2px]"
            style={{
              background: "rgba(214, 207, 199, 0.04)",
              border: "1px solid rgba(214, 207, 199, 0.08)",
            }}
          >
            <p
              className="text-xs uppercase tracking-[0.2em] mb-2 font-semibold"
              style={{ color: "var(--color-accent)" }}
            >
              International
            </p>
            <p className="text-lg leading-[1.4]" style={{ color: "var(--color-text-primary)" }}>
              7–15 business days
            </p>
          </div>
        </div>
        <p className="leading-[1.9]">
          These estimates are based on standard shipping options and may vary
          depending on destination, carrier capacity, and local conditions.
        </p>
      </div>
    ),
  },
  {
    id: "shipping-costs",
    title: "Shipping Costs",
    body: (
      <div className="space-y-4">
        <p className="leading-[1.9]">
          Shipping costs are calculated dynamically during checkout based on
          your location, the weight and dimensions of your order, and the
          shipping method selected.
        </p>
        <p className="leading-[1.9]">
          Applicable shipping fees will be displayed clearly before you complete
          your purchase. We may offer free shipping promotions on qualifying
          orders from time to time.
        </p>
      </div>
    ),
  },
  {
    id: "order-tracking",
    title: "Order Tracking",
    body: (
      <div className="space-y-4">
        <p className="leading-[1.9]">
          We believe in keeping you informed every step of the way. Whenever
          tracking is available from our shipping partner, you will receive a
          tracking number and link via email to monitor your order&rsquo;s
          journey.
        </p>
        <p className="leading-[1.9]">
          Please note that tracking information may take up to 48 hours to
          appear after the order has been shipped. If you have not received
          tracking details within this timeframe, please contact our support
          team.
        </p>
      </div>
    ),
  },
  {
    id: "customs-duties",
    title: "Customs & Duties",
    body: (
      <div className="space-y-4">
        <p className="leading-[1.9]">
          For international orders, the recipient is responsible for any
          applicable customs duties, import taxes, brokerage fees, or other
          charges imposed by the destination country.
        </p>
        <p className="leading-[1.9]">
          These fees are determined by local customs authorities and are beyond
          our control. We recommend contacting your local customs office for
          estimated charges before placing an international order.
        </p>
      </div>
    ),
  },
  {
    id: "delays",
    title: "Delays",
    body: (
      <div className="space-y-4">
        <p className="leading-[1.9]">
          While we strive to meet our estimated delivery windows, unexpected
          delays may occur due to factors beyond our control, including:
        </p>
        <ul className="space-y-2 pl-5 list-disc marker:text-[var(--color-accent)]">
          {[
            "Logistics partner capacity and routing changes",
            "Severe weather conditions or natural events",
            "Customs processing and inspections",
            "Peak holiday seasons or high-volume periods",
            "Public health emergencies or regulatory changes",
          ].map((item) => (
            <li key={item} className="pl-2 leading-[1.8]">
              {item}
            </li>
          ))}
        </ul>
        <p className="leading-[1.9]">
          We will make every effort to communicate any significant delays and
          keep you updated on your order&rsquo;s status.
        </p>
      </div>
    ),
  },
  {
    id: "lost-damaged",
    title: "Lost or Damaged Packages",
    body: (
      <div className="space-y-4">
        <p className="leading-[1.9]">
          Every shipment from THE KYNXZ BRAND is packaged with premium materials
          to ensure its safe arrival. However, if your package arrives damaged
          or is lost in transit, please contact us immediately.
        </p>
        <p className="leading-[1.9]">
          For damaged items, please retain the original packaging and provide
          photographs of the damage so we can file a claim with the carrier and
          arrange a resolution. We will work with you to ensure a satisfactory
            outcome.
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
          If you have any questions or concerns regarding our shipping policy
          or a specific order, please do not hesitate to reach out:
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
export default function ShippingPolicyPage() {
  const C = useThemeColors();

  useEffect(() => {
    document.title = "Shipping Policy | THE KYNXZ BRAND";
  }, []);

  return (
    <>
      <Header />

      <main
        role="main"
        aria-label="Shipping Policy"
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
              Shipping Policy
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
              &ldquo;Delivering THE KYNXZ BRAND experience with care and
              precision.&rdquo;
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
