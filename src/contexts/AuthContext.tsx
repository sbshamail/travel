import React, { createContext, useContext, useEffect, useState } from 'react';
import { TOKEN_KEY, getSorageValue, removeSorageValue, storeValue } from '../utils/asyncStorage';
import { Alert } from 'react-native';
import { Toastify } from '@/components/toast/Toastify';

interface AuthContextType {
  token: string | null;
  user: Record<string, any> | null;
  isAuth: boolean;
  login: (obj: Record<string, any>) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  token: null,
  user: null,
  login: () => {},
  logout: () => {},
  isAuth: false,
  isLoading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<Record<string, any> | null>(null);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const handleIsAuth = async () => {
    const token = await getSorageValue(TOKEN_KEY);
    const user = await getSorageValue('user');
    if (token) {
      setToken(token); // in real apps, decode and verify
    }
    if (user) {
      setUser(user);
    }
    if (token && user?._id) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  };

  useEffect(() => {
    const bootstrap = async () => {
      handleIsAuth();
      setIsLoading(false);
    };
    bootstrap();
  }, []);

  const login = async (obj: Record<string, any>) => {
    await storeValue(TOKEN_KEY, obj.token);
    await storeValue('user', obj.user);
    setToken(token);
    setUser(obj.user);
    setIsAuth(true);
  };

  const logout = async () => {
    await removeSorageValue(TOKEN_KEY);
    await removeSorageValue('user');
    setToken(null);
    setUser(null);
    setIsAuth(false);
    Toastify('success', 'Logged out');
    Alert.alert('Logged out');
  };

  return (
    <AuthContext.Provider value={{ token, user, isAuth, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
