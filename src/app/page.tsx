export default function HomePage() {
  return (
    <main className="max-w-3xl mx-auto px-8 py-16 text-center">
      <h1 className="text-5xl font-bold text-gray-900 mb-6">
        Your Con Edison bill, decoded.
      </h1>
      <p className="text-xl text-gray-600 mb-4">
        Find out exactly why your electricity bill is high —
        and what you can actually do about it.
      </p>
      <p className="text-gray-500 mb-10">
        No account needed. Enter three numbers from your bill.
      </p>
      <a
        href="/bill/enter"
        className="inline-block bg-blue-900 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-800 transition"
      >
        Decode My Bill
      </a>
    </main>
  );
}