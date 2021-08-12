import React from "react";
import { useAuthContext } from "../../context/auth.context";
import HomePage from "../../pages";

const ProtectRoute = ({ children }) => {
  const { currentUser } = useAuthContext();
  if (!currentUser) return <HomePage />;
  return children;
};

export default ProtectRoute;
