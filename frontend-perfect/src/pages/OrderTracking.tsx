import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { orderService } from '../services/orderService';
import type { Order, OrderItem } from '../lib/supabase';

export default function OrderTracking() {
  const { trackingToken } = useParams<{ trackingToken: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [items, setItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      if (!trackingToken) return;
      const result = await orderService.getByTrackingToken(trackingToken);
      if (result.error || !result.data) {
        setError('Order not found');
      } else {
        setOrder(result.data);
        setItems(result.data.order_items || []);
      }
      setLoading(false);
    };
    load();
  }, [trackingToken]);

  const handlePrintReceipt = () => {
    window.print();
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center pt-20">Loading order receipt...</div>;
  if (error || !order) return (
    <div className="min-h-screen flex items-center justify-center pt-20 text-center">
      <div>
        <p className="text-red-600 mb-4">{error || 'Order not found'}</p>
        <Link to="/products" className="text-black underline">Continue Shopping</Link>
      </div>
    </div>
  );

  const statusColors: Record<string, string> = {
    pending: 'bg-amber-100 text-amber-800 border-amber-200',
    confirmed: 'bg-blue-100 text-blue-800 border-blue-200',
    processing: 'bg-purple-100 text-purple-800 border-purple-200',
    shipped: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    delivered: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    cancelled: 'bg-rose-100 text-rose-800 border-rose-200',
  };

  const trackingSteps = [
    { key: 'pending', label: 'Order Placed' },
    { key: 'confirmed', label: 'Confirmed' },
    { key: 'processing', label: 'Processing' },
    { key: 'shipped', label: 'Shipped' },
    { key: 'delivered', label: 'Delivered' },
  ];

  const getStepStatus = (orderStatus: Order['status'], stepIndex: number) => {
    if (orderStatus === 'cancelled') return 'cancelled';
    const statusOrder = ['pending', 'confirmed', 'processing', 'shipped', 'delivered'];
    const currentIndex = statusOrder.indexOf(orderStatus);
    if (currentIndex >= stepIndex) return 'completed';
    return 'upcoming';
  };

  return (
    <div className="min-h-screen bg-background text-foreground pt-28 md:pt-32 px-4 sm:px-6 md:px-12 pb-24">
      {/* Print Only Receipt */}
      <div className="hidden print:block fixed inset-0 bg-white text-black p-8 z-[99999]">
        <div className="max-w-2xl mx-auto border border-black p-8 rounded-lg">
          <div className="flex justify-between items-start border-b border-black pb-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold">Kruxnut Cafe & Snacks</h1>
              <p className="text-sm text-gray-600">Official Order Receipt / Tax Invoice</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Date: {new Date(order.created_at).toLocaleDateString('en-IN')}</p>
              <p className="font-mono text-sm font-semibold">Token: {order.tracking_token}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm mb-6 pb-4 border-b border-gray-300">
            <div>
              <p className="font-semibold text-gray-700">Customer Details:</p>
              <p className="font-medium">{order.customer_name}</p>
              <p>{order.customer_phone}</p>
              <p>{order.customer_email || ''}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">Shipping Address:</p>
              <p>{order.shipping_address}</p>
              <p>{order.city} - {order.pincode}</p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-sm mb-2 border-b border-gray-200 pb-1">Order Items:</h3>
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="py-2">Item</th>
                  <th className="py-2 text-center">Qty</th>
                  <th className="py-2 text-right">Price</th>
                  <th className="py-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-b border-gray-100">
                    <td className="py-2 font-medium">{item.product_name}</td>
                    <td className="py-2 text-center">{item.quantity}</td>
                    <td className="py-2 text-right">₹{item.unit_price}</td>
                    <td className="py-2 text-right">₹{item.total_price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="border-t border-black pt-4 text-sm space-y-1">
            <div className="flex justify-between"><span>Subtotal:</span><span>₹{order.subtotal}</span></div>
            {order.discount > 0 && <div className="flex justify-between text-green-700"><span>Discount:</span><span>-₹{order.discount}</span></div>}
            <div className="flex justify-between font-bold text-base pt-2 border-t border-gray-300"><span>Total Paid:</span><span>₹{order.total}</span></div>
            <p className="text-xs text-gray-500 mt-4 text-center">Payment Status: {order.payment_status.toUpperCase()} | Thank you for shopping with Kruxnut!</p>
          </div>
        </div>
      </div>

      {/* Main Screen View */}
      <div className="max-w-3xl mx-auto print:hidden">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full card text-xs mb-2">
              <span className="size-2 rounded-full bg-emerald-500" />
              Order Confirmed
            </div>
            <h1 className="text-3xl font-semibold text-black">Order Receipt & Tracking</h1>
            <p className="text-xs text-gray-500 mt-1">Token: <span className="font-mono font-bold text-black">{order.tracking_token}</span></p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrintReceipt}
              className="px-4 py-2.5 bg-black text-white text-xs font-semibold rounded-xl hover:bg-black/80 transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <span>🧾</span> Download Receipt
            </button>
            <span className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${statusColors[order.status] || 'bg-gray-100 text-gray-800'}`}>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </span>
          </div>
        </div>

        {/* Status / Tracking Progress Timeline */}
        <div className="bg-white rounded-2xl border border-black/10 p-6 mb-6">
          <h2 className="text-base font-semibold mb-4 text-black flex items-center gap-2">
            <span>📍</span> Live Delivery Status
          </h2>

          {order.status === 'delivered' ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-5 flex items-center gap-3 text-emerald-900">
              <span className="size-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold shrink-0">✓</span>
              <div>
                <p className="font-semibold text-sm">Order Delivered!</p>
                <p className="text-xs text-emerald-700">Your package has been successfully delivered.</p>
              </div>
            </div>
          ) : (
            <div className="relative flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 my-4">
              {trackingSteps.map((step, idx) => {
                const st = getStepStatus(order.status, idx);
                return (
                  <div key={step.key} className="flex sm:flex-col items-center gap-3 sm:gap-1.5 flex-1 z-10 sm:text-center">
                    <div className={`size-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      st === 'completed' ? 'bg-black text-white shadow-md' : 'bg-gray-100 text-gray-400 border border-black/10'
                    }`}>
                      {st === 'completed' ? '✓' : idx + 1}
                    </div>
                    <span className={`text-xs font-medium ${st === 'completed' ? 'text-black font-semibold' : 'text-gray-400'}`}>{step.label}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-2xl border border-black/10 p-6 mb-6">
          <h2 className="text-base font-semibold mb-4 text-black">Customer & Shipping Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div><span className="text-gray-500 text-xs block">Order ID:</span><p className="font-mono text-xs font-medium text-black">{order.id}</p></div>
            <div><span className="text-gray-500 text-xs block">Tracking Token:</span><p className="font-mono text-xs font-medium text-black">{order.tracking_token}</p></div>
            <div><span className="text-gray-500 text-xs block">Customer Name:</span><p className="font-medium text-black">{order.customer_name}</p></div>
            <div><span className="text-gray-500 text-xs block">Phone Number:</span><p className="font-medium text-black">{order.customer_phone}</p></div>
            <div><span className="text-gray-500 text-xs block">Email Address:</span><p className="font-medium text-black">{order.customer_email || '-'}</p></div>
            <div><span className="text-gray-500 text-xs block">Shipping Address:</span><p className="font-medium text-black">{order.shipping_address}, {order.city} - {order.pincode}</p></div>
            <div><span className="text-gray-500 text-xs block">Payment Status:</span><p className="font-medium text-emerald-700 capitalize">{order.payment_status}</p></div>
            <div><span className="text-gray-500 text-xs block">Razorpay Payment ID:</span><p className="font-mono text-xs font-medium text-black">{order.razorpay_payment_id || '-'}</p></div>
          </div>
        </div>

        {/* Items Summary */}
        <div className="bg-white rounded-2xl border border-black/10 p-6 mb-8">
          <h2 className="text-base font-semibold mb-4 text-black">Order Items</h2>
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between items-center py-3 border-b border-black/5 last:border-0">
                <div>
                  <p className="font-medium text-black text-sm">{item.product_name}</p>
                  <p className="text-xs text-gray-500">Qty: {item.quantity} × ₹{item.unit_price}</p>
                </div>
                <span className="font-medium text-sm text-black">₹{item.total_price.toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-black/10 pt-4 mt-4 space-y-2 text-sm">
            <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>₹{order.subtotal.toFixed(2)}</span></div>
            {order.discount > 0 && <div className="flex justify-between text-emerald-600"><span>Loyalty Discount</span><span>-₹{order.discount.toFixed(2)}</span></div>}
            {order.loyalty_coins_used > 0 && <div className="flex justify-between text-gray-600"><span>Loyalty Coins Used</span><span>{order.loyalty_coins_used}</span></div>}
            <div className="flex justify-between text-gray-600"><span>Loyalty Coins Earned</span><span>+{order.loyalty_coins_earned}</span></div>
            <div className="flex justify-between text-xl font-semibold pt-3 border-t border-black/10 text-black"><span>Total Paid</span><span>₹{order.total.toFixed(2)}</span></div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/orders" className="flex-1 bg-black text-white text-center py-3.5 rounded-xl font-medium text-sm hover:bg-black/80 transition-colors shadow-sm flex items-center justify-center gap-2">
            <span>🚚</span> Track Orders / View All Orders
          </Link>
          <Link to="/products" className="flex-1 bg-gray-100 text-black text-center py-3.5 rounded-xl font-medium text-sm hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
            <span>🛒</span> Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
