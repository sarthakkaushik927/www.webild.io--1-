import { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { settingsService } from '../services/settingsService';

export default function WhatsAppButton() {
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    settingsService.getSettings().then((settings) => {
      if (settings) {
        setPhone(settings.whatsapp_number);
        setMessage(settings.whatsapp_message || 'Hi, I have a question about your products.');
      }
    });
  }, []);

  if (!phone) return null;

  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodedMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-green-500 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform"
      style={{ zIndex: 40 }}
    >
      <MessageCircle className="w-7 h-7" />
    </a>
  );
}
