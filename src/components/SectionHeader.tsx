import { Stack, Typography } from '@mui/material';
import React from 'react';

export default function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <Stack spacing={0.5} sx={{ mb: 2 }}>
      <Typography variant="h5">{title}</Typography>
      {subtitle && <Typography variant="body2" color="text.secondary">{subtitle}</Typography>}
    </Stack>
  );
}
