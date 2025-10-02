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

// ============================================
// Risk Grouping by CIA+R+S (Grouped Risks)
// ============================================

export interface RiskCategory {
  riskCategoryId: string;
  appId: string;
  domain: string;                    // 'security_rating', 'confidentiality_rating', etc.
  domainTitle: string;                // 'Security', 'Confidentiality', etc.
  severity: RiskSeverity;             // Highest from children
  status: RiskStatus;                 // Rollup from children
  assignedSme?: string;
  riskItemCount: number;
  criticalCount: number;
  highCount: number;
  mediumCount: number;
  lowCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface RiskItem {
  riskItemId: string;
  riskCategoryId: string;
  appId: string;
  fieldKey: string;
  fieldLabel: string;
  profileFieldId?: string;
  title: string;
  hypothesis?: string;
  condition?: string;
  consequence?: string;
  severity: RiskSeverity;
  status: RiskStatus;
  assignedSme?: string;
  raisedBy: string;
  triggeringEvidenceId?: string;
  evidenceCount: number;
  evidenceIds?: string[];
  openedAt: string;
  assignedAt?: string;
  createdAt: string;
  updatedAt: string;
  policyRequirementSnapshot?: PolicyRequirementSnapshot;
  // Additional context
  domain?: string;
  domainTitle?: string;
}

export interface RiskCategoriesResponse {
  categories: RiskCategory[];
  summary: {
    totalCategories: number;
    totalRiskItems: number;
    criticalCount: number;
    highCount: number;
    mediumCount: number;
    lowCount: number;
  };
}

export interface RiskItemsResponse extends PaginatedResponse<RiskItem> {
  // Extends generic pagination with RiskItem type
}

export interface ReviewRiskItemPayload {
  action: 'approve' | 'reject' | 'request_info' | 'assign_other' | 'escalate' | 'approve_with_mitigation';
  comments: string;
  smeId: string;
  assignToSme?: string;              // For assign_other action
  mitigationPlan?: string;           // For approve_with_mitigation
}

export interface BulkReviewRiskItemsPayload {
  riskItemIds: string[];
  action: 'approve' | 'reject' | 'request_info';
  comments: string;
  smeId: string;
}

export interface ReviewRiskItemResponse {
  riskItemId: string;
  status: RiskStatus;
  reviewedBy: string;
  reviewedAt: string;
  jiraTicketId?: string;
  jiraTicketUrl?: string;
}

export interface BulkReviewRiskItemsResponse {
  successful: Array<{
    riskItemId: string;
    status: RiskStatus;
    jiraTicketId?: string;
  }>;
  failed: Array<{
    riskItemId: string;
    error: string;
  }>;
  summary: {
    total: number;
    successful: number;
    failed: number;
  };
}

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
export type EvidenceStateKey = 'compliant' | 'pendingReview' | 'missingEvidence' | 'riskBlocked';

export type EvidenceStateSlug = 'compliant' | 'pending-review' | 'missing-evidence' | 'risk-blocked';

// Pagination metadata returned by API
export interface PaginationMetadata {
  page: number;
  pageSize: number;
  total: number;
}

// Generic paginated response
export interface PaginatedResponse<T> extends PaginationMetadata {
  items: T[];
}

// Evidence search result with pagination
export interface EvidenceSearchResult extends PaginationMetadata {
  items: WorkbenchEvidenceItem[];
}

export interface EvidenceSearchParams {
  // Evidence state (new backend endpoints)
  state?: EvidenceStateKey;

  // Legacy status filters (kept for compatibility with existing UI components)
  status?: 'missing' | 'pending' | 'expired' | 'rejected' | 'approved' | 'compliant' | 'active' | 'revoked' | 'submitted' | 'risk_blocked';
  approvalStatus?: 'approved' | 'pending_review' | 'rejected' | 'no_evidence' | 'user_attested';
  freshnessStatus?: 'current' | 'expiring' | 'expired' | 'broken' | 'invalid_evidence';

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

  // People filters
  assignedReviewer?: string;
  submittedBy?: string;

