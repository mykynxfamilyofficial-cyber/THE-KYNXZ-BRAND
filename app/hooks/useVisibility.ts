"use client";

import { useRef, useState, useEffect } from "react";

/**
 * useVisibility — Lightweight IntersectionObserver hook
 *
 * Returns [ref, isVisible]. The ref should be attached to the section element.
 * isVisible becomes true once the element enters the viewport (with optional
 * threshold / rootMargin) and stays true thereafter (disconnects observer).
 *
 * Replaces manual useEffect + IntersectionObserver in every section component.
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
