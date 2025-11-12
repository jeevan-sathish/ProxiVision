import React, { createContext, useEffect, useState } from "react";

import useArudinoData from "../components/hooks/useArudinoData.js";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const [proxiValue   , setProxiValue] = useState(null);
  const {arduinoData} =useArudinoData()
 
  useEffect(()=>{
    if(arduinoData<60){
      setTheme("dark")

    }else{
      setTheme("light")
    }

  },[arduinoData])

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };
   

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, proxiValue, setProxiValue }}>
      {children}
    </ThemeContext.Provider>
  );
};
