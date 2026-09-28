# Morrow Café - ₹150 OFF Campaign

Mobile-first campaign landing page for Morrow Café, Sector 104 Noida. Visitor scans a QR in-store → understands the offer in seconds → claims with name + phone → gets a `MORROW-XXXX` code to show at the counter.

Live: _(deploy to Vercel, paste URL here)_
Repo: _(GitHub URL)_

## Stack & why

**Next.js 14+ App Router (JS) + Tailwind CSS v4 + `next/font` + `next/image`**

- `app/api/claim/route.js` gives a real `POST /api/claim` with zero extra infra - honors the brief contract directly, deploys free on Vercel.
- `next/image` auto-serves AVIF/WebP + lazy-loads below-fold image. No manual compression pipeline needed in 4 hrs.
- `next/font` (Marcellus + Archivo) with `display: swap` = zero layout shift from fonts.
- Tailwind v4 `@theme` tokens for the Warm Artisan palette; no UI kit, no animation lib - keeps JS minimal per brief.
- Considered Astro (better static Lighthouse) and Vite+React (simpler), but Next won because the brief explicitly tests the UI → request → loading → success/error loop, and a real API route demonstrates that best.

## Run locally

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # production check
```

No env vars. Images load from Unsplash CDN (see `next.config.mjs` remotePatterns).

## What I built

- Sticky nav + hero (offer, value prop, dual CTA, trust stats)
- Offer badge overlay on hero image, How-it-works (3 steps), Why-regulars + detail image, claim section, fine-print `<details>`, footer
- Claim form: **Name***, **Phone*** (`type=tel`, `autocomplete`, `inputMode`), **Visit date (optional)** - the one allowed extra field
- Success state: `₹150 OFF claimed` + dashed code card + Copy button + validity terms
- One restrained animation set, no libraries: hero headline line-mask reveal, fade-up entrances, IntersectionObserver scroll reveals (opacity + transform only, staggered max 160ms, fire-once on entry), success pop-in, CTA press scale, skeleton shimmer behind images. All disabled under `prefers-reduced-motion`.

## Key decisions

1. **Extra field = Visit date (optional, `type=date`, min=today).** Justification: tells the café when to expect redemption (ops value) + creates commitment for the user, with zero friction since optional. Rejected email (redundant - phone already captured) and occasion/decoration (good idea, but + date = 2 fields, violates "at most one").
2. **API extends contract backward-compatibly:** brief asks `{name, phone}`; I send `{name, phone, visitDate?}` and the route validates phone as Indian 10-digit (`^[6-9]\d{9}$`, strips `+91/91/0`, spaces, dashes). Invalid → 400 with human message. Valid → 900ms delay → `{success, claimCode: MORROW-XXXX, message}`.
3. **Phone validation client + server mirrored** so UI errors are instant but never trusted.
4. **Images:** Unsplash café interior (hero, `priority`) + coffee detail (lazy). `sizes` set, AVIF/WebP via Next. Skeleton div behind each image so no CLS flash.

## Performance (Lighthouse-style, manual audit)

- Found: hero image was largest paint → fixed with `priority` + `sizes` + remote `?w=1200&q=80&auto=format` params.
- Found: font shift risk → fixed with `next/font` + system fallback stacks.
- Found: below-fold image loading eagerly → fixed with `loading="lazy"`.
- Left alone (time budget): no `blurDataURL` placeholders (remote images; skeleton CSS used instead), no route-level code-splitting beyond App Router defaults, no self-hosted fonts.
- JS: one client component (`ClaimForm`) only; rest is server-rendered static. No animation/form libraries.

## What I cut for time

- Occasion/decoration picker (would be field #2 - moved to future work)
- Duplicate-claim persistence (in-memory only would reset on deploy; documented below instead)
- Hindi/Hinglish copy variant, analytics events, expiry countdown timer

## What I'd improve in production

- Persist claims (Vercel KV / Supabase) + return same code for duplicate phone
- Rate limit `/api/claim` per IP + honeypot/Turnstile for spam
- Stricter phone check (carrier lookup optional) + SMS code delivery
- Campaign expiry flag → auto-disable form + show "expired" state
- `analytics`: scan vs claim conversion, drop-off field tracking

## Product Thinking

**Decision 1 - above the fold (phone, no scroll):** Mini-nav with Claim CTA, gift eyebrow ("A gift for scanning"), warm H1 "Your next cup is on us.", one-line sub carrying the single ₹150 mention (min bill ₹499, 20-sec form → code), hero image with a social-proof badge (4.8★, 900+ regulars) instead of a repeated offer sticker, primary CTA scrolling to `#claim`, plus 20-sec / No-OTP / 4.8★ trust row. Why: QR visitor has zero context - in 3 seconds they must learn what (café gift), what-they-get (₹150, stated once in the sub), what-to-do (big Claim button). Repeating ₹150 four times felt like a coding exercise; a real café leads with warmth and lets the offer land once. Everything else (how-it-works, fine print) can wait below.

**Decision 2 - beyond happy path (3 picks):**
- *Duplicate claims:* unique index on normalized phone; re-POST returns existing code + "already claimed" copy instead of new code; staff app validates code once.
- *Spam/abuse + rate limiting:* per-IP sliding window (e.g. 10/min) + per-phone daily cap on the endpoint; invisible honeypot + Turnstile on form; 429 with friendly "too many tries, wait a minute" message.
- *Campaign expiry/invalidation:* `CAMPAIGN_ENDS_AT` env; GET returns `active:false` past date → form replaced with expired state; codes carry `expiresAt`, staff check rejects expired with clear reason; analytics logs scans vs claims to measure post-expiry traffic.

## Time spent

~3.5 hours: scaffold + theme (45m), hero/sections (60m), form + API + success (60m), responsive/a11y/perf pass (30m), README/AI.md + build (15m).
