import { useState } from "react";
import CalendarGrid from "../../components/calendar/CalendarGrid";
import DayDetail from "../../components/calendar/DayDetail";
import { useLedger } from "../../hooks/useLedger";
import { formatCurrency } from "../../lib/formatters";

const navBtn: React.CSSProperties = {
  background: "none",
  border: "none",
  fontSize: 20,
  cursor: "pointer",
  color: "#3d2c8d",
  padding: "4px 10px",
  lineHeight: 1,
};

export default function CalendarPage() {
  const { data, isLoading, error, year, month, monthLabel, setYear, setMonth } = useLedger();
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const totalAmount = (data ?? []).reduce((sum, e) => sum + e.amount, 0);

  function prevMonth() {
    setSelectedDay(null);
    if (month === 1) {
      setYear(year - 1);
      setMonth(12);
    } else {
      setMonth(month - 1);
    }
  }

  function nextMonth() {
    setSelectedDay(null);
    if (month === 12) {
      setYear(year + 1);
      setMonth(1);
    } else {
      setMonth(month + 1);
    }
  }

  function handleSelectDay(day: number) {
    setSelectedDay((prev) => (prev === day ? null : day));
  }

  return (
    <main style={{ padding: "20px 16px 120px", color: "#3d2c8d" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <button style={navBtn} onClick={prevMonth} aria-label="이전 달">
          ◀
        </button>
        <p style={{ margin: 0, fontWeight: 700, fontSize: 18 }}>{monthLabel}</p>
        <button style={navBtn} onClick={nextMonth} aria-label="다음 달">
          ▶
        </button>
      </div>

      <div
        style={{
          padding: "12px 16px",
          backgroundColor: "#f7f1ff",
          borderRadius: 16,
          marginBottom: 16,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: 14, color: "#5f4b8b" }}>이번 달 지출</span>
        <span style={{ fontSize: 20, fontWeight: 700, color: "#3d2c8d" }}>
          {formatCurrency(totalAmount)}원
        </span>
      </div>

      {isLoading ? (
        <p style={{ color: "#6a5495" }}>지출 데이터를 불러오는 중입니다...</p>
      ) : error ? (
        <p style={{ color: "#b33951" }}>데이터를 불러오지 못했습니다.</p>
      ) : (
        <>
          <CalendarGrid
            year={year}
            month={month}
            entries={data ?? []}
            selectedDay={selectedDay}
            onSelectDay={handleSelectDay}
          />

          {selectedDay != null && (
            <div style={{ marginTop: 16 }}>
              <DayDetail year={year} month={month} day={selectedDay} entries={data ?? []} />
            </div>
          )}
        </>
      )}
    </main>
  );
}
