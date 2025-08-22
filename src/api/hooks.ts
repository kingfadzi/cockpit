import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { endpoints } from './client';
import type {
    AppSummary,
    EvidenceItem,
    RequirementsResponse,
    ReleaseItem,
    PortfolioKpis,
} from './types';

const commonQuery = { staleTime: 60_000, refetchOnWindowFocus: false as const };

export const useApps = () =>
    useQuery<AppSummary[]>({ queryKey: ['apps'], queryFn: () => endpoints.listApps(), ...commonQuery });

export const useApp = (appId: string) =>
    useQuery<AppSummary>({ queryKey: ['apps', appId], queryFn: () => endpoints.getApp(appId), enabled: !!appId, ...commonQuery });

export const useProfile = (appId: string) =>
    useQuery<any>({ queryKey: ['profile', appId], queryFn: () => endpoints.getProfile(appId), enabled: !!appId, ...commonQuery });

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
