import axios from 'axios';

if (!process.env.PAYSTACK_SECRET_KEY) {
  throw new Error('Missing Paystack secret key');
}

const BASE_URL = 'https://api.paystack.co';

// Initialize a subscription in Paystack
export async function initializeSubscription(
  email: string,
  amount: number = 1000, // amount in kobo/cents (10 USD = 1000 cents)
  name: string
) {
  try {
    const payload = {
      email,
      amount, // Amount in the smallest currency unit (e.g., cents)
      currency: 'USD',
      callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/subscription/callback`,
      metadata: {
        name,
        custom_fields: [
          {
            display_name: 'Name',
            variable_name: 'name',
            value: name
          }
        ]
      }
    };

    const response = await axios.post(`${BASE_URL}/transaction/initialize`, payload, {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data.data;
  } catch (error) {
    console.error('Error initializing Paystack transaction:', error);
    throw new Error('Failed to initialize transaction');
  }
}

// Verify a transaction
export async function verifyTransaction(reference: string) {
  try {
    const response = await axios.get(`${BASE_URL}/transaction/verify/${reference}`, {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data.data;
  } catch (error) {
    console.error('Error verifying Paystack transaction:', error);
    throw new Error('Failed to verify transaction');
  }
}

// Create a subscription plan
export async function createPlan(name: string, amount: number = 1000, interval: string = 'monthly') {
  try {
    const payload = {
      name,
      amount,
      interval,
      currency: 'USD'
    };

    const response = await axios.post(`${BASE_URL}/plan`, payload, {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data.data;
  } catch (error) {
    console.error('Error creating Paystack plan:', error);
    throw new Error('Failed to create plan');
  }
}

// Create a subscription with an existing plan
export async function createSubscription(email: string, planCode: string) {
  try {
    const payload = {
      customer: email,
      plan: planCode
    };

    const response = await axios.post(`${BASE_URL}/subscription`, payload, {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data.data;
  } catch (error) {
    console.error('Error creating Paystack subscription:', error);
    throw new Error('Failed to create subscription');
  }
}

// Cancel a subscription
export async function cancelSubscription(subscriptionCode: string) {
  try {
    const response = await axios.post(
      `${BASE_URL}/subscription/disable`,
      { code: subscriptionCode, token: 'token' },  // token is required in the Paystack API
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.data;
  } catch (error) {
    console.error('Error canceling Paystack subscription:', error);
    throw new Error('Failed to cancel subscription');
  }
}