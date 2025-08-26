import React, { useState } from 'react';
import {
    Paper,
    Stack,
    Typography,
    Grid,
    Box,
    Chip,
    Button,
    Link,
    Dialog,
    DialogTitle,
    DialogContent,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    IconButton,
} from '@mui/material';
import {
    Business as BusinessIcon,
    Architecture as ArchIcon,
    Category as TypeIcon,
    AccountTree as HierarchyIcon,
    Launch as ExternalIcon,
    Close as CloseIcon,
    Apps as ChildAppsIcon,
} from '@mui/icons-material';
import CriticalityBadge from '../../../components/CriticalityBadge';
import type { AppSummary } from '../../../api/types';
import { useChildApps, useApp } from '../../../api/hooks';

interface EnhancedBusinessInfoCardProps {
    app: AppSummary;
    // Mock data for additional fields until API is enhanced
    transactionCycle?: string;
    appType?: string;
    appTier?: string;
    housePosition?: string;
    parentAppId?: string;
    parentAppName?: string;
    hasChildren?: boolean;
}

interface InfoItemProps {
    icon?: React.ReactElement;
    label: string;
    value: string | React.ReactElement;
    isClickable?: boolean;
    onClick?: () => void;
}

function InfoItem({ icon, label, value, isClickable, onClick }: InfoItemProps) {
    const isNotAvailable = value === 'Not Available' || value === '—' || !value;
    
    return (
        <Box 
            sx={{ 
                cursor: isClickable ? 'pointer' : 'default',
                '&:hover': isClickable ? { bgcolor: 'grey.50', borderRadius: 1, p: 0.5, m: -0.5 } : {}
            }}
            onClick={onClick}
        >
            <Stack direction="row" spacing={1} alignItems="center">
                {icon && (
                    <Box sx={{ color: 'text.secondary', display: 'flex' }}>
                        {icon}
                    </Box>
                )}
                <Box>
                    <Typography variant="caption" color="text.secondary" display="block">
                        {label}
                    </Typography>
                    <Typography 
                        variant="body2" 
                        fontWeight={500} 
                        color={
                            isClickable ? 'primary.main' : 
                            isNotAvailable ? 'text.disabled' :
                            'inherit'
                        }
                        sx={{
                            fontStyle: isNotAvailable ? 'italic' : 'normal'
                        }}
                    >
                        {value || '—'}
                        {isClickable && <ExternalIcon sx={{ ml: 0.5 }} fontSize="inherit" />}
                    </Typography>
                </Box>
            </Stack>
        </Box>
    );
}

