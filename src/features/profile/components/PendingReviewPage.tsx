import React, { useState } from 'react';
import {
    Alert,
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    LinearProgress,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material';
import {
    TrendingUp as TrendingUpIcon,
    TrendingDown as TrendingDownIcon,
    Schedule as ScheduleIcon,
    Security as SecurityIcon,
    Business as BusinessIcon,
    Speed as SpeedIcon,
    Lightbulb as LightbulbIcon,
    Assignment as AssignmentIcon,
    Close as CloseIcon,
    PlayArrow as PlayArrowIcon,
    Star as StarIcon,
    Warning as WarningIcon,
    CheckCircle as CheckCircleIcon,
    Assignment as CertificationIcon,
    Timeline as TimelineIcon,
    Bolt as BoltIcon,
} from '@mui/icons-material';

// Enhanced types focused on compliance posture
type ComplianceImpact = {
    certificationName: string;
    riskLevel: 'critical' | 'high' | 'medium' | 'low';
    daysToDeadline: number;
    customerImpact: string;
    businessValue: string;
};

type ActionSignal = {
    signalId: string;
    type: 'critical_path' | 'quick_win' | 'escalation_needed' | 'optimization';
    title: string;
    description: string;
    effort: 'low' | 'medium' | 'high';
    impact: 'critical' | 'high' | 'medium';
    recommendedAction: string;
    timeToResolve: string;
    successStory?: string;
};

type PendingReview = {
    fieldId: string;
    fieldName: string;
    complianceImpacts: ComplianceImpact[];
    daysInReview: number;
    reviewStatus: 'queued' | 'in_review' | 'needs_clarification' | 'overdue';
    smeContact: {
        name: string;
        specialty: string;
        avgResponseTime: string;
        currentWorkload: number;
    };
    evidenceType: string;
    submittedDate: string;
    lastActivity: string;
    similarApps: string[];
    quickWinPotential: boolean;
    blocksOtherFields: string[];
};

// Mock data focused on compliance posture
const COMPLIANCE_SCORE = 78; // Current app compliance score
const COMPLIANCE_TREND = 'up'; // 'up' | 'down' | 'stable'
const SCORE_CHANGE = '+5'; // Points change this month

const COMPLIANCE_IMPACTS: ComplianceImpact[] = [
    {
        certificationName: 'SOC2 Type II Renewal',
        riskLevel: 'critical',
        daysToDeadline: 28,
        customerImpact: '3 enterprise deals worth $2.1M waiting on certification',
        businessValue: 'Enables expansion into regulated industries'
    },
    {
        certificationName: 'ISO 27001 Annual Review',
        riskLevel: 'high',
        daysToDeadline: 45,
        customerImpact: 'Required for European customer contracts',
        businessValue: 'Maintains competitive advantage in EU market'
    },
    {
        certificationName: 'GDPR Compliance Audit',
        riskLevel: 'medium',
        daysToDeadline: 60,
        customerImpact: 'Affects data processing agreements with 12 customers',
        businessValue: 'Avoids €20M potential regulatory fines'
    }
];

const ACTION_SIGNALS: ActionSignal[] = [
    {
        signalId: 'critical_001',
        type: 'critical_path',
        title: 'Encryption Review Blocks SOC2',
        description: 'This field is on the critical path for SOC2 renewal - delays here cascade to other reviews',
        effort: 'low',
        impact: 'critical',
        recommendedAction: 'Provide AWS console screenshots showing encryption enabled',
        timeToResolve: '2 hours',
        successStory: 'App "TradingPlatform" used similar evidence and got approved in 1 day'
    },
    {
        signalId: 'quickwin_001',
        type: 'quick_win',
        title: 'Reuse Backup Evidence from ProdApp',
        description: 'Your backup strategy is identical to ProdApp which was recently approved',
        effort: 'low',
        impact: 'medium',
        recommendedAction: 'Copy evidence from ProdApp and reference their approval',
        timeToResolve: '30 minutes'
    },
    {
        signalId: 'escalation_001',
        type: 'escalation_needed',
        title: 'Data Retention Review Stalled',
        description: 'Review has been stalled for 12 days - SME may be overloaded',
        effort: 'medium',
        impact: 'high',
        recommendedAction: 'Escalate to compliance team lead or reassign to available SME',
        timeToResolve: '1 day'
    },
    {
        signalId: 'optimization_001',
        type: 'optimization',
        title: 'Batch Similar Security Reviews',
        description: '3 security fields could be reviewed together by same SME',
        effort: 'low',
        impact: 'medium',
        recommendedAction: 'Request batch review from Sarah Chen to accelerate timeline',
        timeToResolve: '1 hour coordination'
    }
];

const PENDING_REVIEWS: PendingReview[] = [
    {
        fieldId: 'enc_at_rest_001',
        fieldName: 'Encryption at Rest Implementation',
        complianceImpacts: [COMPLIANCE_IMPACTS[0]], // SOC2
        daysInReview: 3,
        reviewStatus: 'in_review',
        smeContact: {
            name: 'Sarah Chen',
            specialty: 'Cloud Security',
            avgResponseTime: '1.5 days',
            currentWorkload: 8
        },
        evidenceType: 'AWS Console Screenshots',
        submittedDate: '2025-08-28T10:30:00Z',
        lastActivity: '2025-09-01T14:20:00Z',
        similarApps: ['TradingPlatform', 'CustomerPortal'],
        quickWinPotential: true,
        blocksOtherFields: ['key_rotation', 'secrets_management']
    },
    {
        fieldId: 'backup_policy_002',
        fieldName: 'Database Backup Strategy',
        complianceImpacts: [COMPLIANCE_IMPACTS[0], COMPLIANCE_IMPACTS[1]], // SOC2 + ISO27001
        daysInReview: 7,
        reviewStatus: 'needs_clarification',
        smeContact: {
            name: 'Alex Rodriguez',
            specialty: 'Infrastructure Resilience',
            avgResponseTime: '2.1 days',
            currentWorkload: 12
        },
        evidenceType: 'Automation Scripts + Test Results',
        submittedDate: '2025-08-30T16:45:00Z',
        lastActivity: '2025-09-02T09:15:00Z',
        similarApps: ['ProdApp'],
        quickWinPotential: true,
        blocksOtherFields: ['disaster_recovery', 'rto_compliance']
    },
    {
        fieldId: 'data_retention_003',
        fieldName: 'Customer Data Retention Policy',
        complianceImpacts: [COMPLIANCE_IMPACTS[2]], // GDPR
        daysInReview: 12,
        reviewStatus: 'overdue',
        smeContact: {
            name: 'Robert Taylor',
            specialty: 'Data Privacy',
            avgResponseTime: '4.1 days',
            currentWorkload: 18
        },
        evidenceType: 'Policy Document + Implementation Guide',
        submittedDate: '2025-08-24T15:30:00Z',
        lastActivity: '2025-08-28T10:15:00Z',
        similarApps: [],
        quickWinPotential: false,
        blocksOtherFields: ['data_processing_agreements']
    }
];

const getImpactColor = (level: string) => {
    switch (level) {
        case 'critical': return 'error';
        case 'high': return 'warning';
        case 'medium': return 'info';
        case 'low': return 'success';
        default: return 'default';
    }
};

const getSignalTypeColor = (type: string) => {
    switch (type) {
        case 'critical_path': return 'error';
        case 'quick_win': return 'success';
        case 'escalation_needed': return 'warning';
        case 'optimization': return 'info';
        default: return 'default';
    }
};

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
    });
};

