import React, { useState } from 'react';
import {
    Stack,
    Typography,
    Box,
    Chip,
    TextField,
    Button,
    Paper,
    Divider,
    Alert,
    CircularProgress,
    FormControlLabel,
    Switch,
    IconButton,
    Tooltip,
} from '@mui/material';
import {
    Comment as CommentIcon,
    Send as SendIcon,
    Person as PersonIcon,
    AccessTime as TimeIcon,
    Lock as LockIcon,
    Public as PublicIcon,
} from '@mui/icons-material';
import { useRiskComments, useAddRiskComment } from '../../../api/hooks';
import type { RiskCommentType } from '../../../api/types';

interface RiskCommentsPanelProps {
    riskItemId: string;
    currentUserId?: string;
}

export default function RiskCommentsPanel({ riskItemId, currentUserId = 'current_user' }: RiskCommentsPanelProps) {
    const [includeInternal, setIncludeInternal] = useState(true);
    const [newCommentText, setNewCommentText] = useState('');
    const [isInternal, setIsInternal] = useState(false);
    const [commentType, setCommentType] = useState<RiskCommentType>('GENERAL');

    // Fetch comments
    const { data: comments = [], isLoading, isError, error, refetch } = useRiskComments(riskItemId, includeInternal);

    // Add comment mutation
    const addCommentMutation = useAddRiskComment(riskItemId);

    const handleSubmit = async () => {
        if (!newCommentText.trim()) return;

        try {
            await addCommentMutation.mutateAsync({
                commentText: newCommentText.trim(),
                commentType,
                isInternal,
                commentedBy: currentUserId,
            });

            // Reset form
            setNewCommentText('');
            setIsInternal(false);
            setCommentType('GENERAL');
        } catch (error) {
            console.error('Failed to add comment:', error);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        const diffHours = Math.floor(diffMins / 60);
        if (diffHours < 24) return `${diffHours}h ago`;
        const diffDays = Math.floor(diffHours / 24);
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays}d ago`;
        return date.toLocaleDateString();
    };

    const getCommentTypeColor = (type: RiskCommentType) => {
        switch (type) {
            case 'SME_REVIEW': return 'primary';
            case 'STATUS_CHANGE': return 'info';
            case 'ESCALATION': return 'error';
            case 'RESOLUTION': return 'success';
            case 'GENERAL':
            default: return 'default';
        }
    };

    return (
        <Stack spacing={2}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="subtitle1" fontWeight={600}>
                    Comments ({comments.length})
                </Typography>
                <FormControlLabel
                    control={
                        <Switch
                            checked={includeInternal}
                            onChange={(e) => setIncludeInternal(e.target.checked)}
                            size="small"
                        />
                    }
                    label="Show Internal"
                />
            </Box>

            {/* Add New Comment */}
            <Paper variant="outlined" sx={{ p: 2 }}>
                <Stack spacing={2}>
                    <TextField
                        multiline
                        rows={3}
                        placeholder="Add a comment..."
                        value={newCommentText}
                        onChange={(e) => setNewCommentText(e.target.value)}
                        fullWidth
                        size="small"
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={isInternal}
                                        onChange={(e) => setIsInternal(e.target.checked)}
                                        size="small"
                                    />
                                }
                                label={
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                        {isInternal ? <LockIcon fontSize="small" /> : <PublicIcon fontSize="small" />}
                                        <Typography variant="caption">
                                            {isInternal ? 'Internal' : 'External'}
                                        </Typography>
                                    </Box>
                                }
                            />
                        </Stack>
                        <Button
                            variant="contained"
                            size="small"
                            startIcon={<SendIcon />}
                            onClick={handleSubmit}
                            disabled={!newCommentText.trim() || addCommentMutation.isPending}
                        >
                            {addCommentMutation.isPending ? 'Posting...' : 'Post Comment'}
                        </Button>
                    </Box>
                </Stack>
            </Paper>

            <Divider />

            {/* Comments List */}
            {isLoading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
                    <CircularProgress size={24} />
                </Box>
            )}

            {isError && (
                <Alert severity="error">
                    Failed to load comments: {error?.message || 'Unknown error'}
                </Alert>
            )}

            {!isLoading && !isError && comments.length === 0 && (
                <Alert severity="info">
                    No comments yet. Be the first to comment!
                </Alert>
            )}

            {!isLoading && !isError && comments.length > 0 && (
                <Stack spacing={2}>
                    {comments.map((comment) => (
                        <Paper key={comment.commentId} variant="outlined" sx={{ p: 2 }}>
                            <Stack spacing={1}>
                                {/* Comment Header */}
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <PersonIcon fontSize="small" color="action" />
                                        <Typography variant="body2" fontWeight={600}>
                                            {comment.commentedBy}
                                        </Typography>
                                        <Chip
                                            size="small"
                                            label={comment.commentType.replace('_', ' ')}
                                            color={getCommentTypeColor(comment.commentType)}
                                            variant="outlined"
                                            sx={{ height: 20 }}
                                        />
                                        {comment.isInternal && (
                                            <Tooltip title="Internal Comment (not visible to Product Owner)">
                                                <Chip
                                                    size="small"
                                                    icon={<LockIcon fontSize="small" />}
                                                    label="Internal"
                                                    color="warning"
                                                    variant="filled"
                                                    sx={{ height: 20 }}
                                                />
                                            </Tooltip>
                                        )}
                                    </Stack>
                                    <Stack direction="row" spacing={0.5} alignItems="center">
                                        <TimeIcon fontSize="small" sx={{ color: 'text.secondary', fontSize: '0.875rem' }} />
                                        <Typography variant="caption" color="text.secondary">
                                            {formatDate(comment.commentedAt)}
                                        </Typography>
                                    </Stack>
                                </Box>

                                {/* Comment Text */}
                                <Typography variant="body2" sx={{ pl: 4, whiteSpace: 'pre-wrap' }}>
                                    {comment.commentText}
                                </Typography>

                                {/* Metadata */}
                                {comment.metadata && Object.keys(comment.metadata).length > 0 && (
                                    <Box sx={{ pl: 4, pt: 1 }}>
                                        <Paper variant="outlined" sx={{ p: 1, bgcolor: 'grey.50' }}>
                                            <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
                                                {JSON.stringify(comment.metadata, null, 2)}
                                            </Typography>
                                        </Paper>
                                    </Box>
                                )}
                            </Stack>
                        </Paper>
                    ))}
                </Stack>
            )}
        </Stack>
    );
}
