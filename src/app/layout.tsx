import type { Metadata } from "next";
import { Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";
import Loader from "@/components/ui/Loader";

// Poppins — geometric sans-serif for structural headlines and body
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

// Playfair Display — editorial serif for italic accent spans
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["italic", "normal"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Yakult | Know Your Gut",
  description: "Science-driven probiotic goodness.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${playfairDisplay.variable}`}
        style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <Loader />
        {children}
      </body>
    </html>
  );
}
