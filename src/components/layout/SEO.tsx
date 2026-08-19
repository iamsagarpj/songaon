import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/context/LanguageContext';
import { useVillage } from '@/context/VillageContext';

interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
}

export function SEO({ title, description, path = '' }: SEOProps) {
  const { language } = useLanguage();
  const { village } = useVillage();
  const name = language === 'mr' ? village.nameMarathi : village.nameEnglish;
  const fullTitle = title
    ? `${title} | ${language === 'mr' ? 'ग्रामपंचायत' : 'Gram Panchayat'} ${name}`
    : `${language === 'mr' ? 'ग्रामपंचायत' : 'Gram Panchayat'} ${name} | ${language === 'mr' ? 'डिजिटल ग्रामपंचायत' : 'Digital Gram Panchayat'}`;
  const desc =
    description ||
    (language === 'mr'
      ? `${name} ग्रामपंचायत — गावाची माहिती, सरकारी योजना, सुविधा, घोषणा आणि नागरिक सेवा.`
      : `${name} Gram Panchayat — Village information, government schemes, facilities, notices and citizen services.`);

  const siteUrl = (import.meta.env.VITE_SITE_URL ?? '').replace(/\/$/, '');
  const canonicalUrl = siteUrl ? `${siteUrl}${path}` : undefined;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'GovernmentOrganization',
    name: `Gram Panchayat ${village.nameEnglish}`,
    alternateName: `ग्रामपंचायत ${village.nameMarathi}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: village.nameEnglish,
      addressRegion: village.district.en,
      postalCode: village.pincode,
      addressCountry: 'IN',
    },
    telephone: village.contact,
    email: village.email,
  };

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </Helmet>
  );
}
