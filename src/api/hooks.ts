import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { endpoints } from './client';
import type {
    AppSummary,
    EvidenceItem,
    RequirementsResponse,
    ReleaseItem,
    ProfileResponse,
    AppKpis,
    AppsWithKpis,
    BulkAttestationRequest,
    BulkAttestationResponse,
    AttestationRequest,
    AttestationResponse,
    WorkbenchEvidenceItem,
    EvidenceSearchParams,
    EvidenceSearchResult,
} from './types';

const commonQuery = { staleTime: 60_000, refetchOnWindowFocus: false as const };

export const useApps = (filters?: {
    search?: string;
    criticality?: string;
    applicationType?: string;
    architectureType?: string;
    installType?: string;
    kpiType?: string;
}) =>
    useQuery<AppsWithKpis>({ 
        queryKey: ['apps', filters], 
        queryFn: () => endpoints.listApps(filters), 
        ...commonQuery 
    });

export const useApp = (appId: string) =>
    useQuery<AppSummary>({ queryKey: ['apps', appId], queryFn: () => endpoints.getApp(appId), enabled: !!appId, ...commonQuery });

export const useProfile = (appId: string) =>
    useQuery<ProfileResponse>({ queryKey: ['profile', appId], queryFn: () => endpoints.getProfile(appId), enabled: !!appId, ...commonQuery });

export const useEvidence = (appId: string) =>
    useQuery<EvidenceItem[]>({ queryKey: ['evidence', appId], queryFn: () => endpoints.getEvidence(appId), enabled: !!appId, ...commonQuery });


export const useRequirements = (appId: string, params?: Record<string, string>) =>
    useQuery<RequirementsResponse>({
        queryKey: ['requirements', appId, params],
        queryFn: () => endpoints.getRequirements(appId, params),
        enabled: !!appId,
        ...commonQuery,
    });

export const useReleases = (appId: string) =>
    useQuery<ReleaseItem[]>({ queryKey: ['releases', appId], queryFn: () => endpoints.getReleases(appId), enabled: !!appId, ...commonQuery });


export const useAppKpis = (appId: string) =>
    useQuery<AppKpis>({ queryKey: ['kpis', 'app', appId], queryFn: () => endpoints.getAppKpis(appId), enabled: !!appId, ...commonQuery });

export const useChildApps = (appId: string) =>
    useQuery<AppSummary[]>({ queryKey: ['childApps', appId], queryFn: () => endpoints.getChildApps(appId), enabled: !!appId, ...commonQuery });

export const useEvidenceSearch = (params: EvidenceSearchParams) =>
    useQuery<EvidenceSearchResult>({
        queryKey: ['evidence', 'search', params],
        queryFn: () => endpoints.searchEvidence(params),
        ...commonQuery
    });

export const useCreateEvidence = (appId: string) => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (payload: unknown) => endpoints.createEvidence(appId, payload),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['evidence', appId] });
            qc.invalidateQueries({ queryKey: ['requirements', appId] });
            qc.invalidateQueries({ queryKey: ['kpis', 'portfolio'] });
        },
    });
};

export const useCreateApp = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (appId: string) => endpoints.createApp(appId),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['apps'] });
            qc.invalidateQueries({ queryKey: ['kpis', 'portfolio'] });
        },
    });
};

export const useDocs = (appId: string, params?: Record<string, string>) =>
    useQuery({
        queryKey: ['docs', appId, params],
        queryFn: () => endpoints.getDocs(appId, params),
        enabled: !!appId,
        ...commonQuery,
    });

export const useCreateDoc = (appId: string) => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (payload: unknown) => endpoints.createDoc(appId, payload),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['docs', appId] });
        },
    });
};

export const useSuggestedEvidence = (appId: string, fieldKey: string) =>
    useQuery({
        queryKey: ['suggestedEvidence', appId, fieldKey],
        queryFn: () => endpoints.getSuggestedEvidence(appId, fieldKey),
        enabled: !!appId && !!fieldKey,
        ...commonQuery,
    });

