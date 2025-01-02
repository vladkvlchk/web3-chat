"use client";

import { FC, useState } from "react";
import { Check, Copy } from "lucide-react";

import { copyToClipboard } from "@/utils/helper/copyToClipboard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  GeneratedIcon,
} from "@/components";
import { AvatarWithDropdownProps } from "@/types";

export const AvatarWithDropdown: FC<AvatarWithDropdownProps> = ({ sender }) => {
  const [isCopyClicked, setIsCopyClicked] = useState<boolean>(false);

  const onClickCopy = () => {
    copyToClipboard(sender);
    setIsCopyClicked(true);
  };

  const onMouseLeaveHoverCard = () => setIsCopyClicked(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="h-fit">
        <GeneratedIcon seed={String(sender)} className="rounded-md" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-max flex items-center gap-2 p-3"
        onMouseLeave={onMouseLeaveHoverCard}
      >
        {isCopyClicked ? (
          <Check size={12} color={"green"} />
        ) : (
          <Copy size={12} onClick={onClickCopy} className="cursor-pointer" />
        )}
        {sender}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
