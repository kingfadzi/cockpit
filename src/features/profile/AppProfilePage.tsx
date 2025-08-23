// src/features/profile/AppProfilePage.tsx
import React, { useMemo } from 'react';
import {
    Alert,
    Box,
    Chip,
    CircularProgress,
    Divider,
    Grid,
    LinearProgress,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Tooltip,
    Typography,
} from '@mui/material';
import {
    AccessTime as AccessTimeIcon,
    Security as SecurityIcon,
    Storage as StorageIcon,
    Insights as InsightsIcon,
    ErrorOutline as ErrorOutlineIcon,
    FactCheck as FactCheckIcon,
    Map as MapIcon,
    Info as InfoIcon,
} from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { useProfile } from '../../api/hooks';

/**
 * Types mirroring backend
 */
type ProfileField = {
    fieldId: string;
    fieldKey: string;
    value: any;
    sourceSystem?: string | null;
    sourceRef?: string | null;
    evidenceCount?: number;
    lastUpdated?: string | null; // ISO
};
type ServiceInstance = {
    it_service_instance_sysid: string;
    app_id: string;
    environment: string;
    service_instance?: string;
    install_type?: string;
    service_classification?: string;
    it_business_service_sysid?: string;
    updated_at?: string;
};
type ApplicationMeta = {
    app_id: string;
    name?: string | null;
    business_service_name?: string | null;
    app_criticality_assessment?: string | null;
    application_tier?: string | null;
    install_type?: string | null;
    operational_status?: string | null;
    house_position?: string | null;
};
type AppProfileResponse = {
    appId: string;
    profileId: string;
    updatedAt: string;
    fields: ProfileField[];
    application: ApplicationMeta;
    serviceInstances: ServiceInstance[];
};

/**
 * RAG evaluation rules (kept small & explicit for maintainability)
 */
type Rag = 'green' | 'amber' | 'red' | 'neutral';

const ragColor = (rag: Rag) =>
    rag === 'green' ? '#22c55e' : rag === 'amber' ? '#f59e0b' : rag === 'red' ? '#ef4444' : '#9ca3af';

const RagDot: React.FC<{ rag: Rag }> = ({ rag }) => (
    <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: ragColor(rag) }} />
);

const SPEC: Record<
    string,
    { label: string; section: 'Security' | 'Reliability & DR' | 'Operations' | 'Data Governance'; eval: (v: any) => Rag }
