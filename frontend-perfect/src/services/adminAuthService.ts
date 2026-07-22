import { supabase } from '../lib/supabase';

const ADMIN_SESSION_KEY = 'webild-admin-session';

export const adminAuthService = {
  async login(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.user) {
      throw new Error(error?.message || 'Invalid admin credentials');
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', data.user.id)
      .single();

    if (!profile || profile.role !== 'admin') {
      await supabase.auth.signOut();
      throw new Error('Access denied. Admin privileges required.');
    }

    const session = {
      access_token: data.session.access_token,
      user: { email: data.user.email, role: 'admin' },
    };

    localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session));
    return session;
  },

  async signup(email: string, password: string, fullName: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName, role: 'admin' },
      },
    });

    if (error) throw error;

    const session = {
      access_token: data.session?.access_token || '',
      user: { email: data.user?.email || email, role: 'admin' },
    };

    localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session));
    return session;
  },

  logout() {
    supabase.auth.signOut();
    localStorage.removeItem(ADMIN_SESSION_KEY);
  },

  isAuthenticated() {
    const session = this.getSession();
    if (!session) return false;
    return session.user.role === 'admin';
  },

  getSession() {
    const raw = localStorage.getItem(ADMIN_SESSION_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as { access_token: string; user: { email: string; role: string } };
    } catch {
      return null;
    }
  },

  getToken() {
    return this.getSession()?.access_token || null;
  },
};
