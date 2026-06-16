import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  elevated?: boolean;
}

export function Card({ children, className = '', elevated = false }: CardProps) {
  return (
    <div className={`${elevated ? 'card-elevated' : 'glass'} rounded-xl p-5 md:p-6 ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mb-4 ${className}`}>{children}</div>;
}

export function CardTitle({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <h3 className={`heading-card text-lg ${className}`}>{children}</h3>;
}

export function CardDescription({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <p className={`text-body-sm text-zinc-500 mt-1 ${className}`}>{children}</p>;
}

export function CardContent({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}