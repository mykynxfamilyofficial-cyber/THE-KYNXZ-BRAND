"use client";

import { useCallback, useRef, useEffect } from "react";

/**
 * ScrollToExplore — premium continuous scroll controller
 *
 * - Fixed at bottom-center of the viewport (z-index: 100)
 * - Single tap/click: scrolls down by 50% of viewport height (smooth)
 * - Hold press (mouse/touch): continuous scroll via requestAnimationFrame
 *   at a cinematic ~120px / 50ms rate (2x faster), releasing stops immediately
 * - Gentle floating animation on the mouse icon
 * - Auto-stops at page bottom
 * - Cleans up all listeners on unmount
 *
 * Design:
 * - Dark mode: silver/gold glow with light text
 * - Light mode: elegant dark styling
 *
 * Interaction logic (pointer events):
 * - Pointer down → start a 200ms hold timer
 * - If pointer is still held after 200ms → begin continuous rAF scroll
 * - Pointer up → stop rAF, cancel timer
 *   · If held < 200ms and pointer barely moved → this is a tap → scroll 50vh
 *   · If held ≥ 200ms → was a hold-to-scroll, no tap action
 */
export default function ScrollToExplore() {
  /* ── Refs ────────────────────────────────────────── */
  const holdingRef = useRef(false);
  const rafRef = useRef(0);
  const lastFrameRef = useRef(0);
  const holdTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pointerDownRef = useRef(0);          // timestamp of pointer down
  const pointerStartPos = useRef({ x: 0, y: 0 });
  const pointerMovedRef = useRef(false);

  /** Scroll speed in pixels per millisecond (≈120px / 50ms — 2x faster) */
  const SPEED_PX_PER_MS = 120 / 50; // 2.4 px/ms
  const HOLD_THRESHOLD_MS = 200;
  const MOVE_THRESHOLD_PX = 8;

  /* ── rAF-based continuous scroll loop ────────────── */
  const scrollLoop = useCallback((timestamp: number) => {
    if (!holdingRef.current) return;

    const delta = lastFrameRef.current ? timestamp - lastFrameRef.current : 16;
    lastFrameRef.current = timestamp;

    const step = SPEED_PX_PER_MS * Math.min(delta, 50); // cap delta at 50ms
    const maxY = document.documentElement.scrollHeight - window.innerHeight;
    const currentY = window.scrollY;

    if (currentY >= maxY - 1) {
      holdingRef.current = false;
      return;
    }

    const nextY = Math.min(currentY + step, maxY);
    window.scrollTo({ top: nextY });

    rafRef.current = requestAnimationFrame(scrollLoop);
  }, []);

  /* ── Start / stop helpers ────────────────────────── */
  const startContinuousScroll = useCallback(() => {
    if (holdingRef.current) return;
    holdingRef.current = true;
    lastFrameRef.current = 0;
    rafRef.current = requestAnimationFrame(scrollLoop);
  }, [scrollLoop]);

  const stopContinuousScroll = useCallback(() => {
    holdingRef.current = false;
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    }
    lastFrameRef.current = 0;
  }, []);

  /* ── Cleanup on unmount ──────────────────────────── */
  useEffect(() => {
    return () => {
      holdingRef.current = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
    };
  }, []);

  /* ── Unified pointer handlers ────────────────────── */
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    // Only respond to primary button (left-click / main touch)
    if (e.button !== 0) return;

    pointerDownRef.current = Date.now();
    pointerStartPos.current = { x: e.clientX, y: e.clientY };
    pointerMovedRef.current = false;

    // Start hold timer
    holdTimerRef.current = setTimeout(() => {
      holdTimerRef.current = null;
      // User has held past threshold → begin continuous scroll
      startContinuousScroll();
    }, HOLD_THRESHOLD_MS);
  }, [startContinuousScroll]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (pointerDownRef.current === 0) return;
    const dx = Math.abs(e.clientX - pointerStartPos.current.x);
    const dy = Math.abs(e.clientY - pointerStartPos.current.y);
    if (dx > MOVE_THRESHOLD_PX || dy > MOVE_THRESHOLD_PX) {
      pointerMovedRef.current = true;
      // If user dragged too far, cancel pending hold
      if (holdTimerRef.current && !holdingRef.current) {
        clearTimeout(holdTimerRef.current);
        holdTimerRef.current = null;
      }
    }
  }, []);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    if (e.button !== 0) return;

    const heldMs = Date.now() - pointerDownRef.current;
    const wasHolding = holdingRef.current;

    // Stop any pending hold timer
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }

    // Stop continuous scroll if active
    if (wasHolding) {
      stopContinuousScroll();
      return; // Was a hold — don't trigger tap action
    }

    // If held briefly (< threshold), didn't move much → this is a tap
    if (heldMs < HOLD_THRESHOLD_MS && !pointerMovedRef.current) {
      window.scrollBy({
        top: window.innerHeight * 0.5,
        behavior: "smooth",
      });
    }
  }, [stopContinuousScroll]);

  const handlePointerCancel = useCallback(() => {
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
    stopContinuousScroll();
    pointerDownRef.current = 0;
  }, [stopContinuousScroll]);

  return (
    <div
      className="scroll-to-explore-wrapper"
      aria-label="Scroll to explore"
    >
      <button
        type="button"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onPointerLeave={handlePointerCancel}
        className="scroll-to-explore-btn group"
        aria-label="Scroll to explore"
      >
        {/* Label */}
        <span className="scroll-to-explore-label">Scroll to Explore</span>

        {/* SVG Mouse Icon with floating + animated wheel */}
        <svg
          className="scroll-to-explore-mouse"
          width="22"
          height="34"
          viewBox="0 0 22 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          {/* Mouse body */}
          <rect
            x="1.5"
            y="1.5"
            width="19"
            height="31"
            rx="9.5"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
          />
          {/* Scroll wheel dot */}
          <circle
            className="scroll-to-explore-wheel"
            cx="11"
            cy="10"
            r="2.5"
            fill="currentColor"
          />
        </svg>
      </button>
    </div>
  );
}
