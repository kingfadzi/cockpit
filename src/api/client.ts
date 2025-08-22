import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { mockApi } from './mock';
import type {
    AppSummary,
    EvidenceItem,
    RequirementsResponse,
    ReleaseItem,
    PortfolioKpis,
    ServerApp,
} from './types';

export const API_BASE = '';
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

    /** Profile snapshot (unchanged) */
    getProfile: async (appId: string): Promise<any> =>
        USE_MOCK ? mockApi.getProfile(appId) : (await api.get(`/api/apps/${appId}/profile`)).data,

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

    /** Create app (minimal) */
    createApp: async (appId: string): Promise<AppSummary> =>
        USE_MOCK
            ? mockApi.createApp(appId)
            : toClient((await api.post<ServerApp>('/api/apps', { appId })).data),
};
