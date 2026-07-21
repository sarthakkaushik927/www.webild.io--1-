import { apiPost } from '../utils/api';

const ADMIN_TOKEN_KEY = 'kruxnut-admin-token';

type AdminLoginResponse = {
  token: string;
  user: {
    email: string;
    role: 'admin';
  };
};

export const adminAuthService = {
  async login(email: string, password: string) {
    const response = await apiPost<AdminLoginResponse>('/api/admin/login', { email, password });
    localStorage.setItem(ADMIN_TOKEN_KEY, response.token);
    return response;
  },

  logout() {
    localStorage.removeItem(ADMIN_TOKEN_KEY);
  },

  isAuthenticated() {
    return Boolean(localStorage.getItem(ADMIN_TOKEN_KEY));
  },

  getToken() {
    return localStorage.getItem(ADMIN_TOKEN_KEY);
  },
};
