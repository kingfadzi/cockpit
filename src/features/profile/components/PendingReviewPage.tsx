import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProfile } from '../../../api/hooks';
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

// Mock data focused on compliance posture - based on APM100001 real data
const COMPLIANCE_SCORE = 37; // Current app compliance score (0 compliant out of 68 total fields)
const COMPLIANCE_TREND = 'down'; // 'up' | 'down' | 'stable'  
const SCORE_CHANGE = '-8'; // Points change this month

const COMPLIANCE_IMPACTS: ComplianceImpact[] = [
    {
        certificationName: 'SOC2 Type II Renewal',
        riskLevel: 'critical',
        daysToDeadline: 45,
        customerImpact: 'Trading system certification at risk - 43 controls pending SME review',
        businessValue: 'Enables continued operations in regulated environments'
    },
    {
        certificationName: 'Internal Security Review',
        riskLevel: 'high',
        daysToDeadline: 30,
        customerImpact: '25 risk-blocked fields affecting security posture',
        businessValue: 'Required for Criticality A application compliance'
    },
    {
        certificationName: 'Architecture Governance',
        riskLevel: 'medium',
        daysToDeadline: 90,
        customerImpact: 'Service architecture and product vision reviews pending',
        businessValue: 'Maintains technical debt management and roadmap alignment'
    }
];

const ACTION_SIGNALS: ActionSignal[] = [
    {
        signalId: 'critical_001',
        type: 'critical_path',
        title: 'Architecture Vision Blocking Multiple Reviews',
        description: 'Architecture vision review is blocking service and product vision approvals for this Criticality A app',
        effort: 'medium',
        impact: 'critical',
        recommendedAction: 'Upload consolidated architecture documentation to address SME feedback',
        timeToResolve: '3-5 days',
        successStory: 'Similar trading apps expedited reviews by providing detailed architecture diagrams'
    },
    {
        signalId: 'quickwin_001',
        type: 'quick_win',
        title: 'Batch Security Field Reviews',
        description: '12 security fields have evidence submitted but are awaiting the same security analyst review',
        effort: 'low',
        impact: 'high',
        recommendedAction: 'Request batch review from security_analyst_001 who already submitted attestations',
        timeToResolve: '2-3 days'
    },
    {
        signalId: 'escalation_001',
        type: 'escalation_needed',
        title: '25 Risk-Blocked Fields Need Resolution',
        description: 'High volume of auto-created risks in PENDING_SME_REVIEW status may indicate systematic issue',
        effort: 'high',
        impact: 'critical',
        recommendedAction: 'Escalate to compliance lead for risk review workflow optimization',
        timeToResolve: '1-2 weeks'
    },
    {
        signalId: 'optimization_001',
        type: 'optimization',
        title: 'Optimize Evidence Submission Process',
        description: 'All evidence comes from GitLab but review cycle is manual - automate where possible',
        effort: 'medium',
        impact: 'high',
        recommendedAction: 'Implement automated evidence collection for routine compliance fields',
        timeToResolve: '2-4 weeks'
    }
];

