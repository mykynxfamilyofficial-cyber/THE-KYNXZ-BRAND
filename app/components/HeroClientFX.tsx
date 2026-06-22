"use client";

import { useEffect, useRef, useState } from "react";
import ParticlesBackground from "../ParticlesBackground";

/**
 * HeroClientFX
 *
 * Renders interactive / animated effects for the hero:
 * 1. Mouse-follow ambient gold glow (extremely subtle — 4 % – 8 %)
 * 2. Ultra-subtle floating luxury particle clusters
 * 3. Canvas-based particle dust (ParticlesBackground)
 */
export default function HeroClientFX() {
  const glowRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const targetRef = useRef({ x: 0.5, y: 0.5 });
  const currentRef = useRef({ x: 0.5, y: 0.5 });
  const [heroVisible, setHeroVisible] = useState(true);

  useEffect(() => {
    // Track hero visibility so the mouse glow only activates in the hero section
    const hero = document.querySelector(".light-home-page");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHeroVisible(entry.isIntersecting);
      },
      { threshold: 0 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!heroVisible) return;

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [heroVisible]);

  useEffect(() => {
    if (!heroVisible) return;

    const el = glowRef.current;
    if (!el) return;

    const animate = () => {
      // Smoothly interpolate toward target
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * 0.05;
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * 0.05;

      const x = currentRef.current.x * 100;
      const y = currentRef.current.y * 100;

      el.style.setProperty("--mouse-x", `${x}%`);
      el.style.setProperty("--mouse-y", `${y}%`);

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [heroVisible]);

  return (
    <>
      {/* ---- Mouse-follow ambient glow (theme-aware) ---- */}
      <div
        ref={glowRef}
        aria-hidden
        className={`hero-mouse-glow pointer-events-none fixed inset-0 z-[2] transition-all duration-700 ${
          heroVisible ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Floating luxury particle clusters (both themes) — single instance */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-0 data-[theme=dark]:opacity-100 data-[theme=light]:opacity-100"
      >
        <div className="hero-particle-cluster hero-particle-cluster-1" />
        <div className="hero-particle-cluster hero-particle-cluster-2" />
      </div>

      {/* Canvas-based particle dust background */}
      <ParticlesBackground />
    </>
  );
}
