
// Utility function to format UTC date string to IST format
export const formatISTDate = (utcDateString) => {
  return new Date(utcDateString + "Z").toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};
