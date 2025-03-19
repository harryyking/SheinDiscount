import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import Provider from "@/components/Provider";

const brandFont = Bricolage_Grotesque({subsets: ["latin"]})

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
    <html lang="en" data-theme={"halloween"}>
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
