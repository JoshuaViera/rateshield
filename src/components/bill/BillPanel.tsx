"use client";

import { billData, SECTIONS, F, FM } from "@/src/lib/data/billData";
import UsageChart from "./UsageChart";

interface BillPanelProps {
  activeSection: string | null;
  setActiveSection: (key: string | null) => void;
}

function LineItem({ label, amount }: { label: string; amount: number }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "3px 0",
        fontSize: 12.5,
        fontFamily: FM,
      }}
    >
      <span style={{ color: "#374151" }}>{label}</span>
      <span
        style={{
          color: "#111827",
          fontWeight: 500,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        ${amount.toFixed(2)}
      </span>
    </div>
  );
}

function TotalLine({ label, amount }: { label: string; amount: number }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "6px 0 2px",
        borderTop: "2px solid #111827",
        marginTop: 4,
        fontSize: 13,
        fontWeight: 700,
        fontFamily: FM,
      }}
    >
      <span>{label}</span>
      <span>${amount.toFixed(2)}</span>
    </div>
  );
}

export default function BillPanel({
  activeSection,
  setActiveSection,
}: BillPanelProps) {
  const sStyle = (key: string) => ({
    cursor: "pointer" as const,
    padding: "12px 16px",
    margin: "0 -16px",
    borderRadius: 4,
    borderLeft:
      activeSection === key
        ? `4px solid ${SECTIONS[key].color}`
        : "4px solid transparent",
    background:
      activeSection === key
        ? key === "supply"
          ? "#FFF7ED08"
          : key === "delivery"
            ? "#EFF6FF08"
            : "#F0FDFA08"
        : "transparent",
    transition: "all 0.15s ease",
  });

  const hotspot = (key: string, num: number) => (
    <div
      onClick={(e) => {
        e.stopPropagation();
        setActiveSection(activeSection === key ? null : key);
      }}
      style={{
        width: 26,
        height: 26,
        borderRadius: 99,
        background: activeSection === key ? SECTIONS[key].color : "#0D9488",
        color: "#fff",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 12,
        fontWeight: 700,
        cursor: "pointer",
        flexShrink: 0,
        fontFamily: F,
        boxShadow:
          activeSection === key
            ? `0 0 0 4px ${SECTIONS[key].color}33`
            : "0 0 0 3px #0D948833",
        transition: "all 0.2s ease",
      }}
    >
      {num}
    </div>
  );

  return (
    <div
      style={{
        flex: "0 0 520px",
        background: "#fff",
        borderRadius: 16,
        boxShadow:
          "0 1px 3px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.04)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        border: "1px solid #E5E7EB",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "#0D9488",
          padding: "14px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontSize: 18,
            fontWeight: 800,
            color: "#fff",
            fontFamily: F,
            letterSpacing: "-0.02em",
          }}
        >
          con<span style={{ fontWeight: 400 }}>Edison</span>
        </div>
        <div style={{ color: "#D1FAE5", fontSize: 11, fontFamily: F }}>
          RESIDENTIAL · EL1
        </div>
      </div>

      <div
        style={{
          padding: "20px 20px 24px",
          overflowY: "auto",
          flex: 1,
        }}
      >
        {/* Section 1: Summary */}
        <div
          style={sStyle("summary")}
          onClick={() =>
            setActiveSection(activeSection === "summary" ? null : "summary")
          }
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
              marginBottom: 12,
            }}
          >
            {hotspot("summary", 1)}
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: 11,
                  color: "#6B7280",
                  fontFamily: F,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  fontWeight: 600,
                  marginBottom: 2,
                }}
              >
                Your bill breakdown
              </div>
              <div style={{ fontSize: 11, color: "#9CA3AF", fontFamily: F }}>
                Billing period: {billData.period} ({billData.days} days)
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 20, marginBottom: 16 }}>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: 11,
                  color: "#9CA3AF",
                  fontFamily: F,
                  marginBottom: 2,
                }}
              >
                Previous balance
              </div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#374151",
                  fontFamily: FM,
                }}
              >
                $0.00
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "#9CA3AF",
                  fontFamily: F,
                  marginTop: 8,
                  marginBottom: 2,
                }}
              >
                New charges
              </div>
              <div style={{ fontSize: 11, color: "#6B7280", fontFamily: F }}>
                Electricity — 30 days
              </div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#374151",
                  fontFamily: FM,
                }}
              >
                $161.22
              </div>
            </div>
            <div style={{ flex: 1, textAlign: "right" }}>
              <div
                style={{
                  fontSize: 11,
                  color: "#9CA3AF",
                  fontFamily: F,
                  marginBottom: 2,
                }}
              >
                Total amount due
              </div>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 800,
                  color: "#111827",
                  fontFamily: F,
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                }}
              >
                $161.22
              </div>
              <div
                style={{
                  fontSize: 10,
                  color: "#9CA3AF",
                  fontFamily: F,
                  marginTop: 6,
                }}
              >
                Due by Apr 2, 2026
              </div>
            </div>
          </div>

          <div
            style={{
              background: "#F9FAFB",
              borderRadius: 10,
              padding: "10px 10px 6px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  color: "#6B7280",
                  fontFamily: F,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Avg daily electric usage
              </span>
              <span
                style={{
                  fontSize: 16,
                  fontWeight: 800,
                  color: "#0D9488",
                  fontFamily: F,
                }}
              >
                16.7 <span style={{ fontSize: 10, fontWeight: 500 }}>kWh</span>
              </span>
            </div>
            <UsageChart />
          </div>

          <div
            style={{
              display: "flex",
              gap: 16,
              marginTop: 10,
              fontSize: 10,
              color: "#9CA3AF",
              fontFamily: FM,
            }}
          >
            <span>Meter #012392458</span>
            <span>New: {billData.meterNew}</span>
            <span>Prior: {billData.meterPrior}</span>
            <span>Usage: {billData.kwh} kWh</span>
          </div>
        </div>

        <div
          style={{ height: 1, background: "#E5E7EB", margin: "16px 0" }}
        />

        {/* Section 2: Supply */}
        <div
          style={sStyle("supply")}
          onClick={() =>
            setActiveSection(activeSection === "supply" ? null : "supply")
          }
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 10,
            }}
          >
            {hotspot("supply", 2)}
            <div
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#111827",
                  fontFamily: F,
                }}
              >
                Your Supply Charges
              </span>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#111827",
                  fontFamily: FM,
                }}
              >
                ${billData.supply.total.toFixed(2)}
              </span>
            </div>
          </div>
          <LineItem
            label={billData.supply.market.label}
            amount={billData.supply.market.amount}
          />
          <LineItem
            label={billData.supply.mfc.label}
            amount={billData.supply.mfc.amount}
          />
          <LineItem
            label={billData.supply.grt.label}
            amount={billData.supply.grt.amount}
          />
          <LineItem
            label={billData.supply.sales.label}
            amount={billData.supply.sales.amount}
          />
          <TotalLine
            label="Total electricity supply charges"
            amount={billData.supply.total}
          />
          <div
            style={{
              background: "#FFF7ED",
              borderRadius: 6,
              padding: "8px 10px",
              marginTop: 10,
              fontSize: 10.5,
              color: "#92400E",
              fontFamily: F,
              lineHeight: 1.5,
              borderLeft: "3px solid #F97316",
            }}
          >
            Your supply cost: <strong>12.68¢/kWh</strong>. Compare with ESCOs
            at PowerYourWay.com
          </div>
        </div>

        <div
          style={{ height: 1, background: "#E5E7EB", margin: "16px 0" }}
        />

        {/* Section 3: Delivery */}
        <div
          style={sStyle("delivery")}
          onClick={() =>
            setActiveSection(
              activeSection === "delivery" ? null : "delivery"
            )
          }
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 10,
            }}
          >
            {hotspot("delivery", 3)}
            <div
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#111827",
                  fontFamily: F,
                }}
              >
                Your Delivery Charges
              </span>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#111827",
                  fontFamily: FM,
                }}
              >
                ${billData.delivery.total.toFixed(2)}
              </span>
            </div>
          </div>
          <LineItem
            label={billData.delivery.basic.label}
            amount={billData.delivery.basic.amount}
          />
          <LineItem
            label={billData.delivery.delivery.label}
            amount={billData.delivery.delivery.amount}
          />
          <LineItem
            label={billData.delivery.sbc.label}
            amount={billData.delivery.sbc.amount}
          />
          <LineItem
            label={billData.delivery.grt.label}
            amount={billData.delivery.grt.amount}
          />
          <LineItem
            label={billData.delivery.sales.label}
            amount={billData.delivery.sales.amount}
          />
          <TotalLine
            label="Total electricity delivery charges"
            amount={billData.delivery.total}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px 0 0",
              marginTop: 4,
              fontSize: 16,
              fontWeight: 800,
              fontFamily: F,
            }}
          >
            <span>Your electricity total</span>
            <span style={{ fontFamily: FM }}>
              ${billData.total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
