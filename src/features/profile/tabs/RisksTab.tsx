import React, { useState, useEffect, useMemo } from 'react';
import {
    Stack,
    Typography,
    Paper,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Box,
    Chip,
    CircularProgress,
    Alert,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    IconButton,
    Tooltip,
    InputAdornment,
    Divider,
    Grid,
} from '@mui/material';
import {
    Warning as WarningIcon,
    Add as AddIcon,
    Search as SearchIcon,
    FilterList as FilterIcon,
    AttachFile as AttachFileIcon,
    CheckCircle as ApproveIcon,
    Cancel as RejectIcon,
    Visibility as ViewIcon,
    Edit as EditIcon,
    Assignment as AssignIcon,
    Close as CloseIcon,
} from '@mui/icons-material';
import { useAppRisks, useCreateRisk, useAttachEvidenceToRisk } from '../../../api/hooks';
import type { RiskStory, RiskStatus, RiskSeverity } from '../../../api/types';
import SmeRiskItemModal from '../../sme/components/SmeRiskItemModal';
import PoRiskItemModal from '../components/PoRiskItemModal';
import { Link } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { endpoints } from '../../../api/client';
import { useUser } from '../../../app/UserContext';

interface RisksTabProps {
    appId: string;
    appName?: string; // Optional application name to display in table
    userRole?: 'po' | 'sme'; // Determines which actions are available
    smeId?: string; // Required when userRole='sme'
    currentArb?: string; // Current ARB/Guild context (e.g., 'security', 'operations')
}

interface CreateRiskForm {
    title: string;
    description: string;
    severity: RiskSeverity;
    fieldKey: string;
    assignedTo: string;
}

