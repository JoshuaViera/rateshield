"use client";

import { BillComponent } from "@/lib/types/bill";

interface ComponentCardProps {
  component: BillComponent;
  attribution?: {
    headline: string;
    explanation: string;
  };
}

export default function ComponentCard({
  component: c,
  attribution,
}: ComponentCardProps) {
  return (
    <div className="border border-gray-200 rounded-xl p-5 hover:border-gray-300 transition-colors">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2.5">
          <div
            className="w-2.5 h-2.5 rounded-sm"
            style={{ backgroundColor: c.color }}
          />
          <span className="text-base font-bold text-gray-900">{c.name}</span>
          <span
            className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
              c.canControl
                ? "bg-blue-100 text-blue-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {c.canControl ? "You can reduce this" : "Not in your control"}
          </span>
        </div>
        <span className="text-xl font-extrabold text-gray-900">
          ${c.amount.toFixed(2)}
        </span>
      </div>

      <p className="text-sm text-gray-500 leading-relaxed mb-2">
        {c.description}
      </p>

      {attribution && (
        <div className="bg-gray-50 rounded-lg p-3 mt-3">
          <p className="text-sm font-semibold text-gray-700 mb-1">
            {attribution.headline}
          </p>
          <p className="text-xs text-gray-500 leading-relaxed">
            {attribution.explanation}
          </p>
        </div>
      )}

      <div className="text-[11px] text-gray-400 mt-2">
        Source: {c.source}
      </div>
    </div>
  );
}
