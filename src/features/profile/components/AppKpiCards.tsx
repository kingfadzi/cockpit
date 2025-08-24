import React from 'react';
import {
    Grid,
    Paper,
    Stack,
    Typography,
    Box,
    Tooltip,
    Button,
} from '@mui/material';
import {
    CheckCircle as CompliantIcon,
    Error as MissingIcon,
    Warning as PendingIcon,
    Block as BlockedIcon,
} from '@mui/icons-material';
import {
    severityIcon,
    severityColor,
    StatusSeverity,
} from '../../../components/shared/status';

interface AppKpiData {
    compliant: number;
    missing: number;
    pending: number;
    riskBlocked: number;
}

interface AppKpiCardsProps {
    kpis?: AppKpiData;
    onKpiClick?: (kpiType: string) => void;
    useMockData?: boolean;
    appId?: string; // For intelligent mock data selection
}

interface KpiCardProps {
    label: string;
    count: number;
    severity: StatusSeverity;
    tooltip: string;
    subtext: string;
    icon: React.ReactElement;
    onClick?: () => void;
}

function KpiCard({ label, count, severity, tooltip, subtext, icon, onClick }: KpiCardProps) {
    const color = severityColor[severity];
    
    return (
        <Tooltip title={tooltip}>
            <Paper 
                variant="outlined" 
                sx={{ 
                    p: 2, 
                    borderRadius: 3,
                    cursor: onClick ? 'pointer' : 'default',
                    transition: 'all 0.2s',
                    '&:hover': onClick ? {
                        transform: 'translateY(-1px)',
                        boxShadow: 2
                    } : {}
                }}
                onClick={onClick}
            >
                <Stack spacing={1}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <Box sx={{ color, display: 'flex' }}>
                            {icon}
                        </Box>
                        <Typography variant="subtitle2" fontWeight={600}>
                            {label}
                        </Typography>
                    </Stack>
                    
                    <Typography variant="h4" fontWeight={700} color={color}>
                        {count}
                    </Typography>
                    
                    <Typography variant="caption" color="text.secondary">
                        {subtext}
                    </Typography>
                </Stack>
            </Paper>
        </Tooltip>
    );
}

// Mock data variations for demonstration
const MOCK_KPI_SCENARIOS: Record<string, AppKpiData> = {
    'good': {
        compliant: 18,
        missing: 2,
        pending: 1,
        riskBlocked: 0
    },
    'average': {
        compliant: 12,
        missing: 8,
        pending: 3,
        riskBlocked: 2
    },
    'critical': {
        compliant: 5,
        missing: 15,
        pending: 6,
        riskBlocked: 4
    },
    'default': {
        compliant: 12,
        missing: 8,
        pending: 3,
        riskBlocked: 2
    }
};

// Helper function to get mock data based on app ID or scenario
const getMockKpiData = (appId?: string): AppKpiData => {
    if (appId === 'CORR-12356') return MOCK_KPI_SCENARIOS.good;
    if (appId === 'DEVTOOLS') return MOCK_KPI_SCENARIOS.critical;
    if (appId?.includes('PROD')) return MOCK_KPI_SCENARIOS.average;
    return MOCK_KPI_SCENARIOS.default;
};

export default function AppKpiCards({ kpis, onKpiClick, useMockData = false, appId }: AppKpiCardsProps) {
    // Use mock data if specified or if no real data is available
    const mockData = getMockKpiData(appId);
    const activeKpis = useMockData ? mockData : (kpis || mockData);
    const kpiCards = [
        {
            label: 'Compliant',
            count: activeKpis.compliant,
            severity: 'success' as StatusSeverity,
            tooltip: 'Requirements with approved evidence',
            subtext: 'Requirements met',
            icon: <CompliantIcon fontSize="small" />,
            kpiType: 'compliant'
        },
        {
            label: 'Missing Evidence',
            count: activeKpis.missing,
            severity: 'error' as StatusSeverity,
            tooltip: 'Requirements missing required evidence',
            subtext: 'Need attention',
            icon: <MissingIcon fontSize="small" />,
            kpiType: 'missing'
        },
        {
            label: 'Pending Review',
            count: activeKpis.pending,
            severity: 'warning' as StatusSeverity,
            tooltip: 'Evidence submitted and awaiting SME review',
            subtext: 'Under review',
            icon: <PendingIcon fontSize="small" />,
            kpiType: 'pending'
        },
        {
            label: 'Risk Blocked',
            count: activeKpis.riskBlocked,
            severity: 'info' as StatusSeverity,
            tooltip: 'Requirements blocked by risk or exception',
            subtext: 'Requires resolution',
            icon: <BlockedIcon fontSize="small" />,
            kpiType: 'blocked'
        },
    ];

    const total = activeKpis.compliant + activeKpis.missing + activeKpis.pending + activeKpis.riskBlocked;
    const compliancePercentage = total > 0 ? Math.round((activeKpis.compliant / total) * 100) : 0;

    return (
        <Stack spacing={2}>
            {/* Overall Compliance Summary */}
            <Paper variant="outlined" sx={{ p: 2, borderRadius: 3, bgcolor: 'grey.50' }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Stack>
                        <Typography variant="subtitle1" fontWeight={700}>
                            Compliance Overview
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {total} total requirements across all domains
                        </Typography>
                    </Stack>
                    <Box textAlign="center">
                        <Typography variant="h3" fontWeight={700} color={compliancePercentage >= 80 ? 'success.main' : compliancePercentage >= 60 ? 'warning.main' : 'error.main'}>
                            {compliancePercentage}%
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            Compliant
                        </Typography>
                    </Box>
                </Stack>
            </Paper>

            {/* KPI Cards Grid */}
            <Grid container spacing={2}>
                {kpiCards.map((card) => (
                    <Grid key={card.kpiType} item xs={12} sm={6} md={3}>
                        <KpiCard
                            {...card}
                            onClick={onKpiClick ? () => onKpiClick(card.kpiType) : undefined}
                        />
                    </Grid>
                ))}
            </Grid>

            {/* Quick Actions */}
            {(activeKpis.missing > 0 || activeKpis.pending > 0) && (
                <Paper variant="outlined" sx={{ p: 2, borderRadius: 3 }}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Stack>
                            <Typography variant="subtitle2" fontWeight={600}>
                                Quick Actions
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Address the most critical compliance gaps
                            </Typography>
                        </Stack>
                        <Stack direction="row" spacing={1}>
                            {activeKpis.missing > 0 && (
                                <Button 
                                    variant="contained" 
                                    color="error" 
                                    size="small"
                                    onClick={() => onKpiClick?.('missing')}
                                >
                                    Upload Evidence
                                </Button>
                            )}
                            {activeKpis.pending > 0 && (
                                <Button 
                                    variant="outlined" 
                                    size="small"
                                    onClick={() => onKpiClick?.('pending')}
                                >
                                    Review Status
                                </Button>
                            )}
                        </Stack>
                    </Stack>
                </Paper>
            )}
        </Stack>
    );
}