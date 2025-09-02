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

interface RisksTabProps {
    appId: string;
    userRole?: 'po' | 'sme'; // Determines which actions are available
}

interface CreateRiskForm {
    title: string;
    description: string;
    severity: RiskSeverity;
    fieldKey: string;
    assignedSme: string;
}

export default function RisksTab({ appId, userRole = 'po' }: RisksTabProps) {
    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const [detailsModalOpen, setDetailsModalOpen] = useState(false);
    const [selectedRisk, setSelectedRisk] = useState<RiskStory | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('');
    const [severityFilter, setSeverityFilter] = useState<string>('');
    const [smeFilter, setSmeFilter] = useState<string>('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [newRisk, setNewRisk] = useState<CreateRiskForm>({
        title: '',
        description: '',
        severity: 'medium',
        fieldKey: '',
        assignedSme: ''
    });

    // Build filters object
    const filters = {
        ...(searchTerm && { search: searchTerm }),
        ...(statusFilter && { status: statusFilter }),
        ...(severityFilter && { severity: severityFilter }),
        ...(smeFilter && { assignedSme: smeFilter === 'UNASSIGNED' ? '' : smeFilter })
    };

    // API hooks
    const { data: risksData, isLoading, error } = useAppRisks(appId, page + 1, rowsPerPage, Object.keys(filters).length > 0 ? filters : undefined);
    const createRiskMutation = useCreateRisk(appId, newRisk.fieldKey);
    
    const risks = risksData?.items || [];
    const totalRisks = risksData?.total || 0;

    // Get unique SMEs for filter dropdown from current page results
    const uniqueSmes = useMemo(() => {
        return Array.from(new Set(risks.map(r => r.assignedSme).filter(Boolean))).sort();
    }, [risks]);

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
                assignedSme: ''
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

    return (
        <Stack spacing={3}>
            {/* Header */}
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Stack>
                    <Typography variant="h6" fontWeight={700}>
                        Risk Stories
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Security and compliance risks identified for {appId}
                    </Typography>
                </Stack>
                {userRole === 'po' && (
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
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={4}>
                        <TextField
                            placeholder="Search risks..."
                            value={searchTerm}
                            onChange={(e) => handleSearchChange(e.target.value)}
                            size="small"
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Grid>
                    <Grid item xs={6} sm={2}>
                        <FormControl size="small" fullWidth>
                            <InputLabel>Status</InputLabel>
                            <Select
                                value={statusFilter}
                                label="Status"
                                onChange={(e) => handleStatusFilterChange(e.target.value)}
                            >
                                <MenuItem value="">All</MenuItem>
                                <MenuItem value="open">Open</MenuItem>
                                <MenuItem value="under_review">Under Review</MenuItem>
                                <MenuItem value="pending_evidence">Pending Evidence</MenuItem>
                                <MenuItem value="PENDING_SME_REVIEW">Pending SME Review</MenuItem>
                                <MenuItem value="resolved">Resolved</MenuItem>
                                <MenuItem value="accepted">Accepted</MenuItem>
                                <MenuItem value="SME_APPROVED">SME Approved</MenuItem>
                                <MenuItem value="rejected">Rejected</MenuItem>
                                <MenuItem value="SME_REJECTED">SME Rejected</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} sm={2}>
                        <FormControl size="small" fullWidth>
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
                    </Grid>
                    <Grid item xs={6} sm={2}>
                        <FormControl size="small" fullWidth>
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
                    </Grid>
                    <Grid item xs={6} sm={2}>
                        <Button
                            variant="outlined"
                            size="small"
                            onClick={clearFilters}
                            disabled={!searchTerm && !statusFilter && !severityFilter && !smeFilter}
                            fullWidth
                        >
                            Clear
                        </Button>
                    </Grid>
                </Grid>
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
                        No Risk Stories
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 400, mx: 'auto' }}>
                        No security or compliance risks have been identified for this application yet.
                    </Typography>
                    {userRole === 'po' && (
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
                                                <Stack>
                                                    <Typography variant="body2" fontWeight={600}>
                                                        {risk.title}
                                                    </Typography>
                                                    <Typography variant="caption" color="text.secondary" sx={{ 
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 2,
                                                        WebkitBoxOrient: 'vertical',
                                                        overflow: 'hidden',
                                                        maxWidth: 400
                                                    }}>
                                                        {risk.description}
                                                    </Typography>
                                                </Stack>
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
                                                <Typography variant="body2">
                                                    {risk.assignedSme || 'Unassigned'}
                                                </Typography>
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

            {/* Enhanced Risk Details Modal */}
            <Dialog open={detailsModalOpen} onClose={() => setDetailsModalOpen(false)} maxWidth="lg" fullWidth>
                <DialogTitle>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Stack>
                            <Typography variant="h6">
                                Risk Story Details
                            </Typography>
                            {selectedRisk && (
                                <Typography variant="caption" color="text.secondary">
                                    Risk ID: {selectedRisk.riskId}
                                </Typography>
                            )}
                        </Stack>
                        <IconButton onClick={() => setDetailsModalOpen(false)} size="small">
                            <CloseIcon />
                        </IconButton>
                    </Stack>
                </DialogTitle>
                <DialogContent>
                    {selectedRisk && (
                        <Grid container spacing={2}>
                            {/* Left Column - Main Content */}
                            <Grid item xs={12} md={8}>
                                <Stack spacing={2}>
                                    {/* Risk Header */}
                                    <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                                        <Stack spacing={1.5}>
                                            <Typography variant="h6">
                                                {selectedRisk.title}
                                            </Typography>
                                            <Stack direction="row" spacing={1} flexWrap="wrap">
                                                <Chip
                                                    size="small"
                                                    color={getRiskSeverityColor(selectedRisk.severity)}
                                                    label={`${selectedRisk.severity.toUpperCase()} SEVERITY`}
                                                />
                                                <Chip
                                                    size="small"
                                                    color={getRiskStatusColor(selectedRisk.status)}
                                                    label={formatStatusLabel(selectedRisk.status)}
                                                />
                                                <Chip
                                                    size="small"
                                                    variant="outlined"
                                                    color={selectedRisk.creationType === 'SYSTEM_AUTO_CREATION' ? 'info' : 'default'}
                                                    label={selectedRisk.creationType === 'SYSTEM_AUTO_CREATION' ? 'AUTO-CREATED' : 'MANUAL'}
                                                />
                                            </Stack>
                                        </Stack>
                                    </Paper>

                                    {/* Risk Assessment - If/Then Logic */}
                                    <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                                        <Typography variant="h6" sx={{ mb: 1.5 }}>
                                            Risk Assessment
                                        </Typography>
                                        <Stack spacing={1.5}>
                                            <Box>
                                                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.5 }}>
                                                    HYPOTHESIS
                                                </Typography>
                                                <Typography variant="body2">
                                                    {selectedRisk.hypothesis}
                                                </Typography>
                                            </Box>
                                            
                                            <Box sx={{ bgcolor: 'grey.50', p: 1.5, borderRadius: 1, border: '1px solid', borderColor: 'grey.200' }}>
                                                <Typography variant="subtitle2" color="warning.main" fontWeight={600} sx={{ mb: 0.5 }}>
                                                    RISK CONDITION
                                                </Typography>
                                                <Typography variant="body2" color="warning.dark">
                                                    {selectedRisk.condition}
                                                </Typography>
                                            </Box>

                                            <Box sx={{ bgcolor: 'error.50', p: 1.5, borderRadius: 1, border: '1px solid', borderColor: 'error.200' }}>
                                                <Typography variant="subtitle2" color="error.main" fontWeight={600} sx={{ mb: 0.5 }}>
                                                    POTENTIAL CONSEQUENCE
                                                </Typography>
                                                <Typography variant="body2" color="error.dark">
                                                    {selectedRisk.consequence}
                                                </Typography>
                                            </Box>
                                        </Stack>
                                    </Paper>

                                    {/* Policy Context */}
                                    {selectedRisk.policyRequirementSnapshot && (
                                        <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                                            <Typography variant="h6" sx={{ mb: 1.5 }}>
                                                Policy Context
                                            </Typography>
                                            <Stack spacing={1.5}>
                                                <Grid container spacing={1.5}>
                                                    <Grid item xs={6}>
                                                        <Typography variant="subtitle2" sx={{ mb: 0.5 }}>Field</Typography>
                                                        <Typography variant="body2">
                                                            {selectedRisk.policyRequirementSnapshot.fieldLabel}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Typography variant="subtitle2" sx={{ mb: 0.5 }}>Requirement</Typography>
                                                        <Typography variant="body2">
                                                            {selectedRisk.policyRequirementSnapshot?.activeRule?.label || selectedRisk.policyRequirementSnapshot?.activeRule?.value || '—'}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Typography variant="subtitle2" sx={{ mb: 0.5 }}>App Rating</Typography>
                                                        {(() => {
                                                            const ratingInfo = getRatingInfo(selectedRisk.policyRequirementSnapshot.activeRule);
                                                            return ratingInfo ? (
                                                                <Chip 
                                                                    size="small" 
                                                                    variant="outlined"
                                                                    label={`${ratingInfo.type}: ${ratingInfo.value}`}
                                                                />
                                                            ) : (
                                                                <Typography variant="body2">—</Typography>
                                                            );
                                                        })()}
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Typography variant="subtitle2" sx={{ mb: 0.5 }}>TTL</Typography>
                                                        <Typography variant="body2">
                                                            {selectedRisk.policyRequirementSnapshot.activeRule.ttl}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>

                                                {/* Compliance Frameworks */}
                                                {selectedRisk.policyRequirementSnapshot.complianceFrameworks.length > 0 && (
                                                    <Box>
                                                        <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                                                            Compliance Frameworks
                                                        </Typography>
                                                        <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
                                                            {selectedRisk.policyRequirementSnapshot.complianceFrameworks.map((framework, index) => (
                                                                <Tooltip 
                                                                    key={index}
                                                                    title={`Controls: ${framework.controls.join(', ')}`}
                                                                >
                                                                    <Chip
                                                                        size="small"
                                                                        variant="outlined"
                                                                        label={framework.framework}
                                                                        color="primary"
                                                                    />
                                                                </Tooltip>
                                                            ))}
                                                        </Stack>
                                                    </Box>
                                                )}
                                            </Stack>
                                        </Paper>
                                    )}

                                    {/* Evidence Section */}
                                    {selectedRisk.triggeringEvidenceId && (
                                        <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                                            <Typography variant="h6" sx={{ mb: 1 }}>
                                                Triggering Evidence
                                            </Typography>
                                            <Stack direction="row" alignItems="center" spacing={1.5}>
                                                <Chip 
                                                    size="small" 
                                                    icon={<ViewIcon />}
                                                    label={`Evidence ID: ${selectedRisk.triggeringEvidenceId}`}
                                                    variant="outlined"
                                                    clickable
                                                    onClick={() => console.log('View evidence:', selectedRisk.triggeringEvidenceId)}
                                                />
                                                <Typography variant="body2" color="text.secondary">
                                                    Click to view the evidence that triggered this risk
                                                </Typography>
                                            </Stack>
                                        </Paper>
                                    )}
                                </Stack>
                            </Grid>

                            {/* Right Column - Metadata & Actions */}
                            <Grid item xs={12} md={4}>
                                <Stack spacing={2}>
                                    {/* Assignment & Timeline */}
                                    <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                                        <Typography variant="h6" sx={{ mb: 1.5 }}>
                                            Assignment & Timeline
                                        </Typography>
                                        <Stack spacing={1.5}>
                                            <Box>
                                                <Typography variant="subtitle2" sx={{ mb: 0.5 }}>Assigned SME</Typography>
                                                <Typography variant="body2" fontWeight={600}>
                                                    {selectedRisk.assignedSme || 'Unassigned'}
                                                </Typography>
                                            </Box>
                                            
                                            <Box>
                                                <Typography variant="subtitle2" sx={{ mb: 0.5 }}>Raised By</Typography>
                                                <Typography variant="body2">
                                                    {selectedRisk.raisedBy}
                                                </Typography>
                                            </Box>

                                            <Box>
                                                <Typography variant="subtitle2" sx={{ mb: 0.5 }}>Opened</Typography>
                                                <Typography variant="body2">
                                                    {formatDate(selectedRisk.openedAt)}
                                                </Typography>
                                            </Box>

                                            {selectedRisk.assignedAt && (
                                                <Box>
                                                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>Assigned</Typography>
                                                    <Typography variant="body2">
                                                        {formatDate(selectedRisk.assignedAt)}
                                                    </Typography>
                                                </Box>
                                            )}

                                            {selectedRisk.lastReviewedAt && (
                                                <Box>
                                                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>Last Reviewed</Typography>
                                                    <Typography variant="body2">
                                                        {formatDate(selectedRisk.lastReviewedAt)}
                                                    </Typography>
                                                    <Typography variant="caption" color="text.secondary">
                                                        by {selectedRisk.lastReviewedBy}
                                                    </Typography>
                                                </Box>
                                            )}
                                        </Stack>
                                    </Paper>

                                    {/* Quick Actions */}
                                    <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                                        <Typography variant="h6" sx={{ mb: 1.5 }}>
                                            Actions
                                        </Typography>
                                        <Stack spacing={1}>
                                            {userRole === 'sme' && selectedRisk.status === 'PENDING_SME_REVIEW' && (
                                                <>
                                                    <Button
                                                        variant="contained"
                                                        color="success"
                                                        startIcon={<ApproveIcon />}
                                                        onClick={() => handleApproveRisk(selectedRisk)}
                                                        fullWidth
                                                    >
                                                        Approve Risk
                                                    </Button>
                                                    <Button
                                                        variant="contained"
                                                        color="error"
                                                        startIcon={<RejectIcon />}
                                                        onClick={() => handleRejectRisk(selectedRisk)}
                                                        fullWidth
                                                    >
                                                        Reject Risk
                                                    </Button>
                                                </>
                                            )}
                                            
                                            {userRole === 'po' && (selectedRisk.status === 'pending_evidence' || selectedRisk.status === 'open') && (
                                                <Button
                                                    variant="outlined"
                                                    startIcon={<AttachFileIcon />}
                                                    onClick={() => handleAttachEvidence(selectedRisk)}
                                                    fullWidth
                                                >
                                                    Attach Evidence
                                                </Button>
                                            )}

                                            {userRole === 'sme' && (
                                                <>
                                                    <Button
                                                        variant="outlined"
                                                        startIcon={<AssignIcon />}
                                                        onClick={() => console.log('Reassign risk:', selectedRisk.riskId)}
                                                        fullWidth
                                                    >
                                                        Reassign
                                                    </Button>
                                                    <Button
                                                        variant="outlined"
                                                        startIcon={<EditIcon />}
                                                        onClick={() => console.log('Edit risk:', selectedRisk.riskId)}
                                                        fullWidth
                                                    >
                                                        Edit Risk
                                                    </Button>
                                                </>
                                            )}
                                        </Stack>
                                    </Paper>

                                    {/* Technical Details */}
                                    <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                                        <Typography variant="h6" sx={{ mb: 1.5 }}>
                                            Technical Details
                                        </Typography>
                                        <Stack spacing={1}>
                                            <Box>
                                                <Typography variant="caption" color="text.secondary">Field Key</Typography>
                                                <Typography variant="body2">{selectedRisk.fieldKey || '—'}</Typography>
                                            </Box>
                                            <Box>
                                                <Typography variant="caption" color="text.secondary">Evidence Count</Typography>
                                                <Typography variant="body2">{selectedRisk.evidenceCount || 0} pieces</Typography>
                                            </Box>
                                            <Box>
                                                <Typography variant="caption" color="text.secondary">Created</Typography>
                                                <Typography variant="body2">{formatDate(selectedRisk.createdAt)}</Typography>
                                            </Box>
                                            <Box>
                                                <Typography variant="caption" color="text.secondary">Last Updated</Typography>
                                                <Typography variant="body2">{formatDate(selectedRisk.updatedAt)}</Typography>
                                            </Box>
                                        </Stack>
                                    </Paper>
                                </Stack>
                            </Grid>
                        </Grid>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDetailsModalOpen(false)}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Create Risk Dialog */}
            <Dialog open={createDialogOpen} onClose={() => setCreateDialogOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Create New Risk Story</DialogTitle>
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
                            value={newRisk.assignedSme}
                            onChange={(e) => setNewRisk({ ...newRisk, assignedSme: e.target.value })}
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
                            assignedSme: ''
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