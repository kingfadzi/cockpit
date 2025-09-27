import React, { useState, useEffect } from 'react';
import {
    Alert,
    Box,
    Stack,
    Tabs,
    Tab,
} from '@mui/material';
import {
    Security as SecurityIcon,
    GppGood as IntegrityIcon,
    AvTimer as AvailabilityIcon,
    Bolt as ResilienceIcon,
    Assessment as CriticalityIcon,
} from '@mui/icons-material';
import { useSearchParams } from 'react-router-dom';
import type { ProfileResponse, ProfileDomain } from '../../../api/types';
import DomainTable from '../components/DomainTable';

type DomainTabValue = 'app_criticality_assessment' | 'security_rating' | 'confidentiality_rating' | 'integrity_rating' | 'availability_rating' | 'resilience_rating';

const DOMAIN_TAB_CONFIG = [
    { value: 'app_criticality_assessment', label: 'Criticality', icon: <CriticalityIcon fontSize="small" /> },
    { value: 'security_rating', label: 'Security', icon: <SecurityIcon fontSize="small" /> },
    { value: 'confidentiality_rating', label: 'Confidentiality', icon: <SecurityIcon fontSize="small" /> },
    { value: 'integrity_rating', label: 'Integrity', icon: <IntegrityIcon fontSize="small" /> },
    { value: 'availability_rating', label: 'Availability', icon: <AvailabilityIcon fontSize="small" /> },
    { value: 'resilience_rating', label: 'Resilience', icon: <ResilienceIcon fontSize="small" /> },
] as const;

interface ProfileTabProps {
    profile: ProfileResponse;
    appId?: string;
    onTabChange?: (tab: string) => void;
}

export default function ProfileTab({ profile, appId = '', onTabChange }: ProfileTabProps) {
    const [searchParams, setSearchParams] = useSearchParams();

    // Get all available domains
    const availableDomains = profile.domains;

    // Find the Summary domain first, then fallback to first available domain
    const summaryDomain = availableDomains.find(domain => domain.domainKey === 'app_criticality_assessment');
    const firstAvailableDomain = availableDomains.find(domain =>
        DOMAIN_TAB_CONFIG.some(config => config.value === domain.domainKey)
    );

    // Get subtab from URL params, default to summary/first available
    const subtabFromUrl = searchParams.get('subtab') as DomainTabValue;
    const defaultSubtab = summaryDomain ? 'app_criticality_assessment' : (firstAvailableDomain?.domainKey as DomainTabValue || 'app_criticality_assessment');

    const [activeDomainTab, setActiveDomainTab] = useState<DomainTabValue>(
        (subtabFromUrl && DOMAIN_TAB_CONFIG.some(config => config.value === subtabFromUrl)) ? subtabFromUrl : defaultSubtab
    );

    // Sync with URL params on mount/change
    useEffect(() => {
        const urlSubtab = searchParams.get('subtab') as DomainTabValue;
        if (urlSubtab && DOMAIN_TAB_CONFIG.some(config => config.value === urlSubtab) && urlSubtab !== activeDomainTab) {
            setActiveDomainTab(urlSubtab);
        }
    }, [searchParams, activeDomainTab]);

    const handleDomainTabChange = (_event: React.SyntheticEvent, newTab: DomainTabValue) => {
        setActiveDomainTab(newTab);
        // Update URL to include subtab parameter
        const currentParams = new URLSearchParams(searchParams);
        currentParams.set('subtab', newTab);
        setSearchParams(currentParams);
    };

    const renderDomainTabContent = () => {
        const selectedDomain = availableDomains.find(domain => domain.domainKey === activeDomainTab);
        
        if (!selectedDomain) {
            return <Alert severity="info">No data available for this domain.</Alert>;
        }

        return <DomainTable domain={selectedDomain} appId={appId} onTabChange={onTabChange} />;
    };

    if (!profile.domains || profile.domains.length === 0) {
        return <Alert severity="warning">No domains found in profile.</Alert>;
    }

    // Only show tabs for domains that actually exist in the profile, with ratings
    const visibleTabs = DOMAIN_TAB_CONFIG.filter(tabConfig => 
        availableDomains.some(domain => domain.domainKey === tabConfig.value)
    ).map(tabConfig => {
        const domain = availableDomains.find(d => d.domainKey === tabConfig.value);
        const rating = domain?.driverValue;
        return {
            ...tabConfig,
            label: rating ? `${tabConfig.label} (${rating})` : tabConfig.label
        };
    });

    return (
        <Stack spacing={0}>
            {/* Domain Sub-Navigation - Styled as child tabs */}
            <Box sx={{ 
                bgcolor: 'grey.50', 
                borderRadius: '8px 8px 0 0',
                border: '1px solid',
                borderColor: 'divider',
                borderBottom: 'none'
            }}>
                <Tabs
                    value={activeDomainTab}
                    onChange={handleDomainTabChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{ 
                        px: 1,
                        minHeight: 40,
                        '& .MuiTabs-indicator': { 
                            height: 2,
                            borderRadius: '2px 2px 0 0',
                            backgroundColor: 'primary.main'
                        },
                        '& .MuiTabs-flexContainer': {
                            gap: 0.5
                        }
                    }}
                >
                    {visibleTabs.map((tab) => (
                        <Tab
                            key={tab.value}
                            value={tab.value}
                            label={tab.label}
                            icon={tab.icon}
                            iconPosition="start"
                            sx={{ 
                                minHeight: 40,
                                minWidth: 120,
                                textTransform: 'none',
                                fontWeight: 500,
                                fontSize: '0.875rem',
                                px: 1.5,
                                py: 0.5,
                                mx: 0.25,
                                borderRadius: '6px 6px 0 0',
                                '&.Mui-selected': {
                                    bgcolor: 'background.paper',
                                    color: 'primary.main',
                                    fontWeight: 600
                                },
                                '&:hover:not(.Mui-selected)': {
                                    bgcolor: 'grey.100'
                                }
                            }}
                        />
                    ))}
                </Tabs>
            </Box>

            {/* Domain Tab Content */}
            <Box sx={{ 
                bgcolor: 'background.paper',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: '0 0 8px 8px',
                p: 2
            }}>
                {renderDomainTabContent()}
            </Box>
        </Stack>
    );
}