export default function RisksTab({ appId, appName, userRole = 'po', smeId, currentArb }: RisksTabProps) {
    const { userId } = useUser();
    const currentUserId = smeId || userId; // Use smeId prop if provided, otherwise use context
    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const [detailsModalOpen, setDetailsModalOpen] = useState(false);
    const [selectedRisk, setSelectedRisk] = useState<RiskStory | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('');
    const [severityFilter, setSeverityFilter] = useState<string>('');
    const [smeFilter, setSmeFilter] = useState<string>('');
    const [riskRatingDimensionFilter, setRiskRatingDimensionFilter] = useState<string>('');
    const [fieldKeyFilter, setFieldKeyFilter] = useState<string>('');
    const [guildFilter, setGuildFilter] = useState<string>(currentArb || ''); // Initialize with current ARB context
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [newRisk, setNewRisk] = useState<CreateRiskForm>({
        title: '',
        description: '',
        severity: 'medium',
        fieldKey: '',
        assignedTo: ''
    });

    // Map risk rating dimension (CIA+S+R) to Guild/ARB - define before use
    const riskRatingDimensionToGuild: Record<string, string> = {
        'security_rating': 'security',
        'confidentiality_rating': 'data',
        'integrity_rating': 'data',
        'availability_rating': 'operations',
        'resilience_rating': 'operations',
        'app_criticality_assessment': 'enterprise_architecture', // Maps to EA guild
    };

    // Build filters object
    const filters = useMemo(() => {
        // For SME role: send current user ID to enable backend OR logic (my guild OR assigned to me)
        // Unless user manually filtered by a specific SME
        const shouldIncludeCurrentUser = userRole === 'sme' && !smeFilter && currentUserId;

        return {
            ...(searchTerm && { search: searchTerm }),
            ...(statusFilter && { status: statusFilter }),
            ...(severityFilter && { severity: severityFilter }),
            ...(smeFilter && { assignedTo: smeFilter === 'UNASSIGNED' ? '' : smeFilter }),
            ...(shouldIncludeCurrentUser && { assignedTo: currentUserId }),
            ...(riskRatingDimensionFilter && { riskRatingDimension: riskRatingDimensionFilter }),
            ...(fieldKeyFilter && { fieldKey: fieldKeyFilter }),
            ...(guildFilter && { arb: guildFilter }),
            // Prioritize risks assigned to current SME (show them at the top)
            ...(userRole === 'sme' && currentUserId && { prioritizeUserId: currentUserId }),
        };
    }, [searchTerm, statusFilter, severityFilter, smeFilter, riskRatingDimensionFilter, fieldKeyFilter, guildFilter, userRole, currentUserId]);

    // Debug logging
    console.log('[RisksTab] User Role:', userRole);
    console.log('[RisksTab] Filters being sent:', filters);

    // API hooks
    const { data: risksData, isLoading, error } = useAppRisks(appId, page + 1, rowsPerPage, Object.keys(filters).length > 0 ? filters : undefined);
    const createRiskMutation = useCreateRisk(appId, newRisk.fieldKey);
    const queryClient = useQueryClient();

    // Self-assign mutation
    const selfAssignMutation = useMutation({
        mutationFn: ({ riskItemId, userId }: { riskItemId: string; userId: string }) =>
            endpoints.selfAssignRiskItem(riskItemId, userId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['risks'] });
        },
    });

    const risks = risksData?.items || [];
    const totalRisks = risksData?.total || 0;

    // Get risk rating dimension from backend or fallback to extraction logic
    const getRiskRatingDimension = (risk: RiskStory): string | null => {
        // Use riskRatingDimension from backend if available (NEW field)
        if (risk.riskRatingDimension) {
            return risk.riskRatingDimension;
        }

        // Fallback: try to get from policy requirement snapshot active rule
        const activeRule = risk.policyRequirementSnapshot?.activeRule;
        if (activeRule) {
            if (activeRule.security_rating) return 'security_rating';
            if (activeRule.confidentiality_rating) return 'confidentiality_rating';
            if (activeRule.availability_rating) return 'availability_rating';
            if (activeRule.integrity_rating) return 'integrity_rating';
            if (activeRule.resilience_rating) return 'resilience_rating';
        }

        // Fallback: derive from fieldKey if it contains domain keywords
        const fieldKey = risk.fieldKey?.toLowerCase() || '';
        if (fieldKey.includes('encrypt') || fieldKey.includes('security') || fieldKey.includes('mfa') || fieldKey.includes('auth')) return 'security_rating';
        if (fieldKey.includes('confidential') || fieldKey.includes('privacy')) return 'confidentiality_rating';
        if (fieldKey.includes('integrity') || fieldKey.includes('backup')) return 'integrity_rating';
        if (fieldKey.includes('availability') || fieldKey.includes('uptime')) return 'availability_rating';
        if (fieldKey.includes('rto') || fieldKey.includes('resilience') || fieldKey.includes('recovery')) return 'resilience_rating';
        if (fieldKey.includes('criticality')) return 'app_criticality_assessment';

        return null;
    };

    // Get Guild/ARB from risk rating dimension
    const getGuildFromRisk = (risk: RiskStory): string | null => {
        const dimension = getRiskRatingDimension(risk);
        return dimension ? riskRatingDimensionToGuild[dimension] || null : null;
    };

    // Get unique SMEs for filter dropdown from current data
    const uniqueSmes = useMemo(() => {
        return Array.from(new Set(risks.map(r => r.assignedTo).filter(Boolean))).sort();
    }, [risks]);

    // Get unique risk rating dimensions available in current data
    const availableRiskRatingDimensions = useMemo(() => {
        const dimensions = risks
            .map(r => getRiskRatingDimension(r))
            .filter(Boolean) as string[];
        return Array.from(new Set(dimensions)).sort();
    }, [risks]);

    // Get unique field keys (requirements) available in current data
    const availableFieldKeys = useMemo(() => {
        const fieldKeys = risks
            .map(r => r.fieldKey)
            .filter(Boolean) as string[];
        return Array.from(new Set(fieldKeys)).sort();
    }, [risks]);

    // All available guilds (static list - always show all options)
    const allGuilds = ['security', 'data', 'operations', 'enterprise_architecture'];

    // Format dimension for display (removes _rating suffix and capitalizes)
    const formatDimension = (dimension: string): string => {
        const formatted: Record<string, string> = {
            'security_rating': 'Security',
            'confidentiality_rating': 'Confidentiality',
            'integrity_rating': 'Integrity',
            'availability_rating': 'Availability',
            'resilience_rating': 'Resilience',
            'app_criticality_assessment': 'App Criticality',
        };
        return formatted[dimension] || dimension.charAt(0).toUpperCase() + dimension.slice(1).replace(/_/g, ' ');
    };

    // Format fieldKey to human-readable format: abc_def_ghi → "Abc Def Ghi"
    const formatFieldKey = (fieldKey: string): string => {
        if (!fieldKey) return '—';
        return fieldKey
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    };

    // Format guild for display
    const formatGuild = (guild: string): string => {
        const formatted: Record<string, string> = {
            'security': 'Security',
            'data': 'Data',
            'operations': 'Operations',
            'enterprise_architecture': 'Enterprise Architecture',
        };
        return formatted[guild] || guild.charAt(0).toUpperCase() + guild.slice(1);
    };

    const handleCreateRisk = async () => {
        if (!newRisk.title || !newRisk.description || !newRisk.fieldKey) {
            return;
        }

        try {
            await createRiskMutation.mutateAsync(newRisk);
            setNewRisk({
                title: '',
                description: '',
                severity: 'medium',
                fieldKey: '',
                assignedTo: ''
            });
            setCreateDialogOpen(false);
        } catch (err) {
            console.error('Failed to create risk:', err);
        }
    };

    const handleRowClick = (risk: RiskStory) => {
        setSelectedRisk(risk);
        setDetailsModalOpen(true);
    };

    const handleApproveRisk = (risk: RiskStory) => {
        // TODO: Implement risk approval logic
        console.log('Approve risk:', risk.riskId);
        setDetailsModalOpen(false);
    };

    const handleRejectRisk = (risk: RiskStory) => {
        // TODO: Implement risk rejection logic
        console.log('Reject risk:', risk.riskId);
        setDetailsModalOpen(false);
    };

    const handleAttachEvidence = (risk: RiskStory) => {
        // TODO: Implement evidence attachment
        console.log('Attach evidence to risk:', risk.riskId);
    };

    // Helper function to extract and format the dynamic rating field
    const getRatingInfo = (activeRule: any) => {
        if (!activeRule) return null;
        
        const ratingFields = [
            'security_rating',
            'confidentiality_rating', 
            'availability_rating',
            'integrity_rating',
            'resilience_rating'
        ];
        
        for (const field of ratingFields) {
            if (activeRule[field]) {
                return {
                    type: field.replace('_rating', '').toUpperCase(),
                    value: activeRule[field]
                };
            }
        }
        
        return null;
    };

    // Helper function to calculate due date from openedAt + TTL
    const calculateDueDate = (risk: RiskStory): Date | null => {
        if (risk.dueDate) {
            return new Date(risk.dueDate);
        }
        
        if (!risk.openedAt || !risk.policyRequirementSnapshot?.activeRule?.ttl) {
            return null;
        }
        
        const openedDate = new Date(risk.openedAt);
        const activeRule = risk.policyRequirementSnapshot?.activeRule;
        if (!activeRule?.ttl) return null;
        const ttl = activeRule.ttl;
        
        // Parse TTL (e.g., "90d", "1y", "30d")
        const ttlMatch = ttl.match(/^(\d+)([dy])$/);
        if (!ttlMatch) return null;
        
        const [, amount, unit] = ttlMatch;
        const days = unit === 'y' ? parseInt(amount) * 365 : parseInt(amount);
        
        const dueDate = new Date(openedDate);
        dueDate.setDate(dueDate.getDate() + days);
        
        return dueDate;
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getRiskStatusColor = (status: RiskStatus) => {
        switch (status) {
            case 'OPEN': return 'error';
            case 'IN_PROGRESS': return 'warning';
            case 'RESOLVED': return 'success';
            case 'WAIVED': return 'default';
            case 'CLOSED': return 'success';
            // Legacy statuses for backward compatibility
            case 'open': return 'error';
            case 'under_review': return 'warning';
            case 'pending_evidence': return 'info';
            case 'resolved': return 'success';
            case 'accepted': return 'success';
            case 'rejected': return 'default';
            case 'PENDING_SME_REVIEW': return 'warning';
            case 'SME_APPROVED': return 'success';
            case 'SME_REJECTED': return 'error';
            default: return 'default';
        }
    };

    const formatStatusLabel = (status: RiskStatus) => {
        return status;
    };

    const getRiskSeverityColor = (severity: RiskSeverity) => {
        switch (severity) {
            case 'critical': return 'error';
            case 'high': return 'error';
            case 'medium': return 'warning';
            case 'low': return 'info';
            default: return 'default';
        }
    };

    const clearFilters = () => {
        setSearchTerm('');
        setStatusFilter('');
        setSeverityFilter('');
        setSmeFilter('');
        setRiskRatingDimensionFilter('');
        setFieldKeyFilter('');
        setGuildFilter('');
        setPage(0);
    };

    // Filter change handlers that reset pagination
    const handleSearchChange = (newSearchTerm: string) => {
        setSearchTerm(newSearchTerm);
        setPage(0);
    };

    const handleStatusFilterChange = (newStatus: string) => {
        setStatusFilter(newStatus);
        setPage(0);
    };

    const handleSeverityFilterChange = (newSeverity: string) => {
        setSeverityFilter(newSeverity);
        setPage(0);
    };

    const handleSmeFilterChange = (newSme: string) => {
        setSmeFilter(newSme);
        setPage(0);
    };

    const handleRiskRatingDimensionFilterChange = (newDimension: string) => {
        setRiskRatingDimensionFilter(newDimension);
        setPage(0);
    };

    const handleFieldKeyFilterChange = (newFieldKey: string) => {
        setFieldKeyFilter(newFieldKey);
        setPage(0);
    };

    const handleGuildFilterChange = (newGuild: string) => {
        setGuildFilter(newGuild);
        setPage(0);
    };

    return (
        <Stack spacing={3}>
            {/* Header */}
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="h6" fontWeight={700}>
                    Risk Items{appName && ` - ${appName}`}
                </Typography>
                {userRole === 'sme' && (
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => setCreateDialogOpen(true)}
                        disabled={isLoading}
                    >
                        Create Risk
                    </Button>
                )}
            </Stack>

            {/* Search and Filter Controls */}
            <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                <Stack direction="row" spacing={1.5} alignItems="center" sx={{ flexWrap: 'nowrap' }}>
                    <TextField
                        placeholder="Search risks..."
                        value={searchTerm}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        size="small"
                        sx={{ width: 180 }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            )
                        }}
                    />
                    <FormControl size="small" sx={{ width: 130 }}>
                        <InputLabel>Guild</InputLabel>
                        <Select
                            value={guildFilter}
                            label="Guild"
                            onChange={(e) => handleGuildFilterChange(e.target.value)}
                        >
                            <MenuItem value="">All</MenuItem>
                            {allGuilds.map((guild) => (
                                <MenuItem key={guild} value={guild}>
                                    {formatGuild(guild)}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl size="small" sx={{ width: 140 }}>
                        <InputLabel>Requirement</InputLabel>
                        <Select
                            value={fieldKeyFilter}
                            label="Requirement"
                            onChange={(e) => handleFieldKeyFilterChange(e.target.value)}
                            disabled={isLoading || availableFieldKeys.length === 0}
                        >
                            <MenuItem value="">All</MenuItem>
                            {availableFieldKeys.length === 0 ? (
                                <MenuItem disabled value="">No requirements available</MenuItem>
                            ) : (
                                availableFieldKeys.map((fieldKey) => (
                                    <MenuItem key={fieldKey} value={fieldKey}>
                                        {formatFieldKey(fieldKey)}
                                    </MenuItem>
                                ))
                            )}
                        </Select>
                    </FormControl>
                    <FormControl size="small" sx={{ width: 115 }}>
                        <InputLabel>Status</InputLabel>
                        <Select
                            value={statusFilter}
                            label="Status"
                            onChange={(e) => handleStatusFilterChange(e.target.value)}
                        >
                            <MenuItem value="">All</MenuItem>
                            <MenuItem value="OPEN">Open</MenuItem>
                            <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
                            <MenuItem value="RESOLVED">Resolved</MenuItem>
                            <MenuItem value="WAIVED">Waived</MenuItem>
                            <MenuItem value="CLOSED">Closed</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl size="small" sx={{ width: 110 }}>
                        <InputLabel>Severity</InputLabel>
                        <Select
                            value={severityFilter}
                            label="Severity"
                            onChange={(e) => handleSeverityFilterChange(e.target.value)}
                        >
                            <MenuItem value="">All</MenuItem>
                            <MenuItem value="critical">Critical</MenuItem>
                            <MenuItem value="high">High</MenuItem>
                            <MenuItem value="medium">Medium</MenuItem>
                            <MenuItem value="low">Low</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl size="small" sx={{ width: 130 }}>
                        <InputLabel>Assigned SME</InputLabel>
                        <Select
                            value={smeFilter}
                            label="Assigned SME"
                            onChange={(e) => handleSmeFilterChange(e.target.value)}
                        >
                            <MenuItem value="">All</MenuItem>
                            <MenuItem value="UNASSIGNED">Unassigned</MenuItem>
                            {uniqueSmes.map((sme) => (
                                <MenuItem key={sme} value={sme}>
                                    {sme}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={clearFilters}
                        disabled={!searchTerm && !statusFilter && !severityFilter && !smeFilter && !riskRatingDimensionFilter && !fieldKeyFilter && !guildFilter}
                        sx={{ width: 85, whiteSpace: 'nowrap' }}
                    >
                        Clear
                    </Button>
                </Stack>
            </Paper>

            {/* Error Alert */}
            {(error || createRiskMutation.error) && (
                <Alert severity="error">
                    {error ? String(error.message || error) : String(createRiskMutation.error)}
                </Alert>
            )}

            {/* Simplified Risks Table */}
            {!isLoading && risks.length === 0 ? (
                <Paper variant="outlined" sx={{ p: 6, textAlign: 'center', borderRadius: 3 }}>
                    <WarningIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 3 }} />
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                        No Risk Items
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 400, mx: 'auto' }}>
                        No security or compliance risks have been identified for this application yet.
                    </Typography>
                    {userRole === 'sme' && (
                        <Button
                            variant="contained"
                            size="large"
                            startIcon={<AddIcon />}
                            onClick={() => setCreateDialogOpen(true)}
                        >
                            Create First Risk
                        </Button>
                    )}
                </Paper>
            ) : (
                <Paper variant="outlined" sx={{ borderRadius: 3 }}>
                    <TableContainer>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ minWidth: 250 }}>Risk Title</TableCell>
                                    <TableCell sx={{ minWidth: 100 }}>Guild</TableCell>
                                    <TableCell sx={{ minWidth: 150 }}>Requirement</TableCell>
                                    <TableCell sx={{ minWidth: 100 }}>Severity</TableCell>
                                    <TableCell sx={{ minWidth: 120 }}>Status</TableCell>
                                    <TableCell sx={{ minWidth: 120 }}>Assigned SME</TableCell>
                                    <TableCell sx={{ minWidth: 100 }}>Due Date</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {isLoading ? (
                                    // Loading skeleton rows
                                    [...Array(3)].map((_, index) => (
                                        <TableRow key={index}>
                                            <TableCell>Loading...</TableCell>
                                            <TableCell>—</TableCell>
                                            <TableCell>—</TableCell>
                                            <TableCell>—</TableCell>
                                            <TableCell>—</TableCell>
                                            <TableCell>—</TableCell>
                                            <TableCell>—</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    risks.map((risk) => (
                                        <TableRow 
                                            key={risk.riskId} 
                                            hover 
                                            onClick={() => handleRowClick(risk)}
                                            sx={{ 
                                                cursor: 'pointer',
                                                '&:hover': {
                                                    backgroundColor: 'action.hover'
                                                }
                                            }}
                                        >
                                            <TableCell>
                                                <Typography variant="body2" fontWeight={600}>
                                                    {risk.title}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                {(() => {
                                                    const guild = getGuildFromRisk(risk);
                                                    if (!guild) {
                                                        return (
                                                            <Typography variant="body2" color="text.secondary">
                                                                —
                                                            </Typography>
                                                        );
                                                    }
                                                    return (
                                                        <Chip
                                                            size="small"
                                                            variant="outlined"
                                                            label={formatGuild(guild)}
                                                            color="primary"
                                                        />
                                                    );
                                                })()}
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="body2" color={risk.fieldKey ? 'text.primary' : 'text.secondary'}>
                                                    {formatFieldKey(risk.fieldKey || '')}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    size="small"
                                                    color={getRiskSeverityColor(risk.severity)}
                                                    variant="outlined"
                                                    label={risk.severity.toUpperCase()}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    size="small"
                                                    color={getRiskStatusColor(risk.status)}
                                                    variant="outlined"
                                                    label={formatStatusLabel(risk.status)}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                {risk.assignedTo ? (
                                                    <Typography variant="body2">
                                                        {risk.assignedTo}
                                                    </Typography>
                                                ) : userRole === 'sme' ? (
                                                    <Link
                                                        component="button"
                                                        variant="body2"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            // Handle both riskItemId (new) and riskId (legacy) for backward compatibility
                                                            const riskId = risk.riskItemId || (risk as any).riskId;
                                                            if (currentUserId && riskId) {
                                                                selfAssignMutation.mutate({
                                                                    riskItemId: riskId,
                                                                    userId: currentUserId
                                                                });
                                                            }
                                                        }}
                                                        sx={{ cursor: 'pointer' }}
                                                        disabled={selfAssignMutation.isPending}
                                                    >
                                                        {selfAssignMutation.isPending ? 'assigning...' : 'assign to me'}
                                                    </Link>
                                                ) : (
                                                    <Typography variant="body2" color="text.secondary">
                                                        Unassigned
                                                    </Typography>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {(() => {
                                                    const calculatedDueDate = calculateDueDate(risk);
                                                    const isOverdue = calculatedDueDate && calculatedDueDate < new Date();
                                                    
                                                    return (
                                                        <Typography variant="body2" color={isOverdue ? 'error' : 'text.primary'}>
                                                            {calculatedDueDate ? formatDate(calculatedDueDate.toISOString()) : '—'}
                                                        </Typography>
                                                    );
                                                })()}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        component="div"
                        count={totalRisks}
                        page={page}
                        onPageChange={(event, newPage) => setPage(newPage)}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={(event) => {
                            setRowsPerPage(parseInt(event.target.value, 10));
                            setPage(0);
                        }}
                        rowsPerPageOptions={[5, 10, 25, 50]}
                    />
                </Paper>
            )}

            {/* Risk Item Details Modals - Conditional based on user role */}
            {userRole === 'sme' ? (
                <SmeRiskItemModal
                    open={detailsModalOpen}
                    onClose={() => setDetailsModalOpen(false)}
                    risk={selectedRisk}
                    smeId={currentUserId || 'unknown_sme'}
                />
            ) : (
                <PoRiskItemModal
                    open={detailsModalOpen}
                    onClose={() => setDetailsModalOpen(false)}
                    risk={selectedRisk}
                    appId={appId}
                    onAttachEvidence={handleAttachEvidence}
                />
            )}

            {/* Create Risk Dialog */}
            <Dialog open={createDialogOpen} onClose={() => setCreateDialogOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Create New Risk Item</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} sx={{ mt: 1 }}>
                        <TextField
                            label="Risk Title"
                            value={newRisk.title}
                            onChange={(e) => setNewRisk({ ...newRisk, title: e.target.value })}
                            placeholder="e.g., Encryption at Rest Not Implemented"
                            fullWidth
                            required
                        />
                        
                        <TextField
                            label="Description"
                            value={newRisk.description}
                            onChange={(e) => setNewRisk({ ...newRisk, description: e.target.value })}
                            placeholder="Describe the risk and its potential impact..."
                            multiline
                            rows={3}
                            fullWidth
                            required
                        />

                        <Stack direction="row" spacing={2}>
                            <FormControl fullWidth>
                                <InputLabel>Severity</InputLabel>
                                <Select
                                    value={newRisk.severity}
                                    label="Severity"
                                    onChange={(e) => setNewRisk({ ...newRisk, severity: e.target.value as RiskSeverity })}
                                >
                                    <MenuItem value="low">Low</MenuItem>
                                    <MenuItem value="medium">Medium</MenuItem>
                                    <MenuItem value="high">High</MenuItem>
                                    <MenuItem value="critical">Critical</MenuItem>
                                </Select>
                            </FormControl>

                            <TextField
                                label="Field Key"
                                value={newRisk.fieldKey}
                                onChange={(e) => setNewRisk({ ...newRisk, fieldKey: e.target.value })}
                                placeholder="e.g., encryption_at_rest"
                                fullWidth
                                required
                            />
                        </Stack>

                        <TextField
                            label="Assigned SME"
                            value={newRisk.assignedTo}
                            onChange={(e) => setNewRisk({ ...newRisk, assignedTo: e.target.value })}
                            placeholder="e.g., security_sme_001"
                            fullWidth
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        setCreateDialogOpen(false);
                        setNewRisk({
                            title: '',
                            description: '',
                            severity: 'medium',
                            fieldKey: '',
                            assignedTo: ''
                        });
                    }}>
                        Cancel
                    </Button>
                    <Button 
                        variant="contained" 
                        onClick={handleCreateRisk}
                        disabled={!newRisk.title || !newRisk.description || !newRisk.fieldKey || createRiskMutation.isPending}
                    >
                        {createRiskMutation.isPending ? <CircularProgress size={20} /> : 'Create Risk'}
                    </Button>
                </DialogActions>
            </Dialog>

        </Stack>
    );
}