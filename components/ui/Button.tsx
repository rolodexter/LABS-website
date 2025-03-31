import { ComponentPropsWithRef, ReactNode, forwardRef } from 'react';
import Link from 'next/link';

type ButtonVariant = 'primary' | 'secondary' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ComponentPropsWithRef<'button'> {
  href?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
  children: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  className = '',
  href,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  ...props
}, ref) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants: Record<ButtonVariant, string> = {
    primary: 'bg-black text-white hover:bg-gray-900',
    secondary: 'bg-gray-100 text-black hover:bg-gray-200',
    outline: 'border border-black text-black hover:bg-black hover:text-white'
  };

  const sizes: Record<ButtonSize, string> = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  };

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      ref={ref}
      className={classes}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
