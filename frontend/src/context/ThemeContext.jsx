// src/context/ThemeContext.jsx
import React, { createContext, useContext, useState } from 'react';

const themes = {
  tomato: {
    background: '#FF6347',
    text: '#FFFFFF',
    buttonBg: '#FFFFFF',
    buttonText: '#FF6347',
    link: '#FFFFFF',
  },
  dark: {
    background: '#1c1c1c',
    text: '#eaeaea',
    buttonBg: '#333333',
    buttonText: '#eaeaea',
    link: '#FF6347',
  },
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [themeName, setThemeName] = useState('tomato');

  const toggleTheme = () => {
    setThemeName(prev => (prev === 'tomato' ? 'dark' : 'tomato'));
  };

  return (
    <ThemeContext.Provider value={{ theme: themes[themeName], toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
