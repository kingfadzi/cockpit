/**
 * ARB Dashboard API Service
 * Handles all API calls for ARB Dashboard feature
 */

import { api } from '../../../api/client';
import type { ArbDashboardResponse, Application, DashboardMetrics, DashboardScope } from './types';

export interface GetArbApplicationsParams {
  scope: DashboardScope;
  userId?: string;
  includeRisks?: boolean;
  page?: number;
  size?: number;
}

export interface GetArbMetricsParams {
  scope: DashboardScope;
  userId?: string;
}

export interface GetArbApplicationsResponse {
  scope: DashboardScope;
  arbName: string;
  userId?: string;
  totalCount: number;
  page: number;
  pageSize: number;
  applications: Application[];
}

export interface GetArbMetricsResponse extends DashboardMetrics {
  scope: DashboardScope;
  arbName: string;
  userId?: string;
}

/**
 * Get ARB applications (watchlist)
 */
export async function getArbApplications(
  arbName: string,
  params: GetArbApplicationsParams
): Promise<GetArbApplicationsResponse> {
  const queryParams = new URLSearchParams();
  queryParams.set('scope', params.scope);

  if (params.userId) {
    queryParams.set('userId', params.userId);
  }

  if (params.includeRisks !== undefined) {
    queryParams.set('includeRisks', params.includeRisks.toString());
  }

  if (params.page !== undefined) {
    queryParams.set('page', params.page.toString());
  }

  if (params.size !== undefined) {
    queryParams.set('size', params.size.toString());
  }

  const response = await api.get<GetArbApplicationsResponse>(
    `/api/v1/domain-risks/arb/${arbName}/applications?${queryParams.toString()}`
  );

  return response.data;
}

/**
 * Get ARB dashboard metrics
 */
export async function getArbMetrics(
  arbName: string,
  params: GetArbMetricsParams
): Promise<GetArbMetricsResponse> {
  const queryParams = new URLSearchParams();
  queryParams.set('scope', params.scope);

  if (params.userId) {
    queryParams.set('userId', params.userId);
  }

  const response = await api.get<GetArbMetricsResponse>(
    `/api/v1/domain-risks/arb/${arbName}/metrics?${queryParams.toString()}`
  );

  return response.data;
}

/**
 * Fetch complete ARB dashboard data (applications + metrics)
 */
export async function fetchArbDashboard(
  arbName: string,
  scope: DashboardScope,
  userId?: string
): Promise<ArbDashboardResponse> {
  // Fetch applications and metrics in parallel
  const [applicationsResponse, metricsResponse] = await Promise.all([
    getArbApplications(arbName, { scope, userId, includeRisks: true }),
    getArbMetrics(arbName, { scope, userId })
  ]);

  // Combine into dashboard response format
  return {
    applications: applicationsResponse.applications,
    metrics: metricsResponse,
    insights: [] // TODO: Generate insights on frontend or fetch from backend
  };
}

/**
 * Create a new risk item
 */
export interface CreateRiskPayload {
  appId?: string;
  title: string;
  description: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  fieldKey: string;
  profileFieldId?: string;
  evidenceId?: string;
  createdBy: string;
}

export async function createRiskItem(payload: CreateRiskPayload): Promise<unknown> {
  const response = await api.post('/api/v1/risk-items', payload);
  return response.data;
}
