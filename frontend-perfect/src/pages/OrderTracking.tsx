import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { orderService } from '../services/orderService';
import type { Order, OrderItem } from '../lib/firebase';

const statusSteps = [
  { key: 'pending', label: 'Order Placed' },
  { key: 'confirmed', label: 'Confirmed' },
  { key: 'processing', label: 'Processing' },
  { key: 'shipped', label: 'Shipped' },
  { key: 'delivered', label: 'Delivered' },
];

export default function OrderTracking() {
  const { trackingToken } = useParams<{ trackingToken: string }>();
  const [order, setOrder] = useState<(Order & { order_items?: OrderItem[] }) | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!trackingToken) return;
      const { data } = await orderService.getByTrackingToken(trackingToken);
      if (data) setOrder(data as any);
      setLoading(false);
    };
    load();
  }, [trackingToken]);

  useEffect(() => {
    if (!trackingToken) return;

    const interval = window.setInterval(async () => {
      const { data } = await orderService.getByTrackingToken(trackingToken);
      if (data) setOrder(data as any);
    }, 5000);

    return () => window.clearInterval(interval);
  }, [trackingToken]);

  if (loading) return <div className="min-h-screen flex items-center justify-center pt-20">Loading...</div>;
  if (!order) return <div className="min-h-screen flex items-center justify-center pt-20">Order not found</div>;

  const currentStatusIndex = statusSteps.findIndex((s) => s.key === order.status);

  return (
    <div className="min-h-screen bg-background text-foreground pt-32 px-6 md:px-12 pb-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-light tracking-tighter mb-2">Track Your Order</h1>
        <p className="text-gray-400 mb-8">Tracking ID: {order.tracking_token}</p>

        <div className="bg-white rounded-2xl border border-black/10 p-8 mb-6">
          <h2 className="text-lg font-medium mb-6">Order Status</h2>
          <div className="flex items-center justify-between">
            {statusSteps.map((step, i) => (
              <div key={step.key} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                    i <= currentStatusIndex ? 'bg-black text-white' : 'bg-black/10 text-gray-400'
                  }`}
                >
                  {i + 1}
                </div>
                <p className={`text-xs mt-2 ${i <= currentStatusIndex ? 'text-black' : 'text-gray-400'}`}>
                  {step.label}
                </p>
                {i < statusSteps.length - 1 && (
                  <div className={`hidden md:block w-16 h-0.5 mx-2 ${i < currentStatusIndex ? 'bg-black' : 'bg-black/10'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-black/10 p-8 mb-6">
          <h2 className="text-lg font-medium mb-4">Order Details</h2>
          <div className="space-y-2 mb-4">
            {order.order_items?.map((item: OrderItem, idx: number) => (
              <div key={item.id || idx} className="flex justify-between text-sm">
                <span>
                  {item.product_name} x {item.quantity}
                </span>
                <span>₹{item.total_price.toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-black/10 pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>₹{order.subtotal.toFixed(2)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-sm text-green-600">
                <span>Discount</span>
                <span>-₹{order.discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>₹{order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-black/10 p-8">
          <h2 className="text-lg font-medium mb-4">Shipping Info</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Name</p>
              <p className="font-medium">{order.customer_name}</p>
            </div>
            <div>
              <p className="text-gray-600">Phone</p>
              <p className="font-medium">{order.customer_phone}</p>
            </div>
            {order.customer_email && (
              <div className="md:col-span-2">
                <p className="text-gray-600">Email</p>
                <p className="font-medium">{order.customer_email}</p>
              </div>
            )}
            <div className="md:col-span-2">
              <p className="text-gray-600">Address</p>
              <p className="font-medium">{order.shipping_address}, {order.city} - {order.pincode}</p>
            </div>
            <div>
              <p className="text-gray-600">Payment</p>
              <p className="font-medium capitalize">{order.payment_status}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
