import type { FC } from "react";

import { MessageItemProps } from "@/types";

export const MessageItem: FC<MessageItemProps> = ({ sender, text }) => {
  return (
    <li className="flex">
      <p
        className={`mx-2 w-24 text-end ${
          sender === "me"
            ? "text-white bg-gradient-to-r from-white to-stone-600"
            : "opacity-70"
        }`}
      >
        {sender === "me"
          ? "me:"
          : sender.slice(0, 4) + "..." + sender.slice(-4) + ":"}
      </p>
      <p>{text}</p>
    </li>
  );
};
