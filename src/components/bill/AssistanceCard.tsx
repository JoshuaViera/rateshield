import { AssistanceProgram } from "@/lib/types/tariff";

interface AssistanceCardProps {
  program: AssistanceProgram;
}

export default function AssistanceCard({ program }: AssistanceCardProps) {
  return (
    <div
      className={`border rounded-xl p-5 ${
        program.urgent
          ? "border-amber-300 bg-amber-50/30"
          : "border-gray-200 bg-white"
      }`}
    >
      <h3 className="text-base font-bold text-gray-900 mb-2">
        {program.urgent && "🔴 "}
        {program.name}
      </h3>

      <div className="space-y-2 mb-4">
        <p className="text-sm text-gray-600 leading-relaxed">
          <strong className="text-gray-800">Who qualifies:</strong>{" "}
          {program.eligibility}
        </p>
        <p className="text-sm text-gray-600 leading-relaxed">
          <strong className="text-gray-800">What you get:</strong>{" "}
          {program.benefit}
        </p>
        <p className="text-sm text-gray-600 leading-relaxed">
          <strong className="text-gray-800">How to apply:</strong>{" "}
          {program.howToApply}
        </p>
      </div>

      <a
        href={program.link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block text-sm text-white bg-blue-950 px-4 py-2 rounded-lg font-semibold hover:bg-blue-900 transition-colors"
      >
        Apply Now →
      </a>
    </div>
  );
}
