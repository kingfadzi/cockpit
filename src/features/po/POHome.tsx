import React, { useState, useMemo } from 'react';
import {
  Grid,
  Stack,
  Typography,
  Button,
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Pagination,
  Paper,
  Divider,
  Chip,
  Tooltip,
} from '@mui/material';
import CriticalityBadge from '../../components/CriticalityBadge';
import { useApps, usePortfolioRiskSummary } from '../../api/hooks';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import AddApplicationDialog from './AddApplicationDialog';

// Type for KPI metrics
type KpiMetric = {
  label: string;
  severity: 'error' | 'warning' | 'info' | 'success';
  count: number;
  to: string;
};

// Ribbon metric component
interface RibbonMetricProps {
  label: string;
  value: string | number;
  color: 'error' | 'warning' | 'info' | 'success';
  onClick?: () => void;
}

function RibbonMetric({ label, value, color, onClick }: RibbonMetricProps) {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.25,
        px: 2,
        py: 1,
        cursor: onClick ? 'pointer' : 'default',
        '&:hover': onClick ? {
          bgcolor: 'action.hover',
        } : {},
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 36,
          height: 36,
          borderRadius: '50%',
          bgcolor: `${color}.main`,
          color: 'white',
          flexShrink: 0,
          fontWeight: 700,
          fontSize: '0.9rem'
        }}
      >
        {value}
      </Box>
      <Typography
        variant="body2"
        color="text.primary"
        sx={{ fontWeight: 600, fontSize: '0.875rem', whiteSpace: 'nowrap' }}
      >
        {label}
      </Typography>
    </Box>
  );
}

