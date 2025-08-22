import React from 'react';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import { useRequirements } from '../../api/hooks';
import StatusChip from '../../components/StatusChip';

export default function ComplianceMatrix({ appId }: { appId: string }) {
  const { data, isLoading } = useRequirements(appId, {});
  if (isLoading) return <Typography>Loading…</Typography>;

  const groups = (data?.requirements || []).reduce<Record<string, any[]>>((acc, r) => {
    const key = r.status;
    acc[key] = acc[key] || [];
    acc[key].push(r);
    return acc;
  }, {});

  const statuses = ['met', 'missing', 'expiring', 'rejected'];

  return (
    <Grid container spacing={2}>
      {statuses.map((s) => (
        <Grid key={s} item xs={12} md={6} lg={3}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="subtitle1"><StatusChip status={s} /> {groups[s]?.length || 0}</Typography>
              <ul style={{ margin: 0, paddingLeft: 16 }}>
                {(groups[s] || []).slice(0, 8).map((r, i) => (
                  <li key={i}>
                    <Typography variant="body2">{r.label || r.fieldKey}</Typography>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
