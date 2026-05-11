import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

const BUDGET_KEY = "sobaki_monthly_budget";

function loadBudget(): string {
  return localStorage.getItem(BUDGET_KEY) ?? "";
}

export default function SettingsPage() {
  const { token, signOut } = useAuth();
  const [budget, setBudget] = useState<string>(loadBudget);
  const [saved, setSaved] = useState(false);

  function handleSave() {
    if (budget.trim()) {
      localStorage.setItem(BUDGET_KEY, budget.trim());
    } else {
      localStorage.removeItem(BUDGET_KEY);
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  return (
    <main style={{ padding: "20px 16px 120px", color: "#3d2c8d" }}>
      <section style={{ marginBottom: 16 }}>
        <h1 style={{ fontSize: 24, marginBottom: 8 }}>설정</h1>
        <p style={{ margin: 0, color: "#5f4b8b" }}>예산과 계정을 관리하세요.</p>
      </section>

      <section style={{ background: "#fff", borderRadius: 16, padding: "20px 16px", marginBottom: 16, boxShadow: "0 2px 8px rgba(61,44,141,0.07)" }}>
        <h2 style={{ fontSize: 18, marginBottom: 4 }}>월 예산</h2>
        <p style={{ margin: "0 0 16px", fontSize: 13, color: "#5f4b8b" }}>
          이번 달 지출 목표 금액을 설정해 두세요.
        </p>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <input
            type="number"
            min={0}
            value={budget}
            onChange={(e) => { setBudget(e.target.value); setSaved(false); }}
            placeholder="예: 500000"
            style={{ flex: 1, padding: "10px 12px", borderRadius: 10, border: "1.5px solid #c4b5f4", fontSize: 15, color: "#3d2c8d", outline: "none" }}
          />
          <span style={{ fontSize: 15, color: "#5f4b8b", whiteSpace: "nowrap" }}>원</span>
          <button
            onClick={handleSave}
            style={{ padding: "10px 18px", borderRadius: 10, border: "none", background: saved ? "#7c5cbf" : "#3d2c8d", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap", transition: "background 0.2s" }}
          >
            {saved ? "저장됨 ✓" : "저장"}
          </button>
        </div>
      </section>

      <section style={{ background: "#fff", borderRadius: 16, padding: "20px 16px", boxShadow: "0 2px 8px rgba(61,44,141,0.07)" }}>
        <h2 style={{ fontSize: 18, marginBottom: 4 }}>계정</h2>
        <p style={{ margin: "0 0 16px", fontSize: 13, color: "#5f4b8b" }}>
          {token ? "익명 로그인 상태입니다." : "로그인 정보가 없습니다."}
        </p>
        <button
          onClick={signOut}
          style={{ width: "100%", padding: "12px 0", borderRadius: 12, border: "1.5px solid #e0d4f7", background: "#fcf8ff", color: "#b33951", fontSize: 15, fontWeight: 600, cursor: "pointer" }}
        >
          로그아웃 / 초기화
        </button>
      </section>
    </main>
  );
}
