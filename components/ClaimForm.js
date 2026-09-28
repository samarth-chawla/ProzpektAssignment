"use client";

import { useState } from "react";

function normalizePhone(raw) {
  let p = String(raw ?? "").replace(/[\s\-()]/g, "");
  if (p.startsWith("+91")) p = p.slice(3);
  else if (p.startsWith("91") && p.length === 12) p = p.slice(2);
  if (p.startsWith("0") && p.length === 11) p = p.slice(1);
  return p;
}

function todayISO() {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

export default function ClaimForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [visitDate, setVisitDate] = useState("");
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [serverMessage, setServerMessage] = useState("");
  const [claimCode, setClaimCode] = useState("");
  const [copied, setCopied] = useState(false);

  function validate() {
    const e = {};
    if (name.trim().length < 2) e.name = "Please enter your full name.";
    const p = normalizePhone(phone);
    if (!/^[6-9]\d{9}$/.test(p))
      e.phone = "Enter a valid 10-digit Indian mobile number (starts with 6–9).";
    if (visitDate) {
      const today = todayISO();
      if (visitDate < today) e.visitDate = "Visit date can't be in the past.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit(ev) {
    ev.preventDefault();
    setServerMessage("");
    setCopied(false);
    if (!validate()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: normalizePhone(phone),
          visitDate: visitDate || undefined,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setClaimCode(data.claimCode);
        setStatus("success");
      } else {
        setServerMessage(data.message || "Unable to process your request. Please try again.");
        setStatus("error");
      }
    } catch {
      setServerMessage("Network error. Check your connection and try again.");
      setStatus("error");
    }
  }

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(claimCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable - select fallback
      const el = document.getElementById("claim-code");
      if (el) {
        const r = document.createRange();
        r.selectNodeContents(el);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(r);
      }
    }
  }

  if (status === "success") {
    return (
      <section
        aria-live="polite"
        className="animate-pop-in rounded-3xl border-2 border-sage bg-white p-6 text-center shadow-xl sm:p-8"
      >
        <p className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sage text-2xl text-white" aria-hidden="true">
          ✓
        </p>
        <h2 className="mt-4 font-display text-3xl font-bold">₹150 OFF claimed</h2>
        <p className="mt-2 text-espresso-soft">
          {name.trim().split(" ")[0] ? `Thanks ${name.trim().split(" ")[0]}! ` : ""}Show this code
          at Morrow Café, Sector 104.
          {visitDate ? ` We'll expect you around ${visitDate}.` : ""}
        </p>
        <div className="mx-auto mt-5 max-w-xs rounded-2xl border-2 border-dashed border-mustard bg-cream px-4 py-4">
          <p className="text-xs font-bold tracking-widest text-espresso-soft uppercase">Your code</p>
          <p id="claim-code" className="mt-1 font-mono text-2xl font-bold tracking-wider">
            {claimCode}
          </p>
        </div>
        <button
          type="button"
          onClick={copyCode}
          className="btn-press mt-5 min-h-[48px] w-full rounded-full bg-espresso px-6 font-bold text-cream hover:bg-espresso-soft sm:w-auto"
        >
          {copied ? "Copied ✓" : "Copy code"}
        </button>
        <p className="mt-4 text-sm text-espresso-soft">
          Valid on bills above ₹499 · One per phone number · Show at counter before billing
        </p>
      </section>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-3xl bg-white p-6 shadow-xl sm:p-8">
      <h2 className="font-display text-2xl font-bold">Claim in 20 seconds</h2>
      <p className="mt-1 text-sm text-espresso-soft">No OTP. No payment. Just your name + number.</p>

      <div className="mt-5 space-y-4">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-bold">
            Full name <span aria-hidden="true">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="e.g. Rahul Sharma"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className="min-h-[48px] w-full rounded-xl border-2 border-cream-dark bg-cream px-4 text-base placeholder:text-espresso-soft/70 focus:border-espresso focus:outline-none focus-visible:outline-none"
          />
          {errors.name && (
            <p id="name-error" role="alert" className="mt-1.5 text-sm font-medium text-terracotta-dark">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-bold">
            Phone number <span aria-hidden="true">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="98765 43210"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : "phone-hint"}
            className="min-h-[48px] w-full rounded-xl border-2 border-cream-dark bg-cream px-4 text-base placeholder:text-espresso-soft/70 focus:border-espresso focus:outline-none focus-visible:outline-none"
          />
          {!errors.phone && (
            <p id="phone-hint" className="mt-1.5 text-sm text-espresso-soft">
              10-digit Indian mobile. We SMS your code if needed.
            </p>
          )}
          {errors.phone && (
            <p id="phone-error" role="alert" className="mt-1.5 text-sm font-medium text-terracotta-dark">
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="visitDate" className="mb-1.5 block text-sm font-bold">
            When are you visiting? <span className="font-normal text-espresso-soft">(optional)</span>
          </label>
          <input
            id="visitDate"
            name="visitDate"
            type="date"
            min={todayISO()}
            value={visitDate}
            onChange={(e) => setVisitDate(e.target.value)}
            aria-invalid={!!errors.visitDate}
            aria-describedby={errors.visitDate ? "date-error" : "date-hint"}
            className="min-h-[48px] w-full rounded-xl border-2 border-cream-dark bg-cream px-4 text-base focus:border-espresso focus:outline-none focus-visible:outline-none"
          />
          {!errors.visitDate && (
            <p id="date-hint" className="mt-1.5 text-sm text-espresso-soft">
              Helps us keep your table ready. No spam, ever.
            </p>
          )}
          {errors.visitDate && (
            <p id="date-error" role="alert" className="mt-1.5 text-sm font-medium text-terracotta-dark">
              {errors.visitDate}
            </p>
          )}
        </div>
      </div>

      <div aria-live="polite">
        {status === "error" && serverMessage && (
          <p role="alert" className="mt-4 rounded-xl bg-terracotta/10 px-4 py-3 text-sm font-medium text-terracotta-dark">
            {serverMessage}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        aria-busy={status === "loading"}
        className="btn-press mt-5 min-h-[52px] w-full rounded-full bg-terracotta px-6 text-lg font-bold text-white shadow-lg hover:bg-terracotta-dark disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? "Claiming… please wait" : "Claim ₹150 OFF →"}
      </button>
      <p className="mt-3 text-center text-xs text-espresso-soft">
        By claiming you agree to be contacted once about this offer.
      </p>
    </form>
  );
}
