import { NextResponse } from "next/server";

function normalizePhone(raw) {
  if (!raw) return "";
  // strip spaces, dashes, +91 / 91 prefix
  let p = String(raw).replace(/[\s\-()]/g, "");
  if (p.startsWith("+91")) p = p.slice(3);
  else if (p.startsWith("91") && p.length === 12) p = p.slice(2);
  if (p.startsWith("0") && p.length === 11) p = p.slice(1);
  return p;
}

function makeCode() {
  const chars = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  let s = "";
  for (let i = 0; i < 4; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return `MORROW-${s}`;
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Please send name and phone number." },
      { status: 400 }
    );
  }

  const name = String(body?.name ?? "").trim();
  const phone = normalizePhone(body?.phone);
  const visitDateRaw = body?.visitDate ? String(body.visitDate) : "";

  // --- validation (mirrors client) ---
  if (name.length < 2) {
    return NextResponse.json(
      { success: false, message: "Please enter your full name." },
      { status: 400 }
    );
  }
  if (!/^[6-9]\d{9}$/.test(phone)) {
    return NextResponse.json(
      {
        success: false,
        message: "That phone number doesn't look right. Enter a 10-digit Indian mobile number.",
      },
      { status: 400 }
    );
  }
  if (visitDateRaw) {
    const d = new Date(visitDateRaw + "T00:00:00");
    if (Number.isNaN(d.getTime())) {
      return NextResponse.json(
        { success: false, message: "That visit date isn't valid." },
        { status: 400 }
      );
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (d < today) {
      return NextResponse.json(
        { success: false, message: "Visit date can't be in the past." },
        { status: 400 }
      );
    }
  }

  // Simulate network + DB write (900ms) so loading state is visible
  await new Promise((r) => setTimeout(r, 900));

  return NextResponse.json({
    success: true,
    claimCode: makeCode(),
    message: "Your offer has been claimed.",
  });
}
