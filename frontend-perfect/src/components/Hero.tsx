import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const cardData = [
  { img: '/assets/hero-1.webp', label: 'Solum Eau de Parfum', sub: '50ml · Earthy & Warm',  floatClass: 'card-float-1', zIndex: 10 },
  { img: '/assets/hero-2.webp', label: 'Aura Eau de Parfum',  sub: '50ml · Floral & Soft',  floatClass: 'card-float-2', zIndex: 20 },
  { img: '/assets/hero-3.webp', label: 'Noir Absolu Parfum',  sub: '30ml · Rich & Intense',  floatClass: 'card-float-3', zIndex: 10 },
];

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ delay: 0.8 })
        .from('.hero-tag',   { opacity: 0, y: 20, duration: 0.6, ease: 'power2.out' })
        .from('.hero-title', { opacity: 0, y: 50, duration: 0.8, ease: 'power3.out' }, '-=0.3')
        .from('.hero-desc',  { opacity: 0, y: 30, duration: 0.6, ease: 'power2.out' }, '-=0.4')
        .from('.hero-btns',  { opacity: 0, y: 20, duration: 0.5, ease: 'power2.out' }, '-=0.3')
        .from('.hero-stats', { opacity: 0, y: 20, duration: 0.5, ease: 'power2.out' }, '-=0.3')
        .from('.hero-card',  { opacity: 0, y: 70, stagger: 0.15, duration: 0.7, ease: 'power3.out' }, '-=0.5');
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} id="hero" data-section="hero"
      className="relative min-h-screen bg-[#F7F3EE] flex items-center pt-20 overflow-hidden">

      {/* Soft blobs */}
      <div className="absolute top-10 right-0 w-[650px] h-[650px] rounded-full bg-[#EDE7DC] opacity-60 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[380px] h-[380px] rounded-full bg-[#EDE7DC] opacity-40 blur-[60px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 w-full grid md:grid-cols-2 gap-8 items-center py-16 md:py-24">

        {/* ── Left: text ── */}
        <div className="relative z-10">
          <div className="hero-tag inline-flex items-center gap-2 bg-[#3A1510]/10 rounded-full px-4 py-1.5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3A1510]" />
            <span className="text-[#3A1510] text-xs font-medium tracking-widest uppercase">Luxury Fragrance</span>
          </div>

          <h1 className="hero-title font-serif text-5xl md:text-6xl xl:text-7xl font-bold text-[#1C1917] leading-[1.08] mb-6">
            A Fragrance That{' '}
            <em className="not-italic text-[#5C2318]">Lingers</em>{' '}
            Long After You Leave
          </h1>

          <p className="hero-desc text-[#6B5B52] text-base md:text-lg leading-relaxed mb-8 max-w-md">
            Discover our award-winning perfumes crafted with rare botanicals and master
            perfumery. Find your signature scent — the one they never forget.
          </p>

          <div className="hero-btns flex flex-wrap gap-4">
            <a href="#products"
              className="group inline-flex items-center gap-2 bg-[#3A1510] text-[#F7F3EE] font-medium px-6 py-3.5 rounded-full hover:bg-[#5C2318] transition-colors duration-300">
              Explore Collection
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#features"
              className="inline-flex items-center gap-2 bg-[#EDE7DC] text-[#3A1510] font-medium px-6 py-3.5 rounded-full hover:bg-[#E0D7CA] transition-colors duration-300">
              Our Craft
            </a>
          </div>

          <div className="hero-stats mt-12 flex gap-10">
            {[['12+', 'Fragrances'], ['150k+', 'Happy Clients'], ['8+', 'Awards']].map(([n, l]) => (
              <div key={l}>
                <div className="font-serif text-2xl font-bold text-[#3A1510]">{n}</div>
                <div className="text-xs text-[#6B5B52] mt-0.5">{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: floating cards ── */}
        <div className="relative h-[480px] md:h-[540px] hidden md:block">
          {cardData.map((card, i) => {
            const positions = [
              { left: '0%',   top: '12%' },
              { left: '28%',  top: '0%'  },
              { left: '58%',  top: '18%' },
            ];
            const widths = ['175px', '200px', '175px'];
            const imgH   = [200, 240, 200];

            return (
              <div key={i} className={`hero-card absolute ${card.floatClass}`}
                style={{ zIndex: card.zIndex, ...positions[i], width: widths[i] }}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-2xl shadow-[#3A1510]/25">
                  <div className="overflow-hidden bg-[#EDE7DC]" style={{ height: `${imgH[i]}px` }}>
                    <img src={card.img} alt={card.label}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="px-4 py-3 bg-white">
                    <div className="font-serif text-xs font-semibold text-[#1C1917] leading-snug">{card.label}</div>
                    <div className="text-[10px] text-[#6B5B52] mt-0.5">{card.sub}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#6B5B52]">
        <span className="text-[10px] tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-[#6B5B52] to-transparent" />
      </motion.div>
    </section>
  );
}
