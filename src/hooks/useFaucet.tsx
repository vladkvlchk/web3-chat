import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useAccount, useWaitForTransactionReceipt } from "wagmi";

import { ViewOnExplorerButton } from "@/components";

export const useFaucet = () => {
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

  return { txHash, faucetBalance, onGetTokens };
};
