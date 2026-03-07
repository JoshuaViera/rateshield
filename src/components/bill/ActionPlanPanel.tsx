"use client";

import { F, FM } from "@/lib/data/billData";

const billTotal = 161.22;

const savings = [
  {
    title: "Switch to a lower-cost ESCO",
    saving: 10.90,
    math: "500 kWh × 2.18¢ savings",
    desc: "Your supply rate is 12.68¢/kWh. Competitive ESCOs offer fixed rates around 10.50¢/kWh — saving 2.18¢ on every kWh. Con Edison still delivers your power.",
    product: "Compare via RateShield or ChooseEnergy.com",
    productNote: "Look for fixed-rate plans (not variable). Avoid teaser rates that spike after 2–3 months. Always check the annualized cost, not just the intro rate.",
  },
  {
    title: "Replace 5 bulbs with LEDs",
    saving: 12.87,
    math: "38.25 kWh saved × 33.66¢/kWh",
    desc: "Swapping five 60W incandescent bulbs for 9W LEDs saves 1.275 kWh/day. That's 38.25 kWh/month you're not paying for — on both supply and delivery.",
    product: "Philips Ultra-Efficient A19 LED (60W equiv)",
    productNote: "Uses just 9W per bulb vs 60W incandescent. Lasts 50,000 hours. $3.97 each at Home Depot. Pays for itself in under 2 weeks.",
  },
  {
    title: "Install a smart thermostat",
    saving: 6.73,
    math: "20 kWh saved × 33.66¢/kWh",
    desc: "HVAC is ~40% of your usage (~200 kWh/mo). A smart thermostat cuts that by 10% according to DOE studies — saving 20 kWh/month.",
    product: "Google Nest Learning Thermostat (4th Gen)",
    productNote: "Auto-learns your schedule. DOE-verified 10–12% HVAC savings. Eligible for Con Edison smart thermostat rebate ($85 back).",
  },
  {
    title: "Switch to Con Ed TOU rate + shift usage off-peak",
    saving: 2.52,
    math: "30 kWh shifted × 25% TOU discount",
    desc: "Standard SC1 is flat-rate — running your dishwasher at midnight saves $0. But if you opt into Con Ed's voluntary time-of-use rate (SC1-VTOU), off-peak hours are ~25% cheaper.",
    product: "Bosch 300 Series SHSM63W55N",
    productNote: "ENERGY STAR certified. Delay-start timer schedules runs for off-peak hours automatically. Call Con Edison to switch to TOU billing first.",
  },
];

const fixed = [
  {
    title: "Basic Service Charge — $20.91",
    text: "A flat monthly fee every Con Edison customer pays just to be connected to the grid. Set by NY PSC. Cannot be reduced by using less electricity.",
  },
  {
    title: "GRT & Tax Surcharges — $7.90",
    text: "Gross Receipts Tax and other surcharges mandated by city and state government. Applied to both supply and delivery. Not based on your usage.",
  },
  {
    title: "Sales Tax — $8.16",
    text: "NYC sales tax at 4.5% applied to both supply and delivery charges. Proportional to your bill — goes down slightly if you reduce usage, but the rate itself is fixed.",
  },
  {
    title: "Merchant Function Charge — $0.98",
    text: "Covers Con Edison's cost of purchasing power on the wholesale market on your behalf. A regulatory pass-through.",
  },
];

const totalSavings = savings.reduce((s, v) => s + v.saving, 0);

