// src/features/profile/POProfilePageTable.mock.tsx
// Product Owner Profile Page — domain TABLES (C/I/A/R/S) with mock data covering ALL fields

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

/* ------------------------------ Types ------------------------------ */
export type Evidence = {
    evidence_id: string;
    profile_field_id: string;
    uri: string;
    status: 'active' | 'superseded' | 'revoked';
    valid_from?: string | null;
    valid_until?: string | null;
    reviewed_by?: string | null;
    reviewed_at?: string | null;
};

export type ProfileField = {
    id: string;
    profile_id: string;
    field_key: string;
    value: any;
    derived_from: 'security_rating' | 'integrity_rating' | 'availability_rating' | 'resilience_rating' | 'app_criticality';
};

export type RiskStory = {
    risk_id: string;
    profile_field_id: string;
    title: string;
    severity: 'High' | 'Medium' | 'Low';
    status: 'Open' | 'Mitigated' | 'Closed';
};

export type MockProfile = {
    appId: string;
    name: string;
    fields: ProfileField[];
    evidence: Evidence[];
    risks: RiskStory[];
    drivers: Partial<Record<ProfileField['derived_from'], string>>;
    updatedAt: string;
};

/* ----------------------------- Mock Data ----------------------------- */
const MOCK_PROFILE: MockProfile = {
    appId: 'CORR-12356',
    name: 'Correspondence Manager',
    updatedAt: '2025-08-22T18:14:59.560Z',
    drivers: {
        security_rating: 'A2',
        integrity_rating: 'A',
        availability_rating: 'B',
        resilience_rating: '1',
        app_criticality: 'B',
    },
    fields: [
        // ---- Security
        { id: 'pf_confidentiality', profile_id: 'prof_1', field_key: 'confidentiality_level', value: 'restricted', derived_from: 'security_rating' },
        { id: 'pf_enc_rest', profile_id: 'prof_1', field_key: 'encryption_at_rest', value: 'required', derived_from: 'security_rating' },
        { id: 'pf_enc_transit', profile_id: 'prof_1', field_key: 'encryption_in_transit', value: 'required', derived_from: 'security_rating' },
        { id: 'pf_sec_test', profile_id: 'prof_1', field_key: 'security_testing', value: 'internal_pentest_annual+continuous_scans', derived_from: 'security_rating' },
        { id: 'pf_secrets', profile_id: 'prof_1', field_key: 'secrets_management', value: 'centralized_required', derived_from: 'security_rating' },
        { id: 'pf_key_rot', profile_id: 'prof_1', field_key: 'key_rotation_max', value: '180d', derived_from: 'security_rating' },

        // ---- Integrity
        { id: 'pf_data_val', profile_id: 'prof_1', field_key: 'data_validation', value: 'strong_validation', derived_from: 'integrity_rating' },
        { id: 'pf_recon', profile_id: 'prof_1', field_key: 'reconciliation_frequency', value: 'weekly', derived_from: 'integrity_rating' },
        { id: 'pf_audit', profile_id: 'prof_1', field_key: 'audit_logging', value: 'full_with_periodic_review', derived_from: 'integrity_rating' },
        { id: 'pf_change', profile_id: 'prof_1', field_key: 'change_control', value: 'peer_review+regression_suite', derived_from: 'integrity_rating' },
        { id: 'pf_immut', profile_id: 'prof_1', field_key: 'immutability_required', value: 'yes', derived_from: 'integrity_rating' },

        // ---- Availability
        { id: 'pf_rto', profile_id: 'prof_1', field_key: 'rto_hours', value: '4', derived_from: 'availability_rating' },
        { id: 'pf_rpo', profile_id: 'prof_1', field_key: 'rpo_minutes', value: '60', derived_from: 'availability_rating' },
        { id: 'pf_ha', profile_id: 'prof_1', field_key: 'ha_topology', value: 'active_passive', derived_from: 'availability_rating' },
        { id: 'pf_slos', profile_id: 'prof_1', field_key: 'monitoring_slos', value: '99.5_with_alerting', derived_from: 'availability_rating' },
        { id: 'pf_oncall', profile_id: 'prof_1', field_key: 'oncall_coverage', value: '16x5', derived_from: 'availability_rating' },

        // ---- Resilience
        { id: 'pf_dr', profile_id: 'prof_1', field_key: 'dr_test_frequency', value: 'annual_live', derived_from: 'resilience_rating' },
        { id: 'pf_backup', profile_id: 'prof_1', field_key: 'backup_policy', value: 'encrypted+tested_restores', derived_from: 'resilience_rating' },
        { id: 'pf_failover', profile_id: 'prof_1', field_key: 'failover_automation', value: 'semi_automatic', derived_from: 'resilience_rating' },
        { id: 'pf_runbook', profile_id: 'prof_1', field_key: 'runbook_maturity', value: 'approved', derived_from: 'resilience_rating' },
        { id: 'pf_chaos', profile_id: 'prof_1', field_key: 'chaos_testing', value: 'recommended', derived_from: 'resilience_rating' },

        // ---- App Criticality
        { id: 'pf_materiality', profile_id: 'prof_1', field_key: 'materiality', value: 'high', derived_from: 'app_criticality' },
        { id: 'pf_review', profile_id: 'prof_1', field_key: 'review_depth', value: 'scoped_review', derived_from: 'app_criticality' },
    ],
    evidence: [
        // Security
        {
            evidence_id: 'ev_enc_rest_1',
            profile_field_id: 'pf_enc_rest',
            uri: 'file://kms_config.png',
            status: 'active',
            reviewed_by: 'sme_lee',
            reviewed_at: '2025-08-08T12:00:00Z',
            valid_from: '2025-08-01T00:00:00Z',
            valid_until: '2026-01-31T00:00:00Z', // shows Current
        },
        // Integrity
        {
            evidence_id: 'ev_audit_1',
            profile_field_id: 'pf_audit',
            uri: 'file://audit_policy_v3.pdf',
            status: 'active',
            reviewed_by: 'sme_alex',
            reviewed_at: '2025-08-05T10:00:00Z',
            valid_from: '2025-08-01T00:00:00Z',
            valid_until: '2026-07-31T00:00:00Z',
        },
        // Availability - make one expiring soon (<=90 days)
        {
            evidence_id: 'ev_rto_1',
            profile_field_id: 'pf_rto',
            uri: 'file://dr_plan_v1.pdf',
            status: 'active',
            reviewed_by: 'sme_kim',
            reviewed_at: '2025-08-10T09:00:00Z',
            valid_from: '2025-08-10T00:00:00Z',
            valid_until: '2025-10-15T00:00:00Z', // Expiring within 90 days (given 2025-08)
        },
        // Resilience - expired example (superseded, no active left)
        {
            evidence_id: 'ev_dr_old',
            profile_field_id: 'pf_dr',
            uri: 'file://dr_test_2024.pdf',
            status: 'superseded',
            reviewed_by: 'sme_omar',
            reviewed_at: '2024-09-01T10:00:00Z',
            valid_from: '2024-09-01T00:00:00Z',
            valid_until: '2025-03-01T00:00:00Z',
        },
    ],
    risks: [
        { risk_id: 'risk_1', profile_field_id: 'pf_audit', title: 'Log review scope insufficient for A rating', severity: 'High', status: 'Open' },
        { risk_id: 'risk_2', profile_field_id: 'pf_key_rot', title: 'Key rotation exceeds target window', severity: 'Medium', status: 'Open' },
        { risk_id: 'risk_3', profile_field_id: 'pf_ha', title: 'Failover not tested in last 12m', severity: 'Low', status: 'Mitigated' },
    ],
};

