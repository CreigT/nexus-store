import { NextResponse } from "next/server";
import { decodeGrant } from "@/lib/access";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const token = String(body?.token || "");
  const grant = decodeGrant(token);
  if (!grant) {
    return NextResponse.json({ error: "Invalid or expired access token." }, { status: 400 });
  }
  const res = NextResponse.json({ ok: true, email: grant.email });
  res.cookies.set("nexus_access", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
  return res;
}