  // Pagination
  limit?: number;
  offset?: number;
  page?: number;
  pageSize?: number; // Legacy - for internal use
  size?: number;     // API parameter name
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
  domainRating?: string;            // Domain rating value from API
  fieldKey: string;                 // "encryption_at_rest"
  fieldLabel: string;               // "Encryption at Rest"
  policyRequirement: string;        // "Required for A-rated apps"
  status: 'missing' | 'pending' | 'expired' | 'rejected' | 'approved' | 'compliant' | 'risk_blocked';
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
  linkStatus?: string;
  linkedBy?: string | null;
  linkedAt?: string | null;
  reviewedBy?: string | null;
  reviewComment?: string | null;
  documentTitle?: string | null;
  documentSourceType?: string | null;
  documentOwners?: string | null;
  documentLinkHealth?: number | null;
  trackId?: string | null;
  documentId?: string | null;
  docVersionId?: string | null;
  claimId?: string | null;
  validFrom?: string | null;
  validUntil?: string | null;
  productOwner?: string | null;
  riskId?: string;
  riskStatus?: string;
  assignedSme?: string | null;
}

export interface EnhancedEvidenceSummary {
  evidenceId: string;
  appId: string;
  profileFieldId: string;
  claimId: string | null;
  uri: string | null;
  type: string | null;
  status: string | null;
  submittedBy: string | null;
  validFrom: string | null;
  validUntil: string | null;
  trackId: string | null;
  documentId: string | null;
  docVersionId: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  linkStatus: string | null;
  linkedBy: string | null;
  linkedAt: string | null;
  reviewedBy: string | null;
  reviewedAt: string | null;
  reviewComment: string | null;
  documentTitle: string | null;
  documentSourceType: string | null;
  documentOwners: string | null;
  documentLinkHealth: number | null;
  fieldKey: string;
  productOwner: string | null;
  profileVersion?: number;
  appName?: string | null;
  domain?: string | null;
  domainTitle?: string | null;
  domainRating?: string | null;
  domainKey?: string | null;
  fieldLabel?: string | null;
  appCriticality?: 'A' | 'B' | 'C' | 'D' | null;
  applicationType?: string | null;
  architectureType?: string | null;
  installType?: string | null;
  applicationTier?: string | null;
  derivedFrom?: string | null;
  derived_from?: string | null;
}

export interface MissingEvidenceSummary {
  profile_field_id: string;
  field_key: string;
  app_id: string;
  app_name: string;
  product_owner: string | null;
  profile_id?: string;
  version?: number;
  domain?: string;
  domain_title?: string;
  domainRating?: string;
  domain_key?: string;
  field_label?: string;
  app_criticality?: 'A' | 'B' | 'C' | 'D';
  application_type?: string;
  architecture_type?: string;
  install_type?: string;
  application_tier?: string;
  derived_from?: string;
}

export interface RiskBlockedSummary {
  riskId: string;
  appId: string;
  fieldKey: string | null;
  riskStatus: string;
  assignedSme: string | null;
  createdAt: string;
  updatedAt: string;
  triggeringEvidenceId: string | null;
  title: string;
  hypothesis: string | null;
  appName: string;
  productOwner: string | null;
  applicationTier?: string;
  architectureType?: string;
  installType?: string;
  appCriticality?: 'A' | 'B' | 'C' | 'D';
  controlField?: string; // Same as fieldKey, appears in API
  derivedFrom?: string;
  domain?: string;
  domainRating?: string;
  // Legacy snake_case fields for backward compatibility
  risk_id?: string;
  app_id?: string;
  field_key?: string;
  risk_status?: string;
  assigned_sme?: string;
  created_at?: string;
  updated_at?: string;
  triggering_evidence_id?: string;
  app_name?: string;
  product_owner?: string;
  domain_title?: string;
  domain_key?: string;
  field_label?: string;
  application_type?: string;
  architecture_type?: string;
  install_type?: string;
  application_tier?: string;
  derived_from?: string;
}
