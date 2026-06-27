import type { Metadata } from "next";
import "./globals.css";
import { playfair, cormorant, inter } from "./fonts";

import LoadingScreen from "./components/LoadingScreen";
import ClientEffects from "./components/ClientEffects";
import ScrollToExplore from "./components/ScrollToExplore";


export const metadata: Metadata = {
  title: "THE KYNXZ BRAND | Timeless Luxury. Refined Living.",
  description:
    "Discover THE KYNXZ BRAND — a premium lifestyle destination inspired by timeless elegance, uncompromising quality, and refined living.",
  keywords: [
    "luxury lifestyle brand",
    "premium living",
    "home and living",
    "pet essentials",
    "travel accessories",
    "luxury accessories",
    "timeless elegance",
    "refined living",
    "THE KYNXZ BRAND",
  ],
  authors: [{ name: "THE KYNXZ BRAND" }],
  creator: "THE KYNXZ BRAND",
  publisher: "THE KYNXZ BRAND",
  metadataBase: new URL("https://kynxz.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "THE KYNXZ BRAND | Timeless Luxury. Refined Living.",
    description:
      "Discover THE KYNXZ BRAND — a premium lifestyle destination inspired by timeless elegance, uncompromising quality, and refined living.",
    url: "https://kynxz.com",
    siteName: "THE KYNXZ BRAND",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "THE KYNXZ BRAND — Timeless Luxury. Refined Living.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "THE KYNXZ BRAND | Timeless Luxury. Refined Living.",
    description:
      "Discover THE KYNXZ BRAND — a premium lifestyle destination inspired by timeless elegance, uncompromising quality, and refined living.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-touch-icon.svg", type: "image/svg+xml" }],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${playfair.variable} ${cormorant.variable} ${inter.variable}`}
    >
      <body>
        <LoadingScreen />
        <ClientEffects>{children}</ClientEffects>
        <ScrollToExplore />

      </body>
    </html>
  );
}
