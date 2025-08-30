import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { mockApi } from './mock';
import type {
    AppSummary,
    EvidenceItem,
    RequirementsResponse,
    ReleaseItem,
    PortfolioKpis,
    ServerApp,
    ProfileResponse,
    AppKpis,
} from './types';

export const API_BASE = '';
export const AUDIT_API_BASE = 'http://localhost:8081';
const USE_MOCK = (import.meta.env.VITE_USE_MOCK || '1') === '1';

/** ------- Debug toggle (can flip at runtime from DevTools) ------- */
let API_DEBUG = false;
export function enableApiDebug(on: boolean) {
    API_DEBUG = on;
    if (API_DEBUG) console.info('[api] debug logging ENABLED');
    else console.info('[api] debug logging disabled');
}

/** ------- Axios instance ------- */
export const api: AxiosInstance = axios.create({
    baseURL: API_BASE,
    withCredentials: false,
    // By default, axios treats only 2xx as success. We keep that.
});

/** ------- Audit API instance ------- */
export const auditApi: AxiosInstance = axios.create({
    baseURL: AUDIT_API_BASE,
    withCredentials: false,
    headers: {
        'X-Api-Key': 'dev-key'
    }
});

/** Per-request timing + id */
api.interceptors.request.use((config: AxiosRequestConfig) => {
    // tiny req id
    const rid = Math.random().toString(36).slice(2, 9);
    config.headers = config.headers ?? {};


    if (API_DEBUG) {
        console.groupCollapsed(
            `%c[api][${rid}] ➜ ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`,
            'color:#888'
        );
        console.log('baseURL:', config.baseURL);
        console.log('url:', config.url);
        console.log('params:', config.params);
        console.log('data:', config.data);
        console.log('headers:', config.headers);
        console.groupEnd();
    }
    return config;
});

/** Response timing + logging */
api.interceptors.response.use(
    (res: AxiosResponse) => {
        const meta = (res.config as any).meta || {};
        const ms = (performance.now() - (meta.startedAt || performance.now())).toFixed(1);
        if (API_DEBUG) {
            console.groupCollapsed(
                `%c[api][${meta.rid}] ⇦ ${res.status} ${res.config.method?.toUpperCase()} ${res.config.url} (${ms}ms)`,
                'color:#0a0'
            );
            console.log('data:', res.data);
            console.log('headers:', res.headers);
            console.groupEnd();
        }
        return res;
    },
    (err: AxiosError) => {
        const cfg = err.config || {};
        const meta = (cfg as any).meta || {};
        const ms = (performance.now() - (meta.startedAt || performance.now())).toFixed(1);
        const status = err.response?.status;
        const title = (err.response?.data as any)?.title;
        const detail = (err.response?.data as any)?.detail;

        console.groupCollapsed(
            `%c[api][${meta.rid}] ✖ ${status ?? 'ERR'} ${cfg.method?.toUpperCase()} ${cfg.url} (${ms}ms)`,
            'color:#a00'
        );
        console.error('message:', err.message);
        if (title || detail) console.error('server:', { title, detail });
        console.error('response data:', err.response?.data);
        console.error('request data:', cfg.data);
        console.error('params:', cfg.params);
        console.groupEnd();

        return Promise.reject(err);
    }
);

/** ------- Normalizers for POHome ------- */
function normalizeCriticality(input?: string | null): AppSummary['criticality'] {
    if (!input) return undefined;
    const v = String(input).trim().toUpperCase();
    return (['A', 'B', 'C', 'D'].includes(v) ? (v as AppSummary['criticality']) : undefined);
}

const toClient = (a: ServerApp): AppSummary => ({
    appId: a.appId,
    name: a.name ?? null,
    // POHome expects this key exactly:
    criticality: normalizeCriticality(a.appCriticalityAssessment),
    businessServiceName: a.businessServiceName ?? null,
    // POHome reads snake_case keys here (so convert camel→snake)
    install_type: a.installType ?? null,
    architecture_type: a.architectureType ?? null,
    // Business fields from API
    scope: a.scope ?? null,
    transactionCycle: a.transactionCycle ?? null,
    applicationType: a.applicationType ?? null,
    applicationTier: a.applicationTier ?? null,
    housePosition: a.housePosition ?? null,
    operationalStatus: a.operationalStatus ?? null,
    onboardingStatus: a.onboardingStatus ?? null,
    businessApplicationSysId: a.businessApplicationSysId ?? null,
    transactionCycleId: a.transactionCycleId ?? null,
    // Ratings
    integrityRating: a.integrityRating ?? null,
    availabilityRating: a.availabilityRating ?? null,
    resilienceRating: a.resilienceRating ?? null,
    securityRating: a.securityRating ?? null,
    confidentialityRating: a.confidentialityRating ?? null,
    // Timestamps
    createdAt: a.createdAt ?? null,
    updatedAt: a.updatedAt ?? null,
    // Hierarchy
    hasChildren: a.hasChildren ?? null,
    parentAppId: a.parentAppId ?? null,
    parentAppName: a.parentAppName ?? null,
});

