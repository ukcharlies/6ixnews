import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "6ixNews - Latest News",
  description:
    "Stay updated with the latest news from Africa and around the world",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50 font-['Exo_2']">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
