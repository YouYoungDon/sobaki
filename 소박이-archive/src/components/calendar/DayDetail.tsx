import type { LedgerEntry } from "../../types/domain";
import { formatCurrency } from "../../lib/formatters";

interface Props {
  year: number;
  month: number;
  day: number;
  entries: LedgerEntry[];
}

export default function DayDetail({ year, month, day, entries }: Props) {
  const dayEntries = entries.filter((e) => {
    const d = new Date(e.savedAt);
    return d.getFullYear() === year && d.getMonth() + 1 === month && d.getDate() === day;
  });

  const total = dayEntries.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div
      style={{
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 16,
        boxShadow: "0 2px 12px rgba(61,44,141,0.09)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <p style={{ margin: 0, fontWeight: 700, fontSize: 16, color: "#3d2c8d" }}>
          {month}월 {day}일
        </p>
        {dayEntries.length > 0 && (
          <p style={{ margin: 0, fontWeight: 700, color: "#8e44ad" }}>
            {formatCurrency(total)}원
          </p>
        )}
      </div>

      {dayEntries.length === 0 ? (
        <p style={{ margin: 0, color: "#aaa", fontSize: 14, textAlign: "center", paddingBlock: 8 }}>
          이날 기록된 지출이 없어요.
        </p>
      ) : (
        <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
          {dayEntries.map((entry) => (
            <li
              key={entry.id}
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}
            >
              <div>
                <span
                  style={{
                    display: "inline-block",
                    padding: "2px 8px",
                    borderRadius: 10,
                    background: "#f0ebff",
                    color: "#5f4b8b",
                    fontSize: 12,
                    marginRight: 6,
                  }}
                >
                  {entry.category}
                </span>
                {entry.description && (
                  <span style={{ fontSize: 13, color: "#999" }}>{entry.description}</span>
                )}
              </div>
              <span style={{ color: "#3d2c8d", fontWeight: 600, whiteSpace: "nowrap" }}>
                {formatCurrency(entry.amount)}원
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
