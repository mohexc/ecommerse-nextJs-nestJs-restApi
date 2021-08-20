export interface User {
    id: number;
    username: string;
    email: string;
    role: string;
}

export interface Product {
    name: string;
    title: string;
    description: string;
    price: number;
}

export interface ProductContext {
    products: Product[] | undefined;
    product: Product | undefined;
    isloading: boolean;
    createProduct: (values) => Promise<void>;
    getProducts: () => Promise<void>;
    getProduct: (id: string | string[]) => Promise<void>;
    updateProduct: (id, values) => Promise<void>;
    deleteProduct: (id: string) => void;
}

export interface SignUpInput {
    username: string
    email: string
    password: string
}