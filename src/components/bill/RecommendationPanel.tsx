"use client";

import { Recommendation } from "@/lib/types/bill";
import { formatCurrency, formatPercent } from "@/lib/utils/format";

interface RecommendationPanelProps {
  recommendations: Recommendation[];
  controllableTotal: number;
  controllablePercent: number;
  uncontrollableTotal: number;
  uncontrollablePercent: number;
  totalAmount: number;
}

export default function RecommendationPanel({
  recommendations,
  controllableTotal,
  controllablePercent,
  uncontrollableTotal,
  uncontrollablePercent,
  totalAmount,
}: RecommendationPanelProps) {
  return (
    <div className="space-y-4">
      {/* Controllable section */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
        <h3 className="text-base font-bold text-blue-900 mb-1">
          What you CAN control: {formatCurrency(controllableTotal)} (
          {formatPercent(controllablePercent)} of your bill)
        </h3>
        <p className="text-sm text-blue-800 leading-relaxed">
          Your energy supply charge is the only component directly tied to how
          much electricity you use and when you use it. Here are specific ways to
          reduce it:
        </p>
      </div>

      {/* Recommendation cards */}
      {recommendations.map((rec, i) => (
        <div
          key={i}
          className="border border-gray-200 rounded-xl p-5 hover:border-gray-300 transition-colors"
        >
          <div className="flex justify-between items-start mb-2">
            <h4 className="text-base font-bold text-gray-900">{rec.title}</h4>
            <div className="flex gap-2 flex-shrink-0 ml-3">
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-green-100 text-green-800">
                Save {rec.savings}
              </span>
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-green-50 text-green-700">
                {rec.effort}
              </span>
            </div>
          </div>
          <p className="text-sm text-gray-500 leading-relaxed">{rec.detail}</p>
        </div>
      ))}

      {/* Uncontrollable section */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-5 mt-6">
        <h3 className="text-base font-bold text-red-900 mb-1">
          What you CANNOT control: {formatCurrency(uncontrollableTotal)} (
          {formatPercent(uncontrollablePercent)} of your bill)
        </h3>
        <p className="text-sm text-red-800 leading-relaxed mb-3">
          {formatCurrency(uncontrollableTotal)} of your{" "}
          {formatCurrency(totalAmount)} bill is driven by wholesale electricity
          prices, capacity charges, grid infrastructure costs, clean energy
          mandates, and taxes. These charges are set by NYISO markets, NY PSC
          rate cases, and state policy — not by your usage. No change in your
          behavior will affect this portion.
        </p>
        <p className="text-sm text-red-800 leading-relaxed">
          <strong>What IS being done about it:</strong> Three bills in the NY
          Senate and a Governor&apos;s directive aim to prevent data center costs from
          being passed to residential customers. See the &ldquo;What Albany Is
          Doing&rdquo; tab for details.
        </p>
      </div>
    </div>
  );
}
