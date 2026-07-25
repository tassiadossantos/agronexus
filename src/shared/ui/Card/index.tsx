import { type HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/shared/utils/cn';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'hud' | 'elevated' | 'interactive' | 'glass';
  padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  glow?: 'none' | 'neon' | 'arc' | 'plasma';
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', padding = 'md', glow = 'none', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-2xl transition-all duration-300 ease-out',
          {
            'hud-surface': variant === 'default',
            'hud-surface-elevated': variant === 'elevated',
            'bg-[rgba(15,23,42,0.5)] border border-[rgba(0,240,255,0.06)] backdrop-blur-sm': variant === 'glass',
            'bg-[rgba(15,23,42,0.6)] border border-[rgba(0,240,255,0.08)] hover:border-[rgba(0,240,255,0.2)] hover:shadow-[0_0_30px_rgba(0,240,255,0.05)] cursor-pointer': variant === 'interactive',
            'hud-surface hover:border-[rgba(0,240,255,0.15)]': variant === 'hud',
          },
          {
            'p-0': padding === 'none',
            'p-2': padding === 'xs',
            'p-3': padding === 'sm',
            'p-4 md:p-5': padding === 'md',
            'p-5 md:p-7': padding === 'lg',
            'p-6 md:p-9': padding === 'xl',
          },
          {
            '': glow === 'none',
            'hud-glow': glow === 'neon',
            'hud-glow-arc': glow === 'arc',
            'shadow-[0_0_20px_rgba(168,85,247,0.15)]': glow === 'plasma',
          },
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('mb-4', className)} {...props}>{children}</div>
  )
);
CardHeader.displayName = 'CardHeader';

const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, children, ...props }, ref) => (
    <h3 ref={ref} className={cn('text-base font-bold text-white tracking-tight', className)} {...props}>{children}</h3>
  )
);
CardTitle.displayName = 'CardTitle';

const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, children, ...props }, ref) => (
    <p ref={ref} className={cn('text-sm text-[#64748b] mt-1', className)} {...props}>{children}</p>
  )
);
CardDescription.displayName = 'CardDescription';

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('', className)} {...props}>{children}</div>
  )
);
CardContent.displayName = 'CardContent';

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('mt-4 pt-4 border-t border-[rgba(255,255,255,0.06)] flex items-center gap-3', className)} {...props}>{children}</div>
  )
);
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, type CardProps };
