// src/features/profile/AppProfilePage.tsx
import React, { useMemo, useState } from 'react';
import {
    Box, Stack, Typography, Tabs, Tab, Paper, Divider, Chip, Grid,
    Table, TableHead, TableRow, TableCell, TableBody, CircularProgress, Alert
} from '@mui/material';
import {
    Info as InfoIcon,
    Security as SecurityIcon,
    Storage as StorageIcon,
    Insights as InsightsIcon,
    AccessTime as AccessTimeIcon,
} from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { useProfile } from '../../api/hooks';
import EvidenceTable from '../evidence/EvidenceTable';
import ReleasesTab from '../releases/ReleasesTab';
import ComplianceMatrix from '../compliance/ComplianceMatrix';

/** ----- RAG helpers & field rules (simple, maintainable) ----- */
type Rag = 'green' | 'amber' | 'red' | 'neutral';

const SPEC = {
    // Security
    encryption_at_rest:    { label: 'Encryption at Rest',    section: 'Security',        eval: (v:any):Rag => v==='required'?'green':v?'amber':'red' },
    encryption_in_transit: { label: 'Encryption in Transit', section: 'Security',        eval: (v:any):Rag => v==='required'?'green':v?'amber':'red' },
    secrets_management:    { label: 'Secrets Management',    section: 'Security',        eval: (v:any):Rag => v==='centralized_required'?'green':v?'amber':'red' },
    key_rotation_max:      { label: 'Key Rotation Max',      section: 'Security',        eval: (v:any):Rag => {
            const m = String(v??'').match(/^(\d+)([dhm])?$/i); if(!m) return 'neutral';
            const n = +m[1], u=(m[2]||'d').toLowerCase(); const days = u==='d'?n:u==='h'?Math.round(n/24):Math.round(n/1440);
            return days<=90?'green':days<=180?'amber':'red';
        }},
    confidentiality_level: { label: 'Confidentiality Level', section: 'Security',        eval: (_:any):Rag => 'neutral' },

    // Reliability & DR
    rpo_minutes:           { label: 'RPO (min)',             section: 'Reliability & DR', eval: (v:any):Rag => isNaN(+v)?'neutral':(+v<=15?'green':+v<=60?'amber':'red') },
    rto_hours:             { label: 'RTO (hrs)',             section: 'Reliability & DR', eval: (v:any):Rag => isNaN(+v)?'neutral':(+v<=4?'green':+v<=12?'amber':'red') },
    ha_topology:           { label: 'HA Topology',           section: 'Reliability & DR', eval: (v:any):Rag => v==='active_active'?'green':v==='active_passive'?'amber':v?'red':'neutral' },
    failover_automation:   { label: 'Failover Automation',   section: 'Reliability & DR', eval: (v:any):Rag => v==='automated'?'green':v?'amber':'neutral' },
    dr_test_frequency:     { label: 'DR Test Frequency',     section: 'Reliability & DR', eval: (v:any):Rag => v==='annual_tabletop'?'amber':v?'green':'red' },

    // Operations
    audit_logging:         { label: 'Audit Logging',         section: 'Operations',       eval: (v:any):Rag => v==='full_with_periodic_review'?'green':v?'amber':'red' },
    monitoring_slos:       { label: 'Monitoring SLOs',       section: 'Operations',       eval: (v:any):Rag => String(v||'').startsWith('99.9')?'green':v?'amber':'red' },
    oncall_coverage:       { label: 'On‑call Coverage',      section: 'Operations',       eval: (v:any):Rag => v==='24x7'?'green':v?'amber':'red' },
    runbook_maturity:      { label: 'Runbook Maturity',      section: 'Operations',       eval: (v:any):Rag => v==='production_ready'?'green':'amber' },
} as const;

/** ----- small, reusable helpers ----- */
const fmtDate = (iso?: string | null) => (iso ? new Date(iso).toUTCString() : '—');
const ragDot = (rag:Rag) => {
    const bg = rag==='green'?'#22c55e':rag==='amber'?'#f59e0b':rag==='red'?'#ef4444':'#9ca3af';
    return <Box sx={{ width:8, height:8, borderRadius:'50%', bgcolor:bg }} />;
};

