import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    quote: '"I received so many compliments the first time I wore Aura. It\'s warm, feminine, and unmistakably mine. I\'ve never felt so confident."',
    author: 'Sophia Laurent',
    role: 'Fashion Editor, Paris',
    rating: 5,
    scent: 'Aura EDP',
    avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=200&q=80',
  },
  {
    quote: '"Noir Absolu is everything — dark, captivating, and utterly mysterious. It stays with you hours after you\'ve left the room. Absolutely worth every penny."',
    author: 'Marcus Chen',
    role: 'Art Curator, New York',
    rating: 5,
    scent: 'Noir Absolu',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
  },
  {
    quote: '"I\'ve tried dozens of niche fragrances. Solum is the only one that felt like coming home. Earthy, real, and profoundly comforting."',
    author: 'Elena Rossi',
    role: 'Interior Designer, Milan',
    rating: 5,
    scent: 'Solum EDP',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80',
  },
];

const faqItems = [
  {
    q: 'How long does the fragrance last on skin?',
    a: 'Our Eau de Parfum concentrations are formulated to last 8–12 hours on skin, with sillage projecting beautifully for the first 4–6 hours. Warmer skin typically extends the longevity.',
  },
  {
    q: 'Are your fragrances vegan and cruelty-free?',
    a: 'Yes. All UMBRA fragrances are 100% vegan and cruelty-free. We never test on animals and all our natural ingredients are ethically and sustainably sourced.',
  },
  {
    q: 'Do you offer samples before I commit to a full bottle?',
    a: 'Absolutely. We offer a Discovery Set featuring 2ml decants of all 12 fragrances so you can find your signature before purchasing a full bottle.',
  },
  {
    q: 'What is your return policy?',
    a: 'We accept returns within 30 days of purchase for any unopened product. For opened bottles, we offer store credit. Customer satisfaction is our top priority.',
  },
];

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section id="journal" ref={ref} className="bg-[#F7F3EE] py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-px bg-[#3A1510]" />
            <span className="text-xs font-medium tracking-widest text-[#3A1510] uppercase">Testimonials</span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl xl:text-6xl font-bold text-[#1C1917] max-w-lg">
            What Our Community Says
          </h2>
        </motion.div>

        {/* Testimonial cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-24">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.65 }}
              className="bg-[#EDE7DC] rounded-2xl p-7 flex flex-col justify-between group hover:bg-[#E8DFD2] transition-colors duration-300"
            >
              {/* Stars */}
              <div>
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, s) => (
                    <Star key={s} size={14} fill="#C9A96E" stroke="none" />
                  ))}
                </div>
                <p className="text-[#1C1917] text-base leading-relaxed mb-6 font-cormorant text-lg italic">
                  {t.quote}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.author}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-[#C9A96E]/30"
                  loading="lazy"
                />
                <div>
                  <div className="font-medium text-sm text-[#1C1917]">{t.author}</div>
                  <div className="text-xs text-[#6B5B52]">{t.role}</div>
                </div>
                <span className="ml-auto text-xs text-[#3A1510] bg-[#3A1510]/10 rounded-full px-3 py-1">
                  {t.scent}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          <div className="flex flex-col lg:flex-row lg:gap-20">
            <div className="lg:w-1/3 mb-8 lg:mb-0">
              <div className="inline-flex items-center gap-2 mb-4">
                <div className="w-8 h-px bg-[#3A1510]" />
                <span className="text-xs font-medium tracking-widest text-[#3A1510] uppercase">FAQ</span>
              </div>
              <h3 className="font-serif text-3xl md:text-4xl font-bold text-[#1C1917]">
                Common Questions
              </h3>
            </div>

            <div className="lg:w-2/3 space-y-1">
              {faqItems.map((item, i) => (
                <div key={i} className="border-b border-[#3A1510]/10">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full text-left py-5 flex items-center justify-between gap-4 group"
                  >
                    <span className="font-medium text-[#1C1917] text-base group-hover:text-[#3A1510] transition-colors">
                      {item.q}
                    </span>
                    <motion.span
                      animate={{ rotate: openFaq === i ? 45 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="flex-shrink-0 w-7 h-7 rounded-full bg-[#3A1510]/10 flex items-center justify-center text-[#3A1510] font-light text-xl"
                    >
                      +
                    </motion.span>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{ height: openFaq === i ? 'auto' : 0, opacity: openFaq === i ? 1 : 0 }}
                    transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 text-[#6B5B52] text-sm leading-relaxed">{item.a}</p>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
