import axios, { AxiosInstance } from "axios";
import React, { useState, useContext, useEffect } from "react";
import { SignUpInput, User } from "./type";

export interface SignInInput {
  username: string;
  password: string;
}
export interface AuthContextInterface {
  currentUser: User | undefined;
  signIn: (data: SignInInput) => Promise<any>;
  signUp: (data: SignUpInput) => Promise<any>;
  signOut: () => void;
  httpRequests: AxiosInstance;
}
const Context = React.createContext<AuthContextInterface>({
  currentUser: undefined,
  signIn: async () => {},
  signUp: async () => {},
  signOut: () => {},
  httpRequests: axios.create({ baseURL: "http://localhost:3001/" }),
});
// main component
const AuthContext = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);
  const [tokenKey, setTokenKey] = useState<string | undefined>();

  useEffect(() => {
    setTokenKey(localStorage.getItem("tokenKey"));
  }, []);

  useEffect(() => {
    if (tokenKey) {
      getProfile();
    }
  }, [tokenKey]);

  const httpRequests = axios.create({
    baseURL: "http://localhost:3001/",
    headers: { Authorization: `Bearer ${tokenKey}` },
  });

  const signIn = async (values: SignInInput) => {
    try {
      const { data } = await httpRequests.post("auth/login", values);
      setTokenKey(data.access_token);
      localStorage.setItem("tokenKey", data.access_token);
      return data;
    } catch (error) {
      const result = error.response ? error.response.data.message[0] : error.response.message;
      return {
        error: true,
        message: result,
      };
    }
  };

  const getProfile = async () => {
    try {
      const { data } = await httpRequests.get("auth/profile");
      setCurrentUser(data);
    } catch (error) {
      localStorage.removeItem("tokenKey");
    }
  };

  const signUp = async (values: SignUpInput) => {
    try {
      const { data } = await httpRequests.post("users", { ...values, role: "user" });
      return data;
    } catch (error) {
      const result = error.response ? error.response.data.message[0] : error.response.message;
      return {
        error: true,
        message: result,
      };
    }
  };

  const signOut = () => {
    localStorage.removeItem("tokenKey");
    setCurrentUser(undefined);
  };

  return (
    <Context.Provider
      value={{
        httpRequests,
        currentUser,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error("Cannot use useAuth outside auth provider");
  }

  return context;
};

export default AuthContext;
