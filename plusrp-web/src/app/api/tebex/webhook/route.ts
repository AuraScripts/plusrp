import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  const secret = process.env.TEBEX_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "TEBEX_SECRET not set" }, { status: 500 });
  }

  const body = await req.text();
  const signature = req.headers.get("X-Signature");

  // Basic signature check (Tebex uses HMAC SHA256)
  if (signature) {
    const expected = crypto
      .createHmac("sha256", secret)
      .update(body)
      .digest("hex");
    if (signature !== expected) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }
  }

  let payload: any;
  try {
    payload = JSON.parse(body);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Handle payment completed
  if (payload.type === "payment.completed" || payload.id) {
    // TODO: Add credits to the user based on Discord ID / Tebex username
    // For now just log
    console.log("Tebex payment received:", JSON.stringify(payload, null, 2));
  }

  return NextResponse.json({ success: true });
}

// Tebex may also send GET for validation
export async function GET() {
  return NextResponse.json({ status: "ok" });
}
