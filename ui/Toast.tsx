"use client";

import React, { createContext, useContext, useState, useCallback, useRef } from "react";
import { MdClose, MdCheckCircle, MdError, MdInfo, MdWarning } from "react-icons/md";

/* ─────────── Types ─────────── */
type ToastType = "success" | "error" | "info" | "warning";

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
};

/* ─────────── Icons & Colors ─────────── */
const iconMap: Record<ToastType, React.ReactNode> = {
  success: <MdCheckCircle size={22} />,
  error: <MdError size={22} />,
  info: <MdInfo size={22} />,
  warning: <MdWarning size={22} />,
};

const colorMap: Record<ToastType, string> = {
  success: "bg-emerald-600 text-white",
  error: "bg-red-600 text-white",
  info: "bg-blue-600 text-white",
  warning: "bg-amber-500 text-white",
};

/* ─────────── Provider ─────────── */
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const idRef = useRef(0);

  const showToast = useCallback((message: string, type: ToastType = "info") => {
    const id = ++idRef.current;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast Container */}
      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[9999] flex flex-col gap-3 items-center pointer-events-none w-[90vw] max-w-md">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl font-bold text-sm animate-slide-up ${colorMap[toast.type]}`}
            dir="rtl"
          >
            {iconMap[toast.type]}
            <span className="flex-1">{toast.message}</span>
            <button onClick={() => removeToast(toast.id)} className="opacity-70 hover:opacity-100 transition-opacity cursor-pointer">
              <MdClose size={18} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
