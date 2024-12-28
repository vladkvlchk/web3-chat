"use client";

import "@rainbow-me/rainbowkit/styles.css";
import { FC, ReactNode } from "react";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { sepolia } from "wagmi/chains";

const wagmiConfig = getDefaultConfig({
  appName: "Web3 Chat",
  projectId: "YOUR_PROJECT_ID",
  chains: [sepolia],
  ssr: true,
});

export const ConfiguredWagmiProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  return <WagmiProvider config={wagmiConfig}>{children}</WagmiProvider>;
};
