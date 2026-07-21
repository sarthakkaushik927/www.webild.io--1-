import { apiGet, apiPost, apiPut } from '../utils/api';
import type { Order } from '../lib/firebase';

export const orderService = {
  async createOrder(data: {
    customerId: string;
    customerName: string;
    customerPhone: string;
    customerEmail?: string;
    shippingAddress: string;
    city: string;
    pincode: string;
    items: Array<{
      product_id: string;
      product_name: string;
      quantity: number;
      unit_price: number;
      total_price: number;
    }>;
    subtotal: number;
    discount: number;
    loyaltyCoinsUsed: number;
    total: number;
    loyaltyCoinsEarned: number;
    razorpayOrderId?: string;
    razorpayPaymentId?: string;
  }) {
    return apiPost<Order>('/api/orders', data);
  },

  async confirmOrder(data: {
    orderId: string;
    razorpayOrderId: string;
    razorpayPaymentId: string;
  }) {
    return apiPut<{ success: boolean }>(`/api/orders/${data.orderId}/confirm`, {
      razorpayOrderId: data.razorpayOrderId,
      razorpayPaymentId: data.razorpayPaymentId,
    });
  },

  async getByTrackingToken(token: string) {
    return apiGet<{ data: Order | null; error: string | null }>(`/api/orders/tracking/${token}`);
  },

  async getByCustomer(customerId: string) {
    return apiGet<{ data: Order[] }>(`/api/orders?customerId=${customerId}`);
  },

  async getAllOrders() {
    return apiGet<{ data: Order[] }>('/api/orders');
  },

  async updateStatus(orderId: string, status: Order['status']) {
    return apiPut<{ success: boolean; data: Order }>(`/api/orders/${orderId}/status`, { status });
  },
};
