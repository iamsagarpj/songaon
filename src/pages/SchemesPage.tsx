import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SEO } from '@/components/layout/SEO';
import { PageHeader } from '@/components/ui/SectionHeader';
import { SchemeCard, SchemeCardDetailed } from '@/components/cards/SchemeCard';
import { LoadingState, EmptyState } from '@/components/ui/States';
import { Button } from '@/components/ui/Button';
import { useLanguage } from '@/context/LanguageContext';
import { getLocalized } from '@/utils/helpers';
import { schemeService } from '@/services/schemeService';
import { schemeCategories } from '@/data/schemes';
import type { Scheme, SchemeCategory } from '@/types';

export function SchemesPage() {
  const { t, language } = useLanguage();
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [filter, setFilter] = useState<SchemeCategory | 'all'>('all');
  const [loading, setLoading] = useState(true);
  const [finderStep, setFinderStep] = useState(0);
  const [who, setWho] = useState('');
  const [help, setHelp] = useState('');
  const [finderResults, setFinderResults] = useState<Scheme[]>([]);

  useEffect(() => {
    schemeService.getAll().then((data) => {
      setSchemes(data);
      setLoading(false);
    });
  }, []);

  const filtered = filter === 'all' ? schemes : schemes.filter((s) => s.category === filter);

  const whoOptions = [
    { key: 'farmer', mr: 'शेतकरी', en: 'Farmer' },
    { key: 'woman', mr: 'महिला', en: 'Woman' },
    { key: 'student', mr: 'विद्यार्थी', en: 'Student' },
    { key: 'senior', mr: 'ज्येष्ठ नागरिक', en: 'Senior Citizen' },
    { key: 'worker', mr: 'कामगार', en: 'Worker' },
    { key: 'entrepreneur', mr: 'उद्योजक', en: 'Entrepreneur' },
  ];

  const helpOptions = [
    { key: 'financial', mr: 'आर्थिक मदत', en: 'Financial Help' },
    { key: 'housing', mr: 'घर', en: 'Housing' },
    { key: 'education', mr: 'शिक्षण', en: 'Education' },
    { key: 'employment', mr: 'रोजगार', en: 'Employment' },
    { key: 'health', mr: 'आरोग्य', en: 'Health' },
    { key: 'farming', mr: 'शेती', en: 'Farming' },
  ];

  const runFinder = async () => {
    const results = await schemeService.findByProfile(who, help);
    setFinderResults(results);
    setFinderStep(2);
  };

  if (loading) return <LoadingState />;

  return (
    <>
      <SEO title={language === 'mr' ? 'सरकारी योजना' : 'Government Schemes'} path="/schemes" />
      <PageHeader title={t('sections.schemes')} />

      <div className="page-container section-padding space-y-8 sm:space-y-10">
        <p className="text-sm text-charcoal-600 -mt-4">
          {language === 'mr'
            ? 'योजना वर्ग myScheme.gov.in वर दिलेल्या १५ अधिकृत श्रेणींनुसार आहेत.'
            : 'Scheme categories follow the 15 official sectors listed on myScheme.gov.in.'}
          {' '}
          <a
            href="https://www.myscheme.gov.in/faqs"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-700 font-semibold hover:underline"
          >
            myScheme.gov.in
          </a>
        </p>
        <section className="bg-primary-50 rounded-card-lg p-6 md:p-8">
          <h2 className="text-xl font-bold mb-4">{t('schemeFinder.title')}</h2>
          {finderStep === 0 && (
            <>
              <p className="mb-4 font-medium">{t('schemeFinder.whoAreYou')}</p>
              <div className="flex flex-wrap gap-2">
                {whoOptions.map((o) => (
                  <button
                    key={o.key}
                    onClick={() => { setWho(o.key); setFinderStep(1); }}
                    className="px-4 py-3 bg-white border border-charcoal-200 rounded-xl hover:border-primary-500 font-medium"
                  >
                    {language === 'mr' ? o.mr : o.en}
                  </button>
                ))}
              </div>
            </>
          )}
          {finderStep === 1 && (
            <>
              <p className="mb-4 font-medium">{t('schemeFinder.whatHelp')}</p>
              <div className="flex flex-wrap gap-2">
                {helpOptions.map((o) => (
                  <button
                    key={o.key}
                    onClick={() => { setHelp(o.key); runFinder(); }}
                    className="px-4 py-3 bg-white border border-charcoal-200 rounded-xl hover:border-primary-500 font-medium"
                  >
                    {language === 'mr' ? o.mr : o.en}
                  </button>
                ))}
              </div>
            </>
          )}
          {finderStep === 2 && (
            <>
              <p className="mb-4 font-bold">{t('schemeFinder.results')}</p>
              {finderResults.length === 0 ? (
                <EmptyState />
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  {finderResults.map((s) => <SchemeCard key={s.id} scheme={s} />)}
                </div>
              )}
              <Button variant="ghost" className="mt-4" onClick={() => { setFinderStep(0); setWho(''); setHelp(''); }}>
                {language === 'mr' ? 'पुन्हा शोधा' : 'Search Again'}
              </Button>
            </>
          )}
        </section>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium ${filter === 'all' ? 'bg-primary-600 text-white' : 'bg-charcoal-100 text-charcoal-700'}`}
          >
            {language === 'mr' ? 'सर्व' : 'All'}
          </button>
          {schemeCategories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setFilter(cat.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium ${filter === cat.key ? 'bg-primary-600 text-white' : 'bg-charcoal-100 text-charcoal-700'}`}
            >
              {getLocalized(cat.label, language)}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.length === 0 ? (
            <div className="col-span-full">
              <EmptyState />
            </div>
          ) : (
            filtered.map((s) => <SchemeCard key={s.id} scheme={s} />)
          )}
        </div>
      </div>
    </>
  );
}

export function SchemeDetailPage() {
  const { id } = useParams();
  const { language } = useLanguage();
  const [scheme, setScheme] = useState<Scheme | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) schemeService.getBySlug(id).then((s) => { setScheme(s || null); setLoading(false); });
  }, [id]);

  if (loading) return <LoadingState />;
  if (!scheme) return <EmptyState />;

  return (
    <>
      <SEO title={getLocalized(scheme.name, language)} path={`/schemes/${id}`} />
      <PageHeader title={getLocalized(scheme.name, language)} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <SchemeCardDetailed scheme={scheme} />
        <Link to="/schemes" className="inline-block mt-6 text-primary-600 font-semibold">← {language === 'mr' ? 'सर्व योजना' : 'All Schemes'}</Link>
      </div>
    </>
  );
}
