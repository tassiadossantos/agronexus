import { apiClient } from './client';

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

class AuthService {
  private static ACCESS_KEY = 'agro_access_token';
  private static REFRESH_KEY = 'agro_refresh_token';

  static getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_KEY);
  }

  static getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_KEY);
  }

  static setTokens(tokens: AuthTokens): void {
    localStorage.setItem(this.ACCESS_KEY, tokens.accessToken);
    localStorage.setItem(this.REFRESH_KEY, tokens.refreshToken);
    apiClient.setToken(tokens.accessToken);
  }

  static clearTokens(): void {
    localStorage.removeItem(this.ACCESS_KEY);
    localStorage.removeItem(this.REFRESH_KEY);
    apiClient.setToken(null);
  }

  static isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }

  static async login(email: string, password: string): Promise<AuthTokens> {
    const result = await apiClient.post<{ data: AuthTokens }>('/auth/login', { email, password });
    this.setTokens(result.data);
    return result.data;
  }

  static async refresh(): Promise<AuthTokens> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) throw new Error('No refresh token');
    const result = await apiClient.post<{ data: AuthTokens }>('/auth/refresh', { refreshToken });
    this.setTokens(result.data);
    return result.data;
  }

  static async logout(): Promise<void> {
    try { await apiClient.post('/auth/logout', {}); } finally { this.clearTokens(); }
  }

  static initialize(): void {
    const token = this.getAccessToken();
    if (token) apiClient.setToken(token);
  }
}

export default AuthService;
