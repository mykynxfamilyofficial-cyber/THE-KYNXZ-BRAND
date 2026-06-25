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
 * 4. Cursor-following bright aura (desktop only)
 * 5. Mouse-based parallax depth effect on hero content
 */
export default function HeroClientFX() {
  const glowRef = useRef<HTMLDivElement>(null);
  const auraRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const targetRef = useRef({ x: 0.5, y: 0.5 });
  const currentRef = useRef({ x: 0.5, y: 0.5 });
  const parallaxRef = useRef({ x: 0, y: 0 });
  const parallaxCurrentRef = useRef({ x: 0, y: 0 });
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

      // Parallax: offset from center (-1 to 1)
      parallaxRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // On touch devices, gently center the effects
    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      targetRef.current = {
        x: touch.clientX / window.innerWidth,
        y: touch.clientY / window.innerHeight,
      };
      parallaxRef.current = {
        x: (touch.clientX / window.innerWidth - 0.5) * 2,
        y: (touch.clientY / window.innerHeight - 0.5) * 2,
      };
    };
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [heroVisible]);

  useEffect(() => {
    if (!heroVisible) return;

    const el = glowRef.current;
    const aura = auraRef.current;
    if (!el) return;

    const animate = () => {
      // Smoothly interpolate mouse/touch glow toward target
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * 0.05;
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * 0.05;

      const x = currentRef.current.x * 100;
      const y = currentRef.current.y * 100;

      el.style.setProperty("--mouse-x", `${x}%`);
      el.style.setProperty("--mouse-y", `${y}%`);

      // Cursor/touch-following bright aura — uses interpolated position for smoothness
      if (aura) {
        const auraX = currentRef.current.x * window.innerWidth;
        const auraY = currentRef.current.y * window.innerHeight;
        aura.style.transform = `translate(${auraX - 100}px, ${auraY - 100}px)`;
      }

      // Mouse/touch parallax on hero content via CSS custom properties
      parallaxCurrentRef.current.x += (parallaxRef.current.x - parallaxCurrentRef.current.x) * 0.03;
      parallaxCurrentRef.current.y += (parallaxRef.current.y - parallaxCurrentRef.current.y) * 0.03;
      const px = parallaxCurrentRef.current.x * 8;
      const py = parallaxCurrentRef.current.y * 4;
      document.documentElement.style.setProperty("--parallax-x", `${px.toFixed(1)}px`);
      document.documentElement.style.setProperty("--parallax-y", `${py.toFixed(1)}px`);

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

      {/* ---- Cursor/touch-following bright aura ---- */}
      <div
        ref={auraRef}
        aria-hidden
        className={`pointer-events-none fixed top-0 left-0 z-[3] transition-opacity duration-700 ${
          heroVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background: "radial-gradient(circle at center, rgba(212,168,79,0.08), rgba(255,255,255,0.04) 30%, transparent 70%)",
          filter: "blur(30px)",
          willChange: "transform",
          transform: "translate(-100px, -100px)",
        }}
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
