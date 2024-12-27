import toast from "react-hot-toast";

export const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text).then(
    () => {
      toast.success("Copied to clipboard successfully!");
    },
    (err) => {
      toast.error("Failed to copy: ", err);
    }
  );
};
