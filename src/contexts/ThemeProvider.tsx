import React, { createContext, useState, ReactNode } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeContext = createContext({
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [currentTheme, setCurrentTheme] = useState(theme.light);

  const toggleTheme = () => {
    setCurrentTheme((prevTheme) =>
      prevTheme === theme.light ? theme.dark : theme.light
    );
  };

  return (
    <ThemeContext.Provider value={{ toggleTheme }}>
      <StyledThemeProvider theme={currentTheme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
};