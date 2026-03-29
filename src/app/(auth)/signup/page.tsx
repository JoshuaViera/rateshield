import Link from "next/link";

export default function SignUpPage() {
  return (
    <main className="max-w-md mx-auto px-6 py-16">
      <h1 className="text-2xl font-extrabold text-gray-900 mb-2">
        Create Account
      </h1>
      <p className="text-sm text-gray-500 mb-8">
        Save your bill history and track how your costs change over time.
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
            placeholder="At least 8 characters"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-base outline-none focus:border-blue-950 transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Borough (optional)
          </label>
          <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-base outline-none focus:border-blue-950 transition-colors text-gray-500">
            <option value="">Select your borough</option>
            <option value="manhattan">Manhattan</option>
            <option value="brooklyn">Brooklyn</option>
            <option value="queens">Queens</option>
            <option value="bronx">Bronx</option>
            <option value="staten_island">Staten Island</option>
            <option value="westchester">Westchester</option>
          </select>
        </div>

        <button className="w-full bg-blue-950 text-white py-3 rounded-xl text-base font-bold hover:bg-blue-900 transition-colors">
          Create Account
        </button>
      </div>

      <p className="text-sm text-gray-400 text-center mt-6">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-600 font-semibold">
          Log in
        </Link>
      </p>

      <div className="mt-8 bg-gray-50 border border-gray-200 rounded-xl p-4">
        <p className="text-xs text-gray-500 text-center leading-relaxed">
          <strong>No account needed</strong> to decode your first bill.
          Creating an account lets you save and track your history.{" "}
          <Link href="/bill/enter" className="text-blue-600 font-semibold">
            Try it now →
          </Link>
        </p>
      </div>
    </main>
  );
}
