# AI Usage

## Tools used

- OpenCode (Muse Spark) for scaffolding, component drafting, audits, and README structure
- GitHub Copilot for inline autocomplete while writing components and styles

## What I used AI for

- Next.js App Router + Tailwind v4 boilerplate and theme tokens
- Claim form validation logic (client + API mirror) and success/copy interaction draft
- The IntersectionObserver scroll-reveal effect and the Marcellus/Archivo heading-body font shortlist
- README outline covering all brief-required sections
- GitHub Copilot autocomplete for repetitive JSX, Tailwind classes, and validation boilerplate

## One useful thing AI helped with

- Drafting the Indian phone normalization (`+91/91/0`, spaces, dashes → `^[6-9]\d{9}$`) consistently on both client and server so error messages match.

## One thing AI got wrong or that I changed

- AI initially scaffolded two extra fields (visit date + occasion picker). I cut it to visit-date-only to respect the "at most one extra field" rule and moved the decoration idea to README future work.
- AI's default color suggestion had weak CTA contrast; I darkened Terracotta to `#B4502B` and verified white-on-it passes AA at 5.09:1.
- I picked the final fonts myself (Marcellus + Archivo) from AI's shortlist, and asked for several changes AI didn't suggest: saying ₹150 only once in the hero, renaming Fine print to T&C*, removing the orange focus halo entirely, swapping ✓/→ markers for real list bullets, replacing all em dashes with hyphens, and adding the footer credit line.

## What I personally reviewed

- Every line of `app/page.js`, `components/ClaimForm.js`, and `app/api/claim/route.js` - validation, fetch loop, loading/error/success states, aria attributes
- Responsive behavior at 360px / 768px / 1280px, keyboard-only flow, focus states, `prefers-reduced-motion`
- `npm run build` passing; can walk through and modify any part live
