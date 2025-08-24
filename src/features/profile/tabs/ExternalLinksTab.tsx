import React, { useState } from 'react';
import {
    Stack,
    Typography,
    Paper,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    IconButton,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Box,
    Chip,
    Divider,
    Link as MUILink,
} from '@mui/material';
import {
    Code as GitLabIcon,
    BugReport as JiraIcon,
    Support as ServiceNowIcon,
    Launch as ExternalIcon,
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
} from '@mui/icons-material';

interface ExternalLinksTabProps {
    appId: string;
}

interface ExternalLink {
    id: string;
    type: 'gitlab' | 'jira' | 'servicenow' | 'other';
    name: string;
    url: string;
    description?: string;
}

// Mock data for external links
const MOCK_EXTERNAL_LINKS: ExternalLink[] = [
    // GitLab Repositories
    {
        id: 'gl1',
        type: 'gitlab',
        name: 'correspondence-service',
        url: 'https://gitlab.company.com/banking/correspondence-service',
        description: 'Main service repository'
    },
    {
        id: 'gl2',
        type: 'gitlab',
        name: 'correspondence-ui',
        url: 'https://gitlab.company.com/banking/correspondence-ui',
        description: 'Frontend application'
    },
    {
        id: 'gl3',
        type: 'gitlab',
        name: 'correspondence-batch',
        url: 'https://gitlab.company.com/banking/correspondence-batch',
        description: 'Batch processing jobs'
    },
    {
        id: 'gl4',
        type: 'gitlab',
        name: 'correspondence-infrastructure',
        url: 'https://gitlab.company.com/devops/correspondence-infrastructure',
        description: 'Infrastructure as code'
    },
    // JIRA Projects
    {
        id: 'j1',
        type: 'jira',
        name: 'CORR - Correspondence System',
        url: 'https://jira.company.com/projects/CORR',
        description: 'Main project board'
    },
    {
        id: 'j2',
        type: 'jira',
        name: 'BANKING - Banking Platform',
        url: 'https://jira.company.com/projects/BANKING',
        description: 'Platform-wide issues'
    },
    // ServiceNow
    {
        id: 'sn1',
        type: 'servicenow',
        name: 'Correspondence Service Catalog',
        url: 'https://company.service-now.com/sp?id=sc_cat_item&sys_id=correspondence',
        description: 'Service catalog and requests'
    },
    // Other systems
    {
        id: 'other1',
        type: 'other',
        name: 'Confluence Documentation',
        url: 'https://confluence.company.com/display/CORR',
        description: 'Technical documentation'
    }
];

const LINK_TYPES = [
    { value: 'gitlab', label: 'GitLab', icon: <GitLabIcon />, color: '#FC6D26' },
    { value: 'jira', label: 'JIRA', icon: <JiraIcon />, color: '#0052CC' },
    { value: 'servicenow', label: 'ServiceNow', icon: <ServiceNowIcon />, color: '#62D84E' },
    { value: 'other', label: 'Other', icon: <ExternalIcon />, color: '#757575' },
] as const;

