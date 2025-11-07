import React from "react";
import { useAuth } from "../hooks/useAuth";

const ProtectedComponent = ({ children, permission, fallback = null }) => {
  const { hasPermission, loading } = useAuth();

  if (loading) {
    return React.createElement("div", { 
      style: { padding: "10px", textAlign: "center" } 
    }, "Checking permissions...");
  }

  if (!permission || hasPermission(permission)) {
    return children;
  }

  return fallback || React.createElement("div", { 
    style: { 
      padding: "10px", 
      backgroundColor: "#ffe6e6", 
      color: "#d63031",
      border: "1px solid #d63031",
      borderRadius: "4px",
      textAlign: "center"
    } 
  }, "Access Denied: You don't have permission to view this content.");
};

export default ProtectedComponent;
