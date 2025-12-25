import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "../assets/styles/globals.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import ToastProvider from "../context/ToastContext.jsx";
import AuthProvider from "../context/AuthContext.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </ToastProvider>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
);
