import { createContext, useContext } from 'react';

const ThemeContext = createContext({ theme: 'light', isDark: false });

// Single light minimalist theme — no dark mode toggle
export function ThemeProvider({ children }) {
  return (
    <ThemeContext.Provider value={{ theme: 'light', isDark: false }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
