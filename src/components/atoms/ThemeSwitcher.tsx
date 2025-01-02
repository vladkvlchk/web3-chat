"use client";

import { FC } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button, Skeleton } from "@/components";
import { useIsMounted } from "@/hooks";

export const ThemeSwitcher: FC = () => {
  const { theme, setTheme } = useTheme();
  const isMounted = useIsMounted();

  if (!isMounted) return <Skeleton className="h-10 w-10" />;

  const onSwitchTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <Button
      onClick={onSwitchTheme}
      variant="outline"
      size="sm"
      className="p-2 h-10 w-10 transition-all hover:scale-105 shadow-md"
    >
      <Sun className="h-[1.5rem] w-[1.5rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.5rem] w-[1.5rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
};
