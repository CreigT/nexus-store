import Link from "next/link";
import { money } from "@/lib/config";
import type { Product } from "@/data/catalog";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="card flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <h3 className="serif text-2xl leading-tight">{product.name}</h3>
        {product.badge ? <span className="badge">{product.badge}</span> : null}
      </div>
      <p className="text-muted">{product.short}</p>
      <p className="text-2xl font-semibold">
        {money(product.priceCents)}
        {product.interval ? (
          <span className="text-base font-normal text-muted"> / {product.interval}</span>
        ) : null}
      </p>
      <ul className="space-y-1 text-sm text-muted">
        {product.features.map((f) => (
          <li key={f}>• {f}</li>
        ))}
      </ul>
      <Link href={`/product/${product.slug}`} className="btn btn-primary mt-auto">
        View and buy
      </Link>
    </article>
  );
}
