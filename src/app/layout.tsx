import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "My Point Of View",
  description: "Welcome to the world I see",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased bg-background bg-[url(https://grainy-gradients.vercel.app/noise.svg)]`}
      >
        {children}
      </body>
    </html>
  );
}
