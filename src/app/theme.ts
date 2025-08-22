import { createTheme } from '@mui/material/styles';
import { alpha } from '@mui/material';

const primary = { main: '#4F46E5' };
const secondary = { main: '#7C3AED' };
const success = { main: '#16A34A' };
const warning = { main: '#D97706' };
const error   = { main: '#DC2626' };
const info    = { main: '#0EA5E9' };

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary, secondary, success, warning, error, info,
    background: { default: '#F7F8FA', paper: '#FFFFFF' },
    divider: alpha('#1F2937', 0.08),
  },
  shape: { borderRadius: 16 },
  typography: {
    fontFamily: [
      '-apple-system','BlinkMacSystemFont','"Segoe UI"','Roboto',
      '"Helvetica Neue"','Arial','"Apple Color Emoji"','"Segoe UI Emoji"'
    ].join(','),
    h5: { fontWeight: 700, letterSpacing: -0.2 },
    h6: { fontWeight: 700 },
    subtitle1: { fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600 }
  },
  components: {
    MuiAppBar: { styleOverrides: { root: { background: primary.main } } },
    MuiDrawer: { styleOverrides: { paper: { borderRight: '1px solid rgba(31,41,55,0.08)', backgroundColor: '#FFFFFF' } } },
    MuiPaper: {
      defaultProps: { elevation: 0, variant: 'outlined' },
      styleOverrides: {
        root: { borderColor: 'rgba(31,41,55,0.08)', boxShadow: '0 1px 2px rgba(16,24,40,0.04), 0 8px 24px rgba(16,24,40,0.06)' },
      },
    },
    MuiCard: {
      defaultProps: { variant: 'outlined' },
      styleOverrides: {
        root: { borderColor: 'rgba(31,41,55,0.08)', boxShadow: '0 1px 2px rgba(16,24,40,0.04), 0 8px 24px rgba(16,24,40,0.06)' },
      },
    },
    MuiButton: { defaultProps: { disableElevation: true, size: 'medium' }, styleOverrides: { root: { borderRadius: 12, paddingInline: 16 } } },
    MuiChip: { styleOverrides: { root: { borderRadius: 10, fontWeight: 600 } } },
    MuiListItemButton: {
      styleOverrides: {
        root: { borderRadius: 10, marginInline: 8, '&.Mui-selected': { backgroundColor: 'rgba(79,70,229,0.12)', '&:hover': { backgroundColor: 'rgba(79,70,229,0.16)' } } },
      },
    },
    MuiTab: { styleOverrides: { root: { fontWeight: 600 } } },
    MuiToolbar: { styleOverrides: { root: { minHeight: 64 } } },
  },
});
