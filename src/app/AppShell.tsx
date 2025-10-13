import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    TextField,
    Select,
    MenuItem,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

/**
 * Top-level shell with a single AppBar.
 * Contains app title, search bar, and view selector (PO/ARBs).
 * Removes the old side drawer entirely.
 */
export const AppShell: React.FC = () => {
    const [search, setSearch] = useState('');
    const [view, setView] = useState<string>('PO');
    const navigate = useNavigate();

    const handleViewChange = (newView: string) => {
        setView(newView);
        if (newView === 'PO') {
            navigate('/po');
        } else {
            // ARB views
            navigate(`/sme/arb/${newView}`);
        }
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Governance Cockpit
                    </Typography>
                    {/* Search bar (hidden on very small screens) */}
                    <TextField
                        variant="outlined"
                        size="small"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        sx={{ mr: 2, display: { xs: 'none', sm: 'flex' }, maxWidth: 200 }}
                        InputProps={{ endAdornment: <SearchIcon /> }}
                    />
                    {/* View selector */}
                    <Select
                        size="small"
                        value={view}
                        onChange={(e) => handleViewChange(e.target.value as string)}
                        sx={{ minWidth: 180 }}
                    >
                        <MenuItem value="PO">PO</MenuItem>
                        <MenuItem value="security">Security ARB</MenuItem>
                        <MenuItem value="data">Data ARB</MenuItem>
                        <MenuItem value="operations">Operations ARB</MenuItem>
                        <MenuItem value="enterprise_architecture">Enterprise Architecture ARB</MenuItem>
                    </Select>
                </Toolbar>
            </AppBar>
            {/* Offset main content by AppBar height */}
            <Box component="main" sx={{ p: 3, mt: 8 }}>
                <Outlet />
            </Box>
        </Box>
    );
};
