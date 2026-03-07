"use client";

import { useState } from "react";
import { billData, categories, F, FM } from "@/src/lib/data/billData";
import InteractiveDonut from "./InteractiveDonut";
import CategoryDetail from "./CategoryDetail";

interface BreakdownPanelProps {
  activeSection: string | null;
}

export default function BreakdownPanel({ activeSection }: BreakdownPanelProps) {
  const [activeCat, setActiveCat] = useState<string | null>(null);

  const controllable = categories
    .filter((c) => c.controllable)
    .reduce((s, c) => s + c.amount, 0);
  const uncontrollable = categories
    .filter((c) => !c.controllable)
    .reduce((s, c) => s + c.amount, 0);
  const selectedCat = activeCat
    ? categories.find((c) => c.key === activeCat) || null
    : null;

  return (
    <div>
      <div
        style={{
          fontSize: 20,
          fontWeight: 800,
          color: "#111827",
          fontFamily: F,
          marginBottom: 4,
          letterSpacing: "-0.02em",
        }}
      >
        Bill Breakdown
      </div>
      <div
        style={{
          fontSize: 12,
          color: "#6B7280",
          fontFamily: F,
          marginBottom: 18,
        }}
      >
        Where every dollar of your ${billData.total.toFixed(2)} goes
      </div>

      {/* Control Split Bar */}
      <div
        style={{
          display: "flex",
          height: 10,
          borderRadius: 99,
          overflow: "hidden",
          marginBottom: 8,
        }}
      >
        <div
          style={{
            width: `${(controllable / billData.total) * 100}%`,
            background: "#0D9488",
            transition: "width 0.3s ease",
          }}
        />
        <div style={{ flex: 1, background: "#D1D5DB" }} />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 24,
          fontSize: 12,
          fontFamily: F,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: 99,
              background: "#0D9488",
            }}
          />
          <span style={{ color: "#6B7280" }}>Can reduce</span>
          <span
            style={{ fontWeight: 700, color: "#0D9488", fontFamily: FM }}
          >
            ${controllable.toFixed(2)}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: 99,
              background: "#D1D5DB",
            }}
          />
          <span style={{ color: "#6B7280" }}>Can&apos;t control</span>
          <span
            style={{ fontWeight: 700, color: "#6B7280", fontFamily: FM }}
          >
            ${uncontrollable.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Interactive Donut */}
      <InteractiveDonut activeCat={activeCat} setActiveCat={setActiveCat} />

      {/* Category Detail or Default State */}
      {selectedCat ? (
        <div style={{ marginTop: 20 }}>
          <CategoryDetail cat={selectedCat} />
        </div>
      ) : (
        <div style={{ marginTop: 20 }}>
          <div
            style={{
              background: "#F9FAFB",
              borderRadius: 12,
              padding: "14px 16px",
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            <div
              style={{
                fontSize: 12,
                color: "#6B7280",
                fontFamily: F,
                lineHeight: 1.6,
              }}
            >
              Click any section of the chart to see
              <br />
              what&apos;s driving that cost and why it changed
            </div>
          </div>

          {/* Key Insight */}
          <div
            style={{
              background: "#FFFBEB",
              borderRadius: 12,
              padding: 14,
              border: "1px solid #FDE68A",
              marginBottom: 16,
            }}
          >
            <div
              style={{
                fontSize: 12,
                color: "#92400E",
                fontFamily: F,
                lineHeight: 1.6,
              }}
            >
              <strong>~60% of your bill</strong> — ${uncontrollable.toFixed(2)}{" "}
              — comes from charges set by regulators, market forces, and
              infrastructure. No individual customer can opt out.
            </div>
            <div
              style={{
                fontSize: 12,
                color: "#0D9488",
                fontFamily: F,
                fontWeight: 600,
                marginTop: 6,
                cursor: "pointer",
              }}
            >
              But ${controllable.toFixed(2)} is influenced by your choices →
            </div>
          </div>

          {/* Quick Actions */}
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: "#111827",
              fontFamily: F,
              marginBottom: 8,
            }}
          >
            Quick Actions
          </div>
          {[
            {
              icon: "⚡",
              title: "Compare energy suppliers",
              desc: "Your rate: 12.68¢/kWh — ESCOs may offer less",
              color: "#F97316",
            },
            {
              icon: "☀️",
              title: "Explore community solar",
              desc: "5–15% savings, no hardware, bill credits",
              color: "#F59E0B",
            },
            {
              icon: "📋",
              title: "See your action plan",
              desc: "Personalized tips based on your bill",
              color: "#0D9488",
            },
            {
              icon: "🏛️",
              title: "Track legislation",
              desc: "3 active NY bills that could lower your costs",
              color: "#8B5CF6",
            },
          ].map((a, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 12px",
                background: "#fff",
                borderRadius: 10,
                marginBottom: 6,
                cursor: "pointer",
                border: "1px solid #E5E7EB",
                transition: "all 0.15s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = a.color;
                e.currentTarget.style.boxShadow = `0 0 0 1px ${a.color}33`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#E5E7EB";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <span style={{ fontSize: 16 }}>{a.icon}</span>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: 12.5,
                    fontWeight: 600,
                    color: "#111827",
                    fontFamily: F,
                  }}
                >
                  {a.title}
                </div>
                <div
                  style={{ fontSize: 11, color: "#6B7280", fontFamily: F }}
                >
                  {a.desc}
                </div>
              </div>
              <span style={{ color: "#9CA3AF", fontSize: 14 }}>→</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
