import React, { useState, useContext, useEffect } from "react";
import { useAuthContext } from "./auth.context";

export interface Product {
  id: number;
  name: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  video: string;
  brand: string;
  category: string;
  countInStock: number;
}
export interface ProductContext {
  products: Product[] | undefined;
  product: Product | undefined;
  isloading: boolean;
  createProduct: (values) => Promise<any>;
  getProducts: () => Promise<void>;
  getProduct: (id: string | string[]) => Promise<any>;
  updateProduct: (id, values) => Promise<any>;
  deleteProduct: (id: string) => void;
}

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
  const { httpRequests } = useAuthContext();
  useEffect(() => {
    getProducts();
  }, []);

  const createProduct = async (values) => {
    try {
      const { data } = await httpRequests.post(`product`, values);
      getProducts();
      return data;
    } catch (error) {
      const result = error.response.data ? error.response.data.message[0] : error.response.message;
      return {
        error: true,
        message: result,
      };
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
    return data;
  };

  const updateProduct = async (id, values) => {
    try {
      console.log(id, values);
      debugger;
      const { data } = await httpRequests.patch(`product/${id}`, values);
      console.log(data);
      debugger;
      getProducts();
      return data;
    } catch (error) {
      const result = error.response.data ? error.response.data.message[0] : error.response.message;
      return {
        error: true,
        message: result,
      };
    }
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
