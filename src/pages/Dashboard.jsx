import React from "react";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../services/firebase-simple";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  console.log("Dashboard rendering:", { user, loading, error });

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (loading) {
    return React.createElement("div", {
      style: {
        padding: "50px",
        textAlign: "center",
        direction: "rtl",
        backgroundColor: "yellow"
      }
    }, "جاري تحميل البيانات...");
  }

  if (error) {
    return React.createElement("div", {
      style: {
        padding: "50px",
        textAlign: "center",
        direction: "rtl",
        backgroundColor: "red",
        color: "white"
      }
    }, `خطأ: ${error.message}`);
  }

  if (!user) {
    return React.createElement("div", {
      style: {
        padding: "50px",
        textAlign: "center",
        direction: "rtl",
        backgroundColor: "orange"
      }
    }, "لم يتم تسجيل الدخول بعد");
  }

  return React.createElement("div", {
    style: {
      padding: "30px",
      maxWidth: "1200px",
      margin: "0 auto",
      direction: "rtl",
      backgroundColor: "lightgreen",
      minHeight: "100vh"
    }
  },
    React.createElement("h1", {
      style: { color: "darkblue", marginBottom: "20px" }
    }, "لوحة التحكم - نظام الشاهبندر للتجارة"),
    
    React.createElement("p", {
      style: { fontSize: "18px", marginBottom: "20px" }
    }, `مرحباً، ${user.email}`),
    
    React.createElement("div", {
      style: { 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
        gap: "20px", 
        marginBottom: "30px" 
      }
    },
      React.createElement("button", {
        onClick: () => navigate("/invoices/new"),
        style: {
          padding: "15px",
          backgroundColor: "#28a745",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "16px"
        }
      }, "إنشاء فاتورة"),
      
      React.createElement("button", {
        onClick: () => navigate("/customers"),
        style: {
          padding: "15px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "16px"
        }
      }, "العملاء"),
      
      React.createElement("button", {
        onClick: () => navigate("/products"),
        style: {
          padding: "15px",
          backgroundColor: "#6f42c1",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "16px"
        }
      }, "المنتجات")
    ),
    
    React.createElement("button", {
      onClick: handleLogout,
      style: {
        padding: "10px 20px",
        backgroundColor: "#dc3545",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer"
      }
    }, "تسجيل الخروج")
  );
};

export default Dashboard;
