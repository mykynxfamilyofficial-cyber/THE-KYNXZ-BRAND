"use client";

import { useState, useEffect, useCallback, useRef } from "react";

/* ───────────────────────────────────────────────
   Theme-aware color tokens — single source of truth
   ─────────────────────────────────────────────── */

/**
 * ThemeColors interface — defines the shape of color tokens for both themes.
 * Using a shared interface (instead of `as const` inference) ensures that
 * THEME[theme] passes strict TypeScript without readonly incompatibilities.
 */
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

type Theme = "dark" | "light";

export const THEME: Record<Theme, ThemeColors> = {
  dark: {
    bg: "#0A0A0A",
    bgAlt: "#111114",
    warm: "#1B1610",
    champagne: "#D6CFC7",
    bronze: "#8B7355",
    ivory: "#F5F2ED",
    muted: "#B8B3AA",
    surface: "rgba(255,255,255,0.04)",
    surfaceHover: "rgba(255,255,255,0.08)",
    circleBorder: "rgba(214, 207, 199, 0.08)",
    circleGlow: "rgba(212, 168, 79, 0.06)",
  },
  light: {
    bg: "#F6F3EE",
    bgAlt: "#EDE8DF",
    warm: "#E7DED2",
    champagne: "#8B7355",
    bronze: "#6B5B4A",
    ivory: "#1A1815",
    muted: "#6B6358",
    surface: "rgba(255,255,255,0.7)",
    surfaceHover: "rgba(255,255,255,0.85)",
    circleBorder: "rgba(139, 115, 85, 0.1)",
    circleGlow: "rgba(139, 115, 85, 0.04)",
  },
};

/**
 * Optimized useTheme hook that:
 * 1. Reads theme from CSS custom properties (no duplicate state sync)
 * 2. Uses a single MutationObserver per hook instance
 * 3. Returns cached color tokens
 */
export function useTheme(): ThemeColors {
  const [theme, setTheme] = useState<Theme>("dark");
  const observerRef = useRef<MutationObserver | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    const current = (root.getAttribute("data-theme") as Theme) || "dark";
    setTheme(current);

    // Use a single observer for theme changes
    if (!observerRef.current) {
      observerRef.current = new MutationObserver(() => {
        const t = (root.getAttribute("data-theme") as Theme) || "dark";
        setTheme(t);
      });
      observerRef.current.observe(root, {
        attributes: true,
        attributeFilter: ["data-theme"],
      });
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, []);

  return THEME[theme];
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
