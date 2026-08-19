import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { Home, Grid3X3, FileText, AlertCircle, MoreHorizontal, Phone, Mail, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useVillage } from '@/context/VillageContext';
import { cn } from '@/utils/helpers';

const navItems = [
  { key: 'bottomNav.home', path: '/', icon: Home },
  { key: 'bottomNav.services', path: '/facilities', icon: Grid3X3 },
  { key: 'bottomNav.schemes', path: '/schemes', icon: FileText },
  { key: 'bottomNav.complaints', path: '/complaints', icon: AlertCircle },
  { key: 'bottomNav.more', path: '/about', icon: MoreHorizontal },
];

const DOCK_ROOT_ID = 'mobile-dock';

function getDockRoot(): HTMLElement | null {
  if (typeof document === 'undefined') return null;
  return document.getElementById(DOCK_ROOT_ID);
}

/** Fixed mobile footer: quick contact + bottom navigation (portaled outside #root) */
export function MobileDock() {
  const { t, language } = useLanguage();
  const { village } = useVillage();
  const location = useLocation();
  const dockRoot = getDockRoot();

  const phoneLabel = language === 'mr' ? 'कॉल' : 'Call';
  const contactLabel = language === 'mr' ? 'संपर्क' : 'Contact';

  const dock = (
    <div className="lg:hidden">
      {/* Quick contact */}
      <div className="px-2 pb-1.5" aria-label={language === 'mr' ? 'द्रुत संपर्क' : 'Quick contact'}>
        <div className="rounded-2xl bg-primary-800 border border-primary-700/60 shadow-lg overflow-hidden">
          <div className="flex items-stretch divide-x divide-primary-700/60">
            <a
              href={`tel:${village.contact.replace(/\s/g, '')}`}
              className="flex-1 flex flex-col items-center justify-center gap-0.5 py-2.5 px-2 min-w-0 active:bg-primary-700 transition-colors touch-target"
            >
              <Phone className="w-4 h-4 text-primary-200 flex-shrink-0" aria-hidden="true" />
              <span className="text-[11px] xs:text-xs font-semibold text-white">{phoneLabel}</span>
            </a>
            <a
              href={`mailto:${village.email}`}
              className="flex-1 flex flex-col items-center justify-center gap-0.5 py-2.5 px-2 min-w-0 active:bg-primary-700 transition-colors touch-target"
            >
              <Mail className="w-4 h-4 text-primary-200 flex-shrink-0" aria-hidden="true" />
              <span className="text-[11px] xs:text-xs font-semibold text-white">{language === 'mr' ? 'ईमेल' : 'Email'}</span>
            </a>
            <Link
              to="/contact"
              className="flex-1 flex flex-col items-center justify-center gap-0.5 py-2.5 px-2 min-w-0 active:bg-primary-700 transition-colors touch-target"
            >
              <ChevronRight className="w-4 h-4 text-saffron-300 flex-shrink-0" aria-hidden="true" />
              <span className="text-[11px] xs:text-xs font-semibold text-saffron-200">{contactLabel}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom navigation */}
      <nav aria-label="Bottom navigation" className="bg-white border-t border-charcoal-100 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] rounded-t-2xl">
        <div className="flex items-stretch w-full px-1 pt-1">
          {navItems.map(({ key, path, icon: Icon }) => {
            const active = location.pathname === path || (path !== '/' && location.pathname.startsWith(path));
            return (
              <Link
                key={path}
                to={path}
                className={cn(
                  'relative flex-1 flex flex-col items-center justify-center py-2 px-1 min-h-[58px] gap-0.5 text-[10px] xs:text-[11px] sm:text-xs font-semibold transition-colors touch-target min-w-0 rounded-xl mx-0.5',
                  active ? 'text-primary-700 bg-primary-50' : 'text-charcoal-500 active:bg-charcoal-50'
                )}
              >
                {active && (
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary-600 rounded-full" aria-hidden="true" />
                )}
                <Icon className={cn('w-6 h-6 flex-shrink-0', active && 'scale-110')} aria-hidden="true" strokeWidth={active ? 2.5 : 2} />
                <span className="leading-tight text-center truncate max-w-full px-0.5">{t(key)}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );

  if (!dockRoot) return null;

  return createPortal(dock, dockRoot);
}
