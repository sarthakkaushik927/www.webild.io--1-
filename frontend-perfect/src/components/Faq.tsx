import { useEffect, useState } from 'react';
import { apiGet } from '../utils/api';

const faqItems = [
  {
    q: 'What makes Kruxnut snacks different from other brands?',
    a: 'Our snacks are made using 100% natural ingredients with no artificial flavors, no palm oil, and no chemicals. Every product is roasted to perfection for extra crunch and nutrition.',
  },
  {
    q: 'Are your products suitable for people with allergies?',
    a: 'We clearly label all allergens on our packaging. Our products may contain nuts and seeds. Please check individual product labels for specific allergen information.',
  },
  {
    q: 'How fresh are your products?',
    a: 'All Kruxnut products are freshly prepared and packed. We ensure minimal shelf time and use premium packaging to lock in freshness and crunch for every bite.',
  },
  {
    q: 'Do you offer free shipping?',
    a: 'Yes! We offer free shipping on all orders above ₹500. Orders are typically dispatched within 24 hours and delivered within 3-5 business days.',
  },
  {
    q: 'Are your snacks healthy for weight management?',
    a: 'Absolutely! Our roasted nuts and makhanas are rich in protein, fiber, and essential nutrients — making them an ideal alternative to chips and junk food for weight management and heart health.',
  },
  {
    q: 'Where can I buy Kruxnut products?',
    a: 'You can order directly from our website or find us on major e-commerce platforms. For bulk orders, please contact us at Care@kruxnut.com.',
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [faqImage, setFaqImage] = useState('https://storage.googleapis.com/webild/default/templates/skincare-luxury/faq-image.webp');

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    apiGet<{ faqImage?: string }>('/api/craft')
      .then((data) => {
        if (data?.faqImage) {
          setFaqImage(data.faqImage);
        }
      })
      .catch(console.error);
  }, []);

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
              know about our healthy snacks, ingredients, and quality promise.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
            <div className="card relative md:col-span-2 h-80 md:h-auto rounded overflow-hidden"
              style={{"opacity": "1", "transform": "none", }}><img
                alt="FAQ section image"
                className="min-h-0 rounded absolute inset-0 size-full object-cover"
                src={faqImage} loading="lazy" /></div>
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
