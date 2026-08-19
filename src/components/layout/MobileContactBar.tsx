import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { Phone, Mail, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useVillage } from '@/context/VillageContext';

export function MobileContactBar() {
  const { language } = useLanguage();
  const { village } = useVillage();

  const phoneLabel = language === 'mr' ? 'कॉल' : 'Call';
  const contactLabel = language === 'mr' ? 'संपर्क' : 'Contact';

  const bar = (
    <div
      className="fixed left-0 right-0 z-[99] lg:hidden safe-area-bottom"
      style={{
        bottom: 'calc(3.75rem + env(safe-area-inset-bottom, 0px))',
        transform: 'translateZ(0)',
      }}
      aria-label={language === 'mr' ? 'द्रुत संपर्क' : 'Quick contact'}
    >
      <div className="mx-2 mb-1.5 rounded-2xl bg-primary-800/95 backdrop-blur-md border border-primary-700/50 shadow-lg overflow-hidden">
        <div className="flex items-stretch divide-x divide-primary-700/60">
          <a
            href={`tel:${village.contact.replace(/\s/g, '')}`}
            className="flex-1 flex flex-col items-center justify-center gap-0.5 py-2.5 px-2 min-w-0 active:bg-primary-700/80 transition-colors touch-target"
          >
            <Phone className="w-4 h-4 text-primary-200 flex-shrink-0" aria-hidden="true" />
            <span className="text-[11px] xs:text-xs font-semibold text-white">{phoneLabel}</span>
          </a>
          <a
            href={`mailto:${village.email}`}
            className="flex-1 flex flex-col items-center justify-center gap-0.5 py-2.5 px-2 min-w-0 active:bg-primary-700/80 transition-colors touch-target"
          >
            <Mail className="w-4 h-4 text-primary-200 flex-shrink-0" aria-hidden="true" />
            <span className="text-[11px] xs:text-xs font-semibold text-white truncate max-w-full px-1">
              {language === 'mr' ? 'ईमेल' : 'Email'}
            </span>
          </a>
          <Link
            to="/contact"
            className="flex-1 flex flex-col items-center justify-center gap-0.5 py-2.5 px-2 min-w-0 active:bg-primary-700/80 transition-colors touch-target"
          >
            <ChevronRight className="w-4 h-4 text-saffron-300 flex-shrink-0" aria-hidden="true" />
            <span className="text-[11px] xs:text-xs font-semibold text-saffron-200">{contactLabel}</span>
          </Link>
        </div>
      </div>
    </div>
  );

  if (typeof document === 'undefined') return null;

  return createPortal(bar, document.body);
}
