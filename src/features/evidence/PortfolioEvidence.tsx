import React, { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Typography,
  Stack,
  TextField,
  MenuItem,
  Grid,
  Button,
} from '@mui/material';
import Section from '../../components/Section';
import StatusChip from '../../components/StatusChip';
import RightDrawer from '../../components/RightDrawer';
import { useEvidenceSearch } from '../../api/hooks';
import { EvidenceSearchParams, EvidenceStateKey, WorkbenchEvidenceItem } from '../../api/types';

/**
 * Extracts query parameters from the URL.
 */
function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

/**
 * Shows evidence across all apps, filtered by various criteria.
 * Clicking on a single result opens a right drawer with details.
 */
export default function PortfolioEvidence() {
  const query = useQuery();
  const [selected, setSelected] = useState<WorkbenchEvidenceItem | null>(null);

  const statusToStateMap: Record<string, EvidenceStateKey> = {
    compliant: 'compliant',
    approved: 'compliant',
    'pending-review': 'pendingReview',
    pendingReview: 'pendingReview',
    pending: 'pendingReview',
    submitted: 'pendingReview',
    missing: 'missingEvidence',
    'missing-evidence': 'missingEvidence',
    missingEvidence: 'missingEvidence',
    riskBlocked: 'riskBlocked',
    'risk-blocked': 'riskBlocked',
  };

  const rawState = query.get('state') || query.get('status') || undefined;
  const initialState = rawState ? statusToStateMap[rawState] ?? (rawState as EvidenceStateKey) : undefined;
  const [filters, setFilters] = useState<EvidenceSearchParams>({
    state: initialState,
    approvalStatus: query.get('approvalStatus') || undefined,
    appId: query.get('appId') || undefined,
    criticality: (query.get('criticality') as 'A' | 'B' | 'C' | 'D') || undefined,
    applicationType: query.get('applicationType') || undefined,
    architectureType: query.get('architectureType') || undefined,
    installType: query.get('installType') || undefined,
    search: query.get('search') || undefined,
    domain: query.get('domain') || undefined,
    fieldKey: query.get('fieldKey') || undefined,
    assignedReviewer: query.get('assignedReviewer') || undefined,
    submittedBy: query.get('submittedBy') || undefined,
    limit: 50,
    offset: 0,
  });

  const { data, isLoading } = useEvidenceSearch(filters);

  const handleFilterChange = <K extends keyof EvidenceSearchParams>(field: K) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFilters({
      ...filters,
      [field]: (value === '' ? undefined : value) as EvidenceSearchParams[K],
    });
  };

  const handleReset = () => {
    setFilters({
      state: undefined,
      limit: 50,
      offset: 0,
    });
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h6">Portfolio Evidence</Typography>
      
      <Section>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Search"
              fullWidth
              value={filters.search || ''}
              onChange={handleFilterChange('search')}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Evidence State"
              fullWidth
              select
              value={filters.state || ''}
              onChange={(event) =>
                setFilters({
                  ...filters,
                  state: (event.target.value as EvidenceStateKey) || undefined,
                })
              }
            >
              <MenuItem value="">Any</MenuItem>
              <MenuItem value="compliant">Compliant</MenuItem>
              <MenuItem value="pendingReview">Pending Review</MenuItem>
              <MenuItem value="missingEvidence">Missing Evidence</MenuItem>
              <MenuItem value="riskBlocked">Risk Blocked</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Approval Status"
              fullWidth
              select
              value={filters.approvalStatus || ''}
              onChange={handleFilterChange('approvalStatus')}
            >
              <MenuItem value="">Any</MenuItem>
              <MenuItem value="approved">Approved</MenuItem>
              <MenuItem value="pending_review">Pending Review</MenuItem>
              <MenuItem value="rejected">Rejected</MenuItem>
              <MenuItem value="no_evidence">No Evidence</MenuItem>
              <MenuItem value="user_attested">User Attested</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="App ID"
              fullWidth
              value={filters.appId || ''}
              onChange={handleFilterChange('appId')}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Criticality"
              fullWidth
              select
              value={filters.criticality || ''}
              onChange={handleFilterChange('criticality')}
            >
              <MenuItem value="">Any</MenuItem>
              <MenuItem value="A">A</MenuItem>
              <MenuItem value="B">B</MenuItem>
              <MenuItem value="C">C</MenuItem>
              <MenuItem value="D">D</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Application Type"
              fullWidth
              value={filters.applicationType || ''}
              onChange={handleFilterChange('applicationType')}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Architecture Type"
              fullWidth
              value={filters.architectureType || ''}
              onChange={handleFilterChange('architectureType')}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Install Type"
              fullWidth
              value={filters.installType || ''}
              onChange={handleFilterChange('installType')}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Domain"
              fullWidth
              value={filters.domain || ''}
              onChange={handleFilterChange('domain')}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Field Key"
              fullWidth
              value={filters.fieldKey || ''}
              onChange={handleFilterChange('fieldKey')}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Assigned Reviewer"
              fullWidth
              value={filters.assignedReviewer || ''}
              onChange={handleFilterChange('assignedReviewer')}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Submitted By"
              fullWidth
              value={filters.submittedBy || ''}
              onChange={handleFilterChange('submittedBy')}
            />
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="flex-end">
            <Button onClick={handleReset} variant="outlined">
              Reset
            </Button>
          </Grid>
        </Grid>
      </Section>

      {isLoading ? (
        <Typography>Loading…</Typography>
      ) : (
        <Stack spacing={1}>
          {data?.map((e) => (
            <Section
              key={e.evidenceId}
              padded={true}
              onClick={() => setSelected(e)}
              style={{ cursor: 'pointer' }}
            >
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                justifyContent="space-between"
              >
                <Stack>
                  <Typography variant="subtitle1">
                    {e.appName} ({e.appId}) • {e.fieldLabel}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {e.domainTitle} • {e.uri || '—'}
                  </Typography>
                </Stack>
                <StatusChip status={e.status || 'submitted'} />
              </Stack>
            </Section>
          ))}
          {!data?.length && (
            <Typography color="text.secondary">
              No evidence found for this filter.
            </Typography>
          )}
        </Stack>
      )}
      {/* Right drawer with full evidence detail */}
      <RightDrawer
        open={!!selected}
        onClose={() => setSelected(null)}
      >
        <Typography variant="h6">Evidence Details</Typography>
        <pre style={{ whiteSpace: 'pre-wrap' }}>
          {JSON.stringify(selected, null, 2)}
        </pre>
      </RightDrawer>
    </Stack>
  );
}
