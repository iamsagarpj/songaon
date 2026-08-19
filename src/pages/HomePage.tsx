import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '@/components/layout/SEO';
import { Hero } from '@/components/home/Hero';
import { QuickActionGrid } from '@/components/home/QuickActionGrid';
import { SearchBar } from '@/components/home/SearchBar';
import { VillageStats } from '@/components/home/VillageStats';
import { EmergencyContacts } from '@/components/home/EmergencyContacts';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { AnnouncementCard } from '@/components/cards/AnnouncementCard';
import { SchemeCard } from '@/components/cards/SchemeCard';
import { ProjectCard } from '@/components/cards/ProjectCard';
import { LoadingState } from '@/components/ui/States';
import { useLanguage } from '@/context/LanguageContext';
import { getLocalized, formatDate } from '@/utils/helpers';
import { announcementService } from '@/services/announcementService';
import { schemeService } from '@/services/schemeService';
import { projectService } from '@/services/projectService';
import { eventService, newsService, galleryService, contactService } from '@/services/contentService';
import type { Announcement, Scheme, Project, Event, NewsArticle, GalleryItem, EmergencyContact } from '@/types';
import { Card } from '@/components/ui/Card';
import { SafeImage } from '@/components/ui/SafeImage';
import { Megaphone } from 'lucide-react';

export function HomePage() {
  const { t, language } = useLanguage();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [emergency, setEmergency] = useState<EmergencyContact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      announcementService.getPinned(),
      schemeService.getAll(),
      projectService.getFeatured(3),
      eventService.getUpcoming(3),
      newsService.getAll(),
      galleryService.getAll(),
      contactService.getEmergencyContacts(),
    ]).then(([ann, sch, proj, ev, nw, gal, em]) => {
      setAnnouncements(ann);
      setSchemes(sch.slice(0, 4));
      setProjects(proj);
      setEvents(ev);
      setNews(nw.slice(0, 2));
      setGallery(gal.slice(0, 4));
      setEmergency(em);
      setLoading(false);
    });
  }, []);

  if (loading) return <LoadingState />;

  return (
    <>
      <SEO />
      <Hero />
      <QuickActionGrid />

      <section className="py-10 bg-charcoal-50">
        <div className="page-container py-6 sm:py-8">
          <SearchBar />
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="max-w-page mx-auto px-4 sm:px-5 md:px-6 lg:px-8">
          <SectionHeader title={t('sections.announcements')} viewAllLink="/announcements" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {announcements.map((a) => (
              <AnnouncementCard key={a.id} announcement={a} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14 bg-primary-50">
        <div className="max-w-page mx-auto px-4 sm:px-5 md:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <Megaphone className="w-8 h-8 text-primary-600" aria-hidden="true" />
            <h2 className="text-2xl md:text-3xl font-bold text-charcoal-800">{t('sections.noticeBoard')}</h2>
          </div>
          <div className="bg-amber-50 border-2 border-dashed border-amber-300 rounded-card-lg p-6 md:p-8">
            <div className="space-y-4">
              {announcements.slice(0, 4).map((a) => (
                <Link key={a.id} to={`/announcements/${a.slug}`} className="block p-4 bg-white rounded-xl hover:shadow-card transition-shadow min-w-0 overflow-hidden">
                  <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:items-start sm:gap-3 min-w-0">
                    <h3 className="font-bold text-charcoal-800 break-words min-w-0">{getLocalized(a.title, language)}</h3>
                    <time className="text-xs sm:text-sm text-charcoal-400 shrink-0">{formatDate(a.date, language)}</time>
                  </div>
                  <p className="text-sm text-charcoal-500 mt-1">{getLocalized(a.description, language)}</p>
                </Link>
              ))}
            </div>
            <Link to="/announcements" className="inline-block mt-4 text-primary-600 font-semibold hover:underline">
              {t('common.viewAll')} →
            </Link>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="max-w-page mx-auto px-4 sm:px-5 md:px-6 lg:px-8">
          <SectionHeader title={t('sections.villageGlance')} viewAllLink="/about" />
          <VillageStats />
        </div>
      </section>

      <section className="py-10 md:py-14 bg-white">
        <div className="max-w-page mx-auto px-4 sm:px-5 md:px-6 lg:px-8">
          <SectionHeader title={t('sections.schemes')} viewAllLink="/schemes" />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {schemes.map((s) => <SchemeCard key={s.id} scheme={s} />)}
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14 bg-charcoal-50">
        <div className="max-w-page mx-auto px-4 sm:px-5 md:px-6 lg:px-8">
          <SectionHeader title={t('sections.projects')} viewAllLink="/projects" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((p) => <ProjectCard key={p.id} project={p} />)}
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="max-w-page mx-auto px-4 sm:px-5 md:px-6 lg:px-8">
          <SectionHeader title={t('sections.events')} viewAllLink="/events" />
          <div className="grid md:grid-cols-3 gap-4">
            {events.map((e) => (
              <Card key={e.id} className="min-w-0 overflow-hidden">
                <time className="text-xs sm:text-sm font-bold text-primary-600 break-words">{formatDate(e.date, language)} · {e.time}</time>
                <h3 className="font-bold text-lg mt-2">{getLocalized(e.title, language)}</h3>
                <p className="text-sm text-charcoal-500 mt-1">{getLocalized(e.location, language)}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14 bg-white">
        <div className="max-w-page mx-auto px-4 sm:px-5 md:px-6 lg:px-8">
          <SectionHeader title={t('sections.news')} viewAllLink="/news" />
          <div className="grid md:grid-cols-2 gap-4">
            {news.map((n) => (
              <Link key={n.id} to={`/news/${n.slug}`} className="flex flex-col sm:flex-row gap-4 p-4 bg-charcoal-50 rounded-card hover:shadow-card transition-shadow">
                <SafeImage src={n.image} alt="" className="w-full sm:w-28 sm:h-28 rounded-lg flex-shrink-0" wrapperClassName="w-full sm:w-28 sm:h-28 rounded-lg flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-charcoal-800">{getLocalized(n.title, language)}</h3>
                  <p className="text-sm text-charcoal-500 mt-1">{getLocalized(n.summary, language)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14 bg-charcoal-50">
        <div className="max-w-page mx-auto px-4 sm:px-5 md:px-6 lg:px-8">
          <SectionHeader title={t('sections.gallery')} viewAllLink="/gallery" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {gallery.map((g) => (
              <div key={g.id} className="aspect-square rounded-xl overflow-hidden">
                <SafeImage
                  src={g.image}
                  alt={getLocalized(g.title, language)}
                  className="aspect-square hover:scale-105 transition-transform duration-300"
                  wrapperClassName="aspect-square rounded-xl"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="max-w-page mx-auto px-4 sm:px-5 md:px-6 lg:px-8">
          <SectionHeader title={t('sections.emergency')} />
          <EmergencyContacts contacts={emergency} />
        </div>
      </section>
    </>
  );
}
