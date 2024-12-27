import { FC } from "react";

import { MessageForm, MessageList } from "@/components";

export const Chat: FC = () => {
  return (
    <div className="w-full h-[calc(100vh-73px)] flex flex-col px-4 py-4 items-center overflow-hidden">
      <MessageList />
      <MessageForm />
    </div>
  );
};
