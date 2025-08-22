import React from 'react';
import { useProfile } from '../../api/hooks';
import { Typography, Grid, Card, CardContent, Stack, Link as MuiLink } from '@mui/material';

export default function ProfileView({ appId }: { appId: string }) {
  const { data, isLoading } = useProfile(appId);
  if (isLoading) return <Typography>Loading…</Typography>;
  if (!data) return <Typography color="text.secondary">No profile.</Typography>;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6">Application</Typography>
            <Stack spacing={0.5}>
              <Typography variant="body2">Business Service: {data.businessServiceName || '—'}</Typography>
              <Typography variant="body2">Parent App: {data.parentAppId || '—'}</Typography>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6">Service Instances</Typography>
            <ul style={{margin:0, paddingLeft:16}}>
              {(data.serviceInstances || []).map((s: any, idx: number) => <li key={idx}><Typography variant="body2">{s.env}: {s.name}</Typography></li>)}
            </ul>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6">Repositories</Typography>
            <ul style={{margin:0, paddingLeft:16}}>
              {(data.repos || []).map((r: any, idx: number) => <li key={idx}><MuiLink href={r.url} target="_blank" rel="noreferrer">{r.name}</MuiLink></li>)}
            </ul>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6">External References</Typography>
            <ul style={{margin:0, paddingLeft:16}}>
              {(data.externalRefs || []).map((r: any, idx: number) => <li key={idx}><Typography variant="body2">{r.system}: {r.key}</Typography></li>)}
            </ul>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6">Stakeholders</Typography>
            <ul style={{margin:0, paddingLeft:16}}>
              {(data.stakeholders || []).map((s: any, idx: number) => <li key={idx}><Typography variant="body2">{s.role}: {s.name}</Typography></li>)}
            </ul>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
