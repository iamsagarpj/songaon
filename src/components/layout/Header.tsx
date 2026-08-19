import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { useVillage } from '@/context/VillageContext';
import { LanguageToggle } from './LanguageToggle';
import { Menu, X, Landmark } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/utils/helpers';

const navItems = [
  { key: 'nav.home', path: '/' },
  { key: 'nav.about', path: '/about' },
  { key: 'nav.schemes', path: '/schemes' },
  { key: 'nav.projects', path: '/projects' },
  { key: 'nav.facilities', path: '/facilities' },
  { key: 'nav.announcements', path: '/announcements' },
  { key: 'nav.forms', path: '/forms' },
  { key: 'nav.complaints', path: '/complaints' },
  { key: 'nav.contact', path: '/contact' },
];

export function Header() {
  const { t, language } = useLanguage();
  const { village } = useVillage();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-charcoal-100 shadow-sm safe-area-top">
      <div className="max-w-page mx-auto px-4 sm:px-5 md:px-6">
        <div className="flex items-center justify-between gap-2 min-h-[60px] sm:min-h-[64px] lg:min-h-[72px]">
          <Link to="/" className="flex items-center gap-3 min-w-0 flex-1">
            <div className="flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center shadow-md ring-2 ring-primary-100">
              <Landmark className="w-5 h-5 text-white" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] xs:text-xs sm:text-sm text-charcoal-500 leading-tight truncate">
                {language === 'mr' ? 'ग्रामपंचायत' : 'Gram Panchayat'} · {language === 'mr' ? village.district.mr : village.district.en}
              </p>
              <p className="font-bold text-primary-700 text-sm xs:text-base sm:text-lg md:text-xl truncate leading-tight">
                {language === 'mr' ? village.nameMarathi : village.nameEnglish}
              </p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1 flex-shrink-0" aria-label="Main navigation">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="px-3 py-2 text-sm font-medium text-charcoal-700 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors"
              >
                {t(item.key)}
              </Link>
            ))}
            <LanguageToggle className="ml-2" />
          </nav>

          <div className="flex items-center gap-1.5 lg:hidden flex-shrink-0">
            <LanguageToggle />
            <button
              type="button"
              className="p-2.5 rounded-xl hover:bg-charcoal-50 active:bg-charcoal-100 active:scale-95 transition-all touch-target"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen ? <X className="w-6 h-6 text-charcoal-700" /> : <Menu className="w-6 h-6 text-charcoal-700" />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={cn(
          'lg:hidden border-t border-charcoal-100 bg-white/98 backdrop-blur-sm overflow-hidden transition-[max-height,opacity] duration-300 ease-out',
          menuOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <nav className="px-4 py-3 space-y-1 max-h-[calc(80vh-1rem)] overflow-y-auto" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-3.5 text-base font-medium text-charcoal-700 hover:bg-primary-50 hover:text-primary-700 active:bg-primary-100 rounded-xl transition-colors"
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
