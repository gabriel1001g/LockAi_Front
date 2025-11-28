import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { LocacaoProvider } from "./contexts/LocacaoContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
       <LocacaoProvider> 
          <App />
        </LocacaoProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
