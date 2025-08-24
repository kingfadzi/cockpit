import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
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
} from '@mui/material';
import {
    Dashboard as OverviewIcon,
    Security as ProfileIcon,
    Rocket as DeploymentsIcon,
    Contacts as ContactsIcon,
} from '@mui/icons-material';
import { useProfile } from '../../api/hooks';
import OverviewTab from './tabs/OverviewTab';
import ProfileTab from './tabs/ProfileTab';
import DeploymentsTab from './tabs/DeploymentsTab';
import ContactsTab from './tabs/ContactsTab';

const fmtDate = (iso?: string | null) => (iso ? new Date(iso).toLocaleDateString() : '—');

type TabValue = 'overview' | 'profile' | 'deployments' | 'contacts';

const TAB_CONFIG = [
    { value: 'overview', label: 'Overview', icon: <OverviewIcon fontSize="small" /> },
    { value: 'profile', label: 'Profile', icon: <ProfileIcon fontSize="small" /> },
    { value: 'deployments', label: 'Deployments', icon: <DeploymentsIcon fontSize="small" /> },
    { value: 'contacts', label: 'Contacts', icon: <ContactsIcon fontSize="small" /> },
] as const;

export default function POProfilePage() {
    const { appId } = useParams<{ appId: string }>();
    const [searchParams, setSearchParams] = useSearchParams();
    const { data: profile, isLoading, error } = useProfile(appId!);
    
    // Get tab from URL params, default to 'overview'
    const tabFromUrl = searchParams.get('tab') as TabValue;
    const [activeTab, setActiveTab] = useState<TabValue>(
        tabFromUrl && TAB_CONFIG.some(t => t.value === tabFromUrl) ? tabFromUrl : 'overview'
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

    const renderTabContent = () => {
        switch (activeTab) {
            case 'overview':
                return <OverviewTab appId={appId!} />;
            case 'profile':
                return <ProfileTab profile={profile} />;
            case 'deployments':
                return <DeploymentsTab appId={appId!} />;
            case 'contacts':
                return <ContactsTab appId={appId!} />;
            default:
                return <OverviewTab appId={appId!} />;
        }
    };

    return (
        <Stack spacing={2}>
            {/* App Header */}
            <Paper variant="outlined" sx={{ p: 2, borderRadius: 3 }}>
                <Stack spacing={0.5}>
                    <Typography variant="h5">{profile.name}</Typography>
                    <Stack direction="row" spacing={1}>
                        <Chip size="small" label={`App ID: ${profile.appId}`} />
                        <Chip size="small" variant="outlined" label={`Updated: ${fmtDate(profile.updatedAt)}`} />
                    </Stack>
                </Stack>
            </Paper>

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