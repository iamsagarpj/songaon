import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { getLocalized } from '@/utils/helpers';
import { Card } from '@/components/ui/Card';
import { SafeImage } from '@/components/ui/SafeImage';
import { schemeCategories } from '@/data/schemes';
import type { Scheme } from '@/types';

export function SchemeCard({ scheme }: { scheme: Scheme }) {
  const { t, language } = useLanguage();
  const category = schemeCategories.find((c) => c.key === scheme.category);

  return (
    <Card hover padding="none" className="h-full flex flex-col overflow-hidden">
      {scheme.image && (
        <SafeImage
          src={scheme.image}
          alt={getLocalized(scheme.name, language)}
          className="h-36 sm:h-40"
          wrapperClassName="h-36 sm:h-40"
        />
      )}
      <div className="p-5 flex flex-col flex-1">
        {category && (
          <span className="text-xs font-semibold text-primary-700 mb-2">
            {getLocalized(category.label, language)}
          </span>
        )}
        {scheme.isSample && (
          <span className="text-xs text-charcoal-400 mb-2">{t('common.sampleData')}</span>
        )}
        <h3 className="text-lg font-bold text-charcoal-800 mb-2">
          {getLocalized(scheme.name, language)}
        </h3>
        <p className="text-sm text-charcoal-500 mb-1 font-medium">
          {language === 'mr' ? 'ही योजना कोणासाठी?' : 'Who is this for?'}
        </p>
        <p className="text-charcoal-600 text-sm mb-4 flex-1">
          {getLocalized(scheme.forWhom, language)}
        </p>
        <Link to={`/schemes/${scheme.slug}`} className="text-primary-600 font-semibold text-sm hover:underline">
          {t('common.details')} →
        </Link>
      </div>
    </Card>
  );
}

export function SchemeCardDetailed({ scheme }: { scheme: Scheme }) {
  const { t, language } = useLanguage();
  const category = schemeCategories.find((c) => c.key === scheme.category);

  return (
    <Card className="space-y-4">
      {scheme.isSample && <p className="text-sm text-charcoal-400 bg-charcoal-50 p-3 rounded-lg">{t('common.sampleData')}</p>}
      {scheme.image && (
        <SafeImage
          src={scheme.image}
          alt={getLocalized(scheme.name, language)}
          className="h-48 sm:h-56 rounded-xl"
          wrapperClassName="h-48 sm:h-56 rounded-xl"
        />
      )}
      {category && (
        <p className="text-sm font-semibold text-primary-700">{getLocalized(category.label, language)}</p>
      )}
      <h1 className="text-2xl md:text-3xl font-bold text-charcoal-800">{getLocalized(scheme.name, language)}</h1>

      <div className="grid gap-4 md:grid-cols-2">
        <InfoBlock label={language === 'mr' ? 'ही योजना कोणासाठी?' : 'Who is this for?'} value={getLocalized(scheme.forWhom, language)} />
        <InfoBlock label={language === 'mr' ? 'फायदे' : 'Benefits'} value={getLocalized(scheme.benefits, language)} />
        <InfoBlock label={language === 'mr' ? 'पात्रता' : 'Eligibility'} value={getLocalized(scheme.eligibility, language)} />
        <InfoBlock label={language === 'mr' ? 'आवश्यक कागदपत्रे' : 'Required Documents'} value={getLocalized(scheme.documents, language)} />
        <InfoBlock label={language === 'mr' ? 'अर्ज कसा करावा' : 'How to Apply'} value={getLocalized(scheme.howToApply, language)} />
        <InfoBlock label={language === 'mr' ? 'संपर्क / मदत' : 'Contact / Help'} value={getLocalized(scheme.contactHelp, language)} />
      </div>

      {scheme.officialUrl && (
        <a href={scheme.officialUrl} target="_blank" rel="noopener noreferrer" className="inline-block text-primary-600 font-semibold hover:underline">
          {language === 'mr' ? 'अधिकृत वेबसाइट' : 'Official Website'} →
        </a>
      )}
    </Card>
  );
}

function InfoBlock({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <h3 className="font-semibold text-charcoal-700 mb-1">{label}</h3>
      <p className="text-charcoal-600">{value}</p>
    </div>
  );
}
