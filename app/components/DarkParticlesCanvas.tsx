"use client";

import { useEffect, useRef } from "react";

/**
 * ---------------------------------------------------------------------------
 * DarkParticlesCanvas
 *
 * A premium full-viewport canvas particle system that ONLY renders when the
 * site is in dark theme (data-theme="dark"). It produces:
 *
 *  - 45–130 tiny warm‑toned particles (champagne, bronze, ivory)
 *  - A soft radial gradient glow behind each particle (the glow is 4.5× larger
 *    than the core dot and fades out)
 *  - Very slow, elegant drifting motion
 *  - Faint connecting lines between particles within ~120 px of each other
 *    (alpha capped at 0.06)
 *  - A barely‑perceptible warm haze overlay
 *  - Occasional shooting stars streaking diagonally (silver/white, max 3)
 *
 * Performance:
 *  - Device‑pixel ratio capped at 2
 *  - Particle count scales with viewport area
 *  - Respects prefers‑reduced‑motion; shooting stars disabled on mobile
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

/** Shooting star config — enhanced, home-page only */
const MAX_STARS = 3;
const STAR_LIFETIME = 1800; // ms total lifespan (slightly longer for bigger trail)
const SPAWN_INTERVAL_MIN = 2000; // ms between spawns
const SPAWN_INTERVAL_MAX = 5000;
const STAR_SPEED_MIN = 5;   // faster
const STAR_SPEED_MAX = 11;  // faster

