import type { FormEvent } from 'react';
import { useState } from 'react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setToast({ message: 'Message sent! We will get back to you soon.', type: 'success' });
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground pt-32 px-6 md:px-12 pb-20">
      {toast && (
        <div className={`fixed top-20 right-6 z-50 px-6 py-3 rounded-xl text-white ${toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
          {toast.message}
        </div>
      )}
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-light tracking-tighter mb-8">Contact Us</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm text-gray-600 mb-2">Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-3 text-black outline-none focus:border-black/30"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-2">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-3 text-black outline-none focus:border-black/30"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-2">Message</label>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={5}
              required
              className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-3 text-black outline-none focus:border-black/30"
            />
          </div>
          <button type="submit" className="w-full bg-black text-white font-medium py-4 rounded-xl hover:bg-black/80 transition-colors">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
