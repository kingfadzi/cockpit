import React from 'react';
import {
    TableRow,
    TableCell,
    Chip,
    Typography,
    Stack,
    CircularProgress,
    Box,
} from '@mui/material';
import {
    ChevronRight as ChevronRightIcon,
    Description as EvidenceIcon,
} from '@mui/icons-material';
import { RiskItem } from '../../../api/types';
import { useRiskItems } from '../../../api/hooks';

interface RiskItemsRowsProps {
    categoryId: string;
    onItemClick: (item: RiskItem) => void;
}

const getSeverityColor = (severity: string) => {
    switch (severity?.toLowerCase()) {
        case 'critical':
            return 'error';
        case 'high':
            return 'error';
        case 'medium':
            return 'warning';
        case 'low':
            return 'default';
        default:
            return 'default';
    }
};

const getStatusColor = (status: string) => {
    switch (status) {
        case 'PENDING_SME_REVIEW':
            return 'warning';
        case 'UNDER_REVIEW':
            return 'info';
        case 'SME_APPROVED':
            return 'success';
        case 'SME_REJECTED':
            return 'error';
        default:
            return 'default';
    }
};

export default function RiskItemsRows({ categoryId, onItemClick }: RiskItemsRowsProps) {
    const { data, isLoading, isError } = useRiskItems(categoryId);

    if (isLoading) {
        return (
            <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                    <CircularProgress size={24} />
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Loading risk items...
                    </Typography>
                </TableCell>
            </TableRow>
        );
    }

    if (isError) {
        return (
            <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                    <Typography variant="body2" color="error">
                        Error loading risk items
                    </Typography>
                </TableCell>
            </TableRow>
        );
    }

    if (!data?.items || data.items.length === 0) {
        return (
            <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                    <Typography variant="body2" color="text.secondary">
                        No risk items in this category
                    </Typography>
                </TableCell>
            </TableRow>
        );
    }

    return (
        <>
            {data.items.map((item) => (
                <TableRow
                    key={item.riskItemId}
                    sx={{
                        bgcolor: 'grey.50',
                        '&:hover': {
                            bgcolor: 'action.selected',
                            cursor: 'pointer',
                        },
                    }}
                    onClick={() => onItemClick(item)}
                >
                    <TableCell sx={{ width: 50, pl: 6 }}>
                        <ChevronRightIcon sx={{ color: 'text.secondary', fontSize: 18 }} />
                    </TableCell>

                    <TableCell>
                        <Stack spacing={0.5}>
                            <Typography variant="body2" fontWeight={500}>
                                {item.fieldLabel}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                {item.title}
                            </Typography>
                        </Stack>
                    </TableCell>

                    <TableCell>
                        <Stack direction="row" spacing={0.5} alignItems="center">
                            <EvidenceIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                            <Typography variant="body2" color="text.secondary">
                                {item.evidenceCount} evidence
                            </Typography>
                        </Stack>
                    </TableCell>

                    <TableCell>
                        <Chip
                            label={item.severity.toUpperCase()}
                            color={getSeverityColor(item.severity)}
                            size="small"
                        />
                    </TableCell>

                    <TableCell>
                        <Chip
                            label={item.status.replace(/_/g, ' ')}
                            color={getStatusColor(item.status)}
                            size="small"
                            variant="outlined"
                        />
                    </TableCell>

                    <TableCell>
                        <Typography variant="body2" color="text.secondary" fontSize="0.75rem">
                            {new Date(item.createdAt).toLocaleDateString()}
                        </Typography>
                    </TableCell>
                </TableRow>
            ))}
        </>
    );
}
