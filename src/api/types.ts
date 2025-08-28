// Keeps the UI-facing shape exactly what POHome expects
export type StatusSeverity = 'success' | 'warning' | 'error' | 'info';

export type AppSummary = {
  appId: string;
  name?: string | null;
  criticality?: 'A' | 'B' | 'C' | 'D' | undefined;   // badge uses this
  businessServiceName?: string | null;
  install_type?: string | null;                       // snake_case for UI
  architecture_type?: string | null;                  // snake_case for UI
  // Business fields from API
  scope?: string | null;
  transactionCycle?: string | null;
  applicationType?: string | null;
  applicationTier?: string | null;
  housePosition?: string | null;
  operationalStatus?: string | null;
  onboardingStatus?: string | null;
  businessApplicationSysId?: string | null;
  transactionCycleId?: string | null;
  // Ratings
  integrityRating?: string | null;
  availabilityRating?: string | null;
  resilienceRating?: string | null;
  securityRating?: string | null;
  confidentialityRating?: string | null;
  // Timestamps
  createdAt?: string | null;
  updatedAt?: string | null;
  // Hierarchy
  hasChildren?: boolean | null;
  parentAppId?: string | null;
  parentAppName?: string | null;
};

// Server shape coming from Spring (camelCase + appCriticalityAssessment)
export type ServerApp = {
  appId: string;
  scope?: string | null;
  parentAppId?: string | null;
  parentAppName?: string | null;
  name?: string | null;
  businessServiceName?: string | null;
  appCriticalityAssessment?: string | null;
  securityRating?: string | null;
  integrityRating?: string | null;
  availabilityRating?: string | null;
  resilienceRating?: string | null;
  confidentialityRating?: string | null;
  businessApplicationSysId?: string | null;
  architectureHosting?: string | null;
  jiraBacklogId?: string | null;
  leanControlServiceId?: string | null;
  repoId?: string | null;
  operationalStatus?: string | null;
  transactionCycle?: string | null;
  transactionCycleId?: string | null;
  applicationType?: string | null;
  applicationTier?: string | null;
  architectureType?: string | null;
  installType?: string | null;
  housePosition?: string | null;
  productOwner?: string | null;
  productOwnerBrid?: string | null;
  systemArchitect?: string | null;
  systemArchitectBrid?: string | null;
  onboardingStatus?: string | null;
  ownerId?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  hasChildren?: boolean | null;
};

export type PortfolioKpis = {
  compliant: number;
  missingEvidence: number;
  pendingReview: number;
  riskBlocked: number;
};

export type EvidenceItem = {
  evidenceId: string;
  profileFieldId?: string;
  profileFieldKey?: string;
  uri: string;
  type?: string;
  sha256?: string;
  sourceSystem?: string;
  validFrom?: string | null;
  validUntil?: string | null;
  status?: 'approved' | 'pending' | 'submitted' | 'rejected' | 'revoked' | 'active';
};

export type Evidence = {
  evidenceId: string;
  profileFieldId?: string;
  uri: string;
  status: 'active' | 'superseded' | 'revoked';
  validFrom?: string | null;
  validUntil?: string | null;
  reviewedBy?: string | null;
  reviewedAt?: string | null;
};

export type PolicyRequirement = {
  ttl: string;
  label: string;
  value: string | number | boolean;
  refresh: string;
};

export type Risk = {
  riskId: string;
  title: string;
  severity: 'High' | 'Medium' | 'Low';
  status: 'Open' | 'Mitigated' | 'Closed';
};

export type ProfileField = {
  fieldKey: string;
  profileFieldId: string;
  label: string;
  policyRequirement: PolicyRequirement;
  evidence: Evidence[];
  assurance: 'Current' | 'Expiring' | 'Expired' | 'Missing';
  risks: Risk[];
};

export type ProfileDomain = {
  domainKey: string;
  title: string;
  icon: string;
  driverLabel: string;
  driverValue?: string;
  fields: ProfileField[];
};

export type ProfileResponse = {
  appId: string;
  name: string;
  version: number;
  updatedAt: string;
  domains: ProfileDomain[];
};

export type AppKpis = {
  compliant: number;
  missingEvidence: number;
  pendingReview: number;
  riskBlocked: number;
};

export type RequirementsResponse = any; // unchanged for now
export type ReleaseItem = any;          // unchanged for now
