import {
  AppSummary,
  EvidenceItem,
  RequirementsResponse,
  ReleaseItem,
  PortfolioKpis,
  ProfileResponse,
  AppKpis,
} from './types';
import { realApps, realAppKpis, realProfiles, realPortfolioKpis } from './realMockData';

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
    appId: 'APM100001',
    name: 'lunar-anchor-241',
    businessServiceName: 'Service-567',
    criticality: 'A',
    install_type: 'Cloud',
    architecture_type: 'SOA',
    // Business fields matching real API response
    scope: 'application component',
    transactionCycle: 'Trading',
    applicationType: 'application component',
    applicationTier: 'Database',
    housePosition: 'cease',
    operationalStatus: 'Decommissioned',
    onboardingStatus: 'pending',
    businessApplicationSysId: null,
    transactionCycleId: null,
    // Real ratings from backend
    integrityRating: 'C',
    availabilityRating: 'B',
    resilienceRating: '1',
    securityRating: 'C',
    confidentialityRating: 'B',
    // Timestamps
    createdAt: '2025-09-02T22:51:43.810841Z',
    updatedAt: '2025-09-02T22:51:43.800984Z',
    // Hierarchy
    hasChildren: false,
    parentAppId: 'APM100002',
    parentAppName: null,
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

// Base field definitions for all apps
const BASE_DOMAINS = {
  resilience_rating: {
    domainKey: 'resilience_rating',
    title: 'Resilience',
    icon: 'ResilienceIcon',
    driverLabel: 'resilience_rating',
    fields: [
      { fieldKey: 'backup_policy', label: 'Backup Policy', ttl: '90d', policyLabel: 'Encrypted + tested restores', policyValue: 'encrypted+tested_restores', hasRisk: true },
      { fieldKey: 'chaos_testing', label: 'Chaos Testing', ttl: '180d', policyLabel: 'Recommended', policyValue: 'recommended', hasRisk: true },
      { fieldKey: 'dr_test_frequency', label: 'DR Test Frequency', ttl: '365d', policyLabel: 'Annual live', policyValue: 'annual_live', hasRisk: true },
      { fieldKey: 'failover_automation', label: 'Failover Automation', ttl: '90d', policyLabel: 'Semi-automatic', policyValue: 'semi_automatic', hasRisk: true },
      { fieldKey: 'ir_exercise', label: 'Incident Response Exercise', ttl: '365d', policyLabel: 'Tabletop', policyValue: 'tabletop', hasRisk: true },
      { fieldKey: 'ir_plan', label: 'Incident Response Plan', ttl: '365d', policyLabel: 'Tested annually', policyValue: 'tested_annually', hasRisk: true },
      { fieldKey: 'runbook_maturity', label: 'Runbook Maturity', ttl: '90d', policyLabel: 'Approved', policyValue: 'approved', hasRisk: true }
    ]
  },
  security_rating: {
    domainKey: 'security_rating',
    title: 'Security',
    icon: 'SecurityIcon',
    driverLabel: 'security_rating',
    fields: [
      { fieldKey: 'dependency_management', label: 'Dependency / SBOM Management', ttl: '365d', policyLabel: 'Optional', policyValue: 'optional', hasRisk: false },
      { fieldKey: 'encryption_at_rest', label: 'Encryption at Rest', ttl: '365d', policyLabel: 'Optional', policyValue: 'optional', hasRisk: false },
      { fieldKey: 'encryption_in_transit', label: 'Encryption in Transit', ttl: '365d', policyLabel: 'Recommended', policyValue: 'recommended', hasRisk: false },
      { fieldKey: 'key_rotation_max', label: 'Key Rotation Max', ttl: '365d', policyLabel: 'Rotate ≤ 365 days', policyValue: '365d', hasRisk: false },
      { fieldKey: 'mfa_enforcement', label: 'Multi-Factor Authentication', ttl: '365d', policyLabel: 'Optional', policyValue: 'optional', hasRisk: false },
      { fieldKey: 'network_segmentation', label: 'Network Segmentation Evidence', ttl: '365d', policyLabel: 'Recommended', policyValue: 'recommended', hasRisk: false },
      { fieldKey: 'patching_sla', label: 'Patch Remediation SLA', ttl: '365d', policyLabel: 'Best effort', policyValue: 'best_effort', hasRisk: false },
      { fieldKey: 'privileged_access_mgmt', label: 'Privileged Access Management', ttl: '365d', policyLabel: 'Manual OK', policyValue: 'manual_ok', hasRisk: false },
      { fieldKey: 'secrets_management', label: 'Secrets Management', ttl: '365d', policyLabel: 'Centralized (recommended)', policyValue: 'centralized_recommended', hasRisk: false },
      { fieldKey: 'security_testing', label: 'Security Testing', ttl: '180d', policyLabel: 'SAST on release', policyValue: 'sast_on_release', hasRisk: false },
      { fieldKey: 'siem_integration', label: 'SIEM / Central Log Integration', ttl: '365d', policyLabel: 'Recommended', policyValue: 'recommended', hasRisk: false },
      { fieldKey: 'waf_protection', label: 'Web Application Firewall Evidence', ttl: '180d', policyLabel: 'Recommended', policyValue: 'recommended', hasRisk: false }
    ]
  },
  app_criticality_assessment: {
    domainKey: 'app_criticality_assessment',
    title: 'Summary',
    icon: 'SummaryIcon',
    driverLabel: 'app_criticality_assessment',
    fields: [
      { fieldKey: 'architecture_vision', label: 'Architecture Vision', ttl: '90d', policyLabel: 'Mandatory', policyValue: 'mandatory', hasRisk: true },
      { fieldKey: 'product_roadmap', label: 'Product Roadmap', ttl: '90d', policyLabel: 'Mandatory', policyValue: 'mandatory', hasRisk: true },
      { fieldKey: 'product_vision', label: 'Product Vision', ttl: '90d', policyLabel: 'Mandatory', policyValue: 'mandatory', hasRisk: true },
      { fieldKey: 'security_vision', label: 'Security Vision', ttl: '90d', policyLabel: 'Mandatory', policyValue: 'mandatory', hasRisk: true },
      { fieldKey: 'service_vision', label: 'Service Vision', ttl: '90d', policyLabel: 'Mandatory', policyValue: 'mandatory', hasRisk: true },
      { fieldKey: 'test_vision', label: 'Test Vision', ttl: '90d', policyLabel: 'Mandatory', policyValue: 'mandatory', hasRisk: true }
    ]
  },
  integrity_rating: {
    domainKey: 'integrity_rating',
    title: 'Integrity',
    icon: 'IntegrityIcon',
    driverLabel: 'integrity_rating',
    fields: [
      { fieldKey: 'audit_logging', label: 'Audit Logging', ttl: '180d', policyLabel: 'Logging enabled + sampled review', policyValue: 'logging_enabled+sampled_review', hasRisk: false },
      { fieldKey: 'change_control', label: 'Change Control', ttl: '90d', policyLabel: 'Peer review + unit tests', policyValue: 'peer_review+unit_tests', hasRisk: false },
      { fieldKey: 'data_validation', label: 'Data Validation', ttl: '180d', policyLabel: 'Standard validation', policyValue: 'standard_validation', hasRisk: false },
      { fieldKey: 'immutability_required', label: 'Immutability Required', ttl: '180d', policyLabel: 'No', policyValue: false, hasRisk: false },
      { fieldKey: 'log_retention', label: 'Log Retention Period', ttl: '365d', policyLabel: '≥ 90 days', policyValue: '>=90d', hasRisk: false },
      { fieldKey: 'reconciliation_frequency', label: 'Reconciliation Frequency', ttl: '180d', policyLabel: 'Per release', policyValue: 'per_release', hasRisk: false }
    ]
  },
  availability_rating: {
    domainKey: 'availability_rating',
    title: 'Availability',
    icon: 'AvailabilityIcon',
    driverLabel: 'availability_rating',
    fields: [
      { fieldKey: 'ha_topology', label: 'HA Topology', ttl: '90d', policyLabel: 'Active-Passive', policyValue: 'active_passive', hasRisk: true },
      { fieldKey: 'monitoring_slos', label: 'Monitoring SLOs', ttl: '90d', policyLabel: '≥99.5% with alerting', policyValue: '99.5_with_alerting', hasRisk: true },
      { fieldKey: 'oncall_coverage', label: 'On-call Coverage', ttl: '90d', policyLabel: '16×5', policyValue: '16x5', hasRisk: true },
      { fieldKey: 'rpo_minutes', label: 'RPO (minutes)', ttl: '90d', policyLabel: '≤ 60 minutes', policyValue: 60, hasRisk: true },
      { fieldKey: 'rto_hours', label: 'RTO (hours)', ttl: '90d', policyLabel: '≤ 4 hours', policyValue: 4, hasRisk: true }
    ]
  },
  confidentiality_rating: {
    domainKey: 'confidentiality_rating',
    title: 'Confidentiality',
    icon: 'DefaultIcon',
    driverLabel: 'confidentiality_rating',
    fields: [
      { fieldKey: 'access_review', label: 'Access Review Cadence', ttl: '180d', policyLabel: 'Semi-annual', policyValue: 'semi_annual', hasRisk: true },
      { fieldKey: 'confidentiality_level', label: 'Confidentiality Level', ttl: '90d', policyLabel: 'Confidential', policyValue: 'confidential', hasRisk: true },
      { fieldKey: 'data_deletion_evidence', label: 'Secure Data Deletion Evidence', ttl: '365d', policyLabel: 'Required', policyValue: 'required', hasRisk: true },
      { fieldKey: 'data_residency_control', label: 'Data Residency Control', ttl: '90d', policyLabel: 'Preferred in-region', policyValue: 'preferred_in_region', hasRisk: true },
      { fieldKey: 'data_retention_policy', label: 'Data Retention Policy', ttl: '365d', policyLabel: 'Defined', policyValue: 'defined', hasRisk: true },
      { fieldKey: 'de_identification', label: 'De-Identification', ttl: '90d', policyLabel: 'Required', policyValue: 'required', hasRisk: true },
      { fieldKey: 'tpsp_attestation', label: 'Third-Party Service Provider Attestation', ttl: '365d', policyLabel: 'Required', policyValue: 'required', hasRisk: true }
    ]
  }
};

