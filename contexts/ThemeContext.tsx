import { createContext, useContext } from 'react';

export type Theme = 'light' | 'dark';

export interface ThemeColors {
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  primary: string;
  border: string;
  error: string;
}

export const themes: Record<Theme, ThemeColors> = {
  light: {
    background: '#f0f0f0',
    surface: '#ffffff',
    text: '#333333',
    textSecondary: '#666666',
    primary: '#007AFF',
    border: '#eeeeee',
    error: '#ff3b30',
  },
  dark: {
    background: '#121212',
    surface: '#1e1e1e',
    text: '#ffffff',
    textSecondary: '#a0a0a0',
    primary: '#0A84FF',
    border: '#2c2c2c',
    error: '#ff453a',
  },
};

export interface ThemeContextType {
  theme: Theme;
  colors: ThemeColors;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 