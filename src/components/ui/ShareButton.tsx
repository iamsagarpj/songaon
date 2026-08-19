import { Share2 } from 'lucide-react';
import { shareOnWhatsApp } from '@/utils/helpers';
import { useLanguage } from '@/context/LanguageContext';

interface ShareButtonProps {
  title: string;
  url?: string;
  className?: string;
}

export function ShareButton({ title, url, className = '' }: ShareButtonProps) {
  const { t } = useLanguage();
  const shareUrl = url || window.location.href;

  return (
    <button
      onClick={() => shareOnWhatsApp(title, shareUrl)}
      className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-green-700 bg-green-50 hover:bg-green-100 rounded-lg transition-colors ${className}`}
      aria-label={t('common.share')}
    >
      <Share2 className="w-4 h-4" aria-hidden="true" />
      {t('common.share')}
    </button>
  );
}
