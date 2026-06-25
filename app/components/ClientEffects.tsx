"use client";

import dynamic from "next/dynamic";

const DarkBackgroundFX = dynamic(
  () => import("./DarkBackgroundFX"),
  { ssr: false }
);

const PageTransition = dynamic(
  () => import("./PageTransition"),
  { ssr: false }
);

export default function ClientEffects({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DarkBackgroundFX />
      <PageTransition>{children}</PageTransition>
    </>
  );
}
