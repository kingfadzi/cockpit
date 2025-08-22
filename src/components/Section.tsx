import React from 'react';
import { Paper } from '@mui/material';

export default function Section({ children, padded = true }: { children: React.ReactNode; padded?: boolean }) {
  return (
    <Paper sx={{ p: padded ? 2 : 0 }}>
      {children}
    </Paper>
  );
}
