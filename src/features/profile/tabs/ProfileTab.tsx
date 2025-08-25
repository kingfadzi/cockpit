import React, { useMemo } from 'react';
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
    TableContainer,
} from '@mui/material';
import {
    Security as SecurityIcon,
    GppGood as IntegrityIcon,
    AvTimer as AvailabilityIcon,
    Bolt as ResilienceIcon,
    Summarize as SummaryIcon,
    FactCheck as FactCheckIcon,
    ReportProblem as RiskIcon,
    Description as DefaultIcon,
} from '@mui/icons-material';
import type { ProfileDomain, ProfileField, ProfileResponse, PolicyRequirement } from '../../../api/types';

const ICON_MAP: Record<string, React.ReactElement> = {
    SecurityIcon: <SecurityIcon fontSize="small" />,
    IntegrityIcon: <IntegrityIcon fontSize="small" />,
    AvailabilityIcon: <AvailabilityIcon fontSize="small" />,
    ResilienceIcon: <ResilienceIcon fontSize="small" />,
    SummaryIcon: <SummaryIcon fontSize="small" />,
    DefaultIcon: <DefaultIcon fontSize="small" />,
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
                        {ICON_MAP[icon] || <DefaultIcon fontSize="small" />}
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
                <TableContainer sx={{ overflowX: 'auto' }}>
                    <Table size="small" sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ minWidth: 140 }}>Property</TableCell>
                                <TableCell sx={{ minWidth: 120 }}>Requirement</TableCell>
                                <TableCell sx={{ minWidth: 100 }}>Status</TableCell>
                                <TableCell sx={{ minWidth: 100 }}>Valid until</TableCell>
                                <TableCell sx={{ minWidth: 100 }}>Assurance</TableCell>
                                <TableCell sx={{ minWidth: 80 }}>Risks</TableCell>
                                <TableCell align="right" sx={{ minWidth: 140 }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {fields.map((field) => (
                                <FieldRow key={field.fieldKey} field={field} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
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

    const formatPolicyRequirementTooltip = (req: PolicyRequirement) => {
        const { ttl, refresh } = req;
        
        if (ttl === '0d') {
            return 'New evidence is required for every release';
        }
        
        const validityText = `Evidence valid for ${ttl}`;
        const refreshText = refresh === 'on_expiry' 
            ? 'Can be refreshed when expired' 
            : 'New evidence required each release';
            
        return `${validityText} • ${refreshText}`;
    };

    return (
        <TableRow hover>
            <TableCell>
                <Typography variant="body2" fontWeight={600}>{label}</Typography>
            </TableCell>
            <TableCell>
                <Tooltip 
                    title={formatPolicyRequirementTooltip(policyRequirement)}
                    placement="top"
                    arrow
                >
                    <Typography 
                        variant="body2" 
                        sx={{ 
                            cursor: 'help',
                            textDecoration: 'underline',
                            textDecorationStyle: 'dotted',
                            textDecorationColor: 'rgba(0, 0, 0, 0.3)',
                            '&:hover': {
                                textDecorationColor: 'rgba(0, 0, 0, 0.6)'
                            }
                        }}
                    >
                        {policyRequirement.label}
                    </Typography>
                </Tooltip>
            </TableCell>
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

interface ProfileTabProps {
    profile: ProfileResponse;
}

export default function ProfileTab({ profile }: ProfileTabProps) {
    return (
        <Stack spacing={2}>
            {profile.domains.map((domain: ProfileDomain) => {
                // Skip the Summary card (app_criticality domain)
                if (domain.domainKey === 'app_criticality' || domain.title.toLowerCase() === 'summary') {
                    return null;
                }
                
                // Use regular DomainTable for all domains (including artifact)
                return <DomainTable key={domain.domainKey} domain={domain} />;
            })}

            {(!profile.domains || profile.domains.length === 0) && (
                <Alert severity="warning">No domains found in profile.</Alert>
            )}
        </Stack>
    );
}