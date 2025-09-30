import type { Metadata } from "next";
import "./globals.css";
import GooeyNav from "@/components/GooeyNav";

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
      <body
        className={`antialiased bg-background bg-[url(https://grainy-gradients.vercel.app/noise.svg)]`}>
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
