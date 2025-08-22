import React from 'react';
import { Paper } from '@mui/material';

/**
 * A reusable surface component that adds padding and subtle elevation.
 * Use for cards and list items to maintain consistent look and feel.
 */
export default function Section({
                                  children,
                                  padded = true,
                                }: {
  children: React.ReactNode;
  padded?: boolean;
}) {
  return (
      <Paper sx={{ p: padded ? 2 : 0 }}>
        {children}
      </Paper>
  );
}
