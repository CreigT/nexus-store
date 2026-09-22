export const metadata = { title: "Privacy" };
export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-14 leading-relaxed">
      <h1 className="serif text-5xl">Privacy</h1>
      <p className="mt-6 text-muted">We store the email you type at checkout, a signed access cookie, and payment metadata if Stripe is on. We do not sell personal data. Cookies are used only for access and owner login.</p>
    </div>
  );
}
