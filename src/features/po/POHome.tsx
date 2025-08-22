import React from 'react';
import { Grid, Stack, Typography, Tooltip } from '@mui/material';
import SectionHeader from '../../components/SectionHeader';
import Section from '../../components/Section';
import { usePortfolioKpis } from '../../api/hooks';
import { useNavigate } from 'react-router-dom';
import { severityIcon, severityColor, StatusSeverity } from '../../components/shared/status';

interface Tile {
  label: string;
  severity: StatusSeverity;
  count: number;
  tooltip: string;
  to: string;
  subtext: string;
}

function KpiTile({ label, count, severity, tooltip, to, subtext }: Tile) {
  const navigate = useNavigate();
  const Icon = severityIcon[severity];
  const color = severityColor[severity];

  return (
    <Tooltip title={tooltip} arrow>
      <Section>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ cursor: 'pointer' }} onClick={() => navigate(to)}>
          <Icon style={{ width: 24, height: 24, color }} />
          <Stack spacing={0.25}>
            <Typography variant="subtitle1">{label}</Typography>
            <Typography variant="caption" color="text.secondary">{subtext}</Typography>
          </Stack>
          <Typography variant="h5" sx={{ marginLeft: 'auto' }}>{count}</Typography>
        </Stack>
      </Section>
    </Tooltip>
  );
}

export default function POHome() {
  const { data: kpis } = usePortfolioKpis();

  const tiles: Tile[] = [
    { label: 'Compliant', severity: 'success', count: kpis?.compliant ?? 0, tooltip: 'Approved evidence and passing controls', to: '/po/evidence?status=approved', subtext: 'Review latest approvals' },
    { label: 'Missing Evidence', severity: 'error', count: kpis?.missingEvidence ?? 0, tooltip: 'Controls missing required evidence', to: '/po/evidence?status=missing', subtext: 'Click to upload' },
    { label: 'Pending Review', severity: 'warning', count: kpis?.pendingReview ?? 0, tooltip: 'Evidence awaiting SME review', to: '/po/evidence?status=submitted', subtext: 'See what’s waiting' },
    { label: 'Risk Blocked', severity: 'info', count: kpis?.riskBlocked ?? 0, tooltip: 'Controls blocked by risk/exception', to: '/po/evidence?status=rejected', subtext: 'Resolve before release' },
  ];

  return (
    <Stack spacing={3}>
      <SectionHeader title="Product Owner – Portfolio" subtitle="Overview of your governed applications" />

      <Grid container spacing={2}>
        {tiles.map((t) => (
          <Grid key={t.label} item xs={12} sm={6} md={3}>
            <KpiTile {...t} />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
