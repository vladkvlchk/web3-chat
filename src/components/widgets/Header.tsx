import type { FC } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export const Header: FC = () => {
  return (
    <header className="flex items-center justify-between px-8 py-4 border-b">
      <h1 className="text-xl font-bold">Web3 Chat 💬</h1>
      <ConnectButton
        accountStatus={{
          smallScreen: "avatar",
          largeScreen: "full",
        }}
      />
    </header>
  );
};
