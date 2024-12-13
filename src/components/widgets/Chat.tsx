import { FC } from "react";

import { MessageForm, MessageList } from "@/components";

export const Chat: FC = () => {
  return (
    <div className="w-full h-[calc(100vh-73px)] flex flex-col px-8 py-4 items-center">
      <MessageList />
      <MessageForm />
    </div>
  );
};
