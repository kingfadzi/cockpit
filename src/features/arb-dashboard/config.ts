/**
 * Configuration for ARB Dashboard
 *
 * USE_MOCK_DATA: Toggle between mock data and real API calls
 * - Set to 'true' to use mock data (for development/testing)
 * - Set to 'false' to use real backend API (default)
 * - Can be controlled via environment variable VITE_USE_MOCK_DATA
 */

export const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true';

// Default to real backend API
console.log(`[ARB Dashboard] Using ${USE_MOCK_DATA ? 'MOCK' : 'REAL'} data`);
