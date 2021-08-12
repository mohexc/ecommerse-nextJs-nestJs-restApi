import React, { useState, useContext } from "react";

const Context = React.createContext({});
// main component
const CartsContext = ({ children }) => {
  const [carts, setcarts] = useState();

  const context = {
    carts,
  };
  return <Context.Provider value={context}>{children}</Context.Provider>;
};

export const useCartContext = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error("Cannot use useAuth outside auth provider");
  }

  return context;
};

export default CartsContext;
