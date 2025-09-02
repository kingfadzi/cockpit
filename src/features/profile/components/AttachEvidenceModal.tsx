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
import { useAttachedDocuments, useAttachDocument, useDetachDocument, useSuggestedEvidence, useCreateDoc, useCreateEvidenceWithDocument, useProfileFieldEvidence } from '../../../api/hooks';
import type { PolicyRequirement, AttachDocumentResponse } from '../../../api/types';

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

const calculateValidUntilDate = (attachedAt: string, ttl: string): Date | null => {
    if (!attachedAt || !ttl) return null;
    
    const attachedDate = new Date(attachedAt);
    if (isNaN(attachedDate.getTime())) return null;
    
    if (ttl === '0d') return attachedDate;
    
    const match = ttl.match(/^(\d+)([dhmy])$/);
    if (!match) return null;
    
    const [, value, unit] = match;
    const numValue = parseInt(value);
    const validUntil = new Date(attachedDate);
    
    switch (unit) {
        case 'd': validUntil.setDate(validUntil.getDate() + numValue); break;
        case 'h': validUntil.setHours(validUntil.getHours() + numValue); break;
        case 'm': validUntil.setMonth(validUntil.getMonth() + numValue); break;
        case 'y': validUntil.setFullYear(validUntil.getFullYear() + numValue); break;
        default: return null;
    }
    
    return validUntil;
};