// Helper function to generate profile data based on risk profile
const generateProfileForApp = (appId: string) => {
  const appProfiles = {
    'CORR-12356': { name: 'Payment Processing', driverValues: { resilience_rating: '3', security_rating: 'A', app_criticality_assessment: 'B', integrity_rating: 'A', availability_rating: 'A', confidentiality_rating: 'A' } },
    'APM100001': { name: 'lunar-anchor-241', driverValues: { resilience_rating: '1', security_rating: 'C', app_criticality_assessment: 'A', integrity_rating: 'C', availability_rating: 'B', confidentiality_rating: 'B' } },
    'DEVTOOLS': { name: 'Dev Tools', driverValues: { resilience_rating: '2', security_rating: 'C', app_criticality_assessment: 'C', integrity_rating: 'B', availability_rating: 'B', confidentiality_rating: 'B' } }
  };

  const appData = appProfiles[appId as keyof typeof appProfiles];
  if (!appData) return null;

  const domains = Object.entries(BASE_DOMAINS).map(([domainKey, domainDef]) => {
    const driverValue = appData.driverValues[domainKey as keyof typeof appData.driverValues];
    
    // Determine bulk attestation eligibility based on domain and rating
    const bulkAttestationEnabled = (() => {
      if (!driverValue) return true;
      
      switch (domainKey) {
        case 'app_criticality_assessment':
          return driverValue !== 'A';
        case 'security_rating':
          return !['A1', 'A2', 'B'].includes(driverValue);
        case 'resilience_rating':
          return !['0', '1'].includes(driverValue);
        default:
          return true;
      }
    })();
    
    return {
      ...domainDef,
      driverValue,
      bulkAttestationEnabled,
      fields: domainDef.fields.map((baseField, index) => {
      const profileFieldId = appId === 'APM100001' ? 
        // Use real IDs for APM100001
        (baseField.fieldKey === 'backup_policy' ? 'pf_1fb7289f29892c53b0be97bbb0e88db3' :
         baseField.fieldKey === 'encryption_at_rest' ? 'pf_05d0df4f63476bb20927a3a7bb4ec17e' :
         baseField.fieldKey === 'architecture_vision' ? 'pf_ee1955014407d26303463a94c7dc0211' :
         `pf_${baseField.fieldKey}_apm`) :
        `pf_${baseField.fieldKey}_${appId.toLowerCase()}`;

      const evidenceId = appId === 'APM100001' ? 
        (baseField.fieldKey === 'backup_policy' ? 'ev_6dcd5b3ea63c469c9481da31d0013095' :
         `ev_${baseField.fieldKey}_apm`) :
        `ev_${baseField.fieldKey}_${appId.toLowerCase()}`;

      // Risk logic based on domain rating: A1, A2, A, B, 1, 2 = risks; C, D, 3, 4+ = attestations
      const domainRating = appData.driverValues[domainKey as keyof typeof appData.driverValues];
      const shouldHaveRisk = ['A1', 'A2', 'A', 'B', '1', '2'].includes(domainRating);
      
      // App compliance profiles
      let approvalStatus: 'approved' | 'pending';
      let hasRisk: boolean;
      let hasAttestation: boolean;

      if (appId === 'CORR-12356') {
        // Good profile: mostly approved, few pending
        approvalStatus = index % 5 === 0 ? 'pending' : 'approved';
        hasRisk = shouldHaveRisk && approvalStatus === 'pending';
        hasAttestation = !hasRisk;
      } else if (appId === 'APM100001') {
        // Critical profile: all pending
        approvalStatus = 'pending';
        hasRisk = shouldHaveRisk;
        hasAttestation = !shouldHaveRisk;
      } else {
        // Mixed profile: some approved, some pending
        approvalStatus = index % 3 === 0 ? 'approved' : 'pending';
        hasRisk = shouldHaveRisk && approvalStatus === 'pending';
        hasAttestation = !hasRisk;
      }

      return {
        fieldKey: baseField.fieldKey,
        profileFieldId,
        label: baseField.label,
        policyRequirement: {
          ttl: baseField.ttl,
          label: baseField.policyLabel,
          value: baseField.policyValue
        },
        evidence: [{
          evidence_id: evidenceId,
          status: 'active',
          valid_until: '2026-09-02T22:51:44Z'
        }],
        approvalStatus,
        freshnessStatus: 'current',
        risks: hasRisk ? [{
          risk_id: `risk_${baseField.fieldKey}_${appId}`,
          title: `Auto-created risk for ${baseField.fieldKey} field`,
          severity: 'medium',
          status: 'PENDING_SME_REVIEW'
        }] : [],
        attestations: hasAttestation ? [{
          evidenceId,
          documentTitle: `${baseField.fieldKey} Evidence`,
          documentSourceType: 'gitlab',
          linkedAt: '2025-09-02T22:51:48Z',
          submittedBy: 'security_analyst_001'
        }] : []
      };
    })
    }
  });

  return {
    appId,
    name: appData.name,
    version: 1,
    updatedAt: '2025-09-02T22:51:43.800984Z',
    domains
  };
};

