export interface User {
    id: number;
    username: string;
    email: string;
    role: string;
}

export interface SignUpInput {
    username: string
    email: string
    password: string
}