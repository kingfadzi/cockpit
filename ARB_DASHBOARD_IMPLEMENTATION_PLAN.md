# ARB Dashboard Implementation Plan

## Document Overview

**Version**: 1.0
**Created**: 2025-10-13
**Status**: Draft - Awaiting Approval
**Related Documents**:
- [ARB_DASHBOARD_DESIGN_SPEC.md](./ARB_DASHBOARD_DESIGN_SPEC.md)
- [ARB_DASHBOARD_KEY_QUESTIONS.md](./ARB_DASHBOARD_KEY_QUESTIONS.md)

---

## Implementation Strategy

### Core Approach

**Phase 1: Mock Data & UI/UX** → **Phase 2: Backend Integration** → **Phase 3: Polish & Optimization**

This plan follows a **"Build with Mocks First"** strategy:
1. Build all UI components with realistic mock data
2. Perfect the look, feel, and user flows
3. Get stakeholder approval on complete experience
4. Only then connect to real backend APIs
5. No code changes without explicit approval

### Key Principles

✅ **Visual First**: See it working before connecting to backend
✅ **Incremental Builds**: Each deliverable is a working, demonstrable piece
✅ **Approval Gates**: Clear checkpoints for review and sign-off
✅ **Mock Data Realism**: Mock data reflects real-world scenarios and edge cases
✅ **No Surprises**: Every change requires explicit approval

---

## Phase 1: Mock Data & UI/UX (Weeks 1-4)

**Goal**: Build complete, functional dashboard UI with mock data that demonstrates all features and flows.

### Week 1: Foundation & Mock Data

#### Deliverable 1.1: Project Setup & Mock Data Framework
**Time**: 2 days

**Tasks**:
- [ ] Set up React component structure in `/src/features/arb-dashboard/`
- [ ] Create mock data service: `/src/features/arb-dashboard/mocks/mockArbData.ts`
- [ ] Define mock data generators for applications, risks, metrics
- [ ] Set up routing: `/arb-dashboard`
- [ ] Configure environment to use mock data by default

**Approval Gate**: Review project structure and mock data approach

**Deliverable 1.2: Mock Data Scenarios**
**Time**: 3 days

**Tasks**:
- [ ] Create mock dataset: 50 applications with varied risk profiles
- [ ] Generate realistic risks covering all policy fields from registry
- [ ] Include mix of auto-generated (80%) and manual risks (20%)
- [ ] Create edge cases: apps with 0 risks, apps with 50+ risks, stale evidence
- [ ] Mock users: 3 ARB experts (Security, Data, Operations) with assigned risks

**Mock Data Structure**:
```typescript
// mockArbData.ts
export const mockApplications: Application[] = [
  {
    id: 'app-001',
    name: 'Customer Portal',
    businessUnit: 'Retail',
    owner: 'Jane Smith',
    ownerId: 'user-001',
    aggregatedRiskScore: 87,
    totalOpenItems: 8,
    riskBreakdown: { critical: 3, high: 4, medium: 1, low: 0 },
    domains: ['security', 'data'],
    hasAssignedRisks: true,
    lastActivityDate: '2025-10-11T14:30:00Z',
    risks: [/* detailed risk objects */]
  },
  // ... 49 more applications
];

export const mockMetrics = {
  myQueue: {
    criticalCount: 12,
    openItemsCount: 47,
    pendingReviewCount: 23,
    averageRiskScore: 68,
    healthGrade: 'C',
    recentActivity: {
      newRisksLast7Days: 15,
      resolvedLast7Days: 8,
      newRisksLast30Days: 43,
      resolvedLast30Days: 28
    }
  },
  myDomain: { /* ... */ },
  allDomains: { /* ... */ }
};
```

**Approval Gate**: Review mock data scenarios for realism and coverage

---

### Week 2: Core Components (Scoping Tabs + HUD)

#### Deliverable 2.1: Scoping Tabs Component
**Time**: 2 days

**Tasks**:
- [ ] Build `ScopingTabs.tsx` component
- [ ] Implement tab switching: My Queue | My Domain | All Domains
- [ ] Style active/inactive states
- [ ] Hook up to mock data filtering
- [ ] Add tab badge counts (e.g., "My Queue (15)")

**Demo**: Switching tabs filters mock data, shows different application counts

**Approval Gate**: Review tab interaction and visual design

#### Deliverable 2.2: Heads-Up Display (HUD)
**Time**: 3 days

**Tasks**:
- [ ] Build `HeadsUpDisplay.tsx` with 5 metric cards
- [ ] Implement each metric component:
  - [ ] `CriticalRisksMetric.tsx`
  - [ ] `OpenItemsMetric.tsx`
  - [ ] `PendingReviewMetric.tsx`
  - [ ] `HealthScoreMetric.tsx`
  - [ ] `NetChangeMetric.tsx`
- [ ] Add color coding based on thresholds
- [ ] Implement click handlers (filter watchlist - to be built next)
- [ ] Add tooltips on hover
- [ ] Make HUD responsive (mobile: 2x2 grid)

**Demo**: HUD shows dynamic metrics based on selected tab, metrics change colors based on thresholds

