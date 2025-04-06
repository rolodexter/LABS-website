import { HTMLAttributes, forwardRef } from 'react';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'outline' | 'available' | 'development' | 'planned';
  size?: 'sm' | 'md';
  status?: 'available' | 'development' | 'planned';
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(({
  children,
  className = '',
  variant = 'default',
  size = 'md',
  ...props
}, ref) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-full';
  
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    outline: 'border border-black text-black',
    available: 'bg-black text-white',
    development: 'bg-gray-500 text-white',
    planned: 'bg-gray-300 text-gray-800'
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm'
  };

  // If status is provided, use it to determine the variant
  let statusVariant = variant;
  if (status) {
    switch(status) {
      case 'available':
        statusVariant = 'available';
        break;
      case 'development':
        statusVariant = 'development';
        break;
      case 'planned':
        statusVariant = 'planned';
        break;
      default:
        statusVariant = variant;
    }
  }

  const classes = `${baseStyles} ${variants[statusVariant as keyof typeof variants]} ${sizes[size]} ${className}`;

  return (
    <span
      ref={ref}
      className={classes}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = 'Badge';

export default Badge;
