import express from 'express';
import cors from 'cors';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import { firestoreDb, doc, updateDoc, getDoc } from '../config/firebase.js';

const router = express.Router();

async function getRazorpayConfig() {
  try {
    const docRef = doc(firestoreDb, 'api_configs', 'payment_api_key');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        key_id: data.key || process.env.RAZORPAY_KEY_ID,
        key_secret: data.value || process.env.RAZORPAY_KEY_SECRET,
      };
    }
  } catch (error) {
    console.error('Failed to fetch Razorpay config from Firestore, using env vars:', error);
  }
  return {
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  };
}

router.post('/create-order', async (req, res) => {
  try {
    const { amount } = req.body;
    const config = await getRazorpayConfig();

    const razorpay = new Razorpay({
      key_id: config.key_id,
      key_secret: config.key_secret,
    });

    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100),
      currency: 'INR',
      receipt: `order_${Date.now()}`,
    });

    res.json({ orderId: order.id, razorpayOrder: order });
  } catch (error) {
    console.error('Razorpay order creation failed:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

router.get('/key', async (req, res) => {
  try {
    const config = await getRazorpayConfig();
    res.json({ key_id: config.key_id || '' });
  } catch (error) {
    console.error('Failed to load Razorpay key:', error);
    res.status(500).json({ error: 'Failed to load Razorpay key' });
  }
});

router.post('/verify', async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const config = await getRazorpayConfig();

    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', config.key_secret)
      .update(body)
      .digest('hex');

    if (expectedSignature === razorpay_signature) {
      res.json({ success: true, message: 'Payment verified' });
    } else {
      res.status(400).json({ success: false, message: 'Invalid signature' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Verification failed' });
  }
});

router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  try {
    const signatureHeader = req.headers['x-razorpay-signature'];
    const signature = Array.isArray(signatureHeader) ? signatureHeader[0] : signatureHeader;
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

    if (!signature || !webhookSecret) {
      return res.status(400).json({ error: 'Missing signature or webhook secret' });
    }

    const body = JSON.stringify(req.body);
    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(body)
      .digest('hex');

    if (expectedSignature !== signature) {
      return res.status(400).json({ error: 'Invalid webhook signature' });
    }

    const event = req.body;
    const eventType = event.event;
    const payment = event.payload?.payment?.entity;

    if (eventType === 'payment.captured' && payment) {
      const orderId = payment.notes?.order_id || payment.order_id;
      if (orderId) {
        const orderRef = doc(firestoreDb, 'orders', orderId);
        await updateDoc(orderRef, {
          payment_status: 'paid',
          razorpay_payment_id: payment.id,
          status: 'confirmed',
          updated_at: new Date().toISOString(),
        });
      }
    } else if (eventType === 'payment.failed' && payment) {
      const orderId = payment.notes?.order_id || payment.order_id;
      if (orderId) {
        const orderRef = doc(firestoreDb, 'orders', orderId);
        await updateDoc(orderRef, {
          payment_status: 'failed',
          status: 'cancelled',
          updated_at: new Date().toISOString(),
        });
      }
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Webhook processing failed:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

export default router;
