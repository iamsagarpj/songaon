import { Link } from 'react-router-dom';
import {
  Landmark, Megaphone, FileText, HardHat, GraduationCap,
  Briefcase, Droplets, ClipboardList, AlertCircle, Phone,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const actions = [
  { key: 'quickActions.about', path: '/about', icon: Landmark, color: 'bg-emerald-600 text-white', tint: 'hover:border-emerald-300 hover:bg-emerald-50' },
  { key: 'quickActions.announcements', path: '/announcements', icon: Megaphone, color: 'bg-amber-500 text-white', tint: 'hover:border-amber-300 hover:bg-amber-50' },
  { key: 'quickActions.schemes', path: '/schemes', icon: FileText, color: 'bg-blue-600 text-white', tint: 'hover:border-blue-300 hover:bg-blue-50' },
  { key: 'quickActions.projects', path: '/projects', icon: HardHat, color: 'bg-orange-600 text-white', tint: 'hover:border-orange-300 hover:bg-orange-50' },
  { key: 'quickActions.education', path: '/education', icon: GraduationCap, color: 'bg-violet-600 text-white', tint: 'hover:border-violet-300 hover:bg-violet-50' },
  { key: 'quickActions.employment', path: '/employment', icon: Briefcase, color: 'bg-teal-600 text-white', tint: 'hover:border-teal-300 hover:bg-teal-50' },
  { key: 'quickActions.water', path: '/facilities', icon: Droplets, color: 'bg-sky-600 text-white', tint: 'hover:border-sky-300 hover:bg-sky-50' },
  { key: 'quickActions.forms', path: '/forms', icon: ClipboardList, color: 'bg-indigo-600 text-white', tint: 'hover:border-indigo-300 hover:bg-indigo-50' },
  { key: 'quickActions.complaint', path: '/complaints', icon: AlertCircle, color: 'bg-rose-600 text-white', tint: 'hover:border-rose-300 hover:bg-rose-50' },
  { key: 'quickActions.contact', path: '/contact', icon: Phone, color: 'bg-green-700 text-white', tint: 'hover:border-green-300 hover:bg-green-50' },
];

export function QuickActionGrid() {
  const { t } = useLanguage();

  return (
    <section className="section-padding bg-white">
      <div className="page-container">
        <h2 className="text-2xl md:text-3xl font-bold text-charcoal-800 mb-6 text-center">
          {t('quickActions.title')}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
          {actions.map(({ key, path, icon: Icon, color, tint }) => (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center gap-3 p-4 md:p-5 rounded-card-lg border border-charcoal-100 hover:shadow-card-hover hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 bg-white min-h-[112px] sm:min-h-[120px] justify-center touch-target ${tint}`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-md ring-1 ring-black/5 ${color}`}>
                <Icon className="w-6 h-6" aria-hidden="true" />
              </div>
              <span className="text-sm md:text-base font-semibold text-charcoal-700 text-center leading-tight quick-action-label">
                {t(key)}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
