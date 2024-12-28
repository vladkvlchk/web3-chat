"use client";

import "@rainbow-me/rainbowkit/styles.css";
import { FC, ReactNode } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";

import { ConfiguredRainbowKitProvider } from "./ConfiguredRainbowKitProvider";
import { ConfiguredWagmiProvider } from "./ConfiguredWagmiProvider";

const queryClient = new QueryClient();

export const Providers: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <ConfiguredWagmiProvider>
        <QueryClientProvider client={queryClient}>
          <ConfiguredRainbowKitProvider>
            {children}
          </ConfiguredRainbowKitProvider>
        </QueryClientProvider>
      </ConfiguredWagmiProvider>
    </ThemeProvider>
  );
};
