"use client";

import { FC, useRef } from "react";

import { useGetAllMessages, useWatchMessagesFromEvent } from "@/hooks";
import { Button, LoadingSpinner, DayMessageGroup } from "@/components";
import { splitByDays2 } from "@/utils/helper/splitByDays";

export const MessageList: FC = () => {
  const ulRef = useRef<HTMLUListElement | null>(null);

  const { messages, isError, isLoading } = useGetAllMessages({ ulRef });
  const {
    data: messagesFromEvent,
    unreadAmount,
    onResetUnread,
    handleScroll,
  } = useWatchMessagesFromEvent({ ulRef });

  const allMessages = messages.concat(messagesFromEvent);
  const groupedByDays = splitByDays2(allMessages, {
    getTimestamp: (item) => item.timestamp,
  });

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
        className="relative flex-1 items-start w-full overflow-y-scroll px-[calc((100%-1024px)/2)]"
      >
        {groupedByDays.length ? (
          groupedByDays.map((group) => (
            <DayMessageGroup
              key={group.date}
              date={group.date}
              messages={group.content}
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
