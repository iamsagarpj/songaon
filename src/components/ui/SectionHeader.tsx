import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';

interface SectionHeaderProps {
  title: string;
  viewAllLink?: string;
  viewAllLabel?: string;
}

export function SectionHeader({ title, viewAllLink, viewAllLabel }: SectionHeaderProps) {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col xs:flex-row xs:items-end xs:justify-between gap-2 mb-5 sm:mb-6">
      <div className="min-w-0">
        <h2 className="text-xl xs:text-2xl md:text-3xl font-bold text-charcoal-800 leading-snug break-words">{title}</h2>
        <div className="mt-2 h-1 w-12 rounded-full bg-gradient-to-r from-primary-500 to-saffron-400" aria-hidden="true" />
      </div>
      {viewAllLink && (
        <Link
          to={viewAllLink}
          className="text-primary-600 font-semibold hover:underline whitespace-nowrap text-sm sm:text-base touch-target inline-flex items-center self-start xs:self-auto px-3 py-1.5 rounded-lg hover:bg-primary-50 active:bg-primary-100 transition-colors"
        >
          {viewAllLabel || t('common.viewAll')} →
        </Link>
      )}
    </div>
  );
}

export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="bg-gradient-to-br from-primary-700 via-primary-600 to-primary-800 text-white py-8 sm:py-10 md:py-12 lg:py-14 shadow-inner">
      <div className="page-container">
        <h1 className="text-2xl xs:text-3xl md:text-4xl lg:text-[2.5rem] font-bold mb-2 leading-tight">{title}</h1>
        {subtitle && (
          <p className="text-base sm:text-lg md:text-xl text-primary-100 max-w-3xl leading-relaxed">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
