import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiGet } from '../utils/api';

export interface Product {
  id: string;
  name: string;
  tag?: string;
  description?: string;
  imageUrl?: string;
}

const fallbackProducts: Product[] = [
  { id: 'f1', name: 'Solum Eau de Parfum', tag: '50ml • Earthy & Warm', imageUrl: 'https://storage.googleapis.com/webild/default/templates/skincare-luxury/product-1.webp' },
  { id: 'f2', name: 'Aura Eau de Parfum', tag: '50ml • Floral & Soft', imageUrl: 'https://storage.googleapis.com/webild/default/templates/skincare-luxury/product-2.webp' },
  { id: 'f3', name: 'Velour Body Mist', tag: '100ml • Light & Fresh', imageUrl: 'https://storage.googleapis.com/webild/default/templates/skincare-luxury/product-3.webp' },
  { id: 'f4', name: 'Noir Absolu Parfum', tag: '30ml • Rich & Intense', imageUrl: 'https://storage.googleapis.com/webild/default/templates/skincare-luxury/product-4.webp' }
];

export default function Collection() {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    apiGet<Product[]>('/api/products')
      .then(data => {
        if (Array.isArray(data)) {
          setProducts(data.slice(0, 4));
        }
      })
      .catch(console.error);
  }, []);

  const displayProducts = products.length > 0 ? products : fallbackProducts;

  const renderProductCard = (p: Product, i: number) => (
    <button
      key={p.id || i}
      onClick={() => navigate('/products/' + p.id)}
      className="group h-full flex flex-col gap-3 xl:gap-3.5 2xl:gap-4 p-3 xl:p-3.5 2xl:p-4 text-left card rounded cursor-pointer w-full">
      <div className="relative aspect-square rounded overflow-hidden"><img
          alt={p.name}
          className="min-h-0 rounded size-full object-cover transition-transform duration-500 group-hover:scale-105"
          src={p.imageUrl || `https://storage.googleapis.com/webild/default/templates/skincare-luxury/product-${(i%4)+1}.webp`} loading="lazy"
        />
        <div
          className="absolute inset-0 flex items-center justify-center group-hover:bg-background/20 group-hover:backdrop-blur-xs transition-all duration-300">
          <div
            className="flex items-center justify-center size-12 rounded-full primary-button opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              className="lucide lucide-arrow-up-right size-5 text-primary-cta-text" aria-hidden="true">
              <path d="M7 7h10v10"></path>
              <path d="M7 17 17 7"></path>
            </svg></div>
        </div>
      </div>
      <div className="flex items-center justify-between gap-3 p-3 xl:p-3.5 2xl:p-4">
        <div className="flex flex-col gap-1 flex-1 min-w-0">
          <h3 className="text-2xl font-semibold truncate leading-snug text-balance">{p.name}</h3>
          <p className="text-base text-foreground/75 truncate">{p.tag || (p.description ? p.description.slice(0,30) : 'Earthy & Warm')}</p>
        </div>
      </div>
    </button>
  );

  return (
    <>
      <section aria-label="Products section" className="py-20">
        <div className="flex flex-col gap-8 md:gap-10">
          <div className="flex flex-col items-center w-content-width mx-auto gap-2">
            <div className="px-3 py-1 mb-1 text-sm card rounded w-fit">
              <p>Best Sellers</p>
            </div>
            <h2
              className="bg-gradient-to-r from-foreground to-primary-cta bg-clip-text text-transparent pb-[0.1em] -mb-[0.1em] md:max-w-8/10 text-6xl 2xl:text-7xl leading-[1.15] font-semibold text-center text-balance">
              Featured Collection</h2>
            <p className="md:max-w-7/10 text-lg md:text-xl leading-snug text-center text-balance">Discover our bestselling
              fragrances composed with rare essences and the finest ingredients from around the world.</p>
          </div>
          <div className="" style={{"opacity": "1", "transform": "none", }}>
            
            {/* Desktop Grid */}
            <div className="hidden 2xl:grid grid-cols-4 gap-5 mx-auto w-content-width">
              {displayProducts.map((p, i) => renderProductCard(p, i))}
            </div>

            {/* Mobile Carousel */}
            <div className="flex flex-col gap-5 w-full 2xl:hidden">
              <div className="w-full carousel-container overflow-x-auto scrollbar-hide -mx-4 px-4">
                <div className="flex gap-4 items-stretch" style={{"transform": "translate3d(0px, 0px, 0px)", }}>
                  {displayProducts.map((p, i) => (
                    <div key={p.id || i} className="shrink-0 w-[280px] carousel-item *:h-full">
                      {renderProductCard(p, i)}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-center items-center w-full">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-500">Swipe to see more →</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
