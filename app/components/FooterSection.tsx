"use client";

import { useRef, useEffect, useState, useCallback } from "react";

/* ───────────────────────────────────────────────
   Static navigation data — hoisted outside component
   ─────────────────────────────────────────────── */
const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/mission", label: "Mission" },
  { href: "/collections", label: "Collections" },
  { href: "/contact", label: "Contact" },
];

const legalLinks = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-of-service", label: "Terms of Service" },
  { href: "/shipping-policy", label: "Shipping Policy" },
  { href: "/return-policy", label: "Return & Refund Policy" },
];

const collections = [
  { href: "/collections", label: "Home & Living" },
  { href: "/collections", label: "Pet Essentials" },
  { href: "/collections", label: "Travel" },
  { href: "/collections", label: "Lifestyle" },
  { href: "/collections", label: "Accessories" },
];

// Static SVG icons as string constants to avoid JSX re-creation
const SOCIAL_ICONS = {
  instagram: <svg key="ig" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>,
  facebook: <svg key="fb" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>,
  twitter: <svg key="tw" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46L20 4" /></svg>,
  linkedin: <svg key="li" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>,
  youtube: <svg key="yt" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" /><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" /></svg>,
};

const socialLinks = [
  { href: "#", label: "Instagram", icon: SOCIAL_ICONS.instagram },
  { href: "#", label: "Facebook", icon: SOCIAL_ICONS.facebook },
  { href: "#", label: "X (Twitter)", icon: SOCIAL_ICONS.twitter },
  { href: "#", label: "LinkedIn", icon: SOCIAL_ICONS.linkedin },
  { href: "#", label: "YouTube", icon: SOCIAL_ICONS.youtube },
];

// Hoist stable values outside component to avoid re-computation
const CURRENT_YEAR = new Date().getFullYear();

/* ═══════════════════════════════════════════════
   FooterSection
   ═══════════════════════════════════════════════ */
