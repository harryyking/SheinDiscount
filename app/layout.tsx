import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import Provider from "@/components/Provider";

const brandFont = Be_Vietnam_Pro({subsets: ["latin"], weight: ["100", "200", "500", "700"]})

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
    <html lang="en">
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