/** ----- Main: a single page that owns tabs & fetches profile ----- */
export default function AppProfilePage() {
    const { appId = '' } = useParams();
    const { data, isLoading, error } = useProfile(appId);
    const [tab, setTab] = useState<'overview'|'fields'|'instances'|'evidence'|'releases'|'compliance'>('overview');

    // Always define hooks BEFORE any conditional returns. Use safe fallbacks so hooks run every render.
    const app              = (data?.application ?? {}) as any;
    const fields           = data?.fields ?? [];
    const serviceInstances = data?.serviceInstances ?? [];
    const updatedAt        = data?.updatedAt;
    const profileId        = data?.profileId;

    const byKey = useMemo(
        () => Object.fromEntries(fields.map((f: any) => [f.fieldKey, f])),
        [fields]
    );

    const grouped = useMemo(() => {
        const dict: Record<string, any[]> = {};
        Object.entries(SPEC).forEach(([k, spec]) => {
            const f = byKey[k];
            if (!f) return;
            dict[spec.section] ??= [];
            dict[spec.section].push({ ...f, label: spec.label, rag: spec.eval(f.value) });
        });
        return dict;
    }, [byKey]);

    const val = (k: keyof typeof SPEC) => byKey[k]?.value;
    const rag = (k: keyof typeof SPEC): Rag => SPEC[k].eval(byKey[k]?.value);

    return (
        <Stack spacing={2}>
            {/* Status banners */}
            {isLoading && (
                <Stack alignItems="center" mt={3}><CircularProgress /></Stack>
            )}
            {error && (
                <Alert severity="error">{String((error as any)?.message || error)}</Alert>
            )}
            {!isLoading && !error && !data && (
                <Alert severity="warning">No profile found for {appId}.</Alert>
            )}

            {/* Header */}
            <Paper variant="outlined" sx={{ p:2, borderRadius:3 }}>
                <Stack spacing={0.5}>
                    <Typography variant="h5">{app.name || appId}</Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap">
                        {app.app_criticality_assessment && <Chip size="small" label={`Criticality ${app.app_criticality_assessment}`} />}
                        {app.application_tier && <Chip size="small" variant="outlined" label={app.application_tier} />}
                        {app.install_type && <Chip size="small" variant="outlined" label={app.install_type} />}
                        {app.operational_status && <Chip size="small" variant="outlined" label={app.operational_status} />}
                    </Stack>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <AccessTimeIcon fontSize="inherit" color="disabled" />
                        <Typography variant="caption" color="text.secondary">
                            Profile updated {fmtDate(updatedAt)} {profileId ? `• Profile ${profileId}` : ''}
                        </Typography>
                    </Stack>
                </Stack>
            </Paper>

            {/* Tabs owned by this page */}
            <Tabs value={tab} onChange={(_, v)=>setTab(v)} variant="scrollable" allowScrollButtonsMobile>
                <Tab value="overview"   label="Overview" />
                <Tab value="fields"     label="Profile Fields" />
                <Tab value="instances"  label="Service Instances" />
                <Tab value="evidence"   label="Evidence" />
                <Tab value="releases"   label="Releases" />
                <Tab value="compliance" label="Compliance" />
            </Tabs>

            {/* OVERVIEW */}
            {tab === 'overview' && (
                <Grid container spacing={2}>
                    {/* Security */}
                    <Grid item xs={12} md={6} lg={4}>
                        <Paper variant="outlined" sx={{ p:2, borderRadius:3 }}>
                            <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                                <SecurityIcon fontSize="small" />
                                <Typography variant="subtitle2">Security Posture</Typography>
                            </Stack>
                            <Divider sx={{ mb:1 }} />
                            <Stat label="At Rest"        value={String(val('encryption_at_rest') ?? 'Unknown')}   rag={rag('encryption_at_rest')} />
                            <Stat label="In Transit"     value={String(val('encryption_in_transit') ?? 'Unknown')} rag={rag('encryption_in_transit')} />
                            <Stat label="Key Rotation"   value={String(val('key_rotation_max') ?? 'Unknown')}      rag={rag('key_rotation_max')} />
                            <Stat label="Secrets Mgmt"   value={String(val('secrets_management') ?? 'Unknown')}    rag={rag('secrets_management')} />
                        </Paper>
                    </Grid>

                    {/* Reliability & DR */}
                    <Grid item xs={12} md={6} lg={4}>
                        <Paper variant="outlined" sx={{ p:2, borderRadius:3 }}>
                            <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                                <StorageIcon fontSize="small" />
                                <Typography variant="subtitle2">Reliability & DR</Typography>
                            </Stack>
                            <Divider sx={{ mb:1 }} />
                            <Stat label="RPO (min)"     value={String(val('rpo_minutes') ?? 'Unknown')}   rag={rag('rpo_minutes')} />
                            <Stat label="RTO (hrs)"     value={String(val('rto_hours') ?? 'Unknown')}     rag={rag('rto_hours')} />
                            <Stat label="HA Topology"   value={String(val('ha_topology') ?? 'Unknown')}   rag={rag('ha_topology')} />
                            <Stat label="Failover"      value={String(val('failover_automation') ?? 'Unknown')} rag={rag('failover_automation')} />
                            <Stat label="DR Test"       value={String(val('dr_test_frequency') ?? 'Unknown')} rag={rag('dr_test_frequency')} />
                        </Paper>
                    </Grid>

                    {/* Operations */}
                    <Grid item xs={12} md={6} lg={4}>
                        <Paper variant="outlined" sx={{ p:2, borderRadius:3 }}>
                            <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                                <InsightsIcon fontSize="small" />
                                <Typography variant="subtitle2">Operations</Typography>
                            </Stack>
                            <Divider sx={{ mb:1 }} />
                            <Stat label="Audit Logging"  value={String(val('audit_logging') ?? 'Unknown')}  rag={rag('audit_logging')} />
                            <Stat label="Monitoring"     value={String(val('monitoring_slos') ?? 'Unknown')} rag={rag('monitoring_slos')} />
                            <Stat label="On‑call"        value={String(val('oncall_coverage') ?? 'Unknown')} rag={rag('oncall_coverage')} />
                            <Stat label="Runbook"        value={String(val('runbook_maturity') ?? 'Unknown')} rag={rag('runbook_maturity')} />
                        </Paper>
                    </Grid>

                    {/* Stubs (until wired) */}
                    <Grid item xs={12} md={6} lg={4}>
                        <Paper variant="outlined" sx={{ p:2, borderRadius:3 }}>
                            <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                                <InfoIcon fontSize="small" color="disabled" />
                                <Typography variant="subtitle2">Release Gate</Typography>
                            </Stack>
                            <Divider sx={{ mb:1 }} />
                            <Typography variant="body2" color="text.secondary">Not connected. Gate status will show here.</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <Paper variant="outlined" sx={{ p:2, borderRadius:3 }}>
                            <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                                <InfoIcon fontSize="small" color="disabled" />
                                <Typography variant="subtitle2">Deployment CRs (DR/Prod)</Typography>
                            </Stack>
                            <Divider sx={{ mb:1 }} />
                            <Typography variant="body2" color="text.secondary">Not connected. ServiceNow CRs will appear here.</Typography>
                        </Paper>
                    </Grid>
                </Grid>
            )}

            {/* PROFILE FIELDS */}
            {tab === 'fields' && (
                <Paper variant="outlined" sx={{ p:2, borderRadius:3 }}>
                    <Typography variant="subtitle2">Profile Fields</Typography>
                    <Divider sx={{ my:1 }} />
                    <Grid container spacing={1.5}>
                        {Object.entries(grouped).map(([section, rows]) => (
                            <Grid item xs={12} key={section}>
                                <Typography variant="overline" color="text.secondary">{section}</Typography>
                                <Grid container spacing={1.5} mt={0.5}>
                                    {rows.map((row:any) => (
                                        <Grid key={row.fieldId} item xs={12} md={6} lg={4}>
                                            <Paper variant="outlined" sx={{ p:1.5, borderRadius:2 }}>
                                                <Stack direction="row" justifyContent="space-between" alignItems="center">
                                                    <Stack direction="row" spacing={1} alignItems="center">
                                                        {ragDot(row.rag)} <Typography variant="body2" fontWeight={600}>{row.label}</Typography>
                                                    </Stack>
                                                    <Chip size="small" variant="outlined" label={`${row.evidenceCount ?? 0} evidence`} />
                                                </Stack>
                                                <Typography variant="body2" mt={0.5}>{String(row.value)}</Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    {row.sourceSystem ?? '—'} • Updated {fmtDate(row.lastUpdated)}
                                                </Typography>
                                            </Paper>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Grid>
                        ))}
                    </Grid>
                </Paper>
            )}

            {/* SERVICE INSTANCES */}
            {tab === 'instances' && (
                <Paper variant="outlined" sx={{ p:2, borderRadius:3 }}>
                    <Typography variant="subtitle2">Service Instances</Typography>
                    <Divider sx={{ my:1 }} />
                    {serviceInstances.length ? (
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
                                {[...serviceInstances]
                                    .sort((a:any,b:any)=>{
                                        const order=['Production','Pre-Production','Staging','Test','QA','Development','Dev'];
                                        const ia=order.indexOf(a.environment), ib=order.indexOf(b.environment);
                                        if(ia<0 && ib<0) return String(a.environment).localeCompare(String(b.environment));
                                        if(ia<0) return 1; if(ib<0) return -1; return ia-ib;
                                    })
                                    .map((si:any)=>(
                                        <TableRow key={si.it_service_instance_sysid}>
                                            <TableCell><Chip size="small" variant="outlined" label={si.environment} /></TableCell>
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
                </Paper>
            )}

            {/* EXISTING PAGES (kept as tabs for continuity) */}
            {tab === 'evidence'   && <EvidenceTable   appId={appId} />}
            {tab === 'releases'   && <ReleasesTab     appId={appId} />}
            {tab === 'compliance' && <ComplianceMatrix appId={appId} />}
        </Stack>
    );
}

/** Compact stat row for the overview cards */
function Stat({ label, value, rag }: { label:string; value?:React.ReactNode; rag:Rag }) {
    return (
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ py:0.25 }}>
            <Stack direction="row" spacing={1} alignItems="center">
                {ragDot(rag)} <Typography variant="body2" color="text.secondary">{label}</Typography>
            </Stack>
            <Typography variant="body2" fontWeight={600}>{value ?? 'Unknown'}</Typography>
        </Stack>
    );
}
