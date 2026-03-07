import PageShell from "@/components/layout/PageShell";
import { F } from "@/lib/data/billData";

export default function HomePage() {
  return (
    <PageShell>
      <main
        style={{
          maxWidth: 720,
          margin: "0 auto",
          padding: "80px 32px",
          textAlign: "center",
          fontFamily: F,
        }}
      >
        <div
          style={{
            display: "inline-block",
            background: "#F0FDFA",
            color: "#0D9488",
            fontSize: 12,
            fontWeight: 600,
            padding: "6px 14px",
            borderRadius: 99,
            marginBottom: 24,
            border: "1px solid #CCFBF1",
          }}
        >
          Free for all Con Edison customers
        </div>

        <h1
          style={{
            fontSize: 48,
            fontWeight: 800,
            color: "#0F172A",
            marginBottom: 20,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
          }}
        >
          Your Con Edison bill,{" "}
          <span style={{ color: "#0D9488" }}>decoded.</span>
        </h1>

        <p
          style={{
            fontSize: 20,
            color: "#6B7280",
            marginBottom: 12,
            lineHeight: 1.6,
          }}
        >
          Find out exactly why your electricity bill is high — and what you can
          actually do about it.
        </p>

        <p style={{ fontSize: 15, color: "#9CA3AF", marginBottom: 40 }}>
          No account needed. Enter three numbers from your bill.
        </p>

        <a
          href="/bill/enter"
          style={{
            display: "inline-block",
            background: "#0D9488",
            color: "#fff",
            padding: "14px 36px",
            borderRadius: 12,
            fontSize: 17,
            fontWeight: 700,
            transition: "background 0.15s ease",
            letterSpacing: "-0.01em",
          }}
        >
          Decode My Bill →
        </a>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 32,
            marginTop: 56,
            fontSize: 13,
            color: "#9CA3AF",
          }}
        >
          <div>
            <div style={{ fontSize: 24, fontWeight: 800, color: "#0F172A" }}>
              76%
            </div>
            <div>of your bill you can&apos;t control</div>
          </div>
          <div
            style={{ width: 1, background: "#E5E7EB", alignSelf: "stretch" }}
          />
          <div>
            <div style={{ fontSize: 24, fontWeight: 800, color: "#0D9488" }}>
              24%
            </div>
            <div>you can actually reduce</div>
          </div>
          <div
            style={{ width: 1, background: "#E5E7EB", alignSelf: "stretch" }}
          />
          <div>
            <div style={{ fontSize: 24, fontWeight: 800, color: "#0F172A" }}>
              43%
            </div>
            <div>rate increase since 2020</div>
          </div>
        </div>
      </main>
    </PageShell>
  );
}
