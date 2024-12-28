"use client";

import { useEffect, useRef } from "react";
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { ExternalLink } from "lucide-react";

import { contractConfig } from "@/utils/configs/contractConfig";
import { ToastAction } from "@/components";

export const useSendMessage = () => {
  const { address: account } = useAccount();
  const { data: hash, writeContract } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash });

  const toastIdRef = useRef(undefined);

  useEffect(() => {
    if (isConfirming && !toastIdRef.current) {
      toastIdRef.current = toast.loading("Confirming...", {
        action: hash ? <ToastButton hash={hash} /> : undefined,
      });
    }

    if (isConfirmed && toastIdRef.current) {
      toast.success("Tx confirmed");
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

function ToastButton({ hash }: { hash: string }) {
  return (
    <ToastAction
      altText={"view on explorer"}
      style={{ position: "absolute", right: "8px" }}
    >
      <a
        href={`https://sepolia.etherscan.io/tx/${hash}`}
        target="_blank"
        rel="noopener noreferrer"
        className="underline flex gap-1"
      >
        View on Explorer <ExternalLink size={16} />
      </a>
    </ToastAction>
  );
}
