import React, { useState, useContext, useEffect } from "react";

interface CartContextInterface {
  cart: any;
  addCartItem: (product) => void;
  removeCratItem: (product) => void;
}

const Context = React.createContext<CartContextInterface>({
  cart: [],
  addCartItem: (product) => {},
  removeCratItem: (product) => {},
});

// main component
const CartsContext = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  const addCartItem = (product) => {
    console.log(product);
    debugger;
    const cloneCart = [...cart];
    const findeCartItem = cloneCart.find((cartItem) => product.id === cartItem.product.id);
    const findeCartItemIndex = cloneCart.findIndex((cartItem) => product.id === cartItem.product.id);
    if (findeCartItem) {
      console.log(findeCartItem);
      debugger;
      findeCartItem.qyt = findeCartItem.qyt + 1;
      cloneCart[findeCartItemIndex] = findeCartItem;
      return setCart(cloneCart);
    } else {
      const cartItem = {
        product,
        qyt: 1,
      };
      cloneCart.push(cartItem);
      return setCart(cloneCart);
    }
  };

  const removeCratItem = (product) => {
    const cloneCart = [...cart];
    const findeCartItem = cloneCart.find((cartItem) => product.id === cartItem.product.id);
    const findeCartItemIndex = cloneCart.find((cartItem) => product.id === cartItem.product.id);
    if (findeCartItem) {
      findeCartItem.qyt = findeCartItem.qyt - 1;
      cloneCart[findeCartItemIndex] = findeCartItem;
      return setCart(cloneCart);
    } else {
      cloneCart.push(product);
    }
  };
  const clearCart = () => {
    setCart([]);
  };

  return (
    <Context.Provider
      value={{
        cart,
        addCartItem,
        removeCratItem,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error("Cannot use useAuth outside auth provider");
  }

  return context;
};

export default CartsContext;
