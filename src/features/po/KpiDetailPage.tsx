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

  // Local search and filter state
  const [localSearch, setLocalSearch] = useState('');
  const [criticalityFilter, setCriticalityFilter] = useState('');
  const [domainFilter, setDomainFilter] = useState('');
  const [controlFieldFilter, setControlFieldFilter] = useState('');

  // Build search parameters from URL
  const searchFilters: EvidenceSearchParams = {
    ...(evidenceState ? { state: evidenceState } : {}),
    search: searchParams.get('search') || undefined,
    criticality: searchParams.get('criticality') as 'A' | 'B' | 'C' | 'D' | undefined,
    applicationType: searchParams.get('appType') || undefined,
    architectureType: searchParams.get('archType') || undefined,
    installType: searchParams.get('installType') || undefined,
  };

  // Use the useEvidenceSearch hook with KPI-derived evidence state and URL filters
  const { data: evidenceItems, isLoading, error } = useEvidenceSearch(searchFilters);

  // Apply local filters to the evidence items
  const filteredEvidence = useMemo(() => {
    if (!evidenceItems) return [];

    return evidenceItems.filter(item => {
      // Local search filter (includes control field)
      if (localSearch) {
        const searchTerm = localSearch.toLowerCase();
        if (!item.appName.toLowerCase().includes(searchTerm) &&
            !item.fieldLabel.toLowerCase().includes(searchTerm) &&
            !item.domainTitle.toLowerCase().includes(searchTerm) &&
            !item.appId.toLowerCase().includes(searchTerm)) {
          return false;
        }
      }

      // Criticality filter
      if (criticalityFilter && item.appCriticality !== criticalityFilter) return false;

      // Domain filter
      if (domainFilter && item.domainTitle !== domainFilter) return false;

      // Control field filter
      if (controlFieldFilter && item.fieldLabel !== controlFieldFilter) return false;

      return true;
    });
  }, [evidenceItems, localSearch, criticalityFilter, domainFilter, controlFieldFilter]);

  // Get unique values for filter dropdowns
  const uniqueCriticalities = useMemo(() => {
    if (!evidenceItems) return [];
    return [...new Set(evidenceItems.map(item => item.appCriticality))].sort();
  }, [evidenceItems]);

  const uniqueDomains = useMemo(() => {
    if (!evidenceItems) return [];
    return [...new Set(evidenceItems.map(item => item.domainTitle))];
  }, [evidenceItems]);

  const uniqueControlFields = useMemo(() => {
    if (!evidenceItems) return [];
    return [...new Set(evidenceItems.map(item => item.fieldLabel))].sort();
  }, [evidenceItems]);

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
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Search apps, control fields, domains..."
            sx={{ minWidth: 250 }}
          />

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Criticality</InputLabel>
            <Select
              value={criticalityFilter}
              label="Criticality"
              onChange={(e) => setCriticalityFilter(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              {uniqueCriticalities.map((crit) => (
                <MenuItem key={crit} value={crit}>
                  {crit}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Domain</InputLabel>
            <Select
              value={domainFilter}
              label="Domain"
              onChange={(e) => setDomainFilter(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              {uniqueDomains.map((domain) => (
                <MenuItem key={domain} value={domain}>
                  {domain}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 180 }}>
            <InputLabel>Control Field</InputLabel>
            <Select
              value={controlFieldFilter}
              label="Control Field"
              onChange={(e) => setControlFieldFilter(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              {uniqueControlFields.map((field) => (
                <MenuItem key={field} value={field}>
                  {field}
                </MenuItem>
              ))}
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
            rows={filteredEvidence}
            columns={columns}
            getRowId={(row) => row.evidenceId}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 25 },
              },
            }}
            pageSizeOptions={[10, 25, 50, 100]}
            disableRowSelectionOnClick
            autoHeight={false}
            filterMode="client"
            sortingOrder={['desc', 'asc']}
            slots={{
              toolbar: () => (
                <Toolbar sx={{ justifyContent: 'space-between', minHeight: '48px !important' }}>
                  <Typography variant="body2" color="text.secondary">
                    Showing {filteredEvidence.length} of {evidenceItems?.length || 0} items
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
