"use client";

import { useState } from "react";
import { billData, categories, F, FM } from "@/lib/data/billData";
import InteractiveDonut from "./InteractiveDonut";
import CategoryDetail from "./CategoryDetail";

interface BreakdownPanelProps {
  activeSection: string | null;
  setCurrentView?: (v: string) => void;
}

const REALISTIC_SAVINGS = 33.02;
const FIXED_CHARGES = 128.20;

// Map bill panel sections to a default category key
const sectionToCat: Record<string, string> = {
  supply: "wholesale",
  delivery: "gridDelivery",
};

export default function BreakdownPanel({ activeSection, setCurrentView }: BreakdownPanelProps) {
  const [activeCat, setActiveCat] = useState<string | null>(null);

  const effectiveCat = (activeSection ? sectionToCat[activeSection] : null) || activeCat;
  const selectedCat = effectiveCat
    ? categories.find((c) => c.key === effectiveCat) || null
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
      <div style={{ fontSize: 12, color: "#6B7280", fontFamily: F, marginBottom: 18 }}>
        Where every dollar of your ${billData.total.toFixed(2)} goes
      </div>

      {/* Savings Bar */}
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
            width: `${(REALISTIC_SAVINGS / billData.total) * 100}%`,
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
          marginBottom: 8,
          fontSize: 12,
          fontFamily: F,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <div style={{ width: 8, height: 8, borderRadius: 99, background: "#0D9488" }} />
          <span style={{ color: "#6B7280" }}>Potential savings</span>
          <span style={{ fontWeight: 700, color: "#0D9488", fontFamily: FM }}>
            ~${REALISTIC_SAVINGS.toFixed(0)}/mo
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <div style={{ width: 8, height: 8, borderRadius: 99, background: "#D1D5DB" }} />
          <span style={{ color: "#6B7280" }}>Fixed &amp; regulated</span>
          <span style={{ fontWeight: 700, color: "#6B7280", fontFamily: FM }}>
            ${FIXED_CHARGES.toFixed(2)}/mo
          </span>
        </div>
      </div>

      <div
        style={{
          fontSize: 10,
          color: "#9CA3AF",
          fontFamily: F,
          marginBottom: 24,
          lineHeight: 1.5,
        }}
      >
        Based on switching ESCO + LED bulbs + smart thermostat + TOU rate. Your
        all-in variable rate is 33.66¢/kWh.
      </div>

      {/* Interactive Donut */}
      <InteractiveDonut activeCat={effectiveCat} setActiveCat={setActiveCat} />

      {/* Category Detail or Default State */}
      <div style={{ marginTop: 24 }}>
        {selectedCat ? (
          <div style={{ animation: "fadeSlideUp 0.3s ease" }}>
            <CategoryDetail cat={selectedCat} setCurrentView={setCurrentView} />
          </div>
        ) : (
          <>
            <div
              style={{
                background: "#F9FAFB",
                borderRadius: 12,
                padding: "14px 16px",
                textAlign: "center",
                marginBottom: 20,
              }}
            >
              <div style={{ fontSize: 12, color: "#6B7280", fontFamily: F, lineHeight: 1.6 }}>
                Click any segment on the chart to see
                <br />
                what&apos;s driving that specific cost
              </div>
            </div>

            <div
              style={{
                background: "#FFFBEB",
                borderRadius: 12,
                padding: 14,
                border: "1px solid #FDE68A",
                marginBottom: 16,
              }}
            >
              <div style={{ fontSize: 12, color: "#92400E", fontFamily: F, lineHeight: 1.6 }}>
                Your all-in variable rate is <strong>33.66¢/kWh</strong>. Fixed charges
                like the basic service fee ($20.91) and taxes ($37.95 total) are set by
                regulators — you pay those regardless of usage.
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
                onClick={() => setCurrentView?.("compare")}
              >
                See how switching suppliers could save ~$11/mo →
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
