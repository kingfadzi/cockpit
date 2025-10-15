import type { RiskItemStatus } from '../../../api/types';

/**
 * Risk Action Configuration
 *
 * Defines available actions for risk items based on current status and user role.
 * This enforces the risk item state machine transitions.
 */

export type UserRole = 'SME' | 'PO' | 'ADMIN' | 'VIEWER';

export type RiskAction =
  // SME Actions
  | 'approve'
  | 'approve_with_mitigation'
  | 'reject'
  | 'request_info'
  | 'assign_other'
  | 'escalate'
  | 'self_assign'
  | 'approve_remediation'
  | 'reject_remediation'
  | 'resolve_escalation'
  // PO Actions
  | 'self_attest'
  | 'submit_evidence'
  | 'mark_in_remediation'
  // Admin Actions
  | 'reopen'
  | 'close'
  | 'force_close';

export interface ActionConfig {
  action: RiskAction;
  label: string;
  description: string;
  color: 'success' | 'error' | 'warning' | 'info' | 'primary' | 'inherit';
  requiresComment: boolean;
  requiresAdditionalInput?: 'mitigationPlan' | 'assignee' | 'evidence';
}

/**
 * Action definitions with metadata
 */
export const RISK_ACTIONS: Record<RiskAction, ActionConfig> = {
  // SME Actions
  approve: {
    action: 'approve',
    label: 'Approve',
    description: 'Approve this risk as acceptable',
    color: 'success',
    requiresComment: true
  },
  approve_with_mitigation: {
    action: 'approve_with_mitigation',
    label: 'Approve with Mitigation',
    description: 'Approve with required mitigation plan',
    color: 'success',
    requiresComment: true,
    requiresAdditionalInput: 'mitigationPlan'
  },
  reject: {
    action: 'reject',
    label: 'Reject',
    description: 'Reject and require remediation',
    color: 'error',
    requiresComment: true
  },
  request_info: {
    action: 'request_info',
    label: 'Request Info',
    description: 'Request additional information',
    color: 'warning',
    requiresComment: true
  },
  assign_other: {
    action: 'assign_other',
    label: 'Reassign',
    description: 'Assign to another SME',
    color: 'info',
    requiresComment: true,
    requiresAdditionalInput: 'assignee'
  },
  escalate: {
    action: 'escalate',
    label: 'Escalate',
    description: 'Escalate to higher authority',
    color: 'warning',
    requiresComment: true
  },
  self_assign: {
    action: 'self_assign',
    label: 'Self Assign',
    description: 'Assign this risk to yourself',
    color: 'primary',
    requiresComment: false
  },
  approve_remediation: {
    action: 'approve_remediation',
    label: 'Approve Remediation',
    description: 'Approve the remediation work',
    color: 'success',
    requiresComment: true
  },
  reject_remediation: {
    action: 'reject_remediation',
    label: 'Reject Remediation',
    description: 'Reject remediation, needs more work',
    color: 'error',
    requiresComment: true
  },
  resolve_escalation: {
    action: 'resolve_escalation',
    label: 'Resolve Escalation',
    description: 'Resolve the escalated issue',
    color: 'success',
    requiresComment: true
  },

  // PO Actions
  self_attest: {
    action: 'self_attest',
    label: 'Self Attest',
    description: 'Attest that this risk is acceptable',
    color: 'primary',
    requiresComment: true
  },
  submit_evidence: {
    action: 'submit_evidence',
    label: 'Submit Evidence',
    description: 'Submit evidence for review',
    color: 'primary',
    requiresComment: false,
    requiresAdditionalInput: 'evidence'
  },
  mark_in_remediation: {
    action: 'mark_in_remediation',
    label: 'Start Remediation',
    description: 'Mark as in remediation',
    color: 'info',
    requiresComment: true
  },

  // Admin Actions
  reopen: {
    action: 'reopen',
    label: 'Reopen',
    description: 'Reopen a closed risk',
    color: 'warning',
    requiresComment: true
  },
  close: {
    action: 'close',
    label: 'Close',
    description: 'Close this risk',
    color: 'inherit',
    requiresComment: true
  },
  force_close: {
    action: 'force_close',
    label: 'Force Close',
    description: 'Force close without normal workflow',
    color: 'error',
    requiresComment: true
  }
};

/**
 * Get available actions based on current status and user role
 */
