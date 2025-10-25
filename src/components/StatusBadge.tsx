import { cn } from '@/lib/utils';
import { CheckCircle, XCircle, Clock, Ban } from 'lucide-react';

interface StatusBadgeProps {
  status: 'success' | 'failed' | 'running' | 'cancelled';
  className?: string;
}

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const variants = {
    success: {
      icon: CheckCircle,
      className: 'bg-success/10 text-success border-success/20',
      label: 'Success',
    },
    failed: {
      icon: XCircle,
      className: 'bg-destructive/10 text-destructive border-destructive/20',
      label: 'Failed',
    },
    running: {
      icon: Clock,
      className: 'bg-primary/10 text-primary border-primary/20',
      label: 'Running',
    },
    cancelled: {
      icon: Ban,
      className: 'bg-muted text-muted-foreground border-muted',
      label: 'Cancelled',
    },
  };

  const variant = variants[status];
  const Icon = variant.icon;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium',
        variant.className,
        className
      )}
    >
      <Icon className="h-3 w-3" />
      {variant.label}
    </span>
  );
};
