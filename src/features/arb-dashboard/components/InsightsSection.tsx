/**
 * Insights Section Component
 * Displays AI-generated insights based on application data
 * Collapsible section with insight cards
 */

import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  CardContent,
  Chip,
  Stack,
  Button,
  Divider
} from '@mui/material';
import {
  ExpandMore as ExpandIcon,
  Lightbulb as InsightIcon,
  TrendingUp as TrendingIcon,
  CheckCircle as CheckIcon,
} from '@mui/icons-material';
import { Insight, DashboardMetrics, Application, DashboardScope } from '../api/types';

interface InsightsSectionProps {
  insights: Insight[];
  metrics: DashboardMetrics;
  applications: Application[];
  currentScope: DashboardScope;
}

interface InsightCardProps {
  insight: Insight;
  applications: Application[];
}

function InsightCard({ insight, applications }: InsightCardProps) {
  const getPriorityColor = (priority: string): 'error' | 'warning' | 'info' => {
    switch (priority) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      default:
        return 'info';
    }
  };

  const handleViewApps = () => {
    // TODO: Week 3 - Navigate to filtered application list
    console.log('[InsightsSection] View related apps:', insight.relatedApps);
  };

  return (
    <Card
      variant="outlined"
      sx={{
        mb: 2,
        borderLeft: 4,
        borderLeftColor: `${getPriorityColor(insight.priority)}.main`,
        borderRadius: 2,
        '&:hover': {
          boxShadow: 2
        }
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <Box sx={{ flex: 1 }}>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
              <Typography variant="h6" component="span" sx={{ fontSize: '1.5rem' }}>
                {insight.icon}
              </Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {insight.text}
              </Typography>
            </Stack>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              💡 <strong>Recommendation:</strong> {insight.recommendation}
            </Typography>

            <Stack direction="row" spacing={1} alignItems="center">
              <Chip
                label={insight.type.replace('_', ' ').toUpperCase()}
                size="small"
                variant="outlined"
                sx={{ fontSize: '0.7rem' }}
              />
              <Chip
                label={`Priority: ${insight.priority.toUpperCase()}`}
                size="small"
                color={getPriorityColor(insight.priority)}
                sx={{ fontSize: '0.7rem', fontWeight: 600 }}
              />
              {insight.relatedApps && insight.relatedApps.length > 0 && (
                <Button
                  size="small"
                  variant="text"
                  onClick={handleViewApps}
                  sx={{ fontSize: '0.75rem', textTransform: 'none' }}
                >
                  View {insight.relatedApps.length} app{insight.relatedApps.length !== 1 ? 's' : ''}
                </Button>
              )}
            </Stack>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

function PerformanceSnapshot({ metrics }: { metrics: DashboardMetrics }) {
  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Performance Snapshot
      </Typography>
      <Stack spacing={2}>
        <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                bgcolor: 'success.light',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <CheckIcon sx={{ color: 'success.dark' }} />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Resolved in Last 7 Days
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {metrics.recentActivity.resolvedLast7Days} risks
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="caption" color="text.secondary">
                30-day total
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {metrics.recentActivity.resolvedLast30Days}
              </Typography>
            </Box>
          </Stack>
        </Paper>

        <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                bgcolor: 'warning.light',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <TrendingIcon sx={{ color: 'warning.dark' }} />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" color="text.secondary">
                New Risks in Last 7 Days
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {metrics.recentActivity.newRisksLast7Days} risks
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="caption" color="text.secondary">
                30-day total
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {metrics.recentActivity.newRisksLast30Days}
              </Typography>
            </Box>
          </Stack>
        </Paper>

        <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Net Change (7 days)
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: metrics.recentActivity.newRisksLast7Days > metrics.recentActivity.resolvedLast7Days
                ? 'error.main'
                : 'success.main'
            }}
          >
            {metrics.recentActivity.newRisksLast7Days > metrics.recentActivity.resolvedLast7Days ? '+' : ''}
            {metrics.recentActivity.newRisksLast7Days - metrics.recentActivity.resolvedLast7Days} risks
          </Typography>
        </Paper>
      </Stack>
    </Box>
  );
}

export default function InsightsSection({
  insights,
  metrics,
  applications,
  currentScope
}: InsightsSectionProps) {
  const [expanded, setExpanded] = useState(true);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <Accordion expanded={expanded} onChange={handleToggle}>
      <AccordionSummary
        expandIcon={<ExpandIcon />}
        sx={{
          backgroundColor: 'background.paper',
          '& .MuiAccordionSummary-content': {
            alignItems: 'center',
            justifyContent: 'space-between'
          }
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <InsightIcon color="primary" />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Key Insights & Performance
          </Typography>
          <Chip
            label={`${insights.length} insight${insights.length !== 1 ? 's' : ''}`}
            size="small"
            color="primary"
            sx={{ fontWeight: 600 }}
          />
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <Box>
          {/* Insights Cards */}
          {insights.length > 0 ? (
            <Box>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Actionable Insights
              </Typography>
              {insights.map((insight) => (
                <InsightCard
                  key={insight.id}
                  insight={insight}
                  applications={applications}
                />
              ))}
            </Box>
          ) : (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body1" color="text.secondary">
                No insights available at this time
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Insights are generated based on risk patterns and application data
              </Typography>
            </Box>
          )}

          <Divider sx={{ my: 3 }} />

          {/* Performance Snapshot */}
          <PerformanceSnapshot metrics={metrics} />
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}
