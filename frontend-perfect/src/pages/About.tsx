import { useNavigate } from 'react-router-dom';

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Hero Section */}
      <div className="relative w-full h-[40vh] md:h-[50vh] flex items-center justify-center pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/WhatsApp Image 2026-07-18 at 22.48.01.jpeg" 
            alt="Assorted Nuts" 
            className="w-full h-full object-cover"
            onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1615485966378-c0b7be755be1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" }}
          />
          <div className="absolute inset-0 bg-black/70"></div>
        </div>
        <div className="relative z-10 flex flex-col items-center gap-2 text-white mt-10">
          <div className="flex items-center gap-3 text-sm font-bold tracking-widest uppercase opacity-90">
            <span>Home</span>
            <span>About Us</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight uppercase">About Us</h1>
        </div>
      </div>

      <div className="w-full max-w-[1000px] mx-auto mt-16 md:mt-24 px-4 md:px-8 text-center">
        
        {/* Text Content */}
        <div className="flex flex-col items-center gap-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Kruxnut</h2>
          
          <p className="text-foreground/80 text-lg leading-relaxed max-w-4xl">
            At Kruxnut, we believe snacking should never compromise on taste or health. That's why our premium Makhanas (Fox Nuts) are carefully selected and roasted to perfection—offering a light, crunchy, and nutritious snack for every moment.
          </p>
          
          <p className="text-foreground/80 text-lg leading-relaxed max-w-4xl">
            We have always believed in the power of natural, homegrown superfoods. With Kruxnut, our mission is to bring India's finest makhana, banana chips, peanuts, and other traditional snacks to every household in the most authentic and delicious way. Our journey began with a idea: to offer snacks that are not just tasty, but also nutrient-rich and responsibly crafted – from farm to pack. We work directly with farmers, ensuring fair practices, premium quality, and a touch of tradition in every bite.
          </p>

          <p className="text-foreground/80 text-lg leading-relaxed max-w-4xl">
            Kruxnut isn't just a brand – it's a mission to redefine healthy snacking. Join us in this revolution. Be a part of our journey, and let's make the world snack smarter – together.
          </p>
          
          <button 
            onClick={() => navigate('/products')}
            className="mt-6 w-fit px-8 py-3 rounded-full border-2 border-yellow-400 text-yellow-500 font-semibold text-lg hover:bg-yellow-400 hover:text-white transition-colors"
          >
            Shop now
          </button>
        </div>
          
      </div>

      {/* Mission, Vision, Values Section */}
      <div className="w-full max-w-[1200px] mx-auto mt-24 px-4 md:px-8 text-center flex flex-col gap-12">
        
        {/* Mission */}
        <div className="flex flex-col items-center gap-3">
          <h3 className="text-2xl font-semibold flex items-center gap-2">Mission 🎯</h3>
          <p className="text-foreground/80 leading-relaxed max-w-4xl text-base md:text-lg">
            To bring India's finest, naturally grown superfoods—like Makhana, banana chips, and traditional snacks—to every home, crafted with purity, taste, and health in mind. We aim to support local farmers, preserve authentic flavors, and offer nutritious snacking options for a healthier lifestyle.
          </p>
        </div>

        {/* Vision */}
        <div className="flex flex-col items-center gap-3">
          <h3 className="text-2xl font-semibold flex items-center gap-2">Vision 🌍</h3>
          <p className="text-foreground/80 leading-relaxed max-w-4xl text-base md:text-lg">
            To become a global symbol of India's rich agricultural heritage by making Kruxnut the most trusted and loved healthy snack brand, inspiring people worldwide to choose snacks that are wholesome, delicious, and rooted in tradition.
          </p>
        </div>

        {/* Values */}
        <div className="flex flex-col items-center gap-4">
          <h3 className="text-2xl font-semibold flex items-center gap-2">Values 🤝</h3>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-foreground/80 text-base md:text-lg max-w-5xl">
            <span className="flex items-center gap-1">⭐ Integrity First – Doing what's right, always.</span>
            <span className="flex items-center gap-1">🤝 Customer-Centric – You come first in everything we do.</span>
            <span className="flex items-center gap-1">✅ Quality Matters – Only the best, without compromise.</span>
            <span className="flex items-center gap-1">💡 Innovate & Grow – Fresh ideas, better experiences.</span>
            <span className="flex items-center gap-1">🌍 Sustainably Driven – Caring for people and the planet.</span>
          </div>
        </div>

      </div>

      {/* Statistics Counter Section */}
      <div className="relative w-full mt-24 py-24 flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/WhatsApp Image 2026-07-18 at 22.48.04.jpeg" 
            alt="Makhana Background" 
            className="w-full h-full object-cover"
            onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1599598425947-330026e6d3ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" }}
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
        </div>
        
        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-10 text-white text-center">
          
          <div className="flex flex-col gap-2">
            <span className="text-4xl md:text-6xl font-light">10,000</span>
            <span className="text-xs md:text-sm tracking-[0.2em] uppercase font-semibold">Happy Customers</span>
          </div>
          
          <div className="flex flex-col gap-2">
            <span className="text-4xl md:text-6xl font-light">100</span>
            <span className="text-xs md:text-sm tracking-[0.2em] uppercase font-semibold">Branches</span>
          </div>
          
          <div className="flex flex-col gap-2">
            <span className="text-4xl md:text-6xl font-light">1,000</span>
            <span className="text-xs md:text-sm tracking-[0.2em] uppercase font-semibold">Partner</span>
          </div>
          
          <div className="flex flex-col gap-2">
            <span className="text-4xl md:text-6xl font-light">100</span>
            <span className="text-xs md:text-sm tracking-[0.2em] uppercase font-semibold">Awards</span>
          </div>
          
        </div>
      </div>

    </div>
  );
}
