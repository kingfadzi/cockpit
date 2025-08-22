import React from 'react';
import { Stack, Typography, Card, CardContent } from '@mui/material';
import SectionHeader from '../../components/SectionHeader';

export default function SMEHome() {
  return (
    <Stack spacing={3}>
      <SectionHeader title="SME – Review Queue" subtitle="Evidence awaiting your review" />
      <Card>
        <CardContent>
          <Typography>Queue (placeholder). Later: list by App, Field, Submitted By, Age.</Typography>
        </CardContent>
      </Card>
    </Stack>
  );
}
