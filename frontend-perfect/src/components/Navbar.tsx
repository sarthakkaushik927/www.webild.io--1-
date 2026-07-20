import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Menu, ArrowRight } from 'lucide-react';

const navLinks = [
  { name: 'Collection', href: '#products'    },
  { name: 'Craft',      href: '#features'    },
  { name: 'Journal',    href: '#blog'        },
  { name: 'Contact',    href: '#contact'     },
];

export default function Navbar() {
  const [isOpen,   setIsOpen]   = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
    );
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 nav-blur transition-all duration-500 ${
          scrolled
            ? 'bg-[#F7F3EE]/90 shadow-sm border-b border-[#3A1510]/5'
            : 'bg-transparent'
        }`}>
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 md:h-20 flex items-center justify-between">

          {/* Logo */}
          <a href="#hero"
            className="text-[#3A1510] text-xl md:text-2xl tracking-[0.35em] font-bold font-serif select-none">
            UMBRA
          </a>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <a key={l.name} href={l.href}
                className="text-sm font-medium text-[#1C1917]/70 hover:text-[#3A1510] transition-colors duration-200 tracking-wide">
                {l.name}
              </a>
            ))}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            <a href="#products"
              className="hidden md:inline-flex items-center gap-2 bg-[#3A1510] text-[#F7F3EE] text-sm font-medium px-5 py-2.5 rounded-full hover:bg-[#5C2318] transition-colors duration-300">
              Shop Now <ArrowRight size={13} />
            </a>
            <button onClick={() => setIsOpen(true)}
              className="w-9 h-9 rounded-full bg-[#3A1510] flex items-center justify-center hover:bg-[#5C2318] transition-colors duration-300 flex-shrink-0"
              aria-label="Open menu">
              <Menu size={16} color="#F7F3EE" />
            </button>
          </div>
        </div>
      </nav>

      {/* Full-screen overlay menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-[#3A1510] flex flex-col overflow-hidden">

            {/* Top bar */}
            <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 md:h-20 flex items-center justify-between w-full">
              <span className="text-[#F7F3EE] text-xl md:text-2xl tracking-[0.35em] font-bold font-serif">UMBRA</span>
              <button onClick={() => setIsOpen(false)}
                className="w-9 h-9 rounded-full border border-[#F7F3EE]/30 flex items-center justify-center hover:bg-[#F7F3EE]/10 transition-colors"
                aria-label="Close menu">
                <X size={16} color="#F7F3EE" />
              </button>
            </div>

            {/* Links */}
            <div className="flex-1 flex flex-col items-center justify-center gap-6 md:gap-8">
              {navLinks.map((l, i) => (
                <motion.a key={l.name} href={l.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.08 + i * 0.07, duration: 0.4, ease: 'easeOut' }}
                  onClick={() => setIsOpen(false)}
                  className="text-[#F7F3EE] font-serif text-4xl md:text-6xl font-light italic hover:text-[#C9A96E] transition-colors duration-300">
                  {l.name}
                </motion.a>
              ))}

              <motion.a href="#products"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                onClick={() => setIsOpen(false)}
                className="mt-4 inline-flex items-center gap-2 bg-[#C9A96E] text-[#3A1510] font-semibold px-7 py-3.5 rounded-full hover:bg-[#E5C99A] transition-colors duration-300 text-sm">
                Shop Now <ArrowRight size={14} />
              </motion.a>
            </div>

            {/* Social */}
            <div className="px-10 pb-10 flex gap-6">
              {['Instagram', 'Twitter', 'Pinterest'].map((s) => (
                <a key={s} href="#"
                  className="text-[#F7F3EE]/50 text-xs hover:text-[#C9A96E] transition-colors tracking-widest uppercase">
                  {s}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
