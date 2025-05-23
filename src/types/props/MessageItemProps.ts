import { TAddress } from "@/types";

export interface MessageItemProps {
  sender: TAddress;
  text: string;
  hh_mm: `${string}:${string}`;
}
