export function formatTimestampToHHMM(
  timestamp: number
): `${string}:${string}` {
  const date = new Date(Number(timestamp) * 1000);

  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}`;
}
