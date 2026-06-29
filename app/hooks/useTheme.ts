"use client";

import { useState, useEffect, useRef } from "react";

/* ───────────────────────────────────────────────
   Theme-aware color tokens — single source of truth
   Now permanently set to the light/warm neutral theme.
   ─────────────────────────────────────────────── */

export interface ThemeColors {
  bg: string;
  bgAlt: string;
  warm: string;
  champagne: string;
  bronze: string;
  ivory: string;
  muted: string;
  surface: string;
  surfaceHover: string;
  circleBorder: string;
  circleGlow: string;
}

/**
 * Constant light-theme color tokens. The dark/light toggle
 * has been removed — the site uses one permanent design system.
 */
export const THEME_COLORS: ThemeColors = {
  bg: "#F8F6F2",
  bgAlt: "#F6F3EE",
  warm: "#F0EBE2",
  champagne: "#4A3A2C",
  bronze: "#3D2E22",
  ivory: "#1A1815",
  muted: "#5C5148",
  surface: "rgba(255,255,255,0.7)",
  surfaceHover: "rgba(255,255,255,0.85)",
  circleBorder: "rgba(74, 58, 44, 0.1)",
  circleGlow: "rgba(74, 58, 44, 0.04)",
};

/**
 * Always returns the light theme color tokens.
 * Theme switching has been removed from the project.
 */
export function useTheme(): ThemeColors {
  return THEME_COLORS;
}

/**
 * Lightweight scroll-aware visibility hook using IntersectionObserver.
 * Replaces manual useEffect + IntersectionObserver in every section.
 */
export function useVisibility(
  threshold = 0.08,
  rootMargin = "0px 0px -60px 0px"
): readonly [React.RefObject<HTMLElement | null>, boolean] {
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return [ref, isVisible];
}
