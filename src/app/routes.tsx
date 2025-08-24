// src/app/router.tsx (or wherever this file lives)
import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppShell } from './AppShell';
import POHome from '../features/po/POHome';
import SMEHome from '../features/sme/SMEHome';
import PortfolioEvidence from '../features/evidence/PortfolioEvidence';

// ✅ import the single page that owns tabs and fetches /api/apps/:appId/profile
import AppProfilePage from '../features/profile/AppProfilePage';

import POProfilePage from '../features/profile/POProfilePage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <Navigate to="/po" replace /> },
      { path: 'po', element: <POHome /> },
      { path: 'po/evidence', element: <PortfolioEvidence /> },

      // ⬇️ simplified: one page, no nested routes
      { path: 'po/apps/:appId', element: <POProfilePage /> },

      { path: 'sme', element: <SMEHome /> },
      { path: 'search', element: <div>Search (placeholder)</div> },
    ],
  },
]);
