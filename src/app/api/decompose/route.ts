import { NextRequest, NextResponse } from "next/server";
import { decomposeBill } from "@/lib/engine/decompose";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { totalAmount, kwhUsage, billingPeriodStart, billingPeriodEnd } = body;

    if (!totalAmount || !kwhUsage || !billingPeriodStart || !billingPeriodEnd) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const result = decomposeBill({
      totalAmount: Number(totalAmount),
      kwhUsage: Number(kwhUsage),
      billingPeriodStart,
      billingPeriodEnd,
    });

    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "Failed to decompose bill" },
      { status: 500 }
    );
  }
}