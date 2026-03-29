"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useBillStore } from "@/stores/billStore";
import { decomposeBill } from "@/lib/engine/decompose";
import { generateRecommendations } from "@/lib/engine/recommend";
import { extractTextFromPDF, parseBillFromText } from "@/lib/engine/pdfExtract";
import { daysBetween } from "@/lib/utils/format";
import { BillInput } from "@/lib/types/bill";

interface FormData {
  totalAmount: string;
  kwhUsage: string;
  billingPeriodStart: string;
  billingPeriodEnd: string;
}

export default function BillEntryForm() {
  const router = useRouter();
  const store = useBillStore();
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadMsg, setUploadMsg] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf") {
      setUploadMsg("Please upload a PDF file from your Con Edison account.");
      return;
    }
    setUploading(true);
    setUploadMsg("Reading your Con Edison bill...");
    try {
      const text = await extractTextFromPDF(file);
      const parsed = parseBillFromText(text);
      const filled: string[] = [];

      if (parsed.totalAmount) {
        setValue("totalAmount", String(parsed.totalAmount));
        filled.push("total amount");
      }
      if (parsed.kwhUsage) {
        setValue("kwhUsage", String(parsed.kwhUsage));
        filled.push("kWh usage");
      }
      if (parsed.periodStart) {
        setValue("billingPeriodStart", parsed.periodStart);
        filled.push("billing period");
      }
      if (parsed.periodEnd) {
        setValue("billingPeriodEnd", parsed.periodEnd);
      }

      if (filled.length > 0) {
        setUploadMsg(
          `Found: ${filled.join(", ")}. Please verify the values and fill in any missing fields.`
        );
      } else {
        setUploadMsg(
          "Couldn't auto-detect fields from this PDF. This works best with digitally-generated Con Edison bills. Please enter your details manually."
        );
      }
    } catch {
      setUploadMsg(
        "Error reading PDF. Please enter your details manually below."
      );
    }
    setUploading(false);
  };

  const onSubmit = (data: FormData) => {
    const input: BillInput = {
      totalAmount: parseFloat(data.totalAmount),
      kwhUsage: parseInt(data.kwhUsage),
      billingPeriodStart: data.billingPeriodStart,
      billingPeriodEnd: data.billingPeriodEnd,
      serviceClass: "SC1",
    };

    store.setInput(input);
    const breakdown = decomposeBill(input);
    store.setBreakdown(breakdown);

    const days = daysBetween(input.billingPeriodStart, input.billingPeriodEnd);
    const recs = generateRecommendations(input.totalAmount, input.kwhUsage, days);
    store.setRecommendations(recs);

    // Navigate to breakdown page with a generated ID
    const id = Date.now().toString(36);
    router.push(`/bill/${id}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* PDF Upload Area */}
      <div
        onClick={() => fileRef.current?.click()}
        className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer bg-gray-50 hover:border-blue-950 transition-colors"
      >
        <div className="text-3xl mb-2">📄</div>
        <div className="text-sm font-semibold text-gray-700">
          {uploading
            ? "Reading your bill..."
            : "Upload your Con Edison bill (PDF)"}
        </div>
        <div className="text-xs text-gray-400 mt-1">
          We'll try to auto-fill the fields below — or just type them in
          manually.
        </div>
        <input
          ref={fileRef}
          type="file"
          accept=".pdf"
          onChange={handleUpload}
          className="hidden"
        />
      </div>

      {uploadMsg && (
        <div className="text-sm text-blue-950 bg-blue-50 px-4 py-3 rounded-lg">
          {uploadMsg}
        </div>
      )}

      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-xs text-gray-400 font-semibold tracking-wide">
          OR ENTER MANUALLY
        </span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      {/* Total Amount */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
          Total Bill Amount
        </label>
        <div className="relative">
          <span className="absolute left-3.5 top-3 text-gray-400">$</span>
          <input
            type="number"
            step="0.01"
            placeholder="145.00"
            {...register("totalAmount", {
              required: "Enter your bill total",
              min: { value: 10, message: "Minimum $10" },
              max: { value: 5000, message: "Maximum $5,000" },
            })}
            className={`w-full pl-7 pr-4 py-3 border-2 rounded-lg text-base outline-none transition-colors ${
              errors.totalAmount
                ? "border-red-300 bg-red-50"
                : "border-gray-200 focus:border-blue-950"
            }`}
          />
        </div>
        {errors.totalAmount && (
          <p className="text-xs text-red-600 mt-1">
            {errors.totalAmount.message}
          </p>
        )}
      </div>

      {/* kWh Usage */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
          Electricity Used (kWh)
        </label>
        <input
          type="number"
          placeholder="450"
          {...register("kwhUsage", {
            required: "Enter your kWh usage",
            min: { value: 10, message: "Minimum 10 kWh" },
            max: { value: 9999, message: "Maximum 9,999 kWh" },
          })}
          className={`w-full px-4 py-3 border-2 rounded-lg text-base outline-none transition-colors ${
            errors.kwhUsage
              ? "border-red-300 bg-red-50"
              : "border-gray-200 focus:border-blue-950"
          }`}
        />
        <p className="text-xs text-gray-400 mt-1">
          Look for "Total kWh Used" or "Usage" on your Con Edison bill
        </p>
        {errors.kwhUsage && (
          <p className="text-xs text-red-600 mt-1">
            {errors.kwhUsage.message}
          </p>
        )}
      </div>

      {/* Billing Period */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Period Start
          </label>
          <input
            type="date"
            {...register("billingPeriodStart", {
              required: "Select start date",
            })}
            className={`w-full px-4 py-3 border-2 rounded-lg text-base outline-none transition-colors ${
              errors.billingPeriodStart
                ? "border-red-300 bg-red-50"
                : "border-gray-200 focus:border-blue-950"
            }`}
          />
          {errors.billingPeriodStart && (
            <p className="text-xs text-red-600 mt-1">
              {errors.billingPeriodStart.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Period End
          </label>
          <input
            type="date"
            {...register("billingPeriodEnd", {
              required: "Select end date",
            })}
            className={`w-full px-4 py-3 border-2 rounded-lg text-base outline-none transition-colors ${
              errors.billingPeriodEnd
                ? "border-red-300 bg-red-50"
                : "border-gray-200 focus:border-blue-950"
            }`}
          />
          {errors.billingPeriodEnd && (
            <p className="text-xs text-red-600 mt-1">
              {errors.billingPeriodEnd.message}
            </p>
          )}
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-blue-950 text-white py-4 rounded-xl text-lg font-bold hover:bg-blue-900 transition-colors shadow-lg shadow-blue-950/20"
      >
        Decode My Bill
      </button>

      <p className="text-xs text-gray-400 text-center leading-relaxed">
        Your data stays in your browser. We don't store your bill information.
        <br />
        Decomposition uses Con Edison's SC1 residential tariff (effective Jan
        2026).
      </p>
    </form>
  );
}
