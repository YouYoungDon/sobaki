import type { LedgerEntry } from "../../types/domain";
import { formatCurrency } from "../../lib/formatters";

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

interface Props {
  year: number;
  month: number;
  entries: LedgerEntry[];
  selectedDay: number | null;
  onSelectDay: (day: number) => void;
}

export default function CalendarGrid({ year, month, entries, selectedDay, onSelectDay }: Props) {
  const firstWeekday = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();
  const today = new Date();

  const dailyTotals: Record<number, number> = {};
  for (const entry of entries) {
    const d = new Date(entry.savedAt);
    if (d.getFullYear() === year && d.getMonth() + 1 === month) {
      const day = d.getDate();
      dailyTotals[day] = (dailyTotals[day] ?? 0) + entry.amount;
    }
  }

  const cells: (number | null)[] = [
    ...Array<null>(firstWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", marginBottom: 4 }}>
        {WEEKDAYS.map((d, i) => (
          <div
            key={d}
            style={{
              textAlign: "center",
              fontSize: 12,
              color: i === 0 ? "#e03" : i === 6 ? "#06c" : "#999",
              paddingBlock: 6,
              fontWeight: 600,
            }}
          >
            {d}
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2 }}>
        {cells.map((day, i) => {
          if (day === null) return <div key={`e-${i}`} style={{ aspectRatio: "1" }} />;

          const total = dailyTotals[day];
          const isSelected = day === selectedDay;
          const isToday =
            today.getFullYear() === year &&
            today.getMonth() + 1 === month &&
            today.getDate() === day;
          const isSunday = (firstWeekday + day - 1) % 7 === 0;
          const isSaturday = (firstWeekday + day - 1) % 7 === 6;

          return (
            <button
              key={day}
              type="button"
              onClick={() => onSelectDay(day)}
              style={{
                border: "none",
                borderRadius: 8,
                padding: "6px 2px",
                background: isSelected ? "#3d2c8d" : isToday ? "#f0ebff" : "transparent",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
                minHeight: 44,
              }}
            >
              <span
                style={{
                  fontSize: 14,
                  fontWeight: isToday ? 700 : 400,
                  color: isSelected ? "#fff" : isSunday ? "#e03" : isSaturday ? "#06c" : "#222",
                }}
              >
                {day}
              </span>
              {total != null && (
                <span
                  style={{
                    fontSize: 9,
                    color: isSelected ? "#c9b8ff" : "#8e44ad",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    maxWidth: "100%",
                  }}
                >
                  {formatCurrency(total)}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
