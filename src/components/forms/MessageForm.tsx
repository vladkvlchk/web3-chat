"use client";

import React, { ChangeEvent, useState, FC, KeyboardEvent } from "react";
import { useAccount } from "wagmi";
import { toast } from "sonner"

import { Button, Input } from "@/components/ui";
import { useSendMessage } from "@/hooks";

export const MessageForm: FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const { isConnected } = useAccount();

  const { mutateAsync } = useSendMessage();

  const send = async () => {
    if (!inputValue.trim()) return;

    try {
      await mutateAsync(inputValue.trim());
      setInputValue("");
    } catch (error) {
      toast.error("Something wrong");
    }
  };

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) =>
    setInputValue(e.target.value);

  const onInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") send();
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    send();
  };

  const isSubmitDisabled = !inputValue.trim() || !isConnected;

  return (
    <>
      <form
        className="flex gap-2 w-full justify-center max-w-5xl my-2"
        onSubmit={onSubmit}
      >
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
    </>
  );
};
