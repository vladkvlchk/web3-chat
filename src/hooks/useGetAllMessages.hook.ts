import { useReadContract } from "wagmi";

import { contractConfig } from "@/utils/configs/contractConfig";
import { IMessage } from "@/types";

export const useGetAllMessages = () => {
  const { data: messages, ...others } = useReadContract({
    ...contractConfig,
    functionName: "getAllMessages",
  });

  return {
    messages: messages as IMessage[] | undefined,
    ...others,
  };
};
