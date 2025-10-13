// src/app/router.tsx (or wherever this file lives)
import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppShell } from './AppShell';
import POHome from '../features/po/POHome';
import KpiDetailPage from '../features/po/KpiDetailPage';
import SMEHome from '../features/sme/SMEHome';
import PortfolioEvidence from '../features/evidence/PortfolioEvidence';

// ✅ import the single page that owns tabs and fetches /api/apps/:appId/profile
import AppProfilePage from '../features/profile/AppProfilePage';

import POProfilePage from '../features/profile/POProfilePage';
import SecuritySmeView from '../features/sme/views/SecuritySmeView';
import PendingReviewPage from '../features/profile/components/PendingReviewPage';
import ArbHome from '../features/sme/ArbHome';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <Navigate to="/po" replace /> },
      { path: 'po', element: <POHome /> },
      { path: 'po/evidence', element: <PortfolioEvidence /> },
      { path: 'po/kpis/:kpiType', element: <KpiDetailPage /> },

      // ⬇️ simplified: one page, no nested routes
      { path: 'po/apps/:appId', element: <POProfilePage /> },
      
      // KPI drill-down pages
      { path: 'po/apps/:appId/pending-review', element: <PendingReviewPage /> },

      { path: 'sme', element: <SMEHome /> },
      { path: 'sme/security', element: <SecuritySmeView /> },
      { path: 'sme/data-architecture', element: <div>Data Architecture SME View (Coming Soon)</div> },
      { path: 'sme/service-transition', element: <div>Service Transition SME View (Coming Soon)</div> },
      { path: 'sme/enterprise-architecture', element: <div>Enterprise Architecture SME View (Coming Soon)</div> },

      // ARB Dashboard routes - single dynamic route
      { path: 'sme/arb/:arbName', element: <ArbHome /> },

      { path: 'search', element: <div>Search (placeholder)</div> },
    ],
  },
]);
