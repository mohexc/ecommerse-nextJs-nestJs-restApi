import React, { useState, useContext, useEffect } from "react";
import httpRequests from "../utils/http-request";
interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}
interface UsersContext {
  users: User[] | undefined;
  createUser: () => Promise<void>;
  getUsers: () => Promise<void>;
  getUser: () => Promise<void>;
  upadateUser: () => Promise<void>;
  deleteUser: () => Promise<void>;
}

const Context = React.createContext<UsersContext>({
  users: undefined,
  createUser: async () => {},
  getUsers: async () => {},
  getUser: async () => {},
  upadateUser: async () => {},
  deleteUser: async () => {},
});
// main component
const UsersContext = ({ children }) => {
  const [users, setUsers] = useState<User[] | undefined>();

  useEffect(() => {
    getUsers();
  }, []);

  const createUser = async () => {};
  const getUsers = async () => {
    const { data } = await httpRequests.get("user");
    setUsers(data);
  };
  const getUser = async () => {};
  const upadateUser = async () => {};
  const deleteUser = async () => {};

  const context = {
    users,
    createUser,
    getUsers,
    getUser,
    upadateUser,
    deleteUser,
  };
  return <Context.Provider value={context}>{children}</Context.Provider>;
};

export const useUsersContext = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error("Cannot use useUsersContext outside user provider");
  }

  return context;
};

export default UsersContext;
