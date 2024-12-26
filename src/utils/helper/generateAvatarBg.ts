const colorList = [
  "slate",
  "gray",
  "zinc",
  "neutral",
  "stone",
  "red",
  "orange",
  "amber",
  "yellow",
  "lime",
  "green",
  "emerald",
  "teal",
  "cyan",
  "sky",
  "blue",
  "indigo",
  "violet",
  "purple",
  "fuchsia",
  "pink",
  "rose",
];

export const generateAvatarBg = (address: string): string => {
  if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
    throw new Error("Invalid Ethereum address");
  }

  const hash = address
    .slice(2)
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);

  const randomIndex = hash % colorList.length;

  return `bg-gradient-to-br from-${colorList[randomIndex]}-300 to-${
    colorList[Math.round(randomIndex / 2)]
  }`;
};
