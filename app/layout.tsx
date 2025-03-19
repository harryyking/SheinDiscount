import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "@/components/Provider";

const brandFont = Inter({subsets: ["latin"]})

export const metadata: Metadata = {
  title: "WhatsLearn",
  description: "Learn with Suzzy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme={"light"}>
      <body
        className={brandFont.className}
      >
        <Provider>

        {children}
        </Provider>
      </body>
    </html>
  );
}
