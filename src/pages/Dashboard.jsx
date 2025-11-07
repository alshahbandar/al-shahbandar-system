import React from "react";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../services/firebase-simple";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return React.createElement("div", {
    style: {
      padding: "30px",
      maxWidth: "1200px",
      margin: "0 auto",
      direction: "rtl",
      minHeight: "100vh",
      backgroundColor: "#f8f9fa"
    }
  },
    {/* Header */}
    React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "30px",
        paddingBottom: "20px",
        borderBottom: "1px solid #ddd"
      }
    },
      React.createElement("div", null,
        React.createElement("h1", {
          style: {
            color: "#2c3e50",
            margin: "0 0 5px 0",
            fontSize: "28px"
          }
        }, "نظام الشاهبندر للتجارة"),
        user && React.createElement("p", {
          style: {
            color: "#666",
            margin: "0"
          }
        }, `مرحباً، ${user.email}`)
      ),
      React.createElement("button", {
        onClick: handleLogout,
        style: {
          padding: "10px 20px",
          backgroundColor: "#dc3545",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "14px"
        }
      }, "تسجيل الخروج")
    ),

    {/* Quick Stats */}
    React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "20px",
        marginBottom: "40px"
      }
    },
      React.createElement("div", {
        style: {
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          textAlign: "center"
        }
      },
        React.createElement("div", { style: { fontSize: "24px", color: "#28a745", marginBottom: "10px" } }, "💰"),
        React.createElement("h3", { style: { margin: "0 0 10px 0", color: "#2c3e50" } }, "إجمالي المبيعات"),
        React.createElement("p", { style: { margin: "0", fontSize: "20px", fontWeight: "bold", color: "#28a745" } }, "٠ ج.م")
      ),
      
      React.createElement("div", {
        style: {
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          textAlign: "center"
        }
      },
        React.createElement("div", { style: { fontSize: "24px", color: "#007bff", marginBottom: "10px" } }, "👥"),
        React.createElement("h3", { style: { margin: "0 0 10px 0", color: "#2c3e50" } }, "عدد العملاء"),
        React.createElement("p", { style: { margin: "0", fontSize: "20px", fontWeight: "bold", color: "#007bff" } }, "٠")
      ),
      
      React.createElement("div", {
        style: {
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          textAlign: "center"
        }
      },
        React.createElement("div", { style: { fontSize: "24px", color: "#6f42c1", marginBottom: "10px" } }, "📦"),
        React.createElement("h3", { style: { margin: "0 0 10px 0", color: "#2c3e50" } }, "المنتجات"),
        React.createElement("p", { style: { margin: "0", fontSize: "20px", fontWeight: "bold", color: "#6f42c1" } }, "٠")
      ),
      
      React.createElement("div", {
        style: {
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          textAlign: "center"
        }
      },
        React.createElement("div", { style: { fontSize: "24px", color: "#fd7e14", marginBottom: "10px" } }, "🧾"),
        React.createElement("h3", { style: { margin: "0 0 10px 0", color: "#2c3e50" } }, "الفواتير"),
        React.createElement("p", { style: { margin: "0", fontSize: "20px", fontWeight: "bold", color: "#fd7e14" } }, "٠")
      )
    ),

    {/* Quick Actions */}
    React.createElement("div", null,
      React.createElement("h2", {
        style: {
          marginBottom: "20px",
          color: "#2c3e50"
        }
      }, "الإجراءات السريعة"),
      
      React.createElement("div", {
        style: {
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "15px"
        }
      },
        React.createElement("button", {
          onClick: () => navigate("/invoices"),
          style: {
            padding: "20px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
            textAlign: "right",
            display: "flex",
            alignItems: "center",
            gap: "10px"
          }
        }, "🧾 إدارة الفواتير"),
        
        React.createElement("button", {
          onClick: () => navigate("/customers"),
          style: {
            padding: "20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
            textAlign: "right",
            display: "flex",
            alignItems: "center",
            gap: "10px"
          }
        }, "👥 إدارة العملاء"),
        
        React.createElement("button", {
          onClick: () => navigate("/products"),
          style: {
            padding: "20px",
            backgroundColor: "#6f42c1",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
            textAlign: "right",
            display: "flex",
            alignItems: "center",
            gap: "10px"
          }
        }, "📦 إدارة المنتجات"),
        
        React.createElement("button", {
          onClick: () => navigate("/expenses"),
          style: {
            padding: "20px",
            backgroundColor: "#fd7e14",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
            textAlign: "right",
            display: "flex",
            alignItems: "center",
            gap: "10px"
          }
        }, "💸 المصروفات")
      )
    )
  );
};

export default Dashboard;
