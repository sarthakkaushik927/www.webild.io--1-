import { useCartStore } from '../stores/cartStore';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

export function useAddToCart(product: { id: string; name: string; price: number; image_url?: string | null }) {
  const { addItem, openCart } = useCartStore();
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate('/login');
      return;
    }
    addItem({
      id: crypto.randomUUID(),
      product_id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image_url: product.image_url || null,
    });
    openCart();
  };

  return handleAddToCart;
}
