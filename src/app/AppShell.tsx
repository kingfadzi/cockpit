import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Drawer, List, ListItemButton, ListItemText, Box, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from './auth';

const drawerWidth = 240;

export const AppShell: React.FC = () => {
  const [open, setOpen] = useState(true);
  const { has } = useAuth();
  const loc = useLocation();

  const items = [
    { label: 'PO Home', to: '/po', show: has('product_owner') },
    { label: 'SME Home', to: '/sme', show: has('control_sme') },
    { label: 'Search', to: '/search', show: true },
  ].filter((i) => i.show);

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (t) => t.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={() => setOpen((v) => !v)} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Governance Cockpit
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer variant="persistent" open={open} sx={{ width: drawerWidth, [`& .MuiDrawer-paper`]: { width: drawerWidth } }}>
        <Toolbar />
        <List>
          {items.map((it) => (
            <ListItemButton key={it.to} component={Link} to={it.to} selected={loc.pathname.startsWith(it.to)}>
              <ListItemText primary={it.label} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};
