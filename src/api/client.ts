import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { mockApi } from './mock';
import type {
    AppSummary,
    EvidenceItem,
    RequirementsResponse,
    ReleaseItem,
    ServerApp,
    ProfileResponse,
    AppKpis,
    AttachDocumentResponse,
    RiskStory,
    AppsWithKpis,
    BulkAttestationRequest,
    BulkAttestationResponse,
    AttestationRequest,
    AttestationResponse,
    WorkbenchEvidenceItem,
    EvidenceSearchParams,
    EvidenceSearchResult,
    EnhancedEvidenceSummary,
    MissingEvidenceSummary,
    RiskBlockedSummary,
    EvidenceStateKey,
    EvidenceStateSlug,
    PaginatedResponse,
    PaginationMetadata,
} from './types';

// For production builds, use relative URLs that work with nginx proxy
export const API_BASE = import.meta.env.VITE_API_BASE || '';
export const AUDIT_API_BASE = import.meta.env.VITE_AUDIT_API_BASE || '';
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
        const meta = (res.config as unknown as { meta: { rid: string, startedAt: number } }).meta || {};
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
        const meta = (cfg as unknown as { meta: { rid: string, startedAt: number } }).meta || {};
        const ms = (performance.now() - (meta.startedAt || performance.now())).toFixed(1);
        const status = err.response?.status;
        const title = (err.response?.data as { title: string })?.title;
        const detail = (err.response?.data as { detail: string })?.detail;

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

/** Extract paginated response with metadata */
function extractPaginatedResponse<T = unknown>(payload: unknown): PaginatedResponse<T> {
    // Handle new API format with pagination metadata
    if (payload && typeof payload === 'object' && payload !== null) {
        const p = payload as any;
        if (typeof p.page === 'number' && typeof p.pageSize === 'number' && typeof p.total === 'number' && Array.isArray(p.items)) {
            return {
                page: p.page,
                pageSize: p.pageSize,
                total: p.total,
                items: p.items as T[]
            };
        }
        // Legacy format: just items array
        if (Array.isArray(p.items)) {
            return {
                page: 1,
                pageSize: p.items.length,
                total: p.items.length,
                items: p.items as T[]
            };
        }
        // Some backends wrap again: { data: { items: [...] } }
        if (p.data && Array.isArray(p.data.items)) {
            return {
                page: 1,
                pageSize: p.data.items.length,
                total: p.data.items.length,
                items: p.data.items as T[]
            };
        }
    }
    // Fallback for direct array
    if (Array.isArray(payload)) {
        return {
            page: 1,
            pageSize: payload.length,
            total: payload.length,
            items: payload as T[]
        };
    }
    // Empty result
    return {
        page: 1,
        pageSize: 0,
        total: 0,
        items: []
    };
}

/** Legacy function for backward compatibility */
function coerceArray<T = unknown>(payload: unknown): T[] {
    return extractPaginatedResponse<T>(payload).items;
}

const stateKeyToSlug: Record<EvidenceStateKey, EvidenceStateSlug> = {
    compliant: 'compliant',
    pendingReview: 'pending-review',
    missingEvidence: 'missing-evidence',
    riskBlocked: 'risk-blocked',
};

const legacyStatusToState: Record<string, EvidenceStateKey> = {
    compliant: 'compliant',
    approved: 'compliant',
    pending: 'pendingReview',
    submitted: 'pendingReview',
    pendingReview: 'pendingReview',
    pending_review: 'pendingReview',
    missing: 'missingEvidence',
    missingEvidence: 'missingEvidence',
    no_evidence: 'missingEvidence',
    riskBlocked: 'riskBlocked',
    risk_blocked: 'riskBlocked',
};

const slugToStateKey: Record<EvidenceStateSlug, EvidenceStateKey> = Object.entries(stateKeyToSlug).reduce((acc, [key, slug]) => {
    acc[slug] = key as EvidenceStateKey;
    return acc;
}, {} as Record<EvidenceStateSlug, EvidenceStateKey>);

const defaultCriticality: Record<EvidenceStateKey, 'A' | 'B' | 'C' | 'D'> = {
    compliant: 'D',
    pendingReview: 'D',
    missingEvidence: 'D',
    riskBlocked: 'D',
};

function safeString(value: unknown, fallback = '—'): string {
    return (value ?? fallback) as string;
}

const DOMAIN_TITLE_LOOKUP: Record<string, string> = {
    security_rating: 'Security',
    security: 'Security',
    integrity_rating: 'Integrity',
    integrity: 'Integrity',
    availability_rating: 'Availability',
    availability: 'Availability',
    confidentiality_rating: 'Confidentiality',
    confidentiality: 'Confidentiality',
    resilience_rating: 'Resilience',
    resilience: 'Resilience',
    app_criticality_assessment: 'Criticality',
    criticality: 'Criticality',
};

function titleCase(value: string): string {
    return value
        .toLowerCase()
        .split(/[_\s-]+/)
        .filter(Boolean)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ');
}

function resolveDomainTitle(raw?: string | null): string | undefined {
    if (!raw) return undefined;
    const normalized = raw.toString().trim();
    if (!normalized) return undefined;
    const key = normalized.replace(/[-\s]/g, '_').toLowerCase();
    if (DOMAIN_TITLE_LOOKUP[key]) return DOMAIN_TITLE_LOOKUP[key];
    return titleCase(normalized.replace(/_/g, ' '));
}

