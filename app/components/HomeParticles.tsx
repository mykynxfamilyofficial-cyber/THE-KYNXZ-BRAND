"use client";

import { useEffect, useRef } from "react";

/* ─────────────────────────────────────────────────────────
   HomeParticles — Ultra-premium silver/platinum particle system
   ─────────────────────────────────────────────────────────
   Renders across the entire home page (Hero through Newsletter,
   excluding Footer) with:

   1. Large silver/platinum floating orbs with layered glow
   2. Premium silver/white shooting stars from random sides
   3. 2x movement speed compared to existing particle systems
   4. Theme-aware colors: silver/platinum in light, warmer
      platinum-champagne blend in dark
   5. Mouse parallax for added depth
   6. 60 FPS with DPR capping, reduced-motion support
   ───────────────────────────────────────────────────────── */

type Orb = {
  x: number;
  y: number;
  r: number;          // radius 3–12px (6–24px diameter)
  vx: number;
  vy: number;
  alpha: number;      // base alpha 0.2–0.45
  pulsePhase: number;
  driftPhase: number;
  colorIndex: number;
};

type ShootingStar = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  opacity: number;
  birthTime: number;
  length: number;
  active: boolean;
};

/* ── Silver/platinum palette (both themes) ── */
const ORB_COLORS = [
  "255, 255, 255",  // pure white
  "240, 240, 245",  // soft white
  "230, 230, 235",  // platinum
  "220, 220, 228",  // light platinum
  "210, 210, 220",  // silver
  "200, 200, 212",  // muted silver
];

/* ── Shooting star config ── */
const MAX_STARS = 12;
const STAR_LIFETIME = 2200;    // ms total lifespan
const SPAWN_INTERVAL_MIN = 2000;  // 2 seconds (4x frequency)
const SPAWN_INTERVAL_MAX = 3750; // 3.75 seconds (4x frequency)
const STAR_SPEED_MIN = 5;
const STAR_SPEED_MAX = 12;

