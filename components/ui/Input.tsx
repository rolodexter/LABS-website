import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  className = '',
  label,
  error,
  fullWidth = false,
  id,
  ...props
}, ref) => {
  const baseStyles = 'block border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed';
  const errorStyles = error ? 'border-red-500 focus:ring-red-500' : '';
  const widthStyles = fullWidth ? 'w-full' : '';
  
  const classes = `${baseStyles} ${errorStyles} ${widthStyles} ${className}`;

  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        className={`${classes} px-4 py-2`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
