import { apiGet, apiPost } from '../utils/api';

declare global {
  interface Window {
    Razorpay: any;
  }
}

let cachedRazorpayKey: string | null = null;

async function getRazorpayKey(): Promise<string> {
  if (cachedRazorpayKey) return cachedRazorpayKey;
  try {
    const data = await apiGet<{ key_id?: string }>('/api/payments/key');
    cachedRazorpayKey = data.key_id || import.meta.env.VITE_RAZORPAY_KEY_ID;
    return cachedRazorpayKey;
  } catch (error) {
    console.error('Failed to fetch Razorpay key from backend:', error);
  }
  cachedRazorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;
  return cachedRazorpayKey;
}

export const paymentService = {
  async createRazorpayOrder(data: {
    amount: number;
    customerName: string;
    customerPhone: string;
    customerEmail?: string;
    orderType: string;
    items: Array<{
      product_id: string;
      product_name: string;
      quantity: number;
      unit_price: number;
      total_price: number;
    }>;
    loyaltyCoinsUsed: number;
    discount: number;
  }) {
    return apiPost<{ orderId: string; razorpayOrder: { id: string } }>('/api/payments/create-order', data);
  },

  openRazorpayCheckout(options: {
    orderId: string;
    amount: number;
    name: string;
    description: string;
    prefill: { name: string; contact: string; email: string };
  }): Promise<{ success: boolean; razorpay_order_id?: string; razorpay_payment_id?: string; razorpay_signature?: string; error?: string }> {
    return new Promise(async (resolve) => {
      const key = await getRazorpayKey();
      if (!window.Razorpay) {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => this.initializeRazorpay(options, resolve, key);
        script.onerror = () => resolve({ success: false, error: 'Failed to load Razorpay SDK' });
        document.head.appendChild(script);
      } else {
        this.initializeRazorpay(options, resolve, key);
      }
    });
  },

  initializeRazorpay(options: any, resolve: any, key: string) {
    const rzp = new window.Razorpay({
      key: key,
      amount: options.amount * 100,
      currency: 'INR',
      name: options.name,
      description: options.description,
      order_id: options.orderId,
      prefill: options.prefill,
      theme: { color: '#000000' },
      handler: (response: any) => {
        resolve({
          success: true,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        });
      },
      modal: {
        ondismiss: () => resolve({ success: false, error: 'Payment cancelled' }),
      },
    });
    rzp.open();
  },
};
