import Link from "next/link";
import { getGrant } from "@/lib/session";

export const metadata = { title: "Access" };

export default async function AccountPage() {
  const grant = await getGrant();
  return (
    <div className="mx-auto max-w-xl px-5 py-14">
      <h1 className="serif text-5xl">Your access</h1>
      {grant ? (
        <div className="card mt-6 space-y-2">
          <p><span className="text-muted">Email</span><br />{grant.email}</p>
          <p><span className="text-muted">Membership</span><br />{grant.membership ? "Yes" : "No — pack only"}</p>
          <p><span className="text-muted">Unlocked</span><br />{grant.slugs.join(", ")}</p>
          <Link href="/library" className="btn btn-primary mt-4">Open library</Link>
        </div>
      ) : (
        <div className="mt-6">
          <p className="text-muted">No access cookie on this browser yet.</p>
          <Link href="/shop" className="btn btn-primary mt-6">Go to shop</Link>
        </div>
      )}
    </div>
  );
}
