"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useBillStore } from "@/stores/billStore";
import { buildAttributions } from "@/lib/engine/attribution";
import { ACTIVE_LEGISLATION } from "@/lib/data/legislation";
import { ASSISTANCE_PROGRAMS } from "@/lib/data/assistance";
import CostBreakdownChart from "@/components/bill/CostBreakdownChart";
import ControlSplitBar from "@/components/bill/ControlSplitBar";
import ComponentCard from "@/components/bill/ComponentCard";
import RecommendationPanel from "@/components/bill/RecommendationPanel";
import LegislationCard from "@/components/legislation/LegislationCard";
import AssistanceCard from "@/components/bill/AssistanceCard";
import { formatCurrency } from "@/lib/utils/format";
import Link from "next/link";

const TABS = [
  { id: "breakdown", label: "Cost Breakdown" },
  { id: "actions", label: "What You Can Do" },
  { id: "legislation", label: "What Albany Is Doing" },
  { id: "help", label: "Need Help Paying?" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function BillBreakdownPage() {
  const router = useRouter();
  const { currentInput, currentBreakdown, currentRecommendations } =
    useBillStore();
  const [activeTab, setActiveTab] = useState<TabId>("breakdown");

  // If no data, redirect to entry
  if (!currentInput || !currentBreakdown) {
    return (
      <main className="max-w-2xl mx-auto px-6 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          No bill data found
        </h1>
        <p className="text-gray-500 mb-8">
          Enter your Con Edison bill details to see the breakdown.
        </p>
        <Link
          href="/bill/enter"
          className="inline-block bg-blue-950 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-900 transition-colors"
        >
          Decode a Bill →
        </Link>
      </main>
    );
  }

  const {
    components,
    controllableTotal,
    uncontrollableTotal,
    controllablePercent,
    uncontrollablePercent,
    effectiveRate,
    days,
  } = currentBreakdown;

  const attributions = buildAttributions(components);

  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="text-xs font-bold text-red-600 tracking-widest uppercase mb-2">
          Bill Decoded
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-1">
          Here&apos;s where your {formatCurrency(currentInput.totalAmount)} went.
        </h1>
        <p className="text-sm text-gray-500">
          {currentInput.kwhUsage} kWh used · {days} days · Effective rate:{" "}
          {(effectiveRate * 100).toFixed(1)}¢/kWh
        </p>
      </div>

      {/* The Big Insight card */}
      <div className="bg-gray-950 rounded-2xl p-7 text-white mb-8">
        <div className="text-sm font-semibold text-gray-400 mb-4 tracking-wide">
          THE MOST IMPORTANT THING ABOUT YOUR BILL
        </div>
        <ControlSplitBar
          controllablePercent={controllablePercent}
          uncontrollablePercent={uncontrollablePercent}
          controllableTotal={controllableTotal}
          uncontrollableTotal={uncontrollableTotal}
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-0 mb-6 border-b-2 border-gray-100 overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 text-sm whitespace-nowrap transition-colors -mb-[2px] ${
              activeTab === tab.id
                ? "font-bold text-blue-950 border-b-[3px] border-blue-950"
                : "text-gray-400 hover:text-gray-600 border-b-[3px] border-transparent"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab: Cost Breakdown */}
      {activeTab === "breakdown" && (
        <div>
          <div className="flex flex-col md:flex-row gap-8 items-start mb-8">
            <div className="flex-shrink-0">
              <CostBreakdownChart components={components} />
            </div>
          </div>

          <div className="space-y-3">
            {components.map((c, i) => (
              <ComponentCard
                key={i}
                component={c}
                attribution={{
                  headline: attributions[i].headline,
                  explanation: attributions[i].explanation,
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Tab: What You Can Do */}
      {activeTab === "actions" && (
        <RecommendationPanel
          recommendations={currentRecommendations}
          controllableTotal={controllableTotal}
          controllablePercent={controllablePercent}
          uncontrollableTotal={uncontrollableTotal}
          uncontrollablePercent={uncontrollablePercent}
          totalAmount={currentInput.totalAmount}
        />
      )}

      {/* Tab: Legislation */}
      {activeTab === "legislation" && (
        <div className="space-y-4">
          <p className="text-sm text-gray-500 leading-relaxed">
            These are real, active proceedings in Albany that could directly
            affect the system-driven charges on your bill.
          </p>
          {ACTIVE_LEGISLATION.map((item) => (
            <LegislationCard key={item.id} item={item} />
          ))}
        </div>
      )}

      {/* Tab: Help Paying */}
      {activeTab === "help" && (
        <div className="space-y-4">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
            <div className="text-sm font-bold text-amber-800 mb-1">
              You&apos;re not alone. 16% of Con Edison households are behind on
              bills.
            </div>
            <p className="text-sm text-amber-700 leading-relaxed">
              As of late 2024, over 560,000 Con Edison customers owed more than
              $1.49 billion in arrears. These programs exist to help.
            </p>
          </div>
          {ASSISTANCE_PROGRAMS.map((program, i) => (
            <AssistanceCard key={i} program={program} />
          ))}
        </div>
      )}

      {/* Back button */}
      <div className="mt-10">
        <Link
          href="/bill/enter"
          className="inline-block bg-gray-100 text-gray-600 border border-gray-200 px-6 py-3 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors"
        >
          ← Decode Another Bill
        </Link>
      </div>

      <p className="text-[11px] text-gray-400 text-center mt-6 leading-relaxed">
        Decomposition based on Con Edison SC1 residential tariff (eff. Jan
        2026), NYISO Zone J wholesale data.
        <br />
        Source: NY PSC Case 25-E-0072 · NYISO White Paper Feb 2026 · Con Edison
        published tariff schedules.
      </p>
    </main>
  );
}
