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
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Link,
} from '@mui/material';
import {
    Close as CloseIcon,
    Security as AttestationIcon,
    OpenInNew as OpenInNewIcon,
} from '@mui/icons-material';
import AttestationPage from './AttestationPage';

interface Attestation {
    evidenceId: string;
    documentTitle: string;
    documentSourceType: string;
    linkedAt: string;
    submittedBy: string;
    status?: 'pending' | 'attested' | 'expired';
    validUntil?: string;
}

interface AttestationListModalProps {
    open: boolean;
    onClose: () => void;
    fieldLabel: string;
    attestations: Attestation[];
    profileFieldId: string;
    appId: string;
}

export default function AttestationListModal({ 
    open, 
    onClose, 
    fieldLabel, 
    attestations,
    profileFieldId,
    appId
}: AttestationListModalProps) {
    const [selectedAttestation, setSelectedAttestation] = useState<Attestation | null>(null);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'attested': return 'success';
            case 'pending': return 'warning';
            case 'expired': return 'error';
            default: return 'default';
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const handleAttestationClick = (attestation: Attestation) => {
        setSelectedAttestation(attestation);
    };

    const handleAttestationPageClose = () => {
        setSelectedAttestation(null);
    };

    return (
        <>
            <Dialog open={open && !selectedAttestation} onClose={onClose} maxWidth="lg" fullWidth>
                <DialogTitle>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <AttestationIcon color="primary" />
                            <Typography variant="h6">
                                Attestations for {fieldLabel}
                            </Typography>
                        </Stack>
                        <IconButton onClick={onClose} size="small">
                            <CloseIcon />
                        </IconButton>
                    </Stack>
                </DialogTitle>
                
                <DialogContent>
                    {attestations.length === 0 ? (
                        <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
                            No attestations found for this field.
                        </Typography>
                    ) : (
                        <TableContainer>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ minWidth: 250 }}>Document</TableCell>
                                        <TableCell sx={{ minWidth: 120 }}>Source Type</TableCell>
                                        <TableCell sx={{ minWidth: 120 }}>Submitted By</TableCell>
                                        <TableCell sx={{ minWidth: 120 }}>Linked At</TableCell>
                                        <TableCell sx={{ minWidth: 100 }}>Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {attestations.map((attestation) => (
                                        <TableRow 
                                            key={attestation.evidenceId}
                                            hover
                                            onClick={() => handleAttestationClick(attestation)}
                                            sx={{ 
                                                cursor: 'pointer',
                                                '&:hover': { bgcolor: 'action.hover' }
                                            }}
                                        >
                                            <TableCell>
                                                <Typography variant="body2" fontWeight={500}>
                                                    {attestation.documentTitle}
                                                    <OpenInNewIcon sx={{ ml: 0.5, fontSize: '0.75rem' }} />
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    size="small"
                                                    label={attestation.documentSourceType}
                                                    variant="outlined"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="body2">
                                                    {attestation.submittedBy}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="body2">
                                                    {formatDate(attestation.linkedAt)}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    size="small"
                                                    label={attestation.status || 'Pending'}
                                                    color={getStatusColor(attestation.status || 'pending') as any}
                                                    variant="outlined"
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </DialogContent>

                <DialogActions>
                    <Button onClick={onClose}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Individual Attestation Page */}
            {selectedAttestation && (
                <AttestationPage
                    open={!!selectedAttestation}
                    onClose={handleAttestationPageClose}
                    fieldLabel={fieldLabel}
                    attestation={selectedAttestation}
                    profileFieldId={profileFieldId}
                    appId={appId}
                />
            )}
        </>
    );
}