import React, { createContext, useContext, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type ToastType = "success" | "error" | "info" | "warning";

export interface ToastMessage {
  id: string;
  message: string;
  description?: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType, description?: string) => void;
  dismissToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback((message: string, type: ToastType = "success", description?: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type, description }]);

    // Auto-dismiss after 4 seconds
    setTimeout(() => {
      dismissToast(id);
    }, 4000);
  }, [dismissToast]);

  return (
    <ToastContext.Provider value={{ showToast, dismissToast }}>
      {children}
      {/* Toast Portalled View - Rendered fixed at bottom-right */}
      <div 
        className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 w-full max-w-sm pointer-events-none"
        id="global-toast-container"
        role="live"
        aria-live="polite"
      >
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.15 } }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className={cn(
                "w-full p-4 rounded-2xl border backdrop-blur-xl shadow-2xl pointer-events-auto flex items-start gap-3.5 relative overflow-hidden",
                toast.type === "success" && "bg-zinc-950/95 border-brand-teal/40 shadow-brand-teal/5",
                toast.type === "error" && "bg-zinc-950/95 border-red-500/40 shadow-red-500/5",
                (toast.type === "info" || toast.type === "warning") && "bg-zinc-950/95 border-brand-amber/40 shadow-brand-amber/5"
              )}
              id={`toast-message-${toast.id}`}
            >
              {/* Progress Slider animation line */}
              <motion.div 
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 4, ease: "linear" }}
                className={cn(
                  "absolute bottom-0 left-0 h-1",
                  toast.type === "success" && "bg-brand-teal",
                  toast.type === "error" && "bg-red-500",
                  (toast.type === "info" || toast.type === "warning") && "bg-brand-amber"
                )}
              />

              {/* Status Icons */}
              <div className="shrink-0 mt-0.5">
                {toast.type === "success" && (
                  <CheckCircle2 className="text-brand-teal w-5 h-5 animate-bounce" />
                )}
                {toast.type === "error" && (
                  <AlertCircle className="text-red-400 w-5 h-5" />
                )}
                {(toast.type === "info" || toast.type === "warning") && (
                  <Info className="text-brand-amber w-5 h-5" />
                )}
              </div>

              {/* Msg Content */}
              <div className="flex-1 space-y-1 pr-6">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white leading-none">
                  {toast.message}
                </h4>
                {toast.description && (
                  <p className="text-[11px] text-zinc-400 font-sans font-light leading-relaxed">
                    {toast.description}
                  </p>
                )}
              </div>

              {/* Dismiss Manual Button */}
              <button
                onClick={() => dismissToast(toast.id)}
                className="absolute top-3.5 right-3.5 p-1 rounded-lg text-zinc-550 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                aria-label="Dismiss notification"
              >
                <X size={13} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
