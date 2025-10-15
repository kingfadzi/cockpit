import React, { useState, useEffect, useMemo } from 'react';
import {
    Stack,
    Typography,
    Paper,
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
    TextField,
    Button,
    InputAdornment,
    ListSubheader,
} from '@mui/material';
import {
    Warning as WarningIcon,
    Search as SearchIcon,
} from '@mui/icons-material';
import { useSearchRiskItems } from '../../api/hooks';
import type { RiskItemStatus, RiskSeverity, RiskItemSearchParams } from '../../api/types';
import { getStatusMuiColor, STATUS_FILTER_OPTIONS } from '../sme/config/riskStatusConfig';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function PortfolioRisksPage() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    // Initialize filters from URL query parameters
    const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
    const [statusFilter, setStatusFilter] = useState(searchParams.get('status') || '');
    const [severityFilter, setSeverityFilter] = useState(searchParams.get('severity') || '');
    const [smeFilter, setSmeFilter] = useState(searchParams.get('assignedTo') || '');
    const [guildFilter, setGuildFilter] = useState(searchParams.get('arb') || '');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(20);

    // Build search params for API
    const apiSearchParams = useMemo((): RiskItemSearchParams => {
        const params: RiskItemSearchParams = {
            page,
            size: rowsPerPage,
        };

        if (searchTerm) params.search = searchTerm;
        if (statusFilter) params.status = statusFilter;
        if (severityFilter) params.severity = severityFilter;
        if (smeFilter) params.assignedTo = smeFilter === 'UNASSIGNED' ? '' : smeFilter;
        if (guildFilter) params.arb = guildFilter;

        return params;
    }, [searchTerm, statusFilter, severityFilter, smeFilter, guildFilter, page, rowsPerPage]);

    // Fetch risks
    const { data: risksData, isLoading, error } = useSearchRiskItems(apiSearchParams);
    const risks = risksData?.items || [];
    const totalRisks = risksData?.totalElements || 0;

    // Get unique SMEs from current results
    const uniqueSmes = useMemo(() => {
        return Array.from(new Set(risks.map(r => r.assignedTo).filter(Boolean))).sort();
    }, [risks]);

    // All available guilds (static list)
    const allGuilds = ['security', 'data', 'operations', 'enterprise_architecture'];

    // Format functions
    const formatGuild = (guild: string): string => {
        const formatted: Record<string, string> = {
            'security': 'Security',
            'data': 'Data',
            'operations': 'Operations',
            'enterprise_architecture': 'Enterprise Architecture',
        };
        return formatted[guild] || guild.charAt(0).toUpperCase() + guild.slice(1);
    };

    const formatFieldKey = (fieldKey: string): string => {
        if (!fieldKey) return '—';
        return fieldKey
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    };

    const formatStatusLabel = (status: RiskItemStatus) => {
        return status.replace(/_/g, ' ');
    };

    const getRiskSeverityColor = (severity: RiskSeverity): 'error' | 'warning' | 'info' | 'default' => {
        switch (severity) {
            case 'critical': return 'error';
            case 'high': return 'error';
            case 'medium': return 'warning';
            case 'low': return 'info';
            default: return 'default';
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    // Calculate due date
    const calculateDueDate = (risk: any): Date | null => {
        if (risk.dueDate) {
            return new Date(risk.dueDate);
        }
        return null;
    };

    // Update URL when filters change
    useEffect(() => {
        const params = new URLSearchParams();
        if (searchTerm) params.set('search', searchTerm);
        if (statusFilter) params.set('status', statusFilter);
        if (severityFilter) params.set('severity', severityFilter);
        if (smeFilter) params.set('assignedTo', smeFilter);
        if (guildFilter) params.set('arb', guildFilter);

        setSearchParams(params, { replace: true });
    }, [searchTerm, statusFilter, severityFilter, smeFilter, guildFilter, setSearchParams]);

    const clearFilters = () => {
        setSearchTerm('');
        setStatusFilter('');
        setSeverityFilter('');
        setSmeFilter('');
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

    const handleGuildFilterChange = (newGuild: string) => {
        setGuildFilter(newGuild);
        setPage(0);
    };

    const handleRowClick = (risk: any) => {
        // Navigate to app profile with risks tab open
        navigate(`/po/apps/${risk.appId}?tab=profile&subtab=risks`);
    };

    return (
        <Stack spacing={3}>
            {/* Header */}
            <Box>
                <Typography variant="h4" fontWeight={700} gutterBottom>
                    Portfolio Risk Items
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    View and manage all risk items across your application portfolio
                </Typography>
            </Box>

            {/* Search and Filter Controls */}
            <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                <Stack direction="row" spacing={1.5} alignItems="center" sx={{ flexWrap: 'wrap' }}>
                    <TextField
                        placeholder="Search risks..."
                        value={searchTerm}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        size="small"
                        sx={{ width: 200 }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            )
                        }}
                    />
                    <FormControl size="small" sx={{ width: 145 }}>
                        <InputLabel>Status</InputLabel>
                        <Select
                            value={statusFilter}
                            label="Status"
                            onChange={(e) => handleStatusFilterChange(e.target.value)}
                        >
                            <MenuItem value="">All Statuses</MenuItem>
                            <ListSubheader sx={{ fontSize: '0.75rem', fontWeight: 600, color: 'warning.main' }}>
                                Active
                            </ListSubheader>
                            {STATUS_FILTER_OPTIONS.active.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                            <ListSubheader sx={{ fontSize: '0.75rem', fontWeight: 600, color: 'success.main' }}>
                                Closed
                            </ListSubheader>
                            {STATUS_FILTER_OPTIONS.closed.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
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
                    <FormControl size="small" sx={{ width: 150 }}>
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
                    <FormControl size="small" sx={{ width: 150 }}>
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
                        disabled={!searchTerm && !statusFilter && !severityFilter && !smeFilter && !guildFilter}
                        sx={{ width: 85, whiteSpace: 'nowrap' }}
                    >
                        Clear
                    </Button>
                </Stack>
            </Paper>

            {/* Error Alert */}
            {error && (
                <Alert severity="error">
                    {String(error)}
                </Alert>
            )}

            {/* Risks Table */}
            {!isLoading && risks.length === 0 ? (
                <Paper variant="outlined" sx={{ p: 6, textAlign: 'center', borderRadius: 3 }}>
                    <WarningIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 3 }} />
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                        No Risk Items Found
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 400, mx: 'auto' }}>
                        {(searchTerm || statusFilter || severityFilter || smeFilter || guildFilter)
                            ? 'No risks match your current filters. Try adjusting your search criteria.'
                            : 'No risks have been identified in your portfolio yet.'}
                    </Typography>
                </Paper>
            ) : (
                <Paper variant="outlined" sx={{ borderRadius: 3 }}>
                    <TableContainer>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ minWidth: 200 }}>Application</TableCell>
                                    <TableCell sx={{ minWidth: 250 }}>Risk Title</TableCell>
                                    <TableCell sx={{ minWidth: 100 }}>Guild</TableCell>
                                    <TableCell sx={{ minWidth: 150 }}>Requirement</TableCell>
                                    <TableCell sx={{ minWidth: 100 }}>Severity</TableCell>
                                    <TableCell sx={{ minWidth: 140 }}>Status</TableCell>
                                    <TableCell sx={{ minWidth: 120 }}>Assigned SME</TableCell>
                                    <TableCell sx={{ minWidth: 100 }}>Due Date</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {isLoading ? (
                                    // Loading skeleton rows
                                    [...Array(5)].map((_, index) => (
                                        <TableRow key={index}>
                                            <TableCell>Loading...</TableCell>
                                            <TableCell>—</TableCell>
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
                                            key={risk.riskItemId}
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
                                                    {risk.appName || risk.appId}
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    {risk.appId}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="body2" fontWeight={600}>
                                                    {risk.title}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                {risk.arb ? (
                                                    <Chip
                                                        size="small"
                                                        variant="outlined"
                                                        label={formatGuild(risk.arb)}
                                                        color="primary"
                                                    />
                                                ) : (
                                                    <Typography variant="body2" color="text.secondary">
                                                        —
                                                    </Typography>
                                                )}
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
                                                    color={getStatusMuiColor(risk.status as RiskItemStatus)}
                                                    variant="outlined"
                                                    label={formatStatusLabel(risk.status as RiskItemStatus)}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                {risk.assignedTo ? (
                                                    <Typography variant="body2">
                                                        {risk.assignedTo}
                                                    </Typography>
                                                ) : (
                                                    <Typography variant="body2" color="text.secondary">
                                                        Unassigned
                                                    </Typography>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {(() => {
                                                    const dueDate = calculateDueDate(risk);
                                                    const isOverdue = dueDate && dueDate < new Date();

                                                    return (
                                                        <Typography variant="body2" color={isOverdue ? 'error' : 'text.primary'}>
                                                            {dueDate ? formatDate(dueDate.toISOString()) : '—'}
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
                        rowsPerPageOptions={[10, 20, 50, 100]}
                    />
                </Paper>
            )}
        </Stack>
    );
}
