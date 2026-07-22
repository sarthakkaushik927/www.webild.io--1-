import { useNavigate } from 'react-router-dom';
import { adminAuthService } from '../../services/adminAuthService';

export default function AdminContentHub() {
  const navigate = useNavigate();

  if (!adminAuthService.isAuthenticated()) {
    navigate('/admin');
    return null;
  }

  const sections = [
    { label: 'Carousel / Banner Slider', href: '/admin/content/carousel', desc: 'Manage homepage banner images' },
    { label: 'Why Choose Us / Features', href: '/admin/content/features', desc: 'Manage feature steps and FAQ image' },
    { label: 'Community', href: '/admin/content/community', desc: 'Manage influencers and community videos' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      <div className="pt-32 px-6 md:px-12 max-w-5xl mx-auto">
        <h2 className="text-3xl font-light text-black mb-8">Content Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sections.map((section) => (
            <button
              key={section.href}
              onClick={() => navigate(section.href)}
              className="bg-white rounded-2xl border border-black/10 p-6 text-left hover:border-black/30 transition-colors"
            >
              <h3 className="text-lg font-medium text-black mb-2">{section.label}</h3>
              <p className="text-sm text-gray-500">{section.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
