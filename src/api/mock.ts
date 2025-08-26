import {
  AppSummary,
  EvidenceItem,
  RequirementsResponse,
  ReleaseItem,
  PortfolioKpis,
  ProfileResponse,
  AppKpis,
} from './types';

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

// Mock applications with install_type and architecture_type included.
export const apps: AppSummary[] = [
  {
    appId: 'CORR-12356',
    name: 'Payment Processing',
    businessServiceName: 'Payment Processing',
    criticality: 'B',
    install_type: 'Cloud',
    architecture_type: 'Microservices',
    // Business fields matching API response
    scope: 'application',
    transactionCycle: 'Sales',
    applicationType: 'Web',
    applicationTier: 'Business Application',
    housePosition: 'Primary',
    operationalStatus: 'Active',
    onboardingStatus: 'pending',
    businessApplicationSysId: 'SYS-0001',
    transactionCycleId: 'TC-001',
    // Ratings (some missing to test fallback behavior)
    integrityRating: 'A',
    availabilityRating: 'A',
    resilienceRating: null, // Test missing rating
    securityRating: 'B', // Now mapped from API
    confidentialityRating: 'A', // Now available in API
    // Timestamps
    createdAt: '2025-08-24T01:10:56.367794Z',
    updatedAt: '2025-08-24T01:10:56.391521Z',
    // Hierarchy
    hasChildren: true,
    parentAppId: 'PLATFORM-CORE',
    parentAppName: 'Banking Platform Core',
  },
  {
    appId: 'DEVTOOLS',
    name: 'Dev Tools',
    businessServiceName: 'Engineering',
    criticality: 'C',
    install_type: 'On-Premise',
    architecture_type: 'Monolith',
    // Business fields
    scope: 'application',
    transactionCycle: 'Development',
    applicationType: 'Desktop',
    applicationTier: 'Support Application',
    housePosition: 'Secondary',
    operationalStatus: 'Active',
    onboardingStatus: 'completed',
    businessApplicationSysId: 'SYS-0002',
    transactionCycleId: 'TC-002',
    // Ratings
    integrityRating: 'B',
    availabilityRating: 'B',
    resilienceRating: '2',
    securityRating: 'C',
    confidentialityRating: 'B',
    // Timestamps
    createdAt: '2025-08-20T01:10:56.367794Z',
    updatedAt: '2025-08-22T01:10:56.391521Z',
    // Hierarchy
    hasChildren: false,
    parentAppId: null,
    parentAppName: null,
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
      version: 6,
      updatedAt: '2025-08-25T15:01:09.153089Z',
      domains: [
        {
          domainKey: 'artifact',
          title: 'Artefacts',
          icon: 'DefaultIcon',
          driverLabel: 'artifact',
          fields: [
            {
              fieldKey: 'architecture_vision',
              label: 'Architecture Vision',
              policyRequirement: {
                ttl: '0d',
                label: 'Required',
                value: 'required',
                refresh: 'per_release'
              },
              evidence: [],
              assurance: 'Missing',
              risks: []
            },
            {
              fieldKey: 'product_roadmap',
              label: 'Product Roadmap',
              policyRequirement: {
                ttl: '0d',
                label: 'Required',
                value: 'required',
                refresh: 'per_release'
              },
              evidence: [],
              assurance: 'Missing',
              risks: []
            },
            {
              fieldKey: 'product_vision',
              label: 'Product Vision',
              policyRequirement: {
                ttl: '0d',
                label: 'Required',
                value: 'required',
                refresh: 'per_release'
              },
              evidence: [],
              assurance: 'Missing',
              risks: []
            },
            {
              fieldKey: 'security_vision',
              label: 'Security Vision',
              policyRequirement: {
                ttl: '0d',
                label: 'Required',
                value: 'required',
                refresh: 'per_release'
              },
              evidence: [],
              assurance: 'Missing',
              risks: []
            },
            {
              fieldKey: 'service_vision',
              label: 'Service Vision',
              policyRequirement: {
                ttl: '0d',
                label: 'Required',
                value: 'required',
                refresh: 'per_release'
              },
              evidence: [],
              assurance: 'Missing',
              risks: []
            },
            {
              fieldKey: 'test_vision',
              label: 'Test Vision',
              policyRequirement: {
                ttl: '0d',
                label: 'Required',
                value: 'required',
                refresh: 'per_release'
              },
              evidence: [],
              assurance: 'Missing',
              risks: []
            }
          ]
        },
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
              policyRequirement: {
                ttl: '365d',
                label: 'High',
                value: 'high',
                refresh: 'on_expiry'
              },
              evidence: [],
              assurance: 'Missing',
              risks: []
            },
            {
              fieldKey: 'review_depth',
              label: 'Review Depth',
              policyRequirement: {
                ttl: '365d',
                label: 'Scoped review',
                value: 'scoped_review',
                refresh: 'on_expiry'
              },
              evidence: [],
              assurance: 'Missing',
              risks: []
            }
          ]
        },
        {
          domainKey: 'confidentiality_rating',
          title: 'Confidentiality',
          icon: 'SecurityIcon',
          driverLabel: 'confidentiality_rating',
          driverValue: 'A',
          fields: [
            {
              fieldKey: 'confidentiality_level',
              label: 'Confidentiality Level',
              policyRequirement: {
                ttl: '0d',
                label: 'Restricted',
                value: 'restricted',
                refresh: 'per_release'
              },
              evidence: [],
              assurance: 'Missing',
              risks: []
            }
          ]
        },
        {
          domainKey: 'security_rating',
          title: 'Security',
          icon: 'SecurityIcon',
          driverLabel: 'security_rating',
          driverValue: 'A2',
          fields: [
            {
              fieldKey: 'encryption_at_rest',
              label: 'Encryption at Rest',
              policyRequirement: {
                ttl: '0d',
                label: 'Required',
                value: 'required',
                refresh: 'per_release'
              },
              evidence: [],
              assurance: 'Missing',
              risks: []
            },
            {
              fieldKey: 'encryption_in_transit',
              label: 'Encryption in Transit',
              policyRequirement: {
                ttl: '0d',
                label: 'Required',
                value: 'required',
                refresh: 'per_release'
              },
              evidence: [],
              assurance: 'Missing',
              risks: []
            },
            {
              fieldKey: 'key_rotation_max',
              label: 'Key Rotation Max',
              policyRequirement: {
                ttl: '0d',
                label: '180 days',
                value: '180d',
                refresh: 'per_release'
              },
              evidence: [],
              assurance: 'Missing',
              risks: []
            },
            {
              fieldKey: 'secrets_management',
              label: 'Secrets Management',
              policyRequirement: {
                ttl: '0d',
                label: 'Centralized required',
                value: 'centralized_required',
                refresh: 'per_release'
              },
              evidence: [],
              assurance: 'Missing',
              risks: []
            },
            {
              fieldKey: 'security_testing',
              label: 'Security Testing',
              policyRequirement: {
                ttl: '0d',
                label: 'Internal pentest annual + continuous scans',
                value: 'internal_pentest_annual+continuous_scans',
                refresh: 'per_release'
              },
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
              policyRequirement: {
                ttl: '90d',
                label: 'Full with periodic review',
                value: 'full_with_periodic_review',
                refresh: 'on_expiry'
              },
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
              policyRequirement: {
                ttl: '0d',
                label: '1 hour',
                value: 1,
                refresh: 'per_release'
              },
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
              policyRequirement: {
                ttl: '90d',
                label: 'Encrypted + tested restores',
                value: 'encrypted+tested_restores',
                refresh: 'on_expiry'
              },
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
    // Return fixed numbers for demo - ensures UI displays work correctly
    return { 
      compliant: 25, 
      missingEvidence: 8, 
      pendingReview: 3, 
      riskBlocked: 2 
    };
  },
  getAppKpis: async (appId: string): Promise<AppKpis> => {
    await delay(120);
    // Calculate KPIs based on app ID for demo purposes
    const baseKpis = appId === 'CORR-12356' ? {
      compliant: 0,
      missingEvidence: 23,
      pendingReview: 0,
      riskBlocked: 0
    } : {
      compliant: 5,
      missingEvidence: 15,
      pendingReview: 1,
      riskBlocked: 4
    };
    return baseKpis;
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