**Approval Gate**: Review HUD visual design, color coding, and metric clarity

---

### Week 3: Application Watchlist

#### Deliverable 3.1: Watchlist Controls & Table Shell
**Time**: 2 days

**Tasks**:
- [ ] Build `ApplicationWatchlist.tsx` container
- [ ] Build `WatchlistControls.tsx`: search, sort, filter dropdowns
- [ ] Build `WatchlistTable.tsx`: table header with sortable columns
- [ ] Implement search functionality (local filtering of mock data)
- [ ] Implement sort functionality (Risk Score, Open Items, Critical Count)
- [ ] Add pagination controls (15 items per page)

**Demo**: Search, sort, and pagination work with mock data

**Approval Gate**: Review controls layout and interaction patterns

#### Deliverable 3.2: Application Row & Full Table
**Time**: 3 days

**Tasks**:
- [ ] Build `ApplicationRow.tsx` component with all columns:
  - [ ] Position indicator (#, 🔥, ⚠️)
  - [ ] Application name + domain tags + context badges
  - [ ] Risk breakdown (🔴3 🟠4 🟡1 0)
  - [ ] Total open count
  - [ ] Score (letter grade + numeric)
  - [ ] Owner
  - [ ] Business Unit
- [ ] Implement row hover states
- [ ] Implement row click → navigate to app detail (route only, detail page Week 4)
- [ ] Add context badges based on risk data:
  - [ ] 👤 "Assigned to you"
  - [ ] 📊 "High volume"
  - [ ] 🔔 "X new (7d)"
  - [ ] 🕐 "Stale evidence"
  - [ ] 🔥 "Missing evidence"

**Demo**: Full interactive watchlist with 50 mock applications, all interactions working

**Approval Gate**: Review table layout, information density, visual hierarchy

#### Deliverable 3.3: Filtering & HUD Click-Through
**Time**: 2 days

**Tasks**:
- [ ] Implement all filters:
  - [ ] Status filter (All, OPEN, IN_PROGRESS, PENDING_REVIEW, RESOLVED)
  - [ ] Priority filter (All, CRITICAL, HIGH, MEDIUM, LOW)
  - [ ] Business Unit filter (dynamic from mock data)
  - [ ] Assignment filter (All, Assigned to Me, Unassigned)
  - [ ] Source filter (All Risks, Policy-Driven Only, Expert Findings Only)
- [ ] Connect HUD metric clicks to watchlist filters
  - [ ] Click "12 CRITICAL" → filters to apps with critical risks
  - [ ] Click "47 OPEN" → filters to apps with open items
  - [ ] Click "23 PENDING" → filters to apps with pending review risks
- [ ] Show active filters with clear badges
- [ ] Add "Clear Filters" button

**Demo**: Click HUD metrics to filter watchlist, use dropdown filters, see filter combinations work correctly

**Approval Gate**: Review filtering logic, filter combinations, and user flow

---

### Week 4: Application Detail View & Insights

#### Deliverable 4.1: Application Profile Page
**Time**: 3 days

**Tasks**:
- [ ] Build `ApplicationProfilePage.tsx`
- [ ] Display application header with metadata
- [ ] Show summary metrics (Risk Score, Open Count, Critical Count, Last Activity)
- [ ] Build domain tabs (ALL RISKS | SECURITY | DATA | OPERATIONS | EA)
- [ ] Build risk list with `RiskCard.tsx` components
- [ ] Implement risk card features:
  - [ ] Status/priority badges
  - [ ] Source indicator (🤖 auto-generated vs 👤 manual)
  - [ ] Expandable detail view
  - [ ] Quick action buttons (Status, Assign, Comment - UI only, no backend)
- [ ] Add filters: Status, Priority, Source
- [ ] Add sort: Priority, Created Date, Status
- [ ] Add "[+ Create Risk]" button (opens modal - to be built)
- [ ] Implement "← Back to Dashboard" navigation

**Demo**: Click application from watchlist → see full risk details, filter by domain, expand risk cards

**Approval Gate**: Review application detail layout, risk card design, information architecture

#### Deliverable 4.2: Insights & Performance Section
**Time**: 2 days

**Tasks**:
- [ ] Build `InsightsSection.tsx` (collapsible)
- [ ] Build `ResolutionPerformance.tsx` component
  - [ ] Show 7-day and 30-day metrics
  - [ ] Calculate resolution rate
  - [ ] Display burn rate estimate
  - [ ] Add visual status indicators (🔴 BEHIND, 🟡 SLIGHTLY BEHIND, ✅ KEEPING UP)
- [ ] Build `KeyInsights.tsx` component
  - [ ] Implement concentration risk detection
  - [ ] Implement high volume app detection
  - [ ] Implement data quality checks
  - [ ] Implement status bottleneck detection
  - [ ] Implement unassigned risk detection
- [ ] Build `DomainSpecificInsights.tsx`
  - [ ] Security ARB insights (WAF, encryption, MFA, etc.)
  - [ ] Data ARB insights (confidentiality, access reviews, etc.)
  - [ ] Operations ARB insights (RTO, DR tests, etc.)
  - [ ] EA ARB insights (missing docs, stale roadmaps)
- [ ] Implement collapse/expand with localStorage persistence

**Demo**: Insights section shows calculated insights from mock data, insights change based on selected scope

**Approval Gate**: Review insights relevance, clarity, and actionability

---

### Week 4 (continued): Manual Risk Creation Modal

#### Deliverable 4.3: Create Risk Modal (UI Only)
**Time**: 1 day

**Tasks**:
- [ ] Build `CreateRiskModal.tsx` component
- [ ] Form fields:
  - [ ] Title (text input, required)
  - [ ] Description (textarea, required)
  - [ ] Priority (dropdown: CRITICAL, HIGH, MEDIUM, LOW)
  - [ ] ARB Domain (dropdown: Security, Data, Operations, EA)
  - [ ] Assigned To (user selector, optional)
  - [ ] Due Date (date picker, optional)
  - [ ] Category (text input, optional)
  - [ ] Tags (multi-input, optional)
- [ ] Form validation (client-side)
- [ ] Cancel and Submit buttons
- [ ] On submit: Add to mock data, close modal, show success message
- [ ] Modal accessible from Application Profile Page

**Demo**: Click "+ Create Risk" → fill form → submit → see new risk appear in list (mock data only)

**Approval Gate**: Review form design, validation, and user flow

---

### End of Week 4: Phase 1 Review

**Deliverable**: Complete, functional dashboard demo with mock data

**Review Session Agenda**:
1. **Full User Flow Demo**:
   - Login as Security ARB expert
   - Land on My Queue tab
   - Review HUD metrics
   - Click Critical Risks metric → watchlist filters
   - Click top application → view detail
   - Expand risk card → review details
   - Create manual risk → see it added
   - Switch to My Domain tab → see portfolio view
   - Review insights section
   - Switch to All Domains → cross-domain exploration

2. **Edge Case Demo**:
   - Application with 0 risks
   - Application with 50+ risks (pagination)
   - All filters combined
   - Empty search results

3. **Responsive Demo**:
   - Desktop view
   - Tablet view
   - Mobile view

**Approval Decision**:
- ✅ **Approve UI/UX** → Proceed to Phase 2 (Backend Integration)
- 🔄 **Request Changes** → Iterate on specific components, re-demo
- ❌ **Major Redesign** → Revisit design spec, restart Phase 1

**Deliverables Documentation**:
- [ ] Component inventory with screenshots
- [ ] Mock data scenarios documentation
- [ ] Known limitations list (features not yet implemented)
- [ ] User flow diagrams

---

## Phase 2: Backend Integration (Weeks 5-7)

**Pre-requisite**: Phase 1 approved with no major changes required

**Goal**: Replace mock data with real API calls, maintain identical UI/UX

### Week 5: API Integration Setup

#### Deliverable 5.1: API Service Layer
**Time**: 2 days

**Tasks**:
- [ ] Create `/src/features/arb-dashboard/api/arbDashboardApi.ts`
- [ ] Define TypeScript interfaces matching spec (already defined in Phase 1)
- [ ] Implement API client functions:
  - [ ] `getArbDashboard(scope, userId, arbDomain)` → GET `/api/arb-dashboard`
  - [ ] `getApplication(id)` → GET `/api/applications/:id`
  - [ ] `updateRisk(id, data)` → PATCH `/api/risks/:id`
  - [ ] `createRisk(appId, data)` → POST `/api/applications/:id/risks`
  - [ ] `addComment(riskId, data)` → POST `/api/risks/:id/comments`
- [ ] Add error handling and retry logic
- [ ] Add loading states

**Approval Gate**: Review API service architecture and error handling

#### Deliverable 5.2: Environment Configuration
**Time**: 1 day

**Tasks**:
- [ ] Add environment variable for API base URL
- [ ] Create toggle for mock vs. real data: `USE_MOCK_DATA` flag
- [ ] Ensure mock data can still be used for development/testing
- [ ] Update README with setup instructions

**Approval Gate**: Verify environment setup works for development team

#### Deliverable 5.3: API Hooks Implementation
**Time**: 2 days

**Tasks**:
- [ ] Verify existing `useArbDashboard` hook in `/src/api/hooks.ts`
- [ ] Add missing hooks if needed:
  - [ ] `useApplication(id)`
  - [ ] `useUpdateRisk()`
  - [ ] `useCreateRisk()`
  - [ ] `useAddComment()`
- [ ] Implement React Query for caching and state management
- [ ] Add optimistic updates for mutations
- [ ] Handle loading states
- [ ] Handle error states

**Approval Gate**: Review hook patterns and caching strategy

---

### Week 6: Component Integration

#### Deliverable 6.1: Dashboard Page Backend Connection
**Time**: 2 days

**Tasks**:
- [ ] Update `ArbDashboardView.tsx` to use `useArbDashboard` hook
- [ ] Pass current scope (myQueue, myDomain, allDomains) to API
- [ ] Replace mock data references with API data
- [ ] Maintain existing UI/UX exactly as approved
- [ ] Add loading skeletons while data fetches
- [ ] Add error boundary for API failures
- [ ] Test with real backend data

**Testing Checklist**:
- [ ] My Queue tab shows only apps with assigned risks
- [ ] My Domain tab shows all apps in user's domain
- [ ] All Domains tab shows all applications
- [ ] HUD metrics calculate correctly from real data
- [ ] Watchlist displays real applications
- [ ] No UI regressions from Phase 1

**Approval Gate**: Demo dashboard with real backend data, verify no UI changes

#### Deliverable 6.2: Application Profile Backend Connection
**Time**: 2 days

**Tasks**:
- [ ] Update `ApplicationProfilePage.tsx` to use `useApplication` hook
- [ ] Fetch application detail on mount
- [ ] Display real risks from backend
- [ ] Test all existing interactions with real data
- [ ] Verify risk filtering works
- [ ] Verify domain tabs work

**Testing Checklist**:
- [ ] Page loads with real application data
- [ ] All risks display correctly
- [ ] Auto-generated risks show policy field metadata
- [ ] Manually created risks show creator name
- [ ] Filters and sorts work with real data

**Approval Gate**: Demo application detail page with real data

#### Deliverable 6.3: Risk Actions Backend Connection
**Time**: 3 days

**Tasks**:
- [ ] Connect "Update Status" button to `useUpdateRisk` hook
- [ ] Connect "Assign" button to `useUpdateRisk` hook
- [ ] Connect "Add Comment" button to `useAddComment` hook
- [ ] Connect "Create Risk" modal to `useCreateRisk` hook
- [ ] Implement optimistic UI updates
- [ ] Show success/error messages
- [ ] Refresh data after mutations
- [ ] Handle concurrent updates

**Testing Checklist**:
- [ ] Can update risk status → backend updates → UI reflects change
- [ ] Can reassign risk → backend updates → shows in assignee's queue
- [ ] Can add comment → appears in risk detail
- [ ] Can create manual risk → appears in application risk list
- [ ] Error messages display correctly
- [ ] Optimistic updates roll back on error

**Approval Gate**: Demo all risk actions working end-to-end with backend

---

### Week 7: Data Validation & Edge Cases

#### Deliverable 7.1: Backend Data Validation
**Time**: 2 days

**Tasks**:
- [ ] Verify backend returns data matching expected schema
- [ ] Add runtime validation using Zod or similar
- [ ] Handle missing fields gracefully (use defaults)
- [ ] Test with incomplete/malformed data from backend
- [ ] Add error logging for schema mismatches
- [ ] Document any schema discrepancies with backend team

**Testing Checklist**:
- [ ] Test with applications having 0 risks
- [ ] Test with applications having 100+ risks
- [ ] Test with risks missing optional fields
- [ ] Test with invalid enum values (graceful degradation)
- [ ] Test with null/undefined edge cases

**Approval Gate**: Review data validation approach and error handling

#### Deliverable 7.2: Performance Testing
**Time**: 2 days

**Tasks**:
- [ ] Test dashboard load time with 500+ applications
- [ ] Verify pagination performs well
- [ ] Test search/filter performance with large datasets
- [ ] Optimize renders using React.memo where needed
- [ ] Add performance monitoring (React DevTools Profiler)
- [ ] Document any performance issues for Phase 3

**Performance Targets**:
- Dashboard initial load: < 2 seconds
- Search/filter response: < 300ms
- Application detail load: < 1 second
- Risk action response: < 500ms

**Approval Gate**: Review performance metrics, decide if optimization needed now or Phase 3

#### Deliverable 7.3: Error Handling & Recovery
**Time**: 1 day

**Tasks**:
- [ ] Test with backend unavailable (network offline)
- [ ] Test with 404 (application not found)
- [ ] Test with 403 (unauthorized access)
- [ ] Test with 500 (server error)
- [ ] Implement retry logic for transient failures
- [ ] Add user-friendly error messages
- [ ] Add "Retry" buttons where appropriate
- [ ] Implement error reporting (Sentry or similar)

**Testing Checklist**:
- [ ] Offline mode shows meaningful error
- [ ] 404 errors show "Application not found" message
- [ ] 403 errors show "Access denied" message
- [ ] 500 errors show "Server error, try again" with retry button
- [ ] Network errors auto-retry 3 times before showing error

**Approval Gate**: Review error handling and user messaging

---

### End of Week 7: Phase 2 Review

**Deliverable**: Fully functional dashboard connected to real backend

**Review Session Agenda**:
1. **Full Integration Demo**:
   - Demonstrate all flows from Phase 1 with real backend data
   - Show data loads correctly for all tabs
   - Show all mutations work (update status, assign, comment, create risk)
   - Show error handling for network failures

2. **Data Validation Demo**:
   - Show handling of edge cases
   - Show handling of malformed data
   - Show error messages for user

3. **Performance Demo**:
   - Show load times with production-like data volumes
   - Show responsiveness of search/filter

**Approval Decision**:
- ✅ **Approve Integration** → Proceed to Phase 3 (Polish)
- 🔄 **Request Changes** → Fix specific issues, re-demo
- ❌ **Major Issues** → Address critical bugs, restart integration

**Deliverables Documentation**:
- [ ] API integration checklist (completed)
- [ ] Known backend issues log
- [ ] Performance benchmarks
- [ ] Error handling documentation

---

## Phase 3: Polish & Optimization (Week 8)

**Pre-requisite**: Phase 2 approved with backend fully integrated

**Goal**: Final polish, optimization, and production readiness

### Week 8: Advanced Features & Polish

#### Deliverable 8.1: Advanced Filtering & Search
**Time**: 2 days

**Tasks**:
- [ ] Implement saved filters (localStorage)
- [ ] Add "Save Current Filter" button
- [ ] Show saved filters as quick-access buttons
- [ ] Implement search highlighting in results
- [ ] Add search history (last 5 searches)
- [ ] Add "Clear All Filters" shortcut
- [ ] Add URL state for deep linking (filters in query params)

**Approval Gate**: Review advanced filtering features

#### Deliverable 8.2: Keyboard Navigation & Accessibility
**Time**: 1 day

**Tasks**:
- [ ] Implement keyboard shortcuts:
  - [ ] Tab through applications in watchlist
  - [ ] Enter to open application
  - [ ] Arrow keys to navigate
  - [ ] Escape to close modals/details
  - [ ] / (slash) to focus search
- [ ] Add ARIA labels to all interactive elements
- [ ] Test with screen reader (VoiceOver/NVDA)
- [ ] Ensure color contrast meets WCAG AA standards
- [ ] Add focus indicators for keyboard users
- [ ] Test tab order logical flow

**Approval Gate**: Accessibility audit review

#### Deliverable 8.3: Export & Reporting
**Time**: 1 day

**Tasks**:
- [ ] Implement "Export to CSV" functionality
  - [ ] Export current watchlist view (with active filters)
  - [ ] Include all relevant columns
  - [ ] Generate filename with timestamp
- [ ] Add print stylesheet for dashboard
- [ ] Add "Share View" feature (copy URL with filters)

**Approval Gate**: Review export functionality

#### Deliverable 8.4: Responsive & Mobile Optimization
**Time**: 1 day

**Tasks**:
- [ ] Finalize mobile layout (tested in Phase 1, polish now)
- [ ] Optimize touch targets (min 44x44px)
- [ ] Test on actual mobile devices (iOS, Android)
- [ ] Optimize table scrolling on mobile
- [ ] Test landscape orientation
- [ ] Add swipe gestures for mobile (optional)

**Approval Gate**: Mobile experience review

#### Deliverable 8.5: Performance Optimization
**Time**: 1 day

**Tasks**:
- [ ] Implement virtual scrolling for large lists (if needed)
- [ ] Add lazy loading for application detail risks
- [ ] Optimize bundle size:
  - [ ] Code splitting by route
  - [ ] Tree shake unused dependencies
  - [ ] Lazy load heavy components (charts, modals)
- [ ] Add request debouncing for search (already done, verify)
- [ ] Implement pagination for risk lists (if > 50 risks)
- [ ] Add service worker for offline support (optional)

**Approval Gate**: Review performance improvements and bundle size

#### Deliverable 8.6: Documentation & Handoff
**Time**: 1 day

**Tasks**:
- [ ] Update README with:
  - [ ] Setup instructions
  - [ ] Environment variables
  - [ ] Mock data toggle instructions
  - [ ] Development workflow
  - [ ] Testing instructions
- [ ] Create component documentation:
  - [ ] Storybook stories for key components (optional)
  - [ ] PropTypes/TypeScript interface documentation
- [ ] Create user guide (screenshots + descriptions)
- [ ] Document known limitations
- [ ] Create troubleshooting guide
- [ ] Record demo video (optional)

**Approval Gate**: Review documentation completeness

---

### End of Week 8: Phase 3 Review & Production Release

**Deliverable**: Production-ready ARB Dashboard

**Final Review Session Agenda**:
1. **Feature Completeness Check**:
   - All requirements from design spec implemented
   - All approval gates passed
   - All known issues resolved or documented

2. **Quality Assurance**:
   - Cross-browser testing (Chrome, Firefox, Safari, Edge)
   - Mobile testing (iOS, Android)
   - Accessibility testing
   - Performance benchmarks met

3. **Production Readiness**:
   - Error monitoring configured
   - Analytics configured (optional)
   - Logging in place
   - Documentation complete

**Approval Decision**:
- ✅ **Approve for Production** → Deploy to production
- 🔄 **Minor Changes** → Address and re-review
- ⏸️ **Hold for Iteration** → Prioritize changes for post-launch

**Deliverables Documentation**:
- [ ] Final feature list
- [ ] Known limitations
- [ ] Production deployment checklist
- [ ] Rollback plan
- [ ] Support documentation

---

## Timeline Summary

| Phase | Duration | Deliverable |
|-------|----------|-------------|
| **Phase 1: Mock Data & UI/UX** | 4 weeks | Complete dashboard with mock data |
| Week 1 | 5 days | Project setup + mock data |
| Week 2 | 5 days | Scoping tabs + HUD |
| Week 3 | 5 days | Application watchlist |
| Week 4 | 5 days | Application detail + insights |
| **Phase 1 Review** | - | Approval gate |
| **Phase 2: Backend Integration** | 3 weeks | Dashboard connected to real API |
| Week 5 | 5 days | API service layer |
| Week 6 | 5 days | Component integration |
| Week 7 | 5 days | Data validation + testing |
| **Phase 2 Review** | - | Approval gate |
| **Phase 3: Polish & Optimization** | 1 week | Production-ready dashboard |
| Week 8 | 5 days | Advanced features + polish |
| **Phase 3 Review** | - | Production release approval |
| **Total** | **8 weeks** | Ready for production |

**Note**: Timeline assumes 1 full-time developer. Can be accelerated with multiple developers working in parallel (e.g., one on components, one on API integration).

---

## Approval Process

### Approval Gates

Each phase has formal approval gates where stakeholders review deliverables:

**Who Approves**:
- Product Owner (overall feature approval)
- Design Lead (UI/UX approval)
- Engineering Lead (technical implementation approval)
- ARB Domain Experts (user acceptance testing)

**Approval Criteria**:
1. **Functionality**: All acceptance criteria met
2. **Design**: Matches approved design spec
3. **Quality**: No critical bugs, acceptable performance
4. **Documentation**: Complete and accurate

**Approval Process**:
1. Developer completes deliverable
2. Developer creates demo video or schedules live demo
3. Stakeholders review and provide feedback
4. Developer addresses feedback
5. Stakeholders give final approval or request changes
6. If approved, proceed to next deliverable
7. If major changes needed, revise and re-demo

---

## Risk Mitigation

### Risk 1: Backend API Not Ready for Phase 2
**Mitigation**: Continue using mock data with `USE_MOCK_DATA` flag. Build API integration layer but don't connect. This allows Phase 3 to proceed while waiting for backend.

### Risk 2: Design Changes During Phase 1
**Mitigation**: Frequent check-ins (end of each week). Catch design issues early. Have formal approval at end of Week 4 before committing to backend work.

### Risk 3: Performance Issues with Real Data
**Mitigation**: Include performance testing in Phase 2 Week 7. If issues found, have buffer time in Phase 3 for optimization.

### Risk 4: Scope Creep
**Mitigation**: Strict approval process. All new features must be explicitly approved and impact on timeline documented. Maintain "nice-to-have" backlog for post-launch.

### Risk 5: Browser Compatibility Issues
**Mitigation**: Test in all target browsers during Phase 1. Don't wait until Phase 3.

---

## Success Criteria

### Phase 1 Success Criteria
- [ ] All UI components built and functional with mock data
- [ ] All user flows demonstrated and working
- [ ] Design spec requirements met
- [ ] Stakeholder approval obtained
- [ ] No critical UI/UX issues identified

### Phase 2 Success Criteria
- [ ] Backend API successfully integrated
- [ ] All CRUD operations working
- [ ] Data validation in place
- [ ] Error handling implemented
- [ ] Performance targets met
- [ ] No regressions from Phase 1 UI/UX

### Phase 3 Success Criteria
- [ ] All polish items completed
- [ ] Accessibility standards met
- [ ] Documentation complete
- [ ] Cross-browser testing passed
- [ ] Production deployment checklist complete
- [ ] Stakeholder sign-off for production release

---

## Change Management

### Code Change Policy

**No code changes without approval** - This includes:
- Component structure changes
- Data model changes
- API contract changes
- Major refactoring
- Dependency additions

**Exception**: Bug fixes for critical issues may proceed without approval if they don't change functionality.

### Change Request Process

1. **Identify Change**: Developer identifies need for change
2. **Document Impact**: Create change request document:
   - What needs to change
   - Why it needs to change
   - Impact on timeline
   - Impact on other components
   - Alternative approaches
3. **Submit for Approval**: Send to stakeholder group
4. **Review**: Stakeholders review and discuss
5. **Decision**: Approve, deny, or request modifications
6. **Implement**: If approved, proceed with change

### Change Request Template

```markdown
## Change Request: [Title]

**Requested By**: [Name]
**Date**: [Date]
**Phase**: [1, 2, or 3]
**Priority**: [Critical, High, Medium, Low]

**Description**:
[Clear description of what needs to change]

**Justification**:
[Why this change is necessary]

**Impact Analysis**:
- Timeline impact: [+X days]
- Component impact: [List affected components]
- API impact: [Yes/No, details]
- Design impact: [Yes/No, details]

**Alternatives Considered**:
1. [Alternative 1]
2. [Alternative 2]

**Recommendation**: [Approve/Deny with reasoning]

**Approval**:
- [ ] Product Owner
- [ ] Design Lead
- [ ] Engineering Lead
```

---

## Communication Plan

### Weekly Status Updates

**Sent Every**: Friday EOD
**To**: All stakeholders
**Format**:
```markdown
## ARB Dashboard Weekly Status - Week [X]

**Phase**: [Current phase]
**Overall Status**: 🟢 On Track / 🟡 At Risk / 🔴 Blocked

**Completed This Week**:
- [Deliverable 1]
- [Deliverable 2]

**Planned Next Week**:
- [Deliverable 3]
- [Deliverable 4]

**Blockers/Risks**:
- [Issue 1]
- [Issue 2]

**Approval Needed**:
- [Approval gate X]

**Demo Available**: [Link to recording or schedule]
```

### Demo Schedule

**Phase 1 Demos**:
- Week 1 End: Mock data + project structure
- Week 2 End: Tabs + HUD
- Week 3 End: Watchlist
- Week 4 End: Complete Phase 1 (formal approval)

**Phase 2 Demos**:
- Week 6 End: Backend integration
- Week 7 End: Complete Phase 2 (formal approval)

**Phase 3 Demo**:
- Week 8 End: Final review (production approval)

---

## Development Environment Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- Git
- VS Code (recommended)

### Initial Setup

```bash
# Clone repository
git clone <repo-url>
cd cockpit

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Configure for mock data (default)
echo "USE_MOCK_DATA=true" >> .env.local

# Start development server
npm run dev

# Navigate to ARB dashboard
# http://localhost:5173/arb-dashboard
```

### Toggle Between Mock and Real Data

```typescript
// src/features/arb-dashboard/config.ts
export const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true';

// In components:
import { USE_MOCK_DATA } from './config';

if (USE_MOCK_DATA) {
  // Use mock data from mockArbData.ts
  setData(mockApplications);
} else {
  // Fetch from API
  const data = await getArbDashboard();
  setData(data);
}
```

### Running Tests

```bash
# Unit tests
npm run test

# E2E tests (Cypress)
npm run test:e2e

# Run specific test file
npm run test -- ApplicationWatchlist.test.tsx
```

---

## Appendix A: Mock Data Examples

### Example Application with Varied Risks

```typescript
{
  id: 'app-001',
  name: 'Customer Portal',
  businessUnit: 'Retail',
  owner: 'Jane Smith',
  ownerId: 'user-001',
  aggregatedRiskScore: 87,
  totalOpenItems: 8,
  riskBreakdown: {
    critical: 3,
    high: 4,
    medium: 1,
    low: 0
  },
  domains: ['security', 'data'],
  hasAssignedRisks: true,
  lastActivityDate: '2025-10-11T14:30:00Z',
  risks: [
    {
      id: 'risk-001',
      title: 'Missing Security Evidence: WAF Configuration',
      description: 'Application has not provided evidence of Web Application Firewall configuration as required by security policy SEC-001.',
      priority: 'CRITICAL',
      status: 'PENDING_REVIEW',
      arbDomain: 'security',
      isAutoGenerated: true,
      fieldKey: 'waf_protection',
      riskType: 'MISSING_EVIDENCE',
      ttlDays: 90,
      assignedTo: 'user-002',
      assignedToName: 'John Doe (Security ARB)',
      createdDate: '2025-10-06T10:00:00Z',
      updatedDate: '2025-10-06T10:00:00Z',
      dueDate: null,
      tags: ['waf', 'critical', 'internet-facing']
    },
    {
      id: 'risk-002',
      title: 'Stale Evidence: Encryption at Rest (95 days old)',
      description: 'Encryption at rest evidence expired 5 days ago. A1 rating requires evidence refresh every 90 days.',
      priority: 'CRITICAL',
      status: 'OPEN',
      arbDomain: 'security',
      isAutoGenerated: true,
      fieldKey: 'encryption_at_rest',
      riskType: 'STALE_EVIDENCE',
      ttlDays: 90,
      daysOverdue: 5,
      assignedTo: 'user-002',
      assignedToName: 'John Doe (Security ARB)',
      createdDate: '2025-10-01T08:00:00Z',
      updatedDate: '2025-10-10T15:00:00Z',
      dueDate: '2025-10-15T23:59:59Z',
      tags: ['encryption', 'stale']
    },
    {
      id: 'risk-003',
      title: 'Missing Rate Limiting on Public API',
      description: 'During architecture review, discovered that the /api/v1/orders endpoint lacks rate limiting, creating DoS vulnerability.',
      priority: 'HIGH',
      status: 'IN_PROGRESS',
      arbDomain: 'security',
      isAutoGenerated: false,
      createdBy: 'user-002',
      createdByName: 'John Doe (Security ARB)',
      assignedTo: 'user-001',
      assignedToName: 'Jane Smith',
      createdDate: '2025-10-09T14:00:00Z',
      updatedDate: '2025-10-11T09:30:00Z',
      dueDate: '2025-10-20T23:59:59Z',
      category: 'API Security',
      tags: ['api', 'rate-limiting', 'manual-finding'],
      comments: [
        {
          id: 'comment-001',
          userId: 'user-002',
          userName: 'John Doe',
          text: 'Discussed with app team. They will implement rate limiting using Redis.',
          createdDate: '2025-10-11T09:30:00Z'
        }
      ]
    }
    // ... more risks
  ]
}
```

### Example Edge Cases

```typescript
// Application with 0 risks
{
  id: 'app-050',
  name: 'Internal Wiki',
  aggregatedRiskScore: 15,
  totalOpenItems: 0,
  riskBreakdown: { critical: 0, high: 0, medium: 0, low: 0 },
  risks: []
}

// Application with 50+ risks (pagination test)
{
  id: 'app-025',
  name: 'Legacy Mainframe Gateway',
  aggregatedRiskScore: 95,
  totalOpenItems: 53,
  riskBreakdown: { critical: 12, high: 23, medium: 15, low: 3 },
  risks: [/* 53 risk objects */]
}

// Application with only manual risks
{
  id: 'app-030',
  name: 'Experimental ML Service',
  aggregatedRiskScore: 68,
  totalOpenItems: 5,
  risks: [
    // All 5 risks have isAutoGenerated: false
  ]
}
```

---

## Appendix B: Component File Structure

```
src/features/arb-dashboard/
├── index.tsx                          # Main export
├── ArbDashboardView.tsx               # Main container
├── config.ts                          # USE_MOCK_DATA flag
│
├── components/
│   ├── ScopingTabs.tsx
│   ├── HeadsUpDisplay/
│   │   ├── index.tsx
│   │   ├── CriticalRisksMetric.tsx
│   │   ├── OpenItemsMetric.tsx
│   │   ├── PendingReviewMetric.tsx
│   │   ├── HealthScoreMetric.tsx
│   │   └── NetChangeMetric.tsx
│   │
│   ├── ApplicationWatchlist/
│   │   ├── index.tsx
│   │   ├── WatchlistControls.tsx
│   │   ├── WatchlistTable.tsx
│   │   ├── ApplicationRow.tsx
│   │   └── WatchlistPagination.tsx
│   │
│   ├── ApplicationProfilePage/
│   │   ├── index.tsx
│   │   ├── ApplicationHeader.tsx
│   │   ├── RiskCard.tsx
│   │   ├── RiskFilters.tsx
│   │   └── CreateRiskModal.tsx
│   │
│   └── InsightsSection/
│       ├── index.tsx
│       ├── ResolutionPerformance.tsx
│       ├── KeyInsights.tsx
│       └── DomainSpecificInsights.tsx
│
├── mocks/
│   ├── mockArbData.ts                 # Main mock data file
│   ├── mockApplications.ts            # 50 applications
│   ├── mockRisks.ts                   # Risk generators
│   ├── mockUsers.ts                   # User profiles
│   └── mockMetrics.ts                 # Calculated metrics
│
├── api/
│   ├── arbDashboardApi.ts             # API client functions
│   └── types.ts                       # TypeScript interfaces
│
├── hooks/
│   ├── useArbDashboard.ts
│   ├── useApplication.ts
│   ├── useUpdateRisk.ts
│   ├── useCreateRisk.ts
│   └── useAddComment.ts
│
├── utils/
│   ├── calculations.ts                # Risk score, insights logic
│   ├── filters.ts                     # Filter/sort functions
│   └── formatting.ts                  # Date, number formatting
│
└── styles/
    └── arbDashboard.css               # Component styles
```

---

## Appendix C: Testing Checklist

### Phase 1 Testing (Mock Data)

**Functional Tests**:
- [ ] All tabs switch correctly
- [ ] HUD metrics calculate correctly
- [ ] Watchlist displays all applications
- [ ] Search filters applications
- [ ] Sort changes order
- [ ] Filters work individually and combined
- [ ] Pagination works
- [ ] Application detail loads
- [ ] Risk cards expand/collapse
- [ ] Create risk modal opens and closes
- [ ] Back navigation works

**Visual Tests**:
- [ ] Layout matches design spec
- [ ] Colors match design spec
- [ ] Typography correct
- [ ] Icons render correctly
- [ ] Spacing consistent
- [ ] Hover states work
- [ ] Active states work
- [ ] Loading states display

**Responsive Tests**:
- [ ] Desktop (1920x1080)
- [ ] Laptop (1366x768)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)
- [ ] Landscape orientation

