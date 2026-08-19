import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/utils/helpers';

interface LanguageToggleProps {
  className?: string;
  onToggle?: () => void;
}

/** Compact pill: EN ↔ म (English label unchanged when showing EN) */
export function LanguageToggle({ className, onToggle }: LanguageToggleProps) {
  const { language, setLanguage, t } = useLanguage();

  const toggle = () => {
    setLanguage(language === 'mr' ? 'en' : 'mr');
    onToggle?.();
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className={cn(
        'inline-flex items-center justify-center min-w-[44px] min-h-[44px] px-3',
        'text-sm font-bold text-primary-700 bg-primary-50 border border-primary-200',
        'rounded-xl hover:bg-primary-100 active:scale-95 transition-all',
        'focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-1',
        className
      )}
      aria-label={t('nav.language')}
    >
      {language === 'mr' ? 'EN' : 'म'}
    </button>
  );
}
