import React, { useState, useContext, useEffect } from "react";

import httpRequests from "../utils/http-request";
import { Product, ProductContext } from "./type";

const Context = React.createContext<ProductContext>({
  products: undefined,
  product: undefined,
  isloading: false,
  createProduct: async () => {},
  getProducts: async () => {},
  getProduct: async () => undefined,
  updateProduct: async () => {},
  deleteProduct: () => {},
});

// main component
const ProductsContext = ({ children }) => {
  const [products, setProducts] = useState<Product[] | undefined>();
  const [product, setProduct] = useState<Product | undefined>();
  const [isloading, setIsLoading] = useState(false);

  useEffect(() => {
    getProducts();
  }, []);

  const createProduct = async (values) => {
    try {
      const { data } = await httpRequests.post(`product`, values);
      getProducts();
    } catch (error) {
      return error;
    }
  };

  const getProducts = async () => {
    setIsLoading(true);
    const { data } = await httpRequests.get(`product`);
    setProducts(data);
    setIsLoading(false);
  };

  const getProduct = async (id) => {
    setIsLoading(true);
    const { data } = await httpRequests.get(`product/${id}`);
    setProduct(data);
    setIsLoading(false);
  };

  const updateProduct = async (id, values) => {
    const { data } = await httpRequests.patch(`product/${id}`, values);
    getProducts();
    return;
  };

  const deleteProduct = async (id) => {
    const { data } = await httpRequests.delete(`product/${id}`);
    getProducts();
    return data;
  };

  const context = {
    products,
    product,
    isloading,
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct,
  };

  return <Context.Provider value={context}>{children}</Context.Provider>;
};

export const useProductsContext = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error("Cannot use useAuth outside product provider");
  }

  return context;
};

export default ProductsContext;
