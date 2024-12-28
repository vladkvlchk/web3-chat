"use client";

import { FC } from "react";
import { useAccount } from "wagmi";

import type { MessageItemProps } from "@/types";
import { AvatarWithDropdown } from "@/components";

export const MessageItem: FC<MessageItemProps> = ({
  sender,
  text,
  hh_mm,
}) => {
  const { address } = useAccount();

  const isSenderMe = address === sender;

  return (
    <li
      className={`flex overflow-hidden my-2 ${
        isSenderMe ? "flex-row-reverse" : ""
      }`}
    >
      <AvatarWithDropdown sender={sender} />
      <p
        className={`break-words max-w-[calc(100%-130px)] ${
          isSenderMe
            ? "bg-blue-200 dark:bg-blue-800"
            : "bg-blue-100 dark:bg-blue-600"
        } rounded-md py-2 px-4 mx-2`}
      >
        {text}
      </p>
      <p className="self-center text-sm opacity-60">{hh_mm}</p>
    </li>
  );
};
