"use client";

/**
 * DarkBackgroundFX
 *
 * Renders a set of ultra-subtle animated background elements exclusively for
 * the dark theme — floating gold particles, shimmering dust motes, and slow
 * ambient light orbs. Everything stays between 3 % – 10 % opacity and uses
 * GPU-accelerated transform / opacity animations for smooth 60 fps playback.
 *
 * Visibility is controlled via `data-[theme="dark"]:opacity-100` so the
 * elements exist in the DOM but are invisible in the light theme.
 */

export default function DarkBackgroundFX() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden
      opacity-0 data-[theme=dark]:opacity-100 transition-opacity duration-1000"
    >
      {/* ---- Layer 1: Floating gold particles (tiny dots) ---- */}
      <div className="dark-particle-cluster dark-particle-cluster-1" />

      {/* ---- Layer 2: Larger shimmering motes ---- */}
      <div className="dark-particle-cluster dark-particle-cluster-2" />

      {/* ---- Layer 3: Slow-moving ambient light orb (top-right) ---- */}
      <div
        aria-hidden
        className="absolute rounded-full dark-ambient-orb-1"
      />

      {/* ---- Layer 4: Slow-moving ambient light orb (bottom-left) ---- */}
      <div
        aria-hidden
        className="absolute rounded-full dark-ambient-orb-2"
      />

      {/* ---- Layer 5: Very subtle horizontal light sweep ---- */}
      <div
        aria-hidden
        className="absolute h-px dark-light-sweep"
      />
    </div>
  );
}
