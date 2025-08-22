import axios from 'axios';
import { mockApi } from './mock';
import type {
    AppSummary,
    EvidenceItem,
    RequirementsResponse,
    ReleaseItem,
    PortfolioKpis,
} from './types';

export const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8080';
const USE_MOCK = (import.meta.env.VITE_USE_MOCK || '1') === '1';

// Axios instance for real backend calls
export const api = axios.create({ baseURL: API_BASE, withCredentials: false });

api.interceptors.response.use(
    (r) => r,
    (err) => {
        const msg = err?.response?.data?.title || err.message;
        console.error('API Error:', msg, err?.response?.data);
        return Promise.reject(err);
    },
);

export const endpoints = {
    listApps: async (): Promise<AppSummary[]> =>
        USE_MOCK ? mockApi.listApps() : (await api.get<AppSummary[]>('/api/apps')).data,
    getApp: async (appId: string): Promise<AppSummary> =>
        USE_MOCK ? mockApi.getApp(appId) : (await api.get<AppSummary>(`/api/apps/${appId}`)).data,
    getProfile: async (appId: string): Promise<any> =>
        USE_MOCK ? mockApi.getProfile(appId) : (await api.get(`/api/apps/${appId}/profile`)).data,
    getEvidence: async (appId: string): Promise<EvidenceItem[]> =>
        USE_MOCK ? mockApi.getEvidence(appId) : (await api.get<EvidenceItem[]>(`/api/apps/${appId}/evidence`)).data,
    createEvidence: async (appId: string, payload: any): Promise<any> =>
        USE_MOCK ? mockApi.createEvidence(appId, payload) : (await api.post(`/api/apps/${appId}/evidence`, payload)).data,
    getRequirements: async (appId: string, params?: Record<string, string>): Promise<RequirementsResponse> =>
        USE_MOCK ? mockApi.getRequirements(appId, params) : (await api.get<RequirementsResponse>(`/api/apps/${appId}/requirements`, { params })).data,
    getReleases: async (appId: string): Promise<ReleaseItem[]> =>
        USE_MOCK ? mockApi.getReleases(appId) : (await api.get<ReleaseItem[]>(`/api/apps/${appId}/releases`)).data,
    getAllEvidence: async (): Promise<EvidenceItem[]> =>
        USE_MOCK ? mockApi.getAllEvidence() : (await api.get<EvidenceItem[]>(`/api/evidence`)).data,
    getPortfolioKpis: async (): Promise<PortfolioKpis> =>
        USE_MOCK ? mockApi.getPortfolioKpis() : (await api.get<PortfolioKpis>(`/api/kpis/portfolio`)).data,
    // New: createApp endpoint
    createApp: async (appId: string): Promise<AppSummary> =>
        USE_MOCK ? mockApi.createApp(appId) : (await api.post<AppSummary>('/api/apps', { appId })).data,
};
