"use client";

import { useState } from "react";

export function CheckoutForm({ slug }: { slug: string }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, slug }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Checkout failed");
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout failed");
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-4">
      <label className="block text-sm font-medium">
        Email
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full rounded-xl border border-line bg-paper px-3 py-3 outline-none focus:border-ink"
          placeholder="you@email.com"
        />
      </label>
      {error ? <p className="text-sm text-accent-dark">{error}</p> : null}
      <button disabled={busy} className="btn btn-accent w-full" type="submit">
        {busy ? "Working…" : "Continue to paywall"}
      </button>
      <p className="text-xs text-muted">
        14-day refund on digital packs if the files were not a fit. Membership can be cancelled at period end.
      </p>
    </form>
  );
}
