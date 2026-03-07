import PageShell from "@/src/components/layout/PageShell";
import { F } from "@/src/lib/data/billData";

export default function HistoryPage() {
  return (
    <PageShell>
      <main style={{ maxWidth: 800, margin: "0 auto", padding: "48px 32px", fontFamily: F }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: "#0F172A", marginBottom: 8, letterSpacing: "-0.02em" }}>
          Bill History
        </h1>
        <p style={{ fontSize: 15, color: "#6B7280", marginBottom: 32, lineHeight: 1.6 }}>
          Your cost trend over time. See how your charges have changed month to month.
        </p>
        {/* TODO: Recharts TrendChart component */}
        <div style={{
          background: "#F9FAFB", borderRadius: 16, padding: 48,
          textAlign: "center", border: "2px dashed #E5E7EB",
        }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>📊</div>
          <div style={{ fontSize: 15, fontWeight: 600, color: "#374151", marginBottom: 4 }}>
            Cost Trend Chart
          </div>
          <div style={{ fontSize: 13, color: "#9CA3AF" }}>
            Coming soon — 12-month bill history with supply vs. delivery breakdown
          </div>
        </div>
      </main>
    </PageShell>
  );
}
