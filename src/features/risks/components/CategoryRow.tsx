import React from 'react';
import {
    TableRow,
    TableCell,
    IconButton,
    Chip,
    Stack,
    Typography,
    Box,
} from '@mui/material';
import {
    ExpandMore as ExpandMoreIcon,
    ChevronRight as ChevronRightIcon,
    Security as SecurityIcon,
    Lock as ConfidentialityIcon,
    VerifiedUser as IntegrityIcon,
    CloudDone as AvailabilityIcon,
    Autorenew as ResilienceIcon,
} from '@mui/icons-material';
import { RiskCategory } from '../../../api/types';

interface CategoryRowProps {
    category: RiskCategory;
    expanded: boolean;
    onToggle: () => void;
}

const getDomainIcon = (domain: string) => {
    const iconMap: Record<string, React.ReactNode> = {
        'security_rating': <SecurityIcon sx={{ fontSize: 20 }} />,
        'confidentiality_rating': <ConfidentialityIcon sx={{ fontSize: 20 }} />,
        'integrity_rating': <IntegrityIcon sx={{ fontSize: 20 }} />,
        'availability_rating': <AvailabilityIcon sx={{ fontSize: 20 }} />,
        'resilience_rating': <ResilienceIcon sx={{ fontSize: 20 }} />,
    };
    return iconMap[domain] || <SecurityIcon sx={{ fontSize: 20 }} />;
};

const getDomainColor = (domain: string) => {
    const colorMap: Record<string, string> = {
        'security_rating': '#d32f2f',
        'confidentiality_rating': '#7b1fa2',
        'integrity_rating': '#1976d2',
        'availability_rating': '#388e3c',
        'resilience_rating': '#f57c00',
    };
    return colorMap[domain] || '#666';
};

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

export default function CategoryRow({ category, expanded, onToggle }: CategoryRowProps) {
    const domainColor = getDomainColor(category.domain);

    return (
        <TableRow
            sx={{
                bgcolor: expanded ? 'action.hover' : 'inherit',
                '&:hover': {
                    bgcolor: 'action.hover',
                },
                cursor: 'pointer',
            }}
            onClick={onToggle}
        >
            <TableCell sx={{ width: 50, pl: 2 }}>
                <IconButton size="small" onClick={(e) => { e.stopPropagation(); onToggle(); }}>
                    {expanded ? <ExpandMoreIcon /> : <ChevronRightIcon />}
                </IconButton>
            </TableCell>

            <TableCell>
                <Stack direction="row" alignItems="center" spacing={1.5}>
                    <Box sx={{ color: domainColor, display: 'flex', alignItems: 'center' }}>
                        {getDomainIcon(category.domain)}
                    </Box>
                    <Box>
                        <Typography variant="body1" fontWeight={600}>
                            {category.domainTitle}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            {category.domain}
                        </Typography>
                    </Box>
                </Stack>
            </TableCell>

            <TableCell>
                <Stack direction="row" spacing={0.5} alignItems="center">
                    <Chip
                        label={`${category.riskItemCount} items`}
                        size="small"
                        variant="outlined"
                    />
                    {category.criticalCount > 0 && (
                        <Chip
                            label={`${category.criticalCount} critical`}
                            size="small"
                            color="error"
                            sx={{ height: 20, fontSize: '0.7rem' }}
                        />
                    )}
                    {category.highCount > 0 && (
                        <Chip
                            label={`${category.highCount} high`}
                            size="small"
                            color="error"
                            variant="outlined"
                            sx={{ height: 20, fontSize: '0.7rem' }}
                        />
                    )}
                    {category.mediumCount > 0 && (
                        <Chip
                            label={`${category.mediumCount} medium`}
                            size="small"
                            color="warning"
                            variant="outlined"
                            sx={{ height: 20, fontSize: '0.7rem' }}
                        />
                    )}
                </Stack>
            </TableCell>

            <TableCell>
                <Chip
                    label={category.severity.toUpperCase()}
                    color={getSeverityColor(category.severity)}
                    size="small"
                />
            </TableCell>

            <TableCell>
                <Chip
                    label={category.status.replace(/_/g, ' ')}
                    color={getStatusColor(category.status)}
                    size="small"
                    variant="outlined"
                />
            </TableCell>

            <TableCell>
                <Typography variant="body2" color="text.secondary">
                    {category.assignedSme || 'Unassigned'}
                </Typography>
            </TableCell>
        </TableRow>
    );
}
