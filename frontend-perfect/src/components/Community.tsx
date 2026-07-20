import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight, Volume2, VolumeX } from 'lucide-react';

const influencers = [
  { name: 'Amara Osei',     video: '/assets/influencer-amara.mp4'  },
  { name: 'Chloe Marchand', video: '/assets/influencer-chloe.mp4'  },
  { name: 'Elena Vasquez',  video: '/assets/influencer-elena.mp4'  },
  { name: 'Isla Montgomery',video: '/assets/influencer-isla.mp4'   },
  { name: 'Zara Kimani',    video: '/assets/influencer-zara.mp4'   },
  { name: 'Nadia Petrova',  video: '/assets/influencer-nadia.mp4'  },
];

function VideoCard({ person, inView, delay }: { person: typeof influencers[0]; inView: boolean; delay: number }) {
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="flex-shrink-0 group relative"
      style={{ width: 'calc(100% / 3 - 11px)' }}
    >
      <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: '9/16', maxHeight: '420px' }}>
        <video
          ref={videoRef}
          src={person.video}
          autoPlay
          loop
          muted={muted}
          playsInline
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#3A1510]/80 via-transparent to-transparent" />

        {/* Mute toggle */}
        <button
          onClick={() => setMuted((m) => !m)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-colors"
        >
          {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
        </button>

        {/* Name */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <div className="text-[#C9A96E] text-xs tracking-widest uppercase font-medium mb-1">UMBRA</div>
          <div className="text-[#F7F3EE] font-serif text-lg font-semibold">{person.name}</div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Community() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [current, setCurrent] = useState(0);
  const visible = 3;

  const prev = () => setCurrent((c) => Math.max(0, c - 1));
  const next = () => setCurrent((c) => Math.min(influencers.length - visible, c + 1));

  return (
    <section id="influencers" data-section="influencers" ref={ref}
      className="bg-[#3A1510] py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-px bg-[#C9A96E]" />
              <span className="text-xs font-medium tracking-widest text-[#C9A96E] uppercase">Community</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl xl:text-6xl font-bold text-[#F7F3EE] max-w-md leading-tight">
              Worn By Those Who Set The Standard
            </h2>
          </div>
          <div className="flex flex-col items-start md:items-end gap-4">
            <p className="text-[#F7F3EE]/60 text-sm max-w-xs">
              The women shaping culture choose UMBRA as their signature.
            </p>
            <div className="flex gap-3">
              <button onClick={prev} disabled={current === 0}
                className="w-10 h-10 rounded-full border border-[#F7F3EE]/20 flex items-center justify-center text-[#F7F3EE] hover:bg-[#F7F3EE]/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                <ChevronLeft size={18} />
              </button>
              <button onClick={next} disabled={current >= influencers.length - visible}
                className="w-10 h-10 rounded-full border border-[#F7F3EE]/20 flex items-center justify-center text-[#F7F3EE] hover:bg-[#F7F3EE]/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Video slider */}
        <div className="overflow-hidden">
          <motion.div className="flex gap-4 md:gap-5"
            animate={{ x: `calc(${-current} * (100% / ${visible} + 6px))` }}
            transition={{ type: 'spring', stiffness: 280, damping: 33 }}>
            {influencers.map((person, i) => (
              <VideoCard key={person.name} person={person} inView={inView} delay={i * 0.08} />
            ))}
          </motion.div>
        </div>

        {/* Progress dots */}
        <div className="flex gap-2 justify-center mt-8">
          {Array.from({ length: influencers.length - visible + 1 }).map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)}
              className={`h-1 rounded-full transition-all duration-300 ${current === i ? 'w-8 bg-[#C9A96E]' : 'w-2 bg-[#F7F3EE]/20'}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
