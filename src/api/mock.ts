import {
  AppSummary,
  EvidenceItem,
  RequirementsResponse,
  ReleaseItem,
  PortfolioKpis,
  ProfileResponse,
} from './types';

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

// Mock applications with install_type and architecture_type included.
export const apps: AppSummary[] = [
  {
    appId: 'CORR-12356',
    name: 'Correspondence',
    businessServiceName: 'Billing',
    criticality: 'A',
    install_type: '',
    architecture_type: 'Microservices',
    parentAppId: null,
  },
  {
    appId: 'DEVTOOLS',
    name: 'Dev Tools',
    businessServiceName: 'Engineering',
    criticality: 'C',
    install_type: '',
    architecture_type: 'Monolith',
    parentAppId: null,
  },
];

// Evidence per app
export const evidence: Record<string, EvidenceItem[]> = {
  'CORR-12356': [
    {
      evidenceId: 'ev_1',
      appId: 'CORR-12356',
      profileFieldKey: 'security.encryption_at_rest',
      type: 'link',
      uri: 'https://confluence/encryption.pdf',
      validFrom: '2025-08-01T00:00:00Z',
      validUntil: null,
      status: 'approved',
      submittedBy: 'po1',
    },
    {
      evidenceId: 'ev_2',
      appId: 'CORR-12356',
      profileFieldKey: 'data.retention_policy',
      type: 'assertion',
      uri: null,
      validFrom: '2025-08-10T00:00:00Z',
      validUntil: null,
      status: 'submitted',
      submittedBy: 'po1',
    },
  ],
  DEVTOOLS: [
    {
      evidenceId: 'ev_3',
      appId: 'DEVTOOLS',
      profileFieldKey: 'security.vuln_scan',
      type: 'link',
      uri: 'https://gitlab/vuln-scan',
      validFrom: '2025-06-01T00:00:00Z',
      validUntil: null,
      status: 'rejected',
      submittedBy: 'po2',
    },
  ],
};

export const requirements: Record<string, RequirementsResponse> = {
  'CORR-12356': {
    requirements: [
      { fieldKey: 'security.encryption_at_rest', label: 'Encryption-at-Rest', status: 'met' },
      { fieldKey: 'security.encryption_in_transit', label: 'TLS Everywhere', status: 'missing' },
      { fieldKey: 'data.retention_policy', label: 'Retention Policy', status: 'expiring' },
      { fieldKey: 'security.vuln_scan', label: 'Vulnerability Scan', status: 'rejected' },
    ],
  },
  DEVTOOLS: {
    requirements: [
      { fieldKey: 'security.vuln_scan', label: 'Vulnerability Scan', status: 'rejected' },
      { fieldKey: 'security.sast', label: 'Static Analysis', status: 'missing' },
    ],
  },
};

export const releases: ReleaseItem[] = [
  {
    releaseId: 'REL-001',
    windowStart: '2025-09-01T10:00:00Z',
    windowEnd: '2025-09-05T18:00:00Z',
    gateStatus: 'pending',
    missingCount: 2,
    expiringCount: 1,
  },
  {
    releaseId: 'REL-002',
    windowStart: '2025-11-15T10:00:00Z',
    windowEnd: null,
    gateStatus: 'pending',
    missingCount: 1,
    expiringCount: 0,
  },
];

