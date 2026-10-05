import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bugatti Chiron — La Signature C",
  description:
    "An interactive look at the Bugatti Chiron: the 8.0-litre quad-turbo W16, 1,479 PS, and the C-line that Franco Scaglione drew in 2016.",
  openGraph: {
    title: "Bugatti Chiron — La Signature C",
    description:
      "1,479 PS. 0–100 km/h in 2.4 seconds. Explore the Chiron in 3D.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#05070c",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}