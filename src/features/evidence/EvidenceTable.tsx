import React, { useState } from 'react';
import { Button, Divider, Stack, Typography } from '@mui/material';
import { useEvidence } from '../../api/hooks';
import EvidenceFormDialog from './EvidenceFormDialog';
import StatusChip from '../../components/StatusChip';
import Section from '../../components/Section';

export default function EvidenceTable({ appId }: { appId: string }) {
  const { data, isLoading } = useEvidence(appId);
  const [open, setOpen] = useState(false);

  return (
    <Stack spacing={2}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">Evidence</Typography>
        <Button variant="contained" onClick={() => setOpen(true)}>Add Evidence</Button>
      </Stack>
      {isLoading ? (
        <Typography>Loading…</Typography>
      ) : (
        <Stack spacing={1}>
          {data?.map((e) => (
            <Section key={e.evidenceId}>
              <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                <Stack>
                  <Typography variant="subtitle1">{e.profileFieldKey || 'Unmapped Field'}</Typography>
                  <Typography variant="body2" color="text.secondary">{(e.type || '').toUpperCase()} • {e.uri || '—'}</Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <StatusChip status={e.status || 'submitted'} />
                </Stack>
              </Stack>
            </Section>
          ))}
          {!data?.length && <Typography color="text.secondary">No evidence yet.</Typography>}
        </Stack>
      )}
      <Divider />
      <EvidenceFormDialog appId={appId} open={open} onClose={() => setOpen(false)} />
    </Stack>
  );
}
