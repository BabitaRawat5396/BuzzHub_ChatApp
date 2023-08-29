

export const formatTimestamp = (timestamp) => {
  const now = new Date();
  const targetDate = new Date(timestamp);

  const diffTime = Math.abs(now - targetDate);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  const timeString = targetDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  if (diffDays === 0) {
    return timeString;
  } else if (diffDays === 1) {
    return "Yesterday";
  } else if (diffDays <= 7) {
    return targetDate.toLocaleDateString("en-US", { weekday: "long" });
  } else{
    return targetDate.toLocaleDateString("en-US");
  }
}

