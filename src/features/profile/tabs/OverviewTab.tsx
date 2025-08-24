import React from 'react';
import { Typography, Box } from '@mui/material';

interface OverviewTabProps {
    appId: string;
}

export default function OverviewTab({ appId }: OverviewTabProps) {
    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                Overview
            </Typography>
            <Typography color="text.secondary">
                App ID: {appId}
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 2 }}>
                Overview tab content will be implemented in Phase 2.
                This will include business info cards and KPI summary.
            </Typography>
        </Box>
    );
}