import { MessageSquare, Send, Minimize2 } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const SUGGESTED_QUESTIONS = [
  'What are your best-selling products?',
  'How long does delivery take?',
  'Do you offer loyalty discounts?',
  'What payment methods do you accept?',
];

function getBotResponse(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes('best') || lower.includes('popular') || lower.includes('recommend')) {
    return 'Our best-selling products are the Peri Peri Makhana, Classic Cashews, and Banana Chips! You can check them out in the Products section.';
  }
  if (lower.includes('delivery') || lower.includes('shipping') || lower.includes('time') || lower.includes('long')) {
    return 'Standard delivery takes 3-5 business days. Express delivery is available for select locations. You will receive a tracking link once your order is shipped.';
  }
  if (lower.includes('loyalty') || lower.includes('discount') || lower.includes('coin')) {
    return 'Yes! You earn 1 loyalty coin for every ₹2 spent. 100 coins = ₹1 discount at checkout.';
  }
  if (lower.includes('payment') || lower.includes('pay') || lower.includes('cod') || lower.includes('razorpay')) {
    return 'We accept UPI, Credit/Debit Cards, Net Banking, and Wallet payments through Razorpay.';
  }
  if (lower.includes('return') || lower.includes('refund') || lower.includes('exchange')) {
    return 'We accept returns within 7 days of delivery for unopened products. Refunds are processed within 5-7 business days.';
  }
  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
    return 'Hello! Welcome to Kruxnut. How can I help you today?';
  }
  if (lower.includes('contact') || lower.includes('phone') || lower.includes('number') || lower.includes('whatsapp')) {
    return 'You can reach us via WhatsApp using the green button on the screen, or email us at support@kruxnut.com.';
  }
  return 'Thank you for your message! For detailed assistance, please use the WhatsApp button or email us at support@kruxnut.com.';
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: 'Hello! Welcome to Kruxnut. How can I help you today?' },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMessage = text.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = getBotResponse(userMessage);
      setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
      setIsTyping(false);
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') sendMessage(input);
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-24 right-6 z-40 w-14 h-14 bg-black text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[360px] h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col border border-black/10 overflow-hidden">
          <div className="bg-black text-white px-4 py-3 flex items-center justify-between">
            <div>
              <h3 className="font-medium">Kruxnut Assistant</h3>
              <p className="text-xs text-white/70">Online</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/10 rounded">
              <Minimize2 className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[80%] rounded-xl px-3 py-2 text-sm ${
                    msg.role === 'user' ? 'bg-black text-white' : 'bg-black/5 text-black'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-black/5 text-black rounded-xl px-3 py-2 text-sm">Typing...</div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {messages.length === 1 && (
            <div className="px-4 pb-2">
              <p className="text-xs text-gray-500 mb-2">Suggested questions:</p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTED_QUESTIONS.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(q)}
                    className="text-xs bg-black/5 hover:bg-black/10 text-black px-3 py-1.5 rounded-full transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="p-3 border-t border-black/10 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 bg-black/5 border border-black/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-black/30"
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim()}
              className="p-2 bg-black text-white rounded-lg hover:bg-black/80 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