> = {
    // Security
    encryption_at_rest: { label: 'Encryption at Rest', section: 'Security', eval: (v) => (v === 'required' ? 'green' : v ? 'amber' : 'red') },
    encryption_in_transit: { label: 'Encryption in Transit', section: 'Security', eval: (v) => (v === 'required' ? 'green' : v ? 'amber' : 'red') },
    key_rotation_max: {
        label: 'Key Rotation Max',
        section: 'Security',
        eval: (v) => {
            const m = String(v ?? '').match(/^(\d+)([dhm])?$/i);
            if (!m) return 'neutral';
            const n = +m[1];
            const u = (m[2] || 'd').toLowerCase();
            const days = u === 'd' ? n : u === 'h' ? Math.round(n / 24) : Math.round(n / 1440);
            return days <= 90 ? 'green' : days <= 180 ? 'amber' : 'red';
        },
    },
    secrets_management: { label: 'Secrets Management', section: 'Security', eval: (v) => (v === 'centralized_required' ? 'green' : v ? 'amber' : 'red') },
    security_testing: { label: 'Security Testing', section: 'Security', eval: (v) => (v ? 'green' : 'red') },
    confidentiality_level: { label: 'Confidentiality Level', section: 'Security', eval: () => 'neutral' },

    // Reliability & DR
    rpo_minutes: {
        label: 'RPO (min)',
        section: 'Reliability & DR',
        eval: (v) => {
            const n = +v;
            return Number.isNaN(n) ? 'neutral' : n <= 15 ? 'green' : n <= 60 ? 'amber' : 'red';
        },
    },
    rto_hours: {
        label: 'RTO (hrs)',
        section: 'Reliability & DR',
        eval: (v) => {
            const n = +v;
            return Number.isNaN(n) ? 'neutral' : n <= 4 ? 'green' : n <= 12 ? 'amber' : 'red';
        },
    },
    ha_topology: { label: 'HA Topology', section: 'Reliability & DR', eval: (v) => (v === 'active_active' ? 'green' : v === 'active_passive' ? 'amber' : v ? 'red' : 'neutral') },
    failover_automation: { label: 'Failover Automation', section: 'Reliability & DR', eval: (v) => (v === 'automated' ? 'green' : v ? 'amber' : 'neutral') },
    dr_test_frequency: { label: 'DR Test Frequency', section: 'Reliability & DR', eval: (v) => (v === 'annual_tabletop' ? 'amber' : v ? 'green' : 'red') },

    // Operations
    audit_logging: { label: 'Audit Logging', section: 'Operations', eval: (v) => (v === 'full_with_periodic_review' ? 'green' : v ? 'amber' : 'red') },
    monitoring_slos: { label: 'Monitoring SLOs', section: 'Operations', eval: (v) => (String(v || '').startsWith('99.9') ? 'green' : v ? 'amber' : 'red') },
    oncall_coverage: { label: 'On-call Coverage', section: 'Operations', eval: (v) => (v === '24x7' ? 'green' : v ? 'amber' : 'red') },
    runbook_maturity: { label: 'Runbook Maturity', section: 'Operations', eval: (v) => (v === 'production_ready' ? 'green' : v ? 'amber' : 'red') },

    // Data Governance (supporting)
    backup_policy: { label: 'Backup Policy', section: 'Data Governance', eval: (v) => (v ? 'green' : 'red') },
    data_validation: { label: 'Data Validation', section: 'Data Governance', eval: (v) => (v ? 'green' : 'neutral') },
    reconciliation_frequency: { label: 'Reconciliation Frequency', section: 'Data Governance', eval: (v) => (v ? 'green' : 'neutral') },
    review_depth: { label: 'Review Depth', section: 'Data Governance', eval: (v) => (v === 'full_review' ? 'green' : v ? 'amber' : 'neutral') },
    materiality: { label: 'Materiality', section: 'Data Governance', eval: () => 'neutral' },
    change_control: { label: 'Change Control', section: 'Data Governance', eval: (v) => (v ? 'green' : 'neutral') },
    chaos_testing: { label: 'Chaos Testing', section: 'Data Governance', eval: (v) => (v === 'optional' ? 'neutral' : v ? 'green' : 'neutral') },
    immutability_required: { label: 'Immutability Required', section: 'Data Governance', eval: (v) => (v === true ? 'green' : 'neutral') },
};

const CORE_KEYS = [
    // Security
    'encryption_at_rest',
    'encryption_in_transit',
    'key_rotation_max',
    'secrets_management',
    // Reliability & DR
    'rpo_minutes',
    'rto_hours',
    'ha_topology',
    'failover_automation',
    'dr_test_frequency',
    // Operations
    'audit_logging',
    'monitoring_slos',
    'oncall_coverage',
    'runbook_maturity',
] as const;

/**
 * Helpers
 */
const fmtDate = (iso?: string | null) => (iso ? new Date(iso).toUTCString() : '—');
const envSort = (a: string, b: string) => {
    const order = ['Production', 'Pre-Production', 'Staging', 'Test', 'QA', 'Development', 'Dev'];
    const ia = order.indexOf(a);
    const ib = order.indexOf(b);
    if (ia === -1 && ib === -1) return a.localeCompare(b);
    if (ia === -1) return 1;
    if (ib === -1) return -1;
    return ia - ib;
};

/**
 * Page: One-page snapshot (no tabs)
 */
