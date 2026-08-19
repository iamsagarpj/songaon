import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { useVillage } from '@/context/VillageContext';
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
  const { t, language, setLanguage } = useLanguage();
  const { village } = useVillage();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-charcoal-100 shadow-sm">
      <div className="max-w-page mx-auto px-4 sm:px-5 md:px-6">
        <div className="flex items-center justify-between min-h-[60px] sm:min-h-[64px] lg:min-h-[72px]">
          <Link to="/" className="flex items-center gap-3 min-w-0">
            <div className="flex-shrink-0 w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
              <Landmark className="w-5 h-5 text-white" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm text-charcoal-500 leading-tight">
                {language === 'mr' ? 'ग्रामपंचायत' : 'Gram Panchayat'} · {language === 'mr' ? village.district.mr : village.district.en}
              </p>
              <p className="font-bold text-primary-700 text-base sm:text-lg md:text-xl truncate">
                {language === 'mr' ? village.nameMarathi : village.nameEnglish}
              </p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="px-3 py-2 text-sm font-medium text-charcoal-700 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors"
              >
                {t(item.key)}
              </Link>
            ))}
            <button
              onClick={() => setLanguage(language === 'mr' ? 'en' : 'mr')}
              className="ml-2 px-3 py-2 text-sm font-medium text-primary-600 border border-primary-200 rounded-lg hover:bg-primary-50"
              aria-label={t('nav.language')}
            >
              {language === 'mr' ? 'EN' : 'मर'}
            </button>
          </nav>

          <button
            className="lg:hidden p-3 rounded-xl hover:bg-charcoal-50 touch-target"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          'lg:hidden border-t border-charcoal-100 bg-white overflow-hidden transition-all',
          menuOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <nav className="px-4 py-3 space-y-1" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-3 text-base font-medium text-charcoal-700 hover:bg-primary-50 hover:text-primary-700 rounded-xl"
            >
              {t(item.key)}
            </Link>
          ))}
          <button
            onClick={() => {
              setLanguage(language === 'mr' ? 'en' : 'mr');
              setMenuOpen(false);
            }}
            className="w-full text-left px-4 py-3 text-base font-medium text-primary-600 hover:bg-primary-50 rounded-xl"
          >
            {language === 'mr' ? 'English' : 'मराठी'}
          </button>
        </nav>
      </div>
    </header>
  );
}
