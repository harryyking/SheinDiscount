import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Provider from "@/components/Provider";
import { Toaster } from "react-hot-toast";
import { getSEOTags } from "@/lib/seo";

const brandFont = Manrope({subsets: ["latin"]})

export const metadata = getSEOTags({
  twitter: {
    images: './favicon.ico'
  },
  openGraph: {
    images: '/favicon.ico'
  },
  keywords: ["graphs", "quick graphs", "beautiful graphs", "make graphs", "quickly make graphs"]
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <body
        className={brandFont.className}
      >
        <Provider>

        {children}
        <Toaster position="top-right"/>
        </Provider>
      </body>
    </html>
  );
}
