export type ProductType = "one_time" | "membership";

export type Product = {
  slug: string;
  name: string;
  short: string;
  description: string;
  priceCents: number;
  type: ProductType;
  interval?: "month" | "year";
  badge?: string;
  features: string[];
  gatedPath: string;
};

export const products: Product[] = [
  {
    slug: "starter-brief",
    name: "Starter Research Brief",
    short: "A plain-English product brief you can sell or use today.",
    description:
      "A complete one-page research brief: audience, offer, price, and first three marketing angles. Delivered instantly after payment.",
    priceCents: 2900,
    type: "one_time",
    badge: "Most popular",
    features: [
      "Audience and pain points",
      "Offer and pricing recommendation",
      "Three ready marketing angles",
      "Instant digital delivery",
    ],
    gatedPath: "/library/starter-brief",
  },
  {
    slug: "operator-pack",
    name: "Store Operator Pack",
    short: "Templates to run a small digital store without a team.",
    description:
      "Refund policy, email scripts, product page copy blocks, and a weekly checklist. Built for one person who wants a store that is easy to understand.",
    priceCents: 7900,
    type: "one_time",
    features: [
      "Refund and support scripts",
      "Product page copy blocks",
      "Weekly operator checklist",
      "Lifetime access to this pack",
    ],
    gatedPath: "/library/operator-pack",
  },
  {
    slug: "nexus-monthly",
    name: "Nexus Membership",
    short: "New briefs, templates, and store updates every month.",
    description:
      "A simple monthly membership. Members unlock the library and receive the latest briefs. Cancel any time from your receipt email.",
    priceCents: 1900,
    type: "membership",
    interval: "month",
    badge: "Best value",
    features: [
      "Full member library",
      "New brief each month",
      "Priority email support",
      "Cancel any time",
    ],
    gatedPath: "/library",
  },
  {
    slug: "nexus-yearly",
    name: "Nexus Yearly",
    short: "Everything in membership, billed once a year.",
    description:
      "Same membership library and monthly briefs, billed annually so you think about it once.",
    priceCents: 14900,
    type: "membership",
    interval: "year",
    features: [
      "Full member library",
      "New brief each month",
      "Two operator office-hours notes",
      "Cancel at period end",
    ],
    gatedPath: "/library",
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function oneTimeProducts() {
  return products.filter((p) => p.type === "one_time");
}

export function membershipProducts() {
  return products.filter((p) => p.type === "membership");
}
