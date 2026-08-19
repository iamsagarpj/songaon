import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { getLocalized, formatDate } from '@/utils/helpers';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Card } from '@/components/ui/Card';
import type { Announcement } from '@/types';
import { Pin } from 'lucide-react';

export function AnnouncementCard({ announcement }: { announcement: Announcement }) {
  const { t, language } = useLanguage();

  return (
    <Card hover className="h-full flex flex-col min-w-0 overflow-hidden">
      <div className="flex flex-col gap-2 mb-2 min-w-0">
        <div className="flex flex-wrap items-center gap-2 min-w-0">
          <StatusBadge status={announcement.status} className="max-w-full" />
          {announcement.pinned && (
            <span className="inline-flex items-center gap-1 text-xs text-primary-600 font-medium">
              <Pin className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
              {language === 'mr' ? 'पिन' : 'Pinned'}
            </span>
          )}
        </div>
        <time className="text-xs sm:text-sm text-charcoal-400 break-words">
          {formatDate(announcement.date, language)}
        </time>
      </div>
      <span className="text-xs font-medium text-primary-600 mb-1 break-words">
        {getLocalized(announcement.category, language)}
      </span>
      <h3 className="text-lg font-bold text-charcoal-800 mb-2 leading-snug break-words">
        {getLocalized(announcement.title, language)}
      </h3>
      <p className="text-charcoal-600 text-sm flex-1 mb-4 break-words">
        {getLocalized(announcement.description, language)}
      </p>
      <Link
        to={`/announcements/${announcement.slug}`}
        className="text-primary-600 font-semibold text-sm hover:underline"
      >
        {t('common.readMore')} →
      </Link>
    </Card>
  );
}
