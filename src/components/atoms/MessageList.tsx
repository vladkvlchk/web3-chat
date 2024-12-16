"use client";

import { FC, useEffect, useRef } from "react";
import { useAccount } from "wagmi";

import { IMessage } from "@/types";
import { useGetAllMessages } from "@/hooks";
import { LoadingSpinner, MessageItem } from "@/components";

export const MessageList: FC = () => {
  const { address } = useAccount();
  const ulRef = useRef<HTMLUListElement | null>(null);

  const { messages, isError, isLoading } = useGetAllMessages();

  useEffect(() => {
    if (!isLoading && ulRef.current) {
      ulRef.current.scrollTo({
        top: ulRef.current.scrollHeight,
      });
    }
  }, [messages, isLoading]);

  if (isError)
    return (
      <div className="w-full h-[calc(100vh-73px)] flex items-center justify-center text-red-500">
        {"Something wrong :("}
      </div>
    );

  if (isLoading)
    return (
      <div className="w-full h-[calc(100vh-73px)] flex items-center justify-center">
        <LoadingSpinner>Loading...</LoadingSpinner>
      </div>
    );

  return (
    <ul
      ref={ulRef}
      className="flex-1 items-start w-full max-w-5xl overflow-scroll scrollbar-none"
    >
      {messages ? (
        messages.map((msg: IMessage, index: number) => (
          <MessageItem
            key={index}
            sender={msg.sender}
            isSenderMe={msg.sender === address}
            text={msg.text}
          />
        ))
      ) : (
        <li className="w-full h-[calc(100vh-73px)] flex items-center justify-center opacity-50">
          no message
        </li>
      )}
    </ul>
  );
};
