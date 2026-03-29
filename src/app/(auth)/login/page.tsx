import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="max-w-md mx-auto px-6 py-16">
      <h1 className="text-2xl font-extrabold text-gray-900 mb-2">Log In</h1>
      <p className="text-sm text-gray-500 mb-8">
        Access your saved bill history and track cost trends over time.
      </p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Email
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-base outline-none focus:border-blue-950 transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-base outline-none focus:border-blue-950 transition-colors"
          />
        </div>

        <button className="w-full bg-blue-950 text-white py-3 rounded-xl text-base font-bold hover:bg-blue-900 transition-colors">
          Log In
        </button>
      </div>

      <p className="text-sm text-gray-400 text-center mt-6">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-blue-600 font-semibold">
          Sign up
        </Link>
      </p>

      <div className="mt-8 bg-gray-50 border border-gray-200 rounded-xl p-4">
        <p className="text-xs text-gray-500 text-center leading-relaxed">
          <strong>No account needed</strong> to decode your first bill.{" "}
          <Link href="/bill/enter" className="text-blue-600 font-semibold">
            Try it now →
          </Link>
        </p>
      </div>
    </main>
  );
}
