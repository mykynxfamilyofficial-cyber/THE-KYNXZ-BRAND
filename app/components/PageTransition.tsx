"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { usePathname } from "next/navigation";

/**
 * PageTransition
 *
 * Provides smooth fade + blur + upward motion transitions between page
 * navigations. Wraps page content and shows a brief transition overlay
 * whenever the pathname changes.
 *
 * The overlay uses CSS transitions with the brand's signature
 * cubic-bezier(0.22, 1, 0.36, 1) easing curve for a refined,
 * editorial feel.
 */
export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [transitionState, setTransitionState] = useState<
    "idle" | "exiting" | "entering"
  >("idle");
  const [displayChildren, setDisplayChildren] = useState(children);
  const prevPathname = useRef(pathname);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimeouts = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (pathname === prevPathname.current) return;

    // Path changed — begin exit animation
    setTransitionState("exiting");

    // After exit completes, swap content and begin entrance
    timeoutRef.current = setTimeout(() => {
      setDisplayChildren(children);
      prevPathname.current = pathname;
      setTransitionState("entering");

      // After entrance completes, return to idle
      timeoutRef.current = setTimeout(() => {
        setTransitionState("idle");
      }, 500);
    }, 350);

    return clearTimeouts;
  }, [pathname, children, clearTimeouts]);

  // Skip initial entrance — the LoadingScreen handles first-load experience.
  // Page transitions only trigger on subsequent client-side navigations.
  useEffect(() => {
    setTransitionState("idle");
  }, []);

  const isTransitioning = transitionState !== "idle";

  return (
    <div className="page-transition-wrapper relative min-h-screen">
      {/* Transition overlay — appears during navigation */}
      <div
        aria-hidden
        className="page-transition-overlay fixed inset-0 z-[9998] pointer-events-none"
        style={{
          opacity:
            transitionState === "exiting"
              ? 1
              : transitionState === "entering"
              ? 0
              : 0,
          backdropFilter:
            transitionState === "exiting" ? "blur(6px)" : "blur(0px)",
          WebkitBackdropFilter:
            transitionState === "exiting" ? "blur(6px)" : "blur(0px)",
          transition:
            "opacity 400ms cubic-bezier(0.22, 1, 0.36, 1), backdrop-filter 400ms cubic-bezier(0.22, 1, 0.36, 1)",
          pointerEvents: isTransitioning ? "auto" : "none",
        }}
      />

      {/* Page content with transition */}
      <div
        className="page-transition-content min-h-screen"
        style={{
          opacity:
            transitionState === "exiting"
              ? 0
              : transitionState === "entering"
              ? 0.95
              : 1,
          transform:
            transitionState === "exiting"
              ? "translateY(0px)"
              : transitionState === "entering"
              ? "translateY(12px)"
              : "translateY(0px)",
          filter:
            transitionState === "exiting"
              ? "blur(4px)"
              : transitionState === "entering"
              ? "blur(2px)"
              : "blur(0px)",
          transition: `
            opacity 450ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 500ms cubic-bezier(0.22, 1, 0.36, 1),
            filter 450ms cubic-bezier(0.22, 1, 0.36, 1)
          `,
        }}
      >
        {displayChildren}
      </div>

      {/* Subtle loading indicator during transitions */}
      {isTransitioning && (
        <div
          aria-hidden
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[9999] flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md transition-all duration-500"
          style={{
            background: "rgba(139, 115, 85, 0.08)",
            border: "1px solid rgba(139, 115, 85, 0.15)",
            opacity: transitionState === "entering" ? 0.6 : 1,
          }}
        >
          <span
            className="w-[4px] h-[4px] rounded-full loading-dot"
            style={{
              background: "var(--color-accent)",
              animation: "loadingDotPulse 1.4s ease-in-out infinite",
              animationDelay: "0ms",
            }}
          />
          <span
            className="w-[4px] h-[4px] rounded-full loading-dot"
            style={{
              background: "var(--color-accent)",
              animation: "loadingDotPulse 1.4s ease-in-out infinite",
              animationDelay: "200ms",
            }}
          />
          <span
            className="w-[4px] h-[4px] rounded-full loading-dot"
            style={{
              background: "var(--color-accent)",
              animation: "loadingDotPulse 1.4s ease-in-out infinite",
              animationDelay: "400ms",
            }}
          />
        </div>
      )}
    </div>
  );
}
