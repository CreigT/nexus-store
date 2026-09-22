import Link from "next/link";
import { config } from "@/lib/config";

export function Header() {
  return (
    <header className="border-b border-line">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-5 py-4">
        <Link href="/" className="serif text-xl tracking-tight">
          {config.storeName}
        </Link>
        <nav className="flex flex-wrap items-center gap-4 text-sm text-muted">
          <Link href="/shop" className="hover:text-ink">Shop</Link>
          <Link href="/pricing" className="hover:text-ink">Membership</Link>
          <Link href="/how-it-works" className="hover:text-ink">How it works</Link>
          <Link href="/account" className="hover:text-ink">Access</Link>
          <Link href="/shop" className="btn btn-primary !px-4 !py-2 text-sm">Buy</Link>
        </nav>
      </div>
    </header>
  );
}
