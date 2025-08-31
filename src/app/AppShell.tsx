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
 * Contains app title, search bar, and persona selector (PO/SME).
 * Removes the old side drawer entirely.
 */
export const AppShell: React.FC = () => {
    const [search, setSearch] = useState('');
    const [persona, setPersona] = useState<'PO' | 'SME'>('PO');
    const navigate = useNavigate();

    const handlePersonaChange = (newPersona: 'PO' | 'SME') => {
        setPersona(newPersona);
        if (newPersona === 'PO') {
            navigate('/po');
        } else {
            navigate('/sme');
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
                    {/* Persona selector */}
                    <Select
                        size="small"
                        value={persona}
                        onChange={(e) => handlePersonaChange(e.target.value as 'PO' | 'SME')}
                        sx={{ minWidth: 120 }}
                    >
                        <MenuItem value="PO">PO View</MenuItem>
                        <MenuItem value="SME">SME View</MenuItem>
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
