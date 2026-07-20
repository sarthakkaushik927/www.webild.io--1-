import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiGet } from '../utils/api';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiGet<any>(`/api/products/${id}`)
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch product", err);
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center pt-20">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center pt-20 text-red-400">Error: {error}</div>;
  if (!product) return <div className="min-h-screen flex items-center justify-center pt-20">Product not found</div>;

  return (
    <div className="min-h-screen bg-background text-foreground pt-32 px-6 md:px-12 flex flex-col md:flex-row gap-12 items-center max-w-7xl mx-auto">
      <div className="flex-1 w-full relative aspect-square rounded-2xl overflow-hidden border border-white/10">
        <img 
          src={product.imageUrl || "https://storage.googleapis.com/webild/default/templates/skincare-luxury/product-2.webp"} 
          alt={product.name} 
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 space-y-6">
        <h1 className="text-4xl md:text-5xl font-light tracking-tighter">{product.name}</h1>
        <p className="text-gray-400 text-lg leading-relaxed">{product.description}</p>
        
        <div className="pt-8">
          <button className="w-full md:w-auto px-12 py-4 bg-white text-black font-medium rounded-lg hover:bg-gray-200 transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
