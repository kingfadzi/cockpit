import React from 'react';
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  ShieldExclamationIcon,
} from '@heroicons/react/24/solid';

export type StatusSeverity = 'success' | 'warning' | 'error' | 'info';

export const severityIcon: Record<StatusSeverity, React.ElementType> = {
  success: CheckCircleIcon,
  error: ExclamationTriangleIcon,
  warning: ClockIcon,
  info: ShieldExclamationIcon,
};

export const severityColor: Record<StatusSeverity, string> = {
  success: '#16A34A',
  error: '#DC2626',
  warning: '#D97706',
  info: '#0EA5E9',
};
