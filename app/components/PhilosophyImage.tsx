"use client";

import { memo } from "react";
import Image from "next/image";

/* ─────────────────────────────────────────────────────────
   PhilosophyImage — Premium luxury image presentation
   ─────────────────────────────────────────────────────────
   Soft rounded corners, gentle ambient glow, edge fade
   mask, and subtle inner vignette for a refined look.
   ───────────────────────────────────────────────────────── */

interface PhilosophyImageProps {
  src: string;
  alt: string;
}

function PhilosophyImage({ src, alt }: PhilosophyImageProps) {
  return (
    <div className="relative w-full overflow-visible">
      {/* Ambient glow behind image */}
      <div
        aria-hidden
        className="luxury-image-glow-bg -top-6 -left-6 -right-6 -bottom-6"
      />

      <div className="relative w-full aspect-[4/3] luxury-image-frame">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover luxury-image-edge-fade"
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </div>
  );
}

export default memo(PhilosophyImage);