export default function POHome() {
  const navigate = useNavigate();

  // Helper function to calculate total from risk breakdown
  const calculateRiskTotal = (breakdown?: { critical: number; high: number; medium: number; low: number }) => {
    if (!breakdown) return 0;
    return breakdown.critical + breakdown.high + breakdown.medium + breakdown.low;
  };

  // Helper function to get risk score background color
  const getRiskScoreBgColor = (score: number): string => {
    if (score >= 90) return '#d32f2f';         // Dark red background
    if (score >= 75) return '#f44336';         // Lighter red background (transitions from orange)
    if (score >= 60) return '#ff9800';         // Bright orange background
    if (score >= 40) return '#ffa726';         // Amber background
    return 'success.main';                     // Green background
  };

  // Search/filter state
  const [search, setSearch] = useState('');
  const [criticalityFilter, setCriticalityFilter] = useState<'A' | 'B' | 'C' | 'D' | ''>('');
  const [applicationTypeFilter, setApplicationTypeFilter] = useState('');
  const [architectureTypeFilter, setArchitectureTypeFilter] = useState('');
  const [installTypeFilter, setInstallTypeFilter] = useState('');

  // Pagination state
  const [page, setPage] = useState(1);
  const pageSize = 10;

  // Add application modal state
  const [addAppOpen, setAddAppOpen] = useState(false);

  // Create filter params for API call
  const filterParams = useMemo(() => ({
    search: search || undefined,
    criticality: criticalityFilter || undefined,
    applicationType: applicationTypeFilter || undefined,
    architectureType: architectureTypeFilter || undefined,
    installType: installTypeFilter || undefined,
    includeRiskMetrics: true,
  }), [search, criticalityFilter, applicationTypeFilter, architectureTypeFilter, installTypeFilter]);

  // Get all apps for filter options (unfiltered)
  const { data: allAppsData } = useApps();
  const allApps = allAppsData?.apps || [];

  // Get filtered apps and risk summary
  const { data: filteredAppsData, isLoading } = useApps(filterParams);
  const apps = filteredAppsData?.apps || [];

  // Get portfolio risk summary for KPIs
  const { data: riskSummary } = usePortfolioRiskSummary();
  
  const applicationTypes = useMemo(() => {
    const set = new Set<string>();
    allApps.forEach((app) => {
      if (app.applicationType) set.add(app.applicationType);
    });
    return Array.from(set);
  }, [allApps]);

  const architectureTypes = useMemo(() => {
    const set = new Set<string>();
    allApps.forEach((app) => {
      if (app.architecture_type) set.add(app.architecture_type);
    });
    return Array.from(set);
  }, [allApps]);

  const installTypes = useMemo(() => {
    const set = new Set<string>();
    allApps.forEach((app) => {
      const install = (app as any).install_type;
      if (install) set.add(install);
    });
    return Array.from(set);
  }, [allApps]);

  // Create filter query params for KPI tile URLs
  const getFilterParams = () => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (criticalityFilter) params.set('criticality', criticalityFilter);
    if (applicationTypeFilter) params.set('appType', applicationTypeFilter);
    if (architectureTypeFilter) params.set('archType', architectureTypeFilter);
    if (installTypeFilter) params.set('installType', installTypeFilter);
    return params.toString();
  };

  // KPI metrics definitions using new risk-based metrics
  const filterQuery = getFilterParams();
  const kpiMetrics: KpiMetric[] = [
    {
      label: 'Action Required',
      severity: 'error',
      count: riskSummary?.actionRequired ?? 0,
      to: `/po/risks?status=awaiting_remediation${filterQuery ? `&${filterQuery}` : ''}`,
    },
    {
      label: 'Blocking Compliance',
      severity: 'error',
      count: riskSummary?.blockingCompliance ?? 0,
      to: `/po/risks?severity=critical,high${filterQuery ? `&${filterQuery}` : ''}`,
    },
    {
      label: 'Missing Evidence',
      severity: 'warning',
      count: riskSummary?.missingEvidence ?? 0,
      to: `/po/kpis/missing${filterQuery ? `?${filterQuery}` : ''}`,
    },
    {
      label: 'Pending Review',
      severity: 'info',
      count: riskSummary?.pendingReview ?? 0,
      to: `/po/risks?status=under_sme_review${filterQuery ? `&${filterQuery}` : ''}`,
    },
    {
      label: 'Escalated',
      severity: 'error',
      count: riskSummary?.escalated ?? 0,
      to: `/po/risks?status=escalated${filterQuery ? `&${filterQuery}` : ''}`,
    },
    {
      label: 'Recent Wins',
      severity: 'success',
      count: riskSummary?.recentWins ?? 0,
      to: `/po/risks?status=resolved${filterQuery ? `&${filterQuery}` : ''}`,
    },
  ];

  // Pagination logic
  const paginatedApps = useMemo(() => {
    const startIndex = (page - 1) * pageSize;
    return apps.slice(startIndex, startIndex + pageSize);
  }, [apps, page, pageSize]);

  const totalPages = Math.ceil(apps.length / pageSize);

  return (
    <Stack spacing={3}>
      {/* Critical Apps Alert */}
      {riskSummary && riskSummary.criticalApps && riskSummary.criticalApps.length > 0 && (
        <Card
          variant="outlined"
          sx={{
            borderColor: 'error.main',
            bgcolor: 'error.50',
            borderWidth: 2,
          }}
        >
          <CardContent>
            <Stack spacing={2}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: 'error.main',
                    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                    '@keyframes pulse': {
                      '0%, 100%': { opacity: 1 },
                      '50%': { opacity: 0.5 },
                    },
                  }}
                />
                <Typography variant="h6" fontWeight={700} color="error.dark">
                  Priority Applications Requiring Attention ({riskSummary.criticalApps.length})
                </Typography>
              </Stack>
              <Typography variant="body2" color="text.secondary">
                These applications have critical or high-priority risks that require immediate action.
              </Typography>
              <Stack spacing={1}>
                {riskSummary.criticalApps.map((app) => (
                  <Paper
                    key={app.appId}
                    elevation={0}
                    sx={{
                      p: 1.5,
                      border: 1,
                      borderColor: 'divider',
                      cursor: 'pointer',
                      '&:hover': {
                        bgcolor: 'action.hover',
                      },
                    }}
                    onClick={() => navigate(`/po/apps/${app.appId}?tab=profile&subtab=risks`)}
                  >
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Box>
                        <Typography variant="body2" fontWeight={600}>
                          {app.appName}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {app.appId}
                        </Typography>
                      </Box>
                      <Stack direction="row" spacing={1} alignItems="center">
                        {app.criticalCount > 0 && (
                          <Chip
                            label={`${app.criticalCount} Critical`}
                            size="small"
                            color="error"
                            sx={{ fontWeight: 600 }}
                          />
                        )}
                        {app.highCount > 0 && (
                          <Chip
                            label={`${app.highCount} High`}
                            size="small"
                            color="warning"
                            sx={{ fontWeight: 600 }}
                          />
                        )}
                        <Box
                          sx={{
                            px: 1.5,
                            py: 0.5,
                            borderRadius: 1,
                            bgcolor: getRiskScoreBgColor(app.riskScore),
                            color: 'white',
                            fontWeight: 700,
                            fontSize: '0.875rem',
                          }}
                        >
                          {Math.round(app.riskScore)}
                        </Box>
                      </Stack>
                    </Stack>
                  </Paper>
                ))}
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      )}

      {/* Single Card containing everything */}
      <Card variant="outlined">
        {/* Status Overview Section */}
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
            Status Overview
          </Typography>
          <Paper
            elevation={0}
            sx={{
              border: 1,
              borderColor: 'divider',
              borderRadius: 2,
              overflow: 'hidden',
              bgcolor: 'background.paper'
            }}
          >
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem />}
              sx={{
                flexWrap: 'wrap',
                '& > *': {
                  flex: { xs: '1 1 auto', md: 1 }
                }
              }}
            >
              {kpiMetrics.map((metric) => (
                <RibbonMetric
                  key={metric.label}
                  label={metric.label}
                  value={metric.count}
                  color={metric.severity}
                  onClick={() => navigate(metric.to)}
                />
              ))}
            </Stack>
          </Paper>
        </Box>

        {/* Divider */}
        <Box sx={{ borderTop: 1, borderColor: 'divider', my: 0 }} />

        {/* My Applications Section */}
        <Box sx={{ p: 2 }}>
          {/* Header with title and Create button */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 2 }}
          >
            <Typography variant="h6" fontWeight={700}>
              My Applications ({apps.length})
            </Typography>
            <Button
              variant="contained"
              onClick={() => setAddAppOpen(true)}
            >
              + Create Application
            </Button>
          </Stack>

          {/* Filters */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            alignItems={{ xs: 'stretch', sm: 'center' }}
            sx={{ mb: 2 }}
          >
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              alignItems={{ xs: 'stretch', sm: 'center' }}
              flex={1}
            >
              <TextField
                label="Search"
                variant="outlined"
                size="small"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <FormControl size="small" sx={{ minWidth: 130 }}>
                <InputLabel>Criticality</InputLabel>
                <Select
                  value={criticalityFilter}
                  label="Criticality"
                  onChange={(e) => setCriticalityFilter(e.target.value as any)}
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="A">A</MenuItem>
                  <MenuItem value="B">B</MenuItem>
                  <MenuItem value="C">C</MenuItem>
                  <MenuItem value="D">D</MenuItem>
                </Select>
              </FormControl>
              <FormControl size="small" sx={{ minWidth: 180 }}>
                <InputLabel>Application Type</InputLabel>
                <Select
                  value={applicationTypeFilter}
                  label="Application Type"
                  onChange={(e) => setApplicationTypeFilter(e.target.value as string)}
                >
                  <MenuItem value="">All</MenuItem>
                  {applicationTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl size="small" sx={{ minWidth: 180 }}>
                <InputLabel>Architecture Type</InputLabel>
                <Select
                  value={architectureTypeFilter}
                  label="Architecture Type"
                  onChange={(e) => setArchitectureTypeFilter(e.target.value as string)}
                >
                  <MenuItem value="">All</MenuItem>
                  {architectureTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel>Install Type</InputLabel>
                <Select
                  value={installTypeFilter}
                  label="Install Type"
                  onChange={(e) => setInstallTypeFilter(e.target.value as string)}
                >
                  <MenuItem value="">All</MenuItem>
                  {installTypes.map((t) => (
                    <MenuItem key={t} value={t}>
                      {t}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>

            <Button
              variant="outlined"
              size="small"
              sx={{ whiteSpace: 'nowrap' }}
              onClick={() => {
                setSearch('');
                setCriticalityFilter('');
                setApplicationTypeFilter('');
                setArchitectureTypeFilter('');
                setInstallTypeFilter('');
              }}
            >
              Clear All
            </Button>
          </Stack>
        </Box>

        {/* Applications Content */}
        <CardContent sx={{ pt: 0, pb: 2 }}>
          {isLoading ? (
            <Typography>Loading apps…</Typography>
          ) : apps.length === 0 ? (
            <Typography color="text.secondary">
              No applications match your filters.
            </Typography>
          ) : (
            <>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Application</TableCell>
                      <TableCell>Application Type</TableCell>
                      <TableCell>Install Type</TableCell>
                      <TableCell>Architecture</TableCell>
                      <TableCell align="center">Risk Score</TableCell>
                      <TableCell align="center">Total Risks</TableCell>
                      <TableCell align="center">In Progress</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedApps.map((app) => (
                      <TableRow
                        key={app.appId}
                        hover
                        sx={{ cursor: 'pointer' }}
                        onClick={() => navigate(`/po/apps/${app.appId}?tab=profile`)}
                      >
                        <TableCell>
                          <Stack direction="row" spacing={1} alignItems="center">
                            <CriticalityBadge criticality={app.criticality || 'D'} />
                            <Box>
                              <Typography variant="body2" fontWeight={600}>
                                {app.name || app.appId}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                ({app.appId})
                              </Typography>
                            </Box>
                          </Stack>
                        </TableCell>
                        <TableCell>{app.applicationType || '—'}</TableCell>
                        <TableCell>{(app as any).install_type || '—'}</TableCell>
                        <TableCell>{app.architecture_type || '—'}</TableCell>
                        <TableCell align="center">
                          <Box
                            sx={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              minWidth: 60,
                              px: 1.5,
                              py: 0.5,
                              borderRadius: 1,
                              bgcolor: getRiskScoreBgColor(app.riskMetrics?.riskScore || 0),
                              color: 'white',
                              fontWeight: 700,
                              fontSize: '1rem'
                            }}
                          >
                            {Math.round(app.riskMetrics?.riskScore || 0)}
                          </Box>
                        </TableCell>
                        <TableCell align="center">
                          <Stack direction="row" spacing={0.5} justifyContent="center">
                            {(app.riskMetrics?.totalRisks?.critical || 0) > 0 && (
                              <Tooltip title={`${app.riskMetrics?.totalRisks?.critical} Critical`}>
                                <Chip
                                  label={app.riskMetrics?.totalRisks?.critical}
                                  size="small"
                                  color="error"
                                  sx={{ fontWeight: 600, minWidth: 32 }}
                                />
                              </Tooltip>
                            )}
                            {(app.riskMetrics?.totalRisks?.high || 0) > 0 && (
                              <Tooltip title={`${app.riskMetrics?.totalRisks?.high} High`}>
                                <Chip
                                  label={app.riskMetrics?.totalRisks?.high}
                                  size="small"
                                  color="warning"
                                  sx={{ fontWeight: 600, minWidth: 32 }}
                                />
                              </Tooltip>
                            )}
                            {(app.riskMetrics?.totalRisks?.medium || 0) > 0 && (
                              <Tooltip title={`${app.riskMetrics?.totalRisks?.medium} Medium`}>
                                <Chip
                                  label={app.riskMetrics?.totalRisks?.medium}
                                  size="small"
                                  color="info"
                                  sx={{ fontWeight: 600, minWidth: 32 }}
                                />
                              </Tooltip>
                            )}
                            {(app.riskMetrics?.totalRisks?.low || 0) > 0 && (
                              <Tooltip title={`${app.riskMetrics?.totalRisks?.low} Low`}>
                                <Chip
                                  label={app.riskMetrics?.totalRisks?.low}
                                  size="small"
                                  color="success"
                                  sx={{ fontWeight: 600, minWidth: 32 }}
                                />
                              </Tooltip>
                            )}
                            {calculateRiskTotal(app.riskMetrics?.totalRisks) === 0 && (
                              <Typography variant="body2" color="text.secondary">
                                —
                              </Typography>
                            )}
                          </Stack>
                        </TableCell>
                        <TableCell align="center">
                          <Stack direction="row" spacing={0.5} justifyContent="center">
                            {(app.riskMetrics?.inProgress?.critical || 0) > 0 && (
                              <Tooltip title={`${app.riskMetrics?.inProgress?.critical} Critical`}>
                                <Chip
                                  label={app.riskMetrics?.inProgress?.critical}
                                  size="small"
                                  color="error"
                                  sx={{ fontWeight: 600, minWidth: 32 }}
                                />
                              </Tooltip>
                            )}
                            {(app.riskMetrics?.inProgress?.high || 0) > 0 && (
                              <Tooltip title={`${app.riskMetrics?.inProgress?.high} High`}>
                                <Chip
                                  label={app.riskMetrics?.inProgress?.high}
                                  size="small"
                                  color="warning"
                                  sx={{ fontWeight: 600, minWidth: 32 }}
                                />
                              </Tooltip>
                            )}
                            {(app.riskMetrics?.inProgress?.medium || 0) > 0 && (
                              <Tooltip title={`${app.riskMetrics?.inProgress?.medium} Medium`}>
                                <Chip
                                  label={app.riskMetrics?.inProgress?.medium}
                                  size="small"
                                  color="info"
                                  sx={{ fontWeight: 600, minWidth: 32 }}
                                />
                              </Tooltip>
                            )}
                            {(app.riskMetrics?.inProgress?.low || 0) > 0 && (
                              <Tooltip title={`${app.riskMetrics?.inProgress?.low} Low`}>
                                <Chip
                                  label={app.riskMetrics?.inProgress?.low}
                                  size="small"
                                  color="success"
                                  sx={{ fontWeight: 600, minWidth: 32 }}
                                />
                              </Tooltip>
                            )}
                            {calculateRiskTotal(app.riskMetrics?.inProgress) === 0 && (
                              <Typography variant="body2" color="text.secondary">
                                —
                              </Typography>
                            )}
                          </Stack>
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
                    page={page}
                    onChange={(_, newPage) => setPage(newPage)}
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

      {/* Add Application Dialog */}
      <AddApplicationDialog
        open={addAppOpen}
        onClose={() => setAddAppOpen(false)}
        onSuccess={(appId) => navigate(`/po/apps/${appId}`)}
      />
    </Stack>
  );
}