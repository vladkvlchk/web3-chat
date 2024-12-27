"use client";

import { FC } from "react";

import type { MessageItemProps } from "@/types";
import { AvatarWithHoverCard } from "@/components";

export const MessageItem: FC<MessageItemProps> = ({
  sender,
  text,
  isSenderMe = false,
  hh_mm,
}) => {
  return (
    <li
      className={`flex overflow-hidden my-2 ${
        isSenderMe ? "flex-row-reverse" : ""
      }`}
    >
      <AvatarWithHoverCard sender={sender} />
      <p
        className={`break-words max-w-[calc(100%-130px)] ${
          isSenderMe ? "bg-blue-200" : "bg-blue-100"
        } rounded-md py-2 px-4 mx-2`}
      >
        {text}
      </p>
      <p className="self-center text-sm opacity-60">{hh_mm}</p>
    </li>
  );
};
