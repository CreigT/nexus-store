import { NextResponse } from "next/server";
import { config, isDemoPayments } from "@/lib/config";

export async function GET() {
  return NextResponse.json({
    ok: true,
    store: config.storeName,
    payments: isDemoPayments ? "demo" : "stripe",
    time: new Date().toISOString(),
  });
}
