import React, { useState, useEffect } from 'react';
import {
    Stack,
    Typography,
    Paper,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Box,
    Chip,
    Link as MUILink,
    CircularProgress,
    Alert,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    OutlinedInput,
    Checkbox,
    ListItemText as SelectListItemText,
    InputAdornment,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    IconButton,
    Tooltip,
} from '@mui/material';
import {
    Description as DocumentIcon,
    Add as AddIcon,
    Link as LinkIcon,
    CheckCircle as CheckCircleIcon,
    Error as ErrorIcon,
    Warning as WarningIcon,
    Search as SearchIcon,
    FilterList as FilterIcon,
    OpenInNew as OpenInNewIcon,
    History as HistoryIcon,
    Visibility as ViewIcon,
} from '@mui/icons-material';

interface EvidenceTabProps {
    appId: string;
}

interface EvidenceDocument {
    documentId: string;
    appId: string;
    title: string;
    canonicalUrl: string;
    sourceType: string;
    owners?: string;
    linkHealth: number;
    tags: string[];
    latestVersion?: {
        docVersionId: string;
        versionId: string;
        urlAtVersion: string;
        author: string;
        sourceDate: string;
        createdAt: string;
    };
    createdAt: string;
    updatedAt: string;
}

interface NewDocumentForm {
    title: string;
    url: string;
    fieldTypes: string[];
}

interface PaginatedResponse {
    page: number;
    pageSize: number;
    total: number;
    items: EvidenceDocument[];
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

export default function EvidenceTab({ appId }: EvidenceTabProps) {
    const [documents, setDocuments] = useState<EvidenceDocument[]>([]);
    const [loading, setLoading] = useState(true);
    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTag, setSelectedTag] = useState<string>('');
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [total, setTotal] = useState(0);
    const [newDocument, setNewDocument] = useState<NewDocumentForm>({
        title: '',
        url: '',
        fieldTypes: []
    });

