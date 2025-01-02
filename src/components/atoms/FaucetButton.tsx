"use client";

import { FC } from "react";
import { Fuel } from "lucide-react";

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components";
import { FAUCET } from "@/utils/constants";
import { useFaucet } from "@/hooks";

export const FaucetButton: FC = () => {
  const { txHash, faucetBalance, onGetTokens } = useFaucet();

  const isGetButtonDisabled =
    txHash || faucetBalance < FAUCET.LIMIT_ETH + FAUCET.FEE_SPREAD;

  return (
    <Dialog>
      <DialogTrigger className="border-red-500 border rounded-lg flex gap-2 py-2 px-3 hover:scale-105 transition-all shadow-sm shadow-red-300 hover:bg-red-100 dark:shadow-red-900 dark:hover:bg-red-950">
        <Fuel className="h-[1.2rem] w-[1.2rem]" color="red" />
        <p className="text-red-500">Faucet</p>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sepolia ETH Faucet</DialogTitle>
          <DialogDescription>
            Once a day you can get {FAUCET.LIMIT_ETH} ETH for free from the
            faucet that we created specially for our new users.
          </DialogDescription>
          <DialogDescription>
            Faucet Balance: {faucetBalance ? faucetBalance.slice(0, 6) : "???"}
            {" ETH"}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={onGetTokens} disabled={isGetButtonDisabled}>
            Get {FAUCET.LIMIT_ETH} ETH
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
