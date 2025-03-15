import twilio from 'twilio';
import { NextApiRequest } from 'next'; // For Next.js API routes
import { NextRequest } from 'next/server';

// Check for missing credentials
if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
  throw new Error('Missing Twilio credentials in environment variables');
}

// Initialize Twilio client
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Ensure this is your WhatsApp-enabled Twilio number (e.g., 'whatsapp:+14155238886')
const fromNumber = process.env.TWILIO_PHONE_NUMBER || 'whatsapp:+14155238886';

export const sendWhatsAppMessage = async (
  to: string,
  body: string
): Promise<boolean> => {
  try {
    const formattedTo = to.startsWith('whatsapp:') ? to : `whatsapp:${to}`;

    await client.messages.create({
      body,
      from: fromNumber,
      to: formattedTo,
    });

    console.log(`Message sent to ${to}`);
    return true;
  } catch (error: any) {
    console.error(`Error sending WhatsApp message to ${to}:`, error.message);
    return false;
  }
};

// Validate Twilio webhook requests in a Next.js API route
export const validateTwilioRequest = async(req: NextRequest): Promise<boolean> => {
  try {
    const twilioSignature = req.headers.get('X-Twilio-Signature') || '';
    const url = req.url;
    const params = req.method === 'POST' ? Object.fromEntries(await req.formData()) : {};
    return twilio.validateRequest(
      process.env.TWILIO_AUTH_TOKEN || '',
      twilioSignature,
      url,
      params
    );
  } catch (error: any) {
    console.error('Error validating Twilio request:', error.message);
    return false;
  }
};