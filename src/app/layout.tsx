import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";

import "./globals.css";
import { Providers } from "./Providers";

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
    <html lang="en">
      <body className={`antialiased`}>
        <Providers>{children}</Providers>
        <Toaster position="bottom-right" reverseOrder={false} />
      </body>
    </html>
  );
}
