import Link from "next/link";
import { getGrant } from "@/lib/session";
import { canAccess } from "@/lib/access";
import { products } from "@/data/catalog";

export const metadata = { title: "Library" };

export default async function LibraryPage() {
  const grant = await getGrant();
  const open = canAccess(grant);

  if (!open) {
    return (
      <div className="mx-auto max-w-xl px-5 py-20">
        <h1 className="serif text-4xl">This page is behind the paywall</h1>
        <p className="mt-4 text-muted">Buy a pack or membership to open the library. If you already paid, open the shop from the same browser.</p>
        <Link href="/pricing" className="btn btn-primary mt-6">See prices</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-14">
      <h1 className="serif text-5xl">Member library</h1>
      <p className="mt-3 text-muted">Signed in as {grant?.email}</p>
      <div className="mt-8 space-y-4">
        {products
          .filter((p) => grant?.membership || grant?.slugs.includes(p.slug))
          .map((p) => (
            <Link key={p.slug} href={p.gatedPath} className="card block hover:border-ink">
              <h2 className="serif text-2xl">{p.name}</h2>
              <p className="mt-1 text-muted">{p.short}</p>
            </Link>
          ))}
      </div>
    </div>
  );
}
