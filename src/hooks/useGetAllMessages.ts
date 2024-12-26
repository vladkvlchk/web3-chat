"use client";

import { useEffect } from "react";
import { useReadContract } from "wagmi";

import { contractConfig } from "@/utils/configs/contractConfig";
import { IMessage } from "@/types";

export const useGetAllMessages = ({ ulRef }) => {
  const { data, isSuccess, isPending, ...others } = useReadContract({
    ...contractConfig,
    functionName: "getAllMessages",
    query: {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
  });

  useEffect(() => {
    if (ulRef && "current" in ulRef) {
      ulRef.current?.scrollTo(0, ulRef.current?.scrollHeight);
    }
  }, [data]);

  return {
    messages: (data as IMessage[]) || [],
    isSuccess,
    isPending,
    ...others,
  };
};
