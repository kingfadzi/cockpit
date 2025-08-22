import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  ShieldExclamationIcon,
} from '@heroicons/react/24/solid';

/**
 * Severity levels map to heroicons and colours.
 * Keeps icons consistent even if labels change.
 */
export type StatusSeverity = 'success' | 'warning' | 'error' | 'info';

export const severityIcon: Record<StatusSeverity, any> = {
  success: CheckCircleIcon,
  error: ExclamationTriangleIcon,
  warning: ClockIcon,
  info: ShieldExclamationIcon,
};

export const severityColor: Record<StatusSeverity, string> = {
  success: '#16A34A', // green-600
  error: '#DC2626',   // red-600
  warning: '#D97706', // amber-600
  info: '#0EA5E9',    // blue-600
};
