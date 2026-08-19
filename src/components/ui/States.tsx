import { useLanguage } from '@/context/LanguageContext';

export function LoadingSkeleton({ lines = 3 }: { lines?: number }) {
  const { t } = useLanguage();
  return (
    <div className="animate-pulse space-y-3" role="status" aria-label={t('common.loading')}>
      <p className="sr-only">{t('common.loading')}</p>
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="h-4 bg-charcoal-100 rounded" style={{ width: `${100 - i * 15}%` }} />
      ))}
    </div>
  );
}

export function LoadingState({ message }: { message?: string }) {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col items-center justify-center py-12 text-charcoal-500">
      <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mb-4" />
      <p className="text-lg">{message || t('common.loading')}</p>
    </div>
  );
}

export function EmptyState({ message }: { message?: string }) {
  const { t } = useLanguage();
  return (
    <div className="text-center py-12 px-4">
      <p className="text-lg text-charcoal-600 mb-2">{message || t('common.empty')}</p>
      <p className="text-charcoal-400">{t('common.contactOffice')}</p>
    </div>
  );
}

export function ErrorState({ message }: { message?: string }) {
  const { t } = useLanguage();
  return (
    <div className="text-center py-12 px-4">
      <p className="text-lg text-red-600">{message || t('common.error')}</p>
    </div>
  );
}
