import React, { useState, useContext, useEffect } from "react";
import { useAuthContext } from "./auth.context";

export interface CreateUserInput {
  username: string;
  password: string;
  email: string;
  role: string;
}
interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}
interface UsersContext {
  users: User[] | undefined;
  user: User;
  isLoading: boolean;
  createUser: (user: CreateUserInput) => Promise<void>;
  getUsers: () => Promise<void>;
  getUser: (id) => Promise<void>;
  updateUser: (id, data) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
}

const Context = React.createContext<UsersContext>({
  users: undefined,
  user: undefined,
  isLoading: false,
  createUser: async () => {},
  getUsers: async () => {},
  getUser: async () => undefined,
  updateUser: async () => {},
  deleteUser: async () => {},
});
// main component
const UsersContext = ({ children }) => {
  const [users, setUsers] = useState<User[] | undefined>();
  const [user, setUser] = useState<User | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const { httpRequests } = useAuthContext();
  useEffect(() => {
    getUsers();
  }, []);

  const createUser = async (user: CreateUserInput) => {
    try {
      const { data } = await httpRequests.post("users", user);
      getUsers();
      return data;
    } catch (error) {
      return error;
    }
  };

  const getUsers = async () => {
    try {
      setIsLoading(true);
      const { data } = await httpRequests.get("users");
      setUsers(data);
      setIsLoading(false);
    } catch (error) {
      return error;
    }
  };

  const getUser = async (id) => {
    try {
      setIsLoading(true);
      const { data } = await httpRequests.get(`users/${id}`);
      debugger;
      setUser(data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = async (id, values) => {
    try {
      const { data } = await httpRequests.patch(`users/${id}`, values);
      getUsers();
      return data;
    } catch (error) {
      return error;
    }
  };

  const deleteUser = async (id: number) => {
    await httpRequests.delete(`users/${id}`);
    getUsers();
  };

  return (
    <Context.Provider
      value={{
        users,
        user,
        isLoading,
        createUser,
        getUsers,
        getUser,
        updateUser,
        deleteUser,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useUsersContext = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error("Cannot use useUsersContext outside user provider");
  }

  return context;
};

export default UsersContext;