function normalizeEvidenceSummary(item: EnhancedEvidenceSummary, state: EvidenceStateKey): WorkbenchEvidenceItem {
    const fieldKey = item.fieldKey ?? 'unknown_field';
    const status = state === 'compliant' ? 'compliant' : 'pending';
    const approvalStatus = state === 'compliant' ? 'approved' : 'pending_review';
    const domainRaw = item.domainTitle ?? item.domain ?? item.domainKey ?? item.derivedFrom ?? item.derived_from ?? item.domain_key;
    const domainTitle = resolveDomainTitle(domainRaw);

    return {
        evidenceId: item.evidenceId || `${state}-${fieldKey}`,
        appId: safeString(item.appId, 'UNKNOWN_APP'),
        appName: safeString(item.appName ?? item.appId, 'Unknown Application'),
        appCriticality: item.appCriticality ?? defaultCriticality[state],
        applicationType: item.applicationType ?? undefined,
        architectureType: item.architectureType ?? undefined,
        installType: item.installType ?? undefined,
        applicationTier: item.applicationTier ?? undefined,
        domainTitle: domainTitle ?? '—',
        fieldKey,
        fieldLabel: safeString(item.fieldLabel ?? item.documentTitle ?? fieldKey, fieldKey),
        policyRequirement: safeString(item.reviewComment, '—'),
        status,
        approvalStatus,
        freshnessStatus: 'current',
        dueDate: undefined,
        submittedDate: item.createdAt ?? undefined,
        reviewedDate: item.reviewedAt ?? undefined,
        rejectionReason: undefined,
        assignedReviewer: item.reviewedBy ?? undefined,
        submittedBy: item.submittedBy ?? undefined,
        daysOverdue: undefined,
        riskCount: undefined,
        uri: item.uri ?? undefined,
        linkStatus: item.linkStatus ?? undefined,
        linkedBy: item.linkedBy ?? null,
        linkedAt: item.linkedAt ?? null,
        reviewedBy: item.reviewedBy ?? null,
        reviewComment: item.reviewComment ?? null,
        documentTitle: item.documentTitle ?? null,
        documentSourceType: item.documentSourceType ?? null,
        documentOwners: item.documentOwners ?? null,
        documentLinkHealth: item.documentLinkHealth ?? null,
        trackId: item.trackId ?? null,
        documentId: item.documentId ?? null,
        docVersionId: item.docVersionId ?? null,
        claimId: item.claimId ?? null,
        validFrom: item.validFrom ?? null,
        validUntil: item.validUntil ?? null,
        productOwner: item.productOwner ?? null,
    };
}

function normalizeMissingSummary(item: MissingEvidenceSummary): WorkbenchEvidenceItem {
    const fieldKey = safeString(item.field_key, 'unknown_field');
    const domainRaw = item.domain_title ?? item.domain ?? item.domain_key ?? item.derived_from;
    const domainTitle = resolveDomainTitle(domainRaw);
    return {
        evidenceId: item.profile_field_id || `missing-${fieldKey}`,
        appId: safeString(item.app_id, 'UNKNOWN_APP'),
        appName: safeString(item.app_name, 'Unknown Application'),
        appCriticality: item.app_criticality ?? 'D',
        applicationType: item.application_type ?? undefined,
        architectureType: item.architecture_type ?? undefined,
        installType: item.install_type ?? undefined,
        applicationTier: item.application_tier ?? undefined,
        domainTitle: domainTitle ?? '—',
        fieldKey,
        fieldLabel: safeString(item.field_label ?? fieldKey, fieldKey),
        policyRequirement: '—',
        status: 'missing',
        approvalStatus: 'no_evidence',
        freshnessStatus: 'expired',
        dueDate: undefined,
        submittedDate: undefined,
        reviewedDate: undefined,
        rejectionReason: item.hypothesis ?? undefined,
        assignedReviewer: undefined,
        submittedBy: undefined,
        daysOverdue: undefined,
        riskCount: undefined,
        uri: undefined,
        linkStatus: undefined,
        linkedBy: null,
        linkedAt: null,
        reviewedBy: null,
        reviewComment: null,
        documentTitle: null,
        documentSourceType: null,
        documentOwners: null,
        documentLinkHealth: null,
        trackId: null,
        documentId: null,
        docVersionId: null,
        claimId: null,
        validFrom: null,
        validUntil: null,
        productOwner: item.product_owner ?? null,
    };
}

