import { useState } from "react";
import { Button } from "@toss/tds-mobile";
import RoomCanvas from "../../components/room/RoomCanvas";
import SobakLottie from "../../components/sobak/SobakLottie";
import LedgerModal from "../../components/ledger/LedgerModal";
import { useRoom } from "../../hooks/useRoom";

export default function RoomPage() {
  const { data: room, isLoading, error } = useRoom();
  const [modalOpen, setModalOpen] = useState(false);

  if (isLoading) {
    return <p style={{ padding: 24, color: "#6a5495" }}>룸 데이터를 불러오는 중입니다...</p>;
  }

  if (error || !room) {
    return (
      <p style={{ padding: 24, color: "#b33951" }}>
        방 정보를 불러오지 못했습니다. 새로고침 후 다시 시도해 주세요.
      </p>
    );
  }

  return (
    <main style={{ padding: "20px 16px 120px", color: "#3d2c8d" }}>
      <section style={{ marginBottom: 20 }}>
        <h1 style={{ margin: 0, fontSize: 24 }}>{room.title}</h1>
        <p style={{ margin: "10px 0 0", lineHeight: 1.5 }}>{room.description ?? "내 방을 꾸며보세요."}</p>
      </section>

      <RoomCanvas backgroundUrl={room.backgroundImageUrl} items={room.items} />

      <section style={{ marginTop: 24, display: "grid", gap: 12 }}>
        <div style={{ backgroundColor: "#f7f1ff", borderRadius: 20, padding: 16 }}>
          <h2 style={{ margin: 0, fontSize: 16 }}>아이템</h2>
          <p style={{ margin: "8px 0 0", color: "#5f4b8b" }}>
            방에 배치된 아이템 {room.items.length}개
          </p>
        </div>
        <SobakLottie />
      </section>

      <div
        style={{
          position: "fixed",
          bottom: 80,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 100,
        }}
      >
        <Button
          color="primary"
          size="large"
          onClick={() => setModalOpen(true)}
          htmlStyle={{ borderRadius: 24, paddingInline: 28, boxShadow: "0 4px 16px rgba(61,44,141,0.25)" }}
        >
          오늘 기록하기
        </Button>
      </div>

      <LedgerModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </main>
  );
}
