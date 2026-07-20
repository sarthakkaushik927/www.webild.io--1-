import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-6">
      <h1 className="text-6xl font-light tracking-tighter mb-4">404</h1>
      <p className="text-xl text-gray-400 mb-8">This page does not exist.</p>
      <Link to="/" className="px-6 py-3 bg-white text-black rounded-lg font-medium hover:bg-gray-200 transition-colors">
        Return Home
      </Link>
    </div>
  );
}
