import { LegislationItem } from "@/lib/types/tariff";

interface LegislationCardProps {
  item: LegislationItem;
}

export default function LegislationCard({ item }: LegislationCardProps) {
  return (
    <div className="border border-gray-200 rounded-xl p-5 hover:border-gray-300 transition-colors">
      <div className="mb-2">
        <span className="text-xs font-bold text-blue-950 bg-blue-50 px-2.5 py-1 rounded-full mr-2">
          {item.number}
        </span>
        <span className="text-base font-bold text-gray-900">{item.title}</span>
      </div>

      <div className="text-xs text-gray-500 mb-3">
        {item.sponsor} · {item.introduced} ·{" "}
        <strong className="text-gray-700">{item.status}</strong>
      </div>

      <p className="text-sm text-gray-600 leading-relaxed mb-3">
        {item.summary}
      </p>

      <div className="text-sm text-emerald-700 font-semibold leading-relaxed mb-3 bg-emerald-50 px-3 py-2 rounded-lg">
        💡 How this could affect your bill: {item.costImpact}
      </div>

      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-blue-600 font-semibold hover:text-blue-800 transition-colors"
      >
        Read full text →
      </a>
    </div>
  );
}
