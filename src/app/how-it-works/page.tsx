export const metadata = { title: "How it works" };

export default function HowPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-14">
      <h1 className="serif text-5xl">How this store works</h1>
      <div className="mt-8 space-y-6 text-lg leading-relaxed text-muted">
        <p>This is a small commerce system designed so ordinary people can understand it. There is a public shop, a paywall, instant access, and an owner page.</p>
        <p>You do not operate it day to day. You change the variables in Vercel — store name, support email, Stripe keys — and push. Agents listed on the home page represent the larger autonomous company. This module is the customer-facing door.</p>
        <ol className="list-decimal space-y-3 pl-5">
          <li>Customer picks a product.</li>
          <li>Customer enters an email and pays (or uses Demo Mode).</li>
          <li>A signed access cookie unlocks the library page for that purchase.</li>
          <li>Refunds follow the posted 14-day digital policy.</li>
          <li>Owner override lives at /owner.</li>
        </ol>
      </div>
    </div>
  );
}
