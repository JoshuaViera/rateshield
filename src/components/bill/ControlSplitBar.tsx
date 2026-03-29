"use client";

import { formatCurrency, formatPercent } from "@/lib/utils/format";

interface ControlSplitBarProps {
  controllablePercent: number;
  uncontrollablePercent: number;
  controllableTotal: number;
  uncontrollableTotal: number;
}

export default function ControlSplitBar({
  controllablePercent,
  uncontrollablePercent,
  controllableTotal,
  uncontrollableTotal,
}: ControlSplitBarProps) {
  return (
    <div>
      {/* The bar */}
      <div className="flex rounded-lg overflow-hidden h-10 shadow-sm">
        <div
          className="flex items-center justify-center text-white text-sm font-bold"
          style={{
            width: `${Math.max(controllablePercent, 12)}%`,
            backgroundColor: "#2563eb",
          }}
        >
          {formatPercent(controllablePercent)}
        </div>
        <div
          className="flex items-center justify-center text-white text-sm font-bold"
          style={{
            width: `${Math.max(uncontrollablePercent, 12)}%`,
            backgroundColor: "#dc2626",
          }}
        >
          {formatPercent(uncontrollablePercent)}
        </div>
      </div>

      {/* Labels */}
      <div className="flex justify-between mt-2">
        <span className="text-xs font-semibold text-blue-600">
          ✓ You can reduce this
        </span>
        <span className="text-xs font-semibold text-red-600">
          ✗ You cannot reduce this
        </span>
      </div>

      {/* Dollar amounts */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
          <div className="text-2xl font-extrabold text-blue-400">
            {formatCurrency(controllableTotal)}
          </div>
          <div className="text-xs text-blue-300 mt-1">
            Charges you can reduce through your usage
          </div>
        </div>
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
          <div className="text-2xl font-extrabold text-red-400">
            {formatCurrency(uncontrollableTotal)}
          </div>
          <div className="text-xs text-red-300 mt-1">
            Set by markets, regulators & policy — not your usage
          </div>
        </div>
      </div>
    </div>
  );
}
