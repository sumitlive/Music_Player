import React from "react";
import ReactDOM from "react-dom/client"; // React 18+ uses ReactDOM.createRoot
import "./index.css"; // Global CSS
import App from "./app"; // Main App component

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
