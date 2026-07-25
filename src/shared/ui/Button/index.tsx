import { type ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/shared/utils/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'arc' | 'neon' | 'outline';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'arc', size = 'md', loading, fullWidth, icon, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          'group relative inline-flex items-center justify-center gap-2.5 font-semibold transition-all duration-300 ease-out',
          'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0a0f1a]',
          'disabled:opacity-30 disabled:cursor-not-allowed disabled:pointer-events-none',
          'active:scale-[0.97]',
          {
            'bg-gradient-to-r from-[#00f0ff] to-[#22c55e] text-[#06090f] shadow-sm hover:shadow-md focus:ring-[#00f0ff]/40': variant === 'arc',
            'bg-[rgba(0,240,255,0.08)] text-[#00f0ff] border border-[rgba(0,240,255,0.2)] hover:bg-[rgba(0,240,255,0.12)] hover:border-[rgba(0,240,255,0.35)] focus:ring-[#00f0ff]/20': variant === 'neon',
            'bg-gradient-to-r from-[#a855f7] to-[#7e22ce] text-white shadow-sm hover:shadow-md focus:ring-[#a855f7]/40': variant === 'secondary',
            'bg-[rgba(255,255,255,0.04)] text-[#94a3b8] border border-[rgba(255,255,255,0.08)] hover:bg-[rgba(255,255,255,0.08)] hover:text-white hover:border-[rgba(255,255,255,0.15)] focus:ring-[#94a3b8]/20': variant === 'ghost',
            'bg-[rgba(239,68,68,0.1)] text-[#ef4444] border border-[rgba(239,68,68,0.2)] hover:bg-[rgba(239,68,68,0.15)] hover:border-[rgba(239,68,68,0.35)] focus:ring-[#ef4444]/30': variant === 'danger',
            'bg-transparent text-[#94a3b8] border border-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.05)] hover:text-white hover:border-[rgba(255,255,255,0.2)] focus:ring-[#94a3b8]/20': variant === 'outline',
            'bg-gradient-to-r from-[#00f0ff] to-[#22c55e] text-[#06090f] font-bold shadow-sm hover:shadow-md focus:ring-[#00f0ff]/40': variant === 'primary',
          },
          {
            'h-7 px-2.5 text-xs rounded-lg gap-1.5': size === 'xs',
            'h-9 px-4 text-xs rounded-xl': size === 'sm',
            'h-10 px-5 text-sm rounded-xl': size === 'md',
            'h-12 px-7 text-sm rounded-xl': size === 'lg',
            'h-14 px-9 text-base rounded-2xl': size === 'xl',
          },
          fullWidth && 'w-full',
          className,
        )}
        {...props}
      >
        {loading ? (
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        ) : icon ? (
          <span className="shrink-0">{icon}</span>
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export { Button, type ButtonProps };
