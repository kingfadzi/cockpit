import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import {
    Alert,
    Box,
    Chip,
    Paper,
    Stack,
    Typography,
    CircularProgress,
    Tabs,
    Tab,
    IconButton,
    Breadcrumbs,
    Link,
} from '@mui/material';
import {
    Dashboard as OverviewIcon,
    Security as ProfileIcon,
    Contacts as ContactsIcon,
    Description as EvidenceIcon,
    Warning as RiskIcon,
    ArrowBack as BackIcon,
    Home as HomeIcon,
} from '@mui/icons-material';
import { useProfile } from '../../api/hooks';
import OverviewTab from './tabs/OverviewTab';
import ProfileTab from './tabs/ProfileTab';
import ContactsTab from './tabs/ContactsTab';
import EvidenceTab from './tabs/EvidenceTab';
import RisksTab from './tabs/RisksTab';

const fmtDate = (iso?: string | null) => (iso ? new Date(iso).toLocaleDateString() : '—');

type TabValue = 'overview' | 'profile' | 'contacts' | 'evidence' | 'risks';

const TAB_CONFIG = [
    { value: 'overview', label: 'Overview', icon: <OverviewIcon fontSize="small" /> },
    { value: 'profile', label: 'Profile', icon: <ProfileIcon fontSize="small" /> },
    { value: 'risks', label: 'Risks', icon: <RiskIcon fontSize="small" /> },
    { value: 'evidence', label: 'Evidence', icon: <EvidenceIcon fontSize="small" /> },
    { value: 'contacts', label: 'Contacts', icon: <ContactsIcon fontSize="small" /> },
] as const;

export default function SMEProfilePage() {
    const { arbName, appId } = useParams<{ arbName: string; appId: string }>();
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const { data: profile, isLoading, error } = useProfile(appId!);

    // Get tab from URL params, default to 'risks' for SME workflow
    const tabFromUrl = searchParams.get('tab') as TabValue;
    const [activeTab, setActiveTab] = useState<TabValue>(
        tabFromUrl && TAB_CONFIG.some(t => t.value === tabFromUrl) ? tabFromUrl : 'risks'
    );

    // Update URL when tab changes
    const handleTabChange = (_event: React.SyntheticEvent, newTab: TabValue) => {
        setActiveTab(newTab);
        setSearchParams({ tab: newTab });
    };

    // Sync tab state with URL on mount/URL change
    useEffect(() => {
        const urlTab = searchParams.get('tab') as TabValue;
        if (urlTab && TAB_CONFIG.some(t => t.value === urlTab) && urlTab !== activeTab) {
            setActiveTab(urlTab);
        }
    }, [searchParams, activeTab]);

    // Get ARB display name
    const getArbDisplayName = (arb?: string) => {
        if (!arb) return 'ARB';
        const names: Record<string, string> = {
            'security': 'Security',
            'data': 'Data',
            'operations': 'Operations',
            'enterprise_architecture': 'Enterprise Architecture',
        };
        return names[arb] || arb;
    };

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Alert severity="error">
                Failed to load profile data. Please try again later.
            </Alert>
        );
    }

    if (!profile) {
        return (
            <Alert severity="warning">
                No profile data found for app ID: {appId}
            </Alert>
        );
    }

    const handleTabChangeFromChild = (newTab: string) => {
        const tabValue = newTab as TabValue;
        if (TAB_CONFIG.some(t => t.value === tabValue)) {
            setActiveTab(tabValue);
            setSearchParams({ tab: tabValue });
        }
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'overview':
                return <OverviewTab appId={appId!} onTabChange={handleTabChangeFromChild} />;
            case 'profile':
                return <ProfileTab profile={profile} appId={appId!} onTabChange={handleTabChangeFromChild} />;
            case 'evidence':
                return <EvidenceTab appId={appId!} />;
            case 'risks':
                return <RisksTab appId={appId!} userRole="sme" smeId="security_sme_001" />;
            case 'contacts':
                return <ContactsTab appId={appId!} />;
            default:
                return <OverviewTab appId={appId!} onTabChange={handleTabChangeFromChild} />;
        }
    };

    const arbDisplayName = getArbDisplayName(arbName);

    return (
        <Stack spacing={2}>
            {/* Breadcrumb Navigation */}
            <Stack direction="row" alignItems="center" spacing={1}>
                <IconButton
                    onClick={() => navigate(`/sme/arb/${arbName}`)}
                    size="small"
                    sx={{ mr: 1 }}
                >
                    <BackIcon />
                </IconButton>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link
                        underline="hover"
                        color="inherit"
                        onClick={() => navigate(`/sme/arb/${arbName}`)}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            cursor: 'pointer',
                            '&:hover': { color: 'primary.main' }
                        }}
                    >
                        <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                        {arbDisplayName} ARB
                    </Link>
                    <Typography color="text.primary" sx={{ display: 'flex', alignItems: 'center' }}>
                        {profile.name || appId}
                    </Typography>
                </Breadcrumbs>
            </Stack>


            {/* Tab Navigation */}
            <Paper variant="outlined" sx={{ borderRadius: 3 }}>
                <Tabs
                    value={activeTab}
                    onChange={handleTabChange}
                    sx={{
                        px: 2,
                        '& .MuiTabs-indicator': {
                            borderRadius: '2px 2px 0 0'
                        }
                    }}
                >
                    {TAB_CONFIG.map((tab) => (
                        <Tab
                            key={tab.value}
                            value={tab.value}
                            label={tab.label}
                            icon={tab.icon}
                            iconPosition="start"
                            sx={{
                                minHeight: 56,
                                textTransform: 'none',
                                fontWeight: 600
                            }}
                        />
                    ))}
                </Tabs>

                {/* Tab Content */}
                <Box sx={{ p: 2, pt: 3 }}>
                    {renderTabContent()}
                </Box>
            </Paper>
        </Stack>
    );
}
