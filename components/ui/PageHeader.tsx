import type { LucideIcon } from 'lucide-react';
import type { ThemeAccent } from '@/lib/design-system';
import { themes } from '@/lib/design-system';

interface PageHeaderProps {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  description: string;
  meta?: string;
  theme?: ThemeAccent;
  as?: 'h1' | 'h2';
  align?: 'center' | 'left';
  id?: string;
}

export function PageHeader({
  icon: Icon,
  eyebrow,
  title,
  description,
  meta,
  theme = 'cyan',
  as: Tag = 'h1',
  align = 'center',
  id,
}: PageHeaderProps) {
  const t = themes[theme];
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';

  return (
    <header className={`mb-10 md:mb-12 max-w-3xl ${alignClass}`}>
      <div
        className={`inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-5 text-body-sm ${align === 'center' ? '' : ''}`}
      >
        <Icon className={`w-4 h-4 ${t.text}`} aria-hidden="true" />
        <span className="text-foreground/90">{eyebrow}</span>
      </div>
      <Tag id={id} className="heading-page mb-4">{title}</Tag>
      <p className="text-body max-w-2xl mx-auto">{description}</p>
      {meta && (
        <p className={`text-label mt-4 ${t.text}`}>{meta}</p>
      )}
    </header>
  );
}