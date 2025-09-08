import { Chip } from '@mui/material';

/**
 * Displays a small chip with appropriate colour based on evidence/control status.
 * Supports values: met, missing, expiring, rejected, approved, submitted, current, expired, broken, invalid_evidence.
 */
export default function StatusChip({
                                     status,
                                   }: {
  status: string;
}) {
  const color =
      status === 'met' || status === 'approved' || status === 'current'
          ? 'success'
          : status === 'missing' || status === 'rejected' || status === 'expired' || status === 'broken' || status === 'invalid_evidence'
              ? 'error'
              : status === 'expiring' || status === 'submitted'
                  ? 'warning'
                  : 'default';
  return (
      <Chip
          size="small"
          label={status}
          color={color}
          variant="outlined"
      />
  );
}
