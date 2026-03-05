import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // TODO: Validate input
    // TODO: Call Supabase Edge Function or run decomposition locally

    return NextResponse.json(
      { message: "Decomposition endpoint not yet implemented", input: body },
      { status: 501 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}