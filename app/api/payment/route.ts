import { NextResponse } from "next/server";
import Paystack from "@paystack/paystack-sdk";

const paystack = new Paystack(process.env.PAYSTACK_SECRET_KEY || "");

export async function POST(req: Request) {
  const { email } = await req.json();
  if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });

  try {
    const payment = await paystack.transaction.initialize({
      email,
      amount: 599 * 100, // $5.99 in kobo
      currency: "USD",
    });
    return NextResponse.json({ url: payment.data.authorization_url });
  } catch (error) {
    return NextResponse.json({ error: "Payment initialization failed" }, { status: 500 });
  }
}