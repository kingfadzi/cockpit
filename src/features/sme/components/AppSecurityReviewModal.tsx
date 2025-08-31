import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Tabs,
  Tab,
  Box,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Stack,
  IconButton,
  Typography,
  Divider
} from '@mui/material';
import {
  CheckCircle as ApproveIcon,
  Cancel as RejectIcon,
  RequestPage as RequestIcon,
  Warning as RiskIcon,
  Visibility as ViewIcon
} from '@mui/icons-material';

interface Issue {
  id: string;
  fieldKey: string;
  fieldLabel: string;
  type: 'critical' | 'expired' | 'pending';
  status: 'pending' | 'in_review' | 'approved' | 'rejected';
  evidenceStatus: 'missing' | 'expired' | 'pending_approval' | 'approved';
  lastUpdated: string;
  daysOverdue?: number;
  domain?: string;
}

interface AppSecurityReviewModalProps {
  open: boolean;
  onClose: () => void;
  appId: string;
  appName: string;
  criticality: 'A' | 'B' | 'C' | 'D';
  totalIssues: number;
  department: string;
}

function TabPanel({ children, value, index }: { children: React.ReactNode; value: number; index: number }) {
  return (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ py: 2 }}>{children}</Box>}
    </div>
  );
}

export default function AppSecurityReviewModal({
  open,
  onClose,
  appId,
  appName,
  criticality,
  totalIssues,
  department
}: AppSecurityReviewModalProps) {
  const [tabValue, setTabValue] = useState(0);

  const getCriticalityColor = (crit: 'A' | 'B' | 'C' | 'D') => {
    const colors = { A: 'error', B: 'warning', C: 'info', D: 'success' } as const;
    return colors[crit];
  };

  const mockIssues: Issue[] = [
    {
      id: '1',
      fieldKey: 'encryption_at_rest',
      fieldLabel: 'Encryption at Rest',
      type: 'critical',
      status: 'pending',
      evidenceStatus: 'missing',
      lastUpdated: '2025-08-30T10:00:00Z',
      daysOverdue: 5,
      domain: 'Security'
    },
    {
      id: '2',
      fieldKey: 'mfa_enforcement',
      fieldLabel: 'Multi-Factor Authentication',
      type: 'critical',
      status: 'pending',
      evidenceStatus: 'missing',
      lastUpdated: '2025-08-29T10:00:00Z',
      daysOverdue: 3,
      domain: 'Security'
    },
    {
      id: '3',
      fieldKey: 'security_testing',
      fieldLabel: 'Security Testing',
      type: 'expired',
      status: 'approved',
      evidenceStatus: 'expired',
      lastUpdated: '2025-06-15T10:00:00Z',
      daysOverdue: 77,
      domain: 'Security'
    },
    {
      id: '4',
      fieldKey: 'audit_logging',
      fieldLabel: 'Audit Logging',
      type: 'pending',
      status: 'in_review',
      evidenceStatus: 'pending_approval',
      lastUpdated: '2025-08-28T10:00:00Z',
      domain: 'Service Transition'
    },
    {
      id: '5',
      fieldKey: 'backup_policy',
      fieldLabel: 'Backup Policy',
      type: 'pending',
      status: 'pending',
      evidenceStatus: 'missing',
      lastUpdated: '2025-08-27T10:00:00Z',
      domain: 'Data Architecture'
    }
  ];

  const criticalIssues = mockIssues.filter(issue => issue.type === 'critical');
  const expiredIssues = mockIssues.filter(issue => issue.type === 'expired');
  const pendingIssues = mockIssues.filter(issue => issue.type === 'pending');

  const handleAction = (action: string, issueId: string) => {
    console.log(`${action} clicked for issue ${issueId}`);
  };

  const handleBulkAction = (action: string, tabType: string) => {
    console.log(`Bulk ${action} clicked for ${tabType} tab`);
  };

  const renderIssueTable = (issues: Issue[], showBulkActions: boolean = true) => (
    <Stack spacing={2}>
      {showBulkActions && (
        <Stack direction="row" spacing={1}>
          <Button 
            size="small" 
            variant="outlined" 
            color="success"
            onClick={() => handleBulkAction('approve', 'current')}
          >
            Approve All
          </Button>
          <Button 
            size="small" 
            variant="outlined"
            onClick={() => handleBulkAction('request-evidence', 'current')}
          >
            Request Evidence for All
          </Button>
        </Stack>
      )}
      
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Security Control</TableCell>
            <TableCell>Domain</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Evidence Status</TableCell>
            <TableCell>Days Overdue</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {issues.map((issue) => (
            <TableRow key={issue.id}>
              <TableCell>
                <Typography variant="body2" fontWeight={600}>
                  {issue.fieldLabel}
                </Typography>
              </TableCell>
              <TableCell>
                {issue.domain && (
                  <Chip
                    size="small"
                    label={issue.domain}
                    color={issue.domain === 'Security' ? 'error' : 
                           issue.domain === 'Data Architecture' ? 'info' :
                           issue.domain === 'Service Transition' ? 'success' : 'warning'}
                    variant="outlined"
                  />
                )}
              </TableCell>
              <TableCell>
                <Chip 
                  size="small" 
                  label={issue.status.replace('_', ' ')}
                  color={issue.status === 'approved' ? 'success' : issue.status === 'rejected' ? 'error' : 'default'}
                />
              </TableCell>
              <TableCell>
                <Chip 
                  size="small" 
                  label={issue.evidenceStatus.replace('_', ' ')}
                  color={issue.evidenceStatus === 'missing' ? 'error' : issue.evidenceStatus === 'expired' ? 'warning' : 'default'}
                />
              </TableCell>
              <TableCell>
                {issue.daysOverdue ? (
                  <Chip 
                    size="small" 
                    label={`${issue.daysOverdue}d`}
                    color="error"
                  />
                ) : '-'}
              </TableCell>
              <TableCell align="right">
                <Stack direction="row" spacing={0.5}>
                  <IconButton size="small" onClick={() => handleAction('view', issue.id)}>
                    <ViewIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" color="success" onClick={() => handleAction('approve', issue.id)}>
                    <ApproveIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" color="error" onClick={() => handleAction('reject', issue.id)}>
                    <RejectIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" onClick={() => handleAction('request', issue.id)}>
                    <RequestIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" color="warning" onClick={() => handleAction('raise-risk', issue.id)}>
                    <RiskIcon fontSize="small" />
                  </IconButton>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Stack>
  );

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="lg" 
      fullWidth
      PaperProps={{ sx: { height: '80vh' } }}
    >
      <DialogTitle>
        <Stack direction="row" spacing={2} alignItems="center">
          <Chip 
            size="small" 
            label={criticality} 
            color={getCriticalityColor(criticality)}
            variant="filled"
            sx={{ minWidth: 28, fontWeight: 700 }}
          />
          <Typography variant="h6" component="span">
            Security Review: {appName}
          </Typography>
          <Chip 
            size="small" 
            label={`${totalIssues} issues`}
            color={totalIssues >= 20 ? 'error' : totalIssues >= 10 ? 'warning' : 'info'}
          />
          <Typography variant="body2" color="text.secondary">
            {department}
          </Typography>
        </Stack>
      </DialogTitle>
      
      <DialogContent sx={{ p: 0 }}>
        <Tabs 
          value={tabValue} 
          onChange={(_, newValue) => setTabValue(newValue)}
          sx={{ borderBottom: 1, borderColor: 'divider', px: 3 }}
        >
          <Tab 
            label={
              <Stack direction="row" spacing={1} alignItems="center">
                <span>Critical Issues</span>
                <Chip size="small" label={criticalIssues.length} color="error" />
              </Stack>
            } 
          />
          <Tab 
            label={
              <Stack direction="row" spacing={1} alignItems="center">
                <span>Expired Evidence</span>
                <Chip size="small" label={expiredIssues.length} color="warning" />
              </Stack>
            } 
          />
          <Tab 
            label={
              <Stack direction="row" spacing={1} alignItems="center">
                <span>Pending Reviews</span>
                <Chip size="small" label={pendingIssues.length} color="info" />
              </Stack>
            } 
          />
        </Tabs>

        <Box sx={{ px: 3 }}>
          <TabPanel value={tabValue} index={0}>
            {renderIssueTable(criticalIssues)}
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            {renderIssueTable(expiredIssues)}
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            {renderIssueTable(pendingIssues)}
          </TabPanel>
        </Box>
      </DialogContent>
      
      <DialogActions sx={{ p: 3, pt: 1 }}>
        <Button onClick={onClose}>Close</Button>
        <Button variant="contained" onClick={onClose}>
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}