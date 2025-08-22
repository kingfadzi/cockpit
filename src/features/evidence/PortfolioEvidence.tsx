import React, { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Typography,
  Stack,
} from '@mui/material';
import Section from '../../components/Section';
import StatusChip from '../../components/StatusChip';
import RightDrawer from '../../components/RightDrawer';
import { useAllEvidence } from '../../api/hooks';

/**
 * Extracts query parameters from the URL.
 */
function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

/**
 * Shows evidence across all apps, filtered by status (via query param).
 * Clicking on a single result opens a right drawer with details.
 */
export default function PortfolioEvidence() {
  const query = useQuery();
  const status = query.get('status') || '';
  const [selected, setSelected] = useState<any | null>(null);
  const { data, isLoading } = useAllEvidence();

  // Filter evidence by status param
  const filtered = useMemo(() => {
    if (!status) return data || [];
    return (data || []).filter((e) => (e.status || '') === status);
  }, [data, status]);

  // Display right drawer if exactly one record matches
  const showDrawer = filtered.length === 1 && filtered[0];

  return (
      <Stack spacing={2}>
        <Typography variant="h6">
          Portfolio Evidence {status && `– ${status}`}
        </Typography>
        {isLoading ? (
            <Typography>Loading…</Typography>
        ) : (
            <Stack spacing={1}>
              {filtered.map((e) => (
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
                          {e.appId} • {e.profileFieldKey || 'Unmapped Field'}
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                          {(e.type || '').toUpperCase()} • {e.uri || '—'}
                        </Typography>
                      </Stack>
                      <StatusChip status={e.status || 'submitted'} />
                    </Stack>
                  </Section>
              ))}
              {!filtered.length && (
                  <Typography color="text.secondary">
                    No evidence found for this filter.
                  </Typography>
              )}
            </Stack>
        )}
        {/* Right drawer with full evidence detail */}
        <RightDrawer
            open={!!selected || showDrawer}
            onClose={() => setSelected(null)}
        >
          <Typography variant="h6">Evidence Details</Typography>
          <pre style={{ whiteSpace: 'pre-wrap' }}>
          {JSON.stringify(
              selected || (showDrawer ? filtered[0] : null),
              null,
              2,
          )}
        </pre>
        </RightDrawer>
      </Stack>
  );
}
