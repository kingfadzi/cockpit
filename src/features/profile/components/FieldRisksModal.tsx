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
} from '@mui/material';
import {
    Close as CloseIcon,
    ReportProblem as RiskIcon,
} from '@mui/icons-material';
import type { Risk } from '../../../api/types';
import { useRisk } from '../../../api/hooks';
import SmeRiskItemModal from '../../sme/components/SmeRiskItemModal';

interface FieldRisksModalProps {
    open: boolean;
    onClose: () => void;
    fieldLabel: string;
    risks: Risk[];
}

export default function FieldRisksModal({ open, onClose, fieldLabel, risks }: FieldRisksModalProps) {
    const [selectedRiskId, setSelectedRiskId] = useState<string | null>(null);
    const { data: selectedRisk, isLoading: riskLoading } = useRisk(selectedRiskId || '');

    const handleRiskClick = (risk: any) => {
        console.log('Risk object:', risk);
        setSelectedRiskId(risk.risk_id);
    };

    const handleRiskModalClose = () => {
        setSelectedRiskId(null);
    };
    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case 'High': return 'error';
            case 'Medium': return 'warning';
            case 'Low': return 'info';
            default: return 'default';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Open': return 'error';
            case 'Mitigated': return 'warning';
            case 'Closed': return 'success';
            case 'PENDING_SME_REVIEW': return 'warning';
            case 'SME_APPROVED': return 'success';
            case 'SME_REJECTED': return 'error';
            default: return 'default';
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <RiskIcon color="error" />
                        <Typography variant="h6">
                            Risks for {fieldLabel}
                        </Typography>
                    </Stack>
                    <IconButton onClick={onClose} size="small">
                        <CloseIcon />
                    </IconButton>
                </Stack>
            </DialogTitle>
            
            <DialogContent>
                {risks.length === 0 ? (
                    <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
                        No risks found for this field.
                    </Typography>
                ) : (
                    <TableContainer>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ minWidth: 250 }}>Risk Title</TableCell>
                                    <TableCell sx={{ minWidth: 100 }}>Severity</TableCell>
                                    <TableCell sx={{ minWidth: 100 }}>Status</TableCell>
                                    <TableCell sx={{ minWidth: 120 }}>Opened At</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {risks.map((risk: any) => (
                                    <TableRow 
                                        key={risk.risk_id} 
                                        hover
                                        onClick={() => handleRiskClick(risk)}
                                        sx={{ 
                                            cursor: 'pointer',
                                            '&:hover': { bgcolor: 'action.hover' }
                                        }}
                                    >
                                        <TableCell>
                                            <Typography variant="body2" fontWeight={500}>
                                                {risk.title}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                size="small"
                                                label={risk.severity}
                                                color={getSeverityColor(risk.severity) as any}
                                                variant="outlined"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                size="small"
                                                label={risk.status}
                                                color={getStatusColor(risk.status) as any}
                                                variant="outlined"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body2">
                                                {risk.openedAt ? new Date(risk.openedAt).toLocaleDateString() : '—'}
                                            </Typography>
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
            
            {/* Risk Detail Modal */}
            <SmeRiskItemModal
                open={!!selectedRiskId}
                onClose={handleRiskModalClose}
                risk={selectedRisk}
                smeId="current-user-id"
            />
        </Dialog>
    );
}