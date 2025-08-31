export interface SmeAssignment {
    fieldKey: string;
    appId: string;
    appName: string;
    fieldLabel: string;
    assignedSmeId: string;
    assignedAt: string;
    dueDate?: string;
    priority: 'urgent' | 'normal' | 'low';
    status: 'pending' | 'in_review' | 'approved' | 'rejected';
    evidenceStatus: 'missing' | 'expired' | 'pending_approval' | 'approved';
    daysOverdue?: number;
}

export interface SmeQueueItem {
    appId: string;
    appName: string;
    fieldKey: string;
    fieldLabel: string;
    evidenceStatus: 'missing' | 'expired' | 'pending_approval';
    lastUpdated: string;
    priority: 'urgent' | 'normal' | 'low';
    issueCount: number;
}

export interface RiskItem {
    riskId: string;
    title: string;
    severity: 'High' | 'Medium' | 'Low';
    status: 'Open' | 'Mitigated' | 'Closed';
    appId: string;
    appName: string;
    fieldKey?: string;
    createdBy: string;
    createdAt: string;
}

export const SME_DOMAIN_FIELDS = {
    security: {
        primary: [
            'encryption_at_rest',
            'encryption_in_transit', 
            'security_testing',
            'secrets_management',
            'key_rotation_max',
            'security_vision',
            'mfa_enforcement',
            'privileged_access_mgmt',
            'patching_sla',
            'dependency_management',
            'waf_protection',
            'siem_integration'
        ],
        crossDomain: [
            'audit_logging',
            'change_control',
            'access_review',
            'tpsp_attestation',
            'network_segmentation',
            'log_retention',
            'ir_plan',
            'ir_exercise'
        ]
    },
    dataArchitecture: {
        primary: [
            'confidentiality_level',
            'data_residency_control',
            'de_identification',
            'data_validation',
            'data_retention_policy',
            'data_deletion_evidence'
        ],
        crossDomain: [
            'reconciliation_frequency',
            'backup_policy',
            'immutability_required',
            'tpsp_attestation'
        ]
    },
    serviceTransition: {
        primary: [
            'rto_hours',
            'rpo_minutes',
            'ha_topology',
            'monitoring_slos',
            'oncall_coverage',
            'dr_test_frequency',
            'failover_automation',
            'ir_plan',
            'ir_exercise'
        ],
        crossDomain: [
            'runbook_maturity',
            'chaos_testing',
            'backup_policy'
        ]
    },
    enterpriseArchitecture: {
        primary: [
            'architecture_vision',
            'service_vision',
            'product_vision',
            'product_roadmap',
            'test_vision'
        ],
        crossDomain: [
            'change_control',
            'immutability_required'
        ]
    }
} as const;

export type SmeDomain = keyof typeof SME_DOMAIN_FIELDS;