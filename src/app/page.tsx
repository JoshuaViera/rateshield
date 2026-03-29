import Link from "next/link";

export default function HomePage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16 md:py-24 text-center">
      <div className="text-xs font-bold text-red-600 tracking-widest uppercase mb-5">
        NYC Energy Cost Transparency
      </div>

      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-5">
        Your Con Edison bill,
        <br />
        decoded.
      </h1>

      <p className="text-lg md:text-xl text-gray-500 leading-relaxed mb-3">
        Find out exactly why your electricity bill is high — and what you can
        actually do about it.
      </p>

      <p className="text-base text-gray-400 mb-10">
        No account needed. Enter three numbers from your bill.
      </p>

      <Link
        href="/bill/enter"
        className="inline-block bg-blue-950 text-white px-10 py-4 rounded-xl text-lg font-bold hover:bg-blue-900 transition-colors shadow-lg shadow-blue-950/20"
      >
        Decode My Bill →
      </Link>

      {/* Key stats */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-5 text-left">
        <div className="bg-gray-50 border border-gray-100 rounded-xl p-5">
          <div className="text-3xl font-extrabold text-red-600">76%</div>
          <div className="text-sm text-gray-500 mt-1 leading-relaxed">
            of your bill is charges you cannot control through conservation
          </div>
        </div>
        <div className="bg-gray-50 border border-gray-100 rounded-xl p-5">
          <div className="text-3xl font-extrabold text-red-600">78%</div>
          <div className="text-sm text-gray-500 mt-1 leading-relaxed">
            increase in NYISO wholesale electricity prices in 2025
          </div>
        </div>
        <div className="bg-gray-50 border border-gray-100 rounded-xl p-5">
          <div className="text-3xl font-extrabold text-red-600">88K</div>
          <div className="text-sm text-gray-500 mt-1 leading-relaxed">
            NYC households disconnected by Con Edison in H1 2025
          </div>
        </div>
      </div>

      {/* Summer 2026 alert */}
      <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-5 text-left">
        <div className="text-sm font-bold text-amber-800 mb-1">
          ⚠️ Summer 2026 Alert
        </div>
        <p className="text-sm text-amber-700 leading-relaxed">
          NYISO projects a 410–650 MW reliability shortfall in NYC this summer.
          Bills are expected to spike during peak hours. Three bills in Albany
          aim to address who pays for data center grid costs.
        </p>
      </div>

      {/* Data sourcing note */}
      <p className="mt-10 text-xs text-gray-400 leading-relaxed">
        All data from public sources: NYISO, NY PSC, Con Edison published
        tariffs, NY State Senate.
        <br />
        RateShield does not sell energy, provide legal/financial advice, or
        share your data.
      </p>
    </main>
  );
}
