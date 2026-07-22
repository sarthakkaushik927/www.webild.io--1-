import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { CartItem } from '../lib/supabase';

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getSubtotal: () => number;
  getTotalItems: () => number;
}

const CartContext = createContext<CartStore | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem('cart-storage');
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed.items || [];
      }
    } catch (e) {
      console.error('Failed to load cart from localStorage', e);
    }
    return [];
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('cart-storage', JSON.stringify({ items }));
  }, [items]);

  const addItem = useCallback((item: CartItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product_id === item.product_id);
      if (existing) {
        return prev.map((i) =>
          i.product_id === item.product_id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prev, item];
    });
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<any>).detail;
      if (!detail) return;
      const cartItem: CartItem = {
        id: crypto.randomUUID(),
        product_id: detail.id,
        name: detail.name,
        price: Number(detail.price || 0),
        quantity: 1,
        image_url: detail.image_url || null,
      };
      addItem(cartItem);
    };
    window.addEventListener('add-to-cart', handler as EventListener);
    return () => window.removeEventListener('add-to-cart', handler as EventListener);
  }, [addItem]);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    setItems((prev) =>
      quantity <= 0 ? prev.filter((i) => i.id !== id) : prev.map((i) => (i.id === id ? { ...i, quantity } : i))
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);
  const toggleCart = useCallback(() => setIsOpen((prev) => !prev), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const getSubtotal = useCallback(() => items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items]);
  const getTotalItems = useCallback(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        toggleCart,
        openCart,
        closeCart,
        getSubtotal,
        getTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCartStore(): CartStore {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCartStore must be used within a CartProvider');
  return context;
}
