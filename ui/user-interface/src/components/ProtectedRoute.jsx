import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../api";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoggedIn(false);
        setLoading(false);
        return;
      }

      try {
        await api.get("current-user/");
        setLoggedIn(true);
      } catch {
        setLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (loading) return <p>Loading...</p>;
  return loggedIn ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
