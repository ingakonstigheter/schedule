export function formatTime(date: Date): string {
  return new Intl.DateTimeFormat("sv-SE", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("sv-SE", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}
export function formatDateTime(date: Date): string {
  return `${formatDate(date)} ${formatTime(date)}`;
}
