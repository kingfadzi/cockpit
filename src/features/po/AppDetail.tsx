import React from 'react';
import { Tabs, Tab, Box, Typography, Stack } from '@mui/material';
import { useParams, Link, Routes, Route, Navigate } from 'react-router-dom';
import SectionHeader from '../../components/SectionHeader';
import { useApp } from '../../api/hooks';
import EvidenceTable from '../evidence/EvidenceTable';
import ComplianceMatrix from '../compliance/ComplianceMatrix';
import ProfileView from '../profile/ProfileView';
import ReleasesTab from '../releases/ReleasesTab';

function TabLink({ to, label }: { to: string; label: string }) {
  return <Tab label={label} component={Link} to={to} value={to} wrapped />;
}

export default function AppDetail() {
  const { appId = '' } = useParams();
  const { data: app } = useApp(appId);
  const tabs = ['overview', 'profile', 'evidence', 'releases', 'compliance', 'links'];

  return (
    <Stack spacing={3}>
      <SectionHeader title={app?.name || appId} subtitle={`App ID: ${appId}`} />
      <Tabs value={false} variant="scrollable" scrollButtons allowScrollButtonsMobile>
        {tabs.map((t) => (<TabLink key={t} to={t} label={t[0].toUpperCase() + t.slice(1)} />))}
      </Tabs>

      <Box>
        <Routes>
          <Route index element={<Navigate to="overview" replace />} />
          <Route path="overview" element={<Typography>Overview (placeholder)</Typography>} />
          <Route path="profile" element={<ProfileView appId={appId} />} />
          <Route path="evidence" element={<EvidenceTable appId={appId} />} />
          <Route path="releases" element={<ReleasesTab appId={appId} />} />
          <Route path="compliance" element={<ComplianceMatrix appId={appId} />} />
          <Route path="links" element={<Typography>Links (placeholder)</Typography>} />
        </Routes>
      </Box>
    </Stack>
  );
}
