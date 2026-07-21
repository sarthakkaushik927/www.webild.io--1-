import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    quote: '"These makhanas are so addictive! Perfectly roasted with just the right amount of crunch. My whole family loves snacking on them."',
    author: 'Priya Sharma',
    role: 'Fitness Enthusiast, Delhi',
    rating: 5,
    scent: 'Makhana Fan',
    avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=200&q=80',
  },
  {
    quote: '"Finally a brand that offers truly healthy snacks without compromising on taste. The peri peri cashews are absolutely incredible!"',
    author: 'Rahul Verma',
    role: 'Nutritionist, Mumbai',
    rating: 5,
    scent: 'Cashew Lover',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
  },
  {
    quote: '"I replaced all my junk food with Kruxnut products. The banana chips are so fresh and the packaging keeps everything crunchy for weeks!"',
    author: 'Anita Patel',
    role: 'Health Blogger, Agra',
    rating: 5,
    scent: 'Banana Chips',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80',
  },
];

const faqItems = [
  {
    q: 'How long do your products stay fresh?',
    a: 'Our premium packaging ensures freshness for up to 6 months. Once opened, we recommend consuming within 30 days for the best crunch and flavor.',
  },
  {
    q: 'Are your products 100% natural?',
    a: 'Yes. All Kruxnut snacks are made with 100% natural ingredients. No artificial flavors, no preservatives, and absolutely no palm oil.',
  },
  {
    q: 'Can I try different flavors before ordering in bulk?',
    a: 'Absolutely. We offer a variety pack featuring our best sellers so you can discover your favorites before committing to a larger order.',
  },
  {
    q: 'What is your return policy?',
    a: 'We accept returns within 7 days of delivery for any unopened product. For quality issues, we offer full replacement. Customer satisfaction is our top priority.',
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
