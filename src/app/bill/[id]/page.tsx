export default function BillBreakdownPage({ params }: { params: { id: string } }) {
  return (
    <main className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        Your Bill Breakdown
      </h1>
      <p className="text-gray-600 mb-8">Bill ID: {params.id}</p>
      {/* TODO: CostBreakdownChart, ComponentCards, ControlSplit, RecommendationPanel */}
      <div className="bg-gray-100 rounded-lg p-8 text-center text-gray-400">
        Pie chart and breakdown cards go here
      </div>
    </main>
  );
}