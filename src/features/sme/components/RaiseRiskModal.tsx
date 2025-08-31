import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Stack,
    Typography,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Alert,
    IconButton,
    Autocomplete,
    Grid,
    Collapse,
    Box
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface RaiseRiskModalProps {
    open: boolean;
    onClose: () => void;
    item: any;
}

export default function RaiseRiskModal({ open, onClose, item }: RaiseRiskModalProps) {
    const [riskData, setRiskData] = useState({
        controlRequirement: '',
        evidenceRequired: '',
        controlObjective: '',
        additionalContext: '',
        jiraProject: 'SEC' as string,
        assignedSme: 'security_sme_1' as string,
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        fixVersion: ''
    });

    const [isCreating, setIsCreating] = useState(false);
    const [createdIssueId, setCreatedIssueId] = useState<string | null>(null);
    const [showAdvanced, setShowAdvanced] = useState(false);

    // Mock data for dropdowns
    const jiraProjects = [
        { key: 'SEC', name: 'Security & Compliance' },
        { key: 'OPS', name: 'Operations' },
        { key: 'ARCH', name: 'Architecture' }
    ];

    const availableSmes = [
        { id: 'security_sme_1', name: 'John Smith (Security)', domain: 'Security' },
        { id: 'data_sme_1', name: 'Sarah Jones (Data)', domain: 'Data Architecture' },
        { id: 'service_sme_1', name: 'Mike Chen (Service)', domain: 'Service Transition' },
        { id: 'enterprise_sme_1', name: 'Lisa Brown (Enterprise)', domain: 'Enterprise Architecture' }
    ];

    const controlRequirements = [
        { 
            id: 'mfa_implementation', 
            label: 'Implement Multi-Factor Authentication',
            objective: 'prevent unauthorized access to user accounts',
            priority: 'High'
        },
        { 
            id: 'encryption_at_rest', 
            label: 'Enable encryption at rest for sensitive data',
            objective: 'protect data confidentiality when stored',
            priority: 'High'
        },
        { 
            id: 'access_logging', 
            label: 'Implement comprehensive access logging',
            objective: 'maintain audit trail for compliance',
            priority: 'Medium'
        },
        { 
            id: 'backup_testing', 
            label: 'Establish backup and recovery testing',
            objective: 'ensure business continuity',
            priority: 'Medium'
        },
        { 
            id: 'vulnerability_scanning', 
            label: 'Implement automated vulnerability scanning',
            objective: 'identify and remediate security weaknesses',
            priority: 'High'
        }
    ];


    const fixVersions = [
        '2024.1', '2024.2', '2024.3', '2024.4',
        '2025.1', '2025.2', '2025.3', '2025.4'
    ];

    const handleSubmit = async () => {
        setIsCreating(true);
        
        const selectedRequirement = controlRequirements.find(r => r.id === riskData.controlRequirement);
        
        // Generate story format for Jira
        const storyTitle = selectedRequirement?.label || riskData.controlRequirement;
        const storyDescription = `Given the context ${item?.appName || 'this application'}, I want to ensure that ${riskData.controlRequirement.toLowerCase()}, in order to ${riskData.controlObjective}. The risk mitigation will be accepted when ${riskData.evidenceRequired} is provided.`;
        
        // Simulate Jira API call
        setTimeout(() => {
            const mockJiraId = `${riskData.jiraProject}-${Math.floor(Math.random() * 1000)}`;
            setCreatedIssueId(mockJiraId);
            setIsCreating(false);
            
            console.log('Creating Jira issue:', {
                title: storyTitle,
                description: storyDescription,
                additionalContext: riskData.additionalContext,
                jiraProject: riskData.jiraProject,
                assignedSme: riskData.assignedSme,
                dueDate: riskData.dueDate,
                priority: selectedRequirement?.priority || 'Medium',
                appId: item?.appId,
                fieldKey: item?.fieldKey,
                jiraIssueId: mockJiraId
            });
        }, 2000);
    };

    const handleClose = () => {
        onClose();
        setCreatedIssueId(null);
        setIsCreating(false);
        setRiskData({
            controlRequirement: '',
            evidenceRequired: '',
            controlObjective: '',
            additionalContext: '',
            jiraProject: 'SEC',
            assignedSme: 'security_sme_1',
            dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            fixVersion: ''
        });
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography variant="h6">
                        {createdIssueId ? `Risk Created: ${createdIssueId}` : 'Raise Risk - Create Jira Issue'}
                    </Typography>
                    <IconButton onClick={handleClose} size="small">
                        <CloseIcon />
                    </IconButton>
                </Stack>
            </DialogTitle>
            <DialogContent sx={{ textAlign: 'left' }}>
                {createdIssueId ? (
                    <Stack spacing={2} sx={{ mt: 1 }}>
                        <Alert severity="success">
                            Risk successfully created in Jira: <strong>{createdIssueId}</strong>
                        </Alert>
                        <Button 
                            variant="outlined" 
                            href={`https://jira.company.com/browse/${createdIssueId}`}
                            target="_blank"
                        >
                            View in Jira
                        </Button>
                    </Stack>
                ) : (
                    <Stack spacing={2} sx={{ mt: 1 }}>
                        {item && (
                            <Alert severity="info" sx={{ mb: 1 }}>
                                Raising risk for: <strong>{item.appName || item.fieldLabel}</strong>
                                {item.fieldKey && ` → ${item.fieldLabel}`}
                            </Alert>
                        )}

                        <FormControl fullWidth size="small">
                            <InputLabel>Jira Project</InputLabel>
                            <Select
                                value={riskData.jiraProject}
                                onChange={(e) => setRiskData({ ...riskData, jiraProject: e.target.value })}
                                label="Jira Project"
                            >
                                {jiraProjects.map(project => (
                                    <MenuItem key={project.key} value={project.key}>
                                        {project.key} - {project.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <Autocomplete
                            freeSolo
                            options={controlRequirements.map(req => req.label)}
                            value={riskData.controlRequirement}
                            onChange={(_, newValue) => {
                                const requirement = controlRequirements.find(r => r.label === newValue);
                                setRiskData({
                                    ...riskData,
                                    controlRequirement: newValue || '',
                                    controlObjective: requirement?.objective || ''
                                });
                            }}
                            onInputChange={(_, newInputValue) => {
                                setRiskData({
                                    ...riskData,
                                    controlRequirement: newInputValue,
                                    controlObjective: ''
                                });
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Control Requirement *"
                                    placeholder="Select from list or type custom requirement"
                                    size="small"
                                />
                            )}
                        />

                        <TextField
                            label="Control Objective"
                            value={riskData.controlObjective}
                            onChange={(e) => setRiskData({ ...riskData, controlObjective: e.target.value })}
                            fullWidth
                            size="small"
                            placeholder="What business objective does this control achieve?"
                            helperText={riskData.controlObjective && controlRequirements.find(r => r.label === riskData.controlRequirement) ? "Auto-populated (editable)" : ""}
                        />

                        <Box>
                            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                                Evidence Required *
                            </Typography>
                            <ReactQuill
                                value={riskData.evidenceRequired}
                                onChange={(value) => setRiskData({ ...riskData, evidenceRequired: value })}
                                placeholder="Describe what evidence will satisfy this control requirement"
                                style={{ height: '100px', marginBottom: '50px' }}
                                modules={{
                                    toolbar: [
                                        ['bold', 'italic', 'underline'],
                                        ['link', 'image'],
                                        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                                        ['clean']
                                    ]
                                }}
                            />
                        </Box>

                        <Box>
                            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                                Additional Context
                            </Typography>
                            <ReactQuill
                                value={riskData.additionalContext}
                                onChange={(value) => setRiskData({ ...riskData, additionalContext: value })}
                                placeholder="Any additional context or specific details"
                                style={{ height: '100px', marginBottom: '50px' }}
                                modules={{
                                    toolbar: [
                                        ['bold', 'italic', 'underline'],
                                        ['link', 'image'],
                                        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                                        ['clean']
                                    ]
                                }}
                            />
                        </Box>

                        <Button 
                            variant="text" 
                            onClick={() => setShowAdvanced(!showAdvanced)}
                            sx={{ alignSelf: 'flex-start', textTransform: 'none' }}
                        >
                            {showAdvanced ? 'Hide' : 'Show'} Advanced Options
                        </Button>

                        <Collapse in={showAdvanced}>
                            <Stack spacing={2}>
                                <FormControl fullWidth size="small">
                                    <InputLabel>Assigned SME</InputLabel>
                                    <Select
                                        value={riskData.assignedSme}
                                        onChange={(e) => setRiskData({ ...riskData, assignedSme: e.target.value })}
                                        label="Assigned SME"
                                    >
                                        {availableSmes.map(sme => (
                                            <MenuItem key={sme.id} value={sme.id}>
                                                {sme.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <Grid container spacing={1.5}>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            label="Due Date"
                                            type="date"
                                            value={riskData.dueDate}
                                            onChange={(e) => setRiskData({ ...riskData, dueDate: e.target.value })}
                                            fullWidth
                                            size="small"
                                            InputLabelProps={{ shrink: true }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <FormControl fullWidth size="small">
                                            <InputLabel>Fix Version</InputLabel>
                                            <Select
                                                value={riskData.fixVersion}
                                                onChange={(e) => setRiskData({ ...riskData, fixVersion: e.target.value })}
                                                label="Fix Version"
                                            >
                                                <MenuItem value="">None</MenuItem>
                                                {fixVersions.map(version => (
                                                    <MenuItem key={version} value={version}>
                                                        {version}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            label="Risk Owner"
                                            value=""
                                            onChange={() => {}}
                                            fullWidth
                                            size="small"
                                            placeholder="Business owner"
                                        />
                                    </Grid>
                                </Grid>

                            </Stack>
                        </Collapse>
                    </Stack>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button 
                    onClick={handleSubmit}
                    variant="contained"
                    color="warning"
                    disabled={!riskData.controlRequirement || !riskData.evidenceRequired || isCreating}
                >
                    {isCreating ? 'Creating...' : 'Create Risk'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}