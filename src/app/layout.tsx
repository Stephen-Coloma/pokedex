import type { Metadata } from "next";
import localFont from 'next/font/local';
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

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
  title: "Pokedex",
  description: "POKEDEX - a simple catalogue webpage where you can list and view details of the Pokemons.",
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
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
