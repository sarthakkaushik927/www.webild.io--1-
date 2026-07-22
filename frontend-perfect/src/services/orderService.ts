import { supabase, type Order } from '../lib/supabase';

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
    const trackingToken = Math.random().toString(36).substring(2, 18) + Date.now().toString(36);

    const { data: order, error } = await supabase
      .from('orders')
      .insert([{
        tracking_token: trackingToken,
        customer_id: data.customerId,
        customer_name: data.customerName,
        customer_phone: data.customerPhone,
        customer_email: data.customerEmail || null,
        shipping_address: data.shippingAddress,
        city: data.city,
        pincode: data.pincode,
        status: 'pending',
        payment_status: 'pending',
        subtotal: data.subtotal,
        discount: data.discount,
        loyalty_coins_used: data.loyaltyCoinsUsed,
        total: data.total,
        loyalty_coins_earned: data.loyaltyCoinsEarned,
        razorpay_order_id: data.razorpayOrderId || null,
        razorpay_payment_id: data.razorpayPaymentId || null,
        notes: null,
      }])
      .select()
      .single();

    if (error || !order) throw new Error(error?.message || 'Failed to create order');

    if (data.items.length > 0) {
      const orderItems = data.items.map((item) => ({
        order_id: order.id,
        product_id: item.product_id,
        product_name: item.product_name,
        quantity: item.quantity,
        unit_price: item.unit_price,
        total_price: item.total_price,
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;
    }

    return { data: order as Order, error: null };
  },

  async confirmOrder(data: { orderId: string; razorpayOrderId: string; razorpayPaymentId: string }) {
    try {
      const { data: updated } = await supabase
        .from('orders')
        .update({
          razorpay_order_id: data.razorpayOrderId,
          razorpay_payment_id: data.razorpayPaymentId,
          payment_status: 'paid',
          status: 'confirmed',
          updated_at: new Date().toISOString(),
        })
        .eq('id', data.orderId)
        .select()
        .maybeSingle();

      return { data: updated as Order | null, error: null };
    } catch {
      return { data: null, error: null };
    }
  },

  async getByTrackingToken(token: string) {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('tracking_token', token)
      .single();

    if (error || !data) {
      return { data: null, error: 'Order not found' };
    }

    const { data: items, error: itemsError } = await supabase
      .from('order_items')
      .select('*')
      .eq('order_id', data.id)
      .order('created_at', { ascending: true });

    if (itemsError) {
      return { data: data as Order, error: null };
    }

    return { data: { ...data, order_items: items || [] } as Order, error: null };
  },

  async getByCustomer(customerId: string) {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('customer_id', customerId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data: (data || []) as Order[], error: null };
  },

  async getByCustomerWithItems(customerId: string) {
    const { data: orders, error } = await supabase
      .from('orders')
      .select('*')
      .eq('customer_id', customerId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    if (!orders || orders.length === 0) return { data: [], error: null };

    const orderIds = orders.map((o) => o.id);
    const { data: items } = await supabase
      .from('order_items')
      .select('*')
      .in('order_id', orderIds);

    const ordersWithItems = orders.map((order) => ({
      ...order,
      order_items: (items || []).filter((item) => item.order_id === order.id),
    }));

    return { data: ordersWithItems as Order[], error: null };
  },

  async getAllOrders() {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data: (data || []) as Order[], error: null };
  },

  async updateStatus(orderId: string, status: Order['status']) {
    const { data, error } = await supabase
      .from('orders')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', orderId)
      .select()
      .single();

    if (error) throw error;
    return { success: true, data: data as Order };
  },
};
