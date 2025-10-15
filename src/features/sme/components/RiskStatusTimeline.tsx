import React from 'react';
import {
    Box,
    Stack,
    Typography,
    Chip,
    CircularProgress,
    Alert,
    Paper,
} from '@mui/material';
import {
    Circle as CircleIcon,
    Person as PersonIcon,
    CalendarToday as CalendarIcon,
} from '@mui/icons-material';
import type { RiskStatusHistoryEntry, RiskItemStatus } from '../../../api/types';
import { useRiskStatusHistory } from '../../../api/hooks';
import { getStatusLabel, getStatusMuiColor } from '../config/riskStatusConfig';

interface RiskStatusTimelineProps {
    riskId: string;
}

export default function RiskStatusTimeline({ riskId }: RiskStatusTimelineProps) {
    const { data: historyData, isLoading, error } = useRiskStatusHistory(riskId);

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress size={32} />
            </Box>
        );
    }

    if (error) {
        return (
            <Alert severity="error" sx={{ my: 2 }}>
                Failed to load status history: {String(error)}
            </Alert>
        );
    }

    if (!historyData || !historyData.history || historyData.history.length === 0) {
        return (
            <Alert severity="info" sx={{ my: 2 }}>
                No status changes recorded yet
            </Alert>
        );
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatAction = (action?: string): string => {
        if (!action) return '';

        const actionMap: Record<string, string> = {
            'create': 'Created',
            'assign': 'Assigned',
            'approve': 'Approved',
            'reject': 'Rejected',
            'escalate': 'Escalated',
            'approve_remediation': 'Remediation Approved',
            'reject_remediation': 'Remediation Rejected',
            'resolve_escalation': 'Escalation Resolved',
            'self_attest': 'Self-Attested',
            'close': 'Closed'
        };

        return actionMap[action] || action.replace(/_/g, ' ');
    };

    return (
        <Box sx={{ py: 1 }}>
            <Typography variant="subtitle1" sx={{ mb: 1.5, fontWeight: 600 }}>
                Status History
            </Typography>

            <Stack spacing={0}>
                {historyData.history.map((entry, index) => {
                    const isFirst = index === 0;
                    const isLast = index === historyData.history.length - 1;

                    return (
                        <Box key={entry.historyId} sx={{ position: 'relative', pl: 3, pb: 1.5 }}>
                            {/* Timeline line */}
                            {!isLast && (
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        left: '9px',
                                        top: '24px',
                                        bottom: 0,
                                        width: '2px',
                                        bgcolor: 'divider'
                                    }}
                                />
                            )}

                            {/* Timeline dot */}
                            <CircleIcon
                                sx={{
                                    position: 'absolute',
                                    left: 0,
                                    top: '6px',
                                    fontSize: 20,
                                    color: getStatusMuiColor(entry.toStatus as RiskItemStatus) + '.main'
                                }}
                            />

                            {/* Content */}
                            <Paper
                                variant="outlined"
                                sx={{
                                    p: 1.25,
                                    borderRadius: 1,
                                    ...(isFirst && {
                                        borderColor: getStatusMuiColor(entry.toStatus as RiskItemStatus) + '.main',
                                        borderWidth: 2
                                    })
                                }}
                            >
                                <Stack spacing={0.75}>
                                    {/* Status transition */}
                                    <Stack direction="row" spacing={0.75} alignItems="center" flexWrap="wrap">
                                        {entry.fromStatus && (
                                            <>
                                                <Chip
                                                    size="small"
                                                    label={getStatusLabel(entry.fromStatus as RiskItemStatus)}
                                                    color={getStatusMuiColor(entry.fromStatus as RiskItemStatus)}
                                                    variant="outlined"
                                                    sx={{ height: 22, fontSize: '0.7rem' }}
                                                />
                                                <Typography variant="caption" color="text.secondary">→</Typography>
                                            </>
                                        )}
                                        <Chip
                                            size="small"
                                            label={getStatusLabel(entry.toStatus as RiskItemStatus)}
                                            color={getStatusMuiColor(entry.toStatus as RiskItemStatus)}
                                            variant="filled"
                                            sx={{ height: 22, fontSize: '0.7rem' }}
                                        />
                                        {entry.actionTaken && (
                                            <Chip
                                                size="small"
                                                label={formatAction(entry.actionTaken)}
                                                variant="outlined"
                                                sx={{ height: 22, fontSize: '0.65rem' }}
                                            />
                                        )}
                                    </Stack>

                                    {/* Change reason */}
                                    {entry.changeReason && (
                                        <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.4 }}>
                                            {entry.changeReason}
                                        </Typography>
                                    )}

                                    {/* Comments */}
                                    {entry.comments && (
                                        <Box
                                            sx={{
                                                p: 1,
                                                bgcolor: 'grey.50',
                                                borderRadius: 0.5,
                                                borderLeft: '2px solid',
                                                borderColor: 'primary.main'
                                            }}
                                        >
                                            <Typography variant="caption" sx={{ fontStyle: 'italic', lineHeight: 1.4 }}>
                                                "{entry.comments}"
                                            </Typography>
                                        </Box>
                                    )}

                                    {/* Metadata */}
                                    <Stack direction="row" spacing={1.5} flexWrap="wrap">
                                        <Stack direction="row" spacing={0.4} alignItems="center">
                                            <PersonIcon fontSize="small" sx={{ color: 'text.secondary', fontSize: 14 }} />
                                            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                                                {entry.changedByName || entry.changedBy}
                                            </Typography>
                                        </Stack>
                                        <Stack direction="row" spacing={0.4} alignItems="center">
                                            <CalendarIcon fontSize="small" sx={{ color: 'text.secondary', fontSize: 14 }} />
                                            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                                                {formatDate(entry.timestamp)}
                                            </Typography>
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </Paper>
                        </Box>
                    );
                })}
            </Stack>
        </Box>
    );
}
