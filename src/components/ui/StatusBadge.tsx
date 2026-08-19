import { cn } from '@/utils/helpers';
import type { AnnouncementStatus, ProjectStatus, ComplaintStatus } from '@/types';
import { useLanguage } from '@/context/LanguageContext';

type StatusType = AnnouncementStatus | ProjectStatus | ComplaintStatus;

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const statusConfig: Record<StatusType, { labelKey: string; className: string; icon: string }> = {
  new: { labelKey: 'status.new', className: 'bg-blue-100 text-blue-800 border-blue-200', icon: '●' },
  important: { labelKey: 'status.important', className: 'bg-saffron-100 text-saffron-800 border-saffron-200', icon: '!' },
  urgent: { labelKey: 'status.urgent', className: 'bg-red-100 text-red-800 border-red-200', icon: '⚠' },
  planned: { labelKey: 'status.planned', className: 'bg-charcoal-100 text-charcoal-700 border-charcoal-200', icon: '○' },
  ongoing: { labelKey: 'status.ongoing', className: 'bg-green-100 text-green-800 border-green-200', icon: '▶' },
  completed: { labelKey: 'status.completed', className: 'bg-primary-100 text-primary-800 border-primary-200', icon: '✓' },
  stopped: { labelKey: 'status.stopped', className: 'bg-red-100 text-red-700 border-red-200', icon: '✕' },
  registered: { labelKey: 'status.registered', className: 'bg-blue-100 text-blue-800 border-blue-200', icon: '●' },
  investigating: { labelKey: 'status.investigating', className: 'bg-saffron-100 text-saffron-800 border-saffron-200', icon: '◐' },
  action: { labelKey: 'status.action', className: 'bg-orange-100 text-orange-800 border-orange-200', icon: '▶' },
  resolved: { labelKey: 'status.resolved', className: 'bg-green-100 text-green-800 border-green-200', icon: '✓' },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const { t } = useLanguage();
  const config = statusConfig[status];
  if (!config) return null;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium border',
        config.className,
        className
      )}
      role="status"
    >
      <span aria-hidden="true">{config.icon}</span>
      {t(config.labelKey)}
    </span>
  );
}
