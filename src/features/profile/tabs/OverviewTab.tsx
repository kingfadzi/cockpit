import React from 'react';
import { 
    Stack, 
    Typography, 
    CircularProgress, 
    Alert, 
    Box,
    Button 
} from '@mui/material';
import { 
    Launch as LaunchIcon,
    Settings as ProfileIcon 
} from '@mui/icons-material';
import { useApp, useAppKpis } from '../../../api/hooks';
import EnhancedBusinessInfoCard from '../components/EnhancedBusinessInfoCard';
import ComplianceOverview from '../components/ComplianceOverview';

interface OverviewTabProps {
    appId: string;
    onTabChange?: (tab: string) => void;
}

export default function OverviewTab({ appId, onTabChange }: OverviewTabProps) {
    const { data: app, isLoading: appLoading, error: appError } = useApp(appId);
    const { data: kpis, isLoading: kpisLoading, error: kpisError } = useAppKpis(appId);
    
    // Mock summary properties until we get them from profile API
    const getMockSummaryData = (appId: string) => {
        if (appId === 'CORR-12356') return { materiality: 'crown_jewel', reviewDepth: 'full_review' };
        if (appId === 'DEVTOOLS') return { materiality: 'high', reviewDepth: 'scoped_review' };
        return { materiality: 'medium', reviewDepth: 'standard_review' };
    };

    const handleKpiClick = (kpiType: string) => {
        // Navigate to Profile tab with focus on relevant domains
        if (onTabChange) {
            onTabChange('profile');
        }
        console.log('Navigate to profile for KPI:', kpiType);
    };

    const handleViewProfileDetails = () => {
        if (onTabChange) {
            onTabChange('profile');
        }
    };

    if (appLoading || kpisLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                <CircularProgress />
                <Typography variant="body2" sx={{ ml: 2 }}>
                    Loading overview data...
                </Typography>
            </Box>
        );
    }

    if (appError) {
        return (
            <Alert severity="error">
                Failed to load application data. Please try again later.
            </Alert>
        );
    }

    if (kpisError) {
        return (
            <Alert severity="error">
                Failed to load KPI data. Please try again later.
            </Alert>
        );
    }

    if (!app) {
        return (
            <Alert severity="warning">
                No overview data available for app ID: {appId}
            </Alert>
        );
    }

    // Determine alert severity based on KPIs
    const shouldShowAlert = (kpis?.missing || 0) > 5 || (kpis?.riskBlocked || 0) > 0;
    const isCritical = (kpis?.missing || 0) > 10 || (kpis?.riskBlocked || 0) > 2;

    return (
        <Stack spacing={3}>
            {/* Critical Action Alert - Top of Page */}
            {shouldShowAlert && (
                <Alert 
                    severity={isCritical ? "error" : "warning"}
                    action={
                        <Button 
                            color="inherit" 
                            size="small" 
                            onClick={() => handleKpiClick('missing')}
                            variant="outlined"
                        >
                            Take Action
                        </Button>
                    }
                >
                    <Typography variant="body2">
                        <strong>
                            {isCritical ? 'Critical compliance gaps detected!' : 'Attention needed for compliance.'}
                        </strong>
                        {' '}
                        {(kpis?.missing || 0) > 0 && `${kpis?.missing} requirements missing evidence. `}
                        {(kpis?.riskBlocked || 0) > 0 && `${kpis?.riskBlocked} requirements are risk blocked. `}
                        Review the Profile tab for detailed information and upload missing evidence.
                    </Typography>
                </Alert>
            )}

            {/* Enhanced Business Information Card */}
            <EnhancedBusinessInfoCard 
                app={app}
                // Mock additional data until API is enhanced
                transactionCycle={appId === 'CORR-12356' ? 'T+1' : appId === 'DEVTOOLS' ? 'Real-time' : 'T+2'}
                appType={appId === 'CORR-12356' ? 'Core Banking' : appId === 'DEVTOOLS' ? 'Developer Tools' : 'Support System'}
                appTier={appId === 'CORR-12356' ? 'Tier 1' : 'Tier 2'}
                housePosition={appId === 'CORR-12356' ? 'Front Office' : 'Back Office'}
                parentAppId={appId !== 'PLATFORM-CORE' ? 'PLATFORM-CORE' : undefined}
                parentAppName={appId !== 'PLATFORM-CORE' ? 'Banking Platform Core' : undefined}
                hasChildren={appId === 'CORR-12356'}
            />

            {/* Combined Compliance Status and KPIs */}
            <ComplianceOverview 
                kpis={kpis} 
                onKpiClick={handleKpiClick}
                appId={appId}
                useMockData={!kpis}
                criticality={app?.criticality}
                appName={app?.name}
            />

            {/* Quick Navigation Actions */}
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                    variant="outlined"
                    startIcon={<ProfileIcon fontSize="small" />}
                    onClick={handleViewProfileDetails}
                >
                    View Full Compliance Profile
                </Button>
                <Button
                    variant="text"
                    endIcon={<LaunchIcon fontSize="small" />}
                    onClick={() => onTabChange?.('deployments')}
                >
                    View Deployments
                </Button>
                <Button
                    variant="text"
                    endIcon={<LaunchIcon fontSize="small" />}
                    onClick={() => onTabChange?.('external-links')}
                >
                    External Systems
                </Button>
            </Box>
        </Stack>
    );
}