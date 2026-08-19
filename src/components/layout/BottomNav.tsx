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

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-t border-charcoal-100 lg:hidden safe-area-bottom shadow-[0_-2px_10px_rgba(0,0,0,0.06)]"
      aria-label="Bottom navigation"
    >
      <div className="flex items-stretch max-w-page mx-auto">
        {items.map(({ key, path, icon: Icon }) => {
          const active = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={cn(
                'flex-1 flex flex-col items-center justify-center py-2 px-1 min-h-[60px] gap-1 text-[11px] xs:text-xs font-semibold transition-colors touch-target',
                active ? 'text-primary-600 bg-primary-50/50' : 'text-charcoal-600'
              )}
            >
              <Icon className="w-6 h-6" aria-hidden="true" />
              <span className="leading-tight text-center">{t(key)}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
