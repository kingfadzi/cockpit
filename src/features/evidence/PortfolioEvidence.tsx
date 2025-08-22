import React, { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAllEvidence } from '../../api/hooks';
import { Typography, Stack } from '@mui/material';
import Section from '../../components/Section';
import StatusChip from '../../components/StatusChip';
import RightDrawer from '../../components/RightDrawer';

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export default function PortfolioEvidence() {
  const query = useQuery();
  const status = query.get('status') || '';
  const [selected, setSelected] = useState<any | null>(null);
  const { data, isLoading } = useAllEvidence();

  const filtered = useMemo(() => {
    let list = data || [];
    if (status) {
      list = list.filter((e) => (e.status || '') === status);
    }
    return list;
  }, [data, status]);

  const openDrawer = Boolean(selected) || (filtered.length === 1 && filtered[0]);

  const currentItem = selected || (filtered.length === 1 ? filtered[0] : null);

  return (
    <Stack spacing={2}>
      <Typography variant="h6">Portfolio Evidence {status && `– ${status}`}</Typography>
      {isLoading ? (
        <Typography>Loading…</Typography>
      ) : (
        <Stack spacing={1}>
          {filtered.map((e) => (
            <Section key={e.evidenceId}>
              <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between" onClick={() => setSelected(e)} sx={{ cursor: 'pointer' }}>
                <Stack>
                  <Typography variant="subtitle1">{e.appId} • {e.profileFieldKey || 'Unmapped Field'}</Typography>
                  <Typography variant="body2" color="text.secondary">{(e.type || '').toUpperCase()} • {e.uri || '—'}</Typography>
                </Stack>
                <StatusChip status={e.status || 'submitted'} />
              </Stack>
            </Section>
          ))}
          {!filtered.length && <Typography color="text.secondary">No evidence found for this filter.</Typography>}
        </Stack>
      )}

      <RightDrawer open={openDrawer} onClose={() => { setSelected(null); }}>
        <Typography variant="h6">Evidence Details</Typography>
        <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(currentItem, null, 2)}</pre>
      </RightDrawer>
    </Stack>
  );
}
