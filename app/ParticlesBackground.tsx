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

      // Only render in light theme — dark theme has its own enhanced canvas
      if (isDarkNow) {
        particlesRef.current = [];
        return;
      }

      const base = Math.floor((innerWidth * innerHeight) / 38000);
      const count = Math.max(26, Math.floor(base * 0.65));

      const next: Particle[] = [];
      for (let i = 0; i < count; i++) {
        const r = 0.6 + Math.random() * 1.4;
        const speedMul = 0.55;
        const alphaBase = 0.04;
        const alphaSpan = 0.07;

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
      const { w, h } = sizeRef.current;
      ctx.clearRect(0, 0, w, h);

      const particles = particlesRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        const warm = 245 + Math.sin((i + p.x) * 0.0018) * 6;
        ctx.fillStyle = `rgba(${warm.toFixed(0)}, ${warm.toFixed(0)}, 232, ${p.a.toFixed(3)})`;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = "rgba(246, 245, 242, 0.03)";
      ctx.fillRect(0, 0, w, h);

      rafRef.current = window.requestAnimationFrame(draw);
    };

    const start = () => {
      if (prefersReduced) return;
      stop();
      setup();
      // Only start RAF if we actually have particles (light theme)
      if (particlesRef.current.length > 0) {
        rafRef.current = window.requestAnimationFrame(draw);
      }
    };

    const stop = () => {
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    const onResize = () => {
      if (!isDark()) start();
    };

    const onThemeChange = () => {
      if (!isDark()) {
        start();
      } else {
        stop();
      }
    };

    if (typeof window !== "undefined" && !isDark()) {
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

