/**
 * Main Mock Data Service for ARB Dashboard
 * Provides filtered data based on scope (My Queue, My Domain, All Domains)
 */

import { Application, ArbDashboardResponse, DashboardMetrics, Insight, DashboardScope, ArbDomain } from '../api/types';
import { mockApplications } from './mockApplications';
import { currentMockUser } from './mockUsers';

/**
 * Recalculate assignedToMeBreakdown and hasAssignedRisks for a given userId
 */
function updateApplicationForUser(app: Application, userId: string): Application {
  const assignedToMeBreakdown = {
    critical: app.risks.filter(r => r.priority === 'CRITICAL' && r.status !== 'RESOLVED' && r.assignedTo === userId).length,
    high: app.risks.filter(r => r.priority === 'HIGH' && r.status !== 'RESOLVED' && r.assignedTo === userId).length,
    medium: app.risks.filter(r => r.priority === 'MEDIUM' && r.status !== 'RESOLVED' && r.assignedTo === userId).length,
    low: app.risks.filter(r => r.priority === 'LOW' && r.status !== 'RESOLVED' && r.assignedTo === userId).length,
  };

  const hasAssignedRisks = app.risks.some(r => r.assignedTo === userId);

  return {
    ...app,
    assignedToMeBreakdown,
    hasAssignedRisks,
  };
}

/**
 * Filter applications based on scope
 */
function filterApplicationsByScope(
  applications: Application[],
  scope: DashboardScope,
  userId: string,
  userDomain: ArbDomain
): Application[] {
  // First, update all applications with current user's data
  const updatedApps = applications.map(app => updateApplicationForUser(app, userId));

  switch (scope) {
    case 'my-queue':
      // Only apps with risks assigned to current user
      return updatedApps.filter(app =>
        app.risks.some(risk => risk.assignedTo === userId && risk.status !== 'RESOLVED')
      );

    case 'my-domain':
      // Apps with risks in user's ARB domain
      return updatedApps.filter(app =>
        app.risks.some(risk => risk.arbDomain === userDomain)
      );

    case 'all-domains':
      // All applications
      return updatedApps;

    default:
      return updatedApps;
  }
}

/**
 * Calculate dashboard metrics from applications
 */
function calculateMetrics(applications: Application[]): DashboardMetrics {
  const allRisks = applications.flatMap(app => app.risks).filter(r => r.status !== 'RESOLVED');

  const criticalCount = allRisks.filter(r => r.priority === 'CRITICAL').length;
  const openItemsCount = allRisks.filter(r => r.status === 'OPEN' || r.status === 'IN_PROGRESS').length;
  const pendingReviewCount = allRisks.filter(r => r.status === 'PENDING_REVIEW' || r.status === 'NEW').length;

  // Calculate average risk score
  const totalScore = applications.reduce((sum, app) => sum + app.aggregatedRiskScore, 0);
  const averageRiskScore = applications.length > 0 ? Math.round(totalScore / applications.length) : 0;

  // Determine health grade
  let healthGrade: DashboardMetrics['healthGrade'];
  if (averageRiskScore >= 90) healthGrade = 'A';
  else if (averageRiskScore >= 75) healthGrade = 'B';
  else if (averageRiskScore >= 60) healthGrade = 'C';
  else if (averageRiskScore >= 40) healthGrade = 'D';
  else healthGrade = 'F';

  // Calculate recent activity (mock data - in real app, this comes from backend)
  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const newRisksLast7Days = allRisks.filter(r =>
    new Date(r.createdDate) >= sevenDaysAgo
  ).length;

  const resolvedLast7Days = applications.flatMap(app => app.risks).filter(r =>
    r.status === 'RESOLVED' &&
    new Date(r.updatedDate) >= sevenDaysAgo
  ).length;

  const newRisksLast30Days = allRisks.filter(r =>
    new Date(r.createdDate) >= thirtyDaysAgo
  ).length;

  const resolvedLast30Days = applications.flatMap(app => app.risks).filter(r =>
    r.status === 'RESOLVED' &&
    new Date(r.updatedDate) >= thirtyDaysAgo
  ).length;

  return {
    criticalCount,
    openItemsCount,
    pendingReviewCount,
    averageRiskScore,
    healthGrade,
    recentActivity: {
      newRisksLast7Days,
      resolvedLast7Days,
      newRisksLast30Days,
      resolvedLast30Days
    }
  };
}

/**
 * Generate insights from application data
 */
