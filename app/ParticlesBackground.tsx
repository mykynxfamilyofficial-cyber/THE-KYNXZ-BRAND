"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  a: number; // alpha
};

export default function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const sizeRef = useRef({ w: 0, h: 0, dpr: 1 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const root = document.documentElement;
    const getTheme = () => root.getAttribute("data-theme") || "light";

    const isDark = () => getTheme() === "dark";

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const setup = () => {
      const { innerWidth, innerHeight, devicePixelRatio } = window;
      const dpr = Math.min(devicePixelRatio || 1, 2); // cap for perf
      sizeRef.current = { w: innerWidth, h: innerHeight, dpr };
      canvas.width = Math.floor(innerWidth * dpr);
      canvas.height = Math.floor(innerHeight * dpr);
      canvas.style.width = `${innerWidth}px`;
      canvas.style.height = `${innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const isDarkNow = isDark();

      // Subtle count for luxury look (LIGHT: fewer + softer)
      const base = Math.floor((innerWidth * innerHeight) / 45000);
      const count = Math.max(20, isDarkNow ? Math.floor(base) : Math.floor(base * 0.55));

      const next: Particle[] = [];
      for (let i = 0; i < count; i++) {
        const r = (isDarkNow ? 0.5 : 0.45) + Math.random() * (isDarkNow ? 1.35 : 1.05);

        // LIGHT: slower drift, lower alpha for a premium “dust” feel
        const speedMul = isDarkNow ? 1 : 0.55;
        const alphaBase = isDarkNow ? 0.05 : 0.028;
        const alphaSpan = isDarkNow ? 0.12 : 0.055;

        next.push({
          x: Math.random() * innerWidth,
          y: Math.random() * innerHeight,
          r,
          vx: (-0.25 + Math.random() * 0.5) * (0.35 + r) * speedMul,
          vy: (-0.12 + Math.random() * 0.24) * (0.35 + r) * speedMul,
          a: alphaBase + Math.random() * alphaSpan,
        });
      }
      particlesRef.current = next;
    };

    const draw = () => {
      const dark = isDark();

      const { w, h } = sizeRef.current;
      ctx.clearRect(0, 0, w, h);

      const particles = particlesRef.current;

      // Very soft cinematic glow (no heavy blurs)
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // wrap
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        // LIGHT: almost-white ivory dust, with very slight champagne tint
        if (!dark) {
          const warm = 245 + Math.sin((i + p.x) * 0.0018) * 6; // ~239-251
          ctx.fillStyle = `rgba(${warm.toFixed(0)}, ${warm.toFixed(0)}, 232, ${p.a.toFixed(3)})`;
        } else {
          // DARK: champagne-ish highlights
          const warm = 218 + Math.sin((i + p.x) * 0.002) * 18; // 200-236
          ctx.fillStyle = `rgba(${warm.toFixed(0)}, ${warm.toFixed(0)}, 180, ${p.a.toFixed(3)})`;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // subtle filmic haze
      ctx.fillStyle = dark ? "rgba(255, 215, 160, 0.015)" : "rgba(246, 245, 242, 0.03)";
      ctx.fillRect(0, 0, w, h);

      rafRef.current = window.requestAnimationFrame(draw);
    };

    const start = () => {
      if (prefersReduced) return;
      stop();
      setup();
      rafRef.current = window.requestAnimationFrame(draw);
    };

    const stop = () => {
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    const onResize = () => {
      if (isDark()) start();
    };

    const onThemeChange = () => {
      // Render in both themes, but with different softness handled in setup/draw
      start();
    };

    // Initial
    if (typeof window !== "undefined") {
      start();
    }

    window.addEventListener("resize", onResize);
    const mo = new MutationObserver(onThemeChange);
    mo.observe(root, { attributes: true, attributeFilter: ["data-theme"] });

    return () => {
      stop();
      window.removeEventListener("resize", onResize);
      mo.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 -z-10 pointer-events-none"
    />
  );
}

