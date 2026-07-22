import { useNavigate, useLocation } from 'react-router-dom';
import { adminAuthService } from '../services/adminAuthService';

export default function AdminNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    adminAuthService.logout();
    navigate('/admin');
  };

  const isActive = (path: string) => location.pathname === path;

  const links = [
    { label: 'Products', href: '/admin/dashboard' },
    { label: 'Categories', href: '/admin/dashboard' },
    { label: 'Users', href: '/admin/dashboard' },
    { label: 'Orders', href: '/admin/orders' },
    { label: 'Content', href: '/admin/content' },
    { label: 'API Keys', href: '/admin/api-keys' },
  ];

  return (
    <div className="w-full bg-white border-b border-black/10 flex flex-col md:flex-row justify-between items-center fixed top-0 z-40 px-6 py-4">
      <div className="flex items-center gap-8 mb-4 md:mb-0">
        <h1 className="text-xl font-semibold text-black tracking-widest">KRUXNUT CMS</h1>
        <div className="flex gap-4 flex-wrap">
          {links.map((link) => (
            <button
              key={link.href}
              onClick={() => navigate(link.href)}
              className={`text-sm font-medium ${isActive(link.href) ? 'text-black border-b-2 border-black' : 'text-gray-500 hover:text-black'}`}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
      <div className="flex gap-4">
        <button onClick={() => navigate('/')} className="text-sm text-gray-600 hover:text-black">View Site</button>
        <button onClick={handleLogout} className="text-sm text-red-600 hover:text-red-800">Logout</button>
      </div>
    </div>
  );
}
