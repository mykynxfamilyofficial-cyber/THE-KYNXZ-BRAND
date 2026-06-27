"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/* ───────────────────────────────────────────────
   Loading Screen — Lightweight Pure CSS Preloader
   - Shows once per browser session (sessionStorage)
   - Pure CSS keyframe animation, no JS animation libs
   - Max 2 seconds, logo only
   ─────────────────────────────────────────────── */

const STORAGE_KEY = "kynxz_loaded";

const styleSheet = `
  @keyframes kynxz-loader-fade {
    0% {
      opacity: 0;
      transform: scale(0.96);
    }
    20% {
      opacity: 1;
      transform: scale(1);
    }
    30% {
      filter: drop-shadow(0 0 12px rgba(212, 168, 79, 0.45))
              drop-shadow(0 0 32px rgba(212, 168, 79, 0.2));
    }
    40% {
      filter: drop-shadow(0 0 6px rgba(212, 168, 79, 0.2));
    }
    75% {
      opacity: 1;
      filter: drop-shadow(0 0 0px transparent);
      transform: scale(1);
    }
    100% {
      opacity: 0;
      filter: drop-shadow(0 0 0px transparent);
      transform: scale(0.98);
    }
  }
`;

export default function LoadingScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Only show loader once per browser tab session
    if (typeof window !== "undefined" && sessionStorage.getItem(STORAGE_KEY)) {
      setShow(false);
      return;
    }
    sessionStorage.setItem(STORAGE_KEY, "1");

    const timer = setTimeout(() => setShow(false), 2100);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <>
      <style>{styleSheet}</style>
      <div
        aria-hidden
        className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden pointer-events-none select-none"
        style={{
          background: "#050505",
        }}
      >
        <div
          className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24"
          style={{
            animation: "kynxz-loader-fade 2s ease-in-out forwards",
          }}
        >
          <Image
            src="/logo-light.png"
            alt=""
            fill
            priority
            sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, 96px"
            className="object-contain"
          />
        </div>
      </div>
    </>
  );
}
