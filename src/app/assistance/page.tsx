import { ASSISTANCE_PROGRAMS } from "@/lib/data/assistance";
import AssistanceCard from "@/components/bill/AssistanceCard";
import { CON_EDISON_PHONE } from "@/lib/utils/constants";

export default function AssistancePage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
        Help Paying Your Bill
      </h1>
      <p className="text-base text-gray-500 mb-8 leading-relaxed">
        If you&apos;re struggling with your Con Edison bill, these programs can help.
        You&apos;re not alone — over 560,000 households are behind on payments.
      </p>

      {/* Emergency banner */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-5 mb-8">
        <div className="text-sm font-bold text-red-800 mb-1">
          ⚡ If your service is about to be shut off
        </div>
        <p className="text-sm text-red-700 leading-relaxed">
          Call Con Edison immediately at{" "}
          <strong>{CON_EDISON_PHONE}</strong>. They must offer you a payment
          plan before disconnection. Con Edison cannot disconnect during extreme
          heat or cold, for customers on medical equipment, or for those enrolled
          in hardship programs. Ask about Emergency HEAP if you need immediate
          help.
        </p>
      </div>

      <div className="space-y-4">
        {ASSISTANCE_PROGRAMS.map((program, i) => (
          <AssistanceCard key={i} program={program} />
        ))}
      </div>

      <p className="text-xs text-gray-400 text-center mt-10 leading-relaxed">
        Program details as of March 2026. Eligibility may vary.
        <br />
        RateShield does not determine eligibility or process applications.
      </p>
    </main>
  );
}
