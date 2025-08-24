import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import {
    Alert,
    Box,
    Chip,
    Divider,
    LinearProgress,
    Paper,
    Stack,
    Typography,
    Button,
    Tooltip,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    CircularProgress,
} from '@mui/material';
import {
    Security as SecurityIcon,
    GppGood as IntegrityIcon,
    AvTimer as AvailabilityIcon,
    Bolt as ResilienceIcon,
    Summarize as SummaryIcon,
    FactCheck as FactCheckIcon,
    ReportProblem as RiskIcon,
} from '@mui/icons-material';
import { useProfile } from '../../api/hooks';
import type { ProfileDomain, ProfileField } from '../../api/types';

const ICON_MAP: Record<string, React.ReactElement> = {
    SecurityIcon: <SecurityIcon fontSize="small" />,
    IntegrityIcon: <IntegrityIcon fontSize="small" />,
    AvailabilityIcon: <AvailabilityIcon fontSize="small" />,
    ResilienceIcon: <ResilienceIcon fontSize="small" />,
    SummaryIcon: <SummaryIcon fontSize="small" />,
};

const fmtDate = (iso?: string | null) => (iso ? new Date(iso).toLocaleDateString() : '—');

interface DomainTableProps {
    domain: ProfileDomain;
}

function DomainTable({ domain }: DomainTableProps) {
    const { title, icon, driverLabel, driverValue, fields } = domain;

    const coverage = useMemo(() => {
        let cur = 0, exp = 0, expd = 0, miss = 0;
        fields.forEach((field) => {
            if (field.assurance === 'Current') cur++;
            else if (field.assurance === 'Expiring') exp++;
            else if (field.assurance === 'Expired') expd++;
            else miss++;
        });
        const total = fields.length || 1;
        const readiness = Math.round((cur / total) * 100);
        return { Current: cur, Expiring: exp, Expired: expd, Missing: miss, readiness };
    }, [fields]);

    return (
        <Paper variant="outlined" sx={{ p: 2, borderRadius: 3 }}>
            <Stack spacing={1.25}>
                {/* Header */}
                <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
                    <Stack direction="row" spacing={1} alignItems="center">
                        {ICON_MAP[icon] || <SummaryIcon fontSize="small" />}
                        <Typography variant="subtitle1" fontWeight={700}>{title}</Typography>
                        {driverValue && <Chip size="small" label={`${driverLabel}: ${driverValue}`} />}
                    </Stack>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Tooltip title="Current coverage across this domain">
                            <FactCheckIcon fontSize="small" />
                        </Tooltip>
                        <Typography variant="caption" color="text.secondary">
                            Current {coverage.Current} • Expiring {coverage.Expiring} • Expired {coverage.Expired} • Missing {coverage.Missing}
                        </Typography>
                    </Stack>
                </Stack>
                <Stack direction="row" spacing={2} alignItems="center">
                    <Typography variant="caption" color="text.secondary">Coverage</Typography>
                    <Box sx={{ flex: 1 }}>
                        <LinearProgress variant="determinate" value={coverage.readiness} sx={{ height: 8, borderRadius: 4 }} />
                    </Box>
                    <Typography variant="caption" fontWeight={700}>{coverage.readiness}%</Typography>
                </Stack>

                <Divider />

                {/* Table */}
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Property</TableCell>
                            <TableCell>Requirement</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Valid until</TableCell>
                            <TableCell>Assurance</TableCell>
                            <TableCell>Risks</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {fields.map((field) => (
                            <FieldRow key={field.fieldKey} field={field} />
                        ))}
                    </TableBody>
                </Table>
            </Stack>
        </Paper>
    );
}

interface FieldRowProps {
    field: ProfileField;
}

function FieldRow({ field }: FieldRowProps) {
    const { label, policyRequirement, evidence, assurance, risks } = field;
    const activeEvidence = evidence.find((e) => e.status === 'active');

    return (
        <TableRow hover>
            <TableCell>
                <Typography variant="body2" fontWeight={600}>{label}</Typography>
            </TableCell>
            <TableCell>{String(policyRequirement)}</TableCell>
            <TableCell>
                {activeEvidence ? (
                    <Chip size="small" color="success" variant="outlined" label="Approved" />
                ) : evidence.length > 0 ? (
                    <Chip size="small" color="default" variant="outlined" label="No active" />
                ) : (
                    <Chip size="small" color="error" variant="outlined" label="No evidence" />
                )}
            </TableCell>
            <TableCell>{activeEvidence ? fmtDate(activeEvidence.validUntil) : '—'}</TableCell>
            <TableCell>
                <Chip
                    size="small"
                    color={assurance === 'Current' ? 'success' : assurance === 'Expiring' ? 'warning' : 'error'}
                    variant="outlined"
                    label={assurance}
                />
            </TableCell>
            <TableCell>
                {risks.length ? (
                    <Button
                        size="small"
                        color="error"
                        variant="text"
                        startIcon={<RiskIcon fontSize="small" />}
                        onClick={() => console.log('open-risk-stories', field.fieldKey)}
                    >
                        {risks.length}
                    </Button>
                ) : (
                    <Typography variant="caption" color="text.secondary">—</Typography>
                )}
            </TableCell>
            <TableCell align="right">
                {activeEvidence ? (
                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                        <Button size="small" variant="text">Replace</Button>
                        <Button size="small" variant="text">History{evidence.length ? ` (${evidence.length})` : ''}</Button>
                    </Stack>
                ) : (
                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                        <Button size="small" variant="text">Upload</Button>
                        <Button size="small" variant="text" disabled={evidence.length === 0}>History{evidence.length ? ` (${evidence.length})` : ''}</Button>
                    </Stack>
                )}
            </TableCell>
        </TableRow>
    );
}

export default function POProfilePage() {
    const { appId } = useParams<{ appId: string }>();
    const { data: profile, isLoading, error } = useProfile(appId!);

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Alert severity="error">
                Failed to load profile data. Please try again later.
            </Alert>
        );
    }

    if (!profile) {
        return (
            <Alert severity="warning">
                No profile data found for app ID: {appId}
            </Alert>
        );
    }

    return (
        <Stack spacing={2}>
            <Paper variant="outlined" sx={{ p: 2, borderRadius: 3 }}>
                <Stack spacing={0.5}>
                    <Typography variant="h5">{profile.name}</Typography>
                    <Stack direction="row" spacing={1}>
                        <Chip size="small" label={`App ID: ${profile.appId}`} />
                        <Chip size="small" variant="outlined" label={`Updated: ${fmtDate(profile.updatedAt)}`} />
                    </Stack>
                </Stack>
            </Paper>

            {profile.domains.map((domain: ProfileDomain) => (
                <DomainTable key={domain.domainKey} domain={domain} />
            ))}

            {(!profile.domains || profile.domains.length === 0) && (
                <Alert severity="warning">No domains found in profile.</Alert>
            )}
        </Stack>
    );
}