export const mockApi = {
  listApps: async () => {
    await delay(150);
    return apps;
  },
  getApp: async (appId: string) => {
    await delay(100);
    return apps.find((a) => a.appId === appId)!;
  },
  getProfile: async (appId: string): Promise<ProfileResponse> => {
    await delay(120);
    return {
      appId,
      name: appId === 'CORR-12356' ? 'Database Cluster' : 'Dev Tools',
      updatedAt: '2025-08-22T18:14:59.530115Z',
      domains: [
        {
          domainKey: 'app_criticality',
          title: 'Summary',
          icon: 'SummaryIcon',
          driverLabel: 'app_criticality',
          driverValue: 'A',
          fields: [
            {
              fieldKey: 'materiality',
              label: 'Materiality',
              policyRequirement: 'crown_jewel',
              evidence: [],
              assurance: 'Missing',
              risks: []
            },
            {
              fieldKey: 'review_depth',
              label: 'Review Depth',
              policyRequirement: 'full_review',
              evidence: [],
              assurance: 'Missing',
              risks: []
            }
          ]
        },
        {
          domainKey: 'security_rating',
          title: 'Confidentiality / Security',
          icon: 'SecurityIcon',
          driverLabel: 'security_rating',
          driverValue: 'A2',
          fields: [
            {
              fieldKey: 'confidentiality_level',
              label: 'Confidentiality Level',
              policyRequirement: 'restricted',
              evidence: [],
              assurance: 'Missing',
              risks: []
            },
            {
              fieldKey: 'encryption_at_rest',
              label: 'Encryption at Rest',
              policyRequirement: 'required',
              evidence: [],
              assurance: 'Missing',
              risks: []
            }
          ]
        },
        {
          domainKey: 'integrity_rating',
          title: 'Integrity',
          icon: 'IntegrityIcon',
          driverLabel: 'integrity_rating',
          driverValue: 'B',
          fields: [
            {
              fieldKey: 'audit_logging',
              label: 'Audit Logging',
              policyRequirement: 'full_with_periodic_review',
              evidence: [],
              assurance: 'Missing',
              risks: []
            }
          ]
        },
        {
          domainKey: 'availability_rating',
          title: 'Availability',
          icon: 'AvailabilityIcon',
          driverLabel: 'availability_rating',
          driverValue: 'A',
          fields: [
            {
              fieldKey: 'rto_hours',
              label: 'RTO (hours)',
              policyRequirement: 1,
              evidence: [],
              assurance: 'Missing',
              risks: []
            }
          ]
        },
        {
          domainKey: 'resilience_rating',
          title: 'Resilience',
          icon: 'ResilienceIcon',
          driverLabel: 'resilience_rating',
          driverValue: '5',
          fields: [
            {
              fieldKey: 'backup_policy',
              label: 'Backup Policy',
              policyRequirement: 'standard_backups+periodic_restore_test',
              evidence: [],
              assurance: 'Missing',
              risks: []
            }
          ]
        }
      ]
    };
  },
  getEvidence: async (appId: string) => {
    await delay(150);
    return evidence[appId] || [];
  },
  createEvidence: async (appId: string, payload: any) => {
    await delay(150);
    const id = 'ev_' + Math.random().toString(16).slice(2);
    const item: EvidenceItem = { evidenceId: id, status: 'submitted', appId, ...payload };
    evidence[appId] = evidence[appId] || [];
    evidence[appId].push(item);
    return item;
  },
  getRequirements: async (appId: string, params?: Record<string, string>) => {
    await delay(150);
    return requirements[appId] || { requirements: [] };
  },
  getReleases: async (_appId: string) => {
    await delay(120);
    return releases;
  },
  getAllEvidence: async () => {
    await delay(150);
    return Object.values(evidence).flat();
  },
  getPortfolioKpis: async (): Promise<PortfolioKpis> => {
    await delay(120);
    const reqs = Object.values(requirements).flatMap((r) => r.requirements);
    const compliant = reqs.filter((r) => r.status === 'met').length;
    const missingEvidence = reqs.filter((r) => r.status === 'missing').length;
    const riskBlocked = reqs.filter((r) => r.status === 'rejected').length;
    const pendingReview = Object.values(evidence).flat().filter((e) => e.status === 'submitted').length;
    return { compliant, missingEvidence, pendingReview, riskBlocked };
  },
  // Mock createApp: adds a new AppSummary with default values.
  createApp: async (appId: string) => {
    await delay(100);
    const newApp: AppSummary = {
      appId,
      name: appId,
      businessServiceName: '',
      criticality: 'D',
      install_type: '',
      architecture_type: '',
      parentAppId: null,
    };
    apps.push(newApp);
    return newApp;
  },
};
