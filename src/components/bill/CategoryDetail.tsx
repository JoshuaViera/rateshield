"use client";

import { CostCategory, F, FM } from "@/lib/data/billData";

interface CategoryDetailProps {
  cat: CostCategory;
}

export default function CategoryDetail({ cat }: CategoryDetailProps) {
  const yoyColor =
    cat.yoyDir === "up"
      ? "#DC2626"
      : cat.yoyDir === "mod"
        ? "#EA580C"
        : "#6B7280";
  const yoyBg =
    cat.yoyDir === "up"
      ? "#FEF2F2"
      : cat.yoyDir === "mod"
        ? "#FFF7ED"
        : "#F3F4F6";

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 14,
        padding: 18,
        borderLeft: `4px solid ${cat.color}`,
        boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
        animation: "fadeSlideUp 0.25s ease",
      }}
    >
      <style>{`@keyframes fadeSlideUp { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }`}</style>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 4,
        }}
      >
        <div>
          <div
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: "#111827",
              fontFamily: F,
            }}
          >
            {cat.label}
          </div>
          <div
            style={{
              fontSize: 11,
              color: cat.controllable ? "#0D9488" : "#6B7280",
              fontFamily: F,
              fontWeight: 600,
              marginTop: 1,
            }}
          >
            {cat.controllable ? "You can reduce this" : "You can't control this"}
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div
            style={{
              fontSize: 18,
              fontWeight: 800,
              color: "#111827",
              fontFamily: FM,
            }}
          >
            ${cat.amount.toFixed(2)}
          </div>
          <div style={{ fontSize: 11, color: "#9CA3AF", fontFamily: F }}>
            {cat.pct}% of bill
          </div>
        </div>
      </div>

      <div style={{ height: 1, background: "#F3F4F6", margin: "12px 0" }} />

      <div
        style={{
          fontSize: 9,
          fontWeight: 700,
          color: "#6B7280",
          fontFamily: F,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          marginBottom: 6,
        }}
      >
        Why this changed
      </div>
      <div
        style={{
          fontSize: 12.5,
          color: "#374151",
          fontFamily: F,
          lineHeight: 1.65,
          marginBottom: 10,
        }}
      >
        {cat.driver}
      </div>

      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
          background: yoyBg,
          padding: "4px 10px",
          borderRadius: 99,
          fontSize: 11,
          fontWeight: 600,
          color: yoyColor,
          fontFamily: FM,
          marginBottom: 4,
        }}
      >
        {cat.yoyDir === "flat" ? "→" : "↑"} {cat.yoy}
      </div>
      <div
        style={{
          fontSize: 9,
          color: "#9CA3AF",
          fontFamily: F,
          marginTop: 4,
        }}
      >
        Source: {cat.source}
      </div>

      {cat.tip && (
        <div
          style={{
            background: "#F0FDFA",
            borderRadius: 10,
            padding: "10px 12px",
            marginTop: 14,
            fontSize: 11.5,
            color: "#115E59",
            fontFamily: F,
            lineHeight: 1.6,
            borderLeft: "3px solid #5EEAD4",
          }}
        >
          💡 {cat.tip}
        </div>
      )}

      {!cat.controllable && (
        <div
          style={{
            background: "#F9FAFB",
            borderRadius: 10,
            padding: "10px 12px",
            marginTop: 14,
            fontSize: 11.5,
            color: "#374151",
            fontFamily: F,
            lineHeight: 1.6,
            borderLeft: "3px solid #D1D5DB",
          }}
        >
          ℹ️ Set by the NY Public Service Commission. Individual customers
          cannot opt out or reduce this charge.
        </div>
      )}
    </div>
  );
}