/* ----------------------------- Utilities ----------------------------- */
const fmtDate = (iso?: string | null) => (iso ? new Date(iso).toLocaleDateString() : '—');

type Assurance = 'Current' | 'Expiring' | 'Expired' | 'Missing';

// Distinguish Missing (no rows) vs Expired (rows exist but none active) vs Expiring vs Current
function deriveAssurance(all: Evidence[], expiringDays = 90): Assurance {
    if (!all || all.length === 0) return 'Missing';
    const active = all.find((e) => e.status === 'active');
    if (!active) return 'Expired';

    const until = active.valid_until ? new Date(active.valid_until).getTime() : undefined;
    if (!until) return 'Current';

    const now = Date.now();
    const daysLeft = Math.floor((until - now) / (1000 * 60 * 60 * 24));
    if (daysLeft < 0) return 'Expired';
    if (daysLeft <= expiringDays) return 'Expiring';
    return 'Current';
}

const LABELS: Record<string, string> = {
    confidentiality_level: 'Confidentiality Level',
    encryption_at_rest: 'Encryption at Rest',
    encryption_in_transit: 'Encryption in Transit',
    security_testing: 'Security Testing',
    secrets_management: 'Secrets Management',
    key_rotation_max: 'Key Rotation Max',
    data_validation: 'Data Validation',
    reconciliation_frequency: 'Reconciliation Frequency',
    audit_logging: 'Audit Logging',
    change_control: 'Change Control',
    immutability_required: 'Immutability Required',
    rto_hours: 'RTO (hours)',
    rpo_minutes: 'RPO (minutes)',
    ha_topology: 'HA Topology',
    monitoring_slos: 'Monitoring SLOs',
    oncall_coverage: 'On-call Coverage',
    dr_test_frequency: 'DR Test Frequency',
    backup_policy: 'Backup Policy',
    failover_automation: 'Failover Automation',
    runbook_maturity: 'Runbook Maturity',
    chaos_testing: 'Chaos Testing',
    materiality: 'Materiality',
    review_depth: 'Review Depth',
};
const labelFor = (k: string) => LABELS[k] || k;

