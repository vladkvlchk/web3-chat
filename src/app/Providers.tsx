"use client";

import "@rainbow-me/rainbowkit/styles.css";
import { FC, ReactNode } from "react";
import {
  AvatarComponent,
  getDefaultConfig,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { sepolia } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import { GeneratedIcon } from "@/components";
import { AVATAR_PIXELS } from "@/utils/constants";

const wagmiConfig = getDefaultConfig({
  appName: "Web3 Chat",
  projectId: "YOUR_PROJECT_ID",
  chains: [sepolia],
  ssr: true,
});

const queryClient = new QueryClient();

const CustomAvatar: AvatarComponent = ({ address, size }) => {
  return <GeneratedIcon seed={address} scale={size / AVATAR_PIXELS} />;
};

export const Providers: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider avatar={CustomAvatar}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
