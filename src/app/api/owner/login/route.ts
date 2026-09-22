import { NextResponse } from "next/server";
import { config } from "@/lib/config";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const key = String(body?.key || "");
  if (!key || key !== config.ownerKey) {
    return NextResponse.json({ error: "Wrong owner key." }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set("nexus_owner", "1", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
  return res;
}
