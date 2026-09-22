import Link from "next/link";
import { config, isDemoPayments } from "@/lib/config";
import { products } from "@/data/catalog";
import { ProductCard } from "@/components/ProductCard";
import { agents } from "@/lib/agents";

export default function HomePage() {
  return (
    <div>
      <section className="mx-auto max-w-5xl px-5 py-16 sm:py-24">
        <p className="badge mb-5">Simple store · reasonable paywall</p>
        <h1 className="serif max-w-3xl text-5xl leading-[1.05] tracking-tight sm:text-6xl">
          {config.tagline}
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted">{config.description}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/shop" className="btn btn-primary">Browse the shop</Link>
          <Link href="/pricing" className="btn btn-ghost">See membership</Link>
        </div>
        <p className="mt-6 text-sm text-muted">
          Payments: {isDemoPayments ? "Demo mode (no card needed)" : "Stripe live/test keys detected"}
        </p>
      </section>
      <section className="border-y border-line bg-card">
        <div className="mx-auto grid max-w-5xl gap-8 px-5 py-12 sm:grid-cols-3">
          {[
            { t: "1. You set the variables", d: "Store name, prices, email, and optional Stripe keys. That is the only human job on a normal day." },
            { t: "2. Customers buy in one page", d: "Clear product pages. One email field. Instant access cookie. No account maze." },
            { t: "3. Agents keep the lights on", d: "Status, refunds, terms, and health checks are already wired. You only step in as owner override." },
          ].map((s) => (
            <div key={s.t}>
              <h2 className="serif text-2xl">{s.t}</h2>
              <p className="mt-2 text-muted">{s.d}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-5xl px-5 py-16">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="serif text-4xl">What people can buy</h2>
          <Link href="/shop" className="text-sm underline">All products</Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {products.slice(0, 4).map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-5xl px-5 pb-16">
        <h2 className="serif text-4xl">Agent room</h2>
        <p className="mt-2 max-w-xl text-muted">These agents are declared in the system. Today the storefront is live. Tomorrow modules plug into the same board.</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {agents.map((a) => (
            <div key={a.name} className="card py-4">
              <p className="text-xs uppercase tracking-wide text-muted">{a.layer}</p>
              <p className="mt-1 font-semibold">{a.name}</p>
              <p className="text-sm text-muted">{a.note}</p>
              <p className="mt-2 text-xs font-semibold text-ok">{a.status}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
