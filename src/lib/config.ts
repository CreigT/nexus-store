export type Currency = "usd" | "eur" | "gbp";

export const config = {
  storeName: process.env.NEXT_PUBLIC_STORE_NAME || "Nexus",
  tagline:
    process.env.NEXT_PUBLIC_STORE_TAGLINE ||
    "Agents run the store. You own it.",
  description:
    process.env.NEXT_PUBLIC_STORE_DESCRIPTION ||
    "A simple AI-operated shop with a clear paywall. Change the variables and deploy.",
  supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "owner@example.com",
  currency: (process.env.NEXT_PUBLIC_CURRENCY || "usd") as Currency,
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
  stripeSecret: process.env.STRIPE_SECRET_KEY || "",
  stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET || "",
  stripePublishable: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "",
  accessSecret: process.env.ACCESS_TOKEN_SECRET || "dev-only-change-me",
  ownerKey: process.env.OWNER_OVERRIDE_KEY || "dev-owner",
};

export const isDemoPayments = !config.stripeSecret.startsWith("sk_");

export function money(cents: number, currency: string = config.currency) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
    maximumFractionDigits: cents % 100 === 0 ? 0 : 2,
  }).format(cents / 100);
}
