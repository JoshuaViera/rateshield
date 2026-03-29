import { NextRequest, NextResponse } from "next/server";
import { decomposeBill } from "@/lib/engine/decompose";
import { generateRecommendations } from "@/lib/engine/recommend";
import { daysBetween } from "@/lib/utils/format";
import { BillInput } from "@/lib/types/bill";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const { totalAmount, kwhUsage, billingPeriodStart, billingPeriodEnd } = body;

    if (!totalAmount || !kwhUsage || !billingPeriodStart || !billingPeriodEnd) {
      return NextResponse.json(
        { error: "Missing required fields: totalAmount, kwhUsage, billingPeriodStart, billingPeriodEnd" },
        { status: 400 }
      );
    }

    const total = parseFloat(totalAmount);
    const kwh = parseInt(kwhUsage);

    if (isNaN(total) || total < 10 || total > 5000) {
      return NextResponse.json(
        { error: "totalAmount must be between $10 and $5,000" },
        { status: 400 }
      );
    }

    if (isNaN(kwh) || kwh < 10 || kwh > 9999) {
      return NextResponse.json(
        { error: "kwhUsage must be between 10 and 9,999" },
        { status: 400 }
      );
    }

    const input: BillInput = {
      totalAmount: total,
      kwhUsage: kwh,
      billingPeriodStart,
      billingPeriodEnd,
      serviceClass: body.serviceClass || "SC1",
    };

    const breakdown = decomposeBill(input);
    const days = daysBetween(billingPeriodStart, billingPeriodEnd);
    const recommendations = generateRecommendations(total, kwh, days);

    return NextResponse.json({
      input,
      breakdown,
      recommendations,
    });
  } catch (error) {
    console.error("Decomposition error:", error);
    return NextResponse.json(
      { error: "Failed to decompose bill" },
      { status: 500 }
    );
  }
}
