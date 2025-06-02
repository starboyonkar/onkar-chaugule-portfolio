
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Theme {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    gradient: string;
    glow: string;
  };
}

export const themes: Theme[] = [
  {
    id: 'ocean-blue',
    name: 'Ocean Blue',
    colors: {
      primary: '#3B82F6',
      secondary: '#1E40AF',
      accent: '#06B6D4',
      background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)',
      surface: 'rgba(59, 130, 246, 0.1)',
      text: '#FFFFFF',
      textSecondary: '#94A3B8',
      border: 'rgba(59, 130, 246, 0.2)',
      gradient: 'linear-gradient(45deg, #3B82F6, #06B6D4)',
      glow: 'rgba(59, 130, 246, 0.3)'
    }
  },
  {
    id: 'midnight-dark',
    name: 'Midnight Dark',
    colors: {
      primary: '#8B5CF6',
      secondary: '#5B21B6',
      accent: '#A855F7',
      background: 'linear-gradient(135deg, #0C0A09 0%, #1C1917 50%, #0C0A09 100%)',
      surface: 'rgba(139, 92, 246, 0.1)',
      text: '#FFFFFF',
      textSecondary: '#A1A1AA',
      border: 'rgba(139, 92, 246, 0.2)',
      gradient: 'linear-gradient(45deg, #8B5CF6, #A855F7)',
      glow: 'rgba(139, 92, 246, 0.3)'
    }
  },
  {
    id: 'solar-gold',
    name: 'Solar Gold',
    colors: {
      primary: '#F59E0B',
      secondary: '#D97706',
      accent: '#FBBF24',
      background: 'linear-gradient(135deg, #1C1917 0%, #292524 50%, #1C1917 100%)',
      surface: 'rgba(245, 158, 11, 0.1)',
      text: '#FFFFFF',
      textSecondary: '#D6D3D1',
      border: 'rgba(245, 158, 11, 0.2)',
      gradient: 'linear-gradient(45deg, #F59E0B, #FBBF24)',
      glow: 'rgba(245, 158, 11, 0.3)'
    }
  },
  {
    id: 'forest-green',
    name: 'Forest Green',
    colors: {
      primary: '#10B981',
      secondary: '#047857',
      accent: '#34D399',
      background: 'linear-gradient(135deg, #064E3B 0%, #065F46 50%, #064E3B 100%)',
      surface: 'rgba(16, 185, 129, 0.1)',
      text: '#FFFFFF',
      textSecondary: '#A7F3D0',
      border: 'rgba(16, 185, 129, 0.2)',
      gradient: 'linear-gradient(45deg, #10B981, #34D399)',
      glow: 'rgba(16, 185, 129, 0.3)'
    }
  },
  {
    id: 'neon-purple',
    name: 'Neon Purple',
    colors: {
      primary: '#EC4899',
      secondary: '#BE185D',
      accent: '#F472B6',
      background: 'linear-gradient(135deg, #1F1B24 0%, #2D1B69 50%, #1F1B24 100%)',
      surface: 'rgba(236, 72, 153, 0.1)',
      text: '#FFFFFF',
      textSecondary: '#FBBF24',
      border: 'rgba(236, 72, 153, 0.2)',
      gradient: 'linear-gradient(45deg, #EC4899, #F472B6)',
      glow: 'rgba(236, 72, 153, 0.3)'
    }
  }
];

interface ThemeContextType {
  currentTheme: Theme;
  setTheme: (themeId: string) => void;
  isThemeSelectorOpen: boolean;
  toggleThemeSelector: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(themes[0]); // Default to Ocean Blue
  const [isThemeSelectorOpen, setIsThemeSelectorOpen] = useState(false);

  const setTheme = (themeId: string) => {
    const theme = themes.find(t => t.id === themeId);
    if (theme) {
      setCurrentTheme(theme);
      localStorage.setItem('portfolio-theme', themeId);
      applyThemeToDOM(theme);
    }
  };

  const toggleThemeSelector = () => {
    setIsThemeSelectorOpen(!isThemeSelectorOpen);
  };

  const applyThemeToDOM = (theme: Theme) => {
    const root = document.documentElement;
    root.style.setProperty('--theme-primary', theme.colors.primary);
    root.style.setProperty('--theme-secondary', theme.colors.secondary);
    root.style.setProperty('--theme-accent', theme.colors.accent);
    root.style.setProperty('--theme-text', theme.colors.text);
    root.style.setProperty('--theme-text-secondary', theme.colors.textSecondary);
    root.style.setProperty('--theme-border', theme.colors.border);
    root.style.setProperty('--theme-surface', theme.colors.surface);
    root.style.setProperty('--theme-glow', theme.colors.glow);
  };

  useEffect(() => {
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme) {
      const theme = themes.find(t => t.id === savedTheme);
      if (theme) {
        setCurrentTheme(theme);
        applyThemeToDOM(theme);
      }
    } else {
      applyThemeToDOM(currentTheme);
    }

    // Ensure we always start at the top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <ThemeContext.Provider value={{
      currentTheme,
      setTheme,
      isThemeSelectorOpen,
      toggleThemeSelector
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
