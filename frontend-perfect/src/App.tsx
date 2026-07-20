
export default function App() {
  return (
    <div className="lenis lenis-scrolling">
      <style dangerouslySetInnerHTML={{__html: `
      @keyframes watermark-text-shine {
        0% {
          background-position: 100% center;
        }

        100% {
          background-position: -100% center;
        }
      }

      .watermark-text-shine {
        background: linear-gradient(90deg, currentColor 0%, currentColor 40%, #3d8bfa 50%, currentColor 60%, currentColor 100%);
        background-size: 200% auto;
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: watermark-text-shine 3s linear infinite;
      }
    `}}></style><button
      className="fixed z-99999 bottom-6 right-6 flex items-center gap-2 p-1 pr-3 rounded-[6px] cursor-pointer transition-all duration-200 hover:-translate-y-[3px] text-black bg-[#f3f3f3] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.025),0px_0px_0px_1px_rgba(0,0,0,0.07),inset_0px_1px_0px_rgba(255,255,255,0.75)]">
      <div
        className="relative flex items-center justify-center h-9 w-9 rounded-[6px] text-white bg-[linear-gradient(180deg,#3d8bfa_0%,#5ba2f9_100%)] shadow-[0_6px_12px_-5px_rgba(58,137,253,0.5)] transition-[filter] duration-300 ease-out">
        <img alt="Webild" className="h-1/2 w-1/2 object-contain brightness-0 invert"
          src="https://storage.googleapis.com/webild/default/platform/logo-icon.png" /></div><span
        className="flex items-center gap-1 text-base font-medium leading-snug watermark-text-shine">Made with Webild</span>
    </button>
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none select-none" aria-hidden={true}>
      <div
        className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 w-9/10 md:w-6/10 aspect-square rounded-full opacity-20 [background:radial-gradient(circle_at_center,var(--color-background-accent)_35%,transparent_70%)]">
      </div>
      <div
        className="absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2 w-9/10 md:w-6/10 aspect-square rounded-full opacity-20 [background:radial-gradient(circle_at_center,var(--color-background-accent)_35%,transparent_70%)]">
      </div>
    </div>
    <nav data-section="navbar" className="fixed z-1000 top-5 left-1/2 -translate-x-1/2 w-content-width">
      <div className="flex items-center justify-between p-2 xl:p-3 2xl:p-4 rounded backdrop-blur-sm card"><a href="/"
          className="pl-2 text-xl font-medium text-foreground">UMBRA</a>
        <div className="flex items-center gap-2 xl:gap-3 2xl:gap-4"><a href="#products"
            className="flex items-center justify-center h-10 px-6 text-sm rounded cursor-pointer primary-button text-primary-cta-text"
            style={{"transform": "none", }}>Shop Now</a>
          <div className="relative flex items-center justify-center size-9 rounded cursor-pointer primary-button"><span
              className="absolute w-3 h-px bg-primary-cta-text transition-all duration-300 -translate-y-1"></span><span
              className="absolute w-3 h-px bg-primary-cta-text transition-all duration-300 translate-y-1"></span></div>
        </div>
      </div>
    </nav>
    <div id="hero" data-section="hero">
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
              style={{"--ray-opacity": "0.85", "transform": "rotate(-18deg)", "animation": "4s ease-in-out 0s infinite normal both running rotated-ray-pulse", }}>
            </div>
            <div
              className="absolute -top-[352px] -bottom-[920px] left-[calc(50%-17.5px)] w-[35px] origin-top-right overflow-hidden bg-[radial-gradient(50%_50%_at_50%_50%,var(--color-background-accent)_0%,transparent_100%)]"
              style={{"--ray-opacity": "0.775", "transform": "rotate(-12deg)", "animation": "3.5s ease-in-out 0.5s infinite normal both running rotated-ray-pulse", }}>
            </div>
            <div
              className="absolute -top-[352px] -bottom-[920px] left-[calc(50%-10px)] w-[20px] origin-top-right overflow-hidden bg-[radial-gradient(50%_50%_at_50%_50%,var(--color-background-accent)_0%,transparent_100%)]"
              style={{"--ray-opacity": "0.65", "transform": "scale(0.9) rotate(-5deg)", "animation": "5s ease-in-out 1.2s infinite normal both running rotated-ray-pulse", }}>
            </div>
            <div
              className="absolute -top-[352px] -bottom-[920px] left-[calc(50%-7.5px)] w-[15px] origin-top-right overflow-hidden bg-[radial-gradient(50%_50%_at_50%_50%,var(--color-background-accent)_0%,transparent_100%)]"
              style={{"--ray-opacity": "0.25", "transform": "rotate(-3deg)", "animation": "3s ease-in-out 0.3s infinite normal both running rotated-ray-pulse", }}>
            </div>
            <div
              className="absolute -top-[352px] -bottom-[920px] left-[calc(50%-20px)] w-[40px] origin-top-right overflow-hidden bg-[radial-gradient(50%_50%_at_50%_50%,var(--color-background-accent)_0%,transparent_100%)]"
              style={{"--ray-opacity": "0.45", "transform": "scale(0.79) rotate(0deg)", "animation": "4.5s ease-in-out 0.8s infinite normal both running rotated-ray-pulse", }}>
            </div>
            <div
              className="absolute -top-[352px] -bottom-[920px] left-[calc(50%-10px)] w-[20px] origin-top-right overflow-hidden bg-[radial-gradient(50%_50%_at_50%_50%,var(--color-background-accent)_0%,transparent_100%)]"
              style={{"--ray-opacity": "0.45", "transform": "rotate(6deg)", "animation": "3.2s ease-in-out 1.5s infinite normal both running rotated-ray-pulse", }}>
            </div>
            <div
              className="absolute -top-[352px] -bottom-[920px] left-[calc(50%-17.5px)] w-[35px] origin-top-right overflow-hidden bg-[radial-gradient(50%_50%_at_50%_50%,var(--color-background-accent)_0%,transparent_100%)]"
              style={{"--ray-opacity": "0.65", "transform": "scale(0.83) rotate(9deg)", "animation": "4.2s ease-in-out 0.2s infinite normal both running rotated-ray-pulse", }}>
            </div>
            <div
              className="absolute -top-[352px] -bottom-[920px] left-[calc(50%-17.5px)] w-[35px] origin-top-right overflow-hidden bg-[radial-gradient(50%_50%_at_50%_50%,var(--color-background-accent)_0%,transparent_100%)]"
              style={{"--ray-opacity": "1", "transform": "scale(0.9) rotate(14deg)", "animation": "3.8s ease-in-out 1s infinite normal both running rotated-ray-pulse", }}>
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
        <div className="flex flex-col items-center gap-3 w-content-width mx-auto text-center">
          <div className="px-3 py-1 mb-1 text-sm card rounded w-fit">
            <p>Luxury Fragrance</p>
          </div>
          <h1
            className="bg-gradient-to-r from-foreground to-primary-cta bg-clip-text text-transparent pb-[0.1em] -mb-[0.1em] md:max-w-8/10 text-7xl 2xl:text-8xl leading-[1.15] font-semibold text-center text-balance">
            A Fragrance That Lingers Long After You Leave</h1>
          <p className="md:max-w-7/10 text-lg md:text-xl leading-snug text-balance">Discover our award-winning perfumes
            crafted with rare botanicals and master perfumery. Find your signature scent — the one they never forget.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-2 md:mt-3">
            <div style={{"opacity": "1", "transform": "none", }}><a href="#products"
                className="flex items-center justify-center h-10 px-6 text-sm rounded cursor-pointer primary-button text-primary-cta-text"
                style={{"transform": "none", }}>Explore Collection</a></div>
            <div style={{"opacity": "1", "transform": "none", }}><a href="#features"
                className="flex items-center justify-center h-10 px-6 text-sm rounded cursor-pointer secondary-button text-secondary-cta-text"
                style={{"transform": "none", }}>Our Craft</a></div>
          </div>
        </div>
        <div className="relative flex items-center justify-center w-full overflow-hidden">
          <div className="w-[70%] md:w-[40%] aspect-square md:aspect-video opacity-0"></div>
          <div
            className="absolute w-[70%] md:w-[40%] aspect-square md:aspect-video p-2 xl:p-3 2xl:p-4 card rounded-lg overflow-hidden"
            style={{"zIndex": "3", "opacity": "1", "transform": "translateX(-200%) translateY(10%) scale(0.8) rotate(-4deg)", }}><img
              alt="https://storage.googleapis.com/webild/default/templates/skincare-luxury/hero-2.webp"
              className="min-h-0 w-full h-full rounded-lg object-cover"
              src="https://storage.googleapis.com/webild/default/templates/skincare-luxury/hero-2.webp" />
            <div className="absolute inset-0 bg-background/50 backdrop-blur-[1px] pointer-events-none" style={{"opacity": "1", }}>
            </div>
          </div>
          <div
            className="absolute w-[70%] md:w-[40%] aspect-square md:aspect-video p-2 xl:p-3 2xl:p-4 card rounded-lg overflow-hidden"
            style={{"zIndex": "4", "opacity": "1", "transform": "translateX(-100%) translateY(5%) scale(0.88) rotate(-2deg)", }}><img
              alt="https://storage.googleapis.com/webild/default/templates/skincare-luxury/hero-3.webp"
              className="min-h-0 w-full h-full rounded-lg object-cover"
              src="https://storage.googleapis.com/webild/default/templates/skincare-luxury/hero-3.webp" />
            <div className="absolute inset-0 bg-background/50 backdrop-blur-[1px] pointer-events-none" style={{"opacity": "1", }}>
            </div>
          </div>
          <div
            className="absolute w-[70%] md:w-[40%] aspect-square md:aspect-video p-2 xl:p-3 2xl:p-4 card rounded-lg overflow-hidden"
            style={{"zIndex": "10", "opacity": "1", "transform": "none", }}><img
              alt="https://storage.googleapis.com/webild/default/templates/skincare-luxury/hero-4.webp"
              className="min-h-0 w-full h-full rounded-lg object-cover"
              src="https://storage.googleapis.com/webild/default/templates/skincare-luxury/hero-4.webp" />
            <div className="absolute inset-0 bg-background/50 backdrop-blur-[1px] pointer-events-none" style={{"opacity": "0", }}>
            </div>
          </div>
          <div
            className="absolute w-[70%] md:w-[40%] aspect-square md:aspect-video p-2 xl:p-3 2xl:p-4 card rounded-lg overflow-hidden"
            style={{"zIndex": "4", "opacity": "1", "transform": "translateX(100%) translateY(5%) scale(0.88) rotate(2deg)", }}><img
              alt="https://storage.googleapis.com/webild/default/templates/skincare-luxury/hero-5.webp"
              className="min-h-0 w-full h-full rounded-lg object-cover"
              src="https://storage.googleapis.com/webild/default/templates/skincare-luxury/hero-5.webp" />
            <div className="absolute inset-0 bg-background/50 backdrop-blur-[1px] pointer-events-none" style={{"opacity": "1", }}>
            </div>
          </div>
          <div
            className="absolute w-[70%] md:w-[40%] aspect-square md:aspect-video p-2 xl:p-3 2xl:p-4 card rounded-lg overflow-hidden"
            style={{"zIndex": "3", "opacity": "1", "transform": "translateX(200%) translateY(10%) scale(0.8) rotate(4deg)", }}><img
              alt="https://storage.googleapis.com/webild/default/templates/skincare-luxury/hero-6.webp"
              className="min-h-0 w-full h-full rounded-lg object-cover"
              src="https://storage.googleapis.com/webild/default/templates/skincare-luxury/hero-6.webp" />
            <div className="absolute inset-0 bg-background/50 backdrop-blur-[1px] pointer-events-none" style={{"opacity": "1", }}>
            </div>
          </div>
        </div>
      </section>
    </div>
    <div id="products" data-section="products">
      <section aria-label="Products section" className="py-20">
        <div className="flex flex-col gap-8 md:gap-10">
          <div className="flex flex-col items-center w-content-width mx-auto gap-2">
            <div className="px-3 py-1 mb-1 text-sm card rounded w-fit">
              <p>Best Sellers</p>
            </div>
            <h2
              className="bg-gradient-to-r from-foreground to-primary-cta bg-clip-text text-transparent pb-[0.1em] -mb-[0.1em] md:max-w-8/10 text-6xl 2xl:text-7xl leading-[1.15] font-semibold text-center text-balance">
              Featured Collection</h2>
            <p className="md:max-w-7/10 text-lg md:text-xl leading-snug text-center text-balance">Discover our bestselling
              fragrances composed with rare essences and the finest ingredients from around the world.</p>
          </div>
          <div className="" style={{"opacity": "1", "transform": "none", }}>
            <div className="hidden 2xl:grid grid-cols-4 gap-5 mx-auto w-content-width"><button
                className="group h-full flex flex-col gap-3 xl:gap-3.5 2xl:gap-4 p-3 xl:p-3.5 2xl:p-4 text-left card rounded cursor-pointer">
                <div className="relative aspect-square rounded overflow-hidden"><img
                    alt="https://storage.googleapis.com/webild/default/templates/skincare-luxury/product-1.webp"
                    className="min-h-0 rounded size-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src="https://storage.googleapis.com/webild/default/templates/skincare-luxury/product-1.webp" />
                  <div
                    className="absolute inset-0 flex items-center justify-center group-hover:bg-background/20 group-hover:backdrop-blur-xs transition-all duration-300">
                    <div
                      className="flex items-center justify-center size-12 rounded-full primary-button opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        className="lucide lucide-arrow-up-right size-5 text-primary-cta-text" aria-hidden={true}>
                        <path d="M7 7h10v10"></path>
                        <path d="M7 17 17 7"></path>
                      </svg></div>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-3 p-3 xl:p-3.5 2xl:p-4">
                  <div className="flex flex-col gap-1 flex-1 min-w-0">
                    <h3 className="text-2xl font-semibold truncate leading-snug text-balance">Solum Eau de Parfum</h3>
                    <p className="text-base text-foreground/75 truncate">50ml • Earthy &amp; Warm</p>
                  </div><span className="text-xl font-medium shrink-0">$185</span>
                </div>
              </button><button
                className="group h-full flex flex-col gap-3 xl:gap-3.5 2xl:gap-4 p-3 xl:p-3.5 2xl:p-4 text-left card rounded cursor-pointer">
                <div className="relative aspect-square rounded overflow-hidden"><img
                    alt="https://storage.googleapis.com/webild/default/templates/skincare-luxury/product-2.webp"
                    className="min-h-0 rounded size-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src="https://storage.googleapis.com/webild/default/templates/skincare-luxury/product-2.webp" />
                  <div
                    className="absolute inset-0 flex items-center justify-center group-hover:bg-background/20 group-hover:backdrop-blur-xs transition-all duration-300">
                    <div
                      className="flex items-center justify-center size-12 rounded-full primary-button opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        className="lucide lucide-arrow-up-right size-5 text-primary-cta-text" aria-hidden={true}>
                        <path d="M7 7h10v10"></path>
                        <path d="M7 17 17 7"></path>
                      </svg></div>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-3 p-3 xl:p-3.5 2xl:p-4">
                  <div className="flex flex-col gap-1 flex-1 min-w-0">
                    <h3 className="text-2xl font-semibold truncate leading-snug text-balance">Aura Eau de Parfum</h3>
                    <p className="text-base text-foreground/75 truncate">50ml • Floral &amp; Soft</p>
                  </div><span className="text-xl font-medium shrink-0">$165</span>
                </div>
              </button><button
                className="group h-full flex flex-col gap-3 xl:gap-3.5 2xl:gap-4 p-3 xl:p-3.5 2xl:p-4 text-left card rounded cursor-pointer">
                <div className="relative aspect-square rounded overflow-hidden"><img
                    alt="https://storage.googleapis.com/webild/default/templates/skincare-luxury/product-3.webp"
                    className="min-h-0 rounded size-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src="https://storage.googleapis.com/webild/default/templates/skincare-luxury/product-3.webp" />
                  <div
                    className="absolute inset-0 flex items-center justify-center group-hover:bg-background/20 group-hover:backdrop-blur-xs transition-all duration-300">
                    <div
                      className="flex items-center justify-center size-12 rounded-full primary-button opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        className="lucide lucide-arrow-up-right size-5 text-primary-cta-text" aria-hidden={true}>
                        <path d="M7 7h10v10"></path>
                        <path d="M7 17 17 7"></path>
                      </svg></div>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-3 p-3 xl:p-3.5 2xl:p-4">
                  <div className="flex flex-col gap-1 flex-1 min-w-0">
                    <h3 className="text-2xl font-semibold truncate leading-snug text-balance">Velour Body Mist</h3>
                    <p className="text-base text-foreground/75 truncate">100ml • Light &amp; Fresh</p>
                  </div><span className="text-xl font-medium shrink-0">$125</span>
                </div>
              </button><button
                className="group h-full flex flex-col gap-3 xl:gap-3.5 2xl:gap-4 p-3 xl:p-3.5 2xl:p-4 text-left card rounded cursor-pointer">
                <div className="relative aspect-square rounded overflow-hidden"><img
                    alt="https://storage.googleapis.com/webild/default/templates/skincare-luxury/product-4.webp"
                    className="min-h-0 rounded size-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src="https://storage.googleapis.com/webild/default/templates/skincare-luxury/product-4.webp" />
                  <div
                    className="absolute inset-0 flex items-center justify-center group-hover:bg-background/20 group-hover:backdrop-blur-xs transition-all duration-300">
                    <div
                      className="flex items-center justify-center size-12 rounded-full primary-button opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        className="lucide lucide-arrow-up-right size-5 text-primary-cta-text" aria-hidden={true}>
                        <path d="M7 7h10v10"></path>
                        <path d="M7 17 17 7"></path>
                      </svg></div>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-3 p-3 xl:p-3.5 2xl:p-4">
                  <div className="flex flex-col gap-1 flex-1 min-w-0">
                    <h3 className="text-2xl font-semibold truncate leading-snug text-balance">Noir Absolu Parfum</h3>
                    <p className="text-base text-foreground/75 truncate">30ml • Rich &amp; Intense</p>
                  </div><span className="text-xl font-medium shrink-0">$195</span>
                </div>
              </button></div>
            <div className="flex flex-col gap-5 w-full overflow-hidden 2xl:hidden">
              <div className="w-full cursor-grab">
                <div className="flex gap-4 items-stretch" style={{"transform": "translate3d(0px, 0px, 0px)", }}>
                  <div className="shrink-0 w-carousel-padding"></div>
                  <div className="shrink-0 *:h-full w-carousel-item-3 2xl:w-carousel-item-4"><button
                      className="group h-full flex flex-col gap-3 xl:gap-3.5 2xl:gap-4 p-3 xl:p-3.5 2xl:p-4 text-left card rounded cursor-pointer">
                      <div className="relative aspect-square rounded overflow-hidden"><img
                          alt="https://storage.googleapis.com/webild/default/templates/skincare-luxury/product-1.webp"
                          className="min-h-0 rounded size-full object-cover transition-transform duration-500 group-hover:scale-105"
                          src="https://storage.googleapis.com/webild/default/templates/skincare-luxury/product-1.webp" />
                        <div
                          className="absolute inset-0 flex items-center justify-center group-hover:bg-background/20 group-hover:backdrop-blur-xs transition-all duration-300">
                          <div
                            className="flex items-center justify-center size-12 rounded-full primary-button opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                              fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                              strokeLinejoin="round" className="lucide lucide-arrow-up-right size-5 text-primary-cta-text"
                              aria-hidden={true}>
                              <path d="M7 7h10v10"></path>
                              <path d="M7 17 17 7"></path>
                            </svg></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-3 p-3 xl:p-3.5 2xl:p-4">
                        <div className="flex flex-col gap-1 flex-1 min-w-0">
                          <h3 className="text-2xl font-semibold truncate leading-snug text-balance">Solum Eau de Parfum</h3>
                          <p className="text-base text-foreground/75 truncate">50ml • Earthy &amp; Warm</p>
                        </div><span className="text-xl font-medium shrink-0">$185</span>
                      </div>
                    </button></div>
                  <div className="shrink-0 *:h-full w-carousel-item-3 2xl:w-carousel-item-4"><button
                      className="group h-full flex flex-col gap-3 xl:gap-3.5 2xl:gap-4 p-3 xl:p-3.5 2xl:p-4 text-left card rounded cursor-pointer">
                      <div className="relative aspect-square rounded overflow-hidden"><img
                          alt="https://storage.googleapis.com/webild/default/templates/skincare-luxury/product-2.webp"
                          className="min-h-0 rounded size-full object-cover transition-transform duration-500 group-hover:scale-105"
                          src="https://storage.googleapis.com/webild/default/templates/skincare-luxury/product-2.webp" />
                        <div
                          className="absolute inset-0 flex items-center justify-center group-hover:bg-background/20 group-hover:backdrop-blur-xs transition-all duration-300">
                          <div
                            className="flex items-center justify-center size-12 rounded-full primary-button opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                              fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                              strokeLinejoin="round" className="lucide lucide-arrow-up-right size-5 text-primary-cta-text"
                              aria-hidden={true}>
                              <path d="M7 7h10v10"></path>
                              <path d="M7 17 17 7"></path>
                            </svg></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-3 p-3 xl:p-3.5 2xl:p-4">
                        <div className="flex flex-col gap-1 flex-1 min-w-0">
                          <h3 className="text-2xl font-semibold truncate leading-snug text-balance">Aura Eau de Parfum</h3>
                          <p className="text-base text-foreground/75 truncate">50ml • Floral &amp; Soft</p>
                        </div><span className="text-xl font-medium shrink-0">$165</span>
                      </div>
                    </button></div>
                  <div className="shrink-0 *:h-full w-carousel-item-3 2xl:w-carousel-item-4"><button
                      className="group h-full flex flex-col gap-3 xl:gap-3.5 2xl:gap-4 p-3 xl:p-3.5 2xl:p-4 text-left card rounded cursor-pointer">
                      <div className="relative aspect-square rounded overflow-hidden"><img
                          alt="https://storage.googleapis.com/webild/default/templates/skincare-luxury/product-3.webp"
                          className="min-h-0 rounded size-full object-cover transition-transform duration-500 group-hover:scale-105"
                          src="https://storage.googleapis.com/webild/default/templates/skincare-luxury/product-3.webp" />
                        <div
                          className="absolute inset-0 flex items-center justify-center group-hover:bg-background/20 group-hover:backdrop-blur-xs transition-all duration-300">
                          <div
                            className="flex items-center justify-center size-12 rounded-full primary-button opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                              fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                              strokeLinejoin="round" className="lucide lucide-arrow-up-right size-5 text-primary-cta-text"
                              aria-hidden={true}>
                              <path d="M7 7h10v10"></path>
                              <path d="M7 17 17 7"></path>
                            </svg></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-3 p-3 xl:p-3.5 2xl:p-4">
                        <div className="flex flex-col gap-1 flex-1 min-w-0">
                          <h3 className="text-2xl font-semibold truncate leading-snug text-balance">Velour Body Mist</h3>
                          <p className="text-base text-foreground/75 truncate">100ml • Light &amp; Fresh</p>
                        </div><span className="text-xl font-medium shrink-0">$125</span>
                      </div>
                    </button></div>
                  <div className="shrink-0 *:h-full w-carousel-item-3 2xl:w-carousel-item-4"><button
                      className="group h-full flex flex-col gap-3 xl:gap-3.5 2xl:gap-4 p-3 xl:p-3.5 2xl:p-4 text-left card rounded cursor-pointer">
                      <div className="relative aspect-square rounded overflow-hidden"><img
                          alt="https://storage.googleapis.com/webild/default/templates/skincare-luxury/product-4.webp"
                          className="min-h-0 rounded size-full object-cover transition-transform duration-500 group-hover:scale-105"
                          src="https://storage.googleapis.com/webild/default/templates/skincare-luxury/product-4.webp" />
                        <div
                          className="absolute inset-0 flex items-center justify-center group-hover:bg-background/20 group-hover:backdrop-blur-xs transition-all duration-300">
                          <div
                            className="flex items-center justify-center size-12 rounded-full primary-button opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                              fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                              strokeLinejoin="round" className="lucide lucide-arrow-up-right size-5 text-primary-cta-text"
                              aria-hidden={true}>
                              <path d="M7 7h10v10"></path>
                              <path d="M7 17 17 7"></path>
                            </svg></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-3 p-3 xl:p-3.5 2xl:p-4">
                        <div className="flex flex-col gap-1 flex-1 min-w-0">
                          <h3 className="text-2xl font-semibold truncate leading-snug text-balance">Noir Absolu Parfum</h3>
                          <p className="text-base text-foreground/75 truncate">30ml • Rich &amp; Intense</p>
                        </div><span className="text-xl font-medium shrink-0">$195</span>
                      </div>
                    </button></div>
                  <div className="shrink-0 w-carousel-padding"></div>
                </div>
              </div>
              <div className="flex w-full">
                <div className="shrink-0 w-carousel-padding-controls"></div>
                <div className="flex justify-between items-center w-full">
                  <div className="relative h-2 w-1/2 card rounded overflow-hidden">
                    <div className="absolute top-0 bottom-0 -left-full w-full primary-button rounded"
                      style={{"transform": "translate3d(0%, 0px, 0px)", }}></div>
                  </div>
                  <div className="flex items-center gap-3"><button disabled={true} type="button" aria-label="Previous"
                      className="flex items-center justify-center h-8 aspect-square secondary-button rounded cursor-pointer disabled:opacity-50"><svg
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        className="lucide lucide-chevron-left h-2/5 aspect-square text-secondary-cta-text"
                        aria-hidden={true}>
                        <path d="m15 18-6-6 6-6"></path>
                      </svg></button><button type="button" aria-label="Next"
                      className="flex items-center justify-center h-8 aspect-square secondary-button rounded cursor-pointer disabled:opacity-50"><svg
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        className="lucide lucide-chevron-right h-2/5 aspect-square text-secondary-cta-text"
                        aria-hidden={true}>
                        <path d="m9 18 6-6-6-6"></path>
                      </svg></button></div>
                </div>
                <div className="shrink-0 w-carousel-padding-controls"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <div id="features" data-section="features">
      <section aria-label="Features section" className="py-20">
        <div className="flex flex-col gap-8 md:gap-10">
          <div className="flex flex-col items-center w-content-width mx-auto gap-2">
            <div className="px-3 py-1 mb-1 text-sm card rounded w-fit">
              <p>Perfumery Craft</p>
            </div>
            <h2
              className="bg-gradient-to-r from-foreground to-primary-cta bg-clip-text text-transparent pb-[0.1em] -mb-[0.1em] md:max-w-8/10 text-6xl 2xl:text-7xl leading-[1.15] font-semibold text-center text-balance">
              The Art Behind Our Fragrances</h2>
            <p className="md:max-w-7/10 text-lg md:text-xl leading-snug text-center text-balance">Each perfume is
              meticulously composed with rare essences and noble raw materials to create scents that captivate and
              endure.</p>
          </div>
          <div className="flex flex-col gap-5 md:gap-[6vh] w-content-width mx-auto">
            <div
              className="sticky top-[25vw] md:top-[12.5vh] h-[140vw] md:h-[75vh] flex flex-col gap-6 md:gap-10 p-6 md:p-10 card rounded md:flex-row"
              style={{"willChange": "opacity", "opacity": "1", }}>
              <div className="flex flex-col justify-center w-full md:w-1/2 gap-2">
                <div
                  className="flex items-center justify-center size-9 mb-1 text-sm rounded primary-button text-primary-cta-text">
                  <p>1</p>
                </div>
                <h3 className="text-4xl md:text-5xl font-semibold leading-[1.15] text-balance">Rare Ingredient Sourcing</h3>
                <p className="text-base md:text-lg leading-snug text-balance">We source precious essences from sustainable
                  fields worldwide — Grasse rose, Madagascan vanilla, and Italian bergamot at their peak.</p>
              </div>
              <div className="w-full md:w-1/2 aspect-square rounded overflow-hidden"><img
                  alt="https://storage.googleapis.com/webild/default/templates/skincare-luxury/features/feature-1.webp"
                  className="w-full h-full min-h-0 object-cover rounded"
                  src="https://storage.googleapis.com/webild/default/templates/skincare-luxury/features/feature-1.webp" />
              </div>
            </div>
            <div
              className="sticky top-[25vw] md:top-[12.5vh] h-[140vw] md:h-[75vh] flex flex-col gap-6 md:gap-10 p-6 md:p-10 card rounded md:flex-row-reverse"
              style={{"willChange": "opacity", "opacity": "1", }}>
              <div className="flex flex-col justify-center w-full md:w-1/2 gap-2">
                <div
                  className="flex items-center justify-center size-9 mb-1 text-sm rounded primary-button text-primary-cta-text">
                  <p>2</p>
                </div>
                <h3 className="text-4xl md:text-5xl font-semibold leading-[1.15] text-balance">Master Perfumers</h3>
                <p className="text-base md:text-lg leading-snug text-balance">Every composition is crafted by world-renowned
                  noses who balance top, heart, and base notes into unforgettable olfactory journeys.</p>
              </div>
              <div className="w-full md:w-1/2 aspect-square rounded overflow-hidden"><img
                  alt="https://storage.googleapis.com/webild/default/templates/skincare-luxury/features/feature-2.webp"
                  className="w-full h-full min-h-0 object-cover rounded"
                  src="https://storage.googleapis.com/webild/default/templates/skincare-luxury/features/feature-2.webp" />
              </div>
            </div>
            <div
              className="sticky top-[25vw] md:top-[12.5vh] h-[140vw] md:h-[75vh] flex flex-col gap-6 md:gap-10 p-6 md:p-10 card rounded md:flex-row"
              style={{"willChange": "opacity", "opacity": "1", }}>
              <div className="flex flex-col justify-center w-full md:w-1/2 gap-2">
                <div
                  className="flex items-center justify-center size-9 mb-1 text-sm rounded primary-button text-primary-cta-text">
                  <p>3</p>
                </div>
                <h3 className="text-4xl md:text-5xl font-semibold leading-[1.15] text-balance">Lasting Sillage</h3>
                <p className="text-base md:text-lg leading-snug text-balance">Our concentrated formulas are designed for
                  exceptional longevity — a single application carries you beautifully from dawn to dusk.</p>
              </div>
              <div className="w-full md:w-1/2 aspect-square rounded overflow-hidden"><img
                  alt="https://storage.googleapis.com/webild/default/templates/skincare-luxury/features/feature-3.webp"
                  className="w-full h-full min-h-0 object-cover rounded"
                  src="https://storage.googleapis.com/webild/default/templates/skincare-luxury/features/feature-3.webp" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <div id="influencers" data-section="influencers">
      <section aria-label="Features section" className="py-20">
        <div className="flex flex-col gap-8 md:gap-10">
          <div className="flex flex-col items-center w-content-width mx-auto gap-2">
            <div className="px-3 py-1 mb-1 text-sm card rounded w-fit">
              <p>Community</p>
            </div>
            <h2
              className="bg-gradient-to-r from-foreground to-primary-cta bg-clip-text text-transparent pb-[0.1em] -mb-[0.1em] md:max-w-8/10 text-6xl 2xl:text-7xl leading-[1.15] font-semibold text-center text-balance">
              Worn By Those Who Set The Standard</h2>
            <p className="md:max-w-7/10 text-lg md:text-xl leading-snug text-center text-balance">The women shaping culture
              choose UMBRA as their signature.</p>
          </div>
          <div className="" style={{"opacity": "1", "transform": "none", }}>
            <div className="flex flex-col gap-5 w-full overflow-hidden">
              <div className="w-full cursor-grab">
                <div className="flex gap-4 items-stretch" style={{"transform": "translate3d(0px, 0px, 0px)", }}>
                  <div className="shrink-0 w-carousel-padding"></div>
                  <div className="shrink-0 *:h-full w-carousel-item-3 2xl:w-carousel-item-4">
                    <div className="flex flex-col gap-3 xl:gap-3.5 2xl:gap-4 p-3 xl:p-3.5 2xl:p-4 h-full card rounded">
                      <div className="aspect-square rounded overflow-hidden button-secondary shadow shadow-foreground/5">
                        <video
                          src="https://storage.googleapis.com/webild/default/templates/skincare-luxury/influencer-amara.mp4"
                          aria-label="https://storage.googleapis.com/webild/default/templates/skincare-luxury/influencer-amara.mp4"
                          className="w-full h-full min-h-0 object-cover rounded" autoPlay={true} loop="" playsInline={true}></video>
                      </div>
                      <div className="flex flex-col gap-1 p-3 xl:p-3.5 2xl:p-4">
                        <h3 className="text-2xl font-semibold leading-snug">Amara Osei</h3>
                        <p className="text-base leading-snug"> </p>
                      </div>
                    </div>
                  </div>
                  <div className="shrink-0 *:h-full w-carousel-item-3 2xl:w-carousel-item-4">
                    <div className="flex flex-col gap-3 xl:gap-3.5 2xl:gap-4 p-3 xl:p-3.5 2xl:p-4 h-full card rounded">
                      <div className="aspect-square rounded overflow-hidden button-secondary shadow shadow-foreground/5">
                        <video
                          src="https://storage.googleapis.com/webild/default/templates/skincare-luxury/influencer-chloe.mp4"
                          aria-label="https://storage.googleapis.com/webild/default/templates/skincare-luxury/influencer-chloe.mp4"
                          className="w-full h-full min-h-0 object-cover rounded" autoPlay={true} loop="" playsInline={true}></video>
                      </div>
                      <div className="flex flex-col gap-1 p-3 xl:p-3.5 2xl:p-4">
                        <h3 className="text-2xl font-semibold leading-snug">Chloe Marchand</h3>
                        <p className="text-base leading-snug"> </p>
                      </div>
                    </div>
                  </div>
                  <div className="shrink-0 *:h-full w-carousel-item-3 2xl:w-carousel-item-4">
                    <div className="flex flex-col gap-3 xl:gap-3.5 2xl:gap-4 p-3 xl:p-3.5 2xl:p-4 h-full card rounded">
                      <div className="aspect-square rounded overflow-hidden button-secondary shadow shadow-foreground/5">
                        <video
                          src="https://storage.googleapis.com/webild/default/templates/skincare-luxury/influencer-elena.mp4"
                          aria-label="https://storage.googleapis.com/webild/default/templates/skincare-luxury/influencer-elena.mp4"
                          className="w-full h-full min-h-0 object-cover rounded" autoPlay={true} loop="" playsInline={true}></video>
                      </div>
                      <div className="flex flex-col gap-1 p-3 xl:p-3.5 2xl:p-4">
                        <h3 className="text-2xl font-semibold leading-snug">Elena Vasquez</h3>
                        <p className="text-base leading-snug"> </p>
                      </div>
                    </div>
                  </div>
                  <div className="shrink-0 *:h-full w-carousel-item-3 2xl:w-carousel-item-4">
                    <div className="flex flex-col gap-3 xl:gap-3.5 2xl:gap-4 p-3 xl:p-3.5 2xl:p-4 h-full card rounded">
                      <div className="aspect-square rounded overflow-hidden button-secondary shadow shadow-foreground/5">
                        <video
                          src="https://storage.googleapis.com/webild/default/templates/skincare-luxury/influencer-isla.mp4"
                          aria-label="https://storage.googleapis.com/webild/default/templates/skincare-luxury/influencer-isla.mp4"
                          className="w-full h-full min-h-0 object-cover rounded" autoPlay={true} loop="" playsInline={true}></video>
                      </div>
                      <div className="flex flex-col gap-1 p-3 xl:p-3.5 2xl:p-4">
                        <h3 className="text-2xl font-semibold leading-snug">Isla Montgomery</h3>
                        <p className="text-base leading-snug"> </p>
                      </div>
                    </div>
                  </div>
                  <div className="shrink-0 *:h-full w-carousel-item-3 2xl:w-carousel-item-4">
                    <div className="flex flex-col gap-3 xl:gap-3.5 2xl:gap-4 p-3 xl:p-3.5 2xl:p-4 h-full card rounded">
                      <div className="aspect-square rounded overflow-hidden button-secondary shadow shadow-foreground/5">
                        <video
                          src="https://storage.googleapis.com/webild/default/templates/skincare-luxury/influencer-zara.mp4"
                          aria-label="https://storage.googleapis.com/webild/default/templates/skincare-luxury/influencer-zara.mp4"
                          className="w-full h-full min-h-0 object-cover rounded" autoPlay={true} loop="" playsInline={true}></video>
                      </div>
                      <div className="flex flex-col gap-1 p-3 xl:p-3.5 2xl:p-4">
                        <h3 className="text-2xl font-semibold leading-snug">Zara Kimani</h3>
                        <p className="text-base leading-snug"> </p>
                      </div>
                    </div>
                  </div>
                  <div className="shrink-0 *:h-full w-carousel-item-3 2xl:w-carousel-item-4">
                    <div className="flex flex-col gap-3 xl:gap-3.5 2xl:gap-4 p-3 xl:p-3.5 2xl:p-4 h-full card rounded">
                      <div className="aspect-square rounded overflow-hidden button-secondary shadow shadow-foreground/5">
                        <video
                          src="https://storage.googleapis.com/webild/default/templates/skincare-luxury/influencer-nadia.mp4"
                          aria-label="https://storage.googleapis.com/webild/default/templates/skincare-luxury/influencer-nadia.mp4"
                          className="w-full h-full min-h-0 object-cover rounded" autoPlay={true} loop="" playsInline={true}></video>
                      </div>
                      <div className="flex flex-col gap-1 p-3 xl:p-3.5 2xl:p-4">
                        <h3 className="text-2xl font-semibold leading-snug">Nadia Petrova</h3>
                        <p className="text-base leading-snug"> </p>
                      </div>
                    </div>
                  </div>
                  <div className="shrink-0 w-carousel-padding"></div>
                </div>
              </div>
              <div className="flex w-full">
                <div className="shrink-0 w-carousel-padding-controls"></div>
                <div className="flex justify-between items-center w-full">
                  <div className="relative h-2 w-1/2 card rounded overflow-hidden">
                    <div className="absolute top-0 bottom-0 -left-full w-full primary-button rounded"
                      style={{"transform": "translate3d(0%, 0px, 0px)", }}></div>
                  </div>
                  <div className="flex items-center gap-3"><button disabled={true} type="button" aria-label="Previous"
                      className="flex items-center justify-center h-8 aspect-square secondary-button rounded cursor-pointer disabled:opacity-50"><svg
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        className="lucide lucide-chevron-left h-2/5 aspect-square text-secondary-cta-text"
                        aria-hidden={true}>
                        <path d="m15 18-6-6 6-6"></path>
                      </svg></button><button type="button" aria-label="Next"
                      className="flex items-center justify-center h-8 aspect-square secondary-button rounded cursor-pointer disabled:opacity-50"><svg
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        className="lucide lucide-chevron-right h-2/5 aspect-square text-secondary-cta-text"
                        aria-hidden={true}>
                        <path d="m9 18 6-6-6-6"></path>
                      </svg></button></div>
                </div>
                <div className="shrink-0 w-carousel-padding-controls"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <div id="blog" data-section="blog">
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
                    src="https://storage.googleapis.com/webild/default/templates/skincare-luxury/blog/blog-1.webp" />
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
                      src="https://storage.googleapis.com/webild/default/templates/skincare-luxury/blog/authors/author-1.webp" />
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
                    src="https://storage.googleapis.com/webild/default/templates/skincare-luxury/blog/blog-2.webp" />
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
                      src="https://storage.googleapis.com/webild/default/templates/skincare-luxury/blog/authors/author-2.webp" />
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
                    src="https://storage.googleapis.com/webild/default/templates/skincare-luxury/blog/blog-3.webp" />
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
                      src="https://storage.googleapis.com/webild/default/templates/skincare-luxury/blog/authors/author-3.webp" />
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
    </div>
    <div id="faq" data-section="faq">
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
                src="https://storage.googleapis.com/webild/default/templates/skincare-luxury/faq-image.webp" /></div>
            <div className="md:col-span-3 flex flex-col gap-3 xl:gap-3.5 2xl:gap-4" style={{"opacity": "1", "transform": "none", }}>
              <div className="p-3 xl:p-3.5 2xl:p-4 rounded card cursor-pointer select-none">
                <div className="flex items-center justify-between gap-3 xl:gap-3.5 2xl:gap-4">
                  <h3 className="text-lg md:text-xl font-medium leading-snug">What makes UMBRA fragrances different from
                    other luxury brands?</h3>
                  <div className="flex shrink-0 items-center justify-center size-8 md:size-9 rounded primary-button"><svg
                      xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      className="lucide lucide-plus size-3.5 md:size-4 text-primary-cta-text transition-transform duration-300"
                      aria-hidden={true}>
                      <path d="M5 12h14"></path>
                      <path d="M12 5v14"></path>
                    </svg></div>
                </div>
              </div>
              <div className="p-3 xl:p-3.5 2xl:p-4 rounded card cursor-pointer select-none">
                <div className="flex items-center justify-between gap-3 xl:gap-3.5 2xl:gap-4">
                  <h3 className="text-lg md:text-xl font-medium leading-snug">How long does the fragrance last on skin?</h3>
                  <div className="flex shrink-0 items-center justify-center size-8 md:size-9 rounded primary-button"><svg
                      xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      className="lucide lucide-plus size-3.5 md:size-4 text-primary-cta-text transition-transform duration-300"
                      aria-hidden={true}>
                      <path d="M5 12h14"></path>
                      <path d="M12 5v14"></path>
                    </svg></div>
                </div>
              </div>
              <div className="p-3 xl:p-3.5 2xl:p-4 rounded card cursor-pointer select-none">
                <div className="flex items-center justify-between gap-3 xl:gap-3.5 2xl:gap-4">
                  <h3 className="text-lg md:text-xl font-medium leading-snug">Are your fragrances suitable for sensitive
                    skin?</h3>
                  <div className="flex shrink-0 items-center justify-center size-8 md:size-9 rounded primary-button"><svg
                      xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      className="lucide lucide-plus size-3.5 md:size-4 text-primary-cta-text transition-transform duration-300"
                      aria-hidden={true}>
                      <path d="M5 12h14"></path>
                      <path d="M12 5v14"></path>
                    </svg></div>
                </div>
              </div>
              <div className="p-3 xl:p-3.5 2xl:p-4 rounded card cursor-pointer select-none">
                <div className="flex items-center justify-between gap-3 xl:gap-3.5 2xl:gap-4">
                  <h3 className="text-lg md:text-xl font-medium leading-snug">Do you offer a satisfaction guarantee?</h3>
                  <div className="flex shrink-0 items-center justify-center size-8 md:size-9 rounded primary-button"><svg
                      xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      className="lucide lucide-plus size-3.5 md:size-4 text-primary-cta-text transition-transform duration-300"
                      aria-hidden={true}>
                      <path d="M5 12h14"></path>
                      <path d="M12 5v14"></path>
                    </svg></div>
                </div>
              </div>
              <div className="p-3 xl:p-3.5 2xl:p-4 rounded card cursor-pointer select-none">
                <div className="flex items-center justify-between gap-3 xl:gap-3.5 2xl:gap-4">
                  <h3 className="text-lg md:text-xl font-medium leading-snug">Are your ingredients natural or synthetic?
                  </h3>
                  <div className="flex shrink-0 items-center justify-center size-8 md:size-9 rounded primary-button"><svg
                      xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      className="lucide lucide-plus size-3.5 md:size-4 text-primary-cta-text transition-transform duration-300"
                      aria-hidden={true}>
                      <path d="M5 12h14"></path>
                      <path d="M12 5v14"></path>
                    </svg></div>
                </div>
              </div>
              <div className="p-3 xl:p-3.5 2xl:p-4 rounded card cursor-pointer select-none">
                <div className="flex items-center justify-between gap-3 xl:gap-3.5 2xl:gap-4">
                  <h3 className="text-lg md:text-xl font-medium leading-snug">How do I choose the right fragrance for me?
                  </h3>
                  <div className="flex shrink-0 items-center justify-center size-8 md:size-9 rounded primary-button"><svg
                      xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      className="lucide lucide-plus size-3.5 md:size-4 text-primary-cta-text transition-transform duration-300"
                      aria-hidden={true}>
                      <path d="M5 12h14"></path>
                      <path d="M12 5v14"></path>
                    </svg></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <div id="contact" data-section="contact">
      <section aria-label="Contact section" className="py-20">
        <div className="w-content-width mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5" style={{"opacity": "1", "transform": "none", }}>
            <div className="p-6 md:p-10 card rounded">
              <form className="flex flex-col gap-6">
                <div className="flex flex-col items-center gap-2 text-center">
                  <div className="px-3 py-1 mb-1 text-sm card rounded w-fit">
                    <p>Contact</p>
                  </div>
                  <h2
                    className="bg-gradient-to-r from-foreground to-primary-cta bg-clip-text text-transparent pb-[0.1em] -mb-[0.1em] text-6xl 2xl:text-7xl leading-[1.15] font-semibold text-balance">
                    Get in Touch</h2>
                  <p className="text-lg md:text-xl leading-snug text-balance">Have a question or looking for your signature
                    scent? We'd love to hear from you.</p>
                </div>
                <div className="flex flex-col gap-3"><input placeholder="Your name" required={true} aria-label="Your name"
                    className="w-full px-5 py-3 text-base bg-transparent placeholder:opacity-75 focus:outline-none card rounded"
                    type="text" value="" /><input placeholder="your@email.com" required={true} aria-label="your@email.com"
                    className="w-full px-5 py-3 text-base bg-transparent placeholder:opacity-75 focus:outline-none card rounded"
                    type="email" value="" /><input placeholder="+1 (555) 000-0000" aria-label="+1 (555) 000-0000"
                    className="w-full px-5 py-3 text-base bg-transparent placeholder:opacity-75 focus:outline-none card rounded"
                    type="tel" value="" /><input placeholder="How can we help?" required={true} aria-label="How can we help?"
                    className="w-full px-5 py-3 text-base bg-transparent placeholder:opacity-75 focus:outline-none card rounded"
                    type="text" value="" /><textarea placeholder="Tell us about your fragrance preferences..." required={true}
                    rows="5" aria-label="Tell us about your fragrance preferences..."
                    className="w-full px-5 py-3 text-base bg-transparent placeholder:opacity-75 focus:outline-none resize-none card rounded"></textarea><button
                    type="submit"
                    className="flex items-center justify-center w-full h-10 px-6 text-sm primary-button text-primary-cta-text rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">Send
                    Message</button></div>
              </form>
            </div>
            <div className="h-100 md:h-auto card rounded overflow-hidden"><img
                alt="https://storage.googleapis.com/webild/default/templates/skincare-luxury/contact.webp"
                className="min-h-0 size-full object-cover rounded"
                src="https://storage.googleapis.com/webild/default/templates/skincare-luxury/contact.webp" /></div>
          </div>
        </div>
      </section>
    </div>
    <footer data-section="footer" aria-label="Site footer"
      className="w-full py-15 mt-20 rounded-t-lg overflow-hidden primary-button text-primary-cta-text">
      <div className="w-content-width mx-auto flex flex-col gap-10 md:gap-20">
        <div className="w-full min-w-0 flex-1 py-10">
          <h2 className="whitespace-nowrap transition-opacity duration-150 opacity-100 font-semibold"
            style={{"lineHeight": "0.8", "fontSize": "304.311px", }}>UMBRA</h2>
        </div>
        <div className="flex flex-col gap-8 mb-10 md:flex-row md:justify-between">
          <div className="flex flex-col items-start gap-3">
            <div className="flex items-center gap-2 text-base"><svg xmlns="http://www.w3.org/2000/svg" width="24"
                height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"
                strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right size-4"
                aria-hidden={true}>
                <path d="m9 18 6-6-6-6"></path>
              </svg><button
                className="text-base text-primary-cta-text font-semibold hover:opacity-75 transition-opacity cursor-pointer">Shop</button>
            </div>
            <div className="flex items-center gap-2 text-base"><svg xmlns="http://www.w3.org/2000/svg" width="24"
                height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"
                strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right size-4"
                aria-hidden={true}>
                <path d="m9 18 6-6-6-6"></path>
              </svg><button
                className="text-base text-primary-cta-text font-semibold hover:opacity-75 transition-opacity cursor-pointer">Our
                Craft</button></div>
            <div className="flex items-center gap-2 text-base"><svg xmlns="http://www.w3.org/2000/svg" width="24"
                height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"
                strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right size-4"
                aria-hidden={true}>
                <path d="m9 18 6-6-6-6"></path>
              </svg><button
                className="text-base text-primary-cta-text font-semibold hover:opacity-75 transition-opacity cursor-pointer">Why
                UMBRA</button></div>
          </div>
          <div className="flex flex-col items-start gap-3">
            <div className="flex items-center gap-2 text-base"><svg xmlns="http://www.w3.org/2000/svg" width="24"
                height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"
                strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right size-4"
                aria-hidden={true}>
                <path d="m9 18 6-6-6-6"></path>
              </svg><button
                className="text-base text-primary-cta-text font-semibold hover:opacity-75 transition-opacity cursor-pointer">Our
                Story</button></div>
            <div className="flex items-center gap-2 text-base"><svg xmlns="http://www.w3.org/2000/svg" width="24"
                height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"
                strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right size-4"
                aria-hidden={true}>
                <path d="m9 18 6-6-6-6"></path>
              </svg><button
                className="text-base text-primary-cta-text font-semibold hover:opacity-75 transition-opacity cursor-pointer">Sustainability</button>
            </div>
            <div className="flex items-center gap-2 text-base"><svg xmlns="http://www.w3.org/2000/svg" width="24"
                height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"
                strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right size-4"
                aria-hidden={true}>
                <path d="m9 18 6-6-6-6"></path>
              </svg><button
                className="text-base text-primary-cta-text font-semibold hover:opacity-75 transition-opacity cursor-pointer">Community</button>
            </div>
          </div>
          <div className="flex flex-col items-start gap-3">
            <div className="flex items-center gap-2 text-base"><svg xmlns="http://www.w3.org/2000/svg" width="24"
                height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"
                strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right size-4"
                aria-hidden={true}>
                <path d="m9 18 6-6-6-6"></path>
              </svg><button
                className="text-base text-primary-cta-text font-semibold hover:opacity-75 transition-opacity cursor-pointer">Customer
                Care</button></div>
            <div className="flex items-center gap-2 text-base"><svg xmlns="http://www.w3.org/2000/svg" width="24"
                height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"
                strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right size-4"
                aria-hidden={true}>
                <path d="m9 18 6-6-6-6"></path>
              </svg><button
                className="text-base text-primary-cta-text font-semibold hover:opacity-75 transition-opacity cursor-pointer">Contact</button>
            </div>
            <div className="flex items-center gap-2 text-base"><svg xmlns="http://www.w3.org/2000/svg" width="24"
                height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"
                strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right size-4"
                aria-hidden={true}>
                <path d="m9 18 6-6-6-6"></path>
              </svg><button
                className="text-base text-primary-cta-text font-semibold hover:opacity-75 transition-opacity cursor-pointer">FAQ</button>
            </div>
          </div>
          <div className="flex flex-col items-start gap-3">
            <div className="flex items-center gap-2 text-base"><svg xmlns="http://www.w3.org/2000/svg" width="24"
                height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"
                strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right size-4"
                aria-hidden={true}>
                <path d="m9 18 6-6-6-6"></path>
              </svg><button
                className="text-base text-primary-cta-text font-semibold hover:opacity-75 transition-opacity cursor-pointer">Privacy
                Policy</button></div>
            <div className="flex items-center gap-2 text-base"><svg xmlns="http://www.w3.org/2000/svg" width="24"
                height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"
                strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right size-4"
                aria-hidden={true}>
                <path d="m9 18 6-6-6-6"></path>
              </svg><button
                className="text-base text-primary-cta-text font-semibold hover:opacity-75 transition-opacity cursor-pointer">Terms
                &amp; Conditions</button></div>
            <div className="flex items-center gap-2 text-base"><svg xmlns="http://www.w3.org/2000/svg" width="24"
                height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"
                strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right size-4"
                aria-hidden={true}>
                <path d="m9 18 6-6-6-6"></path>
              </svg><button
                className="text-base text-primary-cta-text font-semibold hover:opacity-75 transition-opacity cursor-pointer">Return
                Policy</button></div>
          </div>
        </div>
      </div>
    </footer>
  
    </div>
  )
}
