import { useState, useEffect } from 'react';
import type { Order, OrderItem } from '../lib/supabase';

interface OrderDetailsModalProps {
  order: Order;
  onClose: () => void;
  onStatusUpdate: (orderId: string, newStatus: Order['status']) => void;
}

const statusOptions = [
  { value: 'pending', label: 'Pending' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'processing', label: 'Processing' },
  { value: 'shipped', label: 'Shipped' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'cancelled', label: 'Cancelled' },
];

export default function OrderDetailsModal({ order, onClose, onStatusUpdate }: OrderDetailsModalProps) {
  const [currentStatus, setCurrentStatus] = useState(order.status);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setCurrentStatus(order.status);
  }, [order.status]);

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as Order['status'];
    setSaving(true);
    try {
      await onStatusUpdate(order.id, newStatus);
      setCurrentStatus(newStatus);
    } catch (err) {
      console.error('Failed to update status', err);
    } finally {
      setSaving(false);
    }
  };

  const formatDate = (timestamp: any) => {
    const date = timestamp?.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-light text-black">Order Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black text-2xl">&times;</button>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Order ID</p>
              <p className="font-mono font-medium">{order.tracking_token}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Placed On</p>
              <p className="font-medium">{formatDate(order.created_at)}</p>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">Update Status</label>
              <select
                value={currentStatus}
                onChange={handleStatusChange}
                disabled={saving}
                className="bg-black/5 border border-black/10 rounded-lg px-4 py-2 text-black outline-none focus:border-black/30 disabled:opacity-50"
              >
                {statusOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-black/5 rounded-xl p-4">
              <h3 className="text-sm font-medium text-gray-600 mb-3">Customer Details</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-gray-600">Name:</span>
                  <span className="ml-2 font-medium">{order.customer_name}</span>
                </div>
                <div>
                  <span className="text-gray-600">Phone:</span>
                  <span className="ml-2 font-medium">{order.customer_phone}</span>
                </div>
                {order.customer_email && (
                  <div>
                    <span className="text-gray-600">Email:</span>
                    <span className="ml-2 font-medium">{order.customer_email}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-black/5 rounded-xl p-4">
              <h3 className="text-sm font-medium text-gray-600 mb-3">Shipping Address</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-gray-600">Address:</span>
                  <span className="ml-2 font-medium">{order.shipping_address}</span>
                </div>
                <div>
                  <span className="text-gray-600">City:</span>
                  <span className="ml-2 font-medium">{order.city}</span>
                </div>
                <div>
                  <span className="text-gray-600">Pincode:</span>
                  <span className="ml-2 font-medium">{order.pincode}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-black/5 rounded-xl p-4">
            <h3 className="text-sm font-medium text-gray-600 mb-3">Line Items</h3>
            <div className="space-y-2">
              {order.order_items?.map((item: OrderItem, idx: number) => (
                <div key={item.id || idx} className="flex justify-between items-center py-2 border-b border-black/5 last:border-0">
                  <div>
                    <p className="font-medium">{item.product_name}</p>
                    <p className="text-sm text-gray-600">Qty: {item.quantity} x ₹{item.unit_price.toFixed(2)}</p>
                  </div>
                  <p className="font-medium">₹{item.total_price.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-black/5 rounded-xl p-4">
            <h3 className="text-sm font-medium text-gray-600 mb-3">Financial Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>₹{order.subtotal.toFixed(2)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Loyalty Discount</span>
                  <span>-₹{order.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-semibold pt-2 border-t border-black/10">
                <span>Total Paid</span>
                <span>₹{order.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Payment Status</span>
                <span className={`capitalize ${
                  order.payment_status === 'paid' ? 'text-green-600' :
                  order.payment_status === 'failed' ? 'text-red-600' :
                  'text-yellow-600'
                }`}>
                  {order.payment_status}
                </span>
              </div>
            </div>
          </div>

          {order.razorpay_order_id && (
            <div className="text-xs text-gray-500">
              <p>Razorpay Order ID: {order.razorpay_order_id}</p>
              {order.razorpay_payment_id && <p>Payment ID: {order.razorpay_payment_id}</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
