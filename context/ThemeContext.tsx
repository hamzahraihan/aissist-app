// ThemeContext.js
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { Appearance, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';

type ThemeContextType = {
  theme: typeof DarkTheme | typeof DefaultTheme;
  themeMode: 'dark' | 'light';
  toggleTheme: () => Promise<void>;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: DefaultTheme,
  themeMode: 'light',
  toggleTheme: async () => {},
});

export const CustomThemeProvider = ({ children }: { children: ReactNode }) => {
  const [themeMode, setThemeMode] = useState<'dark' | 'light'>((Appearance.getColorScheme() as 'dark' | 'light') || 'light');

  const theme = themeMode === 'dark' ? DarkTheme : DefaultTheme;

  useEffect(() => {
    const loadTheme = async () => {
      try {
        let storedTheme: any = null;
        if (Platform.OS !== 'web') {
          storedTheme = await AsyncStorage.getItem('theme');
        } else {
          storedTheme = localStorage.getItem('theme');
        }

        if (storedTheme) {
          setThemeMode(storedTheme);
          applyTheme(storedTheme); // Apply theme on load
        } else {
          applyTheme(Appearance.getColorScheme());
        }
      } catch (error) {
        console.error('Failed to load theme', error);
      }
    };

    loadTheme();

    const appearanceListener = Appearance.addChangeListener(({ colorScheme }) => {
      AsyncStorage.getItem('theme').then((savedThemed) => {
        if (!savedThemed && (colorScheme === 'dark' || colorScheme === 'light')) {
          setThemeMode(colorScheme);
        }
      });
      applyTheme(colorScheme);
    });

    return () => {
      appearanceListener.remove();
    };
  }, []);

  useEffect(() => {
    applyTheme(theme); // Apply theme whenever it changes
  }, [theme]);

  const applyTheme = (themeMode: any) => {
    if (Platform.OS === 'web') {
      document.documentElement.setAttribute('data-theme', themeMode); // Set attribute for CSS
    }
  };

  const toggleTheme = async () => {
    const newTheme = themeMode === 'dark' ? 'light' : 'dark';
    setThemeMode(newTheme);

    try {
      if (Platform.OS !== 'web') {
        await AsyncStorage.setItem('theme', newTheme);
      } else {
        localStorage.setItem('theme', newTheme);
      }

      applyTheme(newTheme); // Apply the theme immediately
    } catch (error) {
      console.error('Failed to save theme', error);
    }
  };

  return <ThemeContext.Provider value={{ theme, themeMode, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export const useCustomTheme = () => useContext(ThemeContext);
