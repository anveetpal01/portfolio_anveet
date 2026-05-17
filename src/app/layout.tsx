import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { personal } from "@/lib/content";
import Cursor from "@/components/Cursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fullName = `${personal.firstName} ${personal.lastName}`;

export const metadata: Metadata = {
  title: `${fullName} — Portfolio`,
  description: personal.tagline,
  keywords: [
    fullName,
    "portfolio",
    "python developer",
    "computer vision",
    "backend developer",
    "data analytics",
    "machine learning",
  ],
  authors: [{ name: fullName }],
  openGraph: {
    title: `${fullName} — Portfolio`,
    description: personal.tagline,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="grain min-h-screen bg-background text-foreground antialiased">
        <Cursor />
        {children}
      </body>
    </html>
  );
}
