import BillEntryForm from "@/components/bill/BillEntryForm";

export default function BillEntryPage() {
  return (
    <main className="max-w-xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
        Decode Your Con Edison Bill
      </h1>
      <p className="text-base text-gray-500 mb-8 leading-relaxed">
        Enter three numbers from your bill — or upload the PDF. We&apos;ll show you
        exactly where every dollar goes.
      </p>

      <BillEntryForm />
    </main>
  );
}
