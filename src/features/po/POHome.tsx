import React, { useState, useMemo } from 'react';
import {
    Grid,
    Stack,
    Typography,
    Button,
    Box,
    Tooltip,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from '@mui/material';
import SectionHeader from '../../components/SectionHeader';
import Section from '../../components/Section';
import {
    severityIcon,
    severityColor,
    StatusSeverity,
} from '../../components/shared/status';
import CriticalityBadge from '../../components/CriticalityBadge';
import { usePortfolioKpis, useApps } from '../../api/hooks';
import { useNavigate } from 'react-router-dom';

// Type for KPI tiles
type Tile = {
    label: string;
    severity: StatusSeverity;
    count: number;
    tooltip: string;
    to: string;
    subtext: string;
};

// KPI tile component
function KpiTile({
                     label,
                     severity,
                     count,
                     tooltip,
                     to,
                     subtext,
                 }: Tile) {
    const navigate = useNavigate();
    const Icon = severityIcon[severity];
    const color = severityColor[severity];
    return (
        <Tooltip title={tooltip}>
            <Section padded={false}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        minHeight: 120,
                        p: 2,
                        cursor: 'pointer',
                    }}
                    onClick={() => navigate(to)}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Icon style={{ width: 24, height: 24, color }} />
                        <Typography variant="subtitle1" sx={{ ml: 1 }}>
                            {label}
                        </Typography>
                    </Box>
                    <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ lineHeight: 1.2 }}
                    >
                        {subtext}
                    </Typography>
                    <Typography variant="h5" sx={{ mt: 'auto' }}>
                        {count}
                    </Typography>
                </Box>
            </Section>
        </Tooltip>
    );
}

