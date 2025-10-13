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
    Grid,
    Tooltip,
} from '@mui/material';
import {
    Close as CloseIcon,
    CheckCircle as ApproveIcon,
    Cancel as RejectIcon,
    Warning as WarningIcon,
    Info as InfoIcon,
    InsertDriveFile as FileIcon,
    Link as LinkIcon,
    CalendarToday as CalendarIcon,
    Person as PersonIcon,
} from '@mui/icons-material';
import { useReviewEvidence } from '../../../api/hooks';
import type { PendingEvidenceItem, EvidenceReviewRequest } from '../../../api/types';

interface EvidenceReviewModalProps {
    open: boolean;
    onClose: () => void;
    evidence: PendingEvidenceItem | null;
    smeEmail: string;
}

export default function EvidenceReviewModal({ open, onClose, evidence, smeEmail }: EvidenceReviewModalProps) {
    const [action, setAction] = useState<'approve' | 'reject' | null>(null);
    const [reviewComment, setReviewComment] = useState('');
    const reviewEvidenceMutation = useReviewEvidence();

    const handleSubmit = async () => {
        if (!evidence || !action || !reviewComment.trim()) return;

        const payload: EvidenceReviewRequest = {
            action,
            reviewerId: smeEmail,
            reviewComment: reviewComment.trim(),
        };

        try {
            await reviewEvidenceMutation.mutateAsync({
                evidenceId: evidence.evidenceId,
                profileFieldId: evidence.profileFieldId,
                payload,
            });

            // Reset form and close modal
            setAction(null);
            setReviewComment('');
            onClose();
        } catch (error) {
            console.error('Failed to submit evidence review:', error);
        }
    };

    const handleClose = () => {
        setAction(null);
        setReviewComment('');
        onClose();
    };

    if (!evidence) return null;

    const getEvidenceTypeIcon = (type?: string) => {
        if (!type) return <FileIcon />;
        const lowerType = type.toLowerCase();
        if (lowerType.includes('url') || lowerType.includes('link')) return <LinkIcon />;
        return <FileIcon />;
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return '—';
        return new Date(dateString).toLocaleString();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: { borderRadius: 2 }
            }}
        >
            <DialogTitle>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Typography variant="h6" fontWeight={600}>
                            Evidence Review
                        </Typography>
                        <Chip
                            size="small"
                            label="Pending SME Review"
                            color="warning"
                            variant="outlined"
                        />
                    </Stack>
                    <IconButton onClick={handleClose} size="small">
                        <CloseIcon />
                    </IconButton>
                </Stack>
            </DialogTitle>

            <DialogContent>
                <Stack spacing={3}>
                    {/* Application & Field Context */}
                    <Paper variant="outlined" sx={{ p: 2, bgcolor: 'grey.50' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant="caption" color="text.secondary" display="block">
                                    Application
                                </Typography>
                                <Typography variant="body1" fontWeight={600}>
                                    {evidence.appName || evidence.appId}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="caption" color="text.secondary" display="block">
                                    Field / Requirement
                                </Typography>
                                <Typography variant="body1" fontWeight={600}>
                                    {evidence.fieldLabel}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="caption" color="text.secondary" display="block">
                                    Field Key
                                </Typography>
                                <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                                    {evidence.fieldKey}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>

                    {/* Evidence Details */}
                    <Box>
                        <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1.5 }}>
                            Evidence Details
                        </Typography>
                        <Paper variant="outlined" sx={{ p: 2 }}>
                            <Stack spacing={2}>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    {getEvidenceTypeIcon(evidence.evidenceType)}
                                    <Box sx={{ flex: 1 }}>
                                        <Typography variant="body2" fontWeight={600}>
                                            {evidence.evidenceType || 'Document'}
                                        </Typography>
                                        {evidence.evidenceMetadata?.documentId && (
                                            <Typography variant="caption" color="text.secondary">
                                                Document ID: {evidence.evidenceMetadata.documentId}
                                            </Typography>
                                        )}
                                    </Box>
                                    <Chip
                                        size="small"
                                        label={evidence.profileFieldCriticality || 'MEDIUM'}
                                        color={
                                            evidence.profileFieldCriticality === 'CRITICAL' || evidence.profileFieldCriticality === 'HIGH'
                                                ? 'error'
                                                : evidence.profileFieldCriticality === 'MEDIUM'
                                                ? 'warning'
                                                : 'default'
                                        }
                                        variant="outlined"
                                    />
                                </Stack>

                                <Divider />

                                {/* Evidence URI/Link */}
                                {evidence.evidenceUri && (
                                    <Box>
                                        <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 0.5 }}>
                                            Evidence Link
                                        </Typography>
                                        <Link
                                            href={evidence.evidenceUri}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            variant="body2"
                                            sx={{ wordBreak: 'break-all' }}
                                        >
                                            {evidence.evidenceUri}
                                        </Link>
                                    </Box>
                                )}

                                {/* Evidence Description */}
                                {evidence.evidenceMetadata?.description && (
                                    <Box>
                                        <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 0.5 }}>
                                            Description
                                        </Typography>
                                        <Typography variant="body2">
                                            {evidence.evidenceMetadata.description}
                                        </Typography>
                                    </Box>
                                )}

                                {/* Submission Details */}
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <Stack direction="row" spacing={1} alignItems="center">
                                            <PersonIcon fontSize="small" color="action" />
                                            <Box>
                                                <Typography variant="caption" color="text.secondary" display="block">
                                                    Submitted By
                                                </Typography>
                                                <Typography variant="body2">
                                                    {evidence.submittedBy || evidence.linkedBy || '—'}
                                                </Typography>
                                            </Box>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Stack direction="row" spacing={1} alignItems="center">
                                            <CalendarIcon fontSize="small" color="action" />
                                            <Box>
                                                <Typography variant="caption" color="text.secondary" display="block">
                                                    Submitted At
                                                </Typography>
                                                <Typography variant="body2">
                                                    {formatDate(evidence.submittedAt || evidence.linkedAt)}
                                                </Typography>
                                            </Box>
                                        </Stack>
                                    </Grid>
                                </Grid>

                                {/* Additional Metadata */}
                                {evidence.evidenceMetadata && Object.keys(evidence.evidenceMetadata).length > 0 && (
                                    <Box>
                                        <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 0.5 }}>
                                            Additional Metadata
                                        </Typography>
                                        <Paper variant="outlined" sx={{ p: 1, bgcolor: 'grey.50' }}>
                                            <Typography variant="caption" sx={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
                                                {JSON.stringify(evidence.evidenceMetadata, null, 2)}
                                            </Typography>
                                        </Paper>
                                    </Box>
                                )}
                            </Stack>
                        </Paper>
                    </Box>

                    {/* Review Actions */}
                    <Box>
                        <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1.5 }}>
                            SME Review Decision
                        </Typography>
                        <Paper variant="outlined" sx={{ p: 2 }}>
                            <Stack spacing={2}>
                                {/* Action Buttons */}
                                <Stack direction="row" spacing={2}>
                                    <Button
                                        variant={action === 'approve' ? 'contained' : 'outlined'}
                                        color="success"
                                        startIcon={<ApproveIcon />}
                                        onClick={() => setAction('approve')}
                                        fullWidth
                                    >
                                        Approve Evidence
                                    </Button>
                                    <Button
                                        variant={action === 'reject' ? 'contained' : 'outlined'}
                                        color="error"
                                        startIcon={<RejectIcon />}
                                        onClick={() => setAction('reject')}
                                        fullWidth
                                    >
                                        Reject Evidence
                                    </Button>
                                </Stack>

                                {/* Info Alert */}
                                {action === 'approve' && (
                                    <Alert severity="success" icon={<InfoIcon />}>
                                        Approving this evidence will reduce the risk priority score by 50% (0.5x multiplier applied).
                                    </Alert>
                                )}
                                {action === 'reject' && (
                                    <Alert severity="warning" icon={<WarningIcon />}>
                                        Rejecting this evidence will keep the risk at current priority. Product Owner will be notified.
                                    </Alert>
                                )}

                                {/* Review Comment */}
                                {action && (
                                    <TextField
                                        label="Review Comments (Required)"
                                        multiline
                                        rows={4}
                                        value={reviewComment}
                                        onChange={(e) => setReviewComment(e.target.value)}
                                        placeholder={
                                            action === 'approve'
                                                ? 'Explain why this evidence is valid and meets the requirement...'
                                                : 'Explain why this evidence is insufficient and what is needed...'
                                        }
                                        fullWidth
                                        required
                                        error={!!action && !reviewComment.trim()}
                                        helperText={
                                            !!action && !reviewComment.trim()
                                                ? 'Comments are required for evidence review'
                                                : 'These comments will be visible to the Product Owner and stored with the evidence'
                                        }
                                    />
                                )}
                            </Stack>
                        </Paper>
                    </Box>

                    {/* Impact Notice */}
                    <Alert severity="info" icon={<InfoIcon />}>
                        <Typography variant="body2" fontWeight={600} sx={{ mb: 0.5 }}>
                            Review Impact
                        </Typography>
                        <Typography variant="body2">
                            Your review decision will be recorded and associated with this evidence submission.
                            The application's risk profile will be automatically updated based on your decision.
                        </Typography>
                    </Alert>
                </Stack>
            </DialogContent>

            <DialogActions sx={{ p: 3, pt: 0 }}>
                <Button onClick={handleClose} color="inherit">
                    Cancel
                </Button>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    disabled={!action || !reviewComment.trim() || reviewEvidenceMutation.isPending}
                    color={action === 'approve' ? 'success' : action === 'reject' ? 'error' : 'primary'}
                >
                    {reviewEvidenceMutation.isPending
                        ? 'Submitting...'
                        : action === 'approve'
                        ? 'Approve Evidence'
                        : action === 'reject'
                        ? 'Reject Evidence'
                        : 'Submit Review'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
