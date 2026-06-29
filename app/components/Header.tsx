"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/mission", label: "Mission" },
  { href: "/collections", label: "Collections" },
  { href: "/contact", label: "Contact" },
];

const drawerNavItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/mission", label: "Mission" },
  { href: "/collections", label: "Collections" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-of-service", label: "Terms of Service" },
  { href: "/shipping-policy", label: "Shipping Policy" },
  { href: "/return-policy", label: "Return Policy" },
];

/* ───────────────────────────────────────────────
   Simple inline SVG icons — sizes increased ~50%
   ─────────────────────────────────────────────── */
function HamburgerIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
      <path d="M3 6H25" />
      <path d="M3 14H25" />
      <path d="M3 22H25" />
    </svg>
  );
}

function CloseIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
      <path d="M6 6L22 22" />
      <path d="M22 6L6 22" />
    </svg>
  );
}

function SearchIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
      <circle cx="11" cy="11" r="7.5" />
      <path d="M17 17L23 23" />
    </svg>
  );
}

function AccountIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
      <circle cx="14" cy="9" r="5" />
      <path d="M4 25C4 20 8.5 17 14 17C19.5 17 24 20 24 25" />
    </svg>
  );
}

function OrdersIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="5" y="3" width="18" height="22" rx="2" />
      <path d="M10 9H18" />
      <path d="M10 14H18" />
      <path d="M10 19H14" />
    </svg>
  );
}

function CartIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 4H6L9 18H21L23 8H7" />
      <circle cx="10" cy="22" r="1.8" />
      <circle cx="21" cy="22" r="1.8" />
    </svg>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false); // mobile menu
  const [drawerOpen, setDrawerOpen] = useState(false); // desktop side drawer
  const [hidden, setHidden] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false); // mobile search expand
  const lastScrollY = useRef(0);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const [currentPath, setCurrentPath] = useState("/");

  const isBrowser = typeof window !== "undefined";

  // Read current path for active state
  useEffect(() => {
    if (isBrowser) {
      setCurrentPath(window.location.pathname);
    }
  }, [isBrowser]);

  // Auto-hide header on scroll down
  useEffect(() => {
    if (!isBrowser) return;
    const THRESHOLD = 10;
    const onScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;
      if (currentY <= 0) setHidden(false);
      else if (delta > THRESHOLD) setHidden(true);
      else if (delta < -THRESHOLD) setHidden(false);
      lastScrollY.current = currentY;
    };
    lastScrollY.current = window.scrollY;
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isBrowser]);

  // Show header when mobile menu opens
  useEffect(() => {
    if (menuOpen) setHidden(false);
  }, [menuOpen]);

  // Scroll lock for mobile menu
  useEffect(() => {
    if (!isBrowser || !menuOpen) return;
    const prevOverflow = document.body.style.overflow;
    const prevTouchAction = document.body.style.touchAction;
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";
    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.touchAction = prevTouchAction;
    };
  }, [menuOpen, isBrowser]);

  // Scroll lock for desktop drawer
  useEffect(() => {
    if (!isBrowser || !drawerOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [drawerOpen, isBrowser]);

  // Escape closes menus
  useEffect(() => {
    if (!isBrowser) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDrawerOpen(false);
        setMenuOpen(false);
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isBrowser]);

  // Focus search input when opened
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  // Close drawer on click outside
  useEffect(() => {
    if (!drawerOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        setDrawerOpen(false);
      }
    };
    const timer = setTimeout(() => {
      document.addEventListener("mousedown", handleClick);
    }, 50);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("mousedown", handleClick);
    };
  }, [drawerOpen]);

  // Close drawer on navigation
  const handleDrawerNav = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      {/* ═══════════════════════════════════════════
          HEADER BAR — rendered separately from drawer/overlay
          so that fixed-position overlays are not affected
          by the header's scroll transform.
          ═══════════════════════════════════════════ */}
      <header
        className="site-header fixed top-0 left-0 w-full z-50 border-b border-black/10 backdrop-blur-xl transition-transform duration-300"
        style={{
          transform: hidden ? "translateY(-100%)" : "translateY(0)",
          background: "rgba(248, 246, 240, 0.88)",
          WebkitBackdropFilter: "blur(16px) saturate(150%)",
          backdropFilter: "blur(16px) saturate(150%)",
          boxShadow: "0 1px 0 rgba(255, 255, 255, 0.6) inset, 0 8px 32px rgba(74, 58, 44, 0.06)",
        }}
      >
        <div className="luxury-container h-16 md:h-20 flex items-center">
          {/* ─── LEFT GROUP: Hamburger + Logo (flex row, no shrink) ─── */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Desktop hamburger */}
            <button
              type="button"
              onClick={() => setDrawerOpen((s) => !s)}
              aria-label={drawerOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={drawerOpen}
              className="hidden md:inline-flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/40"
              style={{
                color: "#1A1815",
                borderColor: "rgba(74,58,44,0.15)",
                background: "rgba(255,255,255,0.55)",
              }}
            >
              {drawerOpen ? <CloseIcon /> : <HamburgerIcon />}
            </button>

            {/* Logo — between hamburger and centered search bar */}
            <div className="site-header-logo flex items-center">
              <Image
                src="/logo-dark.png"
                alt="THE KYNXZ BRAND"
                width={200}
                height={45}
                priority
                className="h-9 md:h-[42px] w-auto"
              />
            </div>
          </div>

          {/* ─── CENTER: Search bar (perfectly centered) ─── */}
          <div className="absolute left-1/2 -translate-x-1/2 hidden md:block w-[280px] lg:w-[360px]">
            <div className="header-search-pill">
              <SearchIcon className="header-search-icon" />
              <input
                type="text"
                placeholder="Search products, collections..."
                className="header-search-input"
                aria-label="Search products and collections"
              />
            </div>
          </div>

          {/* ─── RIGHT: Icons + Mobile hamburger ─── */}
          <div className="flex items-center gap-2 md:gap-3 shrink-0 min-w-0 ml-auto">
            {/* Desktop action icons */}
            <button
              type="button"
              aria-label="Account"
              className="hidden md:inline-flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/40"
              style={{
                color: "#1A1815",
                borderColor: "rgba(74,58,44,0.12)",
                background: "rgba(255,255,255,0.4)",
              }}
            >
              <AccountIcon />
            </button>

            <button
              type="button"
              aria-label="Orders"
              className="hidden md:inline-flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/40"
              style={{
                color: "#1A1815",
                borderColor: "rgba(74,58,44,0.12)",
                background: "rgba(255,255,255,0.4)",
              }}
            >
              <OrdersIcon />
            </button>

            <button
              type="button"
              aria-label="Shopping Cart"
              className="hidden md:inline-flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/40"
              style={{
                color: "#1A1815",
                borderColor: "rgba(74,58,44,0.12)",
                background: "rgba(255,255,255,0.4)",
              }}
            >
              <CartIcon />
            </button>

            {/* Mobile search icon */}
            <button
              type="button"
              onClick={() => setSearchOpen((s) => !s)}
              aria-label="Toggle search"
              className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/40"
              style={{
                color: "#1A1815",
                borderColor: "rgba(74,58,44,0.15)",
                background: "rgba(255,255,255,0.55)",
              }}
            >
              <SearchIcon />
            </button>

            {/* Mobile hamburger */}
            <button
              type="button"
              className="site-header-menu-button md:hidden relative inline-flex items-center justify-center rounded-full border px-5 py-3 backdrop-blur transition-all duration-300 hover:bg-white/10"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((s) => !s)}
              style={{
                borderColor: "rgba(74, 58, 44, 0.2)",
                background: "rgba(255, 255, 255, 0.5)",
              }}
            >
              <span className="relative h-4 w-[20px]">
                <span
                  aria-hidden
                  className={`absolute left-0 top-0 h-[2.5px] w-full rounded-full bg-[#1A1815] transition-all duration-300 ${
                    menuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
                  }`}
                />
                <span
                  aria-hidden
                  className={`absolute left-0 top-1/2 h-[2.5px] w-full -translate-y-1/2 rounded-full bg-[#1A1815] transition-all duration-200 ${
                    menuOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"
                  }`}
                />
                <span
                  aria-hidden
                  className={`absolute left-0 bottom-0 h-[2.5px] w-full rounded-full bg-[#1A1815] transition-all duration-300 ${
                    menuOpen ? "bottom-1/2 translate-y-1/2 -rotate-45" : "bottom-0"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        {/* Mobile expandable search */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            searchOpen ? "max-h-16 opacity-100" : "max-h-0 opacity-0"
          }`}
          style={{
            background: "rgba(248,246,242,0.98)",
            borderBottom: searchOpen ? "1px solid" : "none",
            borderColor: "rgba(17,17,17,0.08)",
          }}
        >
          <div className="px-4 py-3">
            <div className="header-search-pill-mobile">
              <SearchIcon className="header-search-icon" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search products, collections..."
                className="header-search-input"
                aria-label="Search products and collections"
              />
            </div>
          </div>
        </div>
      </header>

      {/* ═══════════════════════════════════════════
          DESKTOP: Side drawer (left) — rendered OUTSIDE <header>
          to avoid transform-induced fixed-position bugs.
          ═══════════════════════════════════════════ */}
      <>
        {/* Backdrop overlay */}
        <div
          aria-hidden
          className={`hidden md:block fixed inset-0 z-40 transition-all duration-400 ${
            drawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
          style={{
            background: "rgba(0,0,0,0.4)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
        />

        {/* Drawer panel */}
        <div
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className={`hidden md:block fixed top-0 left-0 z-50 h-screen w-[300px] max-w-[85vw] transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] overflow-y-auto ${
            drawerOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          style={{
            background: "rgba(248,246,242,0.98)",
            backdropFilter: "blur(24px) saturate(180%)",
            WebkitBackdropFilter: "blur(24px) saturate(180%)",
            borderRight: "1px solid rgba(17,17,17,0.08)",
            paddingTop: "80px", /* account for header height */
          }}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setDrawerOpen(false)}
            aria-label="Close navigation menu"
            className="absolute top-4 right-4 inline-flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-300 hover:rotate-90 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/40"
            style={{
              borderColor: "rgba(17,17,17,0.12)",
              color: "rgba(17,17,17,0.7)",
            }}
          >
            <CloseIcon className="w-4 h-4" />
          </button>

          {/* Navigation links */}
          <nav className="px-6 pt-4 pb-8" aria-label="Main navigation">
            <p
              className="text-[9px] tracking-[0.28em] uppercase mb-6 px-1"
              style={{ color: "var(--color-accent)", opacity: 0.6 }}
            >
              Navigation
            </p>

            <ul className="space-y-1">
              {drawerNavItems.map((item) => {
                const isActive = currentPath === item.href;
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={handleDrawerNav}
                      className={`group flex items-center gap-3 px-4 py-3 rounded-xl text-sm tracking-[0.12em] uppercase transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/30 ${
                        isActive ? "header-drawer-link-active" : ""
                      }`}
                      style={{
                        color: isActive
                          ? "var(--color-accent)"
                          : "rgba(17,17,17,0.75)",
                        background: isActive
                          ? "rgba(74,58,44,0.08)"
                          : "transparent",
                        border: `1px solid ${
                          isActive
                            ? "var(--color-accent)"
                            : "transparent"
                        }`,
                        opacity: isActive ? 1 : 0.7,
                      }}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </>

      {/* ═══════════════════════════════════════════
          MOBILE overlay — full screen menu
          ═══════════════════════════════════════════ */}
      <div
        className={`mobile-menu-overlay fixed inset-0 z-[9999] w-screen h-screen md:hidden transition-all duration-500 ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!menuOpen}
        style={{
          background: "rgba(248, 246, 242, 0.96)",
          backdropFilter: "blur(32px) saturate(180%)",
          WebkitBackdropFilter: "blur(32px) saturate(180%)",
        }}
      >
        {/* Tap backdrop to close */}
        <button
          type="button"
          aria-label="Close menu"
          className="absolute inset-0 z-0 w-full h-full"
          onClick={() => setMenuOpen(false)}
        />

        {/* Close button */}
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
          className="absolute right-5 z-20 inline-flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-300 hover:scale-110 hover:rotate-90 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/50"
          style={{
            top: "calc(env(safe-area-inset-top) + 8px)",
            borderColor: "rgba(17,17,17,0.15)",
            background: "rgba(17,17,17,0.04)",
          }}
        >
          <span aria-hidden className="relative block h-4 w-4">
            <span
              className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 rotate-45 rounded-full bg-[rgba(17,17,17,0.85)] transition-all duration-300"
            />
            <span
              className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 -rotate-45 rounded-full bg-[rgba(17,17,17,0.85)] transition-all duration-300"
            />
          </span>
        </button>

        {/* Menu panel */}
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
          {/* Top spacer */}
          <div className="flex-1 min-h-0" />

          {/* Navigation links */}
          <nav className="flex w-full max-w-xs flex-col items-center justify-center gap-6">
            {navItems.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="mobile-menu-link group relative block w-full rounded-full border px-6 py-3.5 text-center text-sm font-semibold uppercase tracking-[0.15em] transition-all duration-400 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/40"
                style={{
                  color: "#111111",
                  borderColor: "rgba(17,17,17,0.2)",
                  background: "rgba(255,255,255,0.5)",
                  transitionDelay: menuOpen ? `${i * 60}ms` : `${(navItems.length - 1 - i) * 60}ms`,
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen
                    ? "translateY(0)"
                    : "translateY(16px)",
                }}
              >
                <span className="relative z-10">{item.label}</span>
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: "rgba(212, 168, 79, 0.08)",
                  }}
                />
              </a>
            ))}
          </nav>

          {/* Bottom spacer */}
          <div className="flex-1 min-h-0" />
          <div className="h-6" />
        </div>
      </div>
    </>
  );
}
