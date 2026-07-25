import { type SelectHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/shared/utils/cn';
import { ChevronDown } from 'lucide-react';

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, placeholder, id, ...props }, ref) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, '-');
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={selectId} className="block text-xs font-bold text-[#94a3b8] uppercase tracking-wider">
            {label}
          </label>
        )}
        <div className="relative group">
          <select
            ref={ref}
            id={selectId}
            className={cn(
              'w-full h-11 rounded-xl border bg-[rgba(15,23,42,0.6)] px-4 pr-10 text-sm font-medium transition-all duration-200 appearance-none text-white',
              'focus:outline-none focus:bg-[rgba(15,23,42,0.8)]',
              error
                ? 'border-[rgba(239,68,68,0.4)] focus:border-[#ef4444]'
                : 'border-[rgba(255,255,255,0.08)] focus:border-[#00f0ff]/40 hover:border-[rgba(255,255,255,0.12)]',
              className,
            )}
            {...props}
          >
            {placeholder && <option value="" disabled>{placeholder}</option>}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled} className="bg-[#0f172a] text-white">{opt.label}</option>
            ))}
          </select>
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#475569] group-focus-within:text-[#00f0ff] transition-colors">
            <ChevronDown className="w-4 h-4" strokeWidth={2} />
          </div>
        </div>
        {error && <p className="text-xs font-medium text-[#ef4444]">{error}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';
export { Select, type SelectProps };
