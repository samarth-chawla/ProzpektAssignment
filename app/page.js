import Image from "next/image";
import ClaimForm from "../components/ClaimForm";
import Reveal from "../components/Reveal";

export default function Home() {
  return (
    <>
      <a
        href="#claim"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-full focus:bg-espresso focus:px-4 focus:py-2 focus:text-cream"
      >
        Skip to claim form
      </a>

      {/* Sticky mini nav */}
      <header className="sticky top-0 z-40 border-b border-espresso/10 bg-cream/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <p className="font-display text-lg font-bold">
            Morrow Café <span className="hidden font-sans text-xs font-medium text-espresso-soft sm:inline">· Sector 104, Noida</span>
          </p>
          <nav aria-label="Primary">
            <a
              href="#claim"
              className="btn-press inline-flex min-h-[44px] items-center justify-center rounded-full bg-espresso px-5 text-sm font-bold text-cream hover:bg-espresso-soft"
            >
              Claim ₹150 OFF
            </a>
          </nav>
        </div>
      </header>

      <main>
        {/* HERO - above the fold answers What / What-I-get / What-to-do */}
        <section className="mx-auto grid max-w-6xl gap-8 px-4 pt-8 pb-10 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-12 lg:py-10 lg:min-h-[calc(100vh-69px)]">
          <div className="animate-fade-up">
            <p className="inline-flex items-center gap-2 rounded-full bg-mustard/20 px-4 py-1.5 text-sm font-bold text-espresso">
              <span aria-hidden="true">☕</span> A gift for scanning · Sector 104, Noida
            </p>
            <h1 className="mt-4 font-display text-4xl leading-[1.05] font-bold sm:text-5xl lg:text-6xl">
              <span className="line-mask">
                <span className="line-inner">Your next cup</span>
              </span>
              <span className="line-mask">
                <span className="line-inner delay">
                  is <span className="text-terracotta">on us.</span>
                </span>
              </span>
            </h1>
            <p className="mt-4 max-w-md text-lg text-espresso-soft">
              You found our in-store QR - here&apos;s <strong className="font-bold text-espresso">₹150 OFF</strong> your
              next visit (min bill ₹499). Drop your name + number, get your code in 20 seconds,
              flash it at the counter.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href="#claim"
                className="btn-press flex min-h-[52px] items-center justify-center rounded-full bg-terracotta px-8 text-lg font-bold text-white shadow-lg hover:bg-terracotta-dark"
              >
                Claim ₹150 OFF →
              </a>
              <a
                href="#how"
                className="flex min-h-[52px] items-center justify-center rounded-full border-2 border-espresso/15 px-8 font-bold hover:border-espresso/40"
              >
                How it works
              </a>
            </div>
            <dl className="mt-6 flex gap-6 text-sm">
              <div>
                <dt className="sr-only">Time needed</dt>
                <dd className="font-bold">20 sec</dd>
                <dd className="text-espresso-soft">to claim</dd>
              </div>
              <div>
                <dt className="sr-only">One time password</dt>
                <dd className="font-bold">No OTP</dd>
                <dd className="text-espresso-soft">no spam</dd>
              </div>
              <div>
                <dt className="sr-only">Loved by locals</dt>
                <dd className="font-bold">4.8 ★</dd>
                <dd className="text-espresso-soft">900+ regulars</dd>
              </div>
            </dl>
          </div>

          <div className="animate-fade-up delay-1 relative">
            <div className="img-skeleton absolute inset-0 rounded-3xl" aria-hidden="true" />
            <Image
              src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1200&auto=format&fit=crop"
              alt="Warm interior of Morrow Café with wooden tables"
              width={900}
              height={700}
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="relative aspect-[4/3] w-full rounded-3xl object-cover shadow-xl"
            />
            <div className="absolute -bottom-5 left-4 flex items-center gap-3 rounded-2xl bg-espresso px-5 py-3 text-cream shadow-xl sm:left-6">
              <p className="font-display text-2xl font-bold text-mustard" aria-hidden="true">★</p>
              <p className="text-sm leading-tight">
                <strong className="font-bold">4.8 · Best cappuccino in 104</strong>
                <br />
                <span className="text-cream/70">900+ reviews from regulars</span>
              </p>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how" className="border-y border-espresso/10 bg-cream-dark/60 scroll-mt-20">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
            <Reveal as="h2" className="font-display text-2xl font-bold sm:text-3xl">How it works</Reveal>
            <ol className="mt-6 grid gap-4 sm:grid-cols-3">
              {[
                ["1", "Fill the form", "Name + 10-digit number. Optional: when you're visiting."],
                ["2", "Get your code", "Instant MORROW-XXXX code. Screenshot it - works offline."],
                ["3", "Show at counter", "Flash it before billing on ₹499+. That's it."],
              ].map(([n, t, d], i) => (
                <Reveal as="li" key={n} delay={i * 90} className="rounded-2xl bg-white p-5 shadow-sm">
                  <p className="flex h-9 w-9 items-center justify-center rounded-full bg-espresso font-bold text-cream" aria-hidden="true">
                    {n}
                  </p>
                  <h3 className="mt-3 font-bold">{t}</h3>
                  <p className="mt-1 text-sm text-espresso-soft">{d}</p>
                </Reveal>
              ))}
            </ol>

            <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-14">
              <Reveal className="relative">
                <div className="img-skeleton absolute inset-0 rounded-3xl" aria-hidden="true" />
                <Image
                  src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1000&auto=format&fit=crop"
                  alt="Freshly brewed coffee at Morrow Café"
                  width={800}
                  height={600}
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="relative aspect-[4/3] w-full rounded-3xl object-cover shadow"
                />
              </Reveal>
              <Reveal delay={120}>
                <h3 className="font-display text-xl font-bold">Why regulars love Morrow</h3>
                <ul className="mt-3 list-disc space-y-2.5 pl-5 text-espresso-soft marker:text-terracotta">
                  <li>Slow-roasted beans, brewed fresh every morning</li>
                  <li>Cozy work-friendly corner + free Wi-Fi</li>
                  <li>Bakes from a local Sector 104 bakery, daily</li>
                </ul>
                <p className="mt-4 rounded-2xl bg-mustard/15 px-4 py-3 text-sm font-medium">
                  Campaign valid till Sunday · One code per phone number · Dine-in only
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* CLAIM */}
        <section id="claim" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-12 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-[1fr_480px] lg:items-start">
            <Reveal>
              <h2 className="font-display text-3xl font-bold sm:text-4xl">Your ₹150 is one step away</h2>
              <p className="mt-3 max-w-md text-lg text-espresso-soft">
                After you submit you&apos;ll see your code instantly. Screenshot it - you&apos;ll
                show it on your next visit.
              </p>
              <ul className="mt-5 list-disc space-y-2 pl-5 text-sm text-espresso-soft marker:text-terracotta">
                <li>Takes ~20 seconds, no OTP</li>
                <li>Code works even with no internet (screenshot)</li>
                <li>Visiting soon? Add the date - we&apos;ll keep a table ready</li>
              </ul>
              <details className="mt-6 max-w-md rounded-2xl border border-espresso/10 bg-white px-4 py-3 text-sm">
                <summary className="cursor-pointer font-bold">T&C*</summary>
                <p className="mt-2 text-espresso-soft">
                  Valid on bills above ₹499, dine-in only, Sector 104 outlet. One claim per phone
                  number. Valid 14 days from claim. Can&apos;t combine with other offers.
                </p>
              </details>
            </Reveal>
            <Reveal delay={140}>
              <ClaimForm />
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="bg-espresso text-cream">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:px-6 sm:grid-cols-3">
          <div>
            <p className="font-display text-xl font-bold">Morrow Café</p>
            <p className="mt-2 text-sm text-cream/70">
              G-12, Sector 104 Market, Noida
              <br />
              Open daily 9am – 11pm
            </p>
          </div>
          <div className="text-sm text-cream/70">
            <p className="font-bold text-cream">Contact</p>
            <p className="mt-2">hello@morrowcafe.in · +91 98100 12345</p>
          </div>
          <div className="text-sm text-cream/70">
            <p className="font-bold text-cream">Offer</p>
            <p className="mt-2">₹150 OFF · min bill ₹499 · dine-in · 14-day validity</p>
          </div>
        </div>
        <div className="border-t border-cream/15">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 text-xs text-cream/60 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <p>© 2026 Morrow Café · Sector 104, Noida. All rights reserved.</p>
            <p>Built by Samarth Chawla · Prozpekt Assignment demo - fictional café, no real orders.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
