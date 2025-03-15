import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { validateTwilioRequest, sendWhatsAppMessage } from '@/lib/twilo';
import { generateLesson, generateQuiz, generateReply } from '@/lib/ai';

// Define a type for Twilio webhook body (optional, for better type safety)
interface TwilioWebhookBody {
  From: string;
  Body: string;
  [key: string]: string;
}

export async function POST(request: NextRequest) {
  try {
    // Parse form data from Twilio webhook
    const formData = await request.formData();
    const body: Record<string, string> = {};
    formData.forEach((value, key) => {
      body[key] = value.toString();
    });

    // Validate Twilio request
    const signature = request.headers.get('X-Twilio-Signature') || '';
    const requestUrl = new URL(request.url).toString(); // Full URL including query params

    if (!validateTwilioRequest(request)) {
      return NextResponse.json({ message: 'Invalid Twilio signature' }, { status: 401 });
    }
    
    // Extract message data
    const from = body.From;
    const message = body.Body;
    if (!from || !message) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // Extract phone number from WhatsApp format
    const phone = from.replace('whatsapp:', '');

    // Find user by phone number
    const user = await prisma.user.findUnique({ where: { phone } });
    if (!user) {
      await sendWhatsAppMessage(
        from,
        "Welcome to WhatsLearn! You're not registered yet. Sign up at our website to start learning."
      );
      return NextResponse.json({ message: 'User not found' });
    }

    if (!user.subscribed) {
      await sendWhatsAppMessage(
        from,
        "Your WhatsLearn subscription is inactive. Renew it on our website to continue."
      );
      return NextResponse.json({ message: 'Subscription not active' });
    }

    // Check daily reply limit
    const dailyLimit = parseInt(process.env.DAILY_REPLY_LIMIT || '3', 10);
    if (user.dailyRepliesUsed >= dailyLimit) {
      await sendWhatsAppMessage(
        from,
        `You've reached your daily limit of ${dailyLimit} replies. Check back tomorrow!`
      );
      return NextResponse.json({ message: 'Daily limit reached' });
    }

    // Process user message
    const normalizedMessage = message.trim().toUpperCase();
    let responseContent = '';
    let responseType = 'reply';

    if (normalizedMessage === 'NEXT') {
      responseContent = await generateLesson(user.topic);
      responseType = 'lesson';
    } else if (normalizedMessage === 'QUIZ') {
      responseContent = await generateQuiz(user.topic);
      responseType = 'quiz';
    } else {
      responseContent = await generateReply(user.topic, message);
    }

    // Save the response in the database
    await prisma.lesson.create({
      data: {
        userId: user.id,
        content: responseContent,
        type: responseType,
      },
    });

    // Update user's daily reply count and get the updated value
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { dailyRepliesUsed: user.dailyRepliesUsed + 1 },
    });

    // Format the response message
    let formattedResponse = '';
    if (responseType === 'lesson') {
      formattedResponse = `📚 New Lesson on ${user.topic}:\n\n${responseContent}`;
    } else if (responseType === 'quiz') {
      formattedResponse = `🧠 Quiz Time!\n\n${responseContent}`;
    } else {
      formattedResponse = `${responseContent}\n\n(${updatedUser.dailyRepliesUsed}/${dailyLimit} replies used today)`;
    }

    // Send the response via WhatsApp
    await sendWhatsAppMessage(from, formattedResponse);

    return NextResponse.json({ message: 'Response sent successfully' });
  } catch (error) {
    console.error('Error processing webhook:', error);
    // Notify user of the error
    // await sendWhatsAppMessage(
    //   body.From,
    //   'Sorry, something went wrong on our end. Please try again later.'
    // );
    
    return NextResponse.json({ message: 'Failed to process webhook' }, { status: 500 });
  }
}