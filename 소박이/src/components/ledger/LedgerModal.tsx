import { useState } from "react";
import { BottomSheet, Button, TextField } from "@toss/tds-mobile";
import { useLedger } from "../../hooks/useLedger";

const CATEGORIES = ["식비", "교통", "쇼핑", "문화", "의료/건강", "기타"];

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function LedgerModal({ open, onClose }: Props) {
  const { saveLedgerEntry } = useLedger();
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const parsedAmount = parseInt(amount.replace(/[^0-9]/g, ""), 10);
  const isValid = category !== "" && !isNaN(parsedAmount) && parsedAmount > 0;

  const resetForm = () => {
    setAmount("");
    setCategory("");
    setDescription("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async () => {
    if (!isValid || isSubmitting) return;
    try {
      setIsSubmitting(true);
      await saveLedgerEntry({
        category,
        amount: parsedAmount,
        description: description.trim() || undefined,
      });
      resetForm();
      onClose();
    } catch {
      // keep modal open on error
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <BottomSheet
      open={open}
      onClose={handleClose}
      onDimmerClick={handleClose}
      hasTextField
      header={<BottomSheet.Header>오늘 기록하기</BottomSheet.Header>}
      cta={
        <BottomSheet.CTA>
          <Button
            display="full"
            disabled={!isValid || isSubmitting}
            loading={isSubmitting}
            onClick={handleSubmit}
          >
            기록하기
          </Button>
        </BottomSheet.CTA>
      }
    >
      <div style={{ padding: "4px 20px 16px", display: "flex", flexDirection: "column", gap: 24 }}>
        <TextField
          variant="line"
          label="금액"
          placeholder="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          inputMode="numeric"
          suffix="원"
        />

        <div>
          <p style={{ margin: "0 0 10px", fontSize: 13, color: "#999", fontWeight: 500 }}>카테고리</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat === category ? "" : cat)}
                style={{
                  padding: "8px 16px",
                  borderRadius: 20,
                  border: "none",
                  background: category === cat ? "#3d2c8d" : "#f0ebff",
                  color: category === cat ? "#fff" : "#3d2c8d",
                  fontSize: 14,
                  cursor: "pointer",
                  fontWeight: category === cat ? 600 : 400,
                  transition: "all 0.15s",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <TextField
          variant="line"
          label="메모 (선택)"
          placeholder="어디서 얼마나 아꼈나요?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
    </BottomSheet>
  );
}
