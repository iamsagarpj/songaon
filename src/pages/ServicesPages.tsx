import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SEO } from '@/components/layout/SEO';
import { PageHeader } from '@/components/ui/SectionHeader';
import { LoadingState } from '@/components/ui/States';
import { Card } from '@/components/ui/Card';
import { SafeImage } from '@/components/ui/SafeImage';
import { useLanguage } from '@/context/LanguageContext';
import { getLocalized, formatDate } from '@/utils/helpers';
import { formService, newsService, eventService, galleryService, budgetService } from '@/services/contentService';
import { educationService, employmentService } from '@/services/contentService';
import type { FormDocument, NewsArticle, Event, GalleryItem, BudgetRecord, EducationInstitution, EmploymentOpportunity } from '@/types';
import { Download } from 'lucide-react';
import { useVillage } from '@/context/VillageContext';
import { getGoogleMapsUrl } from '@/utils/helpers';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export function FormsPage() {
  const { t, language } = useLanguage();
  const [forms, setForms] = useState<FormDocument[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    formService.getAll().then((data) => { setForms(data); setLoading(false); });
  }, []);

  if (loading) return <LoadingState />;

  return (
    <>
      <SEO title={language === 'mr' ? 'नागरिकांसाठी फॉर्म' : 'Citizen Forms'} path="/forms" />
      <PageHeader title={language === 'mr' ? 'नागरिकांसाठी फॉर्म' : 'Citizen Forms'} subtitle={t('common.sampleData')} />
      <div className="page-container py-10 grid md:grid-cols-2 gap-4">
        {forms.map((f) => (
          <Card key={f.id} id={f.slug}>
            <span className="text-xs font-medium text-primary-600">{getLocalized(f.category, language)}</span>
            <h3 className="font-bold text-lg mt-1">{getLocalized(f.name, language)}</h3>
            <p className="text-sm text-charcoal-600 mt-2">{getLocalized(f.purpose, language)}</p>
            <p className="text-sm text-charcoal-500 mt-2"><strong>{language === 'mr' ? 'कागदपत्रे:' : 'Documents:'}</strong> {getLocalized(f.documents, language)}</p>
            <button className="mt-4 inline-flex items-center gap-2 text-primary-600 font-semibold">
              <Download className="w-4 h-4" /> {t('common.download')} PDF
            </button>
          </Card>
        ))}
      </div>
    </>
  );
}

export function ContactPage() {
  const { t, language } = useLanguage();
  const { village } = useVillage();
  const name = language === 'mr' ? village.nameMarathi : village.nameEnglish;

  return (
    <>
      <SEO title={t('nav.contact')} path="/contact" />
      <PageHeader title={language === 'mr' ? 'संपर्क करा' : 'Contact Us'} />
      <div className="page-container py-10 grid md:grid-cols-2 gap-6">
        <Card className="space-y-4">
          <h2 className="text-xl font-bold">{language === 'mr' ? `ग्रामपंचायत ${name}` : `Gram Panchayat ${name}`}</h2>
          <div className="flex gap-3"><MapPin className="w-5 h-5 text-primary-600 flex-shrink-0" /><p>{name}, {getLocalized(village.taluka, language)}, {getLocalized(village.district, language)} — {village.pincode}</p></div>
          <div className="flex gap-3"><Phone className="w-5 h-5 text-primary-600 flex-shrink-0" /><a href={`tel:${village.contact}`} className="text-primary-600 font-semibold">{village.contact}</a></div>
          <div className="flex gap-3"><Mail className="w-5 h-5 text-primary-600 flex-shrink-0" /><a href={`mailto:${village.email}`} className="text-primary-600 break-all">{village.email}</a></div>
          <div className="flex gap-3"><Clock className="w-5 h-5 text-primary-600 flex-shrink-0" /><p>{language === 'mr' ? village.officeHours.mr : village.officeHours.en}</p></div>
          {village.mapCoordinates && (
            <a href={getGoogleMapsUrl(village.mapCoordinates.lat, village.mapCoordinates.lng)} target="_blank" rel="noopener noreferrer" className="inline-block text-primary-600 font-semibold">
              Google Maps {language === 'mr' ? 'मध्ये दिशा पहा' : 'Directions'} →
            </a>
          )}
        </Card>
        <div className="space-y-4">
          <Card>
            <h3 className="font-bold">{getLocalized(village.sarpanch.role, language)}</h3>
            <p className="text-lg font-semibold mt-1">{getLocalized(village.sarpanch.name, language)}</p>
          </Card>
          <Card>
            <h3 className="font-bold">{getLocalized(village.gramsevak.role, language)}</h3>
            <p className="text-lg font-semibold mt-1">{getLocalized(village.gramsevak.name, language)}</p>
          </Card>
        </div>
      </div>
    </>
  );
}

