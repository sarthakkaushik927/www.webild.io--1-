import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase, type Order } from '../lib/supabase';
import { orderService } from '../services/orderService';

export default function Orders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'in_progress' | 'delivered' | 'cancelled'>('all');
  const [searchToken, setSearchToken] = useState('');
  const [searchError, setSearchError] = useState<string | null>(null);
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        let customerOrders: Order[] = [];

        if (session?.user) {
          const res = await orderService.getByCustomerWithItems(session.user.id);
          if (res.data) customerOrders = res.data;
        }

        // Also check localStorage for recent guest order tracking tokens
        const storedTokens: string[] = JSON.parse(localStorage.getItem('my_order_tokens') || '[]');
        if (storedTokens.length > 0) {
          const guestOrdersPromises = storedTokens.map((token) => orderService.getByTrackingToken(token));
          const results = await Promise.all(guestOrdersPromises);
          results.forEach((res) => {
            if (res.data && !customerOrders.some((o) => o.id === res.data!.id)) {
              customerOrders.push(res.data);
            }
          });
        }

        // Sort by date descending
        customerOrders.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        setOrders(customerOrders);
      } catch (err) {
        console.error('Failed to load orders:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleSearchByToken = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchToken.trim()) return;

    setSearchLoading(true);
    setSearchError(null);
    try {
      const res = await orderService.getByTrackingToken(searchToken.trim());
      if (res.error || !res.data) {
        setSearchError('No order found with this tracking token.');
      } else {
        setSelectedOrder(res.data);
      }
    } catch {
      setSearchError('Error searching for order.');
    } finally {
      setSearchLoading(false);
    }
  };

  const handlePrintReceipt = (order: Order) => {
    setSelectedOrder(order);
    setTimeout(() => {
      window.print();
    }, 200);
  };

  const filteredOrders = orders.filter((o) => {
    if (activeTab === 'delivered') return o.status === 'delivered';
    if (activeTab === 'cancelled') return o.status === 'cancelled';
    if (activeTab === 'in_progress') return o.status !== 'delivered' && o.status !== 'cancelled';
    return true;
  });

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'delivered':
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">✓ Delivered</span>;
      case 'shipped':
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800 border border-indigo-200">🚚 Out for Delivery / Shipped</span>;
      case 'processing':
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800 border border-purple-200">⚙ Processing</span>;
      case 'confirmed':
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">✓ Confirmed</span>;
      case 'cancelled':
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-200">✕ Cancelled</span>;
      default:
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">⏳ Order Placed</span>;
    }
  };

  const trackingSteps = [
    { key: 'pending', label: 'Order Placed', desc: 'Order received & initialized' },
    { key: 'confirmed', label: 'Confirmed', desc: 'Payment verified & order confirmed' },
    { key: 'processing', label: 'Processing', desc: 'Preparing snacks for dispatch' },
    { key: 'shipped', label: 'Shipped', desc: 'Package in transit with courier' },
    { key: 'delivered', label: 'Delivered', desc: 'Delivered to your address' },
  ];

  const getStepStatus = (orderStatus: Order['status'], stepKey: string, stepIndex: number) => {
    if (orderStatus === 'cancelled') return 'cancelled';
    const statusOrder = ['pending', 'confirmed', 'processing', 'shipped', 'delivered'];
    const currentIndex = statusOrder.indexOf(orderStatus);
    if (currentIndex >= stepIndex) return 'completed';
    return 'upcoming';
  };

  return (
    <div className="min-h-screen bg-background text-foreground pt-28 md:pt-32 px-4 sm:px-6 md:px-12 pb-24">
      {/* Print Only Invoice View */}
      {selectedOrder && (
        <div className="hidden print:block fixed inset-0 bg-white text-black p-8 z-[99999]">
          <div className="max-w-2xl mx-auto border border-black p-8 rounded-lg">
            <div className="flex justify-between items-start border-b border-black pb-4 mb-6">
              <div>
                <h1 className="text-2xl font-bold">Kruxnut Cafe & Snacks</h1>
                <p className="text-sm text-gray-600">Official Order Receipt / Tax Invoice</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">Date: {new Date(selectedOrder.created_at).toLocaleDateString('en-IN')}</p>
                <p className="font-mono text-sm font-semibold">Token: {selectedOrder.tracking_token}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm mb-6 pb-4 border-b border-gray-300">
              <div>
                <p className="font-semibold text-gray-700">Customer Details:</p>
                <p className="font-medium">{selectedOrder.customer_name}</p>
                <p>{selectedOrder.customer_phone}</p>
                <p>{selectedOrder.customer_email || ''}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-700">Shipping Address:</p>
                <p>{selectedOrder.shipping_address}</p>
                <p>{selectedOrder.city} - {selectedOrder.pincode}</p>
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
                  {(selectedOrder.order_items || []).map((item) => (
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
              <div className="flex justify-between"><span>Subtotal:</span><span>₹{selectedOrder.subtotal}</span></div>
              {selectedOrder.discount > 0 && <div className="flex justify-between text-green-700"><span>Discount:</span><span>-₹{selectedOrder.discount}</span></div>}
              <div className="flex justify-between font-bold text-base pt-2 border-t border-gray-300"><span>Total Paid:</span><span>₹{selectedOrder.total}</span></div>
              <p className="text-xs text-gray-500 mt-4 text-center">Payment Status: {selectedOrder.payment_status.toUpperCase()} | Thank you for shopping with Kruxnut!</p>
            </div>
          </div>
        </div>
      )}

      {/* Screen View */}
      <div className="max-w-5xl mx-auto print:hidden">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full card text-xs mb-3">
              <span className="size-2 rounded-full bg-primary-cta" />
              Order Management
            </div>
            <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-black">My Orders & Live Tracking</h1>
            <p className="text-gray-500 text-sm md:text-base mt-1">Track your snack deliveries, view complete order details, or download official receipts.</p>
          </div>
          <Link to="/products" className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-black text-white text-sm font-medium hover:bg-black/80 transition-all shadow-sm">
            + Shop More Snacks
          </Link>
        </div>

        {/* Search Bar for Guest / Token lookup */}
        <div className="bg-white rounded-2xl border border-black/10 p-5 mb-8 shadow-sm">
          <form onSubmit={handleSearchByToken} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Track an order by entering Tracking Token (e.g. 7f9a2b...)"
              value={searchToken}
              onChange={(e) => setSearchToken(e.target.value)}
              className="flex-1 bg-gray-50 border border-black/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-black/30 transition-colors"
            />
            <button
              type="submit"
              disabled={searchLoading}
              className="px-6 py-2.5 bg-black text-white text-sm font-medium rounded-xl hover:bg-black/80 transition-colors disabled:opacity-50"
            >
              {searchLoading ? 'Searching...' : 'Track Order'}
            </button>
          </form>
          {searchError && <p className="text-red-500 text-xs mt-2">{searchError}</p>}
        </div>

        {/* Modal for Order Details & Live Tracking */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[2000] flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl border border-black/10 max-w-3xl w-full p-6 md:p-8 max-h-[90vh] overflow-y-auto shadow-2xl relative">
              <button
                onClick={() => setSelectedOrder(null)}
                className="absolute top-5 right-5 size-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
              >
                ✕
              </button>

              <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pr-10">
                <div>
                  <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Order Details</span>
                  <h2 className="text-xl md:text-2xl font-bold text-black mt-0.5">Token: #{selectedOrder.tracking_token}</h2>
                  <p className="text-xs text-gray-500 mt-1">Placed on {new Date(selectedOrder.created_at).toLocaleString('en-IN')}</p>
                </div>
                {getStatusBadge(selectedOrder.status)}
              </div>

              {/* Status Banner */}
              {selectedOrder.status === 'delivered' ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 mb-6 flex items-center gap-3 text-emerald-900">
                  <div className="size-10 rounded-full bg-emerald-500 text-white flex items-center justify-center text-lg font-bold shrink-0">✓</div>
                  <div>
                    <h3 className="font-semibold text-sm">Order Delivered!</h3>
                    <p className="text-xs text-emerald-700 mt-0.5">Your package has been successfully delivered to your shipping address.</p>
                  </div>
                </div>
              ) : selectedOrder.status === 'cancelled' ? (
                <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 mb-6 flex items-center gap-3 text-rose-900">
                  <div className="size-10 rounded-full bg-rose-500 text-white flex items-center justify-center text-lg font-bold shrink-0">✕</div>
                  <div>
                    <h3 className="font-semibold text-sm">Order Cancelled</h3>
                    <p className="text-xs text-rose-700 mt-0.5">This order has been cancelled.</p>
                  </div>
                </div>
              ) : (
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-6 flex items-center gap-3 text-blue-900">
                  <div className="size-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-bold shrink-0">🚚</div>
                  <div>
                    <h3 className="font-semibold text-sm">Order In Transit</h3>
                    <p className="text-xs text-blue-700 mt-0.5">Your order status is currently <span className="font-semibold capitalize">{selectedOrder.status}</span>.</p>
                  </div>
                </div>
              )}

              {/* Live Tracking Progress Timeline */}
              <div className="mb-8 bg-gray-50 rounded-2xl p-5 border border-black/5">
                <h3 className="text-sm font-semibold text-gray-800 mb-5 flex items-center gap-2">
                  <span>📍</span> Live Shipment Progress
                </h3>
                <div className="relative flex flex-col md:flex-row justify-between gap-4 md:gap-0">
                  {trackingSteps.map((step, idx) => {
                    const st = getStepStatus(selectedOrder.status, step.key, idx);
                    return (
                      <div key={step.key} className="flex md:flex-col items-center gap-3 md:gap-2 flex-1 relative z-10 text-left md:text-center">
                        <div className={`size-9 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                          st === 'completed' ? 'bg-black text-white shadow-md' : 'bg-gray-200 text-gray-500'
                        }`}>
                          {st === 'completed' ? '✓' : idx + 1}
                        </div>
                        <div>
                          <p className={`text-xs font-semibold ${st === 'completed' ? 'text-black' : 'text-gray-400'}`}>{step.label}</p>
                          <p className="text-[10px] text-gray-400 max-w-[120px] hidden md:block mt-0.5">{step.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Items & Price Breakdown */}
              <div className="bg-white rounded-2xl border border-black/10 p-5 mb-6">
                <h3 className="text-sm font-semibold text-black mb-3">Items Purchased</h3>
                <div className="divide-y divide-gray-100">
                  {(selectedOrder.order_items || []).map((item) => (
                    <div key={item.id} className="py-3 flex justify-between items-center text-sm">
                      <div>
                        <p className="font-medium text-black">{item.product_name}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity} × ₹{item.unit_price}</p>
                      </div>
                      <span className="font-semibold text-black">₹{item.total_price}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-black/10 pt-4 mt-3 space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>₹{selectedOrder.subtotal}</span></div>
                  {selectedOrder.discount > 0 && <div className="flex justify-between text-emerald-600"><span>Discount</span><span>-₹{selectedOrder.discount}</span></div>}
                  <div className="flex justify-between font-bold text-base text-black pt-2 border-t border-black/10"><span>Total Paid</span><span>₹{selectedOrder.total}</span></div>
                </div>
              </div>

              {/* Customer & Shipping Info */}
              <div className="bg-gray-50 rounded-2xl p-5 border border-black/5 text-sm mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 font-semibold">Customer</p>
                  <p className="font-medium text-black mt-0.5">{selectedOrder.customer_name}</p>
                  <p className="text-xs text-gray-600">{selectedOrder.customer_phone}</p>
                  {selectedOrder.customer_email && <p className="text-xs text-gray-600">{selectedOrder.customer_email}</p>}
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-semibold">Delivery Address</p>
                  <p className="font-medium text-black mt-0.5">{selectedOrder.shipping_address}</p>
                  <p className="text-xs text-gray-600">{selectedOrder.city} - {selectedOrder.pincode}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => handlePrintReceipt(selectedOrder)}
                  className="flex-1 bg-black text-white py-3 rounded-xl font-medium text-sm hover:bg-black/80 transition-colors flex items-center justify-center gap-2"
                >
                  <span>🧾</span> Download / Print Receipt
                </button>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="px-6 py-3 bg-gray-100 text-black py-3 rounded-xl font-medium text-sm hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 mb-6 border-b border-black/10 pb-4 overflow-x-auto">
          {[
            { id: 'all', label: 'All Orders' },
            { id: 'in_progress', label: 'In Progress / Active' },
            { id: 'delivered', label: 'Delivered' },
            { id: 'cancelled', label: 'Cancelled' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors shrink-0 ${
                activeTab === tab.id
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Orders List */}
        {loading ? (
          <div className="text-center py-16 text-gray-400">Loading your orders...</div>
        ) : filteredOrders.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-black/5 p-8">
            <span className="text-4xl">🛍</span>
            <h3 className="text-lg font-semibold text-black mt-3">No orders found</h3>
            <p className="text-sm text-gray-500 max-w-sm mx-auto mt-1 mb-5">You haven't placed any orders matching this filter yet.</p>
            <Link to="/products" className="inline-block px-6 py-2.5 bg-black text-white text-sm font-medium rounded-xl hover:bg-black/80 transition-colors">
              Explore Snacks
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl border border-black/10 p-5 md:p-6 hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-5"
              >
                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-xs font-bold text-gray-800 bg-gray-100 px-2.5 py-1 rounded-md">Token: {order.tracking_token}</span>
                    {getStatusBadge(order.status)}
                    <span className="text-xs text-gray-400">{new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-black text-base">Order Total: ₹{order.total}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Shipping to {order.customer_name} ({order.city})
                    </p>
                  </div>
                  {order.order_items && order.order_items.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {order.order_items.map((item) => (
                        <span key={item.id} className="text-xs bg-gray-50 border border-black/5 text-gray-700 px-2.5 py-1 rounded-lg">
                          {item.product_name} × {item.quantity}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex flex-row md:flex-col sm:flex-row gap-2 shrink-0">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="flex-1 md:flex-initial px-4 py-2.5 bg-black text-white text-xs font-semibold rounded-xl hover:bg-black/80 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>🚚</span> Track & Details
                  </button>
                  <button
                    onClick={() => handlePrintReceipt(order)}
                    className="flex-1 md:flex-initial px-4 py-2.5 bg-gray-100 text-black text-xs font-semibold rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>🧾</span> Receipt
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
