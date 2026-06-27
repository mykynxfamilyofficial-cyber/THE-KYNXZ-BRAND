"use client";

import dynamic from "next/dynamic";

const PageTransition = dynamic(
  () => import("./PageTransition"),
  { ssr: false }
);

export default function ClientEffects({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageTransition>{children}</PageTransition>
    </>
  );
}
