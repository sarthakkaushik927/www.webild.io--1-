import { ShoppingBag } from 'lucide-react';
import { useCartStore } from '../../stores/cartStore';
import { useNavigate } from 'react-router-dom';

export default function CartTrigger() {
  const { getTotalItems, openCart } = useCartStore();
  const navigate = useNavigate();
  const totalItems = getTotalItems();

  return (
    <button
      onClick={() => {
        if (totalItems === 0) {
          navigate('/products');
        } else {
          openCart();
        }
      }}
      className="relative p-2 rounded-full hover:bg-black/5 transition-colors"
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
