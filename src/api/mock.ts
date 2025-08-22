import { AppSummary, EvidenceItem, RequirementsResponse, ReleaseItem, PortfolioKpis } from './types';

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const apps: AppSummary[] = [
  { appId: 'CORR-12356', name: 'Correspondence', businessServiceName: 'Billing', criticality: 'B', parentAppId: null },
  { appId: 'DEVTOOLS', name: 'Dev Tools', businessServiceName: 'Engineering', criticality: 'C', parentAppId: null },
];

export const evidence: Record<string, EvidenceItem[]> = {
  'CORR-12356': [
    { evidenceId: 'ev_1', appId: 'CORR-12356', profileFieldKey: 'security.encryption_at_rest', type: 'link', uri: 'https://confluence/encryption.pdf', validFrom: '2025-08-01T00:00:00Z', validUntil: null, status: 'approved', submittedBy: 'po1' },
    { evidenceId: 'ev_2', appId: 'CORR-12356', profileFieldKey: 'data.retention_policy', type: 'assertion', uri: null, validFrom: '2025-08-10T00:00:00Z', validUntil: null, status: 'submitted', submittedBy: 'po1' },
  ],
  'DEVTOOLS': [
    { evidenceId: 'ev_3', appId: 'DEVTOOLS', profileFieldKey: 'security.vuln_scan', type: 'link', uri: 'https://gitlab/vuln-scan', validFrom: '2025-06-01T00:00:00Z', validUntil: null, status: 'rejected', submittedBy: 'po2' },
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
  'DEVTOOLS': {
    requirements: [
      { fieldKey: 'security.vuln_scan', label: 'Vulnerability Scan', status: 'rejected' },
      { fieldKey: 'security.sast', label: 'Static Analysis', status: 'missing' },
    ],
  }
};

export const releases: ReleaseItem[] = [
  { releaseId: 'REL-001', windowStart: '2025-09-01T10:00:00Z', windowEnd: '2025-09-05T18:00:00Z', gateStatus: 'pending', missingCount: 2, expiringCount: 1 },
  { releaseId: 'REL-002', windowStart: '2025-11-15T10:00:00Z', windowEnd: null, gateStatus: 'pending', missingCount: 1, expiringCount: 0 },
];

export const mockApi = {
  listApps: async () => { await delay(150); return apps; },
  getApp: async (appId: string) => { await delay(100); return apps.find(a => a.appId === appId)!; },
  getProfile: async (appId: string) => {
    await delay(120);
    return {
      appId,
      businessServiceName: 'Billing',
      parentAppId: null,
      childApps: [],
      serviceInstances: [{ env: 'prod', name: 'corr-prod-01' }],
      repos: [{ name: 'corr-service', url: 'https://gitlab/corr' }],
      externalRefs: [{ system: 'Jira', key: 'CORR' }],
      stakeholders: [{ id: 'u1', role: 'Product Owner', name: 'Alice' }],
    };
  },
  getEvidence: async (appId: string) => { await delay(150); return evidence[appId] || []; },
  createEvidence: async (appId: string, payload: any) => {
    await delay(150);
    const id = 'ev_' + Math.random().toString(16).slice(2);
    const item: EvidenceItem = { evidenceId: id, status: 'submitted', appId, ...payload };
    evidence[appId] = evidence[appId] || [];
    evidence[appId].push(item);
    return item;
  },
  getRequirements: async (appId: string, _params?: Record<string,string>) => {
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
    // compute across all apps
    const reqs = Object.values(requirements).flatMap(r => r.requirements);
    const compliant = reqs.filter(r => r.status == 'met').length;
    const missingEvidence = reqs.filter(r => r.status == 'missing').length;
    const riskBlocked = reqs.filter(r => r.status == 'rejected').length;
    const pendingReview = Object.values(evidence).flat().filter(e => e.status == 'submitted').length;
    return { compliant, missingEvidence, pendingReview, riskBlocked };
  }
};
