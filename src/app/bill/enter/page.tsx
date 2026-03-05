export default function BillEntryPage() {
  return (
    <main className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        Decode Your Con Edison Bill
      </h1>
      <p className="text-gray-600 mb-8">
        Enter three numbers from your bill. No account needed.
      </p>
      {/* TODO: BillEntryForm component */}
      <div className="bg-gray-100 rounded-lg p-8 text-center text-gray-400">
        Bill entry form goes here
      </div>
    </main>
  );
}