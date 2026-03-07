import { NextRequest, NextResponse } from "next/server";
import { decomposeBill } from "@/src/lib/engine/decompose";
import { BillInput } from "@/src/lib/types/bill";

export async function POST(request: NextRequest) {
  let body: Partial<BillInput>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  // Validate required fields
  const { totalAmount, kwhUsage, billingPeriodStart, billingPeriodEnd, serviceClass } = body;

  if (!totalAmount || typeof totalAmount !== "number" || totalAmount <= 0) {
    return NextResponse.json({ error: "totalAmount must be a positive number" }, { status: 400 });
  }
  if (!kwhUsage || typeof kwhUsage !== "number" || kwhUsage <= 0) {
    return NextResponse.json({ error: "kwhUsage must be a positive number" }, { status: 400 });
  }
  if (!billingPeriodStart || !billingPeriodEnd) {
    return NextResponse.json({ error: "billingPeriodStart and billingPeriodEnd are required" }, { status: 400 });
  }
  if (!serviceClass || !["SC1", "SC2", "SC9"].includes(serviceClass)) {
    return NextResponse.json({ error: "serviceClass must be SC1, SC2, or SC9" }, { status: 400 });
  }

  try {
    const result = await decomposeBill(body as BillInput);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Decomposition error:", error);
    return NextResponse.json(
      { error: "Failed to decompose bill. Please try again." },
      { status: 500 }
    );
  }
}
