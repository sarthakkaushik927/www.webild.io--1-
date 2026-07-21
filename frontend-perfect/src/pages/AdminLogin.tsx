import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminAuthService } from '../services/adminAuthService';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (adminAuthService.isAuthenticated()) {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await adminAuthService.login(email, password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Invalid admin credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground pt-20">
      <div className="w-full max-w-md p-8 rounded-2xl border border-black/10 bg-black/5 backdrop-blur-xl">
        <h2 className="text-3xl font-light tracking-tighter text-center mb-8 text-black">Admin Access</h2>
        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">{error}</div>}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm text-gray-600 mb-2">Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-3 text-black focus:outline-none focus:border-black/30"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-3 text-black focus:outline-none focus:border-black/30"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white font-medium py-3 rounded-lg hover:bg-black/80 disabled:opacity-50 transition-colors"
          >
            {loading ? 'Signing in...' : 'Enter CMS'}
          </button>
        </form>
      </div>
    </div>
  );
}
