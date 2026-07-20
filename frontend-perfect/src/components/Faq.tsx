import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    q: 'What makes UMBRA fragrances different from other luxury brands?',
    a: 'UMBRA combines rare natural essences with master perfumery techniques. Every composition is developed over months of refinement to deliver extraordinary depth and longevity.',
  },
  {
    q: 'How long does the fragrance last on skin?',
    a: 'Most of our Eau de Parfums last 8–12 hours on skin. Our Parfum concentrations can last up to 16 hours. For best results, apply to pulse points.',
  },
  {
    q: 'Are your fragrances suitable for sensitive skin?',
    a: 'Our perfumes are formulated with high-quality, dermatologically considered ingredients. They are free from common irritants and suitable for most skin types.',
  },
  {
    q: 'Do you offer a satisfaction guarantee?',
    a: "We're confident in our compositions. If a fragrance doesn't feel right within 14 days of purchase, we offer a full refund — no questions asked.",
  },
  {
    q: 'Are your ingredients natural or synthetic?',
    a: 'We blend premium natural essences — oud, jasmine, rose — with refined aroma molecules for stability and projection.',
  },
  {
    q: 'How do I choose the right fragrance for me?',
    a: 'Start with our Discovery Set to explore all four scents. Wear each for a full day to find your match.',
  },
];

export default function Faq() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" data-section="faq" ref={ref} className="bg-[#EDE7DC] py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: sticky image + header */}
          <div className="lg:sticky lg:top-28">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }} className="mb-8">
              <div className="inline-flex items-center gap-2 mb-4">
                <div className="w-8 h-px bg-[#3A1510]" />
                <span className="text-xs font-medium tracking-widest text-[#3A1510] uppercase">Support</span>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#1C1917] mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-[#6B5B52] text-sm leading-relaxed max-w-sm">
                Everything you need to know about our luxury fragrances, ingredients, and satisfaction guarantee.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="rounded-3xl overflow-hidden h-72 md:h-80 shadow-xl shadow-[#3A1510]/15">
              <img src="/assets/faq-image.webp" alt="UMBRA fragrance"
                className="w-full h-full object-cover" />
            </motion.div>
          </div>

          {/* Right: accordion */}
          <div className="space-y-0">
            {faqs.map((item, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                className="border-b border-[#3A1510]/10">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full text-left py-5 flex items-center justify-between gap-4 group">
                  <span className="font-medium text-[#1C1917] text-base group-hover:text-[#3A1510] transition-colors pr-4">
                    {item.q}
                  </span>
                  <motion.span
                    animate={{ rotate: open === i ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex-shrink-0 w-7 h-7 rounded-full bg-[#3A1510]/10 flex items-center justify-center text-[#3A1510] font-light text-xl leading-none">
                    +
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden">
                      <p className="pb-5 text-[#6B5B52] text-sm leading-relaxed">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
