import type { Metadata } from "next";
import { Inter, Oswald, Open_Sans, League_Gothic } from "next/font/google";
import { Chrome } from "@/components/layout/Chrome";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { Analytics } from "@vercel/analytics/next";
import "lenis/dist/lenis.css";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

const leagueGothic = League_Gothic({
  variable: "--font-league-gothic",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Evolve Sangh Foundation",
  description: "Living, Loving, Learning - Evolve Sangh Foundation",
  icons: {
    icon: "/nav/EVOLVE_final_LOGO%201.png",
    shortcut: "/nav/EVOLVE_final_LOGO%201.png",
    apple: "/nav/EVOLVE_final_LOGO%201.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${oswald.variable} ${openSans.variable} ${leagueGothic.variable} antialiased font-sans`}
      >
        <LenisProvider>
          <Chrome>{children}</Chrome>
        </LenisProvider>
        <Analytics />
      </body>
    </html>
  );
}
