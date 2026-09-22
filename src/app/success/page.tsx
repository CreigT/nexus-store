"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function SuccessInner() {
  const params = useSearchParams();
  const token = params.get("token");
  const slug = params.get("slug");
  const [ready, setReady] = useState(!token);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;
    fetch("/api/access/claim", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    })
      .then(async (r) => {
        if (!r.ok) throw new Error("Could not save access");
        setReady(true);
      })
      .catch((e) => setError(e.message));
  }, [token]);

  return (
    <div className="mx-auto max-w-xl px-5 py-20 text-center">
      <p className="badge">Paid · access granted</p>
      <h1 className="serif mt-4 text-5xl">You are in.</h1>
      <p className="mt-4 text-muted">Your access cookie is stored on this browser. Open the library whenever you come back.</p>
      {error ? <p className="mt-4 text-accent-dark">{error}</p> : null}
      <div className="mt-8 flex justify-center gap-3">
        <Link href={slug === "starter-brief" || slug === "operator-pack" ? `/library/${slug}` : "/library"} className="btn btn-primary">
          {ready ? "Open library" : "Saving access…"}
        </Link>
        <Link href="/account" className="btn btn-ghost">Check access</Link>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="px-5 py-20 text-center">Loading…</div>}>
      <SuccessInner />
    </Suspense>
  );
}
