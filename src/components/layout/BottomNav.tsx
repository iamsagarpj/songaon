import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { Home, Grid3X3, FileText, AlertCircle, MoreHorizontal } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/utils/helpers';

const items = [
  { key: 'bottomNav.home', path: '/', icon: Home },
  { key: 'bottomNav.services', path: '/facilities', icon: Grid3X3 },
  { key: 'bottomNav.schemes', path: '/schemes', icon: FileText },
  { key: 'bottomNav.complaints', path: '/complaints', icon: AlertCircle },
  { key: 'bottomNav.more', path: '/about', icon: MoreHorizontal },
];

export function BottomNav() {
  const { t } = useLanguage();
  const location = useLocation();

  const nav = (
    <nav
      className="fixed bottom-0 left-0 right-0 z-[100] lg:hidden safe-area-bottom"
      aria-label="Bottom navigation"
      style={{ transform: 'translateZ(0)' }}
    >
      <div className="bg-white/95 backdrop-blur-md border-t border-charcoal-100 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] rounded-t-2xl mx-0">
        <div className="flex items-stretch max-w-page mx-auto px-1 pt-1">
          {items.map(({ key, path, icon: Icon }) => {
            const active = location.pathname === path || (path !== '/' && location.pathname.startsWith(path));
            return (
              <Link
                key={path}
                to={path}
                className={cn(
                  'relative flex-1 flex flex-col items-center justify-center py-2 px-1 min-h-[58px] gap-0.5 text-[10px] xs:text-[11px] sm:text-xs font-semibold transition-all touch-target min-w-0 rounded-xl mx-0.5',
                  active
                    ? 'text-primary-700 bg-primary-50'
                    : 'text-charcoal-500 active:bg-charcoal-50'
                )}
              >
                {active && (
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary-600 rounded-full" aria-hidden="true" />
                )}
                <Icon
                  className={cn('w-6 h-6 flex-shrink-0 transition-transform', active && 'scale-110')}
                  aria-hidden="true"
                  strokeWidth={active ? 2.5 : 2}
                />
                <span className="leading-tight text-center truncate max-w-full px-0.5">{t(key)}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );

  if (typeof document === 'undefined') return null;

  return createPortal(nav, document.body);
}