function ServicePage({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <>
      <PageHeader title={title} subtitle={subtitle} />
      <div className="page-container section-padding">{children}</div>
    </>
  );
}

export function EducationPage() {
  const { language } = useLanguage();
  const [institutions, setInstitutions] = useState<EducationInstitution[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    educationService.getInstitutions().then((data) => { setInstitutions(data); setLoading(false); });
  }, []);

  if (loading) return <LoadingState />;

  return (
    <>
      <SEO title={language === 'mr' ? 'शिक्षण' : 'Education'} path="/education" />
      <ServicePage title={language === 'mr' ? 'शिक्षण' : 'Education'}>
        <div className="grid md:grid-cols-2 gap-4">
          {institutions.map((inst) => (
            <Card key={inst.id}>
              {inst.photo && (
                <SafeImage src={inst.photo} alt="" className="h-40 rounded-lg mb-3" wrapperClassName="rounded-lg mb-3 h-40" />
              )}
              <h3 className="font-bold text-lg">{getLocalized(inst.name, language)}</h3>
              <p className="text-sm text-charcoal-500">{getLocalized(inst.address, language)}</p>
              {inst.students && <p className="text-sm mt-2">{language === 'mr' ? 'विद्यार्थी:' : 'Students:'} {inst.students}</p>}
              <p className="text-sm text-charcoal-600 mt-1">{getLocalized(inst.facilities, language)}</p>
              <a href={`tel:${inst.contact}`} className="text-primary-600 font-semibold mt-2 inline-block">{inst.contact}</a>
            </Card>
          ))}
        </div>
      </ServicePage>
    </>
  );
}

export function EmploymentPage() {
  const { language } = useLanguage();
  const [opportunities, setOpportunities] = useState<EmploymentOpportunity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    employmentService.getOpportunities().then((data) => { setOpportunities(data); setLoading(false); });
  }, []);

  if (loading) return <LoadingState />;

  return (
    <>
      <SEO title={language === 'mr' ? 'रोजगार आणि कौशल्य' : 'Employment & Skills'} path="/employment" />
      <ServicePage title={language === 'mr' ? 'रोजगार आणि कौशल्य' : 'Employment & Skills'}>
        <div className="grid md:grid-cols-2 gap-4">
          {opportunities.map((o) => (
            <Card key={o.id}>
              <span className="text-xs text-primary-600 font-medium">{getLocalized(o.category, language)}</span>
              <h3 className="font-bold text-lg mt-1">{getLocalized(o.title, language)}</h3>
              <p className="text-charcoal-600 mt-2">{getLocalized(o.description, language)}</p>
              {o.deadline && <p className="text-sm text-charcoal-400 mt-2">{language === 'mr' ? 'अंतिम तारीख:' : 'Deadline:'} {formatDate(o.deadline, language)}</p>}
            </Card>
          ))}
        </div>
      </ServicePage>
    </>
  );
}

function AudiencePage({ path, titleMr, titleEn, content }: { path: string; titleMr: string; titleEn: string; content: { mr: string; en: string }[] }) {
  const { language } = useLanguage();
  return (
    <>
      <SEO title={language === 'mr' ? titleMr : titleEn} path={path} />
      <ServicePage title={language === 'mr' ? titleMr : titleEn}>
        <div className="space-y-4 max-w-3xl">
          {content.map((item, i) => (
            <Card key={i}><p className="text-lg">{language === 'mr' ? item.mr : item.en}</p></Card>
          ))}
          <Link to="/schemes" className="inline-block text-primary-600 font-semibold text-lg">
            {language === 'mr' ? 'संबंधित योजना पहा →' : 'View Related Schemes →'}
          </Link>
        </div>
      </ServicePage>
    </>
  );
}

export function FarmersPage() {
  return (
    <AudiencePage path="/farmers" titleMr="शेतकऱ्यांसाठी" titleEn="For Farmers" content={[
      { mr: 'शेती संबंधित सरकारी योजना, PM-KISAN, कृषी अनुदान.', en: 'Agriculture schemes, PM-KISAN, farm subsidies.' },
      { mr: 'हवामान, बाजार भाव, पाणी स्रोत — API द्वारे भविष्यात जोडले जाईल.', en: 'Weather, market prices, water resources — to be connected via API.' },
      { mr: 'शेती सल्लागार आणि हेल्पलाइन संपर्क.', en: 'Agriculture advisor and helpline contacts.' },
    ]} />
  );
}

export function WomenPage() {
  return (
    <AudiencePage path="/women" titleMr="महिलांसाठी" titleEn="For Women" content={[
      { mr: 'महिला सशक्तीकरण योजना, बचत गट, प्रशिक्षण.', en: 'Women empowerment schemes, SHGs, training.' },
      { mr: 'आरोग्य, आर्थिक सहाय्य, उद्योजकता कार्यक्रम.', en: 'Health, financial assistance, entrepreneurship programs.' },
    ]} />
  );
}

