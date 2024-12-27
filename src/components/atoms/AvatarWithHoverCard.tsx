"use client";

import { FC, useState } from "react";
import { Check, Copy } from "lucide-react";

import { copyToClipboard } from "@/utils/helper/copyToClipboard";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  GeneratedIcon,
} from "@/components";
import { AvatarWithHoverCardProps } from "@/types";

export const AvatarWithHoverCard: FC<AvatarWithHoverCardProps> = ({
  sender,
}) => {
  const [isCopyClicked, setIsCopyClicked] = useState<boolean>(false);

  const onClickCopy = () => {
    copyToClipboard(sender);
    setIsCopyClicked(true);
  };

  const onMouseLeaveHoverCard = () => setIsCopyClicked(false);

  return (
    <HoverCard>
      <HoverCardTrigger className="hover:cursor-pointer">
        <GeneratedIcon seed={String(sender)} className="rounded-md" />
      </HoverCardTrigger>
      <HoverCardContent
        className="w-max flex items-center gap-1"
        onMouseLeave={onMouseLeaveHoverCard}
      >
        {isCopyClicked ? (
          <Check size={12} color={"green"} />
        ) : (
          <Copy size={12} onClick={onClickCopy} className="cursor-pointer" />
        )}
        {sender}
      </HoverCardContent>
    </HoverCard>
  );
};
