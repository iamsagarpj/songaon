import { useLanguage } from '@/context/LanguageContext';
import { useVillage } from '@/context/VillageContext';
import { formatNumber } from '@/utils/helpers';
import {
  Users, Home, MapPin, BookOpen, Droplets, School, Baby, HeartPulse, Ruler,
} from 'lucide-react';

export function VillageStats() {
  const { t, language } = useLanguage();
  const { village } = useVillage();

  const stats = [
    { key: 'stats.population', value: formatNumber(village.population, language), icon: Users },
    { key: 'stats.households', value: formatNumber(village.households, language), icon: Home },
    { key: 'stats.wards', value: formatNumber(village.wards, language), icon: MapPin },
    { key: 'stats.literacy', value: `${village.literacy}%`, icon: BookOpen },
    { key: 'stats.area', value: village.area, icon: Ruler },
    { key: 'stats.waterSources', value: formatNumber(village.stats.waterSources, language), icon: Droplets },
    { key: 'stats.schools', value: formatNumber(village.stats.schools, language), icon: School },
    { key: 'stats.anganwadis', value: formatNumber(village.stats.anganwadis, language), icon: Baby },
    { key: 'stats.healthFacilities', value: formatNumber(village.stats.healthFacilities, language), icon: HeartPulse },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {stats.map(({ key, value, icon: Icon }) => (
        <div key={key} className="bg-white p-4 md:p-5 rounded-card border border-charcoal-100 text-center">
          <Icon className="w-8 h-8 text-primary-600 mx-auto mb-2" aria-hidden="true" />
          <p className="text-2xl md:text-3xl font-bold text-charcoal-800 mb-1">{value}</p>
          <p className="text-sm text-charcoal-500 font-medium">{t(key)}</p>
        </div>
      ))}
    </div>
  );
}