export default function AppProfilePage() {
    const { appId = '' } = useParams();
    const { data, isLoading, error } = useProfile(appId);

    // Safe fallbacks so all hooks/memos run every render
    const profile = (data ?? {}) as Partial<AppProfileResponse>;
    const app = (profile.application ?? {}) as Partial<ApplicationMeta>;
    const fields = (profile.fields ?? []) as ProfileField[];
    const instances = (profile.serviceInstances ?? []) as ServiceInstance[];
    const updatedAt = profile.updatedAt;
    const profileId = profile.profileId;

    const byKey = useMemo(
        () => Object.fromEntries(fields.map((f) => [f.fieldKey, f])),
        [fields]
    );

    // Compute Application Shape (RAGs for core expectations)
    const shape = useMemo(() => {
        const rows = CORE_KEYS.map((k) => {
            const f = byKey[k as string];
            const v = f?.value;
            const spec = SPEC[k as string];
            const rag = spec ? spec.eval(v) : 'neutral';
            return { key: k as string, label: spec?.label ?? k, value: v, rag, evidenceCount: f?.evidenceCount ?? 0 };
        });
        const greens = rows.filter((r) => r.rag === 'green').length;
        const ambers = rows.filter((r) => r.rag === 'amber').length;
        const reds = rows.filter((r) => r.rag === 'red').length;
        const readinessPct = Math.round((greens / rows.length) * 100);
        return { rows, greens, ambers, reds, readinessPct };
    }, [byKey]);

    // Deviations = non-green items (derived exposures until Risk Stories API exists)
    const deviations = useMemo(() => {
        const reasons: Record<string, string> = {
            failover_automation: 'Failover not automated',
            dr_test_frequency: 'DR validation limited to tabletop',
            key_rotation_max: 'Key rotation window high vs target',
            runbook_maturity: 'Runbook not production-ready',
        };
        return shape.rows
            .filter((r) => r.rag !== 'green')
            .map((r) => ({
                key: r.key,
                label: r.label,
                severity: r.rag === 'red' ? 'High' : 'Medium',
                reason: reasons[r.key] ?? 'Gap to expectation',
                value: r.value,
            }));
    }, [shape.rows]);

    // Assurance (coverage proxy from evidenceCount)
    const assurance = useMemo(() => {
        const total = fields.length;
        const withEvidence = fields.filter((f) => (f.evidenceCount ?? 0) > 0).length;
        const pct = total ? Math.round((withEvidence / total) * 100) : 0;
        return { total, withEvidence, pct, missing: total - withEvidence };
    }, [fields]);

    return (
        <Stack spacing={2}>
            {/* Loading / error banners */}
            {isLoading && (
                <Stack alignItems="center" mt={3}>
                    <CircularProgress />
                </Stack>
            )}
            {error && <Alert severity="error">{String((error as any)?.message || error)}</Alert>}
            {!isLoading && !error && !data && <Alert severity="warning">No profile found for {appId}.</Alert>}

            {/* Header: Identity & context */}
            <Paper variant="outlined" sx={{ p: 2, borderRadius: 3 }}>
                <Stack spacing={0.5}>
                    <Typography variant="h5">{app.name || profile.appId || appId}</Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap">
                        {app.app_criticality_assessment && <Chip size="small" label={`Criticality ${app.app_criticality_assessment}`} />}
                        {app.application_tier && <Chip size="small" variant="outlined" label={app.application_tier} />}
                        {app.install_type && <Chip size="small" variant="outlined" label={app.install_type} />}
                        {app.operational_status && <Chip size="small" variant="outlined" label={app.operational_status} />}
                        {app.house_position && <Chip size="small" variant="outlined" label={`House: ${app.house_position}`} />}
                        {app.business_service_name && <Chip size="small" variant="outlined" label={`Service: ${app.business_service_name}`} />}
                    </Stack>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <AccessTimeIcon fontSize="inherit" color="disabled" />
                        <Typography variant="caption" color="text.secondary">
                            Profile updated {fmtDate(updatedAt)} {profileId ? `• Profile ${profileId}` : ''}
                        </Typography>
                    </Stack>
                </Stack>
            </Paper>

            {/* GRID: 2 x 2 snapshot blocks */}
            <Grid container spacing={2}>
                {/* Application Shape */}
                <Grid item xs={12} md={6}>
                    <Paper variant="outlined" sx={{ p: 2, borderRadius: 3 }}>
                        <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                            <SecurityIcon fontSize="small" />
                            <Typography variant="subtitle2">Application Shape (Expectations)</Typography>
                        </Stack>
                        <Divider sx={{ mb: 1 }} />
                        <Stack spacing={1}>
                            <Stack direction="row" spacing={2} alignItems="center">
                                <Typography variant="body2" color="text.secondary">Readiness</Typography>
                                <Box sx={{ flex: 1 }}>
                                    <LinearProgress
                                        variant="determinate"
                                        value={shape.readinessPct}
                                        sx={{ height: 8, borderRadius: 4 }}
                                    />
                                </Box>
                                <Typography variant="body2" fontWeight={600}>{shape.readinessPct}%</Typography>
                            </Stack>

                            <Grid container spacing={1.25}>
                                {shape.rows.map((r) => (
                                    <Grid item xs={12} sm={6} key={r.key}>
                                        <Stack
                                            direction="row"
                                            spacing={1}
                                            alignItems="center"
                                            sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, p: 1 }}
                                        >
                                            <RagDot rag={r.rag} />
                                            <Box sx={{ flex: 1 }}>
                                                <Typography variant="body2" fontWeight={600}>{r.label}</Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    {String(r.value ?? '—')}
                                                </Typography>
                                            </Box>
                                            <Tooltip title={`${r.evidenceCount ?? 0} evidence`}>
                                                <Chip size="small" variant="outlined" label={`${r.evidenceCount ?? 0}`} />
                                            </Tooltip>
                                        </Stack>
                                    </Grid>
                                ))}
                            </Grid>
                        </Stack>
                    </Paper>
                </Grid>

                {/* Deviations (Exposures & Exceptions) */}
                <Grid item xs={12} md={6}>
                    <Paper variant="outlined" sx={{ p: 2, borderRadius: 3 }}>
                        <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                            <ErrorOutlineIcon fontSize="small" />
                            <Typography variant="subtitle2">Deviations (Exposures & Exceptions)</Typography>
                        </Stack>
                        <Divider sx={{ mb: 1 }} />
                        <Stack direction="row" spacing={1} flexWrap="wrap" mb={1}>
                            <Chip label={`Derived exposures: ${deviations.length}`} size="small" />
                            {/* Stubs until wired */}
                            <Chip label="Risk Stories: not connected" size="small" variant="outlined" />
                            <Chip label="Exceptions: not connected" size="small" variant="outlined" />
                        </Stack>

                        {deviations.length ? (
                            <Stack spacing={1}>
                                {deviations.map((d) => (
                                    <Stack
                                        key={d.key}
                                        direction="row"
                                        spacing={1}
                                        alignItems="center"
                                        sx={{ border: '1px dashed', borderColor: 'divider', borderRadius: 2, p: 1 }}
                                    >
                                        <RagDot rag={d.severity === 'High' ? 'red' : 'amber'} />
                                        <Box sx={{ flex: 1 }}>
                                            <Typography variant="body2" fontWeight={600}>{d.label}</Typography>
                                            <Typography variant="caption" color="text.secondary">{d.reason}</Typography>
                                        </Box>
                                        <Chip
                                            size="small"
                                            color={d.severity === 'High' ? 'error' : 'warning'}
                                            label={d.severity}
                                            variant="outlined"
                                        />
                                    </Stack>
                                ))}
                            </Stack>
                        ) : (
                            <Typography variant="body2" color="text.secondary">No exposures derived from profile at this time.</Typography>
                        )}
                    </Paper>
                </Grid>

                {/* Assurance (Evidence & Review) */}
                <Grid item xs={12} md={6}>
                    <Paper variant="outlined" sx={{ p: 2, borderRadius: 3 }}>
                        <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                            <FactCheckIcon fontSize="small" />
                            <Typography variant="subtitle2">Assurance (Evidence & Review)</Typography>
                        </Stack>
                        <Divider sx={{ mb: 1 }} />
                        <Stack spacing={1}>
                            <Stack direction="row" spacing={2} alignItems="center">
                                <Typography variant="body2" color="text.secondary">Evidence Coverage</Typography>
                                <Box sx={{ flex: 1 }}>
                                    <LinearProgress
                                        variant="determinate"
                                        value={assurance.pct}
                                        sx={{ height: 8, borderRadius: 4 }}
                                    />
                                </Box>
                                <Typography variant="body2" fontWeight={600}>{assurance.pct}%</Typography>
                            </Stack>
                            <Stack direction="row" spacing={1} flexWrap="wrap">
                                <Chip size="small" label={`With evidence: ${assurance.withEvidence}`} />
                                <Chip size="small" label={`Missing: ${assurance.missing}`} />
                                {/* Stubs until wired */}
                                <Chip size="small" variant="outlined" label="Pending review: —" />
                                <Chip size="small" variant="outlined" label="Approved: —" />
                                <Chip size="small" variant="outlined" label="Expired: —" />
                            </Stack>

                            {/* Quick next-actions (derive from non-green core + zero evidence fields) */}
                            <Box sx={{ mt: 1 }}>
                                <Typography variant="caption" color="text.secondary">
                                    Suggested actions:
                                </Typography>
                                <Stack direction="row" spacing={1} flexWrap="wrap" mt={0.5}>
                                    {deviations.slice(0, 4).map((d) => (
                                        <Chip key={d.key} size="small" variant="outlined" color="warning" label={`Provide evidence: ${d.label}`} />
                                    ))}
                                    {!deviations.length && <Chip size="small" variant="outlined" label="No immediate gaps detected" />}
                                </Stack>
                            </Box>
                        </Stack>
                    </Paper>
                </Grid>

                {/* Location in the Universe (Deployment Context) */}
                <Grid item xs={12} md={6}>
                    <Paper variant="outlined" sx={{ p: 2, borderRadius: 3 }}>
                        <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                            <MapIcon fontSize="small" />
                            <Typography variant="subtitle2">Location in the Universe (Deployment Context)</Typography>
                        </Stack>
                        <Divider sx={{ mb: 1 }} />

                        {instances.length ? (
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Environment</TableCell>
                                        <TableCell>Instance</TableCell>
                                        <TableCell>Classification</TableCell>
                                        <TableCell>Install Type</TableCell>
                                        <TableCell>Business Service</TableCell>
                                        <TableCell>Updated</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {[...instances]
                                        .sort((a, b) => envSort(a.environment, b.environment))
                                        .map((si) => (
                                            <TableRow key={si.it_service_instance_sysid}>
                                                <TableCell>
                                                    <Chip size="small" variant="outlined" label={si.environment} />
                                                </TableCell>
                                                <TableCell>{si.service_instance ?? si.it_service_instance_sysid}</TableCell>
                                                <TableCell>{si.service_classification ?? '—'}</TableCell>
                                                <TableCell>{si.install_type ?? '—'}</TableCell>
                                                <TableCell>{si.it_business_service_sysid ?? '—'}</TableCell>
                                                <TableCell>{fmtDate(si.updated_at)}</TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        ) : (
                            <Typography variant="body2" color="text.secondary">No service instances available.</Typography>
                        )}

                        {/* Stubs for CRs & Releases */}
                        <Stack direction="row" spacing={1} flexWrap="wrap" mt={1.5}>
                            <Chip size="small" variant="outlined" icon={<InfoIcon />} label="CRs (DR/Prod): ServiceNow not connected" />
                            <Chip size="small" variant="outlined" icon={<InfoIcon />} label="Releases: Not connected" />
                        </Stack>
                    </Paper>
                </Grid>
            </Grid>

            {/* Footnote hint */}
            <Typography variant="caption" color="text.secondary">
                Snapshot reflects current profile data. Historical and predictive views can reuse this layout with a time selector.
            </Typography>
        </Stack>
    );
}