function normalizeRiskSummary(item: RiskBlockedSummary): WorkbenchEvidenceItem {
    // Handle both camelCase (new API) and snake_case (legacy) fields
    const fieldKey = safeString(item.fieldKey ?? item.field_key ?? item.controlField ?? 'unknown_field', 'unknown_field');
    const domainRaw = item.domain ?? item.domain_title ?? item.domain_key ?? item.derivedFrom ?? item.derived_from;
    const domainTitle = resolveDomainTitle(domainRaw);
    return {
        evidenceId: item.riskId ?? item.risk_id ?? `risk-${fieldKey}`,
        appId: safeString(item.appId ?? item.app_id, 'UNKNOWN_APP'),
        appName: safeString(item.appName ?? item.app_name, 'Unknown Application'),
        appCriticality: item.appCriticality ?? item.app_criticality ?? 'D',
        applicationType: item.application_type ?? undefined,
        architectureType: item.architectureType ?? item.architecture_type ?? undefined,
        installType: item.installType ?? item.install_type ?? undefined,
        applicationTier: item.applicationTier ?? item.application_tier ?? undefined,
        domainTitle: domainTitle ?? '—',
        fieldKey,
        fieldLabel: safeString(item.field_label ?? titleCase(item.controlField ?? item.fieldKey ?? item.field_key ?? fieldKey), fieldKey),
        policyRequirement: safeString(item.hypothesis, '—'),
        status: 'risk_blocked',
        approvalStatus: 'pending_review',
        freshnessStatus: 'broken',
        dueDate: undefined,
        submittedDate: item.createdAt ?? item.created_at ?? undefined,
        reviewedDate: item.updatedAt ?? item.updated_at ?? undefined,
        rejectionReason: item.hypothesis ?? undefined,
        assignedReviewer: item.assignedSme ?? item.assigned_sme ?? undefined,
        submittedBy: undefined,
        daysOverdue: undefined,
        riskCount: undefined,
        uri: undefined,
        linkStatus: undefined,
        linkedBy: null,
        linkedAt: null,
        reviewedBy: null,
        reviewComment: item.hypothesis ?? null,
        documentTitle: null,
        documentSourceType: null,
        documentOwners: null,
        documentLinkHealth: null,
        trackId: null,
        documentId: null,
        docVersionId: null,
        claimId: null,
        validFrom: null,
        validUntil: null,
        productOwner: item.productOwner ?? item.product_owner ?? null,
        riskId: item.riskId ?? item.risk_id,
        riskStatus: item.riskStatus ?? item.risk_status,
        assignedSme: item.assignedSme ?? item.assigned_sme,
    };
}

function normalizeStateResponse(state: EvidenceStateKey, payload: unknown): EvidenceSearchResult {
    const paginatedData = extractPaginatedResponse(payload);

    let normalizedItems: WorkbenchEvidenceItem[];

    switch (state) {
        case 'compliant':
        case 'pendingReview': {
            normalizedItems = paginatedData.items.map((item) => normalizeEvidenceSummary(item as EnhancedEvidenceSummary, state));
            break;
        }
        case 'missingEvidence': {
            normalizedItems = paginatedData.items.map((item) => normalizeMissingSummary(item as MissingEvidenceSummary));
            break;
        }
        case 'riskBlocked': {
            normalizedItems = paginatedData.items.map((item) => normalizeRiskSummary(item as RiskBlockedSummary));
            break;
        }
        default:
            normalizedItems = [];
    }

    return {
        page: paginatedData.page,
        pageSize: paginatedData.pageSize,
        total: paginatedData.total,
        items: normalizedItems
    };
}

