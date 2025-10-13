import React, { useState } from 'react';
import { Stack, Card, Tabs, Tab } from '@mui/material';
import {
    Dashboard as DashboardIcon,
    List as ListIcon,
    Assignment as AssignmentIcon,
} from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import SectionHeader from '../../components/SectionHeader';
import ArbDashboardView from './views/ArbDashboardView';
import DomainRiskListView from './views/DomainRiskListView';
import DomainRiskDetailView from './views/DomainRiskDetailView';

export default function ArbHome() {
    const { arbName } = useParams<{ arbName: string }>();
    const [currentTab, setCurrentTab] = useState(0);
    const [selectedDomainRiskId, setSelectedDomainRiskId] = useState<string | null>(null);

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

    // Handle selecting a domain risk from the list
    const handleSelectDomainRisk = (domainRiskId: string) => {
        setSelectedDomainRiskId(domainRiskId);
        setCurrentTab(2); // Switch to detail view tab
    };

    // Handle back from detail view
    const handleBackToList = () => {
        setSelectedDomainRiskId(null);
        setCurrentTab(1); // Switch back to list view tab
    };

    if (!arbName) {
        return (
            <Stack spacing={3}>
                <SectionHeader
                    title="ARB Dashboard"
                    subtitle="Invalid ARB name"
                />
            </Stack>
        );
    }

    const displayName = getArbDisplayName(arbName);

    return (
        <Stack spacing={3}>
            <SectionHeader
                title={`${displayName} ARB Dashboard`}
                subtitle="Strategic view of domain risks and compliance across applications"
                icon={<DashboardIcon />}
            />

            {/* Tab Navigation */}
            <Card variant="outlined">
                <Tabs
                    value={currentTab}
                    onChange={(_, newValue) => setCurrentTab(newValue)}
                    sx={{ borderBottom: 1, borderColor: 'divider', px: 2 }}
                >
                    <Tab
                        label="Dashboard"
                        icon={<DashboardIcon />}
                        iconPosition="start"
                        sx={{ textTransform: 'none', fontWeight: 600 }}
                    />
                    <Tab
                        label="Domain Risks"
                        icon={<ListIcon />}
                        iconPosition="start"
                        sx={{ textTransform: 'none', fontWeight: 600 }}
                    />
                    {selectedDomainRiskId && (
                        <Tab
                            label="Risk Detail"
                            icon={<AssignmentIcon />}
                            iconPosition="start"
                            sx={{ textTransform: 'none', fontWeight: 600 }}
                        />
                    )}
                </Tabs>
            </Card>

            {/* Tab Content */}
            {currentTab === 0 && (
                <ArbDashboardView arbName={arbName} />
            )}

            {currentTab === 1 && (
                <DomainRiskListView
                    arbName={arbName}
                    onSelectDomainRisk={handleSelectDomainRisk}
                />
            )}

            {currentTab === 2 && selectedDomainRiskId && (
                <DomainRiskDetailView
                    domainRiskId={selectedDomainRiskId}
                    onBack={handleBackToList}
                />
            )}
        </Stack>
    );
}
