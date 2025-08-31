import React from 'react';
import { Stack, Typography, Card, CardContent, Button, Grid, Box } from '@mui/material';
import {
  Security as SecurityIcon,
  Storage as DataIcon,
  Transform as ServiceIcon,
  AccountTree as EnterpriseIcon
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
      path: '/sme/security'
    },
    {
      key: 'data-architecture', 
      title: 'Data Architecture SME',
      description: 'Review data validation, residency, retention, and privacy controls',
      icon: <DataIcon sx={{ fontSize: 40 }} />,
      color: 'info.main',
      path: '/sme/data-architecture'
    },
    {
      key: 'service-transition',
      title: 'Service Transition SME', 
      description: 'Review availability, monitoring, DR testing, and operational readiness',
      icon: <ServiceIcon sx={{ fontSize: 40 }} />,
      color: 'success.main',
      path: '/sme/service-transition'
    },
    {
      key: 'enterprise-architecture',
      title: 'Enterprise Architecture SME',
      description: 'Review architecture vision, service vision, and governance artifacts',
      icon: <EnterpriseIcon sx={{ fontSize: 40 }} />,
      color: 'warning.main', 
      path: '/sme/enterprise-architecture'
    }
  ];

  return (
    <Stack spacing={3}>
      <SectionHeader 
        title="SME Dashboard" 
        subtitle="Select your domain to review evidence and manage compliance" 
      />
      
      <Grid container spacing={3}>
        {domains.map((domain) => (
          <Grid item xs={12} md={6} key={domain.key}>
            <Card 
              sx={{ 
                height: '100%',
                cursor: 'pointer',
                transition: 'all 0.2s',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 3
                }
              }}
              onClick={() => navigate(domain.path)}
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
                    disabled={domain.key !== 'security'}
                  >
                    {domain.key === 'security' ? 'Enter Dashboard' : 'Coming Soon'}
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