export const useCreateEvidenceWithDocument = (appId: string) => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (payload: unknown) => endpoints.createEvidenceWithDocument(appId, payload),
        onSuccess: (data, variables) => {
            qc.invalidateQueries({ queryKey: ['evidence', appId] });
            qc.invalidateQueries({ queryKey: ['profile', appId] });
            if ((variables as { profileFieldId?: string }).profileFieldId) {
                qc.invalidateQueries({ queryKey: ['profileFieldEvidence', (variables as { profileFieldId?: string }).profileFieldId] });
            }
        },
    });
};

export const useAttachEvidence = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ claimId, evidenceId, payload }: { claimId: string; evidenceId: string; payload: unknown }) => 
            endpoints.attachEvidence(claimId, evidenceId, payload),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['evidence'] });
            qc.invalidateQueries({ queryKey: ['profile'] });
        },
    });
};

export const useCreateTrack = (appId: string) => {
    return useMutation({
        mutationFn: (payload: unknown) => endpoints.createTrack(appId, payload),
    });
};

export const useAuditEvents = (appId: string, subjectId: string, page: number = 0, size: number = 10, options?: { enabled?: boolean }) =>
    useQuery({
        queryKey: ['auditEvents', appId, subjectId, page, size],
        queryFn: () => endpoints.getAuditEvents(appId, subjectId, page, size),
        enabled: (options?.enabled !== false) && !!appId && !!subjectId,
        ...commonQuery,
    });

export const useAuditCount = (appId: string, subjectId: string, options?: { enabled?: boolean }) =>
    useQuery({
        queryKey: ['auditCount', appId, subjectId],
        queryFn: () => endpoints.getAuditCount(appId, subjectId),
        enabled: (options?.enabled !== false) && !!appId && !!subjectId,
        ...commonQuery,
    });

export const useAttachedDocuments = (appId: string, profileFieldId: string) =>
    useQuery({
        queryKey: ['attachedDocuments', appId, profileFieldId],
        queryFn: () => endpoints.getAttachedDocuments(appId, profileFieldId),
        enabled: !!appId && !!profileFieldId,
        ...commonQuery,
    });

export const useAttachDocument = (appId: string, profileFieldId: string) => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (documentId: string) => endpoints.attachDocumentToField(appId, profileFieldId, documentId),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['attachedDocuments', appId, profileFieldId] });
            qc.invalidateQueries({ queryKey: ['profileFieldEvidence', profileFieldId] });
            qc.invalidateQueries({ queryKey: ['profile', appId] });
            qc.invalidateQueries({ queryKey: ['auditCount', appId, profileFieldId] });
        },
    });
};

export const useDetachDocument = (appId: string, profileFieldId: string) => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (documentId: string) => endpoints.detachDocumentFromField(appId, profileFieldId, documentId),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['attachedDocuments', appId, profileFieldId] });
            qc.invalidateQueries({ queryKey: ['profileFieldEvidence', profileFieldId] });
            qc.invalidateQueries({ queryKey: ['profile', appId] });
            qc.invalidateQueries({ queryKey: ['auditCount', appId, profileFieldId] });
        },
    });
};

export const useProfileFieldEvidence = (profileFieldId: string) =>
    useQuery({
        queryKey: ['profileFieldEvidence', profileFieldId],
        queryFn: () => endpoints.getProfileFieldEvidence(profileFieldId),
        enabled: !!profileFieldId,
        ...commonQuery,
    });

// Risk Management Hooks

export const useRisk = (riskId: string) =>
    useQuery({
        queryKey: ['risk', riskId],
        queryFn: () => endpoints.getRisk(riskId),
        enabled: !!riskId,
        ...commonQuery,
    });

export const useAppRisks = (appId: string, page?: number, size?: number, filters?: { status?: string; severity?: string; assignedSme?: string; search?: string }) =>
    useQuery({
        queryKey: ['risks', appId, page, size, filters],
        queryFn: () => endpoints.getAppRisks(appId, page, size, filters),
        enabled: !!appId,
        ...commonQuery,
    });

export const useFieldRisks = (appId: string, fieldKey: string) =>
    useQuery({
        queryKey: ['fieldRisks', appId, fieldKey],
        queryFn: () => endpoints.getFieldRisks(appId, fieldKey),
        enabled: !!appId && !!fieldKey,
        ...commonQuery,
    });

