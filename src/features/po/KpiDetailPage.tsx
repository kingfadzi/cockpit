import React, { useState, useMemo } from 'react';
import { useParams, useNavigate, useSearchParams, Link as RouterLink } from 'react-router-dom';
import {
  Stack,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  Box,
  Button,
  Breadcrumbs,
  IconButton,
  Link,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Toolbar,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {
  ArrowBack as BackIcon,
  Home as HomeIcon
} from '@mui/icons-material';

import { useEvidenceSearch } from '../../api/hooks';
import { EvidenceSearchParams, EvidenceStateKey, WorkbenchEvidenceItem } from '../../api/types';
import { kpiConfigMap, KpiColumn } from './kpiConfig';

/**
 * A generic page that displays a list of evidence items based on a KPI type from the URL.
 * It uses a configuration file to dynamically set the title, description, and table columns.
 */
export default function KpiDetailPage() {
  const { kpiType = '' } = useParams<{ kpiType: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const config = kpiConfigMap[kpiType];

  const stateMap: Record<string, EvidenceStateKey> = {
    compliant: 'compliant',
    pending: 'pendingReview',
    missing: 'missingEvidence',
    riskBlocked: 'riskBlocked',
  };

  const evidenceState = stateMap[kpiType];

  // Server-side pagination and filter state
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Default page size
  const [localSearch, setLocalSearch] = useState('');
  const [criticalityFilter, setCriticalityFilter] = useState('');
  const [domainFilter, setDomainFilter] = useState('');
  const [controlFieldFilter, setControlFieldFilter] = useState('');

  // Build search parameters from URL and local filters
  const searchFilters: EvidenceSearchParams = {
    ...(evidenceState ? { state: evidenceState } : {}),
    search: searchParams.get('search') || localSearch || undefined,
    criticality: (searchParams.get('criticality') as 'A' | 'B' | 'C' | 'D') || (criticalityFilter as 'A' | 'B' | 'C' | 'D') || undefined,
    applicationType: searchParams.get('appType') || undefined,
    architectureType: searchParams.get('archType') || undefined,
    installType: searchParams.get('installType') || undefined,
    domain: domainFilter || undefined,
    fieldKey: controlFieldFilter || undefined,
    page,
    size: pageSize, // API expects 'size' not 'pageSize'
  };

  // Use the useEvidenceSearch hook with KPI-derived evidence state and URL filters
  const { data: evidenceSearchResult, isLoading, error } = useEvidenceSearch(searchFilters);

  // Extract items and pagination info from the search result
  const evidenceItems = evidenceSearchResult?.items || [];
  const totalItems = evidenceSearchResult?.total || 0;
  const currentPage = evidenceSearchResult?.page || 1;
  const currentPageSize = evidenceSearchResult?.pageSize || pageSize;

  // Handle filter changes (reset to page 1)
  const handleFilterChange = (filterType: string, value: string) => {
    setPage(1); // Reset to first page when filtering

    switch (filterType) {
      case 'search':
        setLocalSearch(value);
        break;
      case 'criticality':
        setCriticalityFilter(value);
        break;
      case 'domain':
        setDomainFilter(value);
        break;
      case 'controlField':
        setControlFieldFilter(value);
        break;
    }
  };

  // Handle pagination changes
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(1); // Reset to first page when changing page size
  };

  // If no config is found for the kpiType, show an error.
  if (!config) {
    return (
      <Alert severity="error">
        Invalid KPI type specified in the URL. Please check the link and try again.
      </Alert>
    );
  }

  // Transform our custom column config into the format required by MUI DataGrid
  const columns: GridColDef[] = config.columns.map((col: KpiColumn) => ({
    field: col.field,
    headerName: col.headerName,
    flex: col.flex || 1,
    renderCell: (params) => {
      // The params.row will be the WorkbenchEvidenceItem object
      const evidence = params.row as WorkbenchEvidenceItem;
      return col.renderCell ? col.renderCell(evidence) : evidence[col.field as keyof WorkbenchEvidenceItem];
    },
    // Disable sorting and filtering for action columns
    sortable: col.field !== 'actions',
    filterable: col.field !== 'actions',
  }));

  return (
    <Stack spacing={2}>
      {/* Breadcrumb Navigation */}
      <Stack direction="row" alignItems="center" spacing={1}>
        <IconButton
          onClick={() => navigate('/po')}
          size="small"
          sx={{ mr: 1 }}
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
              '&:hover': { color: 'primary.main' }
            }}
          >
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Portfolio
          </Link>
          <Typography color="text.primary" sx={{ display: 'flex', alignItems: 'center' }}>
            {config.pageTitle}
          </Typography>
        </Breadcrumbs>
      </Stack>

      {/* Page Header */}
      <Box>
        <Typography variant="h5">{config.pageTitle}</Typography>
        <Typography variant="body2" color="text.secondary">
          {config.description}
        </Typography>
      </Box>

      {/* Search and Filter Controls */}
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ xs: 'stretch', sm: 'center' }}>
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            value={localSearch}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            placeholder="Search apps, control fields, domains..."
            sx={{ minWidth: 250 }}
          />

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Criticality</InputLabel>
            <Select
              value={criticalityFilter}
              label="Criticality"
              onChange={(e) => handleFilterChange('criticality', e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="A">A</MenuItem>
              <MenuItem value="B">B</MenuItem>
              <MenuItem value="C">C</MenuItem>
              <MenuItem value="D">D</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Domain</InputLabel>
            <Select
              value={domainFilter}
              label="Domain"
              onChange={(e) => handleFilterChange('domain', e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Security">Security</MenuItem>
              <MenuItem value="Integrity">Integrity</MenuItem>
              <MenuItem value="Availability">Availability</MenuItem>
              <MenuItem value="Confidentiality">Confidentiality</MenuItem>
              <MenuItem value="Resilience">Resilience</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 180 }}>
            <InputLabel>Control Field</InputLabel>
            <Select
              value={controlFieldFilter}
              label="Control Field"
              onChange={(e) => handleFilterChange('controlField', e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="encryption_at_rest">Encryption At Rest</MenuItem>
              <MenuItem value="dependency_management">Dependency Management</MenuItem>
              <MenuItem value="secrets_management">Secrets Management</MenuItem>
              <MenuItem value="vulnerability_scan_report">Vulnerability Scan Report</MenuItem>
              <MenuItem value="backup_recovery_policy">Backup Recovery Policy</MenuItem>
              <MenuItem value="disaster_recovery_plan">Disaster Recovery Plan</MenuItem>
              <MenuItem value="incident_response_procedure">Incident Response Procedure</MenuItem>
              <MenuItem value="api_rate_limiting">API Rate Limiting</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="outlined"
            size="small"
            onClick={() => {
              setLocalSearch('');
              setCriticalityFilter('');
              setDomainFilter('');
              setControlFieldFilter('');
              setPage(1);
            }}
          >
            Clear Filters
          </Button>
        </Stack>
      </Paper>

      {/* Data Grid */}
      <Paper variant="outlined" sx={{ height: 700, width: '100%' }}>
        {isLoading && (
          <Stack alignItems="center" justifyContent="center" sx={{ height: '100%' }}>
            <CircularProgress />
            <Typography sx={{ mt: 2 }}>Loading evidence items...</Typography>
          </Stack>
        )}
        {error && (
          <Stack alignItems="center" justifyContent="center" sx={{ height: '100%' }}>
            <Alert severity="error" sx={{ m: 2 }}>
              Failed to load data: {String((error as any)?.message || error)}
            </Alert>
          </Stack>
        )}
        {!isLoading && !error && (
          <DataGrid
            rows={evidenceItems}
            columns={columns}
            getRowId={(row) => row.evidenceId}
            pagination
            paginationMode="server"
            paginationModel={{
              page: page - 1, // DataGrid uses 0-based pages, API uses 1-based
              pageSize: pageSize, // Use local state, not API response
            }}
            onPaginationModelChange={(model) => {
              handlePageChange(model.page + 1); // Convert back to 1-based for API
              if (model.pageSize !== pageSize) {
                handlePageSizeChange(model.pageSize);
              }
            }}
            rowCount={totalItems}
            pageSizeOptions={[10, 25, 50, 100]}
            disableRowSelectionOnClick
            autoHeight={false}
            loading={isLoading}
            sortingOrder={['desc', 'asc']}
            slots={{
              toolbar: () => (
                <Toolbar sx={{ justifyContent: 'space-between', minHeight: '48px !important' }}>
                  <Typography variant="body2" color="text.secondary">
                    Showing {evidenceItems.length} of {totalItems} items (Page {page} • Page Size: {pageSize})
                  </Typography>
                </Toolbar>
              ),
            }}
          />
        )}
      </Paper>
    </Stack>
  );
}
