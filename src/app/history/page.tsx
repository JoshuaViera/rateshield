"use client";

import Link from "next/link";

export default function HistoryPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
        Bill History
      </h1>
      <p className="text-base text-gray-500 mb-8 leading-relaxed">
        Your cost trend over time, broken into components.
      </p>

      <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center">
        <div className="text-4xl mb-4">📊</div>
        <h2 className="text-lg font-bold text-gray-900 mb-2">
          Track Your Bills Over Time
        </h2>
        <p className="text-sm text-gray-500 leading-relaxed max-w-md mx-auto mb-6">
          Decode your first bill to start building your cost history. Each bill
          you decode gets added here, showing you how each component — energy
          supply, capacity, distribution, taxes — changes month over month.
        </p>
        <p className="text-sm text-gray-500 leading-relaxed max-w-md mx-auto mb-8">
          You&apos;ll see annotated markers when major events happen: rate case
          approvals, wholesale price spikes, and new legislation.
        </p>
        <Link
          href="/bill/enter"
          className="inline-block bg-blue-950 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-900 transition-colors"
        >
          Decode Your First Bill →
        </Link>
      </div>

      {/* What you'll see */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border border-gray-200 rounded-xl p-4">
          <div className="text-sm font-bold text-gray-900 mb-1">
            Stacked Cost Trend
          </div>
          <p className="text-xs text-gray-500 leading-relaxed">
            See energy supply, capacity, distribution, and taxes stacked
            month-by-month so you know which component is growing fastest.
          </p>
        </div>
        <div className="border border-gray-200 rounded-xl p-4">
          <div className="text-sm font-bold text-gray-900 mb-1">
            Event Markers
          </div>
          <p className="text-xs text-gray-500 leading-relaxed">
            &ldquo;Jan 2026: Con Ed 3.5% rate increase takes effect.&rdquo;
            &ldquo;2025: NYISO wholesale prices up 78%.&rdquo; See what caused
            each spike.
          </p>
        </div>
        <div className="border border-gray-200 rounded-xl p-4">
          <div className="text-sm font-bold text-gray-900 mb-1">
            Control Split Trend
          </div>
          <p className="text-xs text-gray-500 leading-relaxed">
            Track how the controllable vs. uncontrollable ratio changes over
            time as wholesale prices and rate cases shift.
          </p>
        </div>
      </div>
    </main>
  );
}
