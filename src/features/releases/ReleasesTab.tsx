import React from 'react';
import { useReleases } from '../../api/hooks';
import { Typography, Table, TableHead, TableRow, TableCell, TableBody, Paper, TableContainer, Chip } from '@mui/material';

export default function ReleasesTab({ appId }: { appId: string }) {
  const { data, isLoading } = useReleases(appId);
  if (isLoading) return <Typography>Loading…</Typography>;
  if (!data?.length) return <Typography color="text.secondary">No releases.</Typography>;

  return (
    <TableContainer component={Paper} variant="outlined">
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Release</TableCell>
            <TableCell>Window Start</TableCell>
            <TableCell>Window End</TableCell>
            <TableCell>Gate</TableCell>
            <TableCell align="right">Missing</TableCell>
            <TableCell align="right">Expiring</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((r) => (
            <TableRow key={r.releaseId}>
              <TableCell>{r.releaseId}</TableCell>
              <TableCell>{r.windowStart}</TableCell>
              <TableCell>{r.windowEnd || '—'}</TableCell>
              <TableCell><Chip size="small" label={r.gateStatus} color={r.gateStatus === 'pass' ? 'success' : r.gateStatus === 'fail' ? 'error' : 'default'} /></TableCell>
              <TableCell align="right">{r.missingCount}</TableCell>
              <TableCell align="right">{r.expiringCount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
