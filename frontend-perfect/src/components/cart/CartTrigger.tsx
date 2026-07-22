import { ShoppingBag } from 'lucide-react';
import { useCartStore } from '../../stores/cartStore';

export default function CartTrigger() {
  const { getTotalItems, openCart } = useCartStore();
  const totalItems = getTotalItems();

  return (
    <button
      type="button"
      onClick={openCart}
      className="relative p-2 rounded-full hover:bg-black/5 transition-colors"
      aria-label="Open Cart"
    >
      <ShoppingBag className="w-6 h-6" />
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-black text-white text-xs rounded-full flex items-center justify-center font-medium">
          {totalItems}
        </span>
      )}
    </button>
  );
}
