import type { ItemSummary } from "../../types/domain";

interface CatalogCardProps {
  item: ItemSummary;
}

const rarityBg: Record<string, string> = {
  common: "#f4f1ff",
  rare: "#dbe7ff",
  epic: "#fde2ff",
  legendary: "#ffe8cc",
};

const rarityBorder: Record<string, string> = {
  common: "#c4b5fd",
  rare: "#93c5fd",
  epic: "#f0abfc",
  legendary: "#fcd34d",
};

export default function CatalogCard({ item }: CatalogCardProps) {
  return (
    <article
      style={{
        position: "relative",
        backgroundColor: rarityBg[item.rarity] ?? "#ffffff",
        border: `2px solid ${rarityBorder[item.rarity] ?? "#e2d9f3"}`,
        borderRadius: 12,
        padding: 8,
        boxShadow: "0 4px 8px rgba(111,66,193,0.08)",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      {item.iconUrl ? (
        <img src={item.iconUrl} alt={item.name} style={{ width: 40, height: 40, objectFit: "contain", borderRadius: 6 }} />
      ) : (
        <div style={{ width: 40, height: 40, margin: "0 auto", borderRadius: 6, backgroundColor: "#e9e3ff" }} />
      )}
      <p style={{ margin: "4px 0 0", fontSize: 11, fontWeight: 700, color: "#3d2c8d", wordBreak: "break-all" }}>{item.name}</p>
      {!item.acquired && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(30,20,60,0.55)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
          }}
        >
          <span style={{ fontSize: 20 }}>🔒</span>
        </div>
      )}
    </article>
  );
}
