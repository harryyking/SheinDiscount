import { NextResponse } from "next/server";
import Paystack from "@paystack/paystack-sdk";

const paystack = new Paystack(process.env.PAYSTACK_SECRET_KEY || "");

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const reference = searchParams.get("reference");

  if (!reference) {
    return NextResponse.json({ error: "No reference provided" }, { status: 400 });
  }

  try {
    // Type the verify response
    const verification = await paystack.transaction.verify({ reference });

    // Type assertion for verification.data (adjust if needed)
    const verificationData = verification.data as { status: string };

    if (verificationData.status === "success") {
      return NextResponse.redirect(new URL("/unlocked", req.url));
    }
    return NextResponse.json({ error: "Payment not verified" }, { status: 400 });
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}