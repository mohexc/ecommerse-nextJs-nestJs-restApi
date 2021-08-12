import React, { useState, useContext } from "react";

const Context = React.createContext({});
// main component
const OrdersContext = ({ children }) => {
  const [orders, setOrders] = useState();

  const singIn = () => {
    return;
  };

  const signOut = () => {
    return;
  };

  const forgetPassword = () => {
    return;
  };

  const context = {
    orders,
    singIn,
    signOut,
    forgetPassword,
  };
  return <Context.Provider value={context}>{children}</Context.Provider>;
};

export const useOrdersContext = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error("Cannot use useAuth outside auth provider");
  }

  return context;
};

export default OrdersContext;
