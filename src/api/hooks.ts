import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { endpoints } from './client';
import type { AppSummary, EvidenceItem, RequirementsResponse, ReleaseItem, PortfolioKpis } from './types';

export const useApps = () => useQuery<AppSummary[]>({ queryKey: ['apps'], queryFn: () => endpoints.listApps() });
export const useApp = (appId: string) => useQuery<AppSummary>({ queryKey: ['apps', appId], queryFn: () => endpoints.getApp(appId), enabled: !!appId });
export const useProfile = (appId: string) => useQuery<any>({ queryKey: ['profile', appId], queryFn: () => endpoints.getProfile(appId), enabled: !!appId });
export const useEvidence = (appId: string) => useQuery<EvidenceItem[]>({ queryKey: ['evidence', appId], queryFn: () => endpoints.getEvidence(appId), enabled: !!appId });
export const useAllEvidence = () => useQuery<EvidenceItem[]>({ queryKey: ['evidence', 'all'], queryFn: () => endpoints.getAllEvidence() });
export const useRequirements = (appId: string, params?: Record<string, string>) => useQuery<RequirementsResponse>({ queryKey: ['requirements', appId, params], queryFn: () => endpoints.getRequirements(appId, params), enabled: !!appId });
export const useReleases = (appId: string) => useQuery<ReleaseItem[]>({ queryKey: ['releases', appId], queryFn: () => endpoints.getReleases(appId), enabled: !!appId });
export const usePortfolioKpis = () => useQuery<PortfolioKpis>({ queryKey: ['kpis', 'portfolio'], queryFn: () => endpoints.getPortfolioKpis() });

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
