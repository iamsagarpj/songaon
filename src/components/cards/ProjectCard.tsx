import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { getLocalized, formatCurrency, formatDate } from '@/utils/helpers';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Card } from '@/components/ui/Card';
import { SafeImage } from '@/components/ui/SafeImage';
import type { Project } from '@/types';

export function ProjectCard({ project }: { project: Project }) {
  const { t, language } = useLanguage();

  return (
    <Card hover className="h-full flex flex-col">
      {project.photos[0] && (
        <SafeImage
          src={project.photos[0]}
          alt={getLocalized(project.name, language)}
          className="h-40 sm:h-44 rounded-lg mb-4"
          wrapperClassName="rounded-lg mb-4 h-40 sm:h-44"
        />
      )}
      <div className="flex items-center justify-between mb-2">
        <StatusBadge status={project.status} />
        {project.isSample && <span className="text-xs text-charcoal-400">{t('common.sampleData')}</span>}
      </div>
      <h3 className="text-lg font-bold text-charcoal-800 mb-1">{getLocalized(project.name, language)}</h3>
      <p className="text-sm text-charcoal-500 mb-3">{getLocalized(project.location, language)}</p>

      <div className="mb-3">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-charcoal-500">{project.progress}%</span>
        </div>
        <div className="h-2.5 bg-charcoal-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary-600 rounded-full transition-all"
            style={{ width: `${project.progress}%` }}
            role="progressbar"
            aria-valuenow={project.progress}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      </div>

      <p className="text-sm text-charcoal-600 flex-1 mb-3">{getLocalized(project.description, language)}</p>
      <Link to={`/projects/${project.slug}`} className="text-primary-600 font-semibold text-sm hover:underline">
        {t('common.details')} →
      </Link>
    </Card>
  );
}

export function ProjectCardDetailed({ project }: { project: Project }) {
  const { t, language } = useLanguage();

  return (
    <div className="space-y-6">
      {project.isSample && (
        <p className="text-sm text-charcoal-500 bg-charcoal-50 p-3 rounded-lg">{t('common.sampleData')}</p>
      )}
      <div className="flex flex-wrap items-center gap-3">
        <StatusBadge status={project.status} />
        <span className="text-charcoal-500">{getLocalized(project.category, language)}</span>
      </div>
      <h1 className="text-2xl md:text-3xl font-bold text-charcoal-800">{getLocalized(project.name, language)}</h1>
      <p className="text-charcoal-600 text-lg">{getLocalized(project.description, language)}</p>

      <div className="h-3 bg-charcoal-100 rounded-full overflow-hidden">
        <div className="h-full bg-primary-600 rounded-full" style={{ width: `${project.progress}%` }} />
      </div>
      <p className="text-sm font-medium">{project.progress}% {language === 'mr' ? 'पूर्ण' : 'Complete'}</p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Stat label={language === 'mr' ? 'अंदाजित खर्च' : 'Estimated Cost'} value={formatCurrency(project.estimatedCost, language)} />
        <Stat label={language === 'mr' ? 'मंजूर रक्कम' : 'Approved Amount'} value={formatCurrency(project.approvedAmount, language)} />
        <Stat label={language === 'mr' ? 'सुरुवात' : 'Start Date'} value={formatDate(project.startDate, language)} />
        <Stat label={language === 'mr' ? 'अपेक्षित पूर्णता' : 'Expected Completion'} value={formatDate(project.expectedCompletion, language)} />
        <Stat label={language === 'mr' ? 'निधी स्रोत' : 'Funding Source'} value={getLocalized(project.fundingSource, language)} />
        {project.contractor && <Stat label={language === 'mr' ? 'ठेकेदार' : 'Contractor'} value={getLocalized(project.contractor, language)} />}
      </div>

      {project.photos.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {project.photos.map((photo, i) => (
        <SafeImage key={i} src={photo} alt="" className="h-48 rounded-xl" wrapperClassName="rounded-xl h-48" />
          ))}
        </div>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white p-4 rounded-xl border border-charcoal-100">
      <p className="text-sm text-charcoal-500 mb-1">{label}</p>
      <p className="font-bold text-charcoal-800">{value}</p>
    </div>
  );
}
