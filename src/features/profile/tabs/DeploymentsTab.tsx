import React from 'react';
import { Typography, Box } from '@mui/material';
import ReleasesTab from '../../releases/ReleasesTab';

interface DeploymentsTabProps {
    appId: string;
}

export default function DeploymentsTab({ appId }: DeploymentsTabProps) {
    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                Deployments & Releases
            </Typography>
            
            {/* Existing ReleasesTab component */}
            <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                    Releases
                </Typography>
                <ReleasesTab appId={appId} />
            </Box>

            {/* Placeholder for deployment history */}
            <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                    Deployment History
                </Typography>
                <Typography color="text.secondary">
                    Deployment history and CR tracking will be implemented in Phase 4.
                </Typography>
            </Box>
        </Box>
    );
}