export default function ActionPlanPanel() {
  return (
    <div style={{ maxWidth: 560, margin: "0 auto", padding: 32, fontFamily: F }}>
      <h1
        style={{
          fontSize: 28,
          fontWeight: 800,
          color: "#111827",
          marginBottom: 4,
          letterSpacing: "-0.02em",
        }}
      >
        Your Action Plan
      </h1>
      <p style={{ fontSize: 14, color: "#6B7280", marginBottom: 8 }}>
        Based on your March bill of{" "}
        <strong style={{ color: "#111827" }}>${billTotal.toFixed(2)}</strong>
      </p>
      <p style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 28 }}>
        All savings calculated from your actual tariff rates: 33.66¢/kWh variable,
        12.68¢/kWh supply
      </p>

      <div style={{ height: 1, background: "#E5E7EB", marginBottom: 24 }} />

      {/* Controllable */}
      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          padding: 24,
          border: "1px solid #E5E7EB",
          marginBottom: 20,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <div style={{ width: 4, height: 28, borderRadius: 4, background: "#22C55E" }} />
          <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111827", margin: 0 }}>
            What You Can Control
          </h2>
        </div>
        <p
          style={{
            fontSize: 13,
            color: "#6B7280",
            marginBottom: 20,
            marginLeft: 12,
          }}
        >
          Verified savings based on your bill:{" "}
          <strong style={{ color: "#22C55E" }}>${totalSavings.toFixed(0)}/month</strong>{" "}
          <span style={{ color: "#9CA3AF" }}>
            (~${(totalSavings * 12).toFixed(0)}/year)
          </span>
        </p>

        {savings.map((s, i) => (
          <div
            key={i}
            style={{
              padding: "16px 0",
              borderTop: i > 0 ? "1px solid #F3F4F6" : "none",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 4,
                flexWrap: "wrap" as const,
              }}
            >
              <span style={{ fontSize: 15, fontWeight: 700, color: "#111827" }}>
                {s.title}
              </span>
              <span
                style={{
                  background: "#22C55E",
                  color: "#fff",
                  fontSize: 11,
                  fontWeight: 700,
                  padding: "3px 10px",
                  borderRadius: 99,
                  fontFamily: FM,
                }}
              >
                ${s.saving.toFixed(2)}/mo
              </span>
            </div>
            <div
              style={{
                fontSize: 10,
                color: "#0D9488",
                fontFamily: FM,
                marginBottom: 6,
                background: "#F0FDFA",
                display: "inline-block" as const,
                padding: "2px 8px",
                borderRadius: 4,
              }}
            >
              Math: {s.math}
            </div>
            <div
              style={{
                fontSize: 12.5,
                color: "#6B7280",
                lineHeight: 1.5,
                marginBottom: 8,
              }}
            >
              {s.desc}
            </div>
            <div
              style={{
                background: "#F0FDF4",
                borderRadius: 10,
                padding: "10px 12px",
                borderLeft: "3px solid #86EFAC",
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#166534",
                  marginBottom: 2,
                }}
              >
                {s.product}
              </div>
              <div style={{ fontSize: 11.5, color: "#374151", lineHeight: 1.5 }}>
                {s.productNote}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Fixed */}
      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          padding: 24,
          border: "1px solid #E5E7EB",
          marginBottom: 20,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <div style={{ width: 4, height: 28, borderRadius: 4, background: "#6B7280" }} />
          <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111827", margin: 0 }}>
            What You Can&apos;t Control
          </h2>
        </div>
        <p style={{ fontSize: 13, color: "#6B7280", marginBottom: 20, marginLeft: 12 }}>
          $37.95/month in charges you pay regardless of usage
        </p>

        {fixed.map((item, i) => (
          <div
            key={i}
            style={{
              padding: "14px 0",
              borderTop: i > 0 ? "1px solid #F3F4F6" : "none",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                marginBottom: 6,
              }}
            >
              <span>ℹ️</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: "#111827" }}>
                {item.title}
              </span>
            </div>
            <div
              style={{
                fontSize: 13,
                color: "#374151",
                lineHeight: 1.6,
                paddingLeft: 22,
              }}
            >
              {item.text}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          textAlign: "center",
          marginTop: 20,
          fontSize: 12,
          color: "#9CA3AF",
          lineHeight: 1.5,
        }}
      >
        All savings calculated from your SC1 tariff rates.
        <br />
        Variable rate: 33.66¢/kWh (supply 12.68¢ + delivery 20.98¢)
      </div>
    </div>
  );
}
