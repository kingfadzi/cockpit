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
    Link,
    Collapse,
    Divider
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
    ExpandLess as ExpandLessIcon
} from '@mui/icons-material';
import SectionHeader from '../../../components/SectionHeader';
import { mockSmeAssignments, mockSmeQueue, mockCrossDomainIssues, mockRisks } from '../mock/smeData';
import RaiseRiskModal from '../components/RaiseRiskModal';

export default function SecuritySmeView() {
    const [raiseRiskModalOpen, setRaiseRiskModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [queueFilter, setQueueFilter] = useState<'all' | 'overdue' | 'high_priority' | 'this_week'>('all');
    const [domainFilter, setDomainFilter] = useState<'all' | 'overdue' | 'high_priority' | 'this_week'>('all');
    const [crossDomainFilter, setCrossDomainFilter] = useState<'all' | 'overdue' | 'high_priority' | 'this_week'>('all');
    const [showMoreDomain, setShowMoreDomain] = useState(false);
    const [showMoreCrossDomain, setShowMoreCrossDomain] = useState(false);
    const [expandedApps, setExpandedApps] = useState<Set<string>>(new Set());

    const assignments = mockSmeAssignments.filter(a => a.assignedSmeId === 'security_sme_1');
    const domainQueue = mockSmeQueue;
    const crossDomainIssues = mockCrossDomainIssues;
    const openRisks = mockRisks.filter(r => r.status === 'Open');

    // Filtering logic
    const getFilteredItems = (items: any[], filter: string) => {
        const now = new Date();
        const oneWeekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
        
        switch (filter) {
            case 'overdue':
                return items.filter(item => item.daysOverdue && item.daysOverdue > 0);
            case 'high_priority':
                return items.filter(item => item.priority === 'urgent');
            case 'this_week':
                return items.filter(item => {
                    if (item.dueDate) {
                        const dueDate = new Date(item.dueDate);
                        return dueDate <= oneWeekFromNow;
                    }
                    return false;
                });
            default:
                return items;
        }
    };

    // Group domain queue by app
    const groupedDomainQueue = useMemo(() => {
        const filtered = getFilteredItems(domainQueue, domainFilter);
        const grouped = filtered.reduce((acc: any, item) => {
            if (!acc[item.appId]) {
                acc[item.appId] = {
                    appName: item.appName,
                    appId: item.appId,
                    items: []
                };
            }
            acc[item.appId].items.push(item);
            return acc;
        }, {});
        return Object.values(grouped);
    }, [domainQueue, domainFilter]);

    const filteredAssignments = getFilteredItems(assignments, queueFilter);
    const filteredCrossDomain = getFilteredItems(crossDomainIssues, crossDomainFilter);

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

    const formatDaysOverdue = (days?: number) => {
        if (!days) return null;
        return days > 0 ? `${days}d overdue` : null;
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
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Stack direction="row" spacing={2} alignItems="center">
                            <Typography variant="h6" fontWeight={700}>
                                My Review Queue ({filteredAssignments.length})
                            </Typography>
                            <Stack direction="row" spacing={0.5}>
                                {['all', 'overdue', 'priority'].map((filter) => (
                                    <Chip
                                        key={filter}
                                        size="small"
                                        label={filter === 'all' ? 'All' : 
                                               filter === 'overdue' ? `Overdue (${getFilteredItems(assignments, 'overdue').length})` :
                                               `Priority (${getFilteredItems(assignments, 'high_priority').length})`}
                                        color={queueFilter === filter || (filter === 'priority' && queueFilter === 'high_priority') ? 'primary' : 'default'}
                                        variant={queueFilter === filter || (filter === 'priority' && queueFilter === 'high_priority') ? 'filled' : 'outlined'}
                                        onClick={() => setQueueFilter(filter === 'priority' ? 'high_priority' : filter as any)}
                                        clickable
                                        sx={{ height: 24 }}
                                    />
                                ))}
                            </Stack>
                        </Stack>
                    </Stack>
                </Box>
                
                <CardContent sx={{ pt: 0, pb: 2 }}>
                    {assignments.length === 0 ? (
                        <Alert severity="info">No items in your review queue.</Alert>
                    ) : (
                        <TableContainer>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Application</TableCell>
                                        <TableCell>Field</TableCell>
                                        <TableCell>Evidence Status</TableCell>
                                        <TableCell>Priority</TableCell>
                                        <TableCell>Due Date</TableCell>
                                        <TableCell align="right">Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {assignments.map((assignment) => (
                                        <TableRow key={`${assignment.appId}-${assignment.fieldKey}`} hover>
                                            <TableCell>
                                                <Link href={`/po/apps/${assignment.appId}`} sx={{ fontWeight: 600 }}>
                                                    {assignment.appName}
                                                </Link>
                                            </TableCell>
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
                    )}
                </CardContent>
            </Card>

            {/* Section 2: Security Domain Watch */}
            <Card variant="outlined">
                <Box sx={{ p: 2 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Stack direction="row" spacing={2} alignItems="center">
                            <Typography variant="h6" fontWeight={700}>
                                Security Domain Watch ({groupedDomainQueue.reduce((acc: number, app: any) => acc + app.items.length, 0)})
                            </Typography>
                            <Stack direction="row" spacing={0.5}>
                                {['all', 'overdue', 'priority'].map((filter) => (
                                    <Chip
                                        key={filter}
                                        size="small"
                                        label={filter === 'all' ? 'All' : 
                                               filter === 'overdue' ? `Overdue (${getFilteredItems(domainQueue, 'overdue').length})` :
                                               `Priority (${getFilteredItems(domainQueue, 'high_priority').length})`}
                                        color={domainFilter === filter || (filter === 'priority' && domainFilter === 'high_priority') ? 'warning' : 'default'}
                                        variant={domainFilter === filter || (filter === 'priority' && domainFilter === 'high_priority') ? 'filled' : 'outlined'}
                                        onClick={() => setDomainFilter(filter === 'priority' ? 'high_priority' : filter as any)}
                                        clickable
                                        sx={{ height: 24 }}
                                    />
                                ))}
                            </Stack>
                        </Stack>
                    </Stack>
                </Box>
                
                <CardContent sx={{ pt: 0, pb: 2 }}>
                    {groupedDomainQueue.length === 0 ? (
                        <Alert severity="success">All security controls are current.</Alert>
                    ) : (
                        <TableContainer sx={{ maxHeight: 400, overflowY: 'auto' }}>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ minWidth: 200 }}>Application</TableCell>
                                        <TableCell sx={{ minWidth: 150 }}>Field</TableCell>
                                        <TableCell sx={{ minWidth: 100 }}>Status</TableCell>
                                        <TableCell align="right" sx={{ minWidth: 150 }}>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {groupedDomainQueue.slice(0, showMoreDomain ? undefined : 10).map((appGroup: any) => (
                                        <React.Fragment key={appGroup.appId}>
                                            {/* App header row */}
                                            <TableRow 
                                                sx={{ 
                                                    backgroundColor: 'grey.100',
                                                    cursor: 'pointer',
                                                    '&:hover': { backgroundColor: 'grey.200' }
                                                }}
                                                onClick={() => toggleAppExpansion(appGroup.appId)}
                                            >
                                                <TableCell colSpan={4}>
                                                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                                                        <Stack direction="row" spacing={1} alignItems="center">
                                                            <IconButton size="small">
                                                                {expandedApps.has(appGroup.appId) ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                                            </IconButton>
                                                            <Typography variant="subtitle2" fontWeight={600}>
                                                                {appGroup.appName}
                                                            </Typography>
                                                            <Chip
                                                                size="small"
                                                                color="warning"
                                                                label={`${appGroup.items.length} issues`}
                                                                variant="outlined"
                                                            />
                                                        </Stack>
                                                    </Stack>
                                                </TableCell>
                                            </TableRow>
                                            
                                            {/* Expandable field rows */}
                                            {expandedApps.has(appGroup.appId) && appGroup.items.map((item: any) => (
                                                <TableRow key={item.fieldKey} hover>
                                                    <TableCell sx={{ pl: 6 }}>
                                                        <Link href={`/po/apps/${item.appId}`} sx={{ fontWeight: 600 }}>
                                                            {item.appName}
                                                        </Link>
                                                    </TableCell>
                                                    <TableCell>{item.fieldLabel}</TableCell>
                                                    <TableCell>
                                                        <Chip
                                                            size="small"
                                                            color={item.evidenceStatus === 'missing' ? 'error' : 'warning'}
                                                            label={item.evidenceStatus === 'missing' ? 'No Evidence' : 'Expired'}
                                                            variant="outlined"
                                                        />
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                                                            <Button size="small" variant="text">Take Ownership</Button>
                                                            <Button 
                                                                size="small" 
                                                                color="warning" 
                                                                variant="text"
                                                                onClick={() => handleRaiseRisk(item)}
                                                            >
                                                                Raise Risk
                                                            </Button>
                                                        </Stack>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </React.Fragment>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                    
                    {groupedDomainQueue.length > 10 && (
                        <Box sx={{ textAlign: 'center', pt: 1 }}>
                            <Button 
                                variant="outlined" 
                                size="small"
                                onClick={() => setShowMoreDomain(!showMoreDomain)}
                            >
                                {showMoreDomain ? 'Show Less' : `Show More (${groupedDomainQueue.length - 10} more apps)`}
                            </Button>
                        </Box>
                    )}
                </CardContent>
            </Card>

            {/* Section 3: Cross-Domain Awareness */}
            <Card variant="outlined">
                <Box sx={{ p: 2 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Stack direction="row" spacing={2} alignItems="center">
                            <Typography variant="h6" fontWeight={700}>
                                Cross-Domain Awareness ({filteredCrossDomain.length})
                            </Typography>
                            <Stack direction="row" spacing={0.5}>
                                {['all', 'overdue', 'priority'].map((filter) => (
                                    <Chip
                                        key={filter}
                                        size="small"
                                        label={filter === 'all' ? 'All' : 
                                               filter === 'overdue' ? `Overdue (${getFilteredItems(crossDomainIssues, 'overdue').length})` :
                                               `Priority (${getFilteredItems(crossDomainIssues, 'high_priority').length})`}
                                        color={crossDomainFilter === filter || (filter === 'priority' && crossDomainFilter === 'high_priority') ? 'info' : 'default'}
                                        variant={crossDomainFilter === filter || (filter === 'priority' && crossDomainFilter === 'high_priority') ? 'filled' : 'outlined'}
                                        onClick={() => setCrossDomainFilter(filter === 'priority' ? 'high_priority' : filter as any)}
                                        clickable
                                        sx={{ height: 24 }}
                                    />
                                ))}
                            </Stack>
                        </Stack>
                    </Stack>
                </Box>
                
                <CardContent sx={{ pt: 0, pb: 2 }}>
                    {filteredCrossDomain.length === 0 ? (
                        <Alert severity="info">No cross-domain issues requiring attention.</Alert>
                    ) : (
                        <TableContainer sx={{ maxHeight: 300, overflowY: 'auto' }}>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ minWidth: 200 }}>Application</TableCell>
                                        <TableCell sx={{ minWidth: 150 }}>Field</TableCell>
                                        <TableCell sx={{ minWidth: 100 }}>Status</TableCell>
                                        <TableCell align="right" sx={{ minWidth: 150 }}>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {/* Group cross-domain items by app for consistency */}
                                    {Object.values(filteredCrossDomain.reduce((acc: any, item) => {
                                        if (!acc[item.appId]) {
                                            acc[item.appId] = {
                                                appName: item.appName,
                                                appId: item.appId,
                                                items: []
                                            };
                                        }
                                        acc[item.appId].items.push(item);
                                        return acc;
                                    }, {})).slice(0, showMoreCrossDomain ? undefined : 5).map((appGroup: any) => (
                                        <React.Fragment key={appGroup.appId}>
                                            {/* App header row */}
                                            <TableRow 
                                                sx={{ 
                                                    backgroundColor: 'grey.100',
                                                    cursor: 'pointer',
                                                    '&:hover': { backgroundColor: 'grey.200' }
                                                }}
                                                onClick={() => toggleAppExpansion(appGroup.appId)}
                                            >
                                                <TableCell colSpan={4}>
                                                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                                                        <Stack direction="row" spacing={1} alignItems="center">
                                                            <IconButton size="small">
                                                                {expandedApps.has(appGroup.appId) ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                                            </IconButton>
                                                            <Typography variant="subtitle2" fontWeight={600}>
                                                                {appGroup.appName}
                                                            </Typography>
                                                            <Chip
                                                                size="small"
                                                                color="info"
                                                                label={`${appGroup.items.length} issues`}
                                                                variant="outlined"
                                                            />
                                                        </Stack>
                                                    </Stack>
                                                </TableCell>
                                            </TableRow>
                                            
                                            {/* Expandable field rows */}
                                            {expandedApps.has(appGroup.appId) && appGroup.items.map((item: any) => (
                                                <TableRow key={item.fieldKey} hover>
                                                    <TableCell sx={{ pl: 6 }}>
                                                        <Link href={`/po/apps/${item.appId}`} sx={{ fontWeight: 600 }}>
                                                            {item.appName}
                                                        </Link>
                                                    </TableCell>
                                                    <TableCell>{item.fieldLabel}</TableCell>
                                                    <TableCell>
                                                        <Chip
                                                            size="small"
                                                            color={item.evidenceStatus === 'missing' ? 'error' : 'warning'}
                                                            label={item.evidenceStatus.replace('_', ' ')}
                                                            variant="outlined"
                                                        />
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                                                            <Button size="small" variant="text">Flag for Review</Button>
                                                            <Button 
                                                                size="small" 
                                                                color="warning" 
                                                                variant="text"
                                                                onClick={() => handleRaiseRisk(item)}
                                                            >
                                                                Raise Risk
                                                            </Button>
                                                        </Stack>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </React.Fragment>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                    
                    {filteredCrossDomain.length > 5 && (
                        <Box sx={{ textAlign: 'center', pt: 1 }}>
                            <Button 
                                variant="outlined" 
                                size="small"
                                onClick={() => setShowMoreCrossDomain(!showMoreCrossDomain)}
                            >
                                {showMoreCrossDomain ? 'Show Less' : `Show More (${filteredCrossDomain.length - 5} more items)`}
                            </Button>
                        </Box>
                    )}
                </CardContent>
            </Card>

            {/* Open Risks */}
            {openRisks.length > 0 && (
                <Card variant="outlined">
                    <Box sx={{ p: 2 }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Stack direction="row" spacing={2} alignItems="center">
                                <Typography variant="h6" fontWeight={700}>
                                    Open Risks ({openRisks.length})
                                </Typography>
                            </Stack>
                        </Stack>
                    </Box>
                    
                    <CardContent sx={{ pt: 0, pb: 2 }}>
                        <TableContainer>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Application</TableCell>
                                        <TableCell>Risk Title</TableCell>
                                        <TableCell>Severity</TableCell>
                                        <TableCell>Created</TableCell>
                                        <TableCell align="right">Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {openRisks.map((risk) => (
                                        <TableRow key={risk.riskId} hover>
                                            <TableCell>
                                                <Link href={`/po/apps/${risk.appId}`} sx={{ fontWeight: 600 }}>
                                                    {risk.appName}
                                                </Link>
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
                                            <TableCell align="right">
                                                <Button size="small" variant="outlined" color="error">
                                                    View Risk Story
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardContent>
                </Card>
            )}

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
        </Stack>
    );
}