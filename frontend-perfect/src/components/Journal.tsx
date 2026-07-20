export default function Journal() {
  return (
    <>
            <section aria-label="Blog section" className="py-20">
              <div className="w-content-width mx-auto flex flex-col gap-8 md:gap-10">
                <div className="flex flex-col items-center gap-2">
                  <div className="px-3 py-1 mb-1 text-sm card rounded w-fit">
                    <p>Journal</p>
                  </div>
                  <h2
                    className="bg-gradient-to-r from-foreground to-primary-cta bg-clip-text text-transparent pb-[0.1em] -mb-[0.1em] md:max-w-8/10 text-6xl 2xl:text-7xl leading-[1.15] font-semibold text-center text-balance">
                    The UMBRA Journal</h2>
                  <p className="md:max-w-7/10 text-lg md:text-xl leading-snug text-center text-balance">Stories of scent, craft,
                    and the women who inspire us. Explore the world behind our fragrances.</p>
                </div>
                <div className="" style={{"opacity": "1", }}>
                  <div className="grid grid-cols-1 gap-5 mx-auto w-content-width md:grid-cols-3">
                    <article
                      className="card group flex flex-col gap-3 xl:gap-3.5 2xl:gap-4 p-3 xl:p-3.5 2xl:p-4 rounded cursor-pointer">
                      <div className="relative aspect-4/3 rounded overflow-hidden button-secondary shadow shadow-foreground/5">
                        <img alt="https://storage.googleapis.com/webild/default/templates/skincare-luxury/blog/blog-1.webp"
                          className="min-h-0 rounded size-full object-cover transition-transform duration-500 group-hover:scale-105"
                          src="https://storage.googleapis.com/webild/default/templates/skincare-luxury/blog/blog-1.webp" loading="lazy" />
                        <div
                          className="absolute inset-0 flex items-center justify-center group-hover:bg-background/20 group-hover:backdrop-blur-xs transition-all duration-300">
                          <button
                            className="primary-button flex items-center justify-center size-12 rounded-full opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300 cursor-pointer"><svg
                              xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                              className="lucide lucide-arrow-up-right size-5 text-primary-cta-text" aria-hidden={true}>
                              <path d="M7 7h10v10"></path>
                              <path d="M7 17 17 7"></path>
                            </svg></button></div>
                      </div>
                      <div className="flex flex-1 flex-col justify-between gap-2 p-3 xl:p-3.5 2xl:p-4">
                        <div className="flex flex-col gap-2">
                          <div className="px-3 py-1 mb-1 text-sm primary-button text-primary-cta-text rounded w-fit">
                            <p>Fragrance Notes</p>
                          </div>
                          <h3 className="text-2xl font-semibold leading-snug text-balance">The Art of Layering Scents for Every
                            Season</h3>
                          <p className="text-base leading-snug text-balance">Discover how to combine UMBRA fragrances for a
                            signature scent that evolves with you throughout the day.</p>
                        </div>
                        <div className="flex items-center gap-3 mt-2 md:mt-3"><img
                            alt="https://storage.googleapis.com/webild/default/templates/skincare-luxury/blog/authors/author-1.webp"
                            className="min-h-0 size-10 md:size-11 2xl:size-12 rounded-full object-cover"
                            src="https://storage.googleapis.com/webild/default/templates/skincare-luxury/blog/authors/author-1.webp" loading="lazy" />
                          <div className="flex flex-col min-w-0"><span
                              className="text-base text-foreground font-semibold leading-snug truncate">Camille
                              Laurent</span><span className="text-base text-foreground/75 leading-snug truncate">Feb 2026</span>
                          </div>
                        </div>
                      </div>
                    </article>
                    <article
                      className="card group flex flex-col gap-3 xl:gap-3.5 2xl:gap-4 p-3 xl:p-3.5 2xl:p-4 rounded cursor-pointer">
                      <div className="relative aspect-4/3 rounded overflow-hidden button-secondary shadow shadow-foreground/5">
                        <img alt="https://storage.googleapis.com/webild/default/templates/skincare-luxury/blog/blog-2.webp"
                          className="min-h-0 rounded size-full object-cover transition-transform duration-500 group-hover:scale-105"
                          src="https://storage.googleapis.com/webild/default/templates/skincare-luxury/blog/blog-2.webp" loading="lazy" />
                        <div
                          className="absolute inset-0 flex items-center justify-center group-hover:bg-background/20 group-hover:backdrop-blur-xs transition-all duration-300">
                          <button
                            className="primary-button flex items-center justify-center size-12 rounded-full opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300 cursor-pointer"><svg
                              xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                              className="lucide lucide-arrow-up-right size-5 text-primary-cta-text" aria-hidden={true}>
                              <path d="M7 7h10v10"></path>
                              <path d="M7 17 17 7"></path>
                            </svg></button></div>
                      </div>
                      <div className="flex flex-1 flex-col justify-between gap-2 p-3 xl:p-3.5 2xl:p-4">
                        <div className="flex flex-col gap-2">
                          <div className="px-3 py-1 mb-1 text-sm primary-button text-primary-cta-text rounded w-fit">
                            <p>Behind the Bottle</p>
                          </div>
                          <h3 className="text-2xl font-semibold leading-snug text-balance">From Grasse to Your Vanity: Sourcing
                            Rose Absolute</h3>
                          <p className="text-base leading-snug text-balance">A journey through the fields of Provence where our
                            master perfumers hand-select the rarest rose petals.</p>
                        </div>
                        <div className="flex items-center gap-3 mt-2 md:mt-3"><img
                            alt="https://storage.googleapis.com/webild/default/templates/skincare-luxury/blog/authors/author-2.webp"
                            className="min-h-0 size-10 md:size-11 2xl:size-12 rounded-full object-cover"
                            src="https://storage.googleapis.com/webild/default/templates/skincare-luxury/blog/authors/author-2.webp" loading="lazy" />
                          <div className="flex flex-col min-w-0"><span
                              className="text-base text-foreground font-semibold leading-snug truncate">Elena Vasquez</span><span
                              className="text-base text-foreground/75 leading-snug truncate">Jan 2026</span></div>
                        </div>
                      </div>
                    </article>
                    <article
                      className="card group flex flex-col gap-3 xl:gap-3.5 2xl:gap-4 p-3 xl:p-3.5 2xl:p-4 rounded cursor-pointer">
                      <div className="relative aspect-4/3 rounded overflow-hidden button-secondary shadow shadow-foreground/5">
                        <img alt="https://storage.googleapis.com/webild/default/templates/skincare-luxury/blog/blog-3.webp"
                          className="min-h-0 rounded size-full object-cover transition-transform duration-500 group-hover:scale-105"
                          src="https://storage.googleapis.com/webild/default/templates/skincare-luxury/blog/blog-3.webp" loading="lazy" />
                        <div
                          className="absolute inset-0 flex items-center justify-center group-hover:bg-background/20 group-hover:backdrop-blur-xs transition-all duration-300">
                          <button
                            className="primary-button flex items-center justify-center size-12 rounded-full opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300 cursor-pointer"><svg
                              xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                              className="lucide lucide-arrow-up-right size-5 text-primary-cta-text" aria-hidden={true}>
                              <path d="M7 7h10v10"></path>
                              <path d="M7 17 17 7"></path>
                            </svg></button></div>
                      </div>
                      <div className="flex flex-1 flex-col justify-between gap-2 p-3 xl:p-3.5 2xl:p-4">
                        <div className="flex flex-col gap-2">
                          <div className="px-3 py-1 mb-1 text-sm primary-button text-primary-cta-text rounded w-fit">
                            <p>Women of UMBRA</p>
                          </div>
                          <h3 className="text-2xl font-semibold leading-snug text-balance">How Amara Osei Found Her Signature
                            Scent</h3>
                          <p className="text-base leading-snug text-balance">The model and entrepreneur shares why Noir Absolu
                            became the fragrance she never leaves the house without.</p>
                        </div>
                        <div className="flex items-center gap-3 mt-2 md:mt-3"><img
                            alt="https://storage.googleapis.com/webild/default/templates/skincare-luxury/blog/authors/author-3.webp"
                            className="min-h-0 size-10 md:size-11 2xl:size-12 rounded-full object-cover"
                            src="https://storage.googleapis.com/webild/default/templates/skincare-luxury/blog/authors/author-3.webp" loading="lazy" />
                          <div className="flex flex-col min-w-0"><span
                              className="text-base text-foreground font-semibold leading-snug truncate">Nadia Petrova</span><span
                              className="text-base text-foreground/75 leading-snug truncate">Jan 2026</span></div>
                        </div>
                      </div>
                    </article>
                  </div>
                </div>
              </div>
            </section>
    </>
  );
}