// Generate comprehensive pending reviews based on real APM100001 data
const generatePendingReviews = (): PendingReview[] => {
    const realFields = [
        // Resilience Domain (requires_review: true)
        { id: 'pf_1fb7289f29892c53b0be97bbb0e88db3', name: 'Backup Policy', domain: 'resilience', hasRisk: true },
        { id: 'pf_26f1de8495605593ef17be1001a6ab04', name: 'Chaos Testing', domain: 'resilience', hasRisk: true },
        { id: 'pf_638e145f02ccf9d2b27b11471481d4cf', name: 'DR Test Frequency', domain: 'resilience', hasRisk: true },
        { id: 'pf_4a191a247db4b618433a999650072f37', name: 'Failover Automation', domain: 'resilience', hasRisk: true },
        { id: 'pf_68fe8dfd0d5940644bb9cebe051ac26a', name: 'Incident Response Exercise', domain: 'resilience', hasRisk: true },
        { id: 'pf_4ad83ea4af706d56b664b6dc8efa0cc1', name: 'Incident Response Plan', domain: 'resilience', hasRisk: true },
        { id: 'pf_b3bb57d8bfa429c6a013ab628803e40b', name: 'Runbook Maturity', domain: 'resilience', hasRisk: true },
        
        // Security Domain (requires_review: false, has attestations)
        { id: 'pf_c6a78e2f9e3a17cbb2866c868db0552a', name: 'Dependency / SBOM Management', domain: 'security', hasRisk: false },
        { id: 'pf_05d0df4f63476bb20927a3a7bb4ec17e', name: 'Encryption at Rest', domain: 'security', hasRisk: false },
        { id: 'pf_5a0db2fc2f2e564c08468effee539699', name: 'Encryption in Transit', domain: 'security', hasRisk: false },
        { id: 'pf_75f3803a4f16603c2bf4c4fe5a77cdf6', name: 'Key Rotation Max', domain: 'security', hasRisk: false },
        { id: 'pf_c7954d72f0c2ac073642048e02c3908a', name: 'Multi-Factor Authentication', domain: 'security', hasRisk: false },
        { id: 'pf_015cfe4456bd8f391c26e4dd470324d9', name: 'Network Segmentation Evidence', domain: 'security', hasRisk: false },
        { id: 'pf_49c9b95d97fb011f14c09c87f37724c9', name: 'Patch Remediation SLA', domain: 'security', hasRisk: false },
        { id: 'pf_99d0f407639a4e03ed4f3672343ea052', name: 'Privileged Access Management', domain: 'security', hasRisk: false },
        { id: 'pf_d2b0e5ca701e2310d359740fba109a51', name: 'Secrets Management', domain: 'security', hasRisk: false },
        { id: 'pf_2912c0bd43954f187a9687e4a262dd90', name: 'Security Testing', domain: 'security', hasRisk: false },
        { id: 'pf_7f0dbc53d73b1e9bff4a95648f9fcb01', name: 'SIEM / Central Log Integration', domain: 'security', hasRisk: false },
        { id: 'pf_75e4fefda3f721427116e2c3afacd7aa', name: 'Web Application Firewall Evidence', domain: 'security', hasRisk: false },
        
        // Summary Domain (requires_review: true)
        { id: 'pf_ee1955014407d26303463a94c7dc0211', name: 'Architecture Vision', domain: 'summary', hasRisk: true },
        { id: 'pf_4c690004d3636fb09ac0be8d9aa5968d', name: 'Product Roadmap', domain: 'summary', hasRisk: true },
        { id: 'pf_a93e3aab272d1717cb45bd2ec03fc451', name: 'Product Vision', domain: 'summary', hasRisk: true },
        { id: 'pf_c402f14fbbd470b94c0dd618c166a3f6', name: 'Security Vision', domain: 'summary', hasRisk: true },
        { id: 'pf_37054f757f631f2763b235a7c6071e19', name: 'Service Vision', domain: 'summary', hasRisk: true },
        { id: 'pf_69239402f59dd08b6b6f2dc147b57421', name: 'Test Vision', domain: 'summary', hasRisk: true },
        
        // Integrity Domain (requires_review: false, has attestations)
        { id: 'pf_bdb382967e3770f205757dabf83073d5', name: 'Audit Logging', domain: 'integrity', hasRisk: false },
        { id: 'pf_1fcd2312443f55c7e4ae3203a1fada1c', name: 'Change Control', domain: 'integrity', hasRisk: false },
        { id: 'pf_b83e77d0cb696c37c4d663bb10a17a7c', name: 'Data Validation', domain: 'integrity', hasRisk: false },
        { id: 'pf_720ba6f7410099417530baff2ba5075e', name: 'Immutability Required', domain: 'integrity', hasRisk: false },
        { id: 'pf_1a370e363e72ce491038bfbf220f73f2', name: 'Log Retention Period', domain: 'integrity', hasRisk: false },
        { id: 'pf_83068a793cd8762d43fd4a241634c8a1', name: 'Reconciliation Frequency', domain: 'integrity', hasRisk: false },
        
        // Availability Domain (requires_review: true)
        { id: 'pf_3d03cf9458834003830bcc54f5f833af', name: 'HA Topology', domain: 'availability', hasRisk: true },
        { id: 'pf_6867075d1a6ea814d69577b96876fa96', name: 'Monitoring SLOs', domain: 'availability', hasRisk: true },
        { id: 'pf_b67bfaa90609b075adfb038eaab3016b', name: 'On-call Coverage', domain: 'availability', hasRisk: true },
        { id: 'pf_17663b9edc58d9abdc2de7187d483000', name: 'RPO (minutes)', domain: 'availability', hasRisk: true },
        { id: 'pf_d2d5229fc03e7deca4edd3718586f338', name: 'RTO (hours)', domain: 'availability', hasRisk: true },
        
        // Confidentiality Domain (requires_review: true)
        { id: 'pf_373698658db08a85a2c6f2a27ef5a1e2', name: 'Access Review Cadence', domain: 'confidentiality', hasRisk: true },
        { id: 'pf_4d45c8847ed320c965b58a669ea5315b', name: 'Confidentiality Level', domain: 'confidentiality', hasRisk: true },
        { id: 'pf_72998cc2ddb9f714f298568532f63e7f', name: 'Secure Data Deletion Evidence', domain: 'confidentiality', hasRisk: true },
        { id: 'pf_c994e0abc423bfcb0577d6b6144ed794', name: 'Data Residency Control', domain: 'confidentiality', hasRisk: true },
        { id: 'pf_53b60bb17cbab5b511006a4db8852fe3', name: 'Data Retention Policy', domain: 'confidentiality', hasRisk: true },
        { id: 'pf_5e86f1a7954680c27e90c6d081ffb04c', name: 'De-Identification', domain: 'confidentiality', hasRisk: true },
        { id: 'pf_c9625d47d88d2003319bef1f9cdc0c19', name: 'Third-Party Service Provider Attestation', domain: 'confidentiality', hasRisk: true }
    ];

    const smeContacts = {
        resilience: { name: 'Infrastructure SME', specialty: 'Resilience & DR', avgResponseTime: '2-4 days', currentWorkload: 25 },
        security: { name: 'Security Analyst 001', specialty: 'Security Controls', avgResponseTime: '1-2 days', currentWorkload: 12 },
        summary: { name: 'Enterprise Architect SME', specialty: 'Architecture Review', avgResponseTime: '3-5 days', currentWorkload: 15 },
        integrity: { name: 'Security Analyst 001', specialty: 'Audit & Compliance', avgResponseTime: '1-2 days', currentWorkload: 12 },
        availability: { name: 'SRE Team Lead', specialty: 'Availability & SLOs', avgResponseTime: '2-3 days', currentWorkload: 18 },
        confidentiality: { name: 'Data Privacy SME', specialty: 'Data Protection', avgResponseTime: '3-4 days', currentWorkload: 20 }
    };

    const statusOptions = ['in_review', 'needs_clarification', 'overdue', 'queued'];
    
    return realFields.map((field, index) => ({
        fieldId: field.id,
        fieldName: field.name,
        complianceImpacts: field.hasRisk ? [COMPLIANCE_IMPACTS[0]] : [COMPLIANCE_IMPACTS[1]], 
        daysInReview: Math.floor(Math.random() * 14) + 1, // 1-14 days
        reviewStatus: statusOptions[index % statusOptions.length] as any,
        smeContact: smeContacts[field.domain as keyof typeof smeContacts],
        evidenceType: 'GitLab Evidence',
        submittedDate: '2025-09-02T22:51:44Z',
        lastActivity: '2025-09-02T22:51:44Z',
        similarApps: field.domain === 'security' ? ['other trading systems'] : field.domain === 'summary' ? ['APM100002'] : [],
        quickWinPotential: field.domain === 'security' || field.domain === 'integrity',
        blocksOtherFields: field.name === 'Architecture Vision' ? ['service_vision', 'product_vision', 'security_vision'] : []
    }));
};

