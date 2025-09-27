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

export type AppsWithKpis = {
  apps: AppSummary[];
  kpis: PortfolioKpis;
  totalCount: number;
  filteredCount: number;
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
  evidence_id: string;
  profile_field_id?: string;
  uri: string;
  status: 'active' | 'superseded' | 'revoked';
  valid_from?: string | null;
  valid_until?: string | null;
  reviewed_by?: string | null;
  reviewed_at?: string | null;
};

export type PolicyRequirement = {
  ttl: string;
  label: string;
  value: string | number | boolean;
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
  approvalStatus: 'approved' | 'pending_review' | 'rejected' | 'partially_approved' | 'user_attested' | 'no_evidence';
  freshnessStatus: 'current' | 'expiring' | 'expired' | 'broken' | 'invalid_evidence';
  risks: Risk[];
};

export type ProfileDomain = {
  domainKey: string;
  title: string;
  icon: string;
  driverLabel: string;
  driverValue?: string;
  bulkAttestationEnabled: boolean;
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

export type AttachDocumentResponse = {
  evidenceId: string;
  appId: string;
  profileFieldId: string;
  documentId: string;
  riskWasCreated: boolean;
  autoCreatedRiskId?: string;
  assignedSme?: string;
};

export type RiskStatus = 'open' | 'under_review' | 'pending_evidence' | 'resolved' | 'accepted' | 'rejected' | 'PENDING_SME_REVIEW' | 'SME_APPROVED' | 'SME_REJECTED';

export type RiskSeverity = 'low' | 'medium' | 'high' | 'critical';

export type RiskCreationType = 'MANUAL' | 'SYSTEM_AUTO_CREATION';

export type PolicyRequirementSnapshot = {
  fieldKey: string;
  activeRule: {
    ttl: string;
    label: string;
    value: string;
    requiresReview: boolean;
    // Dynamic rating fields based on the specific requirement type
    security_rating?: string;
    confidentiality_rating?: string;
    availability_rating?: string;
    integrity_rating?: string;
    resilience_rating?: string;
  };
  fieldLabel: string;
  snapshotTimestamp: number;
  complianceFrameworks: Array<{
    controls: string[];
    framework: string;
  }>;
};

export type RiskStory = {
  riskId: string;
  appId: string;
  fieldKey?: string;
  profileFieldId?: string;
  triggeringEvidenceId?: string;
  creationType: RiskCreationType;
  assignedSme?: string;
  title: string;
  hypothesis: string;
  condition: string;
  consequence: string;
  severity: RiskSeverity;
  status: RiskStatus;
  raisedBy: string;
  openedAt: string;
  assignedAt?: string;
  policyRequirementSnapshot?: PolicyRequirementSnapshot;
  createdAt: string;
  updatedAt: string;
  // Legacy fields for backward compatibility
  description?: string;
  createdBy?: string;
  evidenceCount?: number;
  lastReviewedAt?: string;
  lastReviewedBy?: string;
  resolution?: string;
  dueDate?: string;
};
export type BulkAttestationRequest = {
  fields: {
    profileFieldId: string;
    fieldKey: string;
  }[];
  attestationComments?: string;
  attestationType?: 'compliance' | 'exception' | 'remediation';
  attestedBy: string;
};

export type BulkAttestationResponse = {
  successful: {
    profileFieldId: string;
    fieldKey: string;
    attestationId: string;
  }[];
  failed: {
    profileFieldId: string;
    fieldKey: string;
    error: string;
  }[];
  summary: {
    total: number;
    successful: number;
    failed: number;
  };
};

export type AttestationRequest = {
  profileFieldId: string;
  evidenceId?: string;
  attestationType: 'compliance' | 'exception' | 'remediation';
  attestationComments?: string;
  attestedBy: string;
};

export type AttestationResponse = {
  attestationId: string;
  profileFieldId: string;
  status: 'success' | 'failed';
  message?: string;
  attestedAt: string;
};

export type ReleaseItem = any;          // unchanged for now

// Evidence search parameters for workbench
export interface EvidenceSearchParams {
  // Status filters
  status?: 'missing' | 'pending' | 'expired' | 'rejected' | 'approved' | 'compliant';
  freshnessStatus?: 'current' | 'expiring' | 'expired' | 'broken';
  approvalStatus?: 'approved' | 'pending_review' | 'rejected' | 'no_evidence' | 'user_attested';

  // App filters
  appId?: string;
  criticality?: 'A' | 'B' | 'C' | 'D';
  applicationType?: string;
  architectureType?: string;
  installType?: string;
  search?: string;

  // Field filters
  domain?: string;                    // "security", "integrity"
  fieldKey?: string;                  // "encryption_at_rest"

  // Time filters
  dueWithin?: string;                 // "7days", "30days"
  overdueSince?: string;              // "2024-01-01"

  // People filters
  assignedReviewer?: string;
  submittedBy?: string;

  // Pagination
  limit?: number;
  offset?: number;
}

// Enriched evidence item for workbench display
export interface WorkbenchEvidenceItem {
  evidenceId: string;
  appId: string;
  appName: string;
  appCriticality: 'A' | 'B' | 'C' | 'D';
  applicationType?: string;
  architectureType?: string;
  installType?: string;
  applicationTier?: string;
  domainTitle: string;              // "Security", "Integrity", "Availability"
  fieldKey: string;                 // "encryption_at_rest"
  fieldLabel: string;               // "Encryption at Rest"
  policyRequirement: string;        // "Required for A-rated apps"
  status: 'missing' | 'pending' | 'expired' | 'rejected' | 'approved' | 'compliant';
  approvalStatus: 'approved' | 'pending_review' | 'rejected' | 'no_evidence' | 'user_attested';
  freshnessStatus: 'current' | 'expiring' | 'expired' | 'broken';
  dueDate?: string;                 // When evidence is due
  submittedDate?: string;           // When submitted (for pending)
  reviewedDate?: string;            // When reviewed
  rejectionReason?: string;         // Why rejected
  assignedReviewer?: string;        // Who's reviewing
  submittedBy?: string;             // Who submitted
  daysOverdue?: number;             // How many days overdue
  riskCount?: number;               // Number of associated risks
  uri?: string;                     // Evidence URL/link
}