    // Fetch documents with pagination
    const fetchDocuments = async (currentPage = page, currentPageSize = pageSize) => {
        try {
            setLoading(true);
            const searchParams = new URLSearchParams({
                page: (currentPage + 1).toString(), // API uses 1-based indexing
                pageSize: currentPageSize.toString()
            });
            
            if (searchTerm) {
                searchParams.append('search', searchTerm);
            }
            
            if (selectedTag) {
                searchParams.append('tag', selectedTag);
            }

            const response = await fetch(`http://localhost:8080/api/apps/${appId}/documents?${searchParams}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch documents: ${response.statusText}`);
            }

            const paginatedResponse: PaginatedResponse = await response.json();
            setDocuments(paginatedResponse.items);
            setTotal(paginatedResponse.total);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load documents');
        } finally {
            setLoading(false);
        }
    };

    // Fetch documents when component mounts or pagination/filters change
    useEffect(() => {
        fetchDocuments();
    }, [appId, page, pageSize, searchTerm, selectedTag]);

    // Reset to first page when search/filter changes
    const handleSearchChange = (newSearchTerm: string) => {
        setSearchTerm(newSearchTerm);
        setPage(0);
    };

    const handleTagFilterChange = (newTag: string) => {
        setSelectedTag(newTag);
        setPage(0);
    };

    const handleAddDocument = async () => {
        if (!newDocument.title || !newDocument.url || newDocument.fieldTypes.length === 0) {
            return;
        }

        setError(null);

        try {
            const response = await fetch(`http://localhost:8080/api/apps/${appId}/documents`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    title: newDocument.title,
                    url: newDocument.url,
                    fieldTypes: newDocument.fieldTypes
                })
            });

            if (!response.ok) {
                throw new Error(`Failed to create document: ${response.statusText}`);
            }

            const createdDocument: EvidenceDocument = await response.json();
            setNewDocument({ title: '', url: '', fieldTypes: [] });
            setAddDialogOpen(false);
            // Refresh the documents list
            fetchDocuments();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to create document');
        }
    };

    const handleViewUsages = (documentId: string) => {
        // TODO: Implement view usages functionality
        console.log('View usages for document:', documentId);
        // This could open a dialog or navigate to a usages page
    };

    const handlePageChange = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handlePageSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPageSize(parseInt(event.target.value, 10));
        setPage(0);
    };

    const getLinkHealthIcon = (health: number) => {
        if (health >= 200 && health < 300) {
            return <CheckCircleIcon sx={{ color: 'success.main' }} fontSize="small" />;
        } else if (health >= 400 && health < 500) {
            return <WarningIcon sx={{ color: 'warning.main' }} fontSize="small" />;
        } else {
            return <ErrorIcon sx={{ color: 'error.main' }} fontSize="small" />;
        }
    };

    const getLinkHealthText = (health: number) => {
        if (health >= 200 && health < 300) return 'Healthy';
        if (health >= 400 && health < 500) return 'Warning';
        return 'Error';
    };

    const getLinkHealthColor = (health: number) => {
        if (health >= 200 && health < 300) return 'success';
        if (health >= 400 && health < 500) return 'warning';
        return 'error';
    };

    const handleFieldTypesChange = (event: any) => {
        const value = event.target.value;
        setNewDocument({
            ...newDocument,
            fieldTypes: typeof value === 'string' ? value.split(',') : value
        });
    };

    // Get all unique tags for filter dropdown - this would need a separate API call in real implementation
    const allTags = Array.from(new Set(documents.flatMap(doc => doc.tags))).sort();

    // Format date helper
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <Stack spacing={3}>
            {/* Header */}
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Stack>
                    <Typography variant="h6" fontWeight={700}>
                        Evidence Documents
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Documents that serve as evidence for profile fields in {appId}
                    </Typography>
                </Stack>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setAddDialogOpen(true)}
                    disabled={loading}
                >
                    Add Document
                </Button>
            </Stack>

            {/* Error Alert */}
            {error && (
                <Alert severity="error" onClose={() => setError(null)}>
                    {error}
                </Alert>
            )}

            {/* Search and Filter Controls */}
            <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
                    <TextField
                        placeholder="Search documents..."
                        value={searchTerm}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        size="small"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            )
                        }}
                        sx={{ flex: 1, minWidth: 200 }}
                    />
                    <FormControl size="small" sx={{ minWidth: 180 }}>
                        <InputLabel>Filter by Tag</InputLabel>
                        <Select
                            value={selectedTag}
                            onChange={(e) => handleTagFilterChange(e.target.value)}
                            label="Filter by Tag"
                        >
                            <MenuItem value="">All Tags</MenuItem>
                            {allTags.map((tag) => (
                                <MenuItem key={tag} value={tag}>
                                    {tag}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'nowrap' }}>
                        {total} documents total
                    </Typography>
                </Stack>
            </Paper>

            {/* Documents Table */}
            {!loading && total === 0 && !searchTerm && !selectedTag ? (
                <Paper variant="outlined" sx={{ p: 6, textAlign: 'center', borderRadius: 3 }}>
                    <DocumentIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 3 }} />
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                        No Evidence Documents
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 400, mx: 'auto' }}>
                        Start building your evidence library by adding links to documents that support your profile fields
                    </Typography>
                    <Button
                        variant="contained"
                        size="large"
                        startIcon={<AddIcon />}
                        onClick={() => setAddDialogOpen(true)}
                    >
                        Add Your First Document
                    </Button>
                </Paper>
            ) : (
                <Paper variant="outlined" sx={{ borderRadius: 3 }}>
                    <TableContainer>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Document</TableCell>
                                    <TableCell>Source</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Tags</TableCell>
                                    <TableCell>Last Updated</TableCell>
                                    <TableCell align="right">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {loading ? (
                                    // Loading skeleton rows
                                    [...Array(pageSize)].map((_, index) => (
                                        <TableRow key={index}>
                                            <TableCell>Loading...</TableCell>
                                            <TableCell>—</TableCell>
                                            <TableCell>—</TableCell>
                                            <TableCell>—</TableCell>
                                            <TableCell>—</TableCell>
                                            <TableCell align="right">—</TableCell>
                                        </TableRow>
                                    ))
                                ) : documents.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} sx={{ textAlign: 'center', py: 4 }}>
                                            <Stack alignItems="center" spacing={2}>
                                                <FilterIcon sx={{ fontSize: 48, color: 'text.disabled' }} />
                                                <Typography variant="h6" color="text.secondary">
                                                    No documents match your filters
                                                </Typography>
                                                <Button 
                                                    variant="outlined" 
                                                    onClick={() => { handleSearchChange(''); handleTagFilterChange(''); }}
                                                >
                                                    Clear Filters
                                                </Button>
                                            </Stack>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    documents.map((doc) => (
                                        <TableRow key={doc.documentId} hover>
                                            <TableCell>
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
                                            </TableCell>
                                            <TableCell>
                                                <Chip 
                                                    size="small" 
                                                    label={doc.sourceType}
                                                    variant="outlined"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                {getLinkHealthIcon(doc.linkHealth)}
                                            </TableCell>
                                            <TableCell>
                                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                    {doc.tags.slice(0, 2).map((tag) => (
                                                        <Chip 
                                                            key={tag} 
                                                            size="small" 
                                                            label={tag} 
                                                            sx={{ bgcolor: 'primary.50', color: 'primary.main' }}
                                                        />
                                                    ))}
                                                    {doc.tags.length > 2 && (
                                                        <Tooltip title={doc.tags.slice(2).join(', ')}>
                                                            <Chip 
                                                                size="small" 
                                                                label={`+${doc.tags.length - 2}`}
                                                                variant="outlined"
                                                            />
                                                        </Tooltip>
                                                    )}
                                                </Box>
                                            </TableCell>
                                            <TableCell>
                                                {doc.latestVersion ? formatDate(doc.latestVersion.sourceDate) : '—'}
                                            </TableCell>
                                            <TableCell align="right">
                                                <Tooltip title="View Usages & History">
                                                    <IconButton 
                                                        size="small" 
                                                        onClick={() => handleViewUsages(doc.documentId)}
                                                    >
                                                        <ViewIcon fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    
                    {/* Pagination */}
                    <TablePagination
                        component="div"
                        count={total}
                        page={page}
                        onPageChange={handlePageChange}
                        rowsPerPage={pageSize}
                        onRowsPerPageChange={handlePageSizeChange}
                        rowsPerPageOptions={[5, 10, 25, 50]}
                        showFirstButton
                        showLastButton
                    />
                </Paper>
            )}

            {/* Add Document Dialog */}
            <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle>
                    Add Evidence Document
                </DialogTitle>
                <DialogContent>
                    <Stack spacing={2} sx={{ mt: 1 }}>
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
                            placeholder="https://gitlab.com/example/project/-/blob/main/docs/security.md"
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
                                        <SelectListItemText primary={fieldType} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        setAddDialogOpen(false);
                        setNewDocument({ title: '', url: '', fieldTypes: [] });
                        setError(null);
                    }}>
                        Cancel
                    </Button>
                    <Button 
                        variant="contained" 
                        onClick={handleAddDocument}
                        disabled={!newDocument.title || !newDocument.url || newDocument.fieldTypes.length === 0 || loading}
                    >
                        {loading ? <CircularProgress size={20} /> : 'Add Document'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Stack>
    );
}