import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();
  console.log("currentUser from PrivateRoute", currentUser);

  if (!currentUser) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
