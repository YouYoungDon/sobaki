import { Badge, ProgressBar } from "@toss/tds-mobile";
import type { QuestSummary } from "../../types/domain";

interface QuestCardProps {
  quest: QuestSummary;
  onProgress: () => void;
}

const RARITY_COLOR = {
  common: "elephant",
  rare: "blue",
  epic: "teal",
  legendary: "yellow",
} as const;

export default function QuestCard({ quest, onProgress }: QuestCardProps) {
  const progressRatio = quest.target > 0 ? quest.progress / quest.target : 0;
  return (
    <article style={{ backgroundColor: "#fff7fe", borderRadius: 20, padding: 16, boxShadow: "0 10px 20px rgba(111,66,193,0.08)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>{quest.title}</p>
          <p style={{ margin: "4px 0 8px", color: "#5f4b8b", fontSize: 13 }}>
            {quest.progress} / {quest.target}
          </p>
          <ProgressBar progress={progressRatio} size="normal" color={quest.completed ? "#5f4b8b" : "#8e44ad"} animate />
        </div>
        <button
          type="button"
          style={{
            border: 0,
            borderRadius: 14,
            padding: "10px 16px",
            backgroundColor: quest.completed ? "#dcd7ff" : "#8e44ad",
            color: quest.completed ? "#5f4b8b" : "#fff",
            cursor: quest.completed ? "default" : "pointer",
            flexShrink: 0,
            alignSelf: "flex-start",
          }}
          onClick={onProgress}
          disabled={quest.completed}
        >
          {quest.completed ? "완료" : "진행"}
        </button>
      </div>
      {quest.rewardItem && (
        <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 8 }}>
          {quest.rewardItem.iconUrl && (
            <img
              src={quest.rewardItem.iconUrl}
              alt={quest.rewardItem.name}
              style={{ width: 24, height: 24, objectFit: "contain", borderRadius: 4 }}
            />
          )}
          <span style={{ color: "#6a5495", fontSize: 13 }}>보상: {quest.rewardItem.name}</span>
          <Badge variant="weak" size="xsmall" color={RARITY_COLOR[quest.rewardItem.rarity]}>
            {quest.rewardItem.rarity}
          </Badge>
        </div>
      )}
    </article>
  );
}
