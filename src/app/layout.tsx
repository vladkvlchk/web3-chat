import type { Metadata } from "next";

import "./globals.css";
import { Toaster, Providers } from "@/components";

export const metadata: Metadata = {
  title: "Web3 Chat",
  description: "Communicate using blockchain technologies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased`}>
        <Providers>{children}</Providers>
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
