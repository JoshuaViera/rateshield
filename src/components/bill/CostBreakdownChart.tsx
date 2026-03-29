"use client";

import { BillComponent } from "@/lib/types/bill";

interface PieChartProps {
  components: BillComponent[];
  size?: number;
}

export default function CostBreakdownChart({
  components,
  size = 240,
}: PieChartProps) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 12;
  let cumulative = 0;
  const total = components.reduce((s, c) => s + c.percent, 0);

  const slices = components.map((c) => {
    const startAngle = (cumulative / total) * 360;
    cumulative += c.percent;
    const endAngle = (cumulative / total) * 360;
    const startRad = ((startAngle - 90) * Math.PI) / 180;
    const endRad = ((endAngle - 90) * Math.PI) / 180;
    const largeArc = endAngle - startAngle > 180 ? 1 : 0;
    const x1 = cx + r * Math.cos(startRad);
    const y1 = cy + r * Math.sin(startRad);
    const x2 = cx + r * Math.cos(endRad);
    const y2 = cy + r * Math.sin(endRad);
    return {
      ...c,
      d: `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`,
    };
  });

  return (
    <div className="flex flex-col items-center gap-4">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="drop-shadow-sm"
      >
        {slices.map((s, i) => (
          <path
            key={i}
            d={s.d}
            fill={s.color}
            stroke="#fff"
            strokeWidth="2.5"
            className="transition-opacity hover:opacity-80"
          />
        ))}
        <circle cx={cx} cy={cy} r={r * 0.42} fill="#fff" />
      </svg>

      {/* Legend */}
      <div className="w-full space-y-2">
        {components.map((c, i) => (
          <div key={i} className="flex items-center gap-2.5">
            <div
              className="w-3 h-3 rounded-sm flex-shrink-0"
              style={{ backgroundColor: c.color }}
            />
            <span className="flex-1 text-sm text-gray-700">{c.name}</span>
            <span className="text-sm font-bold text-gray-900">
              ${c.amount.toFixed(2)}
            </span>
            <span className="text-xs text-gray-400 w-10 text-right">
              {Math.round(c.percent)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
