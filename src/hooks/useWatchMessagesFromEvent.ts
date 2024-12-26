"use client";

import { useEffect, useState } from "react";
import { useWatchContractEvent } from "wagmi";

import { IMessage } from "@/types";
import { contractConfig } from "@/utils/configs/contractConfig";

export const useWatchMessagesFromEvent = ({ ulRef }) => {
  const [messagesFromEvent, setMessagesFromEvent] = useState<IMessage[]>([]);
  const [unreadAmount, setUnreadAmount] = useState<number>(0);

  const onResetUnread = () =>
    ulRef.current.scrollTo({
      top: ulRef.current.scrollHeight,
      behavior: "smooth",
    });

  const handleScroll = () => {
    if (ulRef && "current" in ulRef && ulRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = ulRef.current;
      const isUserAtBottom = scrollTop + clientHeight >= scrollHeight - 10;

      if (isUserAtBottom) setUnreadAmount(0);
    }
  };

  useWatchContractEvent({
    ...contractConfig,
    eventName: "NewMessage",
    onLogs(logs) {
      //   @ts-ignore
      setMessagesFromEvent((prev) => [...prev, { ...logs[0].args.message }]);
    },
  });

  useEffect(() => {
    if (ulRef && "current" in ulRef && ulRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = ulRef.current;
      const isUserAtBottom = scrollTop + clientHeight >= scrollHeight - 70;

      if (isUserAtBottom) ulRef.current.scrollTo(0, scrollHeight);
      if (!isUserAtBottom) setUnreadAmount((prev) => prev + 1);
    }
  }, [messagesFromEvent, ulRef]);

  return { data: messagesFromEvent, unreadAmount, onResetUnread, handleScroll };
};
