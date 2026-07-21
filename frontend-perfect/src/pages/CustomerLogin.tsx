import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../lib/firebase';
import { authService } from '../services/firebaseService';

export default function CustomerLogin() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigate('/products');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (isLogin) {
        const result = await authService.signIn(email, password);
        if (result.error || !result.data) {
          const message = (result.error as any)?.message || String(result.error || 'Login failed');
          setError(message);
          return;
        }
        navigate('/products');
      } else {
        if (!fullName.trim()) {
          setError('Please enter your full name');
          return;
        }
        const result = await authService.signUp(email, password, fullName);
        if (result.error) {
          const message = (result.error as any)?.message || String(result.error || 'Signup failed');
          setError(message);
          return;
        }
        navigate('/products');
      }
    } catch (err) {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground pt-20">
      <div className="w-full max-w-md p-8 rounded-2xl border border-black/10 bg-black/5 backdrop-blur-xl">
        <h2 className="text-3xl font-light tracking-tighter text-center mb-2 text-black">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>
        <p className="text-center text-gray-600 mb-8">
          {isLogin ? 'Sign in to continue shopping' : 'Join us for fresh snacks'}
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div>
              <label className="block text-sm text-gray-600 mb-2">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-3 text-black outline-none focus:border-black/30"
              />
            </div>
          )}

          <div>
            <label className="block text-sm text-gray-600 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-3 text-black outline-none focus:border-black/30"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-3 text-black outline-none focus:border-black/30"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white font-medium py-3 rounded-lg hover:bg-black/80 disabled:opacity-50 transition-colors"
          >
            {loading ? 'Please wait...' : isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <button
            onClick={() => { setIsLogin(!isLogin); setError(null); }}
            className="text-black underline hover:no-underline"
          >
            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
          </button>
        </div>

        <div className="mt-4 text-center">
          <Link to="/products" className="text-sm text-gray-500 hover:text-black">
            ← Back to shop
          </Link>
        </div>
      </div>
    </div>
  );
}
