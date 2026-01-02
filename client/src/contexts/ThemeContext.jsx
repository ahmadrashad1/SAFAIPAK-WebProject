import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

// Theme definitions
const themes = {
  purple: {
    name: 'Purple',
    colors: {
      primary: '#6366f1',
      primaryDark: '#4c1d95',
      primaryLight: '#8b5cf6',
      accent: '#a78bfa',
      glow: '#c4b5fd',
      ink: '#0f172a',
      inkLight: '#1e293b',
      surface: '#ffffff',
      surfaceAlt: '#f8fafc',
    }
  },
  blue: {
    name: 'Blue',
    colors: {
      primary: '#3b82f6',
      primaryDark: '#1e40af',
      primaryLight: '#60a5fa',
      accent: '#93c5fd',
      glow: '#bfdbfe',
      ink: '#0f172a',
      inkLight: '#1e293b',
      surface: '#ffffff',
      surfaceAlt: '#f1f5f9',
    }
  },
  green: {
    name: 'Green',
    colors: {
      primary: '#10b981',
      primaryDark: '#047857',
      primaryLight: '#34d399',
      accent: '#6ee7b7',
      glow: '#a7f3d0',
      ink: '#0f172a',
      inkLight: '#1e293b',
      surface: '#ffffff',
      surfaceAlt: '#f0fdf4',
    }
  },
  orange: {
    name: 'Orange',
    colors: {
      primary: '#f97316',
      primaryDark: '#c2410c',
      primaryLight: '#fb923c',
      accent: '#fdba74',
      glow: '#fed7aa',
      ink: '#0f172a',
      inkLight: '#1e293b',
      surface: '#ffffff',
      surfaceAlt: '#fff7ed',
    }
  },
  pink: {
    name: 'Pink',
    colors: {
      primary: '#ec4899',
      primaryDark: '#be185d',
      primaryLight: '#f472b6',
      accent: '#f9a8d4',
      glow: '#fbcfe8',
      ink: '#0f172a',
      inkLight: '#1e293b',
      surface: '#ffffff',
      surfaceAlt: '#fdf2f8',
    }
  },
  dark: {
    name: 'Dark',
    colors: {
      primary: '#818cf8',
      primaryDark: '#4c1d95',
      primaryLight: '#a78bfa',
      accent: '#c4b5fd',
      glow: '#ddd6fe',
      ink: '#f1f5f9',
      inkLight: '#cbd5e1',
      surface: '#0f172a',
      surfaceAlt: '#1e293b',
    }
  },
  teal: {
    name: 'Teal',
    colors: {
      primary: '#14b8a6',
      primaryDark: '#0f766e',
      primaryLight: '#5eead4',
      accent: '#99f6e4',
      glow: '#ccfbf1',
      ink: '#0f172a',
      inkLight: '#1e293b',
      surface: '#ffffff',
      surfaceAlt: '#f0fdfa',
    }
  },
  indigo: {
    name: 'Indigo',
    colors: {
      primary: '#6366f1',
      primaryDark: '#4338ca',
      primaryLight: '#818cf8',
      accent: '#a5b4fc',
      glow: '#c7d2fe',
      ink: '#0f172a',
      inkLight: '#1e293b',
      surface: '#ffffff',
      surfaceAlt: '#eef2ff',
    }
  }
};

// Helper function to convert hex to RGB
const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : null;
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('purple');

  useEffect(() => {
    // Apply theme to document root
    const theme = themes[currentTheme];
    const root = document.documentElement;
    
    Object.entries(theme.colors).forEach(([key, value]) => {
      const kebabKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      root.style.setProperty(`--${kebabKey}`, value);
      // Also set camelCase version for backward compatibility
      root.style.setProperty(`--${key}`, value);
      
      // Set RGB values for rgba() usage
      if (value.startsWith('#')) {
        const rgb = hexToRgb(value);
        if (rgb) {
          root.style.setProperty(`--${kebabKey}-rgb`, rgb);
          root.style.setProperty(`--${key}-rgb`, rgb);
        }
      }
    });

    // Store theme preference
    localStorage.setItem('safaipak-theme', currentTheme);
  }, [currentTheme]);

  const changeTheme = (themeName) => {
    if (themes[themeName]) {
      setCurrentTheme(themeName);
    }
  };

  const value = {
    currentTheme,
    themes,
    theme: themes[currentTheme],
    changeTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

