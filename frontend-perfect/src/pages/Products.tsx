import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { productService } from '../services/firebaseService';

import type { Product } from '../lib/supabase';
export default function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    productService.getAll()
      .then(({ data }) => {
        if (data) setProducts(data as Product[]);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground pt-28 md:pt-32 px-6 md:px-12 pb-32">
      <div className="max-w-7xl mx-auto text-center mb-14 md:mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full card text-sm mb-5">
          <span className="size-2 rounded-full bg-primary-cta" />
          Shop snacks
        </div>
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight mb-4 text-balance">Our Products</h1>
        <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto text-balance">Explore the full range of Kruxnut healthy snacks. Each product is shown as a proper card with image, price, name, and quick details.</p>
      </div>
      
      {loading ? (
        <div className="text-center text-gray-400">Loading products...</div>
      ) : error ? (
        <div className="text-center text-red-400">Failed to load products: {error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {products.map((product) => {
            const handleAddToCart = (e: React.MouseEvent) => {
              e.preventDefault();
              e.stopPropagation();
              window.dispatchEvent(new CustomEvent('add-to-cart', { detail: product }));
            };

            return (
              <div key={product.id} className="group card overflow-hidden rounded-2xl border border-black/5 bg-white hover:shadow-md transition-all duration-300">
                <div onClick={() => navigate('/products/' + product.id)} className="w-full text-left cursor-pointer flex flex-col h-full">
                  <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                    <img
                      src={product.image_url || 'https://storage.googleapis.com/webild/default/templates/skincare-luxury/product-2.webp'}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-3 right-3">
                      <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium backdrop-blur-md ${product.is_available ? 'bg-green-100/90 text-green-700' : 'bg-red-100/90 text-red-700'}`}>
                        {product.is_available ? 'Available' : 'Out of stock'}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col justify-between flex-1 gap-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex flex-col gap-1 flex-1 min-w-0">
                        <h3 className="text-base font-semibold text-black leading-snug text-balance line-clamp-2">{product.name}</h3>
                        {product.description && (
                          <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">{product.description}</p>
                        )}
                      </div>
                      <span className="shrink-0 text-base font-semibold text-black">₹{typeof product.price === 'number' ? product.price.toFixed(0) : Number(product.price || 0).toFixed(0)}</span>
                    </div>
                    <div className="flex items-center gap-2 pt-1">
                      <button
                        type="button"
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); navigate('/products/' + product.id); }}
                        className="flex-1 rounded-lg border border-black/10 bg-black/5 px-3 py-2 text-xs font-medium text-black hover:bg-black/10 transition-colors"
                      >
                        View Details
                      </button>
                      <button
                        type="button"
                        onClick={handleAddToCart}
                        disabled={!product.is_available}
                        className="flex-1 rounded-lg bg-black px-3 py-2 text-xs font-medium text-white hover:bg-black/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
