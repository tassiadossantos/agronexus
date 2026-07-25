import { useState, useEffect, createContext, useContext, type ReactNode } from 'react';
import AuthService from '@/shared/api/auth';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: { nome: string; email: string } | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  user: null,
  login: async () => {},
  logout: () => {},
});

export function useAuth() { return useContext(AuthContext); }

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<{ nome: string; email: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AuthService.initialize();
    if (AuthService.isAuthenticated()) {
      setUser({ nome: 'Carlos Eduardo Silva', email: 'carlos@fazendasilva.com.br' });
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, _password: string) => {
    await AuthService.login(email, 'demo');
    setUser({ nome: 'Carlos Eduardo Silva', email });
  };

  const logout = () => {
    AuthService.clearTokens();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, isLoading, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
