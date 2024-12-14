import type { FC } from "react";
import type { MessageItemProps } from "@/types";

export const MessageItem: FC<MessageItemProps> = ({ sender, text }) => {
  const isSenderMe = sender === "me";

  return (
    <li
      className={`flex overflow-hidden my-2 ${
        isSenderMe ? "flex-row-reverse" : ""
      }`}
    >
      <p className={`text-end inline-flex items-end opacity-70`}>
        {isSenderMe ? (
          <span className="h-8 w-8 p-1 bg-yellow-500 text-white rounded-full text-center">
            me
          </span>
        ) : (
          `${sender.slice(0, 4)}...${sender.slice(-4)}:`
        )}
      </p>
      <p className="break-words max-w-[calc(100%-130px)] bg-blue-100 rounded-md py-2 px-4 mx-2">
        {text}
      </p>
    </li>
  );
};
