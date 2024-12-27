import { FC } from "react";
import { useAccount } from "wagmi";

import { DayMessageGroupProps, IMessage } from "@/types";
import { MessageItem } from "./MessageItem";
import { formatTimestampToHHMM } from "@/utils/helper";

export const DayMessageGroup: FC<DayMessageGroupProps> = ({
  date,
  messages,
}) => {
  const { address } = useAccount();

  return (
    <>
      <div className="opacity-60 py-2 flex justify-center">
        <h3 className="text-sm bg-stone-200 w-max py-1 px-4 rounded-full">
          {date}
        </h3>
      </div>
      {messages.map((msg: IMessage, index: number) => (
        <MessageItem
          key={index}
          sender={msg.sender}
          isSenderMe={msg.sender === address}
          text={msg.text}
          hh_mm={formatTimestampToHHMM(msg.timestamp)}
        />
      ))}
    </>
  );
};
