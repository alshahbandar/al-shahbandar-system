import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return React.createElement("div", {
    style: {
      padding: "50px",
      textAlign: "center",
      direction: "rtl",
      minHeight: "100vh",
      backgroundColor: "#f8f9fa",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    }
  },
    React.createElement("h1", {
      style: { 
        color: "#2c3e50", 
        marginBottom: "20px",
        fontSize: "2.5rem"
      }
    }, "نظام الشاهبندر للتجارة"),
    
    React.createElement("p", {
      style: { 
        fontSize: "1.2rem", 
        marginBottom: "40px", 
        color: "#666",
        maxWidth: "600px",
        lineHeight: "1.6"
      }
    }, "نظام متكامل لإدارة الأعمال التجارية، الفواتير، العملاء، والمخزون"),
    
    React.createElement("div", {
      style: {
        display: "flex",
        gap: "20px",
        flexWrap: "wrap",
        justifyContent: "center"
      }
    },
      user ? (
        // If user is logged in, show dashboard button
        React.createElement("button", {
          onClick: () => navigate("/dashboard"),
          style: {
            padding: "15px 30px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "18px",
            fontWeight: "bold",
            minWidth: "200px"
          }
        }, "🚀 الانتقال إلى لوحة التحكم")
      ) : (
        // If user is not logged in, show login/signup buttons
        React.createElement("div", {
          style: {
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            justifyContent: "center"
          }
        },
          React.createElement("button", {
            onClick: () => navigate("/login"),
            style: {
              padding: "15px 30px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "18px",
              fontWeight: "bold",
              minWidth: "200px"
            }
          }, "🔐 تسجيل الدخول"),
          
          React.createElement("button", {
            onClick: () => navigate("/dashboard"),
            style: {
              padding: "15px 30px",
              backgroundColor: "#6c757d",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "18px",
              fontWeight: "bold",
              minWidth: "200px"
            }
          }, "👀 تصفح النظام")
        )
      )
    ),
    
    // Features section
    React.createElement("div", {
      style: {
        marginTop: "60px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "30px",
        maxWidth: "1000px",
        width: "100%"
      }
    },
      React.createElement("div", {
        style: {
          padding: "30px",
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          textAlign: "center"
        }
      },
        React.createElement("div", { style: { fontSize: "3rem", marginBottom: "15px" } }, "🧾"),
        React.createElement("h3", { style: { margin: "0 0 15px 0", color: "#2c3e50" } }, "إدارة الفواتير"),
        React.createElement("p", { style: { margin: "0", color: "#666" } }, "إنشاء وإدارة الفواتير بسهولة")
      ),
      
      React.createElement("div", {
        style: {
          padding: "30px",
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          textAlign: "center"
        }
      },
        React.createElement("div", { style: { fontSize: "3rem", marginBottom: "15px" } }, "👥"),
        React.createElement("h3", { style: { margin: "0 0 15px 0", color: "#2c3e50" } }, "إدارة العملاء"),
        React.createElement("p", { style: { margin: "0", color: "#666" } }, "تسجيل ومتابعة بيانات العملاء")
      ),
      
      React.createElement("div", {
        style: {
          padding: "30px",
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          textAlign: "center"
        }
      },
        React.createElement("div", { style: { fontSize: "3rem", marginBottom: "15px" } }, "📦"),
        React.createElement("h3", { style: { margin: "0 0 15px 0", color: "#2c3e50" } }, "إدارة المنتجات"),
        React.createElement("p", { style: { margin: "0", color: "#666" } }, "مراقبة المخزون والمنتجات")
      ),
      
      React.createElement("div", {
        style: {
          padding: "30px",
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          textAlign: "center"
        }
      },
        React.createElement("div", { style: { fontSize: "3rem", marginBottom: "15px" } }, "💸"),
        React.createElement("h3", { style: { margin: "0 0 15px 0", color: "#2c3e50" } }, "المصروفات"),
        React.createElement("p", { style: { margin: "0", color: "#666" } }, "تسجيل ومتابعة المصروفات")
      )
    )
  );
};

export default Home;
