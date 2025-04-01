import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Provider from "@/components/Provider";
import { Toaster } from "react-hot-toast";

const brandFont = Manrope({subsets: ["latin"]})

export const metadata: Metadata = {
  title: "GraphCraft",
  description: "Make Charts easily with no code",
};

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
