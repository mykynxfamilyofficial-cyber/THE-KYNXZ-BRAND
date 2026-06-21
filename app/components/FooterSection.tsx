"use client";

import { useEffect, useRef, useState } from "react";

const quickLinks = [
  { href: "#", label: "Home" },
  { href: "#", label: "About Us" },
  { href: "#", label: "Mission" },
  { href: "#", label: "Categories" },
  { href: "#", label: "Contact" },
];

const collections = [
  { href: "#", label: "Home & Living" },
  { href: "#", label: "Pet Essentials" },
  { href: "#", label: "Travel" },
  { href: "#", label: "Lifestyle" },
  { href: "#", label: "Accessories" },
];

const connectLinks = [
  { href: "#", label: "Instagram" },
  { href: "#", label: "Facebook" },
  { href: "#", label: "Twitter / X" },
  { href: "#", label: "LinkedIn" },
  { href: "#", label: "YouTube" },
];

export default function FooterSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.05, rootMargin: "0px 0px -40px 0px" }
    );
    const el = sectionRef.current;
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={sectionRef}
      className="kynxz-footer relative overflow-hidden"
    >
      {/* Gradient bridge from CTA section */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-20 lg:h-24 -translate-y-full pointer-events-none z-10"
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

      <div className="luxury-container relative z-10 pt-12 pb-6 md:pt-16 md:pb-8 lg:pt-20 lg:pb-10">
        {/* Main footer grid — 4 columns */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12 transition-all duration-900 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{
            transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          {/* Column 1: Brand */}
          <div
            className="transition-all duration-800"
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
              refined living — crafted for those who demand the extraordinary.
            </p>
            {/* Gold accent line */}
            <div
              aria-hidden
              className="mt-6 h-px w-16"
              style={{ background: "var(--color-accent)" }}
            />
          </div>

          {/* Column 2: Quick Links */}
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
                    style={{
                      color: "var(--color-text-muted)",
                    }}
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

          {/* Column 3: Collections */}
          <div
            className="transition-all duration-800"
            style={{
              transitionDelay: "360ms",
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
                    style={{
                      color: "var(--color-text-muted)",
                    }}
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

          {/* Column 4: Connect */}
          <div
            className="transition-all duration-800"
            style={{
              transitionDelay: "500ms",
              transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            <h4
              className="text-xs font-semibold uppercase tracking-[0.22em] mb-5"
              style={{ color: "var(--color-text-primary)" }}
            >
              Connect
            </h4>
            <ul className="space-y-3">
              {connectLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="footer-link group inline-flex items-center text-sm transition-all duration-300 hover:translate-x-1"
                    style={{
                      color: "var(--color-text-muted)",
                    }}
                  >
                    <span className="relative">
                      {link.label}
                      <span
                        aria-hidden
                        className="absolute -bottom-px left-0 right-0 h-px origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
                        style={{ background: "var(--color-accent)" }}
                      />
                    </span>
                    {/* External arrow icon */}
                    <svg
                      aria-hidden
                      className="ml-1.5 h-3 w-3 opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-60 group-hover:translate-x-0"
                      viewBox="0 0 12 12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 9L9 3" />
                      <path d="M5 3H9V7" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Gold divider line */}
        <div
          aria-hidden
          className={`w-full h-px mt-10 mb-6 md:mt-12 md:mb-8 transition-all duration-900 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background:
              "linear-gradient(to right, transparent, var(--color-accent), transparent)",
            transitionDelay: "600ms",
            transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />

        {/* Bottom bar */}
        <div
          className={`flex flex-col md:flex-row items-center justify-between gap-3 transition-all duration-900 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{
            transitionDelay: "700ms",
            transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <p
            className="text-xs tracking-[0.1em] text-center md:text-left"
            style={{ color: "var(--color-text-muted)" }}
          >
            &copy; {new Date().getFullYear()} THE KYNXZ BRAND. All rights
            reserved.
          </p>

          <div className="flex items-center gap-6">
            <a
              href="#"
              className="footer-link text-xs uppercase tracking-[0.15em] transition-all duration-300"
              style={{ color: "var(--color-text-muted)" }}
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="footer-link text-xs uppercase tracking-[0.15em] transition-all duration-300"
              style={{ color: "var(--color-text-muted)" }}
            >
              Terms of Service
            </a>
            <button
              type="button"
              className="footer-link text-xs uppercase tracking-[0.15em] transition-all duration-300"
              style={{ color: "var(--color-text-muted)" }}
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
            >
              Back to Top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
