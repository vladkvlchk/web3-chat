"use client";

import { FC, useState } from "react";
import { Check, Copy } from "lucide-react";

import { generateEmojiAvatar } from "@/utils/helper/getEmojiByAddress";
import { copyToClipboard } from "@/utils/helper/copyToClipboard";
import {
  Avatar,
  AvatarFallback,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui";
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

  const avatarEmoji = generateEmojiAvatar(sender);

  return (
    <HoverCard>
      <HoverCardTrigger>
        <Avatar className="cursor-pointer">
          <AvatarFallback>{avatarEmoji}</AvatarFallback>
        </Avatar>
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
