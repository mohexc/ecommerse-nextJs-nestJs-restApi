import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from "react-query";
import httpRequests from "../utils/http-request";
import { Product, ProductContext } from "./type";

const Context = React.createContext<ProductContext>({
  products: undefined,
  loadingProducts: false,
  errorProducts: undefined,
  product: undefined,
  loadingProduct: false,
  errorProduct: undefined,
  createProduct: async (values) => {},
  getProducts: async () => {},
  getProduct: async (id) => {},
  updateProduct: async (id, values) => {},
  deleteProduct: (id) => {},
});

// main component
const ProductsContext = ({ children }) => {
  const [products, setProducts] = useState<Product[] | undefined>();
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [errorProducts, setErrorProducts] = useState();
  const [product, setProduct] = useState<Product | undefined>();
  const [loadingProduct, setLoadingProduct] = useState(false);
  const [errorProduct, setErrorProduct] = useState();

  useEffect(() => {
    getProducts();
  }, []);

  const createProduct = async (values) => {
    try {
      const { data } = await httpRequests.post(`product`, values);
      debugger;
      getProducts();
    } catch (error) {
      console.log(error);
      debugger;
      return error;
    }
  };

  const getProducts = async () => {
    setLoadingProducts(true);
    const { data } = await httpRequests.get(`product`);
    setProducts(data);
    setLoadingProducts(false);
  };

  const getProduct = async (id) => {
    setLoadingProduct(true);
    const { data } = await httpRequests.get(`product/${id}`);
    setProduct(data);
    setLoadingProduct(false);
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
    loadingProducts,
    errorProducts,
    product,
    loadingProduct,
    errorProduct,
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
