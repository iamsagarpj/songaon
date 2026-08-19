import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { useVillage } from '@/context/VillageContext';
import { Button } from '@/components/ui/Button';
import { villageImages } from '@/config/images';

export function Hero() {
  const { t, language } = useLanguage();
  const { village } = useVillage();
  const villageName = language === 'mr' ? village.nameMarathi : village.nameEnglish;

  return (
    <section className="relative min-h-[360px] xs:min-h-[400px] sm:min-h-[440px] md:min-h-[480px] lg:min-h-[520px] flex items-end sm:items-center">
      <img
        src={villageImages.hero}
        alt={language === 'mr' ? `${villageName}, ${village.district.mr} — अजिंक्यतारा, सातारा` : `${villageName}, ${village.district.en} — Ajinkyatara Fort, Satara`}
        className="absolute inset-0 w-full h-full object-cover"
        fetchPriority="high"
        decoding="async"
      />
      <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-primary-900/95 via-primary-800/88 to-primary-600/40" />
      <div className="relative page-container py-10 sm:py-14 md:py-16 w-full">
        <p className="text-white/85 text-sm sm:text-base font-medium mb-2 drop-shadow-sm">
          {language === 'mr' ? 'ग्रामपंचायत' : 'Gram Panchayat'} {villageName} · {language === 'mr' ? village.district.mr : village.district.en}
        </p>
        <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-[3.25rem] font-bold text-white leading-tight max-w-3xl mb-3 sm:mb-4 drop-shadow-md">
          {t('hero.title')}
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mb-6 sm:mb-8 leading-relaxed">
          {t('hero.subtitle')}
        </p>
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:flex lg:flex-wrap gap-3 max-w-3xl">
          <Link to="/complaints" className="w-full xs:w-auto">
            <Button variant="saffron" size="lg" fullWidth className="xs:w-auto">{t('hero.complaint')}</Button>
          </Link>
          <Link to="/schemes" className="w-full xs:w-auto">
            <Button variant="primary" size="lg" fullWidth className="xs:w-auto">
              {t('hero.schemes')}
            </Button>
          </Link>
          <Link to="/about" className="w-full xs:w-auto">
            <Button variant="gold" size="lg" fullWidth className="xs:w-auto">
              {t('hero.about')}
            </Button>
          </Link>
          <Link to="/forms" className="w-full xs:w-auto">
            <Button variant="secondary" size="lg" fullWidth className="xs:w-auto">
              {t('hero.forms')}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
