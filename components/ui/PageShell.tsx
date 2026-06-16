import type { ReactNode } from 'react';

interface PageShellProps {
  children: ReactNode;
  className?: string;
}

/** Consistent wrapper for /labs, /stacks, /library hub pages */
export function PageShell({ children, className = '' }: PageShellProps) {
  return (
    <div className={`py-16 md:py-24 lg:py-28 ${className}`}>
      <div className="container-page">{children}</div>
    </div>
  );
}