import React, { useState, useMemo } from 'react';
import {
    Stack,
    Typography,
    Card,
    CardContent,
    Box,
    Chip,
    Button,
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
    IconButton,
    Tooltip,
} from '@mui/material';
import {
    CheckCircle as ApproveIcon,
    Cancel as RejectIcon,
    Search as SearchIcon,
    FilterList as FilterIcon,
    Visibility as ViewIcon,
} from '@mui/icons-material';
import SectionHeader from '../../../components/SectionHeader';
import { usePendingSmeEvidence } from '../../../api/hooks';
import type { PendingEvidenceItem } from '../../../api/types';
import EvidenceReviewModal from '../components/EvidenceReviewModal';

interface PendingEvidenceViewProps {
    smeEmail: string;
}

export default function PendingEvidenceView({ smeEmail }: PendingEvidenceViewProps) {
    // State management
    const [search, setSearch] = useState('');
    const [selectedEvidence, setSelectedEvidence] = useState<PendingEvidenceItem | null>(null);
    const [reviewModalOpen, setReviewModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [priorityFilter, setPriorityFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');
    const pageSize = 10;

    // Fetch pending evidence
    const { data: evidenceData = [], isLoading, isError, error } = usePendingSmeEvidence(smeEmail, currentPage - 1, pageSize);

    // Filter and search logic
    const filteredEvidence = useMemo(() => {
        let filtered = evidenceData;

        // Apply search filter
        if (search) {
            const searchLower = search.toLowerCase();
            filtered = filtered.filter(item =>
                item.appName?.toLowerCase().includes(searchLower) ||
                item.fieldLabel?.toLowerCase().includes(searchLower) ||
                item.fieldKey?.toLowerCase().includes(searchLower) ||
                item.evidenceType?.toLowerCase().includes(searchLower)
            );
        }

        // Apply priority filter
        if (priorityFilter !== 'all') {
            filtered = filtered.filter(item => {
                const priority = getPriorityLevel(item);
                return priority === priorityFilter;
            });
        }

        return filtered;
    }, [evidenceData, search, priorityFilter]);

    // Pagination
    const totalPages = Math.ceil(filteredEvidence.length / pageSize);
    const paginatedEvidence = useMemo(() => {
        const startIndex = (currentPage - 1) * pageSize;
        return filteredEvidence.slice(startIndex, startIndex + pageSize);
    }, [filteredEvidence, currentPage, pageSize]);

    // Helper functions
    const getPriorityLevel = (item: PendingEvidenceItem): 'high' | 'medium' | 'low' => {
        // Priority based on profile field criticality or other factors
        if (item.profileFieldCriticality === 'CRITICAL' || item.profileFieldCriticality === 'HIGH') {
            return 'high';
        }
        if (item.profileFieldCriticality === 'MEDIUM') {
            return 'medium';
        }
        return 'low';
    };

    const getPriorityColor = (priority: 'high' | 'medium' | 'low') => {
        switch (priority) {
            case 'high': return 'error';
            case 'medium': return 'warning';
            case 'low': return 'default';
        }
    };

    const getEvidenceTypeColor = (type?: string) => {
        if (!type) return 'default';
        const lowerType = type.toLowerCase();
        if (lowerType.includes('document') || lowerType.includes('file')) return 'primary';
        if (lowerType.includes('url') || lowerType.includes('link')) return 'info';
        if (lowerType.includes('certificate') || lowerType.includes('attestation')) return 'success';
        return 'default';
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return '—';
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays}d ago`;
        return date.toLocaleDateString();
    };

    const handleRowClick = (item: PendingEvidenceItem) => {
        setSelectedEvidence(item);
        setReviewModalOpen(true);
    };

    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };

    // Priority filter counts
    const priorityCounts = useMemo(() => {
        return {
            all: evidenceData.length,
            high: evidenceData.filter(item => getPriorityLevel(item) === 'high').length,
            medium: evidenceData.filter(item => getPriorityLevel(item) === 'medium').length,
            low: evidenceData.filter(item => getPriorityLevel(item) === 'low').length,
        };
    }, [evidenceData]);

    return (
        <Stack spacing={3}>
            <SectionHeader
                title="Pending Evidence Review"
                subtitle={`Review and approve evidence submissions requiring SME validation`}
                icon={<ViewIcon />}
            />

            <Card variant="outlined">
                {/* Filters and Search */}
                <Box sx={{ p: 2 }}>
                    <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                        <TextField
                            size="small"
                            placeholder="Search by app, field, or evidence type..."
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
                                label={`All (${priorityCounts.all})`}
                                color={priorityFilter === 'all' ? 'primary' : 'default'}
                                variant={priorityFilter === 'all' ? 'filled' : 'outlined'}
                                onClick={() => setPriorityFilter('all')}
                                clickable
                            />
                            <Chip
                                size="small"
                                label={`High (${priorityCounts.high})`}
                                color={priorityFilter === 'high' ? 'error' : 'default'}
                                variant={priorityFilter === 'high' ? 'filled' : 'outlined'}
                                onClick={() => setPriorityFilter('high')}
                                clickable
                            />
                            <Chip
                                size="small"
                                label={`Medium (${priorityCounts.medium})`}
                                color={priorityFilter === 'medium' ? 'warning' : 'default'}
                                variant={priorityFilter === 'medium' ? 'filled' : 'outlined'}
                                onClick={() => setPriorityFilter('medium')}
                                clickable
                            />
                            <Chip
                                size="small"
                                label={`Low (${priorityCounts.low})`}
                                color={priorityFilter === 'low' ? 'default' : 'default'}
                                variant={priorityFilter === 'low' ? 'filled' : 'outlined'}
                                onClick={() => setPriorityFilter('low')}
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
                            Failed to load pending evidence: {error?.message || 'Unknown error'}
                        </Alert>
                    )}

                    {/* Empty State */}
                    {!isLoading && !isError && filteredEvidence.length === 0 && (
                        <Alert severity="success">
                            {search || priorityFilter !== 'all'
                                ? 'No evidence matches your filters.'
                                : 'No pending evidence submissions to review.'}
                        </Alert>
                    )}

                    {/* Evidence Table */}
                    {!isLoading && !isError && filteredEvidence.length > 0 && (
                        <>
                            <TableContainer>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Application</TableCell>
                                            <TableCell>Field / Requirement</TableCell>
                                            <TableCell>Evidence Type</TableCell>
                                            <TableCell>Submitted By</TableCell>
                                            <TableCell>Date</TableCell>
                                            <TableCell>Priority</TableCell>
                                            <TableCell>Status</TableCell>
                                            <TableCell align="right">Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {paginatedEvidence.map((item) => {
                                            const priority = getPriorityLevel(item);
                                            return (
                                                <TableRow
                                                    key={`${item.evidenceId}-${item.profileFieldId}`}
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
                                                            {item.appName || item.appId}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Stack spacing={0.5}>
                                                            <Typography variant="body2">
                                                                {item.fieldLabel}
                                                            </Typography>
                                                            <Typography variant="caption" color="text.secondary">
                                                                {item.fieldKey}
                                                            </Typography>
                                                        </Stack>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Chip
                                                            size="small"
                                                            label={item.evidenceType || 'Document'}
                                                            color={getEvidenceTypeColor(item.evidenceType)}
                                                            variant="outlined"
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography variant="body2">
                                                            {item.submittedBy || item.linkedBy || '—'}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography variant="body2">
                                                            {formatDate(item.submittedAt || item.linkedAt)}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Chip
                                                            size="small"
                                                            label={priority.toUpperCase()}
                                                            color={getPriorityColor(priority)}
                                                            variant="filled"
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <Chip
                                                            size="small"
                                                            label="Pending Review"
                                                            color="warning"
                                                            variant="outlined"
                                                        />
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                                                            <Tooltip title="Review Evidence">
                                                                <IconButton
                                                                    size="small"
                                                                    color="primary"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        handleRowClick(item);
                                                                    }}
                                                                >
                                                                    <ViewIcon fontSize="small" />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </Stack>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
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

            {/* Evidence Review Modal */}
            <EvidenceReviewModal
                open={reviewModalOpen}
                onClose={() => setReviewModalOpen(false)}
                evidence={selectedEvidence}
                smeEmail={smeEmail}
            />
        </Stack>
    );
}
