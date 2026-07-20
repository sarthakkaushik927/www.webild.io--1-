import { useEffect } from 'react';
import { gsap } from 'gsap';

const marqueeWords = [
  'RARE ESSENCES', 'HAND CRAFTED', 'SUSTAINABLE', 'PARABEN FREE',
  'VEGAN', 'AWARD WINNING', 'RARE ESSENCES', 'HAND CRAFTED',
  'SUSTAINABLE', 'PARABEN FREE', 'VEGAN', 'AWARD WINNING',
];

const footerLinks = [
  { label: 'Shop',           href: '#products'    },
  { label: 'Our Craft',      href: '#features'    },
  { label: 'Our Story',      href: '#'            },
  { label: 'Sustainability', href: '#'            },
  { label: 'Community',      href: '#influencers' },
  { label: 'Customer Care',  href: '#'            },
  { label: 'Contact',        href: '#contact'     },
  { label: 'FAQ',            href: '#faq'         },
  { label: 'Privacy Policy', href: '#'            },
  { label: 'Terms',          href: '#'            },
  { label: 'Returns',        href: '#'            },
];

export default function Footer() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Infinite marquee via GSAP (no CSS animation — cleaner control)
      gsap.to('.marquee-inner', {
        xPercent: -50,
        duration: 22,
        ease: 'none',
        repeat: -1,
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Marquee strip */}
      <div className="bg-[#3A1510] py-4 overflow-hidden">
        <div className="marquee-inner inline-flex whitespace-nowrap">
          {[...marqueeWords, ...marqueeWords].map((word, i) => (
            <span key={i} className="inline-flex items-center gap-6 px-6 text-[#C9A96E] text-sm font-medium tracking-[0.2em] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A96E] flex-shrink-0" />
              {word}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#1C1917] text-[#F7F3EE] pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6 md:px-10">

          {/* Top row */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-10 pb-12 border-b border-[#F7F3EE]/10">
            {/* Brand */}
            <div className="md:w-1/3">
              <div className="text-3xl font-serif font-bold tracking-[0.3em] mb-4 text-[#F7F3EE]">UMBRA</div>
              <p className="text-[#F7F3EE]/50 text-sm leading-relaxed max-w-xs">
                Luxury fragrances crafted with rare botanicals and master perfumery. Find your signature scent.
              </p>
              {/* Social */}
              <div className="flex gap-4 mt-6">
                {['Instagram', 'Twitter', 'Pinterest'].map((s) => (
                  <a key={s} href="#"
                    className="text-[#F7F3EE]/40 text-xs hover:text-[#C9A96E] transition-colors tracking-widest uppercase">
                    {s}
                  </a>
                ))}
              </div>
            </div>

            {/* Links grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-3 md:w-2/3">
              {footerLinks.map((link) => (
                <a key={link.label} href={link.href}
                  className="text-[#F7F3EE]/50 text-sm hover:text-[#C9A96E] transition-colors">
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Bottom row */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[#F7F3EE]/30 text-xs">
              © {new Date().getFullYear()} UMBRA. All rights reserved.
            </p>
            <p className="text-[#F7F3EE]/20 text-xs">
              Designed with Webild
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
