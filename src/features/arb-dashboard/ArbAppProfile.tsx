/**
 * ARB Application Profile Page
 * Shows detailed risk view for a single application
 */

import React, { useState, useMemo } from 'react';
import {
  Stack,
  Box,
  Card,
  Typography,
  Grid,
  Tabs,
  Tab,
  Chip,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CriticalityBadge from '../../components/CriticalityBadge';
import { USE_MOCK_DATA } from './config';
import { getMockArbDashboard, currentMockUser } from './mocks/mockArbData';
import { Application, Risk } from './api/types';

interface AppSummaryMetrics {
  riskScore: number;
  healthGrade: 'A' | 'B' | 'C' | 'D' | 'F';
  openRisks: number;
  criticalRisks: number;
  lastActivity: string;
}

export default function ArbAppProfile() {
  const { arbName, appId } = useParams<{ arbName: string; appId: string }>();
  const navigate = useNavigate();

  // State
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [priorityFilter, setPriorityFilter] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('priority');

  // Load application data (mock for now)
  const application = useMemo(() => {
    if (!USE_MOCK_DATA) {
      // TODO: Phase 2 - Real API call
      return null;
    }

    // Get all applications (no scope filtering for profile view)
    const dashboardData = getMockArbDashboard(
      'all-domains',
      currentMockUser.id,
      currentMockUser.arbDomain
    );

    console.log('[ArbAppProfile] Looking for appId:', appId);
    console.log('[ArbAppProfile] Available apps:', dashboardData.applications.map(a => ({ id: a.id, appId: a.appId, name: a.name })));

    // Find the application
    const foundApp = dashboardData.applications.find((app) => app.appId === appId);
    console.log('[ArbAppProfile] Found app:', foundApp);

    return foundApp || null;
  }, [appId]);

  if (!application) {
    return (
      <Stack spacing={3}>
        <Typography>Application not found</Typography>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(`/sme/arb/${arbName}`)}
        >
          Back to Dashboard
        </Button>
      </Stack>
    );
  }

  // Calculate summary metrics
  const metrics: AppSummaryMetrics = {
    riskScore: application.aggregatedRiskScore,
    healthGrade: getHealthGrade(application.aggregatedRiskScore),
    openRisks: application.totalOpenItems,
    criticalRisks: application.riskBreakdown.critical,
    lastActivity: application.lastActivityDate,
  };

  // Get unique domains
  const domains = ['all', ...application.domains];

  // Filter risks by domain
  const filteredByDomain = useMemo(() => {
    if (selectedDomain === 'all') {
      return application.risks;
    }
    return application.risks.filter((risk) => risk.arbDomain === selectedDomain);
  }, [application.risks, selectedDomain]);

  // Apply additional filters
  const filteredRisks = useMemo(() => {
    let risks = [...filteredByDomain];

    // Status filter
    if (statusFilter) {
      risks = risks.filter((risk) => risk.status === statusFilter);
    }

    // Priority filter
    if (priorityFilter) {
      risks = risks.filter((risk) => risk.priority === priorityFilter);
    }

    // Sort
    risks.sort((a, b) => {
      switch (sortBy) {
        case 'priority':
          return getPriorityWeight(b.priority) - getPriorityWeight(a.priority);
        case 'status':
          return a.status.localeCompare(b.status);
        case 'created':
          return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
        default:
          return 0;
      }
    });

    return risks;
  }, [filteredByDomain, statusFilter, priorityFilter, sortBy]);

  // Get domain display name
  const getDomainDisplayName = (domain: string): string => {
    const names: Record<string, string> = {
      security: 'Security',
      data: 'Data',
      operations: 'Operations',
      enterprise_architecture: 'Enterprise Architecture',
    };
    return names[domain] || domain;
  };

  // Get risk counts per domain
  const getDomainRiskCount = (domain: string): number => {
    if (domain === 'all') {
      return application.risks.length;
    }
    return application.risks.filter((risk) => risk.arbDomain === domain).length;
  };

  return (
    <Stack spacing={3}>
      {/* Back button */}
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(`/sme/arb/${arbName}`)}
        sx={{ alignSelf: 'flex-start' }}
      >
        Back to Dashboard
      </Button>

      {/* App Header */}
      <Card sx={{ p: 3 }}>
        <Stack spacing={2}>
          {/* App name and criticality */}
          <Stack direction="row" spacing={2} alignItems="center">
            <CriticalityBadge criticality={application.criticality} />
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              {application.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ({application.appId})
            </Typography>
          </Stack>

          {/* App metadata */}
          <Typography variant="body2" color="text.secondary">
            {application.businessUnit} | Owner: {application.owner}
          </Typography>

          {/* Summary metrics */}
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="caption" color="text.secondary">
                  Risk Score
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    mt: 1,
                    color: getRiskScoreColor(metrics.riskScore),
                    fontWeight: 600,
                  }}
                >
                  {metrics.healthGrade}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {metrics.riskScore.toFixed(0)}/100
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {getRiskScoreStatus(metrics.riskScore)}
                </Typography>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="caption" color="text.secondary">
                  Open Risks
                </Typography>
                <Typography variant="h4" sx={{ mt: 1, fontWeight: 600 }}>
                  {metrics.openRisks}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  unresolved
                </Typography>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="caption" color="text.secondary">
                  Critical Risks
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    mt: 1,
                    fontWeight: 600,
                    color: metrics.criticalRisks > 0 ? 'error.main' : 'text.primary',
                  }}
                >
                  {metrics.criticalRisks}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  high priority
                </Typography>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="caption" color="text.secondary">
                  Last Activity
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  {formatRelativeTime(metrics.lastActivity)}
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </Stack>
      </Card>

      {/* Domain Tabs */}
      <Card sx={{ borderRadius: 3 }}>
        <Tabs
          value={selectedDomain}
          onChange={(_, newValue) => setSelectedDomain(newValue)}
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            px: 2,
            minHeight: 48,
          }}
        >
          {domains.map((domain) => (
            <Tab
              key={domain}
              value={domain}
              label={
                <>
                  {domain === 'all' ? 'All Risks' : getDomainDisplayName(domain)}{' '}
                  <Chip
                    label={getDomainRiskCount(domain)}
                    size="small"
                    color={selectedDomain === domain ? 'primary' : 'default'}
                    sx={{ height: 18, fontSize: '0.7rem', ml: 0.75 }}
                  />
                </>
              }
              sx={{ textTransform: 'none', fontWeight: 600, minHeight: 48, py: 1 }}
            />
          ))}
        </Tabs>

        {/* Filters and Sort */}
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                label="Status"
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="NEW">New</MenuItem>
                <MenuItem value="PENDING_REVIEW">Pending Review</MenuItem>
                <MenuItem value="OPEN">Open</MenuItem>
                <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
                <MenuItem value="RESOLVED">Resolved</MenuItem>
                <MenuItem value="ACCEPTED">Accepted</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Priority</InputLabel>
              <Select
                value={priorityFilter}
                label="Priority"
                onChange={(e) => setPriorityFilter(e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="CRITICAL">Critical</MenuItem>
                <MenuItem value="HIGH">High</MenuItem>
                <MenuItem value="MEDIUM">Medium</MenuItem>
                <MenuItem value="LOW">Low</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Sort by</InputLabel>
              <Select
                value={sortBy}
                label="Sort by"
                onChange={(e) => setSortBy(e.target.value)}
              >
                <MenuItem value="priority">Priority</MenuItem>
                <MenuItem value="status">Status</MenuItem>
                <MenuItem value="created">Created Date</MenuItem>
              </Select>
            </FormControl>

            <Box sx={{ flex: 1 }} />

            <Button variant="outlined" size="small" disabled>
              + Create Risk
            </Button>
          </Stack>
        </Box>

        {/* Risk List */}
        <Box sx={{ p: 3 }}>
          <Stack spacing={2}>
            {filteredRisks.length === 0 && (
              <Typography color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                No risks match your filters
              </Typography>
            )}

            {filteredRisks.map((risk) => (
              <RiskCard key={risk.id} risk={risk} />
            ))}
          </Stack>
        </Box>
      </Card>
    </Stack>
  );
}

