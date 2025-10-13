import React, { useState, useMemo } from 'react';
import {
    Stack,
    Typography,
    Card,
    CardContent,
    Box,
    Chip,
    Alert,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    InputAdornment,
    Pagination,
    CircularProgress,
    LinearProgress,
} from '@mui/material';
import {
    List as ListIcon,
    Search as SearchIcon,
} from '@mui/icons-material';
import SectionHeader from '../../../components/SectionHeader';
import { useDomainRisksForArb } from '../../../api/hooks';
import type { DomainRiskResponse } from '../../../api/types';

interface DomainRiskListViewProps {
    arbName: string;
    onSelectDomainRisk?: (domainRiskId: string) => void;
}

export default function DomainRiskListView({ arbName, onSelectDomainRisk }: DomainRiskListViewProps) {
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    // Fetch domain risks
    const { data: domainRisks = [], isLoading, isError, error } = useDomainRisksForArb(
        arbName,
        statusFilter === 'all' ? undefined : statusFilter
    );

    // Filter and search logic
    const filteredDomainRisks = useMemo(() => {
        let filtered = domainRisks;

        // Apply search filter
        if (search) {
            const searchLower = search.toLowerCase();
            filtered = filtered.filter(item =>
                item.domain?.toLowerCase().includes(searchLower) ||
                item.appId?.toLowerCase().includes(searchLower) ||
                item.status?.toLowerCase().includes(searchLower)
            );
        }

        return filtered;
    }, [domainRisks, search]);

    // Pagination
    const totalPages = Math.ceil(filteredDomainRisks.length / pageSize);
    const paginatedDomainRisks = useMemo(() => {
        const startIndex = (currentPage - 1) * pageSize;
        return filteredDomainRisks.slice(startIndex, startIndex + pageSize);
    }, [filteredDomainRisks, currentPage, pageSize]);

    // Helper functions
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'OPEN': return 'error';
            case 'IN_PROGRESS': return 'warning';
            case 'RESOLVED': return 'success';
            case 'ACCEPTED': return 'info';
            default: return 'default';
        }
    };

    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };

    const handleRowClick = (domainRisk: DomainRiskResponse) => {
        if (onSelectDomainRisk) {
            onSelectDomainRisk(domainRisk.domainRiskId);
        }
    };

    // Status filter counts
    const statusCounts = useMemo(() => {
        return {
            all: domainRisks.length,
            OPEN: domainRisks.filter(item => item.status === 'OPEN').length,
            IN_PROGRESS: domainRisks.filter(item => item.status === 'IN_PROGRESS').length,
            RESOLVED: domainRisks.filter(item => item.status === 'RESOLVED').length,
            ACCEPTED: domainRisks.filter(item => item.status === 'ACCEPTED').length,
        };
    }, [domainRisks]);

    return (
        <Stack spacing={3}>
            <SectionHeader
                title="Domain Risks"
                subtitle="View and manage domain-level risks for applications"
                icon={<ListIcon />}
            />

            <Card variant="outlined">
                {/* Filters and Search */}
                <Box sx={{ p: 2 }}>
                    <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                        <TextField
                            size="small"
                            placeholder="Search by domain, app, or status..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon fontSize="small" />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{ minWidth: 350 }}
                        />
                        <Stack direction="row" spacing={0.5}>
                            <Chip
                                size="small"
                                label={`All (${statusCounts.all})`}
                                color={statusFilter === 'all' ? 'primary' : 'default'}
                                variant={statusFilter === 'all' ? 'filled' : 'outlined'}
                                onClick={() => setStatusFilter('all')}
                                clickable
                            />
                            <Chip
                                size="small"
                                label={`Open (${statusCounts.OPEN})`}
                                color={statusFilter === 'OPEN' ? 'error' : 'default'}
                                variant={statusFilter === 'OPEN' ? 'filled' : 'outlined'}
                                onClick={() => setStatusFilter('OPEN')}
                                clickable
                            />
                            <Chip
                                size="small"
                                label={`In Progress (${statusCounts.IN_PROGRESS})`}
                                color={statusFilter === 'IN_PROGRESS' ? 'warning' : 'default'}
                                variant={statusFilter === 'IN_PROGRESS' ? 'filled' : 'outlined'}
                                onClick={() => setStatusFilter('IN_PROGRESS')}
                                clickable
                            />
                            <Chip
                                size="small"
                                label={`Resolved (${statusCounts.RESOLVED})`}
                                color={statusFilter === 'RESOLVED' ? 'success' : 'default'}
                                variant={statusFilter === 'RESOLVED' ? 'filled' : 'outlined'}
                                onClick={() => setStatusFilter('RESOLVED')}
                                clickable
                            />
                        </Stack>
                    </Stack>
                </Box>

                <CardContent sx={{ pt: 0 }}>
                    {/* Loading State */}
                    {isLoading && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                            <CircularProgress />
                        </Box>
                    )}

                    {/* Error State */}
                    {isError && (
                        <Alert severity="error">
                            Failed to load domain risks: {error?.message || 'Unknown error'}
                        </Alert>
                    )}

                    {/* Empty State */}
                    {!isLoading && !isError && filteredDomainRisks.length === 0 && (
                        <Alert severity="success">
                            {search || statusFilter !== 'all'
                                ? 'No domain risks match your filters.'
                                : 'No domain risks found.'}
                        </Alert>
                    )}

                    {/* Domain Risks Table */}
                    {!isLoading && !isError && filteredDomainRisks.length > 0 && (
                        <>
                            <TableContainer>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Application</TableCell>
                                            <TableCell>Domain</TableCell>
                                            <TableCell>Total Items</TableCell>
                                            <TableCell>Open Items</TableCell>
                                            <TableCell>Priority Score</TableCell>
                                            <TableCell>Status</TableCell>
                                            <TableCell>Last Updated</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {paginatedDomainRisks.map((item) => (
                                            <TableRow
                                                key={item.domainRiskId}
                                                hover
                                                sx={{
                                                    cursor: 'pointer',
                                                    '&:hover': {
                                                        bgcolor: 'action.hover'
                                                    }
                                                }}
                                                onClick={() => handleRowClick(item)}
                                            >
                                                <TableCell>
                                                    <Typography variant="body2" fontWeight={600}>
                                                        {item.appId}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Chip
                                                        size="small"
                                                        label={item.domain}
                                                        color="primary"
                                                        variant="outlined"
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="body2">
                                                        {item.totalItems}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Chip
                                                        size="small"
                                                        label={item.openItems}
                                                        color={item.openItems > 0 ? 'warning' : 'default'}
                                                        variant="filled"
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 120 }}>
                                                        <LinearProgress
                                                            variant="determinate"
                                                            value={Math.min((item.priorityScore / 100) * 100, 100)}
                                                            sx={{ flex: 1, height: 6, borderRadius: 3 }}
                                                            color={
                                                                item.priorityScore >= 80 ? 'error' :
                                                                item.priorityScore >= 50 ? 'warning' : 'success'
                                                            }
                                                        />
                                                        <Typography variant="caption" fontWeight={600}>
                                                            {item.priorityScore.toFixed(1)}
                                                        </Typography>
                                                    </Box>
                                                </TableCell>
                                                <TableCell>
                                                    <Chip
                                                        size="small"
                                                        label={item.status.replace('_', ' ')}
                                                        color={getStatusColor(item.status)}
                                                        variant="outlined"
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {item.lastUpdatedAt
                                                            ? new Date(item.lastUpdatedAt).toLocaleDateString()
                                                            : '—'}
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <Box sx={{ display: 'flex', justifyContent: 'center', pt: 2 }}>
                                    <Pagination
                                        count={totalPages}
                                        page={currentPage}
                                        onChange={handlePageChange}
                                        size="small"
                                        showFirstButton
                                        showLastButton
                                    />
                                </Box>
                            )}
                        </>
                    )}
                </CardContent>
            </Card>
        </Stack>
    );
}
