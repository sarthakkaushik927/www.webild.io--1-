import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';

const products = [
  { name: 'Solum Eau de Parfum', variant: '50ml • Earthy & Warm', price: '$185', img: '/assets/product-1.webp' },
  { name: 'Aura Eau de Parfum',  variant: '50ml • Floral & Soft',  price: '$165', img: '/assets/product-2.webp' },
  { name: 'Velour Body Mist',    variant: '100ml • Light & Fresh', price: '$125', img: '/assets/product-3.webp' },
  { name: 'Noir Absolu Parfum',  variant: '30ml • Rich & Intense', price: '$195', img: '/assets/product-4.webp' },
];

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };
const card = {
  hidden:  { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function Collection() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="products" data-section="products" ref={ref} className="bg-[#F7F3EE] py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* ── Section header ── */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }} className="mb-14">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-px bg-[#3A1510]" />
            <span className="text-xs font-medium tracking-widest text-[#3A1510] uppercase">Best Sellers</span>
          </div>
          {/* Stack vertically on all sizes — avoids right overflow */}
          <h2 className="font-serif text-4xl md:text-5xl xl:text-6xl font-bold text-[#1C1917] mb-4">
            Featured Collection
          </h2>
          <p className="text-[#6B5B52] max-w-sm text-sm leading-relaxed">
            Discover our bestselling fragrances composed with rare essences and the finest
            ingredients from around the world.
          </p>
        </motion.div>

        {/* ── Product grid ── */}
        <motion.div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          variants={container} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
          {products.map((p) => (
            <motion.div key={p.name} variants={card} className="product-card group cursor-pointer">
              <div className="rounded-2xl overflow-hidden bg-[#EDE7DC]">
                {/* Image area */}
                <div className="relative overflow-hidden" style={{ height: '280px' }}>
                  <img src={p.img} alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  {/* Add to cart hover */}
                  <div className="absolute inset-0 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="bg-[#3A1510] text-[#F7F3EE] rounded-full px-5 py-2.5 text-xs font-medium flex items-center gap-2 shadow-lg">
                      <ShoppingBag size={13} /> Add to Cart
                    </button>
                  </div>
                </div>
                {/* Info */}
                <div className="p-4">
                  <h3 className="font-serif text-sm md:text-base font-semibold text-[#1C1917] mb-1 leading-snug">{p.name}</h3>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs text-[#6B5B52] truncate">{p.variant}</span>
                    <span className="text-[#3A1510] font-semibold text-sm flex-shrink-0">{p.price}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── CTA ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }} className="mt-14 text-center">
          <a href="#" className="inline-flex items-center gap-2 border border-[#3A1510] text-[#3A1510] rounded-full px-8 py-3.5 font-medium hover:bg-[#3A1510] hover:text-[#F7F3EE] transition-all duration-300 text-sm">
            View All Products
          </a>
        </motion.div>
      </div>
    </section>
  );
}