// Risk Card Component
function RiskCard({ risk }: { risk: Risk }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card
      variant="outlined"
      sx={{
        p: 2,
        cursor: 'pointer',
        '&:hover': {
          boxShadow: 2,
        },
      }}
      onClick={() => setExpanded(!expanded)}
    >
      <Stack spacing={1}>
        {/* Header row */}
        <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
          <Chip
            label={risk.priority}
            size="small"
            color={getPriorityColor(risk.priority)}
            sx={{ fontWeight: 600 }}
          />
          <Chip
            label={risk.status.replace('_', ' ')}
            size="small"
            variant="outlined"
            sx={{ fontWeight: 500 }}
          />
          <Chip
            label={getDomainDisplayName(risk.arbDomain)}
            size="small"
            variant="outlined"
          />
          {risk.isAutoGenerated && (
            <Chip
              label="Auto-Generated"
              size="small"
              icon={<span>🤖</span>}
              sx={{ fontSize: '0.75rem' }}
            />
          )}
        </Stack>

        {/* Title */}
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          {risk.title}
        </Typography>

        {/* Metadata */}
        <Stack direction="row" spacing={2} flexWrap="wrap">
          <Typography variant="caption" color="text.secondary">
            {risk.id}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Created {formatRelativeTime(risk.createdDate)}
          </Typography>
          {risk.assignedToName && (
            <Typography variant="caption" color="text.secondary">
              Assigned: {risk.assignedToName}
            </Typography>
          )}
        </Stack>

        {/* Expanded content */}
        {expanded && (
          <>
            <Typography variant="body2" sx={{ mt: 1 }}>
              {risk.description}
            </Typography>

            {/* Action buttons */}
            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
              <Button size="small" variant="outlined" disabled>
                Update Status
              </Button>
              <Button size="small" variant="outlined" disabled>
                Assign
              </Button>
              <Button size="small" variant="outlined" disabled>
                Comment
              </Button>
            </Stack>
          </>
        )}
      </Stack>
    </Card>
  );
}

