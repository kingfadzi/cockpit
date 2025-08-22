import { Chip } from '@mui/material';

/**
 * Colour-coded badge for app criticality.
 * A -> red (error), B -> orange (warning), C -> blue (info), D -> green (success)
 */
export default function CriticalityBadge({
                                             criticality,
                                         }: {
    criticality: 'A' | 'B' | 'C' | 'D';
}) {
    const colourMap: Record<'A' | 'B' | 'C' | 'D', any> = {
        A: 'error',
        B: 'warning',
        C: 'info',
        D: 'success',
    };

    return (
        <Chip
            size="small"
            label={criticality}
            color={colourMap[criticality]}
            variant="filled"
        />
    );
}