export const useProfileFieldRisks = (profileFieldId: string) =>
    useQuery({
        queryKey: ['profileFieldRisks', profileFieldId],
        queryFn: () => endpoints.getProfileFieldRisks(profileFieldId),
        enabled: !!profileFieldId,
        ...commonQuery,
    });

export const useCreateRisk = (appId: string, fieldKey: string) => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (payload: unknown) => endpoints.createRisk(appId, fieldKey, payload),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['risks', appId] });
            qc.invalidateQueries({ queryKey: ['fieldRisks', appId, fieldKey] });
        },
    });
};

export const useAttachEvidenceToRisk = (riskId: string) => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (payload: unknown) => endpoints.attachEvidenceToRisk(riskId, payload),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['risk', riskId] });
            qc.invalidateQueries({ queryKey: ['risks'] });
        },
    });
};

export const useDetachEvidenceFromRisk = (riskId: string) => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (evidenceId: string) => endpoints.detachEvidenceFromRisk(riskId, evidenceId),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['risk', riskId] });
            qc.invalidateQueries({ queryKey: ['risks'] });
        },
    });
};

// SME Hooks
export const useSmeReviewQueue = (smeId: string) =>
    useQuery<unknown[]>({ 
        queryKey: ['sme', 'queue', smeId], 
        queryFn: () => endpoints.getSmeReviewQueue(smeId), 
        enabled: !!smeId, 
        ...commonQuery 
    });

export const useSmeSecurityDomainRisks = (smeId: string) =>
    useQuery<unknown[]>({
        queryKey: ['sme', 'security-domain', smeId],
        queryFn: () => endpoints.getSmeSecurityDomainRisks(smeId),
        enabled: !!smeId,
        ...commonQuery
    });

export const useSmeCrossDomainRisks = (smeId: string) =>
    useQuery<unknown[]>({ 
        queryKey: ['sme', 'cross-domain', smeId], 
        queryFn: () => endpoints.getSmeCrossDomainRisks(smeId), 
        enabled: !!smeId, 
        ...commonQuery 
    });

export const useSmeAllOpenRisks = (smeId: string) =>
    useQuery<unknown[]>({ 
        queryKey: ['sme', 'all-open-risks', smeId], 
        queryFn: () => endpoints.getSmeAllOpenRisks(smeId), 
        enabled: !!smeId, 
        ...commonQuery 
    });

export const useSubmitSmeReview = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ riskId, payload }: { riskId: string; payload: { action: 'approve' | 'reject'; comments: string; smeId: string } }) => 
            endpoints.submitSmeReview(riskId, payload),
        onSuccess: (_, variables) => {
            // Invalidate all SME-related queries
            qc.invalidateQueries({ queryKey: ['sme'] });
            qc.invalidateQueries({ queryKey: ['risk', variables.riskId] });
            qc.invalidateQueries({ queryKey: ['risks'] });
        },
    });
};

export const useBulkAttestation = (appId: string) => {
    const qc = useQueryClient();
    return useMutation<BulkAttestationResponse, Error, BulkAttestationRequest>({
        mutationFn: (request: BulkAttestationRequest) => endpoints.submitBulkAttestation(appId, request),
        onSuccess: () => {
            // Invalidate relevant queries after successful bulk attestation
            qc.invalidateQueries({ queryKey: ['profile', appId] });
            qc.invalidateQueries({ queryKey: ['apps'] }); // Refresh apps data with updated KPIs
            qc.invalidateQueries({ queryKey: ['kpis'] }); // Refresh KPIs
            qc.invalidateQueries({ queryKey: ['profileFieldEvidence'] }); // Refresh evidence modal data
        },
    });
};

