import { useEffect, useState, useCallback } from 'react';
import { apiGet } from '../utils/api';

interface CarouselImage {
  url: string;
  alt: string;
}

const defaultImages: CarouselImage[] = [
  { url: 'https://storage.googleapis.com/webild/default/templates/skincare-luxury/hero-2.webp', alt: 'Product showcase 1' },
  { url: 'https://storage.googleapis.com/webild/default/templates/skincare-luxury/hero-3.webp', alt: 'Product showcase 2' },
  { url: 'https://storage.googleapis.com/webild/default/templates/skincare-luxury/hero-4.webp', alt: 'Product showcase 3' },
  { url: 'https://storage.googleapis.com/webild/default/templates/skincare-luxury/hero-5.webp', alt: 'Product showcase 4' },
  { url: 'https://storage.googleapis.com/webild/default/templates/skincare-luxury/hero-6.webp', alt: 'Product showcase 5' },
];

const HERO_CACHE_KEY = 'hero-carousel-timestamp';

export default function Hero() {
  const [images, setImages] = useState<CarouselImage[]>(defaultImages);
  const [activeIndex, setActiveIndex] = useState(2);
  const [revision, setRevision] = useState(() => Number(localStorage.getItem(HERO_CACHE_KEY) || '0'));

  useEffect(() => {
    const handler = () => setRevision(Number(localStorage.getItem(HERO_CACHE_KEY) || '0'));
    window.addEventListener('hero-carousel-updated', handler);
    return () => window.removeEventListener('hero-carousel-updated', handler);
  }, []);

  useEffect(() => {
    apiGet<{ images?: string[] }>('/api/carousel')
      .then((carouselData) => {
        const source = (carouselData?.images && carouselData.images.length > 0) ? carouselData.images : defaultImages.map(img => img.url);
        setImages(source.map((url, index) => ({ url, alt: `Hero image ${index + 1}` })));
        setActiveIndex(Math.floor(source.length / 2));
      })
      .catch(() => {
        setImages(defaultImages);
        setActiveIndex(Math.floor(defaultImages.length / 2));
      });
  }, [revision]);

  // Auto-rotate carousel
  const nextSlide = useCallback(() => {
    setActiveIndex(prev => (prev + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(nextSlide, 3500);
    return () => clearInterval(interval);
  }, [nextSlide, images.length]);

  // Calculate position styles for each card relative to active
  const getCardStyle = (index: number): React.CSSProperties => {
    const total = images.length;
    let diff = index - activeIndex;
    // Wrap around for circular effect
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    const absD = Math.abs(diff);

    if (absD > 2) {
      return { opacity: 0, zIndex: 1, transform: `translateX(${diff > 0 ? 300 : -300}%) scale(0.6)`, pointerEvents: 'none' };
    }

    const translateX = diff * 100;
    const translateY = absD * 5;
    const scale = 1 - absD * 0.12;
    const rotate = diff * 2;
    const zIndex = 10 - absD;

    return {
      zIndex,
      opacity: 1,
      transform: `translateX(${translateX}%) translateY(${translateY}%) scale(${scale}) rotate(${rotate}deg)`,
      transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
    };
  };

  const getOverlayStyle = (index: number): React.CSSProperties => {
    const total = images.length;
    let diff = index - activeIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    const absD = Math.abs(diff);
    return { opacity: absD > 0 ? 1 : 0 };
  };

  const rayStyle = (opacity: string, transform: string, animation: string) => ({
    "--ray-opacity": opacity,
    transform,
    animation,
  } as React.CSSProperties);

  return (
    <>
      <section aria-label="Hero section"
        className="relative flex flex-col items-center justify-center gap-8 md:gap-10 w-full min-h-svh pt-25 pb-20 md:pt-30">
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none select-none" aria-hidden={true}>
          <div
            className="absolute inset-0 bg-background mask-[radial-gradient(50%_50%_at_50%_0%,white_0%,transparent_100%)] bg-[linear-gradient(to_right,color-mix(in_srgb,var(--color-background-accent)_20%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_srgb,var(--color-background-accent)_10%,transparent)_1px,transparent_1px)] bg-size-[10vw_10vw]">
          </div>
          <div
            className="absolute -top-[571px] -left-[373px] w-[1142px] h-[179vh] -rotate-[38deg] overflow-hidden blur-lg mask-[radial-gradient(50%_109%,#000_0%,#000000f6_0%,transparent_96%)]">
            <div
              className="absolute -top-[352px] -bottom-[920px] left-[calc(50%-17.5px)] w-[35px] origin-top-right overflow-hidden bg-[radial-gradient(50%_50%_at_50%_50%,var(--color-background-accent)_0%,transparent_100%)]"
              style={rayStyle("0.85", "rotate(-18deg)", "4s ease-in-out 0s infinite normal both running rotated-ray-pulse")}>
            </div>
            <div
              className="absolute -top-[352px] -bottom-[920px] left-[calc(50%-17.5px)] w-[35px] origin-top-right overflow-hidden bg-[radial-gradient(50%_50%_at_50%_50%,var(--color-background-accent)_0%,transparent_100%)]"
              style={rayStyle("0.775", "rotate(-12deg)", "3.5s ease-in-out 0.5s infinite normal both running rotated-ray-pulse")}>
            </div>
            <div
              className="absolute -top-[352px] -bottom-[920px] left-[calc(50%-10px)] w-[20px] origin-top-right overflow-hidden bg-[radial-gradient(50%_50%_at_50%_50%,var(--color-background-accent)_0%,transparent_100%)]"
              style={rayStyle("0.65", "scale(0.9) rotate(-5deg)", "5s ease-in-out 1.2s infinite normal both running rotated-ray-pulse")}>
            </div>
            <div
              className="absolute -top-[352px] -bottom-[920px] left-[calc(50%-7.5px)] w-[15px] origin-top-right overflow-hidden bg-[radial-gradient(50%_50%_at_50%_50%,var(--color-background-accent)_0%,transparent_100%)]"
              style={rayStyle("0.25", "rotate(-3deg)", "3s ease-in-out 0.3s infinite normal both running rotated-ray-pulse")}>
            </div>
            <div
              className="absolute -top-[352px] -bottom-[920px] left-[calc(50%-20px)] w-[40px] origin-top-right overflow-hidden bg-[radial-gradient(50%_50%_at_50%_50%,var(--color-background-accent)_0%,transparent_100%)]"
              style={rayStyle("0.45", "scale(0.79) rotate(0deg)", "4.5s ease-in-out 0.8s infinite normal both running rotated-ray-pulse")}>
            </div>
            <div
              className="absolute -top-[352px] -bottom-[920px] left-[calc(50%-10px)] w-[20px] origin-top-right overflow-hidden bg-[radial-gradient(50%_50%_at_50%_50%,var(--color-background-accent)_0%,transparent_100%)]"
              style={rayStyle("0.45", "rotate(6deg)", "3.2s ease-in-out 1.5s infinite normal both running rotated-ray-pulse")}>
            </div>
            <div
              className="absolute -top-[352px] -bottom-[920px] left-[calc(50%-17.5px)] w-[35px] origin-top-right overflow-hidden bg-[radial-gradient(50%_50%_at_50%_50%,var(--color-background-accent)_0%,transparent_100%)]"
              style={rayStyle("0.65", "scale(0.83) rotate(9deg)", "4.2s ease-in-out 0.2s infinite normal both running rotated-ray-pulse")}>
            </div>
            <div
              className="absolute -top-[352px] -bottom-[920px] left-[calc(50%-17.5px)] w-[35px] origin-top-right overflow-hidden bg-[radial-gradient(50%_50%_at_50%_50%,var(--color-background-accent)_0%,transparent_100%)]"
              style={rayStyle("1", "scale(0.9) rotate(14deg)", "3.8s ease-in-out 1s infinite normal both running rotated-ray-pulse")}>
            </div>
            <div
              className="absolute left-[calc(50%-599px)] -top-[352px] -bottom-[46px] w-[1198px] opacity-[0.05] overflow-hidden bg-[radial-gradient(50%_50%_at_50%_50%,var(--color-background-accent)_0%,transparent_100%)]">
            </div>
            <div
              className="absolute left-[calc(50%-432.5px)] -top-[252px] w-[865px] h-[929px] opacity-15 overflow-hidden bg-[radial-gradient(50%_50%_at_50%_50%,var(--color-background-accent)_0%,transparent_100%)]">
            </div>
            <div
              className="absolute left-[calc(50%-432.5px)] -top-[252px] w-[865px] h-[929px] opacity-15 overflow-hidden bg-[radial-gradient(50%_50%_at_50%_50%,var(--color-background-accent)_0%,transparent_100%)]">
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-3 w-content-width mx-auto text-center z-10">
          <div className="px-3 py-1 mb-1 text-sm card rounded w-fit">
            <p>Premium Snacks</p>
          </div>
          <h1
            className="bg-gradient-to-r from-foreground to-primary-cta bg-clip-text text-transparent pb-[0.1em] -mb-[0.1em] md:max-w-8/10 text-7xl 2xl:text-8xl leading-[1.15] font-semibold text-center text-balance">
            Swad Sang Sehat — Taste with a Twist of Health!</h1>
          <p className="md:max-w-7/10 text-lg md:text-xl leading-snug text-balance">100% Fresh &amp; Organic Foods
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-2 md:mt-3">
            <div style={{"opacity": "1", "transform": "none", }}><a href="#products"
                className="flex items-center justify-center h-10 px-6 text-sm rounded cursor-pointer primary-button text-primary-cta-text"
                style={{"transform": "none", }}>View Details</a></div>
            <div style={{"opacity": "1", "transform": "none", }}><a href="#features"
                className="flex items-center justify-center h-10 px-6 text-sm rounded cursor-pointer secondary-button text-secondary-cta-text"
                style={{"transform": "none", }}>Our Craft</a></div>
          </div>
        </div>

        {/* Auto-scrolling Carousel */}
        <div className="relative flex items-center justify-center w-full overflow-hidden">
          <div className="w-[70%] md:w-[40%] aspect-square md:aspect-video opacity-0"></div>
          {images.map((img, index) => {
            const style = getCardStyle(index);
            const overlayStyle = getOverlayStyle(index);
            // Only render cards within visible range
            const total = images.length;
            let diff = index - activeIndex;
            if (diff > total / 2) diff -= total;
            if (diff < -total / 2) diff += total;
            if (Math.abs(diff) > 2) return null;

            return (
              <div
                key={index}
                className="absolute w-[70%] md:w-[40%] aspect-square md:aspect-video p-2 xl:p-3 2xl:p-4 card rounded-lg overflow-hidden cursor-pointer"
                style={style}
                onClick={() => setActiveIndex(index)}
              >
                <img
                  alt={img.alt}
                  className="min-h-0 w-full h-full rounded-lg object-cover"
                  src={img.url}
                />
                <div
                  className="absolute inset-0 bg-background/50 backdrop-blur-[1px] pointer-events-none transition-opacity duration-500"
                  style={overlayStyle}
                />
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