function generateInsights(applications: Application[]): Insight[] {
  const insights: Insight[] = [];
  const allRisks = applications.flatMap(app => app.risks).filter(r => r.status !== 'RESOLVED');

  // 1. Concentration Risk
  const appsByRisk = applications
    .filter(app => app.totalOpenItems > 0)
    .sort((a, b) => b.riskBreakdown.critical - a.riskBreakdown.critical)
    .slice(0, 3);

  const totalCritical = allRisks.filter(r => r.priority === 'CRITICAL').length;
  const top3Critical = appsByRisk.reduce((sum, app) => sum + app.riskBreakdown.critical, 0);
  const top3Percentage = totalCritical > 0 ? Math.round((top3Critical / totalCritical) * 100) : 0;

  if (top3Percentage > 40 && appsByRisk.length >= 3) {
    insights.push({
      id: 'insight-001',
      type: 'concentration',
      icon: '🎯',
      text: `${appsByRisk.length} applications (${appsByRisk.map(a => a.name).join(', ')}) account for ${top3Percentage}% of all critical risks`,
      recommendation: 'Concentration risk - focus effort here',
      priority: 'high',
      relatedApps: appsByRisk.map(a => a.id)
    });
  }

  // 2. High Volume Applications
  const avgOpenItems = applications.length > 0 ?
    applications.reduce((sum, app) => sum + app.totalOpenItems, 0) / applications.length : 0;
  const highVolumeApps = applications.filter(app => app.totalOpenItems > avgOpenItems * 1.5);

  if (highVolumeApps.length > 0) {
    insights.push({
      id: 'insight-002',
      type: 'volume',
      icon: '📊',
      text: `${highVolumeApps.length} applications have high volume (>${Math.ceil(avgOpenItems * 1.5)} open items each)`,
      recommendation: 'Consider dedicated task force',
      priority: 'medium',
      relatedApps: highVolumeApps.slice(0, 5).map(a => a.id)
    });
  }

  // 3. Data Quality Issues
  const suspiciousApps = applications.filter(app =>
    app.aggregatedRiskScore > 70 && app.totalOpenItems === 0
  );

  if (suspiciousApps.length > 0) {
    insights.push({
      id: 'insight-003',
      type: 'data_quality',
      icon: '⚠️',
      text: `${suspiciousApps.length} applications have NO open items despite risk scores >70`,
      recommendation: 'Possible data quality issue - verify these apps',
      priority: 'medium',
      relatedApps: suspiciousApps.map(a => a.id)
    });
  }

  // 4. Status Bottleneck
  const pendingCount = allRisks.filter(r => r.status === 'PENDING_REVIEW' || r.status === 'NEW').length;
  const pendingPercentage = allRisks.length > 0 ? Math.round((pendingCount / allRisks.length) * 100) : 0;

  if (pendingPercentage > 40) {
    insights.push({
      id: 'insight-004',
      type: 'bottleneck',
      icon: '🔥',
      text: `${pendingPercentage}% of all risks stuck in PENDING REVIEW status`,
      recommendation: 'Review queue is the bottleneck - need triage sprint',
      priority: 'high'
    });
  }

  // 5. Unassigned Risks
  const unassignedRisks = allRisks.filter(risk => !risk.assignedTo);
  const appsWithUnassigned = applications.filter(app =>
    app.risks.some(r => !r.assignedTo && r.status !== 'RESOLVED')
  );

  if (unassignedRisks.length > 0) {
    insights.push({
      id: 'insight-005',
      type: 'volume',
      icon: '👤',
      text: `${appsWithUnassigned.length} applications have unassigned risks (${unassignedRisks.length} total risks)`,
      recommendation: 'Assign ownership to improve accountability',
      priority: 'medium',
      relatedApps: appsWithUnassigned.map(a => a.id)
    });
  }

  return insights;
}

/**
 * Get mock ARB dashboard data
 */
export function getMockArbDashboard(
  scope: DashboardScope = 'my-queue',
  userId: string = currentMockUser.id,
  userDomain: ArbDomain = currentMockUser.arbDomain
): ArbDashboardResponse {
  console.log(`[Mock Data] Fetching dashboard for scope: ${scope}, user: ${userId}, domain: ${userDomain}`);

  const filteredApps = filterApplicationsByScope(mockApplications, scope, userId, userDomain);
  const metrics = calculateMetrics(filteredApps);
  const insights = generateInsights(filteredApps);

  // Sort applications by risk score (descending)
  const sortedApps = [...filteredApps].sort((a, b) => b.aggregatedRiskScore - a.aggregatedRiskScore);

  console.log(`[Mock Data] Returning ${sortedApps.length} applications with ${metrics.openItemsCount} open items`);

  return {
    applications: sortedApps,
    metrics,
    insights
  };
}

/**
 * Get mock application detail by ID
 */
export function getMockApplication(appId: string): Application | null {
  const app = mockApplications.find(a => a.id === appId);
  if (!app) {
    console.warn(`[Mock Data] Application not found: ${appId}`);
    return null;
  }
  return app;
}

/**
 * Export mock data for direct access
 */
export { mockApplications } from './mockApplications';
export { currentMockUser, mockUsers } from './mockUsers';