export function SeniorCitizensPage() {
  return (
    <AudiencePage path="/senior-citizens" titleMr="ज्येष्ठ नागरिकांसाठी" titleEn="For Senior Citizens" content={[
      { mr: 'ज्येष्ठ नागरिक निवृत्ती वेतन आणि सरकारी लाभ.', en: 'Old age pension and government benefits.' },
      { mr: 'आरोग्य माहिती, अर्ज फॉर्म, महत्त्वाचे संपर्क.', en: 'Health information, application forms, important contacts.' },
    ]} />
  );
}

export function CulturePage() {
  const { language } = useLanguage();
  return (
    <>
      <SEO title={language === 'mr' ? 'आपली संस्कृती' : 'Our Culture'} path="/culture" />
      <ServicePage title={language === 'mr' ? 'आपली संस्कृती' : 'Our Culture'} subtitle={language === 'mr' ? 'गावाचा इतिहास, सण, परंपरा' : 'Village history, festivals, traditions'}>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { mr: 'गावाचे उत्सव आणि सण', en: 'Village festivals and celebrations' },
            { mr: 'ग्रामदैवत आणि मंदिरे', en: 'Village deity and temples' },
            { mr: 'पारंपरिक कार्यक्रम', en: 'Traditional events' },
            { mr: 'ऐतिहासिक ठिकाणे', en: 'Historical places' },
          ].map((item, i) => (
            <Card key={i}><p className="text-lg font-medium">{language === 'mr' ? item.mr : item.en}</p></Card>
          ))}
        </div>
      </ServicePage>
    </>
  );
}

export function EnvironmentPage() {
  const { language } = useLanguage();
  return (
    <>
      <SEO title={language === 'mr' ? 'पर्यावरण' : 'Environment'} path="/environment" />
      <ServicePage title={language === 'mr' ? 'पर्यावरण' : 'Environment'}>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { mr: 'वृक्षारोपण', en: 'Tree Plantation' },
            { mr: 'जलसंधारण', en: 'Water Conservation' },
            { mr: 'कचरा व्यवस्थापन', en: 'Waste Management' },
            { mr: 'स्वच्छ गाव', en: 'Clean Village' },
          ].map((item, i) => (
            <Card key={i}><p className="text-lg font-medium">{language === 'mr' ? item.mr : item.en}</p></Card>
          ))}
        </div>
      </ServicePage>
    </>
  );
}

export function BudgetPage() {
  const { t, language } = useLanguage();
  const [records, setRecords] = useState<BudgetRecord[]>([]);
  const [selected, setSelected] = useState('2025-26');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    budgetService.getAll().then((data) => { setRecords(data); setLoading(false); });
  }, []);

  const budget = records.find((r) => r.year === selected);

  if (loading) return <LoadingState />;

  return (
    <>
      <SEO title={language === 'mr' ? 'ग्रामपंचायत अर्थसंकल्प' : 'Gram Panchayat Budget'} path="/budget" />
      <ServicePage title={language === 'mr' ? 'ग्रामपंचायत अर्थसंकल्प' : 'Gram Panchayat Budget'} subtitle={t('common.sampleData')}>
        <div className="flex gap-2 mb-6">
          {records.map((r) => (
            <button key={r.year} onClick={() => setSelected(r.year)}
              className={`px-4 py-2 rounded-full font-medium ${selected === r.year ? 'bg-primary-600 text-white' : 'bg-charcoal-100'}`}>
              {r.year}
            </button>
          ))}
        </div>
        {budget && (
          <div className="grid sm:grid-cols-3 gap-4">
            <Card className="text-center bg-primary-50">
              <p className="text-sm text-charcoal-500">{language === 'mr' ? 'एकूण निधी' : 'Total Fund'}</p>
              <p className="text-3xl font-bold text-primary-700">₹{(budget.totalIncome / 100000).toFixed(1)} {language === 'mr' ? 'लाख' : 'Lakh'}</p>
            </Card>
            <Card className="text-center">
              <p className="text-sm text-charcoal-500">{language === 'mr' ? 'खर्च' : 'Spent'}</p>
              <p className="text-3xl font-bold text-saffron-600">₹{(budget.spent / 100000).toFixed(1)} {language === 'mr' ? 'लाख' : 'Lakh'}</p>
            </Card>
            <Card className="text-center">
              <p className="text-sm text-charcoal-500">{language === 'mr' ? 'शिल्लक' : 'Remaining'}</p>
              <p className="text-3xl font-bold text-green-700">₹{(budget.remaining / 100000).toFixed(1)} {language === 'mr' ? 'लाख' : 'Lakh'}</p>
            </Card>
          </div>
        )}
      </ServicePage>
    </>
  );
}

