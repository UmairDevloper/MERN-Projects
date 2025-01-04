import React from "react";
import { getUserToken } from "../../utils/token";
import { Navigate } from "react-router-dom";
const AuthRoute = ({ children }) => {
  const token = getUserToken();
  if (!token) {
    return <Navigate to="/login" />;
  }
  return children; // Render the component if authenticated
};

export default AuthRoute;
