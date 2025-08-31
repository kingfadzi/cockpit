import React, { useState, useMemo } from 'react';
import {
    Stack,
    Typography,
    Card,
    CardContent,
    CardHeader,
    Box,
    Chip,
    Button,
    Alert,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Collapse,
    Divider,
    Grid,
    TextField,
    InputAdornment,
    Pagination
} from '@mui/material';
import {
    Security as SecurityIcon,
    ReportProblem as RiskIcon,
    CheckCircle as ApproveIcon,
    Cancel as RejectIcon,
    RequestPage as RequestIcon,
    Visibility as ViewIcon,
    Warning as WarningIcon,
    ExpandMore as ExpandMoreIcon,
    ExpandLess as ExpandLessIcon,
    Search as SearchIcon
} from '@mui/icons-material';
import SectionHeader from '../../../components/SectionHeader';
import { mockSmeAssignments, mockSmeQueue, mockCrossDomainIssues, mockRisks } from '../mock/smeData';
import RaiseRiskModal from '../components/RaiseRiskModal';
import AppSecurityReviewModal from '../components/AppSecurityReviewModal';

const getCriticalityBadge = (criticality: 'A' | 'B' | 'C' | 'D', appName: string) => {
    const colors = {
        A: 'error',
        B: 'warning', 
        C: 'info',
        D: 'success'
    } as const;
    
    return (
        <Stack direction="row" spacing={1} alignItems="center">
            <Chip 
                size="small" 
                label={criticality} 
                color={colors[criticality]}
                variant="filled"
                sx={{ minWidth: 28, fontWeight: 700 }}
            />
            <Typography variant="body2" fontWeight={600}>
                {appName}
            </Typography>
        </Stack>
    );
};

