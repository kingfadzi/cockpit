import { Chip } from '@mui/material';

export default function StatusChip({ status }: { status: 'met'|'missing'|'expiring'|'rejected'|'approved'|'submitted'|string }) {
  const color: any =
    status === 'met' || status === 'approved' ? 'success' :
    status === 'missing' || status === 'rejected' ? 'error' :
    status === 'expiring' || status === 'submitted' ? 'warning' : 'default';
  return <Chip size="small" label={status} color={color} variant="outlined" />;
}
