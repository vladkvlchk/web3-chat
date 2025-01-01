"use client";

import { FC, useEffect, useRef, useState } from "react";
import { Fuel } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useAccount, useWaitForTransactionReceipt } from "wagmi";

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  ViewOnExplorerButton,
} from "@/components";
import { FAUCET } from "@/utils/constants";

export const FaucetButton: FC = () => {
  const { address } = useAccount();
  const [faucetBalance, setFaucetBalance] = useState(null);
  const [txHash, setTxHash] = useState(null);
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash: txHash });

  const toastIdRef = useRef(undefined);

  const onGetTokens = async () => {
    try {
      const { data } = await axios.post("/api/faucet", { toAddress: address });
      setTxHash(data.data.txHash);
    } catch (error) {
      toast.error(error.message || "Something wrong");
    }
  };

  useEffect(() => {
    const fetchFaucetBalance = async () => {
      try {
        const { data } = await axios.get("/api/faucet");
        setFaucetBalance(data.data.balance);
      } catch (error) {
        toast.error(error.message || "Something wrong");
      }
    };

    fetchFaucetBalance();
  }, [isConfirmed]);

  useEffect(() => {
    if (isConfirming && !toastIdRef.current) {
      toastIdRef.current = toast.loading("Sending tokens from the faucet...", {
        action: txHash ? <ViewOnExplorerButton hash={txHash} /> : undefined,
      });
    }

    if (isConfirmed && toastIdRef.current) {
      toast.success("Tokens received");
      toast.dismiss(toastIdRef.current);
      toastIdRef.current = undefined;
    }
  }, [isConfirming, isConfirmed, txHash]);

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