### Phase 2 Testing (Backend Integration)

**Integration Tests**:
- [ ] Dashboard loads data from API
- [ ] Metrics calculate from real data
- [ ] Applications display correctly
- [ ] Application detail loads
- [ ] Risk update sends to backend
- [ ] Risk assignment sends to backend
- [ ] Comment add sends to backend
- [ ] Risk creation sends to backend

**Error Handling Tests**:
- [ ] Network offline
- [ ] 404 application not found
- [ ] 403 unauthorized
- [ ] 500 server error
- [ ] Invalid data format
- [ ] Missing required fields

**Performance Tests**:
- [ ] Dashboard loads in < 2s
- [ ] Application detail loads in < 1s
- [ ] Search responds in < 300ms
- [ ] Filter responds in < 300ms
- [ ] No memory leaks
- [ ] No unnecessary re-renders

### Phase 3 Testing (Production Readiness)

**Browser Compatibility**:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

**Accessibility Tests**:
- [ ] Screen reader compatible
- [ ] Keyboard navigation works
- [ ] Color contrast WCAG AA
- [ ] Focus indicators visible
- [ ] Alt text on images
- [ ] ARIA labels present

**Security Tests**:
- [ ] No sensitive data in console
- [ ] No XSS vulnerabilities
- [ ] CSRF protection in place
- [ ] Authentication enforced
- [ ] Authorization checked

---

**End of Implementation Plan**
