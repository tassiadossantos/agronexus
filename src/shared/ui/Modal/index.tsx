import { useEffect, type ReactNode } from 'react';
import { cn } from '@/shared/utils/cn';
import { X } from 'lucide-react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export function Modal({ open, onClose, title, description, children, size = 'md' }: ModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (open) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[rgba(0,0,0,0.7)] backdrop-blur-sm animate-fade-in" onClick={onClose} />
      <div className={cn(
        'relative hud-surface-elevated rounded-3xl animate-scale-in max-h-[90vh] overflow-hidden flex flex-col w-full border-neon-animated',
        { 'max-w-sm': size === 'sm', 'max-w-md': size === 'md', 'max-w-lg': size === 'lg', 'max-w-xl': size === 'xl', 'max-w-5xl': size === 'full' },
      )}>
        {(title || description) && (
          <div className="px-7 pt-6 pb-4 border-b border-[rgba(255,255,255,0.06)]">
            {title && <h2 className="text-xl font-black text-white tracking-tight">{title}</h2>}
            {description && <p className="text-sm text-[#64748b] mt-1">{description}</p>}
            <button onClick={onClose} className="absolute top-5 right-5 p-2 rounded-xl hover:bg-[rgba(255,255,255,0.06)] text-[#64748b] hover:text-white transition-colors">
              <X className="w-5 h-5" strokeWidth={2} />
            </button>
          </div>
        )}
        <div className="px-7 pb-7 overflow-y-auto flex-1">{children}</div>
      </div>
    </div>
  );
}