// Helper functions
function getHealthGrade(score: number): 'A' | 'B' | 'C' | 'D' | 'F' {
  if (score >= 90) return 'A';
  if (score >= 75) return 'B';
  if (score >= 60) return 'C';
  if (score >= 40) return 'D';
  return 'F';
}

function getRiskScoreColor(score: number): string {
  if (score >= 75) return '#4CAF50'; // Green
  if (score >= 60) return '#FF9800'; // Orange
  return '#F44336'; // Red
}

function getRiskScoreStatus(score: number): string {
  if (score >= 75) return 'EXCELLENT';
  if (score >= 60) return 'ELEVATED';
  if (score >= 40) return 'POOR';
  return 'CRITICAL';
}

function getPriorityColor(
  priority: string
): 'error' | 'warning' | 'info' | 'default' {
  switch (priority) {
    case 'CRITICAL':
      return 'error';
    case 'HIGH':
      return 'warning';
    case 'MEDIUM':
      return 'info';
    default:
      return 'default';
  }
}

function getPriorityWeight(priority: string): number {
  switch (priority) {
    case 'CRITICAL':
      return 4;
    case 'HIGH':
      return 3;
    case 'MEDIUM':
      return 2;
    case 'LOW':
      return 1;
    default:
      return 0;
  }
}

function getDomainDisplayName(domain: string): string {
  const names: Record<string, string> = {
    security: 'Security',
    data: 'Data',
    operations: 'Operations',
    enterprise_architecture: 'Enterprise Architecture',
  };
  return names[domain] || domain;
}

function formatRelativeTime(isoDate: string): string {
  const date = new Date(isoDate);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if (diffHours < 1) {
    return 'just now';
  } else if (diffHours < 24) {
    return `${diffHours}h ago`;
  } else if (diffDays === 1) {
    return 'yesterday';
  } else if (diffDays < 7) {
    return `${diffDays}d ago`;
  } else {
    return date.toLocaleDateString();
  }
}
