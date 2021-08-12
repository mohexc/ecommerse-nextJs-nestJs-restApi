import React, { useState, useContext, useEffect } from "react";
import { users as listUser } from "../utils/db";
import { AuthContextInterface, SingInInput, User } from "./type";

const Context = React.createContext<AuthContextInterface>({
  currentUser: undefined,
  signIn: () => {},
  signUp: () => {},
  signOut: () => {},
  forgetPassword: () => {},
});
// main component
const AuthContext = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));

    if (user) {
      setCurrentUser(user);
    }
  }, []);
  const signIn = (data: SingInInput) => {
    try {
      const { password, ...user } = listUser.find((user) => user.username === data.username);
      if (!user) throw new Error("User not found");
      setCurrentUser(user);
      localStorage.setItem("currentUser", JSON.stringify(user));
      return "Sign In Successfully";
    } catch (error) {
      return error;
    }
  };
  const signUp = () => {
    return;
  };
  const signOut = () => {
    // localStorage.removeItem("currentUser");
    setCurrentUser(undefined);
  };
  const forgetPassword = () => {
    return;
  };

  const context = {
    currentUser,
    signIn,
    signUp,
    signOut,
    forgetPassword,
  };

  return <Context.Provider value={context}>{children}</Context.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error("Cannot use useAuth outside auth provider");
  }

  return context;
};

export default AuthContext;
