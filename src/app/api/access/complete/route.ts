import { NextResponse } from "next/server";
import { config } from "@/lib/config";
import { grantForPurchase } from "@/lib/access";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("session_id");
  if (!sessionId || !config.stripeSecret) {
    return NextResponse.redirect(new URL("/account", config.baseUrl));
  }

  const stripeRes = await fetch(`https://api.stripe.com/v1/checkout/sessions/${sessionId}`, {
    headers: { Authorization: `Bearer ${config.stripeSecret}` },
  });
  const session = await stripeRes.json();
  if (session.payment_status !== "paid" && session.status !== "complete") {
    return NextResponse.redirect(new URL("/account?error=unpaid", config.baseUrl));
  }

  const email = session.customer_email || session.metadata?.email || "member@store";
  const slug = session.metadata?.slug || "nexus-monthly";
  const type = session.metadata?.type === "membership" ? "membership" : "one_time";
  const token = grantForPurchase(email, slug, type);

  const res = NextResponse.redirect(new URL(`/success?slug=${slug}`, config.baseUrl));
  res.cookies.set("nexus_access", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
  return res;
}
