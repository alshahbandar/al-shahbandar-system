import React from "react";
import AppRouter from "./router";

// Fallback for missing Toast
const FallbackToast = () => null;
const fallbackToast = { showToast: () => {}, ToastContainer: FallbackToast };

function App() {
  let toast;
  try {
    const { useToast } = require("./components/Toast");
    toast = useToast();
  } catch (error) {
    toast = fallbackToast;
  }
  
  const { ToastContainer } = toast;
  
  return React.createElement("div", {
    style: {
      direction: 'rtl',
      textAlign: 'right',
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
      minHeight: '100vh',
      backgroundColor: '#f8f9fa'
    }
  },
    React.createElement(AppRouter),
    React.createElement(ToastContainer)
  );
}

export default App;
