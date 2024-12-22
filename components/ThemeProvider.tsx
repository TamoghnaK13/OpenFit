import { ReactNode, useState } from 'react';
import { ThemeContext, Theme, themes } from '@/contexts/ThemeContext';

interface ThemeProviderProps {
  children: ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>('dark');

  const toggleTheme = () => {
    setTheme(current => current === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{
      theme,
      colors: themes[theme],
      toggleTheme,
    }}>
      {children}
    </ThemeContext.Provider>
  );
} 