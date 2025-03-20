import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import Provider from "@/components/Provider";

const brandFont = Space_Grotesk({subsets: ["latin"]})

export const metadata: Metadata = {
  title: "PricePulse",
  description: "Learn with Suzzy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme={"emerald"}>
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
