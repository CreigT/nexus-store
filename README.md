# Nexus Store

A simple, production-ready AI commerce storefront.

You are the **legal owner and emergency override**.
You are not the daily operator.

Change the variables. Push to GitHub. Deploy on Vercel.

## What you get

- Clear landing page people can actually read
- Shop + product pages
- Reasonable paywall (one-time packs and membership)
- Demo checkout (no Stripe key required)
- Stripe Checkout when keys are present
- Instant access cookie + member library
- Owner control room at `/owner`
- Health and agent status APIs
- Terms, refunds, privacy

## One-time setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000

## Variables you actually change

- `NEXT_PUBLIC_STORE_NAME` — name on the logo and titles
- `NEXT_PUBLIC_STORE_TAGLINE` — hero line
- `NEXT_PUBLIC_STORE_DESCRIPTION` — subhead
- `NEXT_PUBLIC_SUPPORT_EMAIL` — footer and legal
- `NEXT_PUBLIC_CURRENCY` — usd, eur, or gbp
- `NEXT_PUBLIC_BASE_URL` — live URL, e.g. https://your-app.vercel.app
- `ACCESS_TOKEN_SECRET` — long random string that signs access cookies
- `OWNER_OVERRIDE_KEY` — password for `/owner`
- `STRIPE_SECRET_KEY` — optional. Empty = Demo Mode
- `STRIPE_WEBHOOK_SECRET` — optional
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` — optional

Products and prices live in `src/data/catalog.ts`.

## Deploy on Vercel

1. Open https://vercel.com/new and import `CreigT/nexus-store`.
2. Paste the variables above into Project Settings → Environment Variables.
3. Set `NEXT_PUBLIC_BASE_URL` to the Vercel URL or your domain.
4. Deploy.

Demo Mode works with zero Stripe setup.
When you add `STRIPE_SECRET_KEY`, checkout switches to Stripe automatically.

Stripe webhook path: `/api/webhooks/stripe`.

## Useful URLs

- `/` landing
- `/shop` catalog
- `/pricing` membership paywall
- `/product/starter-brief` example product
- `/library` gated content
- `/account` current access
- `/owner` human override
- `/api/health` liveness
- `/api/agents/status` agent board
