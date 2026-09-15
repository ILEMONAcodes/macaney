import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Macaney | Sustainable African Beekeeping",
  description: "Master modern beekeeping and scale your apiary with our free guide.",
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex min-h-screen w-full flex-col overflow-x-hidden bg-stone-50 text-stone-950 antialiased`}>
        <Navbar />
        <div className="min-w-0 flex-grow">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
