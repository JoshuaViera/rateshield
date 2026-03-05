export default function LegislationPage() {
  return (
    <main className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Active Legislation</h1>
      <p className="text-gray-600 mb-8">
        Bills in Albany that could affect your electricity costs.
      </p>
      {/* TODO: BillCard components for S9144, S8540, S6394A */}
      <div className="bg-gray-100 rounded-lg p-8 text-center text-gray-400">
        Legislation cards go here
      </div>
    </main>
  );
}