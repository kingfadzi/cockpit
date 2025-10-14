import React, { useState } from 'react';
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
    CircularProgress,
    Grid,
    Paper,
    Divider,
    Button,
    IconButton,
} from '@mui/material';
import {
    Assignment as AssignmentIcon,
    ArrowBack as ArrowBackIcon,
    Comment as CommentIcon,
} from '@mui/icons-material';
import SectionHeader from '../../../components/SectionHeader';
import { useDomainRisk, useDomainRiskItems } from '../../../api/hooks';
import type { RiskItemResponse } from '../../../api/types';

interface DomainRiskDetailViewProps {
    domainRiskId: string;
    onBack?: () => void;
    onSelectRiskItem?: (riskItem: RiskItemResponse) => void;
}

export default function DomainRiskDetailView({ domainRiskId, onBack, onSelectRiskItem }: DomainRiskDetailViewProps) {
    // Fetch domain risk and its items
    const { data: domainRisk, isLoading: isLoadingDomainRisk, isError: isErrorDomainRisk, error: errorDomainRisk } = useDomainRisk(domainRiskId);
    const { data: riskItems = [], isLoading: isLoadingItems, isError: isErrorItems, error: errorItems } = useDomainRiskItems(domainRiskId);

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

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'CRITICAL': return 'error';
            case 'HIGH': return 'error';
            case 'MEDIUM': return 'warning';
            case 'LOW': return 'default';
            default: return 'default';
        }
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return '—';
        return new Date(dateString).toLocaleString();
    };

    const handleRiskItemClick = (riskItem: RiskItemResponse) => {
        if (onSelectRiskItem) {
            onSelectRiskItem(riskItem);
        }
    };

    const isLoading = isLoadingDomainRisk || isLoadingItems;
    const isError = isErrorDomainRisk || isErrorItems;
    const error = errorDomainRisk || errorItems;

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (isError) {
        return (
            <Alert severity="error">
                Failed to load domain risk details: {error?.message || 'Unknown error'}
            </Alert>
        );
    }

    if (!domainRisk) {
        return (
            <Alert severity="info">
                Domain risk not found
            </Alert>
        );
    }

    return (
        <Stack spacing={3}>
            {/* Header with Back Button */}
            <Box>
                {onBack && (
                    <Button
                        startIcon={<ArrowBackIcon />}
                        onClick={onBack}
                        sx={{ mb: 2 }}
                    >
                        Back to List
                    </Button>
                )}
                <SectionHeader
                    title={`Domain Risk: ${domainRisk.domain}`}
                    subtitle={`Application: ${domainRisk.appId}`}
                    icon={<AssignmentIcon />}
                />
            </Box>

            {/* Domain Risk Overview */}
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
                        Overview
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={3}>
                            <Paper variant="outlined" sx={{ p: 2 }}>
                                <Typography variant="caption" color="text.secondary">
                                    Domain
                                </Typography>
                                <Typography variant="h6" fontWeight={600}>
                                    {domainRisk.domain}
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Paper variant="outlined" sx={{ p: 2 }}>
                                <Typography variant="caption" color="text.secondary">
                                    Guild
                                </Typography>
                                <Typography variant="h6" fontWeight={600}>
                                    {domainRisk.arb}
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Paper variant="outlined" sx={{ p: 2 }}>
                                <Typography variant="caption" color="text.secondary">
                                    Total Items
                                </Typography>
                                <Typography variant="h6" fontWeight={600}>
                                    {domainRisk.totalItems}
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Paper variant="outlined" sx={{ p: 2 }}>
                                <Typography variant="caption" color="text.secondary">
                                    Open Items
                                </Typography>
                                <Typography variant="h6" fontWeight={600} color="warning.main">
                                    {domainRisk.openItems}
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Paper variant="outlined" sx={{ p: 2 }}>
                                <Typography variant="caption" color="text.secondary">
                                    Priority Score
                                </Typography>
                                <Typography variant="h6" fontWeight={600}>
                                    {domainRisk.priorityScore.toFixed(1)}
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Paper variant="outlined" sx={{ p: 2 }}>
                                <Typography variant="caption" color="text.secondary">
                                    Status
                                </Typography>
                                <Chip
                                    label={domainRisk.status.replace('_', ' ')}
                                    color={getStatusColor(domainRisk.status)}
                                    variant="filled"
                                    sx={{ mt: 0.5 }}
                                />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Paper variant="outlined" sx={{ p: 2 }}>
                                <Typography variant="caption" color="text.secondary">
                                    Created At
                                </Typography>
                                <Typography variant="body2">
                                    {formatDate(domainRisk.createdAt)}
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Paper variant="outlined" sx={{ p: 2 }}>
                                <Typography variant="caption" color="text.secondary">
                                    Last Updated
                                </Typography>
                                <Typography variant="body2">
                                    {formatDate(domainRisk.lastUpdatedAt)}
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            {/* Risk Items */}
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
                        Risk Items ({riskItems.length})
                    </Typography>

                    {riskItems.length === 0 ? (
                        <Alert severity="info">No risk items found for this domain risk</Alert>
                    ) : (
                        <TableContainer>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Risk ID</TableCell>
                                        <TableCell>Priority</TableCell>
                                        <TableCell>Priority Score</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Assigned To</TableCell>
                                        <TableCell>Due Date</TableCell>
                                        <TableCell>Comments</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {riskItems.map((item) => (
                                        <TableRow
                                            key={item.riskItemId}
                                            hover
                                            sx={{
                                                cursor: 'pointer',
                                                '&:hover': {
                                                    bgcolor: 'action.hover'
                                                }
                                            }}
                                            onClick={() => handleRiskItemClick(item)}
                                        >
                                            <TableCell>
                                                <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>
                                                    {item.riskItemId.slice(-8)}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    size="small"
                                                    label={item.priority}
                                                    color={getPriorityColor(item.priority)}
                                                    variant="filled"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="body2" fontWeight={600}>
                                                    {item.priorityScore.toFixed(1)}
                                                </Typography>
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
                                                <Typography variant="body2">
                                                    {item.assignedTo || '—'}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="body2" color="text.secondary">
                                                    {item.dueDate
                                                        ? new Date(item.dueDate).toLocaleDateString()
                                                        : '—'}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                {item.commentCount && item.commentCount > 0 ? (
                                                    <Chip
                                                        size="small"
                                                        icon={<CommentIcon fontSize="small" />}
                                                        label={item.commentCount}
                                                        variant="outlined"
                                                        color="primary"
                                                    />
                                                ) : (
                                                    <Typography variant="caption" color="text.secondary">
                                                        No comments
                                                    </Typography>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    size="small"
                                                    variant="outlined"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleRiskItemClick(item);
                                                    }}
                                                >
                                                    View
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </CardContent>
            </Card>

            {/* Metadata */}
            {domainRisk.metadata && Object.keys(domainRisk.metadata).length > 0 && (
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
                            Additional Metadata
                        </Typography>
                        <Paper variant="outlined" sx={{ p: 2, bgcolor: 'grey.50' }}>
                            <Typography variant="caption" sx={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
                                {JSON.stringify(domainRisk.metadata, null, 2)}
                            </Typography>
                        </Paper>
                    </CardContent>
                </Card>
            )}
        </Stack>
    );
}
