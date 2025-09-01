import React, { useMemo, useState } from 'react';
import {
    Box,
    Chip,
    Divider,
    LinearProgress,
    Paper,
    Stack,
    Typography,
    Button,
    Tooltip,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableContainer,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    Link,
    Pagination,
} from '@mui/material';
import {
    Security as SecurityIcon,
    GppGood as IntegrityIcon,
    AvTimer as AvailabilityIcon,
    Bolt as ResilienceIcon,
    Summarize as SummaryIcon,
    FactCheck as FactCheckIcon,
    ReportProblem as RiskIcon,
    Description as DefaultIcon,
    Close as CloseIcon,
} from '@mui/icons-material';
import type { ProfileDomain, ProfileField, PolicyRequirement } from '../../../api/types';
import { useAuditEvents, useAuditCount } from '../../../api/hooks';
import AttachEvidenceModal from './AttachEvidenceModal';

const ICON_MAP: Record<string, React.ReactElement> = {
    SecurityIcon: <SecurityIcon fontSize="small" />,
    IntegrityIcon: <IntegrityIcon fontSize="small" />,
    AvailabilityIcon: <AvailabilityIcon fontSize="small" />,
    ResilienceIcon: <ResilienceIcon fontSize="small" />,
    SummaryIcon: <SummaryIcon fontSize="small" />,
    DefaultIcon: <DefaultIcon fontSize="small" />,
};

interface DomainTableProps {
    domain: ProfileDomain;
    appId: string;
    onTabChange?: (tab: string) => void;
}

