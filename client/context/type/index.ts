export interface User {
    id: number;
    username: string;
    email: string;
    role: string;
}

export interface SingInInput {
    username: string;
    password: string;
}

export interface AuthContextInterface {
    currentUser: User | undefined;
    signIn: (data: SingInInput) => any;
    signUp: () => void;
    signOut: () => void;
    forgetPassword: () => void;
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