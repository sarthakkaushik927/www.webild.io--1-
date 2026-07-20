import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const posts = [
  {
    category: 'Fragrance Notes',
    title: 'The Art of Layering Scents for Every Season',
    excerpt: 'Discover how to combine UMBRA fragrances for a signature scent that evolves with you throughout the day.',
    img: '/assets/blog/blog-1.webp',
    authorName: 'Camille Laurent',
    authorImg: '/assets/hero-5.webp',
    date: 'Feb 2026',
  },
  {
    category: 'Behind the Bottle',
    title: 'From Grasse to Your Vanity: Sourcing Rose Absolute',
    excerpt: 'A journey through the fields of Provence where our master perfumers hand-select the rarest rose petals.',
    img: '/assets/blog/blog-2.webp',
    authorName: 'Elena Vasquez',
    authorImg: '/assets/hero-3.webp',
    date: 'Jan 2026',
  },
  {
    category: 'Women of UMBRA',
    title: 'How Amara Osei Found Her Signature Scent',
    excerpt: 'The model and entrepreneur shares why Noir Absolu became the fragrance she never leaves the house without.',
    img: '/assets/blog/blog-3.webp',
    authorName: 'Nadia Petrova',
    authorImg: '/assets/hero-6.webp',
    date: 'Jan 2026',
  },
];

export default function Journal() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="blog" data-section="blog" ref={ref} className="bg-[#F7F3EE] py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }} className="mb-14">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-px bg-[#3A1510]" />
            <span className="text-xs font-medium tracking-widest text-[#3A1510] uppercase">Journal</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end gap-6 justify-between">
            <h2 className="font-serif text-4xl md:text-5xl xl:text-6xl font-bold text-[#1C1917] max-w-md">
              The UMBRA Journal
            </h2>
            <p className="text-[#6B5B52] max-w-xs text-sm leading-relaxed">
              Stories of scent, craft, and the women who inspire us. Explore the world behind our fragrances.
            </p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.article key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="group cursor-pointer">
              {/* Image */}
              <div className="relative rounded-2xl overflow-hidden mb-5" style={{ height: '260px' }}>
                <img src={post.img} alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 left-4">
                  <span className="bg-[#3A1510] text-[#F7F3EE] text-xs font-medium px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <h3 className="font-serif text-xl font-bold text-[#1C1917] mb-3 group-hover:text-[#3A1510] transition-colors leading-snug">
                {post.title}
              </h3>
              <p className="text-[#6B5B52] text-sm leading-relaxed mb-5">{post.excerpt}</p>

              {/* Author row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img src={post.authorImg} alt={post.authorName}
                    className="w-8 h-8 rounded-full object-cover" />
                  <div>
                    <div className="text-xs font-medium text-[#1C1917]">{post.authorName}</div>
                    <div className="text-xs text-[#6B5B52]">{post.date}</div>
                  </div>
                </div>
                <ArrowRight size={16}
                  className="text-[#3A1510] group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