// Fallback data if profile is not loaded
const FALLBACK_PENDING_REVIEWS: PendingReview[] = generatePendingReviews();

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
    const { appId = '' } = useParams();
    const { data: profile } = useProfile(appId);
    const [selectedSignal, setSelectedSignal] = useState<ActionSignal | null>(null);
    const [actionDialogOpen, setActionDialogOpen] = useState(false);

    // Generate real pending reviews from profile data
    const realPendingReviews = profile?.domains.flatMap(domain => 
        domain.fields.filter(field => field.approvalStatus === 'pending').map(field => ({
            fieldId: field.profileFieldId || field.fieldKey,
            fieldName: field.label,
            complianceImpacts: field.risks.length > 0 ? [COMPLIANCE_IMPACTS[0]] : [COMPLIANCE_IMPACTS[1]],
            daysInReview: Math.floor(Math.random() * 14) + 1,
            reviewStatus: field.risks.length > 0 ? 'needs_clarification' : 'in_review' as const,
            smeContact: {
                name: domain.title === 'Security' ? 'Security Analyst 001' : 
                      domain.title === 'Resilience' ? 'Infrastructure SME' :
                      domain.title === 'Summary' ? 'Enterprise Architect SME' :
                      domain.title === 'Integrity' ? 'Security Analyst 001' :
                      domain.title === 'Availability' ? 'SRE Team Lead' : 'Data Privacy SME',
                specialty: domain.title + ' Review',
                avgResponseTime: '2-3 days',
                currentWorkload: domain.fields.length
            },
            evidenceType: 'GitLab Evidence',
            submittedDate: '2025-09-02T22:51:44Z',
            lastActivity: '2025-09-02T22:51:44Z',
            similarApps: domain.title === 'Security' ? ['other trading systems'] : [],
            quickWinPotential: domain.title === 'Security' || domain.title === 'Integrity',
            blocksOtherFields: field.fieldKey === 'architecture_vision' ? ['service_vision', 'product_vision'] : []
        }))
    ) || FALLBACK_PENDING_REVIEWS;

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
                                {profile?.name || appId} - Compliance Posture
                            </Typography>
                            <Stack direction="row" spacing={4} alignItems="center">
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <Typography variant="h2" color="primary.main">{COMPLIANCE_SCORE}%</Typography>
                                    {COMPLIANCE_TREND === 'up' ? (
                                        <TrendingUpIcon color="success" />
                                    ) : (
                                        <TrendingDownIcon color="error" />
                                    )}
                                    <Typography variant="body2" color="error.main">
                                        {SCORE_CHANGE} this month
                                    </Typography>
                                </Stack>
                                <Stack spacing={0.5}>
                                    <Typography variant="body2" color="text.secondary">
                                        Next milestone: <strong>60% for basic compliance</strong>
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {realPendingReviews.length} pending reviews, 25 risk-blocked - critical attention needed
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
                                        Criticality A app - Trading system at risk
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
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                    <CertificationIcon fontSize="small" />
                    <Typography variant="h6">
                        Certification Impact Analysis
                    </Typography>
                </Stack>
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
                            {realPendingReviews.map((review) => (
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
                                        value={37} 
                                        sx={{ height: 12, borderRadius: 6 }}
                                        color="error"
                                    />
                                </Box>
                                <Typography variant="body2" fontWeight={600}>{COMPLIANCE_SCORE}%</Typography>
                            </Stack>
                            <Stack direction="row" spacing={4}>
                                <Stack spacing={0.5}>
                                    <Typography variant="caption" fontWeight={600}>Completed</Typography>
                                    <Typography variant="h6" color="success.main">0</Typography>
                                </Stack>
                                <Stack spacing={0.5}>
                                    <Typography variant="caption" fontWeight={600}>In Progress</Typography>
                                    <Typography variant="h6" color="warning.main">{realPendingReviews.length}</Typography>
                                </Stack>
                                <Stack spacing={0.5}>
                                    <Typography variant="caption" fontWeight={600}>Blocked</Typography>
                                    <Typography variant="h6" color="error.main">25</Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Stack spacing={2}>
                            <Typography variant="subtitle2">Projected Completion</Typography>
                            <Stack spacing={1}>
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <WarningIcon fontSize="small" color="error" />
                                    <Typography variant="body2">
                                        SOC2 renewal <strong>at high risk</strong> - {realPendingReviews.length} reviews pending
                                    </Typography>
                                </Stack>
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <WarningIcon fontSize="small" color="error" />
                                    <Typography variant="body2">
                                        Security review <strong>critical</strong> - 25 risk-blocked fields
                                    </Typography>
                                </Stack>
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <WarningIcon fontSize="small" color="warning" />
                                    <Typography variant="body2">
                                        Architecture governance <strong>needs immediate attention</strong>
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
                        ⚠️ Critical: This Criticality A trading app has {realPendingReviews.length} pending reviews and 25 risk-blocked fields requiring immediate SME attention
                    </Typography>
                </Stack>
            </Paper>
        </Stack>
    );
}