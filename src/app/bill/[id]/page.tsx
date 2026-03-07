"use client";

import { useState } from "react";
import Sidebar from "@/components/bill/Sidebar";
import BillPanel from "@/components/bill/BillPanel";
import BreakdownPanel from "@/components/bill/BreakdownPanel";
import { billData, F, FM } from "@/lib/data/billData";
import { useBillStore } from "@/stores/billStore";

export default function BillDashboardPage({
  params,
}: {
  params: { id: string };
}) {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const { result } = useBillStore();

  // Use real decomposed data when navigated to /bill/result; fall back to mock for /bill/demo
  const isReal = params.id === "result" && result !== null;

  const displayTotal = isReal ? result!.input.totalAmount : billData.total;
  const displayKwh = isReal ? result!.input.kwhUsage : billData.kwh;
  const displayPeriod = isReal
    ? `${result!.input.billingPeriodStart} — ${result!.input.billingPeriodEnd}`
    : billData.period;
  const displayDays = isReal
    ? (() => {
        const s = new Date(result!.input.billingPeriodStart);
        const e = new Date(result!.input.billingPeriodEnd);
        return Math.round((e.getTime() - s.getTime()) / 86400000);
      })()
    : billData.days;

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        background: "#F1F5F9",
        fontFamily: F,
      }}
    >
      <Sidebar activePage="bill" />

      <div
        style={{
          flex: 1,
          display: "flex",
          gap: 20,
          padding: 20,
          overflow: "hidden",
        }}
      >
        {/* Left column - Bill */}
        <div
          style={{
            flex: "0 0 520px",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 14,
              padding: "0 4px",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 17,
                  fontWeight: 800,
                  color: "#111827",
                  letterSpacing: "-0.02em",
                }}
              >
                {isReal ? "Your Bill" : "March 2026 Bill"}
              </div>
              <div style={{ fontSize: 11, color: "#9CA3AF" }}>
                {displayPeriod} · {displayDays} days · {displayKwh} kWh
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 11, color: "#9CA3AF" }}>Total</div>
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 800,
                  color: "#111827",
                  fontFamily: FM,
                }}
              >
                ${displayTotal.toFixed(2)}
              </div>
            </div>
          </div>

          {!activeSection && (
            <div
              style={{
                background: "#ECFDF5",
                borderRadius: 10,
                padding: "8px 14px",
                marginBottom: 12,
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontSize: 12,
                color: "#065F46",
                border: "1px solid #A7F3D0",
                fontFamily: F,
              }}
            >
              <span style={{ fontSize: 16 }}>👆</span> Click any numbered
              section on your bill to learn more
            </div>
          )}

          <div style={{ flex: 1, overflow: "auto" }}>
            <BillPanel
              activeSection={activeSection}
              setActiveSection={setActiveSection}
            />
          </div>
        </div>

        {/* Right column - Breakdown */}
        <div
          style={{
            flex: 1,
            background: "#fff",
            borderRadius: 16,
            padding: 24,
            boxShadow:
              "0 1px 3px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.04)",
            border: "1px solid #E5E7EB",
            overflowY: "auto",
          }}
        >
          <BreakdownPanel activeSection={activeSection} />
        </div>
      </div>
    </div>
  );
}
