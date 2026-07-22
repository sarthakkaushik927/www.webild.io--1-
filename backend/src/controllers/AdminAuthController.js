import { supabase } from '../lib/supabase.js';

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body ?? {};

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.user) {
      return res.status(401).json({ error: 'Invalid admin credentials' });
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', data.user.id)
      .single();

    if (!profile || profile.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden - Admin access required' });
    }

    return res.json({
      token: data.session.access_token,
      user: {
        email: data.user.email,
        role: 'admin',
      },
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const signupAdmin = async (req, res) => {
  try {
    const { email, password, full_name } = req.body;

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name, role: 'admin' },
    });

    if (error) throw error;

    res.json({
      token: data.session?.access_token || '',
      user: {
        email,
        role: 'admin',
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
