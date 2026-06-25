"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/mission", label: "Mission" },
  { href: "/collections", label: "Collections" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const isBrowser = typeof window !== "undefined";

  const toggleTheme = () => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  };

  // Apply theme by toggling a data attribute on <html>.
  useEffect(() => {
    if (!isBrowser) return;

    const root = document.documentElement;
    root.dataset.theme = theme;

    // Persist across refreshes.
    try {
      window.localStorage.setItem("theme", theme);
    } catch {
      // ignore
    }
  }, [theme, isBrowser]);

  // Read persisted theme on mount.
  useEffect(() => {
    if (!isBrowser) return;

    try {
      const saved = window.localStorage.getItem("theme");
      if (saved === "dark" || saved === "light") setTheme(saved);
    } catch {
      // ignore
    }
  }, [isBrowser]);

  // Scroll lock for the mobile overlay.
  useEffect(() => {
    if (!isBrowser) return;
    if (!menuOpen) return;

    const prevOverflow = document.body.style.overflow;
    const prevTouchAction = document.body.style.touchAction;

    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.touchAction = prevTouchAction;
    };
  }, [menuOpen, isBrowser]);

  // Escape closes menu.
  useEffect(() => {
    if (!isBrowser) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };

    if (menuOpen) {
      window.addEventListener("keydown", onKeyDown);
      return () => window.removeEventListener("keydown", onKeyDown);
    }

    return;
  }, [menuOpen, isBrowser]);

  const themeLabel = theme === "dark" ? "Dark" : "Light";

  return (
    <header
      className="site-header fixed top-0 left-0 w-full z-50 border-b border-white/10 backdrop-blur-xl"
      style={theme === "light" ? { borderColor: "rgba(17, 17, 17, 0.12)" } : undefined}
    >
      <div className="luxury-container h-16 md:h-20 flex items-center justify-between">
        <div className="site-header-logo flex items-center">
<Image
            src={theme === "dark"
              ? "/logo-light.png"
              : "/logo-dark.png"}
            alt="THE KYNXZ BRAND"
            width={220}
            height={50}
            priority
            className="h-10 md:h-12 w-auto"
          />
        </div>


        {/* Desktop navigation */}
        <nav className="site-header-nav hidden md:flex gap-10 text-sm uppercase tracking-[0.2em]">
          <a href="/" className="text-white/90 hover:text-white transition-colors" style={theme === "light" ? { color: "#111111" } : undefined}>Home</a>
          <a href="/about" className="text-white/90 hover:text-white transition-colors" style={theme === "light" ? { color: "#111111" } : undefined}>About</a>
          <a href="/mission" className="text-white/90 hover:text-white transition-colors" style={theme === "light" ? { color: "#111111" } : undefined}>Mission</a>
          <a href="/collections" className="text-white/90 hover:text-white transition-colors" style={theme === "light" ? { color: "#111111" } : undefined}>Collections</a>
          <a href="/contact" className="text-white/90 hover:text-white transition-colors" style={theme === "light" ? { color: "#111111" } : undefined}>Contact</a>
        </nav>

        {/* Desktop controls: theme toggle on the right */}
        <div className="hidden md:flex items-center gap-4">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Toggle theme (currently ${themeLabel})`}
            className="site-header-theme-toggle group inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs tracking-[0.18em] backdrop-blur transition-all duration-300 hover:bg-white/10 hover:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/30"
            style={theme === "light" ? {
              color: "#111111",
              borderColor: "rgba(17, 17, 17, 0.22)",
              background: "rgba(255, 255, 255, 0.42)",
            } : undefined}
          >
            <span className="mr-2 opacity-90">{theme === "dark" ? "DARK" : "LIGHT"}</span>
            <span
              aria-hidden
              className="site-header-theme-dot h-2 w-2 rounded-full bg-white/80 shadow-[0_0_18px_rgba(255,255,255,0.35)] opacity-90 transition-transform duration-300 group-hover:scale-110"
              style={theme === "light" ? {
                background: "#111111",
                boxShadow: "0 0 18px rgba(17, 17, 17, 0.2)",
              } : undefined}
            />
          </button>
        </div>

        {/* Mobile: hamburger menu */}
        <button
          type="button"
          className="site-header-menu-button md:hidden relative inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-4 py-2.5 backdrop-blur transition-all duration-300 hover:bg-white/10 hover:border-white/30"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((s) => !s)}
          style={theme === "light" ? {
            borderColor: "rgba(17, 17, 17, 0.22)",
            background: "rgba(255, 255, 255, 0.42)",
          } : undefined}
        >
          <span className="relative h-3.5 w-[18px]">
            <span
              aria-hidden
              className={`site-header-menu-line absolute left-0 top-0 h-[2px] w-full rounded-full bg-white/90 transition-all duration-300 ${
                menuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
              }`}
              style={theme === "light" ? { background: "#111111" } : undefined}
            />
            <span
              aria-hidden
              className={`site-header-menu-line absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 rounded-full bg-white/90 transition-all duration-200 ${
                menuOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"
              }`}
              style={theme === "light" ? { background: "#111111" } : undefined}
            />
            <span
              aria-hidden
              className={`site-header-menu-line absolute left-0 bottom-0 h-[2px] w-full rounded-full bg-white/90 transition-all duration-300 ${
                menuOpen ? "bottom-1/2 translate-y-1/2 -rotate-45" : "bottom-0"
              }`}
              style={theme === "light" ? { background: "#111111" } : undefined}
            />
          </span>
        </button>
      </div>

      {/* Mobile overlay – true full-screen glassmorphism overlay */}
      <div
        className={`mobile-menu-overlay fixed inset-0 z-[9999] w-screen h-screen md:hidden transition-all duration-500 ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!menuOpen}
        style={{
          background: theme === "dark"
            ? "rgba(0,0,0,0.96)"
            : "rgba(248, 246, 242, 0.96)",
          backdropFilter: "blur(32px) saturate(180%)",
          WebkitBackdropFilter: "blur(32px) saturate(180%)",
        }}
      >
        {/* Tap backdrop to close — full overlay coverage */}
        <button
          type="button"
          aria-label="Close menu"
          className="absolute inset-0 z-0 w-full h-full"
          onClick={() => setMenuOpen(false)}
        />

        {/* Premium close × button — positioned outside the centering container */}
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
          className="absolute right-5 z-20 inline-flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-300 hover:scale-110 hover:rotate-90 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/50"
          style={{
            top: "calc(env(safe-area-inset-top) + 8px)",
            borderColor:
              theme === "dark"
                ? "rgba(255,255,255,0.2)"
                : "rgba(17,17,17,0.15)",
            background:
              theme === "dark"
                ? "rgba(255,255,255,0.06)"
                : "rgba(17,17,17,0.04)",
          }}
        >
          <span aria-hidden className="relative block h-4 w-4">
            <span
              className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 rotate-45 rounded-full transition-all duration-300"
              style={{
                background:
                  theme === "dark"
                    ? "rgba(255,255,255,0.85)"
                    : "rgba(17,17,17,0.85)",
              }}
            />
            <span
              className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 -rotate-45 rounded-full transition-all duration-300"
              style={{
                background:
                  theme === "dark"
                    ? "rgba(255,255,255,0.85)"
                    : "rgba(17,17,17,0.85)",
              }}
            />
          </span>
        </button>

        {/* Centered menu panel */}
        <div
          className={`relative z-10 flex h-full w-full flex-col items-center px-6 transition-all duration-500 ${
            menuOpen
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
          style={{
            paddingTop: "calc(env(safe-area-inset-top) + 28px)",
          }}
        >
          {/* Theme toggle — positioned near the top, below close button */}
          <div
            className="w-full flex justify-center py-4"
            style={{
              transitionDelay: menuOpen ? `0ms` : "0ms",
              transition: "all 500ms cubic-bezier(0.22, 1, 0.36, 1)",
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? "translateY(0)" : "translateY(16px)",
            }}
          >
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={`Toggle theme (currently ${themeLabel})`}
              className="site-header-theme-toggle group inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-xs tracking-[0.18em] backdrop-blur transition-all duration-300 hover:bg-white/10 hover:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/30"
              style={theme === "light" ? {
                color: "#111111",
                borderColor: "rgba(17, 17, 17, 0.22)",
                background: "rgba(255, 255, 255, 0.42)",
              } : undefined}
            >
              <span className="mr-2 opacity-90">{theme === "dark" ? "DARK" : "LIGHT"}</span>
              <span
                aria-hidden
                className="site-header-theme-dot h-2 w-2 rounded-full bg-white/80 shadow-[0_0_18px_rgba(255,255,255,0.35)] opacity-90 transition-transform duration-300 group-hover:scale-110"
                style={theme === "light" ? {
                  background: "#111111",
                  boxShadow: "0 0 18px rgba(17, 17, 17, 0.2)",
                } : undefined}
              />
            </button>
          </div>

          {/* Top spacer — pushes nav to vertical center */}
          <div className="flex-1 min-h-0" />

          {/* Navigation links – perfectly vertically centered */}
          <nav className="flex w-full max-w-xs flex-col items-center justify-center gap-6">
            {navItems.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="mobile-menu-link group relative block w-full rounded-full border px-6 py-3.5 text-center text-sm font-semibold uppercase tracking-[0.15em] transition-all duration-400 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/40"
                style={{
                  color: theme === "dark" ? "#FFFFFF" : "#111111",
                  borderColor: theme === "dark"
                    ? "rgba(255,255,255,0.25)"
                    : "rgba(17,17,17,0.2)",
                  background: theme === "dark"
                    ? "rgba(255,255,255,0.06)"
                    : "rgba(255,255,255,0.5)",
                  transitionDelay: menuOpen ? `${i * 60}ms` : `${(navItems.length - 1 - i) * 60}ms`,
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen
                    ? "translateY(0)"
                    : "translateY(16px)",
                }}
              >
                <span className="relative z-10">{item.label}</span>
                {/* Hover glow overlay */}
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: theme === "dark"
                      ? "rgba(212, 168, 79, 0.12)"
                      : "rgba(212, 168, 79, 0.08)",
                  }}
                />
              </a>
            ))}
          </nav>

          {/* Bottom spacer — balances top spacer for perfect centering */}
          <div className="flex-1 min-h-0" />

          {/* Bottom padding for safe area bottom */}
          <div className="h-6" />
        </div>
      </div>
    </header>
  );
}
