import "./globals.css";
import type { Metadata } from "next";
import localFont from 'next/font/local';
import { ThemeProvider } from "@/components/theme-provider";

// Font files can be colocated inside of `app`
const monocraft = localFont({
  src: [
    {
      path: '../../public/fonts/Monocraft-Light-09.ttf',
      weight: '300', 
    },
    {
      path: '../../public/fonts/Monocraft-01.ttf',
      weight: '500', 
    },
    {
      path: '../../public/fonts/Monocraft-Bold-05.ttf',
      weight: '900', 
    },
  ],
  variable: '--font-monocraft', // Add a variable name for easier CSS integration
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:3000"),

  // Primary Metadata
  title: {
    default: "Pokédex | A simple catalogue webpage where you can list and view details of the Pokemons.",
    template: "%s | Pokédex",
  },
  description:
    "Explore the ultimate Pokédex - a comprehensive digital encyclopedia featuring detailed information about Pokémon species, abilities, evolutions, stats, and more. Discover, search, and learn about all your favorite Pokémon.",

  // Keywords for SEO
  keywords: [
    "Pokédex",
    "Pokémon",
    "Pokémon encyclopedia",
    "Pokémon database",
    "Pokémon stats",
    "Pokémon abilities",
    "Pokémon evolution",
    "Pokémon catalogue",
    "Pokémon species",
    "Pokémon information",
  ],

  // Creator
  creator: "Stephen Coloma",

  // Open Graph (for Facebook, LinkedIn, Discord, etc.)
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:3000",
    siteName: "Pokédex",
    title: "Pokédex | A simple catalogue webpage where you can list and view details of the Pokemons.",
    description:
      "Explore the ultimate Pokédex - a comprehensive digital encyclopedia featuring detailed information about Pokémon species, abilities, evolutions, stats, and more. Discover, search, and learn about all your favorite Pokémon.",
    images: [
      {
        url: "/banner.png",
        width: 1200,
        height: 630,
        alt: "Pokédex - A simple catalogue webpage where you can list and view details of the Pokemons.",
        type: "image/png",
      },
    ],
  },

  // Icons & Manifest
  icons: {
    icon: [
      { url: "/pokeball-icon.svg", sizes: "any" },
      { url: "/pokeball-icon.svg", sizes: "16x16", type: "image/png" },
      { url: "/pokeball-icon.svg", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/pokeball-icon.svg", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "mask-icon", url: "/pokeball-icon.svg", color: "#ef4444" },
    ],
  },
  manifest: "/site.webmanifest",

  // App Configuration
  applicationName: "Pokédex",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Pokédex",
  },

  // Format Detection
  formatDetection: {
    telephone: false,
  },

  // Robots
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

  // Additional
  category: "entertainment",
  classification: "Pokémon Encyclopedia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${monocraft.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
