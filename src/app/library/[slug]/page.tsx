import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct } from "@/data/catalog";
import { getGrant } from "@/lib/session";
import { canAccess } from "@/lib/access";

export default async function GatedProduct({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const grant = await getGrant();
  if (!canAccess(grant, slug)) {
    return (
      <div className="mx-auto max-w-xl px-5 py-20">
        <h1 className="serif text-4xl">Paywall</h1>
        <p className="mt-3 text-muted">{product.name} unlocks after purchase. Membership also unlocks this page.</p>
        <Link href={`/product/${slug}`} className="btn btn-primary mt-6">Buy this pack</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-5 py-14">
      <p className="text-sm text-muted">Unlocked for {grant?.email}</p>
      <h1 className="serif mt-2 text-5xl">{product.name}</h1>
      <article className="card mt-8 space-y-4 leading-relaxed">
        <p>{product.description}</p>
        <p>This is the delivered digital file in page form so the shop works on day one. Replace this copy with your real brief or pack when you are ready.</p>
        <ul className="list-disc pl-5 text-muted">
          {product.features.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      </article>
    </div>
  );
}