export default function POHome() {
    const { data: kpis } = usePortfolioKpis();
    const { data: apps, isLoading } = useApps();

    // Search/filter state
    const [search, setSearch] = useState('');
    const [criticalityFilter, setCriticalityFilter] = useState<
        'A' | 'B' | 'C' | 'D' | ''
    >('');
    const [serviceFilter, setServiceFilter] = useState('');
    const [installTypeFilter, setInstallTypeFilter] = useState('');

    // Get options for business services & install types
    const services = useMemo(() => {
        const set = new Set<string>();
        (apps || []).forEach((app) => {
            if (app.businessServiceName) set.add(app.businessServiceName);
        });
        return Array.from(set);
    }, [apps]);

    const installTypes = useMemo(() => {
        const set = new Set<string>();
        (apps || []).forEach((app) => {
            const install = (app as any).install_type;
            if (install) set.add(install);
        });
        return Array.from(set);
    }, [apps]);

    // Filter apps based on the criteria
    const filteredApps = useMemo(() => {
        return (apps || []).filter((app) => {
            const matchSearch =
                !search ||
                (app.name || '')
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                app.appId.toLowerCase().includes(search.toLowerCase());
            const matchCrit =
                !criticalityFilter ||
                app.criticality === criticalityFilter;
            const matchService =
                !serviceFilter ||
                app.businessServiceName === serviceFilter;
            const matchInstall =
                !installTypeFilter ||
                (app as any).install_type === installTypeFilter;
            return (
                matchSearch &&
                matchCrit &&
                matchService &&
                matchInstall
            );
        });
    }, [apps, search, criticalityFilter, serviceFilter, installTypeFilter]);

    // KPI tile definitions
    const tiles: Tile[] = [
        {
            label: 'Compliant',
            severity: 'success',
            count: kpis?.compliant ?? 0,
            tooltip: 'Approved evidence and passing controls',
            to: '/po/evidence?status=approved',
            subtext: 'Review latest approvals',
        },
        {
            label: 'Missing Evidence',
            severity: 'error',
            count: kpis?.missingEvidence ?? 0,
            tooltip: 'Controls missing required evidence',
            to: '/po/evidence?status=missing',
            subtext: 'Click to upload',
        },
        {
            label: 'Pending Review',
            severity: 'warning',
            count: kpis?.pendingReview ?? 0,
            tooltip: 'Evidence awaiting SME review',
            to: '/po/evidence?status=submitted',
            subtext: 'See what’s waiting',
        },
        {
            label: 'Risk Blocked',
            severity: 'info',
            count: kpis?.riskBlocked ?? 0,
            tooltip: 'Controls blocked by risk/exception',
            to: '/po/evidence?status=rejected',
            subtext: 'Resolve before release',
        },
    ];

    return (
        <Stack spacing={2}>
            {/* Main page header */}
            <SectionHeader
                title="Product Owner – Portfolio"
                subtitle="Overview of your governed applications"
            />

            {/* Section heading + KPI cards tightly grouped */}
            <Stack spacing={0.5}>
                <Typography variant="h6" sx={{ m: 0 }}>
                    Status Overview
                </Typography>
                <Grid container spacing={1.5}>
                    {tiles.map((tile) => (
                        <Grid key={tile.label} item xs={12} sm={6} md={3}>
                            <KpiTile {...tile} />
                        </Grid>
                    ))}
                </Grid>
            </Stack>

            {/* Applications heading */}
            <Typography variant="h6" sx={{ mt: 2 }}>
                Your Applications
            </Typography>

            {/* Filters + Add button in one row */}
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                alignItems={{ xs: 'stretch', sm: 'center' }}
                justifyContent="space-between"
            >
                {/* Left side: Filters */}
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={2}
                    alignItems={{ xs: 'stretch', sm: 'center' }}
                    flex={1}
                >
                    <TextField
                        label="Search"
                        variant="outlined"
                        size="small"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <FormControl size="small" sx={{ minWidth: 130 }}>
                        <InputLabel>Criticality</InputLabel>
                        <Select
                            value={criticalityFilter}
                            label="Criticality"
                            onChange={(e) =>
                                setCriticalityFilter(e.target.value as any)
                            }
                        >
                            <MenuItem value="">All</MenuItem>
                            <MenuItem value="A">A</MenuItem>
                            <MenuItem value="B">B</MenuItem>
                            <MenuItem value="C">C</MenuItem>
                            <MenuItem value="D">D</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl size="small" sx={{ minWidth: 180 }}>
                        <InputLabel>Business Service</InputLabel>
                        <Select
                            value={serviceFilter}
                            label="Business Service"
                            onChange={(e) =>
                                setServiceFilter(e.target.value as string)
                            }
                        >
                            <MenuItem value="">All</MenuItem>
                            {services.map((s) => (
                                <MenuItem key={s} value={s}>
                                    {s}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl size="small" sx={{ minWidth: 150 }}>
                        <InputLabel>Install Type</InputLabel>
                        <Select
                            value={installTypeFilter}
                            label="Install Type"
                            onChange={(e) =>
                                setInstallTypeFilter(e.target.value as string)
                            }
                        >
                            <MenuItem value="">All</MenuItem>
                            {installTypes.map((t) => (
                                <MenuItem key={t} value={t}>
                                    {t}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Stack>

                {/* Right side: Add button */}
                <Button variant="contained" sx={{ whiteSpace: 'nowrap' }}>
                    Add Application
                </Button>
            </Stack>

            {/* Applications grid */}
            {isLoading ? (
                <Typography>Loading apps…</Typography>
            ) : (
                <Grid container spacing={2}>
                    {filteredApps.map((app) => (
                        <Grid key={app.appId} item xs={12} sm={6} md={4}>
                            <Section>
                                <Stack spacing={1}>
                                    <Stack
                                        direction="row"
                                        spacing={1}
                                        alignItems="center"
                                    >
                                        <CriticalityBadge
                                            criticality={app.criticality}
                                        />
                                        <Typography variant="h6">
                                            {app.name || app.appId}
                                        </Typography>
                                    </Stack>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        Business Service:{' '}
                                        {app.businessServiceName || '—'}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        Install Type:{' '}
                                        {(app as any).install_type || '—'}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        Architecture:{' '}
                                        {app.architecture_type || '—'}
                                    </Typography>
                                    <Button
                                        size="small"
                                        variant="contained"
                                        href={`/po/apps/${app.appId}`}
                                        sx={{ mt: 1 }}
                                    >
                                        Open
                                    </Button>
                                </Stack>
                            </Section>
                        </Grid>
                    ))}
                    {!filteredApps.length && (
                        <Typography color="text.secondary">
                            No applications match your filters.
                        </Typography>
                    )}
                </Grid>
            )}
        </Stack>
    );
}