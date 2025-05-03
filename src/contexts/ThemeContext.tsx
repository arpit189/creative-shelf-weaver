
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

export type Theme = 'minimal' | 'bold';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('minimal');

  useEffect(() => {
    // Get theme from localStorage or use default
    const savedTheme = localStorage.getItem('projectShelfTheme') as Theme | null;
    if (savedTheme && (savedTheme === 'minimal' || savedTheme === 'bold')) {
      setTheme(savedTheme);
    }
  }, []);

  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('projectShelfTheme', newTheme);
    
    // Apply theme class to body
    document.body.classList.remove('theme-minimal', 'theme-bold');
    document.body.classList.add(`theme-${newTheme}`);
  };

  // Apply initial theme
  useEffect(() => {
    document.body.classList.add(`theme-${theme}`);
    return () => {
      document.body.classList.remove(`theme-${theme}`);
    };
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleSetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
