const ADMIN_EMAIL = 'admin';
const ADMIN_PASSWORD = 'luxury123';
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'umbra-admin-secret-2024';

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body ?? {};

    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      return res.status(401).json({ error: 'Invalid admin credentials' });
    }

    return res.json({
      token: ADMIN_TOKEN,
      user: {
        email: ADMIN_EMAIL,
        role: 'admin',
      },
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
