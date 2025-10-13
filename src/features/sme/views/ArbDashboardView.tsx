import React, { useState } from 'react';
import {
    Stack,
    Typography,
    Card,
    CardContent,
    Box,
    Chip,
    Grid,
    Alert,
    CircularProgress,
    Paper,
    LinearProgress,
} from '@mui/material';
import {
    Dashboard as DashboardIcon,
    TrendingUp as TrendingUpIcon,
    Warning as WarningIcon,
    CheckCircle as CheckCircleIcon,
    Assignment as AssignmentIcon,
} from '@mui/icons-material';
import SectionHeader from '../../../components/SectionHeader';
import { useArbDashboard } from '../../../api/hooks';

interface ArbDashboardViewProps {
    arbName: string;
    status?: string;
}

export default function ArbDashboardView({ arbName, status }: ArbDashboardViewProps) {
    // Fetch ARB dashboard data
    const { data: dashboardData, isLoading, isError, error } = useArbDashboard(arbName, status);

    // Get ARB display name
    const getArbDisplayName = (arb: string) => {
        const names: Record<string, string> = {
            'security': 'Security',
            'data': 'Data',
            'operations': 'Operations',
            'enterprise_architecture': 'Enterprise Architecture',
        };
        return names[arb] || arb;
    };

    // Get status color
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'OPEN': return 'error';
            case 'IN_PROGRESS': return 'warning';
            case 'RESOLVED': return 'success';
            case 'ACCEPTED': return 'info';
            default: return 'default';
        }
    };

    // Get priority color
    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'CRITICAL': return 'error';
            case 'HIGH': return 'error';
            case 'MEDIUM': return 'warning';
            case 'LOW': return 'default';
            default: return 'default';
        }
    };

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
                Failed to load ARB dashboard: {error?.message || 'Unknown error'}
            </Alert>
        );
    }

    if (!dashboardData) {
        return (
            <Alert severity="info">
                No dashboard data available for {getArbDisplayName(arbName)}
            </Alert>
        );
    }

    const { overview, domains, topApplications, statusDistribution, priorityDistribution, recentActivity } = dashboardData;

    return (
        <Stack spacing={3}>
            <SectionHeader
                title={`${getArbDisplayName(arbName)} ARB Dashboard`}
                subtitle="Strategic view of domain risks and key metrics"
                icon={<DashboardIcon />}
            />

            {/* Overview Cards */}
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card variant="outlined">
                        <CardContent>
                            <Stack spacing={1}>
                                <Typography variant="caption" color="text.secondary">
                                    Total Domain Risks
                                </Typography>
                                <Typography variant="h4" fontWeight={700}>
                                    {overview.totalDomainRisks}
                                </Typography>
                                <Chip
                                    size="small"
                                    icon={<AssignmentIcon fontSize="small" />}
                                    label="Domain Risks"
                                    variant="outlined"
                                    color="primary"
                                />
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card variant="outlined">
                        <CardContent>
                            <Stack spacing={1}>
                                <Typography variant="caption" color="text.secondary">
                                    Open Items
                                </Typography>
                                <Typography variant="h4" fontWeight={700}>
                                    {overview.totalOpenItems}
                                </Typography>
                                <Chip
                                    size="small"
                                    icon={<WarningIcon fontSize="small" />}
                                    label="Open"
                                    variant="outlined"
                                    color="warning"
                                />
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card variant="outlined">
                        <CardContent>
                            <Stack spacing={1}>
                                <Typography variant="caption" color="text.secondary">
                                    Critical Count
                                </Typography>
                                <Typography variant="h4" fontWeight={700} color="error.main">
                                    {overview.criticalCount}
                                </Typography>
                                <Chip
                                    size="small"
                                    icon={<WarningIcon fontSize="small" />}
                                    label="Critical"
                                    variant="filled"
                                    color="error"
                                />
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card variant="outlined">
                        <CardContent>
                            <Stack spacing={1}>
                                <Typography variant="caption" color="text.secondary">
                                    Avg Priority Score
                                </Typography>
                                <Typography variant="h4" fontWeight={700}>
                                    {(overview.averagePriorityScore || 0).toFixed(1)}
                                </Typography>
                                <Chip
                                    size="small"
                                    icon={<TrendingUpIcon fontSize="small" />}
                                    label="Average"
                                    variant="outlined"
                                    color="info"
                                />
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Top Applications */}
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
                        Top Applications by Risk Score
                    </Typography>
                    <Stack spacing={2}>
                        {topApplications && topApplications.length > 0 ? (
                            topApplications.map((app) => (
                                <Paper key={app.appId} variant="outlined" sx={{ p: 2 }}>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item xs={12} sm={4}>
                                            <Typography variant="body1" fontWeight={600}>
                                                {app.appName || app.appId}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {app.domainRiskCount} domain risk{app.domainRiskCount !== 1 ? 's' : ''}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <Box>
                                                <Typography variant="caption" color="text.secondary">
                                                    Priority Score
                                                </Typography>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <LinearProgress
                                                        variant="determinate"
                                                        value={Math.min(((app.highestPriorityScore || 0) / 100) * 100, 100)}
                                                        sx={{ flex: 1, height: 8, borderRadius: 4 }}
                                                        color={
                                                            (app.highestPriorityScore || 0) >= 80 ? 'error' :
                                                            (app.highestPriorityScore || 0) >= 50 ? 'warning' : 'success'
                                                        }
                                                    />
                                                    <Typography variant="body2" fontWeight={600}>
                                                        {(app.highestPriorityScore || 0).toFixed(1)}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <Stack direction="row" spacing={1}>
                                                <Chip
                                                    size="small"
                                                    label={`${app.totalOpenItems} open`}
                                                    color="warning"
                                                    variant="outlined"
                                                />
                                            </Stack>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            ))
                        ) : (
                            <Alert severity="info">No application data available</Alert>
                        )}
                    </Stack>
                </CardContent>
            </Card>

            {/* Status and Priority Distribution */}
            <Grid container spacing={2}>
                {/* Status Distribution */}
                <Grid item xs={12} md={6}>
                    <Card variant="outlined">
                        <CardContent>
                            <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
                                Status Distribution
                            </Typography>
                            <Stack spacing={1}>
                                {statusDistribution && Object.keys(statusDistribution).length > 0 ? (
                                    Object.entries(statusDistribution).map(([status, count]) => (
                                        <Box key={status} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Chip
                                                size="small"
                                                label={status.replace('_', ' ')}
                                                color={getStatusColor(status)}
                                                variant="outlined"
                                            />
                                            <Typography variant="body1" fontWeight={600}>
                                                {count}
                                            </Typography>
                                        </Box>
                                    ))
                                ) : (
                                    <Alert severity="info">No status data available</Alert>
                                )}
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Priority Distribution */}
                <Grid item xs={12} md={6}>
                    <Card variant="outlined">
                        <CardContent>
                            <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
                                Priority Distribution
                            </Typography>
                            <Stack spacing={1}>
                                {priorityDistribution && Object.keys(priorityDistribution).length > 0 ? (
                                    Object.entries(priorityDistribution).map(([priority, count]) => (
                                        <Box key={priority} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Chip
                                                size="small"
                                                label={priority}
                                                color={getPriorityColor(priority)}
                                                variant="filled"
                                            />
                                            <Typography variant="body1" fontWeight={600}>
                                                {count}
                                            </Typography>
                                        </Box>
                                    ))
                                ) : (
                                    <Alert severity="info">No priority data available</Alert>
                                )}
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Recent Activity */}
            {recentActivity && (
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
                            Recent Activity
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} md={3}>
                                <Typography variant="caption" color="text.secondary">
                                    New (7 days)
                                </Typography>
                                <Typography variant="h5" fontWeight={600}>
                                    {recentActivity.newRisksLast7Days || 0}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <Typography variant="caption" color="text.secondary">
                                    Resolved (7 days)
                                </Typography>
                                <Typography variant="h5" fontWeight={600} color="success.main">
                                    {recentActivity.resolvedLast7Days || 0}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <Typography variant="caption" color="text.secondary">
                                    New (30 days)
                                </Typography>
                                <Typography variant="h5" fontWeight={600}>
                                    {recentActivity.newRisksLast30Days || 0}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <Typography variant="caption" color="text.secondary">
                                    Resolved (30 days)
                                </Typography>
                                <Typography variant="h5" fontWeight={600} color="success.main">
                                    {recentActivity.resolvedLast30Days || 0}
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            )}

            {/* Domains Summary */}
            {domains && domains.length > 0 && (
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
                            Domains Summary
                        </Typography>
                        <Grid container spacing={2}>
                            {domains.map((domain) => (
                                <Grid item xs={12} sm={6} md={4} key={domain.domain}>
                                    <Paper variant="outlined" sx={{ p: 2 }}>
                                        <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
                                            {domain.domain}
                                        </Typography>
                                        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                                            <Chip
                                                size="small"
                                                label={`${domain.riskCount} risks`}
                                                variant="outlined"
                                            />
                                            <Chip
                                                size="small"
                                                label={`${domain.openItems} open`}
                                                color="warning"
                                                variant="outlined"
                                            />
                                            {domain.criticalItems > 0 && (
                                                <Chip
                                                    size="small"
                                                    label={`${domain.criticalItems} critical`}
                                                    color="error"
                                                    variant="filled"
                                                />
                                            )}
                                        </Stack>
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>
                    </CardContent>
                </Card>
            )}
        </Stack>
    );
}
