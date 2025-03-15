import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import axios from 'axios';

// This endpoint will be called by a cron job configured in vercel.json
export async function GET(request: NextRequest) {
  try {
    const apiKey = request.headers.get('x-api-key');
    const cronSecret = process.env.CRON_SECRET;

    // Validate cron job request
    if (!cronSecret || apiKey !== cronSecret) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get current hour in UTC
    const now = new Date();
    const currentHour = now.getUTCHours().toString().padStart(2, '0');
    const currentMinutes = now.getUTCMinutes().toString().padStart(2, '0');
    const currentTimeFormat = `${currentHour}:${currentMinutes}`;

    // Reset daily reply count if needed
    await resetDailyReplies();

    // Find all subscribed users who should receive lessons now (based on their schedule)
    const users = await prisma.user.findMany({
      where: {
        subscribed: true,
        schedule: {
          startsWith: currentHour
        }
      }
    });

    console.log(`Found ${users.length} users for sending lessons at ${currentTimeFormat}`);

    // Send lessons to each user
    const results = await Promise.allSettled(
      users.map(async (user: any) => {
        try {
          // Call the send-lesson endpoint for each user
          await axios.post(`${process.env.NEXT_PUBLIC_APP_URL}/api/send-lesson`, {
            userId: user.id
          });
          return user.id;
        } catch (error) {
          console.error(`Failed to send lesson to user ${user.id}:`, error);
          throw error;
        }
      })
    );

    // Count successful and failed attempts
    const successful = results.filter(r => r.status === 'fulfilled').length;
    const failed = results.filter(r => r.status === 'rejected').length;

    return NextResponse.json({
      message: `Processed ${users.length} users`,
      stats: {
        successful,
        failed
      }
    });

  } catch (error) {
    console.error('Error in cron job:', error);
    return NextResponse.json(
      { message: 'Failed to process lessons' },
      { status: 500 }
    );
  }
}

// Helper function to reset daily reply counts
async function resetDailyReplies() {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  try {
    // Reset daily reply count for users whose lastReplyReset is older than today
    await prisma.user.updateMany({
      where: {
        lastReplyReset: {
          lt: yesterday
        }
      },
      data: {
        dailyRepliesUsed: 0,
        lastReplyReset: new Date()
      }
    });
  } catch (error) {
    console.error('Error resetting daily replies:', error);
  }
}