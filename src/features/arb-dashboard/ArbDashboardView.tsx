/**
 * ARB Dashboard View - Main Container
 * Phase 1: Mock Data & UI/UX
 */

import React, { useState, useEffect } from 'react';
import {
  Stack,
  Box,
  CircularProgress,
  Alert,
  Card,
  Tabs,
  Tab,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from '@mui/material';
import {
  PersonOutline as MyQueueIcon,
  Domain as MyDomainIcon,
  Public as AllDomainsIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { DashboardScope, ArbDashboardResponse } from './api/types';
import { USE_MOCK_DATA } from './config';
import { getMockArbDashboard, currentMockUser } from './mocks/mockArbData';
import { fetchArbDashboard, createRiskItem } from './api/arbDashboardApi';
import HeadsUpDisplay from './components/HeadsUpDisplay';
import ApplicationWatchlist from './components/ApplicationWatchlist';

interface ArbDashboardViewProps {
  arbDomain?: string; // For compatibility with old routing
  domainDisplayName?: string; // Display name for the domain (e.g., "Security", "Data")
}

export default function ArbDashboardView({ arbDomain, domainDisplayName = 'My Domain' }: ArbDashboardViewProps) {
  const [currentScope, setCurrentScope] = useState<DashboardScope>('my-queue');
  const [dashboardData, setDashboardData] = useState<ArbDashboardResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Create Risk Dialog state
  const [createRiskDialogOpen, setCreateRiskDialogOpen] = useState(false);
  const [newRisk, setNewRisk] = useState({
    title: '',
    description: '',
    severity: 'medium' as 'low' | 'medium' | 'high' | 'critical',
    fieldKey: '',
  });

  // Load dashboard data
  useEffect(() => {
    loadDashboardData();
  }, [currentScope]);

  const loadDashboardData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (USE_MOCK_DATA) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        const data = getMockArbDashboard(
          currentScope,
          currentMockUser.id,
          currentMockUser.arbDomain
        );

        setDashboardData(data);
      } else {
        // Real API call
        if (!arbDomain) {
          throw new Error('ARB domain is required');
        }

        // Get current user ID - in production, this would come from auth context
        const userId = currentMockUser.id; // TODO: Replace with real user ID from auth

        const data = await fetchArbDashboard(arbDomain, currentScope, userId);
        setDashboardData(data);
      }
    } catch (err) {
      console.error('[ARB Dashboard] Error loading data:', err);
      setError(err instanceof Error ? err.message : 'Failed to load dashboard data');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle scope change
  const handleScopeChange = (_event: React.SyntheticEvent, newValue: number) => {
    const scopes: DashboardScope[] = ['my-queue', 'my-domain', 'all-domains'];
    setCurrentScope(scopes[newValue]);
  };

  const getCurrentTabIndex = (): number => {
    switch (currentScope) {
      case 'my-queue': return 0;
      case 'my-domain': return 1;
      case 'all-domains': return 2;
      default: return 0;
    }
  };

  // Handle create risk
  const handleCreateRisk = async () => {
    if (!newRisk.title || !newRisk.description || !newRisk.fieldKey) {
      return;
    }

    try {
      if (USE_MOCK_DATA) {
        console.log('[ARB Dashboard] Creating risk (mock):', newRisk);
      } else {
        // Real API call
        const payload = {
          title: newRisk.title,
          description: newRisk.description,
          priority: newRisk.severity.toUpperCase() as 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL',
          fieldKey: newRisk.fieldKey,
          createdBy: currentMockUser.id // TODO: Replace with real user ID from auth
        };

        await createRiskItem(payload);
        console.log('[ARB Dashboard] Risk created successfully');
      }

      // Reload dashboard data to reflect new risk
      await loadDashboardData();
    } catch (err) {
      console.error('[ARB Dashboard] Error creating risk:', err);
      setError(err instanceof Error ? err.message : 'Failed to create risk');
    } finally {
      // Reset form and close dialog
      setNewRisk({
        title: '',
        description: '',
        severity: 'medium',
        fieldKey: '',
      });
      setCreateRiskDialogOpen(false);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress />
      </Box>
    );
  }

  // Error state
  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 3 }}>
        {error}
      </Alert>
    );
  }

  // No data state
  if (!dashboardData) {
    return (
      <Alert severity="info" sx={{ mb: 3 }}>
        No dashboard data available
      </Alert>
    );
  }

  const applicationCounts = {
    myQueue: dashboardData.applications.filter(app => app.hasAssignedRisks).length,
    myDomain: dashboardData.applications.length,
    allDomains: dashboardData.applications.length // TODO: Get real all domains count
  };

  return (
    <Card variant="outlined" sx={{ borderRadius: 3 }}>
      {/* Scoping Tabs */}
      <Tabs
        value={getCurrentTabIndex()}
        onChange={handleScopeChange}
        aria-label="dashboard scope tabs"
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          px: 2,
          minHeight: 48
        }}
      >
        <Tab
          icon={<MyQueueIcon fontSize="small" />}
          iconPosition="start"
          label={
            <>
              My Queue{' '}
              <Chip
                label={applicationCounts.myQueue}
                size="small"
                color={currentScope === 'my-queue' ? 'primary' : 'default'}
                sx={{ height: 18, fontSize: '0.7rem', ml: 0.75 }}
              />
            </>
          }
          sx={{ textTransform: 'none', fontWeight: 600, minHeight: 48, py: 1 }}
        />
        <Tab
          icon={<MyDomainIcon fontSize="small" />}
          iconPosition="start"
          label={
            <>
              {domainDisplayName} Domain{' '}
              <Chip
                label={applicationCounts.myDomain}
                size="small"
                color={currentScope === 'my-domain' ? 'primary' : 'default'}
                sx={{ height: 18, fontSize: '0.7rem', ml: 0.75 }}
              />
            </>
          }
          sx={{ textTransform: 'none', fontWeight: 600, minHeight: 48, py: 1 }}
        />
        <Tab
          icon={<AllDomainsIcon fontSize="small" />}
          iconPosition="start"
          label={
            <>
              All Domains{' '}
              <Chip
                label={applicationCounts.allDomains}
                size="small"
                color={currentScope === 'all-domains' ? 'primary' : 'default'}
                sx={{ height: 18, fontSize: '0.7rem', ml: 0.75 }}
              />
            </>
          }
          sx={{ textTransform: 'none', fontWeight: 600, minHeight: 48, py: 1 }}
        />
      </Tabs>

      {/* Tab Content */}
      <Box sx={{ p: 3 }}>
        <Stack spacing={3}>
          {/* Heads-Up Display (HUD) */}
          <HeadsUpDisplay
            metrics={dashboardData.metrics}
            currentScope={currentScope}
          />

          {/* Application Watchlist */}
          <ApplicationWatchlist
            applications={dashboardData.applications}
            currentScope={currentScope}
            domainDisplayName={domainDisplayName}
            arbName={arbDomain}
            headerAction={
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setCreateRiskDialogOpen(true)}
              >
                Create Risk
              </Button>
            }
          />
        </Stack>
      </Box>

      {/* Create Risk Dialog */}
      <Dialog
        open={createRiskDialogOpen}
        onClose={() => setCreateRiskDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Create New Risk Item</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Risk Title"
              fullWidth
              value={newRisk.title}
              onChange={(e) => setNewRisk({ ...newRisk, title: e.target.value })}
              placeholder="Brief title for the risk"
            />
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={4}
              value={newRisk.description}
              onChange={(e) => setNewRisk({ ...newRisk, description: e.target.value })}
              placeholder="Detailed description of the risk"
            />
            <FormControl fullWidth>
              <InputLabel>Severity</InputLabel>
              <Select
                value={newRisk.severity}
                label="Severity"
                onChange={(e) => setNewRisk({ ...newRisk, severity: e.target.value as any })}
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
                <MenuItem value="critical">Critical</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Field Key"
              fullWidth
              value={newRisk.fieldKey}
              onChange={(e) => setNewRisk({ ...newRisk, fieldKey: e.target.value })}
              placeholder="e.g., security.encryption.data_at_rest"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setCreateRiskDialogOpen(false);
              setNewRisk({
                title: '',
                description: '',
                severity: 'medium',
                fieldKey: '',
              });
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleCreateRisk}
            disabled={!newRisk.title || !newRisk.description || !newRisk.fieldKey}
          >
            Create Risk
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
