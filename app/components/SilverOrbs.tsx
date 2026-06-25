"use client";

import { useEffect, useRef } from "react";

/* ─────────────────────────────────────────────────────────
   SilverOrbs — Premium floating silver/platinum orbs
   ─────────────────────────────────────────────────────────
   Renders large metallic particles (6px–24px) floating
   continuously across the entire viewport with:
   - Silver/platinum/white color palette only
   - Soft holographic glow behind each orb
   - Slight depth/parallax on mouse move
   - 20%–45% opacity (elegant, non-distracting)
   - Smooth floating animation with random drifting
   - Rendered above the gradient but behind all content
   ───────────────────────────────────────────────────────── */

type Orb = {
  x: number;
  y: number;
  r: number;          // radius 3–12px (visual 6–24px diameter)
  vx: number;
  vy: number;
  alpha: number;      // base alpha 0.2–0.45
  pulsePhase: number;
  driftPhase: number;
};

const ORB_COLORS = [
  "255, 255, 255",  // pure white
  "230, 230, 235",  // platinum
  "210, 210, 220",  // silver
  "240, 240, 245",  // soft white
  "220, 220, 228",  // light platinum
  "200, 200, 210",  // muted silver
];

export default function SilverOrbs() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);
  const orbsRef = useRef<Orb[]>([]);
  const sizeRef = useRef({ w: 0, h: 0 });
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    /* ── Setup orbs ── */
    const setup = () => {
      const { innerWidth: w, innerHeight: h, devicePixelRatio } = window;
      const dpr = Math.min(devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      sizeRef.current = { w, h };

      // Density: ~1 orb per 80,000 sq px, min 12, max 40
      const base = Math.floor((w * h) / 80000);
      const count = Math.max(12, Math.min(base, 40));

      const next: Orb[] = [];
      for (let i = 0; i < count; i++) {
        const r = 3 + Math.random() * 9;  // 3–12px radius = 6–24px diameter
        const speedMul = 0.08 + Math.random() * 0.15;
        next.push({
          x: Math.random() * (w + 100) - 50,
          y: Math.random() * (h + 100) - 50,
          r,
          vx: (-0.2 + Math.random() * 0.4) * speedMul,
          vy: (-0.15 + Math.random() * 0.3) * speedMul,
          alpha: 0.20 + Math.random() * 0.25, // 20%–45%
          pulsePhase: Math.random() * Math.PI * 2,
          driftPhase: Math.random() * Math.PI * 2,
        });
      }
      orbsRef.current = next;
    };

    /* ── Draw frame ── */
    const draw = (timestamp: number) => {
      const { w, h } = sizeRef.current;
      ctx.clearRect(0, 0, w, h);

      const orbs = orbsRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Subtle parallax offset
      const pOffX = (mx - 0.5) * 6;
      const pOffY = (my - 0.5) * 4;

      for (let i = 0; i < orbs.length; i++) {
        const o = orbs[i];

        // Movement with subtle sinusoidal drift
        const driftX = Math.sin(timestamp * 0.0003 + o.driftPhase) * 0.08;
        const driftY = Math.cos(timestamp * 0.0004 + o.driftPhase * 1.3) * 0.08;
        o.x += o.vx + driftX;
        o.y += o.vy + driftY;

        // Wrap around with generous padding
        const margin = o.r * 4;
        if (o.x < -margin) o.x = w + margin;
        else if (o.x > w + margin) o.x = -margin;
        if (o.y < -margin) o.y = h + margin;
        else if (o.y > h + margin) o.y = -margin;

        // Subtle pulsing alpha
        const pulse = Math.sin(timestamp * 0.0008 + o.pulsePhase) * 0.08;
        const currentAlpha = Math.max(0.15, Math.min(0.5, o.alpha + pulse));

        // Parallax offset
        const px = o.x + pOffX * (o.r / 12);
        const py = o.y + pOffY * (o.r / 12);

        // Pick color based on size — larger orbs are brighter white
        const colorIndex = Math.min(
          ORB_COLORS.length - 1,
          Math.floor((o.r - 3) / 9 * (ORB_COLORS.length - 1))
        );
        const color = ORB_COLORS[colorIndex];

        // ── Soft outer glow ──
        const glowR = o.r * 4;
        const glow = ctx.createRadialGradient(px, py, 0, px, py, glowR);
        glow.addColorStop(0, `rgba(${color}, ${currentAlpha * 0.25})`);
        glow.addColorStop(0.4, `rgba(${color}, ${currentAlpha * 0.08})`);
        glow.addColorStop(1, `rgba(${color}, 0)`);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(px, py, glowR, 0, Math.PI * 2);
        ctx.fill();

        // ── Inner glow (medium) ──
        const midR = o.r * 2;
        const midGlow = ctx.createRadialGradient(px, py, 0, px, py, midR);
        midGlow.addColorStop(0, `rgba(${color}, ${currentAlpha * 0.4})`);
        midGlow.addColorStop(0.6, `rgba(${color}, ${currentAlpha * 0.12})`);
        midGlow.addColorStop(1, `rgba(${color}, 0)`);
        ctx.fillStyle = midGlow;
        ctx.beginPath();
        ctx.arc(px, py, midR, 0, Math.PI * 2);
        ctx.fill();

        // ── Core orb — solid with soft edge ──
        const coreGrad = ctx.createRadialGradient(
          px - o.r * 0.2, py - o.r * 0.2, 0,
          px, py, o.r
        );
        coreGrad.addColorStop(0, `rgba(${color}, ${Math.min(0.6, currentAlpha * 1.5)})`);
        coreGrad.addColorStop(0.5, `rgba(${color}, ${currentAlpha * 0.7})`);
        coreGrad.addColorStop(1, `rgba(${color}, ${currentAlpha * 0.2})`);
        ctx.fillStyle = coreGrad;
        ctx.beginPath();
        ctx.arc(px, py, o.r, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    /* ── Mouse move for parallax ── */
    const handleMouseMove = (e: MouseEvent) => {
      const { w, h } = sizeRef.current;
      if (w > 0 && h > 0) {
        mouseRef.current = {
          x: e.clientX / w,
          y: e.clientY / h,
        };
      }
    };

    /* ── Resize ── */
    const handleResize = () => {
      setup();
    };

    /* ── Start ── */
    setup();
    rafRef.current = requestAnimationFrame(draw);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}
