import { useState } from 'react';

const faqItems = [
  {
    q: 'What makes UMBRA fragrances different from other luxury brands?',
    a: 'Our fragrances are composed using rare, sustainably sourced essences and crafted by master perfumers with decades of experience. Each scent is designed to evolve uniquely on your skin.',
  },
  {
    q: 'How long does the fragrance last on skin?',
    a: 'Our Eau de Parfum concentrations are formulated to last 8–12 hours on skin, with sillage projecting beautifully for the first 4–6 hours. Warmer skin typically extends the longevity.',
  },
  {
    q: 'Are your fragrances suitable for sensitive skin?',
    a: 'Yes. All UMBRA fragrances are formulated with gentle, high-quality ingredients and are free from parabens and harmful sulfates. We recommend a patch test if you have particularly sensitive skin.',
  },
  {
    q: 'Do you offer a satisfaction guarantee?',
    a: 'Yes. We offer a 30-day satisfaction guarantee. If you are not completely satisfied with your purchase, please contact us for a full refund or exchange.',
  },
  {
    q: 'Are your ingredients natural or synthetic?',
    a: 'We use a harmonious blend of natural extracts and safe synthetic molecules to ensure consistency, performance, and ethical sourcing. All ingredients comply with IFRA standards.',
  },
  {
    q: 'How do I choose the right fragrance for me?',
    a: 'We recommend exploring our Discovery Set or visiting our store for a personalized consultation. Our team can help you find a scent that matches your personality and lifestyle.',
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <section aria-label="FAQ section" className="py-20">
        <div className="w-content-width mx-auto flex flex-col gap-8 md:gap-10">
          <div className="flex flex-col items-center gap-2">
            <div className="px-3 py-1 mb-1 text-sm card rounded w-fit">
              <p>Support</p>
            </div>
            <h2
              className="bg-gradient-to-r from-foreground to-primary-cta bg-clip-text text-transparent pb-[0.1em] -mb-[0.1em] md:max-w-8/10 text-6xl 2xl:text-7xl leading-[1.15] font-semibold text-center text-balance">
              Frequently Asked Questions</h2>
            <p className="md:max-w-7/10 text-lg md:text-xl leading-snug text-center text-balance">Everything you need to
              know about our luxury fragrances, ingredients, and satisfaction guarantee.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
            <div className="card relative md:col-span-2 h-80 md:h-auto rounded overflow-hidden"
              style={{"opacity": "1", "transform": "none", }}><img
                alt="https://storage.googleapis.com/webild/default/templates/skincare-luxury/faq-image.webp"
                className="min-h-0 rounded absolute inset-0 size-full object-cover"
                src="https://storage.googleapis.com/webild/default/templates/skincare-luxury/faq-image.webp" loading="lazy" /></div>
            <div className="md:col-span-3 flex flex-col gap-3 xl:gap-3.5 2xl:gap-4" style={{"opacity": "1", "transform": "none", }}>
              {faqItems.map((item, index) => (
                <div key={index} className="border border-black/5 rounded overflow-hidden">
                  <button
                    onClick={() => toggle(index)}
                    className="w-full text-left p-3 xl:p-3.5 2xl:p-4 rounded flex items-center justify-between gap-3 xl:gap-3.5 2xl:gap-4 cursor-pointer"
                  >
                    <h3 className="text-lg md:text-xl font-medium leading-snug">{item.q}</h3>
                    <div className="flex shrink-0 items-center justify-center size-8 md:size-9 rounded primary-button">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        className="lucide lucide-plus size-3.5 md:size-4 text-primary-cta-text transition-transform duration-300"
                        style={{ transform: openIndex === index ? 'rotate(45deg)' : 'rotate(0deg)' }}
                        aria-hidden={true}>
                        <path d="M5 12h14"></path>
                        <path d="M12 5v14"></path>
                      </svg>
                    </div>
                  </button>
                  <div
                    className="overflow-hidden transition-all duration-300 ease-in-out"
                    style={{ maxHeight: openIndex === index ? '500px' : '0px', opacity: openIndex === index ? 1 : 0 }}
                  >
                    <p className="px-3 xl:px-3.5 2xl:px-4 pb-3 xl:pb-3.5 2xl:pb-4 text-gray-600 text-base leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
