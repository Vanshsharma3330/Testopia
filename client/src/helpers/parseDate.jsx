export default function parseDateWithTime(date) {
  const dateP = new Date(date);

  const dateString = dateP.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // Use 12-hour clock
  });

  // Replace comma with ' at ' for formatting
  const formattedDate = dateString
    .replace(",", "")
    .replace(/(\d{1,2} \w{3} \d{4}) (\d{1,2}:\d{2} \w{2})/, "$1, $2");

  return formattedDate;
}

export function parseDate(date) {
  const dateP = new Date(date);

  const dateString = dateP.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  // Replace comma with ' at ' for formatting
  const formattedDate = dateString
    .replace(",", "")
    .replace(/(\d{1,2} \w{3} \d{4}) (\d{1,2}:\d{2} \w{2})/, "$1, $2");

  return formattedDate;
}

export function parseTimeFromDate(date) {
  const dateP = new Date(date);

  const dateString = dateP.toLocaleString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // Use 12-hour clock
  });

  // Replace comma with ' at ' for formatting
  const formattedDate = dateString
    .replace(",", "")
    .replace(/(\d{1,2} \w{3} \d{4}) (\d{1,2}:\d{2} \w{2})/, "$1, $2");

  return formattedDate;
}
