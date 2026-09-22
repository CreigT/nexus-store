import { notFound } from "next/navigation";
import { getProduct, products } from "@/data/catalog";
import { money } from "@/lib/config";
import { CheckoutForm } from "@/components/CheckoutForm";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  return { title: product?.name || "Product" };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <div className="mx-auto grid max-w-5xl gap-10 px-5 py-14 lg:grid-cols-2">
      <div>
        {product.badge ? <span className="badge">{product.badge}</span> : null}
        <h1 className="serif mt-4 text-5xl">{product.name}</h1>
        <p className="mt-4 text-lg text-muted">{product.description}</p>
        <p className="mt-6 text-3xl font-semibold">
          {money(product.priceCents)}
          {product.interval ? <span className="text-lg font-normal text-muted"> / {product.interval}</span> : null}
        </p>
        <ul className="mt-6 space-y-2 text-muted">
          {product.features.map((f) => (
            <li key={f}>• {f}</li>
          ))}
        </ul>
      </div>
      <div className="card">
        <h2 className="serif text-2xl">Checkout</h2>
        <p className="mt-2 text-sm text-muted">Enter the email that should receive access. In Demo Mode you will be let in immediately. With Stripe keys, you will be sent to Stripe Checkout.</p>
        <CheckoutForm slug={product.slug} />
      </div>
    </div>
  );
}
