import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CartTrigger from '../components/cart/CartTrigger';
import { supabase } from '../lib/supabase';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <>
      <nav data-section="navbar" className="fixed z-[1000] top-5 left-1/2 -translate-x-1/2 w-content-width">
        <div className="flex items-center justify-between p-2 xl:p-3 2xl:p-4 rounded backdrop-blur-sm card relative">
          <Link to="/" className="pl-2 text-xl font-medium text-foreground">Kruxnut</Link>
          <div className="flex items-center gap-2 xl:gap-3 2xl:gap-4">
            <Link to="/products" className="flex items-center justify-center h-10 px-6 text-sm rounded cursor-pointer primary-button text-primary-cta-text" style={{transform: "none"}}>
              Order Now
            </Link>
            <CartTrigger />
            <Link to="/orders" className="hidden sm:flex items-center justify-center h-10 px-4 text-sm rounded cursor-pointer primary-button text-primary-cta-text">
              Orders
            </Link>
            {user ? (
              <Link to="/account" className="flex items-center justify-center h-10 px-4 text-sm rounded cursor-pointer primary-button text-primary-cta-text">
                Account
              </Link>
            ) : (
              <Link to="/login" className="flex items-center justify-center h-10 px-4 text-sm rounded cursor-pointer primary-button text-primary-cta-text">
                Login
              </Link>
            )}
            <div
              onClick={() => setIsOpen(!isOpen)}
              className="relative flex items-center justify-center size-9 rounded cursor-pointer primary-button"
            >
              {!isOpen ? (
                <>
                  <span className="absolute w-3 h-px bg-primary-cta-text transition-all duration-300 -translate-y-1"></span>
                  <span className="absolute w-3 h-px bg-primary-cta-text transition-all duration-300 translate-y-1"></span>
                </>
              ) : (
                <span className="text-primary-cta-text font-light text-sm">✕</span>
              )}
            </div>

            {isOpen && (
              <div className="absolute top-full right-0 mt-2 w-56 bg-[#4A2B2B] text-[#F3F0EB] rounded-2xl shadow-xl overflow-hidden py-2 z-[1001] animate-in fade-in slide-in-from-top-4 duration-200">
                <Link to="/orders" onClick={() => setIsOpen(false)} className="flex items-center justify-between px-6 py-4 hover:bg-white/10 transition-colors border-b border-white/10 text-sm">
                  <span>My Orders & Tracking</span>
                  <span>↗</span>
                </Link>
                <Link to="/products" onClick={() => setIsOpen(false)} className="flex items-center justify-between px-6 py-4 hover:bg-white/10 transition-colors border-b border-white/10 text-sm">
                  <span>Products</span>
                  <span>↗</span>
                </Link>
                <Link to="/about" onClick={() => setIsOpen(false)} className="flex items-center justify-between px-6 py-4 hover:bg-white/10 transition-colors border-b border-white/10 text-sm">
                  <span>About</span>
                  <span>↗</span>
                </Link>
                <a href="/#journal" onClick={() => setIsOpen(false)} className="flex items-center justify-between px-6 py-4 hover:bg-white/10 transition-colors border-b border-white/10 text-sm">
                  <span>Journal</span>
                  <span>↗</span>
                </a>
                <Link to="/contact" onClick={() => setIsOpen(false)} className="flex items-center justify-between px-6 py-4 hover:bg-white/10 transition-colors text-sm">
                  <span>Contact</span>
                  <span>↗</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
