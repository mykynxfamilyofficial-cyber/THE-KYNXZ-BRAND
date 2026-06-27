"use client";

import { useRef, memo } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import type { ThemeColors } from "../hooks/useTheme";

/* ─────────────────────────────────────────────────────────
   KynxzStoryImage — Seamlessly blended image for TheStory section
   ─────────────────────────────────────────────────────────
   No bezel, border, outline, or container. The image sits
   naturally with a smooth edge fade (radial mask) and soft
   rounded corners, blending into the page background.
   ───────────────────────────────────────────────────────── */

interface KynxzStoryImageProps {
  C: ThemeColors;
}

function KynxzStoryImage({ C }: KynxzStoryImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -60 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      className="relative w-full overflow-visible"
    >
      {/* Image with smooth edge fade — seamlessly integrated into the background */}
      <div className="relative w-full aspect-[4/3]">
        <Image
          src="/kynxz-office.png"
          alt="THE KYNXZ BRAND — Our Studio"
          fill
          className="object-contain rounded-[2px]"
          style={{
            maskImage: "radial-gradient(ellipse at center, black 72%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 72%, transparent 100%)",
          }}
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </motion.div>
  );
}

export default memo(KynxzStoryImage);
