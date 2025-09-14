import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: 'primary' | 'secondary' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export function Button({ 
  children, 
  onClick, 
  variant = 'minimal', 
  size = 'md',
  className,
  disabled,
  type = 'button'
}: ButtonProps) {
  const baseStyles = 'transition-minimal font-mono';
  
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    minimal: 'btn-minimal'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className || ''}`}
    >
      {children}
    </button>
  );
}
