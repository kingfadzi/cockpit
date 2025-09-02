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
    AttachDocumentResponse,
    RiskStory,
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

    /** Get audit events count for profile field */
    getAuditCount: async (appId: string, subjectId: string): Promise<number> =>
        USE_MOCK
            ? 5
            : (await auditApi.get<any>('/audit/events/search', {
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
    detachDocumentFromField: async (appId: string, profileFieldId: string, documentId: string): Promise<any> =>
        USE_MOCK
            ? { success: true }
            : (await api.delete<any>(`/api/apps/${appId}/profile/field/${profileFieldId}/detach-document/${documentId}`)).data,

    /** Get evidence for profile field */
    getProfileFieldEvidence: async (profileFieldId: string): Promise<any> =>
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
            : (await api.get<any>(`/api/profile-fields/${profileFieldId}/evidence`)).data,

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
    getAppRisks: async (appId: string, page?: number, size?: number, filters?: { status?: string; severity?: string; assignedSme?: string; search?: string }): Promise<any> => {
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
        
        return (await api.get<any>(`/api/risks/search`, { params })).data;
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
    createRisk: async (appId: string, fieldKey: string, payload: any): Promise<RiskStory> =>
        USE_MOCK
            ? {
                riskId: 'risk_new_' + Date.now(),
                appId,
                fieldKey,
                title: payload.title,
                description: payload.description,
                status: 'open',
                severity: payload.severity || 'medium',
                createdBy: 'current_user',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                evidenceCount: 0,
                ...payload
            }
            : (await api.post<RiskStory>(`/api/apps/${appId}/fields/${fieldKey}/risks`, payload)).data,

    /** Attach evidence to risk */
    attachEvidenceToRisk: async (riskId: string, payload: any): Promise<any> =>
        USE_MOCK
            ? { success: true, evidenceId: 'ev_' + Date.now() }
            : (await api.post<any>(`/api/risks/${riskId}/evidence`, payload)).data,

    /** Detach evidence from risk */
    detachEvidenceFromRisk: async (riskId: string, evidenceId: string): Promise<any> =>
        USE_MOCK
            ? { success: true }
            : (await api.delete<any>(`/api/risks/${riskId}/evidence/${evidenceId}`)).data,

    // SME Endpoints using unified search
    /** Get risks pending SME review assigned to current user */
    getSmeReviewQueue: async (smeId: string): Promise<any[]> =>
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
            : (await api.get<any[]>(`/api/risks/search?assignedSme=${smeId}&status=PENDING_SME_REVIEW`)).data,

    /** Get all security-related risks assigned to this SME across all apps */
    getSmeSecurityDomainRisks: async (smeId: string): Promise<any[]> =>
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
            : (await api.get<any[]>(`/api/risks/search?assignedSme=${smeId}&domain=security`)).data,

    /** Get risks from other domains assigned to this SME */
    getSmeCrossDomainRisks: async (smeId: string): Promise<any[]> =>
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
            : (await api.get<any[]>(`/api/risks/search?assignedSme=${smeId}&domain=availability,integrity,compliance`)).data,

    /** Get all open risks assigned to SME (for Open Risks table) */
    getSmeAllOpenRisks: async (smeId: string): Promise<any[]> =>
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
            : (await api.get<any[]>(`/api/risks/search?assignedSme=${smeId}&status=PENDING_SME_REVIEW,UNDER_REVIEW`)).data,

    /** SME approves or rejects a risk */
    submitSmeReview: async (riskId: string, payload: { action: 'approve' | 'reject'; comments: string; smeId: string }): Promise<any> =>
        USE_MOCK
            ? {
                riskId,
                status: payload.action === 'approve' ? 'SME_APPROVED' : 'SME_REJECTED',
                reviewedBy: payload.smeId,
                reviewedAt: new Date().toISOString()
            }
            : (await api.put<any>(`/api/risks/${riskId}/sme-review`, payload)).data,
};
