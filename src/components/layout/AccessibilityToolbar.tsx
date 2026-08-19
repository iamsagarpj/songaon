import { createPortal } from 'react-dom';
import { Type, Contrast, RotateCcw, Languages } from 'lucide-react';
import { useAccessibility } from '@/context/AccessibilityContext';
import { useLanguage } from '@/context/LanguageContext';
import { useState } from 'react';

export function AccessibilityToolbar() {
  const { increaseTextSize, decreaseTextSize, toggleHighContrast, resetAccessibility } = useAccessibility();
  const { language, setLanguage, t } = useLanguage();
  const [open, setOpen] = useState(false);

  const toolbar = (
    <div
      className="fixed bottom-[calc(8.75rem+env(safe-area-inset-bottom,0px))] lg:bottom-6 right-3 sm:right-4 z-[110]"
    >
      {open && (
        <div
          className="mb-2 bg-white rounded-xl shadow-lg border border-charcoal-100 p-2 space-y-1 min-w-[200px]"
          role="toolbar"
          aria-label={t('accessibility.toolbar')}
        >
          <button
            onClick={increaseTextSize}
            className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-charcoal-700 hover:bg-primary-50 rounded-lg"
          >
            <Type className="w-4 h-4" aria-hidden="true" />
            {t('accessibility.increaseText')}
          </button>
          <button
            onClick={decreaseTextSize}
            className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-charcoal-700 hover:bg-primary-50 rounded-lg"
          >
            <Type className="w-3 h-3" aria-hidden="true" />
            {t('accessibility.decreaseText')}
          </button>
          <button
            onClick={toggleHighContrast}
            className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-charcoal-700 hover:bg-primary-50 rounded-lg"
          >
            <Contrast className="w-4 h-4" aria-hidden="true" />
            {t('accessibility.highContrast')}
          </button>
          <button
            onClick={() => setLanguage(language === 'mr' ? 'en' : 'mr')}
            className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-charcoal-700 hover:bg-primary-50 rounded-lg"
          >
            <Languages className="w-4 h-4" aria-hidden="true" />
            {language === 'mr' ? 'English' : 'मराठी'}
          </button>
          <button
            onClick={resetAccessibility}
            className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-charcoal-700 hover:bg-primary-50 rounded-lg"
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
            {t('accessibility.reset')}
          </button>
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 touch-target bg-primary-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary-700 transition-colors"
        aria-expanded={open}
        aria-label={t('accessibility.toolbar')}
      >
        <AccessibilityIcon />
      </button>
    </div>
  );

  if (typeof document === 'undefined') return null;

  return createPortal(toolbar, document.body);
}

function AccessibilityIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="4" r="2" fill="currentColor" />
      <path d="M12 7v5M7 10l10 4M7 14l10 4M12 12v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
