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
    Checkbox,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
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
    VerifiedUser as AttestationIcon,
    SelectAll as SelectAllIcon,
} from '@mui/icons-material';
import type { ProfileDomain, ProfileField, PolicyRequirement } from '../../../api/types';
import { useAuditEvents, useAuditCount, useBulkAttestation as useBulkAttestationApi } from '../../../api/hooks';
import AttachEvidenceModal from './AttachEvidenceModal';
import FieldRisksModal from './FieldRisksModal';
import AttestationListModal from './AttestationListModal';
import BulkAttestationModal from './BulkAttestationModal';
import { useBulkAttestation } from '../hooks/useBulkAttestation';

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
    enableBulkAttestation?: boolean;
}

function FieldRow({ 
    field, 
    appId, 
    onTabChange,
    isSelectable = false,
    isSelected = false,
    onSelectionChange,
    showCheckboxColumn = false,
}: { 
    field: ProfileField; 
    appId: string; 
    onTabChange?: (tab: string) => void;
    isSelectable?: boolean;
    isSelected?: boolean;
    onSelectionChange?: (fieldId: string, selected: boolean) => void;
    showCheckboxColumn?: boolean;
}) {
    const { label, policyRequirement, evidence, approvalStatus, freshnessStatus, risks, attestations, fieldKey, profileFieldId } = field as any;
    const activeEvidence = evidence.find((e) => e.status === 'active');
    const [attachModalOpen, setAttachModalOpen] = useState(false);
    const [historyModalOpen, setHistoryModalOpen] = useState(false);
    const [risksModalOpen, setRisksModalOpen] = useState(false);
    const [attestationsModalOpen, setAttestationsModalOpen] = useState(false);
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

    // Helper function to determine attestation button color
    const getAttestationColor = (attestations: any[]) => {
        if (!attestations?.length) return 'inherit';
        
        const allAttested = attestations.every((att: any) => att.status === 'attested');
        const hasExpired = attestations.some((att: any) => att.status === 'expired');
        const hasPending = attestations.some((att: any) => att.status === 'pending' || !att.status);
        
        if (allAttested) return 'success';
        if (hasExpired) return 'error';
        if (hasPending) return 'warning';
        return 'inherit';
    };

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

    const handleSelectionChange = () => {
        if (onSelectionChange && isSelectable) {
            onSelectionChange(profileFieldId, !isSelected);
        }
    };

    return (
        <>
            <TableRow hover sx={{ bgcolor: isSelected ? 'action.selected' : 'inherit' }}>
                {showCheckboxColumn && (
                    <TableCell padding="checkbox">
                        {isSelectable ? (
                            <Checkbox
                                checked={isSelected}
                                onChange={handleSelectionChange}
                                size="small"
                            />
                        ) : null}
                    </TableCell>
                )}
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
                    <Chip
                        size="small"
                        color={
                            approvalStatus === 'approved' ? 'success' :
                            approvalStatus === 'user_attested' ? 'info' :
                            approvalStatus === 'partially_approved' ? 'warning' :
                            approvalStatus === 'pending_review' ? 'warning' :
                            approvalStatus === 'rejected' ? 'error' :
                            'default' // no_evidence fallback
                        }
                        variant="outlined"
                        label={
                            approvalStatus ? 
                                approvalStatus.replace('_', ' ').split(' ').map(word => 
                                    word.charAt(0).toUpperCase() + word.slice(1)
                                ).join(' ') : 
                                '—'
                        }
                    />
                </TableCell>
                <TableCell>
                    <Chip
                        size="small"
                        color={
                            freshnessStatus === 'current' ? 'success' :
                            freshnessStatus === 'expiring' ? 'warning' :
                            freshnessStatus === 'expired' ? 'error' :
                            freshnessStatus === 'broken' ? 'error' :
                            freshnessStatus === 'invalid_evidence' ? 'error' :
                            'default'
                        }
                        variant="outlined"
                        label={
                            freshnessStatus ? 
                                freshnessStatus.replace('_', ' ').split(' ').map(word => 
                                    word.charAt(0).toUpperCase() + word.slice(1)
                                ).join(' ') : 
                                '—'
                        }
                    />
                </TableCell>
                <TableCell>
                    {risks.length ? (
                        <Button
                            size="small"
                            color="error"
                            variant="text"
                            startIcon={<RiskIcon fontSize="small" />}
                            onClick={() => setRisksModalOpen(true)}
                        >
                            {risks.length}
                        </Button>
                    ) : (
                        <Typography variant="caption" color="text.secondary">—</Typography>
                    )}
                </TableCell>
                <TableCell>
                    {attestations?.length ? (
                        <Button
                            size="small"
                            color={getAttestationColor(attestations)}
                            variant="text"
                            startIcon={<AttestationIcon fontSize="small" />}
                            onClick={() => setAttestationsModalOpen(true)}
                        >
                            {attestations.length}
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
            
            {/* Field Risks Modal */}
            <FieldRisksModal
                open={risksModalOpen}
                onClose={() => setRisksModalOpen(false)}
                fieldLabel={label}
                risks={risks}
            />
            
            {/* Attestations Modal */}
            <AttestationListModal
                open={attestationsModalOpen}
                onClose={() => setAttestationsModalOpen(false)}
                fieldLabel={label}
                attestations={attestations || []}
                profileFieldId={profileFieldId}
                appId={appId}
            />
        </>
    );
}

export default function DomainTable({ domain, appId, onTabChange, enableBulkAttestation = true }: DomainTableProps) {
    const { title, icon, driverLabel, driverValue, fields, domainKey, bulkAttestationEnabled } = domain;
    
    // Filter state for status filtering
    const [filterStatus, setFilterStatus] = useState<'all' | 'pending_review' | 'approved' | 'rejected' | 'user_attested' | 'partially_approved' | 'no_evidence'>('all');
    
    // Bulk attestation modal state
    const [bulkAttestationModalOpen, setBulkAttestationModalOpen] = useState(false);

    // API hook for bulk attestation
    const bulkAttestationMutation = useBulkAttestationApi(appId);

    // Filter fields based on status
    const filteredFields = useMemo(() => {
        if (filterStatus === 'all') return fields;
        return fields.filter((field: any) => field.approvalStatus === filterStatus);
    }, [fields, filterStatus]);
    
    // Bulk attestation hook for UI state
    const bulkAttestation = useBulkAttestation(filteredFields);

    // Handlers for bulk attestation
    const handleBulkAttest = () => {
        setBulkAttestationModalOpen(true);
    };

    const handleBulkAttestationSubmit = async (attestationData: {
        fields: { profileFieldId: string; fieldKey: string }[];
        comments: string;
    }) => {
        try {
            await bulkAttestationMutation.mutateAsync({
                fields: attestationData.fields,
                attestationComments: attestationData.comments,
                attestationType: 'compliance',
                attestedBy: 'current-user', // TODO: Get from auth context
            });
            
            setBulkAttestationModalOpen(false);
            bulkAttestation.reset();
        } catch (error) {
            console.error('Bulk attestation failed:', error);
            // Show user-friendly error message
            const errorMessage = error instanceof Error ? error.message : 'Failed to submit bulk attestation';
            alert(`Bulk attestation failed: ${errorMessage}`);
            // Error handling - in real app, show error toast/notification
        }
    };

    const handleFieldSelectionChange = (fieldId: string, selected: boolean) => {
        if (selected) {
            bulkAttestation.selectField(fieldId);
        } else {
            bulkAttestation.deselectField(fieldId);
        }
    };

    const coverage = useMemo(() => {
        let approved = 0, pending = 0, rejected = 0, partiallyApproved = 0, userAttested = 0, noEvidence = 0;
        filteredFields.forEach((field: any) => {
            if (field.approvalStatus === 'approved') approved++;
            else if (field.approvalStatus === 'user_attested') userAttested++;
            else if (field.approvalStatus === 'partially_approved') partiallyApproved++;
            else if (field.approvalStatus === 'pending_review') pending++;
            else if (field.approvalStatus === 'rejected') rejected++;
            else if (field.approvalStatus === 'no_evidence') noEvidence++;
        });
        const total = filteredFields.length || 1;
        const compliant = approved + userAttested + partiallyApproved; // Count all positive statuses as compliant
        const readiness = Math.round((compliant / total) * 100);
        return { 
            Approved: approved, 
            Pending: pending + noEvidence, // Group pending items together
            Rejected: rejected, 
            readiness 
        };
    }, [filteredFields]);

    return (
        <Stack spacing={1.5}>
            {/* Coverage Summary with Inline Bulk Attestation Controls */}
            <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                <Stack direction="row" spacing={1} alignItems="center">
                    {/* Bulk selection checkbox when enabled by backend */}
                    {enableBulkAttestation && bulkAttestationEnabled && (
                        <Checkbox
                            size="small"
                            checked={bulkAttestation.isAllSelected}
                            indeterminate={bulkAttestation.isSomeSelected && !bulkAttestation.isAllSelected}
                            onChange={() => {
                                if (bulkAttestation.isAllSelected) {
                                    bulkAttestation.selectNone();
                                } else {
                                    bulkAttestation.selectAll();
                                }
                            }}
                            sx={{ mr: 0.5 }}
                        />
                    )}
                    
                    <Tooltip title="Approval coverage across this domain">
                        <FactCheckIcon fontSize="small" />
                    </Tooltip>
                    <Typography variant="caption" color="text.secondary">
                        Approved {coverage.Approved} • Pending {coverage.Pending} • Rejected {coverage.Rejected}
                    </Typography>
                    
                    {/* Selection status when bulk attestation is enabled */}
                    {enableBulkAttestation && bulkAttestationEnabled && bulkAttestation.selectedCount > 0 && (
                        <Typography variant="caption" color="primary" sx={{ fontWeight: 600 }}>
                            ({bulkAttestation.selectedCount} selected)
                        </Typography>
                    )}
                </Stack>
                
                <Stack direction="row" spacing={1} alignItems="center">
                    {/* Filter dropdown when bulk attestation is enabled by backend */}
                    {enableBulkAttestation && bulkAttestationEnabled && (
                        <FormControl size="small" sx={{ minWidth: 100 }}>
                            <Select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value as any)}
                                displayEmpty
                                variant="outlined"
                                sx={{ 
                                    '& .MuiSelect-select': { 
                                        py: 0.5,
                                        fontSize: '0.75rem'
                                    }
                                }}
                            >
                                <MenuItem value="all">All</MenuItem>
                                <MenuItem value="approved">Approved</MenuItem>
                                <MenuItem value="user_attested">User Attested</MenuItem>
                                <MenuItem value="partially_approved">Partially Approved</MenuItem>
                                <MenuItem value="pending_review">Pending Review</MenuItem>
                                <MenuItem value="rejected">Rejected</MenuItem>
                                <MenuItem value="no_evidence">No Evidence</MenuItem>
                            </Select>
                        </FormControl>
                    )}
                    
                    {/* Bulk action buttons when bulk attestation is enabled and items are selected */}
                    {enableBulkAttestation && bulkAttestationEnabled && bulkAttestation.selectedCount > 0 && (
                        <>
                            <Button
                                size="small"
                                variant="outlined"
                                startIcon={<SelectAllIcon />}
                                onClick={bulkAttestation.selectNone}
                                sx={{ 
                                    minWidth: 'auto',
                                    px: 1,
                                    fontSize: '0.6875rem'
                                }}
                            >
                                Clear
                            </Button>
                            
                            <Button
                                size="small"
                                variant="contained"
                                startIcon={<AttestationIcon />}
                                onClick={handleBulkAttest}
                                color="primary"
                                sx={{ 
                                    fontSize: '0.6875rem'
                                }}
                            >
                                Attest ({bulkAttestation.selectedCount})
                            </Button>
                        </>
                    )}
                    
                    {/* Coverage progress bar */}
                    <Typography variant="caption" color="text.secondary">Coverage</Typography>
                    <Box sx={{ width: 60 }}>
                        <LinearProgress variant="determinate" value={coverage.readiness} sx={{ height: 6, borderRadius: 4 }} />
                    </Box>
                    <Typography variant="caption" fontWeight={700} sx={{ minWidth: '35px', textAlign: 'right' }}>
                        {coverage.readiness}%
                    </Typography>
                </Stack>
            </Stack>

            <Divider />

            {/* Table */}
            <TableContainer sx={{ overflowX: 'auto' }}>
                <Table size="small" sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            {enableBulkAttestation && bulkAttestationEnabled && (
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        checked={bulkAttestation.isAllSelected}
                                        indeterminate={bulkAttestation.isSomeSelected && !bulkAttestation.isAllSelected}
                                        onChange={() => {
                                            if (bulkAttestation.isAllSelected) {
                                                bulkAttestation.selectNone();
                                            } else {
                                                bulkAttestation.selectAll();
                                            }
                                        }}
                                        size="small"
                                    />
                                </TableCell>
                            )}
                            <TableCell sx={{ minWidth: 140 }}>Property</TableCell>
                            <TableCell sx={{ minWidth: 120 }}>Requirement</TableCell>
                            <TableCell sx={{ minWidth: 100 }}>Approval</TableCell>
                            <TableCell sx={{ minWidth: 100 }}>Freshness</TableCell>
                            <TableCell sx={{ minWidth: 80 }}>Risks</TableCell>
                            <TableCell sx={{ minWidth: 80 }}>Attestations</TableCell>
                            <TableCell align="right" sx={{ minWidth: 140 }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredFields.map((field) => (
                            <FieldRow 
                                key={field.fieldKey} 
                                field={field} 
                                appId={appId} 
                                onTabChange={onTabChange}
                                showCheckboxColumn={enableBulkAttestation && bulkAttestationEnabled}
                                isSelectable={enableBulkAttestation && bulkAttestationEnabled && bulkAttestation.canFieldBeSelected(field)}
                                isSelected={bulkAttestation.isFieldSelected(field.profileFieldId)}
                                onSelectionChange={handleFieldSelectionChange}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Bulk Attestation Modal */}
            {enableBulkAttestation && (
                <BulkAttestationModal
                    open={bulkAttestationModalOpen}
                    onClose={() => setBulkAttestationModalOpen(false)}
                    selectedFields={bulkAttestation.selectedFields}
                    domainName={title}
                    onSubmit={handleBulkAttestationSubmit}
                />
            )}
        </Stack>
    );
}