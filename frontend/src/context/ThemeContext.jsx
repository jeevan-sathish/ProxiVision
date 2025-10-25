import React, { createContext, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const [proxiValue   , setProxiValue] = useState(null);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };
   

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, proxiValue, setProxiValue }}>
      {children}
    </ThemeContext.Provider>
  );
};