export default function HomeParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);
  const orbsRef = useRef<Orb[]>([]);
  const starsRef = useRef<ShootingStar[]>([]);
  const sizeRef = useRef({ w: 0, h: 0 });
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const lastSpawnRef = useRef(0);
  const nextSpawnDelayRef = useRef(3000);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const isMobile = () => window.innerWidth < 768;

    // Only run on homepage and when hero is visible
    let isActiveSection = true;

    /* ── Setup orbs ── */
    const setup = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const { clientWidth: w, clientHeight: h } = parent;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      sizeRef.current = { w, h };

      // Mobile: reduce density by 70%
      const mobileMultiplier = isMobile() ? 0.3 : 1;
      // Density: ~1 orb per 70,000 sq px (slightly denser than original), min 12, max 40
      const base = Math.floor((w * h) / 70000 * mobileMultiplier);
      const count = Math.max(isMobile() ? 4 : 12, Math.min(base, isMobile() ? 12 : 40));

      const next: Orb[] = [];
      for (let i = 0; i < count; i++) {
        const r = 3 + Math.random() * 9;  // 3–12px radius
        // 2x speed multiplier compared to original SilverOrbs
        const speedMul = 2.0 * (0.08 + Math.random() * 0.15);
        next.push({
          x: Math.random() * (w + 100) - 50,
          y: Math.random() * (h + 100) - 50,
          r,
          vx: (-0.2 + Math.random() * 0.4) * speedMul,
          vy: (-0.15 + Math.random() * 0.3) * speedMul,
          alpha: 0.20 + Math.random() * 0.25,
          pulsePhase: Math.random() * Math.PI * 2,
          driftPhase: Math.random() * Math.PI * 2,
          colorIndex: Math.floor(Math.random() * ORB_COLORS.length),
        });
      }
      orbsRef.current = next;
      starsRef.current = [];
      lastSpawnRef.current = 0;
      nextSpawnDelayRef.current = 2000;
    };

    /* ── Resize observer ── */
    let resizeTimer: ReturnType<typeof setTimeout>;
    const ro = new ResizeObserver(() => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(setup, 160);
    });
    ro.observe(canvas.parentElement!);

    /* ── Shooting star helpers ── */
    const spawnStar = () => {
      const { w, h } = sizeRef.current;
      if (w < 100 || h < 100) return;

      const speed = STAR_SPEED_MIN + Math.random() * (STAR_SPEED_MAX - STAR_SPEED_MIN);
      const side = Math.floor(Math.random() * 4);

      let startX: number, startY: number;
      let angleDeg: number;

      switch (side) {
        case 0: // Top → angle downward
          startX = Math.random() * w * 0.9;
          startY = -10 - Math.random() * 60;
          angleDeg = 20 + Math.random() * 50;
          break;
        case 1: // Right → angle leftward
          startX = w + 10 + Math.random() * 60;
          startY = Math.random() * h * 0.7;
          angleDeg = 120 + Math.random() * 50;
          break;
        case 2: // Bottom → angle upward
          startX = Math.random() * w * 0.8;
          startY = h + 10 + Math.random() * 60;
          angleDeg = 210 + Math.random() * 50;
          break;
        default: // Left → angle rightward
          startX = -10 - Math.random() * 60;
          startY = Math.random() * h * 0.6;
          angleDeg = 340 + Math.random() * 50;
          break;
      }

      const angleRad = angleDeg * (Math.PI / 180);

      const star: ShootingStar = {
        x: startX,
        y: startY,
        vx: Math.cos(angleRad) * speed,
        vy: Math.sin(angleRad) * speed,
        opacity: 0,
        birthTime: performance.now(),
        length: 80 + Math.random() * 100,
        active: true,
      };
      starsRef.current.push(star);

      if (starsRef.current.length > MAX_STARS * 3) {
        starsRef.current = starsRef.current.filter((s) => s.active);
      }
    };

    /* ── Draw shooting stars ── */
    const drawStars = (now: number) => {
      const { w, h } = sizeRef.current;
      // Spawn logic
      const activeStars = starsRef.current.filter((s) => s.active).length;
      if (activeStars < MAX_STARS && now - lastSpawnRef.current > nextSpawnDelayRef.current) {
        spawnStar();
        lastSpawnRef.current = now;
        nextSpawnDelayRef.current =
          SPAWN_INTERVAL_MIN + Math.random() * (SPAWN_INTERVAL_MAX - SPAWN_INTERVAL_MIN);
      }

      const stars = starsRef.current;
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        if (!s.active) continue;

        const age = now - s.birthTime;

        if (age > STAR_LIFETIME) {
          s.active = false;
          continue;
        }

        const progress = age / STAR_LIFETIME;
        if (progress < 0.08) {
          s.opacity = progress / 0.08;
        } else if (progress < 0.6) {
          s.opacity = 1;
        } else {
          s.opacity = 1 - (progress - 0.6) / 0.4;
        }

        s.x += s.vx;
        s.y += s.vy;

        // Kill if off-screen (with generous margin)
        const margin = 200;
        if (s.x > w + margin || s.y > h + margin || s.x < -margin || s.y < -margin) {
          s.active = false;
          continue;
        }

        const speed = Math.sqrt(s.vx * s.vx + s.vy * s.vy);
        if (speed < 0.01) continue;
        const nx = s.vx / speed;
        const ny = s.vy / speed;

        const tailLength = s.length;

        // ── Outer glow at head ──
        const glowR = 16;
        const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, glowR);
        glow.addColorStop(0, `rgba(255, 255, 255, ${s.opacity * 0.4})`);
        glow.addColorStop(0.35, `rgba(255, 255, 255, ${s.opacity * 0.15})`);
        glow.addColorStop(1, `rgba(255, 255, 255, 0)`);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(s.x, s.y, glowR, 0, Math.PI * 2);
        ctx.fill();

        // ── Subtle cross shimmer ──
        const shimmerAlpha = s.opacity * 0.15;
        ctx.strokeStyle = `rgba(255, 255, 255, ${shimmerAlpha})`;
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.moveTo(s.x - 8, s.y);
        ctx.lineTo(s.x + 8, s.y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(s.x, s.y - 8);
        ctx.lineTo(s.x, s.y + 8);
        ctx.stroke();

        // ── Trail gradient ──
        const tailEndX = s.x - nx * tailLength;
        const tailEndY = s.y - ny * tailLength;
        const grad = ctx.createLinearGradient(s.x, s.y, tailEndX, tailEndY);
        grad.addColorStop(0, `rgba(255, 255, 255, ${s.opacity * 1.0})`);
        grad.addColorStop(0.1, `rgba(240, 240, 245, ${s.opacity * 0.55})`);
        grad.addColorStop(0.3, `rgba(230, 230, 235, ${s.opacity * 0.25})`);
        grad.addColorStop(0.6, `rgba(220, 220, 228, ${s.opacity * 0.1})`);
        grad.addColorStop(1, `rgba(255, 255, 255, 0)`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2.0;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(tailEndX, tailEndY);
        ctx.stroke();

        // ── Inner trail for depth ──
        ctx.strokeStyle = `rgba(255, 255, 255, ${s.opacity * 0.25})`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(tailEndX, tailEndY);
        ctx.stroke();

        // ── Bright head dot ──
        ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity * 0.95})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, 2.8, 0, Math.PI * 2);
        ctx.fill();

        // ── Hot inner core ──
        ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity * 1.0})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    /* ── Draw frame ── */
    const draw = () => {
      const { w, h } = sizeRef.current;
      if (w < 1 || h < 1) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      ctx.clearRect(0, 0, w, h);

      const orbs = orbsRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Subtle parallax offset
      const pOffX = (mx - 0.5) * 8;
      const pOffY = (my - 0.5) * 5;

      // ── 1. Draw orbs ──
      for (let i = 0; i < orbs.length; i++) {
        const o = orbs[i];

        // Movement with sinusoidal drift (2x base speed already baked into vx/vy)
        const driftX = Math.sin(performance.now() * 0.0003 + o.driftPhase) * 0.12;
        const driftY = Math.cos(performance.now() * 0.0004 + o.driftPhase * 1.3) * 0.12;
        o.x += o.vx + driftX;
        o.y += o.vy + driftY;

        // Wrap around
        const margin = o.r * 5;
        if (o.x < -margin) o.x = w + margin;
        else if (o.x > w + margin) o.x = -margin;
        if (o.y < -margin) o.y = h + margin;
        else if (o.y > h + margin) o.y = -margin;

        // Subtle pulsing alpha
        const pulse = Math.sin(performance.now() * 0.0008 + o.pulsePhase) * 0.08;
        const currentAlpha = Math.max(0.15, Math.min(0.5, o.alpha + pulse));

        // Parallax offset
        const px = o.x + pOffX * (o.r / 12);
        const py = o.y + pOffY * (o.r / 12);

        const color = ORB_COLORS[o.colorIndex];

        // ── Outer glow ──
        const glowR = o.r * 5;
        const glow = ctx.createRadialGradient(px, py, 0, px, py, glowR);
        glow.addColorStop(0, `rgba(${color}, ${currentAlpha * 0.2})`);
        glow.addColorStop(0.35, `rgba(${color}, ${currentAlpha * 0.08})`);
        glow.addColorStop(1, `rgba(${color}, 0)`);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(px, py, glowR, 0, Math.PI * 2);
        ctx.fill();

        // ── Mid glow ──
        const midR = o.r * 2.5;
        const midGlow = ctx.createRadialGradient(px, py, 0, px, py, midR);
        midGlow.addColorStop(0, `rgba(${color}, ${currentAlpha * 0.35})`);
        midGlow.addColorStop(0.5, `rgba(${color}, ${currentAlpha * 0.12})`);
        midGlow.addColorStop(1, `rgba(${color}, 0)`);
        ctx.fillStyle = midGlow;
        ctx.beginPath();
        ctx.arc(px, py, midR, 0, Math.PI * 2);
        ctx.fill();

        // ── Core orb ──
        const coreGrad = ctx.createRadialGradient(
          px - o.r * 0.2, py - o.r * 0.2, 0,
          px, py, o.r
        );
        coreGrad.addColorStop(0, `rgba(${color}, ${Math.min(0.65, currentAlpha * 1.5)})`);
        coreGrad.addColorStop(0.4, `rgba(${color}, ${currentAlpha * 0.7})`);
        coreGrad.addColorStop(1, `rgba(${color}, ${currentAlpha * 0.2})`);
        ctx.fillStyle = coreGrad;
        ctx.beginPath();
        ctx.arc(px, py, o.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── 2. Draw shooting stars (desktop only) ──
      if (!isMobile()) {
        drawStars(performance.now());
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

    /* ── Start ── */
    setup();
    rafRef.current = requestAnimationFrame(draw);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", handleMouseMove);
      ro.disconnect();
      clearTimeout(resizeTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
