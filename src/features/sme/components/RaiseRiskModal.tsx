import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Stack,
    Typography,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Alert,
    IconButton
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

interface RaiseRiskModalProps {
    open: boolean;
    onClose: () => void;
    item: any;
}

export default function RaiseRiskModal({ open, onClose, item }: RaiseRiskModalProps) {
    const [riskData, setRiskData] = useState({
        title: '',
        severity: 'Medium' as 'High' | 'Medium' | 'Low',
        riskType: 'Security' as 'Compliance' | 'Security' | 'Operational' | 'Technical',
        description: '',
        remediation: '',
        riskOwner: ''
    });

    const handleSubmit = () => {
        console.log('Creating risk:', {
            ...riskData,
            appId: item?.appId,
            fieldKey: item?.fieldKey,
            createdBy: 'security_sme_1'
        });
        onClose();
        setRiskData({
            title: '',
            severity: 'Medium',
            riskType: 'Security',
            description: '',
            remediation: '',
            riskOwner: ''
        });
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography variant="h6">
                        Raise Risk
                    </Typography>
                    <IconButton onClick={onClose} size="small">
                        <CloseIcon />
                    </IconButton>
                </Stack>
            </DialogTitle>
            <DialogContent>
                <Stack spacing={3} sx={{ mt: 1 }}>
                    {item && (
                        <Alert severity="info">
                            Raising risk for: <strong>{item.appName || item.fieldLabel}</strong>
                            {item.fieldKey && ` → ${item.fieldLabel}`}
                        </Alert>
                    )}

                    <TextField
                        label="Risk Title"
                        value={riskData.title}
                        onChange={(e) => setRiskData({ ...riskData, title: e.target.value })}
                        fullWidth
                        placeholder="Brief description of the risk"
                    />

                    <Stack direction="row" spacing={2}>
                        <FormControl sx={{ minWidth: 150 }}>
                            <InputLabel>Risk Type</InputLabel>
                            <Select
                                value={riskData.riskType}
                                onChange={(e) => setRiskData({ ...riskData, riskType: e.target.value as any })}
                                label="Risk Type"
                            >
                                <MenuItem value="Compliance">Compliance</MenuItem>
                                <MenuItem value="Security">Security</MenuItem>
                                <MenuItem value="Operational">Operational</MenuItem>
                                <MenuItem value="Technical">Technical</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl sx={{ minWidth: 120 }}>
                            <InputLabel>Severity</InputLabel>
                            <Select
                                value={riskData.severity}
                                onChange={(e) => setRiskData({ ...riskData, severity: e.target.value as any })}
                                label="Severity"
                            >
                                <MenuItem value="High">High</MenuItem>
                                <MenuItem value="Medium">Medium</MenuItem>
                                <MenuItem value="Low">Low</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>

                    <TextField
                        label="Risk Description"
                        value={riskData.description}
                        onChange={(e) => setRiskData({ ...riskData, description: e.target.value })}
                        multiline
                        rows={3}
                        fullWidth
                        placeholder="Detailed description of the risk and potential impact"
                    />

                    <TextField
                        label="Recommended Remediation"
                        value={riskData.remediation}
                        onChange={(e) => setRiskData({ ...riskData, remediation: e.target.value })}
                        multiline
                        rows={2}
                        fullWidth
                        placeholder="Suggested actions to mitigate this risk"
                    />

                    <TextField
                        label="Risk Owner"
                        value={riskData.riskOwner}
                        onChange={(e) => setRiskData({ ...riskData, riskOwner: e.target.value })}
                        fullWidth
                        placeholder="Who should be responsible for addressing this risk"
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button 
                    onClick={handleSubmit}
                    variant="contained"
                    color="warning"
                    disabled={!riskData.title || !riskData.description}
                >
                    Create Risk
                </Button>
            </DialogActions>
        </Dialog>
    );
}