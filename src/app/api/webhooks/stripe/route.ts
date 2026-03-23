import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({ error: "Webhook Stripe no configurado" }, { status: 501 });
}
