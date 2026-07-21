export default function Journal() {
  return (
    <>
            <section aria-label="Blog section" className="py-20">
              <div className="w-content-width mx-auto flex flex-col gap-8 md:gap-10">
                <div className="flex flex-col items-center gap-2">
                  <div className="px-3 py-1 mb-1 text-sm card rounded w-fit">
                    <p>Blog</p>
                  </div>
                  <h2
                    className="bg-gradient-to-r from-foreground to-primary-cta bg-clip-text text-transparent pb-[0.1em] -mb-[0.1em] md:max-w-8/10 text-6xl 2xl:text-7xl leading-[1.15] font-semibold text-center text-balance">
                    The Kruxnut Blog</h2>
                  <p className="md:max-w-7/10 text-lg md:text-xl leading-snug text-center text-balance">Stories of health, taste,
                    and the people who inspire us. Explore the world behind our snacks.</p>
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
                            <p>Healthy Snacking</p>
                          </div>
                          <h3 className="text-2xl font-semibold leading-snug text-balance">Why Makhana is the Ultimate Guilt-Free
                            Snack</h3>
                          <p className="text-base leading-snug text-balance">Discover why roasted makhana is taking over as
                            the healthiest snacking option for fitness enthusiasts.</p>
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
                            <p>Behind the Pack</p>
                          </div>
                          <h3 className="text-2xl font-semibold leading-snug text-balance">From Farm to Your Table: Sourcing
                            the Finest Peanuts</h3>
                          <p className="text-base leading-snug text-balance">A journey through the farms of India where our
                            team hand-selects the freshest, highest-quality nuts.</p>
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
                            <p>Nutrition Tips</p>
                          </div>
                          <h3 className="text-2xl font-semibold leading-snug text-balance">5 Reasons to Replace Chips with
                            Roasted Snacks</h3>
                          <p className="text-base leading-snug text-balance">A nutritionist explains why switching to roasted
                            nuts and makhanas can transform your health and energy levels.</p>
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
