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
import { useAttachedDocuments, useAttachDocument, useDetachDocument, useDocs, useCreateDoc, useCreateEvidenceWithDocument, useCreateTrack } from '../../../api/hooks';
import type { PolicyRequirement } from '../../../api/types';

interface AttachEvidenceModalProps {
    open: boolean;
    onClose: () => void;
    fieldKey: string;
    fieldLabel: string;
    profileFieldId: string;
    appId: string;
    policyRequirement: PolicyRequirement;
}

interface Document {
    documentId: string;
    title: string;
    canonicalUrl: string;
    sourceType: string;
    relatedEvidenceFields: string[];
    linkHealth?: number;
    latestVersion?: {
        docVersionId: string;
        versionId: string;
        urlAtVersion: string;
        author?: string;
        sourceDate: string;
    };
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
    appId,
    policyRequirement
}: AttachEvidenceModalProps) {
    const [activeTab, setActiveTab] = useState(0);
    const [selectedDocuments, setSelectedDocuments] = useState<Set<string>>(new Set());
    const calculateValidUntilForInit = () => {
        if (!policyRequirement?.ttl) return '';
        
        const { ttl } = policyRequirement;
        if (ttl === '0d') return new Date().toISOString().slice(0, 16);
        
        const match = ttl.match(/^(\d+)([dhmy])$/);
        if (!match) return '';
        
        const [, value, unit] = match;
        const now = new Date();
        
        switch (unit) {
            case 'd': now.setDate(now.getDate() + parseInt(value)); break;
            case 'h': now.setHours(now.getHours() + parseInt(value)); break;
            case 'm': now.setMonth(now.getMonth() + parseInt(value)); break;
            case 'y': now.setFullYear(now.getFullYear() + parseInt(value)); break;
        }
        
        return now.toISOString().slice(0, 16);
    };

    const [newDocument, setNewDocument] = useState({
        title: '',
        url: '',
        fieldTypes: [fieldKey],
        validFrom: new Date().toISOString().slice(0, 16),
        validUntil: calculateValidUntilForInit(),
        submittedBy: ''
    });

    // API hooks
    const { data: attachedData, isLoading: loadingAttached } = useAttachedDocuments(appId, profileFieldId);
    const { data: allDocsData, isLoading: loadingAllDocs } = useDocs(appId, { page: '1', pageSize: '100' });
    const attachMutation = useAttachDocument(appId, profileFieldId);
    const detachMutation = useDetachDocument(appId, profileFieldId);
    const createDocMutation = useCreateDoc(appId);
    const createEvidenceMutation = useCreateEvidenceWithDocument(appId);
    const createTrackMutation = useCreateTrack(appId);

    const attachedDocuments = attachedData?.documents || [];
    const allDocuments = allDocsData?.items || [];
    const attachedDocumentIds = new Set(attachedDocuments.map((doc: any) => doc.documentId));

    // Enrich attached documents with full document details from allDocuments
    const enrichedAttachedDocuments = attachedDocuments.map((attachedDoc: any) => {
        const fullDoc = allDocuments.find((doc: any) => doc.documentId === attachedDoc.documentId);
        if (fullDoc) {
            return {
                ...attachedDoc,
                canonicalUrl: fullDoc.canonicalUrl,
                sourceType: fullDoc.sourceType,
                relatedEvidenceFields: fullDoc.relatedEvidenceFields,
                latestVersion: fullDoc.latestVersion,
                linkHealth: fullDoc.linkHealth
            };
        }
        return attachedDoc;
    });

    const handleToggleDocument = async (documentId: string) => {
        if (attachedDocumentIds.has(documentId)) {
            // Detach document
            try {
                await detachMutation.mutateAsync(documentId);
            } catch (error) {
                console.error('Failed to detach document:', error);
            }
        } else {
            // Attach document
            try {
                await attachMutation.mutateAsync(documentId);
            } catch (error) {
                console.error('Failed to attach document:', error);
            }
        }
    };

    const handleFieldTypesChange = (event: any) => {
        const { target: { value } } = event;
        setNewDocument({
            ...newDocument,
            fieldTypes: typeof value === 'string' ? value.split(',') : value,
        });
    };

    const calculateValidUntil = () => {
        if (!policyRequirement?.ttl) return '';
        
        const { ttl } = policyRequirement;
        if (ttl === '0d') return new Date().toISOString().slice(0, 16);
        
        const match = ttl.match(/^(\d+)([dhmy])$/);
        if (!match) return '';
        
        const [, value, unit] = match;
        const now = new Date();
        
        switch (unit) {
            case 'd': now.setDate(now.getDate() + parseInt(value)); break;
            case 'h': now.setHours(now.getHours() + parseInt(value)); break;
            case 'm': now.setMonth(now.getMonth() + parseInt(value)); break;
            case 'y': now.setFullYear(now.getFullYear() + parseInt(value)); break;
        }
        
        return now.toISOString().slice(0, 16);
    };

    const handleCreateNew = async () => {
        try {
            // Calculate valid until if not set
            const validUntil = newDocument.validUntil || calculateValidUntil();
            
            // First create track
            const trackResponse = await createTrackMutation.mutateAsync({
                resourceType: 'ProfileField',
                resourceId: profileFieldId,
                action: 'CREATE_EVIDENCE'
            });

            // Then create evidence with document
            await createEvidenceMutation.mutateAsync({
                trackId: trackResponse.trackId,
                profileFieldId,
                document: {
                    title: newDocument.title,
                    url: newDocument.url,
                    relatedEvidenceFields: newDocument.fieldTypes
                },
                validFrom: newDocument.validFrom,
                validUntil,
                submittedBy: newDocument.submittedBy
            });

            onClose();
        } catch (error) {
            console.error('Failed to create evidence:', error);
        }
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
                        <Tab label="Attached Documents" />
                        <Tab label="Available Documents" />
                        <Tab label="Create New Document" />
                    </Tabs>
                </Box>

                {/* Tab 1: Attached Documents */}
                {activeTab === 0 && (
                    <Stack spacing={2}>
                        <Typography variant="body2" color="text.secondary">
                            Documents currently attached to this field
                        </Typography>

                        {loadingAttached ? (
                            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                                <CircularProgress />
                            </Box>
                        ) : enrichedAttachedDocuments.length === 0 ? (
                            <Alert severity="info">
                                No documents are currently attached to this field.
                            </Alert>
                        ) : (
                            <TableContainer>
                                <Table size="small" sx={{ minWidth: 650 }}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{ minWidth: 200 }}>Document</TableCell>
                                            <TableCell sx={{ minWidth: 100 }}>Source</TableCell>
                                            <TableCell sx={{ minWidth: 150 }}>Related Fields</TableCell>
                                            <TableCell sx={{ minWidth: 100 }}>Last Updated</TableCell>
                                            <TableCell align="center" sx={{ minWidth: 100 }}>Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {enrichedAttachedDocuments.map((doc: any) => (
                                            <TableRow key={doc.documentId} hover>
                                                <TableCell>
                                                    <Stack direction="row" alignItems="center" spacing={1}>
                                                        <DocumentIcon fontSize="small" />
                                                        <MUILink
                                                            href={doc.canonicalUrl || doc.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
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
                                                        label={doc.sourceType || doc.sourceSystem || 'Unknown'}
                                                        variant="outlined"
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                        {doc.relatedEvidenceFields?.length > 0 ? (
                                                            <>
                                                                {doc.relatedEvidenceFields.slice(0, 2).map((field: string) => (
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
                                                            </>
                                                        ) : (
                                                            <Typography variant="body2" color="text.secondary">
                                                                —
                                                            </Typography>
                                                        )}
                                                    </Box>
                                                </TableCell>
                                                <TableCell>
                                                    {doc.latestVersion ? formatDate(doc.latestVersion.sourceDate) : 
                                                     doc.attachedAt ? formatDate(doc.attachedAt) : '—'}
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Button
                                                        size="small"
                                                        color="error"
                                                        variant="outlined"
                                                        onClick={() => handleToggleDocument(doc.documentId)}
                                                        disabled={detachMutation.isPending}
                                                    >
                                                        Detach
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )}
                    </Stack>
                )}

                {/* Tab 2: Available Documents */}
                {activeTab === 1 && (
                    <Stack spacing={2}>
                        <Typography variant="body2" color="text.secondary">
                            Select documents to attach to this field
                        </Typography>

                        {loadingAllDocs ? (
                            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                                <CircularProgress />
                            </Box>
                        ) : (() => {
                            const availableDocuments = allDocuments.filter((doc: any) => 
                                !attachedDocumentIds.has(doc.documentId)
                            );
                            
                            return availableDocuments.length === 0 ? (
                                <Alert severity="info">
                                    All available documents are already attached to this field.
                                </Alert>
                            ) : (
                                <TableContainer>
                                    <Table size="small" sx={{ minWidth: 650 }}>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell sx={{ minWidth: 200 }}>Document</TableCell>
                                                <TableCell sx={{ minWidth: 100 }}>Source</TableCell>
                                                <TableCell sx={{ minWidth: 150 }}>Related Fields</TableCell>
                                                <TableCell sx={{ minWidth: 100 }}>Last Updated</TableCell>
                                                <TableCell align="center" sx={{ minWidth: 100 }}>Actions</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {availableDocuments.map((doc: any) => (
                                                <TableRow key={doc.documentId} hover>
                                                    <TableCell>
                                                        <Stack direction="row" alignItems="center" spacing={1}>
                                                            <DocumentIcon fontSize="small" />
                                                            <MUILink
                                                                href={doc.canonicalUrl}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
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
                                                            {doc.relatedEvidenceFields?.slice(0, 2).map((field: string) => (
                                                                <Chip 
                                                                    key={field} 
                                                                    size="small" 
                                                                    label={field} 
                                                                    sx={{ bgcolor: 'primary.50', color: 'primary.main' }}
                                                                />
                                                            ))}
                                                            {doc.relatedEvidenceFields?.length > 2 && (
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
                                                    <TableCell align="center">
                                                        <Button
                                                            size="small"
                                                            color="primary"
                                                            variant="outlined"
                                                            onClick={() => handleToggleDocument(doc.documentId)}
                                                            disabled={attachMutation.isPending}
                                                        >
                                                            Attach
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            );
                        })()}
                    </Stack>
                )}

                {/* Tab 3: Create New Document */}
                {activeTab === 2 && (
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
                                    label={`Valid Until (Policy TTL: ${policyRequirement.ttl})`}
                                    type="datetime-local"
                                    value={newDocument.validUntil}
                                    onChange={(e) => setNewDocument({ ...newDocument, validUntil: e.target.value })}
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Stack>


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
                {(createEvidenceMutation.error || attachMutation.error || detachMutation.error || createTrackMutation.error) && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                        {String(createEvidenceMutation.error || attachMutation.error || detachMutation.error || createTrackMutation.error)}
                    </Alert>
                )}
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>
                    Cancel
                </Button>
                
                {activeTab === 0 ? (
                    // Attached Documents tab - no action button needed
                    null
                ) : activeTab === 1 ? (
                    // Available Documents tab - no action button needed (attach buttons are inline)
                    null
                ) : (
                    // Create New Document tab
                    <Button
                        variant="contained"
                        onClick={handleCreateNew}
                        disabled={!newDocument.title || !newDocument.url || !newDocument.submittedBy || createEvidenceMutation.isPending || createTrackMutation.isPending}
                        startIcon={createEvidenceMutation.isPending || createTrackMutation.isPending ? <CircularProgress size={20} /> : <AddIcon />}
                    >
                        Create & Attach Document
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
}