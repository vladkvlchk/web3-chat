function formatDate(timestamp: number): string {
  const date = new Date(Number(timestamp) * 1000);
  const today = new Date();

  const isToday =
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

  if (isToday) {
    return "Today";
  }

  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    ...(date.getFullYear() !== today.getFullYear() && { year: "numeric" }),
  };

  return date.toLocaleDateString("en-US", options);
}

type SplitByDaysOptions<T> = {
  getTimestamp: (item: T) => number;
};

type Grouped<T> = {
  date: string;
  content: T[];
}[];

export function splitByDays2<T>(
  items: T[],
  options: SplitByDaysOptions<T>
): Grouped<T> {
  const { getTimestamp } = options;

  return items.reduce((arr, item) => {
    const timestamp = getTimestamp(item);

    // Use the custom formatDate function
    const date = formatDate(timestamp);

    // Check if the last group in the array matches the current date
    if (!arr.length || arr[arr.length - 1].date !== date) {
      arr.push({ date, content: [] }); // Add a new group for the current date
    }

    // Add the item to the content array of the last group
    arr[arr.length - 1].content.push(item);

    return arr;
  }, [] as Grouped<T>);
}
