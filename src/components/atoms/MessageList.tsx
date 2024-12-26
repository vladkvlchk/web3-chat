"use client";

import { FC, useRef } from "react";
import { useAccount } from "wagmi";

import { IMessage } from "@/types";
import { useGetAllMessages, useWatchMessagesFromEvent } from "@/hooks";
import { Button, LoadingSpinner, MessageItem } from "@/components";

export const MessageList: FC = () => {
  const { address } = useAccount();
  const ulRef = useRef<HTMLUListElement | null>(null);

  const { messages, isError, isLoading } = useGetAllMessages({ ulRef });
  const {
    data: messagesFromEvent,
    unreadAmount,
    onResetUnread,
    handleScroll,
  } = useWatchMessagesFromEvent({ ulRef });

  const allMessages = messages.concat(messagesFromEvent);

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
    <>
      <ul
        ref={ulRef}
        onScroll={handleScroll}
        className="relative flex-1 items-start w-full max-w-5xl overflow-scroll scrollbar-none"
      >
        {allMessages && allMessages.length ? (
          allMessages.map((msg: IMessage, index: number) => (
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
        {Boolean(unreadAmount) && (
          <Button
            className="sticky bg-purple-500 text-white bottom-1 ml-[50%] -translate-x-1/2 opacity-70 rounded-full"
            onClick={() => onResetUnread()}
          >
            {"\u2193  " + unreadAmount + " new messages"}
          </Button>
        )}
      </ul>
    </>
  );
};
