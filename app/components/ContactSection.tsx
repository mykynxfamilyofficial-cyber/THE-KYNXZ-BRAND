"use client";

import { useEffect, useRef, useState } from "react";

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    const el = sectionRef.current;
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="contact-section relative overflow-hidden py-8 md:py-10 lg:py-12"
      aria-labelledby="contact-heading"
    >
      {/* Gradient bridge from CTA section */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-10 lg:h-12 -translate-y-full pointer-events-none z-10"
        style={{
          background: "linear-gradient(to bottom, transparent, var(--color-background))",
        }}
      />

      {/* Dark: gold ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/4 -translate-x-1/2 -translate-y-1/4 rounded-full
        opacity-0 data-[theme=dark]:opacity-100 transition-opacity duration-700
        h-[500px] w-[1200px] bg-[radial-gradient(circle_at_center,rgba(212,168,79,0.04),rgba(212,168,79,0.008),transparent)] blur-3xl"
        data-theme="dark"
      />

      {/* Light: warm cream ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/4 -translate-x-1/2 -translate-y-1/4 rounded-full
        opacity-0 data-[theme=light]:opacity-100 transition-opacity duration-700
        h-[500px] w-[1200px] bg-[radial-gradient(circle_at_center,#EDE9E2/50,#F3F1EC/20,transparent)] blur-3xl"
        data-theme="light"
      />

      <div className="luxury-container relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Section header */}
          <div
            className={`text-center mb-10 md:mb-12 transition-all duration-900 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{
              transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            <p
              className="text-xs tracking-[0.28em] uppercase mb-4"
              style={{ color: "var(--color-accent)" }}
            >
              Contact
            </p>

            <h2
              id="contact-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[0.06em] leading-[1.08] mb-4"
              style={{ color: "var(--color-text-primary)" }}
            >
              Connect With{" "}
              <span style={{ color: "var(--color-accent)" }}>The KYNXZ BRAND</span>
            </h2>

            <p
              className="max-w-xl mx-auto text-sm md:text-base leading-[1.75]"
              style={{ color: "var(--color-text-muted)" }}
            >
              Begin a conversation with a brand built on timeless elegance and
              uncompromising standards.
            </p>
          </div>

          {/* Glassmorphism form card */}
          <div
            className={`contact-form-card relative rounded-3xl border overflow-hidden transition-all duration-900 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{
              borderColor: "var(--color-border)",
              background: "var(--color-surface)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
              transitionDelay: "150ms",
            }}
          >
            {/* Subtle inner top glow */}
            <div
              aria-hidden
              className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at center, var(--color-accent)/6, transparent 70%)",
              }}
            />

            <div className="relative z-10 px-6 py-10 sm:px-10 sm:py-12 md:px-14 md:py-14 lg:px-16 lg:py-16">
              <form
                onSubmit={(e) => e.preventDefault()}
                className="space-y-6 md:space-y-7"
              >
                {/* Full Name */}
                <div
                  className={`transition-all duration-800 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  }`}
                  style={{
                    transitionDelay: "280ms",
                    transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                >
                  <label
                    htmlFor="contact-name"
                    className="block text-xs uppercase tracking-[0.22em] font-semibold mb-2.5"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    Full Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    placeholder="Your full name"
                    className="contact-input w-full px-5 py-3.5 rounded-xl border text-sm transition-all duration-300
                    focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/30
                    placeholder:text-[var(--color-text-muted)]/40"
                    style={{
                      backgroundColor: "var(--color-input-bg)",
                      borderColor: "var(--color-input-border)",
                      color: "var(--color-text-primary)",
                    }}
                  />
                </div>

                {/* Email */}
                <div
                  className={`transition-all duration-800 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  }`}
                  style={{
                    transitionDelay: "400ms",
                    transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                >
                  <label
                    htmlFor="contact-email"
                    className="block text-xs uppercase tracking-[0.22em] font-semibold mb-2.5"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="your@email.com"
                    className="contact-input w-full px-5 py-3.5 rounded-xl border text-sm transition-all duration-300
                    focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/30
                    placeholder:text-[var(--color-text-muted)]/40"
                    style={{
                      backgroundColor: "var(--color-input-bg)",
                      borderColor: "var(--color-input-border)",
                      color: "var(--color-text-primary)",
                    }}
                  />
                </div>

                {/* Subject */}
                <div
                  className={`transition-all duration-800 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  }`}
                  style={{
                    transitionDelay: "520ms",
                    transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                >
                  <label
                    htmlFor="contact-subject"
                    className="block text-xs uppercase tracking-[0.22em] font-semibold mb-2.5"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    placeholder="How can we help you?"
                    className="contact-input w-full px-5 py-3.5 rounded-xl border text-sm transition-all duration-300
                    focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/30
                    placeholder:text-[var(--color-text-muted)]/40"
                    style={{
                      backgroundColor: "var(--color-input-bg)",
                      borderColor: "var(--color-input-border)",
                      color: "var(--color-text-primary)",
                    }}
                  />
                </div>

                {/* Message */}
                <div
                  className={`transition-all duration-800 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  }`}
                  style={{
                    transitionDelay: "640ms",
                    transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                >
                  <label
                    htmlFor="contact-message"
                    className="block text-xs uppercase tracking-[0.22em] font-semibold mb-2.5"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    placeholder="Share your thoughts with us..."
                    className="contact-input contact-textarea w-full px-5 py-3.5 rounded-xl border text-sm transition-all duration-300 resize-none
                    focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/30
                    placeholder:text-[var(--color-text-muted)]/40"
                    style={{
                      backgroundColor: "var(--color-input-bg)",
                      borderColor: "var(--color-input-border)",
                      color: "var(--color-text-primary)",
                    }}
                  />
                </div>

                {/* Submit button */}
                <div
                  className={`transition-all duration-800 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  }`}
                  style={{
                    transitionDelay: "760ms",
                    transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                >
                  <button
                    type="submit"
                    className="contact-submit group relative w-full inline-flex items-center justify-center rounded-full border px-10 py-4 text-sm tracking-[0.12em] uppercase font-semibold
                    overflow-hidden transition-all duration-500 hover:-translate-y-0.5
                    focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/40"
                    style={{
                      borderColor: "var(--color-accent)",
                      color: "var(--color-accent)",
                      background: "transparent",
                    }}
                  >
                    {/* Button background glow fill on hover */}
                    <span
                      aria-hidden
                      className="absolute inset-0 rounded-full transition-all duration-500 opacity-0 group-hover:opacity-100"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(212,168,79,0.12), rgba(212,168,79,0.04))",
                      }}
                    />
                    <span className="relative mr-3 flex items-center gap-2">
                      <span className="relative">Send Message</span>
                    </span>
                    {/* Gold dot with glow */}
                    <span
                      aria-hidden
                      className="relative h-2 w-2 rounded-full"
                      style={{
                        backgroundColor: "var(--color-accent)",
                        boxShadow: "0 0 12px rgba(212,168,79,0.4)",
                      }}
                    />
                    {/* Button edge shimmer */}
                    <span
                      aria-hidden
                      className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                      style={{
                        boxShadow: "inset 0 0 20px rgba(212,168,79,0.08)",
                      }}
                    />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
