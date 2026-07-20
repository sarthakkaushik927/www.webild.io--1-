import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useInView } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    title: 'Rare Ingredient Sourcing',
    body: 'We source precious essences from sustainable fields worldwide — Grasse rose, Madagascan vanilla, and Italian bergamot at their peak.',
    img: '/assets/features/feature-1.webp',
    tag: 'Sustainability',
  },
  {
    number: '02',
    title: 'Master Perfumers',
    body: 'Every composition is crafted by world-renowned noses who balance top, heart, and base notes into unforgettable olfactory journeys.',
    img: '/assets/features/feature-2.webp',
    tag: 'Expertise',
  },
  {
    number: '03',
    title: 'Lasting Sillage',
    body: 'Our concentrated formulas are designed for exceptional longevity — a single application carries you beautifully from dawn to dusk.',
    img: '/assets/features/feature-3.webp',
    tag: 'Excellence',
  },
];

export default function Craft() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef   = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const inView = useInView(titleRef, { once: true, margin: '-80px' });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.craft-panel').forEach((panel, i) => {
        ScrollTrigger.create({
          trigger: panel,
          start: 'top 55%',
          end:   'bottom 45%',
          onEnter:     () => setActiveStep(i),
          onEnterBack: () => setActiveStep(i),
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="features" data-section="features" ref={sectionRef} className="bg-[#EDE7DC] py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        <div ref={titleRef} className="mb-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-px bg-[#3A1510]" />
              <span className="text-xs font-medium tracking-widest text-[#3A1510] uppercase">Perfumery Craft</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-end gap-6 justify-between">
              <h2 className="font-serif text-4xl md:text-5xl xl:text-6xl font-bold text-[#1C1917] max-w-md">
                The Art Behind Our Fragrances
              </h2>
              <p className="text-[#6B5B52] max-w-xs text-sm leading-relaxed">
                Each perfume is meticulously composed with rare essences and noble raw
                materials to create scents that captivate and endure.
              </p>
            </div>
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Sticky image */}
          <div className="lg:w-1/2">
            <div className="sticky top-28">
              <div className="relative rounded-3xl overflow-hidden h-[500px] lg:h-[600px] shadow-2xl shadow-[#3A1510]/20">
                {steps.map((step, i) => (
                  <motion.div key={i} className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: activeStep === i ? 1 : 0 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}>
                    <img src={step.img} alt={step.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#3A1510]/70 via-transparent to-transparent" />
                    <div className="absolute bottom-8 left-8 right-8">
                      <span className="text-[#C9A96E] text-xs tracking-widest uppercase font-medium">{step.tag}</span>
                      <div className="text-[#F7F3EE] font-serif text-2xl font-semibold mt-1">{step.title}</div>
                    </div>
                  </motion.div>
                ))}
                {/* Progress dots */}
                <div className="absolute top-6 right-6 flex flex-col gap-2">
                  {steps.map((_, i) => (
                    <div key={i}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${activeStep === i ? 'bg-[#C9A96E] scale-125' : 'bg-white/40'}`} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Scrollable steps */}
          <div className="lg:w-1/2">
            {steps.map((step, i) => (
              <div key={i} className="craft-panel py-16 border-b border-[#3A1510]/10 last:border-0">
                <motion.div initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}>
                  <div className="flex items-start gap-6">
                    <span className="font-serif text-6xl font-bold text-[#3A1510]/12 leading-none mt-2 select-none">
                      {step.number}
                    </span>
                    <div>
                      <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#1C1917] mb-4">{step.title}</h3>
                      <p className="text-[#6B5B52] leading-relaxed text-base">{step.body}</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
