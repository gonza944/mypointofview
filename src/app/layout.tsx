import type { Metadata } from "next";
import "./globals.css";
import GooeyNav from "@/components/GooeyNav";
import Noise from "@/components/Noise";

export const metadata: Metadata = {
  title: "My Point Of View",
  description: "Welcome to the world I see",
};

const items = [
  { label: "Home", href: "#" },
  { label: "Work", href: "#" },
  { label: "About", href: "#" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <div className="absolute top-0 left-0 h-[100dvh] w-[100dvw] z-[-1] overflow-hidden">
          <Noise
            patternSize={100}
            patternScaleX={1}
            patternScaleY={1}
            patternRefreshInterval={2}
            patternAlpha={25}
          />
        </div>
        {children}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2">
          <GooeyNav
            items={items}
            particleCount={39}
            particleDistances={[130, 30]}
            particleR={700}
            initialActiveIndex={0}
            animationTime={600}
            timeVariance={2000}
          />
        </div>
      </body>
    </html>
  );
}
