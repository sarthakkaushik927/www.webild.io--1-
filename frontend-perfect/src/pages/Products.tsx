import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiGet } from '../utils/api';

export default function Products() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiGet<any[]>('/api/products')
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground pt-32 px-6 md:px-12 pb-32">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-light tracking-tighter mb-4">Our Collection</h1>
        <p className="text-gray-400">Explore the full range of UMBRA luxury skincare.</p>
      </div>
      
      {loading ? (
        <div className="text-center text-gray-400">Loading collection...</div>
      ) : error ? (
        <div className="text-center text-red-400">Failed to load products: {error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {products.map((product: any) => (
            <Link key={product.id} to={`/products/${product.id}`} className="group cursor-pointer">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-6 border border-white/5">
                <img 
                  src={product.imageUrl || "https://storage.googleapis.com/webild/default/templates/skincare-luxury/product-2.webp"} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-light">{product.name}</h3>
                <p className="text-primary-cta-text">${product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
