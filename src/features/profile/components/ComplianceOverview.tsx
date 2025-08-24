import React from 'react';
import {
    Paper,
    Stack,
    Typography,
    Grid,
    Box,
    Tooltip,
    Button,
    LinearProgress,
} from '@mui/material';
import {
    CheckCircle as CompliantIcon,
    Error as MissingIcon,
    Warning as PendingIcon,
    Block as BlockedIcon,
} from '@mui/icons-material';
import {
    severityColor,
    StatusSeverity,
} from '../../../components/shared/status';
import CriticalityBadge from '../../../components/CriticalityBadge';

interface AppKpiData {
    compliant: number;
    missing: number;
    pending: number;
    riskBlocked: number;
}

interface ComplianceOverviewProps {
    kpis?: AppKpiData;
    onKpiClick?: (kpiType: string) => void;
    appId?: string;
    useMockData?: boolean;
    // App info for criticality
    criticality?: string;
    appName?: string;
}

// Mock data variations
const MOCK_KPI_SCENARIOS: Record<string, AppKpiData> = {
    'CORR-12356': { compliant: 18, missing: 2, pending: 1, riskBlocked: 0 },
    'DEVTOOLS': { compliant: 5, missing: 15, pending: 6, riskBlocked: 4 },
    'default': { compliant: 12, missing: 8, pending: 3, riskBlocked: 2 }
};

const getMockKpiData = (appId?: string): AppKpiData => {
    return MOCK_KPI_SCENARIOS[appId || 'default'] || MOCK_KPI_SCENARIOS.default;
};

interface KpiCardProps {
    label: string;
    count: number;
    severity: StatusSeverity;
    tooltip: string;
    icon: React.ReactElement;
    onClick?: () => void;
}

function KpiCard({ label, count, severity, tooltip, icon, onClick }: KpiCardProps) {
    const color = severityColor[severity];
    
    return (
        <Tooltip title={tooltip}>
            <Paper 
                variant="outlined" 
                sx={{ 
                    p: 2, 
                    borderRadius: 2,
                    cursor: onClick ? 'pointer' : 'default',
                    transition: 'all 0.2s',
                    '&:hover': onClick ? {
                        transform: 'translateY(-1px)',
                        boxShadow: 2
                    } : {}
                }}
                onClick={onClick}
            >
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Box sx={{ color, display: 'flex' }}>
                        {icon}
                    </Box>
                    <Box>
                        <Typography variant="h5" fontWeight={700} color={color}>
                            {count}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            {label}
                        </Typography>
                    </Box>
                </Stack>
            </Paper>
        </Tooltip>
    );
}

export default function ComplianceOverview({ 
    kpis, 
    onKpiClick, 
    appId, 
    useMockData = false,
    criticality,
    appName 
}: ComplianceOverviewProps) {
    
    // Use mock data if specified or if no real data is available
    const mockData = getMockKpiData(appId);
    const activeKpis = useMockData ? mockData : (kpis || mockData);
    
    const total = activeKpis.compliant + activeKpis.missing + activeKpis.pending + activeKpis.riskBlocked;
    
    const kpiCards = [
        {
            label: 'Compliant',
            count: activeKpis.compliant,
            severity: 'success' as StatusSeverity,
            tooltip: 'Requirements with approved evidence',
            icon: <CompliantIcon />,
            kpiType: 'compliant'
        },
        {
            label: 'Missing',
            count: activeKpis.missing,
            severity: 'error' as StatusSeverity,
            tooltip: 'Requirements missing required evidence',
            icon: <MissingIcon />,
            kpiType: 'missing'
        },
        {
            label: 'Pending',
            count: activeKpis.pending,
            severity: 'warning' as StatusSeverity,
            tooltip: 'Evidence submitted and awaiting SME review',
            icon: <PendingIcon />,
            kpiType: 'pending'
        },
        {
            label: 'Blocked',
            count: activeKpis.riskBlocked,
            severity: 'info' as StatusSeverity,
            tooltip: 'Requirements blocked by risk or exception',
            icon: <BlockedIcon />,
            kpiType: 'blocked'
        },
    ];

    return (
        <Paper variant="outlined" sx={{ borderRadius: 3 }}>
            <Box sx={{ p: 2 }}>
                {/* Header with App Info */}
                <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                    <CriticalityBadge criticality={criticality || 'D'} />
                    <Stack>
                        <Typography variant="h6" fontWeight={700}>
                            Compliance Status
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {appName || appId} • {total} total requirements across all domains
                        </Typography>
                    </Stack>
                </Stack>


                {/* Always Visible KPI Cards */}
                <Grid container spacing={2} sx={{ mb: 2 }}>
                    {kpiCards.map((card) => (
                        <Grid key={card.kpiType} item xs={6} sm={3}>
                            <KpiCard
                                {...card}
                                onClick={onKpiClick ? () => onKpiClick(card.kpiType) : undefined}
                            />
                        </Grid>
                    ))}
                </Grid>

                {/* Quick Actions */}
                {(activeKpis.missing > 0 || activeKpis.pending > 0) && (
                    <Box sx={{ pt: 2, borderTop: 1, borderColor: 'grey.200' }}>
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                            <Typography variant="subtitle2" fontWeight={600}>
                                Quick Actions
                            </Typography>
                            <Stack direction="row" spacing={1}>
                                {activeKpis.missing > 0 && (
                                    <Button 
                                        variant="contained" 
                                        color="error" 
                                        size="small"
                                        onClick={() => onKpiClick?.('missing')}
                                    >
                                        Upload Evidence ({activeKpis.missing})
                                    </Button>
                                )}
                                {activeKpis.pending > 0 && (
                                    <Button 
                                        variant="outlined" 
                                        size="small"
                                        onClick={() => onKpiClick?.('pending')}
                                    >
                                        Review Status ({activeKpis.pending})
                                    </Button>
                                )}
                            </Stack>
                        </Stack>
                    </Box>
                )}
            </Box>
        </Paper>
    );
}