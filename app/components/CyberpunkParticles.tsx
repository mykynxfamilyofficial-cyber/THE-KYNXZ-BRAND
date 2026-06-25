"use client";

import { useEffect, useRef } from "react";

/* ─────────────────────────────────────────────────────────
   CyberpunkParticles — Futuristic particle system
   ─────────────────────────────────────────────────────────
   Renders a continuous, infinite particle field with:
   - Small glowing dots (warm gold + cool cyan blend)
   - Light streaks / shooting energy lines
   - Subtle digital connecting trails
   - Soft holographic glow
   - Mouse parallax movement
   - 50% max opacity (subtle, never distracting)
   - 60fps target with DPR capping
   - Theme-aware: warm gold palette in dark, cool silver in light
   ───────────────────────────────────────────────────────── */

type Particle = {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  pulsePhase: number;
};

type Streak = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  alpha: number;
  length: number;
  color: string;
};

/* ── Theme-specific color palettes ── */

// Dark theme: warm gold + electric cyan (cyberpunk-luxury blend)
const DARK_PARTICLE_COLORS = [
  "212, 168, 79",   // champagne gold
  "255, 215, 100",  // warm gold
  "100, 200, 255",  // electric cyan
  "180, 140, 255",  // soft violet
  "255, 200, 150",  // warm amber
  "150, 220, 255",  // ice blue
];

const DARK_STREAK_COLORS = [
  "212, 168, 79",
  "100, 200, 255",
  "255, 200, 150",
];

// Light theme: cool silver + graphite (elegant, subtle)
const LIGHT_PARTICLE_COLORS = [
  "139, 115, 85",   // bronze
  "180, 170, 155",  // warm grey
  "160, 150, 140",  // taupe
  "200, 190, 175",  // light beige
  "120, 110, 100",  // graphite
  "150, 145, 135",  // muted silver
];

const LIGHT_STREAK_COLORS = [
  "139, 115, 85",
  "180, 170, 155",
  "120, 110, 100",
];

