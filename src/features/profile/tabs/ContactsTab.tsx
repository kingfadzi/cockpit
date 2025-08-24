import React from 'react';
import { Typography, Box } from '@mui/material';

interface ContactsTabProps {
    appId: string;
}

export default function ContactsTab({ appId }: ContactsTabProps) {
    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                Contacts & Stakeholders
            </Typography>
            <Typography color="text.secondary">
                App ID: {appId}
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 2 }}>
                Stakeholder management interface will be implemented in Phase 5.
                This will include contact details, roles, and communication options.
            </Typography>
        </Box>
    );
}