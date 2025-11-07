import React from "react";
import AppRouter from "./router";

function App() {
  console.log("App component is rendering with router!");
  
  return React.createElement(
    "div",
    { 
      style: { 
        minHeight: "100vh",
        direction: "rtl"
      } 
    },
    React.createElement(AppRouter)
  );
}

export default App;
