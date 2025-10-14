import React from 'react';
import { Stack, Typography, Card, CardContent, Button, Grid, Box } from '@mui/material';
import {
  Security as SecurityIcon,
  Storage as DataIcon,
  Settings as OperationsIcon,
  AccountTree as EnterpriseIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import SectionHeader from '../../components/SectionHeader';

export default function SMEHome() {
  const navigate = useNavigate();

  const domains = [
    {
      key: 'security',
      title: 'Security SME',
      description: 'Review security controls, encryption, testing, and access management',
      icon: <SecurityIcon sx={{ fontSize: 40 }} />,
      color: 'error.main',
      path: '/sme/security',
      enabled: true
    },
    {
      key: 'data',
      title: 'Data SME',
      description: 'Review data validation, residency, retention, and privacy controls',
      icon: <DataIcon sx={{ fontSize: 40 }} />,
      color: 'info.main',
      path: '/sme/data',
      enabled: false
    },
    {
      key: 'operations',
      title: 'Operations SME',
      description: 'Review availability, monitoring, DR testing, and operational readiness',
      icon: <OperationsIcon sx={{ fontSize: 40 }} />,
      color: 'success.main',
      path: '/sme/operations',
      enabled: false
    },
    {
      key: 'enterprise_architecture',
      title: 'Enterprise Architecture SME',
      description: 'Review architecture vision, service vision, and governance artifacts',
      icon: <EnterpriseIcon sx={{ fontSize: 40 }} />,
      color: 'warning.main',
      path: '/sme/enterprise-architecture',
      enabled: false
    }
  ];

  return (
    <Stack spacing={4}>
      <SectionHeader
        title="SME Review Dashboards"
        subtitle="Select your domain to review evidence and manage compliance"
      />

      <Grid container spacing={3}>
        {domains.map((domain) => (
          <Grid item xs={12} md={6} key={domain.key}>
            <Card
              sx={{
                height: '100%',
                cursor: domain.enabled ? 'pointer' : 'default',
                opacity: domain.enabled ? 1 : 0.6,
                transition: 'all 0.2s',
                '&:hover': domain.enabled ? {
                  transform: 'translateY(-2px)',
                  boxShadow: 3
                } : {}
              }}
              onClick={() => domain.enabled && navigate(domain.path)}
            >
              <CardContent sx={{ p: 3, height: '100%' }}>
                <Stack spacing={2} height="100%">
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ color: domain.color }}>
                      {domain.icon}
                    </Box>
                    <Typography variant="h6" fontWeight={600}>
                      {domain.title}
                    </Typography>
                  </Box>

                  <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
                    {domain.description}
                  </Typography>

                  <Button
                    variant="outlined"
                    size="small"
                    sx={{ alignSelf: 'flex-start' }}
                    disabled={!domain.enabled}
                  >
                    {domain.enabled ? 'Enter Dashboard' : 'Coming Soon'}
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
