const API_URL = import.meta.env.VITE_API_BASE_URL + '/api/auth';

/**
 * Helper to handle responses
 */
async function handleResponse(response) {
  const json = await response.json();
  if (!response.ok) {
    const errorMsg = json.message || 'Authentication failed';
    const validationErrors = json.errors && json.errors.length > 0 ? ` (${json.errors.join(', ')})` : '';
    throw new Error(errorMsg + validationErrors);
  }
  return json.data;
}

export const authService = {
  /**
   * Login user
   */
  async login(email, password) {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await handleResponse(response);
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
  },

  /**
   * Register user
   */
  async register(name, email, password) {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    const data = await handleResponse(response);
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
  },

  /**
   * Logout user
   */
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  /**
   * Get current user
   */
  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    return JSON.parse(userStr);
  },

  /**
   * Get token
   */
  getToken() {
    return localStorage.getItem('token');
  }
};
