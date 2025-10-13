/**
 * Application Watchlist Component
 * Sortable table of applications with risk scores and breakdown
 */

import React, { useState, useMemo } from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Chip,
  Stack,
  Tooltip,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TablePagination,
  Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Application, DashboardScope } from '../api/types';
import CriticalityBadge from '../../../components/CriticalityBadge';

interface ApplicationWatchlistProps {
  applications: Application[];
  currentScope: DashboardScope;
  domainDisplayName?: string;
  arbName?: string; // ARB domain name for navigation
  headerAction?: React.ReactNode; // Optional action button for header
}

type SortField = 'name' | 'aggregatedRiskScore' | 'totalOpenItems' | 'lastActivityDate';
type SortDirection = 'asc' | 'desc';

export default function ApplicationWatchlist({ applications, currentScope, domainDisplayName = 'My Domain', arbName, headerAction }: ApplicationWatchlistProps) {
  const navigate = useNavigate();
  const [sortField, setSortField] = useState<SortField>('aggregatedRiskScore');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Filter state
  const [appNameFilter, setAppNameFilter] = useState('');
  const [appIdFilter, setAppIdFilter] = useState('');
  const [ownerFilter, setOwnerFilter] = useState(''); // Now searchable text
  const [criticalityFilter, setCriticalityFilter] = useState<'A' | 'B' | 'C' | 'D' | ''>('');
  const [businessUnitFilter, setBusinessUnitFilter] = useState('');
  const [domainFilter, setDomainFilter] = useState('');
  const [lastActivityFilter, setLastActivityFilter] = useState<'today' | 'week' | 'month' | 'all'>('all');

  // Helper function to format app names
  const formatAppName = (name: string): string => {
    // Convert to title case for consistent formatting
    return name
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Extract unique values for filters
  const businessUnits = useMemo(() => {
    const units = new Set<string>();
    applications.forEach(app => units.add(app.businessUnit));
    return Array.from(units).sort();
  }, [applications]);

  const uniqueDomains = useMemo(() => {
    const domains = new Set<string>();
    applications.forEach(app => app.domains.forEach(domain => domains.add(domain)));
    return Array.from(domains).sort();
  }, [applications]);

  // Apply filters and sorting
  const filteredAndSortedApplications = useMemo(() => {
    // Filter applications
    let filtered = applications.filter(app => {
      // App name filter
      if (appNameFilter && !formatAppName(app.name).toLowerCase().includes(appNameFilter.toLowerCase())) {
        return false;
      }

      // App ID filter
      if (appIdFilter && !app.appId.toLowerCase().includes(appIdFilter.toLowerCase())) {
        return false;
      }

      // Criticality filter
      if (criticalityFilter && app.criticality !== criticalityFilter) {
        return false;
      }

      // Business unit filter
      if (businessUnitFilter && app.businessUnit !== businessUnitFilter) {
        return false;
      }

      // Domain filter (only for all-domains scope)
      if (currentScope === 'all-domains' && domainFilter && !app.domains.includes(domainFilter)) {
        return false;
      }

      // Owner filter (searchable text) - not shown in all-domains view
      if (currentScope !== 'all-domains' && ownerFilter && !app.owner.toLowerCase().includes(ownerFilter.toLowerCase())) {
        return false;
      }

      // Last activity filter
      if (lastActivityFilter !== 'all') {
        const now = new Date();
        const activityDate = new Date(app.lastActivityDate);
        const diffDays = Math.floor((now.getTime() - activityDate.getTime()) / (1000 * 60 * 60 * 24));

        if (lastActivityFilter === 'today' && diffDays > 0) return false;
        if (lastActivityFilter === 'week' && diffDays > 7) return false;
        if (lastActivityFilter === 'month' && diffDays > 30) return false;
      }

      return true;
    });

    // Sort applications
    filtered.sort((a, b) => {
      const modifier = sortDirection === 'asc' ? 1 : -1;

      switch (sortField) {
        case 'name':
          return modifier * a.name.localeCompare(b.name);
        case 'aggregatedRiskScore':
          return modifier * (a.aggregatedRiskScore - b.aggregatedRiskScore);
        case 'totalOpenItems':
          return modifier * (a.totalOpenItems - b.totalOpenItems);
        case 'lastActivityDate':
          return modifier * (new Date(a.lastActivityDate).getTime() - new Date(b.lastActivityDate).getTime());
        default:
          return 0;
      }
    });

    return filtered;
  }, [applications, appNameFilter, appIdFilter, criticalityFilter, businessUnitFilter, domainFilter, ownerFilter, lastActivityFilter, sortField, sortDirection]);

  // Paginate applications
  const paginatedApplications = useMemo(() => {
    const start = page * rowsPerPage;
    return filteredAndSortedApplications.slice(start, start + rowsPerPage);
  }, [filteredAndSortedApplications, page, rowsPerPage]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection(field === 'aggregatedRiskScore' || field === 'totalOpenItems' ? 'desc' : 'asc');
    }
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClearFilters = () => {
    setAppNameFilter('');
    setAppIdFilter('');
    setCriticalityFilter('');
    setBusinessUnitFilter('');
    setDomainFilter('');
    setOwnerFilter('');
    setLastActivityFilter('all');
    setPage(0);
  };

  const getRiskScoreBgColor = (score: number): string => {
    if (score >= 90) return '#d32f2f';         // Dark red background
    if (score >= 75) return '#f44336';         // Lighter red background (transitions from orange)
    if (score >= 60) return '#ff9800';         // Bright orange background
    if (score >= 40) return '#ffa726';         // Amber background
    return 'success.main';                     // Green background
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
    return `${Math.floor(diffDays / 30)}mo ago`;
  };

  const handleRowClick = (appId: string) => {
    if (arbName) {
      navigate(`/sme/arb/${arbName}/apps/${appId}`);
    } else {
      console.warn('[ApplicationWatchlist] Cannot navigate: arbName is not set');
    }
  };

  const getWatchlistTitle = (): string => {
    switch (currentScope) {
      case 'my-queue':
        return 'My Watchlist';
      case 'my-domain':
        return `${domainDisplayName} Watchlist`;
      case 'all-domains':
        return 'All Domains Watchlist';
      default:
        return 'My Watchlist';
    }
  };

  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 2 }}
      >
        <Typography variant="h6">
          {getWatchlistTitle()}
        </Typography>
        {headerAction}
      </Stack>

      {/* Filter Controls */}
      <Paper variant="outlined" sx={{ p: 2, mb: 2, borderRadius: 2 }}>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ flexWrap: 'nowrap', overflowX: 'auto' }}>
          <TextField
            label="App Name"
            variant="outlined"
            size="small"
            value={appNameFilter}
            onChange={(e) => setAppNameFilter(e.target.value)}
            sx={{ minWidth: 150 }}
          />
          <TextField
            label="App ID"
            variant="outlined"
            size="small"
            value={appIdFilter}
            onChange={(e) => setAppIdFilter(e.target.value)}
            sx={{ minWidth: 120 }}
          />
          {/* Owner filter - only for My Queue and My Domain */}
          {currentScope !== 'all-domains' && (
            <TextField
              label="Owner"
              variant="outlined"
              size="small"
              value={ownerFilter}
              onChange={(e) => setOwnerFilter(e.target.value)}
              sx={{ minWidth: 130 }}
            />
          )}
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
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Business Unit</InputLabel>
            <Select
              value={businessUnitFilter}
              label="Business Unit"
              onChange={(e) => setBusinessUnitFilter(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              {businessUnits.map((unit) => (
                <MenuItem key={unit} value={unit}>
                  {unit}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* Domain filter - only for All Domains */}
          {currentScope === 'all-domains' && (
            <FormControl size="small" sx={{ minWidth: 130 }}>
              <InputLabel>Domain</InputLabel>
              <Select
                value={domainFilter}
                label="Domain"
                onChange={(e) => setDomainFilter(e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                {uniqueDomains.map((domain) => (
                  <MenuItem key={domain} value={domain}>
                    {domain.charAt(0).toUpperCase() + domain.slice(1).replace(/_/g, ' ')}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Last Activity</InputLabel>
            <Select
              value={lastActivityFilter}
              label="Last Activity"
              onChange={(e) => setLastActivityFilter(e.target.value as any)}
            >
              <MenuItem value="all">All Time</MenuItem>
              <MenuItem value="today">Today</MenuItem>
              <MenuItem value="week">Last 7 Days</MenuItem>
              <MenuItem value="month">Last 30 Days</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="outlined"
            size="small"
            onClick={handleClearFilters}
            sx={{ whiteSpace: 'nowrap', minWidth: 100 }}
          >
            Clear All
          </Button>
        </Stack>
      </Paper>

      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table sx={{ minWidth: 650 }} size="medium">
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={sortField === 'name'}
                  direction={sortField === 'name' ? sortDirection : 'asc'}
                  onClick={() => handleSort('name')}
                >
                  Application
                </TableSortLabel>
              </TableCell>
              <TableCell>Business Unit</TableCell>
              {/* Domain column - only for All Domains */}
              {currentScope === 'all-domains' && <TableCell>Domain(s)</TableCell>}
              <TableCell>Product Owner</TableCell>
              <TableCell align="center">
                <TableSortLabel
                  active={sortField === 'aggregatedRiskScore'}
                  direction={sortField === 'aggregatedRiskScore' ? sortDirection : 'desc'}
                  onClick={() => handleSort('aggregatedRiskScore')}
                >
                  Risk Score
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">Risk Breakdown</TableCell>
              <TableCell align="center">
                <TableSortLabel
                  active={sortField === 'totalOpenItems'}
                  direction={sortField === 'totalOpenItems' ? sortDirection : 'desc'}
                  onClick={() => handleSort('totalOpenItems')}
                >
                  Open Items
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortField === 'lastActivityDate'}
                  direction={sortField === 'lastActivityDate' ? sortDirection : 'desc'}
                  onClick={() => handleSort('lastActivityDate')}
                >
                  Last Activity
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedApplications.map((app) => (
              <TableRow
                key={app.id}
                hover
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: 'action.hover'
                  }
                }}
                onClick={() => handleRowClick(app.appId)}
              >
                <TableCell sx={{ maxWidth: 350 }}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <CriticalityBadge criticality={app.criticality} />
                    <Box sx={{ minWidth: 0, flex: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5 }}>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 600,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            minWidth: 0,
                            flex: '0 1 auto'
                          }}
                        >
                          {formatAppName(app.name)}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            whiteSpace: 'nowrap',
                            flexShrink: 0
                          }}
                        >
                          ({app.appId})
                        </Typography>
                      </Box>
                      {app.hasAssignedRisks && (
                        <Chip
                          label="Assigned to me"
                          size="small"
                          color="primary"
                          sx={{ mt: 0.5, height: 18, fontSize: '0.7rem' }}
                        />
                      )}
                    </Box>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{app.businessUnit}</Typography>
                </TableCell>
                {/* Domain cell - only for All Domains */}
                {currentScope === 'all-domains' && (
                  <TableCell>
                    <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
                      {app.domains.map((domain) => (
                        <Chip
                          key={domain}
                          label={domain.charAt(0).toUpperCase() + domain.slice(1).replace(/_/g, ' ')}
                          size="small"
                          variant="outlined"
                          color="primary"
                          sx={{ fontSize: '0.7rem', height: 22 }}
                        />
                      ))}
                    </Stack>
                  </TableCell>
                )}
                <TableCell>
                  <Typography variant="body2">{app.owner}</Typography>
                </TableCell>
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
                      bgcolor: getRiskScoreBgColor(app.aggregatedRiskScore),
                      color: 'white',
                      fontWeight: 700,
                      fontSize: '1rem'
                    }}
                  >
                    {app.aggregatedRiskScore}
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Stack direction="row" spacing={0.5} justifyContent="center">
                    {app.riskBreakdown.critical > 0 && (
                      <Tooltip title={`${app.riskBreakdown.critical} Critical`}>
                        <Chip
                          label={app.riskBreakdown.critical}
                          size="small"
                          color="error"
                          sx={{ fontWeight: 600, minWidth: 32 }}
                        />
                      </Tooltip>
                    )}
                    {app.riskBreakdown.high > 0 && (
                      <Tooltip title={`${app.riskBreakdown.high} High`}>
                        <Chip
                          label={app.riskBreakdown.high}
                          size="small"
                          color="warning"
                          sx={{ fontWeight: 600, minWidth: 32 }}
                        />
                      </Tooltip>
                    )}
                    {app.riskBreakdown.medium > 0 && (
                      <Tooltip title={`${app.riskBreakdown.medium} Medium`}>
                        <Chip
                          label={app.riskBreakdown.medium}
                          size="small"
                          color="info"
                          sx={{ fontWeight: 600, minWidth: 32 }}
                        />
                      </Tooltip>
                    )}
                    {app.riskBreakdown.low > 0 && (
                      <Tooltip title={`${app.riskBreakdown.low} Low`}>
                        <Chip
                          label={app.riskBreakdown.low}
                          size="small"
                          color="success"
                          sx={{ fontWeight: 600, minWidth: 32 }}
                        />
                      </Tooltip>
                    )}
                  </Stack>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body1" sx={{ fontWeight: 700 }}>
                    {app.totalOpenItems}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    {formatDate(app.lastActivityDate)}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={filteredAndSortedApplications.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      {filteredAndSortedApplications.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            No applications found
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {applications.length === 0 ? (
              <>
                {currentScope === 'my-queue' && 'You have no assigned risks at this time'}
                {currentScope === 'my-domain' && 'No applications in your domain'}
                {currentScope === 'all-domains' && 'No applications available'}
              </>
            ) : (
              'Try adjusting your filters to see more results'
            )}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
