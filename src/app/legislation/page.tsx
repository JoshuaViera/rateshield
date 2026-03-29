import { ACTIVE_LEGISLATION } from "@/lib/data/legislation";
import LegislationCard from "@/components/legislation/LegislationCard";

export default function LegislationPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
        Active Legislation
      </h1>
      <p className="text-base text-gray-500 mb-8 leading-relaxed">
        Bills in Albany and regulatory proceedings that could directly affect
        your Con Edison costs.
      </p>

      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 mb-8">
        <div className="text-sm font-bold text-emerald-800 mb-1">
          Why this matters to your bill
        </div>
        <p className="text-sm text-emerald-700 leading-relaxed">
          Roughly 76% of a typical Con Edison bill comes from system-driven
          charges — wholesale energy costs, capacity payments, infrastructure
          maintenance, and clean energy mandates. These legislative efforts aim
          to change who pays for grid costs driven by data center expansion.
        </p>
      </div>

      <div className="space-y-4">
        {ACTIVE_LEGISLATION.map((item) => (
          <LegislationCard key={item.id} item={item} />
        ))}
      </div>

      <p className="text-xs text-gray-400 text-center mt-10 leading-relaxed">
        Bill status as of March 2026. Sources: nysenate.gov, governor.ny.gov.
        <br />
        RateShield presents public information and does not provide legal or
        political advice.
      </p>
    </main>
  );
}
