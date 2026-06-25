"use client";

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

export default function PhilosophyImage({ src, alt }: PhilosophyImageProps) {
  return (
    <div className="relative w-full aspect-[4/3]">
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-contain rounded-2xl"
        loading="lazy"
      />
    </div>
  );
}
