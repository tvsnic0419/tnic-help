import type { ReactNode } from 'react';

interface DataTableProps {
  caption?: string;
  children: ReactNode;
  className?: string;
}

export function DataTable({ caption, children, className = '' }: DataTableProps) {
  return (
    <div className={`scroll-region rounded-2xl border border-white/[0.06] ${className}`}>
      <table className="table-base min-w-[36rem]">
        {caption && <caption className="sr-only">{caption}</caption>}
        {children}
      </table>
    </div>
  );
}