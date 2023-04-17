import React from "react";

interface ThemeContextValue {
  theme: string;
  setTheme: (theme: string) => void;
}

const ThemeContext = React.createContext<ThemeContextValue | undefined>(
  undefined
);

type ThemeProviderProps = {
  children: React.ReactNode;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = React.useState("light");

  // use Firebase to fetch and manage theme data here

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
