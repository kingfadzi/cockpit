# SME Dashboard Implementation Plan

**Document Version**: 1.0
**Last Updated**: 2025-10-12
**Status**: Ready for Implementation
**Backend API**: Fully Available (Port 8181)

---

## Table of Contents

1. [Overview](#overview)
2. [Backend API Status](#backend-api-status)
3. [Implementation Phases](#implementation-phases)
4. [Phase 1: API Client Configuration](#phase-1-api-client-configuration)
5. [Phase 2: Pending Evidence Review](#phase-2-pending-evidence-review)
6. [Phase 3: ARB Dashboard](#phase-3-arb-dashboard)
7. [Phase 4: Enhanced Risk Management](#phase-4-enhanced-risk-management)
8. [Phase 5: Navigation & UX Polish](#phase-5-navigation--ux-polish)
9. [File Changes Summary](#file-changes-summary)
10. [Testing Strategy](#testing-strategy)
11. [Timeline & Milestones](#timeline--milestones)

---

## Overview

### Purpose
Implement a comprehensive SME (Subject Matter Expert) Dashboard that enables ARB members to:
1. Review and approve/reject evidence submissions
2. Monitor domain-level risk aggregations
3. Track individual risk items across applications
4. Collaborate via comments on risk items
5. View strategic ARB analytics and KPIs

### Key Features
- **Evidence Review Workflow**: Approve/reject evidence with automatic risk recalculation
- **ARB Dashboard**: Comprehensive analytics with overview, domain breakdown, top apps, distributions
- **Domain Risk Management**: Strategic view of aggregated risks by domain
- **Risk Item Tracking**: Individual risk monitoring with comments and status updates
- **Multi-ARB Support**: Security, Data, Operations, Enterprise Architecture

### Primary User Personas
- Security ARB members
- Data Architecture SMEs
- Operations/Service Transition SMEs
- Enterprise Architecture reviewers

---

## Backend API Status

### ✅ All APIs Ready and Available

**Base URL**: `http://localhost:8181` (Single service on port 8181)

**Key Endpoints Confirmed**:
- ✅ `GET /api/evidence/pending-sme-review` - Get pending evidence for SME
- ✅ `POST /api/evidence/{evidenceId}/review` - Approve/reject evidence
- ✅ `GET /api/evidence/search` - Advanced evidence search
- ✅ `GET /api/v1/domain-risks/arb/{arbName}` - Get domain risks for ARB
- ✅ `GET /api/v1/domain-risks/arb/{arbName}/dashboard` - Comprehensive dashboard (RECOMMENDED)
- ✅ `GET /api/v1/domain-risks/{domainRiskId}/items` - Get risk items for domain
- ✅ `POST /api/v1/risk-items/{riskItemId}/comments` - Add comments
- ✅ `GET /api/v1/risk-items/{riskItemId}/comments` - Get comments
- ✅ `PATCH /api/v1/risk-items/{riskItemId}/status` - Update risk status

**ARB Names** (Short Format):
- `security` - Security domain
- `data` - Confidentiality & Integrity domains
- `operations` - Availability & Resilience domains
- `enterprise_architecture` - Governance & Architecture

**Priority Score Multipliers**:
- `approved`: 0.5x (50% reduction - e.g., 100 → 50)
- `rejected`: 0.9x (10% reduction)
- `submitted`: 1.0x (full priority)

**Reference Documentation**:
- `SME_DASHBOARD_SPEC.md` - Frontend specification
- `RISK_AGGREGATION_API.md` - Backend API documentation

---

## Implementation Phases

### Phase Overview

| Phase | Focus Area | Duration | Priority |
|-------|------------|----------|----------|
| 1 | API Client Configuration | 1 day | HIGH |
| 2 | Pending Evidence Review | 3-4 days | HIGH |
| 3 | ARB Dashboard | 3-4 days | HIGH |
| 4 | Enhanced Risk Management | 2-3 days | MEDIUM |
| 5 | Navigation & UX Polish | 1-2 days | MEDIUM |

**Total Estimated Time**: ~3 weeks

---

## Phase 1: API Client Configuration

**Duration**: 1 day
**Status**: Not Started
**Priority**: HIGH (Foundation for all other work)

### Objectives
- Configure API base URL
- Add new endpoint functions to client.ts
- Define TypeScript types for new data structures
- Create React Query hooks for data fetching

### Tasks

#### 1.1 Update Base URL Configuration

**File**: `src/api/client.ts` (lines 31-32)

**Change**:
```typescript
// Ensure single base URL for all endpoints
export const API_BASE = 'http://localhost:8181';
```

**Verification**: All API calls should use port 8181

---

#### 1.2 Add Evidence Review Endpoints

**File**: `src/api/client.ts` (add to `endpoints` object after line 549)

**New Functions**:
```typescript
// Evidence Review Endpoints (SME Dashboard)
getPendingSmeEvidence: async (smeEmail: string, page?: number, size?: number) => {
  const params: Record<string, string | number> = { assignedSme: smeEmail };
  if (page !== undefined) params.page = page;
  if (size !== undefined) params.size = size;

  return USE_MOCK
    ? mockApi.getPendingSmeEvidence(smeEmail)
    : (await api.get<PendingEvidenceItem[]>('/api/evidence/pending-sme-review', { params })).data;
},

reviewEvidence: async (
  evidenceId: string,
  profileFieldId: string,
  payload: EvidenceReviewRequest
) => {
  if (USE_MOCK) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      evidenceId,
      profileFieldId,
      linkStatus: payload.action === 'approve' ? 'APPROVED' : 'REJECTED',
      reviewedBy: payload.reviewerId,
      reviewedAt: new Date().toISOString(),
      reviewComment: payload.reviewComment
    };
  }

  return (await api.post<EvidenceReviewResponse>(
    `/api/evidence/${evidenceId}/review?profileFieldId=${profileFieldId}`,
    payload
  )).data;
},

searchEvidence: async (params: EvidenceSearchParams) => {
  return USE_MOCK
    ? mockApi.searchEvidence(params)
    : (await api.get<unknown>('/api/evidence/search', { params })).data;
},
```

---

#### 1.3 Add Domain Risk Endpoints

**File**: `src/api/client.ts` (continue in `endpoints` object)

**New Functions**:
```typescript
// Domain Risk Endpoints (ARB Dashboard)
getDomainRisksForArb: async (arbName: string, status?: string) => {
  const params = status ? { status } : {};

  return USE_MOCK
    ? mockApi.getDomainRisksForArb(arbName, status)
    : (await api.get<DomainRiskResponse[]>(`/api/v1/domain-risks/arb/${arbName}`, { params })).data;
},

getArbDashboard: async (arbName: string, status?: string) => {
  const params = status ? { status } : {};

  return USE_MOCK
    ? mockApi.getArbDashboard(arbName)
    : (await api.get<ArbDashboardResponse>(`/api/v1/domain-risks/arb/${arbName}/dashboard`, { params })).data;
},

getArbSummary: async (arbName: string, status?: string) => {
  const params = status ? { status } : {};

  return USE_MOCK
    ? mockApi.getArbSummary(arbName)
    : (await api.get<DomainSummaryResponse[]>(`/api/v1/domain-risks/arb/${arbName}/summary`, { params })).data;
},

getDomainRiskById: async (domainRiskId: string) => {
  return USE_MOCK
    ? mockApi.getDomainRiskById(domainRiskId)
    : (await api.get<DomainRiskResponse>(`/api/v1/domain-risks/${domainRiskId}`)).data;
},

getDomainRiskItems: async (domainRiskId: string) => {
  return USE_MOCK
    ? mockApi.getDomainRiskItems(domainRiskId)
    : (await api.get<RiskItemResponse[]>(`/api/v1/domain-risks/${domainRiskId}/items`)).data;
},

getDomainRisksForApp: async (appId: string) => {
  return USE_MOCK
    ? mockApi.getDomainRisksForApp(appId)
    : (await api.get<DomainRiskResponse[]>(`/api/v1/domain-risks/app/${appId}`)).data;
},
```

---

#### 1.4 Add Risk Item Comment Endpoints

**File**: `src/api/client.ts` (continue in `endpoints` object)

**New Functions**:
```typescript
// Risk Item Comment Endpoints
getRiskItemComments: async (riskItemId: string, includeInternal?: boolean) => {
  const params = includeInternal ? { includeInternal: 'true' } : {};

  return USE_MOCK
    ? mockApi.getRiskItemComments(riskItemId, includeInternal)
    : (await api.get<RiskComment[]>(`/api/v1/risk-items/${riskItemId}/comments`, { params })).data;
},

addRiskItemComment: async (riskItemId: string, payload: RiskCommentRequest) => {
  return USE_MOCK
    ? mockApi.addRiskItemComment(riskItemId, payload)
    : (await api.post<RiskComment>(`/api/v1/risk-items/${riskItemId}/comments`, payload)).data;
},

updateRiskItemStatus: async (riskItemId: string, payload: RiskStatusUpdateRequest) => {
  return USE_MOCK
    ? mockApi.updateRiskItemStatus(riskItemId, payload)
    : (await api.patch<RiskItemResponse>(`/api/v1/risk-items/${riskItemId}/status`, payload)).data;
},
```

---

#### 1.5 Add TypeScript Types

**File**: `src/api/types.ts` (add after line 485)

**New Types**:
```typescript
// ==========================================
// SME Dashboard Types
// ==========================================

// Evidence Review Types
export interface PendingEvidenceItem {
  evidenceId: string;
  appId: string;
  appName?: string;
  profileFieldId: string;
  fieldKey: string;
  fieldLabel: string;
  uri?: string;
  type?: string;
  documentTitle?: string;
  linkStatus: 'PENDING_SME_REVIEW' | 'APPROVED' | 'REJECTED';
  submittedBy?: string;
  linkedAt: string;
  linkedBy?: string;
  validFrom?: string;
  validUntil?: string;
  priority?: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  domain?: string;
  criticality?: string;
}

export interface EvidenceReviewRequest {
  action: 'approve' | 'reject';
  reviewerId: string;
  reviewComment?: string;
}

export interface EvidenceReviewResponse {
  evidenceId: string;
  profileFieldId: string;
  linkStatus: 'APPROVED' | 'REJECTED';
  linkedBy?: string;
  linkedAt: string;
  reviewedBy: string;
  reviewedAt: string;
  reviewComment?: string;
}

export interface EvidenceSearchParams {
  linkStatus?: 'PENDING_SME_REVIEW' | 'APPROVED' | 'REJECTED';
  appId?: string;
  fieldKey?: string;
  assignedSme?: string;
  criticality?: string;
  domain?: string;
  search?: string;
  enhanced?: boolean;
  page?: number;
  size?: number;
}

// Domain Risk Types
export interface DomainRiskResponse {
  domainRiskId: string;
  appId: string;
  domain: string;
  derivedFrom?: string;
  arb: string;
  title: string;
  description?: string;
  totalItems: number;
  openItems: number;
  highPriorityItems: number;
  overallPriority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  overallSeverity: 'critical' | 'high' | 'medium' | 'low';
  priorityScore: number;
  status: DomainRiskStatus;
  assignedArb: string;
  assignedAt?: string;
  openedAt: string;
  closedAt?: string;
  lastItemAddedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export type DomainRiskStatus =
  | 'PENDING_ARB_REVIEW'
  | 'UNDER_ARB_REVIEW'
  | 'AWAITING_REMEDIATION'
  | 'IN_PROGRESS'
  | 'RESOLVED'
  | 'WAIVED'
  | 'CLOSED';

export interface DomainSummaryResponse {
  domain: string;
  count: number;
  totalOpenItems: number;
  avgPriorityScore: number;
}

export interface ArbDashboardResponse {
  arbName: string;
  overview: {
    totalDomainRisks: number;
    totalOpenItems: number;
    criticalCount: number;
    highCount: number;
    averagePriorityScore: number;
    needsImmediateAttention: number;
  };
  domains: Array<{
    domain: string;
    riskCount: number;
    openItems: number;
    criticalItems: number;
    avgPriorityScore: number;
    topPriorityStatus: string;
  }>;
  topApplications: Array<{
    appId: string;
    appName?: string;
    domainRiskCount: number;
    totalOpenItems: number;
    highestPriorityScore: number;
    criticalDomain: string;
  }>;
  statusDistribution: Record<string, number>;
  priorityDistribution: Record<string, number>;
  recentActivity: {
    newRisksLast7Days: number;
    newRisksLast30Days: number;
    resolvedLast7Days: number;
    resolvedLast30Days: number;
  };
}

// Risk Item Types (Enhanced from existing)
export interface RiskItemResponse {
  riskItemId: string;
  domainRiskId: string;
  appId: string;
  fieldKey?: string;
  profileFieldId?: string;
  triggeringEvidenceId?: string;
  trackId?: string;
  title: string;
  description?: string;
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  severity: 'critical' | 'high' | 'medium' | 'low';
  priorityScore: number;
  evidenceStatus?: string;
  status: RiskItemStatus;
  resolution?: string;
  resolutionComment?: string;
  creationType: 'SYSTEM_AUTO_CREATION' | 'MANUAL_CREATION' | 'MANUAL_SME_INITIATED' | 'AUTO';
  raisedBy: string;
  openedAt: string;
  resolvedAt?: string;
  policyRequirementSnapshot?: PolicyRequirementSnapshot;
  createdAt: string;
  updatedAt: string;
}

export type RiskItemStatus =
  | 'OPEN'
  | 'IN_PROGRESS'
  | 'RESOLVED'
  | 'WAIVED'
  | 'CLOSED';

export interface RiskStatusUpdateRequest {
  status: RiskItemStatus;
  resolution?: string;
  resolutionComment?: string;
}

// Risk Comment Types
export interface RiskComment {
  commentId: string;
  riskItemId: string;
  commentType: RiskCommentType;
  commentText: string;
  commentedBy: string;
  commentedAt: string;
  isInternal: boolean;
  createdAt: string;
  updatedAt: string;
}

export type RiskCommentType =
  | 'GENERAL'
  | 'REVIEW'
  | 'STATUS_CHANGE'
  | 'RESOLUTION';

export interface RiskCommentRequest {
  commentType: RiskCommentType;
  commentText: string;
  commentedBy: string;
  isInternal?: boolean;
}
```

---

#### 1.6 Add React Query Hooks

**File**: `src/api/hooks.ts` (add after line 372)

**New Hooks**:
```typescript
// ==========================================
// SME Dashboard Hooks
// ==========================================

// Evidence Review Hooks
export const usePendingSmeEvidence = (smeEmail: string, page?: number, size?: number) =>
  useQuery<PendingEvidenceItem[]>({
    queryKey: ['sme', 'pending-evidence', smeEmail, page, size],
    queryFn: () => endpoints.getPendingSmeEvidence(smeEmail, page, size),
    enabled: !!smeEmail,
    ...commonQuery
  });

export const useReviewEvidence = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ evidenceId, profileFieldId, payload }: {
      evidenceId: string;
      profileFieldId: string;
      payload: EvidenceReviewRequest;
    }) => endpoints.reviewEvidence(evidenceId, profileFieldId, payload),
    onSuccess: () => {
      // Invalidate all related queries
      qc.invalidateQueries({ queryKey: ['sme', 'pending-evidence'] });
      qc.invalidateQueries({ queryKey: ['sme', 'domain-risks'] });
      qc.invalidateQueries({ queryKey: ['sme', 'arb-dashboard'] });
      qc.invalidateQueries({ queryKey: ['risks'] });
      qc.invalidateQueries({ queryKey: ['profile'] });
    },
  });
};

export const useSearchEvidence = (params: EvidenceSearchParams) =>
  useQuery<unknown>({
    queryKey: ['sme', 'evidence-search', params],
    queryFn: () => endpoints.searchEvidence(params),
    enabled: !!params,
    ...commonQuery
  });

// Domain Risk Hooks
export const useDomainRisksForArb = (arbName: string, status?: string) =>
  useQuery<DomainRiskResponse[]>({
    queryKey: ['sme', 'domain-risks', arbName, status],
    queryFn: () => endpoints.getDomainRisksForArb(arbName, status),
    enabled: !!arbName,
    ...commonQuery
  });

export const useArbDashboard = (arbName: string, status?: string) =>
  useQuery<ArbDashboardResponse>({
    queryKey: ['sme', 'arb-dashboard', arbName, status],
    queryFn: () => endpoints.getArbDashboard(arbName, status),
    enabled: !!arbName,
    ...commonQuery
  });

export const useArbSummary = (arbName: string, status?: string) =>
  useQuery<DomainSummaryResponse[]>({
    queryKey: ['sme', 'arb-summary', arbName, status],
    queryFn: () => endpoints.getArbSummary(arbName, status),
    enabled: !!arbName,
    ...commonQuery
  });

export const useDomainRisk = (domainRiskId: string) =>
  useQuery<DomainRiskResponse>({
    queryKey: ['sme', 'domain-risk', domainRiskId],
    queryFn: () => endpoints.getDomainRiskById(domainRiskId),
    enabled: !!domainRiskId,
    ...commonQuery
  });

export const useDomainRiskItems = (domainRiskId: string) =>
  useQuery<RiskItemResponse[]>({
    queryKey: ['sme', 'domain-risk-items', domainRiskId],
    queryFn: () => endpoints.getDomainRiskItems(domainRiskId),
    enabled: !!domainRiskId,
    ...commonQuery
  });

export const useDomainRisksForApp = (appId: string) =>
  useQuery<DomainRiskResponse[]>({
    queryKey: ['sme', 'domain-risks-app', appId],
    queryFn: () => endpoints.getDomainRisksForApp(appId),
    enabled: !!appId,
    ...commonQuery
  });

// Risk Comment Hooks
export const useRiskComments = (riskItemId: string, includeInternal?: boolean) =>
  useQuery<RiskComment[]>({
    queryKey: ['risk-comments', riskItemId, includeInternal],
    queryFn: () => endpoints.getRiskItemComments(riskItemId, includeInternal),
    enabled: !!riskItemId,
    ...commonQuery
  });

export const useAddRiskComment = (riskItemId: string) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: RiskCommentRequest) =>
      endpoints.addRiskItemComment(riskItemId, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['risk-comments', riskItemId] });
    },
  });
};

export const useUpdateRiskStatus = (riskItemId: string) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: RiskStatusUpdateRequest) =>
      endpoints.updateRiskItemStatus(riskItemId, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['risks'] });
      qc.invalidateQueries({ queryKey: ['sme', 'domain-risks'] });
      qc.invalidateQueries({ queryKey: ['sme', 'arb-dashboard'] });
    },
  });
};
```

---

#### 1.7 Create Mock Data (Optional for Development)

**File**: `src/api/mock.ts` (extend existing mockApi)

Add mock implementations for new endpoints if USE_MOCK=1 is needed during development.

---

### Phase 1 Checklist

- [ ] Update API_BASE to port 8181
- [ ] Add evidence review endpoints (getPendingSmeEvidence, reviewEvidence, searchEvidence)
- [ ] Add domain risk endpoints (getDomainRisksForArb, getArbDashboard, etc.)
- [ ] Add risk comment endpoints (getRiskItemComments, addRiskItemComment, updateRiskItemStatus)
- [ ] Add TypeScript types for all new data structures
- [ ] Add React Query hooks for all new endpoints
- [ ] Test API calls with Insomnia/Postman
- [ ] Verify mock data works if USE_MOCK=1

---

## Phase 2: Pending Evidence Review

**Duration**: 3-4 days
**Status**: Not Started
**Priority**: HIGH (Core SME workflow)

### Objectives
- Implement evidence review workflow (approve/reject)
- Display pending evidence submissions in table
- Show evidence details in modal
- Handle approval/rejection with priority score impact

### Tasks

#### 2.1 Create PendingEvidenceView Component

**File**: `src/features/sme/views/PendingEvidenceView.tsx` (NEW)

**Component Structure**:
```tsx
interface PendingEvidenceViewProps {
  smeId: string;
  arbName: string;
}

export default function PendingEvidenceView({ smeId, arbName }: PendingEvidenceViewProps) {
  const { data: pendingEvidence = [], isLoading } = usePendingSmeEvidence(smeId);
  const [selectedEvidence, setSelectedEvidence] = useState<PendingEvidenceItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Filtering, sorting, pagination state
  const [search, setSearch] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [page, setPage] = useState(1);
  const pageSize = 20;

  // ... implementation
}
```

**Features**:
- Table with columns: App, Field, Evidence Type, Submitted By, Date, Priority, Actions
- Sort by: linkedAt (newest first), priority (critical first)
- Filters:
  - Text search (app name, field label)
  - Priority (CRITICAL, HIGH, MEDIUM, LOW)
  - Date range
  - Field key dropdown
- Actions:
  - Click row → Open EvidenceReviewModal
  - Approve/Reject quick actions
- Pagination (20 items per page)
- Loading states, error handling
- Empty state when no pending reviews

**UI Components**:
- Use MUI Table, TableContainer, TableHead, TableRow, TableCell
- Priority badge with color coding (red=CRITICAL, orange=HIGH, yellow=MEDIUM, blue=LOW)
- Date formatting with relative time (e.g., "2 hours ago")
- Search bar with debounce
- Filter chips

**Reference**: SME_DASHBOARD_SPEC.md section 1.1 (lines 93-139)

---

#### 2.2 Create EvidenceReviewModal Component

**File**: `src/features/sme/components/EvidenceReviewModal.tsx` (NEW)

**Component Structure**:
```tsx
interface EvidenceReviewModalProps {
  open: boolean;
  onClose: () => void;
  evidence: PendingEvidenceItem | null;
  smeId: string;
}

export default function EvidenceReviewModal({
  open,
  onClose,
  evidence,
  smeId
}: EvidenceReviewModalProps) {
  const reviewMutation = useReviewEvidence();
  const [action, setAction] = useState<'approve' | 'reject'>('approve');
  const [comment, setComment] = useState('');

  // ... implementation
}
```

**Features**:
- Display evidence details:
  - Document title, URI
  - Field label, field key
  - Domain, criticality
  - Submitted by, linked at
  - Valid from/until dates
- Show policy requirement context
- Approve/Reject form:
  - Action selection (radio buttons)
  - Comment text area (required for reject, optional for approve)
  - Submit button
- Show priority score impact:
  - Before: "Current priority score: 100 (CRITICAL)"
  - After (approve): "New priority score: 50 (MEDIUM) ↓50%"
  - After (reject): "New priority score: 90 (HIGH) ↓10%"
- Success/error messages with snackbar
- Optimistic UI updates
- Loading state during submission

**UI Components**:
- MUI Dialog, DialogTitle, DialogContent, DialogActions
- FormControl, RadioGroup, Radio, TextField
- Alert for success/error messages
- Chip for status badges
- Link button to view evidence URI

**Reference**: SME_DASHBOARD_SPEC.md sections 1.2-1.3 (lines 143-217)

---

#### 2.3 Update SecuritySmeView

**File**: `src/features/sme/views/SecuritySmeView.tsx`

**Changes**:
1. Replace "My Review Queue" section with PendingEvidenceView component
2. Add tab navigation:
   - Tab 1: "Pending Reviews" (PendingEvidenceView)
   - Tab 2: "Domain Risks" (existing domain risks table)
   - Tab 3: "All Open Risks" (existing all risks table)
3. Show badge counts on tabs (e.g., "Pending Reviews (5)")
4. Remove mock data imports
5. Use real API hooks

**Example**:
```tsx
const [currentTab, setCurrentTab] = useState(0);

// Tab panel structure
<Tabs value={currentTab} onChange={(e, val) => setCurrentTab(val)}>
  <Tab label={`Pending Reviews (${pendingCount})`} />
  <Tab label={`Domain Risks (${domainRiskCount})`} />
  <Tab label={`All Open Risks (${allRisksCount})`} />
</Tabs>

{currentTab === 0 && <PendingEvidenceView smeId={smeId} arbName="security" />}
{currentTab === 1 && <DomainRisksSection />}
{currentTab === 2 && <AllRisksSection />}
```

---

### Phase 2 Checklist

- [ ] Create PendingEvidenceView component with table layout
- [ ] Add filtering, sorting, pagination to PendingEvidenceView
- [ ] Create EvidenceReviewModal component
- [ ] Implement approve/reject form with validation
- [ ] Show priority score impact in modal
- [ ] Add success/error handling with snackbar
- [ ] Update SecuritySmeView with tab navigation
- [ ] Replace mock data with real API calls
- [ ] Test approve flow end-to-end
- [ ] Test reject flow end-to-end
- [ ] Verify priority score recalculation
- [ ] Handle edge cases (network errors, validation errors)

---

## Phase 3: ARB Dashboard

**Duration**: 3-4 days
**Status**: Not Started
**Priority**: HIGH (Strategic view)

### Objectives
- Implement comprehensive ARB dashboard with KPIs
- Show domain risk aggregations
- Display top applications
- Visualize status and priority distributions
- Track recent activity

### Tasks

#### 3.1 Create ArbDashboardView Component

**File**: `src/features/sme/views/ArbDashboardView.tsx` (NEW)

**Component Structure**:
```tsx
interface ArbDashboardViewProps {
  arbName: string;
}

export default function ArbDashboardView({ arbName }: ArbDashboardViewProps) {
  const { data: dashboard, isLoading, error } = useArbDashboard(arbName);

  // ... implementation
}
```

**Layout** (Based on SME_DASHBOARD_SPEC.md lines 632-654):
```
┌────────────────────────────────────────────────┐
│  Security ARB Dashboard                        │
├────────────────────────────────────────────────┤
│  Overview KPI Tiles (4 tiles)                  │
│  [Total: X] [Open: Y] [Critical: Z] [Avg: N]  │
├────────────────────────────────────────────────┤
│  Domain Breakdown (cards in grid)              │
│  Security | Confidentiality | Integrity        │
├────────────────────────────────────────────────┤
│  Top Applications (table)                      │
│  Apps with highest risk scores                 │
├────────────────────────────────────────────────┤
│  Status & Priority Distribution (charts)       │
│  [Status Donut] [Priority Bar Chart]          │
├────────────────────────────────────────────────┤
│  Recent Activity (metrics)                     │
│  +X new (7d) | Y resolved (7d)                │
└────────────────────────────────────────────────┘
```

**Sections**:

1. **Overview KPI Tiles** (4 cards)
   - Total Domain Risks
   - Total Open Items
   - Critical Count
   - Average Priority Score
   - Use MUI Card with gradient backgrounds

2. **Domain Breakdown** (Grid of cards)
   - One card per domain
   - Show: domain name, risk count, open items, avg score
   - Color-code by priority score
   - Click to drill down

3. **Top Applications** (Table)
   - Columns: App ID, App Name, Risk Count, Open Items, Highest Score, Critical Domain
   - Sort by highest priority score
   - Limit to top 10

4. **Status Distribution** (Donut/Pie Chart)
   - PENDING_ARB_REVIEW, UNDER_ARB_REVIEW, IN_PROGRESS, etc.
   - Use Recharts or Chart.js

5. **Priority Distribution** (Bar Chart)
   - Critical, High, Medium, Low
   - Horizontal or vertical bars

6. **Recent Activity** (Metric cards)
   - New risks (7d, 30d)
   - Resolved risks (7d, 30d)
   - Sparkline trend (optional)

**UI Libraries**:
- MUI for layout and components
- Recharts or Chart.js for visualizations
- Consider using react-chartjs-2 or recharts

**Reference**: SME_DASHBOARD_SPEC.md section 3.3 (lines 560-654)

---

#### 3.2 Create DomainRiskListView Component

**File**: `src/features/sme/views/DomainRiskListView.tsx` (NEW)

**Component Structure**:
```tsx
interface DomainRiskListViewProps {
  arbName: string;
}

export default function DomainRiskListView({ arbName }: DomainRiskListViewProps) {
  const [statusFilter, setStatusFilter] = useState<string>('PENDING_ARB_REVIEW,UNDER_ARB_REVIEW');
  const { data: domainRisks = [], isLoading } = useDomainRisksForArb(arbName, statusFilter);
  const [selectedRisk, setSelectedRisk] = useState<DomainRiskResponse | null>(null);

  // ... implementation
}
```

**Features**:
- Card-based layout (grid of domain risk cards)
- Each card shows:
  - App ID/Name
  - Domain (with icon)
  - Total items, open items, high priority items
  - Priority score with progress bar
  - Status badge
  - Overall priority/severity
  - Last updated timestamp
- Filter by status (chips):
  - All
  - Pending ARB Review
  - Under Review
  - In Progress
  - Resolved
- Sort options:
  - Priority score (highest first)
  - Last updated (newest first)
  - App name (alphabetical)
- Color coding by priority score:
  - 90-100: Red (CRITICAL)
  - 70-89: Orange (HIGH)
  - 40-69: Yellow (MEDIUM)
  - 0-39: Blue (LOW)
- Click card → Navigate to DomainRiskDetailView or expand inline

**Reference**: SME_DASHBOARD_SPEC.md section 3.1 (lines 455-511)

---

#### 3.3 Create DomainRiskDetailView Component

**File**: `src/features/sme/components/DomainRiskDetailView.tsx` (NEW)

**Component Structure**:
```tsx
interface DomainRiskDetailViewProps {
  domainRiskId: string;
  onClose: () => void;
}

export default function DomainRiskDetailView({ domainRiskId, onClose }: DomainRiskDetailViewProps) {
  const { data: domainRisk } = useDomainRisk(domainRiskId);
  const { data: riskItems = [] } = useDomainRiskItems(domainRiskId);

  // ... implementation
}
```

**Features**:
- Show domain risk summary:
  - Title, description
  - Metrics (total items, open items, high priority items)
  - Priority score, status
  - Assigned ARB, dates
- Display all risk items for this domain risk:
  - Table or card grid
  - Columns: App, Field, Priority Score, Severity, Status, Opened At
  - Sort by priority score (highest first)
  - Click risk item → Open RiskStoryModal
- Breadcrumb navigation:
  - "Security ARB > Security Domain > Risk Items"
- Group by options:
  - By app
  - By field
  - By status
- Filters:
  - Status
  - Priority
  - Field key

**Reference**: SME_DASHBOARD_SPEC.md section 3.4 (lines 658-675)

---

#### 3.4 Add Charts/Visualizations

**Chart Library Setup**:

Option A - Recharts (Recommended):
```bash
npm install recharts
```

Option B - Chart.js:
```bash
npm install chart.js react-chartjs-2
```

**Chart Components**:
1. Status Distribution Donut Chart
2. Priority Distribution Bar Chart
3. Domain Comparison Chart
4. Trend Lines (time-series)

---

### Phase 3 Checklist

- [ ] Install chart library (Recharts or Chart.js)
- [ ] Create ArbDashboardView component
- [ ] Implement Overview KPI tiles
- [ ] Add Domain Breakdown cards
- [ ] Create Top Applications table
- [ ] Add Status Distribution chart
- [ ] Add Priority Distribution chart
- [ ] Implement Recent Activity section
- [ ] Create DomainRiskListView component
- [ ] Add filtering and sorting to DomainRiskListView
- [ ] Create DomainRiskDetailView component
- [ ] Add breadcrumb navigation
- [ ] Implement group by functionality
- [ ] Test all visualizations
- [ ] Verify data updates on filter changes
- [ ] Handle loading and error states

---

## Phase 4: Enhanced Risk Management

**Duration**: 2-3 days
**Status**: Not Started
**Priority**: MEDIUM (Collaboration features)

### Objectives
- Add comments functionality to risk items
- Display comment threads chronologically
- Support internal/external comment visibility
- Enable rich text formatting

### Tasks

#### 4.1 Update RiskStoryModal

**File**: `src/features/sme/components/RiskStoryModal.tsx`

**Changes**:
1. Add comments section at bottom of modal
2. Use `useRiskComments(riskId, includeInternal)` hook
3. Display comments chronologically
4. Add "Add Comment" form
5. Show internal/external toggle
6. Display comment type badges

**New Sections**:
```tsx
// Inside RiskStoryModal component
const { data: comments = [] } = useRiskComments(risk?.riskId, true);
const addCommentMutation = useAddRiskComment(risk?.riskId);

// Add to modal content
<Divider sx={{ my: 3 }} />
<Typography variant="h6">Discussion</Typography>
<RiskCommentsPanel
  comments={comments}
  onAddComment={handleAddComment}
  currentUser={smeId}
/>
```

---

#### 4.2 Create RiskCommentsPanel Component

**File**: `src/features/sme/components/RiskCommentsPanel.tsx` (NEW)

**Component Structure**:
```tsx
interface RiskCommentsPanelProps {
  comments: RiskComment[];
  onAddComment: (comment: RiskCommentRequest) => void;
  currentUser: string;
  riskItemId: string;
}

export default function RiskCommentsPanel({
  comments,
  onAddComment,
  currentUser,
  riskItemId
}: RiskCommentsPanelProps) {
  const [commentText, setCommentText] = useState('');
  const [commentType, setCommentType] = useState<RiskCommentType>('GENERAL');
  const [isInternal, setIsInternal] = useState(false);
  const [showInternal, setShowInternal] = useState(true);

  // ... implementation
}
```

**Features**:
- **Comment Timeline**:
  - Chronological display (oldest to newest)
  - Avatar/initials for each commenter
  - Timestamp with relative time
  - Comment type badge (GENERAL, REVIEW, STATUS_CHANGE, RESOLUTION)
  - Internal flag indicator
  - Markdown rendering support
- **Filter Toggle**:
  - Show/Hide internal comments
  - Default: show all for SME users
- **Add Comment Form**:
  - Comment type selector (dropdown)
  - Text area with character limit
  - Internal toggle checkbox
  - Submit button
  - Cancel button
- **UI Enhancements**:
  - Alternating background colors for readability
  - Collapse/expand long comments
  - Link detection in comment text
  - Quote previous comment (optional)

**UI Components**:
- MUI Timeline or custom layout
- Avatar for user icons
- Chip for comment type badges
- TextField multiline for input
- Checkbox for internal toggle
- Button for submit

**Reference**: SME_DASHBOARD_SPEC.md sections 2.6-2.7 (lines 386-450)

---

#### 4.3 Add Rich Text Support (Optional)

**Libraries**:
- react-markdown for markdown rendering
- remark-gfm for GitHub Flavored Markdown

```bash
npm install react-markdown remark-gfm
```

**Usage**:
```tsx
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

<ReactMarkdown remarkPlugins={[remarkGfm]}>
  {comment.commentText}
</ReactMarkdown>
```

---

### Phase 4 Checklist

- [ ] Update RiskStoryModal to include comments section
- [ ] Create RiskCommentsPanel component
- [ ] Implement comment timeline with avatars
- [ ] Add comment type badges
- [ ] Implement internal/external toggle
- [ ] Create "Add Comment" form
- [ ] Add form validation
- [ ] Install and configure markdown rendering (optional)
- [ ] Test comment submission
- [ ] Test internal comment visibility
- [ ] Verify real-time comment updates
- [ ] Handle long comments with collapse/expand
- [ ] Add timestamp formatting

---

## Phase 5: Navigation & UX Polish

**Duration**: 1-2 days
**Status**: Not Started
**Priority**: MEDIUM (User experience)

### Objectives
- Update navigation structure
- Add ARB-specific routes
- Show pending review counts
- Improve overall UX

### Tasks

#### 5.1 Update SMEHome

**File**: `src/features/sme/SMEHome.tsx`

**Changes**:
1. Add ARB selection instead of just domain selection
2. Map ARB names to routes:
   - `security` → `/sme/security`
   - `data` → `/sme/data`
   - `operations` → `/sme/operations`
   - `enterprise_architecture` → `/sme/enterprise-architecture`
3. Show pending review counts per ARB
4. Display quick stats from dashboard:
   - Total domain risks
   - Open items
   - Critical count
5. Add recent activity indicator

**Example**:
```tsx
const arbs = [
  {
    key: 'security',
    title: 'Security ARB',
    description: 'Review security controls, encryption, testing',
    icon: <SecurityIcon />,
    color: 'error.main',
    path: '/sme/security',
    pendingCount: 12, // from API
  },
  // ... other ARBs
];

// Fetch counts in parallel
const { data: securityDashboard } = useArbDashboard('security');
const { data: dataDashboard } = useArbDashboard('data');
// ...
```

---

#### 5.2 Update Routes

**File**: `src/app/routes.tsx`

**Add New Routes**:
```typescript
// ARB-specific routes
{ path: 'sme/:arbName', element: <ArbHomeView /> },
{ path: 'sme/:arbName/dashboard', element: <ArbDashboardView /> },
{ path: 'sme/:arbName/pending-reviews', element: <PendingEvidenceView /> },
{ path: 'sme/:arbName/domain-risks', element: <DomainRiskListView /> },
{ path: 'sme/:arbName/domain-risks/:domainRiskId', element: <DomainRiskDetailView /> },
```

**Create ArbHomeView** (Optional):
Wrapper component that reads `arbName` from route params and displays appropriate dashboard.

---

#### 5.3 Add Top-Level Navigation

**File**: `src/features/sme/views/SecuritySmeView.tsx` or create new shared layout

**Tab Structure** (Based on spec):
```tsx
const tabs = [
  { label: 'Pending Reviews', value: 'pending', badge: pendingCount },
  { label: 'Domain Risks', value: 'domains', badge: domainRiskCount },
  { label: 'Analytics', value: 'analytics' },
];

<Tabs value={currentTab} onChange={handleTabChange}>
  {tabs.map(tab => (
    <Tab
      key={tab.value}
      label={
        <Badge badgeContent={tab.badge} color="error">
          {tab.label}
        </Badge>
      }
      value={tab.value}
    />
  ))}
</Tabs>
```

**Reference**: SME_DASHBOARD_SPEC.md lines 22-27

---

#### 5.4 Add Notifications/Alerts

**Features**:
- Badge showing pending review count in app bar
- Alert cards for critical/overdue items
- "Needs Immediate Attention" section on dashboard
- Toast notifications for successful actions

**Example**:
```tsx
// In app bar
<Badge badgeContent={totalPendingCount} color="error">
  <NotificationsIcon />
</Badge>

// On dashboard
{dashboard?.overview.needsImmediateAttention > 0 && (
  <Alert severity="error" sx={{ mb: 2 }}>
    {dashboard.overview.needsImmediateAttention} items need immediate attention
  </Alert>
)}
```

---

### Phase 5 Checklist

- [ ] Update SMEHome with ARB selection
- [ ] Add pending counts to ARB cards
- [ ] Show quick stats on SMEHome
- [ ] Update routes.tsx with ARB-specific routes
- [ ] Create ArbHomeView wrapper (optional)
- [ ] Add tab navigation to SME views
- [ ] Show badge counts on tabs
- [ ] Add notification badge to app bar
- [ ] Create "Needs Attention" alert section
- [ ] Add toast notifications for actions
- [ ] Implement breadcrumb navigation
- [ ] Test all navigation flows
- [ ] Verify route parameters work correctly

---

## File Changes Summary

### Files to Modify

| File | Type | Changes |
|------|------|---------|
| `src/api/client.ts` | Modify | Add ~10 new endpoint functions |
| `src/api/types.ts` | Modify | Add ~15 new type definitions |
| `src/api/hooks.ts` | Modify | Add ~15 new hooks |
| `src/features/sme/SMEHome.tsx` | Modify | Add ARB selection, pending counts |
| `src/features/sme/views/SecuritySmeView.tsx` | Modify | Add tab navigation, replace mock data |
| `src/features/sme/components/RiskStoryModal.tsx` | Modify | Add comments section |
| `src/app/routes.tsx` | Modify | Add ARB-specific routes |

### New Files to Create

| File | Purpose | Lines (Est.) |
|------|---------|--------------|
| `src/features/sme/views/PendingEvidenceView.tsx` | Evidence review table | ~250 |
| `src/features/sme/views/ArbDashboardView.tsx` | ARB analytics dashboard | ~400 |
| `src/features/sme/views/DomainRiskListView.tsx` | Domain risk cards/list | ~200 |
| `src/features/sme/components/EvidenceReviewModal.tsx` | Approve/reject modal | ~200 |
| `src/features/sme/components/DomainRiskDetailView.tsx` | Domain risk drill-down | ~150 |
| `src/features/sme/components/RiskCommentsPanel.tsx` | Comment thread & form | ~250 |

**Total Estimated Lines of Code**: ~2,000-2,500 new lines

---

## Testing Strategy

### Unit Testing
- Test API client functions with mocked responses
- Test React Query hooks with react-query testing library
- Test component rendering with React Testing Library
- Test user interactions (button clicks, form submissions)

### Integration Testing
- Test evidence approval flow end-to-end
- Test evidence rejection flow end-to-end
- Test domain risk navigation
- Test comment submission and display

### Manual Testing Checklist

#### Phase 1 - API Setup
- [ ] Verify API calls hit correct endpoints (port 8181)
- [ ] Test with USE_MOCK=1 (mock data)
- [ ] Test with USE_MOCK=0 (real API)
- [ ] Verify TypeScript types match API responses
- [ ] Check React Query cache invalidation

#### Phase 2 - Evidence Review
- [ ] Load pending evidence list
- [ ] Filter by priority, app, date
- [ ] Sort by different columns
- [ ] Open evidence review modal
- [ ] Approve evidence and verify priority score drop
- [ ] Reject evidence and verify minor priority reduction
- [ ] Check error handling (network errors, validation)
- [ ] Verify optimistic UI updates

#### Phase 3 - ARB Dashboard
- [ ] Load ARB dashboard for 'security'
- [ ] Verify KPI tiles show correct data
- [ ] Check domain breakdown cards
- [ ] Verify top applications list
- [ ] Test status distribution chart
- [ ] Test priority distribution chart
- [ ] Click domain card to drill down
- [ ] Navigate to domain risk detail view

#### Phase 4 - Comments
- [ ] View existing comments on risk item
- [ ] Add new comment
- [ ] Toggle internal/external visibility
- [ ] Filter internal comments
- [ ] Verify comment type badges
- [ ] Test markdown rendering (if implemented)

#### Phase 5 - Navigation
- [ ] Navigate between ARBs
- [ ] Switch between tabs
- [ ] Verify badge counts update
- [ ] Test breadcrumb navigation
- [ ] Check pending count in app bar
- [ ] Verify "Needs Attention" alerts

### API Testing with Insomnia/Postman
- Import `insomnia-risk-aggregation-api.json`
- Test each endpoint individually
- Verify request/response schemas
- Test error cases (404, 400, 500)

---

## Timeline & Milestones

### Week 1: Foundation & Core Workflow
**Days 1-2**: Phase 1 - API Client Configuration
- Setup complete API client
- All types defined
- All hooks implemented
- ✅ Milestone: API layer ready

**Days 3-5**: Phase 2 - Pending Evidence Review
- PendingEvidenceView complete
- EvidenceReviewModal complete
- SecuritySmeView updated
- ✅ Milestone: Evidence review workflow functional

---

### Week 2: Strategic Views
**Days 6-7**: Phase 3.1 - ARB Dashboard Core
- ArbDashboardView layout
- Overview KPI tiles
- Domain breakdown cards

**Days 8-9**: Phase 3.2 - Charts & Visualizations
- Status distribution chart
- Priority distribution chart
- Top applications table
- ✅ Milestone: ARB dashboard complete

**Day 10**: Phase 3.3 - Domain Risk Views
- DomainRiskListView
- DomainRiskDetailView
- ✅ Milestone: Domain risk navigation complete

---

### Week 3: Enhancements & Polish
**Days 11-12**: Phase 4 - Risk Comments
- RiskCommentsPanel
- Update RiskStoryModal
- Markdown support
- ✅ Milestone: Collaboration features complete

**Days 13-14**: Phase 5 - Navigation & UX
- Update SMEHome
- Add routes
- Navigation polish
- Notifications
- ✅ Milestone: UX complete

**Day 15**: Final Testing & Bug Fixes
- End-to-end testing
- Bug fixes
- Performance optimization
- ✅ **Milestone: SME Dashboard Ready for Production**

---

## Success Criteria

### Functional Requirements
- [ ] SME can view pending evidence submissions
- [ ] SME can approve evidence (priority drops 50%)
- [ ] SME can reject evidence (priority drops 10%)
- [ ] ARB dashboard shows accurate KPIs
- [ ] Domain risks display correctly with metrics
- [ ] Risk items can be commented on
- [ ] Navigation between views works smoothly
- [ ] All data updates in real-time via React Query

### Performance Requirements
- [ ] Dashboard loads in < 2 seconds
- [ ] Pending evidence table loads in < 1 second
- [ ] Filter/sort operations are instant (< 100ms)
- [ ] No memory leaks in React Query cache
- [ ] Charts render smoothly without lag

### UX Requirements
- [ ] Loading states for all async operations
- [ ] Error messages are user-friendly
- [ ] Success feedback for all actions
- [ ] Responsive design (desktop, tablet)
- [ ] Keyboard navigation works
- [ ] Screen reader compatible (basic WCAG compliance)

---

## Risk Mitigation

### Technical Risks
- **API changes**: Backend spec is stable; work with backend team for any changes
- **Data inconsistencies**: Add validation and error boundaries
- **Performance issues**: Implement pagination, virtual scrolling if needed
- **Chart library complexity**: Start simple, enhance gradually

### Timeline Risks
- **Scope creep**: Stick to spec; defer "nice-to-have" features
- **Dependencies**: Identify blockers early (backend API availability)
- **Testing time**: Allocate buffer for bug fixes

### Mitigation Strategies
- Daily progress tracking
- Weekly demos to stakeholders
- Incremental delivery (phase by phase)
- Continuous integration with backend

---

## Dependencies

### External Dependencies
- Backend API on port 8181 (fully available)
- React Query for data fetching
- MUI for UI components
- Recharts or Chart.js for visualizations

### Internal Dependencies
- Existing app shell and routing
- Authentication/authorization (if required)
- Existing risk hooks (can be reused/extended)

---

## Future Enhancements (Post-MVP)

### Phase 6 (Future)
- Real-time updates via WebSocket
- Export to CSV/Excel
- Advanced filtering with saved filters
- Bulk operations (approve multiple evidence)
- Email notifications for assignments
- SLA tracking with deadline alerts
- Risk history/audit trail
- Advanced analytics (trends, velocity metrics)

---

## Questions & Decisions Log

### Decisions Made
1. **Single API base URL**: Port 8181 for all endpoints ✅
2. **ARB naming**: Short format (security, data, operations, enterprise_architecture) ✅
3. **Chart library**: TBD (Recharts recommended)
4. **Rich text**: Markdown with react-markdown ✅
5. **Tab navigation**: Primary pattern for SME views ✅

### Open Questions
- [ ] Which chart library to use? (Recharts vs Chart.js)
- [ ] Should we add bulk approve/reject? (Future phase)
- [ ] Do we need real-time updates? (Future phase)
- [ ] Should we cache dashboard data? (Implement in Phase 1)

---

## Appendix

### Reference Documents
- `SME_DASHBOARD_SPEC.md` - Frontend specification
- `RISK_AGGREGATION_API.md` - Backend API documentation
- `FRONTEND_HANDOFF.md` - General frontend notes
- `insomnia-risk-aggregation-api.json` - API test collection

### Key Code Locations
- API client: `src/api/client.ts`
- Types: `src/api/types.ts`
- Hooks: `src/api/hooks.ts`
- Routes: `src/app/routes.tsx`
- SME features: `src/features/sme/`

### Useful Commands
```bash
# Start development server
npm run dev

# Run type checking
npm run type-check

# Run tests
npm test

# Build for production
npm run build

# Test API endpoints with Insomnia
# Import: insomnia-risk-aggregation-api.json
```

---

**End of Implementation Plan**

*This document will be updated as implementation progresses and new requirements emerge.*
