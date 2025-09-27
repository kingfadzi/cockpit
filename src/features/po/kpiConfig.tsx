import React from 'react';
import { Chip, Button, IconButton, Tooltip, Box, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { OpenInNew, Upload, Edit, ContactSupport } from '@mui/icons-material';
import CriticalityBadge from '../../components/CriticalityBadge';
import { WorkbenchEvidenceItem } from '../../api/types';

// Domain title to domain key mapping for navigation
const getDomainKey = (domainTitle: string): string => {
  const mapping: Record<string, string> = {
    'Security': 'security_rating',
    'Integrity': 'integrity_rating',
    'Availability': 'availability_rating',
    'Confidentiality': 'confidentiality_rating',
    'Resilience': 'resilience_rating',
    'Criticality': 'app_criticality_assessment',
  };
  return mapping[domainTitle] || 'app_criticality_assessment'; // fallback to criticality
};

// Common app name column with app ID in brackets after name
const createAppNameColumn = (): KpiColumn => ({
  field: 'appName',
  headerName: 'Application',
  flex: 3,
  renderCell: (evidence) => {
    const domainKey = getDomainKey(evidence.domainTitle);
    return (
      <Button
        component={RouterLink}
        to={`/po/apps/${evidence.appId}?tab=profile&subtab=${domainKey}`}
        variant="text"
        sx={{
          justifyContent: 'flex-start',
          textTransform: 'none',
          fontWeight: 'bold',
          p: 0,
          gap: 1,
          '&:hover': {
            backgroundColor: 'action.hover'
          }
        }}
      >
        <CriticalityBadge criticality={evidence.appCriticality || 'D'} />
        {evidence.appName}
        <Typography variant="body2" color="text.secondary">
          ({evidence.appId})
        </Typography>
      </Button>
    );
  },
});

// Common architecture columns
const createArchitectureColumns = (): KpiColumn[] => [
  {
    field: 'applicationTier',
    headerName: 'App Tier',
    flex: 1,
    renderCell: (evidence) => evidence.applicationTier || '—',
  },
  {
    field: 'architectureType',
    headerName: 'Architecture',
    flex: 1,
    renderCell: (evidence) => evidence.architectureType || '—',
  },
  {
    field: 'installType',
    headerName: 'Install Type',
    flex: 1,
    renderCell: (evidence) => evidence.installType || '—',
  },
];

// Defines the structure for a table column in the workbench
export interface KpiColumn {
  // The key from the WorkbenchEvidenceItem data object
  field: keyof WorkbenchEvidenceItem | 'actions';
  // The header text for the column
  headerName: string;
  // Optional: custom render function for the cell
  renderCell?: (evidence: WorkbenchEvidenceItem) => React.ReactNode;
  // Flex grow factor
  flex?: number;
}

// Defines the entire configuration for a single KPI
export interface KpiConfig {
  // The title displayed at the top of the workbench page
  pageTitle: string;
  // A brief description shown below the title
  description: string;
  // The array of column definitions for the table
  columns: KpiColumn[];
}

// A map of KPI types to their specific configurations
export const kpiConfigMap: Record<string, KpiConfig> = {
  compliant: {
    pageTitle: 'Compliant Evidence',
    description: 'Evidence items that have been approved and are meeting all requirements.',
    columns: [
      createAppNameColumn(),
      {
        field: 'domainTitle',
        headerName: 'Domain',
        flex: 1,
        renderCell: (evidence) => <Chip size="small" label={evidence.domainTitle} color="primary" />,
      },
      {
        field: 'fieldLabel',
        headerName: 'Control Field',
        flex: 3,
      },
      ...createArchitectureColumns(),
      {
        field: 'reviewedDate',
        headerName: 'Approved Date',
        flex: 1,
        renderCell: (evidence) => evidence.reviewedDate ? new Date(evidence.reviewedDate).toLocaleDateString() : '—',
      },
    ],
  },
  missing: {
    pageTitle: 'Missing Evidence',
    description: 'Evidence items that need to be uploaded or submitted to meet compliance requirements.',
    columns: [
      createAppNameColumn(),
      {
        field: 'domainTitle',
        headerName: 'Domain',
        flex: 1,
        renderCell: (evidence) => <Chip size="small" label={evidence.domainTitle} color="error" />,
      },
      {
        field: 'fieldLabel',
        headerName: 'Control Field',
        flex: 3,
      },
      ...createArchitectureColumns(),
      {
        field: 'dueDate',
        headerName: 'Due Date',
        flex: 1,
        renderCell: (evidence) => {
          if (!evidence.dueDate) return '—';
          const isOverdue = evidence.daysOverdue && evidence.daysOverdue > 0;
          return (
            <Chip
              label={new Date(evidence.dueDate).toLocaleDateString()}
              size="small"
              color={isOverdue ? 'error' : 'warning'}
            />
          );
        },
      },
    ],
  },
  pending: {
    pageTitle: 'Pending Review',
    description: 'Evidence items that have been submitted and are awaiting SME review.',
    columns: [
      createAppNameColumn(),
      {
        field: 'domainTitle',
        headerName: 'Domain',
        flex: 1,
        renderCell: (evidence) => <Chip size="small" label={evidence.domainTitle} color="warning" />,
      },
      {
        field: 'fieldLabel',
        headerName: 'Control Field',
        flex: 3,
      },
      ...createArchitectureColumns(),
      {
        field: 'submittedDate',
        headerName: 'Submitted Date',
        flex: 1,
        renderCell: (evidence) => evidence.submittedDate ? new Date(evidence.submittedDate).toLocaleDateString() : '—',
      },
      {
        field: 'assignedReviewer',
        headerName: 'Assigned Reviewer',
        flex: 1,
        renderCell: (evidence) => evidence.assignedReviewer || 'Unassigned',
      },
    ],
  },
  riskBlocked: {
    pageTitle: 'Risk Blocked Evidence',
    description: 'Evidence items that are blocked due to risks and need remediation.',
    columns: [
      createAppNameColumn(),
      {
        field: 'domainTitle',
        headerName: 'Domain',
        flex: 1,
        renderCell: (evidence) => <Chip size="small" label={evidence.domainTitle} color="error" />,
      },
      {
        field: 'fieldLabel',
        headerName: 'Control Field',
        flex: 3,
      },
      ...createArchitectureColumns(),
      {
        field: 'rejectionReason',
        headerName: 'Rejection Reason',
        flex: 2,
        renderCell: (evidence) => (
          <Tooltip title={evidence.rejectionReason}>
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {evidence.rejectionReason || 'No reason provided'}
            </span>
          </Tooltip>
        ),
      },
      {
        field: 'reviewedDate',
        headerName: 'Rejected Date',
        flex: 1,
        renderCell: (evidence) => evidence.reviewedDate ? new Date(evidence.reviewedDate).toLocaleDateString() : '—',
      },
    ],
  },
};
