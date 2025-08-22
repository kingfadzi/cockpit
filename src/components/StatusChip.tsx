import { Chip } from '@mui/material';

/**
 * Displays a small chip with appropriate colour based on evidence/control status.
 * Supports values: met, missing, expiring, rejected, approved, submitted.
 */
export default function StatusChip({
                                     status,
                                   }: {
  status: string;
}) {
  const color =
      status === 'met' || status === 'approved'
          ? 'success'
          : status === 'missing' || status === 'rejected'
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
