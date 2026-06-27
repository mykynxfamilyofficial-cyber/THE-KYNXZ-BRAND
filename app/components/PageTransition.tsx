"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { usePathname } from "next/navigation";

/**
 * PageTransition — lightweight CSS fade overlay for client-side navigation.
 * No blur, no framer-motion, no loading dots.
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

    setTransitionState("exiting");

    timeoutRef.current = setTimeout(() => {
      setDisplayChildren(children);
      prevPathname.current = pathname;
      setTransitionState("entering");

      timeoutRef.current = setTimeout(() => {
        setTransitionState("idle");
      }, 200);
    }, 150);

    return clearTimeouts;
  }, [pathname, children, clearTimeouts]);

  useEffect(() => {
    setTransitionState("idle");
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Fade overlay */}
      <div
        aria-hidden
        className="fixed inset-0 z-[9998] pointer-events-none"
        style={{
          background: "var(--color-background)",
          opacity:
            transitionState === "exiting"
              ? 1
              : transitionState === "entering"
              ? 0
              : 0,
          transition: "opacity 200ms ease",
          pointerEvents: transitionState !== "idle" ? "auto" : "none",
        }}
      />

      {/* Page content */}
      <div
        className="min-h-screen"
        style={{
          opacity:
            transitionState === "exiting"
              ? 0
              : transitionState === "entering"
              ? 1
              : 1,
          transition: "opacity 200ms ease",
        }}
      >
        {displayChildren}
      </div>
    </div>
  );
}
