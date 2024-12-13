"use client";

import type { FC } from "react";
import { useAccount } from "wagmi";

import { IMessage } from "@/types";
import { useGetAllMessages } from "@/hooks";
import { LoadingSpinner, MessageItem } from "@/components";

export const MessageList: FC = () => {
  const { address } = useAccount();

  const { messages, isError, isLoading } = useGetAllMessages();

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
    <ul className="flex-1 items-start w-full max-w-5xl">
      {messages ? (
        messages.map((msg: IMessage, index) => (
          <MessageItem
            key={index}
            sender={msg.sender === address ? "me" : msg.sender}
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
