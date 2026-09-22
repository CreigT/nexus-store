"use client";

import { useEffect, useState } from "react";

type Status = { agents: { layer: string; name: string; status: string; note: string }[] };

export default function OwnerPage() {
  const [key, setKey] = useState("");
  const [authed, setAuthed] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState<Status | null>(null);

  useEffect(() => {
    fetch("/api/agents/status").then((r) => r.json()).then(setStatus).catch(() => null);
  }, []);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/owner/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key }),
    });
    if (!res.ok) {
      setError("Wrong key.");
      return;
    }
    setAuthed(true);
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-14">
      <h1 className="serif text-5xl">Owner override</h1>
      <p className="mt-3 text-muted">The human is the legal owner and emergency brake. This page is not for daily operations.</p>
      {!authed ? (
        <form onSubmit={login} className="card mt-8 max-w-md space-y-4">
          <label className="block text-sm font-medium">
            Owner key
            <input type="password" value={key} onChange={(e) => setKey(e.target.value)} className="mt-1 w-full rounded-xl border border-line bg-paper px-3 py-3" />
          </label>
          {error ? <p className="text-sm text-accent-dark">{error}</p> : null}
          <button className="btn btn-primary" type="submit">Unlock control room</button>
        </form>
      ) : (
        <div className="mt-8 space-y-4">
          <div className="card">
            <h2 className="serif text-2xl">Emergency actions</h2>
            <p className="mt-2 text-muted">Change env vars on Vercel, rotate ACCESS_TOKEN_SECRET, or take the shop offline in catalog.ts and redeploy.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {status?.agents.map((a) => (
              <div key={a.name} className="card py-4">
                <p className="text-xs uppercase text-muted">{a.layer}</p>
                <p className="font-semibold">{a.name}</p>
                <p className="text-sm text-muted">{a.note}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
