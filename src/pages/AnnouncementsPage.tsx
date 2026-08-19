import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SEO } from '@/components/layout/SEO';
import { PageHeader } from '@/components/ui/SectionHeader';
import { AnnouncementCard } from '@/components/cards/AnnouncementCard';
import { LoadingState, EmptyState } from '@/components/ui/States';
import { ShareButton } from '@/components/ui/ShareButton';
import { useLanguage } from '@/context/LanguageContext';
import { getLocalized, formatDate } from '@/utils/helpers';
import { announcementService } from '@/services/announcementService';
import { facilityService } from '@/services/contentService';
import { facilityCategories } from '@/data/facilities';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Card } from '@/components/ui/Card';
import { SafeImage } from '@/components/ui/SafeImage';
import type { Announcement, Facility, FacilityCategory } from '@/types';

export function AnnouncementsPage() {
  const { t, language } = useLanguage();
  const [items, setItems] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    announcementService.getAll().then((data) => { setItems(data); setLoading(false); });
  }, []);

  if (loading) return <LoadingState />;

  return (
    <>
      <SEO title={language === 'mr' ? 'घोषणा' : 'Announcements'} path="/announcements" />
      <PageHeader title={t('sections.announcements')} />
      <div className="page-container section-padding grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.length === 0 ? <EmptyState /> : items.map((a) => <AnnouncementCard key={a.id} announcement={a} />)}
      </div>
    </>
  );
}

export function AnnouncementDetailPage() {
  const { id } = useParams();
  const { t, language } = useLanguage();
  const [item, setItem] = useState<Announcement | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) announcementService.getBySlug(id).then((a) => { setItem(a || null); setLoading(false); });
  }, [id]);

  if (loading) return <LoadingState />;
  if (!item) return <EmptyState />;

  const title = getLocalized(item.title, language);

  return (
    <>
      <SEO title={title} path={`/announcements/${id}`} />
      <PageHeader title={title} />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
          <StatusBadge status={item.status} />
          <time className="text-xs sm:text-sm text-charcoal-500 break-words">{formatDate(item.date, language)}</time>
        </div>
        <p className="text-lg text-charcoal-700 leading-relaxed mb-6">{getLocalized(item.content, language)}</p>
        <ShareButton title={title} />
        <Link to="/announcements" className="block mt-6 text-primary-600 font-semibold">← {t('common.viewAll')}</Link>
      </div>
    </>
  );
}

export function FacilitiesPage() {
  const { t, language } = useLanguage();
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [filter, setFilter] = useState<FacilityCategory | 'all'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    facilityService.getAll().then((data) => { setFacilities(data); setLoading(false); });
  }, []);

  const filtered = filter === 'all' ? facilities : facilities.filter((f) => f.category === filter);

  if (loading) return <LoadingState />;

  return (
    <>
      <SEO title={language === 'mr' ? 'गावातील सुविधा' : 'Village Facilities'} path="/facilities" />
      <PageHeader title={t('sections.facilities')} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-6">
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded-full text-sm font-medium ${filter === 'all' ? 'bg-primary-600 text-white' : 'bg-charcoal-100'}`}>
            {language === 'mr' ? 'सर्व' : 'All'}
          </button>
          {facilityCategories.map((cat) => (
            <button key={cat.key} onClick={() => setFilter(cat.key)} className={`px-4 py-2 rounded-full text-sm font-medium ${filter === cat.key ? 'bg-primary-600 text-white' : 'bg-charcoal-100'}`}>
              {getLocalized(cat.label, language)}
            </button>
          ))}
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((f) => (
            <Card key={f.id} id={f.slug} hover>
              {f.photos?.[0] && (
                <SafeImage src={f.photos[0]} alt="" className="h-36 sm:h-40 rounded-lg mb-3" wrapperClassName="rounded-lg mb-3 h-36 sm:h-40" />
              )}
              <h3 className="font-bold text-lg">{getLocalized(f.name, language)}</h3>
              <p className="text-sm text-charcoal-500 mt-1">{getLocalized(f.location, language)}</p>
              <p className="text-sm text-green-700 font-medium mt-2">{getLocalized(f.status, language)}</p>
              {f.contact && <a href={`tel:${f.contact}`} className="text-primary-600 text-sm mt-2 inline-block">{f.contact}</a>}
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
