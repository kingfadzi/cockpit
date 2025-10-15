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
        <Stack spacing={1.5}>
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
                    label={<Typography variant="caption">Show Internal</Typography>}
                />
            </Box>

            {/* Add New Comment */}
            <Paper variant="outlined" sx={{ p: 1.5 }}>
                <Stack spacing={1}>
                    <TextField
                        multiline
                        rows={2}
                        placeholder="Add a comment..."
                        value={newCommentText}
                        onChange={(e) => setNewCommentText(e.target.value)}
                        fullWidth
                        size="small"
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
                                    {isInternal ? <LockIcon sx={{ fontSize: 14 }} /> : <PublicIcon sx={{ fontSize: 14 }} />}
                                    <Typography variant="caption" sx={{ fontSize: '0.7rem' }}>
                                        {isInternal ? 'Internal' : 'External'}
                                    </Typography>
                                </Box>
                            }
                        />
                        <Button
                            variant="contained"
                            size="small"
                            startIcon={<SendIcon sx={{ fontSize: 16 }} />}
                            onClick={handleSubmit}
                            disabled={!newCommentText.trim() || addCommentMutation.isPending}
                            sx={{ height: 28 }}
                        >
                            {addCommentMutation.isPending ? 'Posting...' : 'Post'}
                        </Button>
                    </Box>
                </Stack>
            </Paper>

            <Divider sx={{ my: 0.5 }} />

            {/* Comments List */}
            {isLoading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 1.5 }}>
                    <CircularProgress size={20} />
                </Box>
            )}

            {isError && (
                <Alert severity="error" sx={{ py: 0.5 }}>
                    Failed to load comments: {error?.message || 'Unknown error'}
                </Alert>
            )}

            {!isLoading && !isError && comments.length === 0 && (
                <Alert severity="info" sx={{ py: 0.5 }}>
                    No comments yet. Be the first to comment!
                </Alert>
            )}

            {!isLoading && !isError && comments.length > 0 && (
                <Stack spacing={1}>
                    {comments.map((comment) => (
                        <Paper key={comment.commentId} variant="outlined" sx={{ p: 1.25 }}>
                            <Stack spacing={0.75}>
                                {/* Comment Header */}
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <Stack direction="row" spacing={0.75} alignItems="center" flexWrap="wrap">
                                        <PersonIcon sx={{ fontSize: 16, color: 'action.active' }} />
                                        <Typography variant="caption" fontWeight={600} sx={{ fontSize: '0.75rem' }}>
                                            {comment.commentedBy}
                                        </Typography>
                                        <Chip
                                            size="small"
                                            label={comment.commentType.replace('_', ' ')}
                                            color={getCommentTypeColor(comment.commentType)}
                                            variant="outlined"
                                            sx={{ height: 18, fontSize: '0.65rem' }}
                                        />
                                        {comment.isInternal && (
                                            <Tooltip title="Internal Comment (not visible to Product Owner)">
                                                <Chip
                                                    size="small"
                                                    icon={<LockIcon sx={{ fontSize: 12 }} />}
                                                    label="Internal"
                                                    color="warning"
                                                    variant="filled"
                                                    sx={{ height: 18, fontSize: '0.65rem' }}
                                                />
                                            </Tooltip>
                                        )}
                                    </Stack>
                                    <Stack direction="row" spacing={0.4} alignItems="center">
                                        <TimeIcon sx={{ color: 'text.secondary', fontSize: 14 }} />
                                        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                                            {formatDate(comment.commentedAt)}
                                        </Typography>
                                    </Stack>
                                </Box>

                                {/* Comment Text */}
                                <Typography variant="caption" sx={{ pl: 2.5, whiteSpace: 'pre-wrap', lineHeight: 1.4 }}>
                                    {comment.commentText}
                                </Typography>

                                {/* Metadata */}
                                {comment.metadata && Object.keys(comment.metadata).length > 0 && (
                                    <Box sx={{ pl: 2.5, pt: 0.5 }}>
                                        <Paper variant="outlined" sx={{ p: 0.75, bgcolor: 'grey.50' }}>
                                            <Typography variant="caption" sx={{ fontFamily: 'monospace', fontSize: '0.65rem' }}>
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
