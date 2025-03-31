import { forwardRef, ElementType, ComponentPropsWithRef } from 'react';
import Link from 'next/link';
import type { LinkProps } from 'next/link';

type ButtonBaseProps = {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  as?: ElementType;
  href?: string;
};

type ButtonProps = ButtonBaseProps & Omit<ComponentPropsWithRef<'button'>, keyof ButtonBaseProps>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>((
  { 
    children,
    variant = 'primary',
    size = 'medium',
    fullWidth = false,
    href,
    className = '',
    ...props
  }, 
  ref
) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors duration-200';
  const sizeStyles = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg'
  };
  const variantStyles = {
    primary: 'bg-black text-white hover:bg-gray-800',
    secondary: 'bg-gray-100 text-black hover:bg-gray-200',
    outline: 'border border-black text-black hover:bg-black hover:text-white'
  };
  const widthStyles = fullWidth ? 'w-full' : '';

  const styles = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyles} ${className}`;

  if (href) {
    return (
      <Link 
        href={href}
        className={styles}
        onClick={props.onClick as LinkProps['onClick']}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      ref={ref}
      className={styles}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
