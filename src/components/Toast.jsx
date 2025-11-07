import React, { useState, useEffect } from "react";

const Toast = ({ message, type = "info", duration = 5000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getBackgroundColor = () => {
    switch (type) {
      case "success": return "#2ecc71";
      case "error": return "#e74c3c";
      case "warning": return "#f39c12";
      case "info": return "#3498db";
      default: return "#3498db";
    }
  };

  if (!isVisible) return null;

  return React.createElement("div", {
    style: {
      position: "fixed",
      top: "20px",
      left: "20px",
      backgroundColor: getBackgroundColor(),
      color: "white",
      padding: "12px 20px",
      borderRadius: "4px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      zIndex: 1000,
      maxWidth: "300px",
      animation: "slideIn 0.3s ease-out",
      opacity: isVisible ? 1 : 0,
      transition: "opacity 0.3s ease-out"
    }
  },
    React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }
    },
      React.createElement("span", null, message),
      React.createElement("button", {
        onClick: () => {
          setIsVisible(false);
          setTimeout(onClose, 300);
        },
        style: {
          background: "none",
          border: "none",
          color: "white",
          fontSize: "16px",
          cursor: "pointer",
          marginLeft: "10px",
          padding: "0",
          width: "20px",
          height: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }, "×")
    )
  );
};

// Toast Manager Component
export const ToastManager = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = "info", duration = 5000) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type, duration }]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return {
    toasts,
    addToast,
    removeToast,
    ToastContainer: () => React.createElement("div", null,
      toasts.map(toast =>
        React.createElement(Toast, {
          key: toast.id,
          message: toast.message,
          type: toast.type,
          duration: toast.duration,
          onClose: () => removeToast(toast.id)
        })
      )
    )
  };
};

// Hook to use toast
export const useToast = () => {
  const [toastManager] = useState(() => new ToastManager());
  
  return {
    showToast: toastManager.addToast,
    ToastContainer: toastManager.ToastContainer
  };
};

export default Toast;
