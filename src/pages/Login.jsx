import React, { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase-simple";
import { useNavigate } from "react-router-dom";
import { validateForm, validationSchemas } from "../utils/validation";
import { handleError, handleSuccess } from "../utils/errorHandler";
import { useToast } from "../components/Toast";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const { showToast, ToastContainer } = useToast();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear field error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateCurrentForm = () => {
    const schema = isLogin ? validationSchemas.login : validationSchemas.login;
    const validation = validateForm(formData, schema);
    setErrors(validation.errors);
    return validation.isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateCurrentForm()) {
      showToast("Please fix the errors before submitting", "error");
      return;
    }

    setLoading(true);
    
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
        showToast("Login successful!", "success");
        navigate("/dashboard");
      } else {
        await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        showToast("Account created successfully!", "success");
        navigate("/dashboard");
      }
    } catch (error) {
      const handledError = handleError(error, "authentication");
      showToast(handledError.message, "error");
      console.error("Auth error:", error);
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setFormData({ email: "", password: "" });
  };

  return React.createElement("div", { 
    style: { 
      maxWidth: "400px", 
      margin: "50px auto", 
      padding: "30px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
    } 
  },
    // Toast Container
    React.createElement(ToastContainer),
    
    React.createElement("h2", { style: { textAlign: "center", marginBottom: "20px" } }, 
      isLogin ? "Login" : "Sign Up"
    ),
    
    React.createElement("form", { onSubmit: handleSubmit },
      React.createElement("div", { style: { marginBottom: "15px" } },
        React.createElement("input", {
          type: "email",
          placeholder: "Email",
          value: formData.email,
          onChange: (e) => handleInputChange("email", e.target.value),
          required: true,
          style: {
            width: "100%",
            padding: "12px",
            border: `1px solid ${errors.email ? "#e74c3c" : "#ccc"}`,
            borderRadius: "4px",
            boxSizing: "border-box",
            fontSize: "16px"
          }
        }),
        errors.email && React.createElement("div", { 
          style: { 
            color: "#e74c3c", 
            fontSize: "14px", 
            marginTop: "5px" 
          } 
        }, errors.email)
      ),
      
      React.createElement("div", { style: { marginBottom: "20px" } },
        React.createElement("input", {
          type: "password",
          placeholder: "Password",
          value: formData.password,
          onChange: (e) => handleInputChange("password", e.target.value),
          required: true,
          style: {
            width: "100%",
            padding: "12px",
            border: `1px solid ${errors.password ? "#e74c3c" : "#ccc"}`,
            borderRadius: "4px",
            boxSizing: "border-box",
            fontSize: "16px"
          }
        }),
        errors.password && React.createElement("div", { 
          style: { 
            color: "#e74c3c", 
            fontSize: "14px", 
            marginTop: "5px" 
          } 
        }, errors.password)
      ),
      
      React.createElement("button", { 
        type: "submit",
        disabled: loading,
        style: {
          width: "100%",
          padding: "12px",
          backgroundColor: loading ? "#6c757d" : "#007bff",
          color: "white",
          border: "none",
          borderRadius: "4px",
          fontSize: "16px",
          cursor: loading ? "not-allowed" : "pointer"
        }
      }, loading ? "Processing..." : (isLogin ? "Login" : "Sign Up"))
    ),
    
    React.createElement("p", { 
      style: { textAlign: "center", marginTop: "20px" } 
    },
      isLogin ? "Don't have an account? " : "Already have an account? ",
      React.createElement("button", {
        onClick: switchMode,
        style: {
          background: "none",
          border: "none",
          color: "#007bff",
          cursor: "pointer",
          textDecoration: "underline"
        }
      }, isLogin ? "Sign Up" : "Login")
    ),
    
    React.createElement("button", { 
      onClick: () => navigate("/"),
      style: {
        width: "100%",
        padding: "10px",
        marginTop: "15px",
        backgroundColor: "#6c757d",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer"
      }
    }, "Back to Home")
  );
};

export default Login;
