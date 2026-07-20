import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const marqueeItems = [
  'RARE ESSENCES', 'HAND CRAFTED', 'SUSTAINABLE', 'PARABEN FREE',
  'VEGAN', 'AWARD WINNING', 'RARE ESSENCES', 'HAND CRAFTED',
  'SUSTAINABLE', 'PARABEN FREE', 'VEGAN', 'AWARD WINNING',
];

export default function MarqueeAndCta() {
  const bannerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(bannerRef, { once: true, margin: '-100px' });
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.marquee-track',
        { x: 0 },
        {
          x: '-50%',
          duration: 25,
          ease: 'none',
          repeat: -1,
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <div className="bg-[#3A1510] py-4 overflow-hidden">
        <div className="marquee-track inline-flex whitespace-nowrap gap-8">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="flex items-center gap-8 text-[#C9A96E] text-sm font-medium tracking-[0.2em] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]" />
              {item}
            </span>
          ))}
        </div>
      </div>

      <section
        id="contact"
        ref={bannerRef}
        className="bg-[#EDE7DC] py-24 md:py-32 relative overflow-hidden"
      >
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#3A1510]/8 pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-[#3A1510]/8 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="inline-flex items-center gap-2 mb-4">
                <div className="w-8 h-px bg-[#3A1510]" />
                <span className="text-xs font-medium tracking-widest text-[#3A1510] uppercase">Stay Inspired</span>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl xl:text-6xl font-bold text-[#1C1917] mb-6 leading-tight">
                Find Your <em className="not-italic text-[#5C2318]">Signature</em> Scent
              </h2>
              <p className="text-[#6B5B52] text-base leading-relaxed mb-8 max-w-md">
                Join over 150,000 fragrance lovers who receive early access to new launches,
                exclusive offers, and expert perfumery insights.
              </p>
              {subscribed ? (
                <p className="text-[#3A1510] font-medium">Thank you for subscribing!</p>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                    className="flex-1 bg-white/70 border border-[#3A1510]/15 rounded-full px-5 py-3.5 text-sm text-[#1C1917] placeholder:text-[#6B5B52]/60 focus:outline-none focus:border-[#3A1510]/40 transition-colors"
                  />
                  <button type="submit" className="group flex items-center gap-2 bg-[#3A1510] text-[#F7F3EE] font-medium px-6 py-3.5 rounded-full hover:bg-[#5C2318] transition-colors duration-300 shrink-0">
                    Subscribe
                    <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              )}
              <p className="text-xs text-[#6B5B52]/70 mt-3">No spam. Unsubscribe anytime.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden h-80 md:h-96 shadow-2xl shadow-[#3A1510]/20">
                <img
                  src="https://images.unsplash.com/photo-1601628828688-632f38a5a7d0?w=700&q=80"
                  alt="Perfume atmosphere"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#3A1510]/40 to-transparent" />
              </div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-xl px-6 py-5"
              >
                <div className="text-[#3A1510] font-serif text-3xl font-bold">150k+</div>
                <div className="text-[#6B5B52] text-xs mt-1">Happy Community Members</div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -top-5 -right-3 bg-[#3A1510] rounded-2xl px-5 py-4"
              >
                <div className="text-[#C9A96E] text-xs font-medium tracking-widest uppercase mb-1">Best Luxury Fragrance</div>
                <div className="text-[#F7F3EE] font-serif text-sm font-semibold">Awards 2024</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
