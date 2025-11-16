import { useContext } from "react";
import { useAuthContext } from "../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const { accessToken } = useAuthContext();

  if (accessToken) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;
