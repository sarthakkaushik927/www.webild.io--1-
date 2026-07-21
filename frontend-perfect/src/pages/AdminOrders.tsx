import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { orderService } from '../services/orderService';
import { adminAuthService } from '../services/adminAuthService';
import type { Order } from '../lib/firebase';
import OrderDetailsModal from './OrderDetailsModal';

export default function AdminOrders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [paymentFilter, setPaymentFilter] = useState<string>('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    loadOrders();
  }, []);

  const checkAuth = async () => {
    if (!adminAuthService.isAuthenticated()) {
      navigate('/admin');
      return;
    }
  };

  const loadOrders = async () => {
    setLoading(true);
    const { data } = await orderService.getAllOrders();
    if (data) setOrders(data as Order[]);
    setLoading(false);
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        searchQuery === '' ||
        order.tracking_token.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customer_phone.includes(searchQuery);

      const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
      const matchesPayment = paymentFilter === 'all' || order.payment_status === paymentFilter;

      let matchesDate = true;
      if (dateFrom || dateTo) {
        const orderDate = (order.created_at as any)?.toDate?.() || new Date(order.created_at as any);
        const from = dateFrom ? new Date(dateFrom) : new Date('2000-01-01');
        const to = dateTo ? new Date(dateTo + 'T23:59:59') : new Date();
        matchesDate = orderDate >= from && orderDate <= to;
      }

      return matchesSearch && matchesStatus && matchesPayment && matchesDate;
    });
  }, [orders, searchQuery, statusFilter, paymentFilter, dateFrom, dateTo]);

  const handleStatusUpdate = async (orderId: string, newStatus: Order['status']) => {
    await orderService.updateStatus(orderId, newStatus);
    loadOrders();
    if (selectedOrder?.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (timestamp: any) => {
    const date = timestamp?.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const stats = useMemo(() => {
    const total = filteredOrders.length;
    const totalRevenue = filteredOrders.reduce((sum, o) => sum + o.total, 0);
    const pending = filteredOrders.filter(o => o.status === 'pending').length;
    const delivered = filteredOrders.filter(o => o.status === 'delivered').length;
    return { total, totalRevenue, pending, delivered };
  }, [filteredOrders]);

  return (
    <div className="min-h-screen bg-gray-50 text-foreground pb-20">
      <div className="w-full bg-white border-b border-black/10 flex flex-col md:flex-row justify-between items-center fixed top-0 z-40 px-6 py-4">
        <div className="flex items-center gap-8 mb-4 md:mb-0">
          <h1 className="text-xl font-semibold text-black tracking-widest">KRUXNUT CMS</h1>
          <div className="flex gap-4 flex-wrap">
            <button onClick={() => navigate('/admin/dashboard')} className="text-sm font-medium text-gray-500 hover:text-black">Dashboard</button>
            <button className="text-sm font-medium text-black border-b-2 border-black">Orders</button>
          </div>
        </div>
        <div className="flex gap-4">
          <button onClick={() => navigate('/')} className="text-sm text-gray-600 hover:text-black">View Site</button>
          <button onClick={() => { adminAuthService.logout(); navigate('/admin'); }} className="text-sm text-red-600 hover:text-red-800">Logout</button>
        </div>
      </div>

      <div className="pt-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-light text-black">Order Management</h2>
            <p className="text-sm text-gray-500 mt-1">Manage and track all customer orders</p>
          </div>
          <button onClick={loadOrders} className="text-sm px-4 py-2 bg-black text-white rounded-lg hover:bg-black/80 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            Refresh
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-black/10 p-4">
            <p className="text-sm text-gray-500">Total Orders</p>
            <p className="text-2xl font-semibold text-black">{stats.total}</p>
          </div>
          <div className="bg-white rounded-xl border border-black/10 p-4">
            <p className="text-sm text-gray-500">Total Revenue</p>
            <p className="text-2xl font-semibold text-black">{formatCurrency(stats.totalRevenue)}</p>
          </div>
          <div className="bg-white rounded-xl border border-black/10 p-4">
            <p className="text-sm text-gray-500">Pending</p>
            <p className="text-2xl font-semibold text-yellow-600">{stats.pending}</p>
          </div>
          <div className="bg-white rounded-xl border border-black/10 p-4">
            <p className="text-sm text-gray-500">Delivered</p>
            <p className="text-2xl font-semibold text-green-600">{stats.delivered}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-black/10 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="md:col-span-5">
              <label className="block text-sm text-gray-600 mb-2">Search Orders</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by Order ID, Name, Phone, or City..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-2 pl-10 text-black outline-none focus:border-black/30"
                />
                <svg className="w-4 h-4 text-gray-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-2 text-black outline-none focus:border-black/30"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">Payment</label>
              <select
                value={paymentFilter}
                onChange={(e) => setPaymentFilter(e.target.value)}
                className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-2 text-black outline-none focus:border-black/30"
              >
                <option value="all">All Payments</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">From Date</label>
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-2 text-black outline-none focus:border-black/30"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">To Date</label>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-2 text-black outline-none focus:border-black/30"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-black/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-black/5 border-b border-black/10">
                  <th className="p-4 text-sm font-medium text-black">Order ID</th>
                  <th className="p-4 text-sm font-medium text-black">Customer</th>
                  <th className="p-4 text-sm font-medium text-black">Location</th>
                  <th className="p-4 text-sm font-medium text-black">Date</th>
                  <th className="p-4 text-sm font-medium text-black text-right">Items</th>
                  <th className="p-4 text-sm font-medium text-black text-right">Total</th>
                  <th className="p-4 text-sm font-medium text-black">Status</th>
                  <th className="p-4 text-sm font-medium text-black">Payment</th>
                  <th className="p-4 text-sm font-medium text-black text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={9} className="p-8 text-center text-gray-500">Loading orders...</td></tr>
                ) : filteredOrders.length === 0 ? (
                  <tr><td colSpan={9} className="p-8 text-center text-gray-500">No orders found.</td></tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr key={order.id} className="border-b border-black/5 hover:bg-black/5 transition-colors">
                      <td className="p-4 font-mono text-sm">{order.tracking_token}</td>
                      <td className="p-4">
                        <div className="font-medium text-black">{order.customer_name}</div>
                        <div className="text-sm text-gray-600">{order.customer_phone}</div>
                      </td>
                      <td className="p-4">
                        <div className="text-sm text-black">{order.city}</div>
                        <div className="text-xs text-gray-500">{order.shipping_address.slice(0, 20)}...</div>
                      </td>
                      <td className="p-4 text-sm text-gray-600 whitespace-nowrap">
                        {formatDate(order.created_at)}
                      </td>
                      <td className="p-4 text-right text-sm">{order.order_items?.length || '-'}</td>
                      <td className="p-4 text-right font-medium whitespace-nowrap">{formatCurrency(order.total)}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                          order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                          order.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                          order.status === 'shipped' ? 'bg-blue-100 text-blue-700' :
                          order.status === 'processing' ? 'bg-purple-100 text-purple-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                          order.payment_status === 'paid' ? 'bg-green-100 text-green-700' :
                          order.payment_status === 'failed' ? 'bg-red-100 text-red-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {order.payment_status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="text-sm px-3 py-1 bg-black text-white rounded hover:bg-black/80"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onStatusUpdate={handleStatusUpdate}
        />
      )}
    </div>
  );
}
