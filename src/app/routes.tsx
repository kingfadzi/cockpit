import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppShell } from './AppShell';
import POHome from '../features/po/POHome';
import SMEHome from '../features/sme/SMEHome';
import AppDetail from '../features/po/AppDetail';
import PortfolioEvidence from '../features/evidence/PortfolioEvidence';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <Navigate to="/po" replace /> },
      { path: 'po', element: <POHome /> },
      { path: 'po/evidence', element: <PortfolioEvidence /> },
      { path: 'po/apps/:appId/*', element: <AppDetail /> },
      { path: 'sme', element: <SMEHome /> },
      { path: 'search', element: <div>Search (placeholder)</div> },
    ],
  },
]);
