import React, { useMemo, useState, useEffect } from 'react';
import { useParams, useSearchParams, Link as RouterLink, useNavigate } from 'react-router-dom';
import {
    Stack,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    Link,
    Box,
    CircularProgress,
    IconButton,
    Breadcrumbs,
    TablePagination,
} from '@mui/material';
import { ArrowBack as BackIcon, Home as HomeIcon } from '@mui/icons-material';
import { useApps, useBatchAppKpis } from '../../api/hooks';
import CriticalityBadge from '../../components/CriticalityBadge';

const KPI_TYPE_LABELS: Record<string, string> = {
    'compliant': 'Compliant Applications',
    'missing': 'Applications Missing Evidence',
    'pending': 'Applications Pending Review',
    'blocked': 'Risk Blocked Applications',
};

const KPI_TYPE_COLORS: Record<string, string> = {
    'compliant': 'success',
    'missing': 'error',
    'pending': 'warning',
    'blocked': 'info',
};

const KPI_TYPE_MAPPING: Record<string, string> = {
    'compliant': 'compliant',
    'missing': 'missingEvidence',
    'pending': 'pendingReview',
    'blocked': 'riskBlocked',
};

export default function KpiDetailPage() {
    const { kpiType } = useParams<{ kpiType: string }>();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    // Extract filters from URL params
    const filters = useMemo(() => {
        const result: any = { kpiType };

        const search = searchParams.get('search');
        const criticality = searchParams.get('criticality');
        const appType = searchParams.get('appType');
        const archType = searchParams.get('archType');
        const installType = searchParams.get('installType');

        if (search) result.search = search;
        if (criticality) result.criticality = criticality;
        if (appType) result.applicationType = appType;
        if (archType) result.architectureType = archType;
        if (installType) result.installType = installType;

        return result;
    }, [kpiType, searchParams]);

    // Fetch filtered apps
    const { data: appsData, isLoading: appsLoading } = useApps(filters);
    const apps = appsData?.apps || [];

    // Fetch KPI counts for all apps
    const appIds = apps.map(app => app.appId);
    const { data: batchKpis, isLoading: kpisLoading } = useBatchAppKpis(appIds);

    const isLoading = appsLoading || kpisLoading;

    const rowsPerPage = 10;
    const [page, setPage] = useState(0);

    useEffect(() => {
        if (page * rowsPerPage >= apps.length && page !== 0) {
            setPage(0);
        }
    }, [apps.length, page, rowsPerPage]);

    const paginatedApps = useMemo(
        () => apps.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
        [apps, page, rowsPerPage]
    );

    const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleRowsPerPageChange = (_event: React.ChangeEvent<HTMLInputElement>) => {
        setPage(0);
    };

    const formatValue = (value?: string | null) => (value && value.trim() ? value : '—');

    if (!kpiType || !KPI_TYPE_LABELS[kpiType]) {
        return (
            <Stack spacing={2}>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <IconButton
                        onClick={() => navigate('/po')}
                        size="small"
                        sx={{ mr: 1 }}
                    >
                        <BackIcon />
                    </IconButton>
                    <Typography variant="h4" color="error">
                        Invalid KPI Type
                    </Typography>
                </Stack>
                <Typography>
                    The requested KPI type "{kpiType}" is not valid.
                </Typography>
            </Stack>
        );
    }

    const formatUpdatedAt = (updatedAt: string | null) => {
        if (!updatedAt) return null;
        const parsed = new Date(updatedAt);
        return Number.isNaN(parsed.getTime()) ? null : parsed.toLocaleDateString();
    };

    const getKpiCount = (appId: string): number => {
        const kpis = batchKpis?.[appId];
        if (!kpis) return 0;

        const kpiKey = KPI_TYPE_MAPPING[kpiType!];
        return (kpis as any)[kpiKey] || 0;
    };

    const getKpiLabel = (count: number): string => {
        switch (kpiType) {
            case 'compliant':
                return `${count} compliant control${count !== 1 ? 's' : ''}`;
            case 'missing':
                return `${count} missing evidence item${count !== 1 ? 's' : ''}`;
            case 'pending':
                return `${count} pending review${count !== 1 ? 's' : ''}`;
            case 'blocked':
                return `${count} risk-blocked control${count !== 1 ? 's' : ''}`;
            default:
                return `${count} item${count !== 1 ? 's' : ''}`;
        }
    };

    return (
        <Stack spacing={3}>
            {/* Header */}
            <Stack spacing={0.5}>
                <Stack direction="row" alignItems="center" spacing={1.5}>
                    <IconButton
                        onClick={() => navigate('/po')}
                        size="small"
                        sx={{ mr: 0.5 }}
                        aria-label="Back to portfolio"
                    >
                        <BackIcon />
                    </IconButton>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link
                            underline="hover"
                            color="inherit"
                            onClick={() => navigate('/po')}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                cursor: 'pointer',
                                '&:hover': { color: 'primary.main' },
                            }}
                        >
                            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                            Portfolio
                        </Link>
                        <Typography color="text.primary" sx={{ fontWeight: 600 }}>
                            {KPI_TYPE_LABELS[kpiType]}
                        </Typography>
                    </Breadcrumbs>
                </Stack>
            </Stack>

            {/* Loading State */}
            {isLoading && (
                <Box display="flex" justifyContent="center" py={4}>
                    <CircularProgress />
                </Box>
            )}

            {/* Results */}
            {!isLoading && (
                <>
                    {/* Summary */}
                    <Paper
                        variant="outlined"
                        sx={{
                            px: 2,
                            py: 1,
                            borderRadius: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            gap: 1,
                        }}
                    >
                        <Typography variant="subtitle2" fontWeight={600}>
                            {apps.length} application{apps.length !== 1 ? 's' : ''}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            Filtered by {KPI_TYPE_LABELS[kpiType!]}
                            {Object.keys(filters).length > 1 && ' + additional filters applied'}
                        </Typography>
                    </Paper>

                    {/* Table */}
                    {apps.length === 0 ? (
                        <Paper variant="outlined" sx={{ p: 4, textAlign: 'center' }}>
                            <Typography color="text.secondary">
                                No applications match the selected criteria.
                            </Typography>
                        </Paper>
                    ) : (
                        <Paper variant="outlined" sx={{ overflow: 'hidden' }}>
                            <TableContainer>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{ py: 0.75 }}><strong>Application</strong></TableCell>
                                            <TableCell sx={{ py: 0.75 }}><strong>House Position</strong></TableCell>
                                            <TableCell sx={{ py: 0.75 }}><strong>App Tier</strong></TableCell>
                                            <TableCell sx={{ py: 0.75 }}><strong>Architecture</strong></TableCell>
                                            <TableCell sx={{ py: 0.75 }}><strong>Install Type</strong></TableCell>
                                            <TableCell sx={{ py: 0.75 }} align="center"><strong>KPI Focus</strong></TableCell>
                                            <TableCell sx={{ py: 0.75 }} />
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {paginatedApps.map((app) => {
                                            const kpiCount = getKpiCount(app.appId);
                                            const kpiLabel = getKpiLabel(kpiCount);
                                            const updatedLabel = formatUpdatedAt(app.updatedAt);

                                            return (
                                                <TableRow key={app.appId} hover>
                                                    <TableCell sx={{ py: 0.75 }}>
                                                        <Stack spacing={0.25}>
                                                            <Stack direction="row" spacing={1} alignItems="center">
                                                                <CriticalityBadge criticality={app.criticality || 'D'} />
                                                                <Link
                                                                    component={RouterLink}
                                                                    to={`/po/apps/${app.appId}`}
                                                                    variant="body2"
                                                                    sx={{
                                                                        textDecoration: 'none',
                                                                        fontWeight: 600,
                                                                        '&:hover': { textDecoration: 'underline' },
                                                                    }}
                                                                >
                                                                    {app.name || app.appId}
                                                                </Link>
                                                            </Stack>
                                                            <Typography variant="caption" color="text.secondary">
                                                                {app.appId}
                                                            </Typography>
                                                        </Stack>
                                                    </TableCell>
                                                    <TableCell sx={{ py: 0.75 }}>
                                                        <Typography variant="body2" color="text.primary">
                                                            {formatValue(app.housePosition)}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell sx={{ py: 0.75 }}>
                                                        <Typography variant="body2" color="text.primary">
                                                            {formatValue(app.applicationTier)}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell sx={{ py: 0.75 }}>
                                                        <Typography variant="body2" color="text.primary">
                                                            {formatValue(app.architecture_type)}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell sx={{ py: 0.75 }}>
                                                        <Typography variant="body2" color="text.primary">
                                                            {formatValue(app.install_type)}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell sx={{ py: 0.75 }} align="center">
                                                        <Chip
                                                            label={kpiLabel}
                                                            color={KPI_TYPE_COLORS[kpiType] as any}
                                                            variant="outlined"
                                                            size="small"
                                                        />
                                                    </TableCell>
                                                    <TableCell sx={{ py: 0.75 }}>
                                                        <Stack spacing={0.25}>
                                                            <Link
                                                                component={RouterLink}
                                                                to={`/po/apps/${app.appId}`}
                                                                variant="body2"
                                                                sx={{
                                                                    textDecoration: 'none',
                                                                    fontWeight: 600,
                                                                    '&:hover': { textDecoration: 'underline' },
                                                                }}
                                                            >
                                                                View profile →
                                                            </Link>
                                                            {updatedLabel && (
                                                                <Typography variant="caption" color="text.secondary">
                                                                    Updated {updatedLabel}
                                                                </Typography>
                                                            )}
                                                        </Stack>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                component="div"
                                count={apps.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                rowsPerPageOptions={[rowsPerPage]}
                                onRowsPerPageChange={handleRowsPerPageChange}
                                sx={{ borderTop: '1px solid', borderColor: 'divider' }}
                            />
                        </Paper>
                    )}
                </>
            )}
        </Stack>
    );
}