export function getAvailableActions(
  currentStatus: RiskItemStatus,
  userRole: UserRole,
  isAssignedToUser: boolean = false
): RiskAction[] {
  const actions: RiskAction[] = [];

  switch (currentStatus) {
    case 'PENDING_REVIEW':
      if (userRole === 'SME') {
        actions.push('self_assign', 'assign_other');
      }
      if (userRole === 'PO') {
        actions.push('self_attest');
      }
      if (userRole === 'ADMIN') {
        actions.push('self_assign', 'assign_other', 'close');
      }
      break;

    case 'UNDER_SME_REVIEW':
      if (userRole === 'SME' && isAssignedToUser) {
        actions.push(
          'approve',
          'approve_with_mitigation',
          'reject',
          'request_info',
          'assign_other',
          'escalate'
        );
      }
      if (userRole === 'ADMIN') {
        actions.push('assign_other', 'escalate', 'close');
      }
      break;

    case 'AWAITING_REMEDIATION':
      if (userRole === 'PO') {
        actions.push('submit_evidence', 'mark_in_remediation');
      }
      if (userRole === 'SME') {
        actions.push('assign_other', 'escalate');
      }
      if (userRole === 'ADMIN') {
        actions.push('close');
      }
      break;

    case 'IN_REMEDIATION':
      if (userRole === 'PO') {
        actions.push('submit_evidence');
      }
      if (userRole === 'SME') {
        actions.push('escalate');
      }
      if (userRole === 'ADMIN') {
        actions.push('close');
      }
      break;

    case 'PENDING_APPROVAL':
      if (userRole === 'SME' && isAssignedToUser) {
        actions.push('approve_remediation', 'reject_remediation', 'escalate');
      }
      if (userRole === 'ADMIN') {
        actions.push('approve_remediation', 'reject_remediation', 'close');
      }
      break;

    case 'ESCALATED':
      if (userRole === 'SME' || userRole === 'ADMIN') {
        actions.push('resolve_escalation', 'close');
      }
      break;

    // Terminal states - limited actions
    case 'SME_APPROVED':
    case 'SELF_ATTESTED':
    case 'REMEDIATED':
    case 'CLOSED':
      if (userRole === 'ADMIN') {
        actions.push('reopen');
      }
      break;
  }

  return actions;
}

/**
 * Get action configuration
 */
export function getActionConfig(action: RiskAction): ActionConfig {
  return RISK_ACTIONS[action];
}

/**
 * Check if an action requires a comment
 */
export function actionRequiresComment(action: RiskAction): boolean {
  return RISK_ACTIONS[action]?.requiresComment || false;
}

/**
 * Check if an action requires additional input
 */
export function actionRequiresAdditionalInput(action: RiskAction): 'mitigationPlan' | 'assignee' | 'evidence' | null {
  return RISK_ACTIONS[action]?.requiresAdditionalInput || null;
}

/**
 * Check if user can take action on a risk
 */
export function canTakeAction(
  currentStatus: RiskItemStatus,
  userRole: UserRole,
  isAssignedToUser: boolean = false
): boolean {
  const availableActions = getAvailableActions(currentStatus, userRole, isAssignedToUser);
  return availableActions.length > 0;
}

/**
 * Get the expected status transition for an action
 * Used for optimistic updates or validation
 */
export function getStatusTransition(
  currentStatus: RiskItemStatus,
  action: RiskAction
): RiskItemStatus | null {
  // Map actions to their resulting status
  const transitions: Record<string, Record<string, RiskItemStatus>> = {
    PENDING_REVIEW: {
      self_assign: 'UNDER_SME_REVIEW',
      assign_other: 'UNDER_SME_REVIEW',
      self_attest: 'SELF_ATTESTED'
    },
    UNDER_SME_REVIEW: {
      approve: 'SME_APPROVED',
      approve_with_mitigation: 'SME_APPROVED',
      reject: 'AWAITING_REMEDIATION',
      request_info: 'UNDER_SME_REVIEW',
      assign_other: 'UNDER_SME_REVIEW',
      escalate: 'ESCALATED'
    },
    AWAITING_REMEDIATION: {
      mark_in_remediation: 'IN_REMEDIATION',
      submit_evidence: 'PENDING_APPROVAL'
    },
    IN_REMEDIATION: {
      submit_evidence: 'PENDING_APPROVAL'
    },
    PENDING_APPROVAL: {
      approve_remediation: 'REMEDIATED',
      reject_remediation: 'AWAITING_REMEDIATION',
      escalate: 'ESCALATED'
    },
    ESCALATED: {
      resolve_escalation: 'SME_APPROVED',
      close: 'CLOSED'
    },
    SME_APPROVED: {
      reopen: 'UNDER_SME_REVIEW'
    },
    SELF_ATTESTED: {
      reopen: 'PENDING_REVIEW'
    },
    REMEDIATED: {
      reopen: 'UNDER_SME_REVIEW'
    },
    CLOSED: {
      reopen: 'PENDING_REVIEW'
    }
  };

  return transitions[currentStatus]?.[action] || null;
}