export default function PendingReviewPage() {
    const [selectedSignal, setSelectedSignal] = useState<ActionSignal | null>(null);
    const [actionDialogOpen, setActionDialogOpen] = useState(false);

    // Calculate compliance metrics
    const criticalImpacts = COMPLIANCE_IMPACTS.filter(i => i.riskLevel === 'critical');
    const nearestDeadline = Math.min(...COMPLIANCE_IMPACTS.map(i => i.daysToDeadline));
    const totalBusinessValue = COMPLIANCE_IMPACTS.reduce((sum, impact) => {
        const value = impact.businessValue.match(/\$?([\d.]+)M?/);
        return sum + (value ? parseFloat(value[1]) : 0);
    }, 0);

    const handleTakeAction = (signal: ActionSignal) => {
        console.log('Taking action on signal:', signal.signalId);
        setActionDialogOpen(false);
        // In real implementation, this would trigger the recommended action
    };

    return (
        <Stack spacing={3}>
            {/* Compliance Posture Header */}
            <Paper variant="outlined" sx={{ p: 3, borderRadius: 2, bgcolor: 'gradient.primary' }}>
                <Grid container spacing={3} alignItems="center">
                    <Grid item xs={12} md={8}>
                        <Stack spacing={2}>
                            <Typography variant="h4" color="primary.main">
                                MyPaymentApp - Compliance Posture
                            </Typography>
                            <Stack direction="row" spacing={4} alignItems="center">
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <Typography variant="h2" color="primary.main">{COMPLIANCE_SCORE}%</Typography>
                                    {COMPLIANCE_TREND === 'up' ? (
                                        <TrendingUpIcon color="success" />
                                    ) : (
                                        <TrendingDownIcon color="error" />
                                    )}
                                    <Typography variant="body2" color="success.main">
                                        {SCORE_CHANGE} this month
                                    </Typography>
                                </Stack>
                                <Stack spacing={0.5}>
                                    <Typography variant="body2" color="text.secondary">
                                        Next milestone: <strong>85% for SOC2 renewal</strong>
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {PENDING_REVIEWS.length} pending reviews could add +7% to score
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card variant="outlined" sx={{ bgcolor: 'background.paper' }}>
                            <CardContent>
                                <Stack spacing={1}>
                                    <Typography variant="subtitle2" color="error.main">
                                        ⚠️ Critical Timeline
                                    </Typography>
                                    <Typography variant="h6">{nearestDeadline} days</Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        Until {criticalImpacts[0]?.certificationName}
                                    </Typography>
                                    <Typography variant="caption" color="error.main">
                                        ${totalBusinessValue}M+ business value at risk
                                    </Typography>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Paper>

            {/* Action Signals - Most Important Section */}
            <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, border: '2px solid', borderColor: 'primary.main' }}>
                <Stack spacing={2}>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <BoltIcon color="primary" />
                        <Typography variant="h6" color="primary.main">Action Signals</Typography>
                        <Chip size="small" label="Your next moves for continuous compliance" color="primary" />
                    </Stack>
                    
                    <Grid container spacing={2}>
                        {ACTION_SIGNALS.map((signal) => (
                            <Grid item xs={12} md={6} key={signal.signalId}>
                                <Card 
                                    variant="outlined" 
                                    sx={{ 
                                        cursor: 'pointer',
                                        '&:hover': { boxShadow: 2 },
                                        borderColor: getSignalTypeColor(signal.type) + '.main'
                                    }}
                                    onClick={() => {
                                        setSelectedSignal(signal);
                                        setActionDialogOpen(true);
                                    }}
                                >
                                    <CardContent>
                                        <Stack spacing={1.5}>
                                            <Stack direction="row" spacing={1} alignItems="center">
                                                <Chip 
                                                    size="small" 
                                                    color={getSignalTypeColor(signal.type)}
                                                    label={signal.type.replace('_', ' ')}
                                                    variant="filled"
                                                />
                                                <Chip 
                                                    size="small" 
                                                    label={`${signal.effort} effort`}
                                                    variant="outlined"
                                                />
                                                <Chip 
                                                    size="small" 
                                                    color={getImpactColor(signal.impact)}
                                                    label={`${signal.impact} impact`}
                                                    variant="outlined"
                                                />
                                            </Stack>
                                            <Typography variant="subtitle2" fontWeight={600}>
                                                {signal.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {signal.description}
                                            </Typography>
                                            <Stack direction="row" spacing={2} alignItems="center">
                                                <Typography variant="caption" color="primary.main" fontWeight={600}>
                                                    💡 {signal.recommendedAction}
                                                </Typography>
                                            </Stack>
                                            <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center">
                                                <Typography variant="caption" color="text.secondary">
                                                    Time to resolve: {signal.timeToResolve}
                                                </Typography>
                                                {signal.successStory && (
                                                    <Tooltip title={signal.successStory}>
                                                        <StarIcon fontSize="small" color="success" />
                                                    </Tooltip>
                                                )}
                                            </Stack>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Stack>
            </Paper>

            {/* Certification Impact Dashboard */}
            <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom startIcon={<CertificationIcon />}>
                    Certification Impact Analysis
                </Typography>
                <Grid container spacing={2}>
                    {COMPLIANCE_IMPACTS.map((impact, index) => (
                        <Grid item xs={12} md={4} key={index}>
                            <Card variant="outlined" sx={{ height: '100%' }}>
                                <CardContent>
                                    <Stack spacing={1.5}>
                                        <Stack direction="row" spacing={1} alignItems="center">
                                            <Chip 
                                                size="small" 
                                                color={getImpactColor(impact.riskLevel)}
                                                label={impact.riskLevel}
                                                variant="filled"
                                            />
                                            <Typography variant="subtitle2" fontWeight={600}>
                                                {impact.certificationName}
                                            </Typography>
                                        </Stack>
                                        <Stack spacing={1}>
                                            <Stack direction="row" spacing={1} alignItems="center">
                                                <ScheduleIcon fontSize="small" color="warning" />
                                                <Typography variant="body2" color="warning.main" fontWeight={600}>
                                                    {impact.daysToDeadline} days remaining
                                                </Typography>
                                            </Stack>
                                            <Stack direction="row" spacing={1} alignItems="flex-start">
                                                <BusinessIcon fontSize="small" color="action" />
                                                <Stack spacing={0.5}>
                                                    <Typography variant="caption" color="text.secondary">
                                                        {impact.customerImpact}
                                                    </Typography>
                                                    <Typography variant="caption" color="primary.main" fontWeight={600}>
                                                        {impact.businessValue}
                                                    </Typography>
                                                </Stack>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Paper>

            {/* Critical Path Analysis */}
            <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom>
                    Critical Path: Fields Blocking Compliance
                </Typography>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ bgcolor: 'grey.50' }}>
                                <TableCell>Field & Business Impact</TableCell>
                                <TableCell>Certification Risk</TableCell>
                                <TableCell>Review Progress</TableCell>
                                <TableCell>Recommended Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {PENDING_REVIEWS.map((review) => (
                                <TableRow key={review.fieldId} hover>
                                    <TableCell>
                                        <Stack spacing={1}>
                                            <Typography variant="body2" fontWeight={600}>
                                                {review.fieldName}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {review.complianceImpacts[0]?.customerImpact}
                                            </Typography>
                                            {review.blocksOtherFields.length > 0 && (
                                                <Stack direction="row" spacing={1} alignItems="center">
                                                    <TimelineIcon fontSize="small" color="warning" />
                                                    <Typography variant="caption" color="warning.main">
                                                        Blocks {review.blocksOtherFields.length} other field{review.blocksOtherFields.length !== 1 ? 's' : ''}
                                                    </Typography>
                                                </Stack>
                                            )}
                                        </Stack>
                                    </TableCell>
                                    <TableCell>
                                        <Stack spacing={1}>
                                            {review.complianceImpacts.map((impact, idx) => (
                                                <Stack key={idx} direction="row" spacing={1} alignItems="center">
                                                    <Chip 
                                                        size="small" 
                                                        color={getImpactColor(impact.riskLevel)}
                                                        label={impact.certificationName}
                                                        variant="outlined"
                                                    />
                                                    <Typography variant="caption" color="text.secondary">
                                                        {impact.daysToDeadline}d
                                                    </Typography>
                                                </Stack>
                                            ))}
                                        </Stack>
                                    </TableCell>
                                    <TableCell>
                                        <Stack spacing={1}>
                                            <Stack direction="row" spacing={1} alignItems="center">
                                                <Chip 
                                                    size="small" 
                                                    color={review.reviewStatus === 'overdue' ? 'error' : 'warning'}
                                                    label={review.reviewStatus.replace('_', ' ')}
                                                    variant={review.reviewStatus === 'overdue' ? 'filled' : 'outlined'}
                                                />
                                                {review.quickWinPotential && (
                                                    <Chip 
                                                        size="small" 
                                                        color="success"
                                                        label="Quick Win"
                                                        variant="outlined"
                                                        icon={<SpeedIcon />}
                                                    />
                                                )}
                                            </Stack>
                                            <Stack direction="row" spacing={2} alignItems="center">
                                                <Avatar sx={{ width: 24, height: 24, bgcolor: 'primary.main' }}>
                                                    {review.smeContact.name.split(' ').map(n => n[0]).join('')}
                                                </Avatar>
                                                <Stack>
                                                    <Typography variant="caption" fontWeight={600}>
                                                        {review.smeContact.name}
                                                    </Typography>
                                                    <Typography variant="caption" color="text.secondary">
                                                        {review.smeContact.currentWorkload} pending • ~{review.smeContact.avgResponseTime}
                                                    </Typography>
                                                </Stack>
                                            </Stack>
                                            <Typography variant="caption" color="text.secondary">
                                                In review {review.daysInReview} days • Last activity {formatDate(review.lastActivity)}
                                            </Typography>
                                        </Stack>
                                    </TableCell>
                                    <TableCell>
                                        <Stack spacing={1}>
                                            {review.quickWinPotential ? (
                                                <Button
                                                    size="small"
                                                    variant="contained"
                                                    color="success"
                                                    startIcon={<PlayArrowIcon />}
                                                    onClick={() => console.log('Quick action for', review.fieldId)}
                                                >
                                                    Quick Action
                                                </Button>
                                            ) : review.reviewStatus === 'overdue' ? (
                                                <Button
                                                    size="small"
                                                    variant="contained"
                                                    color="error"
                                                    startIcon={<WarningIcon />}
                                                    onClick={() => console.log('Escalate', review.fieldId)}
                                                >
                                                    Escalate Now
                                                </Button>
                                            ) : (
                                                <Button
                                                    size="small"
                                                    variant="outlined"
                                                    onClick={() => console.log('Provide context for', review.fieldId)}
                                                >
                                                    Provide Context
                                                </Button>
                                            )}
                                            
                                            {review.similarApps.length > 0 && (
                                                <Button
                                                    size="small"
                                                    variant="text"
                                                    startIcon={<LightbulbIcon />}
                                                    onClick={() => console.log('View similar apps', review.similarApps)}
                                                >
                                                    Copy from {review.similarApps[0]}
                                                </Button>
                                            )}
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            {/* Continuous Compliance Recommendations */}
            <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, bgcolor: 'success.50' }}>
                <Stack spacing={2}>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <CheckCircleIcon color="success" />
                        <Typography variant="h6" color="success.main">Continuous Compliance Recommendations</Typography>
                    </Stack>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>
                            <Stack spacing={1}>
                                <Typography variant="subtitle2">🚀 Process Optimization</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Set up automated evidence collection for monitoring fields to reduce manual reviews by 60%
                                </Typography>
                                <Button size="small" variant="text" color="success">
                                    Learn How →
                                </Button>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Stack spacing={1}>
                                <Typography variant="subtitle2">📋 Template Library</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Create reusable evidence templates based on your approved submissions
                                </Typography>
                                <Button size="small" variant="text" color="success">
                                    Build Templates →
                                </Button>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Stack spacing={1}>
                                <Typography variant="subtitle2">🔄 Proactive Monitoring</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Set up alerts 30 days before evidence expires to maintain continuous compliance
                                </Typography>
                                <Button size="small" variant="text" color="success">
                                    Configure Alerts →
                                </Button>
                            </Stack>
                        </Grid>
                    </Grid>
                </Stack>
            </Paper>

            {/* Action Dialog */}
            <Dialog open={actionDialogOpen} onClose={() => setActionDialogOpen(false)} maxWidth="md" fullWidth>
                <DialogTitle>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography variant="h6">
                            Take Action: {selectedSignal?.title}
                        </Typography>
                        <IconButton onClick={() => setActionDialogOpen(false)} size="small">
                            <CloseIcon />
                        </IconButton>
                    </Stack>
                </DialogTitle>
                <DialogContent>
                    <Stack spacing={3}>
                        <Alert severity="info">
                            <Typography variant="body2" fontWeight={600}>
                                Recommended Action: {selectedSignal?.recommendedAction}
                            </Typography>
                        </Alert>
                        
                        <Box sx={{ bgcolor: 'grey.50', p: 2, borderRadius: 1 }}>
                            <Typography variant="subtitle2" gutterBottom>Why This Matters:</Typography>
                            <Typography variant="body2">
                                {selectedSignal?.description}
                            </Typography>
                        </Box>
                        
                        <Stack direction="row" spacing={3}>
                            <Stack spacing={0.5}>
                                <Typography variant="caption" color="text.secondary">Effort Required</Typography>
                                <Chip size="small" label={selectedSignal?.effort} variant="outlined" />
                            </Stack>
                            <Stack spacing={0.5}>
                                <Typography variant="caption" color="text.secondary">Business Impact</Typography>
                                <Chip 
                                    size="small" 
                                    color={getImpactColor(selectedSignal?.impact || 'medium')}
                                    label={selectedSignal?.impact} 
                                    variant="outlined" 
                                />
                            </Stack>
                            <Stack spacing={0.5}>
                                <Typography variant="caption" color="text.secondary">Time to Complete</Typography>
                                <Typography variant="caption" fontWeight={600}>
                                    {selectedSignal?.timeToResolve}
                                </Typography>
                            </Stack>
                        </Stack>
                        
                        {selectedSignal?.successStory && (
                            <Alert severity="success">
                                <Typography variant="body2">
                                    📈 Success Story: {selectedSignal.successStory}
                                </Typography>
                            </Alert>
                        )}
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setActionDialogOpen(false)}>
                        Not Now
                    </Button>
                    <Button 
                        variant="contained" 
                        onClick={() => handleTakeAction(selectedSignal!)}
                        startIcon={<PlayArrowIcon />}
                    >
                        Take Action
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Compliance Velocity Tracking */}
            <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom>Compliance Velocity</Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Stack spacing={2}>
                            <Typography variant="subtitle2">This Month's Progress</Typography>
                            <Stack direction="row" spacing={2} alignItems="center">
                                <Box sx={{ flex: 1 }}>
                                    <LinearProgress 
                                        variant="determinate" 
                                        value={78} 
                                        sx={{ height: 12, borderRadius: 6 }}
                                        color="primary"
                                    />
                                </Box>
                                <Typography variant="body2" fontWeight={600}>78%</Typography>
                            </Stack>
                            <Stack direction="row" spacing={4}>
                                <Stack spacing={0.5}>
                                    <Typography variant="caption" fontWeight={600}>Completed</Typography>
                                    <Typography variant="h6" color="success.main">12</Typography>
                                </Stack>
                                <Stack spacing={0.5}>
                                    <Typography variant="caption" fontWeight={600}>In Progress</Typography>
                                    <Typography variant="h6" color="warning.main">3</Typography>
                                </Stack>
                                <Stack spacing={0.5}>
                                    <Typography variant="caption" fontWeight={600}>Blocked</Typography>
                                    <Typography variant="h6" color="error.main">1</Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Stack spacing={2}>
                            <Typography variant="subtitle2">Projected Completion</Typography>
                            <Stack spacing={1}>
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <CheckCircleIcon fontSize="small" color="success" />
                                    <Typography variant="body2">
                                        SOC2 ready in <strong>18 days</strong> (8 days ahead of deadline)
                                    </Typography>
                                </Stack>
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <CheckCircleIcon fontSize="small" color="success" />
                                    <Typography variant="body2">
                                        ISO27001 ready in <strong>35 days</strong> (10 days ahead of deadline)
                                    </Typography>
                                </Stack>
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <WarningIcon fontSize="small" color="warning" />
                                    <Typography variant="body2">
                                        GDPR audit prep <strong>at risk</strong> - needs escalation
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Grid>
                </Grid>
            </Paper>

            {/* Next Best Actions */}
            <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, bgcolor: 'primary.50' }}>
                <Stack spacing={2}>
                    <Typography variant="h6" color="primary.main">Your Next Best Actions</Typography>
                    <Stack direction="row" spacing={2} flexWrap="wrap">
                        <Button 
                            variant="contained" 
                            size="large"
                            startIcon={<PlayArrowIcon />}
                            onClick={() => console.log('Take critical action')}
                        >
                            Address Critical Path (2 mins)
                        </Button>
                        <Button 
                            variant="outlined"
                            size="large" 
                            startIcon={<SpeedIcon />}
                            onClick={() => console.log('Execute quick wins')}
                        >
                            Execute Quick Wins (30 mins)
                        </Button>
                        <Button 
                            variant="text"
                            size="large"
                            startIcon={<AssignmentIcon />}
                            onClick={() => console.log('Plan next sprint')}
                        >
                            Plan Next Compliance Sprint
                        </Button>
                    </Stack>
                    <Typography variant="caption" color="text.secondary">
                        💡 Tip: Completing the critical path action will unlock 2 quick wins and improve your compliance score by +7%
                    </Typography>
                </Stack>
            </Paper>
        </Stack>
    );
}