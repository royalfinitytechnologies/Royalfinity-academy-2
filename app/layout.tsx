import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Caveat } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollIndicator from "@/components/ScrollIndicator";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const caveat = Caveat({
  variable: "--font-accent",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Royalfinity Academy | Learn Skills. Use Premium Tools. Build Your Future.",
  description: "Royalfinity Academy gives you real-world experience with free access to all paid tools — in an office-like environment where ambition is the dress code. Master MERN, PHP, and Marketing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0A0A0C] text-white selection:bg-amber-500 selection:text-black">
        <SmoothScroll>
          <Header />
          <ScrollIndicator />
          <main className="flex-grow overflow-x-hidden w-full">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
