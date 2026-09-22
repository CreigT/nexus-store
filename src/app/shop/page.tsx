import { products } from "@/data/catalog";
import { ProductCard } from "@/components/ProductCard";

export const metadata = { title: "Shop" };

export default function ShopPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-14">
      <h1 className="serif text-5xl">Shop</h1>
      <p className="mt-3 max-w-xl text-muted">Two one-time packs and two memberships. Prices are honest. Access is instant after checkout.</p>
      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {products.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </div>
  );
}
