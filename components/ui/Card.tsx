import { HTMLAttributes, forwardRef } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'hover';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const Card = forwardRef<HTMLDivElement, CardProps>(({
  children,
  className = '',
  variant = 'default',
  padding = 'md',
  ...props
}, ref) => {
  const baseStyles = 'bg-white border border-gray-200 rounded-lg';
  
  const variants = {
    default: '',
    hover: 'hover:border-black transition-colors'
  };

  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  const classes = `${baseStyles} ${variants[variant]} ${paddings[padding]} ${className}`;

  return (
    <div
      ref={ref}
      className={classes}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';

export default Card;
