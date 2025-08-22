export interface AppSummary {
  appId: string;
  name?: string;
  businessServiceName?: string;
  criticality?: string;
  parentAppId?: string | null;
}

export type EvidenceType = 'link' | 'file' | 'assertion';

export interface EvidenceItem {
  evidenceId: string;
  appId?: string;
  profileFieldKey?: string;
  type: EvidenceType;
  uri?: string | null;
  validFrom?: string;
  validUntil?: string | null;
  status?: string; // submitted|approved|rejected|expired
  submittedBy?: string;
}

export interface RequirementItem {
  fieldKey: string;
  label: string;
  status: 'missing' | 'met' | 'expiring' | 'rejected';
  reuseCandidate?: any;
}

export interface RequirementsResponse {
  requirements: RequirementItem[];
}

export interface ReleaseItem {
  releaseId: string;
  windowStart: string;
  windowEnd?: string | null;
  gateStatus: 'pass' | 'fail' | 'pending';
  missingCount: number;
  expiringCount: number;
}

export interface PortfolioKpis {
  compliant: number;
  missingEvidence: number;
  pendingReview: number;
  riskBlocked: number;
}
