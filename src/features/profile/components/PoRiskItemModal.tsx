import React from 'react';
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
    IconButton,
    Paper,
    Grid,
    Tooltip,
    Link,
    List,
    ListItem,
    ListItemText,
} from '@mui/material';
import {
    Close as CloseIcon,
    AttachFile as AttachFileIcon,
    Visibility as ViewIcon,
    Description as DocumentIcon,
} from '@mui/icons-material';
import type { RiskStory, RiskStatus, RiskSeverity } from '../../../api/types';
import { useProfileFieldEvidence } from '../../../api/hooks';

interface PoRiskItemModalProps {
    open: boolean;
    onClose: () => void;
    risk: RiskStory | null;
    appId: string;
    onAttachEvidence?: (risk: RiskStory) => void;
}

export default function PoRiskItemModal({
    open,
    onClose,
    risk,
    appId,
    onAttachEvidence
}: PoRiskItemModalProps) {

    if (!risk) return null;

    // Fetch evidence for the profile field
    const { data: evidenceData } = useProfileFieldEvidence(risk?.profileFieldId);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getRiskStatusColor = (status: RiskStatus) => {
        switch (status) {
            case 'open': return 'error';
            case 'under_review': return 'warning';
            case 'pending_evidence': return 'info';
            case 'resolved': return 'success';
            case 'accepted': return 'success';
            case 'rejected': return 'default';
            case 'PENDING_SME_REVIEW': return 'warning';
            case 'SME_APPROVED': return 'success';
            case 'SME_REJECTED': return 'error';
            default: return 'default';
        }
    };

    const formatStatusLabel = (status: RiskStatus) => {
        return status;
    };

    const getRiskSeverityColor = (severity: RiskSeverity) => {
        switch (severity) {
            case 'critical': return 'error';
            case 'high': return 'error';
            case 'medium': return 'warning';
            case 'low': return 'info';
            default: return 'default';
        }
    };

    const getRatingInfo = (activeRule: any) => {
        if (!activeRule) return null;

        const ratingFields = [
            'security_rating',
            'confidentiality_rating',
            'availability_rating',
            'integrity_rating',
            'resilience_rating'
        ];

        for (const field of ratingFields) {
            if (activeRule[field]) {
                return {
                    type: field.replace('_rating', '').toUpperCase(),
                    value: activeRule[field]
                };
            }
        }

        return null;
    };

    const canAttachEvidence = risk.status === 'pending_evidence' || risk.status === 'open';

    return (
        <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
            <DialogTitle>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Stack>
                        <Typography variant="h6">
                            Risk Item Details
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            Risk ID: {risk.riskId}
                        </Typography>
                    </Stack>
                    <IconButton onClick={onClose} size="small">
                        <CloseIcon />
                    </IconButton>
                </Stack>
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    {/* Left Column - Main Content */}
                    <Grid item xs={12} md={8}>
                        <Stack spacing={2}>
                            {/* Risk Header */}
                            <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                                <Stack spacing={1.5}>
                                    <Typography variant="h6">
                                        {risk.title}
                                    </Typography>
                                    <Stack direction="row" spacing={1} flexWrap="wrap">
                                        <Chip
                                            size="small"
                                            color={getRiskSeverityColor(risk.severity)}
                                            label={`${risk.severity.toUpperCase()} SEVERITY`}
                                        />
                                        <Chip
                                            size="small"
                                            color={getRiskStatusColor(risk.status)}
                                            label={formatStatusLabel(risk.status)}
                                        />
                                        <Chip
                                            size="small"
                                            variant="outlined"
                                            color={risk.creationType === 'SYSTEM_AUTO_CREATION' ? 'info' : 'default'}
                                            label={risk.creationType === 'SYSTEM_AUTO_CREATION' ? 'AUTO-CREATED' : 'MANUAL'}
                                        />
                                    </Stack>
                                </Stack>
                            </Paper>

                            {/* Risk Assessment - If/Then Logic (only show if at least one field has content) */}
                            {(risk.hypothesis || risk.condition || risk.consequence || risk.description) && (
                                <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                                    <Typography variant="h6" sx={{ mb: 1.5 }}>
                                        Risk Assessment
                                    </Typography>
                                    <Stack spacing={1.5}>
                                        {risk.hypothesis && (
                                            <Box>
                                                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.5 }}>
                                                    HYPOTHESIS
                                                </Typography>
                                                <Typography variant="body2">
                                                    {risk.hypothesis}
                                                </Typography>
                                            </Box>
                                        )}

                                        {risk.condition && (
                                            <Box sx={{ bgcolor: 'grey.50', p: 1.5, borderRadius: 1, border: '1px solid', borderColor: 'grey.200' }}>
                                                <Typography variant="subtitle2" color="warning.main" fontWeight={600} sx={{ mb: 0.5 }}>
                                                    RISK CONDITION
                                                </Typography>
                                                <Typography variant="body2" color="warning.dark">
                                                    {risk.condition}
                                                </Typography>
                                            </Box>
                                        )}

                                        {risk.consequence && (
                                            <Box sx={{ bgcolor: 'error.50', p: 1.5, borderRadius: 1, border: '1px solid', borderColor: 'error.200' }}>
                                                <Typography variant="subtitle2" color="error.main" fontWeight={600} sx={{ mb: 0.5 }}>
                                                    POTENTIAL CONSEQUENCE
                                                </Typography>
                                                <Typography variant="body2" color="error.dark">
                                                    {risk.consequence}
                                                </Typography>
                                            </Box>
                                        )}

                                        {!risk.hypothesis && !risk.condition && !risk.consequence && risk.description && (
                                            <Box>
                                                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.5 }}>
                                                    DESCRIPTION
                                                </Typography>
                                                <Typography variant="body2">
                                                    {risk.description}
                                                </Typography>
                                            </Box>
                                        )}
                                    </Stack>
                                </Paper>
                            )}

                            {/* Policy Context */}
                            {risk.policyRequirementSnapshot && (
                                <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                                    <Typography variant="h6" sx={{ mb: 1.5 }}>
                                        Policy Context
                                    </Typography>
                                    <Stack spacing={1.5}>
                                        <Grid container spacing={1.5}>
                                            <Grid item xs={6}>
                                                <Typography variant="subtitle2" sx={{ mb: 0.5 }}>Field</Typography>
                                                <Typography variant="body2">
                                                    {risk.policyRequirementSnapshot.fieldLabel}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Typography variant="subtitle2" sx={{ mb: 0.5 }}>Requirement</Typography>
                                                <Typography variant="body2">
                                                    {risk.policyRequirementSnapshot?.activeRule?.label || risk.policyRequirementSnapshot?.activeRule?.value || '—'}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Typography variant="subtitle2" sx={{ mb: 0.5 }}>App Rating</Typography>
                                                {(() => {
                                                    const ratingInfo = getRatingInfo(risk.policyRequirementSnapshot.activeRule);
                                                    return ratingInfo ? (
                                                        <Chip
                                                            size="small"
                                                            variant="outlined"
                                                            label={`${ratingInfo.type}: ${ratingInfo.value}`}
                                                        />
                                                    ) : (
                                                        <Typography variant="body2">—</Typography>
                                                    );
                                                })()}
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Typography variant="subtitle2" sx={{ mb: 0.5 }}>TTL</Typography>
                                                <Typography variant="body2">
                                                    {risk.policyRequirementSnapshot.activeRule.ttl}
                                                </Typography>
                                            </Grid>
                                        </Grid>

                                        {/* Compliance Frameworks */}
                                        {risk.policyRequirementSnapshot.complianceFrameworks.length > 0 && (
                                            <Box>
                                                <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                                                    Compliance Frameworks
                                                </Typography>
                                                <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
                                                    {risk.policyRequirementSnapshot.complianceFrameworks.map((framework, index) => (
                                                        <Tooltip
                                                            key={index}
                                                            title={`Controls: ${framework.controls.join(', ')}`}
                                                        >
                                                            <Chip
                                                                size="small"
                                                                variant="outlined"
                                                                label={framework.framework}
                                                                color="primary"
                                                            />
                                                        </Tooltip>
                                                    ))}
                                                </Stack>
                                            </Box>
                                        )}
                                    </Stack>
                                </Paper>
                            )}

                            {/* Supporting Evidence */}
                            <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                                <Typography variant="h6" sx={{ mb: 1.5 }}>
                                    Supporting Evidence
                                </Typography>
                                {evidenceData && evidenceData.items && evidenceData.items.length > 0 ? (
                                    <List disablePadding>
                                        {evidenceData.items.map((evidence: any, index: number) => (
                                            <ListItem
                                                key={evidence.evidenceId || index}
                                                disablePadding
                                                sx={{
                                                    py: 1,
                                                    borderBottom: index < evidenceData.items.length - 1 ? '1px solid' : 'none',
                                                    borderColor: 'divider'
                                                }}
                                            >
                                                <DocumentIcon fontSize="small" sx={{ mr: 1.5, color: 'text.secondary' }} />
                                                <ListItemText
                                                    primary={
                                                        <Link
                                                            href={evidence.urlAtVersion || evidence.uri}
                                                            target="_blank"
                                                            variant="body2"
                                                            sx={{
                                                                fontWeight: 500,
                                                                textDecoration: 'none',
                                                                '&:hover': { textDecoration: 'underline' }
                                                            }}
                                                        >
                                                            {evidence.documentTitle || evidence.documentId || evidence.type?.replace('_', ' ') || 'Unknown Document'}
                                                        </Link>
                                                    }
                                                    secondary={
                                                        <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
                                                            {evidence.type && (
                                                                <Chip
                                                                    size="small"
                                                                    label={evidence.type.replace('_', ' ')}
                                                                    variant="outlined"
                                                                    sx={{ height: 20, fontSize: '0.7rem' }}
                                                                />
                                                            )}
                                                            {evidence.status && (
                                                                <Chip
                                                                    size="small"
                                                                    label={evidence.status}
                                                                    color={evidence.status === 'active' ? 'success' : 'default'}
                                                                    variant="outlined"
                                                                    sx={{ height: 20, fontSize: '0.7rem' }}
                                                                />
                                                            )}
                                                        </Stack>
                                                    }
                                                />
                                            </ListItem>
                                        ))}
                                    </List>
                                ) : (
                                    <Typography variant="body2" color="text.secondary">
                                        No evidence attached yet
                                    </Typography>
                                )}
                            </Paper>
                        </Stack>
                    </Grid>

                    {/* Right Column - Metadata & Actions */}
                    <Grid item xs={12} md={4}>
                        <Stack spacing={2}>
                            {/* Assignment & Timeline */}
                            <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                                <Typography variant="h6" sx={{ mb: 1.5 }}>
                                    Assignment & Timeline
                                </Typography>
                                <Stack spacing={1.5}>
                                    <Box>
                                        <Typography variant="subtitle2" sx={{ mb: 0.5 }}>Assigned SME</Typography>
                                        <Typography variant="body2" fontWeight={600}>
                                            {risk.assignedSme || 'Unassigned'}
                                        </Typography>
                                    </Box>

                                    <Box>
                                        <Typography variant="subtitle2" sx={{ mb: 0.5 }}>Raised By</Typography>
                                        <Typography variant="body2">
                                            {risk.raisedBy}
                                        </Typography>
                                    </Box>

                                    <Box>
                                        <Typography variant="subtitle2" sx={{ mb: 0.5 }}>Opened</Typography>
                                        <Typography variant="body2">
                                            {formatDate(risk.openedAt)}
                                        </Typography>
                                    </Box>

                                    {risk.assignedAt && (
                                        <Box>
                                            <Typography variant="subtitle2" sx={{ mb: 0.5 }}>Assigned</Typography>
                                            <Typography variant="body2">
                                                {formatDate(risk.assignedAt)}
                                            </Typography>
                                        </Box>
                                    )}

                                    {risk.lastReviewedAt && (
                                        <Box>
                                            <Typography variant="subtitle2" sx={{ mb: 0.5 }}>Last Reviewed</Typography>
                                            <Typography variant="body2">
                                                {formatDate(risk.lastReviewedAt)}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                by {risk.lastReviewedBy}
                                            </Typography>
                                        </Box>
                                    )}
                                </Stack>
                            </Paper>

                            {/* Quick Actions */}
                            <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                                <Typography variant="h6" sx={{ mb: 1.5 }}>
                                    Actions
                                </Typography>
                                <Stack spacing={1}>
                                    {canAttachEvidence && onAttachEvidence && (
                                        <Button
                                            variant="outlined"
                                            startIcon={<AttachFileIcon />}
                                            onClick={() => onAttachEvidence(risk)}
                                            fullWidth
                                        >
                                            Attach Evidence
                                        </Button>
                                    )}
                                    {!canAttachEvidence && (
                                        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 1 }}>
                                            No actions available for current status
                                        </Typography>
                                    )}
                                </Stack>
                            </Paper>

                            {/* Technical Details */}
                            <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                                <Typography variant="h6" sx={{ mb: 1.5 }}>
                                    Technical Details
                                </Typography>
                                <Stack spacing={1}>
                                    <Box>
                                        <Typography variant="caption" color="text.secondary">Field Key</Typography>
                                        <Typography variant="body2">{risk.fieldKey || '—'}</Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="caption" color="text.secondary">Evidence Count</Typography>
                                        <Typography variant="body2">
                                            {evidenceData?.items?.length || risk.evidenceCount || 0} {(evidenceData?.items?.length || risk.evidenceCount || 0) === 1 ? 'piece' : 'pieces'}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="caption" color="text.secondary">Created</Typography>
                                        <Typography variant="body2">{formatDate(risk.createdAt)}</Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="caption" color="text.secondary">Last Updated</Typography>
                                        <Typography variant="body2">{formatDate(risk.updatedAt)}</Typography>
                                    </Box>
                                </Stack>
                            </Paper>
                        </Stack>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}
