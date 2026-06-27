"use client";

import { memo } from "react";
import Image from "next/image";

/* ─────────────────────────────────────────────────────────
   PhilosophyImage — Clean, static premium image
   ─────────────────────────────────────────────────────────
   No bezel, border, glass, glow, or animation. Just a
   simple, elegant image with subtle 16px rounded corners.
   ───────────────────────────────────────────────────────── */

interface PhilosophyImageProps {
  src: string;
  alt: string;
}

function PhilosophyImage({ src, alt }: PhilosophyImageProps) {
  return (
    <div className="relative w-full aspect-[4/3]">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-contain rounded-2xl"
        loading="lazy"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  );
}

export default memo(PhilosophyImage);
