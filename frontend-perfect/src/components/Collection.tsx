import { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { productService } from '../services/firebaseService';
import type { Product } from '../lib/firebase';

const fallbackProducts: Product[] = [
  { id: 'f1', name: 'Banana Chips', description: 'Fresh & Crunchy Snack!', price: 120, image_url: 'https://storage.googleapis.com/webild/default/templates/skincare-luxury/product-1.webp', is_available: true, tags: [], created_at: new Date(), category_id: null },
  { id: 'f2', name: 'Chana', description: 'Nutritious & Tasty!', price: 100, image_url: 'https://storage.googleapis.com/webild/default/templates/skincare-luxury/product-2.webp', is_available: true, tags: [], created_at: new Date(), category_id: null },
  { id: 'f3', name: 'Peri Peri Makhana', description: 'Power-Packed Nutrition!', price: 180, image_url: 'https://storage.googleapis.com/webild/default/templates/skincare-luxury/product-3.webp', is_available: true, tags: [], created_at: new Date(), category_id: null },
  { id: 'f4', name: 'Classic Cashews', description: 'Delicious & Crunchy!', price: 350, image_url: 'https://storage.googleapis.com/webild/default/templates/skincare-luxury/product-4.webp', is_available: true, tags: [], created_at: new Date(), category_id: null }
];

export default function Collection() {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    productService.getAll()
      .then(({ data }) => {
        if (data && data.length > 0) {
          setProducts(data);
        }
      })
      .catch((err) => {
        console.error('Failed to load products for carousel:', err);
      });
  }, []);

  const displayProducts = products.length > 0 ? products : fallbackProducts;

  const scrollToIndex = useCallback((index: number) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const items = container.querySelectorAll('.carousel-card');
    if (items.length === 0) return;
    const targetItem = items[index] as HTMLElement;
    if (!targetItem) return;
    container.scrollTo({
      left: targetItem.offsetLeft - 16,
      behavior: 'smooth'
    });
  }, []);

  useEffect(() => {
    if (isPaused || displayProducts.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => {
        const next = (prev + 1) % displayProducts.length;
        scrollToIndex(next);
        return next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [isPaused, displayProducts.length, scrollToIndex]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    scrollToIndex(index);
  };

  const renderProductCard = (p: Product, i: number) => (
    <button
      key={p.id || i}
      onClick={() => navigate('/products/' + p.id)}
      className="group flex flex-col gap-3 xl:gap-3.5 2xl:gap-4 p-3 xl:p-3.5 2xl:p-4 text-left card rounded cursor-pointer w-full"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded">
        <img
          alt={p.name}
          className="min-h-0 rounded size-full object-cover transition-transform duration-500 group-hover:scale-105"
          src={p.image_url || `https://storage.googleapis.com/webild/default/templates/skincare-luxury/product-${(i%4)+1}.webp`} loading="lazy"
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
          <p className="text-base text-foreground/75 truncate">{p.description ? p.description.slice(0,30) : 'Healthy & Tasty'}</p>
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
              <p>Featured</p>
            </div>
            <h2
              className="bg-gradient-to-r from-foreground to-primary-cta bg-clip-text text-transparent pb-[0.1em] -mb-[0.1em] md:max-w-8/10 text-6xl 2xl:text-7xl leading-[1.15] font-semibold text-center text-balance">
              Crunchy Roasted Nuts & Makhanas</h2>
            <p className="md:max-w-7/10 text-lg md:text-xl leading-snug text-center text-balance">Discover the ultimate healthy snacking experience with our premium roasted nuts and hand-picked makhanas.</p>
          </div>
          <div className="" style={{"opacity": "1", "transform": "none", }}>
            <div className="hidden 2xl:grid grid-cols-4 gap-5 mx-auto w-content-width">
              {displayProducts.slice(0, 4).map((p, i) => renderProductCard(p, i))}
            </div>
            <div 
              className="flex flex-col gap-5 w-full 2xl:hidden"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onTouchStart={() => setIsPaused(true)}
              onTouchEnd={() => setTimeout(() => setIsPaused(false), 5000)}
            >
              <div 
                ref={scrollRef}
                className="w-full overflow-x-auto scrollbar-hide -mx-4 px-4 scroll-smooth"
                onScroll={() => {
                  if (!scrollRef.current) return;
                  const container = scrollRef.current;
                  const scrollLeft = container.scrollLeft;
                  const items = container.querySelectorAll('.carousel-card');
                  let closestIndex = 0;
                  let closestDist = Infinity;
                  items.forEach((item, idx) => {
                    const dist = Math.abs((item as HTMLElement).offsetLeft - 16 - scrollLeft);
                    if (dist < closestDist) {
                      closestDist = dist;
                      closestIndex = idx;
                    }
                  });
                  setCurrentIndex(closestIndex);
                }}
              >
                 <div className="flex gap-4 items-stretch">
                  {displayProducts.map((p, i) => (
                    <div key={p.id || i} className="shrink-0 w-[280px] carousel-card">
                      {renderProductCard(p, i)}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-center items-center gap-4 w-full">
                <button 
                  onClick={() => goToSlide(currentIndex > 0 ? currentIndex - 1 : displayProducts.length - 1)}
                  className="flex items-center justify-center size-8 rounded-full secondary-button cursor-pointer hover:opacity-80 transition-opacity"
                  aria-label="Previous"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                </button>
                <div className="flex items-center gap-2">
                  {displayProducts.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goToSlide(i)}
                      className={`rounded-full transition-all duration-300 cursor-pointer ${
                        i === currentIndex 
                          ? 'w-6 h-2 primary-button' 
                          : 'w-2 h-2 bg-foreground/20 hover:bg-foreground/40'
                      }`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
                <button 
                  onClick={() => goToSlide(currentIndex < displayProducts.length - 1 ? currentIndex + 1 : 0)}
                  className="flex items-center justify-center size-8 rounded-full secondary-button cursor-pointer hover:opacity-80 transition-opacity"
                  aria-label="Next"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
