import React, { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Check for saved theme preference or default to system preference
  const [theme, setTheme] = useState('system');
  // Track if we're in browser environment
  const [mounted, setMounted] = useState(false);
  
  // Handle mounting - only access window/document after component is mounted
  useEffect(() => {
    setMounted(true);
    // Load saved theme preference from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
    
    // Apply the appropriate theme class
    applyTheme(savedTheme || 'system');
  }, []);
  
  // Function to toggle between dark and light mode
  const toggleTheme = () => {
    if (!mounted) return; // Don't run if not mounted
    
    const newTheme = theme === 'dark' ? 'light' : theme === 'light' ? 'system' : 'dark';
    setTheme(newTheme);
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };
  
  // Function to apply the theme to the document
  const applyTheme = (currentTheme) => {
    if (!mounted) return; // Don't run if not mounted
    
    const root = window.document.documentElement;
    root.classList.remove('dark', 'light');
    
    if (currentTheme === 'system') {
      // Check system preference
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.add(systemPrefersDark ? 'dark' : 'light');
    } else {
      root.classList.add(currentTheme);
    }
  };
  
  // Listen for system preference changes
  useEffect(() => {
    if (!mounted) return; // Don't run if not mounted
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        applyTheme('system');
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, mounted]);
  
  // Use a different context value for server vs client rendering
  const contextValue = mounted ? { theme, toggleTheme } : { theme: 'system', toggleTheme: () => {} };
  
  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

export default ThemeProvider;