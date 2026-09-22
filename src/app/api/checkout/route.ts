import { NextResponse } from "next/server";
import { getProduct } from "@/data/catalog";
import { config, isDemoPayments } from "@/lib/config";
import { grantForPurchase } from "@/lib/access";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const email = String(body?.email || "").trim().toLowerCase();
  const slug = String(body?.slug || "");
  const product = getProduct(slug);

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "A real email is required." }, { status: 400 });
  }
  if (!product) {
    return NextResponse.json({ error: "Unknown product." }, { status: 404 });
  }

  if (isDemoPayments) {
    const token = grantForPurchase(email, product.slug, product.type);
    const url = new URL("/success", config.baseUrl);
    url.searchParams.set("demo", "1");
    url.searchParams.set("slug", product.slug);
    url.searchParams.set("email", email);
    url.searchParams.set("token", token);
    return NextResponse.json({ url: `${url.pathname}${url.search}` });
  }

  const stripeRes = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.stripeSecret}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      mode: product.type === "membership" ? "subscription" : "payment",
      success_url: `${config.baseUrl}/api/access/complete?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${config.baseUrl}/product/${product.slug}`,
      customer_email: email,
      "line_items[0][quantity]": "1",
      "line_items[0][price_data][currency]": config.currency,
      "line_items[0][price_data][unit_amount]": String(product.priceCents),
      "line_items[0][price_data][product_data][name]": product.name,
      ...(product.type === "membership"
        ? { "line_items[0][price_data][recurring][interval]": product.interval || "month" }
        : {}),
      "metadata[slug]": product.slug,
      "metadata[email]": email,
      "metadata[type]": product.type,
    }),
  });

  const session = await stripeRes.json();
  if (!stripeRes.ok || !session.url) {
    return NextResponse.json({ error: session.error?.message || "Stripe checkout could not start." }, { status: 502 });
  }
  return NextResponse.json({ url: session.url });
}
