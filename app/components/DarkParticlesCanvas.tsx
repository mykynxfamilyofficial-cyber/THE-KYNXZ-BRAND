"use client";

import { useEffect, useRef } from "react";

/**
 * ---------------------------------------------------------------------------
 * DarkParticlesCanvas
 *
 * A premium full-viewport canvas particle system that ONLY renders when the
 * site is in dark theme (data-theme="dark"). It produces:
 *
 *  - 40–100 tiny warm‑toned particles (champagne, bronze, ivory)
 *  - A soft radial gradient glow behind each particle (the glow is 4× larger
 *    than the core dot and fades out)
 *  - Very slow, elegant drifting motion
 *  - Faint connecting lines between particles within ~130 px of each other
 *    (alpha capped at 0.06)
 *  - A barely‑perceptible warm haze overlay
 *
 * Performance:
 *  - Device‑pixel ratio capped at 2
 *  - Particle count scales with viewport area
 *  - Respects prefers‑reduced‑motion
 *  - Canvas is torn down when the theme switches to light
 * ---------------------------------------------------------------------------
 */

type Particle = {
  x: number;
  y: number;
  r: number; // radius
  vx: number;
  vy: number;
  alpha: number; // core opacity
  glowMul: number; // glow intensity multiplier 0.3 – 1.0
  color: string; // unquoted RGB triplet, e.g. "212, 168, 79"
};

/** Warm luxury palette — all colors are champagne / bronze / ivory / gold */
const COLORS = [
  "212, 168, 79",   // champagne gold
  "196, 149, 58",   // warm bronze
  "232, 200, 122",  // soft gold
  "255, 242, 214",  // ivory cream
  "226, 186, 94",   // warm amber
  "242, 209, 140",  // light champagne
  "255, 236, 190",  // champagne highlight
];

export default function DarkParticlesCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);
  const particlesRef = useRef<Particle[]>([]);
  const sizeRef = useRef({ w: 0, h: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const root = document.documentElement;
    const isDark = () => root.getAttribute("data-theme") === "dark";
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const mqReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const prefersReduced = mqReduced.matches;

    let active = false;
    let animId = 0;

    /* ── create / re‑seed particles ──────────────────────────── */
    const setup = () => {
      const { innerWidth: w, innerHeight: h, devicePixelRatio } = window;
      const dpr = Math.min(devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      sizeRef.current = { w, h };

      const count = Math.max(35, Math.min(Math.floor((w * h) / 38000), 100));

      const next: Particle[] = [];
      for (let i = 0; i < count; i++) {
        const r = 0.6 + Math.random() * 2.0;
        const speedMul = 0.15 + Math.random() * 0.28;
        next.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r,
          vx: (-0.35 + Math.random() * 0.7) * speedMul,
          vy: (-0.18 + Math.random() * 0.36) * speedMul,
          alpha: 0.06 + Math.random() * 0.16,
          glowMul: 0.3 + Math.random() * 0.7,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        });
      }
      particlesRef.current = next;
    };

    /* ── draw one frame ──────────────────────────────────────── */
    const draw = () => {
      if (!active) {
        ctx.clearRect(0, 0, sizeRef.current.w, sizeRef.current.h);
        animId = requestAnimationFrame(draw);
        return;
      }

      const { w, h } = sizeRef.current;
      ctx.clearRect(0, 0, w, h);

      const particles = particlesRef.current;
      const maxDistSq = 130 * 130;

      // ── 1. update positions & draw glows ──
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // wrap around edges
        if (p.x < -20) p.x = w + 20;
        else if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        else if (p.y > h + 20) p.y = -20;

        // soft radial glow
        const glowR = p.r * 4.5;
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowR);
        g.addColorStop(0, `rgba(${p.color}, ${p.alpha * p.glowMul * 0.45})`);
        g.addColorStop(0.35, `rgba(${p.color}, ${p.alpha * p.glowMul * 0.12})`);
        g.addColorStop(1, `rgba(${p.color}, 0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, glowR, 0, Math.PI * 2);
        ctx.fill();

        // sharp core dot
        ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── 2. faint connecting lines between nearby particles ──
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < maxDistSq) {
            const dist = Math.sqrt(distSq);
            const alpha = (1 - dist / 130) * 0.055;
            if (alpha > 0.003) {
              ctx.strokeStyle = `rgba(212, 168, 79, ${alpha})`;
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }
      }

      // ── 3. barely‑visible warm haze ──
      ctx.fillStyle = "rgba(255, 215, 160, 0.003)";
      ctx.fillRect(0, 0, w, h);

      animId = requestAnimationFrame(draw);
    };

    /* ── start / stop ────────────────────────────────────────── */
    const start = () => {
      if (animId) cancelAnimationFrame(animId);
      if (!isDark() || prefersReduced) {
        active = false;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        animId = requestAnimationFrame(draw);
        return;
      }
      active = true;
      setup();
      animId = requestAnimationFrame(draw);
    };

    const stop = () => {
      active = false;
      if (animId) {
        cancelAnimationFrame(animId);
        animId = 0;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    /* ── event handlers ──────────────────────────────────────── */
    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (isDark() && !prefersReduced) start();
        else stop();
      }, 160);
    };

    const mo = new MutationObserver(() => {
      if (isDark() && !prefersReduced) start();
      else stop();
    });
    mo.observe(root, { attributes: true, attributeFilter: ["data-theme"] });

    const onMQChange = () => {
      if (mqReduced.matches) stop();
      else if (isDark()) start();
    };
    mqReduced.addEventListener("change", onMQChange);

    // go
    start();
    window.addEventListener("resize", onResize);

    return () => {
      stop();
      window.removeEventListener("resize", onResize);
      mo.disconnect();
      mqReduced.removeEventListener("change", onMQChange);
      clearTimeout(resizeTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
