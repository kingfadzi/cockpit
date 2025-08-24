import React from 'react';
import {
    Paper,
    Stack,
    Typography,
    Grid,
    Box,
    Chip,
} from '@mui/material';
import {
    Business as BusinessIcon,
    Architecture as ArchIcon,
    Category as TypeIcon,
    Schedule as UpdatedIcon,
} from '@mui/icons-material';
import CriticalityBadge from '../../../components/CriticalityBadge';
import type { AppSummary } from '../../../api/types';

const fmtDate = (iso?: string | null) => (iso ? new Date(iso).toLocaleDateString() : '—');

interface BusinessInfoCardProps {
    app: AppSummary;
    updatedAt?: string;
}

interface InfoItemProps {
    icon: React.ReactElement;
    label: string;
    value: string | React.ReactElement;
}

function InfoItem({ icon, label, value }: InfoItemProps) {
    return (
        <Stack direction="row" spacing={1} alignItems="center">
            <Box sx={{ color: 'text.secondary', display: 'flex' }}>
                {icon}
            </Box>
            <Box>
                <Typography variant="caption" color="text.secondary" display="block">
                    {label}
                </Typography>
                <Typography variant="body2" fontWeight={500}>
                    {value}
                </Typography>
            </Box>
        </Stack>
    );
}

export default function BusinessInfoCard({ app, updatedAt }: BusinessInfoCardProps) {
    return (
        <Paper variant="outlined" sx={{ p: 2, borderRadius: 3 }}>
            <Stack spacing={2}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography variant="subtitle1" fontWeight={700}>
                        Business Information
                    </Typography>
                    <CriticalityBadge criticality={app.criticality || 'D'} />
                </Stack>

                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={3}>
                        <InfoItem
                            icon={<BusinessIcon fontSize="small" />}
                            label="Business Service"
                            value={app.businessServiceName || '—'}
                        />
                    </Grid>
                    
                    <Grid item xs={12} sm={6} md={3}>
                        <InfoItem
                            icon={<ArchIcon fontSize="small" />}
                            label="Architecture Type"
                            value={app.architecture_type || '—'}
                        />
                    </Grid>
                    
                    <Grid item xs={12} sm={6} md={3}>
                        <InfoItem
                            icon={<TypeIcon fontSize="small" />}
                            label="Install Type"
                            value={app.install_type || '—'}
                        />
                    </Grid>
                    
                    <Grid item xs={12} sm={6} md={3}>
                        <InfoItem
                            icon={<UpdatedIcon fontSize="small" />}
                            label="Last Updated"
                            value={fmtDate(updatedAt)}
                        />
                    </Grid>
                </Grid>

                {/* Additional metadata if available */}
                {app.name && app.name !== app.appId && (
                    <Box>
                        <Typography variant="caption" color="text.secondary">
                            Application Name
                        </Typography>
                        <Typography variant="body1" fontWeight={600}>
                            {app.name}
                        </Typography>
                    </Box>
                )}
            </Stack>
        </Paper>
    );
}