import { useEffect, useState, createContext, useContext, useCallback } from 'react';
import { cn } from '@/shared/utils/cn';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastContextValue {
  toast: (type: ToastType, message: string) => void;
}

const ToastContext = createContext<ToastContextValue>({ toast: () => {} });
export function useToast() { return useContext(ToastContext); }

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((type: ToastType, message: string) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, type, message }]);
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed top-5 right-5 z-[100] flex flex-col gap-3 max-w-sm w-full pointer-events-none">
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onDismiss={() => dismiss(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 4000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  const config: Record<ToastType, { icon: string; classes: string }> = {
    success: { icon: '✓', classes: 'border-[rgba(34,197,94,0.4)] bg-[rgba(34,197,94,0.1)] text-[#22c55e] shadow-[0_0_20px_rgba(34,197,94,0.1)]' },
    error: { icon: '✕', classes: 'border-[rgba(239,68,68,0.4)] bg-[rgba(239,68,68,0.1)] text-[#ef4444] shadow-[0_0_20px_rgba(239,68,68,0.1)]' },
    warning: { icon: '!', classes: 'border-[rgba(234,179,8,0.4)] bg-[rgba(234,179,8,0.1)] text-[#eab308] shadow-[0_0_20px_rgba(234,179,8,0.1)]' },
    info: { icon: 'i', classes: 'border-[rgba(0,240,255,0.4)] bg-[rgba(0,240,255,0.1)] text-[#00f0ff] shadow-[0_0_20px_rgba(0,240,255,0.1)]' },
  };

  const c = config[toast.type];

  return (
    <div className={cn(
      'pointer-events-auto flex items-center gap-3 px-5 py-3.5 rounded-2xl text-sm font-semibold border backdrop-blur-xl animate-slide-in-right',
      c.classes,
    )}>
      <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold shrink-0">{c.icon}</span>
      <span className="flex-1 text-white">{toast.message}</span>
      <button onClick={onDismiss} className="text-white/50 hover:text-white transition-colors shrink-0">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
      </button>
    </div>
  );
}
