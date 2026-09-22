import { membershipProducts, oneTimeProducts } from "@/data/catalog";
import { ProductCard } from "@/components/ProductCard";

export const metadata = { title: "Membership" };

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-14">
      <h1 className="serif text-5xl">A reasonable paywall</h1>
      <p className="mt-3 max-w-2xl text-lg text-muted">Buy a single pack if you only need one thing. Join membership if you want the library. No dark patterns. No fake timers.</p>
      <h2 className="serif mt-12 text-3xl">Membership</h2>
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        {membershipProducts().map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
      <h2 className="serif mt-12 text-3xl">One-time packs</h2>
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        {oneTimeProducts().map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </div>
  );
}
