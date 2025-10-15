import type { RiskItemStatus, ACTIVE_RISK_STATUSES, TERMINAL_RISK_STATUSES } from '../../../api/types';

/**
 * Status Configuration for Risk Item State Machine
 *
 * This module provides comprehensive configuration for risk item statuses,
 * including display labels, colors, icons, and helper functions.
 */

export type StatusColor = 'warning' | 'info' | 'error' | 'success' | 'default';
export type MuiColor = 'warning' | 'info' | 'error' | 'success' | 'primary' | 'secondary' | 'default';

export interface StatusConfig {
  label: string;
  color: StatusColor;
  muiColor: MuiColor;
  description: string;
  category: 'active' | 'terminal';
}

/**
 * Comprehensive status configuration mapping
 */
export const RISK_STATUS_CONFIG: Record<RiskItemStatus, StatusConfig> = {
  // Active States (6)
  PENDING_REVIEW: {
    label: 'Pending Review',
    color: 'warning',
    muiColor: 'warning',
    description: 'Awaiting triage or assignment to an SME',
    category: 'active'
  },
  UNDER_SME_REVIEW: {
    label: 'Under SME Review',
    color: 'info',
    muiColor: 'info',
    description: 'SME is actively reviewing this risk',
    category: 'active'
  },
  AWAITING_REMEDIATION: {
    label: 'Awaiting Remediation',
    color: 'warning',
    muiColor: 'warning',
    description: 'Rejected by SME, requires remediation from PO',
    category: 'active'
  },
  IN_REMEDIATION: {
    label: 'In Remediation',
    color: 'info',
    muiColor: 'info',
    description: 'Product Owner is actively working on fixes',
    category: 'active'
  },
  PENDING_APPROVAL: {
    label: 'Pending Approval',
    color: 'info',
    muiColor: 'primary',
    description: 'Remediation submitted, awaiting SME approval',
    category: 'active'
  },
  ESCALATED: {
    label: 'Escalated',
    color: 'error',
    muiColor: 'error',
    description: 'Escalated to higher authority for resolution',
    category: 'active'
  },

  // Terminal States (4)
  SME_APPROVED: {
    label: 'SME Approved',
    color: 'success',
    muiColor: 'success',
    description: 'Approved by Subject Matter Expert',
    category: 'terminal'
  },
  SELF_ATTESTED: {
    label: 'Self Attested',
    color: 'success',
    muiColor: 'success',
    description: 'Self-attested by Product Owner',
    category: 'terminal'
  },
  REMEDIATED: {
    label: 'Remediated',
    color: 'success',
    muiColor: 'success',
    description: 'Remediation completed and approved',
    category: 'terminal'
  },
  CLOSED: {
    label: 'Closed',
    color: 'default',
    muiColor: 'default',
    description: 'Manually closed or archived',
    category: 'terminal'
  }
};

/**
 * Get status configuration for a given status
 */
export function getStatusConfig(status: RiskItemStatus): StatusConfig {
  return RISK_STATUS_CONFIG[status];
}

/**
 * Get display label for a status
 */
export function getStatusLabel(status: RiskItemStatus): string {
  return RISK_STATUS_CONFIG[status]?.label || status;
}

/**
 * Get color for a status
 */
export function getStatusColor(status: RiskItemStatus): StatusColor {
  return RISK_STATUS_CONFIG[status]?.color || 'default';
}

/**
 * Get MUI-compatible color for a status
 */
export function getStatusMuiColor(status: RiskItemStatus): MuiColor {
  return RISK_STATUS_CONFIG[status]?.muiColor || 'default';
}

/**
 * Check if a status is active (requires action)
 */
export function isActiveStatus(status: RiskItemStatus): boolean {
  return RISK_STATUS_CONFIG[status]?.category === 'active';
}

/**
 * Check if a status is terminal (closed/resolved)
 */
export function isTerminalStatus(status: RiskItemStatus): boolean {
  return RISK_STATUS_CONFIG[status]?.category === 'terminal';
}

/**
 * Get all active statuses
 */
export function getActiveStatuses(): RiskItemStatus[] {
  return Object.entries(RISK_STATUS_CONFIG)
    .filter(([_, config]) => config.category === 'active')
    .map(([status]) => status as RiskItemStatus);
}

/**
 * Get all terminal statuses
 */
export function getTerminalStatuses(): RiskItemStatus[] {
  return Object.entries(RISK_STATUS_CONFIG)
    .filter(([_, config]) => config.category === 'terminal')
    .map(([status]) => status as RiskItemStatus);
}

/**
 * Status filter options for UI dropdowns
 */
export const STATUS_FILTER_OPTIONS = {
  active: [
    { value: 'PENDING_REVIEW', label: 'Pending Review' },
    { value: 'UNDER_SME_REVIEW', label: 'Under SME Review' },
    { value: 'AWAITING_REMEDIATION', label: 'Awaiting Remediation' },
    { value: 'IN_REMEDIATION', label: 'In Remediation' },
    { value: 'PENDING_APPROVAL', label: 'Pending Approval' },
    { value: 'ESCALATED', label: 'Escalated' }
  ],
  closed: [
    { value: 'SME_APPROVED', label: 'SME Approved' },
    { value: 'SELF_ATTESTED', label: 'Self Attested' },
    { value: 'REMEDIATED', label: 'Remediated' },
    { value: 'CLOSED', label: 'Closed' }
  ]
};

/**
 * Get filter options with counts
 */
export function getStatusFilterOptionsWithCounts(statusCounts: Record<string, number>) {
  return {
    active: STATUS_FILTER_OPTIONS.active.map(option => ({
      ...option,
      count: statusCounts[option.value] || 0
    })),
    closed: STATUS_FILTER_OPTIONS.closed.map(option => ({
      ...option,
      count: statusCounts[option.value] || 0
    }))
  };
}
