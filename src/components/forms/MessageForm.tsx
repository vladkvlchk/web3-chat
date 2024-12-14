"use client";

import { ChangeEvent, useState, FC, KeyboardEvent } from "react";
import { useAccount } from "wagmi";

import { Button, Input } from "@/components/ui";
import { useSendMessage } from "@/hooks";

export const MessageForm: FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const { isConnected } = useAccount();

  const { mutate } = useSendMessage();

  const sendMessage = (message: string) => {
    setInputValue("");
    mutate(message);
  };

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) =>
    setInputValue(e.target.value);

  const onInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputValue) {
      sendMessage(inputValue);
    }
  };

  const isSubmitDisabled = !inputValue || !isConnected;

  return (
    <form className="flex gap-2 w-full justify-center max-w-5xl my-2">
      <Input
        className="self-end justify-self-end"
        value={inputValue}
        placeholder="Hello, everyone! How are you doing?"
        onChange={onChangeInput}
        onKeyDown={onInputKeyDown}
      />
      <Button type="submit" disabled={isSubmitDisabled}>
        Send
        <p className="border-white rounded-md">↵</p>
      </Button>
    </form>
  );
};
