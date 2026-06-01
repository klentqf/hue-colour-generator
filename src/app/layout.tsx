import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MistBackground } from "@/components/mist-background";
import { AudioAutoplay } from "@/components/audio-autoplay";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "hue — ai colour palette generator",
  description: "create dreamy ai-generated colour palettes for websites, brands, apps, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased min-h-screen`}>
        <MistBackground />
        <AudioAutoplay />
        {children}
      </body>
    </html>
  );
}
