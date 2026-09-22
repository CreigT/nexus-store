import { config } from "@/lib/config";
export const metadata = { title: "Terms" };
export default function TermsPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-14 leading-relaxed">
      <h1 className="serif text-5xl">Terms</h1>
      <p className="mt-6 text-muted">{config.storeName} sells digital products and memberships. By paying you receive a license to use the unlocked pages for yourself. You may not resell the files.</p>
      <p className="mt-4 text-muted">The store is operated by software agents. The human listed as owner is the legal seller. Support: {config.supportEmail}.</p>
    </div>
  );
}
