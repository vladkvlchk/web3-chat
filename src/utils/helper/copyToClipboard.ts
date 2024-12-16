export const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text).then(
    () => {
      //TODO: replace with toaster
      console.log("Copied to clipboard successfully!");
    },
    (err) => {
      //TODO: replace with toaster
      console.error("Failed to copy: ", err);
    }
  );
};
