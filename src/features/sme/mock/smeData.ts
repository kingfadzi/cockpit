import type { SmeAssignment, SmeQueueItem, RiskItem } from '../config/domainMapping';

export const mockSmeAssignments: SmeAssignment[] = [
    {
        fieldKey: 'security_testing',
        appId: 'CORR-12356',
        appName: 'Customer Portal',
        fieldLabel: 'Security Testing',
        assignedSmeId: 'security_sme_1',
        assignedAt: '2025-08-28T10:00:00Z',
        dueDate: '2025-09-02T23:59:59Z',
        priority: 'urgent',
        status: 'pending',
        evidenceStatus: 'pending_approval',
        daysOverdue: 2
    },
    {
        fieldKey: 'encryption_at_rest',
        appId: 'PAY-7890',
        appName: 'Payment Gateway',
        fieldLabel: 'Encryption at Rest',
        assignedSmeId: 'security_sme_1',
        assignedAt: '2025-08-30T14:30:00Z',
        priority: 'urgent',
        status: 'in_review',
        evidenceStatus: 'pending_approval'
    },
    {
        fieldKey: 'mfa_enforcement',
        appId: 'AUTH-4567',
        appName: 'Authentication Service',
        fieldLabel: 'Multi-Factor Authentication',
        assignedSmeId: 'security_sme_1',
        assignedAt: '2025-08-29T09:15:00Z',
        priority: 'normal',
        status: 'pending',
        evidenceStatus: 'missing'
    }
];

export const mockSmeQueue: SmeQueueItem[] = [
    {
        appId: 'CORR-12356',
        appName: 'Customer Portal',
        fieldKey: 'secrets_management',
        fieldLabel: 'Secrets Management',
        evidenceStatus: 'expired',
        lastUpdated: '2025-07-15T10:00:00Z',
        priority: 'normal',
        issueCount: 1
    },
    {
        appId: 'API-9876',
        appName: 'Core API',
        fieldKey: 'waf_protection',
        fieldLabel: 'Web Application Firewall Evidence',
        evidenceStatus: 'missing',
        lastUpdated: '2025-08-25T16:20:00Z',
        priority: 'normal',
        issueCount: 2
    }
];

export const mockCrossDomainIssues: SmeQueueItem[] = [
    {
        appId: 'CORR-12356',
        appName: 'Customer Portal',
        fieldKey: 'backup_policy',
        fieldLabel: 'Backup Policy',
        evidenceStatus: 'expired',
        lastUpdated: '2025-06-10T10:00:00Z',
        priority: 'low',
        issueCount: 1
    },
    {
        appId: 'PAY-7890',
        appName: 'Payment Gateway',
        fieldKey: 'product_roadmap',
        fieldLabel: 'Product Roadmap',
        evidenceStatus: 'missing',
        lastUpdated: '2025-08-20T12:00:00Z',
        priority: 'low',
        issueCount: 1
    }
];

export const mockRisks: RiskItem[] = [
    {
        riskId: 'risk_1',
        title: 'MFA not implemented',
        severity: 'High',
        status: 'Open',
        appId: 'AUTH-4567',
        appName: 'Authentication Service',
        fieldKey: 'mfa_enforcement',
        createdBy: 'security_sme_1',
        createdAt: '2025-08-25T11:30:00Z'
    },
    {
        riskId: 'risk_2', 
        title: 'Outdated encryption standards',
        severity: 'Medium',
        status: 'Open',
        appId: 'LEGACY-001',
        appName: 'Legacy System',
        fieldKey: 'encryption_at_rest',
        createdBy: 'security_sme_1',
        createdAt: '2025-08-20T14:15:00Z'
    }
];