export default function ExternalLinksTab({ appId }: ExternalLinksTabProps) {
    const [links, setLinks] = useState<ExternalLink[]>(MOCK_EXTERNAL_LINKS);
    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const [editingLink, setEditingLink] = useState<ExternalLink | null>(null);
    const [newLink, setNewLink] = useState<Partial<ExternalLink>>({
        type: 'gitlab',
        name: '',
        url: '',
        description: ''
    });

    const handleAddLink = () => {
        if (newLink.name && newLink.url && newLink.type) {
            const link: ExternalLink = {
                id: Date.now().toString(),
                type: newLink.type,
                name: newLink.name,
                url: newLink.url,
                description: newLink.description || ''
            };
            setLinks([...links, link]);
            setNewLink({ type: 'gitlab', name: '', url: '', description: '' });
            setAddDialogOpen(false);
        }
    };

    const handleEditLink = (link: ExternalLink) => {
        setEditingLink(link);
        setNewLink({ ...link });
        setAddDialogOpen(true);
    };

    const handleUpdateLink = () => {
        if (editingLink && newLink.name && newLink.url && newLink.type) {
            setLinks(links.map(l => l.id === editingLink.id ? 
                { ...editingLink, ...newLink } as ExternalLink : l
            ));
            setEditingLink(null);
            setNewLink({ type: 'gitlab', name: '', url: '', description: '' });
            setAddDialogOpen(false);
        }
    };

    const handleDeleteLink = (linkId: string) => {
        setLinks(links.filter(l => l.id !== linkId));
    };

    const groupedLinks = links.reduce((groups, link) => {
        const type = link.type;
        if (!groups[type]) {
            groups[type] = [];
        }
        groups[type].push(link);
        return groups;
    }, {} as Record<string, ExternalLink[]>);

    const getLinkTypeInfo = (type: string) => 
        LINK_TYPES.find(t => t.value === type) || LINK_TYPES[3];

    return (
        <Stack spacing={3}>
            {/* Header */}
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Stack>
                    <Typography variant="h6" fontWeight={700}>
                        External Links & Integrations
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Connected repositories, project boards, and external systems for {appId}
                    </Typography>
                </Stack>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setAddDialogOpen(true)}
                >
                    Add Link
                </Button>
            </Stack>

            {/* Link Groups */}
            {LINK_TYPES.map(linkType => {
                const typeLinks = groupedLinks[linkType.value] || [];
                if (typeLinks.length === 0) return null;

                return (
                    <Paper key={linkType.value} variant="outlined" sx={{ borderRadius: 3 }}>
                        <Box sx={{ p: 2 }}>
                            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                                <Box sx={{ color: linkType.color, display: 'flex' }}>
                                    {linkType.icon}
                                </Box>
                                <Typography variant="subtitle1" fontWeight={600}>
                                    {linkType.label}
                                </Typography>
                                <Chip 
                                    size="small" 
                                    label={typeLinks.length} 
                                    sx={{ bgcolor: linkType.color, color: 'white' }}
                                />
                            </Stack>
                            
                            <List sx={{ py: 0 }}>
                                {typeLinks.map((link, index) => (
                                    <React.Fragment key={link.id}>
                                        <ListItem
                                            sx={{
                                                px: 0,
                                                '&:hover .link-actions': { opacity: 1 }
                                            }}
                                        >
                                            <ListItemIcon sx={{ minWidth: 32 }}>
                                                <ExternalIcon fontSize="small" />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={
                                                    <MUILink
                                                        href={link.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        sx={{ 
                                                            textDecoration: 'none',
                                                            fontWeight: 600,
                                                            '&:hover': { textDecoration: 'underline' }
                                                        }}
                                                    >
                                                        {link.name}
                                                    </MUILink>
                                                }
                                                secondary={link.description}
                                            />
                                            <Box 
                                                className="link-actions"
                                                sx={{ 
                                                    opacity: 0,
                                                    transition: 'opacity 0.2s',
                                                    display: 'flex',
                                                    gap: 0.5
                                                }}
                                            >
                                                <IconButton 
                                                    size="small" 
                                                    onClick={() => handleEditLink(link)}
                                                >
                                                    <EditIcon fontSize="small" />
                                                </IconButton>
                                                <IconButton 
                                                    size="small" 
                                                    onClick={() => handleDeleteLink(link.id)}
                                                    color="error"
                                                >
                                                    <DeleteIcon fontSize="small" />
                                                </IconButton>
                                            </Box>
                                        </ListItem>
                                        {index < typeLinks.length - 1 && <Divider />}
                                    </React.Fragment>
                                ))}
                            </List>
                        </Box>
                    </Paper>
                );
            })}

            {/* Add/Edit Dialog */}
            <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle>
                    {editingLink ? 'Edit External Link' : 'Add External Link'}
                </DialogTitle>
                <DialogContent>
                    <Stack spacing={2} sx={{ mt: 1 }}>
                        <TextField
                            select
                            label="Link Type"
                            value={newLink.type || 'gitlab'}
                            onChange={(e) => setNewLink({ ...newLink, type: e.target.value as any })}
                            SelectProps={{ native: true }}
                            fullWidth
                        >
                            {LINK_TYPES.map((type) => (
                                <option key={type.value} value={type.value}>
                                    {type.label}
                                </option>
                            ))}
                        </TextField>
                        
                        <TextField
                            label="Name"
                            value={newLink.name || ''}
                            onChange={(e) => setNewLink({ ...newLink, name: e.target.value })}
                            placeholder="e.g., correspondence-service"
                            fullWidth
                            required
                        />
                        
                        <TextField
                            label="URL"
                            value={newLink.url || ''}
                            onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                            placeholder="https://..."
                            fullWidth
                            required
                        />
                        
                        <TextField
                            label="Description (Optional)"
                            value={newLink.description || ''}
                            onChange={(e) => setNewLink({ ...newLink, description: e.target.value })}
                            placeholder="Brief description of this resource"
                            multiline
                            rows={2}
                            fullWidth
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        setAddDialogOpen(false);
                        setEditingLink(null);
                        setNewLink({ type: 'gitlab', name: '', url: '', description: '' });
                    }}>
                        Cancel
                    </Button>
                    <Button 
                        variant="contained" 
                        onClick={editingLink ? handleUpdateLink : handleAddLink}
                        disabled={!newLink.name || !newLink.url}
                    >
                        {editingLink ? 'Update' : 'Add'} Link
                    </Button>
                </DialogActions>
            </Dialog>
        </Stack>
    );
}