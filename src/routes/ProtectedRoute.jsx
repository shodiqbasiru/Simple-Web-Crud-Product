import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const authService = AuthService();

  useEffect(() => {
    const checkToken = async () => {
      if (
        !localStorage.getItem("token") ||
        !(await authService.validateToken() === 200)
      ) {
        navigate("/login");
      }
    };
    checkToken();
  }, [navigate, authService]);

  return children;
};

export default ProtectedRoute;