/** Extract an array from either [] or {items:[...]} or [[]] */
function coerceArray<T = unknown>(payload: any): T[] {
    if (Array.isArray(payload)) return payload as T[];
    if (payload && Array.isArray(payload.items)) return payload.items as T[];
    // Some backends wrap again: { data: { items: [...] } }
    if (payload?.data && Array.isArray(payload.data.items)) return payload.data.items as T[];
    return [];
}

/** ------- Endpoints ------- */
export const endpoints = {
    /** Apps (grid) */
    listApps: async (): Promise<AppSummary[]> => {
        if (USE_MOCK) return mockApi.listApps();
        const res = await api.get<any>('/api/apps');
        if (API_DEBUG) console.debug('[api] /api/apps raw:', res.data);
        const arr = coerceArray<ServerApp>(res.data);
        return arr.map(toClient);
    },

    /** Single app (details) */
    getApp: async (appId: string): Promise<AppSummary> => {
        if (USE_MOCK) return mockApi.getApp(appId);
        const res = await api.get<any>(`/api/apps/${appId}`);
        const raw = (res.data?.data ?? res.data) as ServerApp;
        if (API_DEBUG) console.debug(`[api] /api/apps/${appId} raw:`, raw);
        return toClient(raw);
    },

    /** Profile snapshot */
    getProfile: async (appId: string): Promise<ProfileResponse> =>
        USE_MOCK ? mockApi.getProfile(appId) : (await api.get<ProfileResponse>(`/api/apps/${appId}/profile`)).data,

    /** Evidence (per app) */
    getEvidence: async (appId: string): Promise<EvidenceItem[]> =>
        USE_MOCK
            ? mockApi.getEvidence(appId)
            : (await api.get<EvidenceItem[]>(`/api/apps/${appId}/evidence`)).data,

    /** Create/link evidence */
    createEvidence: async (appId: string, payload: any): Promise<any> =>
        USE_MOCK ? mockApi.createEvidence(appId, payload) : (await api.post(`/api/apps/${appId}/evidence`, payload)).data,

    /** Requirements */
    getRequirements: async (appId: string, params?: Record<string, string>): Promise<RequirementsResponse> =>
        USE_MOCK
            ? mockApi.getRequirements(appId, params)
            : (await api.get<RequirementsResponse>(`/api/apps/${appId}/requirements`, { params })).data,

    /** Releases */
    getReleases: async (appId: string): Promise<ReleaseItem[]> =>
        USE_MOCK ? mockApi.getReleases(appId) : (await api.get<ReleaseItem[]>(`/api/apps/${appId}/releases`)).data,

    /** Portfolio‑level KPIs (your backend path is /api/apps/kpis) */
    getPortfolioKpis: async (): Promise<PortfolioKpis> =>
        USE_MOCK ? mockApi.getPortfolioKpis() : (await api.get<PortfolioKpis>(`/api/apps/kpis`)).data,

    /** App-specific KPIs */
    getAppKpis: async (appId: string): Promise<AppKpis> =>
        USE_MOCK ? mockApi.getAppKpis(appId) : (await api.get<AppKpis>(`/api/apps/${appId}/kpis`)).data,

    /** Create app (minimal) */
    createApp: async (appId: string): Promise<AppSummary> =>
        USE_MOCK
            ? mockApi.createApp(appId)
            : toClient((await api.post<ServerApp>('/api/apps', { appId })).data),

    /** Get child apps */
    getChildApps: async (appId: string): Promise<AppSummary[]> =>
        USE_MOCK 
            ? mockApi.getChildApps(appId)
            : (await api.get<ServerApp[]>(`/api/apps/${appId}/children`)).data.map(toClient),

    /** Documents (paginated) */
    getDocs: async (appId: string, params?: Record<string, string>): Promise<any> =>
        USE_MOCK 
            ? { 
                page: 1, 
                pageSize: 10, 
                total: 3, 
                items: [
                    {
                        documentId: 'doc_1',
                        title: 'Security Policy Document',
                        canonicalUrl: 'https://docs.company.com/security/policy.pdf',
                        sourceType: 'Confluence',
                        relatedEvidenceFields: ['encryption_at_rest', 'secrets_management', 'security_testing'],
                        linkHealth: 200,
                        latestVersion: {
                            docVersionId: 'ver_1',
                            versionId: 'v1.2.0',
                            urlAtVersion: 'https://docs.company.com/security/policy-v1.2.0.pdf',
                            author: 'Security Team',
                            sourceDate: '2025-08-20T10:30:00Z'
                        }
                    },
                    {
                        documentId: 'doc_2',
                        title: 'Architecture Guidelines',
                        canonicalUrl: 'https://wiki.company.com/arch/guidelines',
                        sourceType: 'Wiki',
                        relatedEvidenceFields: ['architecture_vision', 'service_vision'],
                        linkHealth: 200,
                        latestVersion: {
                            docVersionId: 'ver_2',
                            versionId: 'v2.0.1',
                            urlAtVersion: 'https://wiki.company.com/arch/guidelines-v2.0.1',
                            author: 'Architecture Team',
                            sourceDate: '2025-08-22T14:15:00Z'
                        }
                    },
                    {
                        documentId: 'doc_3',
                        title: 'Backup and Recovery Procedures',
                        canonicalUrl: 'https://sharepoint.company.com/backup-procedures',
                        sourceType: 'SharePoint',
                        relatedEvidenceFields: ['backup_policy', 'rto_hours'],
                        linkHealth: 404,
                        latestVersion: {
                            docVersionId: 'ver_3',
                            versionId: 'v1.0.0',
                            urlAtVersion: 'https://sharepoint.company.com/backup-procedures-v1.0.0',
                            author: 'Operations Team',
                            sourceDate: '2025-08-18T09:45:00Z'
                        }
                    }
                ]
            }
            : (await api.get<any>(`/api/apps/${appId}/documents`, { params })).data,

    /** Create document */
    createDoc: async (appId: string, payload: any): Promise<any> =>
        USE_MOCK 
            ? { documentId: 'mock-doc-id', ...payload }
            : (await api.post<any>(`/api/apps/${appId}/documents`, payload)).data,

    /** Get suggested evidence for a field */
    getSuggestedEvidence: async (appId: string, fieldKey: string): Promise<any> =>
        USE_MOCK
            ? { fieldKey, fieldLabel: fieldKey, profileFieldId: 'mock-field-id', suggestedDocuments: [] }
            : (await api.get<any>(`/api/apps/${appId}/profile/field/${fieldKey}/suggested-evidence`)).data,

    /** Create evidence with document */
    createEvidenceWithDocument: async (appId: string, payload: any): Promise<any> =>
        USE_MOCK
            ? { claimId: 'mock-claim-id', evidenceId: 'mock-evidence-id', ...payload }
            : (await api.post<any>(`/api/apps/${appId}/evidence/with-document`, payload)).data,

    /** Attach evidence */
    attachEvidence: async (claimId: string, evidenceId: string, payload: any): Promise<any> =>
        USE_MOCK
            ? { success: true }
            : (await api.post<any>(`/api/claims/${claimId}/evidence/${evidenceId}/attach`, payload)).data,

    /** Create track */
    createTrack: async (appId: string, payload: any): Promise<any> =>
        USE_MOCK
            ? { trackId: 'track_mock_id_' + Date.now() }
            : (await api.post<any>(`/api/apps/${appId}/tracks`, payload)).data,

    /** Get audit events for profile field */
    getAuditEvents: async (appId: string, subjectId: string, page: number = 0, size: number = 10): Promise<any> =>
        USE_MOCK
            ? { content: [], totalElements: 0, totalPages: 0 }
            : (await auditApi.get<any>('/audit/events/search', {
                params: {
                    appId,
                    subjectId,
                    page,
                    size,
                    sortBy: 'occurred_at_utc',
                    sortOrder: 'desc'
                }
            })).data,

    /** Get currently attached documents for a profile field */
    getAttachedDocuments: async (appId: string, profileFieldId: string): Promise<any> =>
        USE_MOCK
            ? { 
                documents: profileFieldId.includes('security') || profileFieldId.includes('encryption') ? [
                    {
                        documentId: 'doc_1',
                        title: 'Security Policy Document',
                        canonicalUrl: 'https://docs.company.com/security/policy.pdf',
                        sourceType: 'Confluence',
                        relatedEvidenceFields: ['encryption_at_rest', 'secrets_management', 'security_testing'],
                        linkHealth: 200,
                        latestVersion: {
                            docVersionId: 'ver_1',
                            versionId: 'v1.2.0',
                            urlAtVersion: 'https://docs.company.com/security/policy-v1.2.0.pdf',
                            author: 'Security Team',
                            sourceDate: '2025-08-20T10:30:00Z'
                        }
                    }
                ] : []
            }
            : (await api.get<any>(`/api/apps/${appId}/profile/field/${profileFieldId}/attached-documents`)).data,

    /** Attach existing document to profile field */
    attachDocumentToField: async (appId: string, profileFieldId: string, documentId: string): Promise<any> =>
        USE_MOCK
            ? { evidenceId: 'mock-evidence-id', success: true }
            : (await api.post<any>(`/api/apps/${appId}/profile/field/${profileFieldId}/attach-document`, { documentId })).data,

    /** Detach document from profile field */
    detachDocumentFromField: async (appId: string, profileFieldId: string, documentId: string): Promise<any> =>
        USE_MOCK
            ? { success: true }
            : (await api.delete<any>(`/api/apps/${appId}/profile/field/${profileFieldId}/detach-document/${documentId}`)).data,
};