export default function SecuritySmeView() {
    const [raiseRiskModalOpen, setRaiseRiskModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [securityModalOpen, setSecurityModalOpen] = useState(false);
    const [selectedApp, setSelectedApp] = useState<any>(null);
    
    // Search states
    const [queueSearch, setQueueSearch] = useState('');
    const [domainSearch, setDomainSearch] = useState('');
    const [crossDomainSearch, setCrossDomainSearch] = useState('');
    const [risksSearch, setRisksSearch] = useState('');
    
    // Filter states
    const [queueFilter, setQueueFilter] = useState<'all' | 'overdue' | 'urgent' | 'this_week'>('all');
    const [domainFilter, setDomainFilter] = useState<'all' | 'overdue' | 'urgent' | 'critical_a'>('all');
    const [crossDomainFilter, setCrossDomainFilter] = useState<'all' | 'overdue' | 'urgent' | 'critical_a'>('all');
    const [risksFilter, setRisksFilter] = useState<'all' | 'high_severity' | 'recent'>('all');
    
    // Pagination states
    const [queuePage, setQueuePage] = useState(1);
    const [domainPage, setDomainPage] = useState(1);
    const [crossDomainPage, setCrossDomainPage] = useState(1);
    const [risksPage, setRisksPage] = useState(1);
    const pageSize = 5;
    const [expandedApps, setExpandedApps] = useState<Set<string>>(new Set());

    const assignments = mockSmeAssignments.filter(a => a.assignedSmeId === 'security_sme_1');
    const domainQueue = mockSmeQueue;
    const crossDomainIssues = mockCrossDomainIssues;
    const openRisks = mockRisks.filter(r => r.status === 'Open');

    // Enhanced filtering and search logic
    const getFilteredAndSearchedItems = (items: any[], filter: string, search: string, type: 'queue' | 'domain' | 'risks') => {
        let filtered = items;
        
        // Apply search filter
        if (search) {
            filtered = filtered.filter(item => {
                const searchLower = search.toLowerCase();
                if (type === 'risks') {
                    return item.title?.toLowerCase().includes(searchLower) || 
                           item.appName?.toLowerCase().includes(searchLower);
                } else {
                    return item.appName?.toLowerCase().includes(searchLower) || 
                           item.fieldLabel?.toLowerCase().includes(searchLower);
                }
            });
        }
        
        // Apply preset filters
        const now = new Date();
        const oneWeekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
        
        switch (filter) {
            case 'overdue':
                return filtered.filter(item => item.daysOverdue && item.daysOverdue > 0);
            case 'urgent':
                return filtered.filter(item => item.priority === 'urgent');
            case 'critical_a':
                return filtered.filter(item => item.criticality === 'A');
            case 'this_week':
                return filtered.filter(item => {
                    if (item.dueDate) {
                        const dueDate = new Date(item.dueDate);
                        return dueDate <= oneWeekFromNow;
                    }
                    return false;
                });
            case 'high_severity':
                return filtered.filter(item => item.severity === 'High');
            case 'recent':
                const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);
                return filtered.filter(item => new Date(item.createdAt || item.lastUpdated) >= threeDaysAgo);
            default:
                return filtered;
        }
    };


    // Sort by criticality first, then by issue count
    const sortedDomainQueue = [...domainQueue].sort((a, b) => {
        if (a.criticality !== b.criticality) {
            return a.criticality.localeCompare(b.criticality);
        }
        return b.issueCount - a.issueCount;
    });
    
    const sortedCrossDomain = [...crossDomainIssues].sort((a, b) => {
        if (a.criticality !== b.criticality) {
            return a.criticality.localeCompare(b.criticality);
        }
        return b.issueCount - a.issueCount;
    });

    // Apply filters and search to each table
    const filteredAssignments = getFilteredAndSearchedItems(assignments, queueFilter, queueSearch, 'queue');
    const filteredDomainQueue = getFilteredAndSearchedItems(sortedDomainQueue, domainFilter, domainSearch, 'domain');
    const filteredCrossDomain = getFilteredAndSearchedItems(sortedCrossDomain, crossDomainFilter, crossDomainSearch, 'domain');
    const filteredRisks = getFilteredAndSearchedItems(openRisks, risksFilter, risksSearch, 'risks');

    // Pagination logic
    const getPaginatedItems = (items: any[], page: number) => {
        const startIndex = (page - 1) * pageSize;
        return items.slice(startIndex, startIndex + pageSize);
    };

    const paginatedAssignments = getPaginatedItems(filteredAssignments, queuePage);
    const paginatedDomainQueue = getPaginatedItems(filteredDomainQueue, domainPage);
    const paginatedCrossDomain = getPaginatedItems(filteredCrossDomain, crossDomainPage);
    const paginatedRisks = getPaginatedItems(filteredRisks, risksPage);

    const toggleAppExpansion = (appId: string) => {
        const newExpanded = new Set(expandedApps);
        if (newExpanded.has(appId)) {
            newExpanded.delete(appId);
        } else {
            newExpanded.add(appId);
        }
        setExpandedApps(newExpanded);
    };

    const handleRaiseRisk = (item: any) => {
        setSelectedItem(item);
        setRaiseRiskModalOpen(true);
    };

    const openSecurityModal = (app: any) => {
        setSelectedApp(app);
        setSecurityModalOpen(true);
    };

    const formatDaysOverdue = (days?: number) => {
        if (!days) return null;
        return days > 0 ? `${days}d overdue` : null;
    };

    const renderTableControls = (
        search: string, 
        setSearch: (value: string) => void,
        filter: string,
        setFilter: (value: any) => void,
        filterOptions: Array<{value: string, label: string, count?: number}>,
        placeholder: string
    ) => (
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
            <TextField
                size="small"
                placeholder={placeholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon fontSize="small" />
                        </InputAdornment>
                    ),
                }}
                sx={{ minWidth: 250 }}
            />
            <Stack direction="row" spacing={0.5}>
                {filterOptions.map((option) => (
                    <Chip
                        key={option.value}
                        size="small"
                        label={option.count !== undefined ? `${option.label} (${option.count})` : option.label}
                        color={filter === option.value ? 'primary' : 'default'}
                        variant={filter === option.value ? 'filled' : 'outlined'}
                        onClick={() => setFilter(option.value)}
                        clickable
                        sx={{ height: 24 }}
                    />
                ))}
            </Stack>
        </Stack>
    );

    const renderPaginationControls = (
        currentPage: number,
        totalItems: number,
        onPageChange: (page: number) => void
    ) => {
        const totalPages = Math.ceil(totalItems / pageSize);
        if (totalPages <= 1) return null;

        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', pt: 2 }}>
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={(_, page) => onPageChange(page)}
                    size="small"
                    showFirstButton
                    showLastButton
                />
            </Box>
        );
    };

    return (
        <Stack spacing={3}>
            <SectionHeader 
                title="Security SME Dashboard" 
                subtitle="Review security controls and evidence across applications"
                icon={<SecurityIcon />}
            />

            {/* Section 1: My Review Queue (Specific Assignments) */}
            <Card variant="outlined">
                <Box sx={{ p: 2 }}>
                    <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
                        My Review Queue ({filteredAssignments.length})
                    </Typography>
                    
                    {renderTableControls(
                        queueSearch,
                        setQueueSearch,
                        queueFilter,
                        setQueueFilter,
                        [
                            { value: 'all', label: 'All' },
                            { value: 'overdue', label: 'Overdue', count: assignments.filter(a => a.daysOverdue && a.daysOverdue > 0).length },
                            { value: 'urgent', label: 'Urgent', count: assignments.filter(a => a.priority === 'urgent').length },
                            { value: 'this_week', label: 'Due This Week' }
                        ],
                        'Search applications or requirements...'
                    )}
                </Box>
                
                <CardContent sx={{ pt: 0, pb: 2 }}>
                    {filteredAssignments.length === 0 ? (
                        <Alert severity="info">No items match your search and filters.</Alert>
                    ) : (
                        <>
                            <TableContainer>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Application</TableCell>
                                            <TableCell>TC</TableCell>
                                            <TableCell>Requirement</TableCell>
                                            <TableCell>Evidence Status</TableCell>
                                            <TableCell>Priority</TableCell>
                                            <TableCell>Due Date</TableCell>
                                            <TableCell align="right">Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {paginatedAssignments.map((assignment) => (
                                            <TableRow key={`${assignment.appId}-${assignment.fieldKey}`} hover>
                                                <TableCell>
                                                    {getCriticalityBadge(assignment.criticality, assignment.appName)}
                                                </TableCell>
                                                <TableCell>{assignment.department}</TableCell>
                                                <TableCell>{assignment.fieldLabel}</TableCell>
                                                <TableCell>
                                                    <Stack direction="row" spacing={1} alignItems="center">
                                                        <Chip
                                                            size="small"
                                                            color={assignment.evidenceStatus === 'approved' ? 'success' : 
                                                                   assignment.evidenceStatus === 'pending_approval' ? 'warning' : 'error'}
                                                            label={assignment.evidenceStatus.replace('_', ' ')}
                                                            variant="outlined"
                                                        />
                                                        {assignment.daysOverdue && (
                                                            <Chip size="small" color="error" label={formatDaysOverdue(assignment.daysOverdue)} />
                                                        )}
                                                    </Stack>
                                                </TableCell>
                                                <TableCell>
                                                    <Chip
                                                        size="small"
                                                        color={assignment.priority === 'urgent' ? 'error' : 
                                                               assignment.priority === 'normal' ? 'warning' : 'default'}
                                                        label={assignment.priority}
                                                        variant="outlined"
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    {assignment.dueDate ? new Date(assignment.dueDate).toLocaleDateString() : '—'}
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                                                        <IconButton size="small" title="View Evidence">
                                                            <ViewIcon fontSize="small" />
                                                        </IconButton>
                                                        <IconButton size="small" color="success" title="Approve">
                                                            <ApproveIcon fontSize="small" />
                                                        </IconButton>
                                                        <IconButton size="small" color="error" title="Reject">
                                                            <RejectIcon fontSize="small" />
                                                        </IconButton>
                                                        <IconButton size="small" title="Request More Evidence">
                                                            <RequestIcon fontSize="small" />
                                                        </IconButton>
                                                        <IconButton 
                                                            size="small" 
                                                            color="warning" 
                                                            title="Raise Risk"
                                                            onClick={() => handleRaiseRisk(assignment)}
                                                        >
                                                            <RiskIcon fontSize="small" />
                                                        </IconButton>
                                                    </Stack>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            
                            {renderPaginationControls(queuePage, filteredAssignments.length, setQueuePage)}
                        </>
                    )}
                </CardContent>
            </Card>

            {/* Security Domain Watch */}
            <Card variant="outlined">
                <Box sx={{ p: 2 }}>
                    <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
                        Security Domain ({filteredDomainQueue.length})
                    </Typography>
                    
                    {renderTableControls(
                        domainSearch,
                        setDomainSearch,
                        domainFilter,
                        setDomainFilter,
                        [
                            { value: 'all', label: 'All' },
                            { value: 'overdue', label: 'Overdue', count: sortedDomainQueue.filter(a => a.daysOverdue && a.daysOverdue > 0).length },
                            { value: 'urgent', label: 'Urgent', count: sortedDomainQueue.filter(a => a.priority === 'urgent').length },
                            { value: 'critical_a', label: 'Critical A', count: sortedDomainQueue.filter(a => a.criticality === 'A').length }
                        ],
                        'Search applications...'
                    )}
                </Box>
                
                <CardContent sx={{ pt: 0, pb: 2 }}>
                    {filteredDomainQueue.length === 0 ? (
                        <Alert severity="success">All security controls are current.</Alert>
                    ) : (
                        <>
                            <TableContainer>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Application</TableCell>
                                            <TableCell>TC</TableCell>
                                            <TableCell>Business Service</TableCell>
                                            <TableCell>Last Updated</TableCell>
                                            <TableCell align="right">Issues</TableCell>
                                            <TableCell align="right">Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {paginatedDomainQueue.map((item) => (
                                            <TableRow 
                                                key={item.appId} 
                                                hover 
                                                sx={{ cursor: 'pointer' }}
                                                onClick={() => openSecurityModal(item)}
                                            >
                                                <TableCell>
                                                    {getCriticalityBadge(item.criticality, item.appName)}
                                                </TableCell>
                                                <TableCell>{item.department}</TableCell>
                                                <TableCell>{item.businessService || 'Core Banking'}</TableCell>
                                                <TableCell>{new Date(item.lastUpdated).toLocaleDateString()}</TableCell>
                                                <TableCell align="right">
                                                    <Chip
                                                        size="small"
                                                        color={item.issueCount >= 20 ? 'error' : item.issueCount >= 10 ? 'warning' : 'info'}
                                                        label={item.issueCount}
                                                        variant="outlined"
                                                    />
                                                </TableCell>
                                                <TableCell align="right">
                                                    <IconButton 
                                                        size="small" 
                                                        color="warning" 
                                                        title="Raise Risk"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleRaiseRisk(item);
                                                        }}
                                                    >
                                                        <RiskIcon fontSize="small" />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            
                            {renderPaginationControls(domainPage, filteredDomainQueue.length, setDomainPage)}
                        </>
                    )}
                </CardContent>
            </Card>

            {/* Cross-Domain Awareness */}
            <Card variant="outlined">
                <Box sx={{ p: 2 }}>
                    <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
                        Cross-Domain ({filteredCrossDomain.length})
                    </Typography>
                    
                    {renderTableControls(
                        crossDomainSearch,
                        setCrossDomainSearch,
                        crossDomainFilter,
                        setCrossDomainFilter,
                        [
                            { value: 'all', label: 'All' },
                            { value: 'overdue', label: 'Overdue', count: sortedCrossDomain.filter(a => a.daysOverdue && a.daysOverdue > 0).length },
                            { value: 'urgent', label: 'Urgent', count: sortedCrossDomain.filter(a => a.priority === 'urgent').length },
                            { value: 'critical_a', label: 'Critical A', count: sortedCrossDomain.filter(a => a.criticality === 'A').length }
                        ],
                        'Search applications...'
                    )}
                </Box>
                
                <CardContent sx={{ pt: 0, pb: 2 }}>
                    {filteredCrossDomain.length === 0 ? (
                        <Alert severity="info">No cross-domain issues requiring attention.</Alert>
                    ) : (
                        <>
                            <TableContainer>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Application</TableCell>
                                            <TableCell>TC</TableCell>
                                            <TableCell>Business Service</TableCell>
                                            <TableCell>Last Updated</TableCell>
                                            <TableCell align="right">Issues</TableCell>
                                            <TableCell align="right">Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {paginatedCrossDomain.map((item) => (
                                            <TableRow 
                                                key={item.appId} 
                                                hover 
                                                sx={{ cursor: 'pointer' }}
                                                onClick={() => openSecurityModal(item)}
                                            >
                                                <TableCell>
                                                    {getCriticalityBadge(item.criticality, item.appName)}
                                                </TableCell>
                                                <TableCell>{item.department}</TableCell>
                                                <TableCell>{item.businessService || 'Core Banking'}</TableCell>
                                                <TableCell>{new Date(item.lastUpdated).toLocaleDateString()}</TableCell>
                                                <TableCell align="right">
                                                    <Chip
                                                        size="small"
                                                        color={item.issueCount >= 10 ? 'warning' : 'info'}
                                                        label={item.issueCount}
                                                        variant="outlined"
                                                    />
                                                </TableCell>
                                                <TableCell align="right">
                                                    <IconButton 
                                                        size="small" 
                                                        color="warning" 
                                                        title="Raise Risk"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleRaiseRisk(item);
                                                        }}
                                                    >
                                                        <RiskIcon fontSize="small" />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            
                            {renderPaginationControls(crossDomainPage, filteredCrossDomain.length, setCrossDomainPage)}
                        </>
                    )}
                </CardContent>
            </Card>

            {/* Open Risks */}
            <Card variant="outlined">
                <Box sx={{ p: 2 }}>
                    <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
                        Open Risks ({filteredRisks.length})
                    </Typography>
                    
                    {renderTableControls(
                        risksSearch,
                        setRisksSearch,
                        risksFilter,
                        setRisksFilter,
                        [
                            { value: 'all', label: 'All' },
                            { value: 'high_severity', label: 'High Severity', count: openRisks.filter(r => r.severity === 'High').length },
                            { value: 'recent', label: 'Recent' }
                        ],
                        'Search risks or applications...'
                    )}
                </Box>
                
                <CardContent sx={{ pt: 0, pb: 2 }}>
                    {filteredRisks.length === 0 ? (
                        <Alert severity="success">No open risks found.</Alert>
                    ) : (
                        <>
                            <TableContainer>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Application</TableCell>
                                            <TableCell>TC</TableCell>
                                            <TableCell>Business Service</TableCell>
                                            <TableCell>Domain</TableCell>
                                            <TableCell>Risk Title</TableCell>
                                            <TableCell>Severity</TableCell>
                                            <TableCell>Created</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {paginatedRisks.map((risk) => (
                                            <TableRow 
                                                key={risk.riskId} 
                                                hover 
                                                sx={{ cursor: 'pointer' }}
                                                onClick={() => console.log('View risk story for', risk.riskId)}
                                            >
                                                <TableCell>
                                                    {risk.criticality ? (
                                                        getCriticalityBadge(risk.criticality, risk.appName)
                                                    ) : (
                                                        <Typography variant="body2" fontWeight={600}>
                                                            {risk.appName}
                                                        </Typography>
                                                    )}
                                                </TableCell>
                                                <TableCell>{risk.department || '—'}</TableCell>
                                                <TableCell>{risk.businessService || '—'}</TableCell>
                                                <TableCell>
                                                    {risk.domain && (
                                                        <Chip
                                                            size="small"
                                                            label={risk.domain}
                                                            color={risk.domain === 'Security' ? 'error' : 
                                                                   risk.domain === 'Data Architecture' ? 'info' :
                                                                   risk.domain === 'Service Transition' ? 'success' : 'warning'}
                                                            variant="outlined"
                                                        />
                                                    )}
                                                </TableCell>
                                                <TableCell>{risk.title}</TableCell>
                                                <TableCell>
                                                    <Chip
                                                        size="small"
                                                        color={risk.severity === 'High' ? 'error' : 
                                                               risk.severity === 'Medium' ? 'warning' : 'default'}
                                                        label={risk.severity}
                                                        variant="outlined"
                                                    />
                                                </TableCell>
                                                <TableCell>{new Date(risk.createdAt).toLocaleDateString()}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            
                            {renderPaginationControls(risksPage, filteredRisks.length, setRisksPage)}
                        </>
                    )}
                </CardContent>
            </Card>

            {/* Footer */}
            <Box sx={{ textAlign: 'center', py: 2 }}>
                <Button variant="outlined" href="/po/evidence">
                    View Full Evidence Catalog
                </Button>
            </Box>

            <RaiseRiskModal
                open={raiseRiskModalOpen}
                onClose={() => setRaiseRiskModalOpen(false)}
                item={selectedItem}
            />

            {selectedApp && (
                <AppSecurityReviewModal
                    open={securityModalOpen}
                    onClose={() => setSecurityModalOpen(false)}
                    appId={selectedApp.appId}
                    appName={selectedApp.appName}
                    criticality={selectedApp.criticality}
                    totalIssues={selectedApp.issueCount}
                    department={selectedApp.department}
                />
            )}
        </Stack>
    );
}