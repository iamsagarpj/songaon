import { SEO } from '@/components/layout/SEO';
import { PageHeader } from '@/components/ui/SectionHeader';
import { useLanguage } from '@/context/LanguageContext';
import { useVillage } from '@/context/VillageContext';
import { villageFacts } from '@/config/village';
import { villageImages } from '@/config/images';
import { SafeImage } from '@/components/ui/SafeImage';
import { getLocalized, formatDate, formatNumber } from '@/utils/helpers';
import { timelineEvents } from '@/data/content';
import { User, MapPin, Train, Plane } from 'lucide-react';
import { Card } from '@/components/ui/Card';

export function AboutPage() {
  const { t, language } = useLanguage();
  const { village } = useVillage();
  const name = language === 'mr' ? village.nameMarathi : village.nameEnglish;

  return (
    <>
      <SEO
        title={language === 'mr' ? 'गावाची माहिती' : 'Village Information'}
        path="/about"
      />
      <PageHeader
        title={language === 'mr' ? `ग्रामपंचायत ${name}` : `Gram Panchayat ${name}`}
        subtitle={language === 'mr'
          ? `${getLocalized(village.taluka, language)}, ${getLocalized(village.district, language)} — पिन ${village.pincode}`
          : `${village.taluka.en}, ${village.district.en} — PIN ${village.pincode}`}
      />

      <div className="page-container py-8 sm:py-10 space-y-8 sm:space-y-10">
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <SafeImage
            src={villageImages.villageView}
            alt={language === 'mr' ? `${village.nameMarathi}, ${village.district.mr}` : `${village.nameEnglish}, ${village.district.en}`}
            className="h-56 sm:h-64 md:h-80 rounded-card-lg"
            wrapperClassName="rounded-card-lg h-56 sm:h-64 md:h-80"
          />
          <div>
            <p className="text-lg text-charcoal-700 leading-relaxed">
              {getLocalized(villageFacts.description, language)}
            </p>
            <p className="text-sm text-charcoal-400 mt-3">
              {language === 'mr' ? 'ग्राम कोड' : 'Village Code'}: {villageFacts.villageCode} | {language === 'mr' ? 'जनगणना २०११' : 'Census 2011'}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: language === 'mr' ? 'लोकसंख्या' : 'Population', value: formatNumber(village.population, language) },
            { label: language === 'mr' ? 'घरे' : 'Households', value: formatNumber(village.households, language) },
            { label: language === 'mr' ? 'साक्षरता' : 'Literacy', value: `${village.literacy}%` },
            { label: language === 'mr' ? 'क्षेत्रफळ' : 'Area', value: village.area },
          ].map((s) => (
            <Card key={s.label} className="text-center">
              <p className="text-3xl font-bold text-primary-700">{s.value}</p>
              <p className="text-charcoal-500 mt-1">{s.label}</p>
            </Card>
          ))}
        </div>

        <Card>
          <h2 className="text-xl font-bold mb-4">{language === 'mr' ? 'प्रशासकीय माहिती' : 'Administrative Details'}</h2>
          <div className="grid sm:grid-cols-2 gap-3 text-charcoal-700">
            <p><strong>{language === 'mr' ? 'ग्रामपंचायत:' : 'Gram Panchayat:'}</strong> {name}</p>
            <p><strong>{language === 'mr' ? 'ब्लॉक:' : 'Block:'}</strong> {getLocalized(villageFacts.blockPanchayat, language)}</p>
            <p><strong>{language === 'mr' ? 'तालुका मुख्यालय:' : 'Taluka HQ:'}</strong> {getLocalized(villageFacts.talukaHQ, language)}</p>
            <p><strong>{language === 'mr' ? 'जिल्हा मुख्यालय:' : 'District HQ:'}</strong> {getLocalized(villageFacts.districtHQ, language)}</p>
            <p><strong>{language === 'mr' ? 'विधानसभा:' : 'Assembly:'}</strong> {getLocalized(villageFacts.assemblyConstituency, language)}</p>
            <p><strong>{language === 'mr' ? 'लोकसभा:' : 'Parliament:'}</strong> {getLocalized(villageFacts.parliamentConstituency, language)}</p>
          </div>
        </Card>

        <div className="grid sm:grid-cols-3 gap-4">
          <Card className="flex items-center gap-3">
            <MapPin className="w-6 h-6 text-primary-600 flex-shrink-0" />
            <div>
              <p className="font-semibold">{language === 'mr' ? 'जवळचे शहर' : 'Nearest Town'}</p>
              <p className="text-charcoal-600">{getLocalized(villageFacts.nearestTown, language)} (4 km)</p>
            </div>
          </Card>
          <Card className="flex items-center gap-3">
            <Train className="w-6 h-6 text-primary-600 flex-shrink-0" />
            <div>
              <p className="font-semibold">{language === 'mr' ? 'रेल्वे स्थानक' : 'Railway Station'}</p>
              <p className="text-charcoal-600">{getLocalized(villageFacts.nearestRailway, language)}</p>
            </div>
          </Card>
          <Card className="flex items-center gap-3">
            <Plane className="w-6 h-6 text-primary-600 flex-shrink-0" />
            <div>
              <p className="font-semibold">{language === 'mr' ? 'विमानतळ' : 'Airport'}</p>
              <p className="text-charcoal-600">{getLocalized(villageFacts.nearestAirport, language)}</p>
            </div>
          </Card>
        </div>

        <section>
          <h2 className="text-2xl font-bold mb-6">{language === 'mr' ? 'गावाचा इतिहास' : 'Village History'}</h2>
          <div className="relative border-l-2 border-primary-300 pl-8 space-y-8">
            {timelineEvents.map((event) => (
              <div key={event.year} className="relative">
                <div className="absolute -left-[41px] w-4 h-4 bg-primary-600 rounded-full border-4 border-white" />
                <p className="text-sm font-bold text-primary-600">{event.year}</p>
                <h3 className="font-bold text-lg">{getLocalized(event.title, language)}</h3>
                <p className="text-charcoal-600">{getLocalized(event.description, language)}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-6">
          <Card>
            <div className="flex items-center gap-3 mb-4">
              <User className="w-6 h-6 text-primary-600" />
              <h3 className="font-bold text-lg">{getLocalized(village.sarpanch.role, language)}</h3>
            </div>
            <p className="font-semibold text-lg">{getLocalized(village.sarpanch.name, language)}</p>
            {village.sarpanch.phone && (
              <a href={`tel:${village.sarpanch.phone}`} className="text-primary-600 mt-2 inline-block">{village.sarpanch.phone}</a>
            )}
          </Card>
          <Card>
            <div className="flex items-center gap-3 mb-4">
              <User className="w-6 h-6 text-primary-600" />
              <h3 className="font-bold text-lg">{getLocalized(village.gramsevak.role, language)}</h3>
            </div>
            <p className="font-semibold text-lg">{getLocalized(village.gramsevak.name, language)}</p>
            {village.gramsevak.phone && (
              <a href={`tel:${village.gramsevak.phone}`} className="text-primary-600 mt-2 inline-block">{village.gramsevak.phone}</a>
            )}
          </Card>
        </section>

        <p className="text-sm text-charcoal-400">
          {t('common.lastUpdated')}: {formatDate(village.lastUpdated, language)} | {language === 'mr' ? 'स्रोत: जनगणना २०११, सार्वजनिक निर्देशिका' : 'Source: Census 2011, public directories'}
        </p>
      </div>
    </>
  );
}
