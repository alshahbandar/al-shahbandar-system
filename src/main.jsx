import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

console.log("main.jsx is executing!");

try {
  const rootElement = document.getElementById("root");
  console.log("Root element:", rootElement);
  
  if (!rootElement) {
    throw new Error("Could not find root element!");
  }
  
  const root = ReactDOM.createRoot(rootElement);
  root.render(React.createElement(App));
  console.log("React app rendered successfully!");
} catch (error) {
  console.error("Error rendering React app:", error);
}
