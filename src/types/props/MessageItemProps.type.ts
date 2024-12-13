import { TAddress } from "@/types";

export interface MessageItemProps {
  sender: TAddress | "me";
  text: string;
}
