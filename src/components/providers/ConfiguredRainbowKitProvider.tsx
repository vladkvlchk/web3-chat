"use client";

import "@rainbow-me/rainbowkit/styles.css";
import { FC, ReactNode } from "react";
import {
  AvatarComponent,
  darkTheme,
  lightTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { useTheme } from "next-themes";

import { GeneratedIcon } from "@/components";
import { AVATAR_PIXELS } from "@/utils/constants";
import { useIsMounted } from "@/hooks";

const CustomAvatar: AvatarComponent = ({ address, size }) => {
  return <GeneratedIcon seed={address} scale={size / AVATAR_PIXELS} />;
};

export const ConfiguredRainbowKitProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { theme } = useTheme();
  const isMounted = useIsMounted();

  if (!isMounted) return null;

  const rainbowkitTheme = theme === "dark" ? darkTheme() : lightTheme();

  return (
    <RainbowKitProvider avatar={CustomAvatar} theme={rainbowkitTheme}>
      {children}
    </RainbowKitProvider>
  );
};
