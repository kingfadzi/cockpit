import React from 'react';
import { Drawer, Toolbar, Box } from '@mui/material';

export default function RightDrawer({ open, onClose, children, width = 420 }: { open: boolean; onClose: () => void; children: React.ReactNode; width?: number }) {
  return (
    <Drawer anchor="right" open={open} onClose={onClose} sx={{ [`& .MuiDrawer-paper`]: { width } }}>
      <Toolbar />
      <Box sx={{ p: 2 }}>{children}</Box>
    </Drawer>
  );
}
