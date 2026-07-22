import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Collection from './components/Collection';
import Craft from './components/Craft';
import Faq from './components/Faq';
import Footer from './components/Footer';
import NotFound from './pages/NotFound';

import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminOrders from './pages/AdminOrders';
import AdminApiKeys from './pages/AdminApiKeys';
import AdminCarouselPage from './pages/admin/AdminCarouselPage';
import AdminFeaturesPage from './pages/admin/AdminFeaturesPage';
import AdminCommunityPage from './pages/admin/AdminCommunityPage';
import AdminContentHub from './pages/admin/AdminContentHub';
import About from './pages/About';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import ContactPage from './pages/ContactPage';
import Checkout from './pages/Checkout';
import OrderTracking from './pages/OrderTracking';
import Orders from './pages/Orders';
import CustomerLogin from './pages/CustomerLogin';
import Account from './pages/Account';
import CartSidebar from './components/cart/CartSidebar';
import WhatsAppButton from './components/WhatsAppButton';
import Chatbot from './components/Chatbot';
import { CartProvider } from './stores/cartStore';

function Home() {
  return (
    <>
      <Hero />
      <Collection />
      <Craft />
      <Faq />
    </>
  );
}

function AppContent() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="lenis lenis-scrolling">
      {!isAdmin && <Navbar />}
      <CartSidebar />
      {!isAdmin && <WhatsAppButton />}
      {!isAdmin && <Chatbot />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order/:trackingToken" element={<OrderTracking />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/login" element={<CustomerLogin />} />
        <Route path="/account" element={<Account />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/content" element={<AdminContentHub />} />
        <Route path="/admin/content/carousel" element={<AdminCarouselPage />} />
        <Route path="/admin/content/features" element={<AdminFeaturesPage />} />
        <Route path="/admin/content/community" element={<AdminCommunityPage />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/api-keys" element={<AdminApiKeys />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isAdmin && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <Router>
        <AppContent />
      </Router>
    </CartProvider>
  );
}
