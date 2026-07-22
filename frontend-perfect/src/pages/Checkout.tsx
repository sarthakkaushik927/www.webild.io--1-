import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../stores/cartStore';
import { orderService } from '../services/orderService';
import { paymentService } from '../services/paymentService';
import { apiPost } from '../utils/api';
import { supabase } from '../lib/supabase';
import { authService } from '../services/firebaseService';

import type { Profile } from '../lib/supabase';

export default function Checkout() {
  const navigate = useNavigate();
  const { items, getSubtotal, clearCart } = useCartStore();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    pincode: '',
    useLoyaltyCoins: false,
  });

  const subtotal = getSubtotal();
  const maxDiscount = Math.min(profile?.loyalty_coins || 0, subtotal * 100);
  const discount = form.useLoyaltyCoins && maxDiscount > 0 ? maxDiscount / 100 : 0;
  const total = Math.max(0, subtotal - discount);

  useEffect(() => {
    const loadProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/login');
        return;
      }
      try {
        const result = await authService.getProfile(user.id);
        if (result.data) {
          setProfile(result.data);
          setForm((f) => ({
            ...f,
            name: result.data!.full_name || '',
            phone: result.data!.phone || '',
            email: user.email || '',
          }));
        }
      } catch (err) {
        console.error('Failed to load profile:', err);
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, [navigate]);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  if (items.length === 0 && !loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20">
        <p className="text-gray-400 mb-4">Your cart is empty</p>
        <button onClick={() => navigate('/products')} className="text-black underline">
          Browse Products
        </button>
      </div>
    );
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center pt-20">Loading...</div>;

  const handlePayment = async () => {
    if (!form.name || !form.phone || !form.address || !form.city || !form.pincode) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    setProcessing(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const customerId = user?.id || 'guest_' + Date.now();
      
      const { data: createdOrder } = await orderService.createOrder({
        customerId,
        customerName: form.name,
        customerPhone: form.phone,
        customerEmail: form.email || undefined,
        shippingAddress: form.address,
        city: form.city,
        pincode: form.pincode,
        items: items.map((i) => ({
          product_id: i.product_id,
          product_name: i.name,
          quantity: i.quantity,
          unit_price: i.price,
          total_price: i.price * i.quantity,
        })),
        subtotal,
        discount,
        loyaltyCoinsUsed: form.useLoyaltyCoins ? maxDiscount : 0,
        total,
        loyaltyCoinsEarned: Math.floor(total / 2),
      });

      // Save token locally for guest / customer tracking history
      try {
        const stored = JSON.parse(localStorage.getItem('my_order_tokens') || '[]');
        localStorage.setItem('my_order_tokens', JSON.stringify([createdOrder.tracking_token, ...stored]));
      } catch {
        // ignore storage errors
      }

      const { razorpayOrder } = await paymentService.createRazorpayOrder({
        amount: total,
        customerName: form.name,
        customerPhone: form.phone,
        customerEmail: form.email || undefined,
        orderType: 'standard',
        items: [],
        loyaltyCoinsUsed: form.useLoyaltyCoins ? maxDiscount : 0,
        discount,
      });

      const result = await paymentService.openRazorpayCheckout({
        orderId: razorpayOrder.id,
        amount: total,
        name: 'Royal Rich Cafe',
        description: `Order #${createdOrder.tracking_token}`,
        prefill: {
          name: form.name,
          contact: form.phone,
          email: form.email || '',
        },
      });

      if (result.success && result.razorpay_signature) {
        const verification = await apiPost<{ success: boolean }>('/api/payments/verify', {
          razorpay_order_id: result.razorpay_order_id,
          razorpay_payment_id: result.razorpay_payment_id,
          razorpay_signature: result.razorpay_signature,
          order_id: createdOrder.id,
        });

        if (!verification.success) {
          throw new Error('Payment verification failed');
        }

        await orderService.confirmOrder({
          orderId: createdOrder.id,
          razorpayOrderId: result.razorpay_order_id || '',
          razorpayPaymentId: result.razorpay_payment_id || '',
        });

        showToast('Order placed successfully!', 'success');
        clearCart();
        navigate(`/order/${createdOrder.tracking_token}`);
      }
    } catch (err) {
      console.error(err);
      showToast(err instanceof Error ? err.message : 'Payment failed', 'error');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground pt-32 px-6 md:px-12 pb-20">
      {toast && (
        <div className={`fixed top-20 right-6 z-50 px-6 py-3 rounded-xl text-white ${toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
          {toast.message}
        </div>
      )}
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-light tracking-tighter mb-8">Checkout</h1>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-black/10 p-6">
            <h2 className="text-lg font-medium mb-4">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-2">Full Name *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-3 text-black outline-none focus:border-black/30"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">Phone *</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-3 text-black outline-none focus:border-black/30"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-gray-600 mb-2">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-3 text-black outline-none focus:border-black/30"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-black/10 p-6">
            <h2 className="text-lg font-medium mb-4">Shipping Address</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm text-gray-600 mb-2">Address *</label>
                <input
                  type="text"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-3 text-black outline-none focus:border-black/30"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">City *</label>
                <input
                  type="text"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-3 text-black outline-none focus:border-black/30"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">Pincode *</label>
                <input
                  type="text"
                  value={form.pincode}
                  onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                  className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-3 text-black outline-none focus:border-black/30"
                />
              </div>
            </div>
          </div>

          {profile && (
            <div className="bg-white rounded-2xl border border-black/10 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-medium">Loyalty Coins</h2>
                  <p className="text-sm text-gray-600">You have {profile.loyalty_coins} coins (₹{(profile.loyalty_coins / 100).toFixed(2)} value)</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.useLoyaltyCoins}
                    onChange={(e) => setForm({ ...form, useLoyaltyCoins: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-black/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                </label>
              </div>
            </div>
          )}

          <div className="bg-white rounded-2xl border border-black/10 p-6">
            <h2 className="text-lg font-medium mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.name} x {item.quantity}</span>
                  <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-black/10 pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Loyalty Discount</span>
                  <span>-₹{discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <button
            onClick={handlePayment}
            disabled={processing}
            className="w-full bg-black text-white font-medium py-4 rounded-xl hover:bg-black/80 disabled:opacity-50 transition-colors"
          >
            {processing ? 'Processing...' : `Pay ₹${total.toFixed(2)}`}
          </button>
        </div>
      </div>
    </div>
  );
}
