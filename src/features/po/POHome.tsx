import React, { useState, useMemo } from 'react';
import {
  Grid,
  Stack,
  Typography,
  Button,
  Box,
  Tooltip,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import SectionHeader from '../../components/SectionHeader';
import Section from '../../components/Section';
import {
  severityIcon,
  severityColor,
  StatusSeverity,
} from '../../components/shared/status';
import CriticalityBadge from '../../components/CriticalityBadge';
import { useApps } from '../../api/hooks';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import AddApplicationDialog from './AddApplicationDialog';

// Type for KPI tiles
type Tile = {
  label: string;
  severity: StatusSeverity;
  count: number;
  tooltip: string;
  to: string;
  subtext: string;
};

// KPI tile component
function KpiTile({
  label,
  severity,
  count,
  tooltip,
  to,
  subtext,
}: Tile) {
  const navigate = useNavigate();
  const Icon = severityIcon[severity];
  const color = severityColor[severity];
  return (
    <Tooltip title={tooltip}>
      <Section padded={false}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: 120,
            p: 2,
            cursor: 'pointer',
          }}
          onClick={() => navigate(to)}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Icon style={{ width: 24, height: 24, color }} />
            <Typography variant="subtitle1" sx={{ ml: 1 }}>
              {label}
            </Typography>
          </Box>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ lineHeight: 1.2 }}
          >
            {subtext}
          </Typography>
          <Typography variant="h5" sx={{ mt: 'auto' }}>
            {count}
          </Typography>
        </Box>
      </Section>
    </Tooltip>
  );
}

export default function POHome() {
  const navigate = useNavigate();

  // Search/filter state
  const [search, setSearch] = useState('');
  const [criticalityFilter, setCriticalityFilter] = useState<'A' | 'B' | 'C' | 'D' | ''>('');
  const [applicationTypeFilter, setApplicationTypeFilter] = useState('');
  const [architectureTypeFilter, setArchitectureTypeFilter] = useState('');
  const [installTypeFilter, setInstallTypeFilter] = useState('');
  
  // Add application modal state
  const [addAppOpen, setAddAppOpen] = useState(false);

  // Create filter params for API call
  const filterParams = useMemo(() => ({
    search: search || undefined,
    criticality: criticalityFilter || undefined,
    applicationType: applicationTypeFilter || undefined,
    architectureType: architectureTypeFilter || undefined,
    installType: installTypeFilter || undefined,
  }), [search, criticalityFilter, applicationTypeFilter, architectureTypeFilter, installTypeFilter]);

  // Get all apps for filter options (unfiltered)
  const { data: allAppsData } = useApps();
  const allApps = allAppsData?.apps || [];

  // Get filtered apps and KPIs
  const { data: filteredAppsData, isLoading } = useApps(filterParams);
  const apps = filteredAppsData?.apps || [];
  const kpis = filteredAppsData?.kpis;
  
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

  // KPI tile definitions with backend-calculated counts and URLs
  const filterQuery = getFilterParams();
  const tiles: Tile[] = [
    {
      label: 'Compliant Evidence',
      severity: 'success',
      count: kpis?.compliant ?? 0,
      tooltip: 'Evidence items that have been approved and are meeting requirements',
      to: `/po/kpis/compliant${filterQuery ? `?${filterQuery}` : ''}`,
      subtext: 'Review approved items',
    },
    {
      label: 'Missing Evidence',
      severity: 'error',
      count: kpis?.missingEvidence ?? 0,
      tooltip: 'Evidence items that need to be uploaded or submitted',
      to: `/po/kpis/missing${filterQuery ? `?${filterQuery}` : ''}`,
      subtext: 'Upload required evidence',
    },
    {
      label: 'Pending Review',
      severity: 'warning',
      count: kpis?.pendingReview ?? 0,
      tooltip: 'Evidence items submitted and awaiting SME review',
      to: `/po/kpis/pending${filterQuery ? `?${filterQuery}` : ''}`,
      subtext: 'Follow up on reviews',
    },
    {
      label: 'Risk Blocked Evidence',
      severity: 'info',
      count: kpis?.riskBlocked ?? 0,
      tooltip: 'Evidence items that are blocked due to risks and need remediation',
      to: `/po/kpis/riskBlocked${filterQuery ? `?${filterQuery}` : ''}`,
      subtext: 'Fix and resubmit',
    },
  ];

  return (
    <Stack spacing={2}>
      {/* Section heading + KPI cards tightly grouped */}
      <Stack spacing={0.5}>
        <Typography variant="h6" sx={{ m: 0 }}>
          Status Overview
        </Typography>

        {/* Filters wrapped in Section for visual symmetry */}
        <Section>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            alignItems={{ xs: 'stretch', sm: 'center' }}
          >
            {/* Filters */}
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

            {/* Clear All button */}
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
        </Section>

        <Grid container spacing={1.5}>
          {tiles.map((tile) => (
            <Grid key={tile.label} item xs={12} sm={6} md={3}>
              <KpiTile {...tile} />
            </Grid>
          ))}
        </Grid>
      </Stack>

      {/* Applications heading with Add button */}
      <Stack 
        direction="row" 
        justifyContent="space-between" 
        alignItems="center"
        sx={{ mt: 2 }}
      >
        <Typography variant="h6">
          Your Applications
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => setAddAppOpen(true)}
        >
          Add Application
        </Button>
      </Stack>

      {/* Applications grid */}
      {isLoading ? (
        <Typography>Loading apps…</Typography>
      ) : (
        <Grid container spacing={2}>
          {apps.map((app) => (
            <Grid key={app.appId} item xs={12} sm={6} md={4}>
              <Section>
                <Stack spacing={1}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <CriticalityBadge criticality={app.criticality || 'D'} />
                    <Typography 
                      variant="subtitle1"
                      sx={{ 
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        flex: 1
                      }}
                    >
                      {app.name || app.appId} 
                      <Typography 
                        component="span" 
                        variant="body2"
                        color="text.secondary"
                      >
                        ({app.appId})
                      </Typography>
                    </Typography>
                  </Stack>
                  <Typography variant="body2" color="text.secondary">
                    Application Type: {app.applicationType || '—'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Install Type: {(app as any).install_type || '—'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Architecture: {app.architecture_type || '—'}
                  </Typography>

                  {/* OPEN -> go straight to Profile tab */}
                  <Button
                      size="small"
                      variant="contained"
                      component={RouterLink}
                      to={`/po/apps/${app.appId}`}   // ← lands on AppProfilePage
                      sx={{ mt: 1 }}
                  >
                    Open
                  </Button>

                </Stack>
              </Section>
            </Grid>
          ))}

          {!apps.length && (
            <Typography color="text.secondary">
              No applications match your filters.
            </Typography>
          )}
        </Grid>
      )}

      {/* Add Application Dialog */}
      <AddApplicationDialog
        open={addAppOpen}
        onClose={() => setAddAppOpen(false)}
        onSuccess={(appId) => navigate(`/po/apps/${appId}`)}
      />
    </Stack>
  );
}