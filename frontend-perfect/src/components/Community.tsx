import { useEffect, useState } from 'react';
import { apiGet } from '../utils/api';

export interface Influencer {
  name: string;
  videoUrl: string;
}

export interface CommunityData {
  title: string;
  subtitle: string;
  influencers: Influencer[];
}

const defaultCommunity: CommunityData = {
  title: "Worn By Those Who Set The Standard",
  subtitle: "The women shaping culture choose UMBRA as their signature.",
  influencers: [
    {
      name: "Amara Osei",
      videoUrl: "https://storage.googleapis.com/webild/default/templates/skincare-luxury/influencer-amara.mp4"
    },
    {
      name: "Chloe Marchand",
      videoUrl: "https://storage.googleapis.com/webild/default/templates/skincare-luxury/influencer-chloe.mp4"
    },
    {
      name: "Elena Vasquez",
      videoUrl: "https://storage.googleapis.com/webild/default/templates/skincare-luxury/influencer-elena.mp4"
    },
    {
      name: "Isla Montgomery",
      videoUrl: "https://storage.googleapis.com/webild/default/templates/skincare-luxury/influencer-isla.mp4"
    },
    {
      name: "Zara Kimani",
      videoUrl: "https://storage.googleapis.com/webild/default/templates/skincare-luxury/influencer-zara.mp4"
    },
    {
      name: "Nadia Petrova",
      videoUrl: "https://storage.googleapis.com/webild/default/templates/skincare-luxury/influencer-nadia.mp4"
    }
  ]
};

export default function Community() {
  const [communityData, setCommunityData] = useState<CommunityData>(defaultCommunity);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGet<CommunityData>('/api/community')
      .then(data => {
        if (data && data.title) {
          setCommunityData({
            title: data.title || defaultCommunity.title,
            subtitle: data.subtitle || defaultCommunity.subtitle,
            influencers: data.influencers && data.influencers.length > 0 ? data.influencers : defaultCommunity.influencers
          });
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return null;

  return (
    <>
      <section aria-label="Features section" className="py-20">
        <div className="flex flex-col gap-8 md:gap-10">
          <div className="flex flex-col items-center w-content-width mx-auto gap-2">
            <div className="px-3 py-1 mb-1 text-sm card rounded w-fit">
              <p>Community</p>
            </div>
            <h2 className="bg-gradient-to-r from-foreground to-primary-cta bg-clip-text text-transparent pb-[0.1em] -mb-[0.1em] md:max-w-8/10 text-6xl 2xl:text-7xl leading-[1.15] font-semibold text-center text-balance">
              {communityData.title}
            </h2>
            <p className="md:max-w-7/10 text-lg md:text-xl leading-snug text-center text-balance">
              {communityData.subtitle}
            </p>
          </div>
          <div className="" style={{"opacity": "1", "transform": "none"}}>
            <div className="flex flex-col gap-5 w-full overflow-hidden">
              <div className="w-full cursor-grab">
                <div className="flex gap-4 items-stretch" style={{"transform": "translate3d(0px, 0px, 0px)"}}>
                  <div className="shrink-0 w-carousel-padding"></div>
                  
                  {communityData.influencers.map((inf, i) => (
                    <div key={i} className="shrink-0 *:h-full w-carousel-item-3 2xl:w-carousel-item-4">
                      <div className="flex flex-col gap-3 xl:gap-3.5 2xl:gap-4 p-3 xl:p-3.5 2xl:p-4 h-full card rounded">
                        <div className="aspect-square rounded overflow-hidden button-secondary shadow shadow-foreground/5">
                          <video
                            src={inf.videoUrl}
                            aria-label={inf.videoUrl}
                            className="w-full h-full min-h-0 object-cover rounded" autoPlay={true} loop playsInline={true}>
                          </video>
                        </div>
                        <div className="flex flex-col gap-1 p-3 xl:p-3.5 2xl:p-4">
                          <h3 className="text-2xl font-semibold leading-snug">{inf.name}</h3>
                          <p className="text-base leading-snug"> </p>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="shrink-0 w-carousel-padding"></div>
                </div>
              </div>
              <div className="flex w-full">
                <div className="shrink-0 w-carousel-padding-controls"></div>
                <div className="flex justify-between items-center w-full">
                  <div className="relative h-2 w-1/2 card rounded overflow-hidden">
                    <div className="absolute top-0 bottom-0 -left-full w-full primary-button rounded"
                      style={{"transform": "translate3d(0%, 0px, 0px)"}}></div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button disabled={true} type="button" aria-label="Previous"
                      className="flex items-center justify-center h-8 aspect-square secondary-button rounded cursor-pointer disabled:opacity-50">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        className="lucide lucide-chevron-left h-2/5 aspect-square text-secondary-cta-text"
                        aria-hidden={true}>
                        <path d="m15 18-6-6 6-6"></path>
                      </svg>
                    </button>
                    <button type="button" aria-label="Next"
                      className="flex items-center justify-center h-8 aspect-square secondary-button rounded cursor-pointer disabled:opacity-50">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        className="lucide lucide-chevron-right h-2/5 aspect-square text-secondary-cta-text"
                        aria-hidden={true}>
                        <path d="m9 18 6-6-6-6"></path>
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="shrink-0 w-carousel-padding-controls"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