export default function DarkParticlesCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);
  const particlesRef = useRef<Particle[]>([]);
  const starsRef = useRef<ShootingStar[]>([]);
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

    // Detect mobile/tablet to reduce particle count
    const isMobile = () => window.innerWidth < 768;

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

      const mobileMultiplier = isMobile() ? 0.3 : 1;
      const count = Math.max(18, Math.min(Math.floor((w * h) / 29000 * mobileMultiplier), isMobile() ? 40 : 130));

      const next: Particle[] = [];
      for (let i = 0; i < count; i++) {
        const r = 0.8 + Math.random() * 2.5;
        const speedMul = 0.15 + Math.random() * 0.28;
        next.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r,
          vx: (-0.35 + Math.random() * 0.7) * speedMul,
          vy: (-0.18 + Math.random() * 0.36) * speedMul,
          alpha: 0.08 + Math.random() * 0.2,
          glowMul: 0.35 + Math.random() * 0.65,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        });
      }
      particlesRef.current = next;

      // Shooting stars disabled on mobile
      if (isMobile()) {
        MAX_STARS_DYNAMIC = 0;
      }

      // Reset shooting stars
      starsRef.current = [];
      lastSpawn = 0;
      nextSpawnDelay = 1500; // shorter first delay for quick initial appearance
    };

    /* ── shooting star helpers ──────────────────────────────── */
    let MAX_STARS_DYNAMIC = MAX_STARS;
    let lastSpawn = 0;
    let nextSpawnDelay = 1500;

    const spawnStar = () => {
      const { w, h } = sizeRef.current;
      const speed = STAR_SPEED_MIN + Math.random() * (STAR_SPEED_MAX - STAR_SPEED_MIN);

      // Random side: 0=top, 1=right, 2=bottom, 3=left
      const side = Math.floor(Math.random() * 4);

      let startX: number, startY: number;
      let angleDeg: number;

      switch (side) {
        case 0: // Top → angle downward (20-70° from horizontal)
          startX = Math.random() * w * 0.8;
          startY = Math.random() * h * 0.25;
          angleDeg = 15 + Math.random() * 55;
          break;
        case 1: // Right → angle leftward
          startX = w * (0.75 + Math.random() * 0.25);
          startY = Math.random() * h * 0.6;
          angleDeg = 110 + Math.random() * 50;
          break;
        case 2: // Bottom → angle upward
          startX = Math.random() * w * 0.7;
          startY = h * (0.7 + Math.random() * 0.25);
          angleDeg = 200 + Math.random() * 50;
          break;
        default: // Left → angle rightward
          startX = Math.random() * w * 0.25;
          startY = Math.random() * h * 0.5;
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
        length: 100 + Math.random() * 80,
        active: true,
      };
      starsRef.current.push(star);

      // Trim excess stars
      if (starsRef.current.length > MAX_STARS * 2) {
        starsRef.current = starsRef.current.filter((s) => s.active);
      }
    };

    const drawStars = (now: number) => {
      // Only render shooting stars on the home page
      if (window.location.pathname !== '/') {
        // Clear any lingering stars from a recent navigation away
        if (starsRef.current.length > 0) starsRef.current = [];
        return;
      }

      const { w, h } = sizeRef.current;

      // Spawn logic
      const activeStars = starsRef.current.filter((s) => s.active).length;
      if (activeStars < MAX_STARS_DYNAMIC && now - lastSpawn > nextSpawnDelay) {
        spawnStar();
        lastSpawn = now;
        nextSpawnDelay = SPAWN_INTERVAL_MIN + Math.random() * (SPAWN_INTERVAL_MAX - SPAWN_INTERVAL_MIN);
      }

      const stars = starsRef.current;
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        if (!s.active) continue;

        const age = now - s.birthTime;

        // Lifecycle: fade in → travel → fade out
        if (age > STAR_LIFETIME) {
          s.active = false;
          continue;
        }

        const progress = age / STAR_LIFETIME;
        if (progress < 0.1) {
          s.opacity = progress / 0.1;
        } else if (progress < 0.65) {
          s.opacity = 1;
        } else {
          s.opacity = 1 - (progress - 0.65) / 0.35;
        }

        // Update position
        s.x += s.vx;
        s.y += s.vy;

        // Kill if off-screen
        if (s.x > w + 100 || s.y > h + 100 || s.x < -100 || s.y < -100) {
          s.active = false;
          continue;
        }

        // Draw trail
        const tailLength = s.length;
        const nx = s.vx / Math.sqrt(s.vx * s.vx + s.vy * s.vy);
        const ny = s.vy / Math.sqrt(s.vx * s.vx + s.vy * s.vy);

        // ── Enhanced glow at head (bigger, brighter) ──
        const glowR = 14;
        const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, glowR);
        glow.addColorStop(0, `rgba(255, 255, 255, ${s.opacity * 0.45})`);
        glow.addColorStop(0.4, `rgba(255, 255, 255, ${s.opacity * 0.18})`);
        glow.addColorStop(1, `rgba(255, 255, 255, 0)`);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(s.x, s.y, glowR, 0, Math.PI * 2);
        ctx.fill();

        // ── Secondary sparkle shimmer (cross-shaped) ──
        const shimmerAlpha = s.opacity * 0.2;
        ctx.strokeStyle = `rgba(255, 255, 255, ${shimmerAlpha})`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(s.x - 6, s.y);
        ctx.lineTo(s.x + 6, s.y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(s.x, s.y - 6);
        ctx.lineTo(s.x, s.y + 6);
        ctx.stroke();

        // ── Brighter tail line with enhanced gradient ──
        const tailEndX = s.x - nx * tailLength;
        const tailEndY = s.y - ny * tailLength;
        const grad = ctx.createLinearGradient(s.x, s.y, tailEndX, tailEndY);
        grad.addColorStop(0, `rgba(255, 255, 255, ${s.opacity * 1.0})`);
        grad.addColorStop(0.1, `rgba(232, 232, 232, ${s.opacity * 0.6})`);
        grad.addColorStop(0.35, `rgba(217, 217, 217, ${s.opacity * 0.25})`);
        grad.addColorStop(0.65, `rgba(200, 200, 210, ${s.opacity * 0.1})`);
        grad.addColorStop(1, `rgba(255, 255, 255, 0)`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(tailEndX, tailEndY);
        ctx.stroke();

        // ── Secondary thinner tail core for depth ──
        ctx.strokeStyle = `rgba(255, 255, 255, ${s.opacity * 0.3})`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(tailEndX, tailEndY);
        ctx.stroke();

        // ── Bright head dot (bigger) ──
        ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity * 0.95})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, 2.5, 0, Math.PI * 2);
        ctx.fill();

        // ── Hot inner core ──
        ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity * 1.0})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }
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

      // ── 2. faint connecting lines between nearby particles (skip on mobile for perf) ──
      if (!isMobile()) {
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
      }

      // ── 3. barely‑visible warm haze (skip on mobile) ──
      if (!isMobile()) {
        ctx.fillStyle = "rgba(255, 215, 160, 0.003)";
        ctx.fillRect(0, 0, w, h);
      }

      // ── 4. shooting stars (dark mode, desktop only) ──
      drawStars(performance.now());

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
