import { type InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/shared/utils/cn';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, leftIcon, rightIcon, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-bold text-[#94a3b8] uppercase tracking-wider">
            {label}
          </label>
        )}
        <div className="relative group">
          {leftIcon && (
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#475569] group-focus-within:text-[#00f0ff] transition-colors">{leftIcon}</div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              'w-full h-11 rounded-xl border bg-[rgba(15,23,42,0.6)] px-4 text-sm font-medium transition-all duration-200 text-white placeholder:text-[#475569] placeholder:font-normal',
              'focus:outline-none focus:bg-[rgba(15,23,42,0.8)]',
              error
                ? 'border-[rgba(239,68,68,0.4)] focus:border-[#ef4444] shadow-[0_0_12px_rgba(239,68,68,0.1)]'
                : 'border-[rgba(255,255,255,0.08)] focus:border-[#00f0ff]/40 hover:border-[rgba(255,255,255,0.12)] focus:shadow-[0_0_12px_rgba(0,240,255,0.08)]',
              leftIcon && 'pl-11',
              rightIcon && 'pr-11',
              className,
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#475569] group-focus-within:text-[#00f0ff] transition-colors">{rightIcon}</div>
          )}
        </div>
        {error && <p className="text-xs font-medium text-[#ef4444] flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
          {error}
        </p>}
        {hint && !error && <p className="text-xs text-[#475569]">{hint}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
export { Input, type InputProps };
