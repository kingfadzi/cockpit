import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Stack,
    Typography,
    Box,
    Tabs,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    OutlinedInput,
    Checkbox,
    ListItemText,
    Chip,
    Link as MUILink,
    CircularProgress,
    Alert,
    IconButton,
} from '@mui/material';
import {
    Description as DocumentIcon,
    OpenInNew as OpenInNewIcon,
    Close as CloseIcon,
    Add as AddIcon,
    CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import { useSuggestedEvidence, useCreateEvidenceWithDocument, useAttachEvidence, useCreateTrack } from '../../../api/hooks';

interface AttachEvidenceModalProps {
    open: boolean;
    onClose: () => void;
    fieldKey: string;
    fieldLabel: string;
    profileFieldId: string;
    appId: string;
}

interface SuggestedDocument {
    documentId: string;
    title: string;
    canonicalUrl: string;
    sourceType: string;
    relatedEvidenceFields: string[];
    latestVersion?: {
        docVersionId: string;
        versionId: string;
        urlAtVersion: string;
        author: string;
        sourceDate: string;
    };
    matchReason: string;
}

interface NewDocumentForm {
    title: string;
    url: string;
    fieldTypes: string[];
    validFrom: string;
    validUntil: string;
    tags: string;
    submittedBy: string;
}

const FIELD_TYPES = [
    'security_vision',
    'encryption_at_rest',
    'encryption_in_transit',
    'key_rotation_max',
    'secrets_management',
    'security_testing',
    'rpo_minutes',
    'rto_hours',
    'ha_topology',
    'failover_automation',
    'dr_test_frequency',
    'audit_logging',
    'monitoring_slos',
    'oncall_coverage',
    'runbook_maturity',
    'backup_policy',
    'data_validation',
    'reconciliation_frequency',
    'review_depth',
    'materiality',
    'change_control',
    'chaos_testing',
    'immutability_required'
];

export default function AttachEvidenceModal({ 
    open, 
    onClose, 
    fieldKey, 
    fieldLabel, 
    profileFieldId, 
    appId 
}: AttachEvidenceModalProps) {
    const [activeTab, setActiveTab] = useState(0);
    const [selectedDocument, setSelectedDocument] = useState<SuggestedDocument | null>(null);
    const [newDocument, setNewDocument] = useState<NewDocumentForm>({
        title: '',
        url: '',
        fieldTypes: [fieldKey],
        validFrom: new Date().toISOString().slice(0, 16),
        validUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16),
        tags: 'compliance,manual',
        submittedBy: 'user@company.com'
    });

    // API hooks
    const { data: suggestedData, isLoading: loadingSuggested } = useSuggestedEvidence(appId, fieldKey);
    const createEvidenceMutation = useCreateEvidenceWithDocument(appId);
    const attachEvidenceMutation = useAttachEvidence();
    const createTrackMutation = useCreateTrack(appId);

    const suggestedDocuments = suggestedData?.suggestedDocuments || [];
    
    // Use profileFieldId from suggested evidence API if available, otherwise use the prop
    const effectiveProfileFieldId = suggestedData?.profileFieldId || profileFieldId;

    // Helper function to create a track for evidence
    const createTrackForEvidence = async (documentTitle: string) => {
        const trackPayload = {
            title: `Evidence Submission - ${documentTitle}`,
            intent: "compliance",
            provider: "manual", 
            resourceType: "control",
            resourceId: "default",
            uri: window.location.href,
            attributes: {
                fieldKey: fieldKey,
                fieldLabel: fieldLabel
            },
            openedAt: new Date().toISOString()
        };

        const trackResponse = await createTrackMutation.mutateAsync(trackPayload);
        return trackResponse.trackId;
    };

    const handleAttachExisting = async () => {
        if (!selectedDocument) return;

        console.log('Debug - profileFieldId:', profileFieldId, 'fieldKey:', fieldKey, 'effectiveProfileFieldId:', effectiveProfileFieldId);

        try {
            // First create a track
            const trackId = await createTrackForEvidence(selectedDocument.title);
            
            // Then create evidence with the existing document
            const evidenceResponse = await createEvidenceMutation.mutateAsync({
                profileFieldId: effectiveProfileFieldId,
                document: {
                    title: selectedDocument.title,
                    url: selectedDocument.canonicalUrl,
                    fieldTypes: [fieldKey]
                },
                evidence: {
                    type: 'document',
                    sourceSystem: selectedDocument.sourceType,
                    submittedBy: 'user@company.com',
                    validFrom: new Date().toISOString(),
                    validUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
                    tags: 'existing,reused',
                    trackId: trackId
                }
            });

            // Then attach it (if needed)
            if (evidenceResponse.claimId && evidenceResponse.evidenceId) {
                await attachEvidenceMutation.mutateAsync({
                    claimId: evidenceResponse.claimId,
                    evidenceId: evidenceResponse.evidenceId,
                    payload: {
                        documentId: selectedDocument.documentId,
                        docVersionId: selectedDocument.latestVersion?.docVersionId || ''
                    }
                });
            }

            onClose();
        } catch (error) {
            console.error('Failed to attach existing evidence:', error);
        }
    };

    const handleCreateNew = async () => {
        if (!newDocument.title || !newDocument.url) return;

        try {
            // First create a track
            const trackId = await createTrackForEvidence(newDocument.title);
            
            // Then create evidence with new document
            await createEvidenceMutation.mutateAsync({
                profileFieldId: effectiveProfileFieldId,
                document: {
                    title: newDocument.title,
                    url: newDocument.url,
                    fieldTypes: newDocument.fieldTypes
                },
                evidence: {
                    type: 'document',
                    sourceSystem: 'manual',
                    submittedBy: newDocument.submittedBy,
                    validFrom: newDocument.validFrom,
                    validUntil: newDocument.validUntil,
                    tags: newDocument.tags,
                    trackId: trackId
                }
            });

            onClose();
        } catch (error) {
            console.error('Failed to create new evidence:', error);
        }
    };

    const handleFieldTypesChange = (event: any) => {
        const value = event.target.value;
        setNewDocument({
            ...newDocument,
            fieldTypes: typeof value === 'string' ? value.split(',') : value
        });
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography variant="h6">
                        Attach Evidence: {fieldLabel}
                    </Typography>
                    <IconButton onClick={onClose} size="small">
                        <CloseIcon />
                    </IconButton>
                </Stack>
            </DialogTitle>
            
            <DialogContent>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                    <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)}>
                        <Tab label="Use Existing Document" />
                        <Tab label="Create New Document" />
                    </Tabs>
                </Box>

                {/* Tab 1: Use Existing Documents */}
                {activeTab === 0 && (
                    <Stack spacing={2}>
                        <Typography variant="body2" color="text.secondary">
                            Select from suggested documents that match this field requirement
                        </Typography>

                        {loadingSuggested ? (
                            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                                <CircularProgress />
                            </Box>
                        ) : suggestedDocuments.length === 0 ? (
                            <Alert severity="info">
                                No suggested documents found for this field. You can create a new document instead.
                            </Alert>
                        ) : (
                            <TableContainer>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Document</TableCell>
                                            <TableCell>Source</TableCell>
                                            <TableCell>Related Fields</TableCell>
                                            <TableCell>Last Updated</TableCell>
                                            <TableCell>Match Reason</TableCell>
                                            <TableCell align="center">Select</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {suggestedDocuments.map((doc) => (
                                            <TableRow 
                                                key={doc.documentId} 
                                                hover
                                                sx={{ 
                                                    cursor: 'pointer',
                                                    bgcolor: selectedDocument?.documentId === doc.documentId ? 'primary.50' : 'inherit',
                                                    '&:hover': {
                                                        bgcolor: selectedDocument?.documentId === doc.documentId ? 'primary.100' : 'grey.50'
                                                    }
                                                }}
                                                onClick={() => setSelectedDocument(doc)}
                                            >
                                                <TableCell>
                                                    <Stack direction="row" alignItems="center" spacing={1}>
                                                        <MUILink
                                                            href={doc.canonicalUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            onClick={(e) => e.stopPropagation()}
                                                            sx={{ 
                                                                fontWeight: 600,
                                                                textDecoration: 'none',
                                                                '&:hover': { textDecoration: 'underline' }
                                                            }}
                                                        >
                                                            {doc.title}
                                                            <OpenInNewIcon sx={{ ml: 0.5, fontSize: '0.75rem' }} />
                                                        </MUILink>
                                                    </Stack>
                                                </TableCell>
                                                <TableCell>
                                                    <Chip 
                                                        size="small" 
                                                        label={doc.sourceType}
                                                        variant="outlined"
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                        {doc.relatedEvidenceFields.slice(0, 2).map((field) => (
                                                            <Chip 
                                                                key={field} 
                                                                size="small" 
                                                                label={field} 
                                                                sx={{ bgcolor: 'primary.50', color: 'primary.main' }}
                                                            />
                                                        ))}
                                                        {doc.relatedEvidenceFields.length > 2 && (
                                                            <Chip 
                                                                size="small" 
                                                                label={`+${doc.relatedEvidenceFields.length - 2}`}
                                                                variant="outlined"
                                                            />
                                                        )}
                                                    </Box>
                                                </TableCell>
                                                <TableCell>
                                                    {doc.latestVersion ? formatDate(doc.latestVersion.sourceDate) : '—'}
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {doc.matchReason}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="center">
                                                    {selectedDocument?.documentId === doc.documentId && (
                                                        <CheckCircleIcon color="primary" fontSize="small" />
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )}
                    </Stack>
                )}

                {/* Tab 2: Create New Document */}
                {activeTab === 1 && (
                    <Stack spacing={3}>
                        <Typography variant="body2" color="text.secondary">
                            Create a new document to serve as evidence for this field
                        </Typography>

                        <Stack spacing={2}>
                            <TextField
                                label="Document Title"
                                value={newDocument.title}
                                onChange={(e) => setNewDocument({ ...newDocument, title: e.target.value })}
                                placeholder="e.g., Security Architecture Document"
                                fullWidth
                                required
                            />
                            
                            <TextField
                                label="Document URL"
                                value={newDocument.url}
                                onChange={(e) => setNewDocument({ ...newDocument, url: e.target.value })}
                                placeholder="https://docs.company.com/security/policy.pdf"
                                fullWidth
                                required
                            />
                            
                            <FormControl fullWidth required>
                                <InputLabel>Field Types (Evidence For)</InputLabel>
                                <Select
                                    multiple
                                    value={newDocument.fieldTypes}
                                    onChange={handleFieldTypesChange}
                                    input={<OutlinedInput label="Field Types (Evidence For)" />}
                                    renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {(selected as string[]).map((value) => (
                                                <Chip key={value} label={value} size="small" />
                                            ))}
                                        </Box>
                                    )}
                                >
                                    {FIELD_TYPES.map((fieldType) => (
                                        <MenuItem key={fieldType} value={fieldType}>
                                            <Checkbox checked={newDocument.fieldTypes.indexOf(fieldType) > -1} />
                                            <ListItemText primary={fieldType} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <Stack direction="row" spacing={2}>
                                <TextField
                                    label="Valid From"
                                    type="datetime-local"
                                    value={newDocument.validFrom}
                                    onChange={(e) => setNewDocument({ ...newDocument, validFrom: e.target.value })}
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                />
                                
                                <TextField
                                    label="Valid Until"
                                    type="datetime-local"
                                    value={newDocument.validUntil}
                                    onChange={(e) => setNewDocument({ ...newDocument, validUntil: e.target.value })}
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Stack>

                            <TextField
                                label="Tags"
                                value={newDocument.tags}
                                onChange={(e) => setNewDocument({ ...newDocument, tags: e.target.value })}
                                placeholder="security,compliance,manual"
                                fullWidth
                                helperText="Comma-separated tags"
                            />

                            <TextField
                                label="Submitted By"
                                value={newDocument.submittedBy}
                                onChange={(e) => setNewDocument({ ...newDocument, submittedBy: e.target.value })}
                                fullWidth
                                required
                            />
                        </Stack>
                    </Stack>
                )}

                {/* Error Display */}
                {(createEvidenceMutation.error || attachEvidenceMutation.error || createTrackMutation.error) && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                        {String(createEvidenceMutation.error || attachEvidenceMutation.error || createTrackMutation.error)}
                    </Alert>
                )}
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>
                    Cancel
                </Button>
                
                {activeTab === 0 ? (
                    <Button
                        variant="contained"
                        onClick={handleAttachExisting}
                        disabled={!selectedDocument || createEvidenceMutation.isPending || attachEvidenceMutation.isPending || createTrackMutation.isPending}
                        startIcon={createEvidenceMutation.isPending || attachEvidenceMutation.isPending || createTrackMutation.isPending ? <CircularProgress size={20} /> : <AddIcon />}
                    >
                        Attach Selected Document
                    </Button>
                ) : (
                    <Button
                        variant="contained"
                        onClick={handleCreateNew}
                        disabled={!newDocument.title || !newDocument.url || createEvidenceMutation.isPending || createTrackMutation.isPending}
                        startIcon={createEvidenceMutation.isPending || createTrackMutation.isPending ? <CircularProgress size={20} /> : <AddIcon />}
                    >
                        Create & Attach Document
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
}