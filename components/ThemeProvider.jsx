import React, { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Initialize with system preference, but don't cause hydration errors
  const [theme, setTheme] = useState('light');
  const [mounted, setMounted] = useState(false);
  
  // Only run after component mounts (client-side)
  useEffect(() => {
    setMounted(true);
    
    // Check for system preference for dark mode
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme based on system preference only
    const initialTheme = systemPrefersDark ? 'dark' : 'light';
    setTheme(initialTheme);
    
    // Apply theme class to document
    document.documentElement.classList.add(initialTheme);
    
    // Listen for system preference changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      const newTheme = e.matches ? 'dark' : 'light';
      setTheme(newTheme);
      document.documentElement.classList.remove('dark', 'light');
      document.documentElement.classList.add(newTheme);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  // Toggle theme manually
  const toggleTheme = () => {
    if (!mounted) return;
    
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(newTheme);
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

export default ThemeProvider;