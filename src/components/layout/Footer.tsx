import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { useVillage } from '@/context/VillageContext';
import { Phone, Mail, Clock } from 'lucide-react';

export function Footer() {
  const { t, language } = useLanguage();
  const { village } = useVillage();
  const name = language === 'mr' ? village.nameMarathi : village.nameEnglish;

  const quickLinks = [
    { label: t('nav.about'), path: '/about' },
    { label: t('nav.schemes'), path: '/schemes' },
    { label: t('nav.complaints'), path: '/complaints' },
    { label: t('nav.forms'), path: '/forms' },
    { label: t('nav.contact'), path: '/contact' },
  ];

  const serviceLinks = [
    { label: t('quickActions.education'), path: '/education' },
    { label: t('quickActions.employment'), path: '/employment' },
    { label: language === 'mr' ? 'शेतकऱ्यांसाठी' : 'For Farmers', path: '/farmers' },
    { label: language === 'mr' ? 'महिलांसाठी' : 'For Women', path: '/women' },
    { label: language === 'mr' ? 'ज्येष्ठ नागरिक' : 'Senior Citizens', path: '/senior-citizens' },
  ];

  return (
    <footer className="bg-primary-800 text-white mt-auto hidden lg:block">
      <div className="max-w-page mx-auto px-4 sm:px-5 md:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h2 className="text-xl font-bold mb-3">
              {language === 'mr' ? `ग्रामपंचायत ${name}` : `Gram Panchayat ${name}`}
            </h2>
            <p className="text-primary-100 text-sm leading-relaxed">{t('footer.disclaimer')}</p>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-primary-100">{language === 'mr' ? 'द्रुत दुवे' : 'Quick Links'}</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-white/80 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-primary-100">{language === 'mr' ? 'नागरिक सेवा' : 'Citizen Services'}</h3>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-white/80 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-primary-100">{t('nav.contact')}</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <a href={`tel:${village.contact}`} className="hover:underline">{village.contact}</a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <a href={`mailto:${village.email}`} className="hover:underline break-all">{village.email}</a>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span>{language === 'mr' ? village.officeHours.mr : village.officeHours.en}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-700 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-primary-200">
          <p>© {new Date().getFullYear()} {name}. {t('footer.copyright')}.</p>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-white">{t('footer.privacy')}</Link>
            <Link to="/terms" className="hover:text-white">{t('footer.terms')}</Link>
            <Link to="/accessibility" className="hover:text-white">{t('footer.accessibility')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
