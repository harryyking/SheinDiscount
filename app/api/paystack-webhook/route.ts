import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import crypto from 'crypto';
import { sendWhatsAppMessage } from '@/lib/twilo';

export async function POST(request: NextRequest) {
  try {
    // Get the signature from the header
    const signature = request.headers.get('x-paystack-signature');
    const secretKey = process.env.PAYSTACK_WEBHOOK_SECRET;

    if (!signature || !secretKey) {
      return NextResponse.json(
        { message: 'Missing signature or secret key' },
        { status: 401 }
      );
    }

    // Get the raw body
    const body = await request.text();

    // Verify signature
    const hash = crypto
      .createHmac('sha512', secretKey)
      .update(body)
      .digest('hex');

    if (hash !== signature) {
      return NextResponse.json(
        { message: 'Invalid signature' },
        { status: 401 }
      );
    }

    const payload = JSON.parse(body);
    const event = payload.event;

    if (event === 'charge.success') {
      const { reference, customer, status } = payload.data;

      if (status === 'success') {
        // Find user by reference
        const user = await prisma.user.findFirst({
          where: { subscriptionId: reference }
        });

        if (!user) {
          console.error('User not found for reference:', reference);
          return NextResponse.json(
            { message: 'User not found' },
            { status: 404 }
          );
        }

        // Update user subscription status
        await prisma.user.update({
          where: { id: user.id },
          data: {
            subscribed: true,
            lastPayment: new Date(),
          }
        });

        // Send welcome message
        await sendWhatsAppMessage(
          user.phone,
          `Welcome to WhatsLearn! Your subscription for daily ${user.topic} lessons is now active. You'll receive your first lesson tomorrow at 8:00 AM. Reply with "NEXT" for a lesson now, "QUIZ" for a question, or ask any question about ${user.topic}.`
        );

        return NextResponse.json({
          message: 'Subscription activated successfully'
        });
      }
    } else if (event === 'subscription.disable') {
      const { customer, subscription_code } = payload.data;
      
      // Find user by subscription code
      const user = await prisma.user.findFirst({
        where: { subscriptionId: subscription_code }
      });

      if (user) {
        // Update user subscription status
        await prisma.user.update({
          where: { id: user.id },
          data: {
            subscribed: false
          }
        });

        // Send cancellation message
        await sendWhatsAppMessage(
          user.phone,
          'Your WhatsLearn subscription has been cancelled. We hope you enjoyed learning with us! You can resubscribe anytime on our website.'
        );
      }

      return NextResponse.json({
        message: 'Subscription cancelled successfully'
      });
    }

    return NextResponse.json({ message: 'Webhook processed' });

  } catch (error) {
    console.error('Error processing Paystack webhook:', error);
    return NextResponse.json(
      { message: 'Failed to process webhook' },
      { status: 500 }
    );
  }
}