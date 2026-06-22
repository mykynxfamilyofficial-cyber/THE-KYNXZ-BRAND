"use client";

import { useCallback, useEffect, useState } from "react";

export default function GlobalScrollIndicator() {
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    // Observe footer — hide indicator when footer enters viewport
    const footer = document.querySelector("footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setFooterVisible(entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "0px" }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();

    // Collect all scrollable sections in DOM order (hero + content sections)
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("main > section, main > div.light-home-page")
    );

    if (sections.length === 0) return;

    const header = document.querySelector(".site-header");
    const headerHeight = header ? header.getBoundingClientRect().height : 0;

    // Find the current section: the last section whose top edge is at or above
    // the header bottom. This gives us precise section boundary detection.
    let currentIdx = 0;
    for (let i = 0; i < sections.length; i++) {
      const rect = sections[i].getBoundingClientRect();
      if (rect.top <= headerHeight + 1) {
        currentIdx = i;
      }
    }

    // Don't scroll past the last section
    if (currentIdx >= sections.length - 1) return;

    // Scroll to the exact top of the next section, accounting for the fixed header
    const target = sections[currentIdx + 1];
    const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight;
    window.scrollTo({ top: targetTop, behavior: "smooth" });
  }, []);

  // Hide when footer is visible
  if (footerVisible) return null;

  return (
    <div
      className="fixed bottom-6 sm:bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 z-40"
      aria-label="Scroll to explore"
    >
      <a
        href="#"
        onClick={handleClick}
        className="scroll-indicator-link flex flex-col items-center gap-2.5 sm:gap-3 group"
        aria-label="Scroll to next section"
      >
        <span className="scroll-indicator-text">
          Scroll to Explore
        </span>
        <div className="scroll-indicator-capsule">
          <div className="scroll-indicator-dot" />
        </div>
      </a>
    </div>
  );
}
