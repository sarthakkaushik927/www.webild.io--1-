import { useState } from 'react';
import type { FormEvent } from 'react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <>
      <section id="contact" aria-label="Contact section" className="py-20">
        <div className="w-content-width mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5" style={{"opacity": "1", "transform": "none", }}>
            <div className="p-6 md:p-10 card rounded">
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <p className="text-2xl font-light text-black mb-2">Message Sent</p>
                  <p className="text-gray-600">We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div className="flex flex-col items-center gap-2 text-center">
                    <div className="px-3 py-1 mb-1 text-sm card rounded w-fit">
                      <p>Contact</p>
                    </div>
                    <h2
                      className="bg-gradient-to-r from-foreground to-primary-cta bg-clip-text text-transparent pb-[0.1em] -mb-[0.1em] text-6xl 2xl:text-7xl leading-[1.15] font-semibold text-balance">
                      Get in Touch</h2>
                    <p className="text-lg md:text-xl leading-snug text-balance">Have a question or looking for bulk orders?
                      We'd love to hear from you.</p>
                  </div>
                  <div className="flex flex-col gap-3"><input placeholder="Your name" required={true} aria-label="Your name"
                      className="w-full px-5 py-3 text-base bg-transparent placeholder:opacity-75 focus:outline-none card rounded"
                      type="text" /><input placeholder="your@email.com" required={true} aria-label="your@email.com"
                      className="w-full px-5 py-3 text-base bg-transparent placeholder:opacity-75 focus:outline-none card rounded"
                      type="email" /><input placeholder="+1 (555) 000-0000" aria-label="+1 (555) 000-0000"
                      className="w-full px-5 py-3 text-base bg-transparent placeholder:opacity-75 focus:outline-none card rounded"
                      type="tel" /><input placeholder="How can we help?" required={true} aria-label="How can we help?"
                      className="w-full px-5 py-3 text-base bg-transparent placeholder:opacity-75 focus:outline-none card rounded"
                      type="text" />                      <textarea placeholder="Tell us your message..." required={true}
                      rows={5} aria-label="Tell us your message..."
                      className="w-full px-5 py-3 text-base bg-transparent placeholder:opacity-75 focus:outline-none resize-none card rounded"></textarea><button
                      type="submit"
                      className="flex items-center justify-center w-full h-10 px-6 text-sm primary-button text-primary-cta-text rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">Send
                      Message</button></div>
                </form>
              )}
            </div>
            <div className="h-100 md:h-auto card rounded overflow-hidden"><img
                alt="https://storage.googleapis.com/webild/default/templates/skincare-luxury/contact.webp"
                className="min-h-0 size-full object-cover rounded"
                src="https://storage.googleapis.com/webild/default/templates/skincare-luxury/contact.webp" loading="lazy" /></div>
          </div>
        </div>
      </section>
    </>
  );
}
