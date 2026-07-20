import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Send } from 'lucide-react';

export default function Contact() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="contact" data-section="contact" ref={ref} className="bg-[#F7F3EE] py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: text + form */}
          <motion.div initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-px bg-[#3A1510]" />
              <span className="text-xs font-medium tracking-widest text-[#3A1510] uppercase">Contact</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#1C1917] mb-4">Get in Touch</h2>
            <p className="text-[#6B5B52] text-sm leading-relaxed mb-10 max-w-sm">
              Have a question or looking for your signature scent? We'd love to hear from you.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Your name" required
                  className="col-span-2 sm:col-span-1 bg-[#EDE7DC] border border-transparent focus:border-[#3A1510]/30 rounded-xl px-4 py-3.5 text-sm text-[#1C1917] placeholder:text-[#6B5B52]/60 focus:outline-none transition-colors" />
                <input type="email" placeholder="your@email.com" required
                  className="col-span-2 sm:col-span-1 bg-[#EDE7DC] border border-transparent focus:border-[#3A1510]/30 rounded-xl px-4 py-3.5 text-sm text-[#1C1917] placeholder:text-[#6B5B52]/60 focus:outline-none transition-colors" />
                <input type="tel" placeholder="+1 (555) 000-0000"
                  className="col-span-2 sm:col-span-1 bg-[#EDE7DC] border border-transparent focus:border-[#3A1510]/30 rounded-xl px-4 py-3.5 text-sm text-[#1C1917] placeholder:text-[#6B5B52]/60 focus:outline-none transition-colors" />
                <input type="text" placeholder="How can we help?" required
                  className="col-span-2 sm:col-span-1 bg-[#EDE7DC] border border-transparent focus:border-[#3A1510]/30 rounded-xl px-4 py-3.5 text-sm text-[#1C1917] placeholder:text-[#6B5B52]/60 focus:outline-none transition-colors" />
                <textarea placeholder="Tell us about your fragrance preferences..." required rows={4}
                  className="col-span-2 bg-[#EDE7DC] border border-transparent focus:border-[#3A1510]/30 rounded-xl px-4 py-3.5 text-sm text-[#1C1917] placeholder:text-[#6B5B52]/60 focus:outline-none transition-colors resize-none" />
              </div>

              <button type="submit"
                className="group w-full flex items-center justify-center gap-2 bg-[#3A1510] text-[#F7F3EE] font-medium py-4 rounded-xl hover:bg-[#5C2318] transition-colors duration-300">
                {submitted ? (
                  <><span>Message sent!</span><span>✓</span></>
                ) : (
                  <><Send size={15} /><span>Send Message</span><ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" /></>
                )}
              </button>
            </form>
          </motion.div>

          {/* Right: image */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative">
            <div className="rounded-3xl overflow-hidden h-[500px] md:h-[600px] shadow-2xl shadow-[#3A1510]/20">
              <img src="/assets/contact.webp" alt="Contact UMBRA"
                className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3A1510]/40 to-transparent" />
            </div>

            {/* Floating badge */}
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="absolute -bottom-5 -left-4 bg-white rounded-2xl shadow-xl px-6 py-5">
              <div className="text-[#3A1510] font-serif text-3xl font-bold">14-day</div>
              <div className="text-[#6B5B52] text-xs mt-0.5">Money-back guarantee</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
