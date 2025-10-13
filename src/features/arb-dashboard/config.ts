/**
 * Configuration for ARB Dashboard
 *
 * USE_MOCK_DATA: Toggle between mock data and real API calls
 * - Set to 'true' in development to use mock data
 * - Set to 'false' in production or when backend is ready
 * - Can be controlled via environment variable VITE_USE_MOCK_DATA
 */

export const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true' ||
                             import.meta.env.VITE_USE_MOCK_DATA === undefined;

// Default to mock data if environment variable is not set
console.log(`[ARB Dashboard] Using ${USE_MOCK_DATA ? 'MOCK' : 'REAL'} data`);