export const useSubmitAttestation = (appId: string, profileFieldId?: string) => {
    const qc = useQueryClient();
    return useMutation<AttestationResponse, Error, AttestationRequest>({
        mutationFn: (request: AttestationRequest) => endpoints.submitAttestation(appId, request),
        onSuccess: () => {
            // Invalidate relevant queries after successful attestation
            qc.invalidateQueries({ queryKey: ['profile', appId] });
            qc.invalidateQueries({ queryKey: ['apps'] }); // Refresh apps data with updated KPIs
            qc.invalidateQueries({ queryKey: ['kpis'] }); // Refresh KPIs
            qc.invalidateQueries({ queryKey: ['profileFieldEvidence'] }); // Refresh evidence modal data
            
            // Refresh audit count for the specific field
            if (profileFieldId) {
                qc.invalidateQueries({ queryKey: ['auditCount', appId, profileFieldId] });
                qc.invalidateQueries({ queryKey: ['auditEvents', appId, profileFieldId] });
            }
        },
    });
};

export const useDomains = () =>
    useQuery<string[]> ({
        queryKey: ['domains'],
        queryFn: () => endpoints.getDomains(),
        ...commonQuery,
    });

export const useControls = (domain: string) =>
    useQuery<string[]> ({
        queryKey: ['controls', domain],
        queryFn: () => endpoints.getControls(domain),
        enabled: !!domain,
        ...commonQuery,
    });

// ==========================================
// SME Dashboard Hooks
// ==========================================

// Evidence Review Hooks
export const usePendingSmeEvidence = (smeEmail: string, page?: number, size?: number) =>
    useQuery({
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
            payload: { action: 'approve' | 'reject'; reviewerId: string; reviewComment?: string };
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

// Domain Risk Hooks
export const useDomainRisksForArb = (arbName: string, status?: string) =>
    useQuery({
        queryKey: ['sme', 'domain-risks', arbName, status],
        queryFn: () => endpoints.getDomainRisksForArb(arbName, status),
        enabled: !!arbName,
        ...commonQuery
    });

export const useArbDashboard = (arbName: string, status?: string) =>
    useQuery({
        queryKey: ['sme', 'arb-dashboard', arbName, status],
        queryFn: () => endpoints.getArbDashboard(arbName, status),
        enabled: !!arbName,
        ...commonQuery
    });

export const useArbSummary = (arbName: string, status?: string) =>
    useQuery({
        queryKey: ['sme', 'arb-summary', arbName, status],
        queryFn: () => endpoints.getArbSummary(arbName, status),
        enabled: !!arbName,
        ...commonQuery
    });

export const useDomainRisk = (domainRiskId: string) =>
    useQuery({
        queryKey: ['sme', 'domain-risk', domainRiskId],
        queryFn: () => endpoints.getDomainRiskById(domainRiskId),
        enabled: !!domainRiskId,
        ...commonQuery
    });

export const useDomainRiskItems = (domainRiskId: string) =>
    useQuery({
        queryKey: ['sme', 'domain-risk-items', domainRiskId],
        queryFn: () => endpoints.getDomainRiskItems(domainRiskId),
        enabled: !!domainRiskId,
        ...commonQuery
    });

export const useDomainRisksForApp = (appId: string) =>
    useQuery({
        queryKey: ['sme', 'domain-risks-app', appId],
        queryFn: () => endpoints.getDomainRisksForApp(appId),
        enabled: !!appId,
        ...commonQuery
    });

// Risk Comment Hooks
export const useRiskComments = (riskItemId: string, includeInternal?: boolean) =>
    useQuery({
        queryKey: ['risk-comments', riskItemId, includeInternal],
        queryFn: () => endpoints.getRiskItemComments(riskItemId, includeInternal),
        enabled: !!riskItemId,
        ...commonQuery
    });

export const useAddRiskComment = (riskItemId: string) => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (payload: { commentType: string; commentText: string; commentedBy: string; isInternal?: boolean }) =>
            endpoints.addRiskItemComment(riskItemId, payload),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['risk-comments', riskItemId] });
        },
    });
};

export const useUpdateRiskStatus = (riskItemId: string) => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (payload: { status: string; resolution?: string; resolutionComment?: string }) =>
            endpoints.updateRiskItemStatus(riskItemId, payload),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['risks'] });
            qc.invalidateQueries({ queryKey: ['sme', 'domain-risks'] });
            qc.invalidateQueries({ queryKey: ['sme', 'arb-dashboard'] });
        },
    });
};

