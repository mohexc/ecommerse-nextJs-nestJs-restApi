import React, { FC } from "react";
import AuthContext from "./auth.context";
import CartsContext from "./carts.context";
import OrdersContext from "./orders.context";
import ProductsContext from "./products.context";
import UsersContext from "./users.context";

const StoreContext: FC = ({ children }) => {
  return (
    <AuthContext>
      <UsersContext>
        <ProductsContext>
          <CartsContext>
            <OrdersContext>{children}</OrdersContext>
          </CartsContext>
        </ProductsContext>
      </UsersContext>
    </AuthContext>
  );
};

export default StoreContext;
