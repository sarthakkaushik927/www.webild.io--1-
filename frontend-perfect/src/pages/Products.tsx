import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { productService } from '../services/firebaseService';
import type { Product } from '../lib/firebase';

export default function Products() {
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
          {products.map((product) => (
            <Link key={product.id} to={`/products/${product.id}`} className="group card overflow-hidden rounded-2xl border border-white/5 bg-white/3 hover:bg-white/5 transition-all duration-300">
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={product.image_url || 'https://storage.googleapis.com/webild/default/templates/skincare-luxury/product-2.webp'}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
                    {product.is_available ? 'Available' : 'Out of stock'}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-[0.24em] text-white/75 mb-1">Premium snack</p>
                    <h3 className="text-2xl font-semibold text-white leading-tight text-balance line-clamp-2">{product.name}</h3>
                  </div>
                  <div className="shrink-0 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black shadow-lg">
                    ₹{product.price}
                  </div>
                </div>
              </div>
              <div className="p-5 flex flex-col gap-4">
                <p className="text-sm text-white/70 leading-relaxed min-h-[3rem]">{product.description || 'Healthy, crunchy, and made for everyday snacking.'}</p>
                <div className="flex flex-wrap items-center gap-2">
                  {(product.tags || []).slice(0, 3).map((tag) => (
                    <span key={tag} className="rounded-full bg-white/8 px-3 py-1 text-xs text-white/75">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-sm text-white/55">Tap to view details</span>
                  <span className="text-sm font-medium text-primary-cta-text group-hover:translate-x-1 transition-transform duration-300">View product</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
