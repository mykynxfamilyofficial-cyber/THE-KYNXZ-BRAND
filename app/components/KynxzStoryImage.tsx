"use client";

import { memo } from "react";
import Image from "next/image";
import type { ThemeColors } from "../hooks/useTheme";

/* ─────────────────────────────────────────────────────────
   KynxzStoryImage — Seamlessly blended image for TheStory section
   ─────────────────────────────────────────────────────────
   Premium luxury presentation with soft rounded corners,
   gentle ambient glow, edge fade mask, and subtle inner
   vignette — blending naturally into the background.
   ───────────────────────────────────────────────────────── */

interface KynxzStoryImageProps {
  C: ThemeColors;
}

function KynxzStoryImage({ C: _C }: KynxzStoryImageProps) {
  return (
    <div className="relative w-full overflow-visible">
      {/* Ambient glow behind image */}
      <div
        aria-hidden
        className="luxury-image-glow-bg -top-8 -left-8 -right-8 -bottom-8"
      />

      {/* Image frame with premium presentation */}
      <div className="relative w-full aspect-[4/3] luxury-image-frame">
        <Image
          src="/kynxz-office.png"
          alt="THE KYNXZ BRAND — Our Studio"
          fill
          className="object-cover luxury-image-edge-fade"
          style={{
            maskImage: "radial-gradient(ellipse at center, black 75%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 75%, transparent 100%)",
          }}
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </div>
  );
}

export default memo(KynxzStoryImage);
