# ARB Dashboard Backend API Specification

**Version:** 1.0
**Date:** 2025-10-13
**Author:** Frontend Team
**Status:** Ready for Implementation

---

## Table of Contents

1. [Overview](#overview)
2. [Architecture Context](#architecture-context)
3. [Existing Endpoint Modifications](#existing-endpoint-modifications)
4. [New Endpoints Required](#new-endpoints-required)
5. [Data Models](#data-models)
6. [Business Logic](#business-logic)
7. [Error Handling](#error-handling)
8. [Testing Requirements](#testing-requirements)
9. [Implementation Priority](#implementation-priority)

---

## Overview

The ARB Dashboard requires backend API enhancements to support three distinct views:
- **My Queue**: Applications with risks assigned to the current ARB user
- **My Domain**: All applications in the ARB's domain (e.g., security, data)
- **All Domains**: All applications across all domains (global view)

The frontend needs:
1. **Application watchlist** with risk aggregations and full application metadata
2. **Dashboard metrics** scoped to the current view
3. **Risk creation** capability (already exists, minor modifications needed)

---

## Architecture Context

### Current State
- ✅ Risk aggregation system exists (`domain-risks` and `risk-items`)
- ✅ Manual risk creation endpoint exists (`POST /api/v1/risk-items`)
- ✅ Basic ARB dashboard endpoint exists (`GET /api/v1/domain-risks/arb/{arbName}/dashboard`)
- ❌ Missing: Full application details in dashboard responses
- ❌ Missing: Scope-aware endpoints (my-queue vs my-domain vs all-domains)

### Integration Points
- **Application Profile Service**: Source of truth for application metadata (name, criticality, owner, business unit)
- **Domain Risk Service**: Risk aggregations and priority scores
- **Risk Item Service**: Individual risk items
- **User Service**: ARB user assignments and permissions

---

## Existing Endpoint Modifications

### 1. Enhance ARB Dashboard Endpoint

**Current Endpoint:** `GET /api/v1/domain-risks/arb/{arbName}/dashboard`

**Status:** ⚠️ NEEDS ENHANCEMENT

**Problem:** The `topApplications` array returns minimal data. Frontend needs full application metadata.

#### Current Response (Incomplete)
```json
{
  "topApplications": [
    {
      "appId": "APM100001",
      "appName": null,  // ❌ Missing
      "domainRiskCount": 1,
      "totalOpenItems": 14,
      "highestPriorityScore": 55,
      "criticalDomain": "security"
    }
  ]
}
```

#### Required Enhancement
Add full application metadata by joining with Application Profile Service.

#### Enhanced Response
```json
{
  "arbName": "security",
  "overview": {
    "totalDomainRisks": 10,
    "totalOpenItems": 126,
    "criticalCount": 2,
    "highCount": 5,
    "averagePriorityScore": 55,
    "needsImmediateAttention": 7
  },
  "domains": [...],
  "topApplications": [
    {
      "appId": "APM100001",
      "appName": "Customer Portal",
      "criticality": "A",
      "businessUnit": "Engineering",
      "owner": "John Doe",
      "ownerId": "john.doe@example.com",
      "domainRiskCount": 1,
      "totalOpenItems": 14,
      "highestPriorityScore": 55,
      "criticalDomain": "security",
      "lastActivityDate": "2025-10-12T14:30:00Z"
    }
  ],
  "statusDistribution": {...},
  "priorityDistribution": {...},
  "recentActivity": {...}
}
```

#### Implementation Notes
1. **Data Source:** Query Application Profile Service for each `appId` in `topApplications`
2. **Caching:** Consider caching application metadata (criticality, owner, business unit rarely change)
3. **Performance:** Batch fetch application details in a single query if possible
4. **Fallback:** If application metadata unavailable, return `null` values but include `appId`

#### SQL/Query Pseudocode
```sql
-- Step 1: Get domain risks for ARB
SELECT dr.*, app.name, app.criticality, app.business_unit, app.owner, app.owner_id
FROM domain_risks dr
LEFT JOIN applications app ON dr.app_id = app.app_id
WHERE dr.assigned_arb = :arbName
  AND dr.status IN ('PENDING_ARB_REVIEW', 'UNDER_ARB_REVIEW', ...)
ORDER BY dr.priority_score DESC
LIMIT 10;

-- Step 2: Aggregate for overview metrics
-- (existing logic remains)
```

---

## New Endpoints Required

### 2. Get ARB Applications (Watchlist)

**Endpoint:** `GET /api/v1/domain-risks/arb/{arbName}/applications`

**Status:** 🆕 NEW - Required for Application Watchlist table

**Purpose:** Return complete application list with risk aggregations for ARB dashboard watchlist.

#### Request

**HTTP Method:** `GET`

**Path:** `/api/v1/domain-risks/arb/{arbName}/applications`

**Path Parameters:**
- `arbName` (required, string): ARB identifier
  - Valid values: `security`, `data`, `operations`, `enterprise_architecture`

**Query Parameters:**
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `scope` | string | Yes | - | Dashboard scope: `my-queue`, `my-domain`, or `all-domains` |
| `userId` | string | Conditional | - | ARB user ID. Required when `scope=my-queue` |
| `includeRisks` | boolean | No | `false` | Include detailed risks array in response |
| `page` | integer | No | `0` | Page number for pagination |
| `size` | integer | No | `100` | Page size (max 500) |

**Example Requests:**
```bash
# My Queue - applications with risks assigned to me
GET /api/v1/domain-risks/arb/security/applications?scope=my-queue&userId=security_arb_001

# My Domain - all applications in security domain
GET /api/v1/domain-risks/arb/security/applications?scope=my-domain

# All Domains - all applications across all domains
GET /api/v1/domain-risks/arb/security/applications?scope=all-domains

# With detailed risks
GET /api/v1/domain-risks/arb/security/applications?scope=my-queue&userId=security_arb_001&includeRisks=true
```

#### Response

**Status Code:** `200 OK`

**Response Body:**
```json
{
  "scope": "my-queue",
  "arbName": "security",
  "userId": "security_arb_001",
  "totalCount": 15,
  "page": 0,
  "pageSize": 100,
  "applications": [
    {
      "id": "app-internal-uuid-1",
      "appId": "APM100001",
      "name": "Customer Portal",
      "criticality": "A",
      "businessUnit": "Engineering",
      "owner": "John Doe",
      "ownerId": "john.doe@example.com",
      "aggregatedRiskScore": 85,
      "totalOpenItems": 14,
      "riskBreakdown": {
        "critical": 2,
        "high": 5,
        "medium": 6,
        "low": 1
      },
      "domains": ["security", "data"],
      "hasAssignedRisks": true,
      "lastActivityDate": "2025-10-12T14:30:00Z",
      "domainRisks": [
        {
          "domainRiskId": "dr-uuid-123",
          "domain": "security",
          "status": "UNDER_ARB_REVIEW",
          "priorityScore": 85,
          "openItems": 14,
          "assignedArb": "security",
          "assignedTo": "security_arb_001",
          "assignedAt": "2025-10-10T10:00:00Z"
        }
      ],
      "risks": []
    }
  ]
}
```

#### Field Descriptions

**Application Object:**
| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Internal application UUID |
| `appId` | string | External application ID (e.g., APM100001) |
| `name` | string | Application name |
| `criticality` | string | Criticality rating: `A`, `B`, `C`, `D` |
| `businessUnit` | string | Business unit owning the application |
| `owner` | string | Product Owner name |
| `ownerId` | string | Product Owner email/ID |
| `aggregatedRiskScore` | number | Highest priority score across all domain risks (0-100) |
| `totalOpenItems` | number | Total open risk items across all domains |
| `riskBreakdown` | object | Count of risks by severity |
| `riskBreakdown.critical` | number | Count of CRITICAL priority risks |
| `riskBreakdown.high` | number | Count of HIGH priority risks |
| `riskBreakdown.medium` | number | Count of MEDIUM priority risks |
| `riskBreakdown.low` | number | Count of LOW priority risks |
| `domains` | string[] | List of domains with risks for this app |
| `hasAssignedRisks` | boolean | True if any domain risk is assigned to the requesting user |
| `lastActivityDate` | string | ISO 8601 timestamp of most recent risk activity |
| `domainRisks` | array | Summary of domain-level risks |
| `risks` | array | Detailed risk items (only if `includeRisks=true`) |

#### Business Logic

**Scope Filtering:**

1. **my-queue:**
   ```sql
   -- Return applications where user has assigned domain risks
   SELECT DISTINCT a.*
   FROM applications a
   JOIN domain_risks dr ON a.app_id = dr.app_id
   WHERE dr.assigned_to = :userId
     AND dr.status IN ('PENDING_ARB_REVIEW', 'UNDER_ARB_REVIEW', 'AWAITING_REMEDIATION', 'IN_PROGRESS')
   ```

2. **my-domain:**
   ```sql
   -- Return applications with domain risks in ARB's domain
   SELECT DISTINCT a.*
   FROM applications a
   JOIN domain_risks dr ON a.app_id = dr.app_id
   WHERE dr.domain = :arbName
     AND dr.status IN ('PENDING_ARB_REVIEW', 'UNDER_ARB_REVIEW', 'AWAITING_REMEDIATION', 'IN_PROGRESS')
   ```

3. **all-domains:**
   ```sql
   -- Return all applications with any domain risks
   SELECT DISTINCT a.*
   FROM applications a
   JOIN domain_risks dr ON a.app_id = dr.app_id
   WHERE dr.status IN ('PENDING_ARB_REVIEW', 'UNDER_ARB_REVIEW', 'AWAITING_REMEDIATION', 'IN_PROGRESS')
   ```

**Aggregation Calculations:**

```sql
-- For each application, calculate aggregations
SELECT
  a.app_id,
  a.name,
  a.criticality,
  a.business_unit,
  a.owner,
  a.owner_id,
  MAX(dr.priority_score) as aggregated_risk_score,
  SUM(dr.open_items) as total_open_items,
  MAX(dr.updated_at) as last_activity_date,
  ARRAY_AGG(DISTINCT dr.domain) as domains,

  -- Risk breakdown by severity
  SUM(CASE WHEN ri.priority = 'CRITICAL' THEN 1 ELSE 0 END) as critical_count,
  SUM(CASE WHEN ri.priority = 'HIGH' THEN 1 ELSE 0 END) as high_count,
  SUM(CASE WHEN ri.priority = 'MEDIUM' THEN 1 ELSE 0 END) as medium_count,
  SUM(CASE WHEN ri.priority = 'LOW' THEN 1 ELSE 0 END) as low_count,

  -- Check if user has assigned risks
  MAX(CASE WHEN dr.assigned_to = :userId THEN 1 ELSE 0 END) as has_assigned_risks

FROM applications a
JOIN domain_risks dr ON a.app_id = dr.app_id
LEFT JOIN risk_items ri ON dr.domain_risk_id = ri.domain_risk_id
  AND ri.status IN ('OPEN', 'IN_PROGRESS')
WHERE [scope filter]
GROUP BY a.app_id, a.name, a.criticality, a.business_unit, a.owner, a.owner_id
ORDER BY aggregated_risk_score DESC, total_open_items DESC
```

**Domain Risks Summary:**
```sql
-- Get domain-level summaries for each application
SELECT
  dr.domain_risk_id,
  dr.domain,
  dr.status,
  dr.priority_score,
  dr.open_items,
  dr.assigned_arb,
  dr.assigned_to,
  dr.assigned_at
FROM domain_risks dr
WHERE dr.app_id = :appId
  AND dr.status IN ('PENDING_ARB_REVIEW', 'UNDER_ARB_REVIEW', 'AWAITING_REMEDIATION', 'IN_PROGRESS')
ORDER BY dr.priority_score DESC
```

#### Error Responses

**400 Bad Request:**
```json
{
  "timestamp": "2025-10-13T10:00:00Z",
  "status": 400,
  "error": "Bad Request",
  "message": "Invalid scope parameter. Must be one of: my-queue, my-domain, all-domains",
  "path": "/api/v1/domain-risks/arb/security/applications"
}
```

**400 Bad Request (Missing userId):**
```json
{
  "timestamp": "2025-10-13T10:00:00Z",
  "status": 400,
  "error": "Bad Request",
  "message": "userId is required when scope=my-queue",
  "path": "/api/v1/domain-risks/arb/security/applications"
}
```

**404 Not Found:**
```json
{
  "timestamp": "2025-10-13T10:00:00Z",
  "status": 404,
  "error": "Not Found",
  "message": "ARB not found: invalid_arb_name",
  "path": "/api/v1/domain-risks/arb/invalid_arb_name/applications"
}
```

#### Implementation Notes

1. **Performance Optimization:**
   - Use database indexes on `domain_risks.assigned_to`, `domain_risks.domain`, `domain_risks.app_id`
   - Consider materialized views for aggregation calculations
   - Implement caching with 5-minute TTL for application metadata

2. **Data Consistency:**
   - Ensure domain risk aggregations are up-to-date (triggered by risk item updates)
   - Handle applications with no open domain risks (exclude from results)

3. **Pagination:**
   - Default page size: 100 applications
   - Maximum page size: 500 applications
   - Use cursor-based pagination if performance issues arise

4. **includeRisks Flag:**
   - When `includeRisks=true`, populate `risks[]` array with full risk item details
   - Default to `false` to reduce payload size
   - Consider separate endpoint if detailed risks are needed frequently

---

### 3. Get ARB Dashboard Metrics

**Endpoint:** `GET /api/v1/domain-risks/arb/{arbName}/metrics`

**Status:** 🆕 NEW - Required for Heads-Up Display (HUD)

**Purpose:** Return dashboard-level metrics scoped to current view for the HUD cards.

#### Request

**HTTP Method:** `GET`

**Path:** `/api/v1/domain-risks/arb/{arbName}/metrics`

**Path Parameters:**
- `arbName` (required, string): ARB identifier

**Query Parameters:**
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `scope` | string | Yes | - | Dashboard scope: `my-queue`, `my-domain`, or `all-domains` |
| `userId` | string | Conditional | - | ARB user ID. Required when `scope=my-queue` |

**Example Requests:**
```bash
# My Queue metrics
GET /api/v1/domain-risks/arb/security/metrics?scope=my-queue&userId=security_arb_001

# My Domain metrics
GET /api/v1/domain-risks/arb/security/metrics?scope=my-domain

# All Domains metrics
GET /api/v1/domain-risks/arb/security/metrics?scope=all-domains
```

#### Response

**Status Code:** `200 OK`

**Response Body:**
```json
{
  "scope": "my-queue",
  "arbName": "security",
  "userId": "security_arb_001",
  "criticalCount": 12,
  "openItemsCount": 126,
  "pendingReviewCount": 45,
  "averageRiskScore": 62.5,
  "healthGrade": "C",
  "recentActivity": {
    "newRisksLast7Days": 8,
    "resolvedLast7Days": 3,
    "newRisksLast30Days": 32,
    "resolvedLast30Days": 15
  }
}
```

#### Field Descriptions

| Field | Type | Description |
|-------|------|-------------|
| `scope` | string | Dashboard scope used for filtering |
| `arbName` | string | ARB identifier |
| `userId` | string | User ID (only for my-queue scope) |
| `criticalCount` | number | Count of risk items with priority=CRITICAL |
| `openItemsCount` | number | Count of risk items with status=OPEN |
| `pendingReviewCount` | number | Count of domain risks with status=PENDING_ARB_REVIEW |
| `averageRiskScore` | number | Average priorityScore across all risk items (0-100) |
| `healthGrade` | string | Overall health grade: `A`, `B`, `C`, `D`, `F` |
| `recentActivity.newRisksLast7Days` | number | Risk items created in last 7 days |
| `recentActivity.resolvedLast7Days` | number | Risk items resolved in last 7 days |
| `recentActivity.newRisksLast30Days` | number | Risk items created in last 30 days |
| `recentActivity.resolvedLast30Days` | number | Risk items resolved in last 30 days |

#### Business Logic

**Scope Filtering:**
Apply same filtering logic as applications endpoint (Section 2).

**Metric Calculations:**

```sql
-- Critical Count
SELECT COUNT(DISTINCT ri.risk_item_id)
FROM risk_items ri
JOIN domain_risks dr ON ri.domain_risk_id = dr.domain_risk_id
WHERE [scope filter]
  AND ri.priority = 'CRITICAL'
  AND ri.status IN ('OPEN', 'IN_PROGRESS')

-- Open Items Count
SELECT COUNT(DISTINCT ri.risk_item_id)
FROM risk_items ri
JOIN domain_risks dr ON ri.domain_risk_id = dr.domain_risk_id
WHERE [scope filter]
  AND ri.status = 'OPEN'

-- Pending Review Count
SELECT COUNT(DISTINCT dr.domain_risk_id)
FROM domain_risks dr
WHERE [scope filter]
  AND dr.status = 'PENDING_ARB_REVIEW'

-- Average Risk Score
SELECT AVG(ri.priority_score)
FROM risk_items ri
JOIN domain_risks dr ON ri.domain_risk_id = dr.domain_risk_id
WHERE [scope filter]
  AND ri.status IN ('OPEN', 'IN_PROGRESS')

-- Recent Activity (last 7 days)
SELECT
  COUNT(CASE WHEN ri.opened_at >= NOW() - INTERVAL '7 days' THEN 1 END) as new_risks_7d,
  COUNT(CASE WHEN ri.resolved_at >= NOW() - INTERVAL '7 days' THEN 1 END) as resolved_7d,
  COUNT(CASE WHEN ri.opened_at >= NOW() - INTERVAL '30 days' THEN 1 END) as new_risks_30d,
  COUNT(CASE WHEN ri.resolved_at >= NOW() - INTERVAL '30 days' THEN 1 END) as resolved_30d
FROM risk_items ri
JOIN domain_risks dr ON ri.domain_risk_id = dr.domain_risk_id
WHERE [scope filter]
```

**Health Grade Calculation:**
```
if averageRiskScore <= 20: healthGrade = "A"
if averageRiskScore <= 40: healthGrade = "B"
if averageRiskScore <= 60: healthGrade = "C"
if averageRiskScore <= 80: healthGrade = "D"
if averageRiskScore > 80:  healthGrade = "F"
```

#### Error Responses

Same error handling as applications endpoint (Section 2).

#### Implementation Notes

1. **Performance:**
   - Use database aggregation functions (COUNT, AVG)
   - Consider materialized view or cached results (5-minute TTL)
   - Single query for all metrics preferred

2. **Edge Cases:**
   - If no risk items exist, return counts as `0`
   - If no risk items for average calculation, return `averageRiskScore: 0` and `healthGrade: "A"`

3. **Optimization:**
   - Combine with applications endpoint if frontend can merge responses
   - Consider adding metrics to applications response as `meta` field

---

## Data Models

### Application (Extended)

**Source:** Application Profile Service + Risk Aggregations

```typescript
interface Application {
  id: string;                    // Internal UUID
  appId: string;                 // External ID (APM100001)
  name: string;                  // Application name
  criticality: 'A' | 'B' | 'C' | 'D';
  businessUnit: string;
  owner: string;                 // Owner name
  ownerId: string;               // Owner email/ID

  // Risk Aggregations (calculated)
  aggregatedRiskScore: number;   // 0-100
  totalOpenItems: number;
  riskBreakdown: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
  domains: string[];             // Domains with risks
  hasAssignedRisks: boolean;     // User-specific
  lastActivityDate: string;      // ISO 8601

  // Optional
  domainRisks?: DomainRiskSummary[];
  risks?: RiskItem[];
}
```

### DomainRiskSummary

```typescript
interface DomainRiskSummary {
  domainRiskId: string;
  domain: string;
  status: DomainRiskStatus;
  priorityScore: number;
  openItems: number;
  assignedArb: string;
  assignedTo: string | null;
  assignedAt: string | null;
}
```

### DashboardMetrics

```typescript
interface DashboardMetrics {
  scope: 'my-queue' | 'my-domain' | 'all-domains';
  arbName: string;
  userId?: string;
  criticalCount: number;
  openItemsCount: number;
  pendingReviewCount: number;
  averageRiskScore: number;
  healthGrade: 'A' | 'B' | 'C' | 'D' | 'F';
  recentActivity: {
    newRisksLast7Days: number;
    resolvedLast7Days: number;
    newRisksLast30Days: number;
    resolvedLast30Days: number;
  };
}
```

---

## Business Logic

### Scope Filtering Rules

**my-queue:**
- **Filter:** Domain risks assigned to the requesting user
- **Use Case:** Personal work queue for ARB reviewer
- **SQL Fragment:**
  ```sql
  WHERE dr.assigned_to = :userId
    AND dr.status IN ('PENDING_ARB_REVIEW', 'UNDER_ARB_REVIEW', 'AWAITING_REMEDIATION', 'IN_PROGRESS')
  ```

**my-domain:**
- **Filter:** Domain risks in the ARB's domain
- **Use Case:** All work in ARB's area of responsibility
- **SQL Fragment:**
  ```sql
  WHERE dr.domain = :arbName
    AND dr.status IN ('PENDING_ARB_REVIEW', 'UNDER_ARB_REVIEW', 'AWAITING_REMEDIATION', 'IN_PROGRESS')
  ```

**all-domains:**
- **Filter:** All domain risks across all domains
- **Use Case:** Enterprise-wide visibility for senior ARB members
- **SQL Fragment:**
  ```sql
  WHERE dr.status IN ('PENDING_ARB_REVIEW', 'UNDER_ARB_REVIEW', 'AWAITING_REMEDIATION', 'IN_PROGRESS')
  ```

### Risk Score Aggregation

**aggregatedRiskScore:**
- Take the **maximum** priority score across all domain risks for the application
- Rationale: Highest risk determines overall urgency
- Range: 0-100

**riskBreakdown:**
- Count risk items by priority enum (CRITICAL, HIGH, MEDIUM, LOW)
- Only count risk items with status = OPEN or IN_PROGRESS
- Exclude RESOLVED, WAIVED, CLOSED

**hasAssignedRisks:**
- Boolean flag: true if ANY domain risk is assigned to the requesting user
- Used for "My Queue" filtering
- Calculation: `EXISTS (SELECT 1 FROM domain_risks WHERE assigned_to = :userId)`

---

## Error Handling

### Standard Error Response Format

```json
{
  "timestamp": "2025-10-13T10:00:00Z",
  "status": 400,
  "error": "Bad Request",
  "message": "Detailed error message",
  "path": "/api/v1/domain-risks/arb/security/applications"
}
```

### HTTP Status Codes

| Code | Scenario |
|------|----------|
| 200 | Success |
| 400 | Invalid request parameters (invalid scope, missing userId, etc.) |
| 401 | Unauthorized (if authentication implemented) |
| 403 | Forbidden (user not authorized for ARB) |
| 404 | ARB not found |
| 500 | Internal server error |

### Validation Rules

**arbName:**
- Must be one of: `security`, `data`, `operations`, `enterprise_architecture`
- Case-sensitive
- Return 404 if invalid

**scope:**
- Must be one of: `my-queue`, `my-domain`, `all-domains`
- Case-sensitive
- Return 400 if invalid

**userId:**
- Required when `scope=my-queue`
- Return 400 if missing
- Validate user exists (optional, return 404 if not found)

**Pagination:**
- `page`: Must be >= 0, return 400 if negative
- `size`: Must be 1-500, return 400 if out of range

---

## Testing Requirements

### Unit Tests

1. **Scope Filtering:**
   - Test my-queue returns only applications with assigned risks
   - Test my-domain returns only applications in ARB's domain
   - Test all-domains returns all applications

2. **Aggregation Calculations:**
   - Test aggregatedRiskScore = max priority score
   - Test riskBreakdown counts by severity
   - Test hasAssignedRisks flag accuracy

3. **Metrics Calculations:**
   - Test criticalCount, openItemsCount, pendingReviewCount
   - Test averageRiskScore calculation
   - Test healthGrade assignment
   - Test recentActivity date ranges

### Integration Tests

1. **End-to-End Flow:**
   - Create application with domain risks
   - Assign domain risk to user
   - Call `/applications?scope=my-queue&userId=X`
   - Verify application appears in results
   - Call `/metrics?scope=my-queue&userId=X`
   - Verify metrics reflect the domain risk

2. **Cross-Service Integration:**
   - Test Application Profile Service integration
   - Test domain risk aggregation recalculation
   - Test handling of missing application metadata

### Performance Tests

1. **Load Testing:**
   - Test with 1000+ applications
   - Test with 10,000+ risk items
   - Measure response time (target: < 500ms)

2. **Concurrency:**
   - Test concurrent requests from multiple users
   - Test cache invalidation

---

## Implementation Priority

### Phase 1: Critical Path (Week 1)
**Goal:** Enable frontend to display ARB dashboard with real data

1. ✅ **HIGHEST PRIORITY:** Implement `GET /api/v1/domain-risks/arb/{arbName}/applications`
   - Reason: Core functionality for watchlist table
   - Dependency: Application Profile Service integration
   - Estimated Effort: 3-5 days

2. ✅ **HIGH PRIORITY:** Implement `GET /api/v1/domain-risks/arb/{arbName}/metrics`
   - Reason: Required for HUD display
   - Dependency: Same data sources as applications endpoint
   - Estimated Effort: 1-2 days

### Phase 2: Enhancements (Week 2)
**Goal:** Optimize and complete functionality

3. ⚠️ **MEDIUM PRIORITY:** Enhance `GET /api/v1/domain-risks/arb/{arbName}/dashboard`
   - Reason: Nice-to-have for frontend (can use applications endpoint instead)
   - Estimated Effort: 1 day

4. ✅ **LOW PRIORITY:** Add `includeRisks` flag to applications endpoint
   - Reason: Optimization, not required for initial launch
   - Estimated Effort: 1 day

### Phase 3: Optimization (Week 3+)
**Goal:** Performance and scalability

5. Implement caching strategy
6. Add database indexes
7. Create materialized views for aggregations
8. Implement cursor-based pagination

---

## Database Schema Considerations

### Required Indexes

```sql
-- For scope filtering
CREATE INDEX idx_domain_risks_assigned_to ON domain_risks(assigned_to);
CREATE INDEX idx_domain_risks_domain ON domain_risks(domain);
CREATE INDEX idx_domain_risks_app_id ON domain_risks(app_id);

-- For aggregations
CREATE INDEX idx_risk_items_domain_risk_id ON risk_items(domain_risk_id);
CREATE INDEX idx_risk_items_status ON risk_items(status);
CREATE INDEX idx_risk_items_priority ON risk_items(priority);

-- For recent activity
CREATE INDEX idx_risk_items_opened_at ON risk_items(opened_at);
CREATE INDEX idx_risk_items_resolved_at ON risk_items(resolved_at);
```

### Materialized View (Optional)

Consider creating a materialized view for application risk aggregations:

```sql
CREATE MATERIALIZED VIEW mv_application_risk_summary AS
SELECT
  a.app_id,
  a.name,
  a.criticality,
  a.business_unit,
  a.owner,
  a.owner_id,
  MAX(dr.priority_score) as aggregated_risk_score,
  SUM(dr.open_items) as total_open_items,
  MAX(dr.updated_at) as last_activity_date,
  ARRAY_AGG(DISTINCT dr.domain) as domains,
  SUM(CASE WHEN ri.priority = 'CRITICAL' THEN 1 ELSE 0 END) as critical_count,
  SUM(CASE WHEN ri.priority = 'HIGH' THEN 1 ELSE 0 END) as high_count,
  SUM(CASE WHEN ri.priority = 'MEDIUM' THEN 1 ELSE 0 END) as medium_count,
  SUM(CASE WHEN ri.priority = 'LOW' THEN 1 ELSE 0 END) as low_count
FROM applications a
JOIN domain_risks dr ON a.app_id = dr.app_id
LEFT JOIN risk_items ri ON dr.domain_risk_id = ri.domain_risk_id
  AND ri.status IN ('OPEN', 'IN_PROGRESS')
WHERE dr.status IN ('PENDING_ARB_REVIEW', 'UNDER_ARB_REVIEW', 'AWAITING_REMEDIATION', 'IN_PROGRESS')
GROUP BY a.app_id, a.name, a.criticality, a.business_unit, a.owner, a.owner_id;

-- Refresh strategy: Trigger on domain_risks update or scheduled (every 5 minutes)
```

---

## API Contract Summary

### Endpoint Checklist

| Endpoint | Method | Status | Priority | Frontend Usage |
|----------|--------|--------|----------|----------------|
| `/api/v1/risk-items` | POST | ✅ Exists | - | Create Risk button |
| `/api/v1/domain-risks/arb/{arbName}/applications` | GET | 🆕 New | P0 | Application Watchlist |
| `/api/v1/domain-risks/arb/{arbName}/metrics` | GET | 🆕 New | P0 | Heads-Up Display |
| `/api/v1/domain-risks/arb/{arbName}/dashboard` | GET | ⚠️ Enhance | P1 | Optional |

### Request/Response Contract

**Applications Endpoint:**
```
GET /api/v1/domain-risks/arb/{arbName}/applications
  ?scope=my-queue|my-domain|all-domains
  &userId={userId}
  &includeRisks={true|false}
  &page={number}
  &size={number}

→ ApplicationsResponse {
    scope, arbName, userId, totalCount, page, pageSize,
    applications: Application[]
  }
```

**Metrics Endpoint:**
```
GET /api/v1/domain-risks/arb/{arbName}/metrics
  ?scope=my-queue|my-domain|all-domains
  &userId={userId}

→ DashboardMetrics {
    scope, arbName, userId,
    criticalCount, openItemsCount, pendingReviewCount,
    averageRiskScore, healthGrade,
    recentActivity { ... }
  }
```

---

## Questions for Backend Team

1. **Application Profile Service:**
   - What is the API for fetching application metadata?
   - Can we batch fetch multiple applications?
   - What is the data model (exact field names)?

2. **Performance:**
   - What are the expected data volumes (apps, domain risks, risk items)?
   - Are there existing indexes on domain_risks and risk_items tables?
   - Is caching infrastructure available (Redis, Memcached)?

3. **Authorization:**
   - Should we implement ARB role checking?
   - Should users only see their assigned risks in my-queue?
   - Is there an admin role that can see all-domains?

4. **Deployment:**
   - What is the release timeline?
   - Can we deploy incrementally (applications endpoint first, metrics later)?
   - Is there a staging environment for frontend testing?

---

## Appendix

### Example Frontend Usage

**Loading ARB Dashboard:**
```typescript
// Step 1: Load metrics
const metricsResponse = await fetch(
  `/api/v1/domain-risks/arb/security/metrics?scope=my-queue&userId=security_arb_001`
);
const metrics = await metricsResponse.json();

// Step 2: Load applications
const appsResponse = await fetch(
  `/api/v1/domain-risks/arb/security/applications?scope=my-queue&userId=security_arb_001`
);
const { applications } = await appsResponse.json();

// Step 3: Render dashboard
setDashboardData({
  applications,
  metrics,
  insights: [] // Frontend calculates insights
});
```

### Sample Test Data

**Application with Risks:**
```json
{
  "appId": "APM100001",
  "name": "Customer Portal",
  "criticality": "A",
  "businessUnit": "Engineering",
  "owner": "John Doe",
  "ownerId": "john.doe@example.com",
  "aggregatedRiskScore": 85,
  "totalOpenItems": 14,
  "riskBreakdown": {
    "critical": 2,
    "high": 5,
    "medium": 6,
    "low": 1
  },
  "domains": ["security", "data"],
  "hasAssignedRisks": true,
  "lastActivityDate": "2025-10-12T14:30:00Z"
}
```

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-10-13 | Frontend Team | Initial specification |

---

## Approval

**Frontend Lead:** _________________ Date: _______

**Backend Lead:** _________________ Date: _______

**Product Owner:** _________________ Date: _______
