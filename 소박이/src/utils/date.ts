// Returns 'YYYY-MM-DD' in device local timezone.
// Never use toISOString() for date grouping — it returns UTC.
export function getLocalDateString(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}