function FieldRow({ field, appId, onTabChange }: { field: ProfileField; appId: string; onTabChange?: (tab: string) => void }) {
    const { label, policyRequirement, evidence, assurance, risks, fieldKey, profileFieldId } = field;
    const activeEvidence = evidence.find((e) => e.status === 'active');
    const [attachModalOpen, setAttachModalOpen] = useState(false);
    const [historyModalOpen, setHistoryModalOpen] = useState(false);
    const [auditPage, setAuditPage] = useState(0);

    // Fetch audit events for this profile field
    const { data: auditData, isLoading: auditLoading, error: auditError } = useAuditEvents(
        appId, 
        profileFieldId, 
        auditPage, 
        10, // 10 per page
        { enabled: historyModalOpen } // Only fetch when modal is open
    );

    // Fetch audit count for History button
    const { data: auditCount } = useAuditCount(appId, profileFieldId);

    const auditEvents = auditData?.content || [];

    // Helper function to parse audit event details and extract document info
    const parseAuditEventDetails = (event: any) => {
        try {
            // Try to extract document info from multiple possible sources
            
            // First, try parsing argsRedacted JSON
            if (event.argsRedacted) {
                const parsed = JSON.parse(event.argsRedacted);
                const args = parsed.args;
                
                // Try multiple argument positions and structures for document info
                if (args && Array.isArray(args)) {
                    // Check args[1].document (common structure)
                    if (args.length > 1 && args[1]?.document) {
                        const document = args[1].document;
                        return {
                            title: document.title,
                            url: document.url || document.canonicalUrl,
                            sourceType: document.sourceType,
                            versionId: document.latestVersion?.versionId
                        };
                    }
                    
                    // Check args[0].document
                    if (args.length > 0 && args[0]?.document) {
                        const document = args[0].document;
                        return {
                            title: document.title,
                            url: document.url || document.canonicalUrl,
                            sourceType: document.sourceType,
                            versionId: document.latestVersion?.versionId
                        };
                    }
                    
                    // Check direct document in args
                    for (const arg of args) {
                        if (arg && arg.title && (arg.url || arg.canonicalUrl)) {
                            return {
                                title: arg.title,
                                url: arg.url || arg.canonicalUrl,
                                sourceType: arg.sourceType,
                                versionId: arg.latestVersion?.versionId || arg.versionId
                            };
                        }
                    }
                }
                
                // Check if parsed directly contains document info
                if (parsed.title && (parsed.url || parsed.canonicalUrl)) {
                    return {
                        title: parsed.title,
                        url: parsed.url || parsed.canonicalUrl,
                        sourceType: parsed.sourceType,
                        versionId: parsed.latestVersion?.versionId || parsed.versionId
                    };
                }
            }
            
            // Fallback: Check if event itself has document fields
            if (event.title && (event.url || event.canonicalUrl)) {
                return {
                    title: event.title,
                    url: event.url || event.canonicalUrl,
                    sourceType: event.sourceType,
                    versionId: event.latestVersion?.versionId || event.versionId
                };
            }
            
        } catch (error) {
            console.warn('Failed to parse audit event details:', error);
        }
        return null;
    };

    const formatPolicyRequirementTooltip = (req: PolicyRequirement) => {
        const { ttl } = req;
        
        if (ttl === '0d') {
            return 'New evidence is required for every release';
        }
        
        return `Evidence valid for ${ttl}`;
    };

    return (
        <>
            <TableRow hover>
                <TableCell>
                    <Typography variant="body2" fontWeight={600}>{label}</Typography>
                </TableCell>
                <TableCell>
                    <Tooltip 
                        title={formatPolicyRequirementTooltip(policyRequirement)}
                        placement="top"
                        arrow
                    >
                        <Typography 
                            variant="body2" 
                            sx={{ 
                                cursor: 'help',
                                textDecoration: 'underline',
                                textDecorationStyle: 'dotted',
                                textDecorationColor: 'rgba(0, 0, 0, 0.3)',
                                '&:hover': {
                                    textDecorationColor: 'rgba(0, 0, 0, 0.6)'
                                }
                            }}
                        >
                            {policyRequirement.label}
                        </Typography>
                    </Tooltip>
                </TableCell>
                <TableCell>
                    {activeEvidence ? (
                        <Chip size="small" color="success" variant="outlined" label="Approved" />
                    ) : evidence.length > 0 ? (
                        <Chip size="small" color="default" variant="outlined" label="No active" />
                    ) : (
                        <Chip size="small" color="error" variant="outlined" label="No evidence" />
                    )}
                </TableCell>
                <TableCell>
                    <Chip
                        size="small"
                        color={assurance === 'Current' ? 'success' : assurance === 'Expiring' ? 'warning' : 'error'}
                        variant="outlined"
                        label={assurance}
                    />
                </TableCell>
                <TableCell>
                    {risks.length ? (
                        <Button
                            size="small"
                            color="error"
                            variant="text"
                            startIcon={<RiskIcon fontSize="small" />}
                            onClick={() => onTabChange?.('risks')}
                        >
                            {risks.length}
                        </Button>
                    ) : (
                        <Typography variant="caption" color="text.secondary">—</Typography>
                    )}
                </TableCell>
                <TableCell align="right">
                    {activeEvidence ? (
                        <Stack direction="row" spacing={1} justifyContent="flex-end">
                            <Button size="small" variant="text" onClick={() => setAttachModalOpen(true)}>View evidence</Button>
                            <Button size="small" variant="text" onClick={() => setHistoryModalOpen(true)}>History{auditCount ? ` (${auditCount})` : ''}</Button>
                        </Stack>
                    ) : (
                        <Stack direction="row" spacing={1} justifyContent="flex-end">
                            <Button size="small" variant="text" onClick={() => setAttachModalOpen(true)}>
                                Attach evidence
                            </Button>
                            <Button size="small" variant="text" disabled={evidence.length === 0} onClick={() => setHistoryModalOpen(true)}>History{auditCount ? ` (${auditCount})` : ''}</Button>
                        </Stack>
                    )}
                </TableCell>
            </TableRow>
            
            {/* Attach Evidence Modal */}
            <AttachEvidenceModal
                open={attachModalOpen}
                onClose={() => setAttachModalOpen(false)}
                fieldKey={fieldKey}
                fieldLabel={label}
                profileFieldId={profileFieldId}
                appId={appId}
                policyRequirement={policyRequirement}
            />
            
            {/* Audit History Modal */}
            <Dialog open={historyModalOpen} onClose={() => setHistoryModalOpen(false)} maxWidth="md" fullWidth>
                <DialogTitle>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography variant="h6">
                            Audit History: {label}
                        </Typography>
                        <IconButton onClick={() => setHistoryModalOpen(false)} size="small">
                            <CloseIcon />
                        </IconButton>
                    </Stack>
                </DialogTitle>
                <DialogContent>
                    {auditLoading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                            <Typography variant="body2" color="text.secondary">
                                Loading audit events...
                            </Typography>
                        </Box>
                    ) : auditError ? (
                        <Typography variant="body2" color="error" sx={{ py: 2 }}>
                            Error loading audit events: {String(auditError)}
                        </Typography>
                    ) : auditEvents.length === 0 ? (
                        <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
                            No audit events available for this field.
                        </Typography>
                    ) : (
                        <TableContainer>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Action</TableCell>
                                        <TableCell>Document</TableCell>
                                        <TableCell>Source Type</TableCell>
                                        <TableCell>Version ID</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {auditEvents.map((event: any, index: number) => (
                                        <TableRow key={event.id || index}>
                                            <TableCell>
                                                {event.occurredAtUtc ? 
                                                    new Date(event.occurredAtUtc).toLocaleString() : '—'}
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    size="small"
                                                    label={event.action || 'Unknown'}
                                                    variant="outlined"
                                                    color={event.outcome === 'SUCCESS' ? 'success' : 'error'}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                {(() => {
                                                    const documentInfo = parseAuditEventDetails(event);
                                                    if (documentInfo && documentInfo.title && documentInfo.url) {
                                                        return (
                                                            <Link 
                                                                href={documentInfo.url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                variant="body2"
                                                                sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                                                            >
                                                                {documentInfo.title}
                                                            </Link>
                                                        );
                                                    }
                                                    return (
                                                        <Typography variant="body2" color="text.secondary">
                                                            Document information not available
                                                        </Typography>
                                                    );
                                                })()}
                                            </TableCell>
                                            <TableCell>
                                                {(() => {
                                                    const documentInfo = parseAuditEventDetails(event);
                                                    return documentInfo?.sourceType ? (
                                                        <Typography variant="body2">
                                                            {documentInfo.sourceType}
                                                        </Typography>
                                                    ) : (
                                                        <Typography variant="body2" color="text.secondary">—</Typography>
                                                    );
                                                })()}
                                            </TableCell>
                                            <TableCell>
                                                {(() => {
                                                    const documentInfo = parseAuditEventDetails(event);
                                                    return documentInfo?.versionId ? (
                                                        <Typography variant="body2">
                                                            {documentInfo.versionId}
                                                        </Typography>
                                                    ) : (
                                                        <Typography variant="body2" color="text.secondary">—</Typography>
                                                    );
                                                })()}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                    
                    {/* Pagination */}
                    {auditData && auditData.totalPages > 1 && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
                            <Pagination
                                count={auditData.totalPages}
                                page={auditPage + 1}
                                onChange={(event, value) => setAuditPage(value - 1)}
                                color="primary"
                                size="small"
                            />
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setHistoryModalOpen(false)}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default function DomainTable({ domain, appId, onTabChange }: DomainTableProps) {
    const { title, icon, driverLabel, driverValue, fields } = domain;

    const coverage = useMemo(() => {
        let cur = 0, exp = 0, expd = 0, miss = 0;
        fields.forEach((field) => {
            if (field.assurance === 'Current') cur++;
            else if (field.assurance === 'Expiring') exp++;
            else if (field.assurance === 'Expired') expd++;
            else miss++;
        });
        const total = fields.length || 1;
        const readiness = Math.round((cur / total) * 100);
        return { Current: cur, Expiring: exp, Expired: expd, Missing: miss, readiness };
    }, [fields]);

    return (
        <Stack spacing={1.5}>
            {/* Coverage Summary */}
            <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                <Stack direction="row" spacing={1} alignItems="center">
                    <Tooltip title="Current coverage across this domain">
                        <FactCheckIcon fontSize="small" />
                    </Tooltip>
                    <Typography variant="caption" color="text.secondary">
                        Current {coverage.Current} • Expiring {coverage.Expiring} • Expired {coverage.Expired} • Missing {coverage.Missing}
                    </Typography>
                </Stack>
                <Stack direction="row" spacing={2} alignItems="center" sx={{ minWidth: 120 }}>
                    <Typography variant="caption" color="text.secondary">Coverage</Typography>
                    <Box sx={{ flex: 1, minWidth: 60 }}>
                        <LinearProgress variant="determinate" value={coverage.readiness} sx={{ height: 6, borderRadius: 4 }} />
                    </Box>
                    <Typography variant="caption" fontWeight={700}>{coverage.readiness}%</Typography>
                </Stack>
            </Stack>

            <Divider />

            {/* Table */}
            <TableContainer sx={{ overflowX: 'auto' }}>
                <Table size="small" sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ minWidth: 140 }}>Property</TableCell>
                            <TableCell sx={{ minWidth: 120 }}>Requirement</TableCell>
                            <TableCell sx={{ minWidth: 100 }}>Status</TableCell>
                            <TableCell sx={{ minWidth: 100 }}>Assurance</TableCell>
                            <TableCell sx={{ minWidth: 80 }}>Risks</TableCell>
                            <TableCell align="right" sx={{ minWidth: 140 }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {fields.map((field) => (
                            <FieldRow key={field.fieldKey} field={field} appId={appId} onTabChange={onTabChange} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Stack>
    );
}