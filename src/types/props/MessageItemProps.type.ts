import { TAddress } from "@/types";

export interface MessageItemProps {
  sender: TAddress;
  text: string;
  isSenderMe?: boolean;
}
