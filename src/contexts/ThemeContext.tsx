// src/contexts/ThemeContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';

export type ThemeType = 'light' | 'dark' | 'system';
export type Theme = 'light' | 'dark';

// Constants for better maintainability
export const VALID_THEMES: ThemeType[] = ['light', 'dark', 'system'];
export const DEFAULT_THEME: ThemeType = 'system';
const STORAGE_KEY = 'theme';

interface ThemeContextProps {
  theme: ThemeType;
  currentTheme: Theme;
  setTheme: (theme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: DEFAULT_THEME,
  currentTheme: 'light',
  setTheme: () => { },
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeType>(DEFAULT_THEME);
  const [isInitialized, setIsInitialized] = useState(false);
  const systemTheme = useColorScheme() as Theme || 'light';

  // Calculate the actual theme based on system preference
  const currentTheme: Theme = theme === 'system' ? systemTheme : theme as Theme;

  // Function to set theme and save to storage
  const setTheme = async (newTheme: ThemeType) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, newTheme);
      setThemeState(newTheme);
    } catch (error) {
      console.error('Failed to save theme:', error);
    }
  };

  useEffect(() => {
    // Load theme from AsyncStorage when the component mounts
    const loadTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedTheme && VALID_THEMES.includes(storedTheme as ThemeType)) {
          setThemeState(storedTheme as ThemeType);
        }
      } catch (error) {
        console.error('Failed to load theme from storage:', error);
      } finally {
        setIsInitialized(true);
      }
    };

    loadTheme();
  }, []);

  // Update theme when system preference changes
  useEffect(() => {
    if (theme === 'system') {
      // No need to update state, as currentTheme will be recalculated
      console.log('System theme changed to:', systemTheme);
    }
  }, [systemTheme, theme]);

  // Don't render children until theme is initialized
  if (!isInitialized) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, currentTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
