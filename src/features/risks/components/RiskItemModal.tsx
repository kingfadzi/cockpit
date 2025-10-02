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
    Paper,
    Divider,
    IconButton,
    Grid,
    Link,
} from '@mui/material';
import {
    Close as CloseIcon,
    Description as EvidenceIcon,
    Policy as PolicyIcon,
    Schedule as ScheduleIcon,
} from '@mui/icons-material';
import { RiskItem } from '../../../api/types';
import { useProfileFieldEvidence } from '../../../api/hooks';

interface RiskItemModalProps {
    open: boolean;
    onClose: () => void;
    riskItem: RiskItem | null;
}

const getSeverityColor = (severity: string) => {
    switch (severity?.toLowerCase()) {
        case 'critical':
            return 'error';
        case 'high':
            return 'error';
        case 'medium':
            return 'warning';
        case 'low':
            return 'default';
        default:
            return 'default';
    }
};

const getStatusColor = (status: string) => {
    switch (status) {
        case 'PENDING_SME_REVIEW':
            return 'warning';
        case 'UNDER_REVIEW':
            return 'info';
        case 'SME_APPROVED':
            return 'success';
        case 'SME_REJECTED':
            return 'error';
        default:
            return 'default';
    }
};

export default function RiskItemModal({ open, onClose, riskItem }: RiskItemModalProps) {
    const { data: evidenceData } = useProfileFieldEvidence(riskItem?.profileFieldId);

    if (!riskItem) return null;

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography variant="h6" fontWeight={600}>
                        Risk Item Details
                    </Typography>
                    <IconButton onClick={onClose} size="small">
                        <CloseIcon />
                    </IconButton>
                </Stack>
            </DialogTitle>

            <DialogContent>
                <Stack spacing={3}>
                    {/* Header with severity and status */}
                    <Stack direction="row" spacing={1}>
                        <Chip
                            label={riskItem.severity.toUpperCase()}
                            color={getSeverityColor(riskItem.severity)}
                            size="small"
                        />
                        <Chip
                            label={riskItem.status.replace(/_/g, ' ')}
                            color={getStatusColor(riskItem.status)}
                            size="small"
                            variant="outlined"
                        />
                        <Chip
                            label={riskItem.domainTitle}
                            size="small"
                            variant="outlined"
                        />
                    </Stack>

                    {/* Risk Assessment */}
                    <Paper variant="outlined" sx={{ p: 2 }}>
                        <Stack spacing={2}>
                            <Box>
                                <Typography variant="subtitle2" fontWeight={600} color="text.secondary">
                                    Control Field
                                </Typography>
                                <Typography variant="body1" fontWeight={500}>
                                    {riskItem.fieldLabel}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {riskItem.fieldKey}
                                </Typography>
                            </Box>

                            <Divider />

                            <Box>
                                <Typography variant="subtitle2" fontWeight={600} color="text.secondary" sx={{ mb: 0.5 }}>
                                    Risk Title
                                </Typography>
                                <Typography variant="body2">
                                    {riskItem.title}
                                </Typography>
                            </Box>

                            {riskItem.hypothesis && (
                                <Box>
                                    <Typography variant="subtitle2" fontWeight={600} color="text.secondary" sx={{ mb: 0.5 }}>
                                        Hypothesis
                                    </Typography>
                                    <Typography variant="body2">
                                        {riskItem.hypothesis}
                                    </Typography>
                                </Box>
                            )}

                            {riskItem.condition && (
                                <Box>
                                    <Typography variant="subtitle2" fontWeight={600} color="text.secondary" sx={{ mb: 0.5 }}>
                                        Condition
                                    </Typography>
                                    <Typography variant="body2">
                                        {riskItem.condition}
                                    </Typography>
                                </Box>
                            )}

                            {riskItem.consequence && (
                                <Box>
                                    <Typography variant="subtitle2" fontWeight={600} color="text.secondary" sx={{ mb: 0.5 }}>
                                        Consequence
                                    </Typography>
                                    <Typography variant="body2">
                                        {riskItem.consequence}
                                    </Typography>
                                </Box>
                            )}
                        </Stack>
                    </Paper>

                    {/* Two-column layout for metadata */}
                    <Grid container spacing={2}>
                        {/* Left: Evidence */}
                        <Grid item xs={12} md={6}>
                            <Paper variant="outlined" sx={{ p: 2 }}>
                                <Stack spacing={1.5}>
                                    <Stack direction="row" alignItems="center" spacing={1}>
                                        <EvidenceIcon fontSize="small" color="action" />
                                        <Typography variant="subtitle2" fontWeight={600}>
                                            Evidence ({riskItem.evidenceCount})
                                        </Typography>
                                    </Stack>

                                    {evidenceData?.items?.length > 0 ? (
                                        evidenceData.items.slice(0, 3).map((evidence: any) => (
                                            <Box key={evidence.evidenceId}>
                                                <Link href={evidence.uri} target="_blank" variant="body2">
                                                    {evidence.documentId || evidence.type}
                                                </Link>
                                                <Typography variant="caption" color="text.secondary" display="block">
                                                    {new Date(evidence.createdAt).toLocaleDateString()}
                                                </Typography>
                                            </Box>
                                        ))
                                    ) : (
                                        <Typography variant="body2" color="text.secondary">
                                            No evidence attached
                                        </Typography>
                                    )}

                                    {evidenceData?.items?.length > 3 && (
                                        <Typography variant="caption" color="text.secondary">
                                            + {evidenceData.items.length - 3} more
                                        </Typography>
                                    )}
                                </Stack>
                            </Paper>
                        </Grid>

                        {/* Right: Metadata */}
                        <Grid item xs={12} md={6}>
                            <Paper variant="outlined" sx={{ p: 2 }}>
                                <Stack spacing={1.5}>
                                    <Stack direction="row" alignItems="center" spacing={1}>
                                        <ScheduleIcon fontSize="small" color="action" />
                                        <Typography variant="subtitle2" fontWeight={600}>
                                            Timeline
                                        </Typography>
                                    </Stack>

                                    <Box>
                                        <Typography variant="caption" color="text.secondary">
                                            Raised By
                                        </Typography>
                                        <Typography variant="body2">
                                            {riskItem.raisedBy}
                                        </Typography>
                                    </Box>

                                    <Box>
                                        <Typography variant="caption" color="text.secondary">
                                            Assigned SME
                                        </Typography>
                                        <Typography variant="body2">
                                            {riskItem.assignedSme || 'Unassigned'}
                                        </Typography>
                                    </Box>

                                    <Box>
                                        <Typography variant="caption" color="text.secondary">
                                            Opened
                                        </Typography>
                                        <Typography variant="body2">
                                            {new Date(riskItem.openedAt).toLocaleDateString()}
                                        </Typography>
                                    </Box>

                                    {riskItem.assignedAt && (
                                        <Box>
                                            <Typography variant="caption" color="text.secondary">
                                                Assigned
                                            </Typography>
                                            <Typography variant="body2">
                                                {new Date(riskItem.assignedAt).toLocaleDateString()}
                                            </Typography>
                                        </Box>
                                    )}
                                </Stack>
                            </Paper>
                        </Grid>
                    </Grid>

                    {/* Policy Snapshot */}
                    {riskItem.policyRequirementSnapshot && (
                        <Paper variant="outlined" sx={{ p: 2 }}>
                            <Stack spacing={1.5}>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <PolicyIcon fontSize="small" color="action" />
                                    <Typography variant="subtitle2" fontWeight={600}>
                                        Policy Context
                                    </Typography>
                                </Stack>

                                {riskItem.policyRequirementSnapshot.activeRule && (
                                    <Box>
                                        <Typography variant="caption" color="text.secondary">
                                            Policy Requirement
                                        </Typography>
                                        <Typography variant="body2">
                                            {riskItem.policyRequirementSnapshot.activeRule.label} (TTL: {riskItem.policyRequirementSnapshot.activeRule.ttl})
                                        </Typography>
                                    </Box>
                                )}

                                {riskItem.policyRequirementSnapshot.complianceFrameworks && riskItem.policyRequirementSnapshot.complianceFrameworks.length > 0 && (
                                    <Box>
                                        <Typography variant="caption" color="text.secondary">
                                            Compliance Frameworks
                                        </Typography>
                                        <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap sx={{ mt: 0.5 }}>
                                            {riskItem.policyRequirementSnapshot.complianceFrameworks.map((fw, idx) => (
                                                <Chip
                                                    key={idx}
                                                    label={`${fw.framework}: ${fw.controls.join(', ')}`}
                                                    size="small"
                                                    variant="outlined"
                                                />
                                            ))}
                                        </Stack>
                                    </Box>
                                )}
                            </Stack>
                        </Paper>
                    )}
                </Stack>
            </DialogContent>

            <DialogActions sx={{ p: 2 }}>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}
