import { emojiList } from "./emojiList";

export const generateEmojiAvatar = (address: string): string => {
  //   if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
  //     throw new Error("Invalid Ethereum address");
  //   }

  const hash = address
    .slice(2)
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);

  const randomIndex = hash % emojiList.length;

  return emojiList[randomIndex];
};
