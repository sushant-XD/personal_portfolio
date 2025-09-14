import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export function Card({ children, className, onClick, hoverable = false }: CardProps) {
  return (
    <div
      className={`card-minimal transition-minimal ${hoverable ? 'cursor-pointer hover:opacity-80' : ''} ${className || ''}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}