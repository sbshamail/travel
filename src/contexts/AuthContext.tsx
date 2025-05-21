import React, { createContext, useContext, useEffect, useState } from 'react';
import { TOKEN_KEY, getSorageValue, removeSorageValue, storeValue } from '../utils/asyncStorage';
import { Alert } from 'react-native';

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const bootstrap = async () => {
      const token = await getSorageValue(TOKEN_KEY);
      const user = await getSorageValue('user');
      if (token) {
        setToken(token); // in real apps, decode and verify
      }
      if (user) {
        setUser(user);
      }
      setIsLoading(false);
    };
    bootstrap();
  }, []);

  const login = async (obj: Record<string, any>) => {
    await storeValue(TOKEN_KEY, obj.token);
    await storeValue('user', obj.user);
    setToken(token);
    setUser(obj.user);
  };

  const logout = async () => {
    await removeSorageValue(TOKEN_KEY);
    await removeSorageValue('user');
    setToken(null);
    Alert.alert('Logged out');
  };
  const isAuth = () => {
    if (token && user?._id) {
      return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider value={{ token, user, isAuth: isAuth(), login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
