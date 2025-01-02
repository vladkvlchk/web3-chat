"use client";

import type { FC } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useBalance } from "wagmi";
import { formatUnits } from "viem";

import { FaucetButton, ThemeSwitcher } from "@/components";

export const Header: FC = () => {
  const { address, isConnected } = useAccount();
  const { data: balanceData } = useBalance({ address });

  const balanceInEth = balanceData
    ? parseFloat(formatUnits(balanceData.value, 18))
    : 0;
  const showFaucet = isConnected && balanceInEth < 0.01;

  return (
    <header className="flex items-center justify-between px-8 py-4 border-b">
      <h1 className="text-xl font-bold">Web3 Chat 💬</h1>
      <div className="flex gap-2">
        {showFaucet && <FaucetButton />}
        <ThemeSwitcher />
        <ConnectButton
          accountStatus={{
            smallScreen: "avatar",
            largeScreen: "full",
          }}
        />
      </div>
    </header>
  );
};
