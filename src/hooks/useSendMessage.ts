"use client";

import { useEffect, useRef } from "react";
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { contractConfig } from "@/utils/configs/contractConfig";

export const useSendMessage = () => {
  const { address: account } = useAccount();
  const { data: hash, writeContract } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash });

  const toastIdRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (isConfirming && !toastIdRef.current) {
      toastIdRef.current = toast.loading("Confirming " + hash);
    }

    if (isConfirmed && toastIdRef.current) {
      toast.success("Tx confirmed " + hash);
      toast.dismiss(toastIdRef.current);
      toastIdRef.current = undefined;
    }
  }, [isConfirming, isConfirmed, hash]);

  return useMutation({
    mutationFn: async (message: string) =>
      writeContract({
        ...contractConfig,
        functionName: "storeMessage",
        args: [message],
        chain: undefined,
        account,
      }),
    onError(error) {
      toast.error(error.message);
    },
  });
};
