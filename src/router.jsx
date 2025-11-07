import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const Home = () => React.createElement("div", 
  { style: { padding: "50px", textAlign: "center", backgroundColor: "lightgreen" } },
  React.createElement("h1", null, "الصفحة الرئيسية"),
  React.createElement(Link, { to: "/dashboard", style: { display: "block", marginTop: "20px" } }, "اذهب إلى لوحة التحكم")
);

const Dashboard = () => React.createElement("div", 
  { style: { padding: "50px", textAlign: "center", backgroundColor: "lightyellow" } },
  React.createElement("h1", null, "لوحة التحكم"),
  React.createElement(Link, { to: "/", style: { display: "block", marginTop: "20px" } }, "العودة للصفحة الرئيسية")
);

const AppRouter = () => {
  console.log("Router is rendering");
  
  return React.createElement(Router, null,
    React.createElement("div", null,
      React.createElement("nav", { style: { padding: "20px", backgroundColor: "#333", color: "white" } },
        React.createElement(Link, { to: "/", style: { color: "white", margin: "0 10px" } }, "الرئيسية"),
        React.createElement(Link, { to: "/dashboard", style: { color: "white", margin: "0 10px" } }, "لوحة التحكم")
      ),
      React.createElement(Routes, null,
        React.createElement(Route, { path: "/", element: React.createElement(Home) }),
        React.createElement(Route, { path: "/dashboard", element: React.createElement(Dashboard) })
      )
    )
  );
};

export default AppRouter;
