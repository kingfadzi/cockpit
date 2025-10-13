/**
 * Configuration for ARB Dashboard
 *
 * USE_MOCK_DATA: Toggle between mock data and real API calls
 * - Set VITE_USE_MOCK=1 to use mock data (for development/testing)
 * - Set VITE_USE_MOCK=0 to use real backend API (default)
 * - Aligns with project-wide VITE_USE_MOCK convention from api/client.ts
 */

export const USE_MOCK_DATA = (import.meta.env.VITE_USE_MOCK || '0') === '1';

// Default to real backend API unless explicitly set to mock
console.log(`[ARB Dashboard] Using ${USE_MOCK_DATA ? 'MOCK' : 'REAL'} data`);
