import { useWriteContract } from "wagmi";
import { useMutation } from "@tanstack/react-query";

import { contractConfig } from "@/utils/configs/contractConfig";

export const useSendMessage = () => {
  const { writeContract } = useWriteContract();

  return useMutation({
    mutationFn: async (message: string) =>
      writeContract({
        ...contractConfig,
        functionName: "storeMessage",
        args: [message],
      }),
  });
};