export const mockApi = {
  listApps: async () => {
    await delay(150);
    return realApps.map(app => ({
      appId: app.appId,
      name: app.name,
      businessServiceName: app.businessServiceName,
      criticality: app.appCriticalityAssessment as 'A' | 'B' | 'C' | 'D',
      install_type: app.installType,
      architecture_type: app.architectureType,
      scope: app.scope,
      transactionCycle: app.transactionCycle,
      applicationType: app.applicationType,
      applicationTier: app.applicationTier,
      housePosition: app.housePosition,
      operationalStatus: app.operationalStatus,
      onboardingStatus: app.onboardingStatus,
      businessApplicationSysId: app.businessApplicationSysId,
      transactionCycleId: app.transactionCycleId,
      integrityRating: app.integrityRating,
      availabilityRating: app.availabilityRating,
      resilienceRating: app.resilienceRating,
      securityRating: app.securityRating,
      confidentialityRating: app.confidentialityRating,
      createdAt: app.createdAt,
      updatedAt: app.updatedAt,
      hasChildren: false,
      parentAppId: app.parentAppId,
      parentAppName: app.parentAppName,
    }));
  },
  getApp: async (appId: string) => {
    await delay(100);
    const app = realApps.find((a) => a.appId === appId);
    if (!app) throw new Error(`App ${appId} not found`);
    return {
      appId: app.appId,
      name: app.name,
      businessServiceName: app.businessServiceName,
      criticality: app.appCriticalityAssessment as 'A' | 'B' | 'C' | 'D',
      install_type: app.installType,
      architecture_type: app.architectureType,
      scope: app.scope,
      transactionCycle: app.transactionCycle,
      applicationType: app.applicationType,
      applicationTier: app.applicationTier,
      housePosition: app.housePosition,
      operationalStatus: app.operationalStatus,
      onboardingStatus: app.onboardingStatus,
      businessApplicationSysId: app.businessApplicationSysId,
      transactionCycleId: app.transactionCycleId,
      integrityRating: app.integrityRating,
      availabilityRating: app.availabilityRating,
      resilienceRating: app.resilienceRating,
      securityRating: app.securityRating,
      confidentialityRating: app.confidentialityRating,
      createdAt: app.createdAt,
      updatedAt: app.updatedAt,
      hasChildren: false,
      parentAppId: app.parentAppId,
      parentAppName: app.parentAppName,
    };
  },
  getProfile: async (appId: string): Promise<ProfileResponse> => {
    await delay(120);
    
    // Use real profile data first
    const realProfile = realProfiles[appId];
    if (realProfile) {
      return realProfile;
    }
    
    // Fallback to generated profile
    const profile = generateProfileForApp(appId);
    if (profile) {
      return profile;
    }
    
    // Fallback for APM100001 if generator fails
    if (appId === 'APM100001') {
      return {
        appId: 'APM100001',
        name: 'lunar-anchor-241',
        version: 1,
        updatedAt: '2025-09-02T22:51:43.800984Z',
        domains: [
          {
            domainKey: 'resilience_rating',
            title: 'Resilience',
            icon: 'ResilienceIcon',
            driverLabel: 'resilience_rating',
            driverValue: '1',
            fields: [
              {
                fieldKey: 'backup_policy',
                profileFieldId: 'pf_1fb7289f29892c53b0be97bbb0e88db3',
                label: 'Backup Policy',
                policyRequirement: { ttl: '90d', label: 'Encrypted + tested restores', value: 'encrypted+tested_restores' },
                evidence: [{ evidence_id: 'ev_6dcd5b3ea63c469c9481da31d0013095', status: 'active', valid_until: '2026-09-02T22:51:44Z' }],
                approvalStatus: 'pending',
                freshnessStatus: 'current',
                risks: [{ risk_id: 'risk_3756c336-7f98-42d0-afa5-57404dc226c0', title: 'Auto-created risk for backup_policy field', severity: 'medium', status: 'PENDING_SME_REVIEW' }],
                attestations: []
              },
              {
                fieldKey: 'chaos_testing',
                profileFieldId: 'pf_26f1de8495605593ef17be1001a6ab04',
                label: 'Chaos Testing',
                policyRequirement: { ttl: '180d', label: 'Recommended', value: 'recommended' },
                evidence: [{ evidence_id: 'ev_b06354dcc0a44a78a824b81af73a0394', status: 'active', valid_until: '2026-09-02T22:51:44Z' }],
                approvalStatus: 'pending',
                freshnessStatus: 'current',
                risks: [{ risk_id: 'risk_fcccd23a-e2fa-49be-be13-a392242045bb', title: 'Auto-created risk for chaos_testing field', severity: 'medium', status: 'PENDING_SME_REVIEW' }],
                attestations: []
              },
              {
                fieldKey: 'dr_test_frequency',
                profileFieldId: 'pf_638e145f02ccf9d2b27b11471481d4cf',
                label: 'DR Test Frequency',
                policyRequirement: { ttl: '365d', label: 'Annual live', value: 'annual_live' },
                evidence: [{ evidence_id: 'ev_b9cc113cb3244dc1a227627b29ab479d', status: 'active', valid_until: '2026-09-02T22:51:44Z' }],
                approvalStatus: 'pending',
                freshnessStatus: 'current',
                risks: [{ risk_id: 'risk_d7f995c2-5073-4fb3-93a6-195109e207d5', title: 'Auto-created risk for dr_test_frequency field', severity: 'medium', status: 'PENDING_SME_REVIEW' }],
                attestations: []
              },
              {
                fieldKey: 'failover_automation',
                profileFieldId: 'pf_4a191a247db4b618433a999650072f37',
                label: 'Failover Automation',
                policyRequirement: { ttl: '90d', label: 'Semi-automatic', value: 'semi_automatic' },
                evidence: [{ evidence_id: 'ev_c8a049851ed6479d8e43b0e6c752554d', status: 'active', valid_until: '2026-09-02T22:51:44Z' }],
                approvalStatus: 'pending',
                freshnessStatus: 'current',
                risks: [{ risk_id: 'risk_53d21c38-3da0-4563-9465-445c34dc17cf', title: 'Auto-created risk for failover_automation field', severity: 'medium', status: 'PENDING_SME_REVIEW' }],
                attestations: []
              },
              {
                fieldKey: 'ir_exercise',
                profileFieldId: 'pf_68fe8dfd0d5940644bb9cebe051ac26a',
                label: 'Incident Response Exercise',
                policyRequirement: { ttl: '365d', label: 'Tabletop', value: 'tabletop' },
                evidence: [{ evidence_id: 'ev_47f1e39ed5c2413197e423bb24404eac', status: 'active', valid_until: '2026-09-02T22:51:44Z' }],
                approvalStatus: 'pending',
                freshnessStatus: 'current',
                risks: [{ risk_id: 'risk_b8a68834-841a-49c4-a28b-890252608e6b', title: 'Auto-created risk for ir_exercise field', severity: 'medium', status: 'PENDING_SME_REVIEW' }],
                attestations: []
              },
              {
                fieldKey: 'ir_plan',
                profileFieldId: 'pf_4ad83ea4af706d56b664b6dc8efa0cc1',
                label: 'Incident Response Plan',
                policyRequirement: { ttl: '365d', label: 'Tested annually', value: 'tested_annually' },
                evidence: [{ evidence_id: 'ev_eb570a8170d742f293b63f7eef89260c', status: 'active', valid_until: '2026-09-02T22:51:44Z' }],
                approvalStatus: 'pending',
                freshnessStatus: 'current',
                risks: [{ risk_id: 'risk_88ed0fa4-45c0-4459-8cd7-3bfe706c6fc0', title: 'Auto-created risk for ir_plan field', severity: 'medium', status: 'PENDING_SME_REVIEW' }],
                attestations: []
              },
              {
                fieldKey: 'runbook_maturity',
                profileFieldId: 'pf_b3bb57d8bfa429c6a013ab628803e40b',
                label: 'Runbook Maturity',
                policyRequirement: { ttl: '90d', label: 'Approved', value: 'approved' },
                evidence: [{ evidence_id: 'ev_d47a06d997514742bbfad119bc125d5a', status: 'active', valid_until: '2026-09-02T22:51:44Z' }],
                approvalStatus: 'pending',
                freshnessStatus: 'current',
                risks: [{ risk_id: 'risk_2ed3a1a4-5cba-4844-9cc9-c76fbdb261ba', title: 'Auto-created risk for runbook_maturity field', severity: 'medium', status: 'PENDING_SME_REVIEW' }],
                attestations: []
              }
            ]
          },
          {
            domainKey: 'security_rating',
            title: 'Security',
            icon: 'SecurityIcon',
            driverLabel: 'security_rating',
            driverValue: 'C',
            fields: [
              {
                fieldKey: 'dependency_management',
                profileFieldId: 'pf_c6a78e2f9e3a17cbb2866c868db0552a',
                label: 'Dependency / SBOM Management',
                policyRequirement: { ttl: '365d', label: 'Optional', value: 'optional' },
                evidence: [{ evidence_id: 'ev_8dfc75f2a1ba4f6d9fa1c52f2653f581', status: 'active', valid_until: '2026-09-02T22:51:44Z' }],
                approvalStatus: 'pending',
                freshnessStatus: 'current',
                risks: [],
                attestations: [{ evidenceId: 'ev_8dfc75f2a1ba4f6d9fa1c52f2653f581', documentTitle: 'dependency_management Evidence', documentSourceType: 'gitlab', linkedAt: '2025-09-02T22:51:48.512808Z', submittedBy: 'security_analyst_001' }]
              },
              {
                fieldKey: 'encryption_at_rest',
                profileFieldId: 'pf_05d0df4f63476bb20927a3a7bb4ec17e',
                label: 'Encryption at Rest',
                policyRequirement: { ttl: '365d', label: 'Optional', value: 'optional' },
                evidence: [{ evidence_id: 'ev_737dd4bcabac459890c89ea3f35f97ad', status: 'active', valid_until: '2026-09-02T22:51:44Z' }],
                approvalStatus: 'pending',
                freshnessStatus: 'current',
                risks: [],
                attestations: [{ evidenceId: 'ev_737dd4bcabac459890c89ea3f35f97ad', documentTitle: 'encryption_at_rest Evidence', documentSourceType: 'gitlab', linkedAt: '2025-09-02T22:52:17.397567Z', submittedBy: 'security_analyst_001' }]
              },
              {
                fieldKey: 'encryption_in_transit',
                profileFieldId: 'pf_5a0db2fc2f2e564c08468effee539699',
                label: 'Encryption in Transit',
                policyRequirement: { ttl: '365d', label: 'Recommended', value: 'recommended' },
                evidence: [{ evidence_id: 'ev_7a007211a4444d1daebe6fce70442fc8', status: 'active', valid_until: '2026-09-02T22:51:44Z' }],
                approvalStatus: 'pending',
                freshnessStatus: 'current',
                risks: [],
                attestations: [{ evidenceId: 'ev_7a007211a4444d1daebe6fce70442fc8', documentTitle: 'encryption_in_transit Evidence', documentSourceType: 'gitlab', linkedAt: '2025-09-02T22:52:06.84865Z', submittedBy: 'security_analyst_001' }]
              },
              {
                fieldKey: 'key_rotation_max',
                profileFieldId: 'pf_75f3803a4f16603c2bf4c4fe5a77cdf6',
                label: 'Key Rotation Max',
                policyRequirement: { ttl: '365d', label: 'Rotate ≤ 365 days', value: '365d' },
                evidence: [{ evidence_id: 'ev_039ec0238b5342dea178f21be26610a4', status: 'active', valid_until: '2026-09-02T22:51:44Z' }],
                approvalStatus: 'pending',
                freshnessStatus: 'current',
                risks: [],
                attestations: [{ evidenceId: 'ev_039ec0238b5342dea178f21be26610a4', documentTitle: 'key_rotation_max Evidence', documentSourceType: 'gitlab', linkedAt: '2025-09-02T22:51:53.098847Z', submittedBy: 'security_analyst_001' }]
              },
              {
                fieldKey: 'mfa_enforcement',
                profileFieldId: 'pf_c7954d72f0c2ac073642048e02c3908a',
                label: 'Multi-Factor Authentication',
                policyRequirement: { ttl: '365d', label: 'Optional', value: 'optional' },
                evidence: [{ evidence_id: 'ev_4dd1738abf0c41509ee25eb3e4eeeba3', status: 'active', valid_until: '2026-09-02T22:51:44Z' }],
                approvalStatus: 'pending',
                freshnessStatus: 'current',
                risks: [],
                attestations: [{ evidenceId: 'ev_4dd1738abf0c41509ee25eb3e4eeeba3', documentTitle: 'mfa_enforcement Evidence', documentSourceType: 'gitlab', linkedAt: '2025-09-02T22:51:50.00218Z', submittedBy: 'security_analyst_001' }]
              },
              {
                fieldKey: 'network_segmentation',
                profileFieldId: 'pf_015cfe4456bd8f391c26e4dd470324d9',
                label: 'Network Segmentation Evidence',
                policyRequirement: { ttl: '365d', label: 'Recommended', value: 'recommended' },
                evidence: [{ evidence_id: 'ev_d6502fe809ea4eb78b21865e2fc68eb8', status: 'active', valid_until: '2026-09-02T22:51:44Z' }],
                approvalStatus: 'pending',
                freshnessStatus: 'current',
                risks: [],
                attestations: [{ evidenceId: 'ev_d6502fe809ea4eb78b21865e2fc68eb8', documentTitle: 'network_segmentation Evidence', documentSourceType: 'gitlab', linkedAt: '2025-09-02T22:52:02.43952Z', submittedBy: 'security_analyst_001' }]
              },
              {
                fieldKey: 'patching_sla',
                profileFieldId: 'pf_49c9b95d97fb011f14c09c87f37724c9',
                label: 'Patch Remediation SLA',
                policyRequirement: { ttl: '365d', label: 'Best effort', value: 'best_effort' },
                evidence: [{ evidence_id: 'ev_3075c33bf5c347be81bf1615fd46c6f2', status: 'active', valid_until: '2026-09-02T22:51:44Z' }],
                approvalStatus: 'pending',
                freshnessStatus: 'current',
                risks: [],
                attestations: [{ evidenceId: 'ev_3075c33bf5c347be81bf1615fd46c6f2', documentTitle: 'patching_sla Evidence', documentSourceType: 'gitlab', linkedAt: '2025-09-02T22:51:56.913931Z', submittedBy: 'security_analyst_001' }]
              },
              {
                fieldKey: 'privileged_access_mgmt',
                profileFieldId: 'pf_99d0f407639a4e03ed4f3672343ea052',
                label: 'Privileged Access Management',
                policyRequirement: { ttl: '365d', label: 'Manual OK', value: 'manual_ok' },
                evidence: [{ evidence_id: 'ev_2a5aac64e0244958964aafe7fc4287a6', status: 'active', valid_until: '2026-09-02T22:51:44Z' }],
                approvalStatus: 'pending',
                freshnessStatus: 'current',
                risks: [],
                attestations: [{ evidenceId: 'ev_2a5aac64e0244958964aafe7fc4287a6', documentTitle: 'privileged_access_mgmt Evidence', documentSourceType: 'gitlab', linkedAt: '2025-09-02T22:51:52.34713Z', submittedBy: 'security_analyst_001' }]
              },
              {
                fieldKey: 'secrets_management',
                profileFieldId: 'pf_d2b0e5ca701e2310d359740fba109a51',
                label: 'Secrets Management',
                policyRequirement: { ttl: '365d', label: 'Centralized (recommended)', value: 'centralized_recommended' },
                evidence: [{ evidence_id: 'ev_8dc72d4e706040e1899082c540b9aabe', status: 'active', valid_until: '2026-09-02T22:51:44Z' }],
                approvalStatus: 'pending',
                freshnessStatus: 'current',
                risks: [],
                attestations: [{ evidenceId: 'ev_8dc72d4e706040e1899082c540b9aabe', documentTitle: 'secrets_management Evidence', documentSourceType: 'gitlab', linkedAt: '2025-09-02T22:51:55.442091Z', submittedBy: 'security_analyst_001' }]
              },
              {
                fieldKey: 'security_testing',
                profileFieldId: 'pf_2912c0bd43954f187a9687e4a262dd90',
                label: 'Security Testing',
                policyRequirement: { ttl: '180d', label: 'SAST on release', value: 'sast_on_release' },
                evidence: [{ evidence_id: 'ev_2abd6c83f921473184f6d624df6ef30f', status: 'active', valid_until: '2026-09-02T22:51:44Z' }],
                approvalStatus: 'pending',
                freshnessStatus: 'current',
                risks: [],
                attestations: [{ evidenceId: 'ev_2abd6c83f921473184f6d624df6ef30f', documentTitle: 'security_testing Evidence', documentSourceType: 'gitlab', linkedAt: '2025-09-02T22:52:03.952974Z', submittedBy: 'security_analyst_001' }]
              },
              {
                fieldKey: 'siem_integration',
                profileFieldId: 'pf_7f0dbc53d73b1e9bff4a95648f9fcb01',
                label: 'SIEM / Central Log Integration',
                policyRequirement: { ttl: '365d', label: 'Recommended', value: 'recommended' },
                evidence: [{ evidence_id: 'ev_fc338bea47d0459fb1dccd40fc41b16c', status: 'active', valid_until: '2026-09-02T22:51:44Z' }],
                approvalStatus: 'pending',
                freshnessStatus: 'current',
                risks: [],
                attestations: [{ evidenceId: 'ev_fc338bea47d0459fb1dccd40fc41b16c', documentTitle: 'siem_integration Evidence', documentSourceType: 'gitlab', linkedAt: '2025-09-02T22:51:56.178484Z', submittedBy: 'security_analyst_001' }]
              },
              {
                fieldKey: 'waf_protection',
                profileFieldId: 'pf_75e4fefda3f721427116e2c3afacd7aa',
                label: 'Web Application Firewall Evidence',
                policyRequirement: { ttl: '180d', label: 'Recommended', value: 'recommended' },
                evidence: [{ evidence_id: 'ev_6e622804e51c4a62b853ffa53fe90b05', status: 'active', valid_until: '2026-09-02T22:51:44Z' }],
                approvalStatus: 'pending',
                freshnessStatus: 'current',
                risks: [],
                attestations: [{ evidenceId: 'ev_6e622804e51c4a62b853ffa53fe90b05', documentTitle: 'waf_protection Evidence', documentSourceType: 'gitlab', linkedAt: '2025-09-02T22:52:04.690839Z', submittedBy: 'security_analyst_001' }]
              }
            ]
          },
          {
            domainKey: 'app_criticality_assessment',
            title: 'Summary',
            icon: 'SummaryIcon',
            driverLabel: 'app_criticality_assessment',
            driverValue: 'A',
            fields: [
              {
                fieldKey: 'architecture_vision',
                profileFieldId: 'pf_ee1955014407d26303463a94c7dc0211',
                label: 'Architecture Vision',
                policyRequirement: { ttl: '90d', label: 'Mandatory', value: 'mandatory' },
                evidence: [{ evidence_id: 'ev_0ecbe8c449a74462a3dbe7444258eb85', status: 'active', valid_until: '2026-09-02T22:51:44Z' }],
                approvalStatus: 'pending',
                freshnessStatus: 'current',
                risks: [{ risk_id: 'risk_e776103f-891d-4f9f-9ca8-c1244f4639a4', title: 'Auto-created risk for architecture_vision field', severity: 'medium', status: 'PENDING_SME_REVIEW' }],
                attestations: []
              },
              {
                fieldKey: 'product_roadmap',
                profileFieldId: 'pf_4c690004d3636fb09ac0be8d9aa5968d',
                label: 'Product Roadmap',
                policyRequirement: { ttl: '90d', label: 'Mandatory', value: 'mandatory' },
                evidence: [{ evidence_id: 'ev_1de5d35e9df94d0c8497328b280d905e', status: 'active', valid_until: '2026-09-02T22:51:44Z' }],
                approvalStatus: 'pending',
                freshnessStatus: 'current',
                risks: [{ risk_id: 'risk_34f12b52-1c9d-4718-b03f-32a3f23a3e2b', title: 'Auto-created risk for product_roadmap field', severity: 'medium', status: 'PENDING_SME_REVIEW' }],
                attestations: []
              },
              {
                fieldKey: 'product_vision',
                profileFieldId: 'pf_a93e3aab272d1717cb45bd2ec03fc451',
                label: 'Product Vision',
                policyRequirement: { ttl: '90d', label: 'Mandatory', value: 'mandatory' },
                evidence: [{ evidence_id: 'ev_9c098e5104c843d69fe6bf50b069c718', status: 'active', valid_until: '2026-09-02T22:51:44Z' }],
                approvalStatus: 'pending',
                freshnessStatus: 'current',
                risks: [{ risk_id: 'risk_0fb9a5a9-20e2-429d-a90e-ce2e952ccd28', title: 'Auto-created risk for product_vision field', severity: 'medium', status: 'PENDING_SME_REVIEW' }],
                attestations: []
              },
              {
                fieldKey: 'security_vision',
                profileFieldId: 'pf_c402f14fbbd470b94c0dd618c166a3f6',
                label: 'Security Vision',
                policyRequirement: { ttl: '90d', label: 'Mandatory', value: 'mandatory' },
                evidence: [{ evidence_id: 'ev_1ad74d26a1784bccab60fa9d0589ecaa', status: 'active', valid_until: '2026-09-02T22:51:44Z' }],
                approvalStatus: 'pending',
                freshnessStatus: 'current',
                risks: [{ risk_id: 'risk_1ddcc9db-4781-4036-888a-7d21f9f65489', title: 'Auto-created risk for security_vision field', severity: 'medium', status: 'PENDING_SME_REVIEW' }],
                attestations: []
              },
              {
                fieldKey: 'service_vision',
                profileFieldId: 'pf_37054f757f631f2763b235a7c6071e19',
                label: 'Service Vision',
                policyRequirement: { ttl: '90d', label: 'Mandatory', value: 'mandatory' },
                evidence: [{ evidence_id: 'ev_6ccbb809093442e5a100f1f04cb21e8b', status: 'active', valid_until: '2026-09-02T22:51:44Z' }],
                approvalStatus: 'pending',
                freshnessStatus: 'current',
                risks: [{ risk_id: 'risk_65d50b86-849d-4dc7-8fee-7a699a0b660f', title: 'Auto-created risk for service_vision field', severity: 'medium', status: 'PENDING_SME_REVIEW' }],
                attestations: []
              },
              {
                fieldKey: 'test_vision',
                profileFieldId: 'pf_69239402f59dd08b6b6f2dc147b57421',
                label: 'Test Vision',
                policyRequirement: { ttl: '90d', label: 'Mandatory', value: 'mandatory' },
                evidence: [{ evidence_id: 'ev_c226053d8b444318a97039f264cb519c', status: 'active', valid_until: '2026-09-02T22:51:44Z' }],
                approvalStatus: 'pending',
                freshnessStatus: 'current',
                risks: [{ risk_id: 'risk_d09c01d2-c8fb-4eb7-8506-26be379531ce', title: 'Auto-created risk for test_vision field', severity: 'medium', status: 'PENDING_SME_REVIEW' }],
                attestations: []
              }
            ]
          },
          {
            domainKey: 'integrity_rating',
            title: 'Integrity',
            icon: 'IntegrityIcon',
            driverLabel: 'integrity_rating',
            driverValue: 'C',
            fields: [
              {
                fieldKey: 'audit_logging',
                profileFieldId: 'pf_bdb382967e3770f205757dabf83073d5',
                label: 'Audit Logging',
                policyRequirement: { ttl: '180d', label: 'Logging enabled + sampled review', value: 'logging_enabled+sampled_review' },
                evidence: [{ evidence_id: 'ev_1d60f3bd40544e039f54c2baace39d84', status: 'active', valid_until: '2026-09-02T22:51:44Z' }],
                approvalStatus: 'pending',
                freshnessStatus: 'current',
                risks: [],
                attestations: [{ evidenceId: 'ev_1d60f3bd40544e039f54c2baace39d84', documentTitle: 'audit_logging Evidence', documentSourceType: 'gitlab', linkedAt: '2025-09-02T22:52:00.860119Z', submittedBy: 'security_analyst_001' }]
              },
              {
                fieldKey: 'change_control',
                profileFieldId: 'pf_1fcd2312443f55c7e4ae3203a1fada1c',
                label: 'Change Control',
                policyRequirement: { ttl: '90d', label: 'Peer review + unit tests', value: 'peer_review+unit_tests' },
                evidence: [{ evidence_id: 'ev_ddc1a797bcf94dfc88064407092adb40', status: 'active', valid_until: '2026-09-02T22:51:44Z' }],
                approvalStatus: 'pending',
                freshnessStatus: 'current',
                risks: [],
                attestations: [{ evidenceId: 'ev_ddc1a797bcf94dfc88064407092adb40', documentTitle: 'change_control Evidence', documentSourceType: 'gitlab', linkedAt: '2025-09-02T22:51:53.851724Z', submittedBy: 'security_analyst_001' }]
              },
              {
                fieldKey: 'data_validation',
                profileFieldId: 'pf_b83e77d0cb696c37c4d663bb10a17a7c',
                label: 'Data Validation',
                policyRequirement: { ttl: '180d', label: 'Standard validation', value: 'standard_validation' },
                evidence: [{ evidence_id: 'ev_5b1bdb84ab8e41e59cacdf5dc92ed6f4', status: 'active', valid_until: '2026-09-02T22:51:44Z' }],
                approvalStatus: 'pending',
                freshnessStatus: 'current',
                risks: [],
                attestations: [{ evidenceId: 'ev_5b1bdb84ab8e41e59cacdf5dc92ed6f4', documentTitle: 'data_validation Evidence', documentSourceType: 'gitlab', linkedAt: '2025-09-02T22:51:50.726012Z', submittedBy: 'security_analyst_001' }]
              },
              {
                fieldKey: 'immutability_required',
                profileFieldId: 'pf_720ba6f7410099417530baff2ba5075e',
                label: 'Immutability Required',
                policyRequirement: { ttl: '180d', label: 'No', value: false },
                evidence: [{ evidence_id: 'ev_e9bf55f3254c478ab0e5df9292c08bbd', status: 'active', valid_until: '2026-09-02T22:51:44Z' }],
                approvalStatus: 'pending',
                freshnessStatus: 'current',
                risks: [],
                attestations: [{ evidenceId: 'ev_e9bf55f3254c478ab0e5df9292c08bbd', documentTitle: 'immutability_required Evidence', documentSourceType: 'gitlab', linkedAt: '2025-09-02T22:52:03.220844Z', submittedBy: 'security_analyst_001' }]
              },
              {
                fieldKey: 'log_retention',
                profileFieldId: 'pf_1a370e363e72ce491038bfbf220f73f2',
                label: 'Log Retention Period',
                policyRequirement: { ttl: '365d', label: '≥ 90 days', value: '>=90d' },
                evidence: [{ evidence_id: 'ev_790c9c8b65654f109f8d99553a749025', status: 'active', valid_until: '2026-09-02T22:51:44Z' }],
                approvalStatus: 'pending',
                freshnessStatus: 'current',
                risks: [],
                attestations: [{ evidenceId: 'ev_790c9c8b65654f109f8d99553a749025', documentTitle: 'log_retention Evidence', documentSourceType: 'gitlab', linkedAt: '2025-09-02T22:52:05.39108Z', submittedBy: 'security_analyst_001' }]
              },
              {
                fieldKey: 'reconciliation_frequency',
                profileFieldId: 'pf_83068a793cd8762d43fd4a241634c8a1',
                label: 'Reconciliation Frequency',
                policyRequirement: { ttl: '180d', label: 'Per release', value: 'per_release' },
                evidence: [{ evidence_id: 'ev_ad062e99956f455783ea11dcdaf038fa', status: 'active', valid_until: '2026-09-02T22:51:44Z' }],
                approvalStatus: 'pending',
                freshnessStatus: 'current',
                risks: [],
                attestations: [{ evidenceId: 'ev_ad062e99956f455783ea11dcdaf038fa', documentTitle: 'reconciliation_frequency Evidence', documentSourceType: 'gitlab', linkedAt: '2025-09-02T22:52:15.802845Z', submittedBy: 'security_analyst_001' }]
              }
            ]
          },
          {
            domainKey: 'availability_rating',
            title: 'Availability',
            icon: 'AvailabilityIcon',
            driverLabel: 'availability_rating',
            driverValue: 'B',
            fields: [
              {
                fieldKey: 'ha_topology',
                profileFieldId: 'pf_3d03cf9458834003830bcc54f5f833af',
                label: 'HA Topology',
                policyRequirement: { ttl: '90d', label: 'Active-Passive', value: 'active_passive' },
                evidence: [{ evidence_id: 'ev_fc7a7ac25cc446a99e7096dc628a4727', status: 'active', valid_until: '2026-09-02T22:51:44Z' }],
                approvalStatus: 'pending',
                freshnessStatus: 'current',
                risks: [{ risk_id: 'risk_18867fae-0bb4-422d-9ae0-d68f468959f6', title: 'Auto-created risk for ha_topology field', severity: 'medium', status: 'PENDING_SME_REVIEW' }],
                attestations: []
              },
              {
                fieldKey: 'monitoring_slos',
                profileFieldId: 'pf_6867075d1a6ea814d69577b96876fa96',
                label: 'Monitoring SLOs',
                policyRequirement: { ttl: '90d', label: '≥99.5% with alerting', value: '99.5_with_alerting' },
                evidence: [{ evidence_id: 'ev_2d382786aa02446e841f1103c49b4c6e', status: 'active', valid_until: '2026-09-02T22:51:44Z' }],
                approvalStatus: 'pending',
                freshnessStatus: 'current',
                risks: [{ risk_id: 'risk_cf38c9fb-d985-4c04-8746-f131f7a7eb6d', title: 'Auto-created risk for monitoring_slos field', severity: 'medium', status: 'PENDING_SME_REVIEW' }],
                attestations: []
              },
              {
                fieldKey: 'oncall_coverage',
                profileFieldId: 'pf_b67bfaa90609b075adfb038eaab3016b',
                label: 'On-call Coverage',
                policyRequirement: { ttl: '90d', label: '16×5', value: '16x5' },
                evidence: [{ evidence_id: 'ev_e383a56d8dda4eefb2d27cb40315f01d', status: 'active', valid_until: '2026-09-02T22:51:44Z' }],
                approvalStatus: 'pending',
                freshnessStatus: 'current',
                risks: [{ risk_id: 'risk_a782d7eb-c9e6-45cf-bedc-7fdddbec9b85', title: 'Auto-created risk for oncall_coverage field', severity: 'medium', status: 'PENDING_SME_REVIEW' }],
                attestations: []
              },
              {
                fieldKey: 'rpo_minutes',
                profileFieldId: 'pf_17663b9edc58d9abdc2de7187d483000',
                label: 'RPO (minutes)',
                policyRequirement: { ttl: '90d', label: '≤ 60 minutes', value: 60 },
                evidence: [{ evidence_id: 'ev_7fbd065bccd44bc8986ba65a48c30748', status: 'active', valid_until: '2026-09-02T22:51:44Z' }],
                approvalStatus: 'pending',
                freshnessStatus: 'current',
                risks: [{ risk_id: 'risk_f238c68f-c756-437e-9d12-7969009e6f59', title: 'Auto-created risk for rpo_minutes field', severity: 'medium', status: 'PENDING_SME_REVIEW' }],
                attestations: []
              },
              {
                fieldKey: 'rto_hours',
                profileFieldId: 'pf_d2d5229fc03e7deca4edd3718586f338',
                label: 'RTO (hours)',
                policyRequirement: { ttl: '90d', label: '≤ 4 hours', value: 4 },
                evidence: [{ evidence_id: 'ev_9aaba339dff042729991d5e92664eb5e', status: 'active', valid_until: '2026-09-02T22:51:44Z' }],
                approvalStatus: 'pending',
                freshnessStatus: 'current',
                risks: [{ risk_id: 'risk_7dfec143-1d2a-4ad4-ae2b-6c5ee22c838c', title: 'Auto-created risk for rto_hours field', severity: 'medium', status: 'PENDING_SME_REVIEW' }],
                attestations: []
              }
            ]
          },
          {
            domainKey: 'confidentiality_rating',
            title: 'Confidentiality',
            icon: 'DefaultIcon',
            driverLabel: 'confidentiality_rating',
            driverValue: 'B',
            fields: [
              {
                fieldKey: 'access_review',
                profileFieldId: 'pf_373698658db08a85a2c6f2a27ef5a1e2',
                label: 'Access Review Cadence',
                policyRequirement: { ttl: '180d', label: 'Semi-annual', value: 'semi_annual' },
                evidence: [{ evidence_id: 'ev_13b3498f9f4b4fb49448b82a2042e09d', status: 'active', valid_until: '2026-09-02T22:51:44Z' }],
                approvalStatus: 'pending',
                freshnessStatus: 'current',
                risks: [{ risk_id: 'risk_e0428c2e-1d4a-4b0c-a625-afa7fd86ac30', title: 'Auto-created risk for access_review field', severity: 'medium', status: 'PENDING_SME_REVIEW' }],
                attestations: []
              },
              {
                fieldKey: 'confidentiality_level',
                profileFieldId: 'pf_4d45c8847ed320c965b58a669ea5315b',
                label: 'Confidentiality Level',
                policyRequirement: { ttl: '90d', label: 'Confidential', value: 'confidential' },
                evidence: [{ evidence_id: 'ev_d067b88351c84e048ad03a7e0625eab4', status: 'active', valid_until: '2026-09-02T22:51:44Z' }],
                approvalStatus: 'pending',
                freshnessStatus: 'current',
                risks: [{ risk_id: 'risk_63a250c5-8cb4-4105-a6d0-739ef4a2fb63', title: 'Auto-created risk for confidentiality_level field', severity: 'medium', status: 'PENDING_SME_REVIEW' }],
                attestations: []
              },
              {
                fieldKey: 'data_deletion_evidence',
                profileFieldId: 'pf_72998cc2ddb9f714f298568532f63e7f',
                label: 'Secure Data Deletion Evidence',
                policyRequirement: { ttl: '365d', label: 'Required', value: 'required' },
                evidence: [{ evidence_id: 'ev_90b9197071ea463a8d644aaa2c4bfe58', status: 'active', valid_until: '2026-09-02T22:51:44Z' }],
                approvalStatus: 'pending',
                freshnessStatus: 'current',
                risks: [{ risk_id: 'risk_28e5a577-65a8-4c84-aae8-913408a860b0', title: 'Auto-created risk for data_deletion_evidence field', severity: 'medium', status: 'PENDING_SME_REVIEW' }],
                attestations: []
              },
              {
                fieldKey: 'data_residency_control',
                profileFieldId: 'pf_c994e0abc423bfcb0577d6b6144ed794',
                label: 'Data Residency Control',
                policyRequirement: { ttl: '90d', label: 'Preferred in-region', value: 'preferred_in_region' },
                evidence: [{ evidence_id: 'ev_cfa9d0895d0f474e9790f52484d41b92', status: 'active', valid_until: '2026-09-02T22:51:44Z' }],
                approvalStatus: 'pending',
                freshnessStatus: 'current',
                risks: [{ risk_id: 'risk_4f117e76-1dc6-4b2d-b355-6e7f071bf98a', title: 'Auto-created risk for data_residency_control field', severity: 'medium', status: 'PENDING_SME_REVIEW' }],
                attestations: []
              },
              {
                fieldKey: 'data_retention_policy',
                profileFieldId: 'pf_53b60bb17cbab5b511006a4db8852fe3',
                label: 'Data Retention Policy',
                policyRequirement: { ttl: '365d', label: 'Defined', value: 'defined' },
                evidence: [{ evidence_id: 'ev_306fa4ccee2f4f10acc1b365782cf16e', status: 'active', valid_until: '2026-09-02T22:51:44Z' }],
                approvalStatus: 'pending',
                freshnessStatus: 'current',
                risks: [{ risk_id: 'risk_c31b0c20-bc5f-4abb-a4de-ac96b9c173eb', title: 'Auto-created risk for data_retention_policy field', severity: 'medium', status: 'PENDING_SME_REVIEW' }],
                attestations: []
              },
              {
                fieldKey: 'de_identification',
                profileFieldId: 'pf_5e86f1a7954680c27e90c6d081ffb04c',
                label: 'De-Identification',
                policyRequirement: { ttl: '90d', label: 'Required', value: 'required' },
                evidence: [{ evidence_id: 'ev_89aa9207e5054ab2ae9fc6cef6d1f202', status: 'active', valid_until: '2026-09-02T22:51:44Z' }],
                approvalStatus: 'pending',
                freshnessStatus: 'current',
                risks: [{ risk_id: 'risk_54c97dae-d22a-47a5-9950-cd2e16a70783', title: 'Auto-created risk for de_identification field', severity: 'medium', status: 'PENDING_SME_REVIEW' }],
                attestations: []
              },
              {
                fieldKey: 'tpsp_attestation',
                profileFieldId: 'pf_c9625d47d88d2003319bef1f9cdc0c19',
                label: 'Third-Party Service Provider Attestation',
                policyRequirement: { ttl: '365d', label: 'Required', value: 'required' },
                evidence: [{ evidence_id: 'ev_209961c19b8e454fb728f505d9d85bde', status: 'active', valid_until: '2026-09-02T22:51:44Z' }],
                approvalStatus: 'pending',
                freshnessStatus: 'current',
                risks: [{ risk_id: 'risk_fd3102a0-5cdb-456e-b41f-eaadde2da0cf', title: 'Auto-created risk for tpsp_attestation field', severity: 'medium', status: 'PENDING_SME_REVIEW' }],
                attestations: []
              }
            ]
          }
        ]
      };
    }
    
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
              profileFieldId: 'pf_architecture_vision_001',
              label: 'Architecture Vision',
              policyRequirement: {
                ttl: '0d',
                label: 'Required',
                value: 'required',
              },
              evidence: [],
              assurance: 'Missing',
              risks: []
            },
            {
              fieldKey: 'product_roadmap',
              profileFieldId: 'pf_product_roadmap_001',
              label: 'Product Roadmap',
              policyRequirement: {
                ttl: '0d',
                label: 'Required',
                value: 'required',
              },
              evidence: [],
              assurance: 'Missing',
              risks: []
            },
            {
              fieldKey: 'product_vision',
              profileFieldId: 'pf_product_vision_001',
              label: 'Product Vision',
              policyRequirement: {
                ttl: '0d',
                label: 'Required',
                value: 'required',
              },
              evidence: [],
              assurance: 'Missing',
              risks: []
            },
            {
              fieldKey: 'security_vision',
              profileFieldId: 'pf_security_vision_001',
              label: 'Security Vision',
              policyRequirement: {
                ttl: '0d',
                label: 'Required',
                value: 'required',
              },
              evidence: [],
              assurance: 'Missing',
              risks: []
            },
            {
              fieldKey: 'service_vision',
              profileFieldId: 'pf_service_vision_001',
              label: 'Service Vision',
              policyRequirement: {
                ttl: '0d',
                label: 'Required',
                value: 'required',
              },
              evidence: [],
              assurance: 'Missing',
              risks: []
            },
            {
              fieldKey: 'test_vision',
              profileFieldId: 'pf_test_vision_001',
              label: 'Test Vision',
              policyRequirement: {
                ttl: '0d',
                label: 'Required',
                value: 'required',
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
              profileFieldId: 'pf_materiality_001',
              label: 'Materiality',
              policyRequirement: {
                ttl: '365d',
                label: 'High',
                value: 'high',
              },
              evidence: [],
              assurance: 'Missing',
              risks: []
            },
            {
              fieldKey: 'review_depth',
              profileFieldId: 'pf_review_depth_001',
              label: 'Review Depth',
              policyRequirement: {
                ttl: '365d',
                label: 'Scoped review',
                value: 'scoped_review',
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
              profileFieldId: 'pf_confidentiality_level_001',
              label: 'Confidentiality Level',
              policyRequirement: {
                ttl: '0d',
                label: 'Restricted',
                value: 'restricted',
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
              profileFieldId: 'pf_encryption_at_rest_001',
              label: 'Encryption at Rest',
              policyRequirement: {
                ttl: '0d',
                label: 'Required',
                value: 'required',
              },
              evidence: [],
              assurance: 'Missing',
              risks: []
            },
            {
              fieldKey: 'encryption_in_transit',
              profileFieldId: 'pf_encryption_in_transit_001',
              label: 'Encryption in Transit',
              policyRequirement: {
                ttl: '0d',
                label: 'Required',
                value: 'required',
              },
              evidence: [],
              assurance: 'Missing',
              risks: []
            },
            {
              fieldKey: 'key_rotation_max',
              profileFieldId: 'pf_key_rotation_max_001',
              label: 'Key Rotation Max',
              policyRequirement: {
                ttl: '0d',
                label: '180 days',
                value: '180d',
              },
              evidence: [],
              assurance: 'Missing',
              risks: []
            },
            {
              fieldKey: 'secrets_management',
              profileFieldId: 'pf_secrets_management_001',
              label: 'Secrets Management',
              policyRequirement: {
                ttl: '0d',
                label: 'Centralized required',
                value: 'centralized_required',
              },
              evidence: [],
              assurance: 'Missing',
              risks: []
            },
            {
              fieldKey: 'security_testing',
              profileFieldId: 'pf_security_testing_001',
              label: 'Security Testing',
              policyRequirement: {
                ttl: '0d',
                label: 'Internal pentest annual + continuous scans',
                value: 'internal_pentest_annual+continuous_scans',
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
              profileFieldId: 'pf_audit_logging_001',
              label: 'Audit Logging',
              policyRequirement: {
                ttl: '90d',
                label: 'Full with periodic review',
                value: 'full_with_periodic_review',
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
              profileFieldId: 'pf_rto_hours_001',
              label: 'RTO (hours)',
              policyRequirement: {
                ttl: '0d',
                label: '1 hour',
                value: 1,
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
              profileFieldId: 'pf_backup_policy_001',
              label: 'Backup Policy',
              policyRequirement: {
                ttl: '90d',
                label: 'Encrypted + tested restores',
                value: 'encrypted+tested_restores',
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
    // Use real portfolio KPIs if available
    if (realPortfolioKpis) {
      return realPortfolioKpis;
    }
    // Fallback to calculated from all apps
    return { 
      compliant: 0, 
      missingEvidence: 0, 
      pendingReview: 645, // 15 apps * 43 fields
      riskBlocked: 331 
    };
  },
  getAppKpis: async (appId: string): Promise<AppKpis> => {
    await delay(120);
    // Calculate KPIs based on app ID for demo purposes
    // Calculate realistic KPIs based on the profile data structure and domain ratings
    const calculateKpisForApp = (appId: string) => {
      const appProfiles = {
        'CORR-12356': { driverValues: { resilience_rating: '3', security_rating: 'A', app_criticality_assessment: 'B', integrity_rating: 'A', availability_rating: 'A', confidentiality_rating: 'A' } },
        'APM100001': { driverValues: { resilience_rating: '1', security_rating: 'C', app_criticality_assessment: 'A', integrity_rating: 'C', availability_rating: 'B', confidentiality_rating: 'B' } },
        'DEVTOOLS': { driverValues: { resilience_rating: '2', security_rating: 'C', app_criticality_assessment: 'C', integrity_rating: 'B', availability_rating: 'B', confidentiality_rating: 'B' } }
      };
      
      const appData = appProfiles[appId as keyof typeof appProfiles];
      if (!appData) return { compliant: 0, missingEvidence: 0, pendingReview: 0, riskBlocked: 0 };
      
      let compliant = 0, pending = 0, missing = 0, riskBlocked = 0;
      
      Object.entries(BASE_DOMAINS).forEach(([domainKey, domain]) => {
        const rating = appData.driverValues[domainKey as keyof typeof appData.driverValues];
        const shouldHaveRisk = ['A1', 'A2', 'A', 'B', '1', '2'].includes(rating);
        
        domain.fields.forEach((field, index) => {
          if (appId === 'CORR-12356') {
            // Good profile: mostly approved
            if (index % 5 === 0) {
              if (shouldHaveRisk) riskBlocked++; else pending++;
            } else {
              compliant++;
            }
          } else if (appId === 'APM100001') {
            // Critical profile: all pending
            if (shouldHaveRisk) riskBlocked++; else pending++;
          } else {
            // Mixed profile
            if (index % 3 === 0) {
              compliant++;
            } else if (shouldHaveRisk) {
              riskBlocked++;
            } else {
              pending++;
            }
          }
        });
      });
      
      return { compliant, missingEvidence: missing, pendingReview: pending, riskBlocked };
    };

    // Use real KPI data first
    const realKpis = realAppKpis[appId];
    if (realKpis) {
      return realKpis;
    }
    
    // Fallback to calculated KPIs
    return calculateKpisForApp(appId);
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

  // Mock getChildApps: returns child apps for a given parent
  getChildApps: async (parentAppId: string): Promise<AppSummary[]> => {
    await delay(120);
    // Mock child apps data
    const childAppsData: Record<string, AppSummary[]> = {
      'CORR-12356': [
        {
          appId: 'CORR-WEB',
          name: 'Correspondence Web UI',
          criticality: 'B',
          businessServiceName: 'Payment Processing',
          install_type: 'Cloud',
          architecture_type: 'React SPA',
          parentAppId: 'CORR-12356',
          parentAppName: 'Payment Processing',
          hasChildren: false,
          securityRating: 'A',
          integrityRating: 'B',
          availabilityRating: 'A',
          confidentialityRating: 'A',
          resilienceRating: '3',
          createdAt: '2025-08-20T01:10:56.367794Z',
          updatedAt: '2025-08-24T01:10:56.391521Z',
        },
        {
          appId: 'CORR-API',
          name: 'Correspondence API Gateway',
          criticality: 'A',
          businessServiceName: 'Payment Processing',
          install_type: 'Cloud',
          architecture_type: 'REST API',
          parentAppId: 'CORR-12356',
          parentAppName: 'Payment Processing',
          hasChildren: false,
          securityRating: 'A',
          integrityRating: 'A',
          availabilityRating: 'A',
          confidentialityRating: 'A',
          resilienceRating: '5',
          createdAt: '2025-08-18T01:10:56.367794Z',
          updatedAt: '2025-08-25T01:10:56.391521Z',
        },
        {
          appId: 'CORR-BATCH',
          name: 'Correspondence Batch Processor',
          criticality: 'C',
          businessServiceName: 'Payment Processing',
          install_type: 'On-Premise',
          architecture_type: 'Batch Processing',
          parentAppId: 'CORR-12356',
          parentAppName: 'Payment Processing',
          hasChildren: false,
          securityRating: 'B',
          integrityRating: 'B',
          availabilityRating: 'B',
          confidentialityRating: 'B',
          resilienceRating: '3',
          createdAt: '2025-08-15T01:10:56.367794Z',
          updatedAt: '2025-08-23T01:10:56.391521Z',
        },
      ],
    };
    
    return childAppsData[parentAppId] || [];
  },
};
