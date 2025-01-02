import { ToastAction } from "@radix-ui/react-toast";
import { ExternalLink } from "lucide-react";

export function ViewOnExplorerButton({ hash }: { hash: string }) {
  return (
    <ToastAction altText={"view on explorer"} className="border px-3 py-2 rounded-md ml-auto">
      <a
        href={`https://sepolia.etherscan.io/tx/${hash}`}
        target="_blank"
        rel="noopener noreferrer"
        className="underline flex gap-2 w-max flex-1 items-center"
      >
        View on Explorer <ExternalLink size={16} />
      </a>
    </ToastAction>
  );
}