export default function FooterSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Single optimized IntersectionObserver — disconnect after first trigger for perf
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Memoized scroll handler
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <footer
      ref={sectionRef}
      className="kynxz-footer relative overflow-hidden"
    >
      {/* Gradient bridge from above section */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-10 lg:h-12 -translate-y-full pointer-events-none z-10"
        style={{
          background: "linear-gradient(to bottom, transparent, var(--color-background-alt))",
        }}
      />

      {/* Section background accent glow — dark theme */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/4 rounded-full
        opacity-0 data-[theme=dark]:opacity-100 transition-opacity duration-700
        h-[500px] w-[1200px] bg-[radial-gradient(circle_at_center,rgba(212,168,79,0.04),rgba(212,168,79,0.008),transparent)] blur-3xl"
        data-theme="dark"
      />

      {/* Section background accent glow — light theme */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/4 rounded-full
        opacity-0 data-[theme=light]:opacity-100 transition-opacity duration-700
        h-[450px] w-[1100px] bg-[radial-gradient(circle_at_center,#EDE9E2/30,#F3F1EC/15,transparent)] blur-3xl"
        data-theme="light"
      />

      <div className="luxury-container relative z-10 pt-4 pb-2 md:pt-5 md:pb-3 lg:pt-6 lg:pb-4">
        {/* ════════════════════════════════════════
            Main footer grid — 5 columns
            ════════════════════════════════════════ */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-10 lg:gap-8 transition-all duration-900 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{
            transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          {/* ── Column 1: Brand ── */}
          <div
            className="transition-all duration-800 sm:col-span-2 lg:col-span-1"
            style={{
              transitionDelay: "100ms",
              transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            <h3
              className="text-sm font-semibold uppercase tracking-[0.25em] mb-5"
              style={{ color: "var(--color-accent)" }}
            >
              THE KYNXZ BRAND
            </h3>
            <p
              className="text-sm leading-[1.8] max-w-xs"
              style={{ color: "var(--color-text-muted)" }}
            >
              A world of timeless elegance, uncompromising quality, and
              refined living, crafted for those who demand the extraordinary.
            </p>
            <div
              aria-hidden
              className="mt-6 h-px w-16"
              style={{ background: "var(--color-accent)" }}
            />
          </div>

          {/* ── Column 2: Quick Links ── */}
          <div
            className="transition-all duration-800"
            style={{
              transitionDelay: "220ms",
              transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            <h4
              className="text-xs font-semibold uppercase tracking-[0.22em] mb-5"
              style={{ color: "var(--color-text-primary)" }}
            >
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="footer-link group inline-block text-sm transition-all duration-300 hover:translate-x-1"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    <span className="relative">
                      {link.label}
                      <span
                        aria-hidden
                        className="absolute -bottom-px left-0 right-0 h-px origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
                        style={{ background: "var(--color-accent)" }}
                      />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Column 3: Legal ── */}
          <div
            className="transition-all duration-800"
            style={{
              transitionDelay: "340ms",
              transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            <h4
              className="text-xs font-semibold uppercase tracking-[0.22em] mb-5"
              style={{ color: "var(--color-text-primary)" }}
            >
              Legal
            </h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="footer-link group inline-block text-sm transition-all duration-300 hover:translate-x-1"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    <span className="relative">
                      {link.label}
                      <span
                        aria-hidden
                        className="absolute -bottom-px left-0 right-0 h-px origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
                        style={{ background: "var(--color-accent)" }}
                      />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Column 4: Collections ── */}
          <div
            className="transition-all duration-800"
            style={{
              transitionDelay: "460ms",
              transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            <h4
              className="text-xs font-semibold uppercase tracking-[0.22em] mb-5"
              style={{ color: "var(--color-text-primary)" }}
            >
              Collections
            </h4>
            <ul className="space-y-3">
              {collections.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="footer-link group inline-block text-sm transition-all duration-300 hover:translate-x-1"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    <span className="relative">
                      {link.label}
                      <span
                        aria-hidden
                        className="absolute -bottom-px left-0 right-0 h-px origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
                        style={{ background: "var(--color-accent)" }}
                      />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Column 5: Connect ── */}
          <div
            className="transition-all duration-800"
            style={{
              transitionDelay: "580ms",
              transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            <h4
              className="text-xs font-semibold uppercase tracking-[0.22em] mb-5"
              style={{ color: "var(--color-text-primary)" }}
            >
              Connect
            </h4>
            <ul className="space-y-3.5">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="footer-link group inline-flex items-center gap-3 text-sm transition-all duration-300 hover:translate-x-1"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    <span
                      aria-hidden
                      className="inline-flex items-center justify-center w-4 h-4 transition-colors duration-300 group-hover:text-[var(--color-accent)]"
                    >
                      {link.icon}
                    </span>
                    <span className="relative">
                      {link.label}
                      <span
                        aria-hidden
                        className="absolute -bottom-px left-0 right-0 h-px origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
                        style={{ background: "var(--color-accent)" }}
                      />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ════════════════════════════════════════
            Our Home In America
            ════════════════════════════════════════ */}
        <div            className={`mt-6 md:mt-8 transition-all duration-900 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{
            transitionDelay: "400ms",
            transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <div
            className="p-5 md:p-6 rounded-[2px] max-w-xl"
            style={{
              background: "rgba(214, 207, 199, 0.03)",
              border: "1px solid rgba(214, 207, 199, 0.06)",
            }}
          >
            <p
              className="text-[10px] uppercase tracking-[0.2em] font-semibold mb-3"
              style={{ color: "var(--color-accent)" }}
            >
              Our Office In America
            </p>
            <div
              className="text-xs leading-[1.9]"
              style={{ color: "var(--color-text-muted)" }}
            >
              <p className="font-medium" style={{ color: "var(--color-text-primary)" }}>
                THE KYNXZ BRAND LLC
              </p>
              
              <p>30 N Gould St, Ste R</p>
              <p>Sheridan, Wyoming 82801-6317</p>
              <p>United States of America</p>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════
            Gold divider
            ════════════════════════════════════════ */}
        <div
          aria-hidden
          className={`w-full h-px mt-6 mb-4 md:mt-8 md:mb-4 transition-all duration-900 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background:
              "linear-gradient(to right, transparent, var(--color-accent), transparent)",
            transitionDelay: "650ms",
            transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />

        {/* ════════════════════════════════════════
            Brand statement
            ════════════════════════════════════════ */}
        <div
          className={`text-center transition-all duration-900 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{
            transitionDelay: "720ms",
            transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <p
            className="text-sm md:text-base tracking-[0.08em] italic font-light"
            style={{ color: "var(--color-accent)" }}
          >
            &ldquo;Crafting Meaning Beyond Commerce.&rdquo;
          </p>
        </div>

        {/* ════════════════════════════════════════
            Bottom bar
            ════════════════════════════════════════ */}
        <div
          className={`flex flex-col md:flex-row items-center justify-between gap-4 mt-6 transition-all duration-900 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{
            transitionDelay: "800ms",
            transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <p
            className="text-[11px] tracking-[0.1em] text-center md:text-left"
            style={{ color: "var(--color-text-muted)" }}
          >
            &copy; {CURRENT_YEAR} THE KYNXZ BRAND LLC. All rights
            reserved.
          </p>

          <button
            type="button"
            className="footer-link text-[11px] uppercase tracking-[0.15em] transition-all duration-300 hover:text-[var(--color-accent)]"
            style={{ color: "var(--color-text-muted)" }}
            onClick={scrollToTop}
          >
            Back to Top
          </button>
        </div>
      </div>
    </footer>
  );
}
