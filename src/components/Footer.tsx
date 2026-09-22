import Link from "next/link";
import { config } from "@/lib/config";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-5 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          {config.storeName} · You are the owner, not the operator.{" "}
          <a className="underline" href={`mailto:${config.supportEmail}`}>
            {config.supportEmail}
          </a>
        </p>
        <div className="flex gap-4">
          <Link href="/legal/terms">Terms</Link>
          <Link href="/legal/refunds">Refunds</Link>
          <Link href="/legal/privacy">Privacy</Link>
          <Link href="/owner">Owner</Link>
        </div>
      </div>
    </footer>
  );
}
