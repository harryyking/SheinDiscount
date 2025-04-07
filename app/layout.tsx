import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Provider from "@/components/Provider";
import { Toaster } from "react-hot-toast";
import { getSEOTags } from "@/lib/seo";

const brandFont = Manrope({ subsets: ["latin"] });

export const metadata = getSEOTags({
  keywords: [
    // General Graphing Keywords
    "interactive graphs",
    "data visualization tools",
    "chart generator online",
    "custom graphs for web",
    "graphing software free",
    
    // Specific Graph Types
    "pie chart maker",
    "bar graph creator",
    "line chart generator",
    "multi-axis charts",
    "responsive chart design",
    
    // Developer-Focused Keywords
    "react chart library",
    "next.js data visualization",
    "chart.js customization",
    "dynamic graphs react",
    "themed charts css",
    
    // Feature-Specific Keywords
    "customizable graph colors",
    "graph tooltip options",
    "curved line charts",
    "grid-enabled charts",
    "dark mode graphs",
    
    // Industry/Application Keywords
    "business analytics graphs",
    "scientific data charts",
    "financial charting tools",
    "real-time data graphs",
    "dashboard graph widgets",
    
    // Long-Tail Keywords
    "how to create pie charts in react",
    "best tools for bar graphs online",
    "custom line charts with next.js",
    "free multi-color pie chart generator",
    "responsive data visualization for web apps"
  ],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={brandFont.className}>
        <Provider>
          {children}
          <Toaster position="top-right" />
        </Provider>
      </body>
    </html>
  );
}