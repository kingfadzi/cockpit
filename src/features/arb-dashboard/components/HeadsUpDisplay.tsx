/**
 * Heads-Up Display (HUD) Component
 * Ultra-compact ribbon with numbers in colored circles
 */

import React from 'react';
import { Box, Paper, Typography, Chip, Stack, Divider } from '@mui/material';
import { DashboardMetrics, DashboardScope } from '../api/types';

interface HeadsUpDisplayProps {
  metrics: DashboardMetrics;
  currentScope: DashboardScope;
}

interface RibbonMetricProps {
  label: string;
  value: string | number;
  color: 'error' | 'warning' | 'info' | 'success' | 'primary';
  customColor?: string; // Custom hex color that overrides theme color
  badge?: {
    label: string;
    color: 'error' | 'warning' | 'info' | 'success';
  };
  highlight?: boolean;
}

function RibbonMetric({ label, value, color, customColor, badge, highlight }: RibbonMetricProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.25,
        px: 2,
        py: 1,
        ...(highlight && !customColor && {
          bgcolor: `${color}.lighter`,
        })
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 36,
          height: 36,
          borderRadius: '50%',
          bgcolor: customColor || `${color}.main`,
          color: 'white',
          flexShrink: 0,
          fontWeight: 700,
          fontSize: '0.9rem'
        }}
      >
        {value}
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
        <Typography
          variant="body2"
          color="text.primary"
          sx={{ fontWeight: 600, fontSize: '0.875rem', whiteSpace: 'nowrap' }}
        >
          {label}
        </Typography>
        {badge && (
          <Chip
            label={badge.label}
            color={badge.color}
            size="small"
            sx={{ height: 18, fontSize: '0.65rem', fontWeight: 600, '& .MuiChip-label': { px: 0.75 } }}
          />
        )}
      </Box>
    </Box>
  );
}

export default function HeadsUpDisplay({ metrics, currentScope }: HeadsUpDisplayProps) {
  const getHealthColor = (grade: string): 'error' | 'warning' | 'success' => {
    if (grade === 'F' || grade === 'D') return 'error';
    if (grade === 'C' || grade === 'B') return 'warning';
    return 'success';
  };

  const healthColor = getHealthColor(metrics.healthGrade);
  const netChange = metrics.recentActivity.newRisksLast7Days - metrics.recentActivity.resolvedLast7Days;
  const isPositiveTrend = netChange <= 0;

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Overview Metrics
      </Typography>
      <Paper
        elevation={0}
        sx={{
          border: 1,
          borderColor: 'divider',
          borderRadius: 2,
          overflow: 'hidden',
          bgcolor: 'background.paper'
        }}
      >
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          sx={{
            flexWrap: 'wrap',
            '& > *': {
              flex: { xs: '1 1 auto', md: 1 }
            }
          }}
        >
          <RibbonMetric
            label="Critical"
            value={metrics.criticalCount}
            color="error"
            highlight={metrics.criticalCount > 0}
            badge={metrics.criticalCount > 0 ? { label: 'Urgent', color: 'error' } : undefined}
          />

          <RibbonMetric
            label="In Progress"
            value={metrics.openItemsCount}
            color="warning"
            customColor="#5c6bc0"
          />

          <RibbonMetric
            label="Awaiting Triage"
            value={metrics.pendingReviewCount}
            color="info"
            customColor="#26a69a"
          />

          <RibbonMetric
            label="Risk Score"
            value={metrics.averageRiskScore}
            color={healthColor}
            badge={{ label: `Grade ${metrics.healthGrade}`, color: healthColor }}
          />

          <RibbonMetric
            label={`Net Change (7d)`}
            value={`${netChange > 0 ? '+' : ''}${netChange}`}
            color={isPositiveTrend ? 'success' : 'warning'}
            badge={{ label: `${metrics.recentActivity.newRisksLast7Days}↑ ${metrics.recentActivity.resolvedLast7Days}↓`, color: 'default' }}
          />
        </Stack>
      </Paper>
    </Box>
  );
}
