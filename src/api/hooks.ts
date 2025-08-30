import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { endpoints } from './client';
import type {
    AppSummary,
    EvidenceItem,
    RequirementsResponse,
    ReleaseItem,
    PortfolioKpis,
    ProfileResponse,
    AppKpis,
} from './types';

const commonQuery = { staleTime: 60_000, refetchOnWindowFocus: false as const };

export const useApps = () =>
    useQuery<AppSummary[]>({ queryKey: ['apps'], queryFn: () => endpoints.listApps(), ...commonQuery });

export const useApp = (appId: string) =>
    useQuery<AppSummary>({ queryKey: ['apps', appId], queryFn: () => endpoints.getApp(appId), enabled: !!appId, ...commonQuery });

export const useProfile = (appId: string) =>
    useQuery<ProfileResponse>({ queryKey: ['profile', appId], queryFn: () => endpoints.getProfile(appId), enabled: !!appId, ...commonQuery });

export const useEvidence = (appId: string) =>
    useQuery<EvidenceItem[]>({ queryKey: ['evidence', appId], queryFn: () => endpoints.getEvidence(appId), enabled: !!appId, ...commonQuery });

export const useAllEvidence = () =>
    useQuery<EvidenceItem[]>({ queryKey: ['evidence', 'all'], queryFn: () => endpoints.getAllEvidence(), ...commonQuery });

export const useRequirements = (appId: string, params?: Record<string, string>) =>
    useQuery<RequirementsResponse>({
        queryKey: ['requirements', appId, params],
        queryFn: () => endpoints.getRequirements(appId, params),
        enabled: !!appId,
        ...commonQuery,
    });

export const useReleases = (appId: string) =>
    useQuery<ReleaseItem[]>({ queryKey: ['releases', appId], queryFn: () => endpoints.getReleases(appId), enabled: !!appId, ...commonQuery });

export const usePortfolioKpis = () =>
    useQuery<PortfolioKpis>({ queryKey: ['kpis', 'portfolio'], queryFn: () => endpoints.getPortfolioKpis(), ...commonQuery });

export const useAppKpis = (appId: string) =>
    useQuery<AppKpis>({ queryKey: ['kpis', 'app', appId], queryFn: () => endpoints.getAppKpis(appId), enabled: !!appId, ...commonQuery });

export const useChildApps = (appId: string) =>
    useQuery<AppSummary[]>({ queryKey: ['childApps', appId], queryFn: () => endpoints.getChildApps(appId), enabled: !!appId, ...commonQuery });

export const useCreateEvidence = (appId: string) => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (payload: any) => endpoints.createEvidence(appId, payload),
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
        mutationFn: (payload: any) => endpoints.createDoc(appId, payload),
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
        mutationFn: (payload: any) => endpoints.createEvidenceWithDocument(appId, payload),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['evidence', appId] });
            qc.invalidateQueries({ queryKey: ['profile', appId] });
        },
    });
};

export const useAttachEvidence = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ claimId, evidenceId, payload }: { claimId: string; evidenceId: string; payload: any }) => 
            endpoints.attachEvidence(claimId, evidenceId, payload),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['evidence'] });
            qc.invalidateQueries({ queryKey: ['profile'] });
        },
    });
};

export const useCreateTrack = (appId: string) => {
    return useMutation({
        mutationFn: (payload: any) => endpoints.createTrack(appId, payload),
    });
};

export const useAuditEvents = (appId: string, subjectId: string, page: number = 0, size: number = 10, options?: { enabled?: boolean }) =>
    useQuery({
        queryKey: ['auditEvents', appId, subjectId, page, size],
        queryFn: () => endpoints.getAuditEvents(appId, subjectId, page, size),
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
            qc.invalidateQueries({ queryKey: ['profile', appId] });
        },
    });
};

export const useDetachDocument = (appId: string, profileFieldId: string) => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (documentId: string) => endpoints.detachDocumentFromField(appId, profileFieldId, documentId),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['attachedDocuments', appId, profileFieldId] });
            qc.invalidateQueries({ queryKey: ['profile', appId] });
        },
    });
};
