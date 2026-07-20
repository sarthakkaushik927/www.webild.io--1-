import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

const ADMIN_TOKEN = 'umbra-admin-secret-2024';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'luxury123') {
      sessionStorage.setItem('umbra_admin_token', ADMIN_TOKEN);
      navigate('/admin/dashboard');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground pt-20">
      <div className="w-full max-w-md p-8 rounded-2xl border border-black/10 bg-black/5 backdrop-blur-xl">
        <h2 className="text-3xl font-light tracking-tighter text-center mb-8 text-black">Admin Access</h2>
        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm text-gray-600 mb-2">Username</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-3 text-black focus:outline-none focus:border-black/30 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-2">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-3 text-black focus:outline-none focus:border-black/30 transition-colors"
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-black text-white font-medium py-3 rounded-lg hover:bg-black/80 transition-colors mt-4"
          >
            Enter CMS
          </button>
        </form>
      </div>
    </div>
  );
}
