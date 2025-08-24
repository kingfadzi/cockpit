import React from 'react';
import {
    Paper,
    Stack,
    Typography,
    Grid,
    Box,
    Chip,
    Button,
    Tooltip,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import {
    Description as DocumentIcon,
    Architecture as ArchitectureIcon,
    RocketLaunch as RoadmapIcon,
    Lightbulb as VisionIcon,
    Security as SecurityIcon,
    Engineering as ServiceIcon,
    BugReport as TestIcon,
    Upload as UploadIcon,
    CheckCircle as CompliantIcon,
    Error as MissingIcon,
} from '@mui/icons-material';

interface ArtefactField {
    fieldKey: string;
    label: string;
    policyRequirement: string;
    evidence: any[];
    assurance: string;
    risks: any[];
}

interface ArtefactsCardProps {
    fields: ArtefactField[];
}

const ARTEFACT_ICONS: Record<string, React.ReactElement> = {
    architecture_vision: <ArchitectureIcon fontSize="small" />,
    product_roadmap: <RoadmapIcon fontSize="small" />,
    product_vision: <VisionIcon fontSize="small" />,
    security_vision: <SecurityIcon fontSize="small" />,
    service_vision: <ServiceIcon fontSize="small" />,
    test_vision: <TestIcon fontSize="small" />,
    default: <DocumentIcon fontSize="small" />
};

const getAssuranceColor = (assurance: string) => {
    switch (assurance.toLowerCase()) {
        case 'current':
        case 'compliant':
            return 'success';
        case 'expiring':
        case 'pending':
            return 'warning';
        case 'expired':
        case 'missing':
        default:
            return 'error';
    }
};

export default function ArtefactsCard({ fields }: ArtefactsCardProps) {
    const summary = fields.reduce((acc, field) => {
        if (field.assurance.toLowerCase() === 'current' || field.assurance.toLowerCase() === 'compliant') {
            acc.compliant++;
        } else {
            acc.missing++;
        }
        return acc;
    }, { compliant: 0, missing: 0 });

    const completionPercentage = fields.length > 0 ? Math.round((summary.compliant / fields.length) * 100) : 0;

    return (
        <Paper variant="outlined" sx={{ borderRadius: 3 }}>
            <Box sx={{ p: 2 }}>
                {/* Header */}
                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <DocumentIcon />
                        <Typography variant="h6" fontWeight={700}>
                            Artefacts
                        </Typography>
                        <Chip 
                            size="small" 
                            label={`${summary.compliant}/${fields.length} Complete`}
                            color={completionPercentage === 100 ? 'success' : 'warning'}
                        />
                    </Stack>
                    
                    <Typography variant="body2" color="text.secondary">
                        {completionPercentage}% Complete
                    </Typography>
                </Stack>

                {/* Artefacts List */}
                <Grid container spacing={2}>
                    {fields.map((field) => (
                        <Grid key={field.fieldKey} item xs={12} sm={6}>
                            <Paper 
                                variant="outlined" 
                                sx={{ 
                                    p: 1.5, 
                                    borderRadius: 2,
                                    bgcolor: field.assurance.toLowerCase() === 'missing' ? 'error.50' : 'transparent',
                                    borderColor: field.assurance.toLowerCase() === 'missing' ? 'error.200' : 'grey.300'
                                }}
                            >
                                <Stack spacing={1}>
                                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                                        <Stack direction="row" alignItems="center" spacing={1}>
                                            {ARTEFACT_ICONS[field.fieldKey] || ARTEFACT_ICONS.default}
                                            <Typography variant="subtitle2" fontWeight={600}>
                                                {field.label}
                                            </Typography>
                                        </Stack>
                                        
                                        <Stack direction="row" alignItems="center" spacing={1}>
                                            <Chip
                                                size="small"
                                                color={getAssuranceColor(field.assurance)}
                                                variant="outlined"
                                                label={field.assurance}
                                                icon={field.assurance.toLowerCase() === 'missing' ? <MissingIcon fontSize="small" /> : <CompliantIcon fontSize="small" />}
                                            />
                                        </Stack>
                                    </Stack>

                                    {field.policyRequirement === 'required' && (
                                        <Typography variant="caption" color="error.main" fontWeight={600}>
                                            Required
                                        </Typography>
                                    )}

                                    <Stack direction="row" justifyContent="flex-end">
                                        {field.evidence.length > 0 ? (
                                            <Stack direction="row" spacing={1}>
                                                <Button size="small" variant="text">
                                                    Replace
                                                </Button>
                                                <Button size="small" variant="text">
                                                    History ({field.evidence.length})
                                                </Button>
                                            </Stack>
                                        ) : (
                                            <Button 
                                                size="small" 
                                                variant="outlined" 
                                                color="primary"
                                                startIcon={<UploadIcon fontSize="small" />}
                                            >
                                                Upload
                                            </Button>
                                        )}
                                    </Stack>
                                </Stack>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>

                {/* Summary Actions */}
                {summary.missing > 0 && (
                    <Box sx={{ mt: 2, pt: 2, borderTop: 1, borderColor: 'grey.200' }}>
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                            <Typography variant="body2" color="text.secondary">
                                {summary.missing} artefact{summary.missing !== 1 ? 's' : ''} missing evidence
                            </Typography>
                            <Button variant="contained" color="primary">
                                Upload Missing Artefacts
                            </Button>
                        </Stack>
                    </Box>
                )}
            </Box>
        </Paper>
    );
}