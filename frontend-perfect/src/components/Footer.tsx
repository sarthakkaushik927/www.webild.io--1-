export default function Footer() {
  return (
    <>
      <footer data-section="footer" aria-label="Site footer"
        className="w-full py-15 mt-20 rounded-t-lg overflow-hidden primary-button text-primary-cta-text">
        <div className="w-content-width mx-auto flex flex-col gap-10 md:gap-20">
          <div className="w-full min-w-0 flex-1 py-10 overflow-hidden">
            <h2 className="whitespace-nowrap transition-opacity duration-150 opacity-100 font-semibold w-full"
              style={{ "lineHeight": "0.8", "fontSize": "min(304px, 18vw)" }}>KRUXNUT</h2>
          </div>
          {/* Footer Content - 4 Column Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
            {/* Column 1: Brand Info + Social */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-primary-cta-text">Kruxnut</h3>
              <p className="text-sm text-primary-cta-text/80 leading-relaxed">
                we believe that snacking should be a delightful experience that's as healthy as it is tasty.
              </p>
              {/* Social Icons */}
              <div className="flex items-center gap-4 mt-2">
                {/* Twitter */}
                <a href="#" aria-label="Twitter" className="text-primary-cta-text hover:opacity-75 transition-opacity">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.3 4.3 0 0 0 1.88-2.38 8.59 8.59 0 0 1-2.72 1.04 4.28 4.28 0 0 0-7.32 3.91A12.16 12.16 0 0 1 3 4.79a4.28 4.28 0 0 0 1.32 5.72 4.24 4.24 0 0 1-1.94-.54v.05a4.28 4.28 0 0 0 3.43 4.2 4.27 4.27 0 0 1-1.93.07 4.29 4.29 0 0 0 4 2.97A8.59 8.59 0 0 1 2 19.54a12.13 12.13 0 0 0 6.56 1.92c7.88 0 12.2-6.53 12.2-12.2 0-.19 0-.37-.01-.56A8.72 8.72 0 0 0 23 6.29a8.49 8.49 0 0 1-.54.21z"/>
                  </svg>
                </a>
                {/* Facebook */}
                <a href="#" aria-label="Facebook" className="text-primary-cta-text hover:opacity-75 transition-opacity">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.66 9.12 8.44 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99C18.34 21.12 22 16.99 22 12z"/>
                  </svg>
                </a>
                {/* Instagram */}
                <a href="#" aria-label="Instagram" className="text-primary-cta-text hover:opacity-75 transition-opacity">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.97.24 2.44.41.61.24 1.05.52 1.51.98.46.46.74.9.98 1.51.17.47.36 1.27.41 2.44.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.24 1.97-.41 2.44a4.08 4.08 0 0 1-.98 1.51c-.46.46-.9.74-1.51.98-.47.17-1.27.36-2.44.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.97-.24-2.44-.41a4.08 4.08 0 0 1-1.51-.98 4.08 4.08 0 0 1-.98-1.51c-.17-.47-.36-1.27-.41-2.44C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.24-1.97.41-2.44.24-.61.52-1.05.98-1.51a4.08 4.08 0 0 1 1.51-.98c.47-.17 1.27-.36 2.44-.41C8.42 2.17 8.8 2.16 12 2.16zm0-2.16C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a6.24 6.24 0 0 0-2.25 1.47A6.24 6.24 0 0 0 .42 4.35C.13 5.1-.07 5.98.07 7.25.01 8.53 0 8.94 0 12.2s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91a6.24 6.24 0 0 0 1.47 2.25 6.24 6.24 0 0 0 2.25 1.47c.76.3 1.64.5 2.91.56C8.53 23.99 8.94 24 12 24s3.47-.01 4.75-.07c1.27-.06 2.15-.26 2.91-.56a6.24 6.24 0 0 0 2.25-1.47 6.24 6.24 0 0 0 1.47-2.25c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a6.24 6.24 0 0 0-1.47-2.25A6.24 6.24 0 0 0 19.66.63C18.9.33 18.02.13 16.75.07 15.47.01 15.06 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.41-11.15a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Column 2: Menu */}
            <div className="flex flex-col gap-3">
              <h3 className="text-lg font-semibold text-primary-cta-text mb-1">Menu</h3>
              <a href="/" className="text-sm text-primary-cta-text/80 hover:text-primary-cta-text transition-colors">Home</a>
              <a href="/about" className="text-sm text-primary-cta-text/80 hover:text-primary-cta-text transition-colors">About</a>
              <a href="/products" className="text-sm text-primary-cta-text/80 hover:text-primary-cta-text transition-colors">Services</a>
              <a href="/contact" className="text-sm text-primary-cta-text/80 hover:text-primary-cta-text transition-colors">Contact Us</a>
            </div>

            {/* Column 3: Reg. Office */}
            <div className="flex flex-col gap-3">
              <h3 className="text-lg font-semibold text-primary-cta-text mb-1">Have a Questions?</h3>
              <h4 className="text-base font-semibold text-primary-cta-text">Reg. Office</h4>
              <div className="flex items-start gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="shrink-0 mt-0.5 text-primary-cta-text/80">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"/>
                </svg>
                <p className="text-sm text-primary-cta-text/80 leading-relaxed">Gajendra Complex, Gopalganj Bihar ,841428</p>
              </div>
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="shrink-0 text-primary-cta-text/80">
                  <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2z"/>
                </svg>
                <p className="text-sm text-primary-cta-text/80">84491 00562 , 7277580827</p>
              </div>
            </div>

            {/* Column 4: Manufacturing Unit */}
            <div className="flex flex-col gap-3">
              <h3 className="text-lg font-semibold text-primary-cta-text mb-1">Have a Questions?</h3>
              <h4 className="text-base font-semibold text-primary-cta-text">Manufacturing Unit</h4>
              <div className="flex items-start gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="shrink-0 mt-0.5 text-primary-cta-text/80">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"/>
                </svg>
                <p className="text-sm text-primary-cta-text/80 leading-relaxed">A-Dhaniram vatika near Asopa hostital Gailana road Agra , 282007</p>
              </div>
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="shrink-0 text-primary-cta-text/80">
                  <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2z"/>
                </svg>
                <p className="text-sm text-primary-cta-text/80">8082377905</p>
              </div>
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="shrink-0 text-primary-cta-text/80">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <a href="mailto:Care@kruxnut.com" className="text-sm text-primary-cta-text/80 hover:text-primary-cta-text transition-colors">Care@kruxnut.com</a>
              </div>
            </div>
          </div>
          <div className="w-content-width mx-auto flex justify-end pb-4 pr-4">
            <a href="/admin" className="text-xs opacity-30 hover:opacity-100 transition-opacity">Admin Access</a>
          </div>
        </div>
      </footer>
    </>
  );
}