export default function CyberpunkParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);
  const particlesRef = useRef<Particle[]>([]);
  const streaksRef = useRef<Streak[]>([]);
  const sizeRef = useRef({ w: 0, h: 0 });
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const colorsRef = useRef(DARK_PARTICLE_COLORS);
  const streakColorsRef = useRef(DARK_STREAK_COLORS);
  const isDarkRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const root = document.documentElement;
    const getTheme = () => root.getAttribute("data-theme") || "dark";

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    /* ── Update color palette based on theme ── */
    const updateTheme = () => {
      const isDark = getTheme() === "dark";
      isDarkRef.current = isDark;
      colorsRef.current = isDark ? DARK_PARTICLE_COLORS : LIGHT_PARTICLE_COLORS;
      streakColorsRef.current = isDark ? DARK_STREAK_COLORS : LIGHT_STREAK_COLORS;
    };
    updateTheme();

    /* ── Setup particles ── */
    const setup = () => {
      updateTheme();
      const { innerWidth: w, innerHeight: h, devicePixelRatio } = window;
      const dpr = Math.min(devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      sizeRef.current = { w, h };

      const base = Math.floor((w * h) / 32000);
      const count = Math.max(35, Math.min(base, 80));

      const next: Particle[] = [];
      for (let i = 0; i < count; i++) {
        const r = 0.8 + Math.random() * 2.2;
        const speedMul = 0.12 + Math.random() * 0.25;
        next.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r,
          vx: (-0.3 + Math.random() * 0.6) * speedMul,
          vy: (-0.2 + Math.random() * 0.4) * speedMul,
          alpha: 0.15 + Math.random() * 0.35,
          color: colorsRef.current[Math.floor(Math.random() * colorsRef.current.length)],
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }
      particlesRef.current = next;

      const streaks: Streak[] = [];
      for (let i = 0; i < 3; i++) {
        spawnStreak(streaks, w, h);
      }
      streaksRef.current = streaks;
    };

    /* ── Spawn a streak ── */
    const spawnStreak = (streaks: Streak[], w: number, h: number) => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.4 + Math.random() * 0.8;
      streaks.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 120 + Math.random() * 180,
        alpha: 0.1 + Math.random() * 0.3,
        length: 40 + Math.random() * 80,
        color: streakColorsRef.current[Math.floor(Math.random() * streakColorsRef.current.length)],
      });
    };

    /* ── Draw frame ── */
    const draw = (timestamp: number) => {
      const { w, h } = sizeRef.current;
      ctx.clearRect(0, 0, w, h);

      const particles = particlesRef.current;
      const streaks = streaksRef.current;
      const isDark = isDarkRef.current;
      const connectedLineColor = isDark ? "212, 168, 79" : "139, 115, 85";
      const hazeColor = isDark ? "212, 168, 79" : "180, 170, 155";

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      const driftX = (mx - 0.5) * 0.15;
      const driftY = (my - 0.5) * 0.15;

      // ── 1. Update & draw particles ──
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx + driftX * 0.02;
        p.y += p.vy + driftY * 0.02;

        if (p.x < -10) p.x = w + 10;
        else if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        else if (p.y > h + 10) p.y = -10;

        const pulse = Math.sin(timestamp * 0.001 + p.pulsePhase) * 0.15;
        const currentAlpha = Math.max(0.05, Math.min(0.5, p.alpha + pulse * p.alpha));

        // Soft holographic glow
        const glowR = p.r * 5;
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowR);
        glow.addColorStop(0, `rgba(${p.color}, ${currentAlpha * 0.3})`);
        glow.addColorStop(0.5, `rgba(${p.color}, ${currentAlpha * 0.08})`);
        glow.addColorStop(1, `rgba(${p.color}, 0)`);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(p.x, p.y, glowR, 0, Math.PI * 2);
        ctx.fill();

        // Sharp core dot
        ctx.fillStyle = `rgba(${p.color}, ${currentAlpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── 2. Connecting lines between nearby particles (digital trails) ──
      const maxDistSq = 110 * 110;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < maxDistSq) {
            const dist = Math.sqrt(distSq);
            const alpha = (1 - dist / 110) * 0.12;
            if (alpha > 0.01) {
              ctx.strokeStyle = `rgba(${connectedLineColor}, ${alpha})`;
              ctx.lineWidth = 0.4;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }
      }

      // ── 3. Update & draw light streaks ──
      if (streaks.length < 5 && Math.random() < 0.02) {
        spawnStreak(streaks, w, h);
      }

      for (let i = streaks.length - 1; i >= 0; i--) {
        const s = streaks[i];
        s.x += s.vx + driftX * 0.05;
        s.y += s.vy + driftY * 0.05;
        s.life++;

        if (s.life < 20) {
          s.alpha = (s.life / 20) * s.alpha;
        } else if (s.life > s.maxLife - 30) {
          s.alpha *= 0.97;
        }

        if (s.life > s.maxLife || s.alpha < 0.01) {
          streaks.splice(i, 1);
          continue;
        }

        if (s.x < -50) s.x = w + 50;
        else if (s.x > w + 50) s.x = -50;
        if (s.y < -50) s.y = h + 50;
        else if (s.y > h + 50) s.y = -50;

        const nx = s.vx / Math.sqrt(s.vx * s.vx + s.vy * s.vy);
        const ny = s.vy / Math.sqrt(s.vx * s.vx + s.vy * s.vy);
        const tailEndX = s.x - nx * s.length;
        const tailEndY = s.y - ny * s.length;

        const grad = ctx.createLinearGradient(s.x, s.y, tailEndX, tailEndY);
        const currentAlpha = Math.min(0.5, s.alpha);
        grad.addColorStop(0, `rgba(${s.color}, ${currentAlpha})`);
        grad.addColorStop(0.3, `rgba(${s.color}, ${currentAlpha * 0.5})`);
        grad.addColorStop(1, `rgba(${s.color}, 0)`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(tailEndX, tailEndY);
        ctx.stroke();

        ctx.fillStyle = `rgba(${s.color}, ${currentAlpha * 0.8})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── 4. Very subtle holographic haze overlay (theme-aware) ──
      ctx.fillStyle = `rgba(${hazeColor}, 0.002)`;
      ctx.fillRect(0, 0, w, h);

      rafRef.current = requestAnimationFrame(draw);
    };

    /* ── Mouse move handler for parallax ── */
    const handleMouseMove = (e: MouseEvent) => {
      const { w, h } = sizeRef.current;
      mouseRef.current = {
        x: e.clientX / w,
        y: e.clientY / h,
      };
    };

    /* ── Resize handler ── */
    const handleResize = () => {
      setup();
    };

    /* ── Theme change observer ── */
    const mo = new MutationObserver(() => {
      updateTheme();
      setup();
    });
    mo.observe(root, { attributes: true, attributeFilter: ["data-theme"] });

    /* ── Start ── */
    setup();
    rafRef.current = requestAnimationFrame(draw);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      mo.disconnect();
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
