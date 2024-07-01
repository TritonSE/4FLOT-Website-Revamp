import { Inter, Open_Sans, Roboto_Slab } from "next/font/google";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Future Leaders of Tomorrow",
  description: "4FLOT",
};

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});
const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-small-subtitle",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${openSans.variable} ${inter.variable} ${robotoSlab.variable}`}>
      <body>{children}</body>
    </html>
  );
}
