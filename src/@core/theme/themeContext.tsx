import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Appearance } from 'react-native';
import { useColorScheme } from 'nativewind';
import { chooseColor } from './chooseColor';

type Theme = 'light' | 'dark';
type Color = 'green';
export type styleKey = keyof typeof chooseColor.green.light;

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  ct: Record<styleKey, string>;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const systemTheme = Appearance.getColorScheme() as Theme;
  const [theme, setTheme] = useState<Theme>('dark');
  const [color, setColor] = useState<Color>('green');

  const { setColorScheme } = useColorScheme();

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';

      setColorScheme(next); // update NativeWind theme class
      return next;
    });
  };
  useEffect(() => {
    setColorScheme(theme); // ✅ Sync NativeWind on mount
  }, [theme]);
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, ct: chooseColor[color][theme] }}>
      {children}
    </ThemeContext.Provider>
  );
};
