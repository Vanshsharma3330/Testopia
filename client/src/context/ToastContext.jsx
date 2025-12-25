import React, { createContext, useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import Toast from "../shared/components/toast";

export const ToastContext = createContext();

export default function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  const showToast = useCallback((status, msg, duration = 3000) => {
    setToast({ status, msg, duration });

    setTimeout(() => {
      setToast(null);
    }, duration);
  }, []);

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <div className="fixed bottom-7 right-7 z-50">
        <AnimatePresence>
          {toast && (
            <Toast
              key="toast"
              status={toast.status}
              msg={toast.msg}
              setToast={setToast}
            />
          )}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
