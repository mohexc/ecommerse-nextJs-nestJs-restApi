import React, { useState, useContext, useEffect } from "react";

interface ThemContext {
  color: string;
}

const Context = React.createContext<ThemContext>({
  color: "color",
});

// main component
const ThemContext = ({ children }) => {
  const [color, setColor] = useState("#1da57a");

  return <Context.Provider value={{ color }}>{children}</Context.Provider>;
};

export const useThemeContext = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error("Cannot use useAuth outside product provider");
  }

  return context;
};

export default ThemContext;
