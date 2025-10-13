import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Stack,
    Chip,
    Box,
    TextField,
    Alert,
    Divider,
    IconButton,
    Paper,
    Link,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Tabs,
    Tab,
    Grid,
    Tooltip,
} from '@mui/material';
import {
    Close as CloseIcon,
    CheckCircle as ApproveIcon,
    CheckCircle as CheckCircleIcon,
    Cancel as RejectIcon,
    Warning as WarningIcon,
    Info as InfoIcon,
    Assignment as AssignIcon,
    Schedule as ScheduleIcon,
    Launch as JiraIcon,
    Sync as SyncIcon,
    Comment as CommentIcon,
    Person as PersonIcon,
    AccessTime as TimeIcon,
} from '@mui/icons-material';
import { useSubmitSmeReview, useProfileFieldEvidence } from '../../../api/hooks';
import RiskCommentsPanel from './RiskCommentsPanel';

interface RiskStoryModalProps {
    open: boolean;
    onClose: () => void;
    risk: any | null;
    smeId: string;
}

type SmeAction = 'approve' | 'reject' | 'request_info' | 'assign_other' | 'escalate' | 'approve_with_mitigation';

export default function RiskStoryModal({ open, onClose, risk, smeId }: RiskStoryModalProps) {
    const [comments, setComments] = useState('');
    const [action, setAction] = useState<SmeAction | null>(null);
    const [activeTab, setActiveTab] = useState(0);
    const [assignToSme, setAssignToSme] = useState('');
    const [mitigationPlan, setMitigationPlan] = useState('');
    const submitReviewMutation = useSubmitSmeReview();
    const { data: evidenceData } = useProfileFieldEvidence(risk?.profileFieldId);

    // Mock Jira data (hardcoded until backend ready)
    const mockJiraData = risk ? {
        issueId: `RISK-${risk.riskId?.slice(-4) || '1234'}`,
        status: 'In Review',
        lastUpdated: '2025-01-15T14:30:00Z',
        assignee: smeId,
        resolution: null,
        lastComment: 'Requested additional evidence for encryption implementation. Need to verify current state vs policy requirements.',
        commentCount: 7,
        url: `https://jira.company.com/browse/RISK-${risk.riskId?.slice(-4) || '1234'}`,
        priority: 'High',
        dueDate: risk.dueDate || '2025-01-22T17:00:00Z'
    } : null;

    // Mock application details if not present (for testing until backend provides this)
    const mockApplicationDetails = risk && !risk.applicationDetails ? {
        name: risk.appName || "Customer Portal",
        businessServiceName: "Customer Experience Platform",
        appCriticalityAssessment: "A2",
        securityRating: "A2",
        confidentialityRating: "A1", 
        integrityRating: "A2",
        availabilityRating: "A2",
        resilienceRating: "B1",
        productOwner: "John Smith",
        transactionCycle: "real-time",
        applicationType: "web-application",
        parentAppName: "Core Banking System"
    } : null;

    // Use real data if available, otherwise mock for development
    const enhancedRisk = risk && mockApplicationDetails ? {
        ...risk,
        applicationDetails: mockApplicationDetails
    } : risk;

    const handleSubmit = async () => {
        if (!risk || !action || !comments.trim()) return;

        const payload: any = {
            action,
            comments: comments.trim(),
            smeId
        };

        if (action === 'assign_other' && assignToSme) {
            payload.assignToSme = assignToSme;
        }
        if (action === 'approve_with_mitigation' && mitigationPlan) {
            payload.mitigationPlan = mitigationPlan;
        }

        try {
            await submitReviewMutation.mutateAsync({
                riskId: risk.riskId,
                payload
            });
            
            // Reset form and close modal
            setComments('');
            setAction(null);
            setAssignToSme('');
            setMitigationPlan('');
            onClose();
        } catch (error) {
            console.error('Failed to submit review:', error);
        }
    };

    const handleClose = () => {
        setComments('');
        setAction(null);
        setAssignToSme('');
        setMitigationPlan('');
        onClose();
    };

    if (!risk) return null;

    const getSeverityColor = (severity: string) => {
        switch (severity?.toLowerCase()) {
            case 'critical': return 'error';
            case 'high': return 'error';
            case 'medium': return 'warning';
            case 'low': return 'default';
            default: return 'default';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'PENDING_SME_REVIEW': return 'warning';
            case 'UNDER_REVIEW': return 'info';
            case 'SME_APPROVED': return 'success';
            case 'SME_REJECTED': return 'error';
            default: return 'default';
        }
    };

    const canTakeAction = enhancedRisk?.status === 'PENDING_SME_REVIEW' || enhancedRisk?.status === 'UNDER_REVIEW';

    const getLastUpdatedText = () => {
        if (!mockJiraData?.lastUpdated) return 'Unknown';
        const diffMs = Date.now() - new Date(mockJiraData.lastUpdated).getTime();
        const diffMins = Math.floor(diffMs / 60000);
        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        const diffHours = Math.floor(diffMins / 60);
        if (diffHours < 24) return `${diffHours}h ago`;
        return `${Math.floor(diffHours / 24)}d ago`;
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="lg"
            fullWidth
            PaperProps={{
                sx: { borderRadius: 2 }
            }}
        >
            <DialogTitle>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Typography variant="h6" fontWeight={600}>
                            Risk Story Review
                        </Typography>
                        {mockJiraData && (
                            <Chip
                                size="small"
                                icon={<JiraIcon fontSize="small" />}
                                label={mockJiraData.issueId}
                                variant="outlined"
                                component={Link}
                                href={mockJiraData.url}
                                target="_blank"
                                clickable
                                sx={{ fontFamily: 'monospace' }}
                            />
                        )}
                    </Stack>
                    <IconButton onClick={handleClose} size="small">
                        <CloseIcon />
                    </IconButton>
                </Stack>
            </DialogTitle>

            <DialogContent sx={{ p: 0 }}>
                <Box sx={{ width: '100%' }}>
                    <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} sx={{ px: 3, pt: 1 }}>
                        <Tab label="Risk Details" />
                        <Tab label="Jira Sync" />
                        <Tab label="Comments" />
                    </Tabs>

                    <Box sx={{ p: 3 }}>
                        {/* Tab 1: Risk Details */}
                        {activeTab === 0 && (
                            <Stack spacing={2}>
                                {/* Header with dates */}
                                <Box sx={{ pb: 1 }}>
                                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                                        <Typography variant="h6" fontWeight={600}>
                                            {enhancedRisk?.title}
                                        </Typography>
                                        <Stack direction="row" spacing={2}>
                                            <Box>
                                                <Typography variant="caption" color="text.secondary" display="block">Assigned</Typography>
                                                <Typography variant="body2">
                                                    {enhancedRisk.assignedAt ? new Date(enhancedRisk.assignedAt).toLocaleDateString() : '—'}
                                                </Typography>
                                            </Box>
                                            <Box>
                                                <Typography variant="caption" color="text.secondary" display="block">Due Date</Typography>
                                                <Typography variant="body2" color={enhancedRisk.dueDate && new Date(enhancedRisk.dueDate) < new Date() ? 'error.main' : 'text.primary'}>
                                                    {enhancedRisk.dueDate ? new Date(enhancedRisk.dueDate).toLocaleDateString() : '—'}
                                                </Typography>
                                            </Box>
                                        </Stack>
                                    </Stack>
                                </Box>

                                {/* 3-Column Main Content */}
                                <Grid container spacing={2}>
                                    {/* Left Column - Risk Story (70%) */}
                                    <Grid item xs={12} md={8}>
                                        <Stack spacing={2}>
                                            {/* Risk Assessment Card */}
                                            <Paper variant="outlined" sx={{ p: 2 }}>
                                                                <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                                                    <Chip size="small" label={enhancedRisk?.severity} color={getSeverityColor(enhancedRisk?.severity)} variant="filled" />
                                                    <Chip size="small" label={enhancedRisk?.status?.replace('_', ' ')} color={getStatusColor(enhancedRisk?.status)} variant="outlined" />
                                                </Stack>
                                                
                                                <Stack spacing={1.5}>
                                                    <Box>
                                                        <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 0.5 }}>
                                                            Requirement
                                                        </Typography>
                                                        <Typography variant="body2" sx={{ lineHeight: 1.5 }}>
                                                            {enhancedRisk?.fieldKey}
                                                        </Typography>
                                                    </Box>
                                                    {enhancedRisk.hypothesis ? (
                                                        <Box>
                                                            <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 0.5 }}>
                                                                Hypothesis
                                                            </Typography>
                                                            <Typography variant="body2" sx={{ lineHeight: 1.5 }}>
                                                                {enhancedRisk.hypothesis}
                                                            </Typography>
                                                        </Box>
                                                    ) : (
                                                        <Box>
                                                            <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 0.5 }}>
                                                                Risk Description
                                                            </Typography>
                                                            <Typography variant="body2" sx={{ lineHeight: 1.5 }}>
                                                                {enhancedRisk.description || 'Risk identified for field: ' + enhancedRisk.fieldKey}
                                                            </Typography>
                                                        </Box>
                                                    )}
                                                    
                                                    {enhancedRisk.condition && (
                                                        <Box>
                                                            <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 0.5 }}>
                                                                Condition
                                                            </Typography>
                                                            <Typography variant="body2" sx={{ lineHeight: 1.5 }}>
                                                                {enhancedRisk.condition}
                                                            </Typography>
                                                        </Box>
                                                    )}
                                                    
                                                    {enhancedRisk.consequence && (
                                                        <Box>
                                                            <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 0.5 }}>
                                                                Consequence
                                                            </Typography>
                                                            <Typography variant="body2" sx={{ lineHeight: 1.5 }}>
                                                                {enhancedRisk.consequence}
                                                            </Typography>
                                                        </Box>
                                                    )}

                                                    {/* Additional Risk Details from payload */}
                                                    {enhancedRisk.controlRefs && (
                                                        <Box>
                                                            <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 0.5 }}>
                                                                Control References
                                                            </Typography>
                                                            <Typography variant="body2" sx={{ lineHeight: 1.5 }}>
                                                                {enhancedRisk.controlRefs}
                                                            </Typography>
                                                        </Box>
                                                    )}

                                                    {enhancedRisk.policyRequirementSnapshot?.complianceFrameworks && (
                                                        <Box>
                                                            <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 0.5 }}>
                                                                Compliance Frameworks
                                                            </Typography>
                                                            <Typography variant="body2" sx={{ lineHeight: 1.5 }}>
                                                                {enhancedRisk.policyRequirementSnapshot.complianceFrameworks.map(f => `${f.framework}: ${f.controls.join(', ')}`).join('\n')}
                                                            </Typography>
                                                        </Box>
                                                    )}

                                                    {enhancedRisk.triggeringEvidenceId && (
                                                        <Box>
                                                            <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 0.5 }}>
                                                                Triggering Evidence
                                                            </Typography>
                                                            <Typography variant="body2" sx={{ lineHeight: 1.5 }}>
                                                                {enhancedRisk.triggeringEvidenceId} ({enhancedRisk.creationType})
                                                            </Typography>
                                                        </Box>
                                                    )}

                                                    {enhancedRisk.attributes?.confidenceLevel && (
                                                        <Box>
                                                            <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 0.5 }}>
                                                                Confidence Level
                                                            </Typography>
                                                            <Typography variant="body2" sx={{ lineHeight: 1.5 }}>
                                                                {enhancedRisk.attributes.confidenceLevel} ({enhancedRisk.attributes.evidenceType})
                                                            </Typography>
                                                        </Box>
                                                    )}
                                                </Stack>
                                            </Paper>

                                            {/* SME Review */}
                                            {canTakeAction ? (
                                                <Paper variant="outlined" sx={{ p: 2 }}>
                                                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 2 }}>
                                                            <Button
                                                                variant={action === 'approve' ? 'contained' : 'outlined'}
                                                                color="success"
                                                                startIcon={<ApproveIcon />}
                                                                onClick={() => setAction('approve')}
                                                                size="small"
                                                            >
                                                                Approve
                                                            </Button>
                                                            <Button
                                                                variant={action === 'approve_with_mitigation' ? 'contained' : 'outlined'}
                                                                color="success"
                                                                startIcon={<CheckCircleIcon />}
                                                                onClick={() => setAction('approve_with_mitigation')}
                                                                size="small"
                                                            >
                                                                Approve with Mitigation
                                                            </Button>
                                                            <Button
                                                                variant={action === 'reject' ? 'contained' : 'outlined'}
                                                                color="error"
                                                                startIcon={<RejectIcon />}
                                                                onClick={() => setAction('reject')}
                                                                size="small"
                                                            >
                                                                Reject
                                                            </Button>
                                                            <Button
                                                                variant={action === 'request_info' ? 'contained' : 'outlined'}
                                                                color="warning"
                                                                startIcon={<InfoIcon />}
                                                                onClick={() => setAction('request_info')}
                                                                size="small"
                                                            >
                                                                Request Info
                                                            </Button>
                                                            <Button
                                                                variant={action === 'assign_other' ? 'contained' : 'outlined'}
                                                                color="info"
                                                                startIcon={<AssignIcon />}
                                                                onClick={() => setAction('assign_other')}
                                                                size="small"
                                                            >
                                                                Reassign
                                                            </Button>
                                                            <Button
                                                                variant={action === 'escalate' ? 'contained' : 'outlined'}
                                                                color="warning"
                                                                startIcon={<WarningIcon />}
                                                                onClick={() => setAction('escalate')}
                                                                size="small"
                                                            >
                                                                Escalate
                                                            </Button>
                                                    </Stack>

                                                    {/* Conditional Fields */}
                                                    {action === 'assign_other' && (
                                                        <FormControl size="small" sx={{ minWidth: 200, mb: 2 }}>
                                                            <InputLabel>Assign to SME</InputLabel>
                                                            <Select
                                                                value={assignToSme}
                                                                onChange={(e) => setAssignToSme(e.target.value)}
                                                                label="Assign to SME"
                                                            >
                                                                <MenuItem value="data_architecture_sme_001">Data Architecture SME</MenuItem>
                                                                <MenuItem value="infrastructure_sme_001">Infrastructure SME</MenuItem>
                                                                <MenuItem value="compliance_sme_001">Compliance SME</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    )}

                                                    {action === 'approve_with_mitigation' && (
                                                        <TextField
                                                            label="Required Mitigation Plan"
                                                            multiline
                                                            rows={2}
                                                            value={mitigationPlan}
                                                            onChange={(e) => setMitigationPlan(e.target.value)}
                                                            placeholder="Describe the required mitigation steps..."
                                                            fullWidth
                                                            size="small"
                                                            sx={{ mb: 2 }}
                                                        />
                                                    )}

                                                    {/* Comments */}
                                                    <TextField
                                                        label="SME Comments (Will sync to Jira)"
                                                        multiline
                                                        rows={3}
                                                        value={comments}
                                                        onChange={(e) => setComments(e.target.value)}
                                                        placeholder="Provide detailed comments about your review decision..."
                                                        fullWidth
                                                        required={!!action}
                                                        helperText="These comments will be added to the Jira ticket"
                                                        size="small"
                                                    />

                                                    {action && !comments.trim() && (
                                                        <Alert severity="info" size="small" sx={{ mt: 1 }}>
                                                            Comments are required for all review actions.
                                                        </Alert>
                                                    )}
                                                </Paper>
                                            ) : (
                                                <Paper variant="outlined" sx={{ p: 2 }}>
                                                    <Alert severity="info" icon={<InfoIcon />}>
                                                        This risk has already been reviewed. Current status: {enhancedRisk.status?.replace('_', ' ')}
                                                    </Alert>
                                                </Paper>
                                            )}
                                        </Stack>
                                    </Grid>

                                    {/* Right Column - Context (30%) */}
                                    <Grid item xs={12} md={4}>
                                        <Stack spacing={1.5}>
                                            {/* Application Details Card */}
                                            <Paper variant="outlined" sx={{ p: 2 }}>
                                                <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
                                                    {enhancedRisk?.applicationDetails?.name || enhancedRisk?.appName || enhancedRisk?.appId}
                                                </Typography>
                                                {enhancedRisk?.domain && (
                                                    <Box sx={{ mb: 1 }}>
                                                        <Chip size="small" label={enhancedRisk.domain} variant="outlined" color={enhancedRisk.domain === 'security' ? 'error' : 'info'} />
                                                    </Box>
                                                )}
                                                <Grid container spacing={1.5}>
                                                    <Grid item xs={6}>
                                                        <Box>
                                                            <Typography variant="caption" color="text.secondary">Application Type</Typography>
                                                            <Typography variant="body2" fontWeight={500}>
                                                                {enhancedRisk?.applicationDetails?.applicationType || 'N/A'}
                                                            </Typography>
                                                        </Box>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        {enhancedRisk?.applicationDetails?.transactionCycle && (
                                                            <Box>
                                                                <Typography variant="caption" color="text.secondary">Transaction Cycle</Typography>
                                                                <Typography variant="body2" fontWeight={500}>
                                                                    {enhancedRisk.applicationDetails.transactionCycle}
                                                                </Typography>
                                                            </Box>
                                                        )}
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        {enhancedRisk?.applicationDetails?.businessServiceName && (
                                                            <Box>
                                                                <Typography variant="caption" color="text.secondary">Business Service</Typography>
                                                                <Typography variant="body2" fontWeight={500}>
                                                                    {enhancedRisk.applicationDetails.businessServiceName}
                                                                </Typography>
                                                            </Box>
                                                        )}
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        {enhancedRisk?.applicationDetails?.productOwner && (
                                                            <Box>
                                                                <Typography variant="caption" color="text.secondary">Product Owner</Typography>
                                                                <Typography variant="body2" fontWeight={500}>
                                                                    {enhancedRisk.applicationDetails.productOwner}
                                                                </Typography>
                                                            </Box>
                                                        )}
                                                    </Grid>
                                                </Grid>
                                            </Paper>

                                            {/* Criticality Card */}
                                            <Paper variant="outlined" sx={{ p: 2 }}>
                                                <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
                                                    Criticality: {enhancedRisk?.applicationDetails?.appCriticalityAssessment || 'A2'}
                                                </Typography>
                                                <Grid container spacing={1}>
                                                    <Grid item xs={6}>
                                                        {enhancedRisk?.applicationDetails?.securityRating && (
                                                            <Chip size="small" label={`Security: ${enhancedRisk.applicationDetails.securityRating}`} color="error" />
                                                        )}
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        {enhancedRisk?.applicationDetails?.confidentialityRating && (
                                                            <Chip size="small" label={`Confidentiality: ${enhancedRisk.applicationDetails.confidentialityRating}`} color="error" />
                                                        )}
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        {enhancedRisk?.applicationDetails?.integrityRating && (
                                                            <Chip size="small" label={`Integrity: ${enhancedRisk.applicationDetails.integrityRating}`} color="warning" />
                                                        )}
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        {enhancedRisk?.applicationDetails?.availabilityRating && (
                                                            <Chip size="small" label={`Availability: ${enhancedRisk.applicationDetails.availabilityRating}`} color="info" />
                                                        )}
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        {enhancedRisk?.applicationDetails?.resilienceRating && (
                                                            <Chip size="small" label={`Resilience: ${enhancedRisk.applicationDetails.resilienceRating}`} color="warning" />
                                                        )}
                                                    </Grid>
                                                </Grid>
                                            </Paper>

                                            {/* Supporting Evidence */}
                                            <Paper variant="outlined" sx={{ p: 2 }}>
                                                <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
                                                    Supporting Evidence
                                                </Typography>
                                                <Stack spacing={1}>
                                                    {evidenceData?.items?.length > 0 ? (
                                                        <>
                                                            {evidenceData.items.slice(0, 3).map((evidence: any) => (
                                                                <Box key={evidence.evidenceId}>
                                                                    <Link href={evidence.uri} target="_blank" variant="body2">
                                                                        {evidence.documentId || evidence.type.replace('_', ' ')}
                                                                    </Link>
                                                                    <Typography component="span" variant="caption" color="text.secondary">
                                                                        {' '}({new Date(evidence.createdAt).toLocaleDateString()})
                                                                    </Typography>
                                                                </Box>
                                                            ))}
                                                            {evidenceData.items.length > 3 && (
                                                                <Typography variant="body2" color="text.secondary" fontStyle="italic" sx={{ mt: 1 }}>
                                                                    + {evidenceData.items.length - 3} more documents
                                                                </Typography>
                                                            )}
                                                        </>
                                                    ) : (
                                                        <Typography variant="body2" color="text.secondary" fontStyle="italic">
                                                            No evidence attached yet
                                                        </Typography>
                                                    )}
                                                </Stack>
                                            </Paper>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Stack>
                        )}

                        {/* Tab 2: Jira Sync */}
                        {activeTab === 1 && mockJiraData && (
                            <Stack spacing={2}>
                                <Stack direction="row" alignItems="center" justifyContent="space-between">
                                    <Typography variant="subtitle2" fontWeight={600}>
                                        Jira Integration
                                    </Typography>
                                    <Chip
                                        size="small"
                                        icon={<SyncIcon fontSize="small" />}
                                        label={`Synced ${getLastUpdatedText()}`}
                                        color="success"
                                        variant="outlined"
                                    />
                                </Stack>
                                
                                <Paper variant="outlined" sx={{ p: 2 }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <Stack direction="row" alignItems="center" spacing={1}>
                                                <Typography variant="body2" fontFamily="monospace" fontWeight={600}>
                                                    {mockJiraData.issueId}
                                                </Typography>
                                                <Link href={mockJiraData.url} target="_blank">
                                                    <JiraIcon fontSize="small" />
                                                </Link>
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="body2" color="text.secondary">
                                                Status: {mockJiraData.status} • {mockJiraData.commentCount} comments
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Paper>

                                <Box>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                        Latest Comment:
                                    </Typography>
                                    <Paper variant="outlined" sx={{ p: 2, bgcolor: 'grey.50' }}>
                                        <Typography variant="body2">
                                            {mockJiraData.lastComment}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                                            {getLastUpdatedText()} • <Link href={mockJiraData.url} target="_blank">View in Jira</Link>
                                        </Typography>
                                    </Paper>
                                </Box>
                            </Stack>
                        )}

                        {/* Tab 3: Comments */}
                        {activeTab === 2 && risk?.riskId && (
                            <RiskCommentsPanel riskItemId={risk.riskId} currentUserId={smeId} />
                        )}
                    </Box>
                </Box>
            </DialogContent>

            <DialogActions sx={{ p: 3, pt: 0 }}>
                <Button onClick={handleClose} color="inherit">
                    Close
                </Button>
                {canTakeAction && activeTab === 0 && (
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        disabled={!action || !comments.trim() || submitReviewMutation.isPending}
                        color={
                            action === 'approve' || action === 'approve_with_mitigation' ? 'success' : 
                            action === 'reject' ? 'error' : 'primary'
                        }
                    >
                        {submitReviewMutation.isPending ? 'Submitting to Jira...' : `Submit ${action?.replace('_', ' ') || 'Review'}`}
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
}