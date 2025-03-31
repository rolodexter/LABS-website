import React, { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Initialize with light theme
  const [theme, setTheme] = useState('light');
  const [mounted, setMounted] = useState(false);
  
  // Only run after component mounts (client-side)
  useEffect(() => {
    setMounted(true);
    // Default to light mode for simplicity during maintenance
    document.documentElement.classList.add('light');
  }, []);
  
  return (
    <ThemeContext.Provider value={{ theme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

export default ThemeProvider;