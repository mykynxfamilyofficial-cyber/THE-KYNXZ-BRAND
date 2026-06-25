import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
// Critical fonts loaded immediately with swap strategy
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

// Direct import for client component (no ssr:false — safe in Server Components)
import LoadingScreen from "./components/LoadingScreen";

// Client-only effects (DarkBackgroundFX, PageTransition) moved to ClientEffects
import ClientEffects from "./components/ClientEffects";

// Global floating ScrollToExplore (fixed to viewport, rendered once)
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
