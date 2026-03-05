export default function HistoryPage() {
  return (
    <main className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Bill History</h1>
      <p className="text-gray-600 mb-8">Your cost trend over time.</p>
      {/* TODO: TrendChart component */}
      <div className="bg-gray-100 rounded-lg p-8 text-center text-gray-400">
        Trend chart goes here
      </div>
    </main>
  );
}