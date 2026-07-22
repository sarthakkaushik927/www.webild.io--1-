import { useEffect, useState } from 'react';
import { apiGet } from '../utils/api';
import { useCmsRevision } from '../hooks/useCmsRevision';

export interface CraftStep {
  title: string;
  description: string;
  imageUrl: string;
}

export interface CraftData {
  title: string;
  subtitle: string;
  faqImage?: string;
  steps: CraftStep[];
}

const defaultCraft: CraftData = {
  title: 'Health & Happiness with Kruxnut 🌿',
  subtitle: 'At Kruxnut, we believe snacking should be smart, satisfying, and full of life.',
  faqImage: 'https://storage.googleapis.com/webild/default/templates/skincare-luxury/faq-image.webp',
  steps: [
    { title: 'Power of Protein', description: 'Every bite gives you natural plant-based strength.', imageUrl: 'https://storage.googleapis.com/webild/default/templates/skincare-luxury/features/feature-1.webp' },
    { title: 'Pure Ingredients', description: 'No palm oil, no chemicals, no compromise.', imageUrl: 'https://storage.googleapis.com/webild/default/templates/skincare-luxury/features/feature-2.webp' },
    { title: 'Eco Friendly', description: 'Sustainability is at the heart of every Kruxnut creation.', imageUrl: 'https://storage.googleapis.com/webild/default/templates/skincare-luxury/features/feature-3.webp' },
    { title: 'Energy & Joy', description: 'Healthy snacking that fuels your day.', imageUrl: 'https://storage.googleapis.com/webild/default/templates/skincare-luxury/hero-2.webp' },
  ],
};

export default function Craft() {
  const [craftData, setCraftData] = useState<CraftData>(defaultCraft);

  const { revision, bump } = useCmsRevision();

  useEffect(() => {
    apiGet<{ title?: string; subtitle?: string; faqImage?: string; steps?: any[] }>('/api/craft')
      .then((data) => {
        if (data?.title) {
          setCraftData({
            title: data.title || defaultCraft.title,
            subtitle: data.subtitle || defaultCraft.subtitle,
            faqImage: data.faqImage || defaultCraft.faqImage,
            steps: Array.isArray(data.steps) && data.steps.length > 0 ? data.steps : defaultCraft.steps,
          });
        }
      })
      .catch(console.error);
  }, [revision]);

  return (
    <section id="features" aria-label="Features section" className="py-20">
      <div className="flex flex-col gap-8 md:gap-10">
        <div className="flex flex-col items-center w-content-width mx-auto gap-2">
          <div className="px-3 py-1 mb-1 text-sm card rounded w-fit">
            <p>Why Choose Us</p>
          </div>
          <h2 className="bg-gradient-to-r from-foreground to-primary-cta bg-clip-text text-transparent pb-[0.1em] -mb-[0.1em] md:max-w-8/10 text-6xl 2xl:text-7xl leading-[1.15] font-semibold text-center text-balance">
            {craftData.title}
          </h2>
          <p className="md:max-w-7/10 text-lg md:text-xl leading-snug text-center text-balance">
            {craftData.subtitle}
          </p>
        </div>

        <div className="flex flex-col gap-5 md:gap-[6vh] w-content-width mx-auto">
          {craftData.steps.map((step, index) => (
            <div
              key={index}
              className={`sticky top-[25vw] md:top-[12.5vh] h-[140vw] md:h-[75vh] flex flex-col gap-6 md:gap-10 p-6 md:p-10 card rounded ${index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'}`}
              style={{ willChange: 'opacity', opacity: '1' }}
            >
              <div className="flex flex-col justify-center w-full md:w-1/2 gap-2">
                <div className="flex items-center justify-center size-9 mb-1 text-sm rounded primary-button text-primary-cta-text">
                  <p>{index + 1}</p>
                </div>
                <h3 className="text-4xl md:text-5xl font-semibold leading-[1.15] text-balance">{step.title}</h3>
                <p className="text-base md:text-lg leading-snug text-balance">{step.description}</p>
              </div>
              <div className="w-full md:w-1/2 aspect-square rounded overflow-hidden">
                <img
                  alt={step.title}
                  className="w-full h-full min-h-0 object-cover rounded"
                  src={step.imageUrl || `https://storage.googleapis.com/webild/default/templates/skincare-luxury/features/feature-${index + 1}.webp`}
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
