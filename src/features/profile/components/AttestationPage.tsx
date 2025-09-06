import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Stack,
    Box,
    Paper,
    Checkbox,
    FormControlLabel,
    TextField,
    Alert,
    Divider,
    IconButton,
    Link,
    Chip,
} from '@mui/material';
import {
    Close as CloseIcon,
    Security as AttestationIcon,
    OpenInNew as OpenInNewIcon,
    CheckCircle as CheckIcon,
} from '@mui/icons-material';
import { useSubmitAttestation } from '../../../api/hooks';

interface Attestation {
    evidenceId: string;
    documentTitle: string;
    documentSourceType: string;
    linkedAt: string;
    submittedBy: string;
    status?: 'pending' | 'attested' | 'expired';
    validUntil?: string;
}

interface AttestationPageProps {
    open: boolean;
    onClose: () => void;
    fieldLabel: string;
    attestation: Attestation;
    profileFieldId: string;
    appId: string;
}

export default function AttestationPage({ 
    open, 
    onClose, 
    fieldLabel, 
    attestation,
    profileFieldId,
    appId
}: AttestationPageProps) {
    const [checklist, setChecklist] = useState({
        accurate: false,
        verified: false,
        implemented: false,
        responsibility: false
    });
    const [comments, setComments] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const allChecked = Object.values(checklist).every(Boolean);
    const submitAttestationMutation = useSubmitAttestation(appId, profileFieldId);

    const handleChecklistChange = (key: keyof typeof checklist) => {
        setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleAttest = async () => {
        if (!allChecked) return;
        
        setIsSubmitting(true);
        setError(null);
        try {
            await submitAttestationMutation.mutateAsync({
                profileFieldId,
                evidenceId: attestation.evidenceId,
                attestationType: 'compliance',
                attestationComments: comments.trim() || undefined,
                attestedBy: 'current-user', // TODO: Get from auth context
            });
            
            // Close modal and refresh data
            onClose();
        } catch (error) {
            console.error('Failed to submit attestation:', error);
            const errorMessage = error instanceof Error ? error.message : 'Failed to submit attestation. Please try again.';
            setError(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <AttestationIcon color="primary" />
                        <Typography variant="h6">
                            Attestation: {fieldLabel}
                        </Typography>
                    </Stack>
                    <IconButton onClick={onClose} size="small">
                        <CloseIcon />
                    </IconButton>
                </Stack>
            </DialogTitle>
            
            <DialogContent>
                <Stack spacing={3}>
                    {/* Header Section */}
                    <Paper sx={{ p: 2, bgcolor: 'primary.50' }}>
                        <Stack spacing={1}>
                            <Typography variant="subtitle2" color="primary.main">
                                Optional Control Attestation
                            </Typography>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <Typography variant="body1" fontWeight={600}>
                                    {attestation.documentTitle}
                                </Typography>
                                <Link 
                                    href="#" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    sx={{ display: 'flex', alignItems: 'center' }}
                                >
                                    <OpenInNewIcon fontSize="small" />
                                </Link>
                            </Stack>
                            <Stack direction="row" spacing={2}>
                                <Chip size="small" label={attestation.documentSourceType} variant="outlined" />
                                <Typography variant="body2" color="text.secondary">
                                    Submitted by {attestation.submittedBy} on {formatDate(attestation.linkedAt)}
                                </Typography>
                            </Stack>
                        </Stack>
                    </Paper>

                    {/* Control Description */}
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Control Description
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            This control helps ensure proper {fieldLabel.toLowerCase()} implementation. 
                            While not mandatory, implementing this control strengthens your security posture 
                            and demonstrates commitment to best practices.
                        </Typography>
                    </Box>

                    {/* Impact Statement */}
                    <Paper sx={{ p: 2, bgcolor: 'warning.50' }}>
                        <Typography variant="subtitle2" color="warning.dark" gutterBottom>
                            Security Impact
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <strong>This control helps protect against:</strong> Data breaches, unauthorized access, 
                            and compliance violations related to {fieldLabel.toLowerCase()}.
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            <strong>Without proper implementation:</strong> Your assets may be vulnerable to 
                            security incidents that could impact business operations and regulatory compliance.
                        </Typography>
                    </Paper>

                    {/* Attestation Checklist */}
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Attestation Requirements
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            Please confirm the following before proceeding with your attestation:
                        </Typography>
                        
                        <Stack spacing={1}>
                            <FormControlLabel
                                control={
                                    <Checkbox 
                                        checked={checklist.accurate}
                                        onChange={() => handleChecklistChange('accurate')}
                                    />
                                }
                                label="I confirm this document accurately represents our current implementation"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox 
                                        checked={checklist.verified}
                                        onChange={() => handleChecklistChange('verified')}
                                    />
                                }
                                label="I have verified the information is up-to-date and reflects our actual practices"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox 
                                        checked={checklist.implemented}
                                        onChange={() => handleChecklistChange('implemented')}
                                    />
                                }
                                label="I acknowledge this control is properly implemented and maintained"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox 
                                        checked={checklist.responsibility}
                                        onChange={() => handleChecklistChange('responsibility')}
                                    />
                                }
                                label="I understand my responsibility for keeping this attestation current"
                            />
                        </Stack>
                    </Box>

                    {/* Comments */}
                    <Box>
                        <TextField
                            label="Additional Comments (Optional)"
                            multiline
                            rows={3}
                            fullWidth
                            value={comments}
                            onChange={(e) => setComments(e.target.value)}
                            placeholder="Add any additional context or notes about this attestation..."
                        />
                    </Box>

                    {/* Attestation Form Info */}
                    <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
                        <Typography variant="subtitle2" gutterBottom>
                            Attestation Details
                        </Typography>
                        <Stack spacing={1}>
                            <Typography variant="body2">
                                <strong>Attestor:</strong> Current User {/* TODO: Get from auth context */}
                            </Typography>
                            <Typography variant="body2">
                                <strong>Date:</strong> {new Date().toLocaleDateString()}
                            </Typography>
                            <Typography variant="body2">
                                <strong>Validity Period:</strong> 365 days {/* TODO: Get from policy requirement */}
                            </Typography>
                        </Stack>
                    </Paper>

                    {/* Warning */}
                    {!allChecked && (
                        <Alert severity="info">
                            Please complete all required confirmations above to proceed with your attestation.
                        </Alert>
                    )}

                    {error && (
                        <Alert severity="error">
                            {error}
                        </Alert>
                    )}
                </Stack>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>
                    Cancel
                </Button>
                <Button 
                    variant="contained" 
                    onClick={handleAttest}
                    disabled={!allChecked || isSubmitting}
                    startIcon={isSubmitting ? undefined : <CheckIcon />}
                >
                    {isSubmitting ? 'Submitting...' : 'Attest & Approve'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}