export function NewsPage() {
  const { language } = useLanguage();
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    newsService.getAll().then((data) => { setArticles(data); setLoading(false); });
  }, []);

  if (loading) return <LoadingState />;

  return (
    <>
      <SEO title={language === 'mr' ? 'गावातील बातम्या' : 'Village News'} path="/news" />
      <ServicePage title={language === 'mr' ? 'गावातील बातम्या' : 'Village News'}>
        <div className="grid md:grid-cols-2 gap-4">
          {articles.map((n) => (
            <Link key={n.id} to={`/news/${n.slug}`} className="block">
              <Card hover className="flex flex-col sm:flex-row gap-4">
                <SafeImage src={n.image} alt="" className="w-full sm:w-32 sm:h-32 rounded-lg" wrapperClassName="w-full sm:w-32 sm:h-32 rounded-lg flex-shrink-0" />
                <div className="min-w-0">
                  <time className="text-xs sm:text-sm text-charcoal-400 break-words">{formatDate(n.date, language)}</time>
                  <h3 className="font-bold text-lg mt-1">{getLocalized(n.title, language)}</h3>
                  <p className="text-sm text-charcoal-600 mt-1">{getLocalized(n.summary, language)}</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </ServicePage>
    </>
  );
}

export function NewsDetailPage() {
  const { id } = useParams();
  const { language } = useLanguage();
  const [article, setArticle] = useState<NewsArticle | null>(null);

  useEffect(() => {
    if (id) newsService.getBySlug(id).then((a) => setArticle(a || null));
  }, [id]);

  if (!article) return <LoadingState />;

  return (
    <>
      <SEO title={getLocalized(article.title, language)} path={`/news/${id}`} />
      <PageHeader title={getLocalized(article.title, language)} />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <SafeImage src={article.image} alt="" className="w-full h-52 sm:h-64 rounded-xl mb-6" wrapperClassName="rounded-xl mb-6 h-52 sm:h-64" />
        <p className="text-lg leading-relaxed">{getLocalized(article.content, language)}</p>
      </div>
    </>
  );
}

export function EventsPage() {
  const { language } = useLanguage();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    eventService.getAll().then((data) => { setEvents(data); setLoading(false); });
  }, []);

  if (loading) return <LoadingState />;

  return (
    <>
      <SEO title={language === 'mr' ? 'कार्यक्रम' : 'Events'} path="/events" />
      <ServicePage title={language === 'mr' ? 'गावातील आगामी कार्यक्रम' : 'Upcoming Events'}>
        <div className="space-y-4">
          {events.map((e) => (
            <Card key={e.id} className="min-w-0 overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 min-w-0">
                <div className="bg-primary-100 text-primary-800 px-4 py-3 rounded-xl text-center sm:min-w-[100px] shrink-0">
                  <p className="font-bold text-sm sm:text-base break-words">{formatDate(e.date, language)}</p>
                  <p className="text-sm">{e.time}</p>
                </div>
                <div>
                  <h3 className="font-bold text-lg">{getLocalized(e.title, language)}</h3>
                  <p className="text-charcoal-600">{getLocalized(e.description, language)}</p>
                  <p className="text-sm text-charcoal-400 mt-1">{getLocalized(e.location, language)}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </ServicePage>
    </>
  );
}

export function GalleryPage() {
  const { language } = useLanguage();
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [selected, setSelected] = useState<GalleryItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    galleryService.getAll().then((data) => { setItems(data); setLoading(false); });
  }, []);

  if (loading) return <LoadingState />;

  return (
    <>
      <SEO title={language === 'mr' ? 'गावाची छायाचित्रे' : 'Village Gallery'} path="/gallery" />
      <ServicePage title={language === 'mr' ? 'गावाची छायाचित्रे' : 'Village Gallery'}>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {items.map((g) => (
            <button key={g.id} onClick={() => setSelected(g)} className="aspect-square rounded-xl overflow-hidden focus:ring-2 focus:ring-primary-500 touch-target">
              <SafeImage
                src={g.image}
                alt={getLocalized(g.title, language)}
                className="aspect-square hover:scale-105 transition-transform"
                wrapperClassName="aspect-square rounded-xl"
              />
            </button>
          ))}
        </div>
        {selected && (
          <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setSelected(null)} role="dialog" aria-modal="true">
            <img src={selected.image} alt={getLocalized(selected.title, language)} className="max-w-full max-h-[85vh] object-contain rounded-lg mx-auto" />
            <p className="absolute bottom-8 text-white text-lg font-medium">{getLocalized(selected.title, language)}</p>
          </div>
        )}
      </ServicePage>
    </>
  );
}

export function StaticPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <>
      <SEO title={title} />
      <PageHeader title={title} />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 prose prose-lg">{children}</div>
    </>
  );
}