function normalizeCombinedResponse(payload: Record<string, unknown>): EvidenceSearchResult {
    const allItems: WorkbenchEvidenceItem[] = [];
    let totalAcrossStates = 0;
    let combinedPage = 1;
    let combinedPageSize = 0;

    (Object.keys(payload) as Array<keyof typeof payload>).forEach((key) => {
        // Handle both camelCase (pendingReview) and kebab-case (pending-review) keys
        let slug: EvidenceStateSlug;
        let state: EvidenceStateKey | undefined;

        // Try direct mapping first (for kebab-case keys from API)
        if (typeof key === 'string' && key in slugToStateKey) {
            slug = key as EvidenceStateSlug;
            state = slugToStateKey[slug];
        } else {
            // Convert camelCase to kebab-case (for legacy support)
            slug = key.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`) as EvidenceStateSlug;
            state = slugToStateKey[slug];
        }

        if (state) {
            const stateResult = normalizeStateResponse(state, payload[key]);
            allItems.push(...stateResult.items);
            totalAcrossStates += stateResult.total;
            combinedPage = stateResult.page; // Use the page from one of the states
            combinedPageSize += stateResult.pageSize;
        }
    });

    return {
        page: combinedPage,
        pageSize: combinedPageSize,
        total: totalAcrossStates,
        items: allItems
    };
}

function resolveStateKey(state?: EvidenceStateKey, status?: EvidenceSearchParams['status']): EvidenceStateKey | undefined {
    if (state && stateKeyToSlug[state]) return state;
    if (status) {
        const mapped = legacyStatusToState[status];
        if (mapped) return mapped;
    }
    return undefined;
}

/** ------- Endpoints ------- */
export const endpoints = {
    /** Apps (grid) with KPIs */
    listApps: async (filters?: {
        search?: string;
        criticality?: string;
        applicationType?: string;
        architectureType?: string;
        installType?: string;
        kpiType?: string;
    }): Promise<AppsWithKpis> => {
        if (USE_MOCK) {
            const apps = await mockApi.listApps(filters);
            const kpis = await mockApi.getPortfolioKpis(filters);
            return { apps, kpis, totalCount: apps.length, filteredCount: apps.length };
        }
        
        const params = new URLSearchParams();
        if (filters?.search) params.set('search', filters.search);
        if (filters?.criticality) params.set('criticality', filters.criticality);
        if (filters?.applicationType) params.set('applicationType', filters.applicationType);
        if (filters?.architectureType) params.set('architectureType', filters.architectureType);
        if (filters?.installType) params.set('installType', filters.installType);
        if (filters?.kpiType) params.set('kpiType', filters.kpiType);
        
        const queryString = params.toString() ? `?${params.toString()}` : '';
        const res = await api.get<AppsWithKpis>(`/api/apps${queryString}`);
        
        if (API_DEBUG) console.debug('[api] /api/apps raw:', res.data);
        
        return {
            apps: res.data.apps.map((app: AppSummary) => ({
                ...app,
                criticality: normalizeCriticality(app.appCriticalityAssessment)
            })),
            kpis: res.data.kpis,
            totalCount: res.data.totalCount,
            filteredCount: res.data.filteredCount
        };
    },

    /** Single app (details) */
    getApp: async (appId: string): Promise<AppSummary> => {
        if (USE_MOCK) return mockApi.getApp(appId);
        const res = await api.get<{ data: ServerApp }>(`/api/apps/${appId}`);
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
    createEvidence: async (appId: string, payload: unknown): Promise<unknown> =>
        USE_MOCK ? mockApi.createEvidence(appId, payload) : (await api.post(`/api/apps/${appId}/evidence`, payload)).data,

    /** Requirements */
    getRequirements: async (appId: string, params?: Record<string, string>): Promise<RequirementsResponse> =>
        USE_MOCK
            ? mockApi.getRequirements(appId, params)
            : (await api.get<RequirementsResponse>(`/api/apps/${appId}/requirements`, { params })).data,

    /** Releases */
    getReleases: async (appId: string): Promise<ReleaseItem[]> =>
        USE_MOCK ? mockApi.getReleases(appId) : (await api.get<ReleaseItem[]>(`/api/apps/${appId}/releases`)).data,


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

    /** Evidence search for portfolio/workbench views */
    searchEvidence: async (params: EvidenceSearchParams = {}): Promise<EvidenceSearchResult> => {
        const {
            state,
            status,
            limit,
            offset,
            page,
            pageSize,
            size,
            ...rest
        } = params ?? {};

        const resolvedState = resolveStateKey(state, status);
        const effectivePageSize = size ?? pageSize ?? limit ?? 10;
        const effectivePage = page ?? (offset !== undefined ? Math.floor(offset / effectivePageSize) + 1 : 1);

        const queryParams = {
            ...rest,
            page: effectivePage,
            size: effectivePageSize, // Use 'size' parameter for API
            ...(resolvedState ? { state: resolvedState } : {}),
            ...(!resolvedState && status ? { status } : {}),
        } as Record<string, unknown>;

        if (USE_MOCK) {
            const mockResult = mockApi.searchEvidence({
                ...params,
                state: resolvedState ?? params.state,
                page: effectivePage,
                pageSize: effectivePageSize, // Mock still uses pageSize internally
            });
            // Wrap mock result in pagination metadata
            return {
                page: effectivePage,
                pageSize: effectivePageSize,
                total: mockResult.length,
                items: mockResult
            };
        }

        if (resolvedState) {
            const slug = stateKeyToSlug[resolvedState];
            const res = await api.get<unknown>(`/api/evidence/by-state/${slug}`, { params: queryParams });
            return normalizeStateResponse(resolvedState, res.data);
        }

        const res = await api.get<Record<string, unknown>>('/api/evidence/by-state', { params: queryParams });
        return normalizeCombinedResponse(res.data ?? {});
    },

    /** Documents (paginated) */
    getDocs: async (appId: string, params?: Record<string, string>): Promise<unknown> =>
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
            : (await api.get<unknown>(`/api/apps/${appId}/documents`, { params })).data,

    /** Create document */
    createDoc: async (appId: string, payload: unknown): Promise<unknown> =>
        USE_MOCK 
            ? { documentId: 'mock-doc-id', ...payload }
            : (await api.post<unknown>(`/api/apps/${appId}/documents`, payload)).data,

    /** Get suggested evidence for a field */
    getSuggestedEvidence: async (appId: string, fieldKey: string): Promise<unknown> =>
        USE_MOCK
            ? { fieldKey, fieldLabel: fieldKey, profileFieldId: 'mock-field-id', suggestedDocuments: [] }
            : (await api.get<unknown>(`/api/apps/${appId}/profile/field/${fieldKey}/suggested-evidence`)).data,

    /** Create evidence with document */
    createEvidenceWithDocument: async (appId: string, payload: unknown): Promise<unknown> =>
        USE_MOCK
            ? { claimId: 'mock-claim-id', evidenceId: 'mock-evidence-id', ...payload }
            : (await api.post<unknown>(`/api/apps/${appId}/evidence/with-document`, payload)).data,

    /** Attach evidence */
    attachEvidence: async (claimId: string, evidenceId: string, payload: unknown): Promise<unknown> =>
        USE_MOCK
            ? { success: true }
            : (await api.post<unknown>(`/api/claims/${claimId}/evidence/${evidenceId}/attach`, payload)).data,

    /** Create track */
    createTrack: async (appId: string, payload: unknown): Promise<unknown> =>
        USE_MOCK
            ? { trackId: 'track_mock_id_' + Date.now() }
            : (await api.post<unknown>(`/api/apps/${appId}/tracks`, payload)).data,

    /** Get audit events for profile field */
    getAuditEvents: async (appId: string, subjectId: string, page: number = 0, size: number = 10): Promise<unknown> =>
        USE_MOCK
            ? { content: [], totalElements: 0, totalPages: 0 }
            : (await auditApi.get<unknown>('/audit/events/search', {
                params: {
                    appId,
                    subjectId,
                    page,
                    size,
                    sortBy: 'occurred_at_utc',
                    sortOrder: 'desc'
                }
            })).data,

    /** Get audit events count for profile field */
    getAuditCount: async (appId: string, subjectId: string): Promise<number> =>
        USE_MOCK
            ? 5
            : (await auditApi.get<unknown>('/audit/events/search', {
                params: {
                    appId,
                    subjectId,
                    page: 0,
                    size: 1,
                    sortBy: 'occurred_at_utc',
                    sortOrder: 'desc'
                }
            })).data.totalElements,

    /** Get currently attached documents for a profile field */
    getAttachedDocuments: async (appId: string, profileFieldId: string): Promise<unknown> =>
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
            : (await api.get<unknown>(`/api/apps/${appId}/profile/field/${profileFieldId}/attached-documents`)).data,

    /** Attach existing document to profile field */
    attachDocumentToField: async (appId: string, profileFieldId: string, documentId: string): Promise<AttachDocumentResponse> =>
        USE_MOCK
            ? { 
                evidenceId: 'mock-evidence-id',
                appId,
                profileFieldId,
                documentId,
                riskWasCreated: true,
                autoCreatedRiskId: 'risk_mock_001',
                assignedSme: 'security_sme_001'
            }
            : (await api.post<AttachDocumentResponse>(`/api/apps/${appId}/profile/field/${profileFieldId}/attach-document/${documentId}`)).data,

    /** Detach document from profile field */
    detachDocumentFromField: async (appId: string, profileFieldId: string, documentId: string): Promise<unknown> =>
        USE_MOCK
            ? { success: true }
            : (await api.delete<unknown>(`/api/apps/${appId}/profile/field/${profileFieldId}/detach-document/${documentId}`)).data,

    /** Get evidence for profile field */
    getProfileFieldEvidence: async (profileFieldId: string): Promise<unknown> =>
        USE_MOCK
            ? {
                page: 1,
                pageSize: 10,
                total: 3,
                items: [
                    {
                        evidenceId: "ev_security_scan_001",
                        appId: "app_customer_portal",
                        profileFieldId: "pf_encryption_rest_456",
                        claimId: "claim_compliance_001",
                        uri: "https://evidence-storage.company.com/scans/security_scan_001.pdf",
                        type: "vulnerability_scan",
                        status: "active",
                        submittedBy: "security_team_bot",
                        validFrom: "2024-12-01T00:00:00Z",
                        validUntil: "2024-12-31T23:59:59Z",
                        trackId: "track_compliance_789",
                        documentId: "doc_vulnerability_report_001",
                        createdAt: "2024-12-01T10:15:00Z",
                        updatedAt: "2024-12-01T10:15:00Z"
                    },
                    {
                        evidenceId: "ev_manual_review_002",
                        appId: "app_customer_portal",
                        profileFieldId: "pf_encryption_rest_456",
                        claimId: "claim_compliance_002",
                        uri: "https://evidence-storage.company.com/reviews/encryption_config.docx",
                        type: "manual_review",
                        status: "active",
                        submittedBy: "security_analyst_001",
                        validFrom: "2024-11-15T00:00:00Z",
                        validUntil: "2024-12-31T23:59:59Z",
                        trackId: "track_compliance_789",
                        documentId: "doc_encryption_config_001",
                        createdAt: "2024-11-15T14:30:00Z",
                        updatedAt: "2024-11-15T14:30:00Z"
                    },
                    {
                        evidenceId: "ev_policy_doc_003",
                        appId: "app_customer_portal",
                        profileFieldId: "pf_encryption_rest_456",
                        claimId: "claim_compliance_003",
                        uri: "https://docs.company.com/policies/data-protection.pdf",
                        type: "policy_document",
                        status: "active",
                        submittedBy: "compliance_team",
                        validFrom: "2024-10-01T00:00:00Z",
                        validUntil: "2025-03-31T23:59:59Z",
                        trackId: "track_compliance_789",
                        documentId: "doc_data_protection_policy",
                        createdAt: "2024-10-01T08:00:00Z",
                        updatedAt: "2024-10-01T08:00:00Z"
                    }
                ]
            }
            : (await api.get<unknown>(`/api/profile-fields/${profileFieldId}/evidence`)).data,

    // Risk Management Endpoints

    /** Get individual risk story */
    getRisk: async (riskId: string): Promise<RiskStory> =>
        USE_MOCK
            ? {
                riskId,
                appId: 'CORR-12356',
                fieldKey: 'encryption_at_rest',
                profileFieldId: 'pf_001',
                title: 'Encryption at Rest Not Implemented',
                description: 'Application does not have proper encryption at rest implementation which poses security risks.',
                status: 'pending_evidence',
                severity: 'high',
                assignedSme: 'security_sme_001',
                createdBy: 'po_user_001',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                evidenceCount: 0
            }
            : (await api.get<RiskStory>(`/api/risks/${riskId}`)).data,

    /** Get all risks for application */
    getAppRisks: async (appId: string, page?: number, size?: number, filters?: { status?: string; severity?: string; assignedSme?: string; search?: string }): Promise<unknown> => {
        if (USE_MOCK) {
            const allRisks = [
                {
                    riskId: 'risk_04c51349-ed55-43f5-afb5-93b69ac7a9eb',
                    appId,
                    fieldKey: 'encryption_at_rest',
                    triggeringEvidenceId: 'ev_be6dc1a423b74494be60ca6f02e3b913',
                    creationType: 'SYSTEM_AUTO_CREATION',
                    assignedSme: 'security_sme_001',
                    title: 'Auto-created risk for encryption_at_rest field',
                    hypothesis: 'Evidence may indicate risk in encryption_at_rest implementation',
                    condition: 'IF the attached evidence reveals security gaps',
                    consequence: 'THEN security posture may be compromised',
                    severity: 'high',
                    status: 'PENDING_SME_REVIEW',
                    raisedBy: 'SYSTEM_AUTO_CREATION',
                    openedAt: '2025-09-01T19:37:29.216084Z',
                    assignedAt: '2025-09-01T19:37:29.216089Z',
                    policyRequirementSnapshot: {
                        fieldKey: 'encryption_at_rest',
                        activeRule: {
                            ttl: '90d',
                            label: 'Required',
                            value: 'required',
                            security_rating: 'A2',
                            requiresReview: true
                        },
                        fieldLabel: 'Encryption at Rest',
                        snapshotTimestamp: 1756755449216,
                        complianceFrameworks: [
                            {
                                controls: ['SC-28', 'SC-8'],
                                framework: 'NIST'
                            },
                            {
                                controls: ['A.10.1.1'],
                                framework: 'ISO27001'
                            }
                        ]
                    },
                    createdAt: '2025-09-01T19:37:28.547524Z',
                    updatedAt: '2025-09-01T19:37:28.547524Z',
                    evidenceCount: 1
                },
                {
                    riskId: 'risk_002',
                    appId,
                    fieldKey: 'key_rotation_max',
                    creationType: 'MANUAL',
                    assignedSme: 'security_sme_002',
                    title: 'Key Rotation Period Exceeds Policy',
                    hypothesis: 'Current key rotation practices may not align with security policy',
                    condition: 'IF key rotation period exceeds 90 days',
                    consequence: 'THEN cryptographic keys become vulnerable to compromise',
                    severity: 'medium',
                    status: 'under_review',
                    raisedBy: 'po_user_001',
                    openedAt: '2024-01-10T09:15:00Z',
                    assignedAt: '2024-01-10T10:00:00Z',
                    policyRequirementSnapshot: {
                        fieldKey: 'key_rotation_max',
                        activeRule: {
                            ttl: '90d',
                            label: 'Maximum 90 days',
                            value: '90d',
                            security_rating: 'A2',
                            requiresReview: true
                        },
                        fieldLabel: 'Key Rotation Maximum Period',
                        snapshotTimestamp: 1704876900000,
                        complianceFrameworks: [
                            {
                                controls: ['SC-12', 'SC-17'],
                                framework: 'NIST'
                            }
                        ]
                    },
                    createdAt: '2024-01-10T09:15:00Z',
                    updatedAt: '2024-01-18T11:45:00Z',
                    evidenceCount: 2,
                    lastReviewedAt: '2024-01-18T11:45:00Z',
                    lastReviewedBy: 'security_sme_002'
                },
                {
                    riskId: 'risk_003',
                    appId,
                    fieldKey: 'rto_hours',
                    creationType: 'MANUAL',
                    assignedSme: 'ops_sme_001',
                    title: 'Recovery Time Objective Exceeds Target',
                    hypothesis: 'Current RTO configuration may not meet business requirements',
                    condition: 'IF recovery time exceeds 4 hours',
                    consequence: 'THEN business operations may be significantly impacted during outages',
                    severity: 'medium',
                    status: 'open',
                    raisedBy: 'audit_system',
                    openedAt: '2024-01-12T16:00:00Z',
                    policyRequirementSnapshot: {
                        fieldKey: 'rto_hours',
                        activeRule: {
                            ttl: '90d',
                            label: '≤ 4 hours',
                            value: '4',
                            availability_rating: 'B',
                            requiresReview: false
                        },
                        fieldLabel: 'Recovery Time Objective (Hours)',
                        snapshotTimestamp: 1704876900000,
                        complianceFrameworks: [
                            {
                                controls: ['CP-2', 'CP-4'],
                                framework: 'NIST'
                            }
                        ]
                    },
                    createdAt: '2024-01-12T16:00:00Z',
                    updatedAt: '2024-01-12T16:00:00Z',
                    evidenceCount: 1
                }
            ];
            
            // Apply pagination
            const pageNum = page || 1;
            const pageSize = size || 10; // Changed default from 50 to 10
            console.log('Mock pagination - page:', pageNum, 'size:', pageSize, 'received size param:', size);
            const startIndex = (pageNum - 1) * pageSize;
            const endIndex = startIndex + pageSize;
            const paginatedItems = allRisks.slice(startIndex, endIndex);
            console.log('Mock pagination result - startIndex:', startIndex, 'endIndex:', endIndex, 'items:', paginatedItems.length);
            
            return {
                page: pageNum,
                pageSize: pageSize,
                total: allRisks.length,
                items: paginatedItems
            };
        }
        
        const params: Record<string, string> = {
            appId,
            ...(page !== undefined && { page: page.toString() }),
            ...(size !== undefined && { size: size.toString() })
        };
        
        if (filters) {
            if (filters.status) params.status = filters.status;
            if (filters.severity) params.severity = filters.severity;
            if (filters.assignedSme) params.assignedSme = filters.assignedSme;
            if (filters.search) params.search = filters.search;
        }
        
        return (await api.get<unknown>(`/api/risks/search`, { params })).data;
    },

    /** Get risks by field key */
    getFieldRisks: async (appId: string, fieldKey: string): Promise<RiskStory[]> =>
        USE_MOCK
            ? [
                {
                    riskId: 'risk_001',
                    appId,
                    fieldKey,
                    profileFieldId: 'pf_001',
                    title: `Risk for ${fieldKey}`,
                    description: `Security risk identified for field ${fieldKey}`,
                    status: 'pending_evidence',
                    severity: 'high',
                    assignedSme: 'security_sme_001',
                    createdBy: 'system',
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    evidenceCount: 0
                }
            ]
            : (await api.get<RiskStory[]>(`/api/apps/${appId}/fields/${fieldKey}/risks`)).data,

    /** Get risks by profile field ID */
    getProfileFieldRisks: async (profileFieldId: string): Promise<RiskStory[]> =>
        USE_MOCK
            ? []
            : (await api.get<RiskStory[]>(`/api/profile-fields/${profileFieldId}/risks`)).data,

    /** Create new risk story */
    createRisk: async (appId: string, fieldKey: string, payload: unknown): Promise<RiskStory> =>
        USE_MOCK
            ? {
                riskId: 'risk_new_' + Date.now(),
                appId,
                fieldKey,
                title: (payload as { title: string }).title,
                description: (payload as { description: string }).description,
                status: 'open',
                severity: (payload as { severity: RiskSeverity }).severity || 'medium',
                createdBy: 'current_user',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                evidenceCount: 0,
                ...(payload as object),
            }
            : (await api.post<RiskStory>(`/api/apps/${appId}/fields/${fieldKey}/risks`, payload)).data,

    /** Attach evidence to risk */
    attachEvidenceToRisk: async (riskId: string, payload: unknown): Promise<unknown> =>
        USE_MOCK
            ? { success: true, evidenceId: 'ev_' + Date.now() }
            : (await api.post<unknown>(`/api/risks/${riskId}/evidence`, payload)).data,

    /** Detach evidence from risk */
    detachEvidenceFromRisk: async (riskId: string, evidenceId: string): Promise<unknown> =>
        USE_MOCK
            ? { success: true }
            : (await api.delete<unknown>(`/api/risks/${riskId}/evidence/${evidenceId}`)).data,

    // SME Endpoints using unified search
    /** Get risks pending SME review assigned to current user */
    getSmeReviewQueue: async (smeId: string): Promise<unknown[]> =>
        USE_MOCK
            ? [
                {
                    riskId: "risk_123",
                    appId: "CORR-12356", 
                    title: "Encryption at Rest Not Implemented",
                    severity: "high",
                    status: "PENDING_SME_REVIEW",
                    fieldKey: "encryption_at_rest",
                    assignedAt: "2025-01-10T09:00:00Z",
                    dueDate: "2025-01-17T09:00:00Z",
                    appName: "Core Banking System"
                },
                {
                    riskId: "risk_124",
                    appId: "PAY-7890",
                    title: "MFA Not Enforced",
                    severity: "medium",
                    status: "PENDING_SME_REVIEW", 
                    fieldKey: "mfa_enforcement",
                    assignedAt: "2025-01-11T14:00:00Z",
                    dueDate: "2025-01-18T14:00:00Z",
                    appName: "Payment Gateway"
                },
                {
                    riskId: "risk_125",
                    appId: "AUTH-4567",
                    title: "Session Timeout Too Long",
                    severity: "low",
                    status: "PENDING_SME_REVIEW",
                    fieldKey: "session_timeout",
                    assignedAt: "2025-01-12T10:30:00Z",
                    dueDate: "2025-01-19T10:30:00Z",
                    appName: "Authentication Service"
                }
            ]
            : coerceArray((await api.get<unknown[]>(`/api/risks/search?assignedSme=${smeId}&status=PENDING_SME_REVIEW`)).data),

    /** Get all security-related risks assigned to this SME across all apps */
    getSmeSecurityDomainRisks: async (smeId: string): Promise<unknown[]> =>
        USE_MOCK
            ? [
                {
                    riskId: "risk_456",
                    appId: "TRADING-789",
                    title: "Key Rotation Period Exceeds Policy", 
                    severity: "medium",
                    status: "UNDER_REVIEW",
                    fieldKey: "key_rotation_max",
                    assignedAt: "2025-01-08T14:30:00Z",
                    lastReviewedAt: "2025-01-12T10:15:00Z",
                    appName: "Trading Platform"
                },
                {
                    riskId: "risk_457",
                    appId: "MOBILE-APP",
                    title: "Weak Password Policy",
                    severity: "high",
                    status: "PENDING_SME_REVIEW",
                    fieldKey: "password_policy",
                    assignedAt: "2025-01-09T09:00:00Z",
                    appName: "Mobile Banking"
                },
                {
                    riskId: "risk_458", 
                    appId: "WEB-PORTAL",
                    title: "SQL Injection Vulnerability",
                    severity: "critical",
                    status: "UNDER_REVIEW",
                    fieldKey: "input_validation",
                    assignedAt: "2025-01-07T16:45:00Z",
                    lastReviewedAt: "2025-01-11T11:30:00Z",
                    appName: "Web Portal"
                },
                {
                    riskId: "risk_459",
                    appId: "API-GATEWAY", 
                    title: "Missing Rate Limiting",
                    severity: "medium",
                    status: "SME_APPROVED",
                    fieldKey: "rate_limiting",
                    assignedAt: "2025-01-06T13:20:00Z",
                    lastReviewedAt: "2025-01-13T14:00:00Z",
                    appName: "API Gateway"
                },
                {
                    riskId: "risk_460",
                    appId: "FILE-SHARE",
                    title: "Unencrypted File Storage", 
                    severity: "high",
                    status: "SME_REJECTED",
                    fieldKey: "file_encryption",
                    assignedAt: "2025-01-05T11:10:00Z",
                    lastReviewedAt: "2025-01-14T09:45:00Z",
                    appName: "File Sharing Service"
                }
            ]
            : coerceArray((await api.get<unknown[]>(`/api/risks/search?assignedSme=${smeId}&domain=security`)).data),

    /** Get risks from other domains assigned to this SME */
    getSmeCrossDomainRisks: async (smeId: string): Promise<unknown[]> =>
        USE_MOCK
            ? [
                {
                    riskId: "risk_789",
                    appId: "MOBILE-APP",
                    title: "RTO Exceeds Target",
                    severity: "medium", 
                    status: "PENDING_SME_REVIEW",
                    fieldKey: "rto_hours",
                    domain: "availability",
                    assignedAt: "2025-01-09T11:20:00Z",
                    appName: "Mobile Banking"
                },
                {
                    riskId: "risk_790",
                    appId: "BACKUP-SYS",
                    title: "Backup Integrity Check Failed",
                    severity: "high",
                    status: "UNDER_REVIEW", 
                    fieldKey: "backup_integrity",
                    domain: "integrity",
                    assignedAt: "2025-01-08T15:45:00Z",
                    appName: "Backup System"
                },
                {
                    riskId: "risk_791",
                    appId: "DATA-LAKE",
                    title: "Data Retention Policy Violation",
                    severity: "medium",
                    status: "PENDING_SME_REVIEW",
                    fieldKey: "data_retention",
                    domain: "compliance",
                    assignedAt: "2025-01-10T08:30:00Z", 
                    appName: "Data Lake Platform"
                }
            ]
            : coerceArray((await api.get<unknown[]>(`/api/risks/search?assignedSme=${smeId}&domain=availability,integrity,compliance`)).data),

    /** Get all open risks assigned to SME (for Open Risks table) */
    getSmeAllOpenRisks: async (smeId: string): Promise<unknown[]> =>
        USE_MOCK
            ? [
                // Combined mock data from all tables for Open Risks
                {
                    riskId: "risk_123",
                    appId: "CORR-12356", 
                    title: "Encryption at Rest Not Implemented",
                    severity: "high",
                    status: "PENDING_SME_REVIEW",
                    fieldKey: "encryption_at_rest",
                    domain: "security",
                    assignedAt: "2025-01-10T09:00:00Z",
                    appName: "Core Banking System"
                },
                {
                    riskId: "risk_457",
                    appId: "MOBILE-APP",
                    title: "Weak Password Policy",
                    severity: "high",
                    status: "PENDING_SME_REVIEW",
                    fieldKey: "password_policy",
                    domain: "security",
                    assignedAt: "2025-01-09T09:00:00Z",
                    appName: "Mobile Banking"
                },
                {
                    riskId: "risk_458", 
                    appId: "WEB-PORTAL",
                    title: "SQL Injection Vulnerability",
                    severity: "critical",
                    status: "UNDER_REVIEW",
                    fieldKey: "input_validation",
                    domain: "security",
                    assignedAt: "2025-01-07T16:45:00Z",
                    appName: "Web Portal"
                },
                {
                    riskId: "risk_789",
                    appId: "MOBILE-APP",
                    title: "RTO Exceeds Target",
                    severity: "medium", 
                    status: "PENDING_SME_REVIEW",
                    fieldKey: "rto_hours",
                    domain: "availability",
                    assignedAt: "2025-01-09T11:20:00Z",
                    appName: "Mobile Banking"
                },
                {
                    riskId: "risk_790",
                    appId: "BACKUP-SYS",
                    title: "Backup Integrity Check Failed",
                    severity: "high",
                    status: "UNDER_REVIEW", 
                    fieldKey: "backup_integrity",
                    domain: "integrity",
                    assignedAt: "2025-01-08T15:45:00Z",
                    appName: "Backup System"
                }
            ]
            : coerceArray((await api.get<unknown[]>(`/api/risks/search?assignedSme=${smeId}&status=PENDING_SME_REVIEW,UNDER_REVIEW`)).data),

    /** SME approves or rejects a risk */
    submitSmeReview: async (riskId: string, payload: { action: 'approve' | 'reject'; comments: string; smeId: string }): Promise<unknown> =>
        USE_MOCK
            ? {
                riskId,
                status: payload.action === 'approve' ? 'SME_APPROVED' : 'SME_REJECTED',
                reviewedBy: payload.smeId,
                reviewedAt: new Date().toISOString()
            }
            : (await api.put<unknown>(`/api/risks/${riskId}/sme-review`, payload)).data,

    /** Bulk Attestation */
    submitBulkAttestation: async (appId: string, request: BulkAttestationRequest): Promise<BulkAttestationResponse> => {
        if (USE_MOCK) {
            // Mock implementation
            await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API delay
            
            return {
                successful: request.fields.map(field => ({
                    profileFieldId: field.profileFieldId,
                    fieldKey: field.fieldKey,
                    attestationId: `att_${Math.random().toString(36).slice(2, 11)}`,
                })),
                failed: [],
                summary: {
                    total: request.fields.length,
                    successful: request.fields.length,
                    failed: 0,
                }
            };
        }
        
        return (await api.post<BulkAttestationResponse>(`/api/apps/${appId}/attestations/bulk`, request)).data;
    },

    /** Individual Attestation */
    submitAttestation: async (appId: string, request: AttestationRequest): Promise<AttestationResponse> => {
        if (USE_MOCK) {
            // Mock implementation
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
            
            return {
                attestationId: `att_${Math.random().toString(36).slice(2, 11)}`,
                profileFieldId: request.profileFieldId,
                status: 'success',
                attestedAt: new Date().toISOString(),
            };
        }
        
        return (await api.post<AttestationResponse>(`/api/apps/${appId}/attestations`, request)).data;
    },
};