const getValidationStatus = (sourceDate: string, ttl: string): { status: 'valid' | 'expiring' | 'expired' | 'invalid', validUntil: Date | null } => {
    if (!sourceDate || !ttl) return { status: 'invalid', validUntil: null };
    
    const sourceUpdateDate = new Date(sourceDate);
    if (isNaN(sourceUpdateDate.getTime())) return { status: 'invalid', validUntil: null };
    
    // Calculate valid until date from source date + TTL
    const validUntil = new Date(sourceUpdateDate);
    
    if (ttl === '0d') {
        return { status: 'expired', validUntil: sourceUpdateDate };
    }
    
    const match = ttl.match(/^(\d+)([dhmy])$/);
    if (!match) return { status: 'invalid', validUntil: null };
    
    const [, value, unit] = match;
    const numValue = parseInt(value);
    
    switch (unit) {
        case 'd': validUntil.setDate(validUntil.getDate() + numValue); break;
        case 'h': validUntil.setHours(validUntil.getHours() + numValue); break;
        case 'm': validUntil.setMonth(validUntil.getMonth() + numValue); break;
        case 'y': validUntil.setFullYear(validUntil.getFullYear() + numValue); break;
        default: return { status: 'invalid', validUntil: null };
    }
    
    const now = new Date();
    
    if (now > validUntil) {
        return { status: 'expired', validUntil };
    }
    
    const daysUntilExpiry = Math.ceil((validUntil.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    if (daysUntilExpiry <= 7) {
        return { status: 'expiring', validUntil };
    }
    
    return { status: 'valid', validUntil };
};

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
    const [autoCreatedRisk, setAutoCreatedRisk] = useState<{
        riskId: string;
        assignedSme: string;
        documentTitle: string;
    } | null>(null);
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
    const { data: evidenceData, isLoading: loadingEvidence } = useProfileFieldEvidence(profileFieldId);
    const { data: suggestedData, isLoading: loadingSuggested } = useSuggestedEvidence(appId, fieldKey);
    const attachMutation = useAttachDocument(appId, profileFieldId);
    const detachMutation = useDetachDocument(appId, profileFieldId);
    const createDocMutation = useCreateDoc(appId);
    const createEvidenceMutation = useCreateEvidenceWithDocument(appId);

    const attachedDocuments = attachedData?.documents || [];
    const suggestedDocuments = suggestedData?.suggestedDocuments || [];
    const attachedDocumentIds = new Set(attachedDocuments.map((doc: any) => doc.documentId));

    // Enrich attached documents with full document details from suggested documents
    const enrichedAttachedDocuments = attachedDocuments.map((attachedDoc: any) => {
        const fullDoc = suggestedDocuments.find((doc: any) => doc.documentId === attachedDoc.documentId);
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

    // Available documents are the suggested documents not already attached
    const availableDocuments = suggestedDocuments.filter((doc: any) => !attachedDocumentIds.has(doc.documentId));

    const handleToggleDocument = async (doc: any) => {
        if (attachedDocumentIds.has(doc.documentId)) {
            // Detach document
            try {
                await detachMutation.mutateAsync(doc.documentId);
                setAutoCreatedRisk(null); // Clear any previous risk notification
            } catch (error) {
                console.error('Failed to detach document:', error);
            }
        } else {
            // Attach document
            try {
                const response: AttachDocumentResponse = await attachMutation.mutateAsync(doc.documentId);
                
                // Handle auto-risk creation
                if (response.riskWasCreated && response.autoCreatedRiskId && response.assignedSme) {
                    setAutoCreatedRisk({
                        riskId: response.autoCreatedRiskId,
                        assignedSme: response.assignedSme,
                        documentTitle: doc.title
                    });
                } else {
                    setAutoCreatedRisk(null);
                }
            } catch (error) {
                console.error('Failed to attach document:', error);
                setAutoCreatedRisk(null);
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
            
            // Create evidence with document (no track needed)
            await createEvidenceMutation.mutateAsync({
                profileFieldId,
                document: {
                    title: newDocument.title,
                    url: newDocument.url,
                    relatedEvidenceFields: newDocument.fieldTypes
                },
                evidence: {
                    type: "document",
                    sourceSystem: "manual",
                    submittedBy: newDocument.submittedBy,
                    validFrom: newDocument.validFrom,
                    validUntil,
                    relatedEvidenceFields: newDocument.fieldTypes.join(',')
                }
            });

            handleClose();
        } catch (error) {
            console.error('Failed to create evidence:', error);
        }
    };

    const handleClose = () => {
        setAutoCreatedRisk(null);
        onClose();
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogTitle>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography variant="h6">
                        Attach Evidence: {fieldLabel}
                    </Typography>
                    <IconButton onClick={handleClose} size="small">
                        <CloseIcon />
                    </IconButton>
                </Stack>
            </DialogTitle>
            
            <DialogContent>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                    <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)}>
                        <Tab label="Attached Documents" />
                        <Tab label="Suggested Documents" />
                        <Tab label="Create New Document" />
                    </Tabs>
                </Box>

                {/* Tab 1: Attached Documents */}
                {activeTab === 0 && (
                    <Stack spacing={2}>
                        <Typography variant="body2" color="text.secondary">
                            Documents currently attached to this field
                        </Typography>

                        {loadingAttached || loadingEvidence ? (
                            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                                <CircularProgress />
                            </Box>
                        ) : !evidenceData?.items || evidenceData.items.length === 0 ? (
                            <Alert severity="info">
                                No documents are currently attached to this field.
                            </Alert>
                        ) : (
                            <TableContainer>
                                <Table size="small" sx={{ minWidth: 650 }}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{ minWidth: 200 }}>Document</TableCell>
                                            <TableCell sx={{ minWidth: 100 }}>Source Type</TableCell>
                                            <TableCell sx={{ minWidth: 120 }}>Valid Until</TableCell>
                                            <TableCell sx={{ minWidth: 120 }}>Link Status</TableCell>
                                            <TableCell sx={{ minWidth: 100 }}>Health</TableCell>
                                            <TableCell align="center" sx={{ minWidth: 100 }}>Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {evidenceData?.items?.map((evidence: any) => {
                                            return (
                                            <TableRow key={evidence.evidenceId} hover>
                                                <TableCell>
                                                    <Stack direction="row" alignItems="center" spacing={1}>
                                                        <DocumentIcon fontSize="small" />
                                                        <MUILink
                                                            href={evidence.uri}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            sx={{ 
                                                                fontWeight: 600,
                                                                textDecoration: 'none',
                                                                '&:hover': { textDecoration: 'underline' }
                                                            }}
                                                        >
                                                            {evidence.documentTitle || 'Untitled Document'}
                                                            <OpenInNewIcon sx={{ ml: 0.5, fontSize: '0.75rem' }} />
                                                        </MUILink>
                                                    </Stack>
                                                </TableCell>
                                                <TableCell>
                                                    <Chip 
                                                        size="small" 
                                                        label={evidence.documentSourceType || 'Unknown'}
                                                        variant="outlined"
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    {evidence.validUntil ? (
                                                        <Typography variant="body2">
                                                            {formatDate(evidence.validUntil)}
                                                        </Typography>
                                                    ) : (
                                                        <Typography variant="body2" color="text.secondary">—</Typography>
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    {evidence.linkStatus ? (
                                                        <Chip
                                                            size="small"
                                                            label={evidence.linkStatus.replace('_', ' ')}
                                                            color={evidence.linkStatus === 'PENDING_REVIEW' ? 'warning' : 'default'}
                                                            variant="outlined"
                                                        />
                                                    ) : (
                                                        <Typography variant="body2" color="text.secondary">—</Typography>
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    {evidence.documentLinkHealth === 200 ? (
                                                        <CheckCircleIcon color="success" fontSize="small" />
                                                    ) : evidence.documentLinkHealth ? (
                                                        <Chip
                                                            size="small"
                                                            label={evidence.documentLinkHealth}
                                                            color={evidence.documentLinkHealth >= 400 ? 'error' : 'warning'}
                                                            variant="outlined"
                                                        />
                                                    ) : (
                                                        <Typography variant="body2" color="text.secondary">—</Typography>
                                                    )}
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Button
                                                        size="small"
                                                        color="error"
                                                        variant="outlined"
                                                        onClick={() => handleToggleDocument({ documentId: evidence.documentId })}
                                                        disabled={detachMutation.isPending}
                                                    >
                                                        Detach
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        )
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )}
                    </Stack>
                )}

                {/* Tab 2: Suggested Documents */}
                {activeTab === 1 && (
                    <Stack spacing={2}>
                        <Typography variant="body2" color="text.secondary">
                            Select from suggested documents that match this field requirement
                        </Typography>

                        {loadingSuggested ? (
                            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                                <CircularProgress />
                            </Box>
                        ) : availableDocuments.length === 0 ? (
                            <Alert severity="info">
                                No suggested documents found for this field, or all are already attached.
                            </Alert>
                        ) : (
                            <TableContainer>
                                <Table size="small" sx={{ minWidth: 650 }}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{ minWidth: 200 }}>Document</TableCell>
                                            <TableCell sx={{ minWidth: 100 }}>Source</TableCell>
                                            <TableCell sx={{ minWidth: 150 }}>Related Fields</TableCell>
                                            <TableCell sx={{ minWidth: 100 }}>Health</TableCell>
                                            <TableCell sx={{ minWidth: 120 }}>Source Date</TableCell>
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
                                                    {doc.linkHealth === 200 ? (
                                                        <CheckCircleIcon color="success" fontSize="small" />
                                                    ) : doc.linkHealth ? (
                                                        <Chip
                                                            size="small"
                                                            label={doc.linkHealth}
                                                            color={doc.linkHealth >= 400 ? 'error' : 'warning'}
                                                            variant="outlined"
                                                        />
                                                    ) : (
                                                        <Typography variant="body2" color="text.secondary">—</Typography>
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    {doc.latestVersion?.sourceDate ? formatDate(doc.latestVersion.sourceDate) : '—'}
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Button
                                                        size="small"
                                                        color="primary"
                                                        variant="outlined"
                                                        onClick={() => handleToggleDocument(doc)}
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
                        )}
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

                {/* Auto-Risk Creation Success */}
                {autoCreatedRisk && (
                    <Alert severity="success" sx={{ mt: 2 }}>
                        <strong>Security Risk Auto-Created!</strong>
                        <br />
                        Document "{autoCreatedRisk.documentTitle}" attached successfully. 
                        A security risk has been automatically created (ID: {autoCreatedRisk.riskId}) 
                        and assigned to {autoCreatedRisk.assignedSme} for review.
                    </Alert>
                )}

                {/* Error Display */}
                {(createEvidenceMutation.error || attachMutation.error || detachMutation.error) && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                        {String(createEvidenceMutation.error || attachMutation.error || detachMutation.error)}
                    </Alert>
                )}
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose}>
                    Cancel
                </Button>
                
                {activeTab === 0 ? (
                    // Attached Documents tab - no action button needed
                    null
                ) : activeTab === 1 ? (
                    // Suggested Documents tab - no action button needed (attach buttons are inline)
                    null
                ) : (
                    // Create New Document tab
                    <Button
                        variant="contained"
                        onClick={handleCreateNew}
                        disabled={!newDocument.title || !newDocument.url || !newDocument.submittedBy || createEvidenceMutation.isPending}
                        startIcon={createEvidenceMutation.isPending ? <CircularProgress size={20} /> : <AddIcon />}
                    >
                        Create & Attach Document
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
}