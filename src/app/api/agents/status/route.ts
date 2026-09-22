import { NextResponse } from "next/server";
import { agents } from "@/lib/agents";

export async function GET() {
  return NextResponse.json({ agents, publishedAt: new Date().toISOString() });
}
