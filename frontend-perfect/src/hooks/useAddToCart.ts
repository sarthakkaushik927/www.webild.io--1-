import { useCartStore } from '../stores/cartStore';

export function useAddToCart(product: { id: string; name: string; price: number; image_url?: string | null }) {
  const { addItem, openCart } = useCartStore();

  const handleAddToCart = () => {
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