export default function EnhancedBusinessInfoCard({ 
    app, 
    transactionCycle = 'T+1',
    appType = 'Core Banking',
    appTier = 'Tier 1',
    housePosition = 'Front Office',
    parentAppId = 'PLATFORM-CORE',
    parentAppName = 'Banking Platform Core',
    hasChildren = true
}: EnhancedBusinessInfoCardProps) {
    const [childAppsOpen, setChildAppsOpen] = useState(false);
    const [parentAppOpen, setParentAppOpen] = useState(false);
    
    // Fetch child apps when needed
    const { data: childApps, isLoading: childAppsLoading } = useChildApps(childAppsOpen ? app.appId : '');
    
    // Fetch parent app when needed
    const { data: parentApp, isLoading: parentAppLoading } = useApp(parentAppOpen && parentAppId ? parentAppId : '');
    
    // Use real ratings from API with clear fallbacks for missing data
    const ratings = {
        confidentiality: app.confidentialityRating || 'Not Available', // Now available in API
        integrity: app.integrityRating || 'Not Available',
        availability: app.availabilityRating || 'Not Available', 
        security: app.securityRating || 'Not Available',
        resilience: app.resilienceRating || 'Not Available'
    };

    const handleParentAppClick = () => {
        setParentAppOpen(true);
    };

    const handleNavigateToParent = () => {
        if (parentAppId) {
            window.location.href = `/po/apps/${parentAppId}`;
            setParentAppOpen(false);
        }
    };

    const handleChildAppClick = (childAppId: string) => {
        // Navigate to child app profile
        window.location.href = `/po/apps/${childAppId}`;
        setChildAppsOpen(false);
    };

    return (
        <>
            <Stack direction="row" spacing={1.5}>
                {/* App Details Card */}
                <Paper variant="outlined" sx={{ flex: 1, p: 1.5, borderRadius: 2 }}>
                    <Stack spacing={1}>
                        {/* Header */}
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                            <Stack>
                                <Typography variant="subtitle1" fontWeight={700}>
                                    {app.name || app.appId}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {app.appId}
                                </Typography>
                            </Stack>
                            
                            {/* Hierarchy Navigation */}
                            <Stack direction="row" spacing={1}>
                                {parentAppId && (
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        startIcon={<HierarchyIcon fontSize="small" />}
                                        onClick={handleParentAppClick}
                                        sx={{ whiteSpace: 'nowrap', fontSize: '0.75rem' }}
                                    >
                                        Parent
                                    </Button>
                                )}
                                {hasChildren && (
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        startIcon={<ChildAppsIcon fontSize="small" />}
                                        onClick={() => setChildAppsOpen(true)}
                                        sx={{ whiteSpace: 'nowrap', fontSize: '0.75rem' }}
                                    >
                                        Children
                                    </Button>
                                )}
                            </Stack>
                        </Stack>

                        {/* Business Details */}
                        <Grid container spacing={0.5}>
                            <Grid item xs={4}>
                                <InfoItem label="Transaction Cycle" value={transactionCycle} />
                            </Grid>
                            <Grid item xs={4}>
                                <InfoItem label="App Type" value={appType} />
                            </Grid>
                            <Grid item xs={4}>
                                <InfoItem label="App Tier" value={appTier} />
                            </Grid>
                            <Grid item xs={4}>
                                <InfoItem label="House Position" value={housePosition} />
                            </Grid>
                            <Grid item xs={4}>
                                <InfoItem label="Architecture" value={app.architecture_type || '—'} />
                            </Grid>
                            <Grid item xs={4}>
                                <InfoItem label="Install Type" value={app.install_type || '—'} />
                            </Grid>
                        </Grid>
                    </Stack>
                </Paper>

                {/* Risk & Security Ratings Card */}
                <Paper variant="outlined" sx={{ flex: 1, p: 1.5, borderRadius: 2 }}>
                    <Stack spacing={1}>
                        <Typography variant="subtitle1" fontWeight={700}>
                            Risk & Security Ratings
                        </Typography>
                        
                        <Grid container spacing={0.5}>
                            <Grid item xs={4}>
                                <InfoItem label="Confidentiality" value={ratings.confidentiality} />
                            </Grid>
                            <Grid item xs={4}>
                                <InfoItem label="Integrity" value={ratings.integrity} />
                            </Grid>
                            <Grid item xs={4}>
                                <InfoItem label="Availability" value={ratings.availability} />
                            </Grid>
                            <Grid item xs={4}>
                                <InfoItem label="Security" value={ratings.security} />
                            </Grid>
                            <Grid item xs={4}>
                                <InfoItem label="Resilience" value={ratings.resilience} />
                            </Grid>
                        </Grid>
                    </Stack>
                </Paper>
            </Stack>

            {/* Child Apps Modal */}
            <Dialog 
                open={childAppsOpen} 
                onClose={() => setChildAppsOpen(false)}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography variant="h6">
                            Child Applications of {app.name || app.appId}
                        </Typography>
                        <IconButton onClick={() => setChildAppsOpen(false)} size="small">
                            <CloseIcon />
                        </IconButton>
                    </Stack>
                </DialogTitle>
                <DialogContent>
                    {childAppsLoading ? (
                        <Typography>Loading child applications...</Typography>
                    ) : !childApps || childApps.length === 0 ? (
                        <Typography color="text.secondary">No child applications found.</Typography>
                    ) : (
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Criticality</TableCell>
                                    <TableCell>Application</TableCell>
                                    <TableCell>App ID</TableCell>
                                    <TableCell align="right">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {childApps.map((child) => (
                                    <TableRow 
                                        key={child.appId}
                                        hover
                                        sx={{ cursor: 'pointer' }}
                                        onClick={() => handleChildAppClick(child.appId)}
                                    >
                                        <TableCell>
                                            <CriticalityBadge criticality={child.criticality || 'D'} />
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body2" fontWeight={600}>
                                                {child.name || child.appId}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body2" color="text.secondary">
                                                {child.appId}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Button 
                                                size="small" 
                                                variant="outlined"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleChildAppClick(child.appId);
                                                }}
                                            >
                                                View Profile
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </DialogContent>
            </Dialog>

            {/* Parent App Modal */}
            <Dialog 
                open={parentAppOpen} 
                onClose={() => setParentAppOpen(false)}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography variant="h6">
                            Parent Application of {app.name || app.appId}
                        </Typography>
                        <IconButton onClick={() => setParentAppOpen(false)} size="small">
                            <CloseIcon />
                        </IconButton>
                    </Stack>
                </DialogTitle>
                <DialogContent>
                    {parentAppLoading ? (
                        <Typography>Loading parent application...</Typography>
                    ) : !parentApp ? (
                        <Typography color="text.secondary">Parent application not found.</Typography>
                    ) : (
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Criticality</TableCell>
                                    <TableCell>Application</TableCell>
                                    <TableCell>App ID</TableCell>
                                    <TableCell>Business Service</TableCell>
                                    <TableCell align="right">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow 
                                    hover
                                    sx={{ cursor: 'pointer' }}
                                    onClick={handleNavigateToParent}
                                >
                                    <TableCell>
                                        <CriticalityBadge criticality={parentApp.criticality || 'D'} />
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2" fontWeight={600}>
                                            {parentApp.name || parentApp.appId}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2" color="text.secondary">
                                            {parentApp.appId}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2" color="text.secondary">
                                            {parentApp.businessServiceName || '—'}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Button 
                                            size="small" 
                                            variant="outlined"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleNavigateToParent();
                                            }}
                                        >
                                            View Profile
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
}