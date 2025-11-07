import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return React.createElement("div", { 
    style: { 
      padding: "40px", 
      textAlign: "center",
      maxWidth: "600px",
      margin: "0 auto"
    } 
  },
    React.createElement("h1", { style: { color: "darkblue", marginBottom: "20px" } }, 
      "Al Shahbandar System"
    ),
    React.createElement("p", { style: { fontSize: "18px", marginBottom: "30px" } }, 
      "Welcome to the management system"
    ),
    React.createElement("div", { style: { display: "flex", gap: "15px", justifyContent: "center" } },
      React.createElement("button", { 
        onClick: () => navigate("/login"),
        style: { 
          padding: "12px 24px", 
          fontSize: "16px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }
      }, "Login"),
      React.createElement("button", { 
        onClick: () => navigate("/dashboard"),
        style: { 
          padding: "12px 24px", 
          fontSize: "16px",
          backgroundColor: "#28a745",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }
      }, "Dashboard")
    )
  );
};

export default Home;