/* --------------------------- Domain Table Block --------------------------- */
function DomainTable({
                         title,
                         icon,
                         driverLabel,
                         driverValue,
                         fields,
                         evidence,
                         risks,
                     }: {
    title: string;
    icon: React.ReactElement;
    driverLabel: string;
    driverValue?: string;
    fields: ProfileField[];
    evidence: Evidence[];
    risks: RiskStory[];
}) {
    const rows = fields.map((f) => {
        const all = evidence.filter((e) => e.profile_field_id === f.id);
        const active = all.find((e) => e.status === 'active');
        const assurance = deriveAssurance(all);
        const r = risks.filter((rs) => rs.profile_field_id === f.id);
        return { f, active, all, assurance, risks: r };
    });

    const coverage = useMemo(() => {
        let cur = 0, exp = 0, expd = 0, miss = 0;
        rows.forEach((r) => {
            if (r.assurance === 'Current') cur++;
            else if (r.assurance === 'Expiring') exp++;
            else if (r.assurance === 'Expired') expd++;
            else miss++;
        });
        const total = rows.length || 1;
        const readiness = Math.round((cur / total) * 100);
        return { Current: cur, Expiring: exp, Expired: expd, Missing: miss, readiness };
    }, [fields, evidence, risks]);

    return (
        <Paper variant="outlined" sx={{ p: 2, borderRadius: 3 }}>
            <Stack spacing={1.25}>
                {/* Header */}
                <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
                    <Stack direction="row" spacing={1} alignItems="center">
                        {icon}
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
                        {rows.map(({ f, active, all, assurance, risks }) => (
                            <TableRow key={f.id} hover>
                                <TableCell>
                                    <Typography variant="body2" fontWeight={600}>{labelFor(f.field_key)}</Typography>
                                </TableCell>
                                <TableCell>{String(f.value)}</TableCell>
                                <TableCell>
                                    {active ? (
                                        <Chip size="small" color="success" variant="outlined" label="Approved" />
                                    ) : all.length > 0 ? (
                                        <Chip size="small" color="default" variant="outlined" label="No active" />
                                    ) : (
                                        <Chip size="small" color="default" variant="outlined" label="No evidence" color="error" />
                                    )}
                                </TableCell>
                                <TableCell>{active ? fmtDate(active.valid_until) : '—'}</TableCell>
                                <TableCell>
                                    {/* Color rules: Current🟢, Expiring🟠, Expired🔴, Missing🔴 */}
                                    <Chip
                                        size="small"
                                        color={assurance==='Current' ? 'success' : assurance==='Expiring' ? 'warning' : 'error'}
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
                                            onClick={() => console.log('open-risk-stories', f.id)}
                                        >
                                            {risks.length}
                                        </Button>
                                    ) : (
                                        <Typography variant="caption" color="text.secondary">—</Typography>
                                    )}
                                </TableCell>
                                <TableCell align="right">
                                    {active ? (
                                        <Stack direction="row" spacing={1} justifyContent="flex-end">
                                            <Button size="small" variant="text">Replace</Button>
                                            <Button size="small" variant="text">History{all.length ? ` (${all.length})` : ''}</Button>
                                        </Stack>
                                    ) : (
                                        <Stack direction="row" spacing={1} justifyContent="flex-end">
                                            <Button size="small" variant="text">Upload</Button>
                                            <Button size="small" variant="text" disabled={all.length === 0}>History{all.length ? ` (${all.length})` : ''}</Button>
                                        </Stack>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Stack>
        </Paper>
    );
}

/* ------------------------------- The Page ------------------------------- */
const POProfilePageTableMock: React.FC = () => {
    const p = MOCK_PROFILE;

    const groups = useMemo(() => {
        const g: Record<string, ProfileField[]> = {};
        p.fields.forEach((f) => {
            (g[f.derived_from] ||= []).push(f);
        });
        return g;
    }, [p.fields]);

    return (
        <Stack spacing={2}>
            <Paper variant="outlined" sx={{ p: 2, borderRadius: 3 }}>
                <Stack spacing={0.5}>
                    <Typography variant="h5">{p.name}</Typography>
                    <Stack direction="row" spacing={1}>
                        <Chip size="small" label={`App ID: ${p.appId}`} />
                        <Chip size="small" variant="outlined" label={`Updated: ${fmtDate(p.updatedAt)}`} />
                    </Stack>
                </Stack>
            </Paper>

            <DomainTable
                title="Confidentiality / Security"
                icon={<SecurityIcon fontSize="small" />}
                driverLabel="security_rating"
                driverValue={p.drivers.security_rating}
                fields={groups['security_rating'] || []}
                evidence={p.evidence}
                risks={p.risks}
            />

            <DomainTable
                title="Integrity"
                icon={<IntegrityIcon fontSize="small" />}
                driverLabel="integrity_rating"
                driverValue={p.drivers.integrity_rating}
                fields={groups['integrity_rating'] || []}
                evidence={p.evidence}
                risks={p.risks}
            />

            <DomainTable
                title="Availability"
                icon={<AvailabilityIcon fontSize="small" />}
                driverLabel="availability_rating"
                driverValue={p.drivers.availability_rating}
                fields={groups['availability_rating'] || []}
                evidence={p.evidence}
                risks={p.risks}
            />

            <DomainTable
                title="Resilience"
                icon={<ResilienceIcon fontSize="small" />}
                driverLabel="resilience_rating"
                driverValue={p.drivers.resilience_rating}
                fields={groups['resilience_rating'] || []}
                evidence={p.evidence}
                risks={p.risks}
            />

            <DomainTable
                title="Summary"
                icon={<SummaryIcon fontSize="small" />}
                driverLabel="app_criticality"
                driverValue={p.drivers.app_criticality}
                fields={groups['app_criticality'] || []}
                evidence={p.evidence}
                risks={p.risks}
            />

            {(!p.fields || p.fields.length === 0) && <Alert severity="warning">No mock fields found.</Alert>}
        </Stack>
    );
};

export default POProfilePageTableMock;
