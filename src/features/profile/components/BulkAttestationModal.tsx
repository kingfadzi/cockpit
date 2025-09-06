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
    Checkbox,
    FormControlLabel,
    TextField,
    Alert,
    List,
    ListItem,
    ListItemText,
    Chip,
    IconButton,
    Stepper,
    Step,
    StepLabel,
    Divider,
} from '@mui/material';
import {
    Close as CloseIcon,
    Warning as WarningIcon,
    CheckCircle as CheckIcon,
} from '@mui/icons-material';
import type { ProfileField } from '../../../api/types';

interface BulkAttestationModalProps {
    open: boolean;
    onClose: () => void;
    selectedFields: ProfileField[];
    domainName: string;
    onSubmit: (attestationData: {
        fields: { profileFieldId: string; fieldKey: string }[];
        comments: string;
    }) => Promise<void>;
}

const steps = ['Review Selection', 'Complete Attestation'];

export default function BulkAttestationModal({
    open,
    onClose,
    selectedFields,
    domainName,
    onSubmit,
}: BulkAttestationModalProps) {
    const [activeStep, setActiveStep] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [comments, setComments] = useState('');
    const [error, setError] = useState<string | null>(null);
    
    // Checklist state
    const [checklist, setChecklist] = useState({
        reviewedEvidence: false,
        confirmCompliance: false,
        understandResponsibility: false,
    });

    const allChecked = Object.values(checklist).every(Boolean);

    const handleNext = () => {
        setActiveStep((prevStep) => prevStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    const handleClose = () => {
        // Reset state when closing
        setActiveStep(0);
        setComments('');
        setError(null);
        setChecklist({
            reviewedEvidence: false,
            confirmCompliance: false,
            understandResponsibility: false,
        });
        onClose();
    };

    const handleSubmit = async () => {
        if (!allChecked) return;

        setIsSubmitting(true);
        setError(null);
        try {
            const attestationData = {
                fields: selectedFields.map(field => ({
                    profileFieldId: field.profileFieldId,
                    fieldKey: field.fieldKey,
                })),
                comments: comments.trim(),
            };

            await onSubmit(attestationData);
            handleClose();
        } catch (error) {
            console.error('Failed to submit bulk attestation:', error);
            const errorMessage = error instanceof Error ? error.message : 'Failed to submit bulk attestation. Please try again.';
            setError(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChecklistChange = (key: keyof typeof checklist) => {
        setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const renderReviewStep = () => (
        <Box>
            <Stack spacing={2}>
                <Alert severity="info" icon={<WarningIcon />}>
                    You are about to attest to compliance for <strong>{selectedFields.length} fields</strong> in the <strong>{domainName}</strong> domain. 
                    Please review all selected fields before proceeding.
                </Alert>

                <Typography variant="h6">Selected Fields ({selectedFields.length})</Typography>
                
                <Box sx={{ maxHeight: 300, overflow: 'auto' }}>
                    <List dense>
                        {selectedFields.map((field) => (
                            <ListItem key={field.profileFieldId}>
                                <ListItemText
                                    primary={field.label}
                                    secondary={
                                        <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
                                            <Chip
                                                size="small"
                                                label={field.approvalStatus || 'Unknown'}
                                                color={
                                                    field.approvalStatus === 'approved' || field.approvalStatus === 'user_attested' ? 'success' :
                                                    field.approvalStatus === 'pending' ? 'warning' : 'error'
                                                }
                                                variant="outlined"
                                            />
                                            <Chip
                                                size="small"
                                                label={field.freshnessStatus || 'Unknown'}
                                                color={
                                                    field.freshnessStatus === 'current' ? 'success' :
                                                    field.freshnessStatus === 'expiring' ? 'warning' : 'error'
                                                }
                                                variant="outlined"
                                            />
                                            <Typography variant="caption" color="text.secondary">
                                                {field.evidence?.length || 0} evidence items
                                            </Typography>
                                        </Stack>
                                    }
                                />
                            </ListItem>
                        ))}
                    </List>
                </Box>

                <Alert severity="warning">
                    <Typography variant="body2">
                        <strong>Important:</strong> Bulk attestation will apply the same attestation status and comments 
                        to all selected fields. Make sure you have reviewed the evidence for each field individually.
                    </Typography>
                </Alert>
            </Stack>
        </Box>
    );

    const renderAttestationStep = () => (
        <Box>
            <Stack spacing={3}>
                <Alert severity="info">
                    <Typography variant="body2">
                        Complete the attestation for <strong>{selectedFields.length} fields</strong> in the <strong>{domainName}</strong> domain.
                    </Typography>
                </Alert>

                <Box>
                    <Typography variant="subtitle1" gutterBottom>
                        Required Confirmations
                    </Typography>
                    <Stack spacing={1}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={checklist.reviewedEvidence}
                                    onChange={() => handleChecklistChange('reviewedEvidence')}
                                    size="small"
                                />
                            }
                            label="I have reviewed all evidence for the selected fields"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={checklist.confirmCompliance}
                                    onChange={() => handleChecklistChange('confirmCompliance')}
                                    size="small"
                                />
                            }
                            label="I confirm compliance for all selected fields"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={checklist.understandResponsibility}
                                    onChange={() => handleChecklistChange('understandResponsibility')}
                                    size="small"
                                />
                            }
                            label="I understand my responsibility for keeping these attestations current"
                        />
                    </Stack>
                </Box>

                <Box>
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label="Comments (Optional)"
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                        placeholder="Add any additional context or notes about this bulk attestation..."
                        helperText="These comments will be applied to all selected fields"
                    />
                </Box>

                {!allChecked && (
                    <Alert severity="warning">
                        Please complete all required confirmations above to proceed with bulk attestation.
                    </Alert>
                )}

                {error && (
                    <Alert severity="error">
                        {error}
                    </Alert>
                )}
            </Stack>
        </Box>
    );

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogTitle>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography variant="h6">
                        Bulk Attestation - {domainName}
                    </Typography>
                    <IconButton onClick={handleClose} size="small">
                        <CloseIcon />
                    </IconButton>
                </Stack>
            </DialogTitle>

            <DialogContent>
                <Stack spacing={3}>
                    <Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                    <Divider />

                    {activeStep === 0 && renderReviewStep()}
                    {activeStep === 1 && renderAttestationStep()}
                </Stack>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose} disabled={isSubmitting}>
                    Cancel
                </Button>
                
                {activeStep > 0 && (
                    <Button onClick={handleBack} disabled={isSubmitting}>
                        Back
                    </Button>
                )}

                {activeStep === 0 ? (
                    <Button 
                        onClick={handleNext} 
                        variant="contained"
                        disabled={selectedFields.length === 0}
                    >
                        Continue to Attestation
                    </Button>
                ) : (
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        disabled={!allChecked || isSubmitting}
                        startIcon={isSubmitting ? undefined : <CheckIcon />}
                    >
                        {isSubmitting ? 'Submitting...' : `Submit ${selectedFields.length} Attestations`}
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
}