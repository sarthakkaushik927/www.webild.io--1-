import express from 'express';
import { OrderModel } from '../models/OrderModel.js';
import { firestoreDb, collection } from '../config/firebase.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const {
      customerId,
      customerName,
      customerPhone,
      customerEmail,
      shippingAddress,
      city,
      pincode,
      items = [],
      subtotal,
      discount,
      loyaltyCoinsUsed,
      total,
      loyaltyCoinsEarned,
      razorpayOrderId = null,
      razorpayPaymentId = null,
    } = req.body;

    const trackingToken = Math.random().toString(36).substring(2, 18) + Date.now().toString(36);

    const orderData = {
      tracking_token: trackingToken,
      customer_id: customerId,
      customer_name: customerName,
      customer_phone: customerPhone,
      customer_email: customerEmail || null,
      shipping_address: shippingAddress,
      city,
      pincode,
      status: 'pending',
      payment_status: 'pending',
      subtotal,
      discount,
      loyalty_coins_used: loyaltyCoinsUsed,
      total,
      loyalty_coins_earned: loyaltyCoinsEarned,
      razorpay_order_id: razorpayOrderId,
      razorpay_payment_id: razorpayPaymentId,
      notes: null,
      order_items: items.map((item) => ({
        product_id: item.product_id,
        product_name: item.product_name,
        quantity: item.quantity,
        unit_price: item.unit_price,
        total_price: item.total_price,
      })),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const createdOrder = await OrderModel.create(orderData);

    for (const item of items) {
      const { addDoc } = await import('../config/firebase.js');
      await addDoc(collection(firestoreDb, 'order_items'), {
        order_id: createdOrder.id,
        product_id: item.product_id,
        product_name: item.product_name,
        quantity: item.quantity,
        unit_price: item.unit_price,
        total_price: item.total_price,
        created_at: new Date().toISOString(),
      });
    }

    res.status(201).json(createdOrder);
  } catch (error) {
    console.error('Order creation failed:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

router.get('/tracking/:token', async (req, res) => {
  try {
    const { token } = req.params;
    const order = await OrderModel.getByTrackingToken(token);

    if (!order) {
      return res.status(404).json({ data: null, error: 'Order not found' });
    }

    const items = await OrderModel.getItemsByOrderId(order.id);

    res.json({ data: { ...order, order_items: items }, error: null });
  } catch (error) {
    console.error('Order lookup failed:', error);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});

router.put('/:orderId/confirm', async (req, res) => {
  try {
    const { orderId } = req.params;
    const { razorpayOrderId, razorpayPaymentId } = req.body;

    const updated = await OrderModel.update(orderId, {
      razorpay_order_id: razorpayOrderId,
      razorpay_payment_id: razorpayPaymentId,
      payment_status: 'paid',
      status: 'confirmed',
      updated_at: new Date().toISOString(),
    });

    res.json({ success: true, data: updated });
  } catch (error) {
    console.error('Order confirmation failed:', error);
    res.status(500).json({ error: 'Failed to confirm order' });
  }
});

router.get('/', async (req, res) => {
  try {
    const orders = await OrderModel.getAll();
    res.json({ data: orders, error: null });
  } catch (error) {
    console.error('Failed to fetch orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

router.put('/:orderId/status', async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const updated = await OrderModel.update(orderId, {
      status,
      updated_at: new Date().toISOString(),
    });

    res.json({ success: true, data: updated });
  } catch (error) {
    console.error('Failed to update order status:', error);
    res.status(500).json({ error: 'Failed to update order status' });
  }
});